# Payment Status

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FeAz0Y16Muk3ku5JHheHY%2Fpayram-payment-payment-status.png?alt=media&#x26;token=824463b8-5043-4683-9902-02ce5da8e2b1" alt=""><figcaption></figcaption></figure>

***

## URL Details

<table><thead><tr><th width="157.99609375">Parameter</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>BASE_URL</td><td>Your PayRam server URL </td><td><a href="https://yourdomain.com:8443">https://yourdomain.com:8443<br></a></td></tr><tr><td>API Endpoint</td><td>Endpoint to create a new payment link.</td><td>/api/v1/ticker</td></tr></tbody></table>

## Headers

<table><thead><tr><th width="129.0859375">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>811b12035f0dfa8ffd62296df3c98b27</td></tr><tr><td>Content-Type</td><td>Format of the request data.</td><td>application/json</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## curl request

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* \<your\_api\_key> → Your PayRam API key

```bash
curl --location '<BASE_URL>/api/v1/payment/reference/<reference_id>' \
--header 'API-Key: <API_KEY>' \
--data ''
```

## curl response

You’ll receive a list of supported blockchain assets, each containing:

* Blockchain info – e.g., ETH, BTC, TRX, BASE
* Token details – contract address, precision, and standard
* Live pricing – current USD value for each token

```
{
  "invoiceID": "0dec6a8c-9cbc-4086-8680-10d45319a8d1",
  "customerID": "0",
  "amountInUSD": "1",
  "paymentState": "OPEN",
  "merchantName": "Payout",
  "referenceID": "0dec6a8c-9cbc-4086-8680-10d45319a8d1",
  "createdAt": "2025-11-07T11:37:59.012304Z",
  ...
}
```

{% hint style="info" %} <mark style="color:$warning;">**Note :**</mark>**&#x20;**<mark style="color:$success;">**Check the paymentState field in the response to track the payment status.**</mark>
{% endhint %}

| STATUS            | DESCRIPTION                                       |
| ----------------- | ------------------------------------------------- |
| OPEN              | The payment has not been processed yet.           |
| CANCELLED         | The payment link has expired.                     |
| FILLED            | The user has paid the full requested amount.      |
| PARTIALLY\_FILLED | The user has paid less than the requested amount. |
| OVER\_FILLED      | The user has paid more than the requested amount. |
