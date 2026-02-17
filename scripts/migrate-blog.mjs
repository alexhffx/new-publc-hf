#!/usr/bin/env node
/**
 * migrate-blog.mjs
 * Converts HubSpot HTML blog exports → Markdown content collection files
 * for Astro v5.  Run once:  node scripts/migrate-blog.mjs
 */

import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import TurndownService from 'turndown';

/* ============================================================
   CONFIG
   ============================================================ */
const SRC_DIR = '/tmp/hubspot-export/com/hedgeflows/blog';
const OUT_DIR = path.resolve('src/content/blog');

/* ============================================================
   INVENTORY — category & action for every slug
   Source: HedgeFlows_Content_Restructure_Spec, Section 2.2
   ============================================================ */
const INVENTORY = {
  // ── FX Risk & Hedging ──────────────────────────────────────
  'how-bad-it-can-be-fx-risks-from-currency-invoices':        { cat: 'fx-risk-hedging', action: 'KEEP' },
  'potential-savings-from-booking-fx-rates-early':             { cat: 'fx-risk-hedging', action: 'KEEP' },
  'currency-hedging-costs-and-the-value-of-protecting-smes':  { cat: 'fx-risk-hedging', action: 'REWRITE' },
  'protect-international-business-from-currency-swings':      { cat: 'fx-risk-hedging', action: 'KEEP' },
  'simpler-safer-way-to-deal-with-currency-risk':             { cat: 'fx-risk-hedging', action: 'REWRITE' },
  'whats-driving-the-markets-and-what-to-do-with-currency-risks': { cat: 'fx-risk-hedging', action: 'KEEP' },
  'how-to-deal-with-fx-uncertainty-during-volatile-markets':  { cat: 'fx-risk-hedging', action: 'KEEP' },
  'five-myths-about-foreign-currencies-that-small-businesses-often-have': { cat: 'fx-risk-hedging', action: 'KEEP' },
  'sell-worldwide-and-keep-the-predictability-of-trading-in-pounds-sterling': { cat: 'fx-risk-hedging', action: 'REWRITE' },
  'timing-your-large-currency-purchases-for-your-business':   { cat: 'fx-risk-hedging', action: 'KEEP' },
  'tantalising-allure-of-experts-for-your-currency-needs':    { cat: 'fx-risk-hedging', action: 'KEEP' },
  'managing-fx-risks-with-budget-rates-and-hedge-ratios':     { cat: 'fx-risk-hedging', action: 'KEEP' },
  'hedging-is-not-gambling':                                   { cat: 'fx-risk-hedging', action: 'KEEP' },
  'hedging-or-gambling-a-300-year-old-lesson-for-modern-fx-markets': { cat: 'fx-risk-hedging', action: 'KEEP' },
  'fx-averaging-pros-and-cons-for-your-currency-hedging':     { cat: 'fx-risk-hedging', action: 'KEEP' },
  'the-allure-and-pitfalls-of-natural-hedging':               { cat: 'fx-risk-hedging', action: 'KEEP' },
  'stuck-on-hurdle-track-towards-better-fx-management':       { cat: 'fx-risk-hedging', action: 'KEEP' },
  'fx-hedging-is-a-journey-with-a-destination':               { cat: 'fx-risk-hedging', action: 'KEEP' },
  'fx-hedging-the-seat-belt-paradox':                          { cat: 'fx-risk-hedging', action: 'KEEP' },
  'measuring-currency-risks-what-is-behind-cfar-and-its-cousins': { cat: 'fx-risk-hedging', action: 'KEEP' },
  '5-dos-and-donts-when-hedging-for-the-first-time':          { cat: 'fx-risk-hedging', action: 'KEEP' },
  'fx-gains-and-losses-and-balance-sheet-hedging':             { cat: 'fx-risk-hedging', action: 'KEEP' },
  'how-to-deal-with-foreign-currency-risks-when-raising-capital-overseas': { cat: 'fx-risk-hedging', action: 'KEEP' },
  'the-fx-blindspot-costing-millions-in-budget-planning':     { cat: 'fx-risk-hedging', action: 'KEEP' },
  'fx-uncertainty-why-financial-planning-treasury-must-work-hand-in-hand': { cat: 'fx-risk-hedging', action: 'KEEP' },
  'the-cfos-guide-to-choosing-fx-providers-banks-vs-brokers-vs-fintechs': { cat: 'fx-risk-hedging', action: 'KEEP' },

  // ── Treasury & Cash Management ─────────────────────────────
  'business-planning-and-projects-in-foreign-currencies':      { cat: 'treasury-cash', action: 'KEEP' },
  'how-to-manage-your-international-business-finances-in-one-currency': { cat: 'treasury-cash', action: 'REWRITE' },
  'foreign-currency-gains-and-losses-in-xero-explained':      { cat: 'treasury-cash', action: 'KEEP' },
  'foreign-invoices-and-receipts-in-pound-sterling':           { cat: 'treasury-cash', action: 'KEEP' },
  'cash-management-for-growing-businesses':                    { cat: 'treasury-cash', action: 'KEEP' },
  'real-time-reconciliations-the-cornerstone-of-financial-growth-and-security': { cat: 'treasury-cash', action: 'KEEP' },
  'modern-cash-management-new-tools-strategies':               { cat: 'treasury-cash', action: 'KEEP' },
  'how-successful-cfos-manage-international-growth':           { cat: 'treasury-cash', action: 'KEEP' },
  'driving-blind-managing-finances-through-the-rear-view-mirror': { cat: 'treasury-cash', action: 'KEEP' },
  'is-your-accounting-full-stack-vs-app-stack':                { cat: 'treasury-cash', action: 'KEEP' },
  'finance-leader-themes-for-2025':                            { cat: 'treasury-cash', action: 'KEEP' },

  // ── Accountant-focused (sub of treasury-cash) ──────────────
  '5-questions-accountants-should-ask-clients-about-their-foreign-trade': { cat: 'treasury-cash', action: 'KEEP' },
  'how-technology-and-accountants-can-help-small-businesses-in-a-vuca-world': { cat: 'treasury-cash', action: 'KEEP' },
  'efficient-currency-management-for-accountants':             { cat: 'treasury-cash', action: 'KEEP' },

  // ── Payments & Operations ──────────────────────────────────
  'how-to-process-international-business-payments-faster':     { cat: 'payments-ops', action: 'REWRITE' },
  'fx-international-payments-tracking-guide':                  { cat: 'payments-ops', action: 'KEEP' },
  'fx-international-payments-fees-explained':                  { cat: 'payments-ops', action: 'KEEP' },
  'why-are-international-payments-still-broken-for-smes':      { cat: 'payments-ops', action: 'KEEP' },
  'five-ways-to-streamline-the-accounts-payable-process':      { cat: 'payments-ops', action: 'KEEP' },
  'five-trends-changing-international-business-payments':       { cat: 'payments-ops', action: 'KEEP' },
  'buyers-guide-to-ap-automation':                              { cat: 'payments-ops', action: 'KEEP' },
  'dos-donts-of-payment-runs':                                  { cat: 'payments-ops', action: 'KEEP' },
  'managing-reputational-risk-with-efficient-payment-runs':     { cat: 'payments-ops', action: 'KEEP' },
  'virtual-wallets-and-payment-automation-solutions':           { cat: 'payments-ops', action: 'REWRITE' },
  'international-payments-fraud':                               { cat: 'payments-ops', action: 'KEEP' },
  'new-insights-into-global-payment-fraud':                     { cat: 'payments-ops', action: 'KEEP' },
  'how-to-save-money-and-time-with-your-international-business-payments': { cat: 'payments-ops', action: 'REWRITE' },
  'top-5-mistakes-businesses-make-with-international-transfers': { cat: 'payments-ops', action: 'KEEP' },
  'top-5-strategies-to-control-costs-in-cross-border-finance-operations': { cat: 'payments-ops', action: 'KEEP' },
  'payment-automation-solutions-2025-technology-guide':          { cat: 'payments-ops', action: 'KEEP' },
  'the-cost-of-doing-business-across-borders':                   { cat: 'payments-ops', action: 'KEEP' },
  'beyond-hidden-fees-a-closer-look-at-smes-loss':              { cat: 'payments-ops', action: 'KEEP' },

  // ── E-Commerce focused (sub of payments-ops) ──────────────
  'maximising-the-benefits-of-multi-currency-pricing-on-shopify': { cat: 'payments-ops', action: 'KEEP' },
  'how-to-grow-your-business-internationally':                    { cat: 'payments-ops', action: 'REWRITE' },
  'winning-with-fintech-toolkit':                                 { cat: 'payments-ops', action: 'KEEP' },
  'growing-bamboo-international-finances':                        { cat: 'payments-ops', action: 'KEEP' },

  // ── Market Commentary ──────────────────────────────────────
  'seeing-through-clouds-low-pressure-economy-ahead':          { cat: 'markets', action: 'KEEP' },
  'uk-plc':                                                     { cat: 'markets', action: 'KEEP' },
  'the-question-not-to-ask':                                    { cat: 'markets', action: 'KEEP' },
  'international-finances-common-problems-smes-2022':           { cat: 'markets', action: 'RETIRE' },
  'smes-challenges-international-trade-money20/20':             { cat: 'markets', action: 'KEEP' },
  'from-tariffs-to-fx-wars-what-cfos-need-to-know-about-trumps-next-move': { cat: 'markets', action: 'KEEP' },
  'trump-2.0-early-signs-for-uk-cfos':                          { cat: 'markets', action: 'KEEP' },
  'what-cfos-should-know-about-the-shifting-role-of-the-us-dollar': { cat: 'markets', action: 'KEEP' },
  'what-july-taught-us-about-global-trade-and-why-currency-uncertainty-is-here-to-stay': { cat: 'markets', action: 'KEEP' },
  'what-will-drive-fx-rates-tariffs-or-mar-o-lago-accord':     { cat: 'markets', action: 'KEEP' },
  'trade-war-can-hurt-software-service-businesses-too':         { cat: 'markets', action: 'KEEP' },

  // ── Company News ───────────────────────────────────────────
  'best-innovation-business-awards':                            { cat: 'news', action: 'KEEP' },
  'hedgeflows-join-barclays-rga':                               { cat: 'news', action: 'KEEP' },
  'hedgeflows-joins-xero-marketplace-to-help-smes-grow-internationally': { cat: 'news', action: 'KEEP' },
  'hedgeflows-wins-tmi-award-for-innovation-treasury-management-solutions': { cat: 'news', action: 'KEEP' },
  'managing-fx-risks-with-budget-rates-and-hedge-ratios-0':    { cat: 'news', action: 'KEEP', newSlug: 'hedgeflows-travelex-partnership' },
  'streamlining-international-business':                        { cat: 'news', action: 'RETIRE' },
  'save-on-shopify-payouts-with-hedgeflows':                    { cat: 'news', action: 'RETIRE' },

  // ── Xero-focused ───────────────────────────────────────────
  'a-guide-to-xero-batch-payments':                             { cat: 'payments-ops', action: 'KEEP' },
  'the-ultimate-faq-guide-to-xero-bulk-payments':               { cat: 'payments-ops', action: 'MERGE', mergeInto: 'a-guide-to-xero-batch-payments' },
  'a-guide-to-xero-batch-payments-3':                           { cat: 'payments-ops', action: 'RETIRE' },
  'a-guide-to-xero-batch-payments-0-0':                         { cat: 'payments-ops', action: 'RETIRE' },

  // ── AI & Technology ────────────────────────────────────────
  'ai-for-treasury-and-finance':                                { cat: 'treasury-cash', action: 'KEEP' },
  'why-ai-in-finance-is-following-the-same-bumpy-road-as-autonomous-vehicles': { cat: 'treasury-cash', action: 'KEEP' },
  'why-clear-language-and-better-ux-matter-in-finance':         { cat: 'treasury-cash', action: 'KEEP' },
  'why-financial-services-remain-frustratingly-hard-to-navigate-a-30-year-perspective': { cat: 'treasury-cash', action: 'KEEP' },
};

