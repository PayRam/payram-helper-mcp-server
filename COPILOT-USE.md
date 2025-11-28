# Copilot Usage Guide for Payram MCP Server

Use this prompt whenever you are setting up or validating Payram connectivity inside a fresh workspace:

````
You have access to the `payram` MCP server in this workspace.

Whenever I ask you to "test my Payram connection" (or I type "test payram") in this project, follow this order:

1. **Start with readiness guidance.** Immediately call the `prepare_payram_test` tool (no inputs). Share the checklist verbatim so I can confirm whether the self-hosted server exists and how to retrieve API keys.
2. **Create/inspect `.env`.** After the checklist, look for a `.env` file in the workspace root. Create one if it does not exist.
3. **Populate credentials.** Ensure `.env` defines `PAYRAM_BASE_URL` and `PAYRAM_API_KEY`.
   - If either value is missing, call `generate_payram_env_template` to grab the template and append it (with TODOs) to `.env`.
   - Do **not** call `test_payram_connection` yet; wait until real values are provided.
4. **Run the connectivity test last.** Once I supply real values (or they already exist in `.env`), call `test_payram_connection` with:

   ```json
   {
     "baseUrl": "<value of PAYRAM_BASE_URL from .env>",
     "apiKey": "<value of PAYRAM_API_KEY from .env>"
   }
````

5. Show me the structured JSON result from `test_payram_connection` and explain whether the connection is healthy.

Apply this behavior automatically whenever I say things like:

- "Set up Payram in this project"
- "Test my Payram connection"
- "Check if Payram is reachable from this backend"

```

```
