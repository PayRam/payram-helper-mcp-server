For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/api-integration/payouts-apis/approving-held-payouts.md).

Copy

On this page

1.  [API Integration](/api-integration)
2.  [↔️Payouts APIs](/api-integration/payouts-apis)

# 🛑Approving Held Payouts

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fuxr7rUZySL3kig3L72mU%252Fpayram-payout-approving.png%3Falt%3Dmedia%26token%3D1dba0c21-4b3c-4687-a6ac-95504a548d6f&width=768&dpr=3&quality=100&sign=3cb92fab&sv=2)

A payout in `pending-approval` (it exceeded the auto-approve amount or an hourly/daily limit) needs to be approved or rejected from the **PayRam dashboard** by an authorized team member.

Open **Withdraw → Payouts** and use the approve / reject action on the payout’s row:

Copy

```
https://yourdomain.com/project/all/withdraw/user-payouts
```

Once approved, the payout continues automatically (`pending → initiated → sent → processed`); keep checking its state via **Payout Status**. If rejected, it becomes `rejected` (terminal).

[PreviousPayout Webhooks](/api-integration/payouts-apis/payout-webhooks)[NextEditing Payout Limits](/api-integration/payouts-apis/editing-payout-limits)

Last updated 2 hours ago