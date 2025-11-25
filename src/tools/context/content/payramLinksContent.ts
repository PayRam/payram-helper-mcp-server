import { MarkdownDocResponse } from '../../../types/context.js';

export const PAYRAM_LINKS_DOC: MarkdownDocResponse = {
  title: 'Payram Links',
  description: 'Official resources for docs, support, and community touchpoints.',
  sections: [
    {
      id: 'official-links',
      title: 'Official Resources',
      markdown: `- **Docs:** https://docs.payram.com/\n- **Website:** https://payram.com/\n- **X (Twitter):** https://x.com/PayRamApp\n- **LinkedIn:** https://www.linkedin.com/company/payram-app\n- **YouTube:** https://www.youtube.com/@payramapp`,
      sources: [
        {
          id: 'support/important-links',
          path: 'support/important-links.md',
          url: 'https://docs.payram.com/support/important-links',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact & Support',
      markdown: `- **Contact support form:** https://payram.short.gy/payram-gitbook-contact\n- **Community DMs:** Reach the team via @PayRamApp on X for quick escalations.`,
      sources: [
        {
          id: 'welcome_to_payram',
          path: 'welcome_to_payram.md',
          url: 'https://docs.payram.com/welcome_to_payram',
        },
      ],
    },
  ],
  notes: 'Share these when a teammate needs the canonical Payram entry points.',
};
