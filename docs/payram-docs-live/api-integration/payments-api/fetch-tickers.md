copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [⚡Payments API](/api-integration/payments-api)

# 🔄Fetch Tickers

In this section, you’ll learn how to fetch all supported tickers using the PayRam API, allowing you to display real-time token and blockchain options available for user payments.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F72Ye5Vri9aU70eU1VCo8%2Fpayram-payment-apis-create-payment%2520%282%29.png&width=768&dpr=3&quality=100&sign=d1265868&sv=2)

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

[hashtag](#curl-request)

curl request

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    
-   Replace the request body fields with real customer data
    

## 

[hashtag](#curl-response)

curl response

You’ll receive a list of supported blockchain assets, each containing:

-   Blockchain info – e.g., ETH, BTC, TRX, BASE
    
-   Token details – contract address, precision, and standard
    
-   Live pricing – current USD value for each token
    

circle-info

**Note :** **Each object represents a supported token on PayRam with its blockchain code, token standard, and real-time price.**

[PreviousCreate Paymentchevron-left](/api-integration/payments-api/create-payment)[NextGet Blockchain Currencieschevron-right](/api-integration/payments-api/get-blockchain-currencies)