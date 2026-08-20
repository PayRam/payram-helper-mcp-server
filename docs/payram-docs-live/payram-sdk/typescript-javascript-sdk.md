For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/payram-sdk/typescript-javascript-sdk.md).

Copy

On this page

1.  [PayRam SDK](/payram-sdk)

# Typescript/Javascript SDK

A lightweight TypeScript SDK for connecting your backend to your self-hosted PayRam server.

## Introduction[](#introduction)

The PayRam TypeScript SDK helps your backend communicate smoothly with your self-hosted PayRam server. It provides a clean, type-safe interface so you don’t have to manually handle raw API calls, making integration simpler and more reliable. The SDK also includes built-in support for safe request retries and offers framework-friendly helpers for handling webhooks with minimal setup.

### Prerequisites[](#prerequisites)

Before you begin, make sure you have:

-   Your PayRam API Key, which is required for authenticating all requests sent through the SDK.
    
-   The Base URL of your PayRam server, which tells the SDK where your self-hosted PayRam instance is running.
    

## Installation[](#installation)

Install the SDK using your package manager of choice

npm

yarn

pnpm

Copy

```
npm install payram
```

Copy

```
yarn add payram
```

Copy

```
pnpm add payram
```

## QuickStart[](#quickstart)

-   Create a new PayRam client instance by passing your API key and server URL.
    
-   You can also provide optional configuration values such as timeouts and retry settings.
    

Copy

```
import { Payram } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,      //required
  baseUrl: process.env.PAYRAM_BASE_URL!,    //required
  config: {
    timeoutMs: 10_000,                      // Optional
    maxRetries: 2,                          // Optional
    retryPolicy: 'safe',                    // Optional
    // allowInsecureHttp: true,             // Optional
  },
});
```

Option

Type

Description

apiKey

string

Your PayRam API key used to authenticate all SDK requests.

baseUrl

string

The base URL of your self-hosted PayRam server.

timeoutMs

number

Request timeout in milliseconds.

maxRetries

number

Maximum number of retry attempts for a request.

retryPolicy

'none' | 'safe' | 'aggressive'

Controls retry behavior — none disables retries, safe retries idempotent calls, and aggressive retries all requests.

allowInsecureHttp

boolean

Set to false only if your PayRam server is running on an http:// URL (without SSL). Keep it true for https://

## Payments[](#payments)

In this section you'll get all the methods which are related to the payments

### Create Payments[](#create-payments)

-   Creates a new payment session by sending customer details and the amount to PayRam, and returns both a unique reference\_id for tracking and a redirect URL that your customer can visit to complete the payment.
    
-   These are the required fields you must include when creating a payment request using the PayRam SDK.
    

Field

Description

Required

customerEmail

Customer’s email address where the payment link will be sent/associated.

✅ Yes

customerId

Unique identifier for the customer.

✅ Yes

amountInUSD

The payment amount in USD.

✅ Yes

**Note : The url field provides a ready-to-use PayRam payment page. You can share this link directly with your customers, or build a custom UI using other API endpoints.**

### Payment Status[](#payment-status)

-   Fetches the latest payment details using the reference\_id and returns the current paymentState so you can track whether the payment is pending, completed, or failed.
    

-   Shows all payment states and what each one means.
    

Status

Description

OPEN

The payment has not been processed yet.

CANCELLED

The payment link has expired or was cancelled.

FILLED

The user has paid the full requested amount.

PARTIALLY\_FILLED

The user has paid less than the requested amount.

OVER\_FILLED

The user has paid more than the requested amount.

## Payout[](#payout)

In this section you'll get all the methods which are related to the payments

### Create Payout[](#create-payout)

-   Creates a new payout request by sending the merchant details, token information, amount, and destination wallet address to the PayRam server.
    
-   These are the required fields you must send when creating a payout through the PayRam SDK.
    

Field

Description

Required

email

Recipient’s email address.

✅ Yes

blockchainCode

Blockchain network used for the payout (e.g., ETH, TRX, BASE).

✅ Yes

currencyCode

Token symbol used for the payout (e.g., USDC, USDT).

✅ Yes

amount

Amount to transfer.

✅ Yes

toAddress

Recipient’s wallet address on the selected blockchain.

✅ Yes

customerID

Unique identifier for the customer.

✅ Yes

**Note: PayRam currently supports payouts in USDT (ETH, TRX) and USDC (ETH, BASE). Make sure the selected currency matches a supported network when creating a payout.**

### Payout Status[](#payout-status)

-   Retrieves the latest payout details using its ID so you can check whether the payout is still pending, awaiting approval, processing on-chain, completed, or failed.
    

-   Shows all payment states and what each one means.
    

Status

Description

pending-otp-verification

Waiting for OTP verification before processing.

pending-approval

Awaiting admin or system approval.

pending

Approved and ready for blockchain processing.

initiated

The payout has been broadcast to the blockchain and is awaiting confirmation.

sent

The payout has been successfully sent to the recipient.

failed

The transaction failed due to a processing error.

rejected

The payout request was declined by the admin or system.

processed

The payout is confirmed on-chain and recorded in the accounting.

cancelled

The transaction was stopped before being sent or processed.

## Webhook[](#webhook)

PayRam sends webhook events to your server whenever something important happens, such as a payment updates.

The SDK provides ready-to-use handlers for Express, Fastify, and Next.js (both App Router and Pages Router). These handlers help you process webhooks safely and correctly. They do the following:

-   Check the API-Key header to confirm the request really came from your PayRam server
    
-   Read and validate the webhook payload
    
-   Send back the correct response so PayRam knows your server received the event
    

Express Example

Fastify Example

Next.js Example (App Router)

**Note: The adapter handles verification and sends the reply automatically. No manual res.status(200) is required.**

## Validate Api Key[](#validate-api-key)

The verifyApiKey function lets you manually check the API key inside your request handler. Use it when you are handling webhooks with a custom framework and need to confirm the request is really from your PayRam server.

[PreviousEditing Payout Limits](/api-integration/payouts-apis/editing-payout-limits)[NextPayRam Shopify Plugin](/plugins/payram-shopify-plugin)

Last updated 9 hours ago