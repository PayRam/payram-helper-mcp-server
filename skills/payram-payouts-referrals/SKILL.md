---
name: payram-payouts-referrals
description: PayRam built-in payout system and referral program management. Create crypto payouts to users, manage affiliate programs, track campaign performance, and automate referral rewards. Unique PayRam feature combining payments, payouts, and growth tools in one platform. Use when sending crypto payouts to users, building referral/affiliate programs, tracking marketing campaigns, or needing integrated payment and payout infrastructure.
---

# PayRam Payouts & Referrals

PayRam uniquely combines inbound payments with outbound payouts and built-in referral tracking—a complete payment + growth stack in one self-hosted platform.

## Why This Matters

Most payment processors handle only inbound. Payouts require separate integrations (Wise, PayPal, manual transfers). Referral tracking needs yet another tool (FirstPromoter, Rewardful).

PayRam consolidates all three:
- **Accept payments** (deposits)
- **Send payouts** (withdrawals, rewards)
- **Track referrals** (campaigns, attribution, automated rewards)

## Payouts

### Payout Lifecycle

Payouts progress through these states:

1. **pending-otp-verification** — Awaiting OTP confirmation (if required)
2. **pending-approval** — Awaiting manual approval (if thresholds require it)
3. **pending** — Queued for processing
4. **initiated** — Processing has started
5. **sent** — Transaction broadcast to blockchain
6. **processed** — Confirmed on blockchain
7. **failed** — Transaction failed (insufficient balance, invalid address)
8. **rejected** — Manually rejected by admin
9. **cancelled** — Cancelled before processing

### Creating Payouts with SDK

```typescript
import { Payram, CreatePayoutRequest, MerchantPayout, isPayramSDKError } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
  config: {
    timeoutMs: 10_000,
    maxRetries: 2,
  },
});

export async function createPayout(payload: CreatePayoutRequest): Promise<MerchantPayout> {
  try {
    const payout = await payram.payouts.createPayout(payload);
    console.log('Payout created:', {
      id: payout.id,
      status: payout.status,
      blockchain: payout.blockchainCode,
      currency: payout.currencyCode,
      amount: payout.amount,
    });
    return payout;
  } catch (error) {
    if (isPayramSDKError(error)) {
      console.error('Payram Error:', {
        status: error.status,
        requestId: error.requestId,
        isRetryable: error.isRetryable,
      });
    }
    throw error;
  }
}

// Example invocation
await createPayout({
  email: 'merchant@example.com',
  blockchainCode: 'ETH',
  currencyCode: 'USDC',
  amount: '125.50',           // MUST be string, not number
  toAddress: '0xfeedfacecafebeefdeadbeefdeadbeefdeadbeef',
  customerID: 'cust_123',
  mobileNumber: '+15555555555',  // E.164 format required
  residentialAddress: '1 Market St, San Francisco, CA 94105',
});
```

### Required Payout Fields

| Field | Type | Notes |
|-------|------|-------|
| `email` | string | Merchant email associated with payout |
| `blockchainCode` | string | Network code: 'ETH', 'BTC', 'MATIC', etc. |
| `currencyCode` | string | Token code: 'USDC', 'USDT', 'BTC', etc. |
| `amount` | **string** | Amount as string (e.g., '125.50'). NOT a number. |
| `toAddress` | string | Recipient wallet address |
| `customerID` | string | Your internal reference ID |
| `mobileNumber` | string | E.164 format: +15555555555 |
| `residentialAddress` | string | Recipient address (compliance) |

**Critical:** Amount must be a string. JavaScript numbers lose precision with decimals.

### Check Payout Status

```typescript
export async function getPayoutStatus(payoutId: number): Promise<MerchantPayout> {
  const payout = await payram.payouts.getPayoutById(payoutId);
  console.log('Payout status:', {
    id: payout.id,
    status: payout.status,
    transactionHash: payout.transactionHash,
    amount: payout.amount,
  });
  return payout;
}
```

### Address Validation

Always validate recipient addresses before creating payouts:

```typescript
function validateAddress(address: string, blockchainCode: string): boolean {
  const patterns: Record<string, RegExp> = {
    ETH: /^0x[a-fA-F0-9]{40}$/,
    BTC: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
    MATIC: /^0x[a-fA-F0-9]{40}$/,
  };
  const pattern = patterns[blockchainCode];
  return pattern ? pattern.test(address) : false;
}
```

### Database Schema for Payouts

