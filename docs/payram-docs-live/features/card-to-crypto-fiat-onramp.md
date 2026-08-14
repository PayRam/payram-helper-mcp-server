For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/features/card-to-crypto-fiat-onramp.md).

Copy

On this page

1.  [FEATURES](/features)

# 💳Card-to-Crypto Fiat Onramp

In this section, you’ll understand how Card-to-Crypto Onramp works in PayRam, the supported methods, and what merchants need to enable them.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FI9VWk5HiMmE1j8LLIacH%2Fpayram-card-to-crypto-fiat-onramp.png&width=768&dpr=3&quality=100&sign=def00f0a&sv=2)

Card-to-Crypto Onramp or Fiat Onramp allows merchants to accept customer payments in fiat currency while receiving settlements in crypto through PayRam. It removes the need for external exchanges or manual conversions, letting businesses expand their customer base and simplify checkout experiences.

* * *

### Why it Matters[](#why-it-matters)

-   Lets merchants reach customers who prefer paying in fiat.
    
-   Enables seamless acceptance of cards, wallets, bank transfer, and local payment methods.
    
-   Automatically settles payments in crypto, keeps all settlements non-custodial.
    
-   Reduces conversion friction and simplifies operations.
    

* * *

### PayRam Wallets App[](#payram-wallets-app)

This method allows merchants to accept fiat payments, including card, bank transfer, and more, through PayRam's integrated, self-custody wallet layer, offering a faster setup and a smoother customer experience.

Onramp transactions are powered by regulated, third-party fiat-to-crypto providers, with Card-to-Crypto payments now supported via the PayRam Wallet App.

#### How it works for merchants:[](#how-it-works-for-merchants)

-   Merchants do not need to complete KYC/KYB to enable this Onramp method.
    
-   Activation is available directly inside the PayRam Dashboard. Activate Card-to-Crypto onramp in seconds!
    
-   Merchants will have the option to sponsor gas fees for customers, reducing friction and improving conversion.
    

#### How it works for customers:[](#how-it-works-for-customers)

-   A self-custodial PayRam Wallet is automatically generated for the customers, which they can also use for storing, managing, and transferring their digital assets.
    
-   Customers will still be required to complete a basic one-time KYC verification in their first purchase.
    
-   After verification, customers can pay using a card or other supported fiat methods with minimal steps.
    

#### Commercials and fees:[](#commercials-and-fees)

-   PayRam does not apply any additional fees or markups on onramp transactions.
    
-   All onramp related commercials are directly applied by the third-party onramp partners.
    

#### Checkout experience:[](#checkout-experience)

-   Onramp transaction funds are deposited directly into the customer's self-custodial PayRam Wallet, after which the customer can use the funds to complete the transaction with the merchant.
    

#### Supported payment methods:[](#supported-payment-methods)

Customers have access to 175+ payment methods across 190+ countries, with smart routing that matches each user to the best available option based on their region, amount, and payment preference.

Based on their geographic location, customers can complete payments in:

-   Credit and Debit Card
    
-   Apple Pay
    
-   Google Pay
    
-   Bank Transfer (ACH, SEPA, and local equivalents)
    
-   RevolutPay
    

* * *

## How to Enable Card-to-Crypto Onramp via PayRam Wallet[](#how-to-enable-card-to-crypto-onramp-via-payram-wallet)

**Keep Your Instance Up to Date**

Make sure your PayRam instance is running the latest version before proceeding. You can update it at any time using the update script. See [Script Usage: Update](https://docs.payram.com/script/script-usage#update) for further instructions.

**Card Payments Require the Base Blockchain**

Card payments and other fiat payment options are currently supported on the Base blockchain only. Before accepting payments via cards, ensure that the Base blockchain is enabled in your PayRam settings.

1

### Navigate to Settings[](#navigate-to-settings)

-   Log in to your PayRam Dashboard and go to the Settings section.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FjVfTMLGx91XZAjvY9LKf%2Fimage.png&width=768&dpr=3&quality=100&sign=564e4904&sv=2)

-   Now click on the Payment Channels option.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FhuTf9T1A80AP58ODUDcr%2Fimage.png&width=768&dpr=3&quality=100&sign=e91ff1dd&sv=2)

2

### Activate Cards[](#activate-cards)

