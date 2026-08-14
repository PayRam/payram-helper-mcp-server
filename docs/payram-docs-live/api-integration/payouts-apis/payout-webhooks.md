For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis/payout-webhooks.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# Payout Webhooks

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FfMzCdIIas8FjEOQAnO7q%252Fpayram-payout-webhooks.png%3Falt%3Dmedia%26token%3D517d83f2-671f-47a4-bc20-da3de7cead6b&width=768&dpr=3&quality=100&sign=b3fb50c6&sv=2)

Instead of polling, let PayRam push status changes to you. Whenever a payout transitions, PayRam **POSTs** a JSON event to your registered webhook URL — so you learn about `sent`, `processed`, `failed`, etc. as they happen.

> **Requires PayRam v3.1.1 or later.**

### Setup[](#setup)

1.  Register your webhook URL in the dashboard for the project (**Project → Webhooks**) and set it to **active**.
    
2.  The endpoint must be a publicly reachable **HTTPS** URL that responds with a `2xx` status.
    

Webhooks are **on by default**. (They can be disabled server-side with the `SEND_WEBHOOK_TO_MERCHANT=false` environment variable.)

**Note**: From PayRam v3.6.0, webhook delivery runs after the payout is created rather than during the request, so a slow or unreachable endpoint of yours no longer delays the `POST /withdrawal/merchant` response. Delivery outcome is still recorded on the payout's `webhookStatus`.

### Delivery & retries[](#delivery-and-retries)

-   Method: `**POST**`, `Content-Type: application/json`.
    
-   **Verify authenticity** of every delivery using either header:
    
    -   `**X-Payram-Signature**` (recommended) — an HMAC-SHA256 of the **raw request body**, keyed with your project API key, formatted `sha256=<hex>`. Recompute it on your side and constant-time compare.
        
    -   `**API-KEY**` — your project API key sent verbatim (legacy; kept for backward compatibility).
        
    
-   Each delivery is retried up to **3 times** (immediately, then after 2s and 4s) until your endpoint returns a `2xx`. Any response `≥ 400` (or a timeout — the client waits up to 60s) counts as a failure.
    
-   The payout’s `webhookStatus` becomes `received` once your endpoint accepts a delivery, or `failed` if all attempts fail.
    
-   Return `2xx` quickly and process asynchronously; treat events as **idempotent** (you may receive the same status more than once) and key off `payout_id` + `status`.
    

#### Verifying the signature[](#verifying-the-signature)

Compute the HMAC over the **exact raw bytes** of the request body (do not re-serialize the parsed JSON) and compare against the `X-Payram-Signature` header:

### Event types[](#event-types)

The `event_type` is `payout.<status>` (lowercase). Note the status is the **webhook status label**, which maps from the payout’s lifecycle state:

Payout `status` (API)

Webhook `status`

`event_type`

`pending-approval / pending-otp-verification`

`PENDING-APPROVAL`

`payout.pending-approval`

`pending`

`APPROVED`

`payout.approved`

`initiated`

`INITIATED`

`payout.initiated`

`sent`

`SENT`

`payout.sent`

`processed`

`PROCESSED`

`payout.processed`

`failed`

`FAILED`

`payout.failed`

`rejected`

`REJECTED`

`payout.rejected`

`cancelled`

`CANCELLED`

`payout.cancelled`

### Payload[](#payload)

Field

Meaning

`event_type`

`payout.<status>` — the event that fired.

`payout_id`

The payout `id` (matches the `id` from Create / Get Payout).

`network / token`

Blockchain code and currency.

`amount / amount_usd`

Crypto amount sent and its USD value.

`email / address`

Recipient email and destination wallet address.

`from_address`

Project hot wallet that paid out (empty until assigned).

`tx_hash`

On-chain hash (empty until `initiated`).

`status`

Uppercase webhook status (see the mapping table).

`withdrawal_type`

`payout_merchant` for payouts created via this API.

`currency_type`

`token` (ERC20/TRC20) or `coin` (native ETH/POL/TRX).

`created_at / updated_at / timestamp`

Unix epoch seconds.

`failure_reason`

Reason string on `payout.failed` (empty otherwise).

> Always respond `2xx` to acknowledge. If your endpoint is unreachable or errors, PayRam marks the delivery `failed` after retries — you can still reconcile via **Get All Payouts** / **Payout Status**.

[PreviousGET All Payouts](/api-integration/payouts-apis/get-all-payouts)[NextApproving Held Payouts](/api-integration/payouts-apis/approving-held-payouts)

Last updated 1 hour ago