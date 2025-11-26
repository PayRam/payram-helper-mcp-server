import { SnippetResponse } from '../../common/snippetTypes.js';

const notes =
  'Implements POST /api/v1/payment from docs/payram-external.yaml using Express as a backend proxy.';

export const buildExpressPaymentRouteSnippet = (): SnippetResponse => ({
  title: 'Express route for Payram create-payment API',
  snippet: `import express, { Request, Response } from 'express';

const router = express.Router();
router.use(express.json());

const PAYRAM_PAYMENT_PATH = '/api/v1/payment';

router.post('/api/pay/create', async (req: Request, res: Response) => {
  const baseUrl = process.env.PAYRAM_BASE_URL;
  const apiKey = process.env.PAYRAM_API_KEY;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({ error: 'payram_not_configured' });
  }

  const { customerEmail, customerId, amountInUSD } = req.body ?? {};

  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return res.status(400).json({ error: 'invalid_request' });
  }

  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const payramUrl = normalizedBaseUrl + PAYRAM_PAYMENT_PATH;

  try {
    const response = await fetch(payramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': apiKey,
      },
      body: JSON.stringify({ customerEmail, customerId, amountInUSD }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'payram_error', details: payload });
    }

    return res.json({
      reference_id: payload.reference_id,
      url: payload.url,
      host: payload.host,
    });
  } catch (error) {
    console.error('Failed to create Payram payment', error);
    return res.status(502).json({ error: 'payram_upstream_error' });
  }
});

export default router;
`,
  meta: {
    language: 'typescript',
    framework: 'express',
    filenameSuggestion: 'src/routes/payramCreatePayment.ts',
    description: 'Express router that posts /api/v1/payment on Payram to start a checkout session.',
  },
  notes,
});
