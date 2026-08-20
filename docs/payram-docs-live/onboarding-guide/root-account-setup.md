For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/onboarding-guide/root-account-setup.md).

Copy

On this page

1.  [ONBOARDING GUIDE](/onboarding-guide)

# 🪪Root Account Setup

In this section, you’ll complete the initial setup for your root account, which serves as the main administrator account for your PayRam server. By the end, your root account will be ready to manage a

* * *

## **Prerequisites**[](#prerequisites)

Before you proceed with the onboarding configuration, make sure the following steps are completed:

-   Install the PayRam server and ensure it is running.
    
-   If you haven’t completed the installation, do that first by following the Installation Guide.
    

* * *

## Root account setup[](#root-account-setup)

1

### Open your PayRam server[](#open-your-payram-server)

-   In your browser, go to the IP address or domain where you hosted PayRam. The PayRam welcome page appears.
    

![The PayRam welcome page](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-40533e6e99f1e97fbcce43fb8414f0195d8f63d2%252Fpayram-onboarding-welcome.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=97c1cc03&sv=2)

-   Seeing this page means your PayRam server is up and running.
    

**Note**: The **Go to Payram** buttons on this page open payram.com, not your own instance. To reach your setup screen, go to the signup URL in the next step.

2

### Go to the signup page[](#go-to-the-signup-page)

-   In the address bar, add `/signup` to the address where you hosted PayRam.
    
    The addresses below are examples only — replace them with your own domain or server IP:
    
    Your setup
    
    Example signup URL
    
    Domain with SSL
    
    `https://pay.example.com/signup`
    
    Server IP, no SSL
    
    `http://192.168.0.1/signup`
    
    Installed on a different port
    
    `http://192.168.0.1:3000/signup`
    
-   The root account setup opens. This account has full administrative control over every configuration and setting.
    

![Let's set up your root account](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-fa2aa7203f1518eecb35b668500a9299d7ab914d%252Fpayram-onboarding-intro.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=53f0d9af&sv=2)

-   Select **Next**.
    

3

### Enter your root email[](#enter-your-root-email)

-   Enter the email address for your root account. Remember it — this is the account you will log in with as the main administrator.
    

![Entering the root account email](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-8e7d1dbdf51962bd75a063b2c6192376387c575f%252Fpayram-onboarding-email.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=6cad86f2&sv=2)

-   Select **Continue**.
    

4

### Set your root password[](#set-your-root-password)

-   Enter a password, then enter it again in **Confirm Password**.
    

![Setting the root account password](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-57479aa718491cb943d5bf6e400b25474d894a39%252Fpayram-onboarding-password.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=18263083&sv=2)

-   Select **Continue**.
    

**Store these credentials safely.** Your root account is created at this step. The email and password are what you use to log in as the main administrator, and you will need them again if you ever reinstall against the same database.

5

### Choose how you will use PayRam[](#choose-how-you-will-use-payram)

-   PayRam asks whether you are a **Merchant** or an **Operator**. Selecting either one reveals what it includes, so you can compare before you commit.
    

![Choosing between Merchant and Operator](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-253baf821de5be26855b7d228cfd3890fa81501a%252Fpayram-onboarding-role.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=1d5ae611&sv=2)

Mode

Choose it when

**Merchant**

Your customers pay you directly. This is the recommended option for most installs.

**Operator**

You onboard other merchants and earn a fee on their payments.

-   Select the mode you want, then select **Continue**.
    

6

### Create your first project[](#create-your-first-project)

-   A project holds the wallets, fees, branding and users for one website or product. Use your business or brand name so you can recognise it later in reports.
    

![Creating your first project](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-fe9f2e9b8bb9651ecdb5e5642c1d93cd811e08c3%252Fpayram-onboarding-project.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=6856fcf8&sv=2)

-   Enter a project name, then select **Continue → Invite teammate**, or **Skip to dashboard** to finish now.
    

**Note**: You can rename a project later from **Settings → Projects**, and add more projects at any time.

7

### Invite a teammate (optional)[](#invite-a-teammate-optional)

-   If you continued, PayRam offers to add one teammate to the project straight away.
    

![Inviting a teammate to the project](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-daba9fce0e32899aebbdfa3098bf6d834b6abaa3%252Fpayram-onboarding-invite.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=1e456743&sv=2)

-   Choose the role they should have:
    

Role

What they can do

**Project Admin**

Manages wallets, fees, webhooks and branding, and can invite other members.

**Project Lead**

Runs day-to-day operations while you keep control of the wallets.

-   Enter their full name, email and a temporary password, then select **Save and finish**. Share those credentials with them privately.
    
-   This step is optional — select **Skip to dashboard** and add teammates later from **Settings → User Management**.
    

* * *

You have successfully completed the onboarding configuration. Now, proceed to Node Details Configuration to set up your dashboard settings.

[PreviousIntroduction](/onboarding-guide/introduction)[NextNode Details Configuration](/onboarding-guide/node-details-configuration)

Last updated 9 hours ago