copyCopychevron-down

1.  [FEATURES](/features)

# 💳Fiat Onramp

In this section, you’ll understand how Fiat Onramp works in PayRam, the supported methods, and what merchants need to enable them.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F53VKyC70e6oDVp9yLWh0%2Fpayram-feature-fiat-onramp.png&width=768&dpr=3&quality=100&sign=5734b1b2&sv=2)

Fiat Onramp allows merchants to accept customer payments in fiat currency while receiving settlements in crypto through PayRam. It removes the need for external exchanges or manual conversions, letting businesses expand their customer base and simplify checkout experiences.

* * *

### 

[hashtag](#why-it-matters)

Why it Matters

-   Lets merchants reach customers who prefer paying in fiat.
    
-   Enables seamless acceptance of cards, wallets, bank transfer, and local payment methods.
    
-   Automatically settles payments in crypto, keeps all settlements non-custodial.
    
-   Reduces conversion friction and simplifies operations.
    

* * *

### 

[hashtag](#supported-onramp-methods)

Supported onramp methods

### 

[hashtag](#third-party-onramp-partners)

Third-party Onramp Partners

This method connects merchants to regulated fiat-to-crypto providers, enabling customers to complete transactions using familiar fiat payment options like card, bank transfer, and more.

#### 

[hashtag](#how-it-works-for-merchants)

How it works for merchants

-   To enable the onramp feature in PayRam, merchants must first complete KYB with the onramp partner.
    
-   After KYB approval, the merchant needs to add the API key provided by the onramp partner into the PayRam dashboard.
    
-   PayRam will auto-detect the integration and update the available checkout options without any extra configuration.
    

#### 

[hashtag](#commercials-and-fees)

Commercials and fees

-   PayRam does not apply any additional fees or markups on onramp transactions.
    
-   All onramp related commercials are directly between the merchant and the onramp provider.
    

#### 

[hashtag](#checkout-experience)

**Checkout experience**

-   All onramp transaction amounts are directly deposited into the merchant’s deposit wallet (unique address created for each customer).
    

#### 

[hashtag](#supported-partners)

Supported partners

-   PayRam currently integrates with **TransFi**, more onramp partners will be arriving soon!
    
-   TransFi supports **100+ countries** and **40+ fiat currencies**, allowing global customers to purchase crypto seamlessly.
    

### 

[hashtag](#payram-payments-app-coming-soon)

PayRam Payments App \[Coming soon\]

This method will allow merchants to accept fiat payments through PayRam’s integrated payments layer, offering a faster setup and a smoother customer experience.

#### 

[hashtag](#how-it-works-for-merchants-1)

How it works for merchants:

-   Merchants do not need to complete KYC/KYB to enable this Onramp method.
    
-   Activation will be available directly inside the PayRam Dashboard once the feature goes live.
    
-   Merchants will have the option to sponsor gas fees for customers, reducing friction and improving conversion.
    

#### 

[hashtag](#how-it-works-for-customers)

How it works for customers:

-   Customers will still be required to complete KYC verification once before making a purchase.
    
-   After verification, customers can pay using supported fiat methods with minimal steps.
    

* * *

## 

[hashtag](#how-to-enable-third-party-fiat-onramp-partner)

How to Enable Third-party Fiat Onramp Partner

1

### 

[hashtag](#navigate-to-settings)

Navigate to settings

-   Log in to your PayRam Dashboard and go to the Settings section.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FJshhxEoXNQAxB6SXpP5L%2Fimage.png&width=768&dpr=3&quality=100&sign=d3b49779&sv=2)

-   Now click on the Payment Channels option.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FojBAP2asosbZ5M14Rz6e%2Fimage.png&width=768&dpr=3&quality=100&sign=76f39598&sv=2)

2

### 

[hashtag](#activate-transfi)

Activate TransFi

-   Click on the Activate button beside _TransFi_ to enable this payment channel.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FNlMCHLGunczmHsdcHUcJ%2Fimage.png&width=768&dpr=3&quality=100&sign=1f57f7e8&sv=2)

-   Get your TransFi API key from their dashboard. You must complete KYB/KYC with TransFi in order to procure the API key.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FrNfNgxE0P1sLdpWTXslc%2Fimage.png&width=768&dpr=3&quality=100&sign=41f27c0d&sv=2)

-   After you receive the TransFi API key, paste it into the API Key field and click Activate. Once activated, you can start accepting customer payments using the fiat on-ramp feature.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2Feb6YlTOhfSGmk1oNfnv6%2Fimage.png&width=768&dpr=3&quality=100&sign=e6285067&sv=2)

3

### 

[hashtag](#accept-payments)

Accept payments

-   Go to the Payments menu in the sidebar, click the dropdown, and then select Create Payment Link.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2Fi0wEyO9EYRcQrL6jguoy%2Fimage.png&width=768&dpr=3&quality=100&sign=307e579c&sv=2)

-   Create a payment link by entering the customer’s email and the required amount, then click Generate Payment Link.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2Fz7dzFvBBp398nAFpX05G%2Fimage.png&width=768&dpr=3&quality=100&sign=942614e0&sv=2)

4

### 

[hashtag](#pay-using-transfi-widget)

Pay using TransFi Widget

-   Your customers will now see the TransFi payment option on the payment page. They just need to click on TransFi to use it.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FbG44P3tCjYe30uLzZXmf%2Fimage.png&width=768&dpr=3&quality=100&sign=cda19600&sv=2)

-   Customers can pay using their credit or debit cards through the TransFi widget, and the crypto will be deposited directly into the merchant’s deposit wallet (unique address created for each customer).
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FYxW6IXCjtPymglwDt6zx%2Fimage.png&width=768&dpr=3&quality=100&sign=d892c9d4&sv=2)

## 

[hashtag](#managing-onramp-access-for-individual-projects)

Managing Onramp Access for Individual Projects

If you run multiple projects under a single PayRam account, you can control onramp access at the project level. This allows you to enable or disable onramp independently for each project after activating the onramp API.

### 

[hashtag](#how-project-level-onramp-management-works)

How Project-Level Onramp Management Works

Once the Onramp API is activated:

-   Onramp is **enabled by default for all projects**
    
-   You must manually disable it for any project where you do not want to offer onramp
    

### 

[hashtag](#steps-to-enable-or-disable-onramp-for-a-project)

Steps to Enable or Disable Onramp for a Project

1

### 

[hashtag](#navigate-to-settings-1)

Navigate To Settings

Go to Settings and select Account

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F0hhCz2IrX532rou51vZW%2Fimage.png&width=768&dpr=3&quality=100&sign=63dd2125&sv=2)

2

### 

[hashtag](#choose-project)

Choose Project

Choose the Project you want to manage

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FjyqbAhju5mpglcMdeTaD%2Fimage.png&width=768&dpr=3&quality=100&sign=eb481c01&sv=2)

3

### 

[hashtag](#payment-options)

Payment Options

Open the Payment Options tab

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FRxK9tF2yz9FQQljiCeEU%2Fimage.png&width=768&dpr=3&quality=100&sign=d9340333&sv=2)

4

### 

[hashtag](#enable-onramp)

Enable Onramp

Toggle Onramp on or off for that project

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FFffVeuwC5J1uY53t29DS%2Fimage.png&width=768&dpr=3&quality=100&sign=ff825416&sv=2)

Your changes apply immediately to the selected project.

[PreviousPayoutschevron-left](/features/payouts)[NextIntroductionchevron-right](/faqs/introduction)