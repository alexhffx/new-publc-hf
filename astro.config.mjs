import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

// Collect blog post slugs from markdown content at build time
// (SSR blog pages are excluded from sitemap auto-discovery)
function getBlogPostUrls() {
  const siteUrl = 'https://www.hedgeflows.com';
  try {
    const dir = join(process.cwd(), 'src/content/blog');
    const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
    return files.map((file) => {
      const content = readFileSync(join(dir, file), 'utf-8');
      const match = content.match(/^slug:\s+"?([^"\n]+)"?/m);
      return match ? `${siteUrl}/blog/${match[1].trim()}/` : null;
    }).filter(Boolean);
  } catch {
    return [];
  }
}

export default defineConfig({
  site: 'https://www.hedgeflows.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      customPages: getBlogPostUrls(),
    }),
    react(),
  ],
  vite: {
    server: {
      fs: {
        allow: ['../..'],
      },
    },
  },
});
