import { MarkdownDocResponse } from '../../../types/context.js';

export const REFERRALS_BASICS_DOC: MarkdownDocResponse = {
  title: 'Referral Basics',
  description: 'How Payram referral campaigns are structured, staffed, and secured.',
  sections: [
    {
      id: 'campaign-setup',
      title: 'Campaign Setup',
      markdown: `1. In the dashboard go to **Growth → Campaigns → Create New Campaign**.\n2. Define campaign metadata (name, budget, validity window) and choose which events unlock rewards.\n3. Saving the campaign generates an \`event_key\` you will use later when logging conversions.\n4. Tie the campaign to a project so payouts, wallets, and analytics stay scoped.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'roles-and-permissions',
      title: 'Roles & Permissions',
      markdown: `Referral programs are typically owned by the **Platform Referral Admin** role. Admins can grant this role under Settings → User Management. Platform Referral Admins get full access to configure referral APIs, manage campaigns, and review performance dashboards without touching payouts or node settings.`,
      sources: [
        {
          id: 'features/user-management',
          path: 'features/user-management.md',
          url: 'https://docs.payram.com/features/user-management',
        },
      ],
    },
    {
      id: 'integration-building-blocks',
      title: 'Integration Building Blocks',
      markdown: `- **Referral dashboard iframe:** Embed Payram's hosted dashboard by requesting an iframe URL from the referral-auth API, then mounting it in your app.\n- **Referrer codes:** Distribute Payram-issued codes or store your own and map them to Payram campaign IDs.\n- **Referee API:** When a new user signs up with a referral code, call \`POST /api/v1/referral/referee\` with their contact info, the referrer code, and a unique \`referenceId\`.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'security-considerations',
      title: 'Security Considerations',
      markdown: `- Keep API keys scoped per project so referral automations cannot touch payment funds.\n- Require OTP approvals (via SMTP) for any payout workflows that reward referrers.\n- Store reference IDs server-side so you can reconcile reward disputes without exposing customer PII in logs.`,
      sources: [
        {
          id: 'features/payouts',
          path: 'features/payouts.md',
          url: 'https://docs.payram.com/features/payouts',
        },
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
  ],
  notes:
    'Summarizes the referral primitives so growth teams can move quickly without rereading the full FAQ.',
};
