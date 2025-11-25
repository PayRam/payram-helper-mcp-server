import { SnippetResponse } from '../../common/snippetTypes.js';

export const buildReferralValidationSnippet = (): SnippetResponse => ({
  title: 'Validate incoming referral payloads before calling Payram',
  snippet: `type ReferralRequest = {
  email: string;
  referrerCode: string;
  referenceID: string;
  campaignId: string;
  refereeUserId: string;
};

type ReferralValidationResult = {
  request: ReferralRequest;
  warnings: string[];
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REFERRER_CODE_REGEX = /^[A-Z0-9]{6,10}$/;

export function validateReferralRequest(input: Partial<ReferralRequest>): ReferralValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!input.email || !EMAIL_REGEX.test(input.email)) {
    errors.push('email must be a valid address');
  }

  if (!input.referrerCode || !REFERRER_CODE_REGEX.test(input.referrerCode)) {
    errors.push('referrerCode must be 6-10 uppercase letters or digits');
  }

  if (!input.referenceID || input.referenceID.length < 6) {
    errors.push('referenceID must be at least 6 characters');
  }

  if (!input.campaignId) {
    errors.push('campaignId is required');
  }

  if (!input.refereeUserId) {
    errors.push('refereeUserId is required');
  }

  if (input.email && input.referrerCode && input.email.startsWith(input.referrerCode)) {
    warnings.push('Potential self-referral detected (email begins with referrer code).');
  }

  if (errors.length) {
    throw new Error('Invalid referral payload: ' + errors.join(', '));
  }

  const request: ReferralRequest = {
    email: input.email!,
    referrerCode: input.referrerCode!,
    referenceID: input.referenceID!,
    campaignId: input.campaignId!,
    refereeUserId: input.refereeUserId!,
  };

  // TODO: Lookup the campaign in your DB to ensure it is active and under budget before proceeding.
  // TODO: Check that the referrerCode belongs to an eligible member in your system (cache Payram data locally).

  return { request, warnings };
}

// Example usage inside an HTTP handler
const { request } = validateReferralRequest(req.body);
console.log('Validated referral request for campaign', request.campaignId);
`,
  meta: {
    language: 'typescript',
    framework: 'node-generic',
    filenameSuggestion: 'src/payram/referrals/validateReferral.ts',
    description: 'Guards referral inputs before invoking Payram referral APIs.',
  },
  notes:
    'Extend the schema with your business constraints (campaign budget, geography, anti-fraud) before calling payram.referrals.* methods.',
});

export const buildBackendReferralStatusSnippet = (): SnippetResponse => ({
  title: 'Track referral status in your own database',
  snippet: `import { db } from '../db/client';

type ReferralStatus =
  | 'pending-auth'
  | 'linked'
  | 'event-logged'
  | 'rewarded'
  | 'rejected';

type ReferralRecord = {
  referenceID: string;
  referrerCode: string;
  refereeUserId: string;
  status: ReferralStatus;
  lastEvent?: string;
  updatedAt: Date;
};

export async function recordReferralProgress(
  referenceID: string,
  updates: Partial<ReferralRecord>,
): Promise<ReferralRecord> {
  const existing = await db.referrals.findUnique({ where: { referenceID } });
  if (!existing) {
    throw new Error('Referral was not seeded before status update.');
  }

  const nextState: ReferralRecord = {
    ...existing,
    ...updates,
    updatedAt: new Date(),
  };

  await db.referrals.update({ where: { referenceID }, data: nextState });
  return nextState;
}

export async function getReferralStatus(referenceID: string): Promise<ReferralRecord | null> {
  return db.referrals.findUnique({ where: { referenceID } });
}

// TODO: When Payram exposes a referral status endpoint, query it here and sync results back into your DB.
`,
  meta: {
    language: 'typescript',
    framework: 'node-generic',
    filenameSuggestion: 'src/payram/referrals/referralStatusStore.ts',
    description: 'Backend-only helper to track referral states until Payram exposes read APIs.',
  },
  notes:
    'Use this to reconcile your own referral dashboards while Payram focuses on event ingestion APIs.',
});
