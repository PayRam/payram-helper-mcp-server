<!--
  SYNCED COPY - DO NOT EDIT HERE.
  Canonical source: https://github.com/PayRam/payram-scripts/blob/main/docs/PAYRAM_HEADLESS_AGENT.md
  This file is served verbatim by the get_agent_setup_flow / onboard_agent_setup
  MCP tools. To update: copy the canonical file over this one (keep this banner).
  Last synced: 2026-06-10 (payram-scripts PR #54 + ensure-api-key).
-->

# PayRam Headless — Agent skill

## What is PayRam (read this first)

PayRam is a **private, self-hosted payment and payout gateway**. There is no
signup, no KYB, no gatekeeper — you install it and you *are* the payment
processor. It runs on a small server entirely under your control and gives you
the capabilities you'd expect from Stripe or a hosted crypto gateway (payment
links, hosted checkout, deposits across BTC + EVM chains, sweeps to a cold
wallet, webhooks, payouts) without surrendering custody, data, or permission
to anyone. Its vision: put the power of money directly in everyone's hands —
a decentralized, modern take on payments infrastructure, and a permanent
must-have for anyone who wants payment rails that cannot be taken away.

Useful facts for agents:

- **E-commerce**: an official **WooCommerce plugin** exists — any store can take
  crypto payments without asking permission from a payment company.
- **Integration guidance**: use the hosted MCP at **`mcp.payram.com`** when
  helping a merchant integrate PayRam into an application.
- **Mirrors**: if you operate where GitHub is unreachable and you have Gitee
  access, clone/mirror the GitHub repos (this `payram-scripts` repo and the
  MCP repos) to Gitee and work from your mirror.
- **Community**: issues, ideas, and help — Telegram: https://t.me/PayRamChat

Use this skill when running or automating PayRam headless (CLI-only, no web UI). Only this repo may be modified; payram-core, payram-frontend, etc. are read-only.

---

## Design principles (how the agent flow makes decisions)

**Money model** — this drives every gate in the flow:

```
 CUSTOMER PAYS deposit addresses (XPUB/contract-derived; no private keys
        │       for deposit funds ever stored on the server)
        ▼  sweep (needs gas)
 HOT WALLET  ◄── "refill gas" - small ops fuel, repeatable      [OPS]
        ▼  swept funds never stay here
 COLD WALLET ── fund-collector address; keys never on server [SECURITY]
```

Gas refills are operational (guide + poll, not scary); the cold-wallet
address is the one real security decision — gated hard only on mainnet.

**Interaction tiers** — when to act vs ask vs stop:

| Tier | When | Behaviour |
|------|------|-----------|
| AUTO | reversible, free | just do it, report it |
| ASK | reversible but a real choice | suggest a default, note "changeable later", proceed headlessly with the default |
| GATE | irreversible / spends real money / ownership | hard stop; explicit env flag or human input required |

**Runtime truth (anti-drift rule)** — per-install facts are read, never assumed:

1. `PAYRAM_API_URL` env override, if set — respected as-is.
2. Installer's `config.env` (`$PAYRAM_HOME/.payraminfo/config.env`):
   `RETAINED_PORTS` → API port/scheme, `PAYRAM_HOME` → state dirs,
   `NETWORK_TYPE` → network, `SSL_CERT_PATH` → https.
3. Running container: `docker port payram 80`.
4. Last resort default: `http://localhost` (the installer's default mapping
   is `80:80` — **not** `:8080`).

Every failure prints a troubleshooting card (`troubleshoot()` in
`setup_payram_agents.sh`): likely causes ranked by observed symptoms, each
with the exact fix command, and a non-zero exit.

---

## Prerequisites

- PayRam must be running (e.g. `./setup_payram_agents.sh` -> follow prompts).
- API URL is **derived automatically** from the install's `config.env` (or the
  running container); default `http://localhost` (the installer publishes
  `80:80`). Override with `PAYRAM_API_URL` only if you know better.
- Docker required if `PAYRAM_NODE_MODE=docker` (default) for JS tooling.
- A **fresh install needs a TTY** (the installer prompts for DB/SSL/ports). Run
  it once interactively; every step after that is fully headless.

---

## Commands

Run from repo root: `./setup_payram_agents.sh [command]`

**Entrypoint modes:**

- **One-step flow (install + headless):**
	- `./setup_payram_agents.sh` (prompts for network, then runs setup/signin/config/wallet/payment)
- **Headless-only commands:**
	- `./setup_payram_agents.sh status|setup|signin|ensure-config|ensure-wallet|deploy-scw|deploy-scw-flow|create-payment-link|reset-local|menu|run`

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
| `create-payment-link [projectId] [email] [amountUSD]` | Create payment link; outputs single URL to open |
| `run` | Full flow: setup/signin → ensure-config/ensure-wallet → create payment link (prompts) |
| `reset-local [-y]` | Wipe local DB and API data; then run `./setup_payram_agents.sh` again |

