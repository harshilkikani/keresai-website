// Data-driven industry receptionist pages. Add an entry → a new page builds.
export interface Industry {
  slug: string; // e.g. "hvac" -> /ai-receptionist-for-hvac
  name: string; // display, e.g. "HVAC Companies"
  short: string; // e.g. "HVAC"
  title: string;
  description: string;
  intro: string;
  pains: string[];
  books: string[];
  faqs: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    slug: 'hvac',
    name: 'HVAC Companies',
    short: 'HVAC',
    title: 'AI Receptionist for HVAC — Book More Service Calls | Keres AI',
    description:
      'Keres AI answers every HVAC call 24/7, books service and install appointments, and flags no-heat/no-cool emergencies to your team. Stop losing jobs to voicemail.',
    intro:
      'HVAC demand spikes in heat waves and cold snaps — exactly when your team can’t pick up fast enough. Keres answers every call in two rings, books the service call, and texts your dispatcher the moment an emergency comes in.',
    pains: [
      'Peak-season call volume your office can’t answer fast enough',
      'After-hours no-heat and no-cool emergencies going to voicemail',
      'Techs in the field missing the next booking',
      'Per-minute answering services that just take a message',
    ],
    books: [
      'Service and repair appointments',
      'Maintenance and tune-up scheduling',
      'Emergency dispatch alerts to the owner',
      'Seasonal maintenance reminders',
    ],
    faqs: [
      { q: 'Can the AI receptionist handle HVAC emergencies?', a: 'Yes. Keres recognizes no-heat, no-cool, and gas-smell emergencies, captures the address and details, and texts your on-call tech or dispatcher immediately while booking the visit.' },
      { q: 'Does it integrate with ServiceTitan or Housecall Pro?', a: 'Yes. Keres syncs jobs, customers, and calls with ServiceTitan, Housecall Pro, Jobber, FieldEdge, and Service Fusion, plus generic webhooks.' },
      { q: 'Will it handle peak-season call volume?', a: 'Yes — Keres answers unlimited simultaneous calls, so a heat wave never sends a caller to voicemail.' },
    ],
  },
  {
    slug: 'plumbers',
    name: 'Plumbing Companies',
    short: 'Plumbers',
    title: 'AI Receptionist for Plumbers — Never Miss a Service Call | Keres AI',
    description:
      'Keres AI answers every plumbing call 24/7, books service appointments, and flags burst pipes and floods to your team instantly. Capture every job, day or night.',
    intro:
      'Plumbing emergencies don’t wait for business hours. Keres answers every call around the clock, books the job, and alerts your on-call plumber the second a flood or burst pipe comes in — so the work goes to you, not the next number on the list.',
    pains: [
      'After-hours emergencies going to voicemail',
      'Missed calls while your plumbers are on a job',
      'Callers hiring the next plumber who actually picks up',
      'No coverage on nights, weekends, and holidays',
    ],
    books: [
      'Emergency and standard service calls',
      'Drain, water-heater, and repair appointments',
      'On-call dispatch alerts for emergencies',
      'Follow-up and quote scheduling',
    ],
    faqs: [
      { q: 'Can it dispatch emergency plumbing calls?', a: 'Yes. Keres identifies emergencies like floods and burst pipes, captures the details, books the visit, and texts your on-call plumber immediately.' },
      { q: 'Does it work with my scheduling software?', a: 'Yes — Keres integrates with Jobber, Housecall Pro, ServiceTitan, Service Fusion, and more, plus Google Calendar and Outlook.' },
      { q: 'How fast does it answer?', a: 'Every call is answered within two rings, 24/7, including nights and weekends.' },
    ],
  },
  {
    slug: 'dentists',
    name: 'Dental Practices',
    short: 'Dentists',
    title: 'AI Receptionist for Dental Practices — Book More Patients | Keres AI',
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
      { q: 'Is it HIPAA-aware?', a: 'Keres can be configured for HIPAA-aligned workflows, signs DPAs, and respects data-handling requirements. Discuss specifics on your demo.' },
      { q: 'Does it handle insurance questions?', a: 'Keres answers common questions, captures insurance details for intake, and routes anything that needs your team.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Teams',
    short: 'Real Estate',
    title: 'AI Receptionist for Real Estate — Capture Every Lead | Keres AI',
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
];
