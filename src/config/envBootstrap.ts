import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface EnvScaffoldResult {
  envPath: string;
  created: boolean;
  updated: boolean;
}

export const PAYRAM_ENV_TEMPLATE = `# Payram REST base URL (include protocol)
PAYRAM_BASE_URL=https://api.payram.com

# Payram API key (see dashboard)
PAYRAM_API_KEY=pk_test_replace_me
`;

const REQUIRED_KEYS = ['PAYRAM_BASE_URL', 'PAYRAM_API_KEY'] as const;

const hasEnvKey = (contents: string, key: string) => new RegExp(`^${key}=`, 'm').test(contents);

export const ensurePayramEnvScaffold = async (): Promise<EnvScaffoldResult> => {
  const envPath = path.resolve(process.cwd(), '.env');

  try {
    const existing = await fs.readFile(envPath, 'utf8');
    const missingKeys = REQUIRED_KEYS.filter((key) => !hasEnvKey(existing, key));

    if (missingKeys.length === 0) {
      return { envPath, created: false, updated: false };
    }

    const lines: string[] = [];

    if (missingKeys.includes('PAYRAM_BASE_URL')) {
      lines.push('# Payram REST base URL (include protocol)');
      lines.push('PAYRAM_BASE_URL=https://api.payram.com');
    }

    if (missingKeys.includes('PAYRAM_API_KEY')) {
      if (lines.length) {
        lines.push('');
      }
      lines.push('# Payram API key (see dashboard)');
      lines.push('PAYRAM_API_KEY=pk_test_replace_me');
    }

    let patch = '';
    if (!existing.endsWith('\n')) {
      patch += '\n';
    }
    patch += '\n';
    patch += lines.join('\n');
    patch += '\n';

    await fs.appendFile(envPath, patch, 'utf8');
    return { envPath, created: false, updated: true };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }

    await fs.writeFile(envPath, PAYRAM_ENV_TEMPLATE, 'utf8');
    return { envPath, created: true, updated: false };
  }
};
