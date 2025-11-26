import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerTestConnectionTool } from './testConnection.js';
import { registerPaymentTools } from './integration/payments/index.js';
import { registerMultilangPaymentTools } from './integration/multilang-payments/index.js';
import { registerPayoutTools } from './integration/payouts/index.js';
import { registerReferralTools } from './integration/referrals/index.js';
import { registerWebhookTools } from './integration/webhooks/index.js';
import { registerContextTools } from './context/index.js';
import { registerSetupTools } from './setup/index.js';

export const registerTools = (server: McpServer) => {
  registerTestConnectionTool(server);
  registerPaymentTools(server);
  registerMultilangPaymentTools(server);
  registerPayoutTools(server);
  registerReferralTools(server);
  registerWebhookTools(server);
  registerContextTools(server);
  registerSetupTools(server);
};
