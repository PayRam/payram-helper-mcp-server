copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# ✳️Payouts Status

In this section, you’ll learn how to check the current payout status using a specific withdrawal ID.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FsPMY5IufYqceJx5SxWjQ%2Fpayram-payouts-status.png&width=768&dpr=3&quality=100&sign=5e795786&sv=2)

* * *

## 

[hashtag](#url-details)

URL Details

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

Parameter

Description

Example

BASE\_URL

Your PayRam server URL.

[https://yourdomain.com:8443arrow-up-right](https://yourdomain.com:8443
)

id

The unique payout ID you want to fetch.

120

API Endpoint

Endpoint to get details of a specific payout.

/api/v1/withdrawal/{id}/merchant

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

Format of the data being sent.

application/json

circle-info

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

## 

[hashtag](#curl-request)

curl Request

Before running the command, replace the placeholders with your actual details:

-   ${BASE\_URL} → Your PayRam server URL
    
-   <API\_KEY> → Your PayRam API key
    

## 

[hashtag](#curl-response)

curl Response

You’ll receive essential payout details such as the amount, currency, recipient address, and current status for the specified withdrawal ID.

circle-info

**Hint: Check the status field in the response to know the current payout state.**

The status field represents the payout’s current progress :

STATUS

DESCRIPTION

pending-otp-verification

Waiting for OTP verification before processing.

pending-approval

Awaiting admin or system approval.

pending

Approved and ready for blockchain processing.

initiated

Payout has been broadcast to the blockchain network and is awaiting confirmation.

sent

Payout successfully sent to the recipient.

failed

Transaction failed due to a processing error.

rejected

Payout request was declined by the system or admin.

processed

Transaction has been confirmed on the blockchain and recorded in the accounting

cancelled

The transaction was intentionally stopped before being sent or processed.

[PreviousCreate Payoutschevron-left](/api-integration/payouts-apis/create-payouts)[NextGET All Payoutschevron-right](/api-integration/payouts-apis/get-all-payouts)