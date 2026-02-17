#!/usr/bin/env node
/**
 * Fix edge-case posts that the main migration script couldn't handle:
 * 1. smes-challenges-international-trade-money20/20 (subdirectory slug)
 * 2. the-question-not-to-ask (empty body in export — create placeholder)
 */

import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import TurndownService from 'turndown';

const OUT_DIR = path.resolve('src/content/blog');

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
td.addRule('remove-hubspot-widgets', {
  filter: (node) => {
    const tag = node.tagName?.toLowerCase();
    if (['script', 'style', 'iframe', 'noscript', 'form'].includes(tag)) return true;
    if (tag === 'a' && node.classList?.contains('hs-button')) return true;
    if (tag === 'div' && node.id?.startsWith('hs_cos_wrapper_widget')) return true;
    return false;
  },
  replacement: () => '',
});
td.addRule('strip-styled-spans', {
  filter: (node) => {
    if (node.tagName?.toLowerCase() !== 'span') return false;
    const style = node.getAttribute('style') || '';
    if (style.includes('font-weight: bold')) return false;
    if (style.includes('color:')) return true;
    return false;
  },
  replacement: (content) => content,
});

function extractAndWrite(htmlPath, outputSlug, category) {
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const $ = load(html);

  // Title — prefer JSON-LD headline, then og:title, then <title>
  const jsonLdScript = $('script[type="application/ld+json"]').html();
  let jsonLdTitle = '';
  if (jsonLdScript) {
    try { jsonLdTitle = JSON.parse(jsonLdScript).headline || ''; } catch {}
  }
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
  let title = jsonLdTitle || ogTitle || $('title').text().trim();
  title = title.replace(/\s*[|–—-]\s*HedgeFlows.*$/i, '').trim();
  title = title.replace(/Follow\s+me\s+on\s+LinkedIn\s*/gi, '').trim();

  // Description
  const description = $('meta[name="description"]').attr('content')?.trim() || '';

  // Featured image
  const featuredImage = $('meta[property="og:image"]').attr('content') || '';

  // JSON-LD metadata
  let author = 'HedgeFlows';
  let datePublished = '';
  let dateModified = '';
  const jsonLd = $('script[type="application/ld+json"]').html();
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd);
      author = data.author?.name || 'HedgeFlows';
      datePublished = data.datePublished || '';
      dateModified = data.dateModified || '';
    } catch { /* ignore */ }
  }

  // Body
  const wrapper = $('#hs_cos_wrapper_post_body');
  wrapper.find('[class*="hs_cos_wrapper_widget"]').remove();
  wrapper.find('a.hs-button').remove();
  wrapper.find('script').remove();
  wrapper.find('style').remove();
  const bodyHtml = wrapper.html() || '';

  let md = '';
  if (bodyHtml.trim()) {
    md = td.turndown(bodyHtml);
    // Fix internal links
    md = md.replace(/\((?:\.\.\/)*com\/hedgeflows\/blog\/glossary\/([^)]+?)\.html\)/g, '(/glossary/$1)');
    md = md.replace(/\((?:\.\.\/)*com\/hedgeflows\/blog\/([^)]+?)\.html\)/g, '(/blog/$1)');
    md = md.replace(/\(https?:\/\/blog\.hedgeflows\.com\/([^)]+?)\)/g, (match, p1) => {
      const clean = p1.replace(/\.html$/, '');
      if (clean.startsWith('glossary/')) return `(/glossary/${clean.replace('glossary/', '')})`;
      return `(/blog/${clean})`;
    });
    md = md.replace(/\[([^\]]*)\]\(\s*\)/g, '$1');
    md = md.replace(/\n{4,}/g, '\n\n\n');
    md = md.replace(/[ \t]+$/gm, '');
    md = md.replace(/<!--.*?-->/gs, '');
    md = md.trim();
  }

  const date = datePublished ? new Date(datePublished).toISOString().split('T')[0] : '';
  const updated = dateModified ? new Date(dateModified).toISOString().split('T')[0] : '';

  const esc = (s) => (s || '').replace(/"/g, '\\"');

  const lines = [
    '---',
    `title: "${esc(title)}"`,
    `slug: "${outputSlug}"`,
    `description: "${esc(description)}"`,
    `date: "${date}"`,
  ];
  if (updated && updated !== date) lines.push(`updated: "${updated}"`);
  lines.push(`author: "${esc(author)}"`);
  lines.push(`category: "${category}"`);
  if (featuredImage) lines.push(`featuredImage: "${esc(featuredImage)}"`);
  lines.push('---');

  const output = lines.join('\n') + '\n\n' + (md || '*Content to be added.*') + '\n';
  const outPath = path.join(OUT_DIR, `${outputSlug}.md`);
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`Wrote ${outputSlug}.md (body: ${md.length} chars)`);
}

// 1. Money20/20 post
extractAndWrite(
  '/tmp/hubspot-export/com/hedgeflows/blog/smes-challenges-international-trade-money20/20.html',
  'smes-challenges-international-trade-money2020',
  'markets'
);

// 2. The question not to ask (empty body — will produce placeholder)
extractAndWrite(
  '/tmp/hubspot-export/com/hedgeflows/blog/the-question-not-to-ask.html',
  'the-question-not-to-ask',
  'markets'
);

console.log('Done!');
