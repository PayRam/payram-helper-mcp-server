import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../../../utils/logger.js';
import { registerCreatePaymentSnippetTool } from './createPayment.js';

export const registerPaymentTools = (server: McpServer) => {
  logger.info('Registering payment tools...');
  registerCreatePaymentSnippetTool(server);
};
