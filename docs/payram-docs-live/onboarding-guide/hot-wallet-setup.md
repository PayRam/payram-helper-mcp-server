For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/onboarding-guide/hot-wallet-setup.md).

Copy

On this page

1.  [ONBOARDING GUIDE](/onboarding-guide)

# 💸Hot Wallet Setup

In this section, you will learn how to set up a hot wallet on the blockchains where you will be accepting payments.

* * *

## **Prerequisites**[](#prerequisites)

Before setting up a hot wallet, ensure the following steps are completed:

-   Install the PayRam server and complete the setup.
    
-   Successfully configure the blockchain node where you will accept payments.
    
-   Verify that your wallets are set up and ready to receive payments.
    

* * *

## Understanding key concepts[](#understanding-key-concepts)

Before proceeding with the setup steps, please ensure you are familiar with the following concepts, as they are important for managing your wallets effectively:

### **Hot wallet**[](#hot-wallet)

A hot wallet is the one wallet PayRam keeps a private key for. It is used for three things:

-   **Sweeps** — paying the gas that moves funds from deposit wallets to your cold wallet.
    
-   **Payouts** — outgoing payments are sent from it. A project with no hot wallet assigned cannot pay out.
    
-   **Gas fees** — covering transaction costs for the operations above.
    

Hot wallets are EOA (Externally Owned Account) wallets, and one covers an entire network family — a single EVM hot wallet serves Ethereum, Base and Polygon.

**Keep a minimum balance.** If the hot wallet runs dry, sweeps and payouts both fail.

### **SmartSweep**[](#smartsweep)

The **Smart-sweep** feature helps you automatically move funds from your customer deposit wallets to your main wallet. This reduces manual transfers and ensures funds are consolidated efficiently. Our objective is to simplify daily operations while keeping security on top. For most blockchains, this is done with a family of smart contracts, such that you don’t have to expose keys to sweep funds while PayRam takes care of all the orchestration.

#### SmartSweep eligibility[](#smartsweep-eligibility)

To enable smart-sweeps, a customer's deposit wallet must first meet a **one-time minimum balance requirement**.

-   When this balance is reached, PayRam deploys a **smart wallet contract** to the blockchain.
    
-   If the balance is not reached, the wallet remains **dormant** and no sweeps will occur.
    
-   Also note, you can configure these default requirements; the default is $5 USD worth of assets.
    

#### How SmartSweep works[](#how-smartsweep-works)

Once a wallet is activated, PayRam can sweep funds automatically based on three configurable settings:

1.  **Amount:** Smart-sweep is triggered when either,
    
    -   An individual deposit wallet’s balance reaches the set amount, or,
        
    -   The total balance across multiple wallets in a batch reaches the set amount.
        
    
2.  **Address count:** The sweep occurs after a set number of deposit addresses have received funds.
    
3.  **Time:** The sweep occurs after a set time period has elapsed.
    

* * *

## Hot wallet configuration[](#hot-wallet-configuration)

You need one hot wallet per network family — one for **EVM** (covering Ethereum, Base and Polygon) and one for **Tron**.

1

### Open Hot wallet[](#open-hot-wallet)

-   From the left menu, select **Wallet management**, then **Hot wallet**.
    

![The hot wallets list](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-0ed23100497f63184fefe8d28f19d799f6627cab%252Fpayram-hot-wallet-list.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=6da9eafe&sv=2)

-   Each wallet shows its network, address, which projects use it, and a **View Balances** link. Use the filters to narrow by network, status or project.
    

2

### Choose a network[](#choose-a-network)

-   Select **\+ Add Hot Wallet**, then choose the family this wallet is for.
    

![Choosing EVM or Tron for the hot wallet](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-00178720def5774bc7d225eb1d6c048246a18640%252Fpayram-hot-wallet-network.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=9ada1d84&sv=2)

Family

Covers

**EVM**

Ethereum, Base, Polygon and other EVM-compatible chains

**Tron**

Tron and TRC-20 tokens

3

### Add the wallet[](#add-the-wallet)

-   Enter the private key of a wallet on that network. PayRam encrypts it at rest and never stores it in plain text.
    
-   Give the wallet a name you will recognise later, then save it.
    

**Fund it before you rely on it.** The wallet needs a native balance — ETH for EVM chains, TRX for Tron — to pay gas. Sweeps and payouts fail without it.

4

### Assign it to your projects[](#assign-it-to-your-projects)

-   On the wallet's row, select the edit icon next to the project count to choose which projects use it.
    
-   Each project needs a hot wallet for the networks it accepts. There is no fallback to a shared wallet.
    

* * *

### Best practices[](#best-practices)

-   Keep only a small working balance — enough for gas and pending operations — and top it up periodically.
    
-   Treat hot wallets as operational wallets, not long-term storage. Your cold wallet is where funds should accumulate.
    
-   Set up email alerts under **Settings** so you are notified when a balance runs low.
    

* * *

You have set up hot wallets for the EVM family and Tron, which is what enables sweeping and payouts. If you also accept BTC, sweeping works differently — see [Bitcoin Funds Sweep Guide](/onboarding-guide/funds-sweeping/bitcoin-funds-sweep-guide).

[PreviousTesting Payment Links](/onboarding-guide/testing-payment-links)[NextFunds Sweeping](/onboarding-guide/funds-sweeping)

Last updated 9 hours ago