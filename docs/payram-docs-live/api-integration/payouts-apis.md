For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis.md).

Copy

On this page

1.  [API Integration](/api-integration)

# ↔️Payouts APIs

## Prerequisites[](#prerequisites)

Before using the Payouts APIs, make sure you have the following:

-   A PayRam server that is properly hosted and running.
    
-   A valid API Key generated from the PayRam dashboard for authentication.
    

**Note** **: You can generate a unique API key for each project directly from the PayRam dashboard. This helps you manage and track payouts separately for every project.**

* * *

## API Endpoints[](#api-endpoints)

These are the current endpoints required for the Payouts API integration, listed below.

[](https://docs.payram.com/api-integration/payouts-apis/create-payouts)

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FO2IPnGNAlwUzG7PQqKNQ%2Fpayram-create-payouts.png&width=490&dpr=3&quality=100&sign=ddf66a40&sv=2)

Create Payouts

Create a payout to send funds to a recipient’s wallet on the chosen blockchain.

[](https://docs.payram.com/api-integration/payouts-apis/get-single-payout)

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FVB9XHt1vRKLLTG29OIOS%252Fpayram-get-single-payouts.png%3Falt%3Dmedia%26token%3D0bab443a-ad4f-4932-95a5-5c006f4aa11c&width=490&dpr=3&quality=100&sign=2c4bbd1b&sv=2)

GET Single Payout

Retrieve a single payout record with their details and statuses from your PayRam server.

[](https://docs.payram.com/api-integration/payouts-apis/get-all-payouts)

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FFq1maV6gVj5kWHP3S2lH%2Fpayram-get-all-payouts.png&width=490&dpr=3&quality=100&sign=6ceed0e8&sv=2)

GET All Payouts

Retrieve all payout records with their details and statuses from your PayRam server.

[](https://docs.payram.com/api-integration/payouts-apis/overview)

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FTh2uijiaNvL6SpgUdQPj%252Fpayram-payout-overview.png%3Falt%3Dmedia%26token%3De0af03f8-84a6-42a2-990d-86379c5047f8&width=490&dpr=3&quality=100&sign=2253880d&sv=2)

Overview

Base URL, authentication, supported networks and the payout status lifecycle.

[](https://docs.payram.com/api-integration/payouts-apis/payout-webhooks)

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FfMzCdIIas8FjEOQAnO7q%252Fpayram-payout-webhooks.png%3Falt%3Dmedia%26token%3D517d83f2-671f-47a4-bc20-da3de7cead6b&width=490&dpr=3&quality=100&sign=b3fb50c6&sv=2)

Payout Webhooks

Receive payout status changes on your server instead of polling.

[](https://docs.payram.com/api-integration/payouts-apis/approving-held-payouts)

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fuxr7rUZySL3kig3L72mU%252Fpayram-payout-approving.png%3Falt%3Dmedia%26token%3D1dba0c21-4b3c-4687-a6ac-95504a548d6f&width=490&dpr=3&quality=100&sign=3cb92fab&sv=2)

Approving Held Payouts

Approve or reject a payout that exceeded your limits.

[](https://docs.payram.com/api-integration/payouts-apis/editing-payout-limits)

![Cover](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FOWai7VNaCT4UnssyLPYE%252Fpayram-payout-editing.png%3Falt%3Dmedia%26token%3Dc3c6119d-99af-4f77-a15b-0763e79715c4&width=490&dpr=3&quality=100&sign=41baf5db&sv=2)

Editing Payout Limits

Set auto-approve, hourly, daily and minimum amounts per project.

[PreviousWebhook](/api-integration/payments-api/webhook)[NextOverview](/api-integration/payouts-apis/overview)

Last updated 9 hours ago