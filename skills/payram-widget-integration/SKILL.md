---
name: payram-widget-integration
description: Integrate the PayRam Add Credit widget (payram-add-credit-v1.js) into a website or web app. Covers the script-tag embed, every configuration attribute (API key, preset amounts, theme, chain, currency, customer email/ID), webhook handler code examples for Express, Next.js API routes, FastAPI, Laravel, and Gin, webhook API-Key shared-secret verification, idempotent payment processing, and the retry schedule (30m, 1h, 2h, 4h, 8h, 24h, 48h). Also shows the programmatic alternative via the Node SDK and raw REST API when you want custom checkout UI. Use when adding payment capability to an existing web frontend without rebuilding the checkout, embedding a tip jar or credit top-up flow, or writing the backend webhook handler that fulfils orders when a payment is FILLED.
---

# PayRam Widget Integration: Embed + Webhook Reference

> Functional reference for integrating PayRam into a web application. Covers the one-script-tag widget, configuration, webhook handlers in five frameworks, and debugging. For the marketing framing + why-this-matters pitch see https://payram.com/skills/payram-demo-widget.md.

## 1. The script-tag embed

```html
<script
  src="https://payram.com/widget/payram-add-credit-v1.js"
  data-payram-url="https://your-payram-node.com"
  data-api-key="pr_live_xxxxxxxxxxxxx"
  data-amounts="5,10,25,50,100"
  data-theme="dark"
  data-brand-label="Your Brand"
  data-currency="USDC"
  data-chain="base"
  data-customer-email="user@example.com"
  data-customer-id="cust_abc123"
  data-allow-custom-amount="true">
</script>
```

The widget mounts where the script tag sits in the DOM.

### Configuration reference

| Attribute | Type | Required | Default | Notes |
|---|---|---|---|---|
| `data-payram-url` | URL | yes | — | Your PayRam node's base URL |
| `data-api-key` | string | yes | — | API key from the merchant dashboard |
| `data-amounts` | csv of numbers | no | `10,25,50,100` | Preset amounts shown as quick-select chips |
| `data-theme` | `dark` \| `light` | no | `dark` | Widget color scheme |
| `data-brand-label` | string | no | `PayRam` | Shown in the widget header |
| `data-currency` | `USDC` \| `USDT` | no | `USDC` | Settlement token |
| `data-chain` | `base` \| `tron` \| `polygon` \| `ethereum` \| `bitcoin` | no | `base` | Settlement chain |
| `data-customer-email` | email | no | — | Pre-fills for known users |
| `data-customer-id` | string | no | — | Your internal customer reference |
| `data-allow-custom-amount` | `true` \| `false` | no | `true` | Toggles custom-amount input |
| `data-reference-id` | string | no | auto | Override the reference_id (normally auto-generated) |

## 2. Programmatic alternative — Node SDK

If you want your own checkout UI:

```javascript
import { Payram } from 'payram';

const payram = new Payram({
  baseUrl: 'https://your-payram-node.com',
  apiKey: process.env.PAYRAM_API_KEY
});

const checkout = await payram.payments.initiatePayment({
  customerEmail: 'user@example.com',
  customerId: 'cust_abc123',   // SDK field; serialized to customerID on the wire
  amountInUSD: 25.00
});

// checkout.url          — hosted checkout URL (redirect customer here)
// checkout.reference_id — server-generated reference; use for idempotency + status lookups
// checkout.host         — your PayRam host (from server config)
```

The merchant create-payment endpoint takes `PaymentCreateRequest` (`customerEmail`, `customerID`, `amountInUSD`). The settlement chain/currency are chosen by the customer on the hosted checkout (or fixed by your node config) — they are not parameters of this call.

## 3. REST API (no SDK)

```bash
curl -X POST https://your-payram-node.com/api/v1/payment \
  -H "API-Key: $PAYRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customerEmail": "user@example.com",
    "customerID": "cust_abc123",
    "amountInUSD": 25.00
  }'
```

