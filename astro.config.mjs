import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isIndexable, REDIRECTS, ORIGIN } from './src/seo/indexing.mjs';

export default defineConfig({
  site: 'https://www.keresai.com',
  // English at /, Spanish at /es/…; only pages with a twin under src/pages/es exist in Spanish.
  i18n: { defaultLocale: 'en', locales: ['en', 'es'], routing: { prefixDefaultLocale: false } },
  trailingSlash: 'never',
  // Prefetch same-origin links on hover for near-instant navigation.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      // Everything noindex or a redirect stub stays out of the sitemap. The
      // rules live in src/seo/indexing.mjs, shared with llms.txt so the two
      // never advertise different URL sets. Guides are emitted at their
      // historical .html URLs (customPages below); the auto-discovered
      // extensionless /guides/* routes are dropped there.
      filter: (page) => isIndexable(page),
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
    // The home page's canonical is https://www.keresai.com/ (with the slash).
    // @astrojs/sitemap strips that slash when it writes the file (whatever
    // serialize() returns) under trailingSlash 'never', so put it back after
    // the sitemap is written: sitemap URL == canonical, home included.
    {
      name: 'keres:sitemap-home-slash',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const { readdir, readFile, writeFile } = await import('node:fs/promises');
          for (const f of (await readdir(dir)).filter((n) => /^sitemap-\d+\.xml$/.test(n))) {
            const file = new URL(f, dir);
            const xml = await readFile(file, 'utf8');
            await writeFile(file, xml.replace(`<loc>${ORIGIN}</loc>`, `<loc>${ORIGIN}/</loc>`));
          }
        },
      },
    },
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
  // The map lives in src/seo/indexing.mjs so llms.txt can resolve old URLs.
  redirects: REDIRECTS,
  build: {
    // Emit /ai-receptionist.html style files so GitHub Pages serves clean URLs.
    format: 'file',
  },
});
