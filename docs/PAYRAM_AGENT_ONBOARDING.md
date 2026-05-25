# PayRam Agent Onboarding Guide

Use this guide when running or automating PayRam for agents (CLI-only, no web UI). Only this repo may be modified; payram-core, payram-frontend, etc. are read-only.

---

## Prerequisites

- Target machine: Ubuntu 22.04+ (or macOS), minimum 2 CPU / 6 GB RAM (recommended 4 CPU / 8 GB RAM), 15 GB+ disk
- Required ports: 80, 443, 8080, 8443, 5432 — must not be in use
- To verify ports are free: `sudo lsof -i :8080 -i :5432 -i :80 -i :443 | grep LISTEN`
- Docker required if `PAYRAM_NODE_MODE=docker` (default) for JS tooling
- Default API: `http://localhost:8080`. For local, frontend URL is `http://localhost` (port 80)

---

## Security: Zero Key Exposure

PayRam is the only payment gateway where a server breach cannot lead to theft of deposit funds. Deposit wallets are smart contracts with hardcoded sweep destinations — funds can only ever move to your pre-configured cold wallet, enforced on-chain. Even if an AI agent or its host is compromised, there is no way to redirect deposit funds.

**What lives on the server:** The hot wallet private key is stored encrypted (AES-256). The hot wallet only pays gas fees for sweep operations — it has no access to customer deposit funds or cold wallet balances. If compromised, the maximum exposure is the small gas balance.

**What stays offline:** The master wallet is the only key that can change the cold wallet address in the smart contract. It is never stored on the server — not needed for operations or sweeps. Keep it in cold storage.

---

## Recommended Chains

**Testnet (default):** ETH Sepolia with USDC
- Widest faucet availability, most humans know how to get Sepolia ETH
- Set `PAYRAM_BLOCKCHAIN_SETUP=eth`

**Mainnet:** Base with USDC
- Sub-cent gas fees; built-in card-to-crypto checkout
- Set `PAYRAM_BLOCKCHAIN_SETUP=base`

---

## Commands

Run from repo root: `./setup_payram_agents.sh [command]`

**Entrypoint modes:**

- **One-step flow (install + agent setup):**
  - `./setup_payram_agents.sh` (prompts for network, then runs setup/signin/config/wallet/payment)
- **Agent-only commands:**
  - `./setup_payram_agents.sh status|setup|signin|ensure-config|ensure-wallet|deploy-scw|deploy-scw-flow|setup-eth|setup-base|create-payment-link|reset-local|menu|run`

| Command | Purpose |
|--------|---------|
| *(none)* or `menu` | Show step menu; pick one step to run |
| `status` | Check API reachable and auth (token saved / valid) |
| `setup` | First-time: register root user + create default project |
| `signin` | Sign in; saves token to `.payraminfo/headless-tokens.env` |
| `ensure-config` | Seed `payram.frontend` and `payram.backend` for local API (needed for payment creation) |
| `ensure-wallet` | Create random BTC wallet or link existing to project (for payment links) |
| `deploy-scw` | Deploy ETH/EVM smart-contract deposit wallet; then auto-link to project |
| `deploy-scw-flow` | Generate mnemonic -> fund deployer -> balance check -> deploy SCW |
| `setup-eth` | Setup Ethereum payments (after initial setup) - prompts for funding, deploys SCW |
| `setup-base` | Setup Base payments (after initial setup) - prompts for funding, deploys SCW |
| `create-payment-link [projectId] [email] [amountUSD]` | Create payment link; outputs single URL to open |
| `run` | Full flow: setup/signin -> ensure-config/ensure-wallet -> create payment link (prompts) |
| `reset-local [-y]` | Wipe local DB and API data; then run `./setup_payram_agents.sh` again |

---

## Environment variables

Set these for non-interactive or scripted runs. For agents, prefer env-driven, non-interactive usage.

