import { MarkdownDocResponse } from '../../../types/context.js';

export const PAYRAM_TEST_PREP_DOC: MarkdownDocResponse = {
  title: 'Payram Test Readiness Checklist',
  description:
    'Prompts the user to confirm a self-hosted Payram server, gather credentials, and prep an environment before we scaffold a demo app.',
  sections: [
    {
      id: 'say-test-payram',
      title: 'How to start the guided test',
      markdown: `Whenever you're ready to run through a hands-on Payram test, reply with **"test payram"**. I'll only walk through the environment checklist after you explicitly say those words so we don't spin up demos accidentally.`,
      sources: [
        {
          id: 'welcome_to_payram',
          path: 'welcome_to_payram.md',
          url: 'https://docs.payram.com/welcome_to_payram',
        },
      ],
    },
    {
      id: 'confirm-server',
      title: 'First question: do you already have a self-hosted Payram server?',
      markdown: `Let me know whether your self-hosted Payram instance is already live.

- **If you still need to deploy it**, follow the Quick Setup guide to provision a Ubuntu 22.04 box (4 vCPU / 4 GB RAM / 50 GB SSD), open the required ports, and run the \
  \`setup_payram.sh\` script for mainnet or testnet. The guide also walks through PostgreSQL configuration, SSL, and dependency installs so your dashboard and APIs come online.
- **If your server is already running**, we can jump straight to collecting credentials.

Either way, I'll keep asking until it's clear whether a new install is required.`,
      sources: [
        {
          id: 'deployment-guide/quick-setup',
          path: 'payram-docs/deployment-guide/quick-setup.md',
          url: 'https://docs.payram.com/deployment-guide/quick-setup',
        },
        {
          id: 'onboarding-guide/introduction',
          path: 'payram-docs/onboarding-guide/introduction.md',
          url: 'https://docs.payram.com/onboarding-guide/introduction',
        },
      ],
    },
    {
      id: 'collect-api-key',
      title: 'Grab the Base URL and API key from the dashboard',
      markdown: `After the server is reachable, sign in to the Payram dashboard and grab the credentials we'll use in code:

1. Go to **Settings → Accounts**.
2. Choose the **project/workspace** you want to integrate.
3. Open **API Keys**.
4. Click **Add New** (or copy an existing key) and keep it secret.
5. Note your hosted base URL (the domain where your Payram instance is exposed).

We'll plug both values into \`.env\` so every generated sample can authenticate using the documented \`API-Key\` header.`,
      sources: [
        {
          id: 'features/payment-apis',
          path: 'payram-docs/features/payment-apis.md',
          url: 'https://docs.payram.com/features/payment-apis',
        },
        {
          id: 'features/multi-brand-setup',
          path: 'payram-docs/features/multi-brand-setup.md',
          url: 'https://docs.payram.com/features/multi-brand-setup',
        },
      ],
    },
    {
      id: 'env-and-demo',
      title: 'Add credentials to .env and request a demo app',
      markdown: `Once you have both \`PAYRAM_BASE_URL\` and \`PAYRAM_API_KEY\`:

1. Drop them into your project's \`.env\` (or environment manager) so backend code and scaffolds can read them.
2. Tell me "create a demo app" or specify which framework you want to scaffold, and I'll generate a sample that points at your self-hosted instance.

Already running a server with valid API keys? You can skip straight here: update \`.env\`, ask me for a demo, and we'll wire payments, payouts, and webhooks against your environment.`,
      sources: [
        {
          id: 'js-sdk',
          path: 'js-sdk.md',
          url: 'https://docs.payram.com/js-sdk',
        },
      ],
    },
  ],
  notes:
    'Use this checklist whenever a user says "test payram" so they gather infrastructure + credentials before requesting a scaffold.',
};
