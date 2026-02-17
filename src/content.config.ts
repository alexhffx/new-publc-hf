import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ------------------------------------------------------------------
   Blog — Markdown content collection (historical HubSpot posts)
   New posts continue via Sanity and are merged at the page level.
   ------------------------------------------------------------------ */
const blogMarkdown = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional().default(''),
    date: z.string(),                          // ISO date string
    updated: z.string().optional(),
    author: z.string().optional().default('HedgeFlows'),
    category: z.enum([
      'fx-risk-hedging',
      'treasury-cash',
      'payments-ops',
      'markets',
      'news',
    ]),
    tags: z.array(z.string()).optional().default([]),
    pillar: z.string().optional(),
    industry: z.string().optional(),
    featuredImage: z.string().optional(),
    seoTitle: z.string().optional(),
  }),
});

export const collections = { blog: blogMarkdown };
