import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger.js';
import { buildToolSchemas } from './common/schemas.js';
import { safeHandler } from './common/errors.js';

const schemas = buildToolSchemas({
  input: z
    .object({
      baseUrl: z.string().url().optional(),
      apiKey: z.string().min(1).optional(),
    })
    .strict(),
  output: z.object({
    ok: z.boolean(),
    statusCode: z.number().int().min(100).max(599).nullable(),
    baseUrl: z.string(),
    errorMessage: z.string().optional(),
    payramVersion: z.string().optional(),
  }),
});

type TestConnectionInput = z.infer<typeof schemas.input>;
type TestConnectionOutput = z.infer<typeof schemas.output>;

const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, '');
const textContent = (text: string) => ({ type: 'text' as const, text });

export const registerTestConnectionTool = (server: McpServer) => {
  server.registerTool(
    'test_payram_connection',
    {
      title: 'Test Payram Connectivity',
      description:
        'Checks the /api/v1/payment endpoint on a Payram server using baseUrl and apiKey. If they are not provided, returns a .env template you can add to your workspace.',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async (args: TestConnectionInput) => {
        if (!args.baseUrl || !args.apiKey) {
          const envTemplate = [
            '# Payram REST base URL (include protocol)',
            'PAYRAM_BASE_URL=https://your-payram-server.example  # TODO: replace',
            '',
            '# Payram API key (see Payram dashboard)',
            'PAYRAM_API_KEY=pk_test_replace_me                 # TODO: replace',
            '',
          ].join('\n');

          const message =
            'PAYRAM_BASE_URL or PAYRAM_API_KEY is not configured for this project.\n' +
            'Create a .env file in your workspace root (if it does not exist) and add the following template:\n\n' +
            envTemplate +
            '\nAfter you fill in real values, call test_payram_connection again with baseUrl and apiKey inputs.';

          return {
            content: [textContent(message)],
            structuredContent: {
              ok: false,
              statusCode: null,
              baseUrl: 'N/A',
              errorMessage: message,
              payramVersion: undefined,
            },
          } satisfies {
            structuredContent: TestConnectionOutput;
            content: { type: 'text'; text: string }[];
          };
        }

        const baseUrl = normalizeBaseUrl(args.baseUrl);
        const endpoint = `${baseUrl}/api/v1/payment`;
        const headers = {
          'API-Key': args.apiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        let statusCode: number | null = null;
        let payramVersion: string | undefined;
        const payload = {
          customerEmail: 'customer@example.com',
          customerID: '1001',
          amountInUSD: 1,
        };

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
          });
          statusCode = response.status;
          payramVersion = response.headers.get('payram-version') ?? undefined;
          const responseBodyText = await response.text();

          let responseJson: Record<string, unknown> | null = null;
          try {
            responseJson = responseBodyText
              ? (JSON.parse(responseBodyText) as Record<string, unknown>)
              : null;
          } catch (parseError) {
            logger.warn('Failed to parse Payram response JSON', parseError);
          }

          if (!response.ok) {
            const errorText = responseBodyText || 'Unknown error';
            logger.warn('Payram connectivity failed', { statusCode, errorText });
            return {
              content: [textContent(`Payram responded with HTTP ${statusCode}: ${errorText}`)],
              structuredContent: {
                ok: false,
                statusCode,
                baseUrl,
                errorMessage: errorText,
                payramVersion,
              },
            } satisfies {
              structuredContent: TestConnectionOutput;
              content: { type: 'text'; text: string }[];
            };
          }

          const host = typeof responseJson?.host === 'string' ? responseJson.host : undefined;
          const url = typeof responseJson?.url === 'string' ? responseJson.url : undefined;
          logger.info('Payram connectivity succeeded', { baseUrl, statusCode, host, url });
          return {
            content: [
              textContent(
                `Successfully created a Payram checkout at ${baseUrl} (status ${statusCode}).` +
                  (host ? ` Host: ${host}.` : '') +
                  (url ? ` Checkout URL: ${url}` : ''),
              ),
            ],
            structuredContent: {
              ok: true,
              statusCode,
              baseUrl,
              payramVersion,
            },
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Payram connectivity request failed', error);
          return {
            content: [textContent(`Failed to reach Payram: ${errorMessage}`)],
            structuredContent: {
              ok: false,
              statusCode,
              baseUrl,
              errorMessage,
            },
          };
        }
      },
      { toolName: 'test_payram_connection' },
    ),
  );
};
