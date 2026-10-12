import { business, CONTACT_PHONE, ADDRESS_LINE } from '../config/business';
// Centralized JSON-LD building blocks. Keep entity identity consistent everywhere.
import { PHONE } from './site';
import { workers } from './workers';
import { glossary } from './glossary';
import { NOINDEX_GLOSSARY } from '../seo/indexing.mjs';

/** Glossary terms the Organization claims expertise in (indexable pages only). */
const KNOWS_ABOUT = [
  'ai-receptionist', 'ai-answering-service', 'missed-call-text-back', 'appointment-booking-automation',
  'lead-qualification', 'missed-call-recovery', 'after-hours-answering', 'emergency-dispatch',
  'google-business-profile', 'review-generation', 'nap-consistency', 'map-pack',
  'ai-sdr', 'email-deliverability', 'inbox-warmup',
];

export const ORIGIN = 'https://www.keresai.com';
const ORG_ID = `${ORIGIN}/#organization`;

/** The one language every worker answers and writes in today. */
const ENGLISH = { '@type': 'Language', name: 'English', alternateName: 'en' };

/**
 * Short, stable labels per worker. One @id = one name/serviceType/description,
 * so every page that emits a worker's #service node spreads the node from
 * workerServiceSchemas below instead of building its own.
 */
const WORKER_SERVICE: Record<string, { serviceType: string; description?: string }> = {
  found: {
    serviceType: 'Website and Google Business Profile management',
    description:
      'Done-for-you website, Google Business Profile management, review requests and listings for local service businesses, from $249 a month ($499 for law firms), month-to-month.',
  },
  inbound: {
    serviceType: 'AI receptionist',
    description:
      'Remi is an AI receptionist that answers every call in two rings, 24/7, and books the appointment into Google Calendar, HubSpot or ServiceTitan (other tools through Zapier). It texts back missed callers within 60 seconds and also handles website chat, text and form enquiries. Answers in English. One monthly rate with included minutes, then per minute; no per-call fees; month-to-month.',
  },
  'follow-up': { serviceType: 'Appointment confirmations, reminders and estimate follow-up' },
  reactivation: { serviceType: 'Customer reactivation and review requests' },
  outbound: { serviceType: 'Outbound email prospecting' },
  custom: {
    serviceType: 'Custom AI automation',
    description:
      'A worker built for one recurring job in your business, scoped on a call with a fixed build price and a monthly run fee.',
  },
};

const workerServiceName = (w: (typeof workers)[number]) =>
  `${w.name} — ${WORKER_SERVICE[w.slug]?.serviceType ?? w.job}`;

/** One Service node per worker, referenced by the Organization's offer catalog. */
export const workerServiceSchemas = workers.map((w) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${w.href}#service`,
  name: workerServiceName(w),
  serviceType: WORKER_SERVICE[w.slug]?.serviceType ?? w.job,
  description: WORKER_SERVICE[w.slug]?.description ?? `${w.name}: ${w.job}. Includes ${w.includes.join('; ')}.`,
  url: `${ORIGIN}${w.href}`,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'United States' },
  // Language lives on the channel, not the Service (Service has no
  // availableLanguage). Every worker works in English only today.
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${ORIGIN}${w.href}`,
    availableLanguage: ENGLISH,
  },
  audience: { '@type': 'Audience', audienceType: 'Local businesses: home services, law firms, dental practices, med spas, real estate' },
}));

/** The worker's #service node by slug (inbound, found, custom…). */
export const workerService = (slug: string) => {
  const w = workers.find((x) => x.slug === slug);
  const node = workerServiceSchemas.find((n) => n['@id'] === `${ORIGIN}${w?.href}#service`);
  if (!node) throw new Error(`No worker service for ${slug}`);
  return node;
};

