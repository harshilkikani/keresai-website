// /llms.txt — generated, not static.
//
// It was a hand-maintained file in public/, which meant the agent names
// and the price floors could drift away from src/data/site.ts the first
// time either changed. Generating it makes that impossible: one edit to
// site.ts updates the nav, the pricing page, the mocks and this file.
//
// Every URL goes through listablePath() (src/seo/indexing.mjs), the same
// rules the sitemap uses: redirect stubs resolve to their target and noindex
// pages are left out, so this file only ever lists indexable final URLs.

import type { APIRoute } from 'astro';
import { plans, foundServices, PHONE, EMAIL, ORIGIN } from '../data/site';
import { workers } from '../data/workers';
import { translatedPaths } from '../i18n';
import { stages, stageLabel } from '../data/leaks';
import { hubs } from '../data/hubs';
import { industries } from '../data/industries';
import { comparisons, ROUNDUP_SLUGS } from '../data/comparisons';
import { usecases } from '../data/usecases';
import { benchmarks } from '../data/benchmarks';
import { calculators } from '../data/calculators';
import { integrations, isLive } from '../data/integrations';
import { guides } from '../data/guides';
import { listablePath } from '../seo/indexing.mjs';

/** Absolute URL for a path, or '' when the path is noindex. */
const u = (p: string) => { const q = listablePath(p); return q === null ? '' : `${ORIGIN}${q === '/' ? '/' : q}`; };
/** A markdown link, or '' when the page is not indexable. */
const link = (label: string, p: string, note = '') => { const url = u(p); return url ? `[${label}](${url})${note}` : ''; };
const dot = (xs: string[]) => xs.filter(Boolean).join(' · ');
const bullets = (xs: string[]) => xs.filter(Boolean).map((x) => `- ${x}`).join('\n');

// Billing as the site states it: Remi has included minutes then per-minute;
// Theo, June and Sol are quoted to volume; Custom is a build price plus a run fee.
const billing: Record<string, string> = {
  found: 'From $249/month ($499 for law firms), month-to-month.',
  inbound: 'Quoted: one monthly rate with included minutes, then per minute; no per-call fees; month-to-month.',
  'follow-up': 'Quoted to your volume on a 20-minute call; month-to-month.',
  reactivation: 'Quoted to your volume on a 20-minute call; month-to-month.',
  outbound: 'Quoted to your volume on a 20-minute call; month-to-month.',
  custom: 'Fixed build price and a monthly run fee, scoped on a 20-minute call.',
};

