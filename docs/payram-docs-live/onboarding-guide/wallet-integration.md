For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/onboarding-guide/wallet-integration.md).

Copy

On this page

1.  [ONBOARDING GUIDE](/onboarding-guide)

# ⛓️Wallet Integration

In this section, you will begin the process of setting up your wallets, ensuring that everything is ready so you can start receiving payments seamlessly.

* * *

## **Prerequisites**[](#prerequisites)

Before you proceed with setting up your wallets, make sure the following steps are completed:

-   Install [PayRam](/deployment-guide/quick-setup) and ensure it is fully set up on your server.
    
-   Successfully [configure the Blockchain node](/onboarding-guide/node-details-configuration) where you plan to accept payments.
    

* * *

## Understanding some key terms[](#understanding-some-key-terms)

-   Before configuring your wallets, it's essential to understand how the different wallet types work together in our payment system. This section explains the key components and their relationships
    
    -   Master account
        
    -   Deposit wallets
        
    -   Cold wallet
        
    -   Sweep contract
        
    

### Master account[](#master-account)

-   The master account is the merchant’s primary blockchain account that serves as the foundation for generating deposit wallet addresses. Every deposit wallet provided to customers for making payments is derived from this master account, ensuring all payment addresses remain linked to a single, consistent source. This setup allows the system to track, manage, and associate payments accurately under the merchant’s account
    
-   In addition to generating deposit wallets, the master account is also used to deploy the sweep contract.
    

### Deposit wallets[](#deposit-wallets)

-   A deposit wallet is a blockchain address where customers send their payments. All deposit wallets are derived from the merchant’s master account and can exist on different supported blockchains. Each deposit wallet acts as a unique payment destination for a transaction or customer, while still being linked to the same master account for tracking and management purposes.
    

### Cold wallet[](#cold-wallet)

-   A cold wallet is a secure blockchain wallet used for storing funds offline or in a highly secure environment. Unlike deposit wallets, which are generated for receiving payments from customers, the cold wallet serves as the merchant’s main storage address where funds are ultimately consolidated. Cold wallets are not directly exposed to customers, reducing the risk of unauthorized access and improving overall fund security.
    

**NOTE** : While configuring wallets, make sure to use different wallets for the master account and the cold wallet. Do not use the same wallet for both; always configure separate ones.

* * *

## Configuring deposit wallets[](#configuring-deposit-wallets)

**Have your cold wallet address ready before you start.** You are asked for it during setup, and you cannot accept payments on Ethereum, Base or Tron without one. You must control its private keys — PayRam never stores them. Use a different wallet from your master account.

1

### Choose a network[](#choose-a-network)

-   Go to **Wallet management → Deposit wallet**, select **\+ Set Up Deposit Wallet**, and pick the network.
    

![Choosing a network](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-ba8a1f80f06733498fdf7bbb53601cc0fe4db016%252Fpayram-wallet-01-network.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=14b8d570&sv=2)

