For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/mcp/payram-mcp.md).

Copy

On this page

1.  [MCP](/mcp)

# PayRam MCP

This section explains how to use the PayRam MCP server to integrate payments, payouts, webhooks, and referral workflows into your application efficiently.

## Introduction[](#introduction)

The PayRam MCP Server allows AI assistants to connect with the PayRam platform and help businesses set up and manage crypto payments with ease.

It supports key payment-related workflows such as payment creation, payouts, webhook handling, and referral management. In addition, it provides an overview of core PayRam concepts, standard payment flows, and practical integration guidance, along with example snippets to simplify implementation.

### Key capabilities[](#key-capabilities)

-   **Payment Operations**: Create payment intents, track payment status, and manage end-to-end payment flows.
    
-   **Payout Management**: Initiate and monitor payouts across multiple blockchains and supported currencies.
    
-   **Webhook Handling**: Receive and process webhook events, including signature verification and status updates.
    
-   **Referral System**: Configure referral campaigns, track referral activity, and manage reward distribution.
    
-   **Integration Assistance**: Access guided setup instructions, recommended best practices, and implementation examples.
    
-   **Multi-Framework Support**: Generate integration snippets for commonly used backend frameworks to accelerate development.
    

### Prerequisites[](#prerequisites)

-   An MCP-compatible client (examples provided below).
    
-   The ability to configure a custom MCP server using an HTTP endpoint.
    
    -   No authentication headers are required when using the hosted PayRam MCP endpoint.
        
    

### Client Configuration[](#client-configuration)

VSCode

Cursor

Claude Desktop

Generic MCP Clients

1.  **Install GitHub Copilot**
    
    -   Ensure you are using a version of the GitHub Copilot extension that supports the Model Context Protocol (MCP).
        
    
2.  **Open Copilot MCP Settings**
    
    -   In VS Code, open **Settings**, then search for **Copilot: Model Context Protocol** and select **Add Server**.
        
    
3.  **Configure the MCP Server**
    
    -   Choose **HTTP Server** and enter the following details:
        
        -   **Name:** `payram`
            
        -   **URL:** `https://mcp.payram.com/mcp`
            
        -   **SSE URL (optional, recommended):** `https://mcp.payram.com/mcp/sse`
            
        -   **Headers:** Leave empty
            
        
    
4.  **Save the Configuration**
    
    -   After saving, GitHub Copilot will automatically detect and list the available PayRam tools.
        
    
5.  **Start Using PayRam Tools**
    
    -   You can now trigger PayRam workflows by asking Copilot prompts such as:
        
        -   “test payram”
            
        -   “assess my project”
            
        
    -   Copilot will route the request to the appropriate PayRam MCP flow.
        
    

1.  **Open MCP Settings**
    
    -   In Cursor, open **Settings** and navigate to **MCP Servers**.
        
    
2.  **Add a New MCP Server**
    
    -   Click **Add** and select **HTTP** as the server type.
        
    
3.  **Configure the Server**
    
    -   Enter the following details:
        
        -   **Name:** `payram`
            
        -   **URL:** `https://mcp.payram.com/mcp`
            
        -   **SSE URL:** `https://mcp.payram.com/mcp/sse`
            
        
    
4.  **Save and Restart**
    
    -   Save the configuration. If required, restart the chat pane to ensure the server is loaded correctly.
        
    
5.  **Start Using PayRam MCP**
    
    -   You can now use the same prompts, such as:
        
        -   “test payram”
            
        -   “integrate payram into this repo”
            
        
    -   Cursor will route these requests to the appropriate PayRam MCP tools.
        
    

1.  **Open MCP Settings**
    
    -   In Claude Desktop, go to **Settings** and navigate to **MCP Servers**.
        
    
2.  **Add a New MCP Server**
    
    -   Add a new server and select **HTTP** as the server type.
        
    
3.  **Configure the Server Details**
    
    -   Enter the following information:
        
        -   **Name:** `payram`
            
        -   **URL:** `https://mcp.payram.com/mcp`
            
        -   **SSE URL:** `https://mcp.payram.com/mcp/sse`
            
        
        _(If the client supports Server-Sent Events. Otherwise, leave this field blank.)_
        
    
4.  **Confirm and Restart the Chat**
    
    -   Save the configuration and reopen a chat session to ensure the MCP server is loaded.
        
    
5.  **Verify the Integration**
    
    -   Ask Claude to perform a PayRam-specific action to confirm that the PayRam tool list is available.
        
    

If your MCP-compatible client allows manual registration of an HTTP MCP endpoint, configure it with the following details:

-   **URL:** `https://mcp.payram.com/mcp`
    
-   **SSE URL (optional):** `https://mcp.payram.com/mcp/sse`
    
-   **Headers:** None
    

Save the configuration and reload the client or reopen the chat session if required. Once configured, you can verify the setup by asking the client to perform a PayRam-specific action.

### Sample Prompts to Get Started[](#sample-prompts-to-get-started)

You can use the following example prompts with GitHub Copilot to explore and test PayRam MCP capabilities:

-   **“Test the PayRam MCP connection.”**
    
-   **“How does PayRam work? Explain the payment flow.”**
    
-   **“Help me integrate PayRam payments into my project.”**
    
-   **“Create a simple application to test PayRam payments.”**
    
-   **“Create a payment and show how to check its status.”**
    

### Security Considerations[](#security-considerations)

-   Do not share **PayRam API keys**, **webhook secrets**, or any other sensitive credentials in client-side code or AI prompts.
    
-   Ensure that only **trusted AI clients and applications** are allowed to connect to the PayRam MCP server.
    
-   Validate and review all actions triggered via MCP, especially those related to **payment creation** and **payout execution**.
    
-   Use **separate PayRam credentials** for development and production environments to reduce operational risk.
    

[PreviousPayRam Shopify Plugin](/plugins/payram-shopify-plugin)[NextAnalytics MCP](/mcp/analytics-mcp)

Last updated 9 hours ago