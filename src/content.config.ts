import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const expertiseCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/expertise' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    capIndex: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    ctaCopy: z.string(),
    order: z.number(),
  }),
});

const successCasesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/success-cases' }),
  schema: z.object({
    index: z.string(),
    client: z.string(),
    industry: z.string(),
    challenge: z.string(),
    metric: z.string(),
    metricLabel: z.string(),
    result: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = {
  pages: pagesCollection,
  expertise: expertiseCollection,
  successCases: successCasesCollection,
};
