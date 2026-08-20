For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payments-api/create-payment.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [⚡Payments API](/api-integration/payments-api)

# ✨Create Payment

In this section, you’ll learn how to create a payment link using the PayRam API for customers to make payments easily.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fx56GsGsbGOGBWmMJC2yw%2Fpayram-payment-apis-create-payment.png&width=768&dpr=3&quality=100&sign=8b658502&sv=2)

* * *

## URL Details[](#url-details)

Parameter

Description

Example

BASE\_URL

Your PayRam Site URL — find it under **Settings → Site URL** in your dashboard. Include the port if you installed on one.

`https://pay.example.com`

API Endpoint

Endpoint to create a new payment link.

`/api/v1/payment`

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

## Headers[](#headers)

Header

Description

Example

API-Key

Your unique PayRam API key generated from your dashboard.

811b12035f0dfa8ffd62296df3c98b27

Content-Type

Format of the request data.

application/json

## Request Body[](#request-body)

Field

Required

Description

Example

customerEmail

Yes

Customer’s email address where the payment link will be associated.

test@payram.com

customerID

Yes

Unique identifier for the customer.

1

amountInUSD

Yes

The payment amount in USD.

10

invoiceID

No

Your own invoice reference. Returned as `invoice_id` in the payment webhook.

INV-0090

expire

No

When the payment link expires, as an RFC 3339 timestamp. Defaults to 24 hours from creation.

2026-08-20T10:00:00Z

currency

No

Restricts the payment to a single currency. Omit to let the customer choose.

USDC

network

No

Restricts the payment to a single blockchain. Use together with `currency`.

BASE

**Payment links expire after 24 hours by default.** Once expired, the payment moves to `CANCELLED`. Send `expire` to set a different window.

## curl request[](#curl-request)

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    
-   Replace the request body fields with real customer data
    

## curl response[](#curl-response)

**Note** **: The url field provides a ready-to-use PayRam payment page. You can share this link directly with your customers, or build a custom UI using other API endpoints.**

[PreviousPayments API](/api-integration/payments-api)[NextFetch Tickers](/api-integration/payments-api/fetch-tickers)

Last updated 4 hours ago