import { business } from '../config/business';
// Centralized JSON-LD building blocks. Keep entity identity consistent everywhere.
import { PHONE } from './site';

const ORIGIN = 'https://www.keresai.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: 'Keres AI',
  url: ORIGIN,
  logo: {
    '@type': 'ImageObject',
    url: `${ORIGIN}/assets/img/KeresLogo.png`,
    width: 400,
    height: 400,
  },
  description:
    'Keres AI is an AI receptionist and AI SDR platform for service businesses. It answers every call 24/7 in two rings, books appointments, qualifies leads, and runs AI-powered outbound email that lands in the inbox — so businesses never miss a lead, day or night.',
  foundingDate: '2024',
  slogan: 'Never miss another lead.',
  areaServed: { '@type': 'Country', name: 'United States' },
  email: business.contactEmail,
  // knowsAbout uses DefinedTerm @id nodes so knowledge graphs resolve entity
  // relationships between the org and the glossary definitions on this site.
  knowsAbout: [
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/ai-receptionist#term`, name: 'AI Receptionist' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/ai-answering-service#term`, name: 'AI Answering Service' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/ai-sdr#term`, name: 'AI SDR' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/appointment-booking-automation#term`, name: 'Appointment Booking Automation' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/lead-qualification#term`, name: 'Lead Qualification' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/missed-call-recovery#term`, name: 'Missed-Call Recovery' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/cold-email-outreach#term`, name: 'Cold Email Outreach' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/email-deliverability#term`, name: 'Email Deliverability' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/inbox-warmup#term`, name: 'Inbox Warmup' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/emergency-dispatch#term`, name: 'Emergency Dispatch' },
    { '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/after-hours-answering#term`, name: 'After-Hours Answering' },
  ],
  // sameAs lets knowledge graphs (Google KG, Wikidata, AI training corpora) confirm
  // entity identity across the web. Only list profiles that actually exist and
  // are operated by Keres — Google de-indexes structured data that references
  // dead or unrelated profiles. Re-add LinkedIn / X / G2 / Capterra here once
  // the corresponding accounts are live.
  sameAs: [
    'https://calendly.com/ops-keresai/30min',
  ],
  // The line Keres itself answers. Sourced from src/data/site.ts so the
  // header, sticky bar, footer and this node can never drift apart.
  ...(PHONE ? { telephone: PHONE.e164 } : {}),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    ...(PHONE ? { telephone: PHONE.e164 } : {}),
    url: `${ORIGIN}/quote`,
    email: business.contactEmail,
    availableLanguage: 'English',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  },
};

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${ORIGIN}/#software`,
  name: 'Keres AI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Receptionist & AI SDR Platform',
  operatingSystem: 'Web',
  url: ORIGIN,
  description:
    'AI receptionist and AI SDR platform. Answers every call in two rings, books appointments, qualifies leads, and runs outbound email that lands in the inbox.',
  // Offer intentionally omitted: Keres uses custom B2B quotes, not a public
  // numeric price. Google's structured-data guidelines reject Offer entries
  // without a real `price`, so we surface pricing on the /pricing page and
  // leave the Offer node out rather than emit a fake one.
  featureList: [
    '24/7 AI call answering — answers in two rings, every call',
    'Automated appointment booking on Google Calendar, Outlook, ServiceTitan, Jobber, Housecall Pro',
    'AI lead qualification and capture with CRM sync',
    'Emergency escalation by text to on-call team',
    'AI SDR outbound email with personalization at scale',
    'Email deliverability optimization — SPF, DKIM, DMARC, inbox warmup',
    'Spam call screening and filtering',
    'Done-for-you setup — live in five business days',
  ],
  // additionalProperty surfaces key facts for rich product cards and AI retrieval.
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Setup time', value: 'Five business days' },
    { '@type': 'PropertyValue', name: 'Contract', value: 'Month-to-month, cancel anytime' },
    { '@type': 'PropertyValue', name: 'Answer speed', value: 'Within two rings, 24/7' },
    { '@type': 'PropertyValue', name: 'Coverage', value: '24/7 including nights, weekends, and holidays' },
    { '@type': 'PropertyValue', name: 'Pricing model', value: 'Flat monthly subscription' },
    { '@type': 'PropertyValue', name: 'Industries served', value: 'HVAC, plumbing, roofing, septic, towing, dental, med spa, real estate, legal intake' },
  ],
  provider: { '@id': `${ORIGIN}/#organization` },
  audience: {
    '@type': 'Audience',
    audienceType: 'Service businesses with high inbound call volume',
    geographicArea: { '@type': 'Country', name: 'United States' },
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  name: 'Keres AI',
  url: ORIGIN,
  publisher: { '@id': `${ORIGIN}/#organization` },
  inLanguage: 'en-US',
};

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: ORIGIN + c.path,
    })),
  };
}

