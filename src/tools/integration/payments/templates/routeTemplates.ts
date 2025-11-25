import { SnippetResponse } from '../../common/snippetTypes.js';

export const buildExpressCreatePaymentRouteSnippet = (): SnippetResponse => ({
  title: 'Express route for creating a Payram payment',
  snippet: `import { Router } from 'express';
import { Payram, InitiatePaymentRequest, isPayramSDKError } from 'payram';

const router = Router();
const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

router.post('/api/payments/payram', async (req, res) => {
  const payload = req.body as Partial<InitiatePaymentRequest>;

  if (!payload?.customerEmail || !payload.customerId || typeof payload.amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_REQUIRED_FIELDS' });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail: payload.customerEmail,
      customerId: payload.customerId,
      amountInUSD: payload.amountInUSD,
    });

    return res.status(201).json({
      referenceId: checkout.reference_id,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    if (isPayramSDKError(error)) {
      console.error('Payram Error:', {
        status: error.status,
        requestId: error.requestId,
        retryable: error.isRetryable,
      });
    }
    return res.status(502).json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }
});

export default router;
`,
  meta: {
    language: 'typescript',
    framework: 'express',
    filenameSuggestion: 'src/routes/payram/payments.ts',
    description: 'Ideal for wiring Payram checkout creation behind an authenticated Express route.',
  },
  notes:
    'Validate currency/blockchain combinations before calling Payram, and ensure PAYRAM_API_KEY is scoped to the merchant workspace.',
});

export const buildNextjsRouteCreatePaymentSnippet = (): SnippetResponse => ({
  title: 'Next.js App Router handler for Payram payments',
  snippet: `// app/api/payram/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Payram, InitiatePaymentRequest, isPayramSDKError } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Partial<InitiatePaymentRequest>;

  if (!payload?.customerEmail || !payload.customerId || typeof payload.amountInUSD !== 'number') {
    return NextResponse.json({ error: 'MISSING_REQUIRED_FIELDS' }, { status: 400 });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail: payload.customerEmail,
      customerId: payload.customerId,
      amountInUSD: payload.amountInUSD,
    });

    return NextResponse.json({
      referenceId: checkout.reference_id,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    if (isPayramSDKError(error)) {
      console.error('Payram Error:', {
        status: error.status,
        requestId: error.requestId,
      });
    }
    return NextResponse.json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' }, { status: 502 });
  }
}
`,
  meta: {
    language: 'typescript',
    framework: 'nextjs',
    filenameSuggestion: 'app/api/payram/create-payment/route.ts',
    description: 'Secure server-side entrypoint for kicking off Payram invoices from Next.js.',
  },
  notes:
    'Use Next.js middleware or route handlers to enforce auth before calling Payram. See payments-api.md for optional parameters such as settlementCurrency and memo.',
});
