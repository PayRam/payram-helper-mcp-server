import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../../utils/logger.js';
import { getPayramExternalPlatformId } from '../../config/env.js';
import { registerGetPaymentSummaryTool } from './getPaymentSummary.js';
import { registerLookupPaymentTool } from './lookupPayment.js';
import { registerSearchPaymentsTool } from './searchPayments.js';
import { registerGetUnsweptBalancesTool } from './getUnsweptBalances.js';
import { registerGetDailyVolumeTool } from './getDailyVolume.js';

/**
 * Resolve external platform ID from tool input or env fallback.
 * Throws a descriptive error if neither is available.
 */
export const resolveExternalPlatformId = (input?: string): string => {
  const id = input ?? getPayramExternalPlatformId();
  if (!id) {
    throw new Error(
      'External platform ID is required. Provide it as input or set PAYRAM_EXTERNAL_PLATFORM_ID in your environment.',
    );
  }
  return id;
};

export const registerDataTools = (server: McpServer) => {
  logger.info('Registering data tools...');
  registerGetPaymentSummaryTool(server);
  registerLookupPaymentTool(server);
  registerSearchPaymentsTool(server);
  registerGetUnsweptBalancesTool(server);
  registerGetDailyVolumeTool(server);
};
