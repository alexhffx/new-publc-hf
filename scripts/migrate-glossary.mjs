#!/usr/bin/env node
/**
 * migrate-glossary.mjs
 * Converts HubSpot HTML glossary exports → Markdown content collection files
 * for Astro v5.  Run once:  node scripts/migrate-glossary.mjs
 */

import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import TurndownService from 'turndown';

/* ============================================================
   CONFIG
   ============================================================ */
const SRC_DIR = '/tmp/hubspot-export/com/hedgeflows/blog/glossary';
const OUT_DIR = path.resolve('src/content/glossary');

/* ============================================================
   INVENTORY — category, related terms, and actions for each slug
   Source: HedgeFlows_Content_Restructure_Spec, Section 3
   ============================================================ */
const INVENTORY = {
  'what-is-a-currency-hedge':        { term: 'Currency Hedge', newSlug: 'currency-hedge', cat: 'hedging-instruments', action: 'KEEP' },
  'accounting-currency':             { term: 'Accounting Currency', cat: 'accounting-finance', action: 'KEEP' },
  'accounts-payable':                { term: 'Accounts Payable', cat: 'accounting-finance', action: 'KEEP' },
  'accounts-payable-process':        { term: 'Accounts Payable Process', cat: 'accounting-finance', action: 'MERGE', mergeInto: 'accounts-payable' },
  'accounts-receivable':             { term: 'Accounts Receivable', cat: 'accounting-finance', action: 'KEEP' },
  'average-rate-forwards-and-options': { term: 'Average Rate Forwards and Options', cat: 'hedging-instruments', action: 'KEEP' },
  'balance-sheet-hedging':           { term: 'Balance Sheet Hedging', cat: 'risk-concepts', action: 'KEEP',
                                       relatedAcademy: 'balance-sheet-hedging' },
  'base-currency':                   { term: 'Base Currency', cat: 'fx-fundamentals', action: 'KEEP' },
  'bid-ask-spread':                  { term: 'Bid-Ask Spread', cat: 'fx-fundamentals', action: 'KEEP' },
  'cash-flow-hedging':               { term: 'Cash Flow Hedging', cat: 'risk-concepts', action: 'KEEP',
                                       relatedAcademy: 'cashflow-hedging' },
  'close-out-netting':               { term: 'Close-out Netting', cat: 'hedging-instruments', action: 'KEEP' },
  'collateral':                      { term: 'Collateral', cat: 'market-structure', action: 'KEEP' },
  'counterparty':                    { term: 'Counterparty', cat: 'market-structure', action: 'KEEP' },
  'counterparty-credit-risk':        { term: 'Counterparty Credit Risk', cat: 'risk-concepts', action: 'KEEP' },
  'cross-border-payments':           { term: 'Cross-border Payments', cat: 'payments-operations', action: 'KEEP' },
  'cross-border-trade':              { term: 'Cross-border Trade', cat: 'payments-operations', action: 'KEEP' },
  'currency-appreciation':           { term: 'Currency Appreciation', cat: 'fx-fundamentals', action: 'KEEP' },
  'currency-codes':                  { term: 'Currency Codes', cat: 'fx-fundamentals', action: 'KEEP' },
  'currency-controls':               { term: 'Currency Controls', cat: 'market-structure', action: 'KEEP' },
  'currency-depreciation':           { term: 'Currency Depreciation', cat: 'fx-fundamentals', action: 'KEEP' },
  'currency-devaluation':            { term: 'Currency Devaluation', cat: 'fx-fundamentals', action: 'KEEP' },
  'currency-exposure':               { term: 'Currency Exposure', cat: 'risk-concepts', action: 'KEEP' },
  'currency-hedging':                { term: 'Currency Hedging', cat: 'hedging-instruments', action: 'KEEP' },
  'currency-options':                { term: 'Currency Options', cat: 'hedging-instruments', action: 'KEEP' },
  'currency-pair':                   { term: 'Currency Pair', cat: 'fx-fundamentals', action: 'KEEP' },
  'currency-peg':                    { term: 'Currency Peg', cat: 'market-structure', action: 'KEEP' },
  'currency-risk-management':        { term: 'Currency Risk Management', cat: 'risk-concepts', action: 'KEEP' },
  'currency-risks':                  { term: 'Currency Risks', cat: 'risk-concepts', action: 'KEEP' },
  'currency-spot-rate':              { term: 'Currency Spot Rate', cat: 'fx-fundamentals', action: 'KEEP' },
  'currency-volatility':             { term: 'Currency Volatility', cat: 'risk-concepts', action: 'KEEP' },
  'delivery-date':                   { term: 'Delivery Date', cat: 'hedging-instruments', action: 'KEEP' },
  'dirty-float':                     { term: 'Dirty Float', cat: 'market-structure', action: 'KEEP' },
  'early-draw':                      { term: 'Early Draw', cat: 'hedging-instruments', action: 'KEEP' },
  'european-markets-infrastructure-regulation-emir': { term: 'EMIR', cat: 'market-structure', action: 'KEEP' },
  'exchange-rate':                   { term: 'Exchange Rate', cat: 'fx-fundamentals', action: 'KEEP' },
  'flexible-forward':                { term: 'Flexible Forward', cat: 'hedging-instruments', action: 'KEEP' },
  'floating-exchange-rate':          { term: 'Floating Exchange Rate', cat: 'market-structure', action: 'KEEP' },
  'foreign-currency-transaction':    { term: 'Foreign Currency Transaction', cat: 'fx-fundamentals', action: 'KEEP' },
  'foreign-exchange':                { term: 'Foreign Exchange', cat: 'fx-fundamentals', action: 'KEEP' },
  'foreign-exchange-accounting':     { term: 'Foreign Exchange Accounting', cat: 'accounting-finance', action: 'KEEP' },
  'foreign-exchange-forward':        { term: 'Foreign Exchange Forward', cat: 'hedging-instruments', action: 'KEEP' },
  'foreign-exchange-risk':           { term: 'Foreign Exchange Risk', cat: 'risk-concepts', action: 'KEEP' },
  'micro-hedging':                   { term: 'Micro-hedging', cat: 'hedging-instruments', action: 'KEEP' },
  'payment-due-date':                { term: 'Payment Due Date', cat: 'payments-operations', action: 'KEEP' },
  'swift-bic-code':                  { term: 'SWIFT Code (BIC)', cat: 'payments-operations', action: 'KEEP' },
  'swift-transfer':                  { term: 'SWIFT Transfer', cat: 'payments-operations', action: 'KEEP' },
  'telegraphic-transfer':            { term: 'Telegraphic Transfer', cat: 'payments-operations', action: 'KEEP' },
  'value-date':                      { term: 'Value Date', cat: 'hedging-instruments', action: 'KEEP' },
};

