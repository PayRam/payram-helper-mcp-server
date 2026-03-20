import { getPayramBaseUrl, getPayramAccessToken, getPayramRefreshToken } from '../config/env.js';
import { logger } from '../utils/logger.js';
import type { TokenPair } from './types.js';

export class AuthenticationError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = statusCode;
  }
}

// ── Module-level singleton state (lazy-initialized) ──────────────────

let accessToken: string | null = null;
let refreshToken: string | null = null;
let baseUrl: string | null = null;
let refreshPromise: Promise<void> | null = null;

const ensureInitialized = (): void => {
  if (accessToken === null) {
    accessToken = getPayramAccessToken();
    refreshToken = getPayramRefreshToken();
    baseUrl = getPayramBaseUrl().replace(/\/+$/, '');
  }
};

// ── Token refresh ────────────────────────────────────────────────────

const refreshTokens = async (): Promise<void> => {
  // Concurrency guard: reuse in-flight refresh if one is already running
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      logger.info('Refreshing access token...');
      const response = await fetch(`${baseUrl}/api/v1/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new AuthenticationError(
          `Token refresh failed (HTTP ${response.status}): ${body}`,
          response.status,
        );
      }

      const data = (await response.json()) as TokenPair;
      accessToken = data.accessToken;
      // Sliding window: backend may issue a new refresh token
      if (data.refreshToken) {
        refreshToken = data.refreshToken;
      }
      logger.info('Access token refreshed successfully');
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// ── Main export ──────────────────────────────────────────────────────

/**
 * Fetch wrapper that injects Bearer auth and auto-refreshes on 401.
 * @param path  API path starting with `/` (e.g. `/api/v1/addresses/balance`)
 * @param init  Standard RequestInit (method, body, extra headers, etc.)
 */
export const authenticatedFetch = async (
  path: string,
  init: RequestInit = {},
): Promise<Response> => {
  ensureInitialized();

  const buildHeaders = (): Record<string, string> => ({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  });

  const url = `${baseUrl}${path}`;

  // First attempt
  let response = await fetch(url, { ...init, headers: buildHeaders() });

  // On 401: refresh and retry once
  if (response.status === 401) {
    logger.info(`Got 401 on ${path}, attempting token refresh...`);
    await refreshTokens();
    response = await fetch(url, { ...init, headers: buildHeaders() });

    if (response.status === 401) {
      throw new AuthenticationError(
        'Authentication failed after token refresh. Please provide fresh tokens.',
        401,
      );
    }
  }

  return response;
};
