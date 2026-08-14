For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis/editing-payout-limits.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# ✏️Editing Payout Limits

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FOWai7VNaCT4UnssyLPYE%252Fpayram-payout-editing.png%3Falt%3Dmedia%26token%3Dc3c6119d-99af-4f77-a15b-0763e79715c4&width=768&dpr=3&quality=100&sign=41baf5db&sv=2)

* * *

Payout limits decide when a payout is auto-approved, held for approval, or rejected (see **Payout limits & approval** under Create Payout). They are **edited per project from the PayRam dashboard** — not via the API.

Open the project’s **Payout Limits** tab:

There you can set, per project:

Setting

Effect

**Auto-approve** (on/off) + **amount**

Payouts at or under the amount are auto-approved (`pending`); above it they are held (`pending-approval`).

**Daily limit**

Once a recipient’s payouts in this project for the day would exceed it, further payouts are held for approval.

**Hourly limit**

Same as the daily limit, applied per hour.

**Minimum amount**

Payouts below this are rejected outright.

Leaving a field blank makes the project **inherit the installation default**. The global minimum lives under **Settings → Withdrawal Limits**.

> Changes apply to payouts created **after** the update; don’t hard-code limit values in your integration — manage them here.

[PreviousApproving Held Payouts](/api-integration/payouts-apis/approving-held-payouts)[NextTypescript/Javascript SDK](/payram-sdk/typescript-javascript-sdk)

Last updated 2 hours ago