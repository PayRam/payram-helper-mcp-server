# Create Payouts

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FjqA8oG9Y8VHtS6v2pYBr%2Fpayram-create-payouts.png?alt=media&#x26;token=8550f341-fe80-4f40-b5cb-5646828b635f" alt=""><figcaption></figcaption></figure>

***

## URL Details

Before making the request, you’ll need the following parameters that define your PayRam environment and platform.

<table><thead><tr><th width="127.36328125">Parameter</th><th width="352.703125">Description</th><th>Example</th></tr></thead><tbody><tr><td>BASE_URL</td><td>Your PayRam server URL. This varies depending on where you’ve hosted PayRam (with or without SSL).</td><td><a href="https://yourdomain.com:8443">https://yourdomain.com:8443<br></a></td></tr><tr><td>API Endpoint</td><td>Full endpoint path to create a payout request.</td><td>/api/v1/withdrawal/merchant</td></tr></tbody></table>

## Headers&#x20;

Headers are required for authenticating and defining the content type of your request.

<table><thead><tr><th width="120.60546875">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>be703fa47ebe07121102ee260fb3d5c0</td></tr><tr><td>Content-Type</td><td>Specifies that the request body is in JSON format.</td><td>application/json</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## Request Body

The body contains all required details for processing the payout. All fields are mandatory and must be provided.

<table><thead><tr><th width="145.51171875">Field</th><th width="305.6640625">Description</th><th width="167.82421875">Example</th><th>Required</th></tr></thead><tbody><tr><td>email</td><td>Recipient’s email address.</td><td>test@test.com</td><td>✅ Yes</td></tr><tr><td>blockChainCode</td><td>Blockchain network used for the payout (e.g., ETH, TRX, BASE)</td><td>ETH</td><td>✅ Yes</td></tr><tr><td>currencyCode</td><td>Token symbol to be used for the payout (e.g., USDC, USDT).</td><td>USDC</td><td>✅ Yes</td></tr><tr><td>amount</td><td>Amount to transfer.</td><td>100000</td><td>✅ Yes</td></tr><tr><td>toAddress</td><td>Recipient’s wallet address must belong to the selected blockchain.</td><td>0x291b68732f14F47Fd21bE81ec5Cf1bcfC0DB14Ea</td><td>✅ Yes</td></tr><tr><td>mobileNumber</td><td>Recipient’s mobile number.</td><td>123456789</td><td>❌ Optional</td></tr><tr><td>residentialAddress</td><td>Recipient’s address.</td><td>No 22 oc street</td><td>❌ Optional</td></tr><tr><td>customerID</td><td>Unique identifier for the customer.</td><td>414817384</td><td>✅ Yes</td></tr></tbody></table>

## curl Request&#x20;

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* \<API\_KEY> → Your PayRam API key

{% hint style="warning" %}

#### Default Payout Limits

* Auto-approve limit: Payouts up to $500 are automatically approved.
* Hourly limit: You can process up to $5,000 in total payouts per hour.
* Daily limit: You can process up to $10,000 in total payouts per day.

If any of these limits are exceeded, the payout must be approved by an Admin from the dashboard before processing. These default values can be customized as well, contact PayRam support for more details.
{% endhint %}

```bash
curl --location '${BASE_URL}/api/v1/withdrawal/merchant' \
--header 'API-Key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "<your_email>",
  "blockChainCode": "<blockchain_code>",
  "currencyCode": "<currency_code>",
  "amount": "<amount_to_send>",
  "toAddress": "<recipient_wallet_address>",
  "mobileNumber": "<recipient_mobile_number>",
  "residentialAddress": "<recipient_address>",
  "customerID": "<customer_id>"
}'
```

{% hint style="info" %} <mark style="color:$success;">**Available blockchain codes: ETH (Ethereum), TRX (Tron), BASE (Base)**</mark>&#x20;
{% endhint %}

## curl response

This API returns detailed information about the payout, including the amount, currency used, recipient wallet address, and current status.

```json
{
  "id": 120,
  "blockchainCode": "ETH",
  "currencyCode": "USDC",
  "amount": "100000",
  "priceInUSD": "1",
  "amountInUSD": "100000",
  "toAddress": "0x9F8E7D6C5B4A39281706F5E4D3C2B1A098765432",
  "recipientEmail": "test@test.com",
  "status": "pending-approval",
  ...
}
```

{% hint style="info" %} <mark style="color:$success;">**Note: The id field is very important. It uniquely identifies the payout and will be required for checking its status or performing any follow-up actions.**</mark>
{% endhint %}
