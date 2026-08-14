For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis/create-payouts.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# 🌟Create Payouts

In this section, you’ll learn how to create a payout in PayRam to send funds directly to a recipient’s wallet on the selected blockchain.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FO2IPnGNAlwUzG7PQqKNQ%2Fpayram-create-payouts.png&width=768&dpr=3&quality=100&sign=ddf66a40&sv=2)

Create a payout to send funds directly to a recipient’s wallet on the selected blockchain. PayRam validates the request, applies your project’s payout limits, and either queues the payout for sending or holds it for manual approval.

* * *

### Authentication[](#authentication)

This endpoint is **project-API-key only**. Use the API key generated for the project you’re paying out from (Project → API Keys). The payout is created under that key’s project.

### Endpoint[](#endpoint)

Item

Value

`BASE_URL`

Your PayRam server URL, e.g. `https://yourdomain.com`

Method

`POST`

> BASE\_URL: use your plain HTTPS domain (`https://yourdomain.com`).

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

`Idempotency-Key`

No

A unique value of your choosing, e.g. `payout-2026-08-13-00417`. See **Preventing duplicate payouts**.

### Request Body[](#request-body)

Field

Type

Required

Description

`email`

string

✅ Yes

Recipient’s email address (must be a valid email).

`blockchainCode`

string

✅ Yes

Blockchain network. One of `ETH`, `BASE`, `POLYGON`, `TRX`.

`currencyCode`

string

✅ Yes

Token or native coin to send, e.g. `USDC`, `USDT`, `ETH`, `POL`, `TRX`. Must be enabled for the project on the chosen chain.

`amount`

string (decimal)

✅ Yes

**Crypto amount** to send, in the currency’s own units — **not USD**. E.g. `"100"` = 100 USDC. See “Amounts are in crypto” below.

`toAddress`

string

✅ Yes

Recipient wallet address; must be valid for `blockchainCode`.

`customerID`

string

✅ Yes\*

Your unique identifier for the recipient in your system. \*Technically optional in the schema, but a payout **cannot be created without it** — omitting it returns an error. Always send it.

`mobileNumber`

string

❌ Optional

Recipient’s mobile number.

`residentialAddress`

string

❌ Optional

Recipient’s address.

`idempotencyKey`

string

❌ Optional

Alternative to the `Idempotency-Key` header. If both are sent, the header wins.

### Amounts are in Crypto (not USD)[](#amounts-are-in-crypto-not-usd)

`amount` is the exact on-chain amount in the currency’s units (e.g. `"100"` USDC sends 100 USDC; `"0.05"` ETH sends 0.05 ETH). PayRam computes the USD value internally for limit checks.

If your system works in fiat, convert USD → crypto **before** creating the payout using the public ticker endpoint, then send the resulting crypto amount:

1.  `GET {BASE_URL}/api/v1/ticker` returns each currency’s live USD `price` and `walletPrecision`.
    
2.  `cryptoAmount = usdAmount / price`, rounded to that currency’s `walletPrecision`. (Stablecoins have `price = "1.0"`, so the crypto amount equals the USD amount.)
    
3.  Create the payout with that `amount`.
    

> **Native coins are supported.** You can pay out native `ETH`, `POL`, and `TRX` (not only tokens). **BTC is not supported for payouts.**

### Payout Limits and Approval[](#payout-limits-and-approval)

At creation, PayRam evaluates the payout (in USD) against your project’s limits, **per recipient member within the project**:

-   **Auto-approve amount** — payouts at or under this are auto-approved and queued for sending (`status: "pending"`). Payouts above it require manual approval (`status: "pending-approval"`).
    
-   **Hourly limit** / **Daily limit** — if the member’s cumulative payouts in this project for the current hour/day would exceed these, the payout is held for approval.
    
-   **Minimum payout** — payouts below this are rejected outright.
    

When a payout is held, the response `status` is `pending-approval` and `attributes.approvalReason` explains why (`above_auto_approve`, `daily_limit_exceeded`, `hourly_limit_exceeded`, etc.). An admin then approves/rejects it from the dashboard.

> These thresholds are configured per installation and can be overridden per project in the dashboard (**Project → Payout Limits**; the global minimum lives under **Settings → Withdrawal Limits**). Contact PayRam support to change global defaults. Don’t hard-code specific limit values in your integration — read them from your dashboard.

### Idempotency key[](#idempotency-key)

**Always send an idempotency key.** A payout moves real money. If your request times out and you retry it without a key, PayRam cannot tell that retry apart from a deliberate second payment and will send the funds twice.

Generate a unique value per payout before your first attempt, store it alongside the payout in your own system, and send it as the `Idempotency-Key` header (or as `idempotencyKey` in the body). Use something you can look up again, such as an order ID — not a timestamp, or a retry would produce a different key.