/* Related terms mapping — semantically grouped */
const RELATED_TERMS = {
  'currency-hedge':          ['currency-hedging', 'foreign-exchange-forward', 'currency-options'],
  'accounting-currency':     ['base-currency', 'foreign-exchange-accounting', 'exchange-rate'],
  'accounts-payable':        ['accounts-receivable', 'payment-due-date', 'cross-border-payments'],
  'accounts-receivable':     ['accounts-payable', 'foreign-currency-transaction', 'payment-due-date'],
  'average-rate-forwards-and-options': ['foreign-exchange-forward', 'currency-options', 'flexible-forward'],
  'balance-sheet-hedging':   ['cash-flow-hedging', 'currency-exposure', 'foreign-exchange-accounting'],
  'base-currency':           ['currency-pair', 'exchange-rate', 'accounting-currency'],
  'bid-ask-spread':          ['exchange-rate', 'currency-spot-rate', 'currency-pair'],
  'cash-flow-hedging':       ['balance-sheet-hedging', 'currency-exposure', 'currency-risk-management'],
  'close-out-netting':       ['counterparty-credit-risk', 'counterparty', 'collateral'],
  'collateral':              ['counterparty-credit-risk', 'counterparty', 'close-out-netting'],
  'counterparty':            ['counterparty-credit-risk', 'collateral', 'close-out-netting'],
  'counterparty-credit-risk': ['counterparty', 'collateral', 'close-out-netting'],
  'cross-border-payments':   ['swift-transfer', 'telegraphic-transfer', 'cross-border-trade'],
  'cross-border-trade':      ['cross-border-payments', 'currency-controls', 'foreign-currency-transaction'],
  'currency-appreciation':   ['currency-depreciation', 'currency-devaluation', 'exchange-rate'],
  'currency-codes':          ['currency-pair', 'base-currency', 'foreign-exchange'],
  'currency-controls':       ['currency-peg', 'floating-exchange-rate', 'dirty-float'],
  'currency-depreciation':   ['currency-appreciation', 'currency-devaluation', 'currency-volatility'],
  'currency-devaluation':    ['currency-depreciation', 'currency-peg', 'currency-controls'],
  'currency-exposure':       ['currency-risks', 'currency-risk-management', 'balance-sheet-hedging'],
  'currency-hedging':        ['currency-hedge', 'foreign-exchange-forward', 'currency-options'],
  'currency-options':        ['foreign-exchange-forward', 'flexible-forward', 'currency-hedging'],
  'currency-pair':           ['base-currency', 'exchange-rate', 'bid-ask-spread'],
  'currency-peg':            ['floating-exchange-rate', 'dirty-float', 'currency-controls'],
  'currency-risk-management': ['currency-risks', 'currency-exposure', 'balance-sheet-hedging'],
  'currency-risks':          ['currency-risk-management', 'currency-exposure', 'currency-volatility'],
  'currency-spot-rate':      ['exchange-rate', 'bid-ask-spread', 'value-date'],
  'currency-volatility':     ['currency-risks', 'exchange-rate', 'currency-exposure'],
  'delivery-date':           ['value-date', 'payment-due-date', 'foreign-exchange-forward'],
  'dirty-float':             ['floating-exchange-rate', 'currency-peg', 'currency-controls'],
  'early-draw':              ['flexible-forward', 'foreign-exchange-forward', 'delivery-date'],
  'european-markets-infrastructure-regulation-emir': ['counterparty-credit-risk', 'collateral', 'counterparty'],
  'exchange-rate':           ['currency-spot-rate', 'currency-pair', 'bid-ask-spread'],
  'flexible-forward':        ['foreign-exchange-forward', 'early-draw', 'delivery-date'],
  'floating-exchange-rate':  ['currency-peg', 'dirty-float', 'exchange-rate'],
  'foreign-currency-transaction': ['exchange-rate', 'foreign-exchange', 'cross-border-trade'],
  'foreign-exchange':        ['exchange-rate', 'currency-pair', 'foreign-currency-transaction'],
  'foreign-exchange-accounting': ['accounting-currency', 'balance-sheet-hedging', 'foreign-exchange'],
  'foreign-exchange-forward': ['currency-options', 'flexible-forward', 'delivery-date'],
  'foreign-exchange-risk':   ['currency-risks', 'currency-exposure', 'currency-risk-management'],
  'micro-hedging':           ['balance-sheet-hedging', 'cash-flow-hedging', 'currency-hedging'],
  'payment-due-date':        ['delivery-date', 'value-date', 'accounts-payable'],
  'swift-bic-code':          ['swift-transfer', 'telegraphic-transfer', 'cross-border-payments'],
  'swift-transfer':          ['swift-bic-code', 'telegraphic-transfer', 'cross-border-payments'],
  'telegraphic-transfer':    ['swift-transfer', 'swift-bic-code', 'cross-border-payments'],
  'value-date':              ['delivery-date', 'payment-due-date', 'currency-spot-rate'],
};

