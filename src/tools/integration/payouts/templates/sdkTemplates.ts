// NOTE: These payout SDK snippets are derived from docs/js-sdk.md and payram-external.yaml.
// If the SDK changes, update those docs first and then refresh these templates.
import { SnippetResponse } from '../../common/snippetTypes.js';

export const buildNodeSdkCreatePayoutSnippet = (): SnippetResponse => ({
  title: 'Create a Payram payout using the Node SDK',
  snippet: `import {
  Payram,
  CreatePayoutRequest,
  MerchantPayout,
  isPayramSDKError,
} from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
  // ignore if advanced configuration is not needed
  config: {
    timeoutMs: 10_000, // optional for advance configuration
    maxRetries: 2, // optional for advance configuration
    retryPolicy: 'safe', // optional for advance configuration
    allowInsecureHttp: false, // optional for advance configuration
  },
});

export async function createPayout(payload: CreatePayoutRequest): Promise<MerchantPayout> {
  try {
    const payout = await payram.payouts.createPayout(payload);
    console.log('Queued payout:', payout.id, payout.status);
    return payout;
  } catch (error) {
    if (isPayramSDKError(error)) {
      console.error('Payram Error:', {
        status: error.status,
        requestId: error.requestId,
        isRetryable: error.isRetryable,
      });
    }
    throw error;
  }
}

// Example invocation per MerchantPayoutFromMerchantCreateRequest
await createPayout({
  email: 'merchant@example.com',
  blockchainCode: 'ETH',
  currencyCode: 'USDC',
  amount: '125.50',
  toAddress: '0xfeedfacecafebeefdeadbeefdeadbeefdeadbeef',
  customerID: 'cust_123',
  mobileNumber: '+15555555555',
  residentialAddress: '1 Market St, San Francisco, CA',
});
`,
  meta: {
    language: 'typescript',
    framework: 'node-generic',
    filenameSuggestion: 'src/payram/payouts/createPayout.ts',
    description: 'Uses payram.payouts.createPayout with the documented request payload.',
  },
  notes:
    'Provide the exact fields from MerchantPayoutFromMerchantCreateRequest. Amount must be expressed as a string per OpenAPI spec.',
});

export const buildNodeSdkPayoutStatusSnippet = (): SnippetResponse => ({
  title: 'Fetch a Payram payout status using the Node SDK',
  snippet: `import { Payram, MerchantPayout, isPayramSDKError } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

export async function getPayoutStatus(payoutId: number): Promise<MerchantPayout> {
  if (!payoutId) {
    throw new Error('A numeric payoutId from the createPayout response is required.');
  }

  try {
    const payout = await payram.payouts.getPayoutById(payoutId);
    console.log('Current payout status:', payout.status);
    return payout;
  } catch (error) {
    if (isPayramSDKError(error)) {
      console.error('Payram Error:', {
        status: error.status,
        requestId: error.requestId,
        isRetryable: error.isRetryable,
      });
    }
    throw error;
  }
}

await getPayoutStatus(120);
`,
  meta: {
    language: 'typescript',
    framework: 'node-generic',
    filenameSuggestion: 'src/payram/payouts/getPayoutStatus.ts',
    description: 'Wraps payram.payouts.getPayoutById to inspect payout.status / transfer details.',
  },
  notes:
    'Valid statuses include pending-otp-verification, pending-approval, pending, initiated, sent, failed, rejected, processed, and cancelled as documented in payouts-status.md.',
});
