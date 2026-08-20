For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis/overview.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# 📘Overview

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FTh2uijiaNvL6SpgUdQPj%252Fpayram-payout-overview.png%3Falt%3Dmedia%26token%3De0af03f8-84a6-42a2-990d-86379c5047f8&width=768&dpr=3&quality=100&sign=2253880d&sv=2)

Send funds from your project to a recipient’s wallet, and track each payout to completion. This reference covers creating payouts, checking status, approving/rejecting payouts that are held for review, listing them, and receiving status updates via webhooks.

* * *

### Base URL[](#base-url)

Every endpoint is called as `{BASE_URL}/api/v1/...`. Your `BASE_URL` is the address your PayRam instance is reachable at — the same one you open the dashboard with.

1

### Open your PayRam dashboard[](#open-your-payram-dashboard)

Log in to your PayRam dashboard as usual.

2

### Go to Settings[](#go-to-settings)

Select **Settings** from the left menu.

3

### Open Site URL[](#open-site-url)

Select **Site URL**. The address shown under **Current site URL** is your `BASE_URL`.

Your setup

BASE\_URL

Domain with SSL

`https://pay.example.com`

Server IP, no SSL

`http://203.0.113.10`

Installed on a different port

`http://203.0.113.10:3000`

**Note**: PayRam serves the dashboard and the API from the same address, so there is no separate API port. If you installed on a port other than the default, include it in your `BASE_URL`.

### Authentication[](#authentication)

Every request authenticates with a **project API key** sent in the `API-Key` header. Generate one per project from the dashboard (**Project → API Keys**). All reads and creates are automatically **scoped to that key’s project** — you only ever see or act on your own project’s payouts.

Header

Required

Value

`API-Key`

Yes

Your project API key, e.g. `be703fa47ebe07121102ee260fb3d5c0`

`Content-Type`

Yes

`application/json`

> **Approve / Reject** are done from the dashboard.

### Version requirement[](#version-requirement)

The merchant payout endpoints (`/withdrawal/merchant`, `/withdrawal/{id}/merchant`) require **PayRam v3.1.1 or later**. On older versions they return `404`.

Idempotency keys on payout creation require **PayRam v3.6.0 or later**. On older versions the key is ignored.

### Endpoints at a glance[](#endpoints-at-a-glance)

Method

Path

Purpose

`POST`

`/api/v1/withdrawal/merchant`

Create a payout

`GET`

`/api/v1/withdrawal/{id}/merchant`

Get one payout / check its status

`GET`

`/api/v1/ticker`

Live USD prices (for USD → crypto conversion)

`GET`

`/api/v1/withdrawal/merchant`

List your project’s payouts

### Amounts are in crypto[](#amounts-are-in-crypto)

The payout `amount` is the **crypto amount** in the currency’s own units (e.g. `"100"` USDC = 100 USDC; `"0.05"` ETH = 0.05 ETH) — **not USD**. If your system works in fiat, convert USD → crypto first using the ticker (see **Convert USD → Crypto**).

### Supported networks & currencies[](#supported-networks-and-currencies)

-   **Networks:** `ETH`, `BASE`, `POLYGON` (EVM), and `TRX`.
    
-   **Currencies:** tokens (e.g. `USDC`, `USDT`) and native coins (`ETH`, `POL`, `TRX`), as enabled for your project on each chain.
    
-   **BTC is not supported for payouts.**
    

### Status lifecycle[](#status-lifecycle)

Every payout reports a `status`:

Status

Meaning

`pending-otp-verification`

Waiting for OTP verification before processing.

`pending-approval`

Held for manual approval — exceeded the auto-approve amount or an hourly/daily limit (`attributes.approvalReason` says which).

`pending`

Approved (or auto-approved) and queued for on-chain processing.

`initiated`

Broadcast to the blockchain (`txHash` set); awaiting confirmation.

`sent`

Transaction confirmed on-chain.

`processed`

Confirmed and recorded in accounting — fully complete.

`failed`

Processing failed — see `failureReason`.

`rejected`

Declined by an admin (or the system).

`cancelled`

Intentionally stopped before being sent/processed.

**Terminal states:** `processed`, `failed`, `rejected`, `cancelled`.

### Tracking payouts[](#tracking-payouts)

Two ways to track a payout to completion:

-   **Webhooks (recommended)** — PayRam POSTs a `payout.<status>` event to your registered webhook URL on every status change. See **Payout Webhooks** at the end of this doc.
    
-   **Polling** — `GET /api/v1/withdrawal/{id}/merchant` (or the list endpoint) until the payout reaches a terminal state.
    

[PreviousPayouts APIs](/api-integration/payouts-apis)[NextCreate Payouts](/api-integration/payouts-apis/create-payouts)

Last updated 2 hours ago