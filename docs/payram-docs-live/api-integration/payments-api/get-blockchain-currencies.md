For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payments-api/get-blockchain-currencies.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [⚡Payments API](/api-integration/payments-api)

# 🪙Get Blockchain Currencies

In this section, you’ll learn how to fetch all available blockchain deposit options for a specific payment using its reference\_id.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FlFo1Aof5UsSuwodjju9o%2Fpayram-payment-apis-get-blockchain-currencies.png&width=768&dpr=3&quality=100&sign=8fbeb70a&sv=2)

* * *

## URL Details[](#url-details)

Parameter

Description

Example

BASE\_URL

Your PayRam Site URL — find it under **Settings → Site URL** in your dashboard. Include the port if you installed on one.

`https://pay.example.com`

API Endpoint

Endpoint to list the deposit options available for a payment.

`/api/v1/blockchain-currency/reference/{reference_id}`

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
    
-   reference\_id → Use the value returned from the Create Payment API
    

## curl response[](#curl-response)

You’ll receive an array of blockchain currencies for that payment:

-   Available networks & coins – e.g., ETH/USDC on Ethereum, BTC on Bitcoin, USDT on Tron, etc.
    
-   Deposit info per option – including token contract address, precision, and family.
    
-   Customer address state – customerAddress is empty for first-time users (no deposit address assigned yet).
    

#### Response breakdown[](#response-breakdown)

-   blockchainCode – Blockchain symbol (e.g., ETH, BTC, TRX, BASE).
    
-   network – Network name (e.g., Ethereum, Base, Polygon, Tron).
    
-   currencyCode / currency – Token or coin name (e.g., USDC, ETH).
    
-   customerAddress – Deposit address for the user (empty if not yet assigned).
    
-   tokenAddress – Token’s contract or native address.
    
-   standard – Token type (ERC20, TRC20, BTC, etc.).
    
-   walletPrecision – Decimal precision supported.
    
-   family – Blockchain family group (e.g., ETH\_Family).
    
-   recommended / mostUsed – Suggested or frequently used options for display.
    

**NOTE** **:** **If customerAddress is empty for a given family, you can call the** **Assign Deposit Address API** **to assign a static deposit address for that user on that blockchain family.**

[PreviousFetch Tickers](/api-integration/payments-api/fetch-tickers)[NextAssign Deposit Address](/api-integration/payments-api/assign-deposit-address)

Last updated 4 hours ago