-   **EVM** covers Base, Ethereum and Polygon, and **Tron** follows the same steps below. **Bitcoin** differs — it derives addresses from a secret phrase instead of deploying a contract, so follow [Configuring a Bitcoin deposit wallet](/onboarding-guide/wallet-integration#configuring-a-bitcoin-deposit-wallet) instead.
    

2

### Choose the project[](#choose-the-project)

-   Search for the project this wallet belongs to. Projects that already have a wallet on this network show **Wallet already present**; the rest show **Ready**.
    

![Picking a project](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-26d3c256904a291219a82c67a7a06837e38212f0%252Fpayram-wallet-02-project.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=c1125661&sv=2)

3

### Connect your master wallet[](#connect-your-master-wallet)

-   Name the wallet, then select **Connect wallet** and approve it in your browser wallet. The master wallet deploys the contract that generates a unique deposit address for every customer.
    

![Setting up the master wallet](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-c045dc5a58e6796ad88f200617151c1ddc930093%252Fpayram-wallet-03-master.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=45f8159&sv=2)

**Use the same master wallet for Base, Ethereum and Polygon.** All three sit under one EVM deposit wallet, and your customers' deposit addresses are derived from the master account — sharing it means a customer keeps the same address on all three chains. Use a different one and they get different addresses per chain.

If you already deployed on one of the three, PayRam names the exact address you must connect and will not let you continue until your browser wallet is switched to it.

4

### Add your cold wallet and deploy[](#add-your-cold-wallet-and-deploy)

-   Enter the cold wallet address that swept funds go to, then select **Deploy contract** and confirm the transaction in your wallet.
    

![Setting the cold wallet before deploying](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-1e6c11c88356eb8e8d8d926cf0d8fa739157b5c9%252Fpayram-wallet-04-cold.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=89149f44&sv=2)

**Before you deploy:** the cold wallet must be different from the master wallet, and your master wallet needs native currency on that network — ETH for Ethereum and Base, POL for Polygon, TRX for Tron — because deploying is an on-chain transaction.

5

### Confirm it is ready[](#confirm-it-is-ready)

-   PayRam generates a batch of deposit addresses, unassigned until customers arrive. Use **Create Test Payment Link** to verify the flow with a $1 payment.
    

![The deposit wallet is ready](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-36ffd782e6ca22b2a321859c2b2b6f3c8d6f4ec6%252Fpayram-wallet-05-ready.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=527c4165&sv=2)

6

### Repeat for each network[](#repeat-for-each-network)

-   Deploying covers one network at a time. The wallet list shows how many are live — **1/3 ready to accept payments** means only one EVM chain is deployed so far.
    

![Deposit wallets and their per-network status](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-fa9ef2253c008461c92cd0072db7b09bde1585a2%252Fpayram-wallet-06-list.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=4c478b1a&sv=2)

-   Run the same steps for the remaining networks under the same EVM deposit wallet, connecting that same master wallet each time.
    

* * *

## Configuring a Bitcoin deposit wallet[](#configuring-a-bitcoin-deposit-wallet)

Bitcoin has no contract to deploy. Deposit addresses are derived from a secret phrase you supply, so there is no master wallet and no on-chain transaction.

The first two steps are the same — **\+ Set Up Deposit Wallet**, choose **Bitcoin**, then choose the project. After that:

1

### Enter your secret phrase[](#enter-your-secret-phrase)

-   Name the wallet, then enter the 12-word secret phrase your deposit addresses will be derived from.
    

![Entering the Bitcoin secret phrase](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-62a0cc60545ffec69a950b747d3117a2e4775a5c%252Fpayram-wallet-btc-01-phrase.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=85a96ab1&sv=2)

**Store the phrase yourself.** It is not saved by PayRam — it is used to generate the addresses and then discarded. You need the same phrase to sweep funds later, and losing it means losing access.

-   Select **Save & Generate Addresses**.
    

2

### Add a cold wallet (optional)[](#add-a-cold-wallet-optional)

-   Enter any BTC address you control as the destination for collected funds, or select **Skip** and add one later from the wallet details.
    

![Adding an optional Bitcoin cold wallet](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-49bbd9763fd3bc5032417e8080b62b17c4ae6f61%252Fpayram-wallet-btc-02-cold.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=6e336c1b&sv=2)

**Note**: Unlike the EVM and Tron chains, Bitcoin funds are not swept automatically. You collect them manually with the PayRam Business App — see [Bitcoin Funds Sweep Guide](/onboarding-guide/funds-sweeping/bitcoin-funds-sweep-guide).

3

### Confirm it is ready[](#confirm-it-is-ready-1)

-   PayRam generates the deposit addresses, and the wallet is ready to accept Bitcoin payments.
    

![The Bitcoin deposit wallet is ready](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-722ae700a97d382b5a87668d416fcdcde81d2e2e%252Fpayram-wallet-btc-03-ready.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=630c6ee8&sv=2)

* * *

### Best practices[](#best-practices)

-   Your mnemonic never leaves the browser — only derived public keys reach the server.
    
-   Double-check your cold wallet address. Funds are swept there automatically.
    
-   Start with one network, confirm everything works, then enable the rest.
    

* * *

You have set up your wallets and can start receiving payments. Next, [generate a test payment link](/onboarding-guide/testing-payment-links) to confirm the flow end to end.

[PreviousNode Details Configuration](/onboarding-guide/node-details-configuration)[NextTesting Payment Links](/onboarding-guide/testing-payment-links)

Last updated 9 hours ago