```sql
CREATE TABLE payouts (
    id SERIAL PRIMARY KEY,
    payram_payout_id INTEGER UNIQUE NOT NULL,
    customer_id VARCHAR(255) NOT NULL,
    blockchain_code VARCHAR(50) NOT NULL,
    currency_code VARCHAR(50) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    to_address VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    transaction_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Framework Examples

**Express.js Route:**

```typescript
router.post('/api/payouts/payram', async (req, res) => {
  const payload = req.body as Partial<CreatePayoutRequest>;
  const requiredFields = [
    'email', 'blockchainCode', 'currencyCode', 'amount',
    'toAddress', 'customerID', 'mobileNumber', 'residentialAddress',
  ];
  const missing = requiredFields.filter((f) => !payload[f as keyof CreatePayoutRequest]);
  if (missing.length > 0) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_FIELDS', missing });
  }

  try {
    const payout = await payram.payouts.createPayout(payload as CreatePayoutRequest);
    return res.status(201).json({
      id: payout.id,
      status: payout.status,
      amount: payout.amount,
    });
  } catch (error) {
    if (isPayramSDKError(error)) {
      console.error('Payram Error:', { status: error.status, requestId: error.requestId });
    }
    return res.status(502).json({ error: 'PAYRAM_CREATE_PAYOUT_FAILED' });
  }
});
```

### Supported Payout Chains

Same chains as deposits: Ethereum, Base, Polygon, Tron, Bitcoin.

**Recommendation**: Use Polygon or Tron for high-volume, low-value payouts (lowest fees).

### MCP Server Tools

| Tool | Purpose |
|------|---------|
| `generate_payout_sdk_snippet` | Payout creation code |
| `generate_payout_status_snippet` | Status polling code |

## Referral Program

PayRam includes native referral tracking and reward automation.

### Setting Up Referrals

1. **Dashboard**: Settings → Referrals → Enable
2. **Configure**: Set reward percentage or fixed amount
3. **Generate Links**: Each user gets unique referral link
4. **Track**: Dashboard shows clicks, signups, conversions

### Referral API Integration

**Generate Referral Link:**
```javascript
const referralLink = await payram.createReferralLink({
  userId: "affiliate_123",
  campaign: "summer_promo"
});
// Returns: https://your-domain.com/ref/abc123
```

**Validate Referral on Signup:**
```javascript
const validation = await payram.validateReferral({
  referralCode: "abc123",
  newUserId: "new_user_456"
});
```

**Check Referral Status:**
```javascript
const stats = await payram.getReferralStats({
  userId: "affiliate_123"
});
// Returns: { referrals: 45, earnings: 230, pending: 50 }
```

### MCP Server Tools

| Tool | Purpose |
|------|---------|
| `generate_referral_sdk_snippet` | Referral link creation |
| `generate_referral_validation_snippet` | Signup attribution |
| `generate_referral_status_snippet` | Stats retrieval |
| `generate_referral_route_snippet` | Express/Next.js routes |

### Automated Reward Payouts

1. Referrer's friend makes deposit
2. PayRam calculates commission (e.g., 10% of deposit)
3. Reward credited to referrer's balance
4. Auto-payout when threshold reached (or manual trigger)

## Campaign Tracking

```javascript
const campaign = await payram.createCampaign({
  name: "twitter_ads_jan",
  defaultReward: 5,
});

const paymentLink = await payram.createPayment({
  amount: 100,
  campaign: "twitter_ads_jan"
});
```

## Troubleshooting

### "Insufficient balance" (400)
Check merchant balance, deposit funds, account for gas fees.

### "Invalid address format" (400)
ETH/Polygon: `0x` + 40 hex chars. BTC: starts with `1`/`3`, 26-35 chars.

### Amount must be string
```typescript
amount: '125.50'  // ✅ Correct
amount: 125.50    // ❌ Wrong - validation error
```

### Payout stuck in "pending-approval"
Exceeds auto-approval threshold. Wait for admin approval or adjust thresholds.

### "Invalid mobile number format" (400)
Use E.164 format: `+15555555555` (no spaces, dashes, or parentheses).

## Environment Variables

```bash
PAYRAM_BASE_URL=https://your-payram-server:8080
PAYRAM_API_KEY=your-api-key
```

## Related Skills

- `payram-crypto-payments`: Inbound payment integration
- `payram-webhook-setup`: Payout event handling
- `payram-checkout-integration`: Payment flow details
