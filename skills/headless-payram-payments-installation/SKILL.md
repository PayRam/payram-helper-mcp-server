# PayRam Headless — Agent skill

Use this when running or automating PayRam headless (CLI-only, no web UI). Only this repo (`payram-headless`) may be modified; payram-core, payram-frontend, etc. are read-only.

---

## Production Headless Setup (Recommended for AI Agents)

**For production deployments with AI agents, use the automated headless setup:**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram_agents.sh)"
```

This deploys a headless PayRam instance (no web UI) optimized for AI agents with MCP integration. The script:
- Installs PayRam API backend only (no dashboard)
- Configures MCP server for agent communication
- Generates agent configuration files
- Sets up database and Docker containers
- Creates API credentials

After setup, copy the generated MCP config into your agent's settings (Claude, Copilot, etc.).

**Total time:** ~15 minutes. See `payram-setup` skill for full details.

---

## Local Development Setup

**For local testing and development, use the commands below:**

## Prerequisites

- PayRam must be running (e.g. `./agent_run_local.sh` → choose Install or Restart).
- Default API: `http://localhost:8080`. For local, frontend URL is `http://localhost` (port 80).

---

## Commands

Run from repo root: `./agent_headless.sh [command]`

| Command | Purpose |
|--------|---------|
| *(none)* or `menu` | Show step menu; pick one step to run |
| `status` | Check API reachable and auth (token saved / valid) |
| `setup` | First-time: register root user + create default project |
| `signin` | Sign in; saves token to `.payraminfo/headless-tokens.env` |
| `ensure-config` | Seed `payram.frontend` and `payram.backend` for local API (needed for payment creation) |
| `ensure-wallet` | Create random BTC wallet or link existing to project (for payment links) |
| `deploy-scw` | Deploy ETH/EVM smart-contract deposit wallet; then auto-link to project |
| `create-payment-link [projectId] [email] [amountUSD]` | Create payment link; outputs single URL to open |
| `run` | Full flow: setup/signin → ensure-config/ensure-wallet → create payment link (prompts) |
| `reset-local [-y]` | Wipe local DB and API data; then run `./agent_run_local.sh` and choose Install PayRam |

---

## Environment variables

Set these for non-interactive or scripted runs.

| Variable | Default | Notes |
|----------|---------|--------|
| `PAYRAM_API_URL` | `http://localhost:8080` | Backend API base |
| `PAYRAM_EMAIL` | — | Root user email (setup/signin) |
| `PAYRAM_PASSWORD` | — | Root user password |
| `PAYRAM_PROJECT_NAME` | `Default Project` | Project name on setup |
| `PAYRAM_PAYMENT_EMAIL` | — | Customer email for payment link |
| `PAYRAM_PAYMENT_AMOUNT` | `10` | Amount in USD for payment link |
| `PAYRAM_CUSTOMER_ID` | from signin | Usually from token file after signin |
| `PAYRAM_FRONTEND_URL` | `http://localhost` | Used by ensure-config (local) |
| **deploy-scw** | | |
| `PAYRAM_ETH_RPC_URL` | `https://ethereum-sepolia-rpc.publicnode.com` | No API key needed. Placeholder values (e.g. YOUR_ACTUAL_ALCHEMY_KEY) are ignored and default used. |
| `PAYRAM_FUND_COLLECTOR` | deployer address | Cold wallet 0x (40 hex). Omit or leave empty to use deployer address from mnemonic. |
| `PAYRAM_SCW_NAME` | `Headless SCW` | Name for the SCW wallet |
| `PAYRAM_BLOCKCHAIN_CODE` | `ETH` | e.g. ETH, BASE, POLYGON |
| `PAYRAM_MNEMONIC` | — | Or mnemonic in `.payraminfo/headless-wallet-secret.txt` |

Token is read from `.payraminfo/headless-tokens.env` (created by signin). Deploy-scw uses mnemonic from that file or `PAYRAM_MNEMONIC`.

---

## Typical flow

1. **Start PayRam:** `./agent_run_local.sh` → option 1 (Install) or restart.
2. **Auth:** `./agent_headless.sh signin` (or setup if first time). Env: `PAYRAM_EMAIL`, `PAYRAM_PASSWORD`.
3. **Config (local):** `./agent_headless.sh ensure-config` so payment creation works.
4. **Wallet:** Either `./agent_headless.sh ensure-wallet` (BTC) or `./agent_headless.sh deploy-scw` (ETH SCW). deploy-scw needs Sepolia ETH on deployer address for gas (default RPC and fund collector).
5. **Payment link:** `./agent_headless.sh create-payment-link` or pass `[projectId] [email] [amountUSD]`. Use the printed URL as-is (keep `&host=...`).

---

## Payment link URL

- Use the **exact** URL printed (one block: "Open this in your browser"). Do not strip `host` or change `&`.
- If the payment page loads forever or shows `undefined` in API calls: the link must include `reference_id` and `host` with a real `&`. Fix any `\u0026` → `&` if the link was mangled.

---

## Deploy-scw (ETH SCW)

- **RPC:** Default PublicNode Sepolia (no key). Override with `PAYRAM_ETH_RPC_URL` if needed.
- **Fund collector:** Optional. Omit or press Enter to use deployer address (sweep to self). Set `PAYRAM_FUND_COLLECTOR` to a valid 0x address for a different cold wallet.
- **Gas:** Deployer address (from mnemonic) must have Sepolia ETH. If you see `INSUFFICIENT_FUNDS`, send testnet ETH to the deployer address shown in the log; use e.g. https://sepoliafaucet.com or https://www.alchemy.com/faucets/ethereum-sepolia.
- After success, the script registers the SCW and links it to the current project; no extra step.

---

## Reset and reinstall

- `./agent_headless.sh reset-local [-y]` clears DB and API data (and optionally Docker image).
- Then run `./agent_run_local.sh` and choose **1) Install PayRam** (not just Restart).

---

## Files and scripts

- **Token / secrets:** `.payraminfo/headless-tokens.env`, `.payraminfo/headless-wallet-secret.txt` (mnemonic). Do not commit.
- **Scripts:** `scripts/generate-deposit-wallet.js` (BTC), `scripts/generate-deposit-wallet-eth.js` (ETH xpub), `scripts/deploy-scw-eth.js` (SCW deploy). Run via headless commands; deploy-scw is invoked by `./agent_headless.sh deploy-scw`.

---

## Troubleshooting

| Issue | Action |
|-------|--------|
| API unreachable | Ensure PayRam is running (`./agent_run_local.sh`). Check `PAYRAM_API_URL`. |
| Auth expired / 401 | Run `./agent_headless.sh signin` again. |
| Payment creation 500 | Run `ensure-config` and `ensure-wallet` (or deploy-scw). Check backend logs: `docker logs payram 2>&1 \| tail -80`. |
| deploy-scw 401 on RPC | Do not use placeholder RPC URL; default (PublicNode) is used if env looks like a placeholder. |
| deploy-scw INSUFFICIENT_FUNDS | Send Sepolia ETH to the deployer address (from mnemonic) shown in the log. |
| Payment page loads forever | Use the payment URL exactly as returned; ensure `host` param and `&` are correct. |