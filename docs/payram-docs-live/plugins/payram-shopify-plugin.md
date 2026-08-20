For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/plugins/payram-shopify-plugin.md).

Copy

On this page

1.  [PLUGINS](/plugins)

# PayRam Shopify Plugin

This guide walks you through connecting PayRam as a payment method on your Shopify store. It has three parts: setting up the plugin server, configuring it in Shopify, and testing your first payment.

## Part A: Server Setup (Terminal)[](#part-a-server-setup-terminal)

#### 1\. Get the installation script[](#id-1.-get-the-installation-script)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FVrEusd2nuqIFqukpNrul%252Fimage.png%3Falt%3Dmedia%26token%3D02e6318d-e797-4cc2-b95a-e131de07001a&width=768&dpr=3&quality=100&sign=b90cb8ae&sv=2)

Go to the PayRam GitHub repository and open the Shopify repo. Copy the bash installation link provided there.

#### 2\. Run the script in terminal[](#id-2.-run-the-script-in-terminal)

> This can be run on any server. It does not need to be the same server where your main PayRam instance is installed.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FTuI5do3l7NPhasd22HQj%252Fimage.png%3Falt%3Dmedia%26token%3D85ddc518-ce6c-415b-a477-db66bcdb4b95&width=768&dpr=3&quality=100&sign=c90d1bda&sv=2)

The script will walk you through setup. You can accept all default values unless you have specific configuration needs.

#### 3\. Configure HTTPS on port 2798[](#id-3.-configure-https-on-port-2798)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252F9E73ZeDyfh2orCZxV5mF%252Fimage.png%3Falt%3Dmedia%26token%3D7ecb1d69-18e2-4fa5-9d07-f0624731502c&width=768&dpr=3&quality=100&sign=e54d731a&sv=2)

Once installed, you need to expose port `2798` via HTTPS. Use either:

-   An **nginx reverse proxy**, or
    
-   A direct **HTTPS configuration** on your server
    

#### 4\. Log in and create your app[](#id-4.-log-in-and-create-your-app)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FBg2eWk3rWXQKMcekILC0%252Fimage.png%3Falt%3Dmedia%26token%3Df8a23cf1-6a9f-4ace-9dc7-1b4a097b91aa&width=768&dpr=3&quality=100&sign=c6904858&sv=2)

Open the login page URL shown at the end of the script.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252F8erzki1d5PWtxpGm7F1I%252Fimage.png%3Falt%3Dmedia%26token%3D61238205-54ad-4b66-b69c-665a0cc07477&width=768&dpr=3&quality=100&sign=4ebb4ba7&sv=2)

Sign in and authenticate with your Shopify credentials.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FecbDgEEEQGzrvJRs0ubk%252Fimage.png%3Falt%3Dmedia%26token%3De98c0266-d3c0-4b11-af95-957578a8125a&width=768&dpr=3&quality=100&sign=9cee81a0&sv=2)

Then run the app creation step in the terminal when prompted.

#### 5\. Add your Shopify store URL[](#id-5.-add-your-shopify-store-url)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FmsIg1Nd1OccqUfzk5esr%252Fimage.png%3Falt%3Dmedia%26token%3Dc80aba30-49fc-431d-afe1-70ccc277e05e&width=768&dpr=3&quality=100&sign=3f8e7e41&sv=2)

When asked, enter your Shopify store's URL.

#### 6\. Choose a database[](#id-6.-choose-a-database)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FgpOTDWg7NuADUW7DrQ1J%252Fimage.png%3Falt%3Dmedia%26token%3D56fd40f0-0b77-4b2e-8d38-df9f45888ae7&width=768&dpr=3&quality=100&sign=ae6697d2&sv=2)

You can either connect an external database or use the default SQLite option, which works fine for most setups.

#### 7\. Install the app to your Shopify dashboard[](#id-7.-install-the-app-to-your-shopify-dashboard)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fxgyau0a1GGU4Xn6tlSc3%252Fimage.png%3Falt%3Dmedia%26token%3De58e1520-8aa6-4e98-88e1-fd66a2bfb386&width=768&dpr=3&quality=100&sign=cb01d2d7&sv=2)

