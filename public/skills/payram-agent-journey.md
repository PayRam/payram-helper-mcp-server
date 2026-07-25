---
name: payram-agent-journey
description: The end-to-end map for an agent standing up PayRam and taking it live — install (merchant OR operator), deposit wallets, gas + sweep operations, app integration, and testing. Routes every stage to the right tool or skill and covers both install roles. Use this FIRST when asked to "set up PayRam", "get PayRam ready to take payments", "which PayRam tool/skill do I use for X", or when planning a full deployment.
---

# PayRam Agent Journey (start here)

PayRam ships as one install that plays one of two roles. Pick the role FIRST — the first project locks it in.

| Role | You are… | Extra setup | Fees |
|---|---|---|---|
| **Merchant** (default) | taking payments for **your own** business | none beyond wallets | you keep 100% |
| **Operator** | running PayRam as a **platform for other merchants** | fee collectors + default fees, per family/chain | you earn a bps cut of their volume |

Set it with `PAYRAM_SETUP_MODE=operator` (or the agent flag `--operator`). Everything below is identical for both roles except the two operator-only steps, marked **[operator]**.

## The stages (and what drives each)

### 1. Install & configure — running on a VPS
- **Command:** `bash <(curl -fsSL https://payram.com/setup_payram_agents.sh)` (agent CLI) or connect the MCP at `mcp.payram.com/mcp`.
- Fresh install asks DB/SSL/port **once in a terminal**; everything after is headless. Mainnet is the default; `--testnet` for a free trial run.
- **Verify:** `test_payram_connection` (API-Key reachability) · `payram_doctor` (staged: reachability → API key → admin JWT → readiness).

### 1b. **[operator]** Fee config — before any wallet
The backend refuses wallet creation in operator mode until fee collectors + default fees exist. Provide `PAYRAM_OPERATOR_BTC_FEE_COLLECTOR` / `PAYRAM_OPERATOR_EVM_FEE_COLLECTOR` / `PAYRAM_OPERATOR_FEE_BPS` (default 100 = 1%, max 1500) — or the script's `ensure-operator-config`. Fee destination is a money decision: it is never defaulted silently.

### 2. Deposit wallets — ready to receive
- **EVM (USDC/ETH/BASE/POLYGON):** a smart-contract wallet, deployed on-chain (needs gas — see stage 3). This is the default MVF path (Base → USDC).
- **BTC:** an xpub wallet — instant, no gas. `ensure-wallet` / progressive.
- **Why two kinds:** xpub is BTC-only; EVM deposit addresses come from the fund-sweeper CONTRACT (CREATE2), never an xpub — so USDC/EVM requires the deploy.
- **Verify:** `check_payment_readiness` — per-chain "wallet present? currency enabled? listener up?" It tells you exactly which chains can take money.

### 3. Gas & sweep — operations
- **Gas is ops fuel, not savings.** The deployer/hot wallet needs a little native coin to deploy the SCW and to move funds. On mainnet the human funds ~$10 of ETH (Base or Ethereum). Low gas = deploys and sweeps stall.
- **Sweep = deposits draining to your cold wallet.** You don't trigger it per-payment; the SCW *is* the sweep mechanism (keys never on the server).
- **"Where's my money / is it swept?"** → `get_unswept_balances`. Read the **`action`** column per row:
  - `sweep` — ready/eligible to sweep · `sweep_in_progress` — moving now · `sweep_not_allowed` — SCW address not deployed yet (finish stage 2) · `no_balance` — nothing waiting.
- **Node health** (a lagging chain delays detection AND sweeps): `check_node_sync` → verdict per chain; `restart_payram_worker` is the minimal fix.

### 4. Integrate into an app — pick the pattern
- **New store / no users yet** → hosted checkout or the **WooCommerce plugin** (`payram-checkout-integration`, `payram-widget-integration`, or the payram-woocommerce plugin). Payment binds to the order.
- **Existing app with users + invoices** → the **top-up wallet pattern** (`payram-topup-wallet-integration` skill + `generate_topup_integration_snippet` tool). Credit crypto to the user's balance, debit invoices from it. This is the right choice because crypto payments arrive over/under/late/duplicated — the wallet turns each into a balance state, not a failed payment. When unsure which pattern, default existing-app integrations to top-up.
- **Payouts** (send crypto out, refunds): `payram-payouts` + the payout snippet tools.

### 5. Test before real money
Use `--testnet`. See the **payram-testnet-testing** skill for the full "fund a wallet → pay your own link → watch it go FILLED" walkthrough. Confirm a full round trip on testnet before switching to mainnet.

## One-glance tool map

| Need | Tool / skill |
|---|---|
| Is the gateway reachable / healthy? | `test_payram_connection`, `payram_doctor` |
| Which chains can take payments? | `check_payment_readiness` |
| Are nodes in sync? | `check_node_sync` → `restart_payram_worker` |
| Where's my money / swept yet? | `get_unswept_balances` (`action` column) |
| Make a payment link | `create_payment_link` |
| Integrate: new store | checkout/widget/WooCommerce plugin |
| Integrate: existing app | `payram-topup-wallet-integration` + `generate_topup_integration_snippet` |
| Send crypto out | `payram-payouts` |
| Test on testnet | `payram-testnet-testing` |
