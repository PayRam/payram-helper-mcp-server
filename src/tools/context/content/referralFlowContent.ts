import { MarkdownDocResponse } from '../../../types/context.js';

export const REFERRAL_FLOW_DOC: MarkdownDocResponse = {
  title: 'Referral Flow Guide',
  description: 'Step-by-step walkthrough of how referrers, referees, and reward events interact.',
  sections: [
    {
      id: 'embed-dashboard',
      title: 'Embed the Dashboard',
      markdown: `Use the referral-auth API to fetch an iframe URL scoped to the logged-in user. Embed it wherever your community accesses perks—typically an in-app \`/rewards\` page. The iframe surfaces each referrer's unique link, code, and reward ledger so you do not rebuild that UI.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'link-referee',
      title: 'Link the Referee',
      markdown: `When someone signs up with a referral code, call \`POST /api/v1/referral/referee\` with: \n- \`referrerCode\` (or ID)\n- \`refereeEmail\` and any profile metadata\n- \`referenceId\`, a unique identifier you can later correlate with payment or KYC records\nThis attaches the new user to the campaign so future events can assign the right rewards.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'log-events',
      title: 'Log Rewardable Events',
      markdown: `Whenever a tracked action happens—first successful payment, balance threshold, subscription renewal—call \`POST /api/v1/referral/event-log\`. Include the campaign's \`eventKey\`, the referee's \`referenceId\`, and (optionally) an \`amount\`. Payram records the event, checks the campaign rules, and queues any incentives owed to either party.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
      ],
    },
    {
      id: 'reward-settlement',
      title: 'Reward Settlement',
      markdown: `Rewards can be surfaced inside the referral dashboard or exported to your accounting stack. Payouts still run through the standard approvals and OTP gates defined under the payouts workspace, so growth teams cannot move funds without finance sign-off.`,
      sources: [
        {
          id: 'faqs/referral-faqs',
          path: 'faqs/referral-faqs.md',
          url: 'https://docs.payram.com/faqs/referral-faqs',
        },
        {
          id: 'features/payouts',
          path: 'features/payouts.md',
          url: 'https://docs.payram.com/features/payouts',
        },
      ],
    },
  ],
  notes:
    'Reference this when wiring the API calls that power the embedded referral dashboard and reward logic.',
};
