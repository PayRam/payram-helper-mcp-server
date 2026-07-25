import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger.js';
import { buildToolSchemas } from './common/schemas.js';
import { safeHandler } from './common/errors.js';
import { getPayramBaseUrl, getPayramApiKey, getPayramAccessToken } from '../config/env.js';
import { getWallets, getWorkersStatus } from '../api/payramApi.js';

/**
 * payram_doctor — one-call, staged diagnosis of a PayRam setup, modelled on
 * the ranked troubleshooting cards in setup_payram_agents.sh. Each stage
 * gates the next (no point checking the API key when the server is down);
 * every failure returns likely causes ranked by probability with the exact
 * fix command. All probes are read-only / side-effect-free — unlike
 * test_payram_connection, the API-key probe deliberately sends an INVALID
 * body so nothing is ever created (401/403 = bad key, 400 = key accepted).
 */

const findingSchema = z.object({
  check: z.string(),
  ok: z.boolean(),
  detail: z.string(),
});

const causeSchema = z.object({
  likelihood: z.string().describe('Rough probability, e.g. "80%"'),
  cause: z.string(),
  fix: z.string().describe('The exact command or action that resolves it'),
});

const schemas = buildToolSchemas({
  input: z
    .object({
      baseUrl: z
        .string()
        .url()
        .optional()
        .describe('PayRam server base URL. Defaults to PAYRAM_BASE_URL. The installer publishes on port 80 (http://localhost), not :8080.'),
      apiKey: z
        .string()
        .min(1)
        .optional()
        .describe('Merchant API key (per-project). Defaults to PAYRAM_API_KEY. Obtain headlessly: ./setup_payram_agents.sh ensure-api-key'),
    })
    .strict(),
  output: z.object({
    healthy: z.boolean(),
    failedStage: z
      .string()
      .nullable()
      .describe('First failing stage: reachability | api-key | jwt | readiness; null when healthy'),
    findings: z.array(findingSchema),
    likelyCauses: z.array(causeSchema).describe('Ranked causes for the first failing stage'),
    nextSteps: z.array(z.string()),
  }),
});

type DoctorInput = z.infer<typeof schemas.input>;
type DoctorOutput = z.infer<typeof schemas.output>;

const textContent = (text: string) => ({ type: 'text' as const, text });
const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, '');

/** Render the structured diagnosis as a readable card (mirrors the CLI cards). */
const renderReport = (out: DoctorOutput): string => {
  const lines: string[] = ['=== PayRam doctor ==='];
  for (const f of out.findings) {
    lines.push(`${f.ok ? 'PASS' : 'FAIL'}  ${f.check} - ${f.detail}`);
  }
  if (out.healthy) {
    lines.push('', 'All checks passed. PayRam is ready to take payments.');
  } else {
    lines.push('', `Failed at stage: ${out.failedStage}`, 'Likely causes:');
    for (const c of out.likelyCauses) {
      lines.push(`  [${c.likelihood}] ${c.cause}`, `         -> ${c.fix}`);
    }
  }
  if (out.nextSteps.length) {
    lines.push('', 'Next steps:');
    for (const s of out.nextSteps) lines.push(`  - ${s}`);
  }
  return lines.join('\n');
};