-   Click on the Activate button beside **Cards** to access the pop-up with more details.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FChkUaFH52mrLKIOkmuDC%2Fimage.png&width=768&dpr=3&quality=100&sign=89720d91&sv=2)

-   In the pop-up, you'll have to click on Activate to instantly enable the payment method.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FH6cMZFre5wNvAPy780cu%2Fimage.png&width=768&dpr=3&quality=100&sign=2ff08698&sv=2)

**Card Payments Require the Base Blockchain**

Card payments and other fiat payment options are currently supported on the Base blockchain only. Before accepting payments via cards, ensure that the Base blockchain is enabled in your PayRam settings.

3

### Accept payments[](#accept-payments)

-   Go to the Payments menu in the sidebar, click the dropdown, and then select Create Payment Link.
    
-   Create a payment link by entering the customer’s email and the required amount, then click Generate Payment Link.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FJnWowFUKwezURw6lycDH%2Fimage.png&width=768&dpr=3&quality=100&sign=254c1627&sv=2)

4

### Pay using PayRam Wallet[](#pay-using-payram-wallet)

-   Your customers will now see the Card payment option on the payment page. They just need to click on Cards to use it.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FmhTwXU5OzMPgwy8IzSF0%2Fimage.png&width=768&dpr=3&quality=100&sign=bfced58d&sv=2)

-   Customers will have to first setup their self-custody PayRam Wallet. They can use their email address to quickly create one in a few seconds.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2F3QIfsfn0g3ohFA3sTIkw%2Fimage.png&width=768&dpr=3&quality=100&sign=44bf937f&sv=2)

-   They will be prompted to Add Funds equivalent to the transaction amount.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fd2T4nHRkfsRPjhfJQipd%2Fimage.png&width=768&dpr=3&quality=100&sign=f1a56898&sv=2)

-   They can pay using their credit/debit cards or banks or other supported payment methods through the onramp widget, and the crypto will be deposited directly into the customer’s self-custody wallet.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FU6Q8rHRPwCKbddpzsf6k%2Fimage.png&width=768&dpr=3&quality=100&sign=ec4d1c9d&sv=2)

-   They can then use the deposited funds to complete the transaction.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fbd7AqQEF710FCMzBjal7%2Fimage.png&width=768&dpr=3&quality=100&sign=e2c060a1&sv=2)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2F9DnQvoVMD6tmQZgWEDCP%2Fimage.png&width=768&dpr=3&quality=100&sign=f983d976&sv=2)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FRQxmgy3Rjltx0xkQ4YjL%2Fimage.png&width=768&dpr=3&quality=100&sign=a27a3af2&sv=2)

## Managing Card-to-Crypto Onramp Access for Individual Projects[](#managing-card-to-crypto-onramp-access-for-individual-projects)

If you run multiple projects under a single PayRam account, you can control Card-to-Crypto onramp access at the project level. This allows you to enable or disable onramp independently for each project after activating the onramp API.

### How Project-Level Card-to-Crypto Onramp Management Works[](#how-project-level-card-to-crypto-onramp-management-works)

Once the Onramp API is activated:

-   Onramp is **enabled by default for all projects**
    
-   You must manually disable it for any project where you do not want to offer onramp
    

### Steps to Enable or Disable Onramp for a Project[](#steps-to-enable-or-disable-onramp-for-a-project)

1

### Navigate To Settings[](#navigate-to-settings-1)

Go to Settings and select Account

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FVrwtso65PeHceJ7AFfM7%2Fimage.png&width=768&dpr=3&quality=100&sign=3cc40b2d&sv=2)

2

### Choose Project[](#choose-project)

Choose the Project you want to manage

3

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2Fu8iFHtiJfVHRuJfD2ay0%2Fimage.png&width=768&dpr=3&quality=100&sign=483a3958&sv=2)

### Payment Options[](#payment-options)

Open the Payment Options tab

4

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FSPJbTkqnomEdM17ad9dj%2Fimage.png&width=768&dpr=3&quality=100&sign=f4d62df3&sv=2)

### Activate or Deactivate Cards[](#activate-or-deactivate-cards)

Toggle Cards on or off for that project

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FokK4y6NCpzLduxYk5390%2Fimage.png&width=768&dpr=3&quality=100&sign=92272967&sv=2)

Your changes apply immediately to the selected project.

[PreviousPayouts](/features/payouts)[NextOperator Mode](/features/operator-mode)

Last updated 9 hours ago