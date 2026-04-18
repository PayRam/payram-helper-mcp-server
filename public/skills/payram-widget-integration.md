---
name: payram-widget-integration
description: Integrate the PayRam Add Credit widget (payram-add-credit-v1.js) into a website or web app. Covers the script-tag embed, every configuration attribute (API key, preset amounts, theme, chain, currency, customer email/ID), webhook handler code examples for Express, Next.js API routes, FastAPI, Laravel, and Gin, webhook signature verification, idempotent payment processing, and the retry schedule (30m, 1h, 2h, 4h, 8h, 24h, 48h). Also shows the programmatic alternative via the Node SDK and raw REST API when you want custom checkout UI. Use when adding payment capability to an existing web frontend without rebuilding the checkout, embedding a tip jar or credit top-up flow, or writing the backend webhook handler that fulfils orders on payment.confirmed.
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
import { PayRam } from 'payram';

const payram = new PayRam({
  baseUrl: 'https://your-payram-node.com',
  apiKey: process.env.PAYRAM_API_KEY
});

const payment = await payram.initiatePayment({
  amount: 25.00,
  currency: 'USDC',
  chain: 'base',
  customerEmail: 'user@example.com',
  customerId: 'cust_abc123',
  referenceId: 'order_' + Date.now()
});

// payment.url             — hosted checkout URL (redirect customer here)
// payment.depositAddress  — direct on-chain deposit address
// payment.qrPayload       — QR code payload (use to render yourself)
// payment.referenceId     — echoes the input for idempotency
```

## 3. REST API (no SDK)

```bash
curl -X POST https://your-payram-node.com/api/v1/payment \
  -H "Authorization: Bearer $PAYRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25.00,
    "currency": "USDC",
    "chain": "base",
    "customer_email": "user@example.com",
    "customer_id": "cust_abc123",
    "reference_id": "order_123"
  }'
```

Response:

```json
{
  "url": "https://pay.payram.com/abc123",
  "deposit_address": "0x...",
  "reference_id": "order_123",
  "expires_at": "2026-04-18T13:34:56Z"
}
```

## 4. Webhook payload contract

PayRam POSTs to the webhook URL configured in the dashboard. Payload:

```json
{
  "event": "payment.confirmed",
  "reference_id": "order_123",
  "customer_email": "user@example.com",
  "customer_id": "cust_abc123",
  "amount": 25.00,
  "currency": "USDC",
  "chain": "base",
  "status": "Confirmed",
  "tx_hash": "0x...",
  "from_address": "0x...",
  "to_address": "0x...",
  "created_at": "2026-04-18T12:34:56Z",
  "confirmed_at": "2026-04-18T12:35:01Z"
}
```

**Statuses:** `Created → Confirming → Confirmed` (normal path) or `Expired` / `Failed`.

**Retry schedule** if you don't respond 2xx: `30m, 1h, 2h, 4h, 8h, 24h, 48h`. Seven attempts total, then the webhook is marked failed (can be resent manually from the dashboard).

**Headers:**

- `X-PayRam-Signature` — HMAC-SHA256 of the raw body, using your webhook secret (from the dashboard). Verify to ensure the request is from PayRam.
- `X-PayRam-Event` — duplicates `event` field for routing without parsing the body.
- `X-PayRam-Delivery` — unique delivery ID; use for deduplication.

## 5. Webhook handlers

### Express (Node.js)

```javascript
import express from 'express';
import crypto from 'crypto';

const app = express();
const processed = new Set(); // replace with Redis/DB in production

