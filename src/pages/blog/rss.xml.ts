export const prerender = false;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getBlogPosts } from '../../lib/sanity';

const SITE_URL = 'https://www.hedgeflows.com';

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  // Markdown posts
  const mdEntries = await getCollection('blog');
  const mdItems = mdEntries.map((entry) => ({
    title: entry.data.title,
    slug: entry.data.slug,
    description: entry.data.description || '',
    date: entry.data.date,
  }));

  // Sanity posts
  let sanityItems: typeof mdItems = [];
  try {
    const raw = await getBlogPosts();
    if (raw && raw.length > 0) {
      sanityItems = raw.map((post: any) => ({
        title: post.title || '',
        slug: post.slug?.current || '',
        description: post.excerpt || '',
        date: post.publishedAt || new Date().toISOString(),
      })).filter((p: any) => p.slug);
    }
  } catch {
    // Sanity unavailable — use markdown only
  }

  const allItems = [...mdItems, ...sanityItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HedgeFlows Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Insights on treasury, FX risk management, and international finance from HedgeFlows.</description>
    <language>en-gb</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${allItems.map((item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}/blog/${escapeXml(item.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(item.slug)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`).join('\n    ')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
