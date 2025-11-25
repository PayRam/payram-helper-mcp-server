# GET All Payouts

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FUSjmpLBGLTvohZZR65p4%2Fpayram-get-all-payouts.png?alt=media&#x26;token=bf7c00ef-cbc4-46b4-b6d8-5b1cfc1f2b52" alt=""><figcaption></figcaption></figure>

***

## URL Details

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

<table><thead><tr><th width="140.43359375">Parameter</th><th>Description</th><th></th></tr></thead><tbody><tr><td>BASE_URL</td><td>Your PayRam server URL </td><td><a href="https://yourdomain.com:8443">https://yourdomain.com:8443<br></a></td></tr><tr><td>API Endpoint</td><td>Full endpoint path for retrieving all payouts.</td><td>/api/v1/withdrawal/merchant</td></tr></tbody></table>

## Query Parameters

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

<table><thead><tr><th width="105.296875">Parameter</th><th width="517.796875">Description</th><th>Example</th></tr></thead><tbody><tr><td>limit</td><td>Defines how many payout records to fetch per request. Optional but recommended for pagination.</td><td>10</td></tr><tr><td>offset</td><td>Specifies where to start fetching results (used for pagination). Optional.</td><td>0</td></tr><tr><td>order</td><td>Sorting order. Use ASC for ascending or DESC for descending.</td><td>DESC</td></tr><tr><td>sortBy</td><td>Field name to sort results by (e.g., createdAt, amount).</td><td>createdAt</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark><mark style="color:$warning;">:</mark> <mark style="color:$success;">**If you don’t include limit or offset, all payouts will be retrieved by default.**</mark>
{% endhint %}

## Headers

Headers are required for authenticating and defining the content type of your request.

<table><thead><tr><th width="137.7890625">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>be703fa47ebe07121102ee260fb3d5c0</td></tr><tr><td>Content-Type</td><td>Format of the data being sent.</td><td>application/json</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## curl Request

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* \<API\_KEY> → Your PayRam API key

```
curl --location --request GET '${BASE_URL}/api/v1/withdrawal' \
--header 'API-Key: <API_KEY>' \
--header 'Content-Type: application/json'
```

## curl Response

This API returns an array of payout records. Each object in the array represents a single payout entry from your PayRam database.

```
[
  {
    "id": 101,
    "blockchainCode": "ETH",
    "currencyCode": "USDC",
    "amount": "50000",
    "priceInUSD": "1",
    "amountInUSD": "50000",
    "toAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "recipientEmail": "test@test.com",
    "status": "sent",
    ...
  },
  {
    "id": 102,
    "blockchainCode": "TRX",
    "currencyCode": "USDT",
    "amount": "25000",
    "priceInUSD": "1",
    "amountInUSD": "25000",
    "toAddress": "TXYZ1234567890abcdefT1234567890abcd",
    "recipientEmail": "merchant@demo.com",
    "status": "pending-approval",
    ...
  }
]
```
