# keres-website SKILL

Name: keres-website
Description: Redesign, build and optimize keresai.com as a conversion-first marketing site for Keres AI (AI receptionist, follow-up, reactivation and outbound agents, plus "Found" visibility services for law firms, home services, dental/med spa and real estate). Use for any work on the marketing site: new pages, copy, layout, landing pages for ads, pricing, tracking, SEO/AI-search visibility, performance. Not for the product app or agent backend.

---

## Purpose
This skill documents the workflow, guardrails, copy, design, SEO and verification rules for any work on the Keres AI marketing site. The site’s single job is conversion: get a call, demo booking, or quote request — and make paid ads profitable.

Use this skill whenever you: add a page, change copy, create an ad landing page, modify tracking, update redirects, or change content that affects SEO or ad-readiness.

## Read first (sources of truth)
- references/service-catalog.md — canonical list of services and tiers. Do not invent services outside this file.
- references/site-spec.md — sitemap, per-page copy and implementation notes. Treat as IA source of truth; explain departures.
- The existing codebase and components in `src/` and `public/` — reuse design tokens and components where possible.

## Target audience
Owners and managers of small firms (2–20 staff) whose sales process is phone-first: managing partners, practice managers, owners of HVAC/plumbing businesses, dental/med-spa managers, and real-estate team leads. They are mobile-first, skeptical, and compare Keres AI to Smith.ai, Ruby, and agency bundles.

## Non-negotiables (apply to every page)
- A phone number Keres itself answers in the header as a `tel:` link, plus a sticky mobile bar with Call and Book a demo. Demo is the primary product.
- A visible “from $” price wherever a plan is mentioned, with the text "quoted to your volume" beside it. Never display only "Custom" for Found, Answer, Convert or Grow.
- One primary CTA above the fold, one clear secondary CTA. No competing buttons.
- Proof near every claim: numeric metrics, a named testimonial (first name + role + firm type + city), a logo, or recorded call. If proof is not available, reserve a `[Testimonial]` slot rather than writing a vague claim.
- Vertical-specific language: use industry vocabulary (e.g., "consult", "matter", "conflict check" for legal; "job", "dispatch", "estimate" for home services; "recall", "chair time" for dental).
- Show or mention the Owner Daily Brief on every product page.
- Mobile-first: verify at 390px. Tap targets ≥44px, no horizontal scroll, LCP under 2.5s on throttled mobile.

## Ad-readiness checklist (page must pass before used for paid ads)
- Dedicated `/lp/*` route with minimal header (logo + phone) and no footer link farm.
- Headline matches the ad promise and names the vertical and geography.
- A short form (≤4 fields: name, firm, phone, practice/trade) and a tracked thank-you page.
- Conversion events wired: form submit, `tel:` click, call ≥30s via call-tracking number, demo booked. GA4 + Google Ads + Meta pixel present — verify with tag debuggers.
- Calculator preset for the vertical to show a non-zero loss on load.
- Two testimonials and an integrations line specific to the vertical.
- Page weight under 1MB and no third-party scripts except tracking and the calculator.

## Copy rules
- Structure: lead with the leakage, then the fix, then proof, then the price, then CTA — in that order for each section.
- Use specific claims and numbers: "answers in two rings", "live in five days", "$1,000–$10,000 per case".
- Active voice, second person. Short sentences, one idea per paragraph.
- Consistent agent naming: either use the chosen four names or plain titles — never both.
- FAQs must answer objections with numbers (cost, setup time, fallback when a caller needs a human, contract terms).
- Every page must have a `<title>` under 60 characters that a searcher would type and a meta description mentioning the price floor or the two-rings claim.

## Design rules
- Reuse existing palette and type. If missing, propose tokens in a single file (e.g., `src/styles/tokens.css`) before styling anything.
- One accent color reserved for CTAs. Separate semantic colors for Owner Daily Brief state (good/warn).
- Use cards only for parallel content (stages, agents, plans). Use prose sections for narrative.
- Use real screenshots or mocks of the Owner Daily Brief and booking confirmation. Avoid abstract illustrations.
- Hero must not be taller than its content. No autoplay video. No carousels.

## SEO & AI-search visibility
- JSON-LD on every page: `Organization` (with `telephone` and address), `Service` entries for Found, `FAQPage` where FAQs are shown, and `LocalBusiness` when a public address exists.
- Vertical pages and resources must include a direct-answer paragraph under each H2, a stats block with sources, and an FAQ.
- Internal linking: industry pages link to their agent pages, Found, pricing and one benchmark resource. Agent pages link to the four verticals.
- Keep redirects for retired routes in `next.config` (e.g., `/ai-receptionist`, `/ai-sdr`, `/deliverability`, `/for-hvac`).
- Update sitemap and robots after adding/removing routes.

## Workflow (step-by-step)
1. Audit: Evaluate the page(s) against the Non-negotiables and Ad-readiness checklist. List failures before changing anything.
2. Plan: 1-3 lines: which sections will change, which copy and components will be reused, and any departures from `site-spec.md` with justification.
3. Implement: Prefer existing components. Add new components only when nothing fits. Keep content in per-page content objects so templates serve multiple verticals.
4. Verify: Run the dev server, screenshot at 390px and 1280px, run Lighthouse (mobile) and report LCP/CLS/Performance, confirm tracking events fire, check links and redirects, run typechecker and lint.
5. Report: Summarize changes, checklist status, and any items requiring human input (real testimonials, phone numbers, verified prices, legal copy).

## Things to refuse or push back on
- Removing the phone number or price floor to "force demos".
- Adding services that are not in `references/service-catalog.md` as first-party offers.
- A homepage that leads with "AI" or technology instead of the missed call or conversion hook.
- Any page that makes a main claim without proof.

## Deliverables from this skill
When invoked for a page/task, produce:
- An audit checklist output listing failures (copy + implementation) with evidence.
- A 1–3 line plan describing changes.
- A patch or PR with only the necessary component/copy changes.
- Verification artifacts: screenshots (390px and 1280px), Lighthouse report (mobile), and event-check list showing tracking passes.
- A short report summarizing what changed and what remains (testimonials, numbers, phone verification).

## Ambiguities & clarification questions (things you should confirm before implementation)
- What phone number(s) are verified and available for Keres to answer vs. call-tracking numbers? (required)
- Where are the source testimonials (names, roles, firm types, cities)? Are recordings available?
- Confirm the minimum "from $" price floors per service/vertical.
- Which pages are intended as ad destinations (list of routes)?
- Are there existing GA4/Google Ads/Meta pixel IDs and where are they stored? Who can validate tag debuggers?
- Are there any brand tokens or design system docs not in the repo we should reuse?

## Example prompts to use this skill
- "Audit /lp/ai-receptionist-hvac for ad-readiness and produce a 1-line plan."
- "Create an industry landing page for 'dental med-spa' using the existing `LandingTemplate` and add two testimonials." 
- "Update the pricing block on `/found` to show 'from $X' for law firms and wire the Book demo CTA to Calendly event ID XYZ."

## Suggested follow-ups / related customizations
- Create a `/prompts/` folder with canned prompts for common tasks (audit, lp draft, SEO snippet, JSON-LD generator).
- Add a small `skill-checker` script that validates non-negotiables automatically (presence of tel: link, title length, 'from $' price pattern, JSON-LD existence).
- Create a `tokens.css` and a single source of design tokens if the repo lacks one.

---

## Versioning & ownership
Owner: design lead / growth engineer (use this skill as the single source for site decisions).
Last updated: 2026-09-05


