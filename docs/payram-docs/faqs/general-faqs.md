# General FAQ's

* [What is PayRam?](#what-is-payram)
* [How do I get started, and how fast can I go live?](#how-do-i-get-started-and-how-fast-can-i-go-live)
* [What are the minimum server requirements to run PayRam?](#what-are-the-minimum-server-requirements-to-run-payram)
* [Which cryptocurrencies and blockchains does PayRam support?](#which-cryptocurrencies-and-blockchains-does-payram-support)
* [Does PayRam handle fiat currencies (USD, EUR, etc.)?](#does-payram-handle-fiat-currencies-usd-eur-etc)
* [What fees does PayRam charge?](#what-fees-does-payram-charge)
* [Are there any transaction limits?](#are-there-any-transaction-limits)
* [How do I integrate PayRam with my platform?](#how-do-i-integrate-payram-with-my-platform)
* [Is there a sandbox or test mode?](#is-there-a-sandbox-or-test-mode)
* [How secure is PayRam?](#how-secure-is-payram)
* [Does PayRam require KYC/AML?](#does-payram-require-kyc-aml)
* [How are refunds and chargebacks handled?](#how-are-refunds-and-chargebacks-handled)
* [What happens if a customer underpays or overpays?](#what-happens-if-a-customer-underpays-or-overpays)
* [Can I set up recurring subscriptions or billing?](#can-i-set-up-recurring-subscriptions-or-billing)
* [Which industries benefit most from PayRam?](#which-industries-benefit-most-from-payram)
* [How do I migrate from testnet to mainnet?](#how-do-i-migrate-from-testnet-to-mainnet)
* [What support options are available?](#what-support-options-are-available)

#### What is PayRam?

PayRam is a **self-hosted** cryptocurrency payment processor that you deploy and run on your own servers—no middlemen, no censorship, or any limitations. You retain **full custody** of your funds and infrastructure, gaining total control over your payments flow and data.

***

#### How do I get started, and how fast can I go live?

Getting started is quick and code-light. After installing PayRam via our install script, you simply embed a few lines of API code into your application. You can be **accepting live crypto payments in under an hour**, with no account activation or KYC delays on PayRam’s side.

***

#### What are the minimum server requirements to run PayRam?

For smooth production performance, we **recommend**:

* **4 CPU cores**
* **4 GB RAM**
* **50 GB SSD**

  For very high-volume use cases, scale CPU, memory, and disk accordingly.

***

#### Which cryptocurrencies and blockchains does PayRam support?

PayRam natively supports major cryptos and blockchains, including Bitcoin (BTC), Ethereum (ETH), Tron (TRX), Tether (USDT), USD Coin (USDC) and other EVM-compatible tokens. PayRam is actively adding support for new cryptos and networks.

***

#### Does PayRam handle fiat currencies (USD, EUR, etc.)?

*Not yet.* PayRam currently processes **crypto-only** transactions. Automated crypto-to-fiat on-ramp and direct fiat off-ramp settlement are part of the roadmap.

***

#### What fees does PayRam charge?

PayRam charges a flat 1%-5% fee on settlement, when funds are withdrawn to the cold wallet. PayRam does NOT charge any other fees or subscriptions or has any reserve fund requirements.

***

#### Are there any transaction limits?

No, PayRam does not have any transaction limits. The platform supports **unlimited** transactions and scales with your business. Whether you process 10 transactions or 10,000+ per day, PayRam handles it seamlessly.

***

#### How do I integrate PayRam with my platform?

After installation, you have access to a **RESTful API**, plus SDKs and pre-built connectors. You can integrate via:

* **Payment form embeddables**
* **Payment links & invoices**
* **Webhook callbacks**

  Our docs include sample code for **Shopify**, **WooCommerce**, or any custom web/mobile app.

***

#### Is there a sandbox or test mode?

Yes,a complete **testnet environment for PayRam** is available. Configure PayRam to point at testnet RPC URLs and use our test wallets/faucets to validate your integration before going live.

***

#### How secure is PayRam?

* Self‑custodial control: You maintain exclusive ownership of your private keys at all times.
* On‑premises deployment: All data and funds reside on your infrastructure—never with a third party—dramatically lowering breach risk.
* Automated, trustless consolidation: Intelligent on‑chain sweeps, powered by smart contracts, replace manual fund transfers and slash operational risk.
* Reduced human error: Fully automated workflows streamline processes and eliminate manual intervention.
* Granular access management: Role‑based permissions let you define precisely who can execute sensitive operations.
* Minimized attack surface: A purpose‑built design limits external dependencies and potential vulnerabilities.
* Enterprise‑grade security: From key custody to access controls, PayRam delivers a hardened platform for crypto payment management.

***

#### Does PayRam require KYC/AML?

As a self-hosted solution, PayRam does not impose mandatory KYC requirements by default. However, users have the flexibility to implement their own KYC/AML workflows in accordance with their jurisdictional regulations or customer due diligence policies.

***

#### How are refunds and chargebacks handled?

As there is no automatic on-chain chargeback mechanism, refunds on PayRam must be processed manually through the dashboard or API. The specified crypto amount is returned directly to the customer’s wallet address by the merchant.

***

#### What happens if a customer underpays or overpays?

If a customer underpays, the payment status remains marked as “pending” until the full amount is received. In the case of an overpayment, the excess amount is clearly displayed in the PayRam dashboard, allowing the merchant to either issue a refund or apply the surplus to future invoices, depending on the preferred workflow.

***

#### Can I set up recurring subscriptions or billing?

PayRam natively supports one-off payments and invoices. Subscription functionality is not included by default and would need to be implemented at the application layer or through custom scripting using the available APIs.

***

#### Which industries benefit most from PayRam?

PayRam is suitable for a wide range of industries, with particular relevance for:

* **High-risk** and **censorship-sensitive** sectors such as iGaming, adult services, and gambling
* **Marketplaces** and **e-commerce platforms** aiming for global reach and crypto acceptance
* **Charities** and **NGOs** seeking transparent, on-chain donation tracking
* **Fintech companies** or **payment service providers (PSPs)** looking to offer crypto payments as a white-label solution

***

#### How do I migrate from testnet to mainnet?

1. Update your `config.yaml` from `DEVELOPMENT` to `PRODUCTION`.
2. Swap all testnet RPC URLs and xpubs for their mainnet counterparts.
3. Increase confirmation thresholds (e.g., BTC → 6, ETH → 12).
4. Test on a staging instance, then restart PayRam with new configs.

***

#### What support options are available?

PayRam offers several support options to assist users. For critical issues, 24/7 support is available via email and chat. Comprehensive documentation and code samples can be found at [docs.payram.com](https://docs.payram.com/), providing guidance for setup and integration. Additionally, users can access community forums and GitHub issue tracking for self-service support and peer assistance.

***
