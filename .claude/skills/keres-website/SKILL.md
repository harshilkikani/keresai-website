---
name: keres-website
description: Use when redesigning, restyling, adding pages to, auditing, or optimizing the keresai.com marketing site in this Astro repo — the homepage, agent/industry/pricing/comparison/benchmark pages, /lp/* ad landing pages, design tokens and CSS in public/assets, programmatic pages driven by src/data/*.ts, JSON-LD in src/data/schema.ts, redirects and sitemap in astro.config.mjs, or Lighthouse/LCP and conversion-tracking work on those pages. Not for the Keres product app, customer dashboard, agent backend, or telephony/email-sending infrastructure — this skill covers the marketing site only.
---

# Keres AI website

Marketing site for Keres AI. Astro 5, static output, vanilla CSS/JS served verbatim from `public/assets`, deployed to GitHub Pages.

The job this site does: a small-firm owner realizes they are losing money to unanswered phones, and books a demo. Every decision below serves that.

---

## 1. Repo facts (verified — do not re-derive)

| Thing | Where |
|---|---|
| Shared head, CSP, analytics, sticky CTA | [src/layouts/Layout.astro](src/layouts/Layout.astro) |
| Components | [src/components/](src/components/) — Nav, Footer, Schema, Breadcrumbs, FaqSection, CtaBand, Testimonials |
| JSON-LD helpers | [src/data/schema.ts](src/data/schema.ts) |
| Programmatic page data | [src/data/](src/data/) — industries, comparisons, calculators, benchmarks, integrations, geoVerticals, usecases, glossary, cities, caseStudies, guides, testimonials |
| CSS (global, page, fonts, guides) | [public/assets/](public/assets/) — `styles.css` (~1700 lines), `pages.css`, `fonts.css`, `guide.css` |
| Site config, sitemap, crawl priority | [astro.config.mjs](astro.config.mjs) |

Constraints that will bite you if you forget them:

- **`build.format: 'file'`, `trailingSlash: 'never'`** — Astro emits `/pricing.html`, GitHub Pages serves it at `/pricing`. Never author links with `.html` or trailing slashes (guides are the deliberate exception; they keep historical `.html` URLs and are listed in `sitemap.customPages`).
- **Stylesheets are cache-busted by query string** in [Layout.astro](src/layouts/Layout.astro#L97-L99) (`styles.css?v=22`). **Bump the version on every CSS change** or returning visitors get stale styles. Same for `app.js?v=11`.
- **CSP is a `<meta http-equiv>` with `default-src 'none'`** ([Layout.astro:48](src/layouts/Layout.astro#L48)). Anything new — a font host, a pixel, an analytics beacon, an iframe — is blocked silently until added to the right directive. `font-src 'self'` means **all fonts must be self-hosted**; no Google Fonts link.
- **Fonts already in the repo are the right pairing**: `Fraunces` (characterful display), `DM Sans` (grotesk body), `DM Mono` (numbers, Daily Brief). Self-hosted latin subsets in [public/assets/fonts.css](public/assets/fonts.css), two preloaded in the head. Use these before proposing anything new — a new face costs a subset, a preload, and LCP.
- **GitHub Pages has no server redirects.** Astro's `redirects` config in static mode emits a meta-refresh HTML page. That is the only mechanism available. Budget for it: it is slower than a 301 and passes link equity less cleanly, so prefer *keeping* a URL over moving it.
- **`src/data/testimonials.ts` is intentionally empty**, with a comment forbidding fabricated entries. Honor it. Fake review markup gets the site de-indexed.
- **`organizationSchema` currently has no `telephone`.** Adding the phone number to the header means adding it there too.
- **Analytics today is GoatCounter** (cookieless, no consent banner). Adding GA4/Meta pixel changes that — see §6.

---

## 2. Workflow

Five phases. **Phase 1 is a gate — do not touch code before approval.**

### Phase 1 — Design plan (one page, get approval)
Write and present, before any edit:
- **Palette tokens** — the neutral ramp with its hue bias, the single accent, semantic green/amber, light and dark values.
- **Type pairing** — display / body / mono, with full fallback stacks and the type scale.
- **Grid** — column count, gutters, max measure, section spacing at each breakpoint.
- **Motion list** — every animation that will exist, enumerated. If it is not on the list it does not get built.
- **Mock inventory** — which high-fidelity product mocks get built as components, and what each shows.

### Phase 2 — Audit
Run every existing page in scope against §4 (page rules), §5 (ad-readiness, `/lp/*` only), §7 (copy) and §9 (SEO). **List the failures before editing anything.** Present the failure list. An audit that finds nothing is an audit that was not run.

### Phase 3 — Component system first
Build and review the primitives before any page: button, section, eyebrow, stat, testimonial, mock frames. Pages assemble primitives; they do not invent one-off styles.

### Phase 4 — Pages
Content goes in `src/data/*.ts` so industry and agent pages share one template. If you are writing the same markup twice, it belongs in a data file plus a template.

### Phase 5 — Verify (§11), then report (§12)

---

## 3. What Keres sells (source of truth)

Nothing outside this catalog is a first-party offer.

**Four agents**
| Agent | Does |
|---|---|
| Inbound | 24/7 AI receptionist. Answers in two rings, vertical intake, booking, missed-call text-back. |
| Follow-Up | Reminders, no-show prevention, estimate follow-up, post-consult follow-up. |
| Reactivation | Database reactivation, win-back, review and referral requests. |
| Outbound | Cold email with deliverability management. |

**Found — the visibility layer.** Conversion website + care plan, Google Business Profile management, review generation, listings, AI search visibility, Local Services Ads setup. **From $249/month; from $499/month for law firms.**

**Verticals:** law firms, home services, dental/med spa, real estate.

**Plans:** Found, Answer, Convert, Grow, Custom. Each of the four core plans publishes a "from $" floor with a custom quote behind it. Only Found's floor is known — the rest are `[from $X]` until a human supplies them (§13).

**Owner Daily Brief** — the daily SMS digest to the owner. Appears on every product page.

---

## 4. Rules every page must pass

Non-negotiable. Check each before calling a page done.

1. **Phone number Keres itself answers**, in the header as a `tel:` link, plus a **sticky mobile Call/Demo bar**. (No `tel:` link exists anywhere in the repo today. The current sticky element is the Book-a-Demo CTA at [Layout.astro:112-114](src/layouts/Layout.astro#L112-L114) — extend it to two actions, keep the `/demo` and `/contact` suppression.)
2. **A "from $" price wherever a plan is mentioned.** Never a bare "Custom" on Found, Answer, Convert or Grow.
3. **One primary CTA above the fold.** One. Secondary actions are visually subordinate.
4. **Proof next to every claim** — a number, a named testimonial, a logo, or a recorded call. Where no proof exists, render a `[Testimonial]` slot rather than softening the claim into vagueness.
5. **Vertical vocabulary.** Law: consult, matter, conflict check. Home services: job, dispatch, estimate. Dental/med spa: recall, chair time. Real estate: showing, listing. Generic "customers/appointments" on a vertical page is a failure.
6. **The Owner Daily Brief on every product page.**
7. **Mobile-first at 390px. LCP under 2.5s.**

---

## 5. Ad-readiness checklist — any `/lp/*` page

Every item, verified in a browser, before the page is called ready:

- [ ] **No nav, no footer links.** Nothing to click but the conversion action.
- [ ] **Headline names the vertical and the geography.**
- [ ] **Form of at most four fields**, posting to a **tracked thank-you page**.
- [ ] **Conversion events fire** for: form submit, `tel:` click, calls over 30 seconds (via a call-tracking number), and demo booked.
- [ ] **GA4, Google Ads and Meta pixel all verified firing in the network tab.** Not "the code is on the page" — verified in the network tab.
- [ ] **Calculator preset for the vertical** (extend [src/data/calculators.ts](src/data/calculators.ts)).
- [ ] **Two vertical-specific testimonials.**
- [ ] **Page weight under 1MB.**

Two things that will silently break this:
- The **CSP blocks every pixel** until `script-src`, `connect-src`, `img-src` and `frame-src` are extended in [Layout.astro:48](src/layouts/Layout.astro#L48). A blocked pixel fails quietly — that is exactly why the check is "verified in the network tab."
- `/lp/*` pages are ad landing pages, **not** search pages: set `noindex` (Layout supports the prop) and keep them out of the sitemap filter.

---

## 6. Analytics note

The site runs GoatCounter — cookieless, which is why there is no consent banner. GA4 + Meta pixel are not cookieless. Adding them means the consent posture changes and the README's claim stops being true. Add the pixels where the ad checklist requires, then **flag the consent/privacy-policy question for a human** (§12). Do not add a consent banner on your own initiative.

---

## 7. Copy rules

- **Order: leak → fix → proof → price → CTA.** Every section, every page.
- **Specific over clever.** "Answers in two rings" beats "always on."
- **Banned:** seamless, revolutionize, unlock. Also: leverage, supercharge, game-changing, effortless.
- **Naming is all-or-nothing.** Either the agents are named consistently on every page, or every page uses plain titles. Never a mix.
- **FAQs must answer:** cost, setup time, human handoff, contract terms.
- **Titles under 60 characters.**

---

## 8. Design direction

**The bar is Stripe, Linear, Ramp, Vercel.** A high-end product company — not a local-agency template. Polish comes from spacing, type and real product detail, never from decoration.

**Type.** Characterful display face for headlines, clean grotesk for body, mono for numbers and the Daily Brief mock (Fraunces / DM Sans / DM Mono are already in the repo). Strict type scale. Large tight headlines with `text-wrap: balance`. 65-character body measure. `tabular-nums` on every figure.

**Color.** One hue-biased neutral system. One accent, used **only** for CTAs. Semantic green/amber reserved for the Daily Brief. Light and dark both from CSS custom properties in **one tokens file** — add `public/assets/tokens.css` to the head before `styles.css` and bump the version query.

**Layout.** 12-column grid. 120–160px section spacing on desktop. Asymmetric compositions — product mock beside copy. **Nothing centered by default. No card grids by default.**

**The visual identity is the product itself.** Build high-fidelity mocks as Astro components:
- a live-looking call transcript with turn timing
- the Owner Daily Brief as an SMS thread
- the booking confirmation
- the seven-stage pipeline diagram

No stock photos. No 3D blobs. No generic AI illustrations. No emoji.

**Motion — purposeful and few.** One orchestrated hero moment. Subtle hover states. Scroll reveals **from a visible resting state** (content is never invisible if JS fails). All of it respects `prefers-reduced-motion`. No parallax. No background animation.

**Craft details.** 4px spacing rhythm. 44px tap targets. Visible focus states. Per-page OG images. Custom 404 ([src/pages/404.astro](src/pages/404.astro) exists). One icon set at one stroke weight.

**Explicitly avoid the AI-generated look:** purple-blue gradient heroes, glassmorphism, rounded-everything, accent bars on cards, logo carousels, centered-everything, Inter-plus-nothing typography.

---

## 9. SEO and AI search

- **JSON-LD on every page** via [src/data/schema.ts](src/data/schema.ts), rendered through `<Schema graph={...} />` into Layout's `head` slot. `Organization` **with `telephone`**; a `Service` node per Found service; `FAQPage` wherever FAQs actually render on the page.
- **Direct-answer paragraph under each H2** — a complete, quotable answer in the first sentences, for AI search and featured snippets.
- **Internal links from every industry page** to: the agents, Found, pricing, and a relevant benchmark.
- **Redirects in `astro.config.mjs`** (none exist yet — add a `redirects` block) for the legacy pillar URLs when routes move.
- **`sitemap`, `robots.txt`, `llms.txt` updated on every route change** — including the `filter`, `customPages` and `priorityFor` logic in [astro.config.mjs](astro.config.mjs), plus [public/robots.txt](public/robots.txt), [public/llms.txt](public/llms.txt) and [src/pages/llms-full.txt.ts](src/pages/llms-full.txt.ts).

**Hard rule: never delete or move an indexed route without a redirect in the same change.** The site currently ranks on `/ai-receptionist`, `/ai-sdr`, `/email-deliverability`, `/ai-receptionist-for-{industry}`, `/ai-receptionist/{city}`, `/ai-receptionist/{city}/{vertical}`, `/ai-receptionist/state/{state}`, `/{competitor}-alternative`, `/glossary/*`, `/use-cases/*`, `/tools/*`, `/benchmarks/*`, `/integrations/*` and the `.html` guides. The §10 sitemap adds and reorganizes — it does not license deleting any of these silently.

---

## 10. Target sitemap

- `/` — hero, seven "where your pipeline leaks" cards, four agents, industries, Daily Brief mock, integrations, calculator with vertical presets, testimonials, three-step start, FAQ
- `/services`, `/services/found`
- `/agents/inbound`, `/agents/follow-up`, `/agents/reactivation`, `/agents/outbound`
- `/industries/law-firms`, `/industries/home-services`, `/industries/dental-med-spa`, `/industries/real-estate` — **extend the existing [src/data/industries.ts](src/data/industries.ts) `Industry` interface and pattern**, do not fork it
- `/pricing`, `/demo`
- `/benchmarks/*`
- `/compare/*` — from [src/data/comparisons.ts](src/data/comparisons.ts) (today these build at `/{competitor}-alternative`; moving them requires redirects per §9)
- `/resources` with case studies
- `/hear-it` with sample calls
- `/integrations/[tool]`, `/partners`, `/about`
- `/lp/[vertical]-[geo]` — see §5; [src/data/geoVerticals.ts](src/data/geoVerticals.ts) already models vertical×geography

The seven pipeline-leak stages are structural, derived from the agent catalog (§3) — draft them from the catalog and confirm the wording with the user. Do not attach a statistic to a stage unless the number is real.

---

## 11. Verification

Nothing ships unverified. Run all of it:

1. `npm run dev` (http://localhost:4321) — see the `/run` skill for launching the app.
2. **Screenshot at 390px and 1440px.** Both. The 390px view is the primary design target, not an afterthought.
3. **Lighthouse mobile.** Confirm LCP < 2.5s.
4. **Confirm tracking events fire** in the network tab — every event listed in §5.
5. **Check links and redirects** — no 404s, every redirect resolves to a real page.
6. **`npm run build` clean** — no warnings, no broken route collisions.

Report actual results. If Lighthouse was not run, say it was not run.

---

## 12. Reporting

Close every task with three things:
1. **What changed** — files and pages.
2. **Checklist status** — §4 and, for `/lp/*`, §5, item by item. Pass or fail, not "addressed."
3. **What still needs a human** — unfilled placeholders, unverified tracking, consent/privacy decisions, anything you assumed.

---

## 13. Placeholders — never invent these

Render the literal placeholder and list it in the report:

- `[PHONE]` — the number Keres itself answers
- **Agent names** — if the final naming is not given, use plain titles consistently (§7)
- `[from $X]` — every agent/plan floor except Found's published $249 / $499-law-firms
- `[Testimonial]` — every quote, name, company and logo
- **Traction numbers** — call volumes, booking rates, revenue recovered, customer counts, star ratings
- `[ADDRESS]` — the business address

A plausible-looking invented number on a marketing site is a false claim to a real buyer. Leave the slot visible instead.

---

## 14. Refuse

Push back and do not implement, even if asked directly in passing:

- **Removing the phone number or the price floor to force people into a demo.** Both stay.
- **Adding services outside the §3 catalog as first-party offers.** Generic SEO retainers, social media management and PPC management are **partner referrals** — present them as such or not at all.
- **A homepage that leads with "AI"** instead of the missed call. The buyer's problem is the leak; AI is how it gets fixed.
- **Any page shipped without proof for its main claim.** Use the `[Testimonial]` slot.

If the user reaffirms one of these after you have raised the concern, that is their call — say so plainly and proceed.