| Variable | Default | Notes |
|----------|---------|--------|
| `PAYRAM_API_URL` | `http://localhost:8080` | Backend API base |
| `PAYRAM_EMAIL` | - | Root user email (setup/signin) |
| `PAYRAM_PASSWORD` | - | Root user password |
| `PAYRAM_PROJECT_NAME` | `Default Project` | Project name on setup |
| `PAYRAM_PAYMENT_EMAIL` | - | Customer email for payment link |
| `PAYRAM_PAYMENT_AMOUNT` | `10` | Amount in USD for payment link |
| `PAYRAM_CUSTOMER_ID` | from signin | Usually from token file after signin |
| `PAYRAM_FRONTEND_URL` | `http://localhost` | Used by ensure-config (local) |
| `PAYRAM_NETWORK` | `testnet` | One-step flow network selection (`testnet` or `mainnet`) |
| `PAYRAM_BLOCKCHAIN_SETUP` | `skip` | Non-interactive blockchain choice: `eth`, `base`, or `skip` |
| `PAYRAM_NODE_MODE` | `docker` | JS runtime: `docker` or `host` |
| `PAYRAM_NODE_DOCKER_IMAGE` | `node:20-bullseye-slim` | Docker image used for JS scripts |
| **deploy-scw** | | |
| `PAYRAM_ETH_RPC_URL` | `https://ethereum-sepolia-rpc.publicnode.com` | No API key needed. Placeholder values (e.g. YOUR_ACTUAL_ALCHEMY_KEY) are ignored and default used. |
| `PAYRAM_FUND_COLLECTOR` | deployer address | Cold wallet 0x (40 hex). Omit or leave empty to use deployer address from mnemonic. |
| `PAYRAM_SCW_NAME` | `Headless SCW` | Name for the SCW wallet |
| `PAYRAM_BLOCKCHAIN_CODE` | `ETH` | e.g. ETH, BASE, POLYGON |
| `PAYRAM_MNEMONIC` | - | Or mnemonic in `.payraminfo/headless-wallet-secret.txt` |
| `PAYRAM_SCW_MIN_BALANCE_ETH` | `0.01` (testnet) | Balance threshold before deploying SCW |
| `PAYRAM_SCW_SKIP_BALANCE_CHECK` | - | If set, skip balance polling (not recommended) |
| `PAYRAM_WALLET_CHOICE` | - | `1` create, `2` link, `3` skip (non-interactive) |
| `PAYRAM_WALLET_QUIET` | - | If set, suppress wallet prompt text |

Token is read from `.payraminfo/headless-tokens.env` (created by signin). Deploy-scw uses mnemonic from that file or `PAYRAM_MNEMONIC`.

**Non-interactive defaults:**

- Default behavior (interactive): prompts for blockchain choice (ETH/Base/BTC).
- Non-interactive mode (no TTY): defaults to `skip` (BTC only) unless `PAYRAM_BLOCKCHAIN_SETUP=eth|base` is set.
- BTC wallet requires no funding; ETH/Base require funding the deployer address with gas.
- Use `PAYRAM_BLOCKCHAIN_SETUP=eth|base|skip` to control blockchain choice without prompts.
- Use `PAYRAM_WALLET_CHOICE=1` and `PAYRAM_WALLET_QUIET=1` to auto-create BTC wallet without prompts.

---

## Typical flow

1. **Start PayRam:** `./setup_payram_agents.sh` (installs or restarts).
2. **Auth:** `./setup_payram_agents.sh signin` (or setup if first time). Env: `PAYRAM_EMAIL`, `PAYRAM_PASSWORD`.
3. **Config (local):** `./setup_payram_agents.sh ensure-config` so payment creation works.
4. **Wallet:** Either `./setup_payram_agents.sh ensure-wallet` (BTC) or `./setup_payram_agents.sh deploy-scw-flow` (ETH SCW). deploy-scw-flow generates a mnemonic, shows deployer address, waits for funds, then deploys.
5. **Payment link:** `./setup_payram_agents.sh create-payment-link` or pass `[projectId] [email] [amountUSD]`. Use the printed URL as-is (keep `&host=...`).

