// Every service Keres sells, attached to the pipeline stage it plugs
// and tagged with the plan that first includes it.
//
// This is the catalog. Nothing outside it is a first-party offer —
// see partnerReferralOnly in site.ts for what we refer out instead.
//
// /services renders these as seven stage blocks; the agent pages pull
// the subset that belongs to them, so a service can never be described
// two different ways on two different pages.

import { stages, type Stage } from './leaks';

export interface Service {
  name: string;
  /** One or two lines. This is the only description of this service. */
  desc: string;
  /** The plan that first includes it. */
  plan: 'Found' | 'Answer' | 'Convert' | 'Grow' | 'Custom';
  /** Marks a Found add-on rather than base scope. */
  addOn?: boolean;
}

export interface StageBlock extends Stage {
  services: Service[];
  /** Where the reader goes to read more. */
  ctaHref: string;
  ctaLabel: string;
}

const byStage: Record<number, { services: Service[]; ctaHref: string; ctaLabel: string }> = {
  0: {
    ctaHref: '/services/found',
    ctaLabel: 'Everything in Found',
    services: [
      {
        name: 'Conversion Website',
        plan: 'Found',
        desc: 'Five to eight pages on a template built for your vertical, with click-to-call, a booking widget wired to Remi, chat and SMS embedded, schema markup and a live reviews feed. Flat monthly, no build fee at the base tier.',
      },
      {
        name: 'Website Care Plan',
        plan: 'Found',
        desc: 'Updates, backups, security, uptime and speed monitoring, small content edits, and one monthly report you can actually read.',
      },
      {
        name: 'Google Business Profile Management',
        plan: 'Found',
        desc: 'One-time optimization — categories, services, photos, Q&A, verification — then weekly posts, photo updates, review responses, spam-listing removal and monthly insights.',
      },
      {
        name: 'Review Generation & Reputation',
        plan: 'Found',
        desc: 'A review request after every completed job or matter, owner responses drafted for your approval, unhappy customers routed to you privately before they post, and a monthly rating report.',
      },
      {
        name: 'Local Listings & Citations',
        plan: 'Found',
        desc: 'One consistent name, address and phone across Apple, Bing, Yelp, Nextdoor and Angi — plus Avvo and FindLaw for firms, Healthgrades for practices.',
      },
      {
        name: 'AI Search Visibility',
        plan: 'Found',
        addOn: true,
        desc: 'Structured data, FAQ and service pages written to be quoted by ChatGPT, Google AI Overviews and Perplexity, entity consistency across your profile and listings, and a monthly report on whether you are actually cited for your service near your city.',
      },
      {
        name: 'Local Services Ads Setup & Response',
        plan: 'Found',
        addOn: true,
        desc: 'Verification, listing, and the always-answered guarantee. Google ranks Local Services Ads on how fast you answer and how you are reviewed — Remi answers in two rings.',
      },
      {
        name: 'Call Tracking & Attribution',
        plan: 'Found',
        desc: 'A tracking number per channel — Google Business Profile, Local Services Ads, your site, your ads — so the Daily Brief can tell you which source produced which booked appointment.',
      },
    ],
  },
  1: {
    ctaHref: '/agents/inbound',
    ctaLabel: 'What Remi does',
    services: [
      {
        name: '24/7 Answering',
        plan: 'Answer',
        desc: 'Remi picks up in two rings — after hours, weekends, holidays, and as overflow when your team is already on the line. No hold music, no voicemail.',
      },
      {
        name: 'Missed-Call Text-Back',
        plan: 'Answer',
        desc: 'Any call that still gets away is texted back inside 60 seconds with a real question, not an autoresponder, and the conversation continues by SMS.',
      },
      {
        name: 'Web Chat & SMS',
        plan: 'Convert',
        desc: 'The same agent answers the chat widget on your site and your business text line, so a visitor who will not phone still gets booked.',
      },
      {
        name: 'Lead-Source Responder',
        plan: 'Convert',
        desc: 'Google Business Profile messages, website forms, Yelp, Thumbtack, Avvo and Zillow enquiries all get answered in minutes instead of whenever someone checks the inbox.',
      },
    ],
  },
  2: {
    ctaHref: '/agents/inbound#intake',
    ctaLabel: 'How intake works',
    services: [
      {
        name: 'Vertical Intake & Qualification',
        plan: 'Answer',
        desc: 'Remi runs your script, not a generic one: matter type and conflict details for firms, job type and urgency for trades, procedure and insurance for practices, budget and timeline for real estate.',
      },
      {
        name: 'Human Escalation',
        plan: 'Answer',
        desc: 'You set the rules for what needs a person. Remi warm-transfers to your on-call number, and if nobody picks up you get a "call me now" alert with everything it already collected.',
      },
      {
        name: 'Owner Daily Brief',
        plan: 'Answer',
        desc: 'One text each morning: calls answered, leads qualified, appointments booked, no-shows prevented, reviews posted, and which source produced the bookings.',
      },
    ],
  },
  3: {
    ctaHref: '/agents/inbound#booking',
    ctaLabel: 'How booking works',
    services: [
      {
        name: 'Calendar & CRM Booking',
        plan: 'Answer',
        desc: 'Remi offers real availability and writes the appointment into Google Calendar, HubSpot, ServiceTitan or your practice system while the caller is still on the line.',
      },
      {
        name: 'Booking Confirmation',
        plan: 'Answer',
        desc: 'The caller gets a confirmation text they can reply to, with reschedule and cancel handled in the same thread rather than by phone tag.',
      },
    ],
  },
  4: {
    ctaHref: '/agents/follow-up',
    ctaLabel: 'What Theo does',
    services: [
      {
        name: 'Confirmations & Reminders',
        plan: 'Convert',
        desc: 'Theo confirms by text and voice on your schedule, handles the reschedule in thread, and escalates the ones that go quiet.',
      },
      {
        name: 'Waitlist Backfill',
        plan: 'Convert',
        desc: 'When a slot cancels, Theo works your waitlist immediately so the hour gets sold rather than lost.',
      },
      {
        name: 'Pre-Appointment Intake',
        plan: 'Convert',
        desc: 'Documents, photos, insurance details and forms collected before they arrive, so nobody sits in your waiting room filling out paperwork.',
      },
    ],
  },
  5: {
    ctaHref: '/agents/follow-up#estimates',
    ctaLabel: 'How follow-up runs',
    services: [
      {
        name: 'Estimate & Quote Follow-Up',
        plan: 'Grow',
        desc: 'Theo follows up on day 1, day 3 and day 7 until you have a yes or a no — the three touches almost nobody in a small firm has time to make.',
      },
      {
        name: 'Post-Consult Follow-Up',
        plan: 'Grow',
        desc: 'Thirty days of structured follow-up for the leads who showed up and did not sign, so the ones who were only slow do not get counted as lost.',
      },
    ],
  },
  6: {
    ctaHref: '/agents/reactivation',
    ctaLabel: 'What June does',
    services: [
      {
        name: 'Database Reactivation',
        plan: 'Grow',
        desc: 'Campaigns against past customers and the cold leads already in your CRM — tune-up season, dental recall, "still need that looked at?" — run as conversations, not blasts.',
      },
      {
        name: 'Win-Back & Closed-Lost Revival',
        plan: 'Grow',
        desc: 'Everyone who said no in the last six to twelve months gets asked again properly, at a point when their answer may well have changed.',
      },
      {
        name: 'Review & Referral Requests',
        plan: 'Convert',
        desc: 'A review ask after every completed job or matter, unhappy customers intercepted and routed to you privately, and referral asks to the customers who rated you highest.',
      },
    ],
  },
};

