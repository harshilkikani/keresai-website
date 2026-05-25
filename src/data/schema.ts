// Centralized JSON-LD building blocks. Keep entity identity consistent everywhere.
const ORIGIN = 'https://www.keresai.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: 'Keres AI',
  url: ORIGIN,
  logo: `${ORIGIN}/assets/img/KeresLogo.png`,
  description:
    'Keres AI is an AI receptionist and AI SDR platform. It answers every call 24/7, books appointments, qualifies leads, and runs outbound email that reaches the inbox.',
  foundingDate: '2024',
  areaServed: { '@type': 'Country', name: 'United States' },
  email: 'ops@keresai.com',
  sameAs: ['https://calendly.com/ops-keresai/30min'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: `${ORIGIN}/demo`,
    email: 'ops@keresai.com',
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
    '24/7 AI call answering',
    'Automated appointment booking',
    'AI lead qualification and capture',
    'AI SDR outbound email',
    'Email deliverability optimization',
    'CRM and calendar integration',
  ],
  provider: { '@id': `${ORIGIN}/#organization` },
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

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
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
  };
}
