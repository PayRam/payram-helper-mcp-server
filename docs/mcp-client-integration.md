# Using the Payram MCP Server in Popular Clients

This guide shows how to add the hosted Payram MCP server (`https://mcp.payram.com/mcp`) to MCP-aware tools and how to use the built-in commands once connected.

## Endpoint Details
- **Name (suggested):** `payram`
- **Transport:** HTTP (JSON-RPC over HTTP/SSE)
- **Base URL:** `https://mcp.payram.com/mcp`
- **SSE URL (if supported):** `https://mcp.payram.com/mcp/sse`

## Prerequisites
- An MCP-capable client (examples below).
- Ability to configure custom MCP servers (HTTP URL + optional headers). No auth headers are required for the hosted endpoint.

## Visual Studio Code (GitHub Copilot Chat with MCP)
1. Install **GitHub Copilot** extension (version with MCP support).
2. Open **Settings** → search for **Copilot: Model Context Protocol** → **Add Server**.
3. Choose **HTTP server** and fill:
   - **Name:** `payram`
   - **URL:** `https://mcp.payram.com/mcp`
   - **SSE URL (optional, recommended):** `https://mcp.payram.com/mcp/sse`
   - Leave headers empty.
4. Save. Copilot will list the Payram tools; ask things like “test payram” or “assess my project” to trigger the right flow.

## Cursor (MCP support)
1. Open **Settings → MCP Servers**.
2. Click **Add** → **HTTP**.
3. Set **Name:** `payram`, **URL:** `https://mcp.payram.com/mcp`, **SSE URL:** `https://mcp.payram.com/mcp/sse`.
4. Save and restart the chat pane if needed. Use the same prompts (“test payram”, “integrate payram into this repo”).

## Claude Desktop (MCP beta)
1. In **Settings → MCP Servers**, add a new HTTP server.
2. **Name:** `payram`
3. **URL:** `https://mcp.payram.com/mcp`
4. **SSE URL:** `https://mcp.payram.com/mcp/sse` (if the client supports SSE; otherwise leave blank).
5. Confirm and reopen a chat. Ask for Payram-specific actions to verify the tool list is available.

## Generic MCP Clients (HTTP)
If your client lets you register an HTTP MCP endpoint manually, provide:
- **URL:** `https://mcp.payram.com/mcp`
- **SSE URL:** `https://mcp.payram.com/mcp/sse` (optional)
- **Headers:** none

## What You Can Do Once Connected
- **Readiness & connectivity:** say “test payram” to run the checklist, ensure `.env`, and probe `/api/v1/payment`.
- **Assess existing projects:** “assess my project for payram” runs dependency + `.env` scans and suggests next steps.
- **Scaffold new apps:** “create a payram express demo” generates a full starter (payments, payouts, webhooks, UI console).
- **Generate snippets:** ask for payment/payout/referral/webhook snippets in JS/TS, Python, Go, PHP, Java, Laravel, Gin, FastAPI, Spring, Next.js, Express.
- **Fetch docs inline:** request Payram basics, payment flow, referral guides, or specific doc IDs via `get_payram_doc_by_id`.

### Example Prompts
- “Test payram” — runs readiness checklist → ensures `.env` → tests `/api/v1/payment`.
- “Assess this repo for payram” — identifies framework (Express/Next/FastAPI/etc.), checks `.env`, and suggests tools.
- “Generate a FastAPI create-payment route for Payram” — returns the Python route with headers and body payload.
- “Give me a Next.js webhook handler for Payram events” — emits an App Router handler that validates `API-Key`.
- “Create a Payram payout snippet” — JS SDK payout create sample with required `customerID/email/blockchainCode/toAddress`.
- “Show the Payram referral route for Express” — referral logging route with the correct event payload shape.
- “List Payram docs under features” — uses `list_payram_docs` and then `get_payram_doc_by_id` to pull specifics.
- “What env vars does Payram need?” — surfaces the `.env` template and highlights `PAYRAM_BASE_URL` + `PAYRAM_API_KEY`.
- “How do Payram payments flow end-to-end?” — returns the payment flow doc with inline sections.

## Verification
- After adding the server, list available tools in your client. You should see entries like `test_payram_connection`, `assess_payram_project`, `scaffold_payram_app`, and the various `generate_*` snippet tools.
- Run a quick check: “test payram” → the assistant should respond with the readiness checklist before asking for `.env` values.

## Notes
- The hosted endpoint requires no authentication headers.
- Keep your Payram API key in your project’s `.env`; never paste it directly into chat history.
- If SSE is unsupported by your client, the HTTP URL alone still works; responses may stream less smoothly.
