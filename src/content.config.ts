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

/* ------------------------------------------------------------------
   Glossary — Markdown content collection (migrated from HubSpot)
   Future entries can also be added via Sanity and merged at page level.
   ------------------------------------------------------------------ */
const glossaryMarkdown = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    slug: z.string(),
    definition: z.string().optional().default(''),   // Short definition for index page
    category: z.enum([
      'fx-fundamentals',
      'hedging-instruments',
      'risk-concepts',
      'payments-operations',
      'accounting-finance',
      'market-structure',
    ]).optional(),
    relatedTerms: z.array(z.string()).optional().default([]),  // Slugs
    relatedBlogPosts: z.array(z.string()).optional().default([]),
    relatedAcademyModule: z.string().optional(),
    seoDescription: z.string().optional(),
    lastUpdated: z.string().optional(),
  }),
});

export const collections = {
  blog: blogMarkdown,
  glossary: glossaryMarkdown,
};
