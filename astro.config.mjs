import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.keresai.com',
  // English at /, Spanish at /es/…; only pages with a twin under src/pages/es exist in Spanish.
  i18n: { defaultLocale: 'en', locales: ['en', 'es'], routing: { prefixDefaultLocale: false } },
  trailingSlash: 'never',
  // Prefetch same-origin links on hover for near-instant navigation.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      // Legal pages and the resources.html redirect stay out of the sitemap.
      // Guides are emitted by src/pages/guides/[slug].astro but kept at their
      // historical .html URLs, so we exclude the auto (extensionless) routes
      // and list the canonical .html URLs via customPages below.
      filter: (page) =>
        !page.includes('/legal/') &&
        // /go and /go/* are noindex ad landings — never in the sitemap.
        !/\/go(\.html|\/|$)/.test(page) &&
        // /demo and /es/demo are redirect stubs to the quote page.
        !/\/demo(\.html|\/|$)/.test(page) &&
        // /agents/custom and /es/agents/custom are redirect stubs to /custom.
        !/\/agents\/custom(\.html|$)/.test(page) &&
        !page.includes('/resources.html') &&
        // Ad landing pages are noindex and must never enter the sitemap.
        !page.includes('/lp/') &&
        !/\/thank-you(\.html)?$/.test(page) &&
        // Redirect stubs. These emit a meta-refresh page at the old URL;
        // listing them would ask crawlers to index a page whose only job
        // is to send them somewhere else.
        // Anchored to the origin so /glossary/ai-receptionist and friends stay in.
        !/^https:\/\/www\.keresai\.com\/(ai-receptionist|ai-sdr|email-deliverability|deliverability|for-hvac|ai-receptionist-for-(real-estate|professional-intake|dentists))(\.html)?$/.test(page) &&
        // City, state and city×trade pages are noindex (templated, no local
        // office behind them), so they stay out of the sitemap too; the old
        // /ai-receptionist/home-services hub now redirects to /industries/home-services.
        !/^https:\/\/www\.keresai\.com\/ai-receptionist\/[^/]+(\/[^/]+)?$/.test(page) &&
        // Rolling-out integrations are noindex until they ship. Keep this list in
        // step with status: 'rolling-out' in src/data/integrations.ts.
        !/^https:\/\/www\.keresai\.com\/integrations\/(jobber|housecall-pro|twilio|ringcentral|outlook|make|fieldedge|service-fusion|acuity|slack)$/.test(page) &&
        // Comparison pages that are not sourced roundups yet are noindex.
        !/^https:\/\/www\.keresai\.com\/(dialpad|numa|openphone|calendly|apollo|instantly|smartlead)-alternative$/.test(page) &&
        // No published customer stories yet; the page is noindex.
        !/^https:\/\/www\.keresai\.com\/customers(\/|$)/.test(page) &&
        // The cost study moved to /ai-receptionist-cost; the old URL is a redirect stub.
        !/^https:\/\/www\.keresai\.com\/benchmarks\/ai-receptionist-cost-study(\.html)?$/.test(page) &&
        // The old /missed-call-calculator path is now a 301 redirect to
        // /tools/missed-call-calculator — keep the redirect out of the sitemap.
        // Anchored so the canonical /tools/ URL is not matched.
        !/^https:\/\/www\.keresai\.com\/missed-call-calculator(\.html)?$/.test(page) &&
        // Keep the historical .html guide URLs (added via customPages); drop the
        // auto-discovered extensionless /guides/* routes that would 404 on Pages.
        !(page.includes('/guides/') && !page.endsWith('.html')),
      // No lastmod/changefreq/priority: Google ignores the last two, and a
      // build-time lastmod on every URL tells it nothing changed-wise.
      // Guides keep their historical .html URLs; list them explicitly.
      customPages: [
        'https://www.keresai.com/guides/septic-automation-playbook.html',
        'https://www.keresai.com/guides/customer-intake-automation.html',
        'https://www.keresai.com/guides/roofing-growth-through-ai.html',
        'https://www.keresai.com/guides/hvac-scaling-checklist.html',
        'https://www.keresai.com/guides/towing-operations-automation.html',
        'https://www.keresai.com/guides/measuring-automation-roi.html',
        'https://www.keresai.com/guides/integrating-ai-into-your-stack.html',
      ],
    }),
  ],
  // GitHub Pages has no server redirects, so Astro emits a meta-refresh page
  // at each source path. That is slower than a 301 and passes link equity less
  // cleanly, which is why we keep URLs rather than move them wherever we can.
  //
  // Only redirects whose TARGET already builds belong here: in static mode the
  // redirect REPLACES the page at the source path, so pointing one at a route
  // that does not exist yet turns a live page into a dead end.
  //
  // Still deferred: /{competitor}-alternative → /compare/{competitor},
  // which needs the /compare/* routes built first.
  redirects: {
    '/for-hvac': '/industries/home-services',
    // The pillar pages moved onto the named agents. "AI receptionist" and
    // "AI SDR" survive in the H1s and meta descriptions of their targets,
    // which is where searchers actually need those words.
    '/ai-receptionist': '/agents/inbound',
    '/ai-sdr': '/agents/outbound',
    '/email-deliverability': '/agents/outbound',
    // Industry pages merged into the hub that targets the same searcher.
    '/ai-receptionist-for-real-estate': '/industries/real-estate',
    '/ai-receptionist-for-professional-intake': '/industries/law-firms',
    '/ai-receptionist-for-dentists': '/industries/dental-med-spa',
    '/ai-receptionist/home-services': '/industries/home-services',
    // Never published, but named in the brief and cheap to honour.
    '/deliverability': '/agents/outbound',
    // The benchmark cost study was rebuilt from published vendor prices.
    '/benchmarks/ai-receptionist-cost-study': '/ai-receptionist-cost',
  },
  build: {
    // Emit /ai-receptionist.html style files so GitHub Pages serves clean URLs.
    format: 'file',
  },
});
