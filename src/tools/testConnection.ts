import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getPayramApiKey,
  getPayramBaseUrl,
  MissingEnvironmentVariableError,
} from '../config/env.js';
import { logger } from '../utils/logger.js';
import { buildToolSchemas } from './common/schemas.js';
import { safeHandler } from './common/errors.js';

const schemas = buildToolSchemas({
  input: z.object({
    baseUrl: z.string().url().optional(),
  }),
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
      description: 'Checks the /api/v1/payment/summary endpoint with the configured API key.',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async (args: TestConnectionInput) => {
        let resolvedBaseUrl: string;
        try {
          resolvedBaseUrl = normalizeBaseUrl(args.baseUrl ?? getPayramBaseUrl());
        } catch (error) {
          const message =
            error instanceof MissingEnvironmentVariableError
              ? error.message
              : 'Failed to resolve PAYRAM_BASE_URL';
          logger.warn('Missing base URL for test_payram_connection', error);
          return {
            content: [textContent(message)],
            structuredContent: {
              ok: false,
              statusCode: null,
              baseUrl: args.baseUrl ?? 'N/A',
              errorMessage: message,
            },
          } satisfies {
            structuredContent: TestConnectionOutput;
            content: { type: 'text'; text: string }[];
          };
        }

        const baseUrl = resolvedBaseUrl;
        const endpoint = `${baseUrl}/api/v1/payment/summary`;
        const headers = {
          'API-Key': getPayramApiKey(),
          Accept: 'application/json',
        };

        let statusCode: number | null = null;
        let payramVersion: string | undefined;

        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers,
          });
          statusCode = response.status;
          payramVersion = response.headers.get('payram-version') ?? undefined;

          if (!response.ok) {
            const errorText = await response.text();
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
            };
          }

          logger.info('Payram connectivity succeeded', { baseUrl, statusCode });
          return {
            content: [
              textContent(`Successfully reached Payram at ${baseUrl} (status ${statusCode}).`),
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
