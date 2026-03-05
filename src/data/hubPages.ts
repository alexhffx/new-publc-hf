/* ─────────────────────────────────────────────────────────────────────────────
   Hub-and-Spoke SEO — Centralized hub data
   Maps pillar names → hub pages, and curates spoke links for each hub.
   ─────────────────────────────────────────────────────────────────────────── */

export interface Hub {
  /** Pillar identifier — matches `pillar` field in blog frontmatter */
  slug: string;
  /** Human-readable topic name */
  title: string;
  /** URL path to the hub page */
  path: string;
  /** Label used in back-link banners (e.g. "Part of our …") */
  linkLabel: string;
}

export const hubs: Hub[] = [
  {
    slug: 'fx-hedging',
    title: 'FX Hedging',
    path: '/fx-academy',
    linkLabel: 'FX & Treasury Academy',
  },
  {
    slug: 'currency-management',
    title: 'Currency Management',
    path: '/fx-academy',
    linkLabel: 'FX & Treasury Academy',
  },
  {
    slug: 'international-bulk-payments',
    title: 'International Bulk Payments',
    path: '/guides/international-bulk-payments',
    linkLabel: 'International Bulk Payments Guide',
  },
  {
    slug: 'treasury-management',
    title: 'Treasury Management',
    path: '/guides/treasury-management',
    linkLabel: 'Treasury Management Guide',
  },
];

/** Look up the hub page for a given pillar value */
export function getHubByPillar(pillar: string): Hub | undefined {
  return hubs.find((h) => h.slug === pillar);
}

/** Pillars that appear on the FX Academy index page */
export const fxAcademyPillars = ['fx-hedging', 'currency-management'];

/* ─── Curated glossary terms per hub page ─────────────────────────────────── */

export const hubGlossaryTerms: Record<string, string[]> = {
  'fx-academy': [
    'base-currency',
    'exchange-rate',
    'currency-hedge',
    'currency-hedging',
    'currency-options',
    'foreign-exchange-forward',
    'currency-exposure',
    'currency-risk-management',
    'balance-sheet-hedging',
    'cash-flow-hedging',
    'currency-volatility',
    'foreign-exchange-risk',
  ],
  'international-bulk-payments': [
    'cross-border-payments',
    'swift-bic-code',
    'swift-transfer',
    'telegraphic-transfer',
    'accounts-payable',
    'accounts-receivable',
    'payment-due-date',
    'cross-border-trade',
  ],
  'treasury-management': [
    'counterparty',
    'collateral',
    'currency-controls',
    'counterparty-credit-risk',
    'foreign-exchange-accounting',
    'accounting-currency',
    'floating-exchange-rate',
    'european-markets-infrastructure-regulation-emir',
  ],
};

/* ─── Curated help pages per hub page ─────────────────────────────────────── */

export const hubHelpPages: Record<string, { slug: string; title: string }[]> = {
  'fx-academy': [
    { slug: 'what-currencies-can-hedgeflows-convert', title: 'What currencies can HedgeFlows convert?' },
    { slug: 'foreign-exchange-cut-off-times', title: 'FX cut-off times' },
    { slug: 'what-is-a-position-closeout', title: 'What is a position closeout?' },
    { slug: 'how-to-use-fx-gains-losses-explainer-for-xero', title: 'FX gains & losses explainer for Xero' },
  ],
  'international-bulk-payments': [
    { slug: 'how-to-send-a-foreign-currency-transfer', title: 'How to send a transfer' },
    { slug: 'payment-timelines-and-cut-off-times', title: 'Payment timelines & cut-off times' },
    { slug: 'what-are-local-payments-and-where-are-they-available', title: 'Local payments explained' },
    { slug: 'can-i-fund-multiple-transfers-with-one-payment-from-my-bank', title: 'Funding multiple transfers' },
    { slug: 'how-to-pay-for-a-transfer-via-hedgeflows', title: 'How to pay for a transfer' },
  ],
  'treasury-management': [
    { slug: 'why-connect-hedgeflows-to-your-accounting', title: 'Why connect to your accounting?' },
    { slug: 'how-to-avoid-fraudulent-payments', title: 'How to avoid payment fraud' },
  ],
};

/* ─── Product links per hub page ──────────────────────────────────────────── */

export const hubProductLinks: Record<string, { href: string; label: string }[]> = {
  'fx-academy': [
    { href: '/platform/fx-risk-management', label: 'FX Risk Management' },
    { href: '/platform/cash-management', label: 'Cash Management' },
  ],
  'international-bulk-payments': [
    { href: '/platform/payments', label: 'Payments Platform' },
  ],
  'treasury-management': [
    { href: '/platform/cash-management', label: 'Cash Management Platform' },
    { href: '/advisory/cash-management', label: 'Cash Management Advisory' },
  ],
};
