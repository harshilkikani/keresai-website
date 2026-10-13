// Data-driven industry receptionist pages. Add an entry → a new page builds.
//
// The five field-service trades (hvac, plumbers, roofing, septic, towing) carry
// a `trade` block: everything on their page that is specific to the trade. The
// template renders almost nothing shared, so each page stands on its own.
//
// HONESTY RULES for `trade` copy:
// - Emergency handling is written as rules the OWNER sets with Keres during
//   setup ("a typical setup flags…"), never as guaranteed behaviour.
// - Example calls are fictional and labelled "Example call, not a customer".
// - No customer names, results or statistics. The only figures are the Keres AI
//   estimates already published on the matching /benchmarks page.
// - Live integrations: Google Calendar, HubSpot, ServiceTitan, Zapier. Jobber
//   and Housecall Pro are rolling out, not live.
import { VENDORS_CHECKED } from './answeringVendors';
export interface CallLine {
  who: 'Caller' | 'Remi';
  line: string;
}

export interface TradeContent {
  /** 50–80 word answer naming Keres AI and the trade. May contain <strong>. */
  answer: string;
  painsH2: string;
  /** Closing line under the pain bullets. */
  painsNote: string;
  callH2: string;
  call: CallLine[];
  /** What the example shows, and how a different rule would change it. */
  callNote: string;
  emergencyH2: string;
  emergencyIntro: string;
  /** Rules the owner sets. May contain links. */
  emergencyRules: string[];
  emergencyNote: string;
  intakeH2: string;
  intakeIntro: string;
  intake: { field: string; why: string }[];
  booksH2: string;
  /** Trade-specific note above the integrations list. */
  softwareNote: string;
  costH2: string;
  /** HTML. Only Keres AI estimates from the matching benchmark page. */
  costBody: string;
  calculator: { href: string; label: string };
  compareH2: string;
  compareIntro: string;
  checklist: string[];
  /** Optional link to the sourced "best AI receptionist for …" roundup for this trade. */
  roundup?: { href: string; label: string };
  /** Optional pricing comparison (HTML). */
  priceH2?: string;
  priceBody?: string;
  ctaHeading: string;
  ctaSub: string;
}

export interface Industry {
  slug: string; // e.g. "hvac" -> /ai-receptionist-for-hvac
  name: string; // display, e.g. "HVAC Companies"
  /**
   * Lower-case display form used inside running prose ("for HVAC companies").
   * Provided explicitly so trade acronyms (HVAC, SDR) keep their casing.
   */
  nameLower: string;
  short: string; // e.g. "HVAC"
  /**
   * Lower-case display form of the short label for prose contexts
   * ("losing HVAC jobs" vs "losing hvac jobs"). Keeps acronyms upper.
   */
  shortLower: string;
  title: string;
  description: string;
  intro: string;
  pains: string[];
  books: string[];
  faqs: { q: string; a: string }[];
  /** Trade-specific page content. Every industry that still builds has one. */
  trade?: TradeContent;
}

