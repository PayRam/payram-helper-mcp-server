# Create Payment

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FmPCE50u3HqCX8FpMsXJT%2Fpayram-payment-apis-create-payment.png?alt=media&#x26;token=b298929f-6397-4b97-a66d-a9fe2562d158" alt=""><figcaption></figcaption></figure>

***

## URL Details

<table><thead><tr><th width="157.99609375">Parameter</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>BASE_URL</td><td>Your PayRam server URL </td><td><a href="https://yourdomain.com:8443">https://yourdomain.com:8443<br></a></td></tr><tr><td>API Endpoint</td><td>Endpoint to create a new payment link.</td><td>/api/v1/payment</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## Headers

<table><thead><tr><th width="129.0859375">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>811b12035f0dfa8ffd62296df3c98b27</td></tr><tr><td>Content-Type</td><td>Format of the request data.</td><td>application/json</td></tr></tbody></table>

## &#x20;Request Body

<table><thead><tr><th width="169.67578125">Field</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>customerEmail</td><td>Customer’s email address where the payment link will be associated.</td><td>test@payram.com</td></tr><tr><td>customerID</td><td>Unique identifier for the customer.</td><td>1</td></tr><tr><td>amountInUSD</td><td>The payment amount in USD.</td><td>10</td></tr></tbody></table>

## curl request

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* \<your\_api\_key> → Your PayRam API key
* Replace the request body fields with real customer data

```bash
curl --location '${BASE_URL}/api/v1/payment' \
--header 'API-Key: <your_api_key>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "customerEmail": "<customer_email>",
  "customerID": "<customer_id>",
  "amountInUSD": <amount_in_usd>
}'
```

## curl response

```
{
  "host": "https://yourdomain.com:8443",
  "reference_id": "c80f5363-0397-4761-aa1a-3155c3a21470",
  "url": "https://yourdomain.com/payments?reference_id=c80f5363-0397-4761-aa1a-3155c3a21470&host=https://yourdomain.com:8443"
}
```

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: The url field provides a ready-to-use PayRam payment page. You can share this link directly with your customers, or build a custom UI using other API endpoints.**</mark>
{% endhint %}
