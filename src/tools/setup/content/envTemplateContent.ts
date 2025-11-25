import type { EnvTemplateResponse } from '../../../types/setup.js';

export const PAYRAM_ENV_TEMPLATE: EnvTemplateResponse = {
  title: 'Payram .env Template',
  description:
    'Baseline environment variables for a merchant backend that talks to their self-hosted Payram stack.',
  envExample: `# Payram endpoints
PAYRAM_BASE_URL=https://payram.selfhosted.local
PAYRAM_API_KEY=pk_live_replace_me
`,
  variables: [
    {
      key: 'PAYRAM_BASE_URL',
      required: true,
      description: 'Base URL for your self-hosted Payram API (used by server-side SDK calls).',
      example: 'https://payram.selfhosted.local',
      docsRefs: ['deployment-guide/quick-setup', 'welcome_to_payram.md'],
    },
    {
      key: 'PAYRAM_API_KEY',
      required: true,
      description:
        'Project-scoped API key created in the dashboard to sign outbound requests from your backend.',
      example: 'pk_live_123456',
      docsRefs: ['faqs/configuration-faqs.md', 'support/important-links.md'],
    },
  ],
  notes:
    'Regenerate keys after staging, never commit .env files, and align variable names with deployment + onboarding docs.',
};
