// The single place business facts live. Nothing on the site may render a
// bracketed placeholder: every consumer reads from here, and the build
// refuses to run while a required value is empty.
//
// Fill these in and rebuild. Formats:
//   phone            E.164, e.g. '+15551234567'  (tel: links, schema.org)
//   phoneDisplay     as printed, e.g. '(555) 123-4567'
//   *FromPrice       digits only, e.g. '349' → rendered "from $349"
//   city / state     e.g. 'Newark', 'NJ'
//   testimonials     real quotes only; leave empty until you have them.

export interface Testimonial {
  quote: string;
  author: string;      // first name is enough
  role?: string;
  firmType: string;    // "HVAC contractor", "personal-injury firm"
  city?: string;
}

export const business = {
  phone: '',
  phoneDisplay: '',
  answerFromPrice: '',
  convertFromPrice: '',
  growFromPrice: '',
  city: '',
  state: '',
  email: 'ops@keresai.com',
  // Where the quote form posts. Formspree delivers to email and can forward
  // to a CRM webhook from its dashboard; swap in your own endpoint (same
  // multipart POST, 2xx on success) when you have one.
  formEndpoint: 'https://formspree.io/f/mojywlnn',
  // The booking embed shown after a successful quote submit.
  bookingUrl: 'https://calendly.com/ops-keresai/30min',
  // Conversion tracking. Empty → no tag loads at all (see tracking.js).
  tracking: {
    ga4: '',           // 'G-XXXXXXXXXX'
    googleAds: '',     // 'AW-XXXXXXXXX'
    metaPixel: '',     // '1234567890123456'
    labels: {          // Google Ads conversion labels (the part after AW-…/)
      form_submit: '',
      tel_click: '',
      phone: '',       // the website-call conversion (number swap, calls ≥30s)
    },
  },
  // Optional. Sentences that need these are omitted when they are empty.
  bundleDiscountPercent: '',
  partnerReferralTerms: '',
  testimonials: [] as Testimonial[],
};

const REQUIRED = ['phone', 'phoneDisplay', 'answerFromPrice', 'convertFromPrice', 'growFromPrice', 'city', 'state'] as const;
export const missing = REQUIRED.filter((k) => !String(business[k] ?? '').trim());

// Production builds fail here. KERES_ALLOW_MISSING=1 is for local builds
// only: the affected elements are omitted from the page — never rendered
// as a bracket — and the deploy workflow does not set it.
if (missing.length && process.env.KERES_ALLOW_MISSING !== '1') {
  throw new Error(
    `src/config/business.ts is missing: ${missing.join(', ')}.\n` +
    `The build refuses to ship a placeholder. Fill them in, or for a local build that omits those elements run with KERES_ALLOW_MISSING=1.`,
  );
}

export const has = {
  phone: !!business.phone.trim() && !!business.phoneDisplay.trim(),
  answerPrice: !!business.answerFromPrice.trim(),
  convertPrice: !!business.convertFromPrice.trim(),
  growPrice: !!business.growFromPrice.trim(),
  address: !!business.city.trim() && !!business.state.trim(),
  testimonials: business.testimonials.length > 0,
};

/** tel: link + display, or null when the line is not configured yet. */
export const PHONE = has.phone
  ? { display: business.phoneDisplay, href: `tel:${business.phone}`, e164: business.phone }
  : null;

/** "from $349" or '' — callers omit the sentence when it is empty. */
export const priceFrom = (key: 'answer' | 'convert' | 'grow'): string => {
  const v = { answer: business.answerFromPrice, convert: business.convertFromPrice, grow: business.growFromPrice }[key].trim();
  return v ? `from $${v}` : '';
};

/**
 * A cost sentence for FAQ answers. With a price: "Remi on the Answer plan
 * starts at $349/month, quoted to …". Without one the sentence still
 * answers the question honestly: "… is quoted to …".
 */
export const priceSentence = (subject: string, key: 'answer' | 'convert' | 'grow', quotedTo: string): string => {
  const p = priceFrom(key);
  return p
    ? `${subject} starts at ${p.replace('from ', '')}/month, quoted to ${quotedTo}.`
    : `${subject} is quoted to ${quotedTo}.`;
};

export const ADDRESS_LINE = has.address ? `${business.city}, ${business.state}` : '';
