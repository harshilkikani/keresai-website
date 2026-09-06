// Ad landing pages → /lp/{slug}.
//
// These are not search pages. They are noindex, kept out of the
// sitemap, carry no nav and no footer links, and exist to convert one
// specific ad group. Every one must pass the ad-readiness checklist
// before a dollar is spent on it.
//
// The shape is deliberately close to geoVerticals.ts so a vertical ×
// geography entry there can be promoted into one of these, but the
// copy stays hand-written: ad copy that reads as generated does not
// convert.

export interface LandingPage {
  slug: string;
  title: string;
  description: string;
  /** Names the vertical AND the geography — checklist item. */
  h1: string;
  sub: string;
  /** roi.js preset key. */
  calcPreset: string;
  calcLabel: string;
  /** Exactly three. What happens when the phone rings. */
  bullets: { head: string; text: string }[];
  /** Practice areas / job types for the form's fourth field. */
  formOptions: string[];
  formFieldLabel: string;
  /** The integrations line. */
  integrations: string;
  /** Exactly two, both vertical-specific. */
  testimonials: { proves: string }[];
  /** Exactly three: cost, setup, human handoff. */
  faqs: { q: string; a: string }[];
}

export const landingPages: LandingPage[] = [
  {
    slug: 'law-firms-nj',
    title: 'NJ Law Firms: Answer Every After-Hours Case Call',
    description:
      'Remi answers every new-client call in two rings, screens conflicts, qualifies the matter and books the consult. New Jersey law firms, live in five business days, month-to-month.',
    h1: 'New Jersey law firms: stop losing after-hours cases to the firm that picked up.',
    sub:
      'Remi, your Inbound Agent, answers every new-client call in two rings — nights, weekends and holidays — screens for conflicts, qualifies the matter, and books the consultation straight into your calendar. Live in five business days. Month-to-month.',
    calcPreset: 'legal',
    calcLabel: 'law firm',
    bullets: [
      {
        head: 'It answers in two rings, at 2 a.m.',
        text: 'No voicemail and no answering service reading from a card. A caller in distress gets a calm, competent intake conversation at the hour they actually call.',
      },
      {
        head: 'It screens the conflict before you promise anything',
        text: 'Caller, opposing party, other parties involved — collected and flagged for your review. Remi never clears a conflict itself; that decision stays with the firm.',
      },
      {
        head: 'It books the consult and writes the file',
        text: 'Real availability offered on the call, the consultation on your calendar, and the full intake summary written to Clio, Lawmatics or HubSpot before you open your laptop.',
      },
    ],
    formFieldLabel: 'Practice area',
    formOptions: [
      'Personal injury',
      'Criminal defense',
      'Family law',
      'Immigration',
      'Estate planning',
      'Other',
    ],
    integrations: 'Works with Clio, Lawmatics, HubSpot and Google Calendar.',
    testimonials: [
      { proves: 'after-hours new-client calls turning into signed matters' },
      { proves: 'consults booked overnight that used to hit voicemail' },
    ],
    faqs: [
      {
        q: 'What does it cost?',
        a: 'Remi starts at $[X]/month on the Answer plan, quoted to your call volume, practice areas and integrations. Found — the website, Google Business Profile, reviews and listings layer — starts at $499/month for firms. Month-to-month, no setup fee on the Found base tier.',
      },
      {
        q: 'How long does setup take?',
        a: 'Five business days. Twenty minutes on how your intake runs today, then we write the script for your practice areas, connect your number, calendar and case management system, and you test it yourself before it answers a real client.',
      },
      {
        q: 'What if a caller needs an attorney right now?',
        a: 'You set the escalation rules — an arraignment, a custody emergency, a named existing client — and Remi warm-transfers to your on-call number. If nobody picks up, the on-call attorney gets a "call me now" alert with the intake already written down, so the client never repeats themselves.',
      },
    ],
  },
];

export const lpBySlug = (slug: string) => landingPages.find((l) => l.slug === slug)!;
