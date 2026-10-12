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
  /** Worked example using the default inputs, written out as sentences (HTML allowed). */
  example?: string;
  /** The formula in words (HTML allowed). */
  formula?: string;
  /** Every assumption the result rests on; no source means it is labelled a Keres AI assumption. */
  assumptions?: { text: string; source?: { label: string; url: string } }[];
  /** What to do with the number (HTML allowed; may start with <p>, <ol> or <ul>). */
  nextSteps?: string;
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

export const calculators: Calculator[] = [
  {
    slug: 'hvac-missed-call-calculator',
    kind: 'missed-call',
    closeRate: 0.25,
    eyebrow: 'HVAC · Free tool',
    title: 'HVAC Missed-Call Calculator | Keres AI',
    description:
      'Free HVAC missed-call calculator: enter monthly calls, answer rate and average ticket to see the service revenue lost to unanswered calls.',
    h1: 'What are missed HVAC calls',
    h1Accent: 'costing you?',
    lead: 'Peak-season and after-hours calls are where HVAC companies lose the most. Plug in your numbers to see the monthly and annual revenue slipping away to voicemail.',
    answer:
      '<strong>HVAC missed-call loss</strong> = monthly calls × missed-call rate × close rate × average ticket. With the default inputs (400 calls a month, a 65% answer rate, a 25% close rate and a $450 average ticket), the estimate is <strong>$15,750 a month</strong>. The defaults and the close rate are Keres AI assumptions; replace them with your own phone report and job data.',
    fields: [
      { id: 'leads', label: 'Monthly calls', default: 400, min: 0 },
      { id: 'answer', label: 'Answer rate %', default: 65, min: 0, max: 100 },
      { id: 'value', label: 'Avg ticket value', default: 450, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'Close rate (25%) is a Keres AI assumption, not a measured industry figure. To use your own close rate, multiply the result by (your close rate ÷ 25%).',
    example:
      'An HVAC company that gets 400 calls a month and answers 65% of them misses 140 calls (400 × 35%). If 25% of those callers would have booked, that is 35 lost jobs, and at a $450 average ticket the calculator shows <strong>$15,750 a month</strong>. The yearly line, <strong>$189,000</strong>, assumes every month looks like this one.',
    formula:
      'Missed calls = monthly calls × (100% − answer rate). Lost jobs = missed calls × close rate. Lost revenue per month = lost jobs × average ticket. The yearly figure is the monthly figure × 12.',
    assumptions: [
      { text: 'A 25% close rate on calls that would have been answered. It is fixed in this calculator; scale the result by (your close rate ÷ 25%) to use your own.' },
      { text: 'The default inputs (400 calls, 65% answer rate, $450 ticket) are example values, not industry averages.' },
      { text: 'Every missed caller is counted as lost. Some call back or leave a voicemail you return, so treat the result as an upper estimate.' },
      { text: 'Yearly = monthly × 12. HVAC demand is seasonal, so run the calculator once for a peak month and once for a slow month.' },
    ],
    nextSteps:
      '<ul> <li><strong>Check the answer rate.</strong> Pull answered and missed calls from your phone system for the same month, split into business hours and after hours.</li> <li><strong>Find where the gap is.</strong> Daytime misses point to overflow coverage; evening and weekend misses point to after-hours coverage.</li> <li><strong>Compare the loss with the cost of closing it.</strong> Set the monthly figure against the cost of an answering option. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</li> </ul>',
    faqs: [
      { q: 'How do I find my real answer rate?', a: 'Most business phone systems and carriers report answered and missed calls. Divide answered calls by total inbound calls for the same period, and check business hours and after hours separately, because the gaps usually differ.' },
      { q: 'Is the 25% close rate right for my HVAC business?', a: 'It is a Keres AI assumption that keeps the example simple, not an industry statistic. If you track how many answered calls become booked jobs, use that rate instead: multiply the result by your close rate divided by 25%.' },
      { q: 'How can an HVAC company stop missing calls?', a: 'Cover the hours and peaks when calls go unanswered: overflow forwarding during busy periods and an answering option after hours. Keres AI’s <a href="/ai-receptionist-for-hvac">AI receptionist for HVAC</a> answers in two rings, 24/7, asks your intake questions and books into ServiceTitan, Google Calendar or HubSpot.' },
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
    title: 'Roofing Storm-Lead Calculator | Keres AI',
    description:
      'Free roofing storm-lead calculator: enter storm-season calls, answer rate and job value to see the revenue lost when surge calls go unanswered.',
    h1: 'What are missed storm leads',
    h1Accent: 'costing you?',
    lead: 'A hailstorm can generate a season of calls in hours — and the first roofer to answer usually wins the claim. See what an unanswered surge costs you.',
    answer:
      '<strong>Roofing storm-lead loss</strong> = storm-season calls × missed-call rate × close rate × average job value. With the default inputs (300 calls in a storm month, a 60% answer rate, a 30% close rate and a $9,000 average job), the estimate is <strong>$324,000 for that month</strong>. The defaults and close rate are Keres AI assumptions; use your own numbers.',
    fields: [
      { id: 'leads', label: 'Storm-season calls / mo', default: 300, min: 0 },
      { id: 'answer', label: 'Answer rate %', default: 60, min: 0, max: 100 },
      { id: 'value', label: 'Avg job value', default: 9000, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ yr if every month were a storm month',
    note: 'Close rate (30%) is a Keres AI assumption for answered storm leads that become signed jobs. The second figure multiplies by 12; multiply the monthly result by your actual number of storm months instead.',
    example:
      'A roofer that gets 300 calls in a storm month and answers 60% of them misses 120 calls (300 × 40%). If 30% of those callers would have signed, that is 36 lost jobs, and at a $9,000 average job the calculator shows <strong>$324,000 for the month</strong>. Storm seasons are rarely twelve months long: with three storm months like this one, the season figure would be about <strong>$972,000</strong>, not the ×12 line.',
    formula:
      'Missed calls = storm-month calls × (100% − answer rate). Lost jobs = missed calls × close rate. Lost revenue for the month = lost jobs × average job value. Multiply by the number of storm months you actually have for a season figure.',
    assumptions: [
      { text: 'A 30% close rate from answered storm call to signed job. It is fixed in this calculator; scale the result by (your close rate ÷ 30%) to use your own.' },
      { text: 'The default inputs (300 calls, 60% answer rate, $9,000 job) are example values, not industry averages. A repair-heavy business should enter a much lower job value.' },
      { text: 'Every missed caller is counted as lost. Some call back, so treat the result as an upper estimate.' },
      { text: 'The calculator’s second line multiplies by 12. Use your own number of storm months instead.' },
    ],
    nextSteps:
      '<ul> <li><strong>Use your busiest month.</strong> Enter calls from your last storm surge, not your yearly average, because surges are when calls are missed.</li> <li><strong>Plan surge coverage before the season.</strong> Decide who answers when every line is busy, and how inspections get booked on the call.</li> <li><strong>Compare the loss with the cost of coverage.</strong> See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</li> </ul>',
    faqs: [
      { q: 'How do I estimate storm-season call volume?', a: 'Use your call log from the last storm season and enter the busiest month rather than the average, because a surge is when calls are missed. If you are new to an area, start with a conservative number and update it after the first event.' },
      { q: 'Why shouldn’t I use the yearly figure for roofing?', a: 'The calculator multiplies the monthly result by 12, but storm demand is concentrated in a few months. Multiply the monthly figure by the number of storm months you actually have.' },
      { q: 'How can roofers capture more storm leads?', a: 'Make sure every call during a surge is answered and the inspection is booked on the call. Keres AI’s <a href="/ai-receptionist-for-roofing">AI receptionist for roofing</a> answers in two rings, 24/7, asks your intake questions about the damage, and texts back calls it couldn’t take within 60 seconds.' },
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
    title: 'Dental No-Show Calculator | Keres AI',
    description:
      'Free dental no-show calculator. Enter your monthly appointments, no-show rate, and average production per visit to see the revenue empty chairs cost you.',
    h1: 'What are no-shows',
    h1Accent: 'costing your practice?',
    lead: 'Empty chairs are lost production you rarely recover same-day. See what your no-show rate costs every month — and every year.',
    answer:
      '<strong>Dental no-show loss</strong> = monthly appointments × no-show rate × average production per visit. With the default inputs (400 appointments a month, a 15% no-show rate and $250 average production), the estimate is <strong>$15,000 a month</strong>. The defaults are Keres AI example values; enter your own from your practice-management system.',
    fields: [
      { id: 'appts', label: 'Appointments / mo', default: 400, min: 0 },
      { id: 'noshow', label: 'No-show rate %', default: 15, min: 0, max: 100 },
      { id: 'value', label: 'Avg production / visit', default: 250, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'The 15% no-show rate and $250 production per visit are Keres AI example values, not industry statistics. Replace them with figures from your practice-management system.',
    example:
      'A practice with 400 appointments a month and a 15% no-show rate has 60 no-shows (400 × 15%). At $250 average production per visit, the calculator shows <strong>$15,000 a month</strong> in lost production, or <strong>$180,000 a year</strong> if the rate holds every month.',
    formula:
      'No-shows = monthly appointments × no-show rate. Lost production per month = no-shows × average production per visit. The yearly figure is the monthly figure × 12.',
    assumptions: [
      { text: 'The default inputs (400 appointments, 15% no-show rate, $250 production) are example values, not industry averages.' },
      { text: 'Every no-show is counted as fully lost production. Slots refilled the same day reduce the real loss, so treat the result as an upper estimate.' },
      { text: 'Yearly = monthly × 12, assuming a steady appointment volume.' },
    ],
    nextSteps:
      '<ul> <li><strong>Measure your actual rate.</strong> Divide no-shows by scheduled appointments for the last three months, and look at which appointment types and times miss most.</li> <li><strong>Confirm and remind.</strong> Confirm each appointment when it is booked and send reminders that make rescheduling easy. See <a href="/glossary/appointment-reminders">appointment reminders</a>.</li> <li><strong>Answer the reschedule calls.</strong> A patient who can’t reach the office to move an appointment often just doesn’t come. See <a href="/pricing">Keres AI pricing</a>.</li> </ul>',
    faqs: [
      { q: 'How do I calculate my dental no-show rate?', a: 'Divide missed appointments (no-shows without notice) by scheduled appointments for the same period. Count late cancellations separately if your practice treats them differently.' },
      { q: 'Does the calculator include same-day cancellations?', a: 'Only if you count them in the no-show rate you enter. If you refill some cancelled slots the same day, the real loss is lower than the calculator shows.' },
      { q: 'How can a dental practice reduce no-shows?', a: 'Confirm each appointment when it is booked, send reminders that make rescheduling easy, and answer reschedule calls so a change doesn’t become a no-show. Keres AI’s <a href="/agents/follow-up">Theo</a> sends confirmations and text and voice reminders, and offers cancelled slots to your waitlist.' },
    ],
    related: [
      { label: 'AI receptionist for dental practices', href: '/industries/dental-med-spa' },
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
      '<strong>Legal intake loss</strong> = monthly new-client calls × missed-call rate × signed-client rate × average case value. With the default inputs (80 new-client calls a month, a 55% answer rate, a 20% signed-client rate and a $3,500 average case value), the estimate is <strong>$25,200 a month</strong>. The defaults and signed-client rate are Keres AI assumptions; use your own intake data.',
    fields: [
      { id: 'leads', label: 'New-client calls / mo', default: 80, min: 0 },
      { id: 'answer', label: 'Answer rate %', default: 55, min: 0, max: 100 },
      { id: 'value', label: 'Avg case value', default: 3500, min: 0, prefix: '$' },
    ],
    resultLabel: "You're losing",
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'Signed-client rate (20%) is a Keres AI assumption, not a measured industry figure. To use your own rate, multiply the result by (your signed-client rate ÷ 20%).',
    example:
      'A firm that gets 80 new-client calls a month and answers 55% of them misses 36 calls (80 × 45%). If 20% of those callers would have signed, that is 7.2 clients (the calculator shows 7), and at a $3,500 average case value it shows <strong>$25,200 a month</strong>, or <strong>$302,400 a year</strong> if every month looks the same.',
    formula:
      'Missed calls = new-client calls × (100% − answer rate). Lost clients = missed calls × signed-client rate. Lost fees per month = lost clients × average case value. The yearly figure is the monthly figure × 12.',
    assumptions: [
      { text: 'A 20% signed-client rate on inquiries that would have been answered. It is fixed in this calculator; scale the result by (your rate ÷ 20%) to use your own.' },
      { text: 'Average case value means the fees your firm collects per signed matter, not the settlement or verdict amount.' },
      { text: 'The default inputs (80 calls, 55% answer rate, $3,500 case value) are example values, not industry averages.' },
      { text: 'Every missed caller is counted as lost. Some call back or leave a voicemail you return, so treat the result as an upper estimate.' },
    ],
    nextSteps:
      '<ul> <li><strong>Count only prospective clients.</strong> Separate new-client calls from existing clients, courts and vendors in your intake log.</li> <li><strong>Check when the misses happen.</strong> If they cluster after hours or during court time, that is the coverage to add first.</li> <li><strong>Compare the loss with the cost of coverage.</strong> See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</li> </ul>',
    faqs: [
      { q: 'What should I enter as average case value?', a: 'Use the average fee your firm collects per signed matter of this type, not the settlement or verdict amount. If you handle several practice areas, run the calculator once per area.' },
      { q: 'How do I count new-client calls?', a: 'Count only calls from prospective clients, not existing clients, courts or vendors. Your intake log, or a tracking number per marketing channel, gives the cleanest count.' },
      { q: 'How can a law firm stop missing new-client calls?', a: 'Answer every inquiry live, including after hours, and book the consultation on the call. Keres AI’s <a href="/industries/law-firms">AI receptionist for law firms</a> answers in two rings, 24/7, asks your intake questions, and escalates to a person by your rules.' },
    ],
    related: [
      { label: 'AI receptionist for legal intake', href: '/industries/law-firms' },
      { label: 'Legal intake conversion benchmarks', href: '/benchmarks/legal-intake-conversion' },
      { label: 'Legal intake', href: '/glossary/legal-intake' },
    ],
  },
  {
    slug: 'lead-response-time-calculator',
    kind: 'response-time',
    closeRate: 0.25,
    eyebrow: 'All industries · Free tool',
    title: 'Lead Response Time Calculator | Keres AI',
    description:
      'Free lead response time calculator. See how much revenue you can recover by responding to inbound leads in under five minutes instead of hours.',
    h1: 'What is slow response',
    h1Accent: 'costing you?',
    lead: 'Speed to lead decides the job. See the estimated revenue you can recover by responding to every inbound lead in under five minutes.',
    answer:
      '<strong>Speed to lead</strong> matters: in the Lead Response Management study (15,000 web leads across six companies), the odds of qualifying a lead were 21 times higher when it was contacted within five minutes than at 30 minutes. With the default inputs (200 leads a month, a $700 average deal and a 30-minute response), this calculator estimates <strong>$22,750 a month</strong> recoverable. Its conversion steps are Keres AI assumptions.',
    fields: [
      { id: 'leads', label: 'Monthly leads', default: 200, min: 0 },
      { id: 'value', label: 'Avg deal value', default: 700, min: 0, prefix: '$' },
      { id: 'current', label: 'Current avg response (min)', default: 30, min: 0 },
    ],
    resultLabel: 'You can recover',
    perLabel: '/mo',
    secondaryLabel: '/ year',
    note: 'Illustrative model: relative conversion vs. a sub-5-minute response is stepped (≤5 min = 100%, ≤10 = 60%, ≤30 = 35%, ≤60 = 20%, >60 = 10%) against a 25% base close rate. The steps and the base rate are Keres AI assumptions. Treat the result as directional, not exact.',
    example:
      'A business that gets 200 leads a month, closes 25% of them when it responds within five minutes, and averages $700 a deal could close 50 deals worth $35,000. Responding in about 30 minutes, the calculator applies a 35% relative-conversion factor, so it captures about $12,250 now and shows <strong>$22,750 a month</strong> recoverable, or <strong>$273,000 a year</strong>.',
    formula:
      'Potential revenue = monthly leads × 25% base close rate × average deal value. Current capture = potential revenue × the relative-conversion factor for your response time. Recoverable revenue = potential revenue − current capture. The yearly figure is the monthly figure × 12.',
    assumptions: [
      { text: 'Faster response raises the odds of qualifying a lead: contacted within five minutes, the odds were 21 times higher than at 30 minutes in this study.', source: { label: 'Oldroyd & InsideSales.com, Lead Response Management Study (15,000 leads, six companies)', url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf' } },
      { text: 'Firms that tried to contact a lead within an hour were nearly seven times as likely to qualify it as firms that tried an hour later.', source: { label: 'Oldroyd, McElheran & Elkington, “The Short Life of Online Sales Leads,” Harvard Business Review (2011)', url: 'https://scholarsarchive.byu.edu/facpub/9711' } },
      { text: 'The relative-conversion steps (≤5 min = 100%, ≤10 = 60%, ≤30 = 35%, ≤60 = 20%, over 60 = 10%) are a simplified curve that follows the direction of that research. They are not values taken from it.' },
      { text: 'A 25% base close rate for leads answered within five minutes, and the default inputs (200 leads, $700 deal, 30 minutes), are example values.' },
    ],
    nextSteps:
      '<ul> <li><strong>Measure your real response time.</strong> For calls, a missed call’s response time is however long the callback takes. For web forms, compare the form timestamp with your first reply.</li> <li><strong>Fix the slowest channel first.</strong> After-hours calls and weekend forms usually wait longest.</li> <li><strong>Compare the gap with the cost of closing it.</strong> See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</li> </ul>',
    faqs: [
      { q: 'Why does lead response time matter?', a: 'In the Lead Response Management study of 15,000 web leads, the odds of qualifying a lead were 21 times higher when it was contacted within five minutes than at 30 minutes. See <a href="/glossary/lead-response-time">lead response time</a>.' },
      { q: 'How is the recoverable revenue calculated?', a: 'The calculator takes the deals you would close responding within five minutes (leads × 25% × deal value), applies a stepped factor for your current response time, and subtracts what you capture now. The steps and the 25% base are Keres AI assumptions, so treat the result as directional.' },
      { q: 'How do I measure my current lead response time?', a: 'For calls, it is the time until a person or system answers; for a missed call, it is how long the callback takes. For web forms, compare the form timestamp with your first reply, and use the average over a normal month.' },
    ],
    related: [
      { label: 'Lead response time', href: '/glossary/lead-response-time' },
      { label: 'Missed-call statistics', href: '/missed-call-statistics' },
      { label: 'AI receptionist', href: '/agents/inbound' },
    ],
  },
];
