import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production origin. Drives sitemap + canonical URLs.
export default defineConfig({
  site: 'https://www.keresai.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Legal pages and the resources.html redirect stay out of the sitemap.
      filter: (page) => !page.includes('/legal/') && !page.includes('/resources.html'),
      changefreq: 'weekly',
      lastmod: new Date(),
      // Guides live as static files in public/, so add them explicitly.
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
  build: {
    // Emit /ai-receptionist.html style files so GitHub Pages serves clean URLs.
    format: 'file',
  },
});
