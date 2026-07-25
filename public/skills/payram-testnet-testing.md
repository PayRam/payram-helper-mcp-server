---
name: payram-testnet-testing
description: Prove a PayRam install works end-to-end on testnet before touching real money — install on testnet, create a payment link, fund a wallet from a faucet, actually pay the link, and confirm the payment reaches FILLED. Covers Base Sepolia / Ethereum Sepolia funding, how a PayRam checkout takes payment, and every way to verify the result. Use when asked "how do I test PayRam", "send a test payment to the link", "how do I pay my own payment link", or before any mainnet go-live.
---

# Testing PayRam on Testnet

The whole point: send a real payment to your own link, on fake money, and watch PayRam detect it — so nothing is a surprise on mainnet.

## 1. Put the gateway on testnet

Install with **`--testnet`** (or `PAYRAM_NETWORK=testnet`). Chains run on their testnets (Base → **Base Sepolia**, Ethereum → **Sepolia**, Polygon → **Amoy**). Deploying the EVM smart-contract wallet needs testnet gas — **free from a faucet**, so no real cost.

> Reality check: testnet faucets are free but often gated (require an account, a mainnet balance, or a social post). If they block you, a ~$10 mainnet run is sometimes the faster proof. The agent flow warns about this.

## 2. Create a small payment link

```
./setup_payram_agents.sh create-payment-link   # or the create_payment_link MCP tool
# amount: keep it small, e.g. 1 USD
```
You get a URL like `https://<host>/payment?reference_id=…&host=…`. Open it — the hosted checkout shows the **chain/currency options and a deposit address** (+ QR).

## 3. Get testnet funds in a wallet

You (playing "the customer") need testnet crypto to send. Use MetaMask (or any wallet) on the **testnet** matching your gateway's chain:

- **Base Sepolia** (recommended — matches the default MVF):
  - ETH gas: `https://www.alchemy.com/faucets/base-sepolia`, `https://faucet.quicknode.com/base/sepolia`
  - Testnet USDC: Circle's testnet faucet (`faucet.circle.com`) → pick Base Sepolia.
- **Ethereum Sepolia:** `https://cloud.google.com/application/web3/faucet/ethereum/sepolia`, `https://www.alchemy.com/faucets/ethereum-sepolia`.
- **Polygon Amoy:** `https://faucet.polygon.technology`.

Add the testnet network to your wallet if it isn't there, and add the testnet USDC token by its contract address so you can see the balance.

## 4. Pay your own link

On the checkout page, pick the chain/currency you funded, then **send the shown amount from your testnet wallet to the deposit address** (scan the QR or copy the address). That's it — PayRam watches the chain for that deposit.

- Amounts don't have to be perfect: send a bit less → `PARTIALLY_FILLED`; exact → `FILLED`; more → `OVER_FILLED`. Try one on purpose to see how your integration handles it (this is exactly why the top-up pattern exists).

## 5. Verify it landed

Any of these confirms detection:
- **The checkout page** flips to paid/confirmed once the deposit confirms.
- **`lookup_payment`** (MCP) or the script's payment lookup — search by the `reference_id`, email, or tx hash → status should reach `FILLED`.
- **Webhook** — if you registered one, PayRam POSTs `{reference_id, status: FILLED, filled_amount_in_usd, ...}` to your endpoint.
- **`check_node_sync`** — if the payment doesn't show, check the chain's listener is running and in sync (a lagging node delays detection).

## 6. Round-trip checklist before mainnet

1. Gateway installed on testnet, `check_payment_readiness` green for your chain.
2. Payment link created; checkout shows a deposit address.
3. Wallet funded from a faucet; testnet USDC visible.
4. Paid the link; status reached `FILLED` (and your webhook fired, if used).
5. Tried an under/overpayment to confirm your app handles non-exact amounts.
6. `get_unswept_balances` shows the received funds and their sweep `action`.

Green on all six → switch to `--mainnet`, set your real cold-wallet address (`PAYRAM_FUND_COLLECTOR`), fund ~$10 of real gas, and you're live.
