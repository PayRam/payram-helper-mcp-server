import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../../utils/logger.js';
import { buildToolSchemas } from '../common/schemas.js';
import { safeHandler } from '../common/errors.js';
import { PAYRAM_ENV_TEMPLATE } from './content/envTemplateContent.js';
import { PAYRAM_SETUP_CHECKLIST } from './content/setupChecklistContent.js';
import { PAYRAM_FILE_STRUCTURE } from './content/fileStructureContent.js';
import { loadRepoMarkdown } from '../../utils/markdownLoader.js';

const textContent = (text: string) => ({ type: 'text' as const, text });
const toStructuredContent = <T extends object>(value: T) => value as T & Record<string, unknown>;

const envVarDefinitionSchema = z.object({
  key: z.string(),
  required: z.boolean(),
  description: z.string(),
  example: z.string().optional(),
  defaultValue: z.string().optional(),
  docsRefs: z.array(z.string()).optional(),
});

const envTemplateResponseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  envExample: z.string(),
  variables: z.array(envVarDefinitionSchema),
  notes: z.string().optional(),
});

const checklistItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  docsRefs: z.array(z.string()).optional(),
  optional: z.boolean().optional(),
});

const setupChecklistResponseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  items: z.array(checklistItemSchema),
  notes: z.string().optional(),
});

const fileStructureNodeSchema: z.ZodType<{
  path: string;
  type: 'file' | 'folder';
  description?: string;
  children?: any;
}> = z.lazy(() =>
  z.object({
    path: z.string(),
    type: z.enum(['file', 'folder']),
    description: z.string().optional(),
    children: z.array(fileStructureNodeSchema).optional(),
  }),
);

const fileStructureResponseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  root: fileStructureNodeSchema,
  notes: z.string().optional(),
});

const envTemplateSchemas = buildToolSchemas({
  input: z.object({}).strict(),
  output: envTemplateResponseSchema,
});

const setupChecklistSchemas = buildToolSchemas({
  input: z.object({}).strict(),
  output: setupChecklistResponseSchema,
});

const fileStructureSchemas = buildToolSchemas({
  input: z.object({}).strict(),
  output: fileStructureResponseSchema,
});

const agentSetupGuideResponseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  markdown: z.string(),
});

const agentSetupGuideSchemas = buildToolSchemas({
  input: z.object({}).strict(),
  output: agentSetupGuideResponseSchema,
});

const formatChecklistMarkdown = () => {
  const header = `## ${PAYRAM_SETUP_CHECKLIST.title}`;
  const description = PAYRAM_SETUP_CHECKLIST.description
    ? `\n${PAYRAM_SETUP_CHECKLIST.description}`
    : '';
  const items = PAYRAM_SETUP_CHECKLIST.items.map((item, index) => {
    const optional = item.optional ? ' (optional)' : '';
    const refs = item.docsRefs?.length ? `\n   Docs: ${item.docsRefs.join(', ')}` : '';
    return `${index + 1}. **${item.label}**${optional} - ${item.description}${refs}`;
  }).join('\n');
  const notes = PAYRAM_SETUP_CHECKLIST.notes ? `\n\nNotes: ${PAYRAM_SETUP_CHECKLIST.notes}` : '';
  return `${header}${description}\n\n${items}${notes}`;
};

export const registerSetupTools = (server: McpServer) => {
  logger.info('Registering merchant setup tools...');

  server.registerTool(
    'generate_env_template',
    {
      title: 'Generate Payram .env Template',
      description:
        'Creates a .env template for configuring a merchant backend to talk to a self-hosted Payram server.',
      inputSchema: envTemplateSchemas.input,
      outputSchema: envTemplateSchemas.output,
    },
    safeHandler(
      async () => ({
        content: [textContent('Generated Payram environment template.')],
        structuredContent: toStructuredContent(PAYRAM_ENV_TEMPLATE),
      }),
      { toolName: 'generate_env_template' },
    ),
  );

  server.registerTool(
    'generate_setup_checklist',
    {
      title: 'Generate Payram Setup Checklist',
      description:
        'Returns a step-by-step checklist of everything a merchant must configure to start using Payram.',
      inputSchema: setupChecklistSchemas.input,
      outputSchema: setupChecklistSchemas.output,
    },
    safeHandler(
      async () => ({
        content: [
          textContent('Delivered merchant setup checklist.'),
          textContent(formatChecklistMarkdown()),
        ],
        structuredContent: toStructuredContent(PAYRAM_SETUP_CHECKLIST),
      }),
      { toolName: 'generate_setup_checklist' },
    ),
  );

  server.registerTool(
    'suggest_file_structure',
    {
      title: 'Suggest Payram File Structure',
      description: 'Suggests a recommended backend folder/file structure for integrating Payram.',
      inputSchema: fileStructureSchemas.input,
      outputSchema: fileStructureSchemas.output,
    },
    safeHandler(
      async () => ({
        content: [textContent('Provided recommended Payram file structure.')],
        structuredContent: toStructuredContent(PAYRAM_FILE_STRUCTURE),
      }),
      { toolName: 'suggest_file_structure' },
    ),
  );

  server.registerTool(
    'get_agent_setup_flow',
    {
      title: 'Get Agent Setup Flow',
      description:
        'Returns the step-by-step setup flow for deploying PayRam as an agent. ' +
        'Covers install, wallet creation, faucet funding, contract deployment, ' +
        'and first payment. Includes chain recommendations (ETH Sepolia for testnet, ' +
        'Base for mainnet), faucet URLs, card-to-crypto prerequisites, and ' +
        'status/recovery commands for interrupted sessions.',
      inputSchema: agentSetupGuideSchemas.input,
      outputSchema: agentSetupGuideSchemas.output,
    },
    safeHandler(
      async () => {
        const markdown = await loadRepoMarkdown('docs/PAYRAM_AGENT_ONBOARDING.md');
        const response = {
          title: 'PayRam Agent Setup Flow',
          description:
            'Step-by-step flow: install → wallet → fund → deploy → payment. ' +
            'Includes faucet URLs and chain recommendations.',
          markdown,
        };

        return {
          content: [
            textContent('Delivered agent setup flow.'),
            textContent(markdown),
          ],
          structuredContent: toStructuredContent(response),
        };
      },
      { toolName: 'get_agent_setup_flow' },
    ),
  );

  server.registerTool(
    'onboard_agent_setup',
    {
      title: 'Get Payram Agent Onboarding Guide',
      description:
        'Returns the complete autonomous agent setup guide for deploying Payram without any web UI or human interaction.',
      inputSchema: agentSetupGuideSchemas.input,
      outputSchema: agentSetupGuideSchemas.output,
    },
    safeHandler(
      async () => {
        const markdown = await loadRepoMarkdown('docs/PAYRAM_AGENT_ONBOARDING.md');
        const response = {
          title: 'PayRam Agent Onboarding Guide',
          description: 'CLI-only setup flow for autonomous Payram deployment without web UI.',
          markdown,
        };

        return {
          content: [
            textContent('Delivered Payram agent onboarding guide.'),
            textContent(markdown),
          ],
          structuredContent: toStructuredContent(response),
        };
      },
      { toolName: 'onboard_agent_setup' },
    ),
  );
};
