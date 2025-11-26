import { SnippetResponse } from '../../common/snippetTypes.js';

const notes =
  'Request/response contract sourced from docs/payram-external.yaml (/api/v1/payment initiatePayment).';

export const buildNextjsPaymentRouteSnippet = (): SnippetResponse => ({
  title: 'Next.js App Router endpoint for Payram create-payment',
  snippet: `import { NextRequest, NextResponse } from 'next/server';

const PAYRAM_PAYMENT_PATH = '/api/v1/payment';

export async function POST(request: NextRequest) {
  const baseUrl = process.env.PAYRAM_BASE_URL;
  const apiKey = process.env.PAYRAM_API_KEY;

  if (!baseUrl || !apiKey) {
    return NextResponse.json({ error: 'payram_not_configured' }, { status: 500 });
  }

  let payload: {
    customerEmail: string;
    customerId: string;
    amountInUSD: number;
  };

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const payramUrl = normalizedBaseUrl + PAYRAM_PAYMENT_PATH;

  try {
    const payramResponse = await fetch(payramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': apiKey,
      },
      body: JSON.stringify({
        customerEmail: payload.customerEmail,
        customerId: payload.customerId,
        amountInUSD: payload.amountInUSD,
      }),
    });

    const payramBody = await payramResponse.json();

    if (!payramResponse.ok) {
      return NextResponse.json(
        { error: 'payram_error', details: payramBody },
        { status: payramResponse.status },
      );
    }

    return NextResponse.json({
      referenceId: payramBody.reference_id,
      checkoutUrl: payramBody.url,
      host: payramBody.host,
    });
  } catch (error) {
    console.error('Failed to create Payram payment', error);
    return NextResponse.json({ error: 'payram_upstream_error' }, { status: 502 });
  }
}
`,
  meta: {
    language: 'typescript',
    framework: 'nextjs',
    filenameSuggestion: 'app/api/pay/create/route.ts',
    description: "Next.js App Router API route that proxies to Payram's /api/v1/payment endpoint.",
  },
  notes,
});
