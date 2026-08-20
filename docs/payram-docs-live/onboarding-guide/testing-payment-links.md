For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/onboarding-guide/testing-payment-links.md).

Copy

On this page

1.  [ONBOARDING GUIDE](/onboarding-guide)

# 💳Testing Payment Links

In this section, you’ll learn how to accept payments from customers using PayRam by creating and sharing a payment link.

* * *

## Prerequisites[](#prerequisites)

Before generating payment links, ensure the following steps are completed:

-   Successfully set up the blockchain node configuration where you will accept payments.
    
-   Complete the wallet management setup so your wallets are ready to receive payments.
    

* * *

## Generate payment link[](#generate-payment-link)

1

### Open Create Payment Link[](#open-create-payment-link)

-   Select **Create Payment Link** at the top of the left menu.
    

![The Create Payment Link screen](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-5dd33c302b1c099171fc9c97e9ff27badb268b78%252Fpayram-payment-link-create.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=82b98819&sv=2)

-   A payment link needs two things: the member you are charging, and the amount.
    

2

### Select a member[](#select-a-member)

-   Select **Search member by email** and start typing to find an existing member.
    

![Searching for a member by email](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-725a2404bdd5002cb905ac8f813a8ace816b7200%252Fpayram-payment-link-member-list.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=288a83a3&sv=2)

3

### Add a member (first time)[](#add-a-member-first-time)

-   On a new install the list is empty. Select **Add New Member**, enter the customer's email, choose the project, then select **Add Member**.
    

![Adding a new member](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-6d154dbbfe5d70379dc4777bf333194ae4ee7646%252Fpayram-payment-link-add-member.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=6062a43d&sv=2)

4

### Enter the amount[](#enter-the-amount)

-   Enter the amount to charge in USD, then select **Generate Payment Link**.
    

![A member selected and an amount entered](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-522abfc4b0dac22fc8b0a86ab3a53aa2d2add100%252Fpayram-payment-link-filled.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=78fe8817&sv=2)

5

### Share the link[](#share-the-link)

-   PayRam confirms the link is created and shows it with the member and amount.
    

![The created payment link](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-7445cd20bea2c97880a6ca89df169cff4888a54c%252Fpayram-payment-link-created.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=2e8aad89&sv=2)

-   Select **Copy Link** to share it with your customer, **Open Link** to see what they will see, or **Create Another Link** to make the next one.
    

6

### What your customer sees[](#what-your-customer-sees)

-   The payment page shows the amount, the currency it converts to, and a deposit address. It keeps scanning for the deposit, so the status updates on its own once payment arrives.
    

![The customer payment page](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-715be8099c9327624365ecb8cd3c950afa78a53e%252Fpayram-payment-link-checkout.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=ef7b603d&sv=2)

**Note**: If the deposit address is blank, blocks are not being processed. Check **Settings → Node Configurations**, or restart the server — [see the restart command](/script/script-usage).

7

### Choosing how to pay[](#choosing-how-to-pay)

-   Your customer picks a coin and network under **Pay with crypto**. Selecting **more** reveals every currency your project accepts — see [Supported Networks and Coins](/support/supported-networks-and-coins) for the full list.
    

![The currencies available at checkout](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-8317a3581c40a6a0601dd197106076db54e12993%252Fpayram-payment-link-coins.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=abac36ad&sv=2)

-   If they do not hold crypto, the **Don't have crypto?** section offers card and local payment methods — see [Card-to-Crypto Fiat Onramp](/features/card-to-crypto-fiat-onramp).
    
-   Once the deposit reaches the required number of confirmations, the page shows the payment as complete.
    

* * *

You’ve successfully set up PayRam to accept payments. If you want to integrate the PayRam system into your SaaS, dApp, or any other application, you can do so via the API. Visit the API References section to view the complete integration guide.

[PreviousWallet Integration](/onboarding-guide/wallet-integration)[NextHot Wallet Setup](/onboarding-guide/hot-wallet-setup)

Last updated 9 hours ago