/* ============================================================
   SETUP TURNDOWN
   ============================================================ */
const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});

td.addRule('remove-hubspot-widgets', {
  filter: (node) => {
    const tag = node.tagName?.toLowerCase();
    if (['script', 'style', 'iframe', 'noscript', 'form'].includes(tag)) return true;
    if (tag === 'a' && node.classList?.contains('hs-button')) return true;
    if (tag === 'div' && node.id?.startsWith('hs_cos_wrapper_widget')) return true;
    // Remove video button blocks
    if (tag === 'div' && node.classList?.contains('video-button-block')) return true;
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

/* ============================================================
   HELPERS
   ============================================================ */

function extractMetadata($) {
  const meta = {};

  meta.description = $('meta[name="description"]').attr('content')?.trim() || '';

  const jsonLd = $('script[type="application/ld+json"]').html();
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd);
      meta.jsonLdTitle = data.headline || '';
      meta.datePublished = data.datePublished || '';
      meta.dateModified = data.dateModified || '';
    } catch {}
  }

  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
  const htmlTitle = $('title').text().trim();
  meta.title = meta.jsonLdTitle || ogTitle || htmlTitle;
  meta.title = meta.title.replace(/\s*[|–—-]\s*HedgeFlows.*$/i, '').trim();
  meta.title = meta.title.replace(/Follow\s+me\s+on\s+LinkedIn\s*/gi, '').trim();

  return meta;
}

