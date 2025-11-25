# Payram TypeScript SDK

The **Payram TypeScript SDK** allows your backend to interact seamlessly with your **self-hosted Payram server**. It wraps the Payram API into a strongly-typed, retry-safe interface and provides framework adapters for webhook handling with minimal setup.

---

## Before You Begin

You’ll need:

- Your **Payram API key**
    - Go to your payram server > Settings > Account > Select Your Project (or Create “New Project”) > API Keys (Copy existing or Click “Add New”)
- The **base URL** of your self-hosted Payram instance
- **Node.js 18+** (for built-in `fetch`)
- A package manager — `npm`, `yarn`, or `pnpm`

> ⚠️ This SDK is meant for backend use only. Never expose your API key in browser or frontend code.
> 

---

## Install

```bash
npm install payram
# or
yarn add payram
# or
pnpm add payram
```

---

## Initialize the Client

```tsx
import { Payram } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,      // required
  baseUrl: process.env.PAYRAM_BASE_URL!,    // required
  config: {
    timeoutMs: 10_000,                      // optional
    maxRetries: 2,                          // optional
    retryPolicy: 'safe',                    // optional, see below
    // allowInsecureHttp: true,             // Optional
  },
});
```

### Advanced Configuration (optional)

| Option | Type | Description |
| --- | --- | --- |
| `timeoutMs` | number | Request timeout in milliseconds |
| `maxRetries` | number | Maximum retry attempts |
| `retryPolicy` | `'none' | 'safe' | 'aggressive'` | Controls retry aggressiveness — `none` disables retries, `safe` retries idempotent calls, `aggressive` retries all |
| `allowInsecureHttp` | boolean | Set to `true` only when you must talk to an `http://` endpoint (local mocks, etc.) |

These options can be overridden per request, but typically don’t need modification for standard integrations.

---

## Payments API

Use the Payments API to create new payments and check their status.

```tsx
// Start a new payment
const checkout = await payram.payments.initiatePayment({
  customerEmail: 'customer@example.com',
  customerId: 'cust_123',
  amountInUSD: 49.99,
});

console.log(checkout.reference_id);  // unique payment ID
console.log(checkout.url);  // redirect your customer here
```

Retrieve a payment’s current state:

```tsx
const payment = await payram.payments.getPaymentRequest(checkout.reference_id);
console.log(payment.paymentState);
```

Possible values for `payment.paymentState`:

```
OPEN | CANCELLED | FILLED | PARTIALLY_FILLED | OVER_FILLED | UNDEFINED
```

You can also use **top-level shortcuts**:

```tsx
await payram.initiatePayment(payload);
await payram.getPaymentRequest('ref-123');
```

---

## Referrals API

The Referrals API lets you authenticate referrers, link referees, and log referral events.

```tsx
// Step 1: Authenticate the referrer (set a unique referenceID per user)
await payram.referrals.authenticateReferrer({
  email: 'referrer@example.com',
  referenceID: 'ref-program-101',     // must be unique per referrer
});

// Step 2: Link a referee to a referrer
await payram.referrals.linkReferee({
  email: 'friend@example.com',
  referrerCode: 'REF-CODE',
  referenceID: 'ref-program-202',     // unique per referee
});

// Step 3: Log an event
await payram.referrals.logReferralEvent({
  eventKey: 'conversion',
  referenceID: 'ref-program-202',     // same ID used for that referee
  amount: 25,
});
```

Each of these also has a top-level alias:

```tsx
await payram.authenticateReferrer(...);
await payram.linkReferee(...);
await payram.logReferralEvent(...);
```

---

## Payout APIs

Use the Payouts API to create and retrieve payout transactions for merchants or other users.

```tsx
await payram.payouts.createPayout({
  email: 'merchant@example.com',
  blockchainCode: 'ETH',
  currencyCode: 'USDT',
  amount: '125.50',
  toAddress: '0xfeedfacecafebeefdeadbeefdeadbeefdeadbeef',
});

const payout = await payram.payouts.getPayoutById(42);

console.log(payout.status, payout.transferHash);
```

The same helpers exist at the **client root** as:

```tsx
await payram.createPayout(...);
await payram.getPayoutById(...);
```

Supported Networks & Currencies:

| Currency | Supported Networks | Notes |
| --- | --- | --- |
| **USDT** | `ETH`, `TRX` | Stablecoin payouts on Ethereum or Tron |
| **USDC** | `ETH`, `BASE` | Stablecoin payouts on Ethereum or Base |

---

## Handling Webhooks

Payram sends webhook events (like payment updates or referral completions) to your configured endpoint.

The SDK provides adapters for **Express**, **Fastify**, and **Next.js (both App and Pages Routers)** that:

- Validate the `API-Key` header automatically
- Parse and verify payloads
- Respond with the correct acknowledgment body

### Express Example

```tsx
import express from 'express';
import { Payram } from 'payram';

const app = express();
const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

app.post(
  '/payram/webhook',
  payram.webhooks.expressWebhook(async (payload, req) => {
    console.log('Received Payram event:', payload.event, payload.reference_id);
    // handle payment / referral events here
  }),
);

app.listen(3000);
```

---

### Fastify Example

