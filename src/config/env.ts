import dotenv from 'dotenv';

const didLoad = dotenv.config();
if (didLoad.error && process.env.NODE_ENV !== 'production') {
  console.warn('[payram-mcp-server] Failed to load .env file:', didLoad.error.message);
}

export class MissingEnvironmentVariableError extends Error {
  constructor(variableName: string) {
    super(`Missing required environment variable: ${variableName}`);
    this.name = 'MissingEnvironmentVariableError';
  }
}

const getEnv = (key: string): string | undefined => {
  const value = process.env[key];
  return value?.trim() ? value : undefined;
};

export const getPayramBaseUrl = (): string => {
  const value = getEnv('PAYRAM_BASE_URL');
  if (!value) {
    throw new MissingEnvironmentVariableError('PAYRAM_BASE_URL');
  }
  return value;
};

export const getPayramApiKey = (): string => {
  const value = getEnv('PAYRAM_API_KEY');
  if (!value) {
    throw new MissingEnvironmentVariableError('PAYRAM_API_KEY');
  }
  return value;
};

export const getPayramAccessToken = (): string => {
  const value = getEnv('PAYRAM_ACCESS_TOKEN');
  if (!value) {
    throw new MissingEnvironmentVariableError('PAYRAM_ACCESS_TOKEN');
  }
  return value;
};

export const getPayramRefreshToken = (): string => {
  const value = getEnv('PAYRAM_REFRESH_TOKEN');
  if (!value) {
    throw new MissingEnvironmentVariableError('PAYRAM_REFRESH_TOKEN');
  }
  return value;
};

export const getPayramExternalPlatformId = (): string | undefined => {
  return getEnv('PAYRAM_EXTERNAL_PLATFORM_ID');
};

export const getServerPort = (): number => {
  const parsed = Number(getEnv('PORT') ?? '3333');
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3333;
};
