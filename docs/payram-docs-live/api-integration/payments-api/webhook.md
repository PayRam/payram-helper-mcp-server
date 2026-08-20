For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payments-api/webhook.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [⚡Payments API](/api-integration/payments-api)

# Webhook

When a payment (deposit) is detected and progresses on-chain, PayRam POSTs a webhook to your registered URL so you can track it without polling. Your server must accept the request, parse the body, and respond with a `2xx` status to acknowledge receipt.

> This is the payment / deposit webhook (incoming funds against a payment session). For outgoing payouts, see the Payout Webhooks section of the Payouts API doc.

### How to set up a Webhook?[](#how-to-set-up-a-webhook)

You register webhook endpoints from the PayRam dashboard:

1.  Open the PayRam dashboard.
    
2.  Go to **Settings → Webhook**.
    
3.  Click **Add Endpoint**.
    
4.  Enter your **Endpoint URL** (a publicly reachable **HTTPS** URL) and a short description, then save.
    

Mark the endpoint **active**. PayRam delivers events to every active endpoint registered for the project.

> Webhooks are on by default. They can be disabled server-side with the `SEND_WEBHOOK_TO_MERCHANT=false` environment variable.

### Delivery and Retries[](#delivery-and-retries)

-   Method: `**POST**`, `Content-Type: application/json`. (It is a POST with a JSON body — not a GET.)
    
-   **Verify authenticity** of every delivery using either header:
    
    -   `**X-Payram-Signature**` (recommended) — HMAC-SHA256 of the **raw request body**, keyed with your project API key, formatted `sha256=<hex>`. Recompute and constant-time compare.
        
    -   `**API-KEY**` — your project API key sent verbatim (legacy; kept for backward compatibility).
        
    
-   **Confirmation-progress** deliveries (while a deposit is still confirming) are retried up to 3 times per cycle (immediately, then after 2s and 4s) and re-sent on the next poll until the payment is filled.
    
-   **Final** deliveries (payment `closed` / `cancelled`) are retried quickly (0s, 2s, 4s), then scheduled for **long-term retry** (30m, 1h, 2h, …) until your endpoint returns a `2xx`.
    
-   Any response `≥ 400` (or a timeout — the client waits up to 60s) counts as a failure and triggers a retry.
    
-   Treat events as **idempotent** — you may receive the same status more than once. Key off `reference_id` (or `invoice_id`) + `status`.
    

### Verifying the Signature[](#verifying-the-signature)

Compute the HMAC over the **exact raw bytes** of the request body (do not re-serialize the parsed JSON) and compare against the `X-Payram-Signature` header:

### Payment Status[](#payment-status)

The status field reflects how much of the payment has been filled:

`status`

Meaning

`OPEN`

Payment created; no deposit detected yet (or filled amount is zero).

`PARTIALLY_FILLED`

A deposit was detected but the filled amount is less than the requested amount.

`FILLED`

The filled amount equals the requested amount.

`OVER_FILLED`

The filled amount exceeds the requested amount.

`CANCELLED`

The payment was cancelled.

### Confirmation Progress[](#confirmation-progress)

While a deposit is confirming on-chain, PayRam sends progress webhooks carrying `confirmation_current` / `confirmation_required` (e.g. `3 / 12`, `5 / 12`) so you can show progress until the payment is filled. On the final closed/cancelled webhook these are `0`.

The typical flow:

### Payload[](#payload)

All monetary amounts are JSON strings; `timestamp`, `confirmation_*`, and `block_number` are numbers. `filled_amount` / `filled_amount_in_usd` may be `null` before a deposit is detected, and `payment_info` is empty until there’s an on-chain deposit.

Field

Type

Meaning

`customer_id`

string

Your identifier for the paying customer.

`invoice_id`

string

The invoice this payment belongs to.

`reference_id`

string

PayRam’s unique reference for the payment (use as the idempotency key).

`status`

string

Fill state — see the table above.

`amount`

string

Requested payment amount in `currency`.

`currency`

string

Currency code (e.g. `BTC`, `USDT`, `ETH`).

`filled_amount`

string | null

Amount received so far (null before any deposit).

`filled_amount_in_usd`

string | null

USD value of the filled amount.

`sponsored_amount`

string

Gas/fee amount sponsored by PayRam (`"0"` if none).

`sponsored_amount_in_usd`

string

USD value of the sponsored amount.

`timestamp`

number

Last-update time, Unix epoch **seconds**.

`payment_info`

array

On-chain deposit details (empty until a deposit is detected).

`payment_info[].source_address`

string

Address the funds came from.

`payment_info[].transaction_hash`

string

On-chain transaction hash of the deposit.

`payment_info[].destination_address`

string

PayRam deposit address that received the funds.

`payment_info[].block_number`

number

Block the deposit was included in.

`confirmation_current`

number

Confirmations seen so far (`0` on the final webhook).

`confirmation_required`

number

Confirmations required before the payment is considered settled.

### Acknowledging[](#acknowledging)

Return `2xx` to acknowledge. If your endpoint is unreachable, errors, or times out, PayRam retries (quick retries, then long-term backoff for final events). Respond quickly and process asynchronously.

[PreviousPayment Status](/api-integration/payments-api/payment-status)[NextPayouts APIs](/api-integration/payouts-apis)

Last updated 6 hours ago