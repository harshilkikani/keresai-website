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
  /** Optional question H2 overrides; defaults are built from `name` in the template. */
  problemH2?: string;
  howH2?: string;
  /** Optional extra sections (question H2 + HTML body) rendered after the outcomes. */
  details?: { h2: string; body: string }[];
  related: string[]; // other use-case slugs
  cta: { href: string; label: string };
}

const allUsecases: UseCase[] = [
  {
    slug: 'after-hours-answering',
    name: 'After-hours answering',
    targetKeyword: 'after hours answering service',
    title: 'After-Hours Answering Service | Keres AI',
    description:
      'Keres answers every call after hours, on weekends and holidays, booking appointments and flagging emergencies so no lead is lost to voicemail.',
    h1: 'Answer every call <span class="accent">after hours</span>',
    intro:
      'An after-hours answering service handles the calls that come in once your office closes. Keres AI answers every one of them 24/7 — nights, weekends, and holidays — in two rings, qualifies the caller, books the appointment, and texts your on-call team the moment something is an emergency, so no lead ever hits voicemail.',
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
    cta: { href: '/agents/inbound', label: 'See the 24/7 AI receptionist' },
  },
  {
    slug: 'overflow-call-handling',
    name: 'Overflow call handling',
    targetKeyword: 'overflow call handling service',
    title: 'Overflow Call Handling | Keres AI',
    description:
      'Keres picks up the calls your team can’t (busy lines, peak season, marketing spikes) and books the job instead of sending callers to voicemail.',
    h1: 'Never drop an <span class="accent">overflow call</span>',
    intro:
      'Overflow call handling routes the calls your team can’t answer — because the lines are busy or staff are slammed — to a backup that picks up. Remi, Keres AI’s AI receptionist, answers the overflow in two rings, qualifies and books each caller, and texts back any call it could not take within 60 seconds, so a peak-season rush or a marketing spike is far less likely to end in voicemail.',
    problem:
      'During busy seasons, ad campaigns, and emergencies, call volume spikes past what your front desk can absorb. Every call that rings out is a booked job handed to a competitor — exactly when demand is highest.',
    how: [
      'Answers overflow calls in two rings, 24/7',
      'Picks up overflow after a set number of rings from your existing system',
      'Qualifies and books each caller on your calendar',
      'Texts back any caller it could not take within 60 seconds',
    ],
    outcomes: [
      'Every spillover call answered and booked',
      'No lost revenue during your busiest, highest-demand hours',
      'No scrambling to staff up for seasonal peaks',
    ],
    faqs: [
      { q: 'How does overflow handling work with my phone system?', a: 'Calls your team doesn’t pick up within a set number of rings forward to Keres, which answers instantly and books or routes the caller.' },
      { q: 'Can Keres handle a sudden spike in calls?', a: 'Your quote sizes Remi’s included minutes to your busy season, so plan it around your heaviest week, not an average one. Billing is a monthly rate with included minutes, then per minute, with no per-call fees. Ask on your first call how Remi handles your peak volume.' },
    ],
    related: ['after-hours-answering', 'reduce-staffing-costs', 'lead-capture'],
    cta: { href: '/agents/inbound', label: 'Add AI overflow coverage' },
  },
  {
    slug: 'appointment-booking',
    name: 'Appointment booking',
    targetKeyword: 'ai appointment booking',
    title: 'AI Appointment Booking — Book Jobs on the Call | Keres AI',
    description:
      'Keres books, confirms and reschedules appointments during the call, checking live availability on your calendar so callers never wait for a callback.',
    h1: 'Book the appointment <span class="accent">on the call</span>',
    intro:
      'Keres AI turns every inbound call into a booked appointment. It checks real-time availability on your calendar, books or reschedules during the conversation, avoids double-bookings, and texts the caller a confirmation — eliminating phone tag and the callbacks that quietly lose you customers.',
    problem:
      'A receptionist who takes a message and promises a callback loses bookings — the caller’s intent fades and competitors get there first. Manual scheduling is slow, inconsistent, and a top driver of no-shows.',
    how: [
      'Checks live calendar availability and books during the call',
      'Reschedules and cancels without phone tag',
      'Books onto Google Calendar, HubSpot or ServiceTitan',
      'Sends automatic confirmations and reminders to cut no-shows',
    ],
    outcomes: [
      'More calls converted to confirmed appointments',
      'Fewer no-shows from automatic reminders',
      'No double-bookings, no manual scheduling',
    ],
    faqs: [
      { q: 'What calendars does Keres book into?', a: 'Google Calendar, HubSpot and ServiceTitan today. Outlook, Jobber and Housecall Pro are rolling out.' },
      { q: 'Does it reduce no-shows?', a: 'Yes — automatic text confirmations and reminders, plus instant rescheduling, meaningfully cut no-shows.' },
    ],
    related: ['lead-capture', 'after-hours-answering', 'overflow-call-handling'],
    cta: { href: '/agents/inbound', label: 'Automate your bookings' },
  },
  {
    slug: 'lead-capture',
    name: 'Lead capture & qualification',
    problemH2: 'Why do paid leads get lost?',
    targetKeyword: '24/7 lead capture',
    title: '24/7 Lead Capture & Qualification | Keres AI',
    description:
      'Keres captures and qualifies every inbound lead 24/7, asking your questions and routing real opportunities to your team while filtering the noise.',
    h1: 'Capture and qualify <span class="accent">every lead</span>',
    intro:
      'Keres AI captures every inbound lead and qualifies it on the spot, 24/7. It asks the questions you define — service, location, urgency, budget — books the ones that fit, routes the rest, and logs everything to your CRM, so your team spends time on real opportunities instead of chasing voicemails.',
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
      { q: 'Does it capture leads from my website too?', a: 'Yes. Remi also handles website chat, your business text line and website form enquiries, and asks those leads the same qualifying questions as callers.' },
    ],
    details: [
      { h2: 'Which leads does Keres AI capture?', body: '<p>Remi answers phone calls in two rings, 24/7, and also handles website chat, your business text line and website form enquiries, so a lead that arrives by any of those routes gets the same questions and the same booking flow. Any caller Remi could not take gets a text back within 60 seconds, which keeps a hang-up from turning into a lost lead. Remi answers in English.</p>' },
      { h2: 'What does a qualified lead look like when it reaches you?', body: '<p>You choose the questions on your first call: the service, the address or area, how urgent it is, and anything else that decides whether a job is worth taking. Remi asks them, books qualified callers into Google Calendar, HubSpot or ServiceTitan, and writes the answers to the booking, so nobody has to call back to ask again. Callers who do not fit are routed to the person you choose and logged, not dropped. Other tools connect through <a href="/integrations/zapier">Zapier</a>.</p>' },
      { h2: 'How fast does a lead need an answer?', body: '<p>Faster than most offices manage. The <a href="/glossary/lead-response-time">lead response time</a> entry summarizes the research, and the <a href="/tools/lead-response-time-calculator">lead response time calculator</a> shows what slow follow-up costs at your volume. A lead answered in two rings never has to wait for a callback.</p>' },
      { h2: 'What does it cost?', body: '<p>Remi is one monthly rate with included minutes, then per minute, with no per-call fees, month-to-month. The rate is quoted to your call volume on a 30-minute call; see <a href="/pricing">pricing</a>.</p>' },
    ],
    related: ['after-hours-answering', 'appointment-booking', 'overflow-call-handling'],
    cta: { href: '/tools/missed-call-calculator', label: 'Calculate your missed-lead losses' },
  },
  {
    slug: 'reduce-staffing-costs',
    name: 'Reduce staffing costs',
    problemH2: 'Why does full phone coverage cost so much?',
    howH2: 'How does Keres AI cut front-desk staffing costs?',
    targetKeyword: 'reduce front desk staffing costs',
    title: 'Reduce Front-Desk Staffing Costs | Keres AI',
    description:
      'Cover the phones 24/7 without hiring: Keres answers, qualifies and books on one monthly rate with included minutes instead of a full-time hire.',
    h1: 'Cover the phones <span class="accent">without hiring</span>',
    intro:
      'Keres AI covers your front desk and after-hours phones on one monthly rate — answering, qualifying, and booking every call without adding headcount. It costs far less than a full-time receptionist or a per-minute answering service, and it never calls in sick, takes a lunch, or misses a night call.',
    problem:
      'A full-time front-desk hire is expensive and still only covers business hours. Per-minute answering services balloon during busy seasons and usually just take a message. Either way, you’re paying a lot for incomplete coverage.',
    how: [
      'One monthly rate with included minutes, no overtime rates',
      'Covers business hours, after hours, and overflow in one solution',
      'Included minutes sized to your volume, with your busy season planned into the quote',
      'Books appointments and updates your CRM, not just takes messages',
    ],
    outcomes: [
      'Lower, predictable front-desk costs',
      '24/7 coverage without nights-and-weekends staffing',
      'Your team freed up for higher-value work',
    ],
    faqs: [
      { q: 'Is Keres cheaper than a receptionist?', a: 'Typically yes — one monthly rate that’s well below the cost of a full-time front-desk hire, while covering nights and weekends too.' },
      { q: 'Does it replace my front desk entirely?', a: 'It does not have to. You can use Keres AI for after-hours and overflow only, or run Remi as your full front desk. Coverage is set to whatever you need. See <a href="/glossary/front-desk-automation">front desk automation</a>.' },
    ],
    related: ['after-hours-answering', 'overflow-call-handling', 'lead-capture'],
    cta: { href: '/pricing', label: 'See pricing' },
  },
  {
    slug: 'spam-call-screening',
    name: 'Spam-call screening',
    targetKeyword: 'spam call screening for business',
    title: 'Spam-Call Screening — Stop Junk Calls | Keres AI',
    description:
      'Keres screens inbound calls so your team only handles real customers — filtering robocalls, solicitors, and spam while booking genuine leads 24/7.',
    h1: 'Screen out <span class="accent">spam and robocalls</span>',
    intro:
      'Keres AI screens every inbound call before it reaches your team, filtering robocalls, solicitors, and spam while engaging genuine customers — qualifying them, booking appointments, and logging the lead. Your staff stop losing hours to junk calls and only handle the conversations that matter.',
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
      { q: 'Can I see which calls were screened out?', a: 'Yes. Screened calls are logged, so you can spot a real customer who was misjudged and adjust the rules with Keres.' },
    ],
    details: [
      { h2: 'How does screening work without blocking real customers?', body: '<p>Remi by Keres AI answers every call in two rings and starts the way it would with a customer, by asking your first intake question. Callers who answer like customers go through your normal flow: the questions, the booking, and a handoff to your team under the rules you set. Robocalls, solicitors and obvious spam are not transferred to your team, and screened calls are logged, so you can check what was filtered. Nothing is blocked before it is answered, which is why real customers still get through.</p>' },
      { h2: 'Who is it for?', body: '<p>Any local service business whose number is published on Google, directories, yard signs or vehicle wraps: HVAC, plumbing, roofing and towing companies, law firms, dental practices and real estate teams. If your team has started letting the phone ring because so many calls are junk, screening is usually the first fix. Pair it with <a href="/use-cases/overflow-call-handling">overflow call handling</a> so busy hours are covered too, and see how the <a href="/glossary/ai-receptionist">AI receptionist</a> works end to end.</p>' },
      { h2: 'What does it cost?', body: '<p>Remi is one monthly rate with included minutes, then per minute, with no per-call fees, month-to-month. The rate is quoted to your call volume on a 30-minute call; see <a href="/pricing">pricing</a>.</p>' },
    ],
    related: ['lead-capture', 'after-hours-answering', 'reduce-staffing-costs'],
    cta: { href: '/agents/inbound', label: 'See the AI receptionist' },
  },
  {
    slug: 'emergency-dispatch',
    name: 'Emergency answering & dispatch',
    targetKeyword: 'emergency dispatch answering service',
    title: 'Emergency Answering & Dispatch Workflow | Keres AI',
    description:
      'Keres recognizes emergency calls, captures location and severity, books the visit and texts your on-call tech: a 24/7 emergency dispatch workflow.',
    h1: 'Answer and <span class="accent">dispatch every emergency</span>',
    intro:
      'An emergency dispatch workflow turns an urgent inbound call into a dispatched job in seconds. Keres AI answers in two rings 24/7, recognizes a no-heat, no-cool, flood, or storm emergency, captures the address and severity, books the visit, and texts your on-call tech or driver immediately — so the most valuable calls never wait on hold.',
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
      { q: 'How does dispatch reach my on-call team?', a: 'Keres texts your on-call tech or driver instantly with the address, situation, and contact details, and follows your escalation rules until the job is acknowledged. See <a href="/glossary/dispatch-automation">dispatch automation</a>.' },
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
      'Keres answers storm calls in two rings, qualifies hail and wind damage, books inspections and flags tarp jobs, so a roofing surge becomes booked work.',
    h1: 'Turn a storm surge into <span class="accent">booked inspections</span>',
    intro:
      'A storm-response workflow captures the flood of calls a hailstorm or hurricane triggers in a few hours. Remi, Keres AI’s AI receptionist, answers in two rings, 24/7, qualifies the damage type, books inspections on your estimators’ calendars, and dispatches emergency tarp and board-up jobs — so the first storm in the area fills your schedule instead of your voicemail.',
    problem:
      'Storm demand arrives all at once, and the first roofer to inspect usually wins the insurance claim. A front desk that handles a normal day fine will send dozens of high-value storm callers to voicemail — exactly the leads worth five figures each.',
    how: [
      'Answers storm calls in two rings and texts back any caller it could not take within 60 seconds',
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
      { q: 'How does Keres handle a storm-week surge?', a: 'Your quote sizes Remi’s included minutes to your busy season, so plan it around your heaviest week, not an average one. Billing is a monthly rate with included minutes, then per minute, with no per-call fees. Ask on your first call how Remi handles your peak volume.' },
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
      'Keres books seasonal tune-ups, captures membership renewals and re-engages lapsed maintenance-plan customers, turning reminders into booked visits.',
    h1: 'Reactivate lapsed <span class="accent">maintenance plans</span>',
    intro:
      'A maintenance-plan reactivation workflow keeps recurring revenue from slipping away. Keres AI answers every membership and tune-up call, books the seasonal visit on the spot, captures renewals, and re-engages customers whose plans have lapsed — so the maintenance agreements that stabilize your year actually get scheduled.',
    problem:
      'Maintenance plans are the most profitable, most predictable revenue a service business has — and the easiest to let lapse. When reminder calls go unanswered or renewals require phone tag, plans quietly expire and seasonal tune-ups never get booked.',
    how: [
      'Answers every membership, renewal, and tune-up call and books it during the conversation',
      'Captures plan details and schedules seasonal service on your calendar',
      'Re-engages lapsed plan customers and rebooks their next visit',
      'Logs renewals to HubSpot or ServiceTitan',
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
    details: [
      { h2: 'Which Keres AI workers run it?', body: '<p>Two workers share the job. Remi, the AI receptionist, answers inbound tune-up and renewal calls in two rings, 24/7, and books the visit into ServiceTitan, HubSpot or Google Calendar during the call. <a href="/agents/reactivation">June, the reactivation worker</a>, works your list of lapsed plan customers with a campaign you approve: you see the segment and the message before anything sends, and anyone who says no is not contacted again by that campaign.</p>' },
      { h2: 'When should a reactivation campaign run?', body: '<p>Before the season that fills your calendar on its own: spring for cooling tune-ups, early fall for heating. Booking maintenance visits into the slower weeks keeps techs busy and gets equipment checked before the first heat wave or cold snap. The <a href="/benchmarks/hvac-answering">HVAC answering benchmarks</a> and the <a href="/ai-receptionist-for-hvac">AI receptionist for HVAC</a> page cover what happens to calls once the season starts.</p>' },
      { h2: 'What do you need to start?', body: '<p>A list of past plan customers (an export from ServiceTitan or HubSpot works), the plan terms you want to offer, and your rules for who gets contacted. June is quoted to your list size and campaign volume, month-to-month, and a single campaign can be quoted on its own if you want to try one first. Ask on a <a href="/quote">30-minute call</a>.</p>' },
    ],
    related: ['appointment-booking', 'lead-capture', 'after-hours-answering'],
    cta: { href: '/agents/inbound', label: 'See the AI receptionist' },
  },
  {
    slug: 'financing-follow-up',
    name: 'Financing follow-up',
    targetKeyword: 'financing follow up for contractors',
    title: 'Financing Follow-Up Workflow for High-Ticket Jobs | Keres AI',
    description:
      'Keres captures financing interest on high-ticket jobs, answers payment-option questions and books the consultation so price-sensitive leads convert.',
    h1: 'Convert high-ticket leads with <span class="accent">financing follow-up</span>',
    intro:
      'A financing follow-up workflow keeps high-ticket leads moving when cost is the sticking point. Keres AI answers questions about payment and financing options, captures the customer’s interest, and books the consultation or estimate — so a $10,000 HVAC replacement or roof job does not stall the moment price comes up.',
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
      { q: 'How does this help high-ticket trades?', a: 'For replacements and major repairs, cost is the top objection. Capturing financing interest and booking the consultation immediately keeps the lead from stalling and going to a competitor. See <a href="/glossary/lead-qualification">lead qualification</a> for the questions that come first.' },
    ],
    related: ['lead-capture', 'appointment-booking', 'maintenance-plan-reactivation'],
    cta: { href: '/tools/missed-call-calculator', label: 'Calculate your missed-lead losses' },
  },
];

/** Use cases merged into a stronger page for the same searcher; old URLs redirect (astro.config.mjs). */
export const mergedUsecases: Record<string, string> = {
  'after-hours-answering': '/24-7-ai-receptionist',
  'appointment-booking': '/agents/inbound',
};
export const usecases: UseCase[] = allUsecases.filter((u) => !(u.slug in mergedUsecases));
