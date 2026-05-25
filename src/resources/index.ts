import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger.js';

/**
 * Register resources for the Payram MCP server.
 * Resources provide static documentation and reference content.
 */
export const registerResources = (server: McpServer) => {
  logger.info('Registering resources...');

  // Resource 1: Setup Guide
  server.registerResource(
    'Payram Setup Guide',
    'payram://docs/setup-guide',
    {
      description: 'Complete guide for setting up Payram in your project',
      mimeType: 'text/markdown',
    },
    async () => {
      return {
        contents: [
          {
            uri: 'payram://docs/setup-guide',
            mimeType: 'text/markdown',
            text: `# Payram Setup Guide

## Quick Start

Payram is a self-hosted crypto payment gateway that accepts USDT, USDC, Bitcoin, and ETH across multiple blockchains.

### Prerequisites

- A deployed Payram server instance
- Payram API key from your dashboard
- Project with a web framework (Express, Next.js, FastAPI, Laravel, Gin, or Spring Boot)

### Step 1: Configure Environment Variables

Create a \`.env\` file in your project root:

\`\`\`bash
# Payram REST base URL (include protocol)
PAYRAM_BASE_URL=https://your-payram-server.example

# Payram API key (see Payram dashboard)
PAYRAM_API_KEY=pk_test_your_api_key_here
\`\`\`

### Step 2: Test Connection

Use the \`test_payram_connection\` tool to verify your configuration:
- It will check connectivity to your Payram server
- Validates your API key
- Returns server version info

### Step 3: Generate Integration Code

Based on your framework, use the appropriate tools:
- **Express**: \`snippet_express_payment_route\`
- **Next.js**: \`snippet_nextjs_payment_route\`
- **FastAPI**: \`snippet_fastapi_payment_route\`
- **Laravel**: \`snippet_laravel_payment_route\`
- **Gin**: \`snippet_go_payment_handler\`
- **Spring Boot**: \`snippet_spring_payment_controller\`

Or use \`scaffold_payram_app\` to generate a complete starter application.

### Step 4: Implement Webhooks

Generate webhook handlers using \`generate_webhook_handler\` to receive real-time payment confirmations.

### Step 5: Test Your Integration

1. Create a test payment
2. Complete the payment flow
3. Verify webhook delivery
4. Check payment status

## Architecture

- **Zero-Key-Exposure Security**: Deposit wallets are smart contracts with hardcoded cold wallet destinations. The only key on the server is the hot wallet (encrypted, gas-only — cannot access deposits). The master wallet stays offline. A server breach cannot lead to theft of deposit funds.
- **Smart Contract Sweeps**: Funds automatically swept to cold wallets via immutable contract logic
- **Multi-chain Support**: Ethereum, Base, Polygon, Tron, Bitcoin
- **Non-custodial**: You control your funds at all times

## Next Steps

- Read the API Reference resource
- Explore payout functionality
- Set up referral programs
- Configure multi-tenant setup

## Support

- Documentation: https://docs.payram.com
- GitHub: https://github.com/PayRam
- Community: Contact via GitHub`,
          },
        ],
      };
    },
  );

  // Resource 2: API Reference
  server.registerResource(
    'Payram API Reference',
    'payram://docs/api-reference',
    {
      description: 'API endpoints and SDK methods reference',
      mimeType: 'text/markdown',
    },
    async () => {
      return {
        contents: [
          {
            uri: 'payram://docs/api-reference',
            mimeType: 'text/markdown',
            text: `# Payram API Reference

## Base URL

All API requests should be made to your self-hosted Payram server:

\`\`\`
https://your-payram-server.example/api/v1
\`\`\`

## Authentication

Include your API key in the \`API-Key\` header:

\`\`\`
API-Key: your_api_key_here
\`\`\`

## Payments API

### Create Payment

**Endpoint**: \`POST /api/v1/payment\`

Creates a new payment request and returns a checkout URL.

**Request Body**:
\`\`\`json
{
  "amountInUSD": 100,
  "customerEmail": "customer@example.com",
  "customerID": "customer_123"
}
\`\`\`

**Response**:
\`\`\`json
{
  "referenceId": "pay_abc123",
  "checkoutUrl": "https://your-server.example/checkout?ref=pay_abc123",
  "amount": 100,
  "status": "OPEN"
}
\`\`\`

### Get Payment Status

**Endpoint**: \`GET /api/v1/payment/:referenceId\`

Retrieves the current status of a payment.

**Response**:
\`\`\`json
{
  "referenceId": "pay_abc123",
  "status": "FILLED",
  "amount": 100,
  "paidAmount": 100,
  "currency": "USDT",
  "blockchain": "ETH",
  "customerEmail": "customer@example.com"
}
\`\`\`

**Payment Statuses**:
- \`OPEN\`: Awaiting payment
- \`PARTIALLY_FILLED\`: Partial payment received
- \`FILLED\`: Fully paid
- \`OVER_FILLED\`: Overpaid
- \`CANCELLED\`: Cancelled by merchant
- \`UNDEFINED\`: Unknown status

## Payouts API

### Create Payout

**Endpoint**: \`POST /api/v1/withdrawal/merchant\` (direct, no-OTP payout)

Sends crypto to a destination address.

**Request Body**:
\`\`\`json
{
  "customerID": "customer_123",
  "email": "customer@example.com",
  "blockchainCode": "ethereum",
  "currencyCode": "USDT",
  "amount": "50",
  "toAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
\`\`\`

## Webhooks

Payram sends webhook events to your configured endpoint when payment status changes.

**Headers**:
- \`API-Key\`: Your webhook secret for verification
- \`Content-Type\`: \`application/json\`

**Event Payload**:
\`\`\`json
{
  "referenceId": "pay_abc123",
  "status": "FILLED",
  "amount": 100,
  "paidAmount": 100,
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

**Event Types**:
- Payment status changes (OPEN → FILLED, etc.)
- Payout status updates
- Referral reward distributions

## SDK Methods (payram npm package)

### Initialize Client

\`\`\`typescript
import { Payram } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY,
  baseUrl: process.env.PAYRAM_BASE_URL,
});
\`\`\`

### Create Payment

\`\`\`typescript
const checkout = await payram.payments.initiatePayment({
  amountInUSD: 100,
  customerEmail: 'customer@example.com',
  customerId: 'customer_123',
});
\`\`\`

### Get Payment Status

\`\`\`typescript
const payment = await payram.payments.getPaymentRequest(referenceId);
\`\`\`

### Create Payout

\`\`\`typescript
const payout = await payram.payouts.createPayout({
  customerID: 'customer_123',
  email: 'customer@example.com',
  blockchainCode: 'ethereum',
  currencyCode: 'USDT',
  amount: '50',
  toAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
});
\`\`\`

## Rate Limits

- Default: 100 requests per minute per API key
- Contact your server administrator for custom limits

## Error Codes

- \`400\`: Bad Request - Invalid parameters
- \`401\`: Unauthorized - Invalid API key
- \`404\`: Not Found - Resource doesn't exist
- \`429\`: Too Many Requests - Rate limit exceeded
- \`500\`: Internal Server Error - Server issue

## Support

For detailed integration guides, visit the Setup Guide resource or use the \`setup-payram\` prompt.`,
          },
        ],
      };
    },
  );

  logger.info('Resources registered successfully');
};