function extractBody($) {
  const wrapper = $('#hs_cos_wrapper_post_body');
  if (wrapper.length === 0) return '';

  wrapper.find('[class*="hs_cos_wrapper_widget"]').remove();
  wrapper.find('.video-button-block').remove();
  wrapper.find('a.hs-button').remove();
  wrapper.find('.hs-cta-wrapper').remove();
  wrapper.find('script').remove();
  wrapper.find('style').remove();

  return wrapper.html() || '';
}

function fixInternalLinks(md) {
  let fixed = md;
  fixed = fixed.replace(
    /\((?:\.\.\/)*com\/hedgeflows\/blog\/glossary\/([^)]+?)\.html\)/g,
    '(/glossary/$1)'
  );
  fixed = fixed.replace(
    /\((?:\.\.\/)*com\/hedgeflows\/blog\/([^)]+?)\.html\)/g,
    '(/blog/$1)'
  );
  fixed = fixed.replace(
    /\(https?:\/\/blog\.hedgeflows\.com\/glossary\/([^)]+?)\)/g,
    '(/glossary/$1)'
  );
  fixed = fixed.replace(
    /\(https?:\/\/blog\.hedgeflows\.com\/([^)]+?)\)/g,
    (match, p1) => `(/blog/${p1.replace(/\.html$/, '')})`
  );
  return fixed;
}

function cleanMarkdown(md) {
  let cleaned = md;
  cleaned = cleaned.replace(/\[([^\]]*)\]\(\s*\)/g, '$1');
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');
  cleaned = cleaned.replace(/[ \t]+$/gm, '');
  cleaned = cleaned.replace(/<!--.*?-->/gs, '');
  cleaned = cleaned.trim();
  return cleaned;
}