// Offer price notes. Found's from-price comes from business.foundFrom; the law
// firm tier ($499) is published on /services/found and /pricing.
const foundFrom = Number(business.foundFrom) || 0;
const FOUND_LAW_FROM = 499;
const monthlyFrom = (minPrice: number) => ({
  '@type': 'UnitPriceSpecification',
  minPrice,
  priceCurrency: 'USD',
  unitCode: 'MON',
});

const offerFor = (w: (typeof workers)[number]) => {
  const itemOffered = { '@type': 'Service', '@id': `${ORIGIN}${w.href}#service`, name: workerServiceName(w) };
  const base = { '@type': 'Offer', name: w.name, itemOffered, url: `${ORIGIN}${w.href}` };
  if (w.slug === 'found') {
    return foundFrom ? { ...base, priceSpecification: monthlyFrom(foundFrom) } : base;
  }
  if (w.slug === 'inbound') {
    return { ...base, description: 'Quoted: one monthly rate with included minutes, then per minute.' };
  }
  return { ...base, description: 'Quoted to your volume on a call.' };
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Keres AI',
  // The home page's canonical carries the trailing slash.
  url: `${ORIGIN}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${ORIGIN}/assets/img/KeresLogo.png`,
    width: 192,
    height: 192,
  },
  description:
    'Keres AI sells AI workers for local businesses. Each does one job: Found gets you found (website, Google listing, reviews), Remi answers every call in two rings and books it, Theo confirms and reminds, June brings past customers back, Sol finds new customers by email, and Custom is built for any recurring job. Every worker reports in one morning text. Month-to-month; setup timing is agreed on the first call. Site available in English and Spanish; Remi answers calls in English only.',
  // Brand variants and disambiguation: an unrelated keres.ai, the Keras library
  // and Kore.ai show up for the same searches.
  alternateName: ['Keres', 'KeresAI', 'keresai.com'],
  disambiguatingDescription:
    'Keres AI (keresai.com) sells websites, Google Business Profile management and an AI receptionist to local service businesses in the United States. Not affiliated with keres.ai, the Keras deep-learning library or Kore.ai.',
  slogan: 'Never miss another lead.',
  areaServed: { '@type': 'Country', name: 'United States' },
  email: business.contactEmail,
  // knowsAbout uses DefinedTerm @id nodes so knowledge graphs resolve entity
  // relationships between the org and the glossary definitions on this site.
  // Only indexable glossary pages belong here (never a NOINDEX_GLOSSARY term).
  knowsAbout: KNOWS_ABOUT.flatMap((slug) => {
    const t = glossary.find((g) => g.slug === slug);
    return t && !NOINDEX_GLOSSARY.includes(slug)
      ? [{ '@type': 'DefinedTerm', '@id': `${ORIGIN}/glossary/${slug}#term`, name: t.term }]
      : [];
  }),
  // sameAs is omitted until real identity profiles exist (a booking link is
  // not one). Add LinkedIn / G2 / Capterra / YouTube URLs here when they do.
  // The line Keres itself answers. Sourced from src/data/site.ts so the
  // header, sticky bar, footer and this node can never drift apart.
  ...((PHONE ?? CONTACT_PHONE) ? { telephone: (PHONE ?? CONTACT_PHONE)!.e164 } : {}),
  ...(ADDRESS_LINE ? { address: { '@type': 'PostalAddress', addressLocality: business.city, addressRegion: business.state, addressCountry: 'US' } } : {}),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    ...((PHONE ?? CONTACT_PHONE) ? { telephone: (PHONE ?? CONTACT_PHONE)!.e164 } : {}),
    url: `${ORIGIN}/quote`,
    email: business.contactEmail,
    availableLanguage: ['English', 'Spanish'],
  },
  // The roster as an offer catalog. Found carries its published from-price;
  // every other worker is quoted, so its Offer has a description and no price.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI workers',
    itemListElement: [
      ...workers.map(offerFor),
      {
        '@type': 'Offer',
        name: 'Found for law firms',
        itemOffered: { '@type': 'Service', '@id': `${ORIGIN}/services/found#service`, name: workerServiceName(workers.find((w) => w.slug === 'found')!) },
        url: `${ORIGIN}/services/found`,
        priceSpecification: monthlyFrom(FOUND_LAW_FROM),
      },
    ],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  name: 'Keres AI',
  alternateName: ['Keres', 'KeresAI', 'keresai.com'],
  url: `${ORIGIN}/`,
  publisher: { '@id': `${ORIGIN}/#organization` },
  inLanguage: ['en-US', 'es-US'],
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
    // Matches the @id the Organization's knowsAbout points at.
    '@id': `${ORIGIN}${opts.path}#term`,
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
  /** Stable @id, e.g. the one the Organization's offer catalog points at. */
  id?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    ...(opts.id ? { '@id': opts.id } : {}),
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
    thumbnailUrl: opts.thumbnailUrl ? ORIGIN + opts.thumbnailUrl : `${ORIGIN}/assets/img/og-image.png`,
    // No invented defaults: a VideoObject without a real date/length is left out.
    ...(opts.uploadDate ? { uploadDate: opts.uploadDate } : {}),
    ...(opts.duration ? { duration: opts.duration } : {}),
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
    // No default: setup timing is agreed on the first call, never assumed.
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
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

