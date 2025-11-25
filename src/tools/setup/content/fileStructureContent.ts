import type { FileStructureResponse } from '../../../types/setup.js';

export const PAYRAM_FILE_STRUCTURE: FileStructureResponse = {
  title: 'Recommended Payram Backend Structure',
  description:
    'Opinionated layout for merchants wiring Payram into a Node/TypeScript backend; adapt paths to match your framework.',
  root: {
    path: 'src',
    type: 'folder',
    description:
      'Application source. Payram-specific logic lives under src/payram to keep responsibilities isolated.',
    children: [
      {
        path: 'src/config',
        type: 'folder',
        description: 'Centralized configuration parsing and validation.',
        children: [
          {
            path: 'src/config/env.ts',
            type: 'file',
            description:
              'Loads .env, validates required PAYRAM_* variables, and exports typed config objects.',
          },
          {
            path: 'src/config/networks.ts',
            type: 'file',
            description:
              'Declares supported networks / RPC endpoints so business code does not hardcode URLs.',
          },
        ],
      },
      {
        path: 'src/payram',
        type: 'folder',
        description: 'Dedicated integration layer for Payram SDK + REST helpers.',
        children: [
          {
            path: 'src/payram/client.ts',
            type: 'file',
            description:
              'Configures the Payram SDK instance using typed config + exposes helper methods.',
          },
          {
            path: 'src/payram/routes',
            type: 'folder',
            description:
              'Transport-specific adapters (Express/Fastify/etc.) that expose Payram flows to clients.',
            children: [
              {
                path: 'src/payram/routes/payments.ts',
                type: 'file',
                description: 'Handles payment intent creation, payment links, and status webhooks.',
              },
              {
                path: 'src/payram/routes/payouts.ts',
                type: 'file',
                description: 'Surfaces payout review + execution endpoints guarded by OTP checks.',
              },
              {
                path: 'src/payram/routes/referrals.ts',
                type: 'file',
                description: 'Future-friendly route file for referral dashboards/API wiring.',
              },
            ],
          },
          {
            path: 'src/payram/webhooks',
            type: 'folder',
            description:
              'Webhook handlers fan-out events into your domain (billing, CRM, fulfillment).',
            children: [
              {
                path: 'src/payram/webhooks/payram.ts',
                type: 'file',
                description:
                  'Verifies signatures and dispatches Payram webhook events to business logic.',
              },
            ],
          },
          {
            path: 'src/payram/services',
            type: 'folder',
            description: 'Domain services orchestrating deposits, sweeps, and treasury moves.',
            children: [
              {
                path: 'src/payram/services/funds.ts',
                type: 'file',
                description:
                  'Contains SmartSweep triggers, cold-wallet notifications, and monitoring hooks.',
              },
            ],
          },
        ],
      },
      {
        path: 'src/lib',
        type: 'folder',
        description:
          'Shared utilities (logging, metrics, error helpers) reused by Payram + other modules.',
      },
      {
        path: 'tests/payram',
        type: 'folder',
        description: 'Integration or contract tests that hit Payram sandbox/staging environments.',
        children: [
          {
            path: 'tests/payram/payments.test.ts',
            type: 'file',
            description:
              'Covers the happy path for hosted links + API payments using mock webhooks.',
          },
          {
            path: 'tests/payram/payouts.test.ts',
            type: 'file',
            description: 'Ensures payout approval flows are wired with OTP + role enforcement.',
          },
        ],
      },
    ],
  },
  notes:
    'Pair this structure with the MCP snippets for payments/payouts so every integration step has a clean home. Adjust naming to match your framework, but keep config + Payram code scoped for easier audits.',
};
