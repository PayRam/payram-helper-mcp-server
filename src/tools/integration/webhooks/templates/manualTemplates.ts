import { SnippetResponse } from '../../common/snippetTypes.js';

export const buildManualWebhookVerificationSnippet = (): SnippetResponse => ({
  title: 'Verify Payram webhook API-Key in custom frameworks',
  snippet: `import { verifyApiKey } from 'payram';
import { handlePayramEvent } from './handlePayramEvent';

export async function handlePayramWebhook(req, res) {
  if (!process.env.PAYRAM_API_KEY) {
    return res.status(500).json({ error: 'webhook_not_configured' });
  }

  if (!verifyApiKey(req.headers, process.env.PAYRAM_API_KEY!)) {
    return res.status(401).json({ error: 'invalid-key' });
  }

  const payload = req.body; // Ensure your framework/body parser already parsed JSON

  try {
    await handlePayramEvent(payload);
    return res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error handling Payram webhook', error);
    return res.status(500).json({ error: 'webhook_handler_error' });
  }
}
`,
  meta: {
    language: 'typescript',
    framework: 'generic-http',
    filenameSuggestion: 'src/webhooks/payramManualHandler.ts',
    description:
      'Validates the API-Key header with verifyApiKey for frameworks without Payram SDK adapters.',
  },
  notes:
    'Matches docs/js-sdk.md Manual Validation guidance. Useful for Hono, Fastify bare, Lambda, or any stack where you wire the handler yourself.',
});
