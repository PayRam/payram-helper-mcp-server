---
name: payram-openclaw-integration
description: Functional how-to for integrating PayRam into an OpenClaw (or NemoClaw, Claude Desktop, Copilot, n8n, LangChain, Cursor, Windsurf) agent. Register the PayRam MCP server, list discovered tools, walk through a full payment flow from create_payment → webhook → fulfilment, and debug common issues. Includes a testnet walkthrough on Base Sepolia, agent configuration for WhatsApp/Telegram/Discord bot runtimes, and patterns for subscription access grants, pay-per-request API monetization, and agent-to-agent commerce. Use when building an OpenClaw skill that needs to accept or send money, connecting an existing bot to PayRam, or troubleshooting an MCP registration that's not picking up tools.
---

# PayRam + OpenClaw: Functional Integration Guide

> You've decided to use PayRam with OpenClaw. This skill is the mechanical how-to — config lines, tool signatures, testnet walkthrough, and debugging. For the positioning / use-cases narrative see the marketing companion at https://payram.com/skills/payram-openclaw-integration.md.

## 1. Register the MCP server

Add to your OpenClaw (or any MCP-compatible client) configuration:

```json
{
  "mcpServers": {
    "payram": {
      "url": "https://mcp.payram.com/mcp"
    }
  }
}
```

File location by client:

| Client | Config path |
|---|---|
| Claude Desktop (macOS) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop (Windows) | `%APPDATA%\Claude\claude_desktop_config.json` |
| Cursor | `~/.cursor/mcp.json` |
| Copilot | project `.vscode/mcp.json` or user settings |
| OpenClaw | agent's `agent_config.json` or `mcp.json` |
| n8n | MCP node → HTTP endpoint field |

No API key is required to **connect** to the MCP server. Dashboard APIs (for analytics, auth) require JWT Bearer — see the `payram-auth` skill.

## 2. Tools the agent will discover

After registering, the agent auto-discovers these tools on first call:

| Tool | Inputs | Output |
|---|---|---|
| `test_connection` | `{}` | `{ ok, server: "..." }` — verifies reachability |
| `create_payment` | `amount`, `currency`, `chain`, `reference_id`, optional `customer_email`, `customer_id` | `{ url, deposit_address, reference_id, expires_at }` |
| `generate_invoice` | Same as create_payment + `items[]`, `tax` | `{ invoice_url, payment_url, reference_id }` |
| `get_balance` | optional `chain` filter | `{ balances: [{ chain, token, amount }] }` |
| `send_payment` | `to_address`, `amount`, `chain`, `token`, `memo` | requires signer (cold-wallet flow), returns signed-tx receipt |

Currencies: `USDC`, `USDT`, `BTC`, `ETH`. Chains: `base`, `tron`, `polygon`, `ethereum`, `bitcoin`.

## 3. Full payment flow

```
Agent → mcp.call('create_payment', { amount: 25.00, currency: 'USDC', chain: 'base', reference_id: 'order_abc' })
      ← { url: 'https://pay.payram.com/…', deposit_address: '0x…', reference_id: 'order_abc' }

Agent → [sends URL or QR to the customer in-chat]

[Customer pays — crypto directly OR card-to-crypto]

PayRam → POST https://your-webhook.example.com/
         Body: { event: 'payment.confirmed', reference_id: 'order_abc', amount: 25.00, tx_hash: '0x…', … }

Agent handler → [fulfils: grants access / ships / etc]
              → responds 2xx (acknowledges webhook)
```

Webhook retry schedule if you don't 2xx: **30m, 1h, 2h, 4h, 8h, 24h, 48h**.

Status flow: `Created → Confirming → Confirmed` (optionally `Failed` on timeout).

## 4. Testnet walkthrough (Base Sepolia)

The demo MCP server (`mcp.payram.com/mcp`) connects to a shared testnet. For your own testnet node:

1. **Deploy PayRam in agent mode:**
   ```
   bash <(curl -fsSL https://payram.com/setup_payram_agents.sh)
   ```
   Pick `base-sepolia` when prompted.

