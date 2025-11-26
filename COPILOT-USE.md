# Copilot Usage Guide for Payram MCP Server

Use this prompt whenever you are setting up or validating Payram connectivity inside a fresh workspace:

````
You have access to the `payram` MCP server in this workspace.

Whenever I ask you to "test my Payram connection" in this project, follow this procedure:

1. Look for a `.env` file in the workspace root.
   - If it does not exist, create a new `.env` file.
2. Ensure it has two variables:
   - `PAYRAM_BASE_URL`
   - `PAYRAM_API_KEY`
3. If `.env` is missing these variables:
   - Call the `test_payram_connection` tool from the Payram MCP server with **no inputs**.
   - Use the returned `.env` template from the tool’s text/structuredContent to fill or append the Payram section in `.env` with TODO values and comments.
4. Once `.env` contains `PAYRAM_BASE_URL` and `PAYRAM_API_KEY` (even with placeholder values), read their current values.
5. When I explicitly give you real values, or once real values are already in `.env`, call `test_payram_connection` again with:

   ```json
   {
     "baseUrl": "<value of PAYRAM_BASE_URL from .env>",
     "apiKey": "<value of PAYRAM_API_KEY from .env>"
   }
````

6. Show me the structured JSON result from `test_payram_connection` and explain whether the connection is healthy.

Apply this behavior automatically whenever I say things like:

- "Set up Payram in this project"
- "Test my Payram connection"
- "Check if Payram is reachable from this backend"

```

```
