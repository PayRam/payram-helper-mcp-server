# Payouts Status

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FVB5ER9kj1VViRwO7daz6%2Fpayram-payouts-status.png?alt=media&#x26;token=00aa586a-5e78-473c-bbf6-78e545d70d2a" alt=""><figcaption></figcaption></figure>

***

## URL Details

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

| Parameter    | Description                                   | Example                          |
| ------------ | --------------------------------------------- | -------------------------------- |
| BASE\_URL    | Your PayRam server URL.                       | <https://yourdomain.com:8443>    |
| id           | The unique payout ID you want to fetch.       | 120                              |
| API Endpoint | Endpoint to get details of a specific payout. | /api/v1/withdrawal/{id}/merchant |

## Headers

Headers are required for authenticating and defining the content type of your request.

<table><thead><tr><th width="149.30859375">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>be703fa47ebe07121102ee260fb3d5c0</td></tr><tr><td>Content-Type</td><td>Format of the data being sent.</td><td>application/json</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## curl Request

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* \<API\_KEY> → Your PayRam API key

```
curl --location --request GET '${BASE_URL}/api/v1/withdrawal/114/merchant' \
--header 'API-Key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data ''
```

## curl Response

You’ll receive essential payout details such as the amount, currency, recipient address, and current status for the specified withdrawal ID.

```json
{
  "id": 114,
  "currencyCode": "USDC",
  "blockchainCode": "BASE",
  "amount": "1111",
  "toAddress": "0x4e51edd49b62eaca9e06b4afff9a7aab729a6c49",
  "recipientEmail": "kiran@xyz.com",
  "status": "pending-approval",
  "type": "payout_merchant",
  ...
}
```

{% hint style="info" %} <mark style="color:$success;">**Hint: Check the status field in the response to know the current payout state.**</mark>
{% endhint %}

The status field represents the payout’s current progress :

<table><thead><tr><th width="267.65234375">STATUS</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td>pending-otp-verification</td><td>Waiting for OTP verification before processing.</td></tr><tr><td>pending-approval</td><td>Awaiting admin or system approval.</td></tr><tr><td>pending</td><td>Approved and ready for blockchain processing.</td></tr><tr><td>initiated</td><td>Payout has been broadcast to the blockchain network and is awaiting confirmation.</td></tr><tr><td>sent</td><td>Payout successfully sent to the recipient.</td></tr><tr><td>failed</td><td>Transaction failed due to a processing error.</td></tr><tr><td>rejected</td><td>Payout request was declined by the system or admin.</td></tr><tr><td>processed</td><td>Transaction has been confirmed on the blockchain and recorded in the accounting</td></tr><tr><td>cancelled</td><td> The transaction was intentionally stopped before being sent or processed.</td></tr></tbody></table>