> PayRam merchant endpoints authenticate with the **`API-Key`** header — **not** `Authorization: Bearer`. Note `customerID` has a capital "ID" on the wire (`binding:"required"`).

Response:

```json
{
  "url": "https://pay.payram.com/abc123",
  "reference_id": "order_123",
  "host": "https://your-payram-node.com"
}
```

## 4. Webhook payload contract

PayRam POSTs to the webhook URL configured in the dashboard. Payload (snake_case, per `payram-webhook.yaml` `WebhookPayload`):

```json
{
  "reference_id": "ref_123",
  "invoice_id": "inv_456",
  "customer_id": "cust_789",
  "customer_email": "user@example.com",
  "status": "FILLED",
  "amount": 49.99,
  "filled_amount_in_usd": 49.99,
  "currency": "USD"
}
```

Only `reference_id` and `status` are guaranteed present; treat the rest as optional. The payload is open (`additionalProperties: true`), so additional fields like `filled_amount`, `timestamp`, and `payment_info` may also appear — don't assume a fixed set.

**Statuses (the `status` field):** `OPEN`, `PARTIALLY_FILLED`, `FILLED`, `OVER_FILLED`, `CANCELLED`, `UNDEFINED`. `FILLED` means the expected amount was received; `OVER_FILLED`/`PARTIALLY_FILLED` indicate the customer over/under-paid.

**Retry schedule** if you don't respond 2xx: `30m, 1h, 2h, 4h, 8h, 24h, 48h`. Seven attempts total, then the webhook is marked failed (can be resent manually from the dashboard).