/* ============================================================
   SETUP TURNDOWN
   ============================================================ */
const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  hr: '---',
});

// Remove HubSpot CTA buttons / modules / iframes / scripts
td.addRule('remove-hubspot-widgets', {
  filter: (node) => {
    const tag = node.tagName?.toLowerCase();
    if (['script', 'style', 'iframe', 'noscript', 'form'].includes(tag)) return true;
    // HubSpot CTA links
    if (tag === 'a' && node.classList?.contains('hs-button')) return true;
    if (tag === 'div' && node.id?.startsWith('hs_cos_wrapper_widget')) return true;
    return false;
  },
  replacement: () => '',
});

// Convert HubSpot responsive tables cleanly
td.addRule('clean-tables', {
  filter: (node) =>
    node.tagName?.toLowerCase() === 'div' &&
    node.getAttribute('data-hs-responsive-table') === 'true',
  replacement: (_content, node) => {
    // Let turndown handle the inner table normally
    return td.turndown(node.innerHTML);
  },
});

// Strip inline styles and HubSpot color spans
td.addRule('strip-styled-spans', {
  filter: (node) => {
    if (node.tagName?.toLowerCase() !== 'span') return false;
    const style = node.getAttribute('style') || '';
    // Keep bold/italic spans, strip colour-only spans
    if (style.includes('font-weight: bold')) return false;
    if (style.includes('color:')) return true;
    return false;
  },
  replacement: (content) => content,
});

