import { SnippetResponse } from '../../common/snippetTypes.js';

export const buildExpressReferralRouteSnippet = (): SnippetResponse => ({
  title: 'Express route for logging referrals via Payram',
  snippet: `import express from 'express';
import { Payram, RefereeLinkRequest, EventLogRequest } from 'payram';
import { validateReferralRequest } from '../referrals/validateReferral';

const router = express.Router();
const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

async function linkAndLogReferral(payload: RefereeLinkRequest & EventLogRequest) {
  const referee = await payram.referrals.linkReferee({
    email: payload.email,
    referrerCode: payload.referrerCode,
    referenceID: payload.referenceID,
  });

  const event = await payram.referrals.logReferralEvent({
    eventKey: payload.eventKey,
    referenceID: referee.referenceId,
    amount: payload.amount,
  });

  return { referee, event };
}

router.post('/api/referrals/create', async (req, res) => {
  try {
    const payload = validateReferralRequest(req.body);

    const result = await linkAndLogReferral({
      ...payload,
      eventKey: req.body.eventKey ?? 'signup',
      amount: req.body.amount,
    });

    return res.status(200).json({
      status: 'queued',
      referrerCode: result.referee.code,
      referenceID: result.referee.referenceId,
      eventStatus: result.event.status,
    });
  } catch (error) {
    console.error('Referral route failed', error);
    return res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
`,
  meta: {
    language: 'typescript',
    framework: 'express',
    filenameSuggestion: 'src/routes/referrals.ts',
    description:
      'Express POST handler that links a referee then logs the configured referral event.',
  },
  notes: 'Adjust eventKey + validation per campaign rules before shipping.',
});

export const buildNextjsReferralRouteSnippet = (): SnippetResponse => ({
  title: 'Next.js route handler for referral creation',
  snippet: `// app/api/referrals/create/route.ts
import { NextResponse } from 'next/server';
import { Payram } from 'payram';
import { validateReferralRequest } from '@/lib/referrals/validateReferral';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

export async function POST(request: Request) {
  const body = await request.json();
  const payload = validateReferralRequest(body);

  const referee = await payram.referrals.linkReferee({
    email: payload.email,
    referrerCode: payload.referrerCode,
    referenceID: payload.referenceID,
  });

  const event = await payram.referrals.logReferralEvent({
    eventKey: body.eventKey ?? 'signup',
    referenceID: referee.referenceId,
    amount: body.amount,
  });

  return NextResponse.json({
    status: 'queued',
    referrerCode: referee.code,
    referenceID: referee.referenceId,
    eventStatus: event.status,
  });
}
`,
  meta: {
    language: 'typescript',
    framework: 'nextjs',
    filenameSuggestion: 'app/api/referrals/create/route.ts',
    description: 'Next.js App Router route that links a referee and logs an event via Payram SDK.',
  },
  notes: 'Wrap the Payram calls in try/catch and map SDK errors to HTTP responses for production.',
});
