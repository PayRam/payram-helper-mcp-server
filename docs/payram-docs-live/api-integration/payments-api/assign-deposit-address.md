For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payments-api/assign-deposit-address.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [⚡Payments API](/api-integration/payments-api)

# ↘️Assign Deposit Address

In this section, you’ll learn how to assign a static deposit address to a user for a given blockchain family.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2F4wTeL86ZviiN3VkCxCod%2Fpayram-payment-apis-assign-deposit-address.png&width=768&dpr=3&quality=100&sign=10ba884d&sv=2)

* * *

## URL Details[](#url-details)

Parameter

Description

Example

BASE\_URL

Your PayRam Site URL — find it under **Settings → Site URL** in your dashboard. Include the port if you installed on one.

`https://pay.example.com`

API Endpoint

Endpoint to assign a deposit address to a customer.

`/api/v1/deposit-address/reference/{reference_id}`

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

## Request Body[](#request-body)

Field

Description

Example

blockchain\_code

Blockchain code to assign address for (BTC, ETH, TRX, BASE, POLYGON)

ETH

## curl request[](#curl-request)

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    
-   reference\_id → Use the value returned from the Create Payment API
    

## curl response[](#curl-response)

-   Address – The user’s assigned deposit address for this blockchain family. This address will be reused for all future payments in the same family.
    
-   Family – The blockchain family (e.g., ETH\_Family, BTC\_Family, TRX\_Family). Each family can include multiple chains — for example, Base, Polygon, and Ethereum share the same ETH\_Family.
    
-   Status – Indicates the current state of the assigned address (e.g., active, inactive).
    

**Note** **: Once a deposit address is assigned, it becomes permanent for that user within the same blockchain family. PayRam automatically reuses this address for subsequent transactions.**

[PreviousGet Blockchain Currencies](/api-integration/payments-api/get-blockchain-currencies)[NextPayment Status](/api-integration/payments-api/payment-status)

Last updated 4 hours ago