// Single source of truth for the values that appear on every page.
// When a placeholder is filled in, it is filled in HERE and nowhere else:
// nav, sticky bar, footer, pricing, the product mocks, llms.txt and
// organizationSchema all read from this file.

import { business, PHONE as CONFIG_PHONE, ADDRESS_LINE, priceFrom } from '../config/business';

/** The line Keres itself answers — from src/config/business.ts, or null until it is set. */
export const PHONE = CONFIG_PHONE;

export const EMAIL = 'ops@keresai.com';
export const ORIGIN = 'https://www.keresai.com';

/**
 * PLACEHOLDER — the footer address line and, once a public address
 * exists, the LocalBusiness node. Until then schema.ts emits
 * Organization only (a LocalBusiness without a real address is a lie
 * that Google penalises).
 */
export const ADDRESS = {
  city: business.city,
  state: business.state,
  /** "City, ST" for the footer, or '' — the footer omits it when empty. */
  line: ADDRESS_LINE,
  isPublic: false,
};

/** PLACEHOLDER — the Found + agent bundle discount. */
export const BUNDLE_DISCOUNT = business.bundleDiscountPercent; // '' → the bundle sentence is omitted

// ─────────────────────────────────────────────────────────────
// The agents
//
// Naming is all-or-nothing: every page uses "Remi, your Inbound
// Agent" on first mention and "Remi" after. The title word stays in
// H1s and meta descriptions because that is what people search for.
// On a customer's own line the agent introduces itself with whatever
// name that customer configures — these are the product defaults.
// ─────────────────────────────────────────────────────────────

export interface Agent {
  slug: string;
  /** Given name. Used alone after first mention. */
  name: string;
  /** Product title. Kept in H1s for search. */
  title: string;
  /** "Remi, your Inbound Agent" — the first-mention form. */
  intro: string;
  /** What searchers type when they want this. */
  searchTerm: string;
  /** The stage of the pipeline it plugs. */
  stage: string;
  /** One line, used in the nav dropdown and the team section. */
  job: string;
  /** Exactly three. The team section renders all three. */
  bullets: string[];
  /** Which plan first includes it. */
  includedIn: string;
}

export const agents: Agent[] = [
  {
    slug: 'inbound',
    name: 'Remi',
    title: 'Inbound Agent',
    intro: 'Remi, your Inbound Agent',
    searchTerm: 'AI receptionist',
    stage: 'Capture, qualify and book',
    job: 'Answers every call in two rings and books the lead.',
    bullets: [
      'Answers in two rings, 24/7 — after hours, weekends and overflow when your team is already on the line.',
      'Runs your intake script, qualifies the lead, and books straight into your calendar and CRM.',
      'Texts back any call it could not take within 60 seconds, and warm-transfers when a caller needs a person.',
    ],
    includedIn: 'Answer',
  },
  {
    slug: 'follow-up',
    name: 'Theo',
    title: 'Follow-Up Agent',
    intro: 'Theo, your Follow-Up Agent',
    searchTerm: 'appointment reminders',
    stage: 'Show and convert',
    job: 'Makes sure they show up and say yes.',
    bullets: [
      'Confirms and reminds by text and voice, handles the reschedule, and backfills the slot from your waitlist.',
      'Collects what you need before the appointment — documents, photos, insurance — so nobody arrives empty-handed.',
      'Chases the estimate on day 1, day 3 and day 7 until you have a yes or a no.',
    ],
    includedIn: 'Convert',
  },
  {
    slug: 'reactivation',
    name: 'June',
    title: 'Reactivation Agent',
    intro: 'June, your Reactivation Agent',
    searchTerm: 'database reactivation',
    stage: 'Come back',
    job: 'Brings back the customers you already paid to win.',
    bullets: [
      'Runs reactivation campaigns against past customers and the cold leads already sitting in your CRM.',
      'Revives closed-lost — anyone who said no in the last six to twelve months gets asked again, properly.',
      'Asks for the review after every completed job or matter, and routes the unhappy ones to you privately first.',
    ],
    includedIn: 'Grow',
  },
  {
    slug: 'outbound',
    name: 'Sol',
    title: 'Outbound Agent',
    intro: 'Sol, your Outbound Agent',
    searchTerm: 'AI SDR',
    stage: 'Net-new pipeline',
    job: 'Cold outreach that reaches the inbox and books the meeting.',
    bullets: [
      'Deliverability done properly first: SPF, DKIM, DMARC and a real warm-up before a single send.',
      'Personalized sequences, replies handled in thread, meetings booked onto your calendar.',
      'Sold last on purpose — most local firms get more out of June before they need Sol.',
    ],
    includedIn: 'Custom',
  },
];

export const agentBySlug = (slug: string) => agents.find((a) => a.slug === slug)!;

// ─────────────────────────────────────────────────────────────
// Found — stage 0 visibility services
// ─────────────────────────────────────────────────────────────

export interface FoundService {
  name: string;
  /** 1–2 lines. Used on /services and /services/found. */
  desc: string;
  addOn?: boolean;
}

