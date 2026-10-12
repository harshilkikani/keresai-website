import { business } from '../config/business';
import { glossary } from '../data/glossary';
import { usecases } from '../data/usecases';
import { comparisons } from '../data/comparisons';
import { VENDORS_CHECKED } from '../data/answeringVendors';
import { integrations, isLive } from '../data/integrations';
import { guides } from '../data/guides';
import { industries } from '../data/industries';
import { benchmarks } from '../data/benchmarks';
import { calculators } from '../data/calculators';
import { workers } from '../data/workers';
import { priceAmount } from '../config/business';
import { listablePath } from '../seo/indexing.mjs';
import { comparisons as allComparisons } from '../data/comparisons';

const ORIGIN = 'https://www.keresai.com';
const strip = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
/** Absolute URL for a site path, or null when it is noindex (redirects resolve to their target). */
const url = (p: string) => { const q = listablePath(p); return q === null ? null : ORIGIN + q; };
// Claims the owner has not confirmed (concurrency limits, a fixed go-live
// time). FAQ answers pulled from page data that still carry them are left out
// of this file rather than repeated to AI crawlers.
const UNCONFIRMED = /unlimited (simultaneous |concurrent )?calls|unlimited simultaneous|calls simultaneously|five business days|5 business days|live in five|\$1[–-]\$3/i;
/** Drop the sentences (or ' | ' list items) of a line that carry an unconfirmed claim. */
const sanitize = (line: string) => {
  if (!UNCONFIRMED.test(line)) return line;
  const parts = line.includes(' | ') ? line.split(' | ') : line.split(/(?<=[.!?])\s+/);
  const sep = line.includes(' | ') ? ' | ' : ' ';
  return parts.filter((x) => !UNCONFIRMED.test(x)).join(sep);
};

