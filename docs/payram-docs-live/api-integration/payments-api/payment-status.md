For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payments-api/payment-status.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [⚡Payments API](/api-integration/payments-api)

# ☑️Payment Status

In this section, you’ll learn how to fetch the current payment status for a specific transaction using its reference\_id.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FtxWxC3Fhsyt4MylRugMg%2Fpayram-payment-payment-status.png&width=768&dpr=3&quality=100&sign=8ac96591&sv=2)

* * *

## URL Details[](#url-details)

Parameter

Description

Example

BASE\_URL

Your PayRam Site URL — find it under **Settings → Site URL** in your dashboard. Include the port if you installed on one.

`https://pay.example.com`

API Endpoint

Endpoint to fetch the current status of a payment.

`/api/v1/payment/reference/{reference_id}`

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

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

## curl request[](#curl-request)

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    

## curl response[](#curl-response)

You’ll receive the payment record, including:

-   Identifiers – the reference ID, invoice ID, and your customer ID
    
-   Amount – the requested amount in USD
    
-   State – the current `paymentState` (see the table below)
    

**Note :** **Check the paymentState field in the response to track the payment status.**

STATUS

DESCRIPTION

OPEN

The payment has not been processed yet.

CANCELLED

The payment link has expired.

FILLED

The user has paid the full requested amount.

PARTIALLY\_FILLED

The user has paid less than the requested amount.

OVER\_FILLED

The user has paid more than the requested amount.

[PreviousAssign Deposit Address](/api-integration/payments-api/assign-deposit-address)[NextWebhook](/api-integration/payments-api/webhook)

Last updated 7 hours ago