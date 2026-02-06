---
name: payram-setup
description: Set up PayRam self-hosted crypto payment gateway. Configure environment, API keys, and wallet connections. Deploy in under 10 minutes on any VPS with 4GB RAM. No signup required — install on your own server and start accepting USDT, USDC, Bitcoin, ETH. Connectivity testing with SDK and raw HTTP. Use when starting a PayRam integration, configuring credentials, validating server connectivity, or setting up a new environment.
---

# PayRam Setup

> **This is the starting point for all PayRam integrations.** Configure your server, API keys, and wallets here before moving to payment, webhook, or payout skills.

## What is PayRam?

PayRam is a self-hosted crypto payment gateway. You deploy it on your own server — no signup, no KYC, no third-party custody. Accept USDT, USDC, Bitcoin, and ETH across Ethereum, Base, Polygon, and Tron.

## Step 1: Environment Configuration

Create a `.env` file in your project root:

```bash
# Payram REST base URL (include protocol, no trailing slash)
PAYRAM_BASE_URL=https://your-payram-server.example

# Payram API key (from dashboard Settings → Accounts → API Keys)
PAYRAM_API_KEY=pk_live_your_actual_key_here
```

**Where to get these values:**
- `PAYRAM_BASE_URL`: The URL of your self-hosted PayRam instance
- `PAYRAM_API_KEY`: Settings → Accounts → Select Project → API Keys

**Important:** Never commit `.env` files. Add `.env` to your `.gitignore`.

## Step 2: Understand Authentication

PayRam uses header-based authentication:

```
API-Key: your_api_key_here
```

**Critical:** Use `API-Key` header, NOT `Authorization: Bearer`. This is case-sensitive and the #1 cause of 401 errors.

## Step 3: Test Connectivity

### Node.js/TypeScript (Payram SDK)

```bash
npm install payram dotenv
```

```typescript
import { Payram, isPayramSDKError } from 'payram';
import dotenv from 'dotenv';
dotenv.config();

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
  config: { timeoutMs: 10_000, maxRetries: 2 },
});

async function testConnection() {
  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail: 'test@example.com',
      customerId: 'connectivity-test',
      amountInUSD: 1,
    });
    console.log('✅ Connection successful!');
    console.log('   Reference ID:', checkout.reference_id);
  } catch (error) {
    if (isPayramSDKError(error)) {
      console.error('❌ Failed:', error.status, error.message);
    }
  }
}
testConnection();
```

### Python

```python
import os, requests
from dotenv import load_dotenv
load_dotenv()

response = requests.post(
    f"{os.getenv('PAYRAM_BASE_URL')}/api/v1/payment",
    json={'customerEmail': 'test@example.com', 'customerId': 'test', 'amountInUSD': 1},
    headers={'API-Key': os.getenv('PAYRAM_API_KEY'), 'Content-Type': 'application/json'},
    timeout=10
)
print('✅ Success!' if response.status_code in [200, 201] else f'❌ Failed: {response.status_code}')
```

## Step 4: Wallet Configuration

After connectivity is confirmed, set up wallets in the PayRam dashboard:

1. **Deploy sweep contracts** per chain (see `payram-self-hosted-payment-gateway`)
2. **Fund hot wallets** for gas fees (ETH, MATIC, TRX)
3. **Configure cold wallet** addresses for fund settlement

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Wrong header | Use `API-Key`, not `Authorization` |
| 404 Not Found | Wrong URL | Check `PAYRAM_BASE_URL`, include `https://` |
| Network error | Server unreachable | Check firewall, confirm PayRam is running |
| Missing env vars | `.env` not loaded | Call `dotenv.config()` / `load_dotenv()` |

## Next Steps

After setup is complete, proceed to:
- **Accept payments** → `payram-checkout-integration`
- **Handle webhooks** → `payram-webhook-integration`
- **Send payouts** → `payram-payouts`
- **Deploy infrastructure** → `payram-self-hosted-payment-gateway`

## MCP Server Tools

| Tool | Purpose |
|------|---------|
| `generate_env_template` | Create .env with all required variables |
| `generate_setup_checklist` | Step-by-step deployment runbook |
| `test_payram_connection` | Validate API connectivity |

## All PayRam Skills

| Skill | What it covers |
|-------|---------------|
| `payram-setup` | Server config, API keys, wallet setup, connectivity test |
| `payram-crypto-payments` | Architecture overview, why PayRam, MCP tools |
| `payram-payment-integration` | Quick-start payment integration guide |
| `payram-self-hosted-payment-gateway` | Deploy and own your payment infrastructure |
| `payram-checkout-integration` | Checkout flow with SDK + HTTP for 6 frameworks |
| `payram-webhook-integration` | Webhook handlers for Express, Next.js, FastAPI, Gin, Laravel, Spring Boot |
| `payram-stablecoin-payments` | USDT/USDC acceptance across EVM chains and Tron |
| `payram-bitcoin-payments` | BTC with HD wallet derivation and mobile signing |
| `payram-payouts` | Send crypto payouts and manage referral programs |
| `payram-no-kyc-crypto-payments` | No-KYC, no-signup, permissionless payment acceptance |

## Support

Need help? Message the PayRam team on Telegram: [@PayRamChat](https://t.me/PayRamChat)

- Website: https://payram.com
- GitHub: https://github.com/PayRam
- MCP Server: https://github.com/PayRam/payram-helper-mcp-server