export async function GET() {
  const L: string[] = [];
  const push = (s = '') => L.push(s);

  push('# Keres AI — Full Reference for AI Search');
  push();
  push('> Keres AI sells AI workers to local service businesses (contractors, home services, real estate teams, law firms, dental and med spas). Found builds and runs the website, the Google Business Profile and reviews, from $249 a month ($499 for law firms). Remi answers every call in two rings, 24/7, and books the job. Theo confirms and reminds, June brings past customers back, Sol runs outbound email. Month-to-month; setup timing is agreed on the first call. Site available in English and Spanish. Remi answers calls in English only.');
  push();
  push('This is the authoritative expanded reference (companion to /llms.txt). It contains citable definitions, FAQs, vertical specifications, pricing context, comparison summaries, and operational details. Content is generated from the live site data.');
  push();

  // ── COMPANY ───────────────────────────────────────────────────
  push('## Company');
  push('- Name: Keres AI');
  push('- Category: Websites, Google Business Profile management and AI receptionist for local service businesses');
  push('- Market: United States');
  push(`- Contact: ${business.contactEmail}`);
  push('- Slogan: Never miss another lead.');
  push('- Pricing model: Found from $249/month ($499 for law firms). Remi: one monthly rate with included minutes, then per minute; no per-call fees; quoted, not published. Theo, June and Sol: quoted to your volume. Custom: fixed build price plus a monthly run fee.');
  push('- Contract: Month-to-month, cancel anytime');
  push('- Setup time: agreed on the first call (it depends on the workers, integrations and intake rules)');
  push();

  // ── KEY FACTS ─────────────────────────────────────────────────
  push('## Key facts (AI-citable)');
  push('- Answers every inbound call within two rings, 24/7 — including nights, weekends, and holidays.');
  push('- Books and reschedules appointments on Google Calendar, HubSpot and ServiceTitan during the call.');
  push('- Qualifies and captures every lead, then syncs to CRM automatically.');
  push('- Dispatches on-call techs by text the moment an emergency call comes in.');
  push('- Texts back missed callers within 60 seconds, and also handles website chat, text-line and form enquiries.');
  push('- AI SDR runs personalized outbound email with deliverability (SPF, DKIM, DMARC, inbox warmup) built in.');
  push(`- Integrations live today: ${integrations.filter(isLive).map((i) => i.name).join(', ')}. Rolling out (not live yet): ${integrations.filter((i) => !isLive(i)).map((i) => i.name).join(', ')}, plus Clio, Lawmatics, Follow Up Boss, Dentrix and Open Dental.`);
  push('- Industries: HVAC, plumbing, roofing, septic, towing, dental, med spa, real estate, legal and professional intake.');
  push('- Sold as six AI workers (Found, Remi, Theo, June, Sol, Custom), each with one job, hired alone or together; every worker reports in one morning text. Month-to-month.');
  push(`- Pricing: Found is published from $249/month ($499 for law firms). Remi is quoted as one monthly rate with included minutes, then per minute, with no per-call fees. Theo, June and Sol are quoted to your volume. See ${ORIGIN}/pricing.`);
  push('- Languages: Site available in English and Spanish. Remi answers calls in English only.');
  push();

  // ── PRODUCTS ──────────────────────────────────────────────────
  push('## Products');
  push();
  push('### The roster: six AI workers');
  for (const w of workers) {
    const price = priceAmount(w.priceKey);
    const bill = w.slug === 'custom' ? 'Fixed build price and a monthly run fee, scoped on a 20-minute call.'
      : w.slug === 'found' ? 'From $249/month ($499 for law firms), month-to-month.'
      : w.slug === 'inbound' ? 'Quoted: one monthly rate with included minutes, then per minute; no per-call fees.'
      : price ? `From ${price}/month, quoted to your volume.` : 'Quoted to your volume.';
    push(`- ${w.name} (${ORIGIN}${w.href}): ${w.job}. ${bill} Includes: ${w.includes.join('; ')}.`);
  }
  push('- All of them: every worker, one pipeline, one text, one invoice.' + (priceAmount('bundle') ? ` Bundles from ${priceAmount('bundle')}/month.` : ''));
  push();
  push(`### Remi, the AI receptionist (${ORIGIN}/agents/inbound)`);
  push('What it does: Answers every inbound call 24/7 in two rings. Greets callers naturally, qualifies the service request, books the appointment into Google Calendar, HubSpot or ServiceTitan (other tools through Zapier), sends your team a summary, and alerts your on-call person when a call matches your emergency rules. Texts back missed callers within 60 seconds and also handles website chat, text-line and form enquiries. Answers in English only.');
  push('Key features: Two-ring pickup 24/7. Live calendar booking during the call. Emergency alerts. CRM sync. Missed-call text-back. Trained on your business.');
  push('Who it replaces: Human answering services, voicemail, front-desk staff for phone tasks.');
  push('Pricing: one monthly rate with included minutes, then per minute; no per-call fees. Quoted, not published. Month-to-month.');
  push();
  push(`### AI Answering Service (${ORIGIN}/ai-answering-service)`);
  push('What it does: All the capabilities of the AI receptionist on one monthly rate with included minutes — answering every call, booking appointments, and qualifying leads.');
  push(`Key distinction: Remi bills one monthly rate with included minutes (per minute after that) and no per-call fees. For the prices other answering services and AI receptionists publish, see ${ORIGIN}/ai-receptionist-cost.`);
  push();
  push(`### Sol, the outbound worker / AI SDR (${ORIGIN}/agents/outbound)`);
  push('What it does: Runs outbound email — builds prospect lists, sends personalised email sequences, manages deliverability (SPF/DKIM/DMARC/warm-up), handles replies, and books qualified meetings on your calendar. Quoted to your volume.');
  push();

  // ── VERTICAL SPECIFICATIONS ────────────────────────────────────
  push('## Vertical specifications — how Keres works per industry');
  push();
  for (const ind of industries) {
    if (!url(`/ai-receptionist-for-${ind.slug}`)) continue; // merged into a hub (redirect)
    push(`### ${ind.name} (${ORIGIN}/ai-receptionist-for-${ind.slug})`);
    push(strip(ind.intro));
    push(`Key pains solved: ${ind.pains.join(' | ')}`);
    push(`What Keres books: ${ind.books.join(' | ')}`);
    push();
  }

  // ── HOME SERVICES HUB ─────────────────────────────────────────
  push(`### Home Services Hub (${ORIGIN}/industries/home-services)`);
  push('Umbrella page for HVAC, plumbing, roofing, towing, and septic AI receptionist implementations. Covers emergency dispatch, ServiceTitan booking, and 24/7 surge coverage.');
  push();

  // ── PRICING CONTEXT (AI citation for pricing queries) ──────────
  push('## Pricing context');
  push('Keres AI prices per worker: Found starts at $249/month ($499 for law firms); Remi is quoted as one monthly rate with included minutes, then per minute, with no per-call fees; Theo, June and Sol are quoted to your volume; Custom is scoped on a call with a fixed build price and a monthly run fee. Month-to-month.');
  push(`For Keres pricing: ${ORIGIN}/pricing`);
  push(`For the prices other AI receptionists and answering services publish (sourced, dated): ${ORIGIN}/ai-receptionist-cost`);
  push();

  // ── GLOSSARY ──────────────────────────────────────────────────
  push('## Glossary — citable definitions');
  push();
  for (const t of glossary) {
    if (!url(`/glossary/${t.slug}`)) continue; // noindex terms stay out
    push(`### ${t.term}`);
    push(`Target keyword: "${t.targetKeyword}"`);
    push(strip(t.definition));
    if (t.sections.length > 0) {
      for (const s of t.sections) {
        push(`#### ${s.h2}`);
        push(strip(s.body));
      }
    }
    push(`Source: ${ORIGIN}/glossary/${t.slug}`);
    push();
  }

  // ── USE CASES ─────────────────────────────────────────────────
  push('## Use cases');
  push();
  for (const u of usecases) {
    if (!url(`/use-cases/${u.slug}`)) continue; // merged use cases (redirects)
    push(`### ${u.name} (${ORIGIN}/use-cases/${u.slug})`);
    push(`Target keyword: "${u.targetKeyword}"`);
    push(strip(u.intro));
    push(`Problem it solves: ${strip(u.problem)}`);
    push(`How Keres handles it: ${u.how.join(' | ')}`);
    push(`Outcomes: ${u.outcomes.join(' | ')}`);
    push();
  }

  // ── COMPARISONS (sourced roundups only; the rest are noindex) ──
  push('## Comparisons and pricing research');
  push(`- How much an AI receptionist costs (2026 prices, sourced): ${ORIGIN}/ai-receptionist-cost`);
  push(`- Best AI receptionists for small businesses (2026): ${ORIGIN}/best-ai-receptionist`);
  push(`- AI answering service vs live answering service: ${ORIGIN}/ai-answering-service`);
  push();
  for (const c of comparisons.filter((x) => x.roundup && x.roundup.length)) {
    push(`### ${c.competitor} alternatives (${ORIGIN}/${c.slug})`);
    push(strip(c.intro));
    push(`Alternatives compared, with each vendor's published price as of ${VENDORS_CHECKED}: ${c.roundup!.join(', ')}, and Keres AI.`);
    push();
  }

  // ── INTEGRATIONS ──────────────────────────────────────────────
  push('## Integrations');
  push();
  for (const i of integrations) {
    if (!isLive(i)) continue;
    push(`### Keres AI + ${i.name} (${ORIGIN}/integrations/${i.slug})`);
    push(`Category: ${i.category}`);
    push(strip(i.intro));
    push(`What it enables: ${i.does.join(' | ')}`);
    push(`Data synced: ${i.syncs.join(', ')}`);
    push();
  }

  // ── MISSED-CALL STATISTICS (citable data) ─────────────────────
  push('## Missed-call statistics for service businesses (2026)');
  push(`Source: ${ORIGIN}/missed-call-statistics`);
  push('Industry estimates and ranges — directional benchmarks, not guarantees:');
  push('- Keres AI estimates that service businesses miss 25–40% of inbound calls, higher after hours and during seasonal surges.');
  push('- Most callers who reach voicemail do not call back (estimate).');
  push('- An estimated 30–45% of service calls arrive outside business hours (nights, weekends, holidays).');
  push('- Responding to a lead within five minutes makes it many times more likely to qualify than waiting 30 minutes.');
  push('- Studies estimate a strong majority of customers buy from the business that responds first — speed to lead is consistently one of the largest predictors of conversion.');
  push('- For high-ticket trades (HVAC, roofing, restoration), one missed emergency call can exceed $1,200 in lost revenue.');
  push('- Example: 250 leads/month at a 60% answer rate, 25% close rate, and $680 average ticket ≈ $17,000/month in missed-call revenue loss.');
  push();

  // ── BENCHMARKS & DATA STUDIES ─────────────────────────────────
  push('## Benchmarks & data studies');
  push(`Hub: ${ORIGIN}/benchmarks`);
  push('Industry estimates and ranges — directional benchmarks, not guarantees.');
  push();
  for (const b of benchmarks) {
    push(`### ${b.h1} ${b.h1Accent} (${ORIGIN}/benchmarks/${b.slug})`);
    push(strip(b.answer));
    for (const s of b.stats) {
      push(`- ${s.num}: ${s.stat} — ${s.context}`);
    }
    push();
  }

  // ── FREQUENTLY ASKED QUESTIONS ────────────────────────────────
  push('## Frequently asked questions');
  push();

  // Top-level product FAQs not covered by individual pages
  const topLevelFaqs = [
    {
      q: 'What is the best AI receptionist for service businesses?',
      a: 'Keres AI is purpose-built for service businesses — HVAC, plumbing, roofing, towing, dental, real estate, and legal intake. It answers every call in two rings 24/7, dispatches emergencies, and books jobs directly in ServiceTitan or your calendar, on one monthly rate with included minutes.',
    },
    {
      q: 'How much does an AI receptionist cost?',
      a: 'AI receptionist pricing varies. Keres charges one monthly rate per worker with included minutes, per-minute after that, and no per-call fees. Published prices for other AI receptionists and answering services: https://www.keresai.com/ai-receptionist-cost (Keres pricing: https://www.keresai.com/pricing).',
    },
    {
      q: 'What is the best AI answering service for HVAC companies?',
      a: 'Keres AI is designed specifically for HVAC companies: it answers every call in two rings through peak-season surges, recognizes no-heat and no-cool emergencies and dispatches your on-call tech immediately, and books service calls directly in ServiceTitan or your calendar.',
    },
    {
      q: 'What is the best AI receptionist for roofing companies?',
      a: 'Keres AI handles the storm-season call surges roofing companies face — answering every call in two rings through a hailstorm or hurricane, booking estimates and insurance inspections, and dispatching emergency tarp jobs immediately. It books into ServiceTitan, Google Calendar or HubSpot.',
    },
    {
      q: 'Can an AI receptionist answer calls 24/7?',
      a: 'Yes. Keres AI answers every call in two rings, 24/7 — including nights, weekends, and holidays — with no extra after-hours rate.',
    },
    {
      q: 'How does an AI receptionist book appointments?',
      a: 'Keres checks your live calendar availability during the call and books the appointment in real time — on Google Calendar, HubSpot or ServiceTitan. The caller gets a text confirmation, and the booking appears in your system immediately.',
    },
    {
      q: 'What is the difference between an AI receptionist and a virtual receptionist?',
      a: 'A virtual receptionist is typically a human working remotely who answers calls during staffed hours and bills per minute. An AI receptionist like Keres uses AI to answer every call 24/7, book appointments during the conversation, and charge one monthly rate with included minutes rather than billing every call.',
    },
    {
      q: 'What is the best alternative to Smith.ai?',
      a: 'It depends on what you need: live receptionists (Ruby, PATLive), a human-plus-AI mix (Abby Connect), or an AI receptionist (Goodcall, Rosie, Dialzara, Upfirst, My AI Front Desk, Keres AI). Keres AI suits local service businesses that want the appointment booked on the call, billed as a monthly rate with included minutes and no per-call fees. Prices for each are at /smith-ai-alternative.',
    },
    {
      q: 'Is an AI receptionist better than voicemail?',
      a: 'For businesses where missed calls mean missed revenue, yes significantly. Most callers who reach voicemail never leave a message — they call the next business. An AI receptionist answers in two rings, qualifies the lead, and books the job during the call, recovering every lead that voicemail would lose.',
    },
    {
      q: 'How quickly can I set up an AI receptionist?',
      a: 'Setup timing is agreed on the first call; it depends on the workers, integrations and intake rules. The process: a call to map your call flows, connect your phone number and calendar, train Remi on your business, test with real call scenarios, then launch. Month-to-month, cancel anytime.',
    },
  ];

  const seen = new Set<string>();
  const allFaqs = [
    ...topLevelFaqs,
    ...glossary.filter((t) => url(`/glossary/${t.slug}`)).flatMap((t) => t.faqs),
    ...usecases.filter((u) => url(`/use-cases/${u.slug}`)).flatMap((u) => u.faqs),
    ...comparisons.filter((x) => x.roundup && x.roundup.length).flatMap((c) => c.faqs),
    ...integrations.filter(isLive).flatMap((i) => i.faqs),
    ...industries.filter((i) => url(`/ai-receptionist-for-${i.slug}`)).flatMap((i) => i.faqs),
  ];
  for (const f of allFaqs) {
    if (seen.has(f.q) || UNCONFIRMED.test(f.a)) continue;
    seen.add(f.q);
    push(`Q: ${f.q}`);
    push(`A: ${strip(f.a)}`);
    push();
  }

  // ── GUIDES ────────────────────────────────────────────────────
  push('## Guides & playbooks');
  push();
  for (const g of [...guides].sort((a, b) => a.order - b.order)) {
    push(`### ${g.listTitle}`);
    push(`Category: ${g.category} | Read time: ${g.readTime}`);
    push(g.listDesc);
    push(`URL: ${ORIGIN}/guides/${g.slug}.html`);
    push();
  }

  // ── TOOLS ─────────────────────────────────────────────────────
  push('## Free tools');
  push(`- Missed-call revenue calculator: ${ORIGIN}/tools/missed-call-calculator — Estimate monthly revenue lost to unanswered calls. Inputs: monthly leads, answer rate, average ticket value, after-hours lead percentage.`);
  push(`- Email deliverability checker: ${ORIGIN}/tools/deliverability-checker — Check SPF, DKIM, DMARC, and MX records for any domain.`);
  push(`- Email spam-score checker: ${ORIGIN}/tools/spam-score-checker — Score email content for spam-filter risk before sending.`);
  push(`- Front-desk staffing savings estimator: ${ORIGIN}/tools/staffing-savings-estimator — Compare Keres cost vs. a full-time or part-time receptionist.`);
  for (const c of calculators) {
    push(`- ${c.title.split(' — ')[0]}: ${ORIGIN}/tools/${c.slug} — ${strip(c.lead)} Inputs: ${c.fields.map((f) => f.label).join(', ')}.`);
  }
  push();

  // ── TRUST & COMPLIANCE ────────────────────────────────────────
  push('## Trust, security & compliance');
  push(`- Trust & Security page: ${ORIGIN}/trust`);
  push('- Compliance: Keres AI is not SOC 2 or HIPAA certified and does not sign BAAs today. It never uses customer data to train third-party models.');
  push('- Customer data is never used to train third-party AI models.');
  push();

  // ── GET STARTED ───────────────────────────────────────────────
  push('## Get started');
  push(`- Get a quote: ${ORIGIN}/quote (five questions, then a 20-minute call; the booking calendar is on the same page)`);
  push(`- Custom worker: ${ORIGIN}/custom`);
  push(`- Spanish: ${ORIGIN}/es · ${ORIGIN}/es/pricing · ${ORIGIN}/es/custom`);
  push(`- Pricing: ${ORIGIN}/pricing`);
  push(`- Contact: ${business.contactEmail}`);
  push(`- All comparisons: ${ORIGIN}/compare`);
  push(`- AI receptionist cost: ${ORIGIN}/ai-receptionist-cost`);
  push(`- Google Business Profile management: ${ORIGIN}/google-business-profile-management`);
  push(`- Home services hub: ${ORIGIN}/industries/home-services`);
  push(`- About Keres AI: ${ORIGIN}/about`);
  push();

  // ── KEY PAGES ─────────────────────────────────────────────────
  push('## Key pages');
  const keyPages: [string, string][] = [
    ['Remi, the AI receptionist', '/agents/inbound'],
    ['Best AI receptionists (2026)', '/best-ai-receptionist'],
    ['AI answering service vs live answering service', '/ai-answering-service'],
    ['How much an AI receptionist costs', '/ai-receptionist-cost'],
    ['24/7 AI receptionist', '/24-7-ai-receptionist'],
    ['All comparisons', '/compare'],
    ...allComparisons.filter((c) => c.roundup && c.roundup.length).map((c) => [`${c.competitor} alternatives`, `/${c.slug}`] as [string, string]),
    ['Google Business Profile management', '/google-business-profile-management'],
    ['Missed-call statistics', '/missed-call-statistics'],
    ['About', '/about'],
  ];
  for (const [label, p] of keyPages) { const href = url(p); if (href) push(`- ${label}: ${href}`); }
  push();

  return new Response(L.map(sanitize).join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
