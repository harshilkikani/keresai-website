// What is indexable. One list, read by the sitemap filter (astro.config.mjs),
// llms.txt / llms-full.txt and the glossary pages, so a URL that is noindex or
// a redirect stub can never be advertised to crawlers by one of them.
// Plain .mjs so astro.config.mjs can import it without a TS loader.

export const ORIGIN = 'https://www.keresai.com';

// Thin email/outbound glossary definitions: noindex until consolidated.
export const NOINDEX_GLOSSARY = ['dkim', 'dmarc', 'spf', 'email-sequence', 'email-bounce-rate', 'email-blacklist', 'spam-score', 'reply-rate', 'cold-email-outreach', 'outbound-sales', 'lead-scoring'];

// Rolling-out integrations are noindex until they ship. Keep in step with
// status: 'rolling-out' in src/data/integrations.ts.
export const NOINDEX_INTEGRATIONS = ['jobber', 'housecall-pro', 'twilio', 'ringcentral', 'outlook', 'make', 'fieldedge', 'service-fusion', 'acuity', 'slack'];

// Comparison pages that are not sourced roundups yet are noindex.
export const NOINDEX_COMPARISONS = ['dialpad', 'numa', 'openphone', 'calendly', 'apollo', 'instantly', 'smartlead'];

// Old path → where it redirects (meta-refresh stubs on GitHub Pages).
export const REDIRECTS = {
  '/for-hvac': '/industries/home-services',
  // The pillar pages moved onto the named agents. "AI receptionist" and
  // "AI SDR" survive in the H1s and meta descriptions of their targets.
  '/ai-receptionist': '/agents/inbound',
  '/ai-sdr': '/agents/outbound',
  '/email-deliverability': '/agents/outbound',
  // Industry pages merged into the hub that targets the same searcher.
  '/ai-receptionist-for-real-estate': '/industries/real-estate',
  '/ai-receptionist-for-professional-intake': '/industries/law-firms',
  '/ai-receptionist-for-dentists': '/industries/dental-med-spa',
  '/ai-receptionist-for-med-spas': '/industries/dental-med-spa',
  '/ai-receptionist/home-services': '/industries/home-services',
  // Use cases merged into the page that targets the same searcher.
  '/use-cases/after-hours-answering': '/24-7-ai-receptionist',
  '/use-cases/appointment-booking': '/agents/inbound',
  // Never published, but named in the brief and cheap to honour.
  '/deliverability': '/agents/outbound',
  // The benchmark cost study was rebuilt from published vendor prices.
  '/benchmarks/ai-receptionist-cost-study': '/ai-receptionist-cost',
};

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const alt = (xs) => xs.map(esc).join('|');

/** False for any URL that is noindex, a redirect stub or otherwise kept out of the sitemap. */
export function isIndexable(url) {
  const page = url.startsWith('http') ? url : ORIGIN + url;
  const path = page.slice(ORIGIN.length).replace(/#.*$/, '');
  const bare = path.replace(/\.html$/, '');
  if (Object.prototype.hasOwnProperty.call(REDIRECTS, bare)) return false;
  return (
    // Legal pages are noindex, follow.
    !page.includes('/legal/') &&
    // /go and /go/* are noindex ad landings.
    !/\/go(\.html|\/|$)/.test(page) &&
    // /demo and /es/demo are redirect stubs to the quote page.
    !/\/demo(\.html|\/|$)/.test(page) &&
    // /agents/custom and /es/agents/custom are redirect stubs to /custom.
    !/\/agents\/custom(\.html|$)/.test(page) &&
    !page.includes('/resources.html') &&
    // Ad landing pages are noindex.
    !page.includes('/lp/') &&
    !/\/thank-you(\.html)?$/.test(page) &&
    !/\/404(\.html)?$/.test(page) &&
    // Never published, but kept out explicitly.
    !/^\/(ai-receptionist|ai-sdr|email-deliverability|deliverability|for-hvac)(\.html)?$/.test(path) &&
    // City, state and city×trade pages are noindex (templated, no local office).
    !/^\/ai-receptionist\/[^/]+(\/[^/]+)?$/.test(bare) &&
    !new RegExp(`^/integrations/(${alt(NOINDEX_INTEGRATIONS)})$`).test(bare) &&
    !new RegExp(`^/(${alt(NOINDEX_COMPARISONS)})-alternative$`).test(bare) &&
    // The quote form pages are noindex.
    !/^\/(quote|es\/quote)$/.test(bare) &&
    !new RegExp(`^/glossary/(${alt(NOINDEX_GLOSSARY)})$`).test(bare) &&
    // No published customer stories yet; the page is noindex.
    !/^\/customers(\/|$)/.test(bare) &&
    // The old /missed-call-calculator path redirects to /tools/missed-call-calculator.
    !/^\/missed-call-calculator$/.test(bare) &&
    // Guides live at their historical .html URLs only.
    !(path.startsWith('/guides/') && !path.endsWith('.html'))
  );
}

/**
 * The URL to advertise for a site path (llms.txt and friends): a redirect stub
 * resolves to its target, and anything noindex returns null so it is left out.
 */
export function listablePath(path) {
  const [bare, hash = ''] = path.split('#');
  const target = REDIRECTS[bare] ?? bare;
  if (!isIndexable(target)) return null;
  return target + (hash ? `#${hash}` : '');
}
