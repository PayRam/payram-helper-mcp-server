For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis/get-all-payouts.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# ↕️GET All Payouts

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FhVGgK2zbMuCB7ukDVBcC%252Fimage.png%3Falt%3Dmedia%26token%3Da7c946bd-ed75-45c7-a89c-9f9f05ce4aca&width=768&dpr=3&quality=100&sign=fd9148ac&sv=2)

Retrieve payout (merchant withdrawal) records for your project — with filtering, sorting, and pagination.

### Authentication[](#authentication)

This endpoint is **project-API-key only**. Generate a key per project from the PayRam dashboard (Project → API Keys). Results are automatically scoped to that key’s project — you only ever see your own project’s payouts.

> **Requires PayRam v3.1.1 or later.** On earlier versions this endpoint returns 404.

### Endpoint[](#endpoint)

Item

Value

`BASE_URL`

Your PayRam server URL, e.g. `https://yourdomain.com`

Method

`GET`

BASE\_URL: use your plain HTTPS domain (`https://yourdomain.com`).

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

> You can generate a unique API key for each project from the PayRam dashboard, so you can manage and track payouts separately per project.

### Query Parameters[](#query-parameters)

All optional. Parameters marked `[]` may be repeated (e.g. `?status=sent&status=processed`).

### Pagination and Sorting[](#pagination-and-sorting)

Parameter

Description

Example

`limit`

Records per page. **Defaults to 100 and is capped at 100** (larger values are clamped).

`20`

`offset`

Starting offset for paging.

`40`

`order`

`ASC` or `DESC`. Default `DESC`.

`DESC`

`sortBy`

Column to sort by — **use the snake\_case DB column** (`created_at`, `amount`, `id`, `status`). Default `id`.

`created_at`

`greaterThanID` / `lessThanID`

Keyset pagination by id (alternative to `offset`).

`200`

`createdAfter` / `createdBefore`

Creation-time range (RFC3339).

`2026-06-01T00:00:00Z`

`updatedAfter` / `updatedBefore`

Last-update range (RFC3339).

`startDate` / `endDate`

Creation-date range (RFC3339).

> ⚠️ `sortBy` must be a real snake\_case column (`created_at`, **not** `createdAt`) — a camelCase value returns **500**.
> 
> ⚠️ There is **no “return everything”**: omitting `limit` returns at most 100. Page with `offset` (or `greaterThanID`) until a page returns fewer than `limit` rows.

### Filters[](#filters)

Parameter

Description

Example

`status` `[]`

Payout status (see lifecycle in the Overview).

`status=sent`

`types` `[]`

Payout type — for merchant payouts use `payout_merchant`.

`types=payout_merchant`

`blockchainCode` `[]`

Chain code.

`blockchainCode=ETH`

`toAddress` `[]`

Recipient address(es).

`fromAddress` `[]`

Sending hot-wallet address(es).

`recipientEmails` `[]`

Recipient email(s).

`recipientEmails=test@test.com`

`recipientIDs` `[]`

Recipient member IDs.

`search`

Free-text, case-insensitive substring across **recipient email, from address, to address, tx hash**.

`search=0xabc`

### Example Request[](#example-request)

### Example Response[](#example-response)

`200 OK` — a JSON **array** of payout objects:

### Key Response Fields[](#key-response-fields)

Field

Meaning

`id`

Payout ID (use with `GET /withdrawal/{id}/merchant`).

`status`

Lifecycle state (see the Overview).

`currencyType`

`token` (ERC20/TRC20, e.g. USDC/USDT) or `coin` (native ETH/POL/TRX).

`amount / amountInUSD`

Token amount / USD value at creation.

`priceInUSD`

Unit price used at creation (stablecoins = `1`).

`fee`

On-chain network fee (set once sent).

`fromAddress`

Project hot wallet paying out.

`toAddress / tokenAddress`

Recipient; token contract (`0x000…000` for native coins).

`txHash`

On-chain hash (set from `initiated` onward).

`attributes`

JSON; for `pending-approval` contains `approvalReason` (why approval is required).

`failureReason`

Specific cause on failed/stuck payouts.

`webhookStatus`

Payout webhook delivery state — `received` (your endpoint accepted it) or `failed` (delivery failed after retries).

`createdBy`

Origin of the payout.

### Pagination Pattern[](#pagination-pattern)

### Errors[](#errors)

HTTP

`code`

When

401

`UNAUTHORIZED`

Missing/invalid `API-Key`, or a non-project key (JWT / member-linked).

400

`BAD_REQUEST`

Malformed query parameters.

404

—

Endpoint not present (PayRam < v3.1.1).

500

`INTERNAL_SERVER_ERROR`

Invalid `sortBy` (camelCase instead of snake\_case), or server error.

[PreviousGET Single Payout](/api-integration/payouts-apis/get-single-payout)[NextPayout Webhooks](/api-integration/payouts-apis/payout-webhooks)

Last updated 2 hours ago