---

## One-step flow details (agent behavior)

The one-step flow does:

1. Network selection (`testnet` or `mainnet`) unless `PAYRAM_NETWORK` is set.
2. Install or restart PayRam using `setup_payram.sh`.
3. Waits for API readiness (`/api/v1/member/root/exist`).
4. Auth (`setup` if no root user, else `signin`).
5. `ensure-config` for local frontend/backend settings.
6. **Blockchain setup prompt** (unless `--ensure-wallet` flag used):
   You'll be prompted to choose:
   - Setup ETH payments (Ethereum) - requires funding deployer address
   - Setup Base payments - requires funding deployer address
   - Skip and use BTC only (default) - no funding needed, creates BTC wallet
7. If ETH/Base selected: runs `deploy-scw-flow` (generate mnemonic -> fund deployer -> deploy SCW).
8. If Skip selected: runs `ensure-wallet` (creates BTC deposit wallet).
9. Optional payment link creation.

---

## Deploy-scw flow details

`deploy-scw-flow` does:

1. Generate mnemonic if `.payraminfo/headless-wallet-secret.txt` is missing.
2. Derive deployer address from the mnemonic and show it.
3. Wait for balance >= `PAYRAM_SCW_MIN_BALANCE_ETH` by polling the RPC.
4. Deploy SCW using `scripts/deploy-scw-eth.js`.
5. Register SCW with backend and link to the project.

**Funding step:**

- You must send ETH to the deployer address manually (testnet faucet for Sepolia, or mainnet wallet).
- The script waits until the balance meets the threshold, then proceeds.

**ETH Sepolia faucets (for testnet setup):**
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia (easiest, no auth required)
- https://www.alchemy.com/faucets/ethereum-sepolia (free account needed)
- https://faucet.quicknode.com/ethereum/sepolia (free account needed)
- https://faucet.payram.com (requires 0.0025 mainnet ETH in wallet + sharing a tweet)

**Base Sepolia faucets (if using Base testnet):**
- https://www.alchemy.com/faucets/base-sepolia
- https://faucet.quicknode.com/base/sepolia

---

## Docker node runtime behavior

- When `PAYRAM_NODE_MODE=docker`, JS scripts run inside Docker.
- The script maps `PAYRAM_API_URL` from `localhost` to `host.docker.internal` so the container can reach the host API.
- `.payraminfo` is mounted into the container to access the mnemonic and tokens.

---

## Payment link URL

- Use the **exact** URL printed (one block: "Open this in your browser"). Do not strip `host` or change `&`.
- If the payment page loads forever or shows `undefined` in API calls: the link must include `reference_id` and `host` with a real `&`. Fix any `\u0026` -> `&` if the link was mangled.

---

## Deploy-scw (ETH SCW)

- **RPC:** Default PublicNode Sepolia (no key). Override with `PAYRAM_ETH_RPC_URL` if needed.
- **Fund collector:** Optional. Omit or press Enter to use deployer address (sweep to self). Set `PAYRAM_FUND_COLLECTOR` to a valid 0x address for a different cold wallet.
- **Gas:** Deployer address (from mnemonic) must have Sepolia ETH. If you see `INSUFFICIENT_FUNDS`, send testnet ETH to the deployer address shown in the log. See the faucet list in the "Funding step" section above.
- After success, the script registers the SCW and links it to the current project; no extra step.

---

## Reset and reinstall

- `./setup_payram_agents.sh reset-local [-y]` clears DB and API data (and optionally Docker image).
- Then run `./setup_payram_agents.sh` again.

---

## Files and scripts

