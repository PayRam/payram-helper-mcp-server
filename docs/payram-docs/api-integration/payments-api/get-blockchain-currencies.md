# Get Blockchain Currencies

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FPMwm7JSKqHR2HVB8dGMh%2Fpayram-payment-apis-get-blockchain-currencies.png?alt=media&#x26;token=92e3d2e6-875a-4015-9ad0-2fb04e1b43e6" alt=""><figcaption></figcaption></figure>

***

## URL Details

<table><thead><tr><th width="157.99609375">Parameter</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>BASE_URL</td><td>Your PayRam server URL </td><td><a href="https://yourdomain.com:8443">https://yourdomain.com:8443<br></a></td></tr><tr><td>API Endpoint</td><td>Endpoint to create a new payment link.</td><td>/api/v1/payment</td></tr></tbody></table>

## Headers

<table><thead><tr><th width="129.0859375">Header</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>API-Key</td><td>Your unique PayRam API key generated from your dashboard.</td><td>811b12035f0dfa8ffd62296df3c98b27</td></tr><tr><td>Content-Type</td><td>Format of the request data.</td><td>application/json</td></tr></tbody></table>

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

## curl request

Before running the command, replace the placeholders with your actual details:

* ${BASE\_URL} → Your PayRam server URL
* reference\_id → Use the value returned from the Create Payment API

```bash
curl --location '${BASE_URL}/api/v1/blockchain-currency/reference/{reference_id}' \
--data ''
```

## curl response

You’ll receive an array of blockchain currencies for that payment:

* Available networks & coins – e.g., ETH/USDC on Ethereum, BTC on Bitcoin, USDT on Tron, etc.
* Deposit info per option – including token contract address, precision, and family.
* Customer address state – customerAddress is empty for first-time users (no deposit address assigned yet).

```
[
  {
    "id": 7,
    "blockchainCode": "BASE",
    "network": "Base",
    "currencyCode": "USDC",
    "currency": "USDC",
    "customerAddress": "",
    "tokenAddress": "0x036cbd53842c5426634e7929541ec2318f3dcf7e",
    "standard": "ERC20",
    "walletPrecision": 6,
    "family": "ETH_Family",
    "recommended": false,
    "mostUsed": false,
    "blockchainID": 4,
    "currencyID": 2
  },
  ...
]
```

#### Response breakdown

* blockchainCode – Blockchain symbol (e.g., ETH, BTC, TRX, BASE).
* network – Network name (e.g., Ethereum, Base, Tron).
* currencyCode / currency – Token or coin name (e.g., USDC, ETH).
* customerAddress – Deposit address for the user (empty if not yet assigned).
* tokenAddress – Token’s contract or native address.
* standard – Token type (ERC20, TRC20, BTC, etc.).
* walletPrecision – Decimal precision supported.
* family – Blockchain family group (e.g., ETH\_Family).
* recommended / mostUsed – Suggested or frequently used options for display.

{% hint style="info" %} <mark style="color:$warning;">**NOTE**</mark>**&#x20;**<mark style="color:$success;">**:**</mark> <mark style="color:$success;">**If customerAddress is empty for a given family, you can call the**</mark>**&#x20;**<mark style="color:$warning;">**Assign Deposit Address API**</mark>**&#x20;**<mark style="color:$success;">**to assign a static deposit address for that user on that blockchain family.**</mark>
{% endhint %}
