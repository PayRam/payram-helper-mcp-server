import type { SetupChecklistResponse } from '../../../types/setup.js';

export const PAYRAM_SETUP_CHECKLIST: SetupChecklistResponse = {
  title: 'Merchant Setup Checklist',
  description:
    'Sequential tasks that take a merchant from fresh infrastructure to a production-ready Payram deployment.',
  items: [
    {
      id: 'deployment-prereqs',
      label: 'Confirm infrastructure + access',
      description:
        'Provision the server (4 CPU / 4 GB RAM / 50 GB SSD minimum), allocate domains, and confirm who owns DNS, SSL, and SSH access before installation.',
      docsRefs: ['deployment-guide/quick-setup.md', 'faqs/deployment-faqs.md'],
    },
    {
      id: 'root-account-setup',
      label: 'Create root + master accounts',
      description:
        'Generate the master account(s) per network, back up seed phrases offline, and record the cold wallet destination before onboarding continues.',
      docsRefs: ['onboarding-guide/root-account-setup.md', 'faqs/fund-management-faqs.md'],
    },
    {
      id: 'node-details',
      label: 'Configure node endpoints',
      description:
        'Connect Payram to your preferred RPC providers for each chain (Ethereum, Base, Tron, etc.) and verify connectivity/latency.',
      docsRefs: [
        'onboarding-guide/node-details-configuration.md',
        'support/supported-networks-and-coins.md',
      ],
    },
    {
      id: 'wallet-integration',
      label: 'Integrate deposit + sweep wallets',
      description:
        'Map how customer deposit wallets are derived, ensure SmartSweep contracts are deployed, and store hot wallet credentials securely.',
      docsRefs: ['onboarding-guide/wallet-integration.md', 'onboarding-guide/hot-wallet-setup.md'],
    },
    {
      id: 'smtp-and-otp',
      label: 'Wire up SMTP + alerts',
      description:
        'Configure SMTP host, credentials, and test OTP delivery so approvals and payout requests can be verified.',
      docsRefs: ['deployment-guide/advanced-setup.md', 'features/payouts.md'],
      optional: false,
    },
    {
      id: 'env-config',
      label: 'Populate environment variables',
      description:
        'Fill in PAYRAM_* values, RPC URLs, wallet addresses, and webhook secrets, then store the .env file in your secret manager.',
      docsRefs: ['deployment-guide/quick-setup.md', 'faqs/configuration-faqs.md'],
    },
    {
      id: 'network-testing',
      label: 'Test on supported networks',
      description:
        'Use the onboarding testing guide to run payment links, API-initiated payments, and sweeps on each network before going live.',
      docsRefs: [
        'onboarding-guide/testing-payment-links.md',
        'support/supported-networks-and-coins.md',
      ],
    },
    {
      id: 'api-integration',
      label: 'Integrate backend + webhooks',
      description:
        'Install the SDK or call REST endpoints directly, create payment intents, and register webhook listeners for status updates.',
      docsRefs: ['welcome_to_payram.md', 'onboarding-guide/introduction.md'],
    },
  ],
  notes:
    'Use this as a living runbook — check off items per environment and attach links to evidence/screenshots for audits.',
};
