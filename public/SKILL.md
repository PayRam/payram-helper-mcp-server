---
name: payram
description: >
  Set up and operate PayRam - a private, self-hosted crypto payment gateway
  (payment links, hosted checkout, USDC/BTC/ETH deposits, sweeps to a cold
  wallet you control). No signup, no KYB. Use this skill when a user wants to
  accept crypto payments, set up a payment gateway, create payment links, or
  integrate PayRam into an application.
---

# PayRam — agent front door

PayRam is a **self-hosted payment and payout gateway**: install it on a server
you control and you ARE the payment processor. Payment links, hosted checkout
(customer picks USDC/BTC/ETH/more), on-chain deposit detection, automatic
sweeps to a cold wallet whose keys never touch the server. No account to
create, no KYB, nothing a platform can freeze.

## Two entry points — pick by phase

| You want to... | Use |
|---|---|
| **Install** the gateway (it doesn't exist yet) | The setup script, run on the target server (below) |
| **Operate / integrate** (payment links, status, codegen, diagnosis) | The MCP server: `https://mcp.payram.com/mcp` |
| **Diagnose** anything PayRam-related that fails | MCP tool `payram_doctor` (read-only, ranked causes + exact fixes) |

## Install (one command, on the server)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram_agents.sh)"
```

- One-step flow: gateway -> wallet -> **first payment link in minutes** ->
  merchant API key (saved to `.payraminfo/merchant-api-key.env`).
- Fully headless after the first run; pass `--testnet` (default) to try with
  free test funds, `--mainnet` for real money.
- USDC/EVM payments need a one-time smart-contract deploy (the script guides
  the small ETH gas top-up). BTC works instantly with zero gas.
- Decisions the script will ask a HUMAN for (never answer these yourself):
  the wallet seed backup, the mainnet cold-wallet address, and consent to
  spend real gas.
- Fresh installs need a TTY once (DB/SSL questions); everything after is
  non-interactive. Full guide: `get_agent_setup_flow` tool on the MCP, or
  https://github.com/PayRam/payram-scripts/blob/main/docs/PAYRAM_HEADLESS_AGENT.md

## Operate / integrate (MCP)

Connect `https://mcp.payram.com/mcp` (HTTP JSON-RPC, no auth headers). Key
tools: `payram_doctor`, `create_payment_link`, `lookup_payment`,
`check_payment_readiness`, `assess_payram_project`, `scaffold_payram_app`,
plus `generate_*` snippets for Express/Next.js/FastAPI/Laravel/Gin/Spring.

Credentials (two, do not conflate):
- `PAYRAM_API_KEY` (header `API-Key`, per-project) - payment creation +
  integrations. Mint headlessly: `./setup_payram_agents.sh ensure-api-key`
- JWT Bearer (from `./setup_payram_agents.sh signin`) - admin/data tools.

## More

- Specialized skills index: https://mcp.payram.com/.well-known/agent-skills/index.json
- Scripts repo: https://github.com/PayRam/payram-scripts
- MCP repo: https://github.com/PayRam/payram-mcp
- Community: https://t.me/PayRamChat