In the terminal, follow the URL to install the PayRam app onto your Shopify store.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FYNlTc9HIP2B0x0y8T9lA%252Fimage.png%3Falt%3Dmedia%26token%3D13dd58f9-828f-4b9a-b881-cdfcdcaa9117&width=768&dpr=3&quality=100&sign=a4b1781f&sv=2)

It will open up in your browser, select Install to continue.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FdwQpKmO51KDRzUDQclcP%252Fimage.png%3Falt%3Dmedia%26token%3D7c7e759e-8590-4fc1-b1f8-769f40d84a68&width=768&dpr=3&quality=100&sign=351a40de&sv=2)

Inside the app settings, enter the following:

-   **Base URL** - the URL of your PayRam plugin server (from Part A) along with the port number
    
    -   For eg. https://payram.yourdomain.com:8443
        
    
-   **Project API Key** - found in your PayRam dashboard ([access here](https://docs.payram.com/features/payment-apis#managing-api-keys))
    
-   **Payment Method Name** - enter a custom name for the label to be displayed to customers
    

Once done, click Save Settings.

#### 8\. Test the connection[](#id-8.-test-the-connection)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FcOGdLKJwwrG2E6QAeK5L%252Fimage.png%3Falt%3Dmedia%26token%3D3dec5942-76a8-40cf-8cc8-b8d80aab533f&width=768&dpr=3&quality=100&sign=106b13be&sv=2)

Click Test PayRam Connection to test the connection. A successful response returns an HTTP 200 status, which confirms the connection is working correctly.

* * *

### Part B: Shopify Dashboard Configuration[](#part-b-shopify-dashboard-configuration)

#### 1\. Add PayRam as a manual payment method[](#id-1.-add-payram-as-a-manual-payment-method)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FKdEeOZXZYlJzBMrTdTWe%252Fimage.png%3Falt%3Dmedia%26token%3Da4e5243d-1e8e-4ec9-838f-bc409581c2d1&width=768&dpr=3&quality=100&sign=3d0c0379&sv=2)

Go to: Settings > Payments

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FpCbqWRzAKW0JaQXVAarp%252Fimage.png%3Falt%3Dmedia%26token%3D4c504607-262b-4378-b263-d9c0950c02d2&width=768&dpr=3&quality=100&sign=705b3d21&sv=2)

Select Manual Payment Methods and from the dropdown, select Create custom payment method and set it up as PayRam.

#### 2\. Customize your checkout page[](#id-2.-customize-your-checkout-page)

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FIFoFpqqwkLFYIUZ7BraQ%252Fimage.png%3Falt%3Dmedia%26token%3D90f0a1fb-2df8-44fa-94e9-0ba28201e9d5&width=768&dpr=3&quality=100&sign=ffac17e8&sv=2)

From the Shopify sidebar, select **Checkout > Customize**. This is where customers will see the PayRam payment option.

The customer flow works like this:

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252F6esrftUIJ8XkIky3yEyN%252Fimage.png%3Falt%3Dmedia%26token%3Ddb26ed42-bfc7-42af-8224-059a31ad9e04&width=768&dpr=3&quality=100&sign=b1d154fe&sv=2)

Customer selects Pay via PayRam at checkout.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252FO9bu2euYWaM1DN52VPqG%252Fimage.png%3Falt%3Dmedia%26token%3Da6fa09e2-e111-4147-b916-9b0b7233996f&width=768&dpr=3&quality=100&sign=f29d07ad&sv=2)

They complete the payment on the **Thank You page** after placing the order

> Approve the app and add it to the **Thank You page** so the payment widget appears there.

* * *

### Part C: Test Payment[](#part-c-test-payment)

Once everything is configured, run a test to confirm the full flow works end to end.

1.  Visit your Shopify store
    
2.  Add any item to your cart
    
3.  Proceed to checkout
    
4.  Select **Pay via PayRam**
    
5.  Click **Pay Now**
    
6.  On the Thank You page, enter your email address
    
7.  A PayRam payment link will be generated
    
8.  Complete the payment using the link
    

If the payment goes through successfully, your integration is live and ready to use.

[PreviousTypescript/Javascript SDK](/payram-sdk/typescript-javascript-sdk)[NextPayRam MCP](/mcp/payram-mcp)

Last updated 16 minutes ago