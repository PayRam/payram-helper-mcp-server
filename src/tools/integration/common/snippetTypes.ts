export type SupportedLanguage = 'typescript' | 'javascript' | 'python' | 'go' | 'php' | 'java';

// TODO: Re-introduce fastapi/gin/laravel/spring-boot once we ship snippets for them.
export type SupportedBackendFramework = 'node-generic' | 'express' | 'nextjs' | 'generic-http';

export interface SnippetMeta {
  language: SupportedLanguage;
  framework: SupportedBackendFramework;
  filenameSuggestion?: string;
  description?: string;
}

export interface SnippetResponse {
  title: string;
  snippet: string;
  meta: SnippetMeta;
  notes?: string;
}
