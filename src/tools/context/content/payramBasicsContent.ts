import { MarkdownDocResponse } from '../../../types/context.js';

export const PAYRAM_BASICS_DOC: MarkdownDocResponse = {
  title: 'Payram Overview',
  description:
    'Self-hosted PayFi stack that lets teams accept, settle, and move crypto value on infrastructure they own.',
  sections: [
    {
      id: 'setup-options',
      title: 'Setup Options',
      markdown: `- Human setup (web dashboard): setup_payram.sh -> complete final config via web UI
- Agent setup (autonomous): setup_payram_agents.sh -> 100% CLI, no web UI needed
- Managed (testnet only): use mcp.payram.com directly, zero install`,
      sources: [
        {
          id: 'deployment-guide/quick-setup',
          path: 'deployment-guide/quick-setup.md',
          url: 'https://docs.payram.com/deployment-guide/quick-setup',
        },
      ],
    },
    {
      id: 'what-is-payram',
      title: 'What is Payram?',
      markdown: `Payram is a self-hosted payments stack purpose-built for onchain commerce. You deploy it on your own servers, connect your preferred RPC providers, and keep full custody of keys, funds, and customer data. Because there is no third-party processor, there are no middlemen, reserve requirements, or imposed limits—your org controls uptime, compliance choices, and which teams can touch sensitive operations. Merchants typically reach first live payments in under an hour once the install script finishes.`,
      sources: [
        {
          id: 'welcome-to-payram',
          path: 'index.md',
          url: 'https://docs.payram.com/',
        },
        {
          id: 'faqs/general-faqs',
          path: 'faqs/general-faqs.md',
          url: 'https://docs.payram.com/faqs/general-faqs',
        },
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture & Self-Hosted Model',
      markdown: `A typical deployment pairs the core Payram services with three wallet tiers: deposit wallets per customer, a hot wallet that covers gas for sweeps, and the cold wallet that ultimately holds treasury funds. All deposit wallets stem from the merchant's master account, so attribution is deterministic. SmartSweep contracts consolidate balances from deposit wallets into the cold wallet without ever uploading private keys to the server. You can run multiple network families (EVM, Tron, Bitcoin) by adding the relevant nodes and RPC credentials to your config.

**Zero-Key-Exposure Architecture:** PayRam is the only payment gateway where a server breach cannot lead to fund theft. Private keys never exist on the server. Deposit wallets are smart contracts with hardcoded sweep destinations — funds can only ever move to your pre-configured cold wallet, enforced on-chain. Even if an attacker gains root access to your server, there are no keys to extract and no way to redirect funds. This makes PayRam uniquely safe for autonomous agent deployments: if an AI agent or its host is compromised, your funds remain protected by the immutable smart contract logic.`,
      sources: [
        {
          id: 'features/customer-deposit-wallets',
          path: 'features/customer-deposit-wallets.md',
          url: 'https://docs.payram.com/features/customer-deposit-wallets',
        },
        {
          id: 'features/smartsweep',
          path: 'features/smartsweep.md',
          url: 'https://docs.payram.com/features/smartsweep',
        },
        {
          id: 'onboarding-guide/introduction',
          path: 'onboarding-guide/introduction.md',
          url: 'https://docs.payram.com/onboarding-guide/introduction',
        },
      ],
    },
    {
      id: 'payments-and-payouts',
      title: 'Payments and Payouts Overview',
      markdown: `Payments can be triggered via hosted links, API calls, or embedded forms. The API layer issues reference IDs, monitors confirmations, and pushes webhook notifications so your backend can mark invoices paid. On the outflow side, the payout workspace lets operators or automations send funds to saved beneficiaries across supported chains. Role-based approvals and OTP-backed verification gates keep high-risk transfers safe. Both flows share the same logging and analytics surfaces, so ops teams see the full lifecycle from deposit through settlement or disbursement.`,
      sources: [
        {
          id: 'features/payment-links',
          path: 'features/payment-links.md',
          url: 'https://docs.payram.com/features/payment-links',
        },
        {
          id: 'features/payment-apis',
          path: 'features/payment-apis.md',
          url: 'https://docs.payram.com/features/payment-apis',
        },
        {
          id: 'features/payouts',
          path: 'features/payouts.md',
          url: 'https://docs.payram.com/features/payouts',
        },
      ],
    },
    {
      id: 'multi-chain',
      title: 'Multi-currency & Network Support',
      markdown: `Out of the box Payram handles BTC, ETH, USDT, USDC, and TRX across Bitcoin, Ethereum, Base, and Tron, with Solana and TON on the near-term roadmap. Merchants can quote in USD terms while letting customers settle in their preferred asset and chain. Because everything is self-hosted, you can plug in additional RPC providers or set different confirmation thresholds per asset. The same REST and webhook flows work regardless of currency, so your integration effort stays constant.`,
      sources: [
        {
          id: 'features/multi-currency-and-multi-chain-support',
          path: 'features/multi-currency-and-multi-chain-support.md',
          url: 'https://docs.payram.com/features/multi-currency-and-multi-chain-support',
        },
        {
          id: 'faqs/general-faqs',
          path: 'faqs/general-faqs.md',
          url: 'https://docs.payram.com/faqs/general-faqs',
        },
      ],
    },
    {
      id: 'operator-checklist',
      title: 'Operator Checklist',
      markdown: `1. Install Payram on a server with minimum 2 CPU / 6 GB RAM (recommended 4 CPU / 8 GB RAM) and 100 GB SSD.\n2. Configure node connections and master accounts for the chains you plan to accept.\n3. Test on testnet or a staging environment, then switch configs to production once satisfied.`,
      sources: [
        {
          id: 'faqs/general-faqs',
          path: 'faqs/general-faqs.md',
          url: 'https://docs.payram.com/faqs/general-faqs',
        },
        {
          id: 'features/user-management',
          path: 'features/user-management.md',
          url: 'https://docs.payram.com/features/user-management',
        },
      ],
    },
    {
      id: 'fiat-onramp',
      title: 'Fiat Onramp / Card-to-Crypto',
      markdown: `PayRam supports fiat onramp via **TransFi** (third-party partner) — not direct card processing.

**Requirements:**
- **Mainnet only** — not available on testnet
- **TransFi KYB required** — merchants complete KYB with TransFi and obtain an API key
- **Dashboard required** — API key added via Settings > Payment Channels
- **Cannot be enabled via agent/CLI** — requires web dashboard

Once activated, customers see TransFi as a payment option and can pay with credit/debit cards. Crypto settles in the merchant's deposit wallet.`,
      sources: [
        {
          id: 'features/fiat-onramp',
          path: 'features/fiat-onramp.md',
          url: 'https://docs.payram.com/features/fiat-onramp',
        },
      ],
    },
  ],
  notes:
    'Curated overview based on Payram welcome, feature, and FAQ docs. See docs.payram.com for the unabridged references.',
};
