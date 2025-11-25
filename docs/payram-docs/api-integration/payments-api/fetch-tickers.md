# Fetch Tickers

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FFvHBtHQJH52384nQnwRl%2Fpayram-payment-apis-create-payment%20(2).png?alt=media&#x26;token=7478b26d-1695-4186-b2ee-9e72fed9f4fb" alt=""><figcaption></figcaption></figure>

***

## URL Details

<table><thead><tr><th width="157.99609375">Parameter</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>BASE_URL</td><td>Your PayRam server URL </td><td><a href="https://yourdomain.com:8443">https://yourdomain.com:8443<br></a></td></tr><tr><td>API Endpoint</td><td>Endpoint to create a new payment link.</td><td>/api/v1/ticker</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## Headers

<table><thead><tr><th width="129.0859375">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>811b12035f0dfa8ffd62296df3c98b27</td></tr><tr><td>Content-Type</td><td>Format of the request data.</td><td>application/json</td></tr></tbody></table>

## curl request

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* \<your\_api\_key> → Your PayRam API key
* Replace the request body fields with real customer data

```bash
curl --location '${BASE_URL}/api/v1/ticker' \
--data ''
```

## curl response

You’ll receive a list of supported blockchain assets, each containing:

* Blockchain info – e.g., ETH, BTC, TRX, BASE
* Token details – contract address, precision, and standard
* Live pricing – current USD value for each token

```
[
  {
    "blockchainCode": "TRX",
    "currencyCode": "TRX",
    "tokenAddress": "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
    "standard": "TRX",
    "walletPrecision": 6,
    "family": "TRX_Family",
    "price": "0.2796"
  },
  ...
]
```

{% hint style="info" %} <mark style="color:$warning;">**Note :**</mark>  <mark style="color:$success;">**Each object represents a supported token on PayRam with its blockchain code, token standard, and real-time price.**</mark>
{% endhint %}
