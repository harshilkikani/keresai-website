// Data-driven vertical calculators → /tools/{slug}. One generic engine
// (public/assets/calc.js) computes every kind; each entry here defines the
// fields, copy, close rate, and FAQs. Add an entry → a new calculator builds.
export interface CalcField {
  id: string; // matches data-calc-field; engine reads by id
  label: string;
  default: number;
  min?: number;
  max?: number;
  prefix?: string; // e.g. "$"
}

export interface Calculator {
  slug: string;
  kind: 'missed-call' | 'no-show' | 'response-time';
  closeRate: number; // decimal, used by engine + shown in steps
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  h1Accent: string;
  lead: string;
  answer: string; // direct-answer block (HTML allowed)
  fields: CalcField[];
  resultLabel: string; // headline label, e.g. "You're losing"
  perLabel: string; // e.g. "/mo"
  secondaryLabel: string; // e.g. "/ year"
  note: string; // methodology disclosure shown under the result
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

export const calculators: Calculator[] = [
  {
    slug: 'hvac-missed-call-calculator',
    kind: 'missed-call',
    closeRate: 0.25,
    eyebrow: 'HVAC · Free tool',
    title: 'HVAC Missed-Call Calculator — What Are You Losing? | Keres AI',
    description:
      'Free HVAC missed-call calculator. Enter your monthly call volume, answer rate, and average ticket to see the service revenue lost to unanswered calls every month.',
    h1: 'What are missed HVAC calls',
    h1Accent: 'costing you?',
    lead: 'Peak-season and after-hours calls are where HVAC companies lose the most. Plug in your numbers to see the monthly and annual revenue slipping away to voicemail.',
    answer:
      '<strong>HVAC missed-call loss</strong> = monthly calls × missed-call rate × close rate × average ticket. HVAC companies miss an estimated 30–45% of calls in peak season, and with service tickets averaging $300–$600 (and replacements far higher), even a 65% answer rate can mean five figures a month walking to competitors.',
    fields: [
      { id: 'leads', label: 'Monthly calls', default: 400, min: 0 },
      { id: 'answer', label: 'Answer rate %', default: 65, min: 0, max: 100 },
      { id: 'value', label: 'Avg ticket value', default: 450, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'Close rate (25%) is the typical answered-lead close rate for home services. Swap in your own number if you track it.',
    faqs: [
      { q: 'How much revenue do HVAC companies lose to missed calls?', a: 'It depends on call volume and average ticket, but HVAC companies missing 30–45% of peak-season calls commonly lose five figures a month. Enter your numbers above for an estimate, and see the <a href="/benchmarks/hvac-answering">HVAC answering benchmarks</a> for context.' },
      { q: 'Why do HVAC companies miss so many calls?', a: 'Demand is spiky — a heat wave or cold snap multiplies call volume overnight, and a large share of no-cool and no-heat calls arrive after hours when the office is closed. See the <a href="/ai-receptionist-for-hvac">AI receptionist for HVAC</a>.' },
      { q: 'How can an HVAC company stop missing calls?', a: 'An AI receptionist answers every call in two rings, 24/7, books the service visit, and dispatches no-cool and no-heat emergencies to your on-call tech — closing both the peak-season and after-hours gaps.' },
    ],
    related: [
      { label: 'AI receptionist for HVAC', href: '/ai-receptionist-for-hvac' },
      { label: 'HVAC answering benchmarks', href: '/benchmarks/hvac-answering' },
      { label: 'Missed-call statistics', href: '/missed-call-statistics' },
    ],
  },
  {
    slug: 'roofing-storm-lead-calculator',
    kind: 'missed-call',
    closeRate: 0.3,
    eyebrow: 'Roofing · Free tool',
    title: 'Roofing Storm-Lead Calculator — Lost Revenue per Surge | Keres AI',
    description:
      'Free roofing storm-lead calculator. Enter your storm-season call volume, answer rate, and average job value to see the revenue lost when surge calls go unanswered.',
    h1: 'What are missed storm leads',
    h1Accent: 'costing you?',
    lead: 'A hailstorm can generate a season of calls in hours — and the first roofer to answer usually wins the claim. See what an unanswered surge costs you.',
    answer:
      '<strong>Roofing storm-lead loss</strong> = storm-season calls × missed-call rate × close rate × average job value. Because the first company to inspect typically wins the insurance claim and replacement jobs run $10,000+, missing even a fraction of a hail-surge can cost six figures across a season.',
    fields: [
      { id: 'leads', label: 'Storm-season calls / mo', default: 300, min: 0 },
      { id: 'answer', label: 'Answer rate %', default: 60, min: 0, max: 100 },
      { id: 'value', label: 'Avg job value', default: 9000, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ season (×12)',
    note: 'Close rate (30%) reflects a typical answered storm-lead booking rate. Storm volume is bursty — your worst month matters more than your average. Swap in your own numbers.',
    faqs: [
      { q: 'How much do roofers lose to missed storm calls?', a: 'With roof replacements routinely worth $10,000+, missing even a handful of storm calls can cost six figures across a season. Enter your numbers above, and see the <a href="/benchmarks/roofing-lead-response">roofing lead-response benchmarks</a>.' },
      { q: 'Why do roofing companies miss storm leads?', a: 'Hail and wind events generate huge simultaneous call surges in a few hours. A normal front desk cannot answer them all, so high-value insurance leads go to voicemail — and most callers dial the next roofer. See the <a href="/ai-receptionist-for-roofing">AI receptionist for roofing</a>.' },
      { q: 'How can roofers capture more storm leads?', a: 'An AI receptionist answers unlimited simultaneous calls the instant a storm hits, qualifies the damage, and books inspections — so a surge becomes a full schedule instead of a full voicemail box.' },
    ],
    related: [
      { label: 'AI receptionist for roofing', href: '/ai-receptionist-for-roofing' },
      { label: 'Roofing lead-response benchmarks', href: '/benchmarks/roofing-lead-response' },
      { label: 'Lead response time', href: '/glossary/lead-response-time' },
    ],
  },
  {
    slug: 'dental-no-show-calculator',
    kind: 'no-show',
    closeRate: 0.25,
    eyebrow: 'Dental · Free tool',
    title: 'Dental No-Show Calculator — Lost Production per Month | Keres AI',
    description:
      'Free dental no-show calculator. Enter your monthly appointments, no-show rate, and average production per visit to see the revenue empty chairs cost you.',
    h1: 'What are no-shows',
    h1Accent: 'costing your practice?',
    lead: 'Empty chairs are lost production you rarely recover same-day. See what your no-show rate costs every month — and every year.',
    answer:
      '<strong>Dental no-show loss</strong> = monthly appointments × no-show rate × average production per visit. With no-show rates estimated at 10–20% and each empty chair worth $200 or more, a busy practice can lose thousands a month — much of it from reschedule calls the front desk never answered.',
    fields: [
      { id: 'appts', label: 'Appointments / mo', default: 400, min: 0 },
      { id: 'noshow', label: 'No-show rate %', default: 15, min: 0, max: 100 },
      { id: 'value', label: 'Avg production / visit', default: 250, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'No-show rates for dental practices are commonly estimated at 10–20%. Many no-shows trace back to reschedule calls that went unanswered. Swap in your own production number.',
    faqs: [
      { q: 'How much do dental no-shows cost?', a: 'With no-show rates of 10–20% and each empty chair worth $200 or more, a busy practice can lose thousands a month. Enter your numbers above, and see the <a href="/benchmarks/dental-no-show">dental no-show benchmarks</a>.' },
      { q: 'How do missed calls cause no-shows?', a: 'When patients cannot reach the office to reschedule, the appointment simply lapses and the chair sits empty. Capturing and rebooking those calls is one of the most direct ways to cut no-shows. See the <a href="/ai-receptionist-for-dentists">AI receptionist for dental practices</a>.' },
      { q: 'How can a practice reduce no-shows?', a: 'Answer and rebook every reschedule call, confirm appointments proactively, and cover after-hours demand. An AI receptionist does all three automatically, 24/7.' },
    ],
    related: [
      { label: 'AI receptionist for dental practices', href: '/ai-receptionist-for-dentists' },
      { label: 'Dental no-show benchmarks', href: '/benchmarks/dental-no-show' },
      { label: 'No-show rate', href: '/glossary/no-show-rate' },
    ],
  },
  {
    slug: 'legal-intake-roi-calculator',
    kind: 'missed-call',
    closeRate: 0.2,
    eyebrow: 'Legal · Free tool',
    title: 'Legal Intake ROI Calculator — Lost Case Value | Keres AI',
    description:
      'Free legal intake calculator. Enter your monthly new-client calls, answer rate, and average case value to see the revenue lost to missed and slow intake.',
    h1: 'What is missed intake',
    h1Accent: 'costing your firm?',
    lead: 'A single missed new-client call can be thousands in lost case value handed to the firm that answered. See what your intake gap costs.',
    answer:
      '<strong>Legal intake loss</strong> = monthly new-client calls × missed-call rate × signed-client rate × average case value. Because the first firm to respond usually signs the client and case values run $1,000–$10,000+, even a modest miss rate on high-intent inquiries adds up fast.',
    fields: [
      { id: 'leads', label: 'New-client calls / mo', default: 80, min: 0 },
      { id: 'answer', label: 'Answer rate %', default: 55, min: 0, max: 100 },
      { id: 'value', label: 'Avg case value', default: 3500, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'Signed-client rate (20%) reflects a typical answered-inquiry to retained-client rate. Swap in your own number if you track it.',
    faqs: [
      { q: 'How much do law firms lose to missed intake calls?', a: 'With case values of $1,000–$10,000+ and the first firm to respond usually signing the client, even a modest miss rate costs significant revenue. Enter your numbers above, and see the <a href="/benchmarks/legal-intake-conversion">legal intake conversion benchmarks</a>.' },
      { q: 'Why do firms lose new clients?', a: 'High-value legal inquiries often arrive after hours and callers rarely leave voicemails. When the call is not answered live, the prospective client simply calls the next firm. See the <a href="/ai-receptionist-for-professional-intake">AI receptionist for legal intake</a>.' },
      { q: 'How can a firm improve intake conversion?', a: 'Answer every inquiry live, screen and qualify the matter, and book the consultation — around the clock. An AI receptionist for legal intake handles all of this 24/7, including conflict screening.' },
    ],
    related: [
      { label: 'AI receptionist for legal intake', href: '/ai-receptionist-for-professional-intake' },
      { label: 'Legal intake conversion benchmarks', href: '/benchmarks/legal-intake-conversion' },
      { label: 'Legal intake', href: '/glossary/legal-intake' },
    ],
  },
  {
    slug: 'lead-response-time-calculator',
    kind: 'response-time',
    closeRate: 0.25,
    eyebrow: 'All industries · Free tool',
    title: 'Lead Response Time Calculator — Revenue You Can Recover | Keres AI',
    description:
      'Free lead response time calculator. See how much revenue you can recover by responding to inbound leads in under five minutes instead of hours.',
    h1: 'What is slow response',
    h1Accent: 'costing you?',
    lead: 'Speed to lead decides the job. See the estimated revenue you can recover by responding to every inbound lead in under five minutes.',
    answer:
      '<strong>Speed to lead</strong> is one of the strongest predictors of conversion: responding within five minutes makes a lead far more likely to qualify than waiting even 30 minutes, and the first business to respond usually wins. This calculator estimates the revenue you can recover by closing your response-time gap.',
    fields: [
      { id: 'leads', label: 'Monthly leads', default: 200, min: 0 },
      { id: 'value', label: 'Avg deal value', default: 700, min: 0, prefix: '$' },
      { id: 'current', label: 'Current avg response (min)', default: 30, min: 0 },
    ],
    resultLabel: 'You can recover',
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'Illustrative model: relative conversion vs. a sub-5-minute response is stepped (≤5 min = 100%, ≤10 = 60%, ≤30 = 35%, ≤60 = 20%, >60 = 10%) against a 25% base close rate. Treat as directional, not exact.',
    faqs: [
      { q: 'Why does lead response time matter so much?', a: 'Studies of lead response time consistently find that contacting a lead within five minutes makes it many times more likely to qualify than waiting 30 minutes, and the first business to respond usually wins the job. See <a href="/glossary/lead-response-time">lead response time</a>.' },
      { q: 'How is the recoverable revenue calculated?', a: 'The model compares the deals you would close responding in under five minutes against your current capture at your stated response time, using a stepped relative-conversion factor and a base close rate. It is illustrative — treat it as directional context.' },
      { q: 'How can I respond to every lead in under five minutes?', a: 'An <a href="/ai-receptionist">AI receptionist</a> answers every call in two rings, 24/7, so your effective response time is seconds — for every lead, including after hours and overflow.' },
    ],
    related: [
      { label: 'Lead response time', href: '/glossary/lead-response-time' },
      { label: 'Missed-call statistics', href: '/missed-call-statistics' },
      { label: 'AI receptionist', href: '/ai-receptionist' },
    ],
  },
];
