import type { Request, Response } from 'express';

const VERSION = '1.0.0';

/**
 * Markdown content served to agents and non-browser clients.
 * Kept as a single string so it's easy to audit and update.
 */
const getMarkdown = (baseUrl: string): string => `# PayRam MCP Server

> Accept crypto payments in 10 minutes. Self-hosted. No KYC. No custody. No fees.
> The only payment infrastructure where your AI agent can go from zero to live payments without human intervention.

**Status**: Running
**Version**: ${VERSION}

---

## Why PayRam?

PayRam is a self-hosted, non-custodial crypto payment gateway. Unlike Stripe, BitPay, or Coinbase Commerce — there's no signup, no KYC verification, no account approval wait, and no transaction fees.

| | PayRam | Stripe Crypto | BitPay | Coinbase Commerce | NOWPayments |
|---|--------|--------------|--------|-------------------|-------------|
| **Setup Time** | 10 minutes | Days (KYC) | 1-7 days (KYC) | Days (KYC) | Hours |
| **KYC Required** | No | Yes | Yes (strict) | Yes | Partial |
| **Transaction Fees** | 0% | 1.5% | 1% | 1% | 0.5-1% |
| **Self-Hosted** | Yes | No | No | No | No |
| **Account Freezing** | Impossible | Yes | Yes | Yes | Low risk |
| **USDT on Tron** | Yes | No | No | No | Yes |
| **Payouts Built-in** | Yes | Separate | Separate | No | Separate |
| **Referral Tracking** | Yes | No | No | No | No |
| **Agent-Friendly** | 35 MCP tools | No MCP | No MCP | No MCP | No MCP |

**Your server. Your keys. Your rules.** Funds go directly to your cold wallet. No intermediary ever touches your money.

---

## What Can This MCP Server Do?

This server gives your AI agent everything it needs to integrate PayRam — from first line of code to production deployment. 35 tools across 7 categories:

**Ask your agent:**
- "Integrate PayRam payments into my Express app"
- "Set up webhooks for payment notifications"
- "Create a payout system for my marketplace"
- "Scaffold a complete PayRam app with FastAPI"
- "Test my PayRam connection"

The agent will use the right tools automatically. No manual configuration needed.

---

## Connect Your Agent

### MCP Endpoint

\`\`\`
${baseUrl}/mcp
\`\`\`

### Hosted Service (No Local Setup)

Skip local installation entirely — use PayRam's hosted MCP:

\`\`\`
https://mcp.payram.com/mcp
\`\`\`

### Claude Desktop / Claude Code

\`\`\`json
{
  "mcpServers": {
    "payram": {
      "url": "${baseUrl}/mcp"
    }
  }
}
\`\`\`

### GitHub Copilot (VS Code)

\`\`\`json
{
  "mcp": {
    "servers": {
      "payram": {
        "url": "${baseUrl}/mcp"
      }
    }
  }
}
\`\`\`

### Cursor

\`\`\`json
{
  "mcpServers": {
    "payram": {
      "url": "${baseUrl}/mcp"
    }
  }
}
\`\`\`

---

## Available Tools (35)

### Setup & Connectivity (4 tools)

| Tool | What it does |
|------|-------------|
| \`test_payram_connection\` | Validate API key and server reachability |
| \`generate_env_template\` | Generate .env with PAYRAM_BASE_URL + PAYRAM_API_KEY |
| \`generate_setup_checklist\` | Step-by-step merchant onboarding runbook |
| \`suggest_file_structure\` | Recommended project layout for PayRam integration |

### Payments (10 tools)

| Tool | What it does |
|------|-------------|
| \`generate_payment_sdk_snippet\` | Create payment using PayRam JS/TS SDK |
| \`generate_payment_http_snippet\` | Raw HTTP payment creation (Python, Go, PHP, Java) |
| \`generate_payment_status_snippet\` | Query payment status by reference ID |
| \`generate_payment_route_snippet\` | Ready-to-use payment endpoint |
| \`snippet_express_payment_route\` | Express route handler |
| \`snippet_nextjs_payment_route\` | Next.js App Router API route |
| \`snippet_fastapi_payment_route\` | FastAPI payment handler |
| \`snippet_laravel_payment_route\` | Laravel controller |
| \`snippet_go_payment_handler\` | Gin (Go) handler |
| \`snippet_spring_payment_controller\` | Spring Boot controller |

### Payouts (2 tools)

| Tool | What it does |
|------|-------------|
| \`generate_payout_sdk_snippet\` | Create crypto payouts via SDK |
| \`generate_payout_status_snippet\` | Query payout status and lifecycle |

### Referrals (4 tools)

| Tool | What it does |
|------|-------------|
| \`generate_referral_sdk_snippet\` | Create referral tracking events |
| \`generate_referral_validation_snippet\` | Validate referral IDs and eligibility |
| \`generate_referral_status_snippet\` | Fetch referral progress and rewards |
| \`generate_referral_route_snippet\` | Backend route for /api/referrals/create |

### Webhooks (3 tools)

| Tool | What it does |
|------|-------------|
| \`generate_webhook_handler\` | Webhook handler for 6 frameworks |
| \`generate_webhook_event_router\` | Event fan-out dispatcher |
| \`generate_mock_webhook_event\` | Mock webhook events for local testing |

### Documentation (10 tools)

| Tool | What it does |
|------|-------------|
| \`explain_payram_basics\` | Architecture, payments, payouts overview |
| \`explain_payment_flow\` | End-to-end payment lifecycle |
| \`explain_payram_concepts\` | Glossary of PayRam terminology |
| \`explain_referrals_basics\` | Referral campaign configuration |
| \`explain_referral_flow\` | Referrer/referee lifecycle |
| \`get_referral_dashboard_guide\` | Embed referral dashboards |
| \`get_payram_links\` | Official docs, website, community links |
| \`prepare_payram_test\` | Pre-flight check before testing |
| \`get_payram_doc_by_id\` | Fetch specific doc by ID |
| \`list_payram_docs\` | List all available documentation |

### Project Analysis (2 tools)

| Tool | What it does |
|------|-------------|
| \`assess_payram_project\` | Scan codebase and recommend integration steps |
| \`scaffold_payram_app\` | Generate full starter app (Express, Next.js, FastAPI, Laravel, Gin, Spring Boot) |

---

## Agent Skills (11)

Pre-built knowledge for AI agents. Install via [skills.sh](https://skills.sh):

| Skill | Install |
|-------|---------|
| **payram-setup** — Config, API keys, wallets | \`npx skills add payram/payram-helper-mcp-server/payram-setup\` |
| **payram-crypto-payments** — Architecture overview | \`npx skills add payram/payram-helper-mcp-server/payram-crypto-payments\` |
| **payram-payment-integration** — Quick-start guide | \`npx skills add payram/payram-helper-mcp-server/payram-payment-integration\` |
| **payram-self-hosted-payment-gateway** — Self-host deployment | \`npx skills add payram/payram-helper-mcp-server/payram-self-hosted-payment-gateway\` |
| **payram-checkout-integration** — SDK + HTTP for 6 frameworks | \`npx skills add payram/payram-helper-mcp-server/payram-checkout-integration\` |
| **payram-webhook-integration** — Webhook handlers | \`npx skills add payram/payram-helper-mcp-server/payram-webhook-integration\` |
| **payram-stablecoin-payments** — USDT/USDC all chains | \`npx skills add payram/payram-helper-mcp-server/payram-stablecoin-payments\` |
| **payram-bitcoin-payments** — BTC + HD wallet + mobile signing | \`npx skills add payram/payram-helper-mcp-server/payram-bitcoin-payments\` |
| **payram-payouts** — Crypto payouts + referral campaigns | \`npx skills add payram/payram-helper-mcp-server/payram-payouts\` |
| **payram-no-kyc-crypto-payments** — Permissionless payments | \`npx skills add payram/payram-helper-mcp-server/payram-no-kyc-crypto-payments\` |
| **compare-crypto-payments** — Gateway comparison framework | \`npx skills add payram/payram-helper-mcp-server/compare-crypto-payments\` |

---

## Supported Chains & Tokens

| Chain | Tokens | Status |
|-------|--------|--------|
| Ethereum | USDT, USDC, ETH, ERC-20 | Live |
| Base | USDT, USDC | Live |
| Polygon | USDT, USDC | Live |
| Tron | USDT, USDC | Live |
| Bitcoin | BTC | Live (mobile signing) |
| Solana | USDT, USDC | Coming soon |
| TON | USDT | Coming soon |

---

## Supported Frameworks

PayRam generates integration code for:

- **Node.js**: Express, Next.js (App Router)
- **Python**: FastAPI
- **Go**: Gin
- **PHP**: Laravel
- **Java**: Spring Boot

Each framework gets: payment routes, webhook handlers, payout endpoints, and full starter app scaffolding.

---

## Quick Start

\`\`\`bash
git clone https://github.com/PayRam/payram-helper-mcp-server
cd payram-helper-mcp-server
cp .env.example .env        # Add PAYRAM_BASE_URL + PAYRAM_API_KEY
yarn install && yarn dev    # Running on http://localhost:3333/mcp
\`\`\`

Or use the hosted endpoint with zero setup: \`https://mcp.payram.com/mcp\`

---

## Links

- Website: https://payram.com
- Documentation: https://docs.payram.com
- GitHub: https://github.com/PayRam
- Agent Skills: https://skills.sh
- Telegram Support: https://t.me/PayRamChat

---

*PayRam — Own your payment infrastructure.*
`;