/* ============================================================
   HELPERS
   ============================================================ */

function slugFromFilename(filename) {
  return filename.replace(/\.html$/, '');
}

function extractMetadata($) {
  const meta = {};

  // Description
  meta.description = $('meta[name="description"]').attr('content')?.trim() || '';

  // Author + dates + headline from JSON-LD (most reliable source)
  const jsonLd = $('script[type="application/ld+json"]').html();
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd);
      meta.author = data.author?.name || 'HedgeFlows';
      meta.datePublished = data.datePublished || '';
      meta.dateModified = data.dateModified || '';
      meta.jsonLdTitle = data.headline || '';
    } catch { /* ignore parse errors */ }
  }

  // Title: prefer JSON-LD headline (clean), then og:title, then <title> tag
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
  const htmlTitle = $('title').text().trim();
  meta.title = meta.jsonLdTitle || ogTitle || htmlTitle;
  // Clean up any residual suffixes
  meta.title = meta.title.replace(/\s*[|–—-]\s*HedgeFlows.*$/i, '').trim();
  // Strip "Follow me on LinkedIn" or similar social cruft from title
  meta.title = meta.title.replace(/Follow\s+me\s+on\s+LinkedIn\s*/gi, '').trim();

  // Featured image
  meta.featuredImage = $('meta[property="og:image"]').attr('content') || '';

  return meta;
}