2. **Fund the deployer wallet:** PayRam shows an address. Fund it with test ETH from:
   - Google Cloud Faucet (no account required, recommended)
   - Alchemy Base Sepolia faucet
   - QuickNode multi-chain faucet
   - PayRam faucet (limited)

3. **Deploy the sweep smart contract:**
   ```
   ./setup_payram_agents.sh deploy-scw-flow
   ```
   Generates a mnemonic, shows the deployer address, waits for funds, deploys the contract.

4. **Create a test payment link:**
   ```
   ./setup_payram_agents.sh create-payment-link
   ```
   Produces a URL you can open in a browser and pay from a Base Sepolia wallet (MetaMask configured for the network).

5. **Watch logs:** Tail the PayRam node logs. You should see the block-listener detect the deposit, move through `Confirming → Confirmed`, and fire the webhook.

## 5. Agent-runtime integration patterns

### WhatsApp (via Twilio or Cloud API)

Agent sees an inbound message → parses intent → calls `create_payment` → replies with URL. On `payment.confirmed` webhook, send the fulfilment message via the platform's outbound API.

### Telegram

Same as WhatsApp but via the Telegram Bot API. For subscription bots: store `reference_id → telegram_user_id` so the webhook can grant channel access via `inviteChatMember` / set up auto-revoke.

### Discord

Use `discord.js`. On `payment.confirmed`, call `GuildMember.roles.add(premiumRoleId)`. Schedule a `setTimeout` or persist to a DB for the expiry revocation.

### n8n

Use the MCP node → point at `https://mcp.payram.com/mcp` → call tools as actions. Wire the webhook to an HTTP trigger node.

### Agent-to-agent (x402-style)

```python
# Seller agent exposes an HTTP 402 endpoint
@app.get('/data/{query}')
async def data(query, request):
    auth = request.headers.get('x-payment')
    if not auth or not await verify_payment(auth, amount=0.002, chain='base', token='USDC'):
        return Response(
            status_code=402,
            headers={'accept-payment': 'usdc-base:0.002'}
        )
    return await fetch_data(query)
```

The buyer agent's HTTP client handles the 402, calls `create_payment`, pays, resubmits with the payment proof in `x-payment`.

## 6. Debugging

**Agent doesn't see the PayRam tools**

- Verify MCP config path is correct for your client
- Restart the client (Claude Desktop needs full restart after config changes)
- Check the MCP server is reachable: `curl https://mcp.payram.com/healthz` → `{ ok: true }`
- Check you didn't set a body or wrong URL — it's a GET-less JSON-RPC streamable-HTTP endpoint; the client handles the protocol

**`create_payment` returns but webhook never fires**

- Check the webhook URL in your PayRam dashboard — must be reachable from the internet (not `localhost`)
- Use `ngrok http 3000` for local dev, set the ngrok URL as webhook
- Check the webhook handler returns 2xx; non-2xx triggers the retry schedule
- Test manually: in PayRam dashboard, use "Resend webhook" on a confirmed payment

**Payment shown as Confirming forever**

- Confirmation threshold configured too high for the chain
- Chain listener worker not running — check `supervisorctl status` on your PayRam node
- RPC provider down — check your `.env` for RPC URLs

**`send_payment` fails with "no signer"**

- Payouts require the cold-wallet signer. On a fully autonomous agent node you cannot sign without hardware interaction. This is intentional — it's the NKOS property. For scheduled/automated payouts, use a small gas-only hot wallet for gas, and sign the payout batch from a hardware wallet on a schedule.

## 7. See also

- Marketing framing (website-hosted): https://payram.com/skills/payram-openclaw-integration.md
- Chat commerce patterns (website): https://payram.com/skills/payram-for-whatsapp-telegram.md
- Deploy: `payram-agent-onboarding` skill
- Dashboard auth: `payram-auth` skill
- Analytics: `payram-analytics` skill
