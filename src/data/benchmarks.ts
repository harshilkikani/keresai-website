// Data-driven benchmark / data-study pages → /benchmarks/{slug}.
// These are "content moat" pages: citable data compilations that earn links and
// get lifted by AI search engines. Add an entry → a new page builds + appears in
// the /benchmarks hub, sitemap, and llms-full.txt.
//
// HONESTY RULE: every range below without a linked source is a Keres AI
// working assumption, not measured data, and each page shows the reasoning in
// `method`. Never invent precise statistics or attribute them to sources that
// do not exist; only the lead-response studies in `sources` are published research.
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
  /** Primary sources for the figures that have one. Ranges without a source are labelled estimates. */
  sources?: { label: string; url: string }[];
  /** The reasoning behind each Keres AI working assumption on the page, one item per figure. */
  method: { figure: string; reasoning: string }[];
}

export const benchmarks: Benchmark[] = [
  {
    slug: 'hvac-answering',
    category: 'HVAC',
    pillar: 'inbound',
    eyebrow: 'HVAC · Estimates',
    title: 'HVAC Call Answering Benchmarks (2026) | Keres AI',
    description:
      'How many HVAC calls go unanswered, what share arrive after hours, and what a missed no-cool call costs. Citable HVAC answering benchmarks for 2026.',
    h1: 'HVAC call answering',
    h1Accent: 'benchmarks',
    lead: 'How many HVAC calls go unanswered, how much demand arrives after hours, and what a missed no-cool emergency really costs — the answering numbers every contractor should track.',
    datePublished: '2026-09-05',
    answer:
      '<strong>Keres AI estimates that HVAC companies miss 30–45% of inbound calls during peak season</strong>, and that 35–50% of demand arrives after hours, when most offices are closed. Because a no-cool or no-heat call is urgent, Keres AI assumes most callers who reach voicemail dial a competitor, which makes peak-season answer rate one of the highest-leverage numbers in the business. Both ranges are Keres AI working assumptions; the reasoning is below.',
    stats: [
      { num: '30–45%', stat: 'of HVAC calls go unanswered during peak season', context: 'Heat waves and cold snaps drive call volume far beyond what a normal front desk can pick up, so a large share of calls hit voicemail exactly when demand is highest.' },
      { num: '35–50%', stat: 'of HVAC demand arrives after hours', context: 'No-cool and no-heat failures do not respect business hours — a large share of calls come evenings, nights, and weekends when offices are closed.' },
      { num: '$300–$600', stat: 'typical value of a single HVAC service call', context: 'Even a routine repair is worth hundreds of dollars; a missed call is a missed ticket, and replacement jobs run into five figures.' },
      { num: '2 rings', stat: 'how fast Remi by Keres AI answers (a product spec, not a benchmark)', context: 'This is how Keres AI’s receptionist works, not an industry measurement. When the house is at 90°F, callers will not wait on hold, so the business that picks up first usually books the job.' },
    ],
    method: [
      { figure: '30–45% of peak-season calls unanswered', reasoning: 'A typical HVAC office staffs its phones for an average week. When a heat wave or a cold snap multiplies call volume, the same one or two people cannot pick up every call, and calls stack up while they are on the line or out on a job. Keres AI assumes 30–45% of peak-season calls go unanswered for a shop with no overflow or after-hours coverage.' },
      { figure: '35–50% of demand after hours', reasoning: 'An office open about 50 of the week’s 168 hours leaves the other 118 uncovered, and furnaces and air conditioners fail at any hour. Keres AI assumes 35–50% of HVAC demand arrives outside office hours, a little above its 30–45% working range for service businesses in general, because weather-driven failures do not stop at 5 p.m.' },
      { figure: '$300–$600 per service call', reasoning: 'A diagnostic visit plus a common repair usually lands in the low hundreds of dollars, before any replacement. Keres AI uses $300–$600 as a working range; use your own average ticket in the calculator.' },
    ],
    sections: [
      { h2: 'Why do HVAC companies lose the most calls in peak season?', body: '<p>HVAC demand is spiky by nature: a heat wave or a cold snap can multiply call volume overnight. The same front desk that comfortably answers a slow week is overwhelmed the moment temperatures break, so the missed-call rate climbs exactly when each call is worth the most. The result is a peak-season paradox — your busiest, most profitable days are also when you lose the most leads to voicemail.</p>' },
      { h2: 'How big is the after-hours gap?', body: '<p>A no-cool call at 8 p.m. in July is an emergency to the homeowner, and they will keep dialing until someone answers. With an estimated 35–50% of HVAC demand arriving outside business hours, after-hours coverage is not a nice-to-have — it is where a large share of bookable revenue lives. See <a href="/glossary/after-hours-answering">after-hours answering</a> and <a href="/glossary/emergency-dispatch">emergency dispatch</a> for how this works in practice.</p>' },
      { h2: 'What does the math look like?', body: '<p>Take a contractor handling 400 calls in a peak month at a 65% answer rate. That is roughly 140 missed calls; at a 25% close rate (a Keres AI assumption, not a measured figure) and a $450 average ticket, the missed-call gap is over $15,000 in a single month — before counting the replacement jobs that hide inside those calls. Run your own figures with the <a href="/tools/missed-call-calculator">missed-call calculator</a>.</p>' },
      { h2: 'How do you close the gap?', body: '<p>You cannot hire your way to two-ring pickup at midnight during a heat wave. An <a href="/ai-receptionist-for-hvac">AI receptionist for HVAC</a> answers in two rings, 24/7, books the service visit, and dispatches no-cool and no-heat emergencies to your on-call tech instantly — closing both the peak-season and after-hours gaps at once.</p>' },
    ],
    faqs: [
      { q: 'What percentage of HVAC calls go unanswered?', a: 'Keres AI estimates peak-season missed calls for HVAC companies at 30–45%, climbing higher after hours. Because no-cool and no-heat calls are urgent, most callers who reach voicemail call a competitor instead of waiting.' },
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
    eyebrow: 'Roofing · Estimates',
    title: 'Roofing Lead-Response Benchmarks (2026) | Keres AI',
    description:
      'How fast roofers must respond after a storm, why the first inspector wins the claim, and what a missed storm lead costs. Roofing lead-response benchmarks for 2026.',
    h1: 'Roofing lead-response',
    h1Accent: 'benchmarks',
    lead: 'How fast roofing companies must respond after a storm, why the first inspector usually wins the insurance claim, and what a missed storm-season lead really costs.',
    datePublished: '2026-09-05',
    answer:
      '<strong>Keres AI’s view of roofing lead response: the first company to respond and inspect typically wins the insurance claim</strong> — lead-response research consistently finds that speed decides who wins the job. Because hail and wind events generate huge call surges in a few hours, a roofer whose phone goes to voicemail during a storm hands five-figure jobs directly to faster competitors. In the Lead Response Management study (15,000 web leads across six companies), the odds of qualifying a lead were 21 times higher when it was contacted within five minutes than at 30 minutes; a 2011 Harvard Business Review analysis found firms that responded within an hour were nearly seven times as likely to qualify the lead.',
    stats: [
      { num: 'First', stat: 'responder usually wins the storm claim', context: 'The published lead-response studies found that fast contact sharply raises the odds of qualifying a lead. Keres AI assumes that in a post-storm rush, the first roofer to inspect usually signs the contract.' },
      { num: '5 min', stat: 'response window that dramatically lifts qualification odds', context: 'Studies of lead response time find that contacting a lead within five minutes makes it many times more likely to convert than waiting even 30 minutes.' },
      { num: '100s', stat: 'of calls a single storm can trigger in hours', context: 'A hailstorm can damage thousands of roofs in minutes, generating a call surge no normal front desk can absorb.' },
      { num: '$10k+', stat: 'typical value of a roof replacement job', context: 'A single missed storm lead can be a five-figure replacement or insurance job handed to a competitor.' },
    ],
    sections: [
      { h2: 'Why does the first responder win the claim?', body: '<p>After a storm, homeowners are anxious and ready to act. The first roofer to answer, inspect, and explain the insurance process earns the trust — and usually the signature. Every hour of delay is a chance for a competitor to get on the roof first. In roofing, "lead response time" is not a marketing metric; it is the difference between a booked claim and a lost one. See <a href="/glossary/lead-response-time">why speed to lead wins</a>. The <a href="/tools/lead-response-time-calculator">lead response time calculator</a> shows what each hour of delay costs.</p>' },
      { h2: 'Why is a storm surge so hard to answer?', body: '<p>The cruel irony of roofing is that demand arrives all at once. A hailstorm can damage thousands of roofs in minutes, and the calls land in the same few hours. A front desk that handles a normal day fine will send dozens of storm callers to voicemail — and those are exactly the high-value insurance leads. Capturing a surge means planning for it before the season: know how your answering covers your peak volume, and make sure every caller you miss gets a text back within a minute.</p>' },
      { h2: 'What does a missed storm lead cost?', body: '<p>With roof replacements routinely worth $10,000 or more, the math is stark: missing even a handful of storm calls can cost six figures across a season. Estimate the impact for your call volume with the <a href="/tools/missed-call-calculator">missed-call calculator</a>.</p>' },
      { h2: 'How do you close the gap?', body: '<p>An <a href="/ai-receptionist-for-roofing">AI receptionist for roofing</a> answers in two rings, 24/7, qualifies the damage, and books inspections on your estimators’ calendars — so a surge becomes a full schedule instead of a full voicemail box.</p>' },
    ],
    faqs: [
      { q: 'How fast should a roofing company respond to a storm lead?', a: 'As close to immediately as possible. Studies of lead response time show that responding within five minutes dramatically raises conversion, and in roofing the first company to inspect usually wins the insurance claim.' },
      { q: 'Why do roofers lose leads after a storm?', a: 'Hail and wind events generate huge call surges in a few hours. A normal front desk cannot answer them all, so high-value insurance leads go to voicemail — and most callers simply dial the next roofer.' },
      { q: 'What does a missed roofing lead cost?', a: 'Roof replacement jobs are routinely worth $10,000 or more, so missing even a few storm calls can cost six figures across a season. Use the <a href="/tools/missed-call-calculator">missed-call calculator</a> to estimate your own exposure.' },
    ],
    sources: [
      { label: 'Oldroyd, McElheran & Elkington, “The Short Life of Online Sales Leads,” Harvard Business Review (2011)', url: 'https://scholarsarchive.byu.edu/facpub/9711' },
      { label: 'Oldroyd & InsideSales.com, Lead Response Management Study (15,000 leads, six companies)', url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf' },
    ],
    method: [
      { figure: 'First responder usually wins', reasoning: 'This follows from the two published lead-response studies cited below, which found that fast contact sharply raises the odds of qualifying a lead. Keres AI applies that finding to storm leads; it has not measured roofing win rates itself.' },
      { figure: '100s of calls after a single storm', reasoning: 'A hail or wind event damages many roofs in the same area at the same time, so the calls arrive in the same few hours. Keres AI uses “hundreds” as an order of magnitude for a busy local roofer, not a measured count.' },
      { figure: '$10,000+ per replacement', reasoning: 'A full tear-off and replacement on a single-family home involves many squares of material and several days of crew time. Keres AI uses $10,000 or more as a working figure; your own average job value belongs in the calculator.' },
    ],
    related: [
      { label: 'AI receptionist for roofing', href: '/ai-receptionist-for-roofing' },
      { label: 'Lead response time', href: '/glossary/lead-response-time' },
      { label: 'Missed-call calculator', href: '/tools/missed-call-calculator' },
    ],
  },
  {
    slug: 'dental-no-show',
    category: 'Dental',
    pillar: 'inbound',
    eyebrow: 'Dental · Estimates',
    title: 'Dental No-Show & Booking Benchmarks (2026) | Keres AI',
    description:
      'Typical dental no-show rates, what each no-show costs, and how missed and after-hours calls drive lost patients. Dental booking benchmarks for 2026.',
    h1: 'Dental no-show',
    h1Accent: 'benchmarks',
    lead: 'Typical dental no-show rates, what each empty chair costs, and how missed reschedule and new-patient calls quietly drain a practice — the booking numbers every front office should track.',
    datePublished: '2026-09-05',
    answer:
      '<strong>Keres AI estimates that dental practices see no-show rates of 10–20%</strong>, and each empty chair can cost $200 or more in lost production. Many no-shows trace back to missed reschedule calls and a front desk too busy to confirm appointments — while new patients who reach voicemail simply book with another practice.',
    stats: [
      { num: '10–20%', stat: 'typical dental no-show rate', context: 'Keres AI estimate: missed appointments run from one in ten to one in five, a direct hit to daily production when chairs sit empty.' },
      { num: '$200+', stat: 'estimated cost of a single no-show', context: 'An empty chair is lost production that is hard to recover same-day; across a month, no-shows add up to thousands in missed revenue.' },
      { num: '30%+', stat: 'of calls a busy front desk can miss', context: 'When staff are with patients, new-patient and reschedule calls go to voicemail — and new patients book elsewhere.' },
      { num: '24/7', stat: 'when patients actually research and book', context: 'Many patients call to book or reschedule outside office hours; without coverage, those bookings are lost.' },
    ],
    sections: [
      { h2: 'Do no-shows start with a missed call?', body: '<p>A large share of no-shows are not patients who forgot — they are patients who tried to reschedule, could not reach the front desk, and gave up. When the office line goes to voicemail during a busy clinical day, the reschedule never happens and the chair sits empty. Capturing and rebooking those calls is one of the most direct ways to cut no-shows. See <a href="/glossary/no-show-rate">what a no-show rate is</a>.</p>' },
      { h2: 'Where do new patients leak out?', body: '<p>New patients are the highest-value calls a practice receives, and they are also the least patient. A prospective patient who reaches voicemail rarely leaves a message — they call the next practice. With a busy front desk missing an estimated 30% or more of calls at peak times, the new-patient leak is often invisible on the schedule but very real on the P&L.</p>' },
      { h2: 'Why does after-hours booking matter?', body: '<p>Plenty of patients only have time to call about an appointment in the evening or on a weekend. Without after-hours coverage, those bookings never land. An always-on front desk turns that lost demand into filled chairs.</p>' },
      { h2: 'How do you close the gap?', body: '<p>An <a href="/industries/dental-med-spa">AI receptionist for dental practices</a> answers every call, books and reschedules on your practice calendar, confirms appointments to cut no-shows, and handles new-patient intake 24/7 — so a busy clinical day never costs you patients.</p>' },
    ],
    faqs: [
      { q: 'What is a typical dental no-show rate?', a: 'Keres AI estimates dental no-show rates at 10–20%. Each missed appointment can cost $200 or more in lost production, and many no-shows trace back to reschedule calls the front desk could not answer.' },
      { q: 'How do missed calls cause dental no-shows?', a: 'When patients cannot reach the office to reschedule, the appointment simply lapses and the chair sits empty. Capturing and rebooking those calls — including after hours — is one of the most direct ways to reduce no-shows.' },
      { q: 'How can a dental practice reduce no-shows?', a: 'Answer and rebook every reschedule call, confirm appointments proactively, and cover after-hours demand. An <a href="/industries/dental-med-spa">AI receptionist</a> does all three automatically, 24/7.' },
    ],
    method: [
      { figure: '10–20% no-show rate', reasoning: 'Keres AI assumes one in ten to one in five booked appointments goes unfilled without a confirmation and reminder process. This is a working assumption, not a measured rate; most practice-management systems report your own no-show rate, and that is the number to use.' },
      { figure: '$200+ per no-show', reasoning: 'An empty chair loses the production of the visit that was booked. Keres AI uses $200 or more as roughly the value of a routine hygiene or basic restorative appointment; specialty and cosmetic visits are worth more.' },
      { figure: '30%+ of calls missed at a busy front desk', reasoning: 'A front desk that is checking patients in and out cannot always pick up, and calls stack up at the busiest hours. Keres AI assumes 30% or more of calls can go unanswered at peak times; your phone system’s call log shows your real figure.' },
    ],
    related: [
      { label: 'AI receptionist for dental practices', href: '/industries/dental-med-spa' },
      { label: 'No-show rate', href: '/glossary/no-show-rate' },
      { label: 'Patient intake', href: '/glossary/patient-intake' },
    ],
  },
  {
    slug: 'legal-intake-conversion',
    category: 'Legal',
    pillar: 'inbound',
    eyebrow: 'Legal · Estimates',
    title: 'Legal Intake Conversion Benchmarks (2026) | Keres AI',
    description:
      'How fast law firms must respond to new-client calls, how many high-value leads are lost to slow intake, and what each missed case is worth. Legal intake benchmarks for 2026.',
    h1: 'Legal intake conversion',
    h1Accent: 'benchmarks',
    lead: 'How fast law firms must respond to new-client inquiries, how many high-value leads are lost to slow or missed intake, and what each lost case is really worth.',
    datePublished: '2026-09-05',
    answer:
      '<strong>Keres AI’s view of legal intake: the firm that responds first usually wins the client</strong> — and a single missed new-client call can represent thousands of dollars in lost case value. Because high-intent legal inquiries often arrive after hours and callers rarely leave voicemails, intake speed and coverage are among the biggest levers on a firm’s growth. In the Lead Response Management study (15,000 web leads across six companies), the odds of qualifying a lead were 21 times higher when it was contacted within five minutes than at 30 minutes; a 2011 Harvard Business Review analysis found firms that responded within an hour were nearly seven times as likely to qualify the lead.',
    stats: [
      { num: 'First', stat: 'responder usually signs the client', context: 'Prospective clients in distress hire the first firm that answers and reassures them; delay hands the case to a competitor.' },
      { num: '5 min', stat: 'response window that lifts intake conversion', context: 'Lead-response research consistently finds that contacting a lead within five minutes vastly outperforms a delayed callback.' },
      { num: '$1k–$10k+', stat: 'typical value of a single new case', context: 'A missed new-client call is not a small loss — it can be thousands of dollars in case value handed to another firm.' },
      { num: 'After hrs', stat: 'when many high-intent legal calls arrive', context: 'Accidents, arrests, and emergencies do not happen 9-to-5; a large share of valuable inquiries come outside office hours.' },
    ],
    sections: [
      { h2: 'Why does speed decide the case?', body: '<p>A prospective client calling a law firm is usually anxious and ready to act now. The firm that answers live, listens, and books the consultation earns the trust — and the retainer. A call that goes to voicemail or an after-hours dead line is, in most cases, a lost client who calls the next firm on the list. See <a href="/glossary/legal-intake">what legal intake is</a> and <a href="/glossary/lead-response-time">why speed to lead wins</a>.</p>' },
      { h2: 'Why is after hours a problem for law firms?', body: '<p>Many of the highest-value legal matters originate from events that happen outside business hours — accidents, arrests, family emergencies. If those calls reach a voicemail box, the firm never even knows the lead existed. Always-on intake captures demand that most firms silently lose.</p>' },
      { h2: 'How does qualified intake protect attorney time?', body: '<p>Speed is only half the equation. Good intake also collects conflict-check details and qualifies the matter so attorneys spend time only on real opportunities. Automating the first-contact intake — capturing details, collecting conflict-check names, and booking the consultation — both raises conversion and protects billable hours. Estimate the value for your firm with the <a href="/tools/legal-intake-roi-calculator">legal intake ROI calculator</a>.</p>' },
      { h2: 'How do you close the gap?', body: '<p>An <a href="/industries/law-firms">AI receptionist for legal intake</a> answers every new-client call 24/7, collects conflict-check details, qualifies the matter, and books the consultation — so a firm captures high-value leads the moment they call, day or night.</p>' },
    ],
    faqs: [
      { q: 'How fast should a law firm respond to a new-client call?', a: 'As fast as possible — ideally live, on the first call. Lead-response research shows responding within five minutes dramatically outperforms a delayed callback, and in legal intake the first firm to respond usually signs the client.' },
      { q: 'Why do law firms lose new clients?', a: 'High-value legal inquiries often arrive after hours and callers rarely leave voicemails. When the call is not answered live, the prospective client simply calls the next firm — so the lead is lost without the firm ever knowing.' },
      { q: 'How can a firm improve intake conversion?', a: 'Answer every inquiry live, screen and qualify the matter, and book the consultation — around the clock. An <a href="/industries/law-firms">AI receptionist for legal intake</a> handles all of this 24/7, including collecting the names your firm needs for its conflict check.' },
    ],
    sources: [
      { label: 'Oldroyd, McElheran & Elkington, “The Short Life of Online Sales Leads,” Harvard Business Review (2011)', url: 'https://scholarsarchive.byu.edu/facpub/9711' },
      { label: 'Oldroyd & InsideSales.com, Lead Response Management Study (15,000 leads, six companies)', url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf' },
    ],
    method: [
      { figure: 'First responder usually signs the client', reasoning: 'This follows from the two published lead-response studies cited below. Keres AI applies their finding to legal intake; it has not measured law-firm sign-up rates itself.' },
      { figure: '$1,000–$10,000+ per new case', reasoning: 'Fees vary widely by practice area, from flat-fee matters worth a few thousand dollars to contingency cases worth far more. Keres AI uses $1,000 to $10,000 or more as a working range; use your firm’s own average fee.' },
      { figure: 'Many high-intent calls after hours', reasoning: 'Accidents, arrests and family emergencies happen at any hour, while most firms answer phones about 50 of the week’s 168 hours. Keres AI treats after-hours intake as a large share of demand without putting a precise figure on it.' },
    ],
    related: [
      { label: 'AI receptionist for legal intake', href: '/industries/law-firms' },
      { label: 'Legal intake', href: '/glossary/legal-intake' },
      { label: 'Lead response time', href: '/glossary/lead-response-time' },
    ],
  },
];
