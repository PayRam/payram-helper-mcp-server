For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payments-api.md).

Copy

On this page

1.  [API Integration](/api-integration)

# ⚡Payments API

* * *

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FCallR4LiFOh4qXvz21xp%2Fpayram-payments-api.png&width=768&dpr=3&quality=100&sign=11d4a11e&sv=2)

## Prerequisites[](#prerequisites)

Before using the Payments API, make sure you have the following:

-   A PayRam server that is properly hosted and running.
    
-   A valid API Key generated from the PayRam dashboard for authentication.
    

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

* * *

## Finding your BASE\_URL[](#finding-your-base_url)

Every endpoint below is called as `{BASE_URL}/api/v1/...`. Your `BASE_URL` is the address your PayRam instance is reachable at — the same one you open the dashboard with.

1

### Open your PayRam dashboard[](#open-your-payram-dashboard)

Log in to your PayRam dashboard as usual.

2

### Go to Settings[](#go-to-settings)

Select **Settings** from the left menu.

3

### Open Site URL[](#open-site-url)

Select **Site URL**. The address shown under **Current site URL** is your `BASE_URL`.

Depending on how you installed PayRam, it will look like one of these:

Your setup

BASE\_URL

Domain with SSL

`https://pay.example.com`

Server IP, no SSL

`http://203.0.113.10`

Installed on a different port

`http://203.0.113.10:3000`

**Note**: PayRam serves the dashboard and the API from the same address, so there is no separate API port. If you installed on a port other than the default, include it in your `BASE_URL`.

**Seeing** `http://` when your site is HTTPS? If a service such as Cloudflare or a load balancer terminates SSL in front of PayRam, the Site URL can show `http`. The root user can correct the protocol on the same page.

* * *

## API Endpoints[](#api-endpoints)

These are the current endpoints required for the Payments API integration, listed below.

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fx56GsGsbGOGBWmMJC2yw%2Fpayram-payment-apis-create-payment.png&width=490&dpr=3&quality=100&sign=8b658502&sv=2)

**Create Payment**

Create a payment link for customers using the PayRam API.

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fnzh0TSnDEazDI5HOYtVU%2Fpayram-payment-apis-create-payment%2520%282%29.png&width=490&dpr=3&quality=100&sign=db4b4e3e&sv=2)

**Fetch Tickers**

Fetch supported tickers and token options using the PayRam API.

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FlFo1Aof5UsSuwodjju9o%2Fpayram-payment-apis-get-blockchain-currencies.png&width=490&dpr=3&quality=100&sign=8fbeb70a&sv=2)

**Get Blockchain Currencies**

Fetch blockchain deposit options using a payment’s reference ID.

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2F4wTeL86ZviiN3VkCxCod%2Fpayram-payment-apis-assign-deposit-address.png&width=490&dpr=3&quality=100&sign=10ba884d&sv=2)

**Assign Deposit Address**

Assign a static deposit address to a user for a specific blockchain.

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FtxWxC3Fhsyt4MylRugMg%2Fpayram-payment-payment-status.png&width=490&dpr=3&quality=100&sign=8ac96591&sv=2)

**Payment Status**

Fetch the current payment status using a payment’s reference ID.

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FCallR4LiFOh4qXvz21xp%2Fpayram-payments-api.png&width=490&dpr=3&quality=100&sign=11d4a11e&sv=2)

**Webhook**

Receive payment updates on your server instead of polling.

[PreviousIntroduction](/api-integration/introduction)[NextCreate Payment](/api-integration/payments-api/create-payment)

Last updated 9 hours ago