function extractBody($) {
  const wrapper = $('#hs_cos_wrapper_post_body');
  if (wrapper.length === 0) return '';

  // Remove HubSpot CTA wrappers
  wrapper.find('[class*="hs_cos_wrapper_widget"]').remove();
  wrapper.find('a.hs-button').remove();
  wrapper.find('.hs-cta-wrapper').remove();
  wrapper.find('script').remove();
  wrapper.find('style').remove();

  return wrapper.html() || '';
}

function fixInternalLinks(md) {
  // Fix relative links from HubSpot export structure:
  // ../../../com/hedgeflows/blog/glossary/xyz.html → /glossary/xyz
  // ../../../com/hedgeflows/blog/xyz.html → /blog/xyz
  let fixed = md;

  // Glossary links
  fixed = fixed.replace(
    /\((?:\.\.\/)*com\/hedgeflows\/blog\/glossary\/([^)]+?)\.html\)/g,
    '(/glossary/$1)'
  );

  // Blog links
  fixed = fixed.replace(
    /\((?:\.\.\/)*com\/hedgeflows\/blog\/([^)]+?)\.html\)/g,
    '(/blog/$1)'
  );

  // Absolute blog.hedgeflows.com links
  fixed = fixed.replace(
    /\(https?:\/\/blog\.hedgeflows\.com\/([^)]+?)\)/g,
    (match, p1) => {
      const clean = p1.replace(/\.html$/, '');
      if (clean.startsWith('glossary/')) return `(/glossary/${clean.replace('glossary/', '')})`;
      return `(/blog/${clean})`;
    }
  );

  // hedgeflows.com links
  fixed = fixed.replace(
    /\(https?:\/\/(?:www\.)?hedgeflows\.com\/([^)]*?)\)/g,
    '(/$1)'
  );

  return fixed;
}

function cleanMarkdown(md) {
  let cleaned = md;

  // Remove empty links
  cleaned = cleaned.replace(/\[([^\]]*)\]\(\s*\)/g, '$1');

  // Remove excessive whitespace / blank lines (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');

  // Remove trailing whitespace per line
  cleaned = cleaned.replace(/[ \t]+$/gm, '');

  // Remove leftover HTML comments
  cleaned = cleaned.replace(/<!--.*?-->/gs, '');

  // Trim
  cleaned = cleaned.trim();

  return cleaned;
}

