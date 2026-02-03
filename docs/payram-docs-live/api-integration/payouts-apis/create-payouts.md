copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# 🌟Create Payouts

In this section, you’ll learn how to create a payout in PayRam to send funds directly to a recipient’s wallet on the selected blockchain.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2Fih2o8Y9DdojFifrrPx2H%2Fpayram-create-payouts.png&width=768&dpr=3&quality=100&sign=84461a68&sv=2)

* * *

## 

[hashtag](#url-details)

URL Details

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

Parameter

Description

Example

BASE\_URL

Your PayRam server URL. This varies depending on where you’ve hosted PayRam (with or without SSL).

[https://yourdomain.com:8443 arrow-up-right](https://yourdomain.com:8443
)

API Endpoint

Full endpoint path to create a payout request.

/api/v1/withdrawal/merchant

## 

[hashtag](#headers)

Headers

Headers are required for authenticating and defining the content type of your request.

Header

Description

Example

API-Key

Your unique PayRam API key generated from your dashboard.

be703fa47ebe07121102ee260fb3d5c0

Content-Type

Specifies that the request body is in JSON format.

application/json

circle-info

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

## 

[hashtag](#request-body)

Request Body

The body contains all required details for processing the payout. All fields are mandatory and must be provided.

Field

Description

Example

Required

email

Recipient’s email address.

[\[email protected\]](/cdn-cgi/l/email-protection)

✅ Yes

blockChainCode

Blockchain network used for the payout (e.g., ETH, TRX, BASE)

ETH

✅ Yes

currencyCode

Token symbol to be used for the payout (e.g., USDC, USDT).

USDC

✅ Yes

amount

Amount to transfer.

100000

✅ Yes

toAddress

Recipient’s wallet address must belong to the selected blockchain.

0x291b68732f14F47Fd21bE81ec5Cf1bcfC0DB14Ea

✅ Yes

mobileNumber

Recipient’s mobile number.

123456789

❌ Optional

residentialAddress

Recipient’s address.

No 22 oc street

❌ Optional

customerID

Unique identifier for the customer.

414817384

✅ Yes

## 

[hashtag](#curl-request)

curl Request

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <API\_KEY> → Your PayRam API key
    

circle-exclamation

#### 

[hashtag](#default-payout-limits)

Default Payout Limits

-   Auto-approve limit: Payouts up to $500 are automatically approved.
    
-   Hourly limit: You can process up to $5,000 in total payouts per hour.
    
-   Daily limit: You can process up to $10,000 in total payouts per day.
    

If any of these limits are exceeded, the payout must be approved by an Admin from the dashboard before processing. These default values can be customized as well, contact PayRam support for more details.

circle-info

**Available blockchain codes: ETH (Ethereum), TRX (Tron), BASE (Base)**

## 

[hashtag](#curl-response)

curl response

This API returns detailed information about the payout, including the amount, currency used, recipient wallet address, and current status.

circle-info

**Note: The id field is very important. It uniquely identifies the payout and will be required for checking its status or performing any follow-up actions.**

[PreviousPayouts APIschevron-left](/api-integration/payouts-apis)[NextPayouts Statuschevron-right](/api-integration/payouts-apis/payouts-status)