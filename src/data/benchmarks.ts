// Data-driven benchmark / data-study pages → /benchmarks/{slug}.
// These are "content moat" pages: citable data compilations that earn links and
// get lifted by AI search engines. Add an entry → a new page builds + appears in
// the /benchmarks hub, sitemap, and llms-full.txt.
//
// HONESTY RULE: every figure below is an industry estimate or range, framed as
// directional ("studies estimate", "industry benchmarks suggest"). Never invent
// precise statistics or attribute them to named sources that do not exist —
// fabricated data gets de-indexed and destroys trust.
export interface Benchmark {
  slug: string;
  category: string; // grouping label, e.g. "HVAC"
  pillar: 'inbound' | 'pricing';
  eyebrow: string;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  h1Accent: string; // accent span inside h1
  lead: string;
  datePublished: string;
  answer: string; // direct-answer block (HTML allowed)
  stats: { num: string; stat: string; context: string }[];
  sections: { h2: string; body: string }[]; // HTML allowed in body
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

export const benchmarks: Benchmark[] = [
  {
    slug: 'hvac-answering',
    category: 'HVAC',
    pillar: 'inbound',
    eyebrow: 'HVAC · Data',
    title: 'HVAC Call Answering Benchmarks (2026) | Keres AI',
    description:
      'How many HVAC calls go unanswered, what share arrive after hours, and what a missed no-cool call costs. Citable HVAC answering benchmarks for 2026.',
    h1: 'HVAC call answering',
    h1Accent: 'benchmarks',
    lead: 'How many HVAC calls go unanswered, how much demand arrives after hours, and what a missed no-cool emergency really costs — the answering numbers every contractor should track.',
    datePublished: '2026-02-10',
    answer:
      '<strong>HVAC companies miss an estimated 30–45% of inbound calls during peak season</strong>, and an estimated 35–50% of demand arrives after hours, when most offices are closed. Because a no-cool or no-heat call is urgent, callers who reach voicemail almost always dial a competitor — making peak-season answer rate one of the highest-leverage numbers in the business.',
    stats: [
      { num: '30–45%', stat: 'of HVAC calls go unanswered during peak season', context: 'Heat waves and cold snaps drive call volume far beyond what a normal front desk can pick up, so a large share of calls hit voicemail exactly when demand is highest.' },
      { num: '35–50%', stat: 'of HVAC demand arrives after hours', context: 'No-cool and no-heat failures do not respect business hours — a large share of calls come evenings, nights, and weekends when offices are closed.' },
      { num: '$300–$600', stat: 'typical value of a single HVAC service call', context: 'Even a routine repair is worth hundreds of dollars; a missed call is a missed ticket, and replacement jobs run into five figures.' },
      { num: '2 rings', stat: 'the answer speed urgent callers expect', context: 'When the house is at 90°F, callers will not wait on hold — the business that picks up first books the job.' },
    ],
    sections: [
      { h2: 'Why peak season is when HVAC companies lose the most', body: '<p>HVAC demand is spiky by nature: a heat wave or a cold snap can multiply call volume overnight. The same front desk that comfortably answers a slow week is overwhelmed the moment temperatures break, so the missed-call rate climbs exactly when each call is worth the most. The result is a peak-season paradox — your busiest, most profitable days are also when you lose the most leads to voicemail.</p>' },
      { h2: 'The after-hours gap', body: '<p>A no-cool call at 8 p.m. in July is an emergency to the homeowner, and they will keep dialing until someone answers. With an estimated 35–50% of HVAC demand arriving outside business hours, after-hours coverage is not a nice-to-have — it is where a large share of bookable revenue lives. See <a href="/glossary/after-hours-answering">after-hours answering</a> and <a href="/glossary/emergency-dispatch">emergency dispatch</a> for how this works in practice.</p>' },
      { h2: 'What the math looks like', body: '<p>Take a contractor handling 400 calls in a peak month at a 65% answer rate. That is roughly 140 missed calls; even at a conservative 25% close rate and a $450 average ticket, the missed-call gap is over $15,000 in a single month — before counting the replacement jobs that hide inside those calls. Run your own figures with the <a href="/tools/missed-call-calculator">missed-call calculator</a>.</p>' },
      { h2: 'Closing the gap', body: '<p>You cannot hire your way to two-ring pickup at midnight during a heat wave. An <a href="/ai-receptionist-for-hvac">AI receptionist for HVAC</a> answers unlimited simultaneous calls 24/7, books the service visit, and dispatches no-cool and no-heat emergencies to your on-call tech instantly — closing both the peak-season and after-hours gaps at once.</p>' },
    ],
    faqs: [
      { q: 'What percentage of HVAC calls go unanswered?', a: 'Industry estimates put peak-season missed calls for HVAC companies at 30–45%, climbing higher after hours. Because no-cool and no-heat calls are urgent, most callers who reach voicemail call a competitor instead of waiting.' },
      { q: 'How many HVAC calls come after hours?', a: 'An estimated 35–50% of HVAC demand arrives outside business hours — evenings, nights, and weekends — which is why after-hours answering is one of the highest-leverage investments an HVAC company can make.' },
      { q: 'What does a missed HVAC call cost?', a: 'A single service call is typically worth $300–$600, and replacement jobs run into five figures. For a contractor missing 140 calls a month, the lost revenue easily exceeds $15,000. Use the <a href="/tools/missed-call-calculator">missed-call calculator</a> to estimate your own number.' },
    ],
    related: [
      { label: 'AI receptionist for HVAC', href: '/ai-receptionist-for-hvac' },
      { label: 'Missed-call statistics', href: '/missed-call-statistics' },
      { label: 'Missed-call calculator', href: '/tools/missed-call-calculator' },
    ],
  },
  {
    slug: 'roofing-lead-response',
    category: 'Roofing',
    pillar: 'inbound',
    eyebrow: 'Roofing · Data',
    title: 'Roofing Lead-Response Benchmarks (2026) | Keres AI',
    description:
      'How fast roofers must respond after a storm, why the first inspector wins the claim, and what a missed storm lead costs. Roofing lead-response benchmarks for 2026.',
    h1: 'Roofing lead-response',
    h1Accent: 'benchmarks',
    lead: 'How fast roofing companies must respond after a storm, why the first inspector usually wins the insurance claim, and what a missed storm-season lead really costs.',
    datePublished: '2026-02-12',
    answer:
      '<strong>In roofing, the first company to respond and inspect typically wins the insurance claim</strong> — studies of lead response consistently show a strong majority of customers buy from whoever answers first. Because hail and wind events generate huge simultaneous call surges, a roofer whose phone goes to voicemail during a storm hands five-figure jobs directly to faster competitors.',
    stats: [
      { num: 'First', stat: 'responder usually wins the storm claim', context: 'Lead-response research consistently finds a strong majority of customers buy from the business that answers first; in a post-storm rush, the first roofer to inspect usually signs the contract.' },
      { num: '5 min', stat: 'response window that dramatically lifts qualification odds', context: 'Studies of lead response time find that contacting a lead within five minutes makes it many times more likely to convert than waiting even 30 minutes.' },
      { num: '100s', stat: 'of calls a single storm can trigger in hours', context: 'A hailstorm can damage thousands of roofs in minutes, generating a call surge no normal front desk can absorb.' },
      { num: '$10k+', stat: 'typical value of a roof replacement job', context: 'A single missed storm lead can be a five-figure replacement or insurance job handed to a competitor.' },
    ],
    sections: [
      { h2: 'Why the first responder wins the claim', body: '<p>After a storm, homeowners are anxious and ready to act. The first roofer to answer, inspect, and explain the insurance process earns the trust — and usually the signature. Every hour of delay is a chance for a competitor to get on the roof first. In roofing, "lead response time" is not a marketing metric; it is the difference between a booked claim and a lost one. See <a href="/glossary/lead-response-time">why speed to lead wins</a>.</p>' },
      { h2: 'The storm-surge problem', body: '<p>The cruel irony of roofing is that demand arrives all at once. A hailstorm can damage thousands of roofs in minutes, and the calls land in the same few hours. A front desk that handles a normal day fine will send dozens of storm callers to voicemail — and those are exactly the high-value insurance leads. Unlimited simultaneous answering is the only way to capture a surge.</p>' },
      { h2: 'What a missed storm lead costs', body: '<p>With roof replacements routinely worth $10,000 or more, the math is stark: missing even a handful of storm calls can cost six figures across a season. Estimate the impact for your call volume with the <a href="/tools/missed-call-calculator">missed-call calculator</a>.</p>' },
      { h2: 'Closing the gap', body: '<p>An <a href="/ai-receptionist-for-roofing">AI receptionist for roofing</a> answers unlimited simultaneous calls the instant a storm hits, qualifies the damage, and books inspections on your estimators’ calendars — so a surge becomes a full schedule instead of a full voicemail box.</p>' },
    ],
    faqs: [
      { q: 'How fast should a roofing company respond to a storm lead?', a: 'As close to immediately as possible. Studies of lead response time show that responding within five minutes dramatically raises conversion, and in roofing the first company to inspect usually wins the insurance claim.' },
      { q: 'Why do roofers lose leads after a storm?', a: 'Hail and wind events generate huge simultaneous call surges in a few hours. A normal front desk cannot answer them all, so high-value insurance leads go to voicemail — and most callers simply dial the next roofer.' },
      { q: 'What does a missed roofing lead cost?', a: 'Roof replacement jobs are routinely worth $10,000 or more, so missing even a few storm calls can cost six figures across a season. Use the <a href="/tools/missed-call-calculator">missed-call calculator</a> to estimate your own exposure.' },
    ],
    related: [
      { label: 'AI receptionist for roofing', href: '/ai-receptionist-for-roofing' },
      { label: 'Lead response time', href: '/glossary/lead-response-time' },
      { label: 'Missed-call calculator', href: '/tools/missed-call-calculator' },
    ],
  },
  {
    slug: 'ai-receptionist-cost-study',
    category: 'Pricing',
    pillar: 'pricing',
    eyebrow: 'Pricing · Study',
    title: 'AI Receptionist Cost Study 2026 — What Coverage Costs | Keres AI',
    description:
      'A 2026 cost study comparing an AI receptionist to a full-time front-desk hire and a per-minute answering service — by coverage, predictability, and cost per booked call.',
    h1: 'AI receptionist',
    h1Accent: 'cost study',
    lead: 'What does it actually cost to answer every call? A 2026 comparison of an AI receptionist against a full-time front-desk hire and a per-minute answering service — by coverage, predictability, and cost per booked appointment.',
    datePublished: '2026-02-15',
    answer:
      '<strong>A full-time receptionist costs an estimated $35,000–$50,000 a year and covers only ~40 hours a week.</strong> A per-minute answering service typically runs $1–$3 per minute (often $200–$600+ a month) and usually just takes a message. An AI receptionist uses flat monthly pricing, covers 24/7/365 including unlimited simultaneous calls, and books appointments live — usually well below the cost of a full-time hire.',
    stats: [
      { num: '$35k–$50k', stat: 'annual cost of a full-time front-desk receptionist', context: 'Salary plus benefits and payroll taxes — and that covers roughly 40 hours a week, leaving nights, weekends, and overflow uncovered.' },
      { num: '$1–$3', stat: 'per-minute rate for a typical human answering service', context: 'Per-minute billing means costs rise exactly when call volume spikes, and most services only take a message rather than book the job.' },
      { num: '40 hrs', stat: 'weekly coverage from a single full-time hire', context: 'One receptionist cannot cover 24/7. Nights, weekends, holidays, lunch breaks, and simultaneous calls all fall through the gaps.' },
      { num: '24/7', stat: 'coverage from an AI receptionist at a flat rate', context: 'Unlimited simultaneous calls, every hour of every day, for a predictable monthly fee that does not spike with volume.' },
    ],
    sections: [
      { h2: 'The hidden cost of a full-time hire', body: '<p>A front-desk salary is only part of the cost. Add benefits, payroll taxes, training, turnover, and paid time off, and the fully loaded cost of one receptionist commonly lands between $35,000 and $50,000 a year. Critically, that buys roughly 40 hours of coverage a week — so nights, weekends, holidays, lunch breaks, and any second call that comes in while they are busy still go unanswered.</p>' },
      { h2: 'Why per-minute billing punishes growth', body: '<p>Per-minute answering services look cheap until your busy season hits. Because you pay by the minute, your bill rises exactly when call volume spikes — and most of these services only take a message, leaving the actual booking to you. The model charges you more for the privilege of doing half the job. See how this compares on the <a href="/ai-answering-service">AI answering service</a> page.</p>' },
      { h2: 'Cost per booked appointment is the real metric', body: '<p>The number that matters is not monthly cost — it is cost per booked appointment. A cheaper option that misses half your calls or only takes messages has a far higher true cost per booking than a flat-rate service that answers everything and books live. When you measure by booked jobs, 24/7 coverage with unlimited simultaneous calls changes the equation.</p>' },
      { h2: 'How flat-rate AI pricing works', body: '<p>An <a href="/agents/inbound">AI receptionist</a> charges a predictable monthly fee regardless of call volume, answers unlimited simultaneous calls around the clock, and books appointments during the call. For most service businesses that lands well below the cost of a full-time hire while covering the hours a single person never could. See current plans on the <a href="/pricing">pricing page</a>, or compare specific options on the <a href="/compare">comparisons hub</a>.</p>' },
    ],
    faqs: [
      { q: 'How much does an AI receptionist cost vs. a human receptionist?', a: 'A full-time receptionist costs an estimated $35,000–$50,000 a year for ~40 hours of weekly coverage. An AI receptionist uses flat monthly pricing, covers 24/7 with unlimited simultaneous calls, and typically costs well below a full-time hire. See the <a href="/pricing">pricing page</a> for current plans.' },
      { q: 'Is an AI receptionist cheaper than an answering service?', a: 'Usually more predictable, and often cheaper in practice. Per-minute answering services bill $1–$3 per minute and cost more as volume rises, while only taking messages. An AI receptionist charges a flat rate and books appointments live, so cost per booked call is typically far lower.' },
      { q: 'What is the true cost of a missed call?', a: 'It depends on your average ticket, but for service businesses a single missed call can be worth hundreds to thousands of dollars. The right way to compare answering options is cost per booked appointment, not monthly price. Estimate yours with the <a href="/tools/missed-call-calculator">missed-call calculator</a>.' },
    ],
    related: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'AI answering service', href: '/ai-answering-service' },
      { label: 'Staffing savings estimator', href: '/tools/staffing-savings-estimator' },
    ],
  },
  {
    slug: 'dental-no-show',
    category: 'Dental',
    pillar: 'inbound',
    eyebrow: 'Dental · Data',
    title: 'Dental No-Show & Booking Benchmarks (2026) | Keres AI',
    description:
      'Typical dental no-show rates, what each no-show costs, and how missed and after-hours calls drive lost patients. Dental booking benchmarks for 2026.',
    h1: 'Dental no-show',
    h1Accent: 'benchmarks',
    lead: 'Typical dental no-show rates, what each empty chair costs, and how missed reschedule and new-patient calls quietly drain a practice — the booking numbers every front office should track.',
    datePublished: '2026-02-18',
    answer:
      '<strong>Dental practices see no-show rates estimated at 10–20%</strong>, and each empty chair can cost $200 or more in lost production. Many no-shows trace back to missed reschedule calls and a front desk too busy to confirm appointments — while new patients who reach voicemail simply book with another practice.',
    stats: [
      { num: '10–20%', stat: 'typical dental no-show rate', context: 'Industry estimates put missed appointments at one in five to one in ten — a direct hit to daily production when chairs sit empty.' },
      { num: '$200+', stat: 'estimated cost of a single no-show', context: 'An empty chair is lost production that is hard to recover same-day; across a month, no-shows add up to thousands in missed revenue.' },
      { num: '30%+', stat: 'of calls a busy front desk can miss', context: 'When staff are with patients, new-patient and reschedule calls go to voicemail — and new patients book elsewhere.' },
      { num: '24/7', stat: 'when patients actually research and book', context: 'Many patients call to book or reschedule outside office hours; without coverage, those bookings are lost.' },
    ],
    sections: [
      { h2: 'No-shows usually start with a missed call', body: '<p>A large share of no-shows are not patients who forgot — they are patients who tried to reschedule, could not reach the front desk, and gave up. When the office line goes to voicemail during a busy clinical day, the reschedule never happens and the chair sits empty. Capturing and rebooking those calls is one of the most direct ways to cut no-shows. See <a href="/glossary/no-show-rate">what a no-show rate is</a>.</p>' },
      { h2: 'The new-patient leak', body: '<p>New patients are the highest-value calls a practice receives, and they are also the least patient. A prospective patient who reaches voicemail rarely leaves a message — they call the next practice. With a busy front desk missing an estimated 30% or more of calls at peak times, the new-patient leak is often invisible on the schedule but very real on the P&L.</p>' },
      { h2: 'After-hours booking matters more than it looks', body: '<p>Plenty of patients only have time to call about an appointment in the evening or on a weekend. Without after-hours coverage, those bookings never land. An always-on front desk turns that lost demand into filled chairs.</p>' },
      { h2: 'Closing the gap', body: '<p>An <a href="/ai-receptionist-for-dentists">AI receptionist for dental practices</a> answers every call, books and reschedules on your practice calendar, confirms appointments to cut no-shows, and handles new-patient intake 24/7 — so a busy clinical day never costs you patients.</p>' },
    ],
    faqs: [
      { q: 'What is a typical dental no-show rate?', a: 'Industry estimates put dental no-show rates at 10–20%. Each missed appointment can cost $200 or more in lost production, and many no-shows trace back to reschedule calls the front desk could not answer.' },
      { q: 'How do missed calls cause dental no-shows?', a: 'When patients cannot reach the office to reschedule, the appointment simply lapses and the chair sits empty. Capturing and rebooking those calls — including after hours — is one of the most direct ways to reduce no-shows.' },
      { q: 'How can a dental practice reduce no-shows?', a: 'Answer and rebook every reschedule call, confirm appointments proactively, and cover after-hours demand. An <a href="/ai-receptionist-for-dentists">AI receptionist</a> does all three automatically, 24/7.' },
    ],
    related: [
      { label: 'AI receptionist for dental practices', href: '/ai-receptionist-for-dentists' },
      { label: 'No-show rate', href: '/glossary/no-show-rate' },
      { label: 'Patient intake', href: '/glossary/patient-intake' },
    ],
  },
  {
    slug: 'legal-intake-conversion',
    category: 'Legal',
    pillar: 'inbound',
    eyebrow: 'Legal · Data',
    title: 'Legal Intake Conversion Benchmarks (2026) | Keres AI',
    description:
      'How fast law firms must respond to new-client calls, how many high-value leads are lost to slow intake, and what each missed case is worth. Legal intake benchmarks for 2026.',
    h1: 'Legal intake conversion',
    h1Accent: 'benchmarks',
    lead: 'How fast law firms must respond to new-client inquiries, how many high-value leads are lost to slow or missed intake, and what each lost case is really worth.',
    datePublished: '2026-02-20',
    answer:
      '<strong>For law firms, the firm that responds first usually wins the client</strong> — and a single missed new-client call can represent thousands of dollars in lost case value. Because high-intent legal inquiries often arrive after hours and callers rarely leave voicemails, intake speed and coverage are among the biggest levers on a firm’s growth.',
    stats: [
      { num: 'First', stat: 'responder usually signs the client', context: 'Prospective clients in distress hire the first firm that answers and reassures them; delay hands the case to a competitor.' },
      { num: '5 min', stat: 'response window that lifts intake conversion', context: 'Lead-response research consistently finds that contacting a lead within five minutes vastly outperforms a delayed callback.' },
      { num: '$1k–$10k+', stat: 'typical value of a single new case', context: 'A missed new-client call is not a small loss — it can be thousands of dollars in case value handed to another firm.' },
      { num: 'After hrs', stat: 'when many high-intent legal calls arrive', context: 'Accidents, arrests, and emergencies do not happen 9-to-5; a large share of valuable inquiries come outside office hours.' },
    ],
    sections: [
      { h2: 'Why speed decides the case', body: '<p>A prospective client calling a law firm is usually anxious and ready to act now. The firm that answers live, listens, and books the consultation earns the trust — and the retainer. A call that goes to voicemail or an after-hours dead line is, in most cases, a lost client who calls the next firm on the list. See <a href="/glossary/legal-intake">what legal intake is</a> and <a href="/glossary/lead-response-time">why speed to lead wins</a>.</p>' },
      { h2: 'The after-hours problem for firms', body: '<p>Many of the highest-value legal matters originate from events that happen outside business hours — accidents, arrests, family emergencies. If those calls reach a voicemail box, the firm never even knows the lead existed. Always-on intake captures demand that most firms silently lose.</p>' },
      { h2: 'Qualified intake protects attorney time', body: '<p>Speed is only half the equation. Good intake also screens for conflicts and qualifies the matter so attorneys spend time only on real opportunities. Automating the first-contact intake — capturing details, screening conflicts, and booking the consultation — both raises conversion and protects billable hours.</p>' },
      { h2: 'Closing the gap', body: '<p>An <a href="/ai-receptionist-for-professional-intake">AI receptionist for legal intake</a> answers every new-client call 24/7, screens for conflicts, qualifies the matter, and books the consultation — so a firm captures high-value leads the moment they call, day or night.</p>' },
    ],
    faqs: [
      { q: 'How fast should a law firm respond to a new-client call?', a: 'As fast as possible — ideally live, on the first call. Lead-response research shows responding within five minutes dramatically outperforms a delayed callback, and in legal intake the first firm to respond usually signs the client.' },
      { q: 'Why do law firms lose new clients?', a: 'High-value legal inquiries often arrive after hours and callers rarely leave voicemails. When the call is not answered live, the prospective client simply calls the next firm — so the lead is lost without the firm ever knowing.' },
      { q: 'How can a firm improve intake conversion?', a: 'Answer every inquiry live, screen and qualify the matter, and book the consultation — around the clock. An <a href="/ai-receptionist-for-professional-intake">AI receptionist for legal intake</a> handles all of this 24/7, including conflict screening.' },
    ],
    related: [
      { label: 'AI receptionist for legal intake', href: '/ai-receptionist-for-professional-intake' },
      { label: 'Legal intake', href: '/glossary/legal-intake' },
      { label: 'Lead response time', href: '/glossary/lead-response-time' },
    ],
  },
];
