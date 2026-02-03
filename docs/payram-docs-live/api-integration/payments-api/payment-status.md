copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [⚡Payments API](/api-integration/payments-api)

# ☑️Payment Status

In this section, you’ll learn how to fetch the current payment status for a specific transaction using its reference\_id.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FAJNiry2AqTlM9AzkvHnR%2Fpayram-payment-payment-status.png&width=768&dpr=3&quality=100&sign=1df8c2ad&sv=2)

* * *

## 

[hashtag](#url-details)

URL Details

Parameter

Description

Example

BASE\_URL

Your PayRam server URL

[https://yourdomain.com:8443 arrow-up-right](https://yourdomain.com:8443
)

API Endpoint

Endpoint to create a new payment link.

/api/v1/ticker

## 

[hashtag](#headers)

Headers

Header

Description

Example

API-Key

Your unique PayRam API key generated from your dashboard.

811b12035f0dfa8ffd62296df3c98b27

Content-Type

Format of the request data.

application/json

circle-info

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

## 

[hashtag](#curl-request)

curl request

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    

## 

[hashtag](#curl-response)

curl response

You’ll receive a list of supported blockchain assets, each containing:

-   Blockchain info – e.g., ETH, BTC, TRX, BASE
    
-   Token details – contract address, precision, and standard
    
-   Live pricing – current USD value for each token
    

circle-info

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

[PreviousAssign Deposit Addresschevron-left](/api-integration/payments-api/assign-deposit-address)[NextWebhookchevron-right](/api-integration/payments-api/webhook)

Last updated 1 day ago