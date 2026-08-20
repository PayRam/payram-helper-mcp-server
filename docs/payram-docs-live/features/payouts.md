For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/features/payouts.md).

Copy

On this page

1.  [FEATURES](/features)

# 💸Payouts

Send crypto payouts securely. To anyone, anywhere.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FNx0Sncp9oaVVMS0hftUD%2Fpayram-feature-payouts.png&width=768&dpr=3&quality=100&sign=47cc1088&sv=2)

Payouts on PayRam let merchants send funds to external wallets across multiple chains in just a few clicks. Whether you’re issuing refunds, employee payroll, or supplier payments, Payouts combine automation, transparency, and control, so you can manage outflows as confidently as you accept inflows.

* * *

## **Why it matters**[](#why-it-matters)

Managing outgoing crypto payments can be complex, especially when you’re dealing with different tokens and chains. PayRam Payouts simplifies this by giving you a unified control panel for all outgoing transactions.

-   **Operate with precision:** Define who can create, approve, and execute payouts to avoid unauthorized transfers.
    
-   **Save time and cost**: Use **Payout APIs** to automate payments, reducing manual effort and minimizing network fees.
    
-   **Stay compliant**: Maintain full transaction logs and export-ready records for audits and reconciliation.
    
-   **Expand globally**: Send payouts to partners, users, or wallets across supported chains without needing custom integrations.
    
-   **Reduce risk: B**uilt-in wallet address book ensures you’re sending funds to the right address, every time.
    

* * *

## Prerequisites[](#prerequisites)

Before using payouts, make sure your SMTP server is set up. It’s required for sending OTPs as part of the security verification process.

Steps to set up SMTP:

1.  Go to your PayRam Dashboard.
    
2.  Navigate to Settings → Integrations → Email Servers.
    
3.  Add your SMTP credentials from your email service provider
    
4.  Save and test the connection to confirm successful configuration.
    

* * *

## **How Payram Payout Works**[](#how-payram-payout-works)

### Step 1 : Select Payouts[](#step-1-select-payouts)

-   From the Withdraw menu, select Payouts.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FFDi6PPY6LtBkATw7zJnj%2Fimage.png&width=768&dpr=3&quality=100&sign=83ecce8c&sv=2)

### Step 2 : Add Payout Recipient[](#step-2-add-payout-recipient)

-   Before creating a payout, add the recipient to your **Address Book**. This helps ensure that payouts are sent to the correct wallet address.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FkxJviu59SHkIDBDV6wY4%2Fimage.png&width=768&dpr=3&quality=100&sign=40746178&sv=2)

### Step 3 : Address Book[](#step-3-address-book)

-   Click Add New to create a new Address Book.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2F3zXfAs40tyHPZublVl0Q%2Fimage.png&width=768&dpr=3&quality=100&sign=c9d2128&sv=2)

-   A pop-up will appear where you can enter the required details. Once saved, this adds the recipient to your PayRam Address Book.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FOc709kjTvVKJEkdjPuOJ%2Fimage.png&width=768&dpr=3&quality=100&sign=7bb35938&sv=2)

-   After entering the details, click Continue to Wallet Info. You’ll then be prompted to enter the recipient’s wallet address.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FcocZLlbqYMvzh5GPHpvR%2Fimage.png&width=768&dpr=3&quality=100&sign=97ab6cb2&sv=2)

-   Enter the required details, including the network chain, wallet address, and any optional notes for the recipient.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FFV9MvqeYEsV1AulWxIhu%2Fimage.png&width=768&dpr=3&quality=100&sign=f0f3f21b&sv=2)

**IMPORTANT: Make sure the selected network matches the wallet address. If they belong to different blockchains, the payout will fail and funds may be lost. Always double-check the network before saving the recipient.**

-   After entering all the details, click Save Recipient. You will be prompted for OTP verification, so make sure your SMTP server is configured in advance.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FQ1sWJywfB8u0bfpVjkiQ%2Fimage.png&width=768&dpr=3&quality=100&sign=9e61df0e&sv=2)

### Step 4 : Create Payout[](#step-4-create-payout)

-   Click the Back arrow to return to the Create Payout page.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fa4cmJckiqiFmYzudwY48%2Fimage.png&width=768&dpr=3&quality=100&sign=c8e8f383&sv=2)

-   Click Create Payout to start a new payout.
    
-   A pop-up will appear where you can enter the required details, select the recipient, and specify the amount.
    
-   After entering all the details, click Create Payout to proceed.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FuLyseEpDf2IBVuyBoId4%2Fimage.png&width=768&dpr=3&quality=100&sign=3df4efd8&sv=2)

### Step 5 : Payout Request[](#step-5-payout-request)

-   You can view the payout request in your Dashboard.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fns8NRPJRwetcMOJr7IB7%2Fimage.png&width=768&dpr=3&quality=100&sign=255cadf1&sv=2)

-   Only Admins can approve payout orders. A payout will not be processed until it has been approved by an Admin.
    
-   To enable OTP delivery for payout approvals, configure your SMTP server in the PayRam dashboard.
    

Note **: When a payout is created and sent for approval, the admin receives an OTP for verification. This adds an extra layer of security before the payout is processed.**

-   Approvals are required only for payouts created by non-admin roles.
    

* * *

## **Common use cases**[](#common-use-cases)

Payouts are designed to fit real merchant workflows:

-   **Vendor & supplier payments:** Pay external wallets in stablecoins or preferred tokens, with automatic confirmation tracking.
    
-   **Employee or contributor compensation:** Handle multi-chain payrolls with approval layers and transparent reporting.
    
-   **Customer refunds:** Issue crypto refunds seamlessly from your dashboard, without manual wallet handling.
    

[PreviousAnalytics & Reporting](/features/analytics-and-reporting)[NextCard-to-Crypto Fiat Onramp](/features/card-to-crypto-fiat-onramp)

Last updated 9 hours ago