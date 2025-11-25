# Payments API

***

<figure><img src="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FcWj70dNRiGIWOImmKnBT%2Fpayram-payments-api.png?alt=media&#x26;token=803f7020-be77-4897-9272-74bd97a27d0a" alt=""><figcaption></figcaption></figure>

## Prerequisites

Before using the User Payout APIs, make sure you have the following:

* A PayRam server that is properly hosted and running.
* A valid API Key generated from the PayRam dashboard for authentication.

{% hint style="info" %} <mark style="color:$warning;">**Note**</mark>**&#x20;**<mark style="color:$success;">**: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**</mark>
{% endhint %}

***

## API Endpoints

These are the current endpoints required for the User Pay,ments API integration, listed below.

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-cover data-type="image">Cover image</th></tr></thead><tbody><tr><td><strong>Create Payment</strong></td><td>Create a payment link for customers using the PayRam API.</td><td><a href="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FmPCE50u3HqCX8FpMsXJT%2Fpayram-payment-apis-create-payment.png?alt=media&#x26;token=b298929f-6397-4b97-a66d-a9fe2562d158">payram-payment-apis-create-payment.png</a></td></tr><tr><td><strong>Fetch Tickers</strong></td><td>Fetch supported tickers and token options using the PayRam API.</td><td><a href="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FFvHBtHQJH52384nQnwRl%2Fpayram-payment-apis-create-payment%20(2).png?alt=media&#x26;token=7478b26d-1695-4186-b2ee-9e72fed9f4fb">payram-payment-apis-create-payment (2).png</a></td></tr><tr><td><strong>Get Blockchain Currencies</strong></td><td>Fetch blockchain deposit options using a payment’s reference ID.</td><td><a href="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FPMwm7JSKqHR2HVB8dGMh%2Fpayram-payment-apis-get-blockchain-currencies.png?alt=media&#x26;token=92e3d2e6-875a-4015-9ad0-2fb04e1b43e6">payram-payment-apis-get-blockchain-currencies.png</a></td></tr><tr><td><strong>Assign Deposit Address</strong></td><td>Assign a static deposit address to a user for a specific blockchain.</td><td><a href="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2Fc2f8BbAQy6NHrjeP7RzT%2Fpayram-payment-apis-assign-deposit-address.png?alt=media&#x26;token=8a85c669-1162-4f51-b82d-be4ad39dbc6b">payram-payment-apis-assign-deposit-address.png</a></td></tr><tr><td><strong>Payment Status</strong></td><td>Fetch the current payment status using a payment’s reference ID.</td><td><a href="https://418724149-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fe8xE63hZD8rEwBT8vRke%2Fuploads%2FeAz0Y16Muk3ku5JHheHY%2Fpayram-payment-payment-status.png?alt=media&#x26;token=824463b8-5043-4683-9902-02ce5da8e2b1">payram-payment-payment-status.png</a></td></tr></tbody></table>