function escapeFrontmatter(str) {
  if (!str) return '';
  // Escape double quotes in YAML strings
  return str.replace(/"/g, '\\"');
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  try {
    return new Date(isoStr).toISOString().split('T')[0];
  } catch {
    return '';
  }
}

/* ============================================================
   MAIN
   ============================================================ */
function main() {
  // Ensure output dir
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Get all blog HTML files (not glossary subdirectory)
  const files = fs.readdirSync(SRC_DIR).filter((f) => {
    // Only .html files in the blog root (not subdirectories)
    const fullPath = path.join(SRC_DIR, f);
    return f.endsWith('.html') && fs.statSync(fullPath).isFile();
  });

  console.log(`Found ${files.length} HTML files in ${SRC_DIR}`);

  let kept = 0;
  let retired = 0;
  let merged = 0;
  let unknown = 0;

  for (const file of files) {
    const slug = slugFromFilename(file);
    const entry = INVENTORY[slug];

    if (!entry) {
      // Check if it's a glossary-related file that slipped in, or unknown
      console.warn(`  SKIP (not in inventory): ${slug}`);
      unknown++;
      continue;
    }

    if (entry.action === 'RETIRE') {
      console.log(`  RETIRE: ${slug}`);
      retired++;
      continue;
    }

    if (entry.action === 'MERGE') {
      console.log(`  MERGE (skip — content merged into ${entry.mergeInto}): ${slug}`);
      merged++;
      continue;
    }

    // KEEP or REWRITE — extract and convert
    const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf-8');
    const $ = load(html);
    const meta = extractMetadata($);
    const bodyHtml = extractBody($);

    if (!bodyHtml) {
      console.warn(`  WARN: no body content found for ${slug}`);
      continue;
    }

    // Convert HTML → Markdown
    let md = td.turndown(bodyHtml);
    md = fixInternalLinks(md);
    md = cleanMarkdown(md);

    // Determine output slug (may be renamed)
    const outputSlug = entry.newSlug || slug;
    const date = formatDate(meta.datePublished);
    const updated = formatDate(meta.dateModified);

    // Build frontmatter
    const frontmatter = [
      '---',
      `title: "${escapeFrontmatter(meta.title)}"`,
      `slug: "${outputSlug}"`,
      `description: "${escapeFrontmatter(meta.description)}"`,
      `date: "${date}"`,
    ];

    if (updated && updated !== date) {
      frontmatter.push(`updated: "${updated}"`);
    }

    frontmatter.push(`author: "${escapeFrontmatter(meta.author || 'HedgeFlows')}"`);
    frontmatter.push(`category: "${entry.cat}"`);

    if (meta.featuredImage) {
      frontmatter.push(`featuredImage: "${escapeFrontmatter(meta.featuredImage)}"`);
    }

    frontmatter.push('---');

    const output = frontmatter.join('\n') + '\n\n' + md + '\n';

    // Write file
    const outPath = path.join(OUT_DIR, `${outputSlug}.md`);
    fs.writeFileSync(outPath, output, 'utf-8');
    console.log(`  OK: ${slug}${entry.newSlug ? ` → ${entry.newSlug}` : ''} [${entry.cat}]`);
    kept++;
  }

  // Handle MERGE: append the-ultimate-faq-guide content to a-guide-to-xero-batch-payments
  const mergeSourceFile = path.join(SRC_DIR, 'the-ultimate-faq-guide-to-xero-bulk-payments.html');
  const mergeTargetFile = path.join(OUT_DIR, 'a-guide-to-xero-batch-payments.md');
  if (fs.existsSync(mergeSourceFile) && fs.existsSync(mergeTargetFile)) {
    const mergeHtml = fs.readFileSync(mergeSourceFile, 'utf-8');
    const $merge = load(mergeHtml);
    const mergeBody = extractBody($merge);
    if (mergeBody) {
      let mergeMd = td.turndown(mergeBody);
      mergeMd = fixInternalLinks(mergeMd);
      mergeMd = cleanMarkdown(mergeMd);

      const existing = fs.readFileSync(mergeTargetFile, 'utf-8');
      const merged_content = existing.trimEnd() + '\n\n---\n\n## Frequently Asked Questions about Xero Bulk Payments\n\n' + mergeMd + '\n';
      fs.writeFileSync(mergeTargetFile, merged_content, 'utf-8');
      console.log(`  MERGED: the-ultimate-faq-guide → a-guide-to-xero-batch-payments`);
    }
  }

  console.log(`\nDone! ${kept} posts kept, ${retired} retired, ${merged} merged, ${unknown} unknown/skipped.`);
  console.log(`Output: ${OUT_DIR}`);
}

main();