function getShortDefinition(md) {
  // Extract first sentence or first 200 chars for the index page
  const firstPara = md.split('\n\n')[0] || '';
  // Strip markdown formatting
  let plain = firstPara
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[#*_]/g, '')
    .replace(/\\([^\\])/g, '$1')   // Strip Turndown escape backslashes
    .trim();
  if (plain.length > 200) {
    plain = plain.substring(0, 197) + '...';
  }
  return plain;
}

function esc(str) {
  return (str || '').replace(/"/g, '\\"');
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  try { return new Date(isoStr).toISOString().split('T')[0]; } catch { return ''; }
}

/* ============================================================
   MAIN
   ============================================================ */
function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(SRC_DIR).filter((f) => {
    return f.endsWith('.html') && fs.statSync(path.join(SRC_DIR, f)).isFile();
  });

  console.log(`Found ${files.length} glossary HTML files in ${SRC_DIR}`);

  let kept = 0;
  let retired = 0;
  let merged = 0;

  for (const file of files) {
    const slug = file.replace(/\.html$/, '');

    // Skip temporary slugs
    if (slug.startsWith('-temporary-slug')) {
      console.log(`  RETIRE (temp): ${slug}`);
      retired++;
      continue;
    }

    const entry = INVENTORY[slug];
    if (!entry) {
      console.warn(`  SKIP (not in inventory): ${slug}`);
      continue;
    }

    if (entry.action === 'RETIRE') {
      console.log(`  RETIRE: ${slug}`);
      retired++;
      continue;
    }

    if (entry.action === 'MERGE') {
      console.log(`  MERGE (skip — merged into ${entry.mergeInto}): ${slug}`);
      merged++;
      continue;
    }

    // KEEP — extract and convert
    const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf-8');
    const $ = load(html);
    const meta = extractMetadata($);
    const bodyHtml = extractBody($);

    if (!bodyHtml) {
      console.warn(`  WARN: no body for ${slug}`);
      continue;
    }

    let md = td.turndown(bodyHtml);
    md = fixInternalLinks(md);
    md = cleanMarkdown(md);

    const outputSlug = entry.newSlug || slug;
    const termName = entry.term || meta.title;
    const shortDef = getShortDefinition(md);
    const updated = formatDate(meta.dateModified);

    const relatedTerms = RELATED_TERMS[outputSlug] || [];

    // Build frontmatter
    const fm = [
      '---',
      `term: "${esc(termName)}"`,
      `slug: "${outputSlug}"`,
      `definition: "${esc(shortDef)}"`,
      `category: "${entry.cat}"`,
    ];

    if (relatedTerms.length > 0) {
      fm.push('relatedTerms:');
      relatedTerms.forEach((rt) => fm.push(`  - "${rt}"`));
    }

    if (entry.relatedAcademy) {
      fm.push(`relatedAcademyModule: "${entry.relatedAcademy}"`);
    }

    if (meta.description) {
      fm.push(`seoDescription: "${esc(meta.description)}"`);
    }

    if (updated) {
      fm.push(`lastUpdated: "${updated}"`);
    }

    fm.push('---');

    const output = fm.join('\n') + '\n\n' + md + '\n';
    const outPath = path.join(OUT_DIR, `${outputSlug}.md`);
    fs.writeFileSync(outPath, output, 'utf-8');
    console.log(`  OK: ${slug}${entry.newSlug ? ` → ${entry.newSlug}` : ''} [${entry.cat}]`);
    kept++;
  }

  // Handle MERGE: append accounts-payable-process content to accounts-payable
  const mergeSource = path.join(SRC_DIR, 'accounts-payable-process.html');
  const mergeTarget = path.join(OUT_DIR, 'accounts-payable.md');
  if (fs.existsSync(mergeSource) && fs.existsSync(mergeTarget)) {
    const html = fs.readFileSync(mergeSource, 'utf-8');
    const $ = load(html);
    const bodyHtml = extractBody($);
    if (bodyHtml) {
      let md = td.turndown(bodyHtml);
      md = fixInternalLinks(md);
      md = cleanMarkdown(md);
      const existing = fs.readFileSync(mergeTarget, 'utf-8');
      const merged_content = existing.trimEnd() + '\n\n---\n\n## The Accounts Payable Process\n\n' + md + '\n';
      fs.writeFileSync(mergeTarget, merged_content, 'utf-8');
      console.log(`  MERGED: accounts-payable-process → accounts-payable`);
    }
  }

  console.log(`\nDone! ${kept} terms kept, ${retired} retired, ${merged} merged.`);
  console.log(`Output: ${OUT_DIR}`);
}

main();