const allIndustries: Industry[] = [
  {
    slug: 'hvac',
    name: 'HVAC Companies',
    nameLower: 'HVAC companies',
    short: 'HVAC',
    shortLower: 'HVAC',
    title: 'AI Receptionist for HVAC Companies | Keres AI',
    description:
      'Keres AI answers HVAC calls 24/7 in two rings, books service and install visits, and flags no-heat and no-cool emergencies on your rules.',
    intro:
      'HVAC demand spikes in heat waves and cold snaps, which is exactly when the office can’t pick up fast enough. Remi by Keres AI answers in two rings, 24/7, books the service call, and alerts your on-call tech when a call matches the emergency rules you set.',
    pains: [
      'A heat wave or cold snap that multiplies calls overnight',
      'No-heat and no-cool calls after 6 p.m. that land in voicemail',
      'Techs on a roof or in a crawlspace who can’t take the next booking',
      'Answering services that take a message instead of booking the visit',
    ],
    books: [
      'Repair and diagnostic visits',
      'Maintenance-plan tune-ups',
      'Comfort-advisor visits for replacement quotes',
      'Emergency calls routed to the on-call tech',
    ],
    faqs: [
      { q: 'Can an AI receptionist handle HVAC emergency calls?', a: 'Yes, within the rules you set with Keres during setup. A typical HVAC setup treats no heat with an infant or elderly person at home as an emergency and warm-transfers it to the on-call tech. For a gas smell, Remi tells the caller to leave the building and call the gas utility or 911, then alerts on-call.' },
      { q: 'Will Remi keep up during a heat wave?', a: 'Your quote sizes Remi’s included minutes to your busy season, so plan it around your heaviest week, not an average one. Billing is a monthly rate with included minutes, then per minute, with no per-call fees. Ask on your first call how Remi handles your peak volume.' },
      { q: 'Can it tell a maintenance-plan member from a new customer?', a: 'Remi asks whether the caller is on a maintenance plan and writes the answer into the job notes, so your dispatcher can give members the priority your plan promises.' },
      { q: 'Will Remi quote a price for a new system?', a: 'No. Remi only states prices you put in its script, such as your diagnostic or trip fee. Replacement pricing needs someone to see the house, so Remi books a comfort-advisor visit instead.' },
      { q: 'Does Remi speak Spanish?', a: 'Remi answers in English today. If a large share of your callers speak Spanish, raise it on the demo call so Keres can tell you where that stands before you sign.' },
      { q: 'How long does an HVAC setup take?', a: 'It depends on your call flows and integrations. Keres writes your intake script and emergency rules with you and connects your number and ServiceTitan or calendar. The timing is agreed on your first call, and you call the line yourself until it answers the way your best CSR would.' },
    ],
    trade: {
      answer:
        '<strong>Keres AI’s receptionist for HVAC companies is Remi</strong>, an AI agent that answers every call in two rings, 24/7, through heat waves and cold snaps. First, Remi asks your intake questions (system type, symptoms, address). Next, Remi grades the call against the emergency rules you set. Finally, Remi books the visit into Google Calendar, HubSpot or ServiceTitan while the caller is still on the line. For example, a no-heat call with an infant at home goes to the on-call tech, and a tune-up request books into next week. Billing is a monthly rate with included minutes, then per-minute, with no per-call fees. Keres sets everything up for you.',
      painsH2: 'Why do HVAC companies miss so many calls?',
      painsNote:
        'HVAC call volume is a function of the weather, not your staffing plan. The first 90-degree week of the summer and the first hard freeze of the winter are when a full office still sends callers to voicemail. A homeowner sweating through the night does not wait for a callback. Keres AI estimates that 35–50% of HVAC demand arrives after hours, a directional estimate from the Keres AI HVAC call answering benchmarks rather than a measurement. For example, a tech on a roof cannot take the next booking while the dispatcher is already on another line. An answering service can take a message, but a message is not a booked visit on the technician’s board.',
      callH2: 'What an HVAC call to Remi sounds like',
      call: [
        { who: 'Remi', line: 'Thanks for calling [your company], this is Remi. How can I help?' },
        { who: 'Caller', line: 'Our furnace quit and the house is down to 58. We have a newborn.' },
        { who: 'Remi', line: 'I’m sorry, let’s get someone out to you. First, do you smell gas anywhere in the house?' },
        { who: 'Caller', line: 'No, nothing like that.' },
        { who: 'Remi', line: 'Good. What’s the service address, and is it a gas furnace or a heat pump?' },
        { who: 'Caller', line: '14 Elm Street. Gas furnace, about twelve years old.' },
        { who: 'Remi', line: 'Thank you. With an infant at home I’m treating this as an emergency and connecting you to the on-call technician now. If they don’t pick up, they’ll have your details and call you straight back.' },
        { who: 'Caller', line: 'Okay. Thank you.' },
      ],
      callNote:
        'In this example the owner’s rules say no heat plus an infant is an emergency, so Remi transfers instead of offering tomorrow morning. Under a different rule, Remi would book the first open visit and text the caller a confirmation.',
      emergencyH2: 'Can an AI receptionist handle HVAC emergency calls?',
      emergencyIntro:
        'An HVAC emergency is a call your rules flag as urgent. You decide which calls count, and Keres writes the rules into Remi’s script during setup. A typical setup flags:',
      emergencyRules: [
        '<strong>Gas smell or a carbon monoxide alarm.</strong> Remi tells the caller to leave the building and call the gas utility or 911 from outside, then alerts your on-call tech.',
        '<strong>No heat with someone vulnerable at home</strong>, such as an infant or an elderly person, or no heat below an outdoor temperature you choose.',
        '<strong>No cooling during a heat advisory.</strong>',
        '<strong>Water pouring from an indoor unit or a ceiling</strong> under an air handler. Some shops send a truck tonight; others book the first slot tomorrow.',
        '<strong>Everything else</strong> (tune-ups, a noisy blower, thermostat questions, replacement quotes) books into a normal slot.',
      ],
      emergencyNote:
        'When a call matches an emergency rule, Remi warm-transfers the call to your on-call number. If nobody picks up, the tech gets a “call me now” alert with the address and notes. Read more about <a href="/glossary/emergency-dispatch">emergency dispatch</a>.',
      intakeH2: 'What does Remi ask an HVAC caller?',
      intakeIntro: 'The questions come from your script. A typical HVAC intake covers:',
      intake: [
        { field: 'Name and callback number', why: 'so the tech can call ahead' },
        { field: 'Service address and access notes', why: 'gate codes, pets, who will be home' },
        { field: 'System type', why: 'furnace, heat pump, central AC, boiler or mini-split' },
        { field: 'What it is doing', why: 'no heat, blowing warm, short-cycling, leaking, a new noise' },
        { field: 'Approximate age of the equipment', why: 'helps the tech bring the right parts' },
        { field: 'Maintenance-plan member or new customer', why: 'so plan members get the priority you promise' },
        { field: 'Preferred arrival window', why: 'offered from your real availability' },
      ],
      booksH2: 'What can Remi book for an HVAC company?',
      softwareNote:
        'ServiceTitan, yes. ServiceTitan is a live Keres AI integration: when Remi books an HVAC call, Remi writes the customer, the job and the call notes into ServiceTitan, so dispatch sees the system type and symptoms before assigning a tech. Shops without ServiceTitan can book straight into Google Calendar, with the caller logged in HubSpot. Zapier passes each lead to other tools. As of October 2026, Jobber, Housecall Pro, FieldEdge and Service Fusion are rolling out and are not live yet. For example, a Housecall Pro shop should ask Keres AI on the first call what would fit in the meantime, such as Google Calendar plus Zapier. Keres AI sets up the connection during onboarding, and you test a booking yourself before Remi answers a customer.',
      costH2: 'What does a missed HVAC call cost?',
      costBody:
        '<p>Keres AI estimates HVAC companies miss 30–45% of inbound calls in peak season and estimates 35–50% of HVAC demand arrives after hours. Keres AI puts a typical service call at $300–$600, with replacements worth far more. Both figures are directional estimates from the <a href="/benchmarks/hvac-answering">HVAC call answering benchmarks</a>, not measurements of your business.</p><p>Your own number is missed calls a month, times the share of callers who would have booked, times your average ticket. For example, a shop missing 20 calls in a month, where half would have booked at $300, loses $3,000 in service calls before counting replacements. For comparison, the U.S. Bureau of Labor Statistics puts the national median receptionist wage at $38,010 a year (<a href="https://www.bls.gov/oes/current/oes434171.htm" rel="noopener" target="_blank">BLS, May 2025</a>), for about 40 hours of coverage a week. Two follow-on jobs recover revenue from customers you already have: <a href="/use-cases/maintenance-plan-reactivation">maintenance-plan reactivation</a> and <a href="/use-cases/financing-follow-up">financing follow-up</a> for replacements.</p>',
      calculator: { href: '/tools/hvac-missed-call-calculator', label: 'HVAC missed-call calculator' },
      compareH2: 'How do you compare AI receptionists for HVAC?',
      compareIntro: 'Ask every vendor the same questions, Keres included:',
      checklist: [
        'Can it grade no-heat and no-cool calls on your rules, including a question about who is in the house?',
        'What exactly does it say on a gas-smell call? Ask to hear it.',
        'Does it write the job into your field-service software, or only email you a summary?',
        'How is it billed in a heat wave: per call, per minute, or a monthly rate with included minutes?',
        'Can it ask about maintenance-plan membership and note it on the job?',
        'Who writes the script and the emergency rules, and how long until it is live?',
      ],
      roundup: { href: '/best-ai-receptionist-for-hvac', label: 'Best AI receptionists for HVAC companies, compared with sources' },
      ctaHeading: 'Get HVAC calls out of voicemail before the next heat wave',
      ctaSub: 'Book a 30-minute call, tell us your emergency rules, and hear Remi take an HVAC call.',
    },
  },
  {
    slug: 'plumbers',
    name: 'Plumbing Companies',
    nameLower: 'plumbing companies',
    short: 'Plumbers',
    shortLower: 'plumbers',
    title: 'AI Receptionist for Plumbers | Keres AI',
    description:
      'Keres AI answers plumbing calls 24/7, books service visits, and sends burst pipes and sewage backups to your on-call plumber on the rules you set.',
    intro:
      'Remi by Keres AI is an AI answering service for plumbers that answers every call in two rings, 24/7, books the job into ServiceTitan, Google Calendar or HubSpot during the call, and sends a burst pipe or a sewage backup to your on-call plumber on the rules you set. Plumbing emergencies don’t wait for business hours, and with Remi the calls stop going to voicemail.',
    pains: [
      'Water-on-the-floor calls at night that reach voicemail',
      'Plumbers under a sink who can’t answer the next call',
      'Callers who hire whichever plumber picks up first',
      'Weekends and holidays with nobody on the phones',
    ],
    books: [
      'Leak, clog and drain-cleaning visits',
      'Water-heater repair and replacement estimates',
      'Fixture installs and remodel walkthroughs',
      'Urgent calls sent to the on-call plumber',
    ],
    faqs: [
      { q: 'Can an AI receptionist book plumbing jobs, or only take messages?', a: 'Remi books. It offers real windows from your calendar or ServiceTitan while the caller is on the line, writes the job in, and texts the caller a confirmation they can reply to.' },
      { q: 'What happens when a burst-pipe call comes in at 2 a.m.?', a: 'Whatever your rules say. A typical setup asks whether the water is shut off; if it is not, Remi warm-transfers to the on-call plumber, and if nobody answers, sends a “call me now” alert with the address and details.' },
      { q: 'Can it tell a homeowner from a tenant?', a: 'Yes. Remi asks whether the caller owns the property and, for tenants, takes the landlord or property manager’s contact, so nobody rolls a truck to work that has not been approved.' },
      { q: 'Does it work with Jobber or Housecall Pro?', a: 'Not yet. Both are rolling out and are not live. ServiceTitan, Google Calendar, HubSpot and Zapier are live today; ask Keres what would fit your setup in the meantime.' },
      { q: 'Will Remi quote a price for a water heater?', a: 'Only prices you put in the script, such as a service-call fee. Water-heater replacements depend on the unit and the install, so Remi books an estimate.' },
      { q: 'What if a caller hangs up before Remi picks up?', a: 'Remi texts the number back within 60 seconds with a real question and carries on by text until it can book the job or hand it to you.' },
      { q: 'Is an AI receptionist cheaper than an answering service for plumbers?', a: 'It depends on your call volume, which is why Keres quotes Remi to it: a monthly rate with included minutes, then per-minute, with no per-call fees. See <a href="/ai-receptionist-cost">what AI receptionists cost</a> for published prices.' },
    ],
    trade: {
      answer:
        '<strong>Keres AI gives plumbing companies Remi</strong>, an AI receptionist picking up every call in two rings, day or night. First, Remi runs your plumbing intake: the problem, where the water is, whether the water is shut off, and owner or tenant. Finally, Remi books the job into ServiceTitan, Google Calendar or HubSpot during the call. You pay a monthly rate with included minutes, then per-minute beyond the included minutes, with no per-call fees. Keres sets everything up for you.',
      painsH2: 'Why do plumbers lose jobs to voicemail?',
      painsNote:
        'A plumbing emergency is a call that cannot wait for a callback. A caller with water coming through the ceiling does not leave a message. The caller keeps dialing down the search results until someone answers, and the plumber who picks up gets the job and, often, the customer for years. Many plumbing calls also come when nobody is at a desk: evenings, weekends, holidays and the first freezing night of the winter. For example, a plumber under a sink at 5 p.m. cannot answer, and the office line rolls to voicemail. Remi by Keres AI answers in two rings and texts back anyone who hangs up within 60 seconds.',
      callH2: 'What a plumbing call to Remi sounds like',
      call: [
        { who: 'Remi', line: 'Thanks for calling [your company], this is Remi. What’s going on?' },
        { who: 'Caller', line: 'There’s water pouring out from under my kitchen sink.' },
        { who: 'Remi', line: 'Let’s deal with that first. Has the water to the house been shut off?' },
        { who: 'Caller', line: 'My husband just turned it off at the meter.' },
        { who: 'Remi', line: 'Good. Is any water near outlets or the electrical panel?' },
        { who: 'Caller', line: 'No, it’s the cabinet and the kitchen floor.' },
        { who: 'Remi', line: 'Okay. Do you own the home, and what’s the address?' },
        { who: 'Caller', line: 'We own it. 220 Bay Road.' },
        { who: 'Remi', line: 'I can have a plumber there between 6 and 8 tonight. Shall I book that? You’ll get a text confirming it.' },
        { who: 'Caller', line: 'Yes, please.' },
      ],
      callNote:
        'Here the owner treats a leak that is already shut off as same-day work rather than a middle-of-the-night callout. If the caller could not stop the water, the rule would send the call straight to the on-call plumber.',
      emergencyH2: 'Which plumbing calls count as emergencies?',
      emergencyIntro:
        'A plumbing emergency is a call your rules flag as urgent, set with Keres during setup. A typical plumbing setup flags:',
      emergencyRules: [
        '<strong>Water that cannot be stopped</strong>: a burst pipe where the caller cannot find or close the shutoff. If water is near outlets or the panel, Remi tells the caller to keep clear of it.',
        '<strong>Sewage backing up into the home</strong>, or every drain in the house backing up at once.',
        '<strong>No water at all to the property.</strong>',
        '<strong>A gas smell near a water heater or gas line.</strong> Remi tells the caller to leave the building and call the gas utility or 911, then alerts your on-call plumber.',
        '<strong>No hot water</strong> is urgent for some shops in winter and next-day work for others. You choose.',
        '<strong>Routine work</strong> (a dripping tap, a running toilet, a fixture install, a water-heater quote) books into a normal window.',
      ],
      emergencyNote:
        'Calls matching a rule are warm-transferred to the on-call plumber. If nobody answers, Remi sends a “call me now” alert with the address, the problem and the shutoff status.',
      intakeH2: 'What does Remi ask a plumbing caller?',
      intakeIntro: 'Your script sets the questions. A typical plumbing script asks for:',
      intake: [
        { field: 'Name, callback number and address', why: 'where the truck is going' },
        { field: 'The problem', why: 'leak, clog, no hot water, sewer smell, install' },
        { field: 'Where in the building', why: 'kitchen, bathroom, basement, slab, outside' },
        { field: 'Is the water shut off?', why: 'decides emergency or same-day' },
        { field: 'Owner, tenant or property manager', why: 'who approves the work' },
        { field: 'Water-heater type and age', why: 'tank or tankless, gas or electric' },
        { field: 'Access and preferred window', why: 'parking, pets, who will be home' },
      ],
      booksH2: 'What jobs can Remi book for a plumber?',
      softwareNote:
        'ServiceTitan is a live Keres AI integration: Remi writes the customer and job into ServiceTitan while the caller is still on the line. Shops that run on a calendar book straight into Google Calendar, with the caller logged in HubSpot. Zapier passes each lead to other tools. As of October 2026, Jobber, Housecall Pro, FieldEdge and Service Fusion are rolling out and are not live yet. For example, a plumbing shop on Jobber should ask Keres AI on the first call what would fit in the meantime, such as Google Calendar plus Zapier. Every booking also sends the caller a confirmation text the caller can reply to. Keres AI sets up the connection during onboarding, and you test a booking yourself before Remi answers a customer.',
      costH2: 'What does a missed plumbing call cost?',
      costBody:
        '<p>Keres AI has not published a plumbing benchmark, so this page gives no plumbing statistic. The arithmetic is simple. First, count missed calls a month. Next, multiply by the share of callers who would have booked. Finally, multiply by your average ticket. For example, using round numbers rather than plumbing data, 20 missed calls a month, half of which would have booked at $300 each, come to $3,000 a month.</p><p>Emergency calls weigh more than the average. A caller with water on the floor rarely waits for a callback, and a good emergency visit is often how a household picks its plumber for the next water heater. For comparison, the U.S. Bureau of Labor Statistics puts the national median receptionist wage at $38,010 a year (<a href="https://www.bls.gov/oes/current/oes434171.htm" rel="noopener" target="_blank">BLS, May 2025</a>), for about 40 hours of coverage a week.</p>',
      calculator: { href: '/tools/missed-call-calculator', label: 'missed-call calculator' },
      compareH2: 'What should plumbers check before choosing an AI answering service?',
      compareIntro: 'A short list to take into any demo:',
      checklist: [
        'Does it ask about the shutoff, and about water near electrics, before it books?',
        'Can it separate owners from tenants and take the landlord’s details?',
        'Does it offer real windows from your calendar, or promise a callback?',
        'What happens when two burst-pipe calls arrive on the coldest night of the year?',
        'Does it text back a caller who hangs up before it answers?',
        'Can your emergency rules change with the season, such as no hot water in January?',
      ],
      ctaHeading: 'Answer the 2 a.m. burst-pipe call',
      ctaSub: 'Book a 30-minute call and hear Remi take a plumbing call with your shutoff and emergency rules.',
    },
  },
  {
    slug: 'dentists',
    name: 'Dental Practices',
    nameLower: 'dental practices',
    short: 'Dentists',
    shortLower: 'dentists',
    title: 'AI Receptionist for Dental Practices | Keres AI',
    description:
      'Keres AI answers every patient call, books and reschedules appointments, and handles after-hours intake for dental practices. Stop losing patients to voicemail.',
    intro:
      'When your front desk is with a patient, the phone still rings — and new patients who hit voicemail book somewhere else. Keres answers every call, books and reschedules appointments, and handles new-patient intake around the clock.',
    pains: [
      'Front desk too busy to answer every call',
      'New patients lost to voicemail after hours',
      'No-shows from missed reschedule calls',
      'Recall and hygiene reminders falling through the cracks',
    ],
    books: [
      'New-patient appointments',
      'Reschedules and cancellations',
      'Hygiene recalls and reminders',
      'Insurance and intake questions',
    ],
    faqs: [
      { q: 'Can the AI receptionist book dental appointments?', a: 'Yes. Keres books new patients, reschedules, and confirms appointments directly on your practice calendar, then texts the patient a confirmation.' },
      { q: 'Is Keres HIPAA compliant?', a: 'No. Keres is not HIPAA certified and does not sign BAAs today, so tell us your requirements before you sign up. Remi can be set up not to collect clinical detail it does not need.' },
      { q: 'Does it handle insurance questions?', a: 'Keres answers common questions, captures insurance details for intake, and routes anything that needs your team.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Teams',
    nameLower: 'real estate teams',
    short: 'Real Estate',
    shortLower: 'real estate',
    title: 'AI Receptionist for Real Estate | Keres AI',
    description:
      'Keres AI answers every buyer and seller call 24/7, books showings, and qualifies leads for agents and brokerages. Never miss an inquiry on a hot listing again.',
    intro:
      'Buyers call about a listing when they see it — often nights and weekends. Miss that call and they call the agent on the next sign. Keres answers instantly, qualifies the lead, and books the showing while interest is hot.',
    pains: [
      'After-hours buyer inquiries going unanswered',
      'Showing requests lost while you’re with a client',
      'Slow lead response killing conversion',
      'No coverage across a team’s listings',
    ],
    books: [
      'Showing requests and tours',
      'Buyer and seller lead qualification',
      'Listing inquiry follow-ups',
      'Consultation and listing-appointment booking',
    ],
    faqs: [
      { q: 'Can it book property showings?', a: 'Yes. Keres qualifies the caller, checks availability, and books the showing on the right agent’s calendar, then sends a confirmation.' },
      { q: 'Does it work for a whole brokerage?', a: 'Yes — Keres can route calls by listing, agent, or team and book onto the correct calendar.' },
      { q: 'Will it qualify leads?', a: 'Yes. It captures budget, timeline, financing, and intent so your agents only spend time on real opportunities.' },
    ],
  },
  {
    slug: 'med-spas',
    name: 'Med Spas & Wellness Clinics',
    nameLower: 'med spas and wellness clinics',
    short: 'Med Spas',
    shortLower: 'med spa',
    title: 'AI Receptionist for Med Spas | Keres AI',
    description:
      'Keres AI answers every med spa call 24/7 and books treatments and consultations, so your front desk never misses a booking at peak hours.',
    intro:
      'Med spas live and die by the booked appointment. When your front desk is with a client, new callers go to voicemail and book somewhere else. Keres answers every call in two rings, qualifies the inquiry, and books the treatment directly on your calendar.',
    pains: [
      'Front desk too busy with in-clinic clients to answer the phone',
      'New leads from ads and Instagram going to voicemail',
      'No coverage on evenings and weekends when prospects research',
      'Reschedules and cancellations falling through the cracks',
    ],
    books: [
      'New-client consultations',
      'Treatment bookings and reschedules',
      'Pre-treatment intake forms',
      'Membership and package inquiries',
    ],
    faqs: [
      { q: 'Can the AI receptionist book med spa treatments?', a: 'Yes. Keres qualifies the inquiry, checks availability, and books the consultation or treatment directly on your calendar, then texts a confirmation.' },
      { q: 'Does it handle pre-treatment intake?', a: 'Yes. The agent collects intake details (treatment history, allergies, contraindications) and pushes them into your system before the appointment.' },
      { q: 'Will it cover ad-driven and social leads?', a: 'Yes — Keres handles inbound from any source, including click-to-call ads and Instagram DM-to-phone funnels, around the clock.' },
    ],
  },
  {
    slug: 'professional-intake',
    name: 'Professional Services Firms',
    nameLower: 'professional services firms',
    short: 'Professional Intake',
    shortLower: 'professional intake',
    title: 'AI Receptionist for Law Firms | Keres AI',
    description:
      'Keres AI handles new-client intake for law firms, financial advisors, and consultants. Qualify, screen conflicts, and book consultations 24/7 — without missing a high-value lead.',
    intro:
      'For law firms, financial advisors, and consultants, every new-client inquiry is a high-value lead worth weeks of work. Miss the call and the client hires the next firm that picks up. Keres answers every inquiry instantly, screens for conflicts, qualifies the matter, and books the consultation.',
    pains: [
      'High-value new-client calls reaching voicemail after hours',
      'Paralegals and assistants buried in unqualified intake calls',
      'Conflict checks delaying consultations',
      'Slow follow-up costing referrals',
    ],
    books: [
      'New-client consultations',
      'Initial matter qualification and conflict screening',
      'Discovery and strategy calls',
      'Reschedules and intake follow-ups',
    ],
    faqs: [
      { q: 'Can it handle conflict screening for law firms?', a: 'Yes. Keres asks the conflict-check questions you configure, captures opposing parties, and flags any potential conflict to your team before booking.' },
      { q: 'Is it appropriate for high-value professional inquiries?', a: 'Yes. The agent matches your firm\'s tone, captures the matter details, and qualifies the lead so your attorneys or advisors only meet with real opportunities.' },
      { q: 'How does it protect confidential information?', a: 'Keres never uses your data to train third-party models and limits access to the people who run your account. It does not hold a SOC 2 report, so raise any compliance requirement before you sign.' },
    ],
  },
  {
    slug: 'roofing',
    name: 'Roofing Companies',
    nameLower: 'roofing companies',
    short: 'Roofing',
    shortLower: 'roofing',
    title: 'AI Receptionist for Roofers & Storm Leads | Keres AI',
    description:
      'Keres AI answers roofing calls 24/7, books estimates and storm inspections, and keeps answering through a storm-season surge.',
    intro:
      'A hailstorm can fill a week of calls into one afternoon. Remi by Keres AI answers in two rings, 24/7, books the estimate or inspection, and sends an active leak to your crew on the rules you set, so storm calls stop going to voicemail.',
    pains: [
      'Hail and wind events that bring a week of calls in an afternoon',
      'Storm-damage calls in the evening, after the office has closed',
      'Insurance-claim homeowners who book whoever inspects first',
      'Estimators on a roof who can’t answer the next lead',
    ],
    books: [
      'Storm-damage inspections',
      'Replacement and repair estimates',
      'Inspections timed before the adjuster visit',
      'Tarp and board-up calls sent to your crew',
    ],
    faqs: [
      { q: 'Can an AI receptionist handle a storm-season call surge?', a: 'Your quote sizes Remi’s included minutes to your busy season, so plan it around your heaviest week, not an average one. Billing is a monthly rate with included minutes, then per minute, with no per-call fees. Ask on your first call how Remi handles your peak volume.' },
      { q: 'Does it capture insurance-claim details?', a: 'Yes. Remi asks for the storm date, whether a claim is open, and when the adjuster is coming, and puts all three in the job notes so the estimator knows the deadline.' },
      { q: 'Will Remi tell a homeowner whether insurance will pay?', a: 'No. Remi does not give coverage advice. It books the inspection and leaves the claim conversation to your estimator.' },
      { q: 'Does it handle retail replacement leads as well as storm work?', a: 'Yes. For a replacement lead Remi asks the roof’s age, the material and the homeowner’s timeline, then books an estimate.' },
      { q: 'What happens to a tarp request at night?', a: 'It follows your rules. If you tarp after hours, Remi transfers to the on-call crew lead. If you do not, Remi says so plainly and books the first morning slot.' },
      { q: 'Does it work with roofing CRMs?', a: 'ServiceTitan, Google Calendar and HubSpot are live, plus Zapier for other apps. Jobber and Housecall Pro are rolling out. If you run a roofing-specific CRM, ask Keres whether Zapier covers it.' },
    ],
    trade: {
      answer:
        '<strong>For roofing companies, Keres AI runs Remi</strong>, an AI receptionist that answers every call within two rings, 24/7, including the hours after a hailstorm. Remi asks your roofing questions (storm date, active leak, claim status, roof type) and books inspections into Google Calendar, HubSpot or ServiceTitan. Pricing is a monthly rate with included minutes and a per-minute rate after that, with no per-call fees. Keres sets it up for you.',
      painsH2: 'Why do roofers lose storm leads?',
      painsNote:
        'Roofers lose storm leads because storm demand arrives all at once. The same office that handles a normal Tuesday comfortably will miss dozens of calls the day after hail, and those are the homeowners with an insurance claim and a reason to hire quickly.',
      callH2: 'What a roofing call to Remi sounds like',
      call: [
        { who: 'Remi', line: 'Thanks for calling [your company], this is Remi.' },
        { who: 'Caller', line: 'We had hail Tuesday night and my neighbor says my shingles are damaged.' },
        { who: 'Remi', line: 'Is any water coming into the house right now?' },
        { who: 'Caller', line: 'No, it’s dry inside.' },
        { who: 'Remi', line: 'Good. Have you opened an insurance claim, and is an adjuster visit scheduled?' },
        { who: 'Caller', line: 'I called them yesterday. The adjuster comes next Friday.' },
        { who: 'Remi', line: 'Then let’s get an inspection in before Friday. I have Wednesday at 10 or Thursday at 2.' },
        { who: 'Caller', line: 'Wednesday at 10.' },
        { who: 'Remi', line: 'Booked. What’s the property address, and is it one story or two?' },
        { who: 'Caller', line: '31 Ridge Lane. Two stories.' },
      ],
      callNote:
        'No active leak, so this books as an inspection rather than a tarp call. The adjuster date goes into the job notes so the estimator sees the deadline.',
      emergencyH2: 'Which roofing calls are emergencies, and what does Remi do?',
      emergencyIntro:
        'You set the rules with Keres during setup; Remi follows them and nothing else. A typical roofing setup flags:',
      emergencyRules: [
        '<strong>Water coming into the living space</strong> during or after a storm. If you offer emergency tarping, the call goes to the on-call crew lead.',
        '<strong>A tree or debris through the roof</strong>, or a section of roof missing.',
        '<strong>A sagging or dripping ceiling.</strong> Remi tells the caller to keep people out of that room, then alerts on-call.',
        '<strong>Storm damage with no leak</strong> usually books as an inspection, not an emergency truck.',
        '<strong>An adjuster visit within a day or two</strong> can be set as priority booking rather than an emergency.',
        '<strong>Routine work</strong> (replacement estimates, gutters, maintenance) books into a normal slot.',
      ],
      emergencyNote:
        'Anything flagged is warm-transferred to the number you choose. If nobody answers, the crew lead gets a “call me now” alert with the address and what the caller described.',
      intakeH2: 'What does Remi ask a roofing caller?',
      intakeIntro: 'Your intake script decides. A typical roofing intake asks for:',
      intake: [
        { field: 'Name, callback number and property address', why: 'where the estimator is going' },
        { field: 'What happened and when', why: 'the storm date matters for the claim' },
        { field: 'Is water coming in?', why: 'decides tarp call or inspection' },
        { field: 'Claim status and adjuster date', why: 'so the inspection lands first' },
        { field: 'Roof type and stories', why: 'asphalt, metal, tile or flat; ladder setup' },
        { field: 'Owner or landlord', why: 'who signs the contract' },
        { field: 'Best inspection time', why: 'booked from your estimators’ calendars' },
      ],
      booksH2: 'What can Remi book for a roofing company?',
      softwareNote:
        'ServiceTitan is live, so a storm inspection lands as a job with the claim notes attached. If your estimators work from Google Calendar, Remi books there and logs the lead in HubSpot.',
      costH2: 'What does a missed roofing lead cost?',
      costBody:
        '<p>Keres AI estimates that a roof replacement is routinely worth $10,000 or more, and that the first company to inspect after a storm usually wins the job. The <a href="/benchmarks/roofing-lead-response">roofing lead-response benchmarks</a> explain those estimates and cite the published lead-response research behind them.</p><p>The cost lands on your best days: a storm sends many calls in a few hours, and every busy signal is a homeowner calling the next roofer. When price stalls a replacement, <a href="/use-cases/financing-follow-up">financing follow-up</a> keeps the lead moving.</p>',
      calculator: { href: '/tools/roofing-storm-lead-calculator', label: 'roofing storm-lead calculator' },
      compareH2: 'What should a roofer ask an AI receptionist vendor?',
      compareIntro: 'Questions worth asking before storm season, of Keres or anyone else:',
      checklist: [
        'Can it tell an active leak from an inspection request, on your rules?',
        'Does it capture the storm date, claim status and adjuster date?',
        'How does it handle your storm-week peak, and how are the included minutes sized for it?',
        'Does it book onto your estimators’ calendars, or only take a message?',
        'What languages does it answer in? Remi answers in English today.',
        'Is the per-minute rate after included minutes written into the quote?',
      ],
      priceH2: 'Is an AI receptionist a cheaper alternative to an answering service for a roofing company?',
      priceBody:
        `<p>An AI receptionist is usually the cheaper alternative to a live answering service for a roofing company, and it books the inspection instead of taking a message. Live answering services publish entry plans of $99 a month for 50 minutes (PATLive) and $250 a month for 50 minutes (Ruby). AI receptionists publish entry plans from $24.95 a month for 30 calls (Upfirst), $29 for 60 minutes (Dialzara), $49 for 250 minutes (Rosie) and $79 for 100 callers (Goodcall). Prices come from each vendor’s own pricing page, checked ${VENDORS_CHECKED}; see <a href="/ai-receptionist-cost">what an AI receptionist costs</a>.</p><p>For a roofer, the storm week matters more than the entry price: a 50-minute plan covers about 16 three-minute calls, so a hail day can run past it fast. Remi by Keres AI is quoted to your call volume, including storm season: a monthly rate with included minutes, then per minute, with no per-call fees. See <a href="/pricing">pricing</a>.</p>`,
      ctaHeading: 'Book the inspection before the other roofer does',
      ctaSub: 'Book a 30-minute call and hear Remi take a storm call with your claim questions.',
    },
  },
  {
    slug: 'towing',
    name: 'Towing Companies',
    nameLower: 'towing companies',
    short: 'Towing',
    shortLower: 'towing',
    title: 'AI Receptionist for Towing Companies | Keres AI',
    description:
      'Keres AI answers towing calls 24/7 in two rings, takes the location and vehicle details, and sends the job to your dispatcher on your rules.',
    intro:
      'In towing, a stranded driver dials the next company the moment a call goes unanswered. Remi by Keres AI answers in two rings, around the clock, takes the location and the vehicle, and gets the job to your dispatcher, so calls stop going to voicemail.',
    pains: [
      'Stranded drivers who call the next company on a busy line',
      'Nights and weekends with nobody in the office',
      'Ice storms and pileups that flood the line at once',
      'Drivers on a hook-up who can’t take the next call',
    ],
    books: [
      'Tows, jump-starts, lockouts and fuel delivery',
      'Scheduled transports and non-running vehicle pickups',
      'Accident-recovery calls sent to dispatch',
      'Impound and vehicle-release questions answered',
    ],
    faqs: [
      { q: 'Can an AI receptionist take tow calls at 2 a.m.?', a: 'Yes. Remi answers in two rings, 24/7, takes the location, vehicle and destination, and sends the job to your dispatcher or on-call driver the way your rules say.' },
      { q: 'How does Remi get a location a driver can use?', a: 'It asks for the road, the direction of travel, the nearest exit, mile marker or cross street, and a landmark, then reads it back to the caller before passing it on.' },
      { q: 'Can it handle motor-club and roadside-plan calls?', a: 'Remi asks which motor club or roadside plan the caller is using and notes it on the job, so your dispatcher can check coverage before the truck rolls.' },
      { q: 'Will it quote tow prices?', a: 'Only the prices you put in its script, such as a hook-up fee or a per-mile rate. Anything else goes to your dispatcher.' },
      { q: 'What about impound and vehicle-release calls?', a: 'Remi answers with the hours, documents and fees you give it. It does not release vehicles or make exceptions; those go to your office.' },
      { q: 'What happens on a night when many calls come in at once?', a: 'Your quote sizes Remi’s included minutes to your busy season, so plan it around your heaviest week, not an average one. Billing is a monthly rate with included minutes, then per minute, with no per-call fees. Ask on your first call how Remi handles your peak volume.' },
    ],
    trade: {
      answer:
        '<strong>Keres AI’s answer for towing companies is Remi</strong>, an AI receptionist that takes every call in two rings, 24/7, so a stranded driver gets an answer instead of voicemail. Remi asks your towing questions (exact location, vehicle and drive type, destination, motor club), sends urgent jobs to dispatch, and books scheduled tows into Google Calendar, HubSpot or ServiceTitan. Billing is a monthly rate with included minutes, then per-minute, with no per-call fees. Keres sets it up for you.',
      painsH2: 'Why do towing companies miss calls?',
      painsNote:
        'Towing is all urgent and mostly after hours. The calls you miss are rarely recoverable, because the driver on the shoulder has already called someone else by the time you call back.',
      callH2: 'What a towing call to Remi sounds like',
      call: [
        { who: 'Remi', line: '[Your company], this is Remi. Are you somewhere safe right now?' },
        { who: 'Caller', line: 'Yes, I’m on the shoulder. My car just died on Route 9.' },
        { who: 'Remi', line: 'Okay. Which direction are you headed, and what’s the nearest exit or mile marker?' },
        { who: 'Caller', line: 'Northbound, just past exit 14.' },
        { who: 'Remi', line: 'Thank you. What’s the vehicle, and is it all-wheel drive?' },
        { who: 'Caller', line: 'A 2019 Outback, so yes.' },
        { who: 'Remi', line: 'Then it needs a flatbed. Where would you like it taken?' },
        { who: 'Caller', line: 'To my mechanic in town.' },
        { who: 'Remi', line: 'Got it. I’ve sent this to dispatch with your location, and they’ll text you the driver’s arrival time.' },
      ],
      callNote:
        'Safety comes first in this example because the owner put it first in the script. The drive-type question decides flatbed or wheel-lift before the dispatcher assigns a truck.',
      emergencyH2: 'How does Remi prioritise towing calls?',
      emergencyIntro:
        'Nearly every tow call is urgent, so towing rules are about priority and safety rather than whether to dispatch. You set them with Keres during setup. A typical towing setup:',
      emergencyRules: [
        '<strong>Someone hurt, or a vehicle blocking a travel lane.</strong> Remi tells the caller to call 911 first, then sends the job to dispatch.',
        '<strong>A child or pet locked in a vehicle.</strong> Remi tells the caller to call 911, then alerts dispatch.',
        '<strong>A caller alone at night, with children, or in extreme weather</strong> goes to the top of the queue.',
        '<strong>Police or accident-scene requests</strong> go straight to the dispatcher you name.',
        '<strong>Scheduled transports and non-running pickups</strong> book into an open slot.',
        '<strong>Impound and release questions</strong> are answered from your script, not dispatched.',
      ],
      emergencyNote:
        'Urgent jobs are warm-transferred to your dispatcher or on-call driver. If the transfer is not picked up, Remi sends a “call me now” alert with the location and vehicle already written down.',
      intakeH2: 'What does Remi ask a towing caller?',
      intakeIntro: 'The script is yours. A typical towing intake asks:',
      intake: [
        { field: 'Is the caller safe?', why: 'asked before anything else' },
        { field: 'Exact location', why: 'road, direction, exit or mile marker, cross street, landmark' },
        { field: 'Vehicle year, make, model and colour', why: 'so the driver spots it' },
        { field: 'Drive type and whether it rolls', why: 'flatbed or wheel-lift' },
        { field: 'What happened', why: 'won’t start, flat, lockout, out of fuel, accident' },
        { field: 'Destination and passengers', why: 'where it goes and who needs a ride' },
        { field: 'Motor club, roadside plan or direct pay', why: 'so dispatch knows before the truck rolls' },
      ],
      booksH2: 'What can Remi handle for a towing company?',
      softwareNote:
        'Most towing dispatch runs on its own board, so Remi’s main job is getting the details to your dispatcher fast. Scheduled transports can book into ServiceTitan or Google Calendar, with every caller logged in HubSpot.',
      costH2: 'What does a missed towing call cost?',
      costBody:
        '<p>Keres AI has not published a towing benchmark, so this page gives no towing statistic. A missed tow call is the least recoverable kind: the driver on the shoulder will not wait for a callback.</p><p>The value depends on your mix of motor-club jobs, cash tows and accident recovery. Multiply missed calls a month by the share you would have run and your average ticket for each.</p>',
      calculator: { href: '/tools/missed-call-calculator', label: 'missed-call calculator' },
      compareH2: 'What should a towing company look for in an AI receptionist?',
      compareIntro: 'Questions to put to any vendor:',
      checklist: [
        'Does it ask about safety before anything else?',
        'Does it get a location precise enough for a driver at night?',
        'Does it ask drive type, so dispatch sends the right truck?',
        'Can it note motor-club and roadside-plan details for dispatch?',
        'How fast does the job reach your dispatcher, and by what channel?',
        'Is it billed per call, which adds up on an ice-storm night, or by the month?',
      ],
      ctaHeading: 'Answer the stranded driver on the first call',
      ctaSub: 'Book a 30-minute call and hear Remi take a roadside call with your dispatch rules.',
    },
  },
  {
    slug: 'septic',
    name: 'Septic Service Companies',
    nameLower: 'septic service companies',
    short: 'Septic',
    shortLower: 'septic',
    title: 'AI Receptionist for Septic Services | Keres AI',
    description:
      'Keres AI answers septic calls 24/7, books pumping and inspections, and sends backups and alarm calls to your crew on the rules you set.',
    intro:
      'A septic backup is a call homeowners make to whoever answers first. Remi by Keres AI picks up in two rings, books routine pumping, and sends an alarm or a backup to your crew on the rules you set, so calls stop going to voicemail.',
    pains: [
      'Backup calls missed while the crew is out on a truck',
      'Routine pumping calls nobody had time to return',
      'Real-estate inspection requests with a closing date attached',
      'Alarm calls at night with nobody on the phones',
    ],
    books: [
      'Routine pumping',
      'Real-estate transfer inspections',
      'Alarm and backup calls sent to the on-call crew',
      'Riser, lid and repair estimates',
    ],
    faqs: [
      { q: 'Can an AI receptionist handle septic backup calls?', a: 'Yes, on the rules you set during setup. A typical septic setup treats sewage in the house or surfacing in the yard as an emergency and warm-transfers it to the on-call crew, with a “call me now” alert if nobody picks up.' },
      { q: 'Does Remi book routine pumping?', a: 'Yes. Remi asks when the tank was last pumped, its size if known, and whether the lid is buried, then books a slot and texts the homeowner a confirmation.' },
      { q: 'Can it take real-estate inspection requests?', a: 'Yes. Remi asks for the closing date, who is paying, and the agent’s contact, and books the inspection with that deadline in the notes.' },
      { q: 'Does it send pumping reminders?', a: 'Remi records the last pump date. Reminders are the job of Theo, the Keres follow-up agent, or of your own system.' },
      { q: 'Does it know my service area?', a: 'Your script lists the towns or counties you serve. Callers outside them hear that plainly instead of getting booked for a visit you cannot make.' },
    ],
    trade: {
      answer:
        '<strong>Keres AI answers the phone for septic service companies</strong> with Remi, an AI receptionist that picks up every call in two rings, around the clock. Remi asks your septic intake questions (last pump date, system type, alarm or backup, closing date for inspections) and books pumping, inspections and urgent visits into Google Calendar, HubSpot or ServiceTitan. Keres bills a monthly rate with included minutes, then per-minute, with no per-call fees. Keres sets it up for you.',
      painsH2: 'Why do septic companies miss calls?',
      painsNote:
        'Septic work is small crews and long drives. The person who would answer the phone is usually the one running the truck, so calls pile up exactly when the business is busiest.',
      callH2: 'What a septic call to Remi sounds like',
      call: [
        { who: 'Remi', line: 'Thanks for calling [your company], this is Remi. How can I help?' },
        { who: 'Caller', line: 'The alarm on our septic system started beeping an hour ago.' },
        { who: 'Remi', line: 'Is the alarm light on as well, and are any drains backing up inside?' },
        { who: 'Caller', line: 'The light’s on. Drains are fine so far.' },
        { who: 'Remi', line: 'Until a technician checks it, keep water use low: no laundry, dishwasher or long showers. What’s the property address?' },
        { who: 'Caller', line: '9 Mill Pond Road.' },
        { who: 'Remi', line: 'Do you know when the tank was last pumped?' },
        { who: 'Caller', line: 'Maybe three years ago.' },
        { who: 'Remi', line: 'Thank you. I’m sending this to the on-call technician as an alarm call. You’ll get a text when they confirm a time.' },
      ],
      callNote:
        'In this example the owner’s script includes the water-use advice and treats any alarm as on-call work. A shop that handles alarms next morning would have Remi book the first slot instead.',
      emergencyH2: 'Which septic calls are emergencies?',
      emergencyIntro:
        'You decide, with Keres, during setup, and Remi follows those rules. A typical septic setup flags:',
      emergencyRules: [
        '<strong>Sewage backing up into the house</strong>, or surfacing in the yard near the tank or drain field.',
        '<strong>A high-water or pump alarm</strong> on an aerobic or pump system. A typical script asks the caller to cut water use until the crew arrives.',
        '<strong>Every drain in the house slow at once.</strong>',
        '<strong>A real-estate inspection with a near closing date</strong> is usually priority booking rather than an emergency.',
        '<strong>Routine pumping, riser installs and estimates</strong> book into a normal slot.',
      ],
      emergencyNote:
        'Flagged calls are warm-transferred to the on-call crew. If nobody answers, Remi sends a “call me now” alert with the address, the symptoms and the last pump date.',
      intakeH2: 'What does Remi ask a septic caller?',
      intakeIntro: 'Your script decides. A typical septic intake covers:',
      intake: [
        { field: 'Name, callback number and property address', why: 'where the truck is going' },
        { field: 'Where the tank is, if known', why: 'and whether the lid is buried or on a riser' },
        { field: 'Last pump date and tank size', why: 'so the crew brings the right truck' },
        { field: 'System type', why: 'conventional, aerobic, mound or pump' },
        { field: 'Symptoms', why: 'alarm, slow drains, odour, backup, wet ground' },
        { field: 'Reason for the call', why: 'routine pumping, inspection with a closing date, or a problem' },
        { field: 'Access', why: 'gates, dogs, where the truck can park' },
      ],
      booksH2: 'What can Remi book for a septic company?',
      softwareNote:
        'Remi writes septic jobs into ServiceTitan, or books Google Calendar and logs the caller in HubSpot. Zapier can carry the last pump date into another system you use.',
      costH2: 'What does a missed septic call cost?',
      costBody:
        '<p>Keres AI has not published a septic benchmark, so this page gives no septic statistic. What a missed call costs depends on the kind of call: a missed routine pumping call may come back later, while a backup call goes to whoever answers.</p><p>Septic customers also come back. A household you pump today will need pumping again, and it is far more likely to call you if it has your number.</p>',
      calculator: { href: '/tools/missed-call-calculator', label: 'missed-call calculator' },
      compareH2: 'What matters in an answering service for septic companies?',
      compareIntro: 'Use this list in any demo, including ours:',
      checklist: [
        'Does it ask the last pump date and system type?',
        'Can it tell an alarm or a backup from a routine pumping call?',
        'Can it book real-estate inspections against a closing date?',
        'Does it know your service area and say no politely outside it?',
        'Does it write the job somewhere your crew already looks?',
        'Is it billed per call or by the month with included minutes?',
      ],
      ctaHeading: 'Answer septic calls while the crew is on the truck',
      ctaSub: 'Book a 30-minute call and hear Remi take an alarm call with your rules.',
    },
  },
];

/**
 * Industry pages that duplicated an /industries/* hub (same searcher, near-identical
 * title) and were merged into it. The old URLs redirect (astro.config.mjs).
 */
export const mergedIndustries: Record<string, string> = {
  'real-estate': '/industries/real-estate',
  'professional-intake': '/industries/law-firms',
  dentists: '/industries/dental-med-spa',
  'med-spas': '/industries/dental-med-spa',
};
/** The industry pages that still build. */
export const industries: Industry[] = allIndustries.filter((i) => !(i.slug in mergedIndustries));
