// Data-driven use-case pages. Add an entry → a new /use-cases/{slug} page builds.
export interface UseCase {
  slug: string;
  name: string; // short display name
  targetKeyword: string;
  title: string;
  description: string;
  h1: string; // may include <span class="accent">
  intro: string; // 40–60 word direct-answer block
  problem: string; // the pain, in prose
  how: string[]; // how Keres handles it
  outcomes: string[]; // results / benefits
  faqs: { q: string; a: string }[];
  related: string[]; // other use-case slugs
  cta: { href: string; label: string };
}

export const usecases: UseCase[] = [
  {
    slug: 'after-hours-answering',
    name: 'After-hours answering',
    targetKeyword: 'after hours answering service',
    title: 'After-Hours Answering Service — Never Miss a Night Call | Keres AI',
    description:
      'Keres answers every call after hours, on weekends, and on holidays — booking appointments and flagging emergencies so you never lose a lead to voicemail at 9 PM.',
    h1: 'Answer every call <span class="accent">after hours</span>',
    intro:
      'An after-hours answering service handles the calls that come in once your office closes. Keres answers every one of them 24/7 — nights, weekends, and holidays — in two rings, qualifies the caller, books the appointment, and texts your on-call team the moment something is an emergency, so no lead ever hits voicemail.',
    problem:
      'Most inbound calls that go to voicemail are never returned — the caller simply dials the next business. After hours is when that leak is worst: emergencies, motivated buyers, and high-intent leads all call when your front desk is gone for the day.',
    how: [
      'Answers every call in two rings, 24/7 — including nights, weekends, and holidays',
      'Qualifies the caller and books the appointment on your calendar',
      'Texts your on-call team instantly when a call is an emergency',
      'Logs every call and lead to your CRM so nothing is lost overnight',
    ],
    outcomes: [
      'Zero after-hours calls lost to voicemail',
      'Emergencies reach your team in seconds, not the next morning',
      'More booked jobs from the hours your competitors ignore',
    ],
    faqs: [
      { q: 'Does Keres answer calls 24/7?', a: 'Yes — every call is answered in two rings, day or night, including weekends and holidays, with no extra after-hours rate.' },
      { q: 'Can it handle emergency calls at night?', a: 'Yes. Keres recognizes emergencies, captures the details, books the visit, and texts your on-call team immediately.' },
    ],
    related: ['overflow-call-handling', 'lead-capture', 'reduce-staffing-costs'],
    cta: { href: '/ai-receptionist', label: 'See the 24/7 AI receptionist' },
  },
  {
    slug: 'overflow-call-handling',
    name: 'Overflow call handling',
    targetKeyword: 'overflow call handling service',
    title: 'Overflow Call Handling — Catch Every Spillover Call | Keres AI',
    description:
      'Keres picks up the calls your team can’t — busy lines, peak season, marketing spikes — answering instantly and booking the job instead of sending callers to voicemail.',
    h1: 'Never drop an <span class="accent">overflow call</span>',
    intro:
      'Overflow call handling routes the calls your team can’t answer — because the lines are busy or staff are slammed — to a backup that picks up instantly. Keres answers unlimited simultaneous calls in two rings, qualifies and books each one, so a peak-season rush or a marketing spike never sends callers to voicemail.',
    problem:
      'During busy seasons, ad campaigns, and emergencies, call volume spikes past what your front desk can absorb. Every call that rings out is a booked job handed to a competitor — exactly when demand is highest.',
    how: [
      'Answers unlimited simultaneous calls — no busy signal, ever',
      'Picks up overflow after a set number of rings from your existing system',
      'Qualifies and books each caller on your calendar',
      'Scales instantly for heat waves, storms, and ad-driven spikes',
    ],
    outcomes: [
      'Every spillover call answered and booked',
      'No lost revenue during your busiest, highest-demand hours',
      'No scrambling to staff up for seasonal peaks',
    ],
    faqs: [
      { q: 'How does overflow handling work with my phone system?', a: 'Calls your team doesn’t pick up within a set number of rings forward to Keres, which answers instantly and books or routes the caller.' },
      { q: 'Can Keres handle a sudden spike in calls?', a: 'Yes — it answers unlimited simultaneous calls, so a heat wave or viral ad never sends a caller to voicemail.' },
    ],
    related: ['after-hours-answering', 'reduce-staffing-costs', 'lead-capture'],
    cta: { href: '/ai-receptionist', label: 'Add AI overflow coverage' },
  },
  {
    slug: 'appointment-booking',
    name: 'Appointment booking',
    targetKeyword: 'ai appointment booking',
    title: 'AI Appointment Booking — Book Jobs on the Call | Keres AI',
    description:
      'Keres books, confirms, and reschedules appointments during the call — checking live availability and syncing to your calendar, so callers never wait for a callback.',
    h1: 'Book the appointment <span class="accent">on the call</span>',
    intro:
      'Keres turns every inbound call into a booked appointment. It checks real-time availability on your calendar, books or reschedules during the conversation, avoids double-bookings, and texts the caller a confirmation — eliminating phone tag and the callbacks that quietly lose you customers.',
    problem:
      'A receptionist who takes a message and promises a callback loses bookings — the caller’s intent fades and competitors get there first. Manual scheduling is slow, inconsistent, and a top driver of no-shows.',
    how: [
      'Checks live calendar availability and books during the call',
      'Reschedules and cancels without phone tag',
      'Books onto Google Calendar, Outlook, or your field-service software',
      'Sends automatic confirmations and reminders to cut no-shows',
    ],
    outcomes: [
      'More calls converted to confirmed appointments',
      'Fewer no-shows from automatic reminders',
      'No double-bookings, no manual scheduling',
    ],
    faqs: [
      { q: 'What calendars does Keres book into?', a: 'Google Calendar, Outlook/Microsoft 365, and field-service tools like ServiceTitan, Jobber, and Housecall Pro.' },
      { q: 'Does it reduce no-shows?', a: 'Yes — automatic text confirmations and reminders, plus instant rescheduling, meaningfully cut no-shows.' },
    ],
    related: ['lead-capture', 'after-hours-answering', 'overflow-call-handling'],
    cta: { href: '/ai-receptionist', label: 'Automate your bookings' },
  },
  {
    slug: 'lead-capture',
    name: 'Lead capture & qualification',
    targetKeyword: '24/7 lead capture',
    title: 'Never Miss a Lead — 24/7 Lead Capture & Qualification | Keres AI',
    description:
      'Keres captures and qualifies every inbound lead 24/7 — asking the right questions, scoring fit, and routing real opportunities to your team while filtering the noise.',
    h1: 'Capture and qualify <span class="accent">every lead</span>',
    intro:
      'Keres captures every inbound lead and qualifies it on the spot, 24/7. It asks the questions you define — service, location, urgency, budget — books the ones that fit, routes the rest, and logs everything to your CRM, so your team spends time on real opportunities instead of chasing voicemails.',
    problem:
      'Leads are expensive to generate and easy to lose. Calls that go unanswered, get mis-qualified, or sit in a voicemail box overnight are marketing dollars poured down the drain.',
    how: [
      'Answers and captures every inbound lead, 24/7',
      'Qualifies against your criteria — service, location, urgency, budget',
      'Books qualified leads and routes the rest to the right person',
      'Pushes every lead and call summary into your CRM automatically',
    ],
    outcomes: [
      'No lead lost to voicemail or slow follow-up',
      'Higher close rates from instant, consistent qualification',
      'A clean CRM with every lead captured and scored',
    ],
    faqs: [
      { q: 'How does Keres qualify leads?', a: 'It asks the qualifying questions you configure, captures the answers, books qualified callers, and routes everything to your CRM.' },
      { q: 'What is the cost of a missed lead?', a: 'Use our <a href="/tools/missed-call-calculator">missed-call calculator</a> to estimate the monthly revenue you lose to unanswered calls.' },
    ],
    related: ['after-hours-answering', 'appointment-booking', 'overflow-call-handling'],
    cta: { href: '/tools/missed-call-calculator', label: 'Calculate your missed-lead losses' },
  },
  {
    slug: 'reduce-staffing-costs',
    name: 'Reduce staffing costs',
    targetKeyword: 'reduce front desk staffing costs',
    title: 'Reduce Front-Desk Staffing Costs With an AI Receptionist | Keres AI',
    description:
      'Cover the phones 24/7 without hiring. Keres answers, qualifies, and books at a flat monthly rate — far less than a full-time receptionist or a per-minute answering service.',
    h1: 'Cover the phones <span class="accent">without hiring</span>',
    intro:
      'Keres covers your front desk and after-hours phones at a flat monthly rate — answering, qualifying, and booking every call without adding headcount. It costs far less than a full-time receptionist or a per-minute answering service, and it never calls in sick, takes a lunch, or misses a night call.',
    problem:
      'A full-time front-desk hire is expensive and still only covers business hours. Per-minute answering services balloon during busy seasons and usually just take a message. Either way, you’re paying a lot for incomplete coverage.',
    how: [
      'One flat monthly rate — no per-minute billing, no overtime',
      'Covers business hours, after hours, and overflow in one solution',
      'Answers unlimited calls at once — no need to staff for peaks',
      'Books appointments and updates your CRM, not just takes messages',
    ],
    outcomes: [
      'Lower, predictable front-desk costs',
      '24/7 coverage without nights-and-weekends staffing',
      'Your team freed up for higher-value work',
    ],
    faqs: [
      { q: 'Is Keres cheaper than a receptionist?', a: 'Typically yes — a flat monthly rate that’s well below the cost of a full-time front-desk hire, while covering nights and weekends too.' },
      { q: 'Does it replace my front desk entirely?', a: 'Many businesses use Keres for after-hours and overflow, and others run it as their full front desk. It scales to whatever coverage you need.' },
    ],
    related: ['after-hours-answering', 'overflow-call-handling', 'lead-capture'],
    cta: { href: '/pricing', label: 'See pricing' },
  },
  {
    slug: 'spam-call-screening',
    name: 'Spam-call screening',
    targetKeyword: 'spam call screening for business',
    title: 'Spam-Call Screening — Stop Wasting Time on Junk Calls | Keres AI',
    description:
      'Keres screens inbound calls so your team only handles real customers — filtering robocalls, solicitors, and spam while booking genuine leads 24/7.',
    h1: 'Screen out <span class="accent">spam and robocalls</span>',
    intro:
      'Keres screens every inbound call before it reaches your team, filtering robocalls, solicitors, and spam while engaging genuine customers — qualifying them, booking appointments, and logging the lead. Your staff stop losing hours to junk calls and only handle the conversations that matter.',
    problem:
      'Robocalls and solicitors interrupt your team all day, training them to ignore the phone — which means real customers get missed too. Every junk call is lost productivity and a distraction from booked work.',
    how: [
      'Answers and screens every inbound call first',
      'Filters robocalls, solicitors, and obvious spam',
      'Engages and books genuine customers automatically',
      'Routes only the calls that need a human to your team',
    ],
    outcomes: [
      'Far fewer interruptions from junk calls',
      'A team that trusts the phone again — so real leads get answered',
      'More time spent on booked, revenue-generating work',
    ],
    faqs: [
      { q: 'Can Keres tell spam from real callers?', a: 'Yes — it engages each caller, identifies robocalls and solicitations, and only routes genuine customers to your team while still booking the real leads.' },
      { q: 'Do real customers still get through?', a: 'Always. Screening filters the noise; genuine callers are qualified, booked, and logged like any other lead.' },
    ],
    related: ['lead-capture', 'after-hours-answering', 'reduce-staffing-costs'],
    cta: { href: '/ai-receptionist', label: 'See the AI receptionist' },
  },
  {
    slug: 'emergency-dispatch',
    name: 'Emergency answering & dispatch',
    targetKeyword: 'emergency dispatch answering service',
    title: 'Emergency Answering & Dispatch Workflow | Keres AI',
    description:
      'Keres recognizes emergency calls, captures the location and severity, books the visit, and texts your on-call tech instantly — a complete 24/7 emergency dispatch workflow.',
    h1: 'Answer and <span class="accent">dispatch every emergency</span>',
    intro:
      'An emergency dispatch workflow turns an urgent inbound call into a dispatched job in seconds. Keres answers in two rings 24/7, recognizes a no-heat, no-cool, flood, or storm emergency, captures the address and severity, books the visit, and texts your on-call tech or driver immediately — so the most valuable calls never wait on hold.',
    problem:
      'Emergencies are your highest-intent, highest-value calls, and they almost never arrive during business hours. A missed or delayed emergency call is both lost revenue and a customer in distress who calls the next company — and a voicemail box cannot triage or dispatch.',
    how: [
      'Answers every call in two rings, 24/7, and identifies emergencies by the questions you define',
      'Captures the address, situation, and severity, then books the visit on your calendar',
      'Texts the on-call tech or driver instantly with the full details for dispatch',
      'Escalates and follows your routing rules until the job is acknowledged',
    ],
    outcomes: [
      'Emergencies reach your team in seconds, not the next morning',
      'Every urgent, high-value call captured and dispatched',
      'Customers reassured immediately instead of hitting voicemail',
    ],
    faqs: [
      { q: 'How does the AI know a call is an emergency?', a: 'Keres asks the triage questions you configure — no heat, no cool, flooding, gas smell, storm damage — and flags the call as urgent the moment those criteria are met.' },
      { q: 'How does dispatch reach my on-call team?', a: 'Keres texts your on-call tech or driver instantly with the address, situation, and contact details, and follows your escalation rules until the job is acknowledged.' },
    ],
    related: ['after-hours-answering', 'storm-response-dispatch', 'appointment-booking'],
    cta: { href: '/glossary/emergency-dispatch', label: 'What is emergency dispatch?' },
  },
  {
    slug: 'storm-response-dispatch',
    name: 'Storm-response dispatch',
    targetKeyword: 'roofing storm response call handling',
    title: 'Storm-Response Dispatch Workflow for Roofers | Keres AI',
    description:
      'Keres answers unlimited simultaneous storm calls, qualifies hail and wind damage, books inspections, and dispatches emergency tarp jobs — so a roofing surge becomes booked work.',
    h1: 'Turn a storm surge into <span class="accent">booked inspections</span>',
    intro:
      'A storm-response workflow captures the flood of calls a hailstorm or hurricane triggers in a few hours. Keres answers unlimited simultaneous calls, qualifies the damage type, books inspections on your estimators’ calendars, and dispatches emergency tarp and board-up jobs — so the first storm in the area fills your schedule instead of your voicemail.',
    problem:
      'Storm demand arrives all at once, and the first roofer to inspect usually wins the insurance claim. A front desk that handles a normal day fine will send dozens of high-value storm callers to voicemail — exactly the leads worth five figures each.',
    how: [
      'Answers unlimited simultaneous calls the instant a storm hits — no busy signal',
      'Qualifies hail, wind, and water damage and captures the property details',
      'Books inspections and insurance appointments on your estimators’ calendars',
      'Dispatches emergency tarp and board-up jobs to your crew immediately',
    ],
    outcomes: [
      'Every storm lead captured before a competitor answers',
      'Estimators’ calendars full instead of a voicemail backlog',
      'Emergency tarp jobs dispatched in minutes, not hours',
    ],
    faqs: [
      { q: 'Can Keres handle hundreds of storm calls at once?', a: 'Yes — Keres answers unlimited simultaneous calls, so a hail or wind event never sends a caller to voicemail. Every storm lead is answered, qualified, and booked.' },
      { q: 'Does it book insurance inspections?', a: 'Yes. Keres qualifies the damage, captures the address and contact details, and books the inspection on your estimator’s calendar. See the <a href="/benchmarks/roofing-lead-response">roofing lead-response benchmarks</a>.' },
    ],
    related: ['emergency-dispatch', 'overflow-call-handling', 'after-hours-answering'],
    cta: { href: '/ai-receptionist-for-roofing', label: 'AI receptionist for roofing' },
  },
  {
    slug: 'maintenance-plan-reactivation',
    name: 'Maintenance-plan reactivation',
    targetKeyword: 'maintenance plan reactivation calls',
    title: 'Maintenance-Plan Reactivation Workflow | Keres AI',
    description:
      'Keres books seasonal tune-ups, captures membership renewals, and re-engages lapsed maintenance-plan customers — turning recurring-revenue reminders into booked visits.',
    h1: 'Reactivate lapsed <span class="accent">maintenance plans</span>',
    intro:
      'A maintenance-plan reactivation workflow keeps recurring revenue from slipping away. Keres answers every membership and tune-up call, books the seasonal visit on the spot, captures renewals, and re-engages customers whose plans have lapsed — so the maintenance agreements that stabilize your year actually get scheduled.',
    problem:
      'Maintenance plans are the most profitable, most predictable revenue a service business has — and the easiest to let lapse. When reminder calls go unanswered or renewals require phone tag, plans quietly expire and seasonal tune-ups never get booked.',
    how: [
      'Answers every membership, renewal, and tune-up call and books it during the conversation',
      'Captures plan details and schedules seasonal service on your calendar',
      'Re-engages lapsed plan customers and rebooks their next visit',
      'Logs renewals and service history to your CRM or field-service software',
    ],
    outcomes: [
      'More maintenance agreements renewed and tune-ups booked',
      'Predictable recurring revenue protected season over season',
      'Less manual chasing of renewals and reminders',
    ],
    faqs: [
      { q: 'Can Keres book seasonal maintenance visits?', a: 'Yes — it answers the call, checks availability, and books the tune-up or seasonal service on your calendar, then sends a confirmation.' },
      { q: 'Does it help win back lapsed members?', a: 'Yes. Keres re-engages customers whose maintenance plans have lapsed, captures their details, and rebooks the next visit so recurring revenue is recovered.' },
    ],
    related: ['appointment-booking', 'lead-capture', 'after-hours-answering'],
    cta: { href: '/ai-receptionist', label: 'See the AI receptionist' },
  },
  {
    slug: 'financing-follow-up',
    name: 'Financing follow-up',
    targetKeyword: 'financing follow up for contractors',
    title: 'Financing Follow-Up Workflow for High-Ticket Jobs | Keres AI',
    description:
      'Keres captures financing interest on high-ticket jobs, answers payment-option questions, and books the consultation — so price-sensitive leads convert instead of stalling.',
    h1: 'Convert high-ticket leads with <span class="accent">financing follow-up</span>',
    intro:
      'A financing follow-up workflow keeps high-ticket leads moving when cost is the sticking point. Keres answers questions about payment and financing options, captures the customer’s interest, and books the consultation or estimate — so a $10,000 HVAC replacement or roof job does not stall the moment price comes up.',
    problem:
      'On high-ticket jobs — system replacements, full roofs, major repairs — sticker shock stalls deals. When a price-sensitive caller asks about financing and the front desk can’t answer or follow up, the lead goes cold and books with a competitor who made payment easy.',
    how: [
      'Answers financing and payment-option questions on high-ticket inquiries',
      'Captures the customer’s budget, interest, and contact details',
      'Books the consultation or estimate while interest is high',
      'Routes financing-qualified leads to your sales team with full context',
    ],
    outcomes: [
      'Fewer high-ticket leads lost to sticker shock',
      'More replacement and major-repair jobs booked',
      'Sales follow-up that starts warm, with financing context captured',
    ],
    faqs: [
      { q: 'Can the AI answer financing questions?', a: 'Keres answers the financing and payment-option questions you configure, captures the lead’s interest and budget, and books the consultation — then routes the details to your sales team.' },
      { q: 'How does this help high-ticket trades?', a: 'For replacements and major repairs, cost is the top objection. Capturing financing interest and booking the consultation immediately keeps the lead from stalling and going to a competitor.' },
    ],
    related: ['lead-capture', 'appointment-booking', 'maintenance-plan-reactivation'],
    cta: { href: '/tools/missed-call-calculator', label: 'Calculate your missed-lead losses' },
  },
];
