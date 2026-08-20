For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis/get-single-payout.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# ⬆️GET Single Payout

In this section, you’ll learn how to retrieve a singl payout records from your PayRam server, including their details and current statuses.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FVB9XHt1vRKLLTG29OIOS%252Fpayram-get-single-payouts.png%3Falt%3Dmedia%26token%3D0bab443a-ad4f-4932-95a5-5c006f4aa11c&width=768&dpr=3&quality=100&sign=2c4bbd1b&sv=2)

Check the current status of a payout by its id (the id returned by Create Payout). This is the endpoint to poll after creating a payout.

* * *

### Authentication[](#authentication)

**Project-API-key only**. Results are scoped to the API key’s own project: a payout id that belongs to a different project returns **404** (not another project’s data). Type-restricted to merchant payouts (`payout_merchant`).

> **Requires PayRam v3.1.1 or later.** On earlier versions this endpoint returns 404.

### Endpoint[](#endpoint)

Path parameter

Description

Example

`id`

The payout id returned by Create Payout.

`120`

### Headers[](#headers)

Header

Required

Example

`API-Key`

Yes

`be703fa47ebe07121102ee260fb3d5c0` (project key)

`Content-Type`

Yes

`application/json`

### Example Request[](#example-request)

### Example Response[](#example-response)

`200 OK` — a single payout object (same shape as the items in _Get All Payouts_):

See **Key Response Fields** in _Get All Payouts_ for the meaning of every field.

### Payout statuses[](#payout-statuses)

Check the `status` field to know where the payout is in its lifecycle:

Status

Meaning

`pending-otp-verification`

Waiting for OTP verification before processing.

`pending-approval`

Held for manual approval — the payout exceeded the auto-approve amount or an hourly/daily limit. `attributes.approvalReason` explains why.

`pending`

Approved (or auto-approved) and queued for on-chain processing.

`initiated`

Broadcast to the blockchain (`txHash` is set); awaiting confirmation.

`sent`

Transaction confirmed on-chain.

`processed`

Confirmed and recorded in PayRam’s accounting — fully complete.

`failed`

Processing failed — see `failureReason` for the specific cause.

`rejected`

Declined by an admin (or the system).

`cancelled`

Intentionally stopped before being sent/processed.

**Terminal states:** `processed`, `failed`, `rejected`, `cancelled` — stop polling once a payout reaches one of these.

### Polling guidance[](#polling-guidance)

If you aren’t using **Payout Webhooks** (recommended — see the last section), poll this endpoint until the payout reaches a terminal state. A sensible cadence is every few seconds right after creation, backing off to longer intervals; a payout typically reaches `sent/processed` within a few minutes once it’s on-chain. For a `pending-approval` payout, poll until an admin approves it (then it continues to `sent/processed`) or rejects it.

HTTP

When

`401`

Missing/invalid `API-Key`, or a non-project key.

`404`

No payout with that id in your project (or the endpoint isn’t present on PayRam < v3.1.1). Response: `{ "message": "not found" }`.

[PreviousCreate Payouts](/api-integration/payouts-apis/create-payouts)[NextGET All Payouts](/api-integration/payouts-apis/get-all-payouts)

Last updated 7 hours ago