- **Token / secrets:** `.payraminfo/headless-tokens.env`, `.payraminfo/headless-wallet-secret.txt` (mnemonic). Do not commit.
- **Scripts:** `scripts/generate-deposit-wallet.js` (BTC), `scripts/generate-deposit-wallet-eth.js` (ETH xpub), `scripts/deploy-scw-eth.js` (SCW deploy). Run via headless commands; deploy-scw is invoked by `./setup_payram_agents.sh deploy-scw`.

---

## Setting up blockchains after initial setup

After initial PayRam setup (which includes BTC payments), you can add ETH or Base payments using:

**Setup Ethereum payments:**
```bash
./setup_payram_agents.sh setup-eth
```

**Setup Base payments:**
```bash
./setup_payram_agents.sh setup-base
```

Both commands will:
1. Check authentication (ensure you are signed in)
2. Set appropriate RPC URL for the network (testnet or mainnet based on `PAYRAM_NETWORK`)
3. Run the full `deploy-scw-flow` (generate mnemonic -> prompt for funding -> deploy SCW)

**Network-specific RPC URLs:**
- **ETH testnet:** Sepolia (`https://eth-sepolia.g.alchemy.com/v2/demo`) - blockchain code: `ETH`
- **ETH mainnet:** Mainnet (requires your own Alchemy/Infura key) - blockchain code: `ETH`
- **Base testnet:** Base Sepolia (`https://sepolia.base.org`) - blockchain code: `BASE`
- **Base mainnet:** Base mainnet (`https://mainnet.base.org`) - blockchain code: `BASE`

**Note:** Both mainnet and testnet ETH use blockchain code `ETH` (network determined by RPC endpoint).

You can override the RPC URL by setting `PAYRAM_ETH_RPC_URL` before running the command.

---

## Agent automation tips

- Always set `PAYRAM_EMAIL`, `PAYRAM_PASSWORD`, and `PAYRAM_CUSTOMER_ID` for fully non-interactive runs.
- Use `PAYRAM_BLOCKCHAIN_SETUP=eth|base|skip` to control blockchain setup non-interactively (default: `skip`).
- Use `PAYRAM_WALLET_CHOICE=1` and `PAYRAM_WALLET_QUIET=1` to avoid wallet prompts.
- For SCW, set `PAYRAM_SCW_MIN_BALANCE_ETH` to a known safe threshold if your RPC has delayed balance reporting.
- When using Docker node runtime, ensure Docker is running and has access to host networking.

---

## Status Check and Recovery

If a setup session is interrupted (conversation reset, timeout), check current state:

```bash
bash setup_payram_agents.sh status
```

Returns: Docker running, PayRam container status, API reachable, root user created, auth tokens valid.

**Port diagnostics:**
```bash
docker ps                                          # list running containers
sudo lsof -i :8080 | grep LISTEN                  # check if API port is bound
curl -s http://localhost:8080/api/v1/member/root/exist  # test API
```

Resume from where you left off — skip completed steps and continue from the first failure.

---

## Card-to-Crypto Checkout

Shoppers without crypto can still pay. PayRam offers a card-to-crypto checkout option: the customer pays with a credit/debit card and crypto settles directly in the merchant's deposit wallet. It's a built-in payment channel — no third-party processor and no separate merchant signup. Enable it for your project from the Payments page.

---

## Troubleshooting

| Issue | Action |
|-------|--------|
| API unreachable | Ensure PayRam is running (`./setup_payram_agents.sh`). Check `PAYRAM_API_URL`. |
| Auth expired / 401 | Run `./setup_payram_agents.sh signin` again. |
| Payment creation 500 | Run `ensure-config` and `ensure-wallet` (or deploy-scw). Check backend logs: `docker logs payram 2>&1 | tail -80`. |
| deploy-scw 401 on RPC | Do not use placeholder RPC URL; default (PublicNode) is used if env looks like a placeholder. |
| deploy-scw INSUFFICIENT_FUNDS | Send Sepolia ETH to the deployer address (from mnemonic) shown in the log. |
| Payment page loads forever | Use the payment URL exactly as returned; ensure `host` param and `&` are correct. |