export const foundServices: FoundService[] = [
  {
    name: 'Conversion Website',
    desc: 'Five to eight pages on a template built for your vertical, with click-to-call, a booking widget wired to Remi, chat and SMS embedded, schema markup and a live reviews feed. Flat monthly — design, hosting and care in one fee, no build fee at the base tier.',
  },
  {
    name: 'Website Care Plan',
    desc: 'Updates, backups, security, uptime and speed monitoring, small content edits, and a monthly report you can actually read.',
  },
  {
    name: 'Google Business Profile Management',
    desc: 'One-time optimization — categories, services, photos, Q&A, verification — then weekly posts, photo updates, Q&A, review responses, spam-listing removal and monthly insights.',
  },
  {
    name: 'Review Generation & Reputation',
    desc: 'An automated review request after every job or matter, owner responses drafted for your approval, negative reviews intercepted before they post, and a monthly rating report.',
  },
  {
    name: 'Local Listings & Citations',
    desc: 'One consistent name, address and phone across Apple, Bing, Yelp, Nextdoor and Angi, plus Avvo and FindLaw for firms or Healthgrades for practices.',
  },
  {
    name: 'AI Search Visibility',
    desc: 'Structured data, FAQ and service pages written to be quoted by ChatGPT, Google AI Overviews and Perplexity, entity consistency across your profile, listings and site, and a monthly report on whether you are cited for your service near your city.',
    addOn: true,
  },
  {
    name: 'Local Services Ads Setup & Response',
    desc: 'Verification, listing and the always-answered guarantee. Google ranks Local Services Ads on how fast you answer and how you are reviewed — Remi answers in two rings.',
    addOn: true,
  },
  {
    name: 'Call Tracking & Attribution',
    desc: 'A tracking number per channel — Google Business Profile, Local Services Ads, your site, your ads — so the Daily Brief can tell you which source produced which booked appointment.',
  },
];

/**
 * Referred out, never sold as ours. Listing them is the honest answer
 * to "can you also do our ads?" and it keeps the catalog clean.
 */
export const partnerReferralOnly = [
  'Google Ads and PPC management',
  'Video and photography',
  'Bespoke branding',
  'Generic social media management',
  'Generic SEO retainers',
];

// ─────────────────────────────────────────────────────────────
// Plans
//
// Every plan publishes a "from $" floor with "quoted to your volume"
// beneath it. Custom is the only column without a number, and that is
// the one permitted exception.
//
// The Answer, Convert and Grow floors come from src/config/business.ts;
// an empty floor renders as no "from" line, never as a bracket, and the
// human supplies them. Never invent one. Found's floors are real.
// ─────────────────────────────────────────────────────────────

export interface Plan {
  slug: string;
  name: string;
  from: string;
  fromNote?: string;
  flag?: string;
  summary: string;
  includes: string[];
}

export const plans: Plan[] = [
  {
    slug: 'found',
    name: 'Found',
    from: 'from $249',
    fromNote: 'Law firms from $499',
    summary: 'Get found and chosen. The visibility layer under everything else.',
    includes: [
      'Conversion website + care plan',
      'Google Business Profile management',
      'Review generation and reputation',
      'Local listings and citations',
      'Add on: AI search visibility',
      'Add on: Local Services Ads',
    ],
  },
  {
    slug: 'answer',
    name: 'Answer',
    from: priceFrom('answer'),
    summary: 'Every call answered in two rings and booked before it hangs up.',
    includes: [
      'Remi — answering, 24/7',
      'Intake and qualification for your vertical',
      'Booking into your calendar and CRM',
      'Missed-call text-back in 60 seconds',
      'Owner Daily Brief',
    ],
  },
  {
    slug: 'convert',
    name: 'Convert',
    from: priceFrom('convert'),
    flag: 'Most popular',
    summary: 'Answered, then actually kept. The stages where bookings quietly disappear.',
    includes: [
      'Everything in Answer',
      'Web chat and SMS on your site',
      'Lead-source responder — GBP, forms, Yelp, Zillow',
      'Theo — reminders and no-show prevention',
      'June — review and referral requests',
    ],
  },
  {
    slug: 'grow',
    name: 'Grow',
    from: priceFrom('grow'),
    summary: 'Work the database you already paid for, and find out what is actually producing.',
    includes: [
      'Everything in Convert',
      'June — reactivation and win-back campaigns',
      'Theo — estimate and post-consult follow-up',
      'Call-source attribution in the Daily Brief',
    ],
  },
  {
    slug: 'custom',
    name: 'Custom',
    from: 'Quoted',
    summary: 'Multi-location, multilingual, or a workflow that does not fit a column.',
    includes: [
      'Everything in Grow',
      'Custom agent builds — routing, multilingual intake, dispatch',
      'Integration and migration setup',
      'Managed campaigns and dedicated onboarding',
      'DPA and data-residency review',
    ],
  },
];

export const planBySlug = (slug: string) => plans.find((p) => p.slug === slug)!;

/** What sits behind every floor. Published openly on /pricing. */
export const quoteFactors = [
  'How many locations you run',
  'Your industry and how long an intake call takes',
  'Monthly call volume',
  'Which integrations you need',
  'AI search visibility and Local Services Ads add-ons',
  'How many reviews a month you generate',
  'Whether you bundle Found with an agent plan',
];

/** True of every plan, stated once and reused as a label/value pair. */
export const planTerms = [
  { k: 'Contract', v: 'Month-to-month. Cancel any month.' },
  { k: 'Go live', v: 'Five business days.' },
  { k: 'Usage', v: 'Per-minute after your included minutes.' },
];
