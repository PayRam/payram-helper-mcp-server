import { z } from 'zod';

export interface DocSourceRef {
  id: string;
  path: string;
  url?: string;
}

const docSourceRefSchema = z.object({
  id: z.string(),
  path: z.string(),
  url: z.string().url().optional(),
});

export const markdownSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  markdown: z.string(),
  sources: z.array(docSourceRefSchema),
});

export type MarkdownSection = z.infer<typeof markdownSectionSchema>;

export const markdownDocResponseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  sections: z.array(markdownSectionSchema),
  notes: z.string().optional(),
});

export type MarkdownDocResponse = z.infer<typeof markdownDocResponseSchema>;
