import { authenticatedFetch } from './authClient.js';
import type {
  SearchParams,
  PaymentSearchResponse,
  PaymentSummaryResponse,
  AddressBalanceEntry,
} from './types.js';

/**
 * Search payments with filters.
 * POST /api/v1/external-platform/{platformId}/payment/search
 */
export const searchPayments = async (
  platformId: string,
  params: SearchParams,
): Promise<PaymentSearchResponse> => {
  const response = await authenticatedFetch(
    `/api/v1/external-platform/${platformId}/payment/search`,
    {
      method: 'POST',
      body: JSON.stringify(params),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Payment search failed (HTTP ${response.status}): ${body}`);
  }

  return (await response.json()) as PaymentSearchResponse;
};

/**
 * Get payment summary counts.
 * POST /api/v1/external-platform/{platformId}/payment/summary
 */
export const getPaymentSummary = async (
  platformId: string,
): Promise<PaymentSummaryResponse> => {
  const response = await authenticatedFetch(
    `/api/v1/external-platform/${platformId}/payment/summary`,
    {
      method: 'POST',
      body: JSON.stringify({}),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Payment summary failed (HTTP ${response.status}): ${body}`);
  }

  return (await response.json()) as PaymentSummaryResponse;
};

/**
 * Get address balances (unswept funds) across all wallets.
 * GET /api/v1/addresses/balance
 */
export const getAddressBalances = async (): Promise<AddressBalanceEntry[]> => {
  const response = await authenticatedFetch('/api/v1/addresses/balance', {
    method: 'GET',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Address balances failed (HTTP ${response.status}): ${body}`);
  }

  return (await response.json()) as AddressBalanceEntry[];
};
