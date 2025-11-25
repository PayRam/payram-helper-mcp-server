import { MarkdownDocResponse } from '../../../types/context.js';

export const PAYRAM_CONCEPTS_DOC: MarkdownDocResponse = {
  title: 'Core Payram Concepts',
  description:
    'Glossary-backed definitions for common terms merchants encounter while running Payram.',
  sections: [
    {
      id: 'wallet-roles',
      title: 'Wallet Roles',
      markdown: `- **Deposit wallet:** Unique address created per customer (and optionally per asset). Customers can reuse it for lifetime payments, making attribution trivial.\n- **Hot wallet:** EOA funded with gas so sweeps can execute. Keep a minimum balance or SmartSweep pauses.\n- **Cold wallet:** Merchant treasury vault where swept funds rest. Not exposed to customers and typically sits in hardened custody.\n- **Master account:** Derives every deposit wallet inside a network family; also signs deployment transactions for sweep contracts.`,
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
      markdown: `SmartSweep contracts move balances from deposit wallets into the cold wallet without sharing private keys with the server. Thresholds are configurable, each sweep is logged, and operators can monitor runs inside the dashboard. Automating sweeps reduces operational toil and gas costs compared to manual transfers.`,
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
      markdown: `Install Payram on infrastructure you control (4 CPU / 4 GB RAM / 50 GB SSD minimum). After running the install script, complete onboarding: connect wallets, configure SMTP for OTPs, and invite teammates with least privilege. Because the stack is self-hosted, you own compliance and uptime responsibilities but also keep every key on-prem.`,
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
