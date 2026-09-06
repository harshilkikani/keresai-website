// /llms.txt — generated, not static.
//
// It was a hand-maintained file in public/, which meant the agent names
// and the price floors could drift away from src/data/site.ts the first
// time either changed. Generating it makes that impossible: one edit to
// site.ts updates the nav, the pricing page, the mocks and this file.

import type { APIRoute } from 'astro';
import { agents, plans, foundServices, PHONE, EMAIL, ORIGIN } from '../data/site';
import { stages, stageLabel } from '../data/leaks';
import { hubs } from '../data/hubs';

const u = (p: string) => `${ORIGIN}${p}`;

export const GET: APIRoute = () => {
  const found = plans.find((p) => p.slug === 'found')!;

  const body = `# Keres AI

> Keres AI is an AI workforce for businesses whose sales team is whoever picks up the phone. Four named agents answer the call, follow up, reactivate past customers and run outbound, and a visibility layer called Found gets the firm found in the first place.

Keres serves law firms, home-services contractors (HVAC, plumbing, roofing, septic, towing), dental practices and med spas, and real-estate teams — the businesses where the next call is the next deal.

Key facts:
- Every call answered in two rings, 24/7, including nights, weekends and holidays.
- Live in five business days. Month-to-month, no contract. Per-minute usage after included minutes.
- Plans: ${plans.map((p) => `${p.name} (${p.from})`).join(', ')}.
- Found starts at $249/month; law firms from $499/month.
- Owner Daily Brief: one morning text with calls answered, leads qualified, appointments booked, no-shows prevented, reviews posted, and which source produced the bookings.
- Human escalation is a feature: warm transfer, or a "call me now" alert carrying the intake already collected.
- Phone: ${PHONE.display}
- Contact: ${EMAIL}
- Full reference (definitions, FAQs, descriptions): ${u('/llms-full.txt')}

## The four agents
${agents
  .map(
    (a) => `- **${a.name} — ${a.title}** (${u(`/agents/${a.slug}`)}): ${a.job} Also searched as "${a.searchTerm}". First included in the ${a.includedIn} plan.
${a.bullets.map((b) => `  - ${b}`).join('\n')}`
  )
  .join('\n')}

On a customer's own line each agent introduces itself with whatever name that customer configures. Remi, Theo, June and Sol are the product's default names.

## The pipeline — seven stages
A small firm's revenue is one pipeline, and Keres covers every stage of it. A customer can start at whichever stage leaks most.

${stages
  .map((s) => `${stageLabel(s.n)}. **${s.name}** — ${s.leak} Handled by ${s.by}: ${s.fix} (${u(s.href)})`)
  .join('\n')}

## Found — the visibility layer (${found.from}/month, law firms from $499)
${u('/services/found')}

${foundServices.map((s) => `- **${s.name}**${s.addOn ? ' (add-on)' : ''}: ${s.desc}`).join('\n')}

Not sold by Keres, referred to partners instead: Google Ads and PPC management, video and photography, bespoke branding, generic social media management, generic SEO retainers.

## Plans
${plans
  .map(
    (p) =>
      `- **${p.name}** — ${p.from}${p.fromNote ? ` (${p.fromNote})` : ''}, quoted to your volume. ${p.summary} Includes: ${p.includes.join('; ')}.`
  )
  .join('\n')}

What changes the quote: locations, industry, monthly call volume, integrations, AI search and Local Services Ads add-ons, review volume, and whether Found is bundled with an agent plan.

## Core pages
- [Home](${u('/')}): the pipeline, the four agents, and what each stage leaks.
- [Services](${u('/services')}): all seven stages with every service and the plan that includes it.
- [Found](${u('/services/found')}): websites, Google Business Profile, reviews, listings and AI search from $249/month.
- [Pricing](${u('/pricing')}): five plans, published floors, and what changes the quote.
- [Book a demo](${u('/demo')}): schedule a live walkthrough, or call ${PHONE.display}.
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

## Resources
- [Guides & playbooks](${u('/blog')})
- [Missed-call statistics](${u('/missed-call-statistics')})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
