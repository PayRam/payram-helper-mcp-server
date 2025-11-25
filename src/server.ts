import express from 'express';
import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerTools } from './tools/index.js';
import { getServerPort } from './config/env.js';
import { logger } from './utils/logger.js';

const createApp = () => express();

const bootstrap = async () => {
  const app = createApp();
  const port = getServerPort();

  app.use((req, _res, next) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
  });

  const mcpServer = new McpServer({
    name: 'payram-mcp-server',
    version: '0.1.0',
  });

  registerTools(mcpServer);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    enableJsonResponse: true,
  });

  await mcpServer.connect(transport);

  const jsonParser = express.json({ limit: '1mb' });

  const handleTransportRequest = async (
    req: Parameters<typeof transport.handleRequest>[0],
    res: Parameters<typeof transport.handleRequest>[1],
    body?: unknown,
  ) => {
    try {
      await transport.handleRequest(req, res, body);
    } catch (error) {
      logger.error('MCP transport error', error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'MCP_SERVER_ERROR' }));
      }
    }
  };

  // JSON-RPC POST endpoint.
  app.post('/mcp', jsonParser, (req, res) => {
    void handleTransportRequest(req, res, req.body);
  });

  // Allow legacy SSE clients that still call GET /mcp.
  app.get('/mcp', (req, res) => {
    void handleTransportRequest(req, res);
  });

  // Preferred SSE endpoint for Copilot and other Streamable HTTP clients.
  app.get('/mcp/sse', (req, res) => {
    void handleTransportRequest(req, res);
  });

  app.get('/healthz', (_req, res) => {
    res.json({ ok: true, name: 'payram-mcp-server' });
  });

  app.listen(port, () => {
    logger.info(`MCP server running with SSE on http://localhost:${port}/mcp and /mcp/sse`);
  });
};

bootstrap().catch((error) => {
  logger.error('Failed to start MCP server', error);
  process.exitCode = 1;
});