```tsx
import Fastify from 'fastify';
import { Payram } from 'payram';

const fastify = Fastify();
const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

fastify.post(
  '/payram/webhook',
  payram.webhooks.fastifyWebhook(async (payload, request) => {
    console.log('Payram webhook event:', payload.event, payload.reference_id);
    // handle payment / referral events here
  }),
);

await fastify.listen({ port: 3000 });
```

---

### Next.js Example (App Router)

```tsx
// app/api/payram/webhook/route.ts
import { NextRequest } from 'next/server';
import { Payram } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

export const POST = payram.webhooks.nextAppRouterWebhook(
  async (payload, req: NextRequest) => {
    console.log('Payram webhook event:', payload.event, payload.reference_id);
    // handle payment / referral events here
  },
);
```

> 🧠 The adapter automatically handles verification and response — no res.status(200) needed.
> 

---

### Manual Validation (Custom Frameworks)

If you’re using another framework, you can manually validate requests:

```tsx
import { verifyApiKey } from 'payram';

if (!verifyApiKey(req.headers, process.env.PAYRAM_API_KEY!)) {
  return res.status(401).json({ error: 'invalid-key' });
}

const payload = req.body;
handleEvent(payload);
```

---

## Error Handling & Retries

All errors are normalized as `PayramSDKError` instances:

```tsx
import { isPayramSDKError } from 'payram';

try {
  await payram.initiatePayment(payload);
} catch (error) {
  if (isPayramSDKError(error)) {
    console.error('Payram Error:', {
      status: error.status,
      error: error.error,
      requestId: error.requestId,
      isRetryable: error.isRetryable,
      isTimeout: error.isTimeout,
    });

    if (error.isRetryable) {
      // custom retry or alert logic
    }
  }
}
```

Retries use **exponential backoff** and respect your configured `retryPolicy`.

---

## TypeScript Support

The SDK ships with full type definitions and JSDoc for IDE IntelliSense.

You can directly import request and response types for stricter typing:

```tsx
// You can import these directly from 'payram'.
// Each pair below maps to a specific SDK method and its corresponding data shape.

export type {
  // Used with payram.referrals.authenticateReferrer()
  AuthRequest,              // → Input payload for authenticating a referrer
  AuthResponse,             // → Response structure returned after successful authentication

  // Used with payram.referrals.logReferralEvent()
  EventLogRequest,          // → Input payload for logging a referral event
  EventLogResponse,         // → Response structure confirming that the event was logged

  // Used with payram.payments.initiatePayment()
  InitiatePaymentRequest,   // → Input payload for creating a new payment
  InitiatePaymentResponse,  // → Response containing checkoutUrl, referenceId, etc.

  // Used with payram.payments.getPaymentRequest()
  PaymentRequestData,       // → Response structure for a payment request (status, metadata, etc.)

  // Used with payram.referrals.linkReferee()
  RefereeLinkRequest,       // → Input payload for linking a referee to a referrer
  RefereeLinkResponse,      // → Response confirming that the link was created
  
  // Used with payram.payouts.createPayout()
  CreatePayoutRequest,      // → Input payload for creating a new payout
  MerchantPayout,           // → Full typed payout record returned on reads

  // Used with payram.payouts.getPayoutById()
  GetPayoutByIdFilters,     // → Allowed filters (status, type, blockchainCode)
  GetPayoutByIdResponse,    // → Typed response structure for payout lookups
} from 'payram';

```

> 💡 These correspond one-to-one with the SDK functions you call:
> 
> - `initiatePayment` → `InitiatePaymentRequest` / `InitiatePaymentResponse`
> - `getPaymentRequest` → `PaymentRequestData`
> - `authenticateReferrer` → `AuthRequest` / `AuthResponse`
> - `linkReferee` → `RefereeLinkRequest` / `RefereeLinkResponse`
> - `logReferralEvent` → `EventLogRequest` / `EventLogResponse`
> - `createPayout` → `CreatePayoutRequest` / `MerchantPayout`
> - `getPayoutById` → `GetPayoutByIdFilters` / `GetPayoutByIdResponse`

---

## Security & Production Notes

- Keep your **API key** on the server — never in frontend code.
- Always use **HTTPS** for your base URL.
- Log the `requestId` field from SDK errors for correlation with your Payram logs.
- Limit access to your webhook routes and rely on `API-Key` verification.
- Rotate your credentials regularly.

---

## Advanced: Per-Request Overrides

For specialized use cases, every SDK method supports an optional second argument to override client defaults:

```tsx
const abort = new AbortController();

await payram.payments.initiatePayment(
  { customerEmail: 'a@b.com', amountInUSD: 10, customerId: 'c1' },
  {
    config: { maxRetries: 5, retryPolicy: 'aggressive' },
    signal: abort.signal,
    apiKeyOverride: 'temporary-key',
  },
);
```

Use this sparingly — most integrations won’t need per-call overrides.

---

## Troubleshooting

| Issue | Likely Cause | Fix |
| --- | --- | --- |
| 401 Unauthorized | Wrong or missing API key | Check environment variables |
| HTML instead of JSON | Wrong `baseUrl` (points to frontend) | Use API backend URL |
| Timeout | Slow server / small `timeoutMs` | Increase timeout or optimize backend |
| Webhooks not firing | Incorrect route or key mismatch | Verify your Payram webhook URL and key |

---

## Need Help?

Report bugs or suggest improvements via [Payram SDK GitHub](https://github.com/PayRam/payram-sdk-js).