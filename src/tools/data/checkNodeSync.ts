import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../../utils/logger.js';
import { buildToolSchemas } from '../common/schemas.js';
import { safeHandler } from '../common/errors.js';
import {
  getWorkersStatus,
  getBlockchains,
  testBlockchainConnection,
} from '../../api/payramApi.js';
import type { NodeHealth } from '../../api/types.js';

/** A block older than this is flagged as a possible sync lag. */
const STALE_BLOCK_SECONDS = 120;

const nodeReportSchema = z
  .object({
    url: z.string(),
    connected: z.boolean(),
    lastBlockSeen: z.number().optional(),
    blockAgeSeconds: z.number().nullable().optional(),
    stale: z.boolean(),
    avgLatencyMs: z.number().optional(),
    error: z.string().optional(),
  })
  .passthrough();

const chainReportSchema = z.object({
  blockchainCode: z.string(),
  reachable: z.boolean(),
  nodes: z.array(nodeReportSchema),
  note: z.string().optional(),
});

const schemas = buildToolSchemas({
  input: z.object({}).strict(),
  output: z.object({
    workers: z.array(
      z.object({ name: z.string(), status: z.string(), details: z.string() }).passthrough(),
    ),
    chains: z.array(chainReportSchema),
    healthy: z.boolean(),
  }),
});

const textContent = (text: string) => ({ type: 'text' as const, text });

const blockAgeSeconds = (n: NodeHealth): number | null => {
  if (!n.lastBlockTimestamp) return null;
  const ts = Date.parse(n.lastBlockTimestamp);
  if (Number.isNaN(ts)) return null;
  return Math.max(0, Math.round((Date.now() - ts) / 1000));
};

export const registerCheckNodeSyncTool = (server: McpServer) => {
  server.registerTool(
    'check_node_sync',
    {
      title: 'Check Node Sync',
      description:
        'Reports whether PayRam blockchain listener workers are running and whether each chain’s RPC nodes ' +
        'are connected and in sync (last block recency + latency). Use to diagnose stuck deposits or a chain ' +
        'that has stopped detecting payments. Read-only.',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async () => {
        const [workers, blockchains] = await Promise.all([
          getWorkersStatus(),
          getBlockchains(),
        ]);

        const activeChains = blockchains.filter(
          (b) => (b.status ?? 'active').toLowerCase() === 'active',
        );

        const chains = await Promise.all(
          activeChains.map(async (chain) => {
            try {
              const result = await testBlockchainConnection(chain.code);
              const nodes = result.nodes.map((n) => {
                const age = blockAgeSeconds(n);
                return {
                  url: n.url,
                  connected: n.connected,
                  lastBlockSeen: n.lastBlockSeen,
                  blockAgeSeconds: age,
                  stale: age !== null && age > STALE_BLOCK_SECONDS,
                  avgLatencyMs: n.avgLatencyMs,
                  error: n.error,
                };
              });
              return {
                blockchainCode: chain.code,
                reachable: result.success,
                nodes,
              };
            } catch (error) {
              return {
                blockchainCode: chain.code,
                reachable: false,
                nodes: [],
                note: error instanceof Error ? error.message : 'test-connection failed',
              };
            }
          }),
        );

        const workersDown = workers.filter((w) => w.status.toUpperCase() !== 'RUNNING');
        const chainsUnhealthy = chains.filter(
          (c) => !c.reachable || c.nodes.some((n) => !n.connected || n.stale),
        );
        const healthy = workersDown.length === 0 && chainsUnhealthy.length === 0;

        const workerLines = workers
          .map((w) => `  ${w.status.toUpperCase() === 'RUNNING' ? '✓' : '✗'} ${w.name.padEnd(28)} ${w.status}`)
          .join('\n');

        const chainLines = chains
          .map((c) => {
            if (!c.reachable) return `  ✗ ${c.blockchainCode.padEnd(10)} no node reachable${c.note ? ` (${c.note})` : ''}`;
            return c.nodes
              .map((n) => {
                const flag = !n.connected ? '✗' : n.stale ? '⚠' : '✓';
                const age = n.blockAgeSeconds === null || n.blockAgeSeconds === undefined ? '—' : `${n.blockAgeSeconds}s ago`;
                return `  ${flag} ${c.blockchainCode.padEnd(10)} block ${n.lastBlockSeen ?? '?'} (${age})${n.stale ? ' STALE' : ''}`;
              })
              .join('\n');
          })
          .join('\n');

        const message =
          `Node sync: ${healthy ? 'HEALTHY ✓' : 'NEEDS ATTENTION ⚠'}\n\n` +
          `Workers:\n${workerLines || '  (none reported)'}\n\n` +
          `Chains (block staleness threshold ${STALE_BLOCK_SECONDS}s):\n${chainLines || '  (no active chains)'}`;

        logger.info('Node sync checked', {
          workersDown: workersDown.length,
          chainsUnhealthy: chainsUnhealthy.length,
          healthy,
        });

        return {
          content: [textContent(message)],
          structuredContent: { workers: workers.map((w) => ({ ...w })), chains, healthy },
        };
      },
      { toolName: 'check_node_sync' },
    ),
  );
};
