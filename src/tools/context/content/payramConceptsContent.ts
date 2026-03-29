import { MarkdownDocResponse } from '../../../types/context.js';

export const PAYRAM_CONCEPTS_DOC: MarkdownDocResponse = {
  title: 'Core Payram Concepts',
  description:
    'Glossary-backed definitions for common terms merchants encounter while running Payram.',
  sections: [
    {
      id: 'wallet-roles',
      title: 'Wallet Roles',
      markdown: `- **Deposit wallet:** Unique address created per customer (and optionally per asset). Customers can reuse it for lifetime payments, making attribution trivial.\n- **Hot wallet:** EOA funded with gas so sweeps can execute. Its private key is stored on the server (encrypted with AES-256) but it only pays gas — it has no access to customer deposit funds or cold wallet balances. Keep a minimum balance or SmartSweep pauses.\n- **Cold wallet:** Merchant treasury vault where swept funds rest. Not exposed to customers and typically sits in hardened custody.\n- **Master account:** Derives every deposit wallet inside a network family and signs deployment transactions for sweep contracts. The master wallet is the only key that can change the cold wallet address in the smart contract. It is never stored on the server — it is not needed for day-to-day operations or sweeps. Keep it offline in cold storage for maximum security.`,
      sources: [
        {
          id: 'support/glossary',
          path: 'support/glossary.md',
          url: 'https://docs.payram.com/support/glossary',
        },
      ],
    },
    {
      id: 'smart-automation',
      title: 'SmartSweep & Automation',
      markdown: `SmartSweep contracts move balances from deposit wallets into the cold wallet without sharing private keys with the server. The sweep destination is hardcoded into the smart contract at deployment — funds can only ever flow to your cold wallet. This means even a fully compromised server cannot redirect funds, because the movement logic is enforced on-chain, not by app code. Only the master wallet (kept offline, never on the server) can update the cold wallet address. Thresholds are configurable, each sweep is logged, and operators can monitor runs inside the dashboard. Automating sweeps reduces operational toil and gas costs compared to manual transfers.`,
      sources: [
        {
          id: 'features/smartsweep',
          path: 'features/smartsweep.md',
          url: 'https://docs.payram.com/features/smartsweep',
        },
      ],
    },
    {
      id: 'multi-chain-support',
      title: 'Multi-chain Support',
      markdown: `Payram handles BTC, ETH, USDT, USDC, and TRX today across Bitcoin, Ethereum, Base, and Tron, with Solana and TON planned next. A single API set orchestrates all of those so you do not branch your integration per chain. Configure confirmation counts per asset to balance speed and risk.`,
      sources: [
        {
          id: 'features/multi-currency-and-multi-chain-support',
          path: 'features/multi-currency-and-multi-chain-support.md',
          url: 'https://docs.payram.com/features/multi-currency-and-multi-chain-support',
        },
      ],
    },
    {
      id: 'deployment-fundamentals',
      title: 'Deployment Fundamentals',
      markdown: `Install Payram on infrastructure you control (minimum 2 CPU / 6 GB RAM, recommended 4 CPU / 8 GB RAM, 100 GB SSD). After running the install script, complete onboarding: connect wallets, configure SMTP for OTPs, and invite teammates with least privilege. Because the stack is self-hosted, you own compliance and uptime responsibilities but also keep every key on-prem.`,
      sources: [
        {
          id: 'faqs/general-faqs',
          path: 'faqs/general-faqs.md',
          url: 'https://docs.payram.com/faqs/general-faqs',
        },
        {
          id: 'onboarding-guide/introduction',
          path: 'onboarding-guide/introduction.md',
          url: 'https://docs.payram.com/onboarding-guide/introduction',
        },
      ],
    },
    {
      id: 'team-roles',
      title: 'Team Roles & Access',
      markdown: `Use User Management to invite Admins, Project Leads, Ops, and Platform Referral Admins. Admins govern payouts and sensitive configs, while referral admins can tune affiliate campaigns independently. Limiting who can approve payouts or edit configs is core to Payram's defense-in-depth posture.`,
      sources: [
        {
          id: 'features/user-management',
          path: 'features/user-management.md',
          url: 'https://docs.payram.com/features/user-management',
        },
      ],
    },
  ],
  notes: 'Use this glossary to orient new teammates before they dive into configuration files.',
};
