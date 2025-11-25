# Assign Deposit Address

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2Fc2f8BbAQy6NHrjeP7RzT%2Fpayram-payment-apis-assign-deposit-address.png?alt=media&#x26;token=8a85c669-1162-4f51-b82d-be4ad39dbc6b" alt=""><figcaption></figcaption></figure>

***

## URL Details

<table><thead><tr><th width="157.99609375">Parameter</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>BASE_URL</td><td>Your PayRam server URL </td><td><a href="https://yourdomain.com:8443">https://yourdomain.com:8443<br></a></td></tr><tr><td>API Endpoint</td><td>Endpoint to create a new payment link.</td><td>/api/v1/payment</td></tr></tbody></table>

## Headers

<table><thead><tr><th width="129.0859375">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>811b12035f0dfa8ffd62296df3c98b27</td></tr><tr><td>Content-Type</td><td>Format of the request data.</td><td>application/json</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## &#x20;Request Body

<table><thead><tr><th width="169.67578125">Field</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>blockchain_code</td><td>Blockchain code to assign address for (BTC, ETH, TRX, BASE)</td><td>ETH</td></tr></tbody></table>

## curl request

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* \<your\_api\_key> → Your PayRam API key
* reference\_id → Use the value returned from the Create Payment API

```bash
curl --location '${BASE_URL}/api/v1/deposit-address/reference/{reference_id}' \
--header 'Content-Type: application/json' \
--data '{
  "blockchain_code": "ETH"
}'
```

## curl response

* Address – The user’s assigned deposit address for this blockchain family. This address will be reused for all future payments in the same family.
* Family – The blockchain family (e.g., ETH\_Family, BTC\_Family, TRX\_Family). Each family can include multiple chains — for example, Base and Ethereum share the same ETH\_Family.
* Status – Indicates the current state of the assigned address (e.g., active, inactive).

```
{
  "id": 324,
  "createdAt": "2025-11-05T06:53:42.419556Z",
  "Address": "0xCb12499d865271D1FfFf16308E523e0BB624a779",
  "Family": "ETH_Family",
  "Status": "active",
  "MemberID": 271,
  "xpub_id": 18,
  "BlockchainFamilyID": 1,
  "Member": { ... },
  "BlockchainFamily": { ... },
  "wallet": { ... }
}
```

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: Once a deposit address is assigned, it becomes permanent for that user within the same blockchain family. PayRam automatically reuses this address for subsequent transactions.**</mark>
{% endhint %}
