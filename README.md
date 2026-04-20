# Keres AI Website

Official website for [Keres AI](https://keresai.com) — boutique AI automation agency building custom AI agents for businesses across every industry.

## Stack
Plain HTML / CSS / vanilla JS. No build step, no dependencies, fully static — drop onto any static host (Netlify, Vercel, Cloudflare Pages, S3, GitHub Pages).

## Structure
```
/
├── index.html              # Single-page site
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── netlify.toml            # Netlify deploy config (headers, CSP, redirects)
└── assets/
    ├── styles.css          # All styling (tokens, responsive, dark mode)
    ├── app.js              # Nav, theme, calendar, form, modal, scroll-spy
    ├── i18n.js             # 5-language translation dictionary + runtime
    ├── chatbot.js          # Chat widget + keyword-scored KB
    └── img/
        ├── logo.svg
        └── og-image.svg
```

## Features
- **Fully responsive** — fluid typography, hamburger nav at ≤768px, tested on mobile / tablet / desktop
- **Dark & light modes** — honors system preference, persists choice via `localStorage`
- **5 languages** — EN / ES / FR / DE / PT with live switching and `hreflang` tags
- **Accessibility** — skip link, ARIA landmarks, focus-visible styles, `aria-live` announcements, reduced-motion support, semantic HTML, keyboard-navigable calendar & chatbot
- **SEO** — OpenGraph, Twitter cards, five JSON-LD blocks (Organization / WebSite / Service / FAQ / Breadcrumb), canonical + hreflang alternates, sitemap, robots
- **Industries section** — 8 verticals with tailored copy (healthcare, fintech, legal, SaaS, e-com, real estate, logistics, professional services)
- **How it works** — 4-step process with numbered markers
- **Contact** — Formspree form + industry selector + honeypot spam guard + inline validation
- **Calendly booking** — custom localized calendar that opens Calendly in a new tab
- **Chatbot** — keyword-scored knowledge base, quick-reply chips, mobile-optimized

## Configuration
- **Formspree form ID:** `mojywlnn` (in `index.html`)
- **Calendly URL:** `https://calendly.com/ops-keresai/30min` (in `assets/app.js`)
- **Contact email:** `hello@keresai.com` (in footer)

## Local development
Open `index.html` in a browser. For a local server (recommended for absolute `/assets/…` paths to resolve):

```bash
# Python
python -m http.server 8000

# Node
npx serve
```

Then visit `http://localhost:8000`.

## Deployment

### Netlify (recommended)
This repo is ready to deploy:

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Keres AI site"
   git push origin main
   ```
2. In Netlify → **Add new site → Import an existing project** → connect GitHub → pick this repo.
3. Netlify will auto-detect `netlify.toml`. Settings should be:
   - **Build command:** (leave empty)
   - **Publish directory:** `.`
4. Click **Deploy**. First deploy takes ~30 seconds.
5. (Optional) **Domain management → Add custom domain →** `keresai.com`. Netlify handles the free SSL.

### What `netlify.toml` does
- Ships security headers (CSP, HSTS, X-Frame-Options, referrer policy, permissions policy)
- Sets sensible cache-control headers (long for `/assets/`, revalidate for HTML)
- Provides a SPA-style fallback so unknown paths return the homepage instead of a 404

### Any other static host
Works on Vercel, Cloudflare Pages, GitHub Pages, S3, etc. — it's plain static files. Point the host at the repo root; no build step needed.

## Nice-to-haves (future)
- Real video demos in place of modal placeholders
- Blog / case studies
- Raster `og-image.png` for broader social platform support (current SVG works on most modern platforms)
- Real legal pages at `/privacy`, `/terms`, `/security`

## Live Site
https://keresai.com