// Use raw body parsing — we need the exact bytes to verify the signature.
app.post('/webhooks/payram', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.header('X-PayRam-Signature');
  const delivery = req.header('X-PayRam-Delivery');
  const secret = process.env.PAYRAM_WEBHOOK_SECRET;

  const expected = crypto.createHmac('sha256', secret).update(req.body).digest('hex');
  if (!signature || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    return res.status(401).send('invalid signature');
  }

  if (processed.has(delivery)) return res.status(200).send('duplicate');
  processed.add(delivery);

  const payload = JSON.parse(req.body.toString());
  if (payload.event === 'payment.confirmed') {
    // fulfil
    fulfilOrder(payload.reference_id, payload.amount);
  }

  res.status(200).send('ok');
});
```

### Next.js App Router

```typescript
// app/api/webhooks/payram/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('x-payram-signature');
  const expected = crypto
    .createHmac('sha256', process.env.PAYRAM_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex');

  if (!sig || sig !== expected) return new NextResponse('invalid', { status: 401 });

  const payload = JSON.parse(body);
  if (payload.event === 'payment.confirmed') {
    await fulfilOrder(payload.reference_id, payload.amount);
  }
  return NextResponse.json({ ok: true });
}
```

### FastAPI (Python)

```python
import hmac, hashlib, os, json
from fastapi import FastAPI, Request, HTTPException

app = FastAPI()
SECRET = os.environ['PAYRAM_WEBHOOK_SECRET']

@app.post('/webhooks/payram')
async def payram_webhook(req: Request):
    body = await req.body()
    sig = req.headers.get('x-payram-signature', '')
    expected = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(sig, expected):
        raise HTTPException(401, 'invalid signature')

    payload = json.loads(body)
    if payload.get('event') == 'payment.confirmed':
        await fulfil_order(payload['reference_id'], payload['amount'])
    return {'ok': True}
```

### Laravel (PHP)

```php
Route::post('/webhooks/payram', function (Request $req) {
    $body = $req->getContent();
    $sig = $req->header('X-PayRam-Signature');
    $expected = hash_hmac('sha256', $body, env('PAYRAM_WEBHOOK_SECRET'));
    if (!hash_equals($expected, $sig)) abort(401);

    $p = json_decode($body, true);
    if ($p['event'] === 'payment.confirmed') {
        FulfilOrder::dispatch($p['reference_id'], $p['amount']);
    }
    return response()->json(['ok' => true]);
});
```

### Gin (Go)

```go
r.POST("/webhooks/payram", func(c *gin.Context) {
    body, _ := io.ReadAll(c.Request.Body)
    sig := c.GetHeader("X-PayRam-Signature")

    mac := hmac.New(sha256.New, []byte(os.Getenv("PAYRAM_WEBHOOK_SECRET")))
    mac.Write(body)
    expected := hex.EncodeToString(mac.Sum(nil))
    if !hmac.Equal([]byte(expected), []byte(sig)) {
        c.String(401, "invalid signature")
        return
    }

    var p struct{ Event, ReferenceID string; Amount float64 }
    json.Unmarshal(body, &p)
    if p.Event == "payment.confirmed" {
        fulfilOrder(p.ReferenceID, p.Amount)
    }
    c.JSON(200, gin.H{"ok": true})
})
```

## 6. Idempotency pattern

Webhooks can retry; your fulfilment code must be idempotent.

```python
# Pseudo-code — use your DB's unique constraint or Redis SETNX
if not redis.set(f'processed:{delivery_id}', '1', nx=True, ex=86400 * 7):
    return {'ok': True, 'duplicate': True}
fulfil_order(...)
```

Store the `X-PayRam-Delivery` header (or `reference_id + event`) with a TTL of at least 48 hours (longest retry window).

## 7. Common pitfalls

- **Local dev webhooks**: use `ngrok` or Cloudflare Tunnel. PayRam can't reach `localhost`.
- **Returning 4xx/5xx on signature mismatch logs vs. valid signature**: log the raw body only after verifying the signature; otherwise you leak webhook payloads on failed attempts.
- **Verifying signature against the parsed body**: always verify against the raw bytes. JSON reserialization re-orders keys and breaks the HMAC.
- **Using `express.json()` instead of `express.raw()`**: parsed body changes bytes. Use `express.raw({ type: 'application/json' })` for the webhook route only.
- **Handling `payment.expired`**: configure TTL on `create_payment` or handle expiry in the webhook. If you gave the customer an address and they pay 3 days late, you still receive the funds — but the reference_id may have expired on your side.

## 8. See also

- Widget UX + positioning (website-hosted): https://payram.com/skills/payram-demo-widget.md
- Full API reference: https://docs.payram.com
- Live demo: https://payram.com/demo
- Webhook debugging tool in dashboard: Payments → Webhook Deliveries → Resend
