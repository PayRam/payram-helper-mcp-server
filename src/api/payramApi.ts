import { authenticatedFetch } from './authClient.js';
import { getPayramBaseUrl, getPayramApiKey } from '../config/env.js';
import type {
  SearchParams,
  PaymentSearchResponse,
  PaymentSummaryResponse,
  AddressBalanceEntry,
  ExternalPlatform,
  BlockchainCurrency,
  Recipient,
  PaymentLink,
  WorkerStatus,
  NodeConnectionResult,
  Blockchain,
  WalletInfo,
} from './types.js';

/** Request fields for POST /api/v1/payment (params.PaymentCreateRequest). */
export interface CreatePaymentLinkParams {
  amountInUSD: number;
  customerID: string;
  customerEmail?: string;
}

/** Unwrap a list response that may be a bare array or an envelope ({data|recipients|...: [...]}). */
const unwrapList = <T>(payload: unknown, ...keys: string[]): T[] => {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object') {
    for (const key of keys) {
      const value = (payload as Record<string, unknown>)[key];
      if (Array.isArray(value)) return value as T[];
    }
  }
  return [];
};

/**
 * List all external platforms (projects) for the authenticated user.
 * GET /api/v1/external-platform/details
 */
export const listPlatforms = async (): Promise<ExternalPlatform[]> => {
  const response = await authenticatedFetch('/api/v1/external-platform/details', {
    method: 'GET',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`List platforms failed (HTTP ${response.status}): ${body}`);
  }

  return (await response.json()) as ExternalPlatform[];
};

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
 * List supported blockchain currencies. Public endpoint — no auth required.
 * GET /api/v1/currencies
 */
export const listCurrencies = async (): Promise<BlockchainCurrency[]> => {
  const baseUrl = getPayramBaseUrl().replace(/\/+$/, '');
  const response = await fetch(`${baseUrl}/api/v1/currencies`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`List currencies failed (HTTP ${response.status}): ${body}`);
  }

  return unwrapList<BlockchainCurrency>(await response.json(), 'data', 'currencies');
};

/**
 * List withdrawal recipients (payout beneficiaries) for the authenticated member.
 * GET /api/v1/recipients/
 */
export const listRecipients = async (): Promise<Recipient[]> => {
  const response = await authenticatedFetch('/api/v1/recipients/', {
    method: 'GET',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`List recipients failed (HTTP ${response.status}): ${body}`);
  }

  return unwrapList<Recipient>(await response.json(), 'data', 'recipients');
};

/**
 * Create a payment (checkout) link. Uses the Merchant API-Key header — NOT the
 * JWT Bearer flow — because POST /api/v1/payment is the merchant-facing endpoint.
 * POST /api/v1/payment
 */
export const createPaymentLink = async (
  params: CreatePaymentLinkParams,
): Promise<PaymentLink> => {
  const baseUrl = getPayramBaseUrl().replace(/\/+$/, '');
  const apiKey = getPayramApiKey();

  const response = await fetch(`${baseUrl}/api/v1/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'API-Key': apiKey,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Create payment link failed (HTTP ${response.status}): ${body}`);
  }

  return (await response.json()) as PaymentLink;
};

/**
 * Get supervisor worker (blockchain listener) statuses.
 * GET /api/v1/system/workers/status
 */
export const getWorkersStatus = async (): Promise<WorkerStatus[]> => {
  const response = await authenticatedFetch('/api/v1/system/workers/status', {
    method: 'GET',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Workers status failed (HTTP ${response.status}): ${body}`);
  }

  return unwrapList<WorkerStatus>(await response.json(), 'data', 'workers', 'statuses');
};

/**
 * List configured blockchains.
 * GET /api/v1/blockchains
 */
export const getBlockchains = async (): Promise<Blockchain[]> => {
  const response = await authenticatedFetch('/api/v1/blockchains', {
    method: 'GET',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`List blockchains failed (HTTP ${response.status}): ${body}`);
  }

  return unwrapList<Blockchain>(await response.json(), 'data', 'blockchains');
};

/**
 * Test all RPC nodes for a blockchain (connectivity + sync staleness).
 * GET /api/v1/blockchain/{blockchainCode}/test-connection
 */
export const testBlockchainConnection = async (
  blockchainCode: string,
): Promise<NodeConnectionResult> => {
  const response = await authenticatedFetch(
    `/api/v1/blockchain/${encodeURIComponent(blockchainCode)}/test-connection`,
    { method: 'GET' },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Test connection for ${blockchainCode} failed (HTTP ${response.status}): ${body}`,
    );
  }

  const data = (await response.json()) as Partial<NodeConnectionResult>;
  return {
    success: Boolean(data?.success),
    nodes: Array.isArray(data?.nodes) ? data.nodes : [],
  };
};

/**
 * List all wallets (deposit, hot, cold, gas).
 * GET /api/v1/wallets
 */
export const getWallets = async (): Promise<WalletInfo[]> => {
  const response = await authenticatedFetch('/api/v1/wallets', {
    method: 'GET',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`List wallets failed (HTTP ${response.status}): ${body}`);
  }

  return unwrapList<WalletInfo>(await response.json(), 'data', 'wallets');
};

/**
 * Get the blockchains/currencies enabled for a project (map of chain code → currency codes).
 * GET /api/v1/project/{projectId}/blockchain-currency
 */
export const getProjectBlockchainCurrency = async (
  projectId: string,
): Promise<Record<string, string[]>> => {
  const response = await authenticatedFetch(
    `/api/v1/project/${encodeURIComponent(projectId)}/blockchain-currency`,
    { method: 'GET' },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Project blockchain-currency failed (HTTP ${response.status}): ${body}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  const map = (data?.supportedBlockchainCurrencies ?? data) as Record<string, string[]>;
  return map && typeof map === 'object' ? map : {};
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