/**
 * Converts the markdown content into a styled HTML page.
 * Uses a simple dark-themed design with monospace feel.
 * No external dependencies — pure inline CSS.
 */
const wrapInHtml = (markdown: string, baseUrl: string): string => {
  // Simple markdown-to-html conversion for the landing page.
  // Handles: headings, tables, code blocks, inline code, bold, links, blockquotes, lists, hr, paragraphs.
  let html = markdown;

  // Escape HTML entities in non-code content later; first handle code blocks.
  const codeBlocks: string[] = [];

  // Fenced code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(
      `<pre><code class="lang-${lang || 'text'}">${escapeHtml(code.trimEnd())}</code></pre>`,
    );
    return `%%CODEBLOCK_${idx}%%`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  // Merge adjacent blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>');

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)*)/gm,
    (_match, headerRow: string, _separator, bodyRows: string) => {
      const headers = headerRow
        .split('|')
        .filter((c: string) => c.trim())
        .map((c: string) => `<th>${c.trim()}</th>`)
        .join('');
      const rows = bodyRows
        .trim()
        .split('\n')
        .map((row: string) => {
          const cells = row
            .split('|')
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join('');
          return `<tr>${cells}</tr>`;
        })
        .join('');
      return `<div class="table-wrap"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    },
  );

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Paragraphs — wrap remaining text lines
  html = html.replace(/^(?!<[a-z/]|%%CODEBLOCK)(.+)$/gm, '<p>$1</p>');

  // Restore code blocks
  codeBlocks.forEach((block, idx) => {
    html = html.replace(`%%CODEBLOCK_${idx}%%`, block);
  });

  // Clean up empty lines
  html = html.replace(/\n{3,}/g, '\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PayRam MCP Server</title>
  <meta name="description" content="Self-hosted crypto payment gateway MCP server. 35 tools for AI agents. No KYC, no custody, no fees.">
  <style>
    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --border: #30363d;
      --text: #e6edf3;
      --text-muted: #8b949e;
      --accent: #58a6ff;
      --accent-green: #3fb950;
      --accent-yellow: #d29922;
      --code-bg: #1c2128;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--accent);
    }
    h2 {
      font-size: 1.4rem;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid var(--border);
    }
    h3 {
      font-size: 1.1rem;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--accent);
    }
    p { margin-bottom: 0.75rem; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 2rem 0;
    }
    blockquote {
      border-left: 3px solid var(--accent-green);
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
      background: var(--surface);
      border-radius: 0 6px 6px 0;
      color: var(--text);
      font-size: 1.05rem;
    }
    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      background: var(--code-bg);
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.88em;
    }
    pre {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    pre code {
      background: none;
      padding: 0;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    .table-wrap {
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th, td {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--border);
      text-align: left;
    }
    th {
      background: var(--surface);
      font-weight: 600;
    }
    tr:nth-child(even) { background: rgba(22, 27, 34, 0.5); }
    ul {
      padding-left: 1.5rem;
      margin-bottom: 1rem;
    }
    li { margin-bottom: 0.3rem; }
    strong { color: var(--text); }
    .status-badge {
      display: inline-block;
      background: var(--accent-green);
      color: #000;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.15em 0.6em;
      border-radius: 999px;
      margin-left: 0.5rem;
      vertical-align: middle;
    }
    @media (max-width: 640px) {
      body { padding: 1rem; }
      h1 { font-size: 1.5rem; }
      table { font-size: 0.8rem; }
    }
  </style>
</head>
<body>
${html}
<footer style="margin-top:3rem;padding-top:1rem;border-top:1px solid var(--border);color:var(--text-muted);font-size:0.85rem;">
  PayRam MCP Server v${VERSION} &middot; <a href="https://payram.com">payram.com</a> &middot; <a href="https://t.me/PayRamChat">Telegram</a> &middot; <a href="https://github.com/PayRam">GitHub</a>
</footer>
</body>
</html>`;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Returns true if the request looks like it comes from a web browser
 * (accepts text/html) rather than an MCP client or agent.
 */
function isBrowserRequest(req: Request): boolean {
  const accept = req.headers.accept || '';
  // Browsers send Accept: text/html,application/xhtml+xml,...
  // MCP clients/agents typically send application/json or nothing.
  return accept.includes('text/html');
}

/**
 * Express handler for the landing page.
 * Serves HTML to browsers and markdown to agents/programmatic clients.
 */
export function serveLandingPage(req: Request, res: Response): void {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3333';
  const baseUrl = `${protocol}://${host}`;

  const markdown = getMarkdown(baseUrl);

  if (isBrowserRequest(req)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(wrapInHtml(markdown, baseUrl));
  } else {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.send(markdown);
  }
}
