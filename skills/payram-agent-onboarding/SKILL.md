---
name: payram-agent-onboarding
description: Deploy and automate PayRam for AI agents and CLI-only environments. No web UI required — pure API-driven payment infrastructure. Install via setup_payram_agents.sh, configure through environment variables, and run non-interactive payment flows. Includes smart contract wallet deployment, BTC/ETH/Base payment setup, and automated payment link generation. Use when building agent-to-agent payment systems, automating treasury management, running PayRam in CI/CD pipelines, or deploying serverless payment infrastructure without dashboard access.
---

# PayRam Agent Onboarding

> **Looking for standard deployment with web UI?** See [`payram-setup`](https://github.com/payram/payram-mcp/tree/main/skills/payram-setup) for the full dashboard installation.

PayRam Agent Onboarding enables fully automated, CLI-driven payment infrastructure for AI agents, automation pipelines, and serverless environments. No web dashboard — pure API interactions controlled via environment variables and shell commands.

## When to Use Agent Mode

- **AI Agent Payments**: Claude, Copilot, custom MCP clients processing payments autonomously
- **CI/CD Integration**: Automated payment testing in deployment pipelines
- **Serverless Infrastructure**: Lambda/Cloud Functions triggering payment operations
- **Treasury Automation**: Programmatic fund management without human interaction
- **Headless Commerce**: Backend-only payment processing for APIs and microservices

---

## Prerequisites

**System Requirements:**
- Ubuntu 22.04 or compatible Linux
- Docker (for `PAYRAM_NODE_MODE=docker`, default)
- 4 CPU cores, 4GB RAM minimum
- PostgreSQL database (configured during installation)

**Installation Script:**
```bash
curl -fsSL https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram_agents.sh -o setup_payram_agents.sh
chmod +x setup_payram_agents.sh
```

---

## Quick Start

### One-Step Interactive Flow

```bash
# Install, configure, and create first payment
./setup_payram_agents.sh
```

This runs the complete setup flow:
1. Network selection (testnet/mainnet)
2. Install PayRam backend via `setup_payram.sh`
3. Wait for API readiness
4. Create root user account + default project
5. Configure local frontend/backend settings
6. Blockchain setup prompt (ETH/Base/BTC-only)
7. Optional payment link generation

### Fully Non-Interactive Flow

```bash
# Set environment variables
export PAYRAM_EMAIL="admin@example.com"
export PAYRAM_PASSWORD="secure-password-123"
export PAYRAM_NETWORK="testnet"
export PAYRAM_BLOCKCHAIN_SETUP="skip"  # BTC-only, no funding needed
export PAYRAM_WALLET_CHOICE="1"        # Auto-create wallet
export PAYRAM_WALLET_QUIET="1"         # Suppress prompts

# Run automated setup
./setup_payram_agents.sh
```

---

## Commands Reference

Run from repository root: `./setup_payram_agents.sh [command]`

### Core Commands

| Command | Purpose |
|---------|---------|
| *(none)* or `menu` | Show interactive step menu |
| `status` | Check API reachability and authentication status |
| `setup` | First-time: register root user + create default project |
| `signin` | Authenticate; saves token to `.payraminfo/headless-tokens.env` |
| `ensure-config` | Configure local frontend/backend URLs (required for payments) |
| `ensure-wallet` | Create/link BTC wallet (random HD wallet or existing) |
| `run` | Full automated flow: setup → config → wallet → payment link |

### Blockchain Setup Commands

| Command | Purpose |
|---------|---------|
| `setup-eth` | Setup Ethereum payments (post-install) — deploys SCW wallet |
| `setup-base` | Setup Base payments (post-install) — deploys SCW wallet |
| `deploy-scw` | Deploy EVM smart contract wallet; auto-link to project |
| `deploy-scw-flow` | Generate mnemonic → fund deployer → balance check → deploy SCW |

### Payment & Utility Commands

| Command | Purpose |
|---------|---------|
| `create-payment-link [projectId] [email] [amountUSD]` | Generate payment link; outputs URL |
| `reset-local [-y]` | Wipe local DB/API data; requires re-running setup |

---

## Environment Variables

### Authentication & API

| Variable | Default | Description |
|----------|---------|-------------|
| `PAYRAM_API_URL` | `http://localhost:8080` | Backend API base URL |
| `PAYRAM_EMAIL` | — | Root user email (setup/signin) |
| `PAYRAM_PASSWORD` | — | Root user password |
| `PAYRAM_CUSTOMER_ID` | from token file | Auto-populated after signin |
| `PAYRAM_FRONTEND_URL` | `http://localhost` | Used by ensure-config (local) |

### Project & Payment Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PAYRAM_PROJECT_NAME` | `Default Project` | Project name during setup |
| `PAYRAM_PAYMENT_EMAIL` | — | Customer email for payment links |
| `PAYRAM_PAYMENT_AMOUNT` | `10` | Payment amount in USD |
| `PAYRAM_NETWORK` | `testnet` | Network selection: `testnet` or `mainnet` |
| `PAYRAM_BLOCKCHAIN_SETUP` | `skip` | Blockchain choice: `eth`, `base`, or `skip` (BTC-only) |

### Wallet & Node Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PAYRAM_WALLET_CHOICE` | — | `1` create, `2` link, `3` skip (non-interactive) |
| `PAYRAM_WALLET_QUIET` | — | If set, suppress wallet prompt text |
| `PAYRAM_NODE_MODE` | `docker` | JavaScript runtime: `docker` or `host` |
| `PAYRAM_NODE_DOCKER_IMAGE` | `node:20-bullseye-slim` | Docker image for JS scripts |

### Smart Contract Wallet (SCW) Deployment

| Variable | Default | Description |
|----------|---------|-------------|
| `PAYRAM_ETH_RPC_URL` | `https://ethereum-sepolia-rpc.publicnode.com` | RPC endpoint (no API key needed) |
| `PAYRAM_FUND_COLLECTOR` | deployer address | Cold wallet address (0x...) for fund sweeps |
| `PAYRAM_SCW_NAME` | `Headless SCW` | Name for the SCW wallet |
| `PAYRAM_BLOCKCHAIN_CODE` | `ETH` | Blockchain: `ETH`, `BASE`, `POLYGON` |
| `PAYRAM_MNEMONIC` | — | BIP39 mnemonic (or read from `.payraminfo/headless-wallet-secret.txt`) |
| `PAYRAM_SCW_MIN_BALANCE_ETH` | `0.01` (testnet) | Minimum balance before deploying SCW |
| `PAYRAM_SCW_SKIP_BALANCE_CHECK` | — | Skip balance polling (not recommended) |

**Token Storage:** Saved to `.payraminfo/headless-tokens.env` after signin.

---

## Typical Agent Workflow

### 1. Initial Setup (BTC-Only, No Funding Required)

```bash
export PAYRAM_EMAIL="agent@example.com"
export PAYRAM_PASSWORD="agent-secure-pass"
export PAYRAM_NETWORK="testnet"
export PAYRAM_BLOCKCHAIN_SETUP="skip"
export PAYRAM_WALLET_CHOICE="1"
export PAYRAM_WALLET_QUIET="1"

./setup_payram_agents.sh
```

### 2. Add Ethereum Payments (Requires Funding)

```bash
# Generate mnemonic and show deployer address
./setup_payram_agents.sh setup-eth

# Script will display deployer address like:
# "Send testnet ETH to: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEeB"

# Fund the address using testnet faucet:
# - https://sepoliafaucet.com
# - https://www.alchemy.com/faucets/ethereum-sepolia

# Script automatically polls for balance and deploys when funded
```

### 3. Create Payment Link

```bash
# Interactive (prompts for project, email, amount)
./setup_payram_agents.sh create-payment-link

# Non-interactive
export PAYRAM_PAYMENT_EMAIL="customer@example.com"
export PAYRAM_PAYMENT_AMOUNT="49.99"
./setup_payram_agents.sh create-payment-link
```

**Payment URL Format:**
```
http://localhost/payment?reference_id=ref_abc123&host=http://localhost:8080
```

⚠️ **Critical:** Use the exact URL printed. The `host` parameter and `&` separator are required.

---

## Smart Contract Wallet (SCW) Deployment

### Deploy-SCW Flow

`deploy-scw-flow` executes:

1. **Generate Mnemonic**: Creates BIP39 seed (saved to `.payraminfo/headless-wallet-secret.txt`)
2. **Derive Deployer**: Shows Ethereum address for funding
3. **Wait for Balance**: Polls RPC until balance ≥ `PAYRAM_SCW_MIN_BALANCE_ETH`
4. **Deploy Contract**: Executes `scripts/deploy-scw-eth.js`
5. **Register & Link**: Adds SCW to backend and associates with project

### Funding the Deployer

**Testnet (Sepolia):**
- Use faucets: [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia) or [SepoliaFaucet.com](https://sepoliafaucet.com)
- Minimum: 0.01 ETH (configurable via `PAYRAM_SCW_MIN_BALANCE_ETH`)

**Mainnet:**
- Send real ETH to deployer address
- Recommended minimum: 0.05 ETH for reliable deployment

### RPC Configuration

**Default RPC Endpoints:**
- **ETH Testnet (Sepolia)**: `https://eth-sepolia.g.alchemy.com/v2/demo`
- **ETH Mainnet**: Requires your own Alchemy/Infura key
- **Base Testnet**: `https://sepolia.base.org`
- **Base Mainnet**: `https://mainnet.base.org`

Override with:
```bash
export PAYRAM_ETH_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
```

### Fund Collector (Cold Wallet)

By default, funds sweep to the deployer address. Configure a separate cold wallet:

```bash
export PAYRAM_FUND_COLLECTOR="0x1234567890abcdef1234567890abcdef12345678"
./setup_payram_agents.sh deploy-scw
```

---

## Setting Up Additional Blockchains

After initial setup (which includes BTC), add EVM chains:

### Ethereum Payments

```bash
./setup_payram_agents.sh setup-eth
```

- Sets RPC URL based on `PAYRAM_NETWORK` (testnet → Sepolia, mainnet → Mainnet)
- Runs full `deploy-scw-flow`
- Blockchain code: `ETH`

### Base Payments

```bash
./setup_payram_agents.sh setup-base
```

- Sets RPC URL based on `PAYRAM_NETWORK` (testnet → Base Sepolia, mainnet → Base)
- Runs full `deploy-scw-flow`
- Blockchain code: `BASE`

**Note:** Both testnet and mainnet ETH use blockchain code `ETH`. Network is determined by RPC endpoint.

---

## Docker Node Runtime Behavior

When `PAYRAM_NODE_MODE=docker` (default):

- JavaScript scripts run inside Docker containers
- `localhost` in `PAYRAM_API_URL` is mapped to `host.docker.internal`
- `.payraminfo` directory is mounted for access to tokens and mnemonic
- Requires Docker daemon running with host network access

**Host Mode Alternative:**
```bash
export PAYRAM_NODE_MODE="host"
./setup_payram_agents.sh deploy-scw
```

---

## Agent Automation Best Practices

### Non-Interactive Configuration

For fully automated agent runs, always set:

```bash
export PAYRAM_EMAIL="agent@example.com"
export PAYRAM_PASSWORD="secure-password"
export PAYRAM_CUSTOMER_ID="from-token-file"
export PAYRAM_BLOCKCHAIN_SETUP="skip"  # or "eth", "base"
export PAYRAM_WALLET_CHOICE="1"
export PAYRAM_WALLET_QUIET="1"
```

### SCW Balance Thresholds

If RPC has delayed balance reporting, increase threshold:

```bash
export PAYRAM_SCW_MIN_BALANCE_ETH="0.02"
./setup_payram_agents.sh deploy-scw-flow
```

### Docker Networking

Ensure Docker has access to host networking:
- Docker Desktop: Enable "Use kernel networking for UDP" in settings
- Linux: Docker daemon runs with `--network=host` by default

---

## Files and Secrets Management

**Token Storage:**
- `.payraminfo/headless-tokens.env` — Authentication tokens (created by signin)

**Wallet Secrets:**
- `.payraminfo/headless-wallet-secret.txt` — BIP39 mnemonic for SCW deployment

**Scripts:**
- `scripts/generate-deposit-wallet.js` — BTC HD wallet generation
- `scripts/generate-deposit-wallet-eth.js` — Ethereum xpub derivation
- `scripts/deploy-scw-eth.js` — Smart contract wallet deployment

⚠️ **Security:** Never commit `.payraminfo/` to version control. Add to `.gitignore`.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **API unreachable** | Ensure PayRam is running: `./setup_payram_agents.sh`. Check `PAYRAM_API_URL`. |
| **401 Unauthorized** | Token expired. Re-authenticate: `./setup_payram_agents.sh signin` |
| **Payment creation returns 500** | Run `ensure-config` and `ensure-wallet`. Check logs: `docker logs payram 2>&1 \| tail -80` |
| **deploy-scw RPC 401 error** | Don't use placeholder RPC URLs. Default (PublicNode) is used if env looks invalid. |
| **INSUFFICIENT_FUNDS during deploy** | Send testnet ETH to deployer address shown in logs. Wait for confirmations. |
| **Payment page loads indefinitely** | Use exact URL returned. Ensure `host` param and `&` separator are preserved (not `\u0026`). |
| **Docker can't reach localhost API** | Use `PAYRAM_API_URL=http://host.docker.internal:8080` or switch to `PAYRAM_NODE_MODE=host` |

### Reset and Reinstall

```bash
# Wipe all data and start fresh
./setup_payram_agents.sh reset-local -y

# Re-run setup
./setup_payram_agents.sh
```

---

## Integration with MCP Clients

Connect your AI agent to PayRam:

```json
{
  "mcpServers": {
    "payram": {
      "url": "http://localhost:8080/mcp",
      "apiKey": "your-api-key-from-signin"
    }
  }
}
```

**Agent Workflow:**
1. Agent calls PayRam MCP tools for payment operations
2. PayRam processes API requests without UI interaction
3. Webhooks notify agent of payment status changes
4. Agent continues workflow based on payment outcomes

---

## Related Skills

| Skill | Purpose |
|-------|---------|
| [`payram-setup`](https://github.com/payram/payram-mcp/tree/main/skills/payram-setup) | Standard deployment with web dashboard |
| [`payram-payment-integration`](https://github.com/payram/payram-mcp/tree/main/skills/payram-payment-integration) | Integrate payments into applications |
| [`payram-webhook-integration`](https://github.com/payram/payram-mcp/tree/main/skills/payram-webhook-integration) | Handle payment event callbacks |
| [`payram-checkout-integration`](https://github.com/payram/payram-mcp/tree/main/skills/payram-checkout-integration) | Checkout flow implementation |
