copyCopychevron-down

1.  [MCP](/mcp)

# Analytics MCP

This section walks through the process of integrating the PayRam Analytics server with Telegram to receive real-time updates on payments, users, payouts, and system analytics in Telegram chats.

### 

[hashtag](#introduction)

Introduction

The PayRam Telegram Analytics Bot provides direct access to PayRam analytics from Telegram. Once configured, authorized users can query payments, users, payouts, and activity without accessing the PayRam dashboard.

The bot connects securely to the PayRam Analytics server and responds only in allowlisted chats, enabling teams to monitor metrics, generate summaries, and obtain insights directly within Telegram.

* * *

### 

[hashtag](#prerequisites)

Prerequisites

Before setting up the PayRam Telegram Analytics Bot, ensure the following requirements are met:

-   A server (VPS or dedicated machine) where the bot will be deployed and run
    
-   A running PayRam server with analytics enabled
    
-   PayRam dashboard **admin credentials** (email and password)
    
-   A Telegram bot token created using **@BotFather**
    
    -   Refer to this guide for setup instructions: [https://blog.devgenius.io/how-to-set-up-your-telegram-bot-using-botfather-fd1896d68c02arrow-up-right](https://blog.devgenius.io/how-to-set-up-your-telegram-bot-using-botfather-fd1896d68c02)
        
    
-   An OpenAI API key for generating analytics responses
    
-   Docker installed on the server
    

* * *

### 

[hashtag](#installation)

Installation

1

#### 

[hashtag](#run-the-setup-script)

Run the setup script

Copy

```
./setup_payram_agent.sh
```

2

#### 

[hashtag](#provide-required-configuration-details)

Provide required configuration details

-   During the setup process, you will be prompted to enter the following information:
    
    -   **Publicly accessible PayRam Server URL**
        
        -   This URL must be reachable by the analytics bot.
            
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F2979559388-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2diixQuZV5bHAbOknKAq%252Fuploads%252FVJZ1m9QHosBiYMlan2M5%252Fimage.png%3Falt%3Dmedia%26token%3D73f44cc8-036b-4c40-971b-7791c0e5df78&width=768&dpr=3&quality=100&sign=e414a6b7&sv=2)
    
    -   **PayRam dashboard admin credentials**
        
        -   The admin email and password used to authenticate the analytics bot with your PayRam server.
            
        
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F2979559388-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2diixQuZV5bHAbOknKAq%252Fuploads%252FM0L8V4PBxavcOuKWndiq%252Fimage.png%3Falt%3Dmedia%26token%3D7c2e8b8b-9d9a-4c5f-81f5-d329e72a8285&width=768&dpr=3&quality=100&sign=7ff0e02f&sv=2)

-   **OpenAI API Key**
    
    -   Required to enable AI-powered analytics responses.
        
    
-   **Telegram Bot Token**
    
    -   The token generated via **@BotFather** for your Telegram bot.
        
    
-   **Allowed Telegram Users**
    
    -   A comma-separated list of Telegram usernames that are permitted to interact with the bot.
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F2979559388-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2diixQuZV5bHAbOknKAq%252Fuploads%252FhidKLTMiwJD42PomqFIA%252Fimage.png%3Falt%3Dmedia%26token%3D0e02161b-53f5-4f96-9f08-128cc1a11ce0&width=768&dpr=3&quality=100&sign=87927151&sv=2)
    
-   **Auto-Updates (Optional)**
    
    -   Choose whether the analytics bot should automatically update itself when new versions of the Analytics MCP server are released.
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F2979559388-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2diixQuZV5bHAbOknKAq%252Fuploads%252FivZgXc7O86RVH3QwtJ8H%252Fimage.png%3Falt%3Dmedia%26token%3D5c2cf39a-7874-455f-853b-078dfa4412e7&width=768&dpr=3&quality=100&sign=1a8e08c1&sv=2)
    
-   **Start Container After Setup (Optional)**
    
    -   Choose whether to start the analytics agent Docker container immediately after the setup completes.
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F2979559388-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2diixQuZV5bHAbOknKAq%252Fuploads%252FxBy8PRtpMinMP4NoTQB4%252Fimage.png%3Falt%3Dmedia%26token%3D2d1bca59-1cdd-484d-9a65-361831d050c6&width=768&dpr=3&quality=100&sign=c3ff9d34&sv=2)
    

If you choose to start the container during setup, the Analytics MCP server will be installed and running once the process completes. You can then open Telegram and begin using the bot.

3

#### 

[hashtag](#using-the-telegram-analytics-bot)

Using the Telegram Analytics Bot

Once the setup is complete, open Telegram and send a message to the bot from an allowlisted chat. The bot will respond with PayRam analytics in the same chat.

**Example Queries:**

-   **“Show me today’s payments summary.”**
    
-   **“Create a payment link for 3 USD on the main project with email [\[email protected\]](/cdn-cgi/l/email-protection) and customerId cust-123.”**
    
-   **“Top paying users this week.”**
    
-   **“Deposit distribution by chain for the last 7 days.”**
    
-   **“Payouts by currency for December.”**
    
-   **“User growth compared to the previous period.”**
    

> **Access Control Note**
> 
> If you message the bot from a chat that is not allowlisted, it will respond with an **“Access denied”** message along with the `chat_id`. Add this `chat_id` using the allowlist update command, then retry your request.

### 

[hashtag](#managing-bot-access)

Managing Bot Access

You can grant access to additional users or groups without rerunning the full setup by using the commands below.

#### 

[hashtag](#add-telegram-usernames-recommended)

Add Telegram Usernames (Recommended)

Use this option to allow individual Telegram users to interact with the analytics bot:

> **Notes:**
> 
> -   Usernames can be provided with or without the `@` prefix or `t.me/` format.
>     
> -   Multiple usernames must be comma-separated.
>     

#### 

[hashtag](#add-telegram-chat-ids-for-groups)

Add Telegram Chat IDs (For Groups)

Use this to allow Telegram groups or chats:

[PreviousPayRam MCPchevron-left](/mcp/payram-mcp)[NextPayment Linkschevron-right](/features/payment-links)

Last updated 11 days ago