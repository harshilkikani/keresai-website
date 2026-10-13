import { business, CONTACT_PHONE, ADDRESS_LINE } from '../config/business';
// Centralized JSON-LD building blocks. Keep entity identity consistent everywhere.
import { PHONE } from './site';
import { workers } from './workers';
import { glossary } from './glossary';
import { NOINDEX_GLOSSARY } from '../seo/indexing.mjs';
import { workers as workersEs } from '../i18n/data.es';
import { answeringVendors, specialistVendors, keresRow } from './answeringVendors';
import { gbpVendors, keresGbpRow } from './gbpVendors';

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

/** "Remi by Keres AI": the brand in the name keeps Remi apart from unrelated products called Remi. */
const workerServiceName = (w: { slug: string; name: string }) =>
  w.slug === 'custom' ? 'Custom AI worker by Keres AI' : `${w.name} by Keres AI`;
/** The pre-2026-10 node name, kept as an alternateName so the entity reads as the same one. */
const workerServiceAltName = (w: (typeof workers)[number]) =>
  `${w.name} — ${WORKER_SERVICE[w.slug]?.serviceType ?? w.job}`;

// Offer price notes. Found's from-price comes from business.foundFrom; the law
// firm tier ($499) is published on /services/found and /pricing. Every other
// worker is quoted, so its Offer carries a description and never a price.
const foundFrom = Number(business.foundFrom) || 0;
const FOUND_LAW_FROM = 499;
const monthlyFrom = (minPrice: number) => ({
  '@type': 'UnitPriceSpecification',
  minPrice,
  priceCurrency: 'USD',
  unitCode: 'MON',
});
const QUOTED: Record<string, string> = {
  inbound: 'Quoted: one monthly rate with included minutes, then per minute.',
  custom: 'Quoted: a fixed build price and a monthly run fee, scoped on a 30-minute call.',
};
const quotedNote = (slug: string) => QUOTED[slug] ?? 'Quoted to your volume on a 30-minute call.';

/** The Offers on a worker's own Service node (no itemOffered: the Service is the subject). */
const serviceOffers = (w: (typeof workers)[number]) => {
  const base = { '@type': 'Offer', url: `${ORIGIN}/pricing`, offeredBy: { '@id': ORG_ID } };
  if (w.slug === 'found' && foundFrom) {
    return [
      { ...base, name: 'Found', priceCurrency: 'USD', priceSpecification: monthlyFrom(foundFrom) },
      { ...base, name: 'Found for law firms', priceCurrency: 'USD', priceSpecification: monthlyFrom(FOUND_LAW_FROM) },
    ];
  }
  return [{ ...base, name: w.name, description: quotedNote(w.slug) }];
};

/** One Service node per worker, referenced by the Organization's offer catalog. */
export const workerServiceSchemas = workers.map((w) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${w.href}#service`,
  name: workerServiceName(w),
  alternateName: workerServiceAltName(w),
  serviceType: WORKER_SERVICE[w.slug]?.serviceType ?? w.job,
  description: WORKER_SERVICE[w.slug]?.description ?? `${w.name}: ${w.job}. Includes ${w.includes.join('; ')}.`,
  url: `${ORIGIN}${w.href}`,
  provider: { '@id': ORG_ID },
  brand: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'United States' },
  // Language lives on the channel, not the Service (Service has no
  // availableLanguage). Every worker works in English only today.
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${ORIGIN}${w.href}`,
    availableLanguage: ENGLISH,
  },
  audience: { '@type': 'Audience', audienceType: 'Local businesses: home services, law firms, dental practices, med spas, real estate' },
  offers: serviceOffers(w),
}));

/**
 * The worker Service nodes as the Spanish pages carry them: the same @id and
 * facts, with the description replaced by the Spanish copy those pages show
 * (src/i18n/data.es.ts). The workers still answer in English only.
 */
export const workerServiceSchemasEs = (opts: { includes?: boolean } = {}) =>
  workerServiceSchemas.map((node) => {
    const es = workersEs.find((x) => `${ORIGIN}${x.href}#service` === node['@id']);
    if (!es) return node;
    const description = opts.includes ? `${es.name}: ${es.job}. Incluye: ${es.includes.join('; ')}.` : `${es.name}: ${es.job}.`;
    return { ...node, description };
  });

/** The worker's #service node by slug (inbound, found, custom…). */
export const workerService = (slug: string) => {
  const w = workers.find((x) => x.slug === slug);
  const node = workerServiceSchemas.find((n) => n['@id'] === `${ORIGIN}${w?.href}#service`);
  if (!node) throw new Error(`No worker service for ${slug}`);
  return node;
};

/** A short, self-describing pointer at a worker's #service node (isRelatedTo, ItemList items). */
export const workerServiceRef = (slug: string) => {
  const w = workers.find((x) => x.slug === slug);
  if (!w) throw new Error(`No worker ${slug}`);
  return { '@type': 'Service', '@id': `${ORIGIN}${w.href}#service`, name: workerServiceName(w), url: `${ORIGIN}${w.href}` };
};

