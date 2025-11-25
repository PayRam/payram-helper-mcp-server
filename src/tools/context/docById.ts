import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { buildToolSchemas } from '../common/schemas.js';
import { safeHandler } from '../common/errors.js';
import { loadMarkdown } from '../../utils/markdownLoader.js';

const schemas = buildToolSchemas({
  input: z.object({
    id: z.string().min(1, 'Provide a document id, e.g. "features/payouts".'),
  }),
  output: z.object({
    id: z.string(),
    path: z.string(),
    url: z.string().url().optional(),
    markdown: z.string(),
  }),
});

const textContent = (text: string) => ({ type: 'text' as const, text });

const buildDocMetadata = (id: string) => {
  if (id.includes('..')) {
    throw new Error('Doc id must not include path traversal characters.');
  }

  const normalized = id.replace(/^\/+|\/+$/g, '');
  const pathWithExt = normalized.endsWith('.md') ? normalized : `${normalized}.md`;
  const cleanedPath = pathWithExt.replace(/\\+/g, '/');

  return {
    id: normalized,
    path: cleanedPath,
    url: `https://docs.payram.com/${normalized}`,
  } as const;
};

export const registerDocLookupTool = (server: McpServer) => {
  server.registerTool(
    'get_payram_doc_by_id',
    {
      title: 'Get Payram Doc By ID',
      description: 'Returns the markdown for a Payram doc given its id, e.g. "features/payouts".',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async ({ id }) => {
        const metadata = buildDocMetadata(id);
        const markdown = await loadMarkdown(metadata.path);

        return {
          content: [textContent(`Loaded doc ${metadata.id} (${metadata.path})`)],
          structuredContent: {
            ...metadata,
            markdown,
          },
        };
      },
      { toolName: 'get_payram_doc_by_id' },
    ),
  );
};
