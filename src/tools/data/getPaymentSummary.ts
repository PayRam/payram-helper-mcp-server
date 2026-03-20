import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../../utils/logger.js';
import { buildToolSchemas } from '../common/schemas.js';
import { safeHandler } from '../common/errors.js';
import { getPaymentSummary } from '../../api/payramApi.js';
import { resolveExternalPlatformId } from './index.js';

const schemas = buildToolSchemas({
  input: z
    .object({
      externalPlatformId: z
        .string()
        .optional()
        .describe(
          'External platform ID. Falls back to PAYRAM_EXTERNAL_PLATFORM_ID env var if not provided.',
        ),
    })
    .strict(),
  output: z.object({
    totalCount: z.number(),
    openCount: z.number(),
    closedCount: z.number(),
    cancelledCount: z.number(),
  }),
});

type Input = z.infer<typeof schemas.input>;
type Output = z.infer<typeof schemas.output>;

const textContent = (text: string) => ({ type: 'text' as const, text });

export const registerGetPaymentSummaryTool = (server: McpServer) => {
  server.registerTool(
    'get_payment_summary',
    {
      title: 'Get Payment Summary',
      description:
        'Returns payment counts: total, open, closed, and cancelled. ' +
        'Useful for a quick overview of payment activity.',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async (args: Input) => {
        const platformId = resolveExternalPlatformId(args.externalPlatformId);
        const summary = await getPaymentSummary(platformId);

        const message =
          `Payment Summary:\n` +
          `  Total:     ${summary.totalCount}\n` +
          `  Open:      ${summary.openCount}\n` +
          `  Closed:    ${summary.closedCount}\n` +
          `  Cancelled: ${summary.cancelledCount}`;

        logger.info('Payment summary fetched', summary);

        return {
          content: [textContent(message)],
          structuredContent: { ...summary },
        };
      },
      { toolName: 'get_payment_summary' },
    ),
  );
};
