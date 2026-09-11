// /llms.txt — generated, not static.
//
// It was a hand-maintained file in public/, which meant the agent names
// and the price floors could drift away from src/data/site.ts the first
// time either changed. Generating it makes that impossible: one edit to
// site.ts updates the nav, the pricing page, the mocks and this file.

import type { APIRoute } from 'astro';
import { agents, plans, foundServices, PHONE, EMAIL, ORIGIN } from '../data/site';
import { workers } from '../data/workers';
import { priceAmount, business } from '../config/business';
import { translatedPaths } from '../i18n';
import { stages, stageLabel } from '../data/leaks';
import { hubs } from '../data/hubs';

const u = (p: string) => `${ORIGIN}${p}`;

export const GET: APIRoute = () => {
  const found = plans.find((p) => p.slug === 'found')!;
  const priceLine = (key: Parameters<typeof priceAmount>[0], per = '/month') => { const v = priceAmount(key); return v ? `from ${v}${per}` : 'quoted to your volume'; };

  const body = `# Keres AI

> Keres AI sells AI workers for local businesses. Each worker does one job, reports to the owner in one text every morning, and can be hired alone or together: Found gets you found (website, Google listing, reviews), Remi answers every call in two rings and books it, Theo confirms and reminds, June brings past customers back and asks for the review, Sol finds new customers by email, and Custom is built for any recurring job. Live in five business days, month-to-month, in English and Spanish.

Keres serves law firms, home-services contractors (HVAC, plumbing, roofing, septic, towing), dental practices and med spas, and real-estate teams: the businesses whose sales team is whoever picks up the phone.

Key facts:
- Six workers, hired one at a time or together. Each publishes a starting price on ${u('/pricing')} and is quoted to call volume, locations and integrations.
- Every call answered in two rings, 24/7, including nights, weekends and holidays. Unlimited simultaneous calls.
- Live in five business days. Month-to-month, no contract, no cancellation fee. Per-minute usage after included minutes.
- Owner Daily Brief: one morning text with calls answered, leads qualified, appointments booked, no-shows prevented, reviews posted, and which source produced the bookings. Every worker reports to the same text.
- Human escalation is a feature: warm transfer, or a "call me now" alert carrying the intake already collected.
- Spanish: the homepage, quote page, pricing, custom-worker page and ad landings exist under ${u('/es')}.
${PHONE ? `- Phone: ${PHONE.display}\n` : ''}- Contact: ${EMAIL}
- Full reference (definitions, FAQs, descriptions): ${u('/llms-full.txt')}

## The roster: six workers
${workers
  .map((w) => `- **${w.name}** (${u(w.href)}): ${w.job}. ${w.slug === 'custom' ? `Build ${priceLine('customBuild', ' one time')}, run ${priceLine('customRun')}; scoped on a 20-minute call.` : `Price: ${priceLine(w.priceKey)}.`} Includes: ${w.includes.join('; ')}.`)
  .join('\n')}
- **All of them**: every worker, one pipeline, one text, one invoice. Bundles ${priceLine('bundle')}.

On a customer's own line each worker introduces itself with whatever name that customer configures. Remi, Theo, June and Sol are the product's default names.

## How to buy
- Get a quote: ${u('/quote')} — five questions, then a 20-minute call with the number ready. Spanish: ${u('/es/quote')}.
- Book the call directly on the calendar embedded on the same page: ${business.bookingUrl}
- Custom worker: ${u('/custom')} — one recurring job, one-page scope, fixed build price, monthly run fee, first version in two weeks, you approve everything it publishes.

## The pipeline — seven stages
A small firm's revenue is one pipeline, and Keres covers every stage of it. A customer can start at whichever stage leaks most.

${stages
  .map((s) => `${stageLabel(s.n)}. **${s.name}** — ${s.leak} Worker: ${s.by}. ${s.fix} (${u(s.href)})`)
  .join('\n')}

## Found — one worker, eight jobs (${priceLine('found')})
${u('/services/found')}

${foundServices.map((s) => `- **${s.name}**${s.addOn ? ' (add-on)' : ''}: ${s.desc}`).join('\n')}

Not sold by Keres, referred to partners instead: Google Ads and PPC management, video and photography, bespoke branding, generic social media management, generic SEO retainers.

## Pricing
One price per worker, published as a starting point and quoted to your business. Month-to-month. What changes the quote: locations, industry, monthly call volume, integrations, AI search and Local Services Ads add-ons, review volume, and how many workers you hire together. ${u('/pricing')} (Spanish: ${u('/es/pricing')})

## Core pages
- [Home](${u('/')}): the roster of six workers, the pipeline, and what each stage leaks.
- [All workers](${u('/services')}): the seven stages and the worker that handles each.
- [Found](${u('/services/found')}): website, Google Business Profile, reviews, listings and AI search.
- [Custom worker](${u('/custom')}): any recurring job, scoped and built for you.
- [Pricing](${u('/pricing')}): one row per worker and what changes the quote.
- [Get a quote](${u('/quote')}): the form and the booking calendar${PHONE ? `, or call ${PHONE.display}` : ''}.
- [Hear it](${u('/hear-it')}): recorded sample calls per vertical.

## Industry hubs
${hubs.map((h) => `- [${h.name}](${u(`/industries/${h.slug}`)}): ${h.sub.split('. ')[0]}.`).join('\n')}

More specific industry pages sit beneath these hubs:
- [HVAC](${u('/ai-receptionist-for-hvac')}) · [Plumbers](${u('/ai-receptionist-for-plumbers')}) · [Roofing](${u('/ai-receptionist-for-roofing')}) · [Septic](${u('/ai-receptionist-for-septic')}) · [Towing](${u('/ai-receptionist-for-towing')})
- [Dentists](${u('/ai-receptionist-for-dentists')}) · [Med spas](${u('/ai-receptionist-for-med-spas')}) · [Real estate](${u('/ai-receptionist-for-real-estate')}) · [Professional intake](${u('/ai-receptionist-for-professional-intake')})

## City pages (AI receptionist by metro)
Houston, Phoenix, Dallas, Atlanta, Chicago, Miami, Los Angeles, Charlotte, Tampa, Denver, Las Vegas, Austin — e.g. ${u('/ai-receptionist/houston')}

## Benchmarks (sourced data)
- [Benchmarks index](${u('/benchmarks')})
- [Legal intake conversion](${u('/benchmarks/legal-intake-conversion')}) · [HVAC answering](${u('/benchmarks/hvac-answering')}) · [Dental no-show](${u('/benchmarks/dental-no-show')}) · [Roofing lead response](${u('/benchmarks/roofing-lead-response')}) · [AI receptionist cost study](${u('/benchmarks/ai-receptionist-cost-study')})

## Comparisons
Answering services and AI receptionists:
- [Smith.ai](${u('/smith-ai-alternative')}) · [Ruby](${u('/ruby-alternative')}) · [Goodcall](${u('/goodcall-alternative')}) · [Rosie](${u('/rosie-alternative')}) · [Answering Legal](${u('/answering-legal-alternative')}) · [Dialpad](${u('/dialpad-alternative')}) · [Numa](${u('/numa-alternative')}) · [OpenPhone](${u('/openphone-alternative')})
Outbound:
- [Apollo](${u('/apollo-alternative')}) · [Instantly](${u('/instantly-alternative')}) · [Smartlead](${u('/smartlead-alternative')})

## Use cases
- [Use cases index](${u('/use-cases')})
- [After-hours answering](${u('/use-cases/after-hours-answering')}) · [Overflow call handling](${u('/use-cases/overflow-call-handling')}) · [Appointment booking](${u('/use-cases/appointment-booking')})
- [Lead capture](${u('/use-cases/lead-capture')}) · [Reduce staffing costs](${u('/use-cases/reduce-staffing-costs')}) · [Spam-call screening](${u('/use-cases/spam-call-screening')})

## Integrations
Connected today: Google Calendar, HubSpot, ServiceTitan, Zapier.
Rolling out: Clio, Lawmatics, Jobber, Housecall Pro, Dentrix, Open Dental, Follow Up Boss.
Anything else connects by webhook or CSV.
- [Integrations index](${u('/integrations')})
- [ServiceTitan](${u('/integrations/servicetitan')}) · [HubSpot](${u('/integrations/hubspot')}) · [Google Calendar](${u('/integrations/google-calendar')}) · [Zapier](${u('/integrations/zapier')}) · [Twilio](${u('/integrations/twilio')}) · [Outlook](${u('/integrations/outlook')})

## Tools
- [Free tools index](${u('/tools')})
- [Missed-call revenue calculator](${u('/tools/missed-call-calculator')}) · [Legal intake ROI](${u('/tools/legal-intake-roi-calculator')}) · [Dental no-show](${u('/tools/dental-no-show-calculator')}) · [Lead response time](${u('/tools/lead-response-time-calculator')})
- [Email deliverability checker](${u('/tools/deliverability-checker')}) · [Spam-score checker](${u('/tools/spam-score-checker')}) · [Front-desk staffing estimator](${u('/tools/staffing-savings-estimator')})

## Glossary (definitions)
- [Glossary index](${u('/glossary')})
- [AI receptionist](${u('/glossary/ai-receptionist')}) · [AI answering service](${u('/glossary/ai-answering-service')}) · [AI SDR](${u('/glossary/ai-sdr')}) · [Missed-call recovery](${u('/glossary/missed-call-recovery')}) · [Legal intake](${u('/glossary/legal-intake')}) · [Lead response time](${u('/glossary/lead-response-time')})
- [Email deliverability](${u('/glossary/email-deliverability')}) · [SPF](${u('/glossary/spf')}) · [DKIM](${u('/glossary/dkim')}) · [Inbox warmup](${u('/glossary/inbox-warmup')})

## Trust and company
- [Trust & security](${u('/trust')}): data handling, DPAs, access logging.
- [About](${u('/about')}) · [Partners](${u('/partners')}) · [Customers](${u('/customers')}) · [Contact](${u('/contact')})

## Spanish (español)
${translatedPaths.map((p) => `- ${u(p === '/' ? '/es' : '/es' + p)}`).join('\n')}

## Resources
- [Guides & playbooks](${u('/blog')})
- [Missed-call statistics](${u('/missed-call-statistics')})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
