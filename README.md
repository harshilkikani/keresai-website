# Keres AI Website

Marketing site for [Keres AI](https://www.keresai.com) — the **AI receptionist & AI SDR platform** for businesses that live on the phone. Answer every call, book every appointment, and run outbound that lands in the inbox.

## Stack
[Astro](https://astro.build) (static output) + the original vanilla CSS/JS. No framework runtime ships to the browser — Astro renders everything to static HTML at build time, so it deploys to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Structure
```
src/
├── layouts/Layout.astro        # Shared <head> (SEO, schema slot, CSP, analytics), Nav, Footer
├── components/
│   ├── Nav.astro  Footer.astro
│   ├── Schema.astro            # Renders JSON-LD blocks
│   ├── Breadcrumbs.astro  FaqSection.astro  CtaBand.astro
├── data/
│   ├── schema.ts               # Organization / SoftwareApplication / FAQ / Breadcrumb / Service helpers
│   ├── industries.ts           # Drives /ai-receptionist-for-{industry}
│   └── comparisons.ts          # Drives /{competitor}-alternative
└── pages/                      # One file per route; dynamic routes generate programmatic pages
public/
├── assets/                     # styles.css, pages.css, app.js, roi.js, img, video (served verbatim)
├── guides/  legal/             # Static content pages
├── robots.txt  llms.txt  CNAME
_legacy/                        # Pre-Astro static site, kept for reference (gitignored)
```

Build output goes to `dist/`. Clean URLs (`/ai-receptionist`, no `.html`) work because Astro emits `*.html` files and GitHub Pages serves them at the extensionless path.

## Local development
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview    # serve dist/ locally
```

## Adding programmatic pages
- **New industry page** → add an entry to `src/data/industries.ts`. A `/ai-receptionist-for-{slug}` page builds automatically.
- **New comparison page** → add an entry to `src/data/comparisons.ts`. A `/{slug}` page builds automatically.

## Deployment (GitHub Pages)
`.github/workflows/deploy.yml` builds with Astro and deploys `dist/` on every push to `main`.
**One-time setup:** in the GitHub repo, Settings → Pages → Build and deployment → Source = **GitHub Actions**. The `public/CNAME` (`www.keresai.com`) is included in the build output, so the custom domain is preserved.

## Analytics & Search Console
- **Analytics:** [Plausible](https://plausible.io) is wired in `src/layouts/Layout.astro` (`ANALYTICS_DOMAIN = 'keresai.com'`). Add the site in your Plausible account to start collecting data, or set `ANALYTICS_DOMAIN = ''` to disable. The CSP already allows `plausible.io`. To use GA4 instead, swap the script and update the CSP `script-src`/`connect-src`.
- **Search Console / Bing:** prefer **DNS TXT verification** (no CSP impact). If you must use the HTML-tag method, set `GSC_VERIFICATION` in `Layout.astro`. After verifying, submit `https://www.keresai.com/sitemap-index.xml`.

## Configuration
- **Formspree form ID:** `mojywlnn`
- **Calendly URL:** `https://calendly.com/ops-keresai/30min` (in `public/assets/app.js`)
- **Contact email:** `ops@keresai.com`