**Authentication:** PayRam sends an **`API-Key`** request header equal to the **shared secret** you configured for the webhook (the webhook's access key, set in the dashboard). Verify it with a constant-time compare to confirm the request is from PayRam. There is **no** HMAC signature header — do not look for `X-PayRam-Signature`.

**Acknowledge** with HTTP 200 and a JSON body like `{ "message": "Webhook received successfully" }` (`WebhookAck`).

## 5. Webhook handlers

Each handler does the same three things: constant-time compare the `API-Key` header against your shared secret, branch on `status`, then acknowledge with 200.

### Express (Node.js)

```javascript
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json()); // shared-secret auth, so the parsed body is fine
const processed = new Set(); // replace with Redis/DB in production
const SECRET = process.env.PAYRAM_WEBHOOK_SECRET; // the webhook's API-Key shared secret

function validApiKey(received) {
  if (!received || !SECRET) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(SECRET);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

app.post('/webhooks/payram', (req, res) => {
  if (!validApiKey(req.header('API-Key'))) {
    return res.status(401).json({ message: 'invalid api key' });
  }

  const { reference_id, status } = req.body;
  const dedupeKey = `${reference_id}:${status}`;
  if (processed.has(dedupeKey)) return res.status(200).json({ message: 'duplicate' });
  processed.add(dedupeKey);

  if (status === 'FILLED' || status === 'OVER_FILLED') {
    fulfilOrder(reference_id, req.body.filled_amount_in_usd ?? req.body.amount);
  }

  res.status(200).json({ message: 'Webhook received successfully' });
});
```

### Next.js App Router

```typescript
// app/api/webhooks/payram/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET = process.env.PAYRAM_WEBHOOK_SECRET!;

function validApiKey(received: string | null) {
  if (!received) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(SECRET);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!validApiKey(req.headers.get('api-key'))) {
    return NextResponse.json({ message: 'invalid api key' }, { status: 401 });
  }

  const payload = await req.json();
  if (payload.status === 'FILLED' || payload.status === 'OVER_FILLED') {
    await fulfilOrder(payload.reference_id, payload.filled_amount_in_usd ?? payload.amount);
  }
  return NextResponse.json({ message: 'Webhook received successfully' });
}
```

### FastAPI (Python)

```python
import hmac, os
from fastapi import FastAPI, Request, HTTPException

app = FastAPI()
SECRET = os.environ['PAYRAM_WEBHOOK_SECRET']

@app.post('/webhooks/payram')
async def payram_webhook(req: Request):
    api_key = req.headers.get('api-key', '')
    if not hmac.compare_digest(api_key, SECRET):
        raise HTTPException(401, 'invalid api key')

    payload = await req.json()
    if payload.get('status') in ('FILLED', 'OVER_FILLED'):
        await fulfil_order(payload['reference_id'], payload.get('filled_amount_in_usd') or payload.get('amount'))
    return {'message': 'Webhook received successfully'}
```

### Laravel (PHP)

```php
Route::post('/webhooks/payram', function (Request $req) {
    $apiKey = (string) $req->header('API-Key');
    if (!hash_equals(env('PAYRAM_WEBHOOK_SECRET'), $apiKey)) abort(401);

    $p = $req->json()->all();
    if (in_array($p['status'] ?? '', ['FILLED', 'OVER_FILLED'], true)) {
        FulfilOrder::dispatch($p['reference_id'], $p['filled_amount_in_usd'] ?? $p['amount']);
    }
    return response()->json(['message' => 'Webhook received successfully']);
});
```

### Gin (Go)

```go
import "crypto/subtle"

r.POST("/webhooks/payram", func(c *gin.Context) {
    key := []byte(c.GetHeader("API-Key"))
    secret := []byte(os.Getenv("PAYRAM_WEBHOOK_SECRET"))
    if subtle.ConstantTimeCompare(key, secret) != 1 {
        c.JSON(401, gin.H{"message": "invalid api key"})
        return
    }

    var p struct {
        ReferenceID       string  `json:"reference_id"`
        Status            string  `json:"status"`
        Amount            float64 `json:"amount"`
        FilledAmountInUSD float64 `json:"filled_amount_in_usd"`
    }
    if err := c.ShouldBindJSON(&p); err != nil {
        c.JSON(400, gin.H{"message": "bad payload"})
        return
    }
    if p.Status == "FILLED" || p.Status == "OVER_FILLED" {
        fulfilOrder(p.ReferenceID, p.FilledAmountInUSD)
    }
    c.JSON(200, gin.H{"message": "Webhook received successfully"})
})
```

## 6. Idempotency pattern

The same payment can fire multiple webhooks (e.g. `OPEN` then `FILLED`), and any delivery may be retried. Make fulfilment idempotent by deduping on `reference_id + status`.

```python
# Pseudo-code — use your DB's unique constraint or Redis SETNX
key = f'processed:{payload["reference_id"]}:{payload["status"]}'
if not redis.set(key, '1', nx=True, ex=86400 * 7):
    return {'message': 'duplicate'}
fulfil_order(...)
```

Use a TTL of at least 48 hours (the longest retry window).

## 7. Common pitfalls

- **Local dev webhooks**: use `ngrok` or Cloudflare Tunnel. PayRam can't reach `localhost`.
- **Looking for an HMAC signature**: PayRam authenticates webhooks with a plain `API-Key` shared-secret header, not an `X-PayRam-Signature` HMAC. Compare it in constant time; serve your endpoint over HTTPS so the secret isn't exposed in transit.
- **Branching on a non-existent `event` field**: there is no `event` field — branch on `status` (`FILLED`, `OVER_FILLED`, etc.).
- **Treating optional fields as guaranteed**: only `reference_id` and `status` are always present. Default-guard everything else.
- **Handling under/over-payment**: a customer may pay less (`PARTIALLY_FILLED`) or more (`OVER_FILLED`) than expected. Decide your fulfilment policy for each rather than only handling `FILLED`.

## 8. See also

- Widget UX + positioning (website-hosted): https://payram.com/skills/payram-demo-widget.md
- Full API reference: https://docs.payram.com
- Live demo: https://payram.com/demo
- Webhook debugging tool in dashboard: Payments → Webhook Deliveries → Resend
