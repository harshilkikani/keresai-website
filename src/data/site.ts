// Single source of truth for the values that appear on every page.
// When a placeholder is filled in, it is filled in HERE and nowhere else.

/**
 * The line Keres itself answers. Appears in the nav button, the sticky
 * mobile bar, the footer, and organizationSchema.telephone.
 *
 * PLACEHOLDER — replace both values with the real number when it is
 * provisioned. Keep them in sync: `href` must be the E.164 form
 * (tel:+15551234567) and `display` the human form ((555) 123-4567).
 */
export const PHONE = {
  display: '[YOUR NUMBER]',
  href: 'tel:[YOUR NUMBER]',
  /** Schema.org wants E.164. Same placeholder until the line is live. */
  e164: '[YOUR NUMBER]',
};

export const EMAIL = 'ops@keresai.com';
export const ORIGIN = 'https://www.keresai.com';

/**
 * Published price floors. Every plan card shows a "from $" number with
 * "quoted to your volume" beneath it. Custom is the only column without
 * a number — that is deliberate and is the one permitted exception.
 *
 * PLACEHOLDER — Answer, Convert and Grow floors are [X] until supplied.
 * Never invent one. Found's floors are real and published.
 */
export interface Plan {
  slug: string;
  name: string;
  from: string;
  fromNote?: string;
  summary: string;
  includes: string[];
  featured?: boolean;
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
      'Review generation',
      'Listings and citations',
      'AI search visibility',
      'Local Services Ads setup',
    ],
  },
  {
    slug: 'answer',
    name: 'Answer',
    from: 'from $[X]',
    summary: 'Every call answered in two rings, day or night.',
    includes: [
      'Everything in Found',
      'Inbound Agent — 24/7 answering',
      'Vertical intake and qualification',
      'Booking straight to your calendar',
      'Missed-call text-back',
    ],
  },
  {
    slug: 'convert',
    name: 'Convert',
    from: 'from $[X]',
    summary: 'Answered, then actually closed. Follow-up that stops the leak after the call.',
    featured: true,
    includes: [
      'Everything in Answer',
      'Follow-Up Agent — reminders and no-show prevention',
      'Estimate and post-consult follow-up',
      'Owner Daily Brief',
      'CRM and field-service sync',
    ],
  },
  {
    slug: 'grow',
    name: 'Grow',
    from: 'from $[X]',
    summary: 'Work the database you already paid for, then add new demand.',
    includes: [
      'Everything in Convert',
      'Reactivation Agent — win-back and recall',
      'Review and referral requests',
      'Outbound Agent — cold email',
      'Deliverability: SPF, DKIM, DMARC, warmup',
    ],
  },
  {
    slug: 'custom',
    name: 'Custom',
    from: 'Quoted',
    summary: 'Multi-location, high volume, or workflows that do not fit a column.',
    includes: [
      'Multi-location and high call volume',
      'Custom integrations and routing',
      'Dedicated onboarding',
      'DPA, data residency, SOC 2-aligned workflows',
      'Priority support',
    ],
  },
];

/** The four agents. Names are used consistently sitewide (plain titles). */
export const agents = [
  {
    slug: 'inbound',
    name: 'Inbound Agent',
    // "AI receptionist" stays in H1 and meta description because that is
    // what searchers type — the plain title is what we call the product.
    searchTerm: 'AI receptionist',
    leak: 'The call you did not answer.',
    summary: 'Answers in two rings, 24/7. Vertical intake, booking, missed-call text-back.',
  },
  {
    slug: 'follow-up',
    name: 'Follow-Up Agent',
    searchTerm: 'appointment reminders',
    leak: 'The booking that never showed up.',
    summary: 'Reminders, no-show prevention, estimate and post-consult follow-up.',
  },
  {
    slug: 'reactivation',
    name: 'Reactivation Agent',
    searchTerm: 'database reactivation',
    leak: 'The customer list nobody has called in a year.',
    summary: 'Database reactivation, win-back, review and referral requests.',
  },
  {
    slug: 'outbound',
    name: 'Outbound Agent',
    searchTerm: 'AI SDR',
    leak: 'The pipeline you never started.',
    summary: 'Cold email that reaches the inbox, with deliverability managed.',
  },
];