export const registerDoctorTool = (server: McpServer) => {
  server.registerTool(
    'payram_doctor',
    {
      title: 'Diagnose a PayRam setup (one call)',
      description:
        'Staged, read-only health diagnosis: server reachability -> merchant API key -> admin JWT -> payment readiness (wallets + listener workers). Returns ranked likely causes with exact fix commands for the first failing stage. Run this FIRST when anything PayRam-related fails.',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async (args: DoctorInput) => {
        const baseUrl = normalizeBaseUrl(args.baseUrl ?? getPayramBaseUrl());
        const apiKey = args.apiKey ?? getPayramApiKey();
        const findings: DoctorOutput['findings'] = [];
        const fail = (
          stage: string,
          causes: DoctorOutput['likelyCauses'],
          nextSteps: string[] = [],
        ): { structuredContent: DoctorOutput; content: { type: 'text'; text: string }[] } => {
          const structuredContent: DoctorOutput = {
            healthy: false,
            failedStage: stage,
            findings,
            likelyCauses: causes,
            nextSteps,
          };
          return { structuredContent, content: [textContent(renderReport(structuredContent))] };
        };

        // ── Stage 1: reachability (public endpoint, no auth) ──────────
        let rootStatus: number | null = null;
        try {
          const res = await fetch(`${baseUrl}/api/v1/member/root/exist`, {
            signal: AbortSignal.timeout(10_000),
          });
          rootStatus = res.status;
        } catch {
          rootStatus = null;
        }
        if (rootStatus !== 200) {
          findings.push({
            check: 'reachability',
            ok: false,
            detail: `GET ${baseUrl}/api/v1/member/root/exist -> ${rootStatus ?? 'network error'}`,
          });
          return fail('reachability', [
            {
              likelihood: '60%',
              cause: 'PayRam container is not running on that host',
              fix: 'On the server: docker ps | grep payram; restart with ./setup_payram_agents.sh --restart',
            },
            {
              likelihood: '30%',
              cause: `Wrong base URL or port (the installer publishes on port 80, e.g. http://localhost - NOT :8080). You used: ${baseUrl}`,
              fix: 'On the server: docker port payram 80  - then set PAYRAM_BASE_URL accordingly',
            },
            {
              likelihood: '10%',
              cause: 'PayRam was never installed on this host',
              fix: 'Install: ./setup_payram_agents.sh --testnet  (one-step flow, BTC payment link in minutes)',
            },
          ]);
        }
        findings.push({ check: 'reachability', ok: true, detail: `${baseUrl} is up` });

        // ── Stage 2: merchant API key (read-only probe: invalid body) ─
        if (!apiKey) {
          findings.push({ check: 'api-key', ok: false, detail: 'PAYRAM_API_KEY not configured' });
          return fail('api-key', [
            {
              likelihood: '90%',
              cause: 'No merchant API key configured for this MCP/integration',
              fix: 'On the server: ./setup_payram_agents.sh ensure-api-key  (mints/reuses the project key, saves PAYRAM_BASE_URL + PAYRAM_API_KEY)',
            },
            {
              likelihood: '10%',
              cause: 'Key exists but is not exported into this environment',
              fix: 'Copy values from .payraminfo/merchant-api-key.env into your .env',
            },
          ]);
        }
        let probeStatus: number | null = null;
        let probeBody = '';
        try {
          // Deliberately invalid body: distinguishes auth (401/403) from
          // validation (400) WITHOUT creating a payment.
          const res = await fetch(`${baseUrl}/api/v1/payment`, {
            method: 'POST',
            headers: { 'API-Key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
            signal: AbortSignal.timeout(10_000),
          });
          probeStatus = res.status;
          probeBody = (await res.text()).slice(0, 300);
        } catch (error) {
          logger.warn('doctor: api-key probe failed', error);
        }
        if (probeStatus === 401 || probeStatus === 403) {
          findings.push({
            check: 'api-key',
            ok: false,
            detail: `API key rejected (HTTP ${probeStatus}): ${probeBody}`,
          });
          return fail('api-key', [
            {
              likelihood: '70%',
              cause: 'API key is invalid, deactivated, or belongs to a different PayRam server',
              fix: 'Re-mint on the server: ./setup_payram_agents.sh ensure-api-key',
            },
            {
              likelihood: '30%',
              cause: 'Key is a JWT or placeholder, not a merchant API key (two different credentials)',
              fix: 'Use the per-project key from .payraminfo/merchant-api-key.env (header: API-Key), not the signin token',
            },
          ]);
        }
        findings.push({
          check: 'api-key',
          ok: true,
          detail: `key accepted (validation probe returned HTTP ${probeStatus ?? 'n/a'} - nothing was created)`,
        });

        // ── Stage 3 + 4: admin JWT and readiness (optional layer) ─────
        const nextSteps: string[] = [];
        let jwtOk = false;
        if (getPayramAccessToken()) {
          // getWallets is the JWT probe. Worker status is fetched SEPARATELY
          // and best-effort: a host with no supervisord returns 500 there, and
          // that must not be misreported as a rejected JWT.
          let wallets: Awaited<ReturnType<typeof getWallets>> | null = null;
          try {
            wallets = await getWallets();
            jwtOk = true;
            findings.push({ check: 'jwt', ok: true, detail: 'admin JWT valid' });
          } catch (error) {
            findings.push({
              check: 'jwt',
              ok: false,
              detail: `admin JWT rejected or expired (${error instanceof Error ? error.message.slice(0, 120) : 'error'})`,
            });
            nextSteps.push(
              'Admin/data tools need a fresh JWT: ./setup_payram_agents.sh signin (env PAYRAM_EMAIL/PAYRAM_PASSWORD), then update PAYRAM_ACCESS_TOKEN/PAYRAM_REFRESH_TOKEN',
            );
          }
          if (jwtOk && wallets) {
            let workersAvailable = true;
            let workers: Awaited<ReturnType<typeof getWorkersStatus>> = [];
            try {
              workers = await getWorkersStatus();
            } catch {
              workersAvailable = false; // no supervisord on this host — not a JWT problem
            }
            const depositWallets = wallets.filter(
              (w) => (w.walletType ?? '').toLowerCase() !== 'gas_wallet',
            );
            const stopped = workersAvailable
              ? workers.filter((w) => w.status.toUpperCase() !== 'RUNNING')
              : [];
            const workerDetail = workersAvailable
              ? `${stopped.length} worker(s) not running${stopped.length ? ` (${stopped.map((w) => w.name).join(', ')})` : ''}`
              : 'worker status unavailable (no supervisord on this host)';
            findings.push({
              check: 'readiness',
              ok: depositWallets.length > 0,
              detail: `${depositWallets.length} deposit wallet(s); ${workerDetail}`,
            });
            if (depositWallets.length === 0) {
              return fail(
                'readiness',
                [
                  {
                    likelihood: '90%',
                    cause: 'No deposit wallet linked yet - payment links will fail at checkout',
                    fix: 'BTC (instant, no gas): ./setup_payram_agents.sh ensure-wallet; USDC/EVM: ./setup_payram_agents.sh deploy-scw-flow',
                  },
                  {
                    likelihood: '10%',
                    cause: 'Wallet exists but is not linked to this project',
                    fix: 'Dashboard -> Project -> Wallet, or re-run ensure-wallet',
                  },
                ],
                ['For per-chain detail run check_payment_readiness; for RPC health run check_node_sync'],
              );
            }
            if (workersAvailable && stopped.length > 0) {
              nextSteps.push(
                `Workers not running (${stopped.map((w) => w.name).join(', ')}): on the server run supervisorctl status / supervisorctl start <name>`,
              );
            }
          }
        } else {
          nextSteps.push(
            'Optional: set PAYRAM_ACCESS_TOKEN/PAYRAM_REFRESH_TOKEN (from ./setup_payram_agents.sh signin) to unlock data/status tools and the readiness check',
          );
        }
        if (!jwtOk) {
          nextSteps.push('Payment creation works with the API key alone - try create_payment_link');
        }

        const structuredContent: DoctorOutput = {
          healthy: true,
          failedStage: null,
          findings,
          likelyCauses: [],
          nextSteps,
        };
        return { structuredContent, content: [textContent(renderReport(structuredContent))] };
      },
      { toolName: 'payram_doctor' },
    ),
  );
};
