copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [⚡Payments API](/api-integration/payments-api)

# ✨Create Payment

In this section, you’ll learn how to create a payment link using the PayRam API for customers to make payments easily.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F3fqxCFqn6d7ynHOq0lml%2Fpayram-payment-apis-create-payment.png&width=768&dpr=3&quality=100&sign=f1ed33db&sv=2)

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

/api/v1/payment

circle-info

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

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

## 

[hashtag](#request-body)

Request Body

Field

Description

Example

customerEmail

Customer’s email address where the payment link will be associated.

[\[email protected\]](/cdn-cgi/l/email-protection)

customerID

Unique identifier for the customer.

1

amountInUSD

The payment amount in USD.

10

## 

[hashtag](#curl-request)

curl request

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    
-   Replace the request body fields with real customer data
    

## 

[hashtag](#curl-response)

curl response

circle-info

**Note** **: The url field provides a ready-to-use PayRam payment page. You can share this link directly with your customers, or build a custom UI using other API endpoints.**

[PreviousPayments APIchevron-left](/api-integration/payments-api)[NextFetch Tickerschevron-right](/api-integration/payments-api/fetch-tickers)