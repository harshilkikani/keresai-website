// Published facts about Google Business Profile (GBP) management options, used
// by /best-google-business-profile-management. Same rules as
// answeringVendors.ts: every price and feature comes from the vendor's own
// pricing or product page on the date in GBP_VENDORS_CHECKED; recheck before
// changing the date. Neutral wording only. Anything a vendor does not publish
// is written as "Not published", never guessed, and a vendor whose page could
// not be read is left out rather than described from memory.
export const GBP_VENDORS_CHECKED = 'October 11, 2026';
export const GBP_VENDORS_CHECKED_ISO = '2026-10-11';

export type GbpCategory = 'Software' | 'Done-for-you' | 'Website + profile';

export interface GbpVendor {
  name: string;
  url: string;
  category: GbpCategory;
  /** What the vendor's own page says is included, relevant to GBP, reviews and websites. */
  included: string;
  /** Lowest published price, as the vendor publishes it. */
  starting: string;
  /** One honest limitation, from the vendor's own page. */
  limitation: string;
  source: string;
}

export const gbpVendors: GbpVendor[] = [
  // ── Software you run yourself ────────────────────────────────────────────
  {
    name: 'BrightLocal',
    url: 'https://www.brightlocal.com',
    category: 'Software',
    included: 'GBP audit and rank tracking (Track); GBP post scheduler and listing sync (Manage); review monitoring, replies and review requests by email, SMS and in-store (Grow).',
    starting: '$41/mo for one location billed monthly ($31/mo billed annually) on Track. Post scheduling starts on Manage ($54/mo); review requests on Grow ($65/mo).',
    limitation: 'You still write the posts and replies; the software schedules and tracks them.',
    source: 'https://www.brightlocal.com/pricing/',
  },
  {
    name: 'Localo',
    url: 'https://localo.com',
    category: 'Software',
    included: 'Rank tracking, AI-generated posts scheduled to Google, review management with suggested replies, weekly optimization tasks and profile protection.',
    starting: '$49/mo for one profile, or $39/mo billed annually (plus VAT).',
    limitation: 'Built around guided weekly tasks you complete yourself.',
    source: 'https://localo.com/pricing',
  },
  {
    name: 'Merchynt Paige',
    url: 'https://www.merchynt.com',
    category: 'Software',
    included: 'AI that posts, optimizes and maintains the Google Business Profile every month.',
    starting: '$99/mo per business location; a trial costs $1.',
    limitation: 'Automated by AI rather than a person; Merchynt asks businesses with more than three profiles to get in touch.',
    source: 'https://www.merchynt.com/pricing',
  },
  {
    name: 'Birdeye',
    url: 'https://birdeye.com',
    category: 'Software',
    included: 'Listings management and reviews management, priced by number of locations.',
    starting: 'Not published; pricing is sent after a form.',
    limitation: 'No published price to compare before talking to sales.',
    source: 'https://birdeye.com/pricing/',
  },
  {
    name: 'Podium',
    url: 'https://www.podium.com',
    category: 'Software',
    included: 'Review requests by text for Google, Facebook and other review sites, alongside its messaging tools.',
    starting: 'Not published; Podium asks you to talk to sales.',
    limitation: 'Focused on reviews and messaging rather than weekly profile posts.',
    source: 'https://www.podium.com/pricing/',
  },
  // ── Done-for-you services ────────────────────────────────────────────────
  {
    name: 'BrightLocal Managed Local SEO',
    url: 'https://www.brightlocal.com/local-seo-services/',
    category: 'Done-for-you',
    included: 'GBP audit, daily service and geo-targeted GBP posts, monthly photo uploads, review responses, spam fighting, citations, and optimization of your existing website.',
    starting: '$1,299/mo; no setup fee.',
    limitation: 'Does not build a website; it optimizes the one you have. BrightLocal describes it as a 12-month campaign.',
    source: 'https://www.brightlocal.com/local-seo-services/',
  },
  {
    name: 'Hibu One',
    url: 'https://hibu.com',
    category: 'Done-for-you',
    included: 'A website built by Hibu’s team, listings management, automated review generation and reputation monitoring, SEO, and optional paid ads.',
    starting: 'Not published; each plan is custom-priced.',
    limitation: 'Its pricing page names listings management but not Google Business Profile management by name.',
    source: 'https://hibu.com/digital-marketing/pricing',
  },
  {
    name: 'Scorpion',
    url: 'https://www.scorpion.co',
    category: 'Done-for-you',
    included: 'Websites for home service businesses, SEO, automated review requests and AI responses to reviews, plus ads.',
    starting: 'Not published; Scorpion says the investment depends on your goals.',
    limitation: 'Sold on a contract; Scorpion says you own the website after the contract term is complete.',
    source: 'https://www.scorpion.co/home-services/',
  },
  // ── Website + profile bundles ────────────────────────────────────────────
  {
    name: 'Thryv',
    url: 'https://www.thryv.com',
    category: 'Website + profile',
    included: 'Starter: AI-generated website, 60+ listing directories, AI review management and a one-time GBP optimization. Signature adds a professionally designed website and advanced listings including Google Business Profile.',
    starting: '$99/mo (Starter); $399/mo (Signature). Annual billing saves 15%.',
    limitation: 'Starter optimizes the profile once; ongoing done-for-you marketing is sold as add-ons to the higher plans.',
    source: 'https://www.thryv.com/pricing/',
  },
];

/** Keres, described by the same columns and the same rules. */
export const keresGbpRow: GbpVendor = {
  name: 'Keres AI Found',
  url: 'https://www.keresai.com/services/found',
  category: 'Website + profile',
  included: 'Builds and runs the website, weekly GBP management (posts, photos, review replies drafted for your approval, spam-listing reports, insights), a review request after every job, and consistent listings.',
  starting: '$249/mo ($499/mo for law firms); no build fee at the base tier; month-to-month.',
  limitation: 'Built for local service businesses only; the quote rises with the number of locations and with add-ons.',
  source: 'https://www.keresai.com/services/found',
};

export const GBP_CATEGORY_LABEL: Record<GbpCategory, string> = {
  Software: 'Software you run yourself',
  'Done-for-you': 'Done-for-you service',
  'Website + profile': 'Website + profile bundle',
};
