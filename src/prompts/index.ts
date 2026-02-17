import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger.js';
import { z } from 'zod';

/**
 * Register prompts for the Payram MCP server.
 * Prompts guide users through common workflows and troubleshooting.
 */
export const registerPrompts = (server: McpServer) => {
  logger.info('Registering prompts...');

  // Prompt 1: Setup Guide
  server.registerPrompt(
    'setup-payram',
    {
      title: 'Setup Payram',
      description: 'Interactive guide to set up Payram for the first time',
    },
    async () => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I want to set up Payram in my project. Please help me:
1. If Payram is not running yet, offer two setup paths:
   - Headless agent setup (call get_headless_setup_guide)
   - Human setup with web UI (setup_payram.sh)
2. Test my Payram connection (use test_payram_connection tool)
3. If not configured, guide me through creating a .env file with PAYRAM_BASE_URL and PAYRAM_API_KEY
4. Assess my project structure (use assess_payram_project tool)
5. Recommend which code snippets I should generate based on my framework
6. Help me generate my first payment integration code

Walk me through each step interactively.`,
            },
          },
        ],
      };
    },
  );

  server.registerPrompt(
    'setup-payram-headless',
    {
      title: 'Setup Payram Headless',
      description: 'Autonomous agent guide to deploy and configure Payram with no web UI',
    },
    async () => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: 'I am an autonomous agent. I need to deploy Payram on a VPS without any web UI or human steps. Call get_headless_setup_guide and walk me through the complete automated setup.',
            },
          },
        ],
      };
    },
  );

  // Prompt 2: Payment Integration
  server.registerPrompt(
    'integrate-payment',
    {
      title: 'Integrate Payment',
      description: 'Guide to integrate payment acceptance into your application',
      argsSchema: {
        framework: z
          .string()
          .optional()
          .describe('Your web framework (e.g., express, nextjs, fastapi)'),
      },
    },
    async (args) => {
      const framework = args.framework ? ` for ${args.framework}` : '';
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I want to integrate payment acceptance${framework}. Please help me:
1. Assess my project to detect the framework (use assess_payram_project)
2. Generate the appropriate payment creation code snippet
3. Generate the payment status checking code
4. Generate a complete payment route/endpoint
5. Generate webhook handlers to receive payment confirmations
6. Explain how to test the payment flow

Provide complete, working code that I can copy into my project.`,
            },
          },
        ],
      };
    },
  );

  // Prompt 3: Troubleshooting
  server.registerPrompt(
    'troubleshoot-payment',
    {
      title: 'Troubleshoot Payment',
      description: 'Debug common payment integration issues',
      argsSchema: {
        issue: z.string().optional().describe('Brief description of the issue you are facing'),
      },
    },
    async (args) => {
      const issueContext = args.issue ? `\n\nThe specific issue I'm facing is: ${args.issue}` : '';
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I'm having trouble with my Payram payment integration.${issueContext}

Please help me troubleshoot by:
1. Testing my Payram connection (use test_payram_connection)
2. Checking my environment variables are configured correctly
3. Reviewing common integration issues:
   - API authentication errors (invalid API key)
   - Network connectivity problems (firewall, CORS)
   - Payment creation failures (invalid parameters)
   - Webhook delivery issues (signature verification, endpoint accessibility)
   - Status polling problems (incorrect reference IDs)
4. Suggesting specific fixes based on the errors I'm seeing
5. Providing corrected code snippets if needed

Help me identify and fix the issue step by step.`,
            },
          },
        ],
      };
    },
  );

  logger.info('Prompts registered successfully');
};
