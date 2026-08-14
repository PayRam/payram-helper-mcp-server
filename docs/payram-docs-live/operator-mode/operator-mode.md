For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/operator-mode/operator-mode.md).

Copy

On this page

1.  [OPERATOR MODE](/operator-mode)

# Operator Mode

Operator Mode lets you manage multiple merchants under a single PayRam account. By the end of this setup, your operator account will be ready to onboard merchants, collect fees, and manage chain-level

* * *

### Prerequisites[](#prerequisites)

Before you proceed with the Operator Mode configuration, make sure the following steps are completed:

-   Install [PayRam](https://www.notion.so/2782637ada87802ba500e9d01a595075) and complete the [onboarding configuration](https://docs.payram.com/onboarding-guide/root-account-setup).
    

* * *

### Operator mode setup[](#operator-mode-setup)

1

### Select operator mode[](#select-operator-mode)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FB0EHLfPJlPMADsnhLOHN%252Fimage.png%3Falt%3Dmedia%26token%3D83d8a6c1-f7b5-4065-b5e3-73b19e829164&width=768&dpr=3&quality=100&sign=7f37586e&sv=2)

-   On the **"How will you use PayRam?"** screen, select the **Operator** option.
    
-   Click **Continue**.
    

2

### Set up fee collection wallet[](#set-up-fee-collection-wallet)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252F7pAhDDXAwz75Zw7Yk8lN%252Fimage.png%3Falt%3Dmedia%26token%3D875eb5a2-8970-4040-9e2d-dfe8fa8c2066&width=768&dpr=3&quality=100&sign=5e394d8e&sv=2)

-   Set up wallets for each chain you want to support. Supported chains include **EVM Family** (Ethereum, Polygon, Base), **Tron**, and **Bitcoin**.
    
-   Enter the **Fee Collector Address** which is an external cold wallet address where your fee earnings will be deposited.
    
-   Connect Master Account Wallet, this is required for deploying fees commission on the smart contract
    

> 💡 Note: The Fee Collector Address wallet receives all operator fee earnings. Make sure you have full control of this address before proceeding.

3

### Configure custom fees[](#configure-custom-fees)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252F1HHeybq7jJPqq5bt9AIo%252Fimage.png%3Falt%3Dmedia%26token%3Dac3d23ba-4f64-4344-b48c-5a50d0b8c17a&width=768&dpr=3&quality=100&sign=16504f9c&sv=2)

-   Set the fee markup you want to charge merchants.
    
-   The markup can be set between **0% and 15%** per chain.
    
-   Each chain supports an independent fee configuration.
    

> 💡 **Note**: Fee settings can be updated at any time from the dashboard.

4

### Add merchant details[](#add-merchant-details)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252F8UPMdMaxZ9aIQ6BTG5KX%252Fimage.png%3Falt%3Dmedia%26token%3D29c2617a-bbf1-4029-979d-7d0db46cab10&width=768&dpr=3&quality=100&sign=839117f3&sv=2)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FC6H6dKQHgEXBiyo60q2b%252Fimage.png%3Falt%3Dmedia%26token%3Ddcec0db8-6620-4d8b-9fe7-b40d7936e028&width=768&dpr=3&quality=100&sign=7f5172e3&sv=2)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FoqeEEzrjHEUX3yZt7AQf%252Fimage.png%3Falt%3Dmedia%26token%3D3a0316fa-626a-408a-9f65-700b1ce65646&width=768&dpr=3&quality=100&sign=b83ebf58&sv=2)

-   Fill in the following details to onboard your first merchant:
    
    -   **Merchant Name**
        
    -   **User Access: A**ssign as Project Admin or Project Lead
        
    -   **Merchant Login** credentials
        
    
-   Click **Save and Finish** to complete the setup.
    

> 💡 **Note**: If you don't have a merchant to onboard yet, select **Skip to Dashboard** and complete this step later.

5

### Share merchant account credentials[](#share-merchant-account-credentials)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FmpAXUh9jkV0OrxeLAbyR%252Fimage.png%3Falt%3Dmedia%26token%3D7526a006-9c8e-4cf2-beab-a1a33d371633&width=768&dpr=3&quality=100&sign=70634bc4&sv=2)

-   The merchant account and login credentials are generated. You can share them with the merchant and they can begin integrating PayRam to their platform.
    

> 💡 **Note**: If you don't have a merchant to onboard yet, select **Skip to Dashboard** and complete this step later.

You have successfully completed the Operator Mode setup. Proceed to your dashboard to manage merchants, monitor fee earnings, and configure chain-level settings.

* * *

### Next steps for you or your merchants[](#next-steps-for-you-or-your-merchants)

-   To configure nodes for merchant account, [visit here](https://docs.payram.com/onboarding-guide/node-details-configuration).
    
-   To configure wallets for merchant account, [visit here](https://docs.payram.com/onboarding-guide/wallet-integration).
    
-   To generate and test manual payment links, [visit here](https://docs.payram.com/onboarding-guide/testing-payment-links).
    
-   To setup hot wallet for merchant account, [visit here](https://docs.payram.com/onboarding-guide/hot-wallet-setup).
    

[PreviousBitcoin Funds Sweep Guide](/onboarding-guide/funds-sweeping/bitcoin-funds-sweep-guide)[NextScript Usage](/script/script-usage)

Last updated 2 minutes ago