export const GET: APIRoute = () => {
  const roundups = ROUNDUP_SLUGS.map((s) => comparisons.find((c) => c.slug === s)!).filter(Boolean);
  const sortedGuides = [...guides].sort((a, b) => a.order - b.order);

  const body = `# Keres AI

> Keres AI sells AI workers for local businesses. Each worker does one job, reports to the owner in one text every morning, and can be hired alone or together: Found gets you found (website, Google listing, reviews), Remi answers every call in two rings and books it, Theo confirms and reminds, June brings past customers back and asks for the review, Sol finds new customers by email, and Custom is built for any recurring job. Month-to-month; setup timing is agreed on the first call. Site available in English and Spanish. Remi answers calls in English only.

Keres serves law firms, home-services contractors (HVAC, plumbing, roofing, septic, towing), dental practices and med spas, and real-estate teams: the businesses whose sales team is whoever picks up the phone.

Key facts:
- Six workers, hired one at a time or together. Found (website, Google Business Profile management, review requests and listings) starts at $249/month ($499 for law firms), month-to-month.
- Remi, the AI receptionist, answers every call in two rings, 24/7, including nights, weekends and holidays. It books into Google Calendar, HubSpot or ServiceTitan (other tools through Zapier), texts back missed callers within 60 seconds, and also handles website chat, text-line and form enquiries.
- Remi billing: one monthly rate with included minutes, then per minute. No per-call fees. Quoted, not published: ${u('/pricing')}. Theo, June and Sol are quoted to your volume; Custom has a fixed build price and a monthly run fee.
- Month-to-month, no contract. Setup timing is agreed on the first call.
- Owner Daily Brief: one morning text with calls answered, leads qualified, appointments booked, no-shows prevented, reviews posted, and which source produced the bookings. Every worker reports to the same text.
- Human escalation is a feature: warm transfer under rules you set, or a "call me now" alert carrying the intake already collected.
- Site available in English and Spanish (homepage, pricing, custom-worker page under ${u('/es')}). Remi answers calls in English only.
${PHONE ? `- Phone: ${PHONE.display}\n` : ''}- Contact: ${EMAIL}
- Full reference (definitions, FAQs, descriptions): ${ORIGIN}/llms-full.txt

## The roster: six workers
${workers
  .map((w) => `- **${w.name}** (${u(w.href)}): ${w.job}. ${billing[w.slug] ?? 'Quoted to your volume.'} Includes: ${w.includes.join('; ')}.`)
  .join('\n')}
- **All of them**: every worker, one pipeline, one text, one invoice.

On a customer's own line each worker introduces itself with whatever name that customer configures. Remi, Theo, June and Sol are the product's default names.

## How to buy
- Get a quote: ${u('/quote') || `${ORIGIN}/quote`} — five questions, then a 20-minute call; the booking calendar is on the same page.
- Custom worker: ${u('/custom')} — one recurring job, one-page scope, fixed build price, monthly run fee, first version in two weeks, you approve everything it publishes.

## The pipeline — seven stages
A small firm's revenue is one pipeline, and Keres covers every stage of it. A customer can start at whichever stage leaks most.

${stages
  .map((s) => `${stageLabel(s.n)}. **${s.name}** — ${s.leak} Worker: ${s.by}. ${s.fix}${u(s.href) ? ` (${u(s.href)})` : ''}`)
  .join('\n')}

## Found — one worker, eight jobs (from $249/month; $499 for law firms)
${u('/services/found')}

${foundServices.map((s) => `- **${s.name}**${s.addOn ? ' (add-on)' : ''}: ${s.desc}`).join('\n')}

Not sold by Keres, referred to partners instead: Google Ads and PPC management, video and photography, bespoke branding, generic social media management, generic SEO retainers.

## Pricing
Found is published from $249/month ($499 for law firms). Remi is quoted as one monthly rate with included minutes, then per minute, with no per-call fees; Theo, June and Sol are quoted to your volume; Custom is scoped. Month-to-month. What changes the quote: locations, industry, monthly call volume, integrations, AI search and Local Services Ads add-ons, review volume, and how many workers you hire together. ${u('/pricing')} (Spanish: ${u('/es/pricing')}). Published prices for other AI receptionists and answering services: ${u('/ai-receptionist-cost')}.

## Core pages
${bullets([
  link('Home', '/', ': the roster of six workers, the pipeline, and what each stage leaks.'),
  link('All workers', '/services', ': the seven stages and the worker that handles each.'),
  link('Remi, the AI receptionist', '/agents/inbound', ': answers in two rings, books the appointment, texts back missed callers.'),
  link('Found', '/services/found', ': website, Google Business Profile, reviews, listings and AI search.'),
  link('Google Business Profile management', '/google-business-profile-management', ': what Found does on your profile every week.'),
  link('Custom worker', '/custom', ': any recurring job, scoped and built for you.'),
  link('Pricing', '/pricing', ': one row per worker and what changes the quote.'),
  link('Hear it', '/hear-it', ': example call transcripts per vertical (examples, not recordings).'),
  link('About', '/about'),
])}

## AI receptionist buyer's guides
${bullets([
  link('Best AI receptionists for small businesses (2026)', '/best-ai-receptionist'),
  link('How much does an AI receptionist cost?', '/ai-receptionist-cost', ' (published vendor prices)'),
  link('AI answering service vs live answering service', '/ai-answering-service'),
  link('24/7 AI receptionist and after-hours answering', '/24-7-ai-receptionist'),
  link('Missed-call statistics', '/missed-call-statistics'),
])}

## Industry hubs
${hubs.map((h) => link(h.name, `/industries/${h.slug}`, `: ${h.sub.split('. ')[0]}.`)).filter(Boolean).map((x) => `- ${x}`).join('\n')}

Trade pages beneath the home-services hub:
- ${dot(industries.map((i) => link(i.short ?? i.name, `/ai-receptionist-for-${i.slug}`)))}

## Comparisons (sourced roundups)
${bullets([
  link('All comparisons', '/compare'),
  ...roundups.map((c) => link(`${c.competitor} alternatives`, `/${c.slug}`)),
])}

## Benchmarks (estimates; primary sources linked where they exist)
${bullets([
  link('Benchmarks index', '/benchmarks'),
  dot(benchmarks.map((b) => link(`${b.h1} ${b.h1Accent}`.trim(), `/benchmarks/${b.slug}`))),
])}

## Use cases
${bullets([
  link('Use cases index', '/use-cases'),
  dot(usecases.map((x) => link(x.name, `/use-cases/${x.slug}`))),
])}

## Integrations
Connected today: ${integrations.filter(isLive).map((i) => i.name).join(', ')}.
Rolling out (not live yet): ${integrations.filter((i) => !isLive(i)).map((i) => i.name).join(', ')}.
${bullets([
  link('Integrations index', '/integrations'),
  dot(integrations.filter(isLive).map((i) => link(i.name, `/integrations/${i.slug}`))),
])}

## Tools
${bullets([
  link('Free tools index', '/tools'),
  dot([
    link('Missed-call revenue calculator', '/tools/missed-call-calculator'),
    ...calculators.map((c) => link(c.title.split(' — ')[0], `/tools/${c.slug}`)),
  ]),
  dot([
    link('Email deliverability checker', '/tools/deliverability-checker'),
    link('Spam-score checker', '/tools/spam-score-checker'),
    link('Front-desk staffing estimator', '/tools/staffing-savings-estimator'),
  ]),
])}

## Glossary (definitions)
${bullets([
  link('Glossary index', '/glossary'),
  dot([
    link('AI receptionist', '/glossary/ai-receptionist'), link('AI answering service', '/glossary/ai-answering-service'),
    link('Missed-call recovery', '/glossary/missed-call-recovery'), link('Legal intake', '/glossary/legal-intake'),
    link('Lead response time', '/glossary/lead-response-time'),
  ]),
  dot([
    link('Google Business Profile', '/glossary/google-business-profile'), link('Map pack', '/glossary/map-pack'),
    link('Review generation', '/glossary/review-generation'), link('NAP consistency', '/glossary/nap-consistency'),
  ]),
  dot([
    link('AI SDR', '/glossary/ai-sdr'), link('Email deliverability', '/glossary/email-deliverability'),
    link('Inbox warmup', '/glossary/inbox-warmup'),
  ]),
])}

## Trust and company
${bullets([
  link('Trust & security', '/trust', ': encryption in transit and limited access; not SOC 2 or HIPAA certified, no BAAs.'),
  dot([link('About', '/about'), link('Partners', '/partners'), link('Contact', '/contact')]),
])}

## Spanish (español)
${translatedPaths.map((p) => u(p === '/' ? '/es' : '/es' + p)).filter(Boolean).map((x) => `- ${x}`).join('\n')}

## Resources
${bullets([
  link('Guides & playbooks', '/blog'),
  ...sortedGuides.map((g) => link(g.listTitle, `/guides/${g.slug}.html`)),
])}
`;

  return new Response(body.replace(/\n{3,}/g, '\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
