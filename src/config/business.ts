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
  // Does Remi answer calls in Spanish today? true or false — never guessed.
  // While it is null the build fails naming it. false gates every Spanish
  // page that shows Remi answering: a one-line disclosure under the hero
  // lede and the site-on-phone mock in place of the call transcript.
  remiSpanish: null as boolean | null,
  // The one address the site shows: footer, form fallback and confirmation,
  // contact page, schema.org, llms.txt. Nothing else may hard-code an email.
  contactEmail: 'ops@keresai.com',
  // Where the quote form posts. Formspree delivers to email and can forward
  // to a CRM webhook from its dashboard; swap in your own endpoint (same
  // multipart POST, 2xx on success) when you have one.
  // Formspree dashboard: set the notification address AND the reply-to to
  // contactEmail above, so a reply to a lead email comes back to ops.
  formEndpoint: 'https://formspree.io/f/mojywlnn',
  // The booking embed shown after a successful quote submit.
  bookingUrl: 'https://calendly.com/ops-keresai/30min',
  // Optional. A Calendly event set up in Spanish, shown to /es leads instead
  // of bookingUrl. Empty → the English event; Calendly renders its own UI in
  // the visitor's browser language, and the embed is marked lang="es".
  calendlyEs: '',
  // Optional. An endpoint that makes Remi call the lead back right now.
  // Receives a JSON POST {phone, lang, business, page, event_id}; any 2xx
  // means the call was placed. Empty, or remiSpanish false, → the
  // "¿Prefieres que Remi te llame ahora?" button is not rendered.
  remiCallbackEndpoint: '',
  // Conversion tracking. Empty → no tag loads at all (see tracking.js).
  tracking: {
    ga4: '',           // 'G-XXXXXXXXXX'
    googleAds: '',     // 'AW-XXXXXXXXX'
    metaPixel: '',     // '1234567890123456'
    labels: {          // Google Ads conversion labels (the part after AW-…/)
      form_submit: '',
      tel_click: '',
      phone: '',       // the website-call conversion (number swap, calls ≥30s)
      booking: '',     // a meeting booked in the Calendly embed after the form
      // Optional Spanish-page labels so Google Ads can count Spanish leads apart.
      // Empty → the base label above is used on /es too.
      form_submit_es: '',
      tel_click_es: '',
      phone_es: '',
      booking_es: '',
    },
    // Enhanced conversions (Google) and advanced matching (Meta): a SHA-256
    // hash of the submitted mobile number rides with the Lead and Schedule
    // events so the platforms can match the lead to the click. Turn on only
    // after accepting Google's customer-data terms in the Ads account; the
    // privacy policy already discloses it.
    enhancedConversions: false,
  },
  // Optional. Sentences that need these are omitted when they are empty.
  bundleDiscountPercent: '',
  partnerReferralTerms: '',
  testimonials: [] as Testimonial[],
};

const REQUIRED = ['phone', 'phoneDisplay', 'answerFromPrice', 'convertFromPrice', 'growFromPrice', 'city', 'state', 'remiSpanish'] as const;
const unset = (v: unknown) => v === null || v === undefined || String(v).trim() === '';
export const missing = REQUIRED.filter((k) => unset(business[k]));

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
  // Only an explicit true lifts the Spanish gate. null (local build under
  // KERES_ALLOW_MISSING) renders the gated state: the site never overclaims.
  remiSpanish: business.remiSpanish === true,
  callback: !!business.remiCallbackEndpoint.trim(),
  calendlyEs: !!business.calendlyEs.trim(),
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