// Augments a product schema (e.g. SoftwareApplication) with Review +
// AggregateRating nodes — but ONLY from real testimonials. Never fabricate
// reviews: Google de-indexes fake review markup. Returns the base unchanged
// when there are no testimonials.
export function withReviews(
  base: Record<string, unknown>,
  testimonials: { quote: string; author: string; rating?: number }[],
) {
  if (!testimonials.length) return base;
  const out: Record<string, unknown> = { ...base };
  out.review = testimonials.map((t) => ({
    '@type': 'Review',
    reviewBody: t.quote,
    author: { '@type': 'Person', name: t.author },
    ...(typeof t.rating === 'number'
      ? { reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 } }
      : {}),
  }));
  const rated = testimonials.filter((t) => typeof t.rating === 'number') as { rating: number }[];
  if (rated.length) {
    const avg = rated.reduce((s, t) => s + t.rating, 0) / rated.length;
    out.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Math.round(avg * 10) / 10,
      reviewCount: rated.length,
      bestRating: 5,
    };
  }
  return out;
}

export function definedTermSchema(opts: { term: string; definition: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: opts.term,
    description: opts.definition,
    url: ORIGIN + opts.path,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': `${ORIGIN}/glossary#termset`,
      name: 'Keres AI Glossary',
      url: `${ORIGIN}/glossary`,
    },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  audience?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: ORIGIN + opts.path,
    provider: { '@id': `${ORIGIN}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    ...(opts.audience ? {
      audience: { '@type': 'Audience', audienceType: opts.audience },
    } : {}),
  };
}

// VideoObject schema — use for pages with embedded product demo videos.
export function videoObjectSchema(opts: {
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${ORIGIN}${opts.contentUrl}#video`,
    name: opts.name,
    description: opts.description,
    contentUrl: ORIGIN + opts.contentUrl,
    thumbnailUrl: opts.thumbnailUrl ?? `${ORIGIN}/assets/img/og-image.png`,
    uploadDate: opts.uploadDate ?? '2026-01-15',
    duration: opts.duration ?? 'PT2M30S',
    publisher: { '@id': `${ORIGIN}/#organization` },
    inLanguage: 'en-US',
  };
}

// HowTo schema — use for instructional/workflow pages to capture procedural queries
// and Google AI Overviews ("how to set up X", "how does X work").
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    totalTime: opts.totalTime ?? 'PT5D',
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    supplier: { '@id': `${ORIGIN}/#organization` },
  };
}

// ItemList schema — use for feature comparison tables so AI crawlers can extract
// structured comparison data rather than parsing HTML tables.
export function itemListSchema(opts: {
  name: string;
  items: { name: string; description: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    itemListElement: opts.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      description: item.description,
    })),
  };
}

// Statistics ItemList — emits each statistic as a ListItem so AI crawlers can
// lift individual data points as citable claims. Pair with Article + FAQ on
// data/benchmark pages. Keep `value` honest (ranges, "studies estimate") — never
// fabricate precise figures or attribute them to sources that do not exist.
export function statisticListSchema(opts: {
  name: string;
  stats: { stat: string; context: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    itemListElement: opts.stats.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.stat,
      description: s.context,
    })),
  };
}

// WebPage schema with SpeakableSpecification — marks which CSS selectors contain
// the authoritative answer text for a page, used by Google AI Overviews and
// voice-search assistants to extract spoken-answer passages.
export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  speakableSelectors?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${ORIGIN}${opts.path}#webpage`,
    url: ORIGIN + opts.path,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${ORIGIN}/#website` },
    about: { '@id': `${ORIGIN}/#software` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: opts.speakableSelectors ?? ['.answer-block', '.faq-a', '.lead'],
    },
    inLanguage: 'en-US',
  };
}

// Article schema — use for guides, playbooks, and blog posts.
export function articleSchema(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  readingTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${ORIGIN}${opts.path}#article`,
    headline: opts.headline,
    description: opts.description,
    url: ORIGIN + opts.path,
    author: { '@id': `${ORIGIN}/#organization` },
    publisher: { '@id': `${ORIGIN}/#organization` },
    datePublished: opts.datePublished ?? '2026-01-01',
    dateModified: opts.dateModified ?? '2026-05-26',
    inLanguage: 'en-US',
    ...(opts.readingTime ? { timeRequired: opts.readingTime } : {}),
    isPartOf: { '@id': `${ORIGIN}/#website` },
  };
}
