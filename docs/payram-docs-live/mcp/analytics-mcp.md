For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/mcp/analytics-mcp.md).

Copy

On this page

1.  [MCP](/mcp)

# Analytics MCP

This section walks through the process of integrating the PayRam Analytics server with Telegram to receive real-time updates on payments, users, payouts, and system analytics in Telegram chats.

### Introduction[](#introduction)

The PayRam Telegram Analytics Bot provides direct access to PayRam analytics from Telegram. Once configured, authorized users can query payments, users, payouts, and activity without accessing the PayRam dashboard.

The bot connects securely to the PayRam Analytics server and responds only in allowlisted chats, enabling teams to monitor metrics, generate summaries, and obtain insights directly within Telegram.

* * *

### Prerequisites[](#prerequisites)

Before setting up the PayRam Telegram Analytics Bot, ensure the following requirements are met:

-   A server (VPS or dedicated machine) where the bot will be deployed and run
    
-   A running PayRam server with analytics enabled
    
-   PayRam dashboard **admin credentials** (email and password)
    
-   A Telegram bot token created using **@BotFather**
    
    -   Refer to this guide for setup instructions: [https://blog.devgenius.io/how-to-set-up-your-telegram-bot-using-botfather-fd1896d68c02](https://blog.devgenius.io/how-to-set-up-your-telegram-bot-using-botfather-fd1896d68c02)
        
    
-   An OpenAI API key for generating analytics responses
    
-   Docker installed on the server
    

* * *

### Installation[](#installation)

1

#### Run the setup script[](#run-the-setup-script)

Copy

```
./setup_payram_agent.sh
```

2

#### Provide required configuration details[](#provide-required-configuration-details)

-   During the setup process, you will be prompted to enter the following information:
    
    -   **Publicly accessible PayRam Server URL**
        
        -   This URL must be reachable by the analytics bot.
            
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2F2b68NitMDJUgQnED11dW%2Fimage.png&width=768&dpr=3&quality=100&sign=c05e38f7&sv=2)
    
    -   **PayRam dashboard admin credentials**
        
        -   The admin email and password used to authenticate the analytics bot with your PayRam server.
            
        
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FbEHm9nyParmZ5oAeX5Mk%2Fimage.png&width=768&dpr=3&quality=100&sign=c3277519&sv=2)

-   **OpenAI API Key**
    
    -   Required to enable AI-powered analytics responses.
        
    
-   **Telegram Bot Token**
    
    -   The token generated via **@BotFather** for your Telegram bot.
        
    
-   **Allowed Telegram Users**
    
    -   A comma-separated list of Telegram usernames that are permitted to interact with the bot.
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FfhalGSrmEjrG60c2uoRy%2Fimage.png&width=768&dpr=3&quality=100&sign=1868890c&sv=2)
    
-   **Auto-Updates (Optional)**
    
    -   Choose whether the analytics bot should automatically update itself when new versions of the Analytics MCP server are released.
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FrVlx51DejzGbz1DOD7vQ%2Fimage.png&width=768&dpr=3&quality=100&sign=2c4cf1a6&sv=2)
    
-   **Start Container After Setup (Optional)**
    
    -   Choose whether to start the analytics agent Docker container immediately after the setup completes.
        
    
    ![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2Fwm1DIvbGMREWT1TdLPtz%2Fblobs%2FHprJDMA6HJ4rlAhEXKse%2Fimage.png&width=768&dpr=3&quality=100&sign=9e547a19&sv=2)
    

If you choose to start the container during setup, the Analytics MCP server will be installed and running once the process completes. You can then open Telegram and begin using the bot.

3

#### Using the Telegram Analytics Bot[](#using-the-telegram-analytics-bot)

Once the setup is complete, open Telegram and send a message to the bot from an allowlisted chat. The bot will respond with PayRam analytics in the same chat.

**Example Queries:**

-   **“Show me today’s payments summary.”**
    
-   **“Create a payment link for 3 USD on the main project with email example@gmail.com and customerId cust-123.”**
    
-   **“Top paying users this week.”**
    
-   **“Deposit distribution by chain for the last 7 days.”**
    
-   **“Payouts by currency for December.”**
    
-   **“User growth compared to the previous period.”**
    

> **Access Control Note**
> 
> If you message the bot from a chat that is not allowlisted, it will respond with an **“Access denied”** message along with the `chat_id`. Add this `chat_id` using the allowlist update command, then retry your request.

### Managing Bot Access[](#managing-bot-access)

You can grant access to additional users or groups without rerunning the full setup by using the commands below.

#### Add Telegram Usernames (Recommended)[](#add-telegram-usernames-recommended)

Use this option to allow individual Telegram users to interact with the analytics bot:

> **Notes:**
> 
> -   Usernames can be provided with or without the `@` prefix or `t.me/` format.
>     
> -   Multiple usernames must be comma-separated.
>     

#### Add Telegram Chat IDs (For Groups)[](#add-telegram-chat-ids-for-groups)

Use this to allow Telegram groups or chats:

[PreviousPayRam MCP](/mcp/payram-mcp)[NextPayment Links](/features/payment-links)

Last updated 9 hours ago