export const stageBlocks: StageBlock[] = stages.map((s) => ({ ...s, ...byStage[s.n] }));

/** Sol sits outside the seven — it creates demand rather than plugging a leak. */
export const outboundBlock = {
  name: 'Beyond the seven: net-new pipeline',
  leak: 'When referrals slow down there is no second source of demand, and a quiet month becomes a quiet quarter.',
  ctaHref: '/agents/outbound',
  ctaLabel: 'What Sol does',
  services: [
    {
      name: 'Cold Outbound Email',
      plan: 'Custom' as const,
      desc: 'Personalized sequences to a list you approve, replies handled in thread, and meetings booked onto your calendar.',
    },
    {
      name: 'Deliverability Setup',
      plan: 'Custom' as const,
      desc: 'SPF, DKIM, DMARC, domain warm-up and list hygiene done before a single send. Sending is the easy half; landing in the inbox is the half that gets skipped.',
    },
  ],
};

/** Everything under Custom. Quoted, never listed with a floor. */
export const customBuilds = [
  'Multi-location call routing and per-branch intake',
  'Multilingual intake on the same number',
  'Specialized practice flows and internal dispatch agents',
  'Collections and invoice-reminder agents',
  'Integration and data-migration work',
  'Managed reactivation campaigns run for you',
];
