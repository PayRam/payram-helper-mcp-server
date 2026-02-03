copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [⚡Payments API](/api-integration/payments-api)

# ↘️Assign Deposit Address

In this section, you’ll learn how to assign a static deposit address to a user for a given blockchain family.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FAeuT1j8HEx0IbVlqGpLv%2Fpayram-payment-apis-assign-deposit-address.png&width=768&dpr=3&quality=100&sign=c6254bc4&sv=2)

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

[hashtag](#request-body)

Request Body

Field

Description

Example

blockchain\_code

Blockchain code to assign address for (BTC, ETH, TRX, BASE, POLYGON)

ETH

## 

[hashtag](#curl-request)

curl request

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <your\_api\_key> → Your PayRam API key
    
-   reference\_id → Use the value returned from the Create Payment API
    

## 

[hashtag](#curl-response)

curl response

-   Address – The user’s assigned deposit address for this blockchain family. This address will be reused for all future payments in the same family.
    
-   Family – The blockchain family (e.g., ETH\_Family, BTC\_Family, TRX\_Family). Each family can include multiple chains — for example, Base, Polygon, and Ethereum share the same ETH\_Family.
    
-   Status – Indicates the current state of the assigned address (e.g., active, inactive).
    

circle-info

**Note** **: Once a deposit address is assigned, it becomes permanent for that user within the same blockchain family. PayRam automatically reuses this address for subsequent transactions.**

[PreviousGet Blockchain Currencieschevron-left](/api-integration/payments-api/get-blockchain-currencies)[NextPayment Statuschevron-right](/api-integration/payments-api/payment-status)

Last updated 1 day ago