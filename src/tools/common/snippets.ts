export interface SnippetContext {
  framework: string;
  language: string;
  useSdk: boolean;
  defaultCurrency?: string;
  defaultBlockchainCode?: string;
}

export interface SnippetResult extends Record<string, unknown> {
  code: string;
  notes: string;
}

export type SnippetGenerator = (context: SnippetContext) => SnippetResult;

export const buildSnippetNotes = (context: SnippetContext, extra: string): string => {
  const hints: string[] = ['Requires PAYRAM_BASE_URL and PAYRAM_API_KEY env vars.'];

  if (context.defaultCurrency) {
    hints.push(`Default currency hint: ${context.defaultCurrency}.`);
  }

  if (context.defaultBlockchainCode) {
    hints.push(`Preferred chain hint: ${context.defaultBlockchainCode}.`);
  }

  hints.push(extra);
  return hints.join(' ');
};