const offerFor = (w: (typeof workers)[number]) => {
  const itemOffered = { '@type': 'Service', '@id': `${ORIGIN}${w.href}#service`, name: workerServiceName(w) };
  const base = { '@type': 'Offer', name: w.name, itemOffered, url: `${ORIGIN}${w.href}` };
  if (w.slug === 'found') {
    return foundFrom ? { ...base, priceSpecification: monthlyFrom(foundFrom) } : base;
  }
  return { ...base, description: quotedNote(w.slug) };
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
  image: `${ORIGIN}/assets/img/og-image.png`,
  description:
    'Keres AI sells AI workers for local businesses. Each does one job: Found gets you found (website, Google listing, reviews), Remi answers every call in two rings and books it, Theo confirms and reminds, June brings past customers back, Sol finds new customers by email, and Custom is built for any recurring job. Every worker reports in one morning text. Month-to-month; setup timing is agreed on the first call. Site available in English and Spanish; Remi answers calls in English only.',
  // Brand variants and disambiguation: an unrelated keres.ai, the Keras library
  // and Kore.ai show up for the same searches.
  alternateName: ['Keres', 'KeresAI', 'keresai.com'],
  disambiguatingDescription:
    'Keres AI (keresai.com) sells websites, Google Business Profile management and an AI receptionist to local service businesses in the United States. Not affiliated with keres.ai, the Keras deep-learning library or Kore.ai.',
  slogan: 'Never miss another lead.',
  // How pages are written, sourced, dated and corrected.
  publishingPrinciples: `${ORIGIN}/editorial-policy`,
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
    // /contact is the indexable contact page (/quote is noindex). Sales and
    // support run in English; Spanish support is not confirmed.
    url: `${ORIGIN}/contact`,
    email: business.contactEmail,
    availableLanguage: ENGLISH,
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
        itemOffered: { '@type': 'Service', '@id': `${ORIGIN}/services/found#service`, name: workerServiceName({ slug: 'found', name: 'Found' }) },
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

// No Review / AggregateRating / Person helpers on purpose: the site shows no
// real reviews and names no founder. Add them only when real ones exist.

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

/**
 * Which worker(s) a derived Service page (an industry, trade, integration or
 * use-case page) applies. Anything not listed is Remi's.
 */
const RELATED_WORKERS: Record<string, string[]> = {
  '/industries/home-services': ['inbound', 'found'],
  '/industries/law-firms': ['inbound', 'found'],
  '/industries/dental-med-spa': ['inbound', 'found'],
  '/industries/real-estate': ['inbound', 'found'],
  '/use-cases/financing-follow-up': ['inbound', 'follow-up'],
  '/use-cases/maintenance-plan-reactivation': ['inbound', 'reactivation'],
};

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  audience?: string;
  /** Stable @id; defaults to `<url>#service`, which the page's WebPage takes as mainEntity. */
  id?: string;
  /** Worker slugs this page's service applies; defaults from RELATED_WORKERS, then Remi. */
  relatedTo?: string[];
}) {
  const related = opts.relatedTo ?? RELATED_WORKERS[opts.path] ?? ['inbound'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': opts.id ?? `${ORIGIN}${opts.path}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: ORIGIN + opts.path,
    provider: { '@id': `${ORIGIN}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    ...(opts.audience ? {
      audience: { '@type': 'Audience', audienceType: opts.audience },
    } : {}),
    isRelatedTo: related.map(workerServiceRef),
  };
}

/**
 * A free on-site tool (checker, calculator, estimator) as a CreativeWork. Not
 * WebApplication/SoftwareApplication: those want ratings the site does not
 * have. The page's WebPage takes `#tool` as its mainEntity.
 */
export function toolSchema(opts: { path: string; name: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${ORIGIN}${opts.path}#tool`,
    name: opts.name,
    description: opts.description,
    url: ORIGIN + opts.path,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    provider: { '@id': ORG_ID },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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

// Vendors the roundups compare, by the name they are listed under, with the
// home-page URL the page cites. Keres's own rows point at its #service nodes.
const VENDOR_URLS = new Map<string, string>([
  ...Object.values(answeringVendors).map((v) => [v.name, v.url] as [string, string]),
  ...Object.values(specialistVendors).map((v) => [v.name, v.url] as [string, string]),
  ...gbpVendors.map((v) => [v.name, v.url] as [string, string]),
]);
const KERES_ROWS: Record<string, string> = { [keresRow.name]: 'inbound', [keresGbpRow.name]: 'found' };

/** The `item` a roundup ListItem points at: the vendor as an Organization, or Keres's own Service. */
const listItemTarget = (name: string, url?: string) => {
  if (KERES_ROWS[name]) return workerServiceRef(KERES_ROWS[name]);
  const vendorUrl = VENDOR_URLS.get(name);
  if (vendorUrl) return { '@type': 'Organization', name, url: vendorUrl };
  if (url) return { '@type': 'WebPage', '@id': `${ORIGIN}${url}#webpage`, name, url: ORIGIN + url };
  return null;
};

// ItemList schema — use for feature comparison tables so AI crawlers can extract
// structured comparison data rather than parsing HTML tables. Items named after
// a compared vendor (or Keres's own row) link to it; `url` links a site page.
export function itemListSchema(opts: {
  name: string;
  items: { name: string; description: string; url?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => {
      const target = listItemTarget(item.name, item.url);
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        description: item.description,
        ...(target ? { item: target } : {}),
      };
    }),
  };
}

/** The compared vendors in a roundup ItemList, as Article `mentions` (Keres's own row left out). */
export function vendorMentions(list: { itemListElement: { item?: Record<string, unknown> }[] }) {
  return list.itemListElement
    .map((li) => li.item)
    .filter((it): it is Record<string, unknown> => !!it && it['@type'] === 'Organization');
}

/** Sources a page links, as `citation` CreativeWorks (name as the page shows it, and its URL). */
export const citations = (sources: { label: string; url: string }[]) =>
  sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url }));

/** The two lead-response studies /missed-call-statistics links in its sources list. */
export const LEAD_RESPONSE_SOURCES = [
  { label: 'Oldroyd & InsideSales.com, Lead Response Management Study (15,000 leads, six companies)', url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf' },
  { label: 'Oldroyd, McElheran & Elkington, “The Short Life of Online Sales Leads,” Harvard Business Review (2011)', url: 'https://scholarsarchive.byu.edu/facpub/9711' },
];

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
