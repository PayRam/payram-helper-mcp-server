import { MarkdownDocResponse } from '../../../types/context.js';

export const REFERRAL_DASHBOARD_DOC: MarkdownDocResponse = {
  title: 'Referral Dashboard Guide',
  description: 'How to embed, customize, and operate the Payram referral dashboard experience.',
  sections: [
    {
      id: 'embedding',
      title: 'Embedding the Dashboard',
      markdown: `1. Authenticate your frontend against your backend (session or token).\n2. Your backend calls the referral-auth endpoint to fetch an iframe URL scoped to the user.\n3. Render an \`<iframe>\` pointing to that URL inside your app portal.\n4. Resize responsively—Payram's widget is mobile-friendly and theme-aware.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'what-users-see',
      title: 'What Referrers See',
      markdown: `- Personal referral link and code\n- Campaign-specific milestones and pending rewards\n- Activity feed of referees and logged events\n- Guidance on how to earn more (auto-populated from your campaign config)`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'admin-controls',
      title: 'Admin Controls',
      markdown: `Platform Referral Admins can:\n- Pause or edit campaigns without redeploying the widget\n- Download CSVs of referral performance\n- Approve or deny flagged events before they issue rewards\n- Configure webhook targets so downstream CRMs stay in sync`,
      sources: [
        {
          id: 'features/user-management',
          path: 'features/user-management.md',
          url: 'https://docs.payram.com/features/user-management',
        },
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'embedding-tips',
      title: 'Implementation Tips',
      markdown: `- Host the iframe under HTTPS to avoid browser blocking.\n- Wrap it with skeleton UI while your backend fetches the auth token.\n- Pair the dashboard with contextual docs or FAQs so advocates know the rules.\n- Log iframe load errors so support can troubleshoot campaigns quickly.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
  ],
  notes:
    'Use this as the internal runbook when growth or partner teams need the referral dashboard embedded.',
};
