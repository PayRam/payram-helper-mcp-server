For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payments-api/fetch-tickers.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [⚡Payments API](/api-integration/payments-api)

# 🔄Fetch Tickers

In this section, you’ll learn how to fetch all supported tickers using the PayRam API, allowing you to display real-time token and blockchain options available for user payments.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fnzh0TSnDEazDI5HOYtVU%2Fpayram-payment-apis-create-payment%2520%282%29.png&width=768&dpr=3&quality=100&sign=db4b4e3e&sv=2)

* * *

## URL Details[](#url-details)

Parameter

Description

Example

BASE\_URL

Your PayRam Site URL — find it under **Settings → Site URL** in your dashboard. Include the port if you installed on one.

`https://pay.example.com`

API Endpoint

Endpoint to fetch supported currencies and their live USD prices.

`/api/v1/ticker`

## Headers[](#headers)

**Note**: This is a public endpoint. No API key is required.

## curl request[](#curl-request)

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    
-   Replace the request body fields with real customer data
    

## curl response[](#curl-response)

You’ll receive a list of supported blockchain assets, each containing:

-   Blockchain info – e.g., ETH, BTC, TRX, BASE
    
-   Token details – contract address, precision, and standard
    
-   Live pricing – current USD value for each token
    

**Note :** **Each object represents a supported token on PayRam with its blockchain code, token standard, and real-time price.**

[PreviousCreate Payment](/api-integration/payments-api/create-payment)[NextGet Blockchain Currencies](/api-integration/payments-api/get-blockchain-currencies)

Last updated 4 hours ago