import { MarkdownDocResponse } from '../../../types/context.js';

export const PAYMENT_FLOW_DOC: MarkdownDocResponse = {
  title: 'Payment Flow Guide',
  description:
    'End-to-end look at how Payram handles inbound payments, confirmations, and settlement.',
  sections: [
    {
      id: 'lifecycle',
      title: 'Lifecycle Overview',
      markdown: `1. **Create an intent** via API, payment link, or dashboard. Each intent includes a customer identifier, amount, and target currency.\n2. **Assign deposit details.** Customers either receive a reusable deposit wallet or a one-time checkout link with QR, supported assets, and network picker.\n3. **Monitor the chain.** Payram watches the specified address until the configured confirmation threshold hits, then marks the payment as successful.\n4. **Trigger webhooks or polling.** Your backend receives a webhook with the reference ID and status so invoices can be closed automatically.\n5. **Sweep funds.** SmartSweep consolidates the balance from deposit wallets to your cold wallet to prep for payouts or treasury storage.`,
      sources: [
        {
          id: 'features/payment-apis',
          path: 'features/payment-apis.md',
          url: 'https://docs.payram.com/features/payment-apis',
        },
        {
          id: 'features/payment-links',
          path: 'features/payment-links.md',
          url: 'https://docs.payram.com/features/payment-links',
        },
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
      ],
    },
    {
      id: 'integration-steps',
      title: 'Integration Steps',
      markdown: `- **Backend API:** Use the payments API or SDK to call \`POST /api/v1/payment\`, then store the \`reference_id\` returned.\n- **Client Handoff:** Share the checkout URL or embed the widget; Payram hosts the onchain instructions so you do not expose private keys.\n- **Webhooks:** Subscribe to events like \`payment.confirmed\` to keep systems in sync without polling.\n- **Error handling:** Under or over-payments remain pending until you reconcile. Provide retry UX or manual intervention paths in your app.`,
      sources: [
        {
          id: 'api-integration/payments-api',
          path: 'api-integration/payments-api.md',
          url: 'https://docs.payram.com/api-integration/payments-api',
        },
        {
          id: 'faqs/general-faqs',
          path: 'faqs/general-faqs.md',
          url: 'https://docs.payram.com/faqs/general-faqs',
        },
      ],
    },
    {
      id: 'customer-experience',
      title: 'Customer Experience Tips',
      markdown: `- Offer multiple assets and networks for better conversion, leaning on Payram's multi-chain support.\n- Use payment links for one-off invoices or chat commerce; deposit wallets work best for subscriptions or accounts with frequent reloads.\n- Communicate confirmation counts up-front (e.g., 1 block on Tron vs 12 on Ethereum) so customers understand timing.\n- Encourage customers to bookmark their reusable deposit address to reduce support tickets.`,
      sources: [
        {
          id: 'features/payment-links',
          path: 'features/payment-links.md',
          url: 'https://docs.payram.com/features/payment-links',
        },
        {
          id: 'features/multi-currency-and-multi-chain-support',
          path: 'features/multi-currency-and-multi-chain-support.md',
          url: 'https://docs.payram.com/features/multi-currency-and-multi-chain-support',
        },
        {
          id: 'features/customer-deposit-wallets',
          path: 'features/customer-deposit-wallets.md',
          url: 'https://docs.payram.com/features/customer-deposit-wallets',
        },
      ],
    },
  ],
  notes: 'Great for onboarding devs who need the high-level flow before diving into API specifics.',
};
