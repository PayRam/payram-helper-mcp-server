copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# ↘️GET All Payouts

In this section, you’ll learn how to retrieve all payout records from your PayRam server, including their details and current statuses.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FbGlF2O8WvckKrWgbHpfG%2Fpayram-get-all-payouts.png&width=768&dpr=3&quality=100&sign=c072bbb7&sv=2)

* * *

## 

[hashtag](#url-details)

URL Details

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

Parameter

Description

BASE\_URL

Your PayRam server URL

[https://yourdomain.com:8443 arrow-up-right](https://yourdomain.com:8443
)

API Endpoint

Full endpoint path for retrieving all payouts.

/api/v1/withdrawal/merchant

## 

[hashtag](#query-parameters)

Query Parameters

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

Parameter

Description

Example

limit

Defines how many payout records to fetch per request. Optional but recommended for pagination.

10

offset

Specifies where to start fetching results (used for pagination). Optional.

0

order

Sorting order. Use ASC for ascending or DESC for descending.

DESC

sortBy

Field name to sort results by (e.g., createdAt, amount).

createdAt

circle-info

**Note**: **If you don’t include limit or offset, all payouts will be retrieved by default.**

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

This API returns an array of payout records. Each object in the array represents a single payout entry from your PayRam database.

[PreviousPayouts Statuschevron-left](/api-integration/payouts-apis/payouts-status)[NextTypescript/Javascript SDKchevron-right](/payram-sdk/typescript-javascript-sdk)