// Shared share image, as an ImageObject, for Article nodes.
export const OG_IMAGE = {
  '@type': 'ImageObject',
  url: `${ORIGIN}/assets/img/og-image.png`,
  width: 1200,
  height: 630,
};

/** The @id of the WebPage-family node Layout.astro emits for `path`. */
export const webPageId = (path: string) => `${ORIGIN}${path}#webpage`;

// Article schema — use for guides, playbooks, roundups and data pages.
export function articleSchema(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  readingTime?: string;
  type?: 'Article' | 'BlogPosting';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'Article',
    '@id': `${ORIGIN}${opts.path}#article`,
    headline: opts.headline,
    description: opts.description,
    image: OG_IMAGE,
    url: ORIGIN + opts.path,
    mainEntityOfPage: { '@id': webPageId(opts.path) },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    inLanguage: 'en-US',
    ...(opts.readingTime ? { timeRequired: opts.readingTime } : {}),
    isPartOf: { '@id': `${ORIGIN}/#website` },
  };
}

/** ISO date the vendor prices on the roundup pages were last checked (VENDORS_CHECKED). */
export const VENDORS_CHECKED_ISO = '2026-10-11';

// The product recordings. Upload dates are the dates each file was first
// committed to the site; durations are from ffprobe.
export const receptionistVideoSchema = videoObjectSchema({
  name: 'Keres AI receptionist: example call and operator portal',
  description: 'An example of Remi answering a call, qualifying the caller and booking the appointment, then the operator portal the owner sees. Demo account, not a customer.',
  contentUrl: '/assets/video/ai-receptionist.mp4',
  thumbnailUrl: '/assets/img/operator-portal.webp',
  uploadDate: '2026-05-25',
  duration: 'PT7M57S',
});
export const outboundVideoSchema = videoObjectSchema({
  name: 'Keres AI outbound console: lead library and campaign builder',
  description: 'The lead library and campaign builder behind Sol, the outbound email worker. Recording uses example prospect data.',
  contentUrl: '/assets/video/outbound-console.mp4',
  thumbnailUrl: '/assets/img/outbound-console.webp',
  uploadDate: '2026-09-05',
  duration: 'PT28S',
});

// Speakable extension of the page's WebPage node. Same @id as the node Layout
// emits, so Schema.astro merges the two into one: only `speakable` is added
// here; type, name, url and language come from Layout and cannot disagree.
export function webPageSchema(opts: {
  path: string;
  name?: string;
  description?: string;
  speakableSelectors?: string[];
}) {
  return {
    '@id': webPageId(opts.path),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: opts.speakableSelectors ?? ['.answer-block', '.faq-a', '.lead'],
    },
  };
}