Retry with the **same** key and PayRam returns the original payout instead of creating a second one. Keys are scoped per project and never expire.

If you create a payout **without** a key and it matches another from the last 5 minutes — same project, recipient address, amount, currency and chain — it is rejected with `409 PAYOUT_DUPLICATE_REQUEST`. Send a key if you genuinely need two identical payouts in that window.

**Note**: Idempotency keys require **PayRam v3.6.0 or later**. On older versions the key is ignored.

* * *

### Example Request[](#example-request)

### Example Response[](#example-response)

`201 Created` — the created payout object:

`status` will be:

-   `**pending**` — auto-approved (within limits); queued for sending.
    
-   `**pending-approval**` — held for manual admin approval (see `attributes.approvalReason`).
    

> **The** `**id**` **field is important** — it uniquely identifies the payout. Store it; you’ll use it to track status via `GET /api/v1/withdrawal/{id}/merchant` (or find it in the list endpoint).

### Tracking Status[](#tracking-status)

Track status either way:

-   **Webhooks (recommended)** — get a `payout.<status>` event pushed to you on every change (see **Payout Webhooks**).
    
-   **Polling** — `GET /api/v1/withdrawal/{id}/merchant` (single) or `GET /api/v1/withdrawal/merchant` (list).
    

The payout moves through: `pending-approval → pending → initiated → sent → processed` (`failed` / `rejected` are terminal). See the **Status lifecycle** in the Overview.

### Errors[](#errors)

HTTP

When

400

Missing/invalid required field (`email` not a valid email, missing `blockchainCode` / `currencyCode` / `amount` / `toAddress`, invalid wallet address for the chain, or invalid blockchain/currency combination).

400

`PAYOUT_AMOUNT_BELOW_MINIMUM` (amount below the project minimum), or `PAYOUT_CURRENCY_DISABLED` (currency not enabled for payouts).

409

`PAYOUT_DUPLICATE_REQUEST` — a matching payout was created in the last 5 minutes and no idempotency key was sent. See **Preventing duplicate payouts**.

401

Missing/invalid `API-Key`, or a non-project key.

500

`customerID` omitted (“failed to create customer”), `BTC` selected (not supported for payouts), or an unexpected server error.

503

`EXCHANGE_RATE_UNAVAILABLE` — a live exchange rate couldn’t be fetched for a non-stablecoin (retryable; try again shortly).

### Convert USD → Crypto (Ticker)[](#convert-usd-crypto-ticker)

The Create Payout API takes a **crypto** `amount`, but many systems work in **fiat (USD)**. Use the ticker endpoint to fetch live USD prices, convert your USD amount to the crypto amount, then create the payout. This keeps your conversion aligned with the same pricing PayRam uses internally for its limit checks.

### Endpoint[](#endpoint-1)

**Public** — no `API-Key` required. Returns every currency configured on your server with its current USD price.

### Example Request[](#example-request-1)

### Example Response[](#example-response-1)

`200 OK` — an array, one entry per blockchain + currency:

Field

Meaning

`blockchainCode` / `currencyCode`

The chain + currency this price applies to.

`price`

Current price of **1 unit of the currency in USD** (stablecoins are `"1.0"`).

`walletPrecision`

Decimal places to round the converted crypto amount to.

`tokenAddress`

Token contract (`0x000…000` for native coins).

`standard`

`native`, `ERC20`, `TRC20`, etc.

### How to Convert[](#how-to-convert)

For the currency you’re paying out, find the matching row (by `blockchainCode` + `currencyCode`), then:

-   **Stablecoins** (`price = "1.0"`) → `cryptoAmount = usdAmount`.
    
-   **Other currencies** → divide by `price` and round to `walletPrecision`.
    

**Example:** pay out **$50 in ETH** when `price = "1659.57"`: `50 / 1659.57 = 0.030128…` → rounded to 18 dp → `amount: "0.030128..."`.

#### Recommended flow[](#recommended-flow)

1.  Your back office validates the **USD** amount (your own rules).
    
2.  `GET /api/v1/ticker` → look up the target currency’s `price` and `walletPrecision`.
    
3.  Convert USD → crypto and round to `walletPrecision`.
    
4.  `POST /api/v1/withdrawal/merchant` with the resulting crypto `amount`.
    

> Fetch the ticker **right before** creating the payout so the rate is current. Rounding to `walletPrecision` avoids “fractional base unit” rejections on create.

[PreviousOverview](/api-integration/payouts-apis/overview)[NextGET Single Payout](/api-integration/payouts-apis/get-single-payout)

Last updated 8 hours ago