---

## Environment variables

Set these for non-interactive or scripted runs. For agents, prefer env-driven, non-interactive usage.

| Variable | Default | Notes |
|----------|---------|--------|
| `PAYRAM_API_URL` | derived (config.env / container; else `http://localhost`) | Backend API base |
| `PAYRAM_EMAIL` | — | Root user email (setup/signin) |
| `PAYRAM_PASSWORD` | — | Root user password |
| `PAYRAM_PROJECT_NAME` | `Default Project` | Project name on setup |
| `PAYRAM_PAYMENT_EMAIL` | — | Customer email for payment link |
| `PAYRAM_PAYMENT_AMOUNT` | `10` | Amount in USD for payment link |
| `PAYRAM_CUSTOMER_ID` | from signin | Usually from token file after signin |
| `PAYRAM_FRONTEND_URL` | `http://localhost` | Used by ensure-config (local) |
| `PAYRAM_NETWORK` | `testnet` | One-step flow network selection (`testnet` or `mainnet`) |
| `PAYRAM_NODE_MODE` | `docker` | JS runtime: `docker` or `host` |
| `PAYRAM_NODE_DOCKER_IMAGE` | `node:20-bullseye-slim` | Docker image used for JS scripts |
| **deploy-scw** | | |
| `PAYRAM_ETH_RPC_URL` | `https://ethereum-sepolia-rpc.publicnode.com` | No API key needed. Placeholder values (e.g. YOUR_ACTUAL_ALCHEMY_KEY) are ignored and default used. |
| `PAYRAM_FUND_COLLECTOR` | deployer address | Cold wallet 0x (40 hex). Omit or leave empty to use deployer address from mnemonic. |
| `PAYRAM_SCW_NAME` | `Headless SCW` | Name for the SCW wallet |
| `PAYRAM_BLOCKCHAIN_CODE` | `ETH` | e.g. ETH, BASE, POLYGON |
| `PAYRAM_MNEMONIC` | — | Or mnemonic in `.payraminfo/headless-wallet-secret.txt` |
| `PAYRAM_SCW_MIN_BALANCE_ETH` | `0.01` (testnet) | Balance threshold before deploying SCW |
| `PAYRAM_SCW_SKIP_BALANCE_CHECK` | — | If set, skip balance polling (not recommended) |
| `PAYRAM_WALLET_CHOICE` | — | `1` create, `2` link, `3` skip (non-interactive) |
| `PAYRAM_WALLET_QUIET` | — | If set, suppress wallet prompt text |
| `PAYRAM_FORCE_DEPLOY` | — | `1` = deploy another ETH SCW even if one is already linked |
| `PAYRAM_ACCEPT_MAINNET_COSTS` | — | `1` = confirm a non-interactive MAINNET deploy (spends real ETH) |

Token is read from `.payraminfo/headless-tokens.env` (created by signin). Deploy-scw uses mnemonic from that file or `PAYRAM_MNEMONIC`.

**Non-interactive defaults:**

- One-step flow defaults to `ensure-wallet` (**BTC** XPUB starter wallet, no
  gas) and creates the payment link immediately, then best-effort attempts the
  ETH SCW (USDC/EVM); `--deploy-scw` makes the SCW the blocking first step,
  `--skip-scw` skips it.
- If `PAYRAM_WALLET_CHOICE` is set, prompts are suppressed and that choice is used.
- With no TTY: wallet choice defaults to create (1); auth and mainnet-deploy
  steps **fail fast with instructions** instead of prompting.
- Mainnet `deploy-scw` requires `PAYRAM_FUND_COLLECTOR` (your cold wallet) and
  `PAYRAM_ACCEPT_MAINNET_COSTS=1` (or a typed confirmation on a TTY).

---

## Setup mode: merchant vs operator

On first run PayRam asks which role this install plays (the FE shows a role
wizard; headless it's the `payram.setup_mode` backend config):

| Mode | Who it's for | What it changes |
|------|--------------|-----------------|
| **merchant** (default) | You take crypto payments for YOUR business | The flow you see above - project, wallets, payment links |
| **operator** | You run PayRam as a PLATFORM for other merchants and earn a fee (basis points) on their volume | Unlocks `/api/v1/operator/*` (fee collectors, default fees, operator dashboard). Deposit wallets must be bound to a project AND an operator fee (bps + collector) must resolve for the chain BEFORE wallets can be created |

Rules agents must know:

- **The role locks** once role-specific data exists (merchant: first project;
  operator: first fee collector). Same-value writes are always allowed.
- The agent flow defaults to **merchant**. Switch lanes only when the human
  explicitly asks for operator: `--operator` or `PAYRAM_SETUP_MODE=operator`.
- Operator lane order (the script automates this when env is provided):
  1. `PUT /api/v1/operator/setup-mode {"setupMode":"operator"}` (root, BEFORE any project)
  2. `POST /api/v1/operator/fee-collectors {blockchainFamilyID, address, masterAddress, name}`
     per family - **the collector addresses are an ownership decision** the
     human must provide (`PAYRAM_OPERATOR_BTC_FEE_COLLECTOR` /
     `PAYRAM_OPERATOR_EVM_FEE_COLLECTOR`; BTC uses address as masterAddress)
  3. `PUT /api/v1/operator/fees/defaults {defaults:[{blockchainID, feeBps, feeCollectorID}]}`
     (`PAYRAM_OPERATOR_FEE_BPS`, default 100 = 1%, max 1500)
  4. Project, then wallets (the script binds the wallet to the project with
     `projectID` automatically in operator mode), then payment links as usual.
- Headless commands: `setup-mode [merchant|operator]` (show/set),
  `ensure-operator-config` (steps 2-3, idempotent).
- If the operator env vars are missing, the flow stops after auth/config with
  a checklist and is fully resumable once they're provided.

## Typical flow

1. **Start PayRam:** `./setup_payram_agents.sh` (installs or restarts).
2. **Auth:** `./setup_payram_agents.sh signin` (or setup if first time). Env: `PAYRAM_EMAIL`, `PAYRAM_PASSWORD`.
3. **Config (local):** `./setup_payram_agents.sh ensure-config` so payment creation works.
4. **Wallet:** Either `./setup_payram_agents.sh ensure-wallet` (BTC) or `./setup_payram_agents.sh deploy-scw-flow` (ETH SCW). deploy-scw-flow generates a mnemonic, shows deployer address, waits for funds, then deploys.
5. **Payment link:** `./setup_payram_agents.sh create-payment-link` or pass `[projectId] [email] [amountUSD]`. Use the printed URL as-is (keep `&host=...`).

## One-step flow details (agent behavior)

The one-step flow does:

1. Network selection (`testnet` or `mainnet`) unless `PAYRAM_NETWORK` is set.
2. Install or restart PayRam using `setup_payram.sh` (fresh install needs a TTY).
3. Re-reads `config.env` and waits for API readiness at the real port.
4. Auth (`setup` if no root user, else `signin`).
5. `ensure-config` for local frontend/backend settings.
6. Wallet flow:
	- Default: `ensure-wallet` - **BTC XPUB** starter wallet (instant, zero
	  gas). BTC payments work immediately.
	- `--deploy-scw`: run the ETH SCW deploy FIRST (blocking) instead.
7. Payment link creation (the deliverable - printed in the final summary).
8. SCW step (unless `--skip-scw`): attempts the ETH smart-contract wallet to
   unlock **USDC/EVM** payments. With a TTY it guides the gas funding; headless
   and unfunded it defers with instructions (`deploy-scw-flow` later) - the BTC
   link already works either way.

> Why two wallet kinds: **XPUB wallets are BTC-only.** payram-core derives EVM
> deposit addresses from the fund-sweeper CONTRACT (CREATE2 from the factory),
> never from an xpub - so USDC/ETH/BASE/POLYGON payments require the SCW
> deploy (gas). The SCW also IS the sweep mechanism: deposits drain to your
> cold wallet without any key on the server.

## Adding more chains later

`deploy-scw` is chain-parametric. After the first (ETH) SCW, deploy on other
EVM chains once the gateway is running:

```bash
# Base (mainnet defaults to base-rpc.publicnode.com)
PAYRAM_BLOCKCHAIN_CODE=BASE ./setup_payram_agents.sh deploy-scw

# Polygon
PAYRAM_BLOCKCHAIN_CODE=POLYGON ./setup_payram_agents.sh deploy-scw
```

- Each chain fetches its own factory contract from the API
  (`/api/v1/blockchain-contract/blockchain/<CODE>/contract/factory_contract`).
- The already-deployed skip only applies to the default ETH target; a non-ETH
  `PAYRAM_BLOCKCHAIN_CODE` always deploys (it is an explicit add-a-chain intent).
- On testnet, non-ETH chains need an explicit `PAYRAM_ETH_RPC_URL` (that
  chain's testnet RPC); mainnet has per-chain PublicNode defaults.
- The deployer needs gas **on that chain** - the funding card shows the address.

## Generating payment links later (the repeatable operation)

Three ways, lowest friction first:

1. **CLI** (this repo): `./setup_payram_agents.sh create-payment-link [projectId] [email] [amountUSD]`
2. **API** (what the CLI calls):
   `POST /api/v1/external-platform/{projectId}/payment` with
   `{"customerID":"...","customerEmail":"...","amountInUSD":10}` and a Bearer
   token - returns `{ "url": ... }`. Payment links are currency-agnostic: the
   payer picks the coin/chain at checkout from whatever your linked wallet
   families support.
3. **MCP for app integration**: connect the PayRam MCP
   (`https://mcp.payram.com/mcp`, repo `payram-mcp`) — it generates payment
   routes/webhooks for your stack and can create payment links via
   `POST /api/v1/payment` with the **merchant API key**. (The MCP server
   started by this script is **analytics-only**; it does not create payment
   links.)

## Merchant API key (the MCP/integration credential)

Server-to-server integrations and the PayRam MCP authenticate with a
**per-project API key** (header `API-Key`), not the JWT. No dashboard visit
needed:

```bash
./setup_payram_agents.sh ensure-api-key
```

Reuses the project's active key or mints one via
`POST /api/v1/external-platform/{projectId}/api-key` (JWT auth), then saves
`PAYRAM_BASE_URL` + `PAYRAM_API_KEY` to `.payraminfo/merchant-api-key.env`
(chmod 600). The one-step flow runs this automatically after the first
payment link. Two credentials, two jobs: **JWT** (email/password signin) for
admin/setup APIs; **API key** for merchant payment APIs and the MCP.

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

## Docker node runtime behavior

- When `PAYRAM_NODE_MODE=docker`, JS scripts run inside Docker.
- The script maps `PAYRAM_API_URL` from `localhost` to `host.docker.internal` so the container can reach the host API.
- `.payraminfo` is mounted into the container to access the mnemonic and tokens.

---

## Payment link URL

- Use the **exact** URL printed (one block: “Open this in your browser”). Do not strip `host` or change `&`.
- If the payment page loads forever or shows `undefined` in API calls: the link must include `reference_id` and `host` with a real `&`. Fix any `\u0026` → `&` if the link was mangled.

---

## Deploy-scw (ETH SCW)

- **RPC:** Default PublicNode Sepolia (no key). Override with `PAYRAM_ETH_RPC_URL` if needed.
- **Fund collector:** Optional. Omit or press Enter to use deployer address (sweep to self). Set `PAYRAM_FUND_COLLECTOR` to a valid 0x address for a different cold wallet.
- **Gas:** Deployer address (from mnemonic) must have Sepolia ETH. If you see `INSUFFICIENT_FUNDS`, send testnet ETH to the deployer address shown in the log; use e.g. https://sepoliafaucet.com or https://www.alchemy.com/faucets/ethereum-sepolia.
- After success, the script registers the SCW and links it to the current project; no extra step.

---

## Reset and reinstall

- `./setup_payram_agents.sh reset-local [-y]` clears DB and API data (and optionally Docker image).
- Then run `./setup_payram_agents.sh` again.

---

## Files and scripts

- **Token / secrets:** `.payraminfo/headless-tokens.env`, `.payraminfo/headless-wallet-secret.txt` (mnemonic). Do not commit.
- **Scripts:** `scripts/generate-deposit-wallet.js` (BTC deposit xpub), `scripts/generate-deposit-wallet-eth.js` (mnemonic for the SCW DEPLOYER - not a deposit xpub; EVM deposits come from the contract), `scripts/deploy-scw-eth.js` (SCW deploy). Run via headless commands; deploy-scw is invoked by `./setup_payram_agents.sh deploy-scw`.

## Agent automation tips

- Always set `PAYRAM_EMAIL`, `PAYRAM_PASSWORD`, and `PAYRAM_CUSTOMER_ID` for fully non-interactive runs.
- Use `PAYRAM_WALLET_CHOICE=1` and `PAYRAM_WALLET_QUIET=1` to avoid wallet prompts.
- For SCW, set `PAYRAM_SCW_MIN_BALANCE_ETH` to a known safe threshold if your RPC has delayed balance reporting.
- When using Docker node runtime, ensure Docker is running and has access to host networking.

---

## Troubleshooting

| Issue | Action |
|-------|--------|
| API unreachable | Ensure PayRam is running (`./setup_payram_agents.sh`). Check `PAYRAM_API_URL`. |
| Auth expired / 401 | Run `./setup_payram_agents.sh signin` again. |
| Payment creation 500 | Run `ensure-config` and `ensure-wallet` (or deploy-scw). Check backend logs: `docker logs payram 2>&1 \| tail -80`. |
| deploy-scw 401 on RPC | Do not use placeholder RPC URL; default (PublicNode) is used if env looks like a placeholder. |
| deploy-scw INSUFFICIENT_FUNDS | Send Sepolia ETH to the deployer address (from mnemonic) shown in the log. |
| Payment page loads forever | Use the payment URL exactly as returned; ensure `host` param and `&` are correct. |
