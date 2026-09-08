import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production origin. Drives sitemap + canonical URLs.
// Per-page-type crawl priority. Higher = more important for crawlers.
function priorityFor(url) {
  const p = new URL(url).pathname.replace(/\.html$/, '');
  if (p === '' || p === '/') return 1.0;
  if ([
    '/pricing', '/demo', '/services', '/services/found', '/hear-it',
    '/agents/inbound', '/agents/follow-up', '/agents/reactivation', '/agents/outbound',
  ].includes(p)) return 0.9;
  // Industry hubs sit above the nine narrower industry pages beneath them.
  if (/^\/industries\//.test(p)) return 0.85;
  if ([
    '/glossary', '/integrations', '/use-cases', '/tools', '/blog', '/industries',
    '/ai-answering-service', '/24-7-ai-receptionist', '/compare',
    '/ai-receptionist/home-services', '/missed-call-statistics', '/benchmarks',
  ].includes(p)) return 0.8;
  // State hubs sit above individual city pages in the geographic hierarchy.
  if (/^\/ai-receptionist\/state\//.test(p)) return 0.75;
  // Industry pages, city pages, geo×vertical pages, benchmarks, comparisons,
  // use-case, integration, glossary, and tool pages.
  if (
    /^\/(ai-receptionist-for-|ai-receptionist\/|integrations\/|use-cases\/|glossary\/|tools\/|benchmarks\/)/.test(p) ||
    /-alternative$/.test(p)
  ) return 0.7;
  if (/^\/guides\//.test(p)) return 0.6;
  return 0.5; // about, contact, customers, etc.
}

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
        !/\/(ai-receptionist|ai-sdr|email-deliverability|deliverability|for-hvac)(\.html)?$/.test(page) &&
        // The old /missed-call-calculator path is now a 301 redirect to
        // /tools/missed-call-calculator — keep the redirect out of the sitemap.
        // Anchored so the canonical /tools/ URL is not matched.
        !/^https:\/\/www\.keresai\.com\/missed-call-calculator(\.html)?$/.test(page) &&
        // Keep the historical .html guide URLs (added via customPages); drop the
        // auto-discovered extensionless /guides/* routes that would 404 on Pages.
        !(page.includes('/guides/') && !page.endsWith('.html')),
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize: (item) => ({ ...item, priority: priorityFor(item.url) }),
      // Guides keep their historical .html URLs; list them explicitly.
      customPages: [
        'https://www.keresai.com/guides/septic-automation-playbook.html',
        'https://www.keresai.com/guides/customer-intake-automation.html',
        'https://www.keresai.com/guides/roofing-growth-through-ai.html',
        'https://www.keresai.com/guides/hvac-scaling-checklist.html',
        'https://www.keresai.com/guides/towing-operations-automation.html',
        'https://www.keresai.com/guides/measuring-automation-roi.html',
        'https://www.keresai.com/guides/integrating-ai-into-your-stack.html',
        'https://www.keresai.com/guides/roofing-case-study-15-hours.html',
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
    // Never published, but named in the brief and cheap to honour.
    '/deliverability': '/agents/outbound',
  },
  build: {
    // Emit /ai-receptionist.html style files so GitHub Pages serves clean URLs.
    format: 'file',
  },
});
