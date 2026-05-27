// Data-driven industry receptionist pages. Add an entry → a new page builds.
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
}

export const industries: Industry[] = [
  {
    slug: 'hvac',
    name: 'HVAC Companies',
    nameLower: 'HVAC companies',
    short: 'HVAC',
    shortLower: 'HVAC',
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
    nameLower: 'plumbing companies',
    short: 'Plumbers',
    shortLower: 'plumbers',
    title: 'AI Receptionist for Plumbers | Keres AI',
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
      { q: 'Is it HIPAA-aware?', a: 'Keres can be configured for HIPAA-aligned workflows, signs DPAs, and respects data-handling requirements. Discuss specifics on your demo.' },
      { q: 'Does it handle insurance questions?', a: 'Keres answers common questions, captures insurance details for intake, and routes anything that needs your team.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Teams',
    nameLower: 'real estate teams',
    short: 'Real Estate',
    shortLower: 'real estate',
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
  {
    slug: 'med-spas',
    name: 'Med Spas & Wellness Clinics',
    nameLower: 'med spas and wellness clinics',
    short: 'Med Spas',
    shortLower: 'med spa',
    title: 'AI Receptionist for Med Spas — Book More Treatments | Keres AI',
    description:
      'Keres AI answers every med spa call 24/7, books treatments and consultations, and handles intake forms — so your front desk never misses a booking, even at peak hours.',
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
    title: 'AI Receptionist for Law Firms & Professional Services | Keres AI',
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
      { q: 'How does it protect confidential information?', a: 'Keres can be configured for SOC 2-aligned workflows, signs DPAs, and never uses your data to train third-party models. Discuss compliance specifics on your demo.' },
    ],
  },
  {
    slug: 'roofing',
    name: 'Roofing Companies',
    nameLower: 'roofing companies',
    short: 'Roofing',
    shortLower: 'roofing',
    title: 'AI Receptionist for Roofers — Never Lose a Storm Lead | Keres AI',
    description:
      'Keres AI answers every roofing call 24/7, books estimates and inspections, and captures storm-season surges the moment they call — before a competitor answers first.',
    intro:
      'Storm seasons create call surges that overwhelm even the best front desks — and every missed call during a hailstorm or hurricane is a five-figure job handed to a competitor. Keres answers in two rings, books the estimate, and flags emergency tarp jobs to your crew immediately.',
    pains: [
      'Hailstorm and hurricane call surges your office cannot absorb',
      'After-hours storm damage calls going unanswered while competitors pick up',
      'Insurance inspection leads lost during the first critical hours after a storm',
      'Estimators in the field missing inbound calls during the busiest days',
    ],
    books: [
      'Storm damage estimates and inspections',
      'Insurance inspection appointments',
      'Repair and replacement scheduling',
      'Emergency tarp and board-up dispatch',
    ],
    faqs: [
      { q: 'Can the AI receptionist handle a storm-season call surge?', a: 'Yes — Keres answers unlimited simultaneous calls, so a hailstorm or hurricane never sends a caller to voicemail. Every storm lead gets booked before a competitor answers.' },
      { q: 'Does it capture insurance claim leads?', a: 'Yes. Keres qualifies the damage type, captures the address and contact details, and books the inspection appointment — everything your estimator needs in their calendar.' },
      { q: 'Does it work with field-service software?', a: 'Yes — Keres integrates with ServiceTitan, Jobber, and Housecall Pro, pushing new jobs and customer records automatically.' },
    ],
  },
  {
    slug: 'towing',
    name: 'Towing Companies',
    nameLower: 'towing companies',
    short: 'Towing',
    shortLower: 'towing',
    title: 'AI Receptionist for Towing — 24/7 Dispatch Answering | Keres AI',
    description:
      'Keres AI answers every towing call 24/7, captures roadside assistance requests, and dispatches your drivers — so no stranded motorist ever calls a competitor.',
    intro:
      'In towing, every call is urgent — a stranded driver dials the next company the moment a call goes unanswered. Keres answers in two rings around the clock, captures the location and situation, and gets the job to your dispatcher immediately, day or night.',
    pains: [
      'Stranded motorists who immediately call a competitor when the line is busy',
      'After-hours dispatch gaps when the office is closed',
      'High call volume during bad weather or accidents overwhelming the front desk',
      'Drivers missing inbound calls while running another job',
    ],
    books: [
      'Roadside assistance and tow requests',
      'Dispatch alerts to the on-call driver',
      'Lockout, jump-start, and fuel-delivery bookings',
      'Accident recovery and impound intake',
    ],
    faqs: [
      { q: 'Can the AI handle emergency tow requests?', a: 'Yes — Keres captures the location, vehicle type, and situation, flags the job as an emergency to your dispatcher by text, and keeps the motorist informed until help is confirmed.' },
      { q: 'Does it cover 24/7 dispatch?', a: 'Keres answers around the clock — including nights, weekends, and holidays — so your towing business never misses a call at 2 AM when stranded motorists need you most.' },
      { q: 'Can it handle high call volume during bad weather?', a: 'Yes — Keres answers unlimited simultaneous calls, so ice storms, accidents, and high-volume nights never overwhelm your dispatch line.' },
    ],
  },
  {
    slug: 'septic',
    name: 'Septic Service Companies',
    nameLower: 'septic service companies',
    short: 'Septic',
    shortLower: 'septic',
    title: 'AI Receptionist for Septic Services | Keres AI',
    description:
      'Keres AI answers every septic call 24/7, books pumping and inspection appointments, and dispatches emergency backups instantly. Never lose a job to voicemail.',
    intro:
      'Septic backups are emergencies — homeowners call whoever picks up first. Keres answers every call in two rings, books routine pumping appointments, and dispatches your crew immediately when an emergency comes in, so every job stays yours.',
    pains: [
      'Emergency backup calls missed while crews are in the field',
      'Routine pumping reminders and bookings falling through',
      'Callers hiring a competitor because no one answered',
      'After-hours emergencies with no dispatch coverage',
    ],
    books: [
      'Routine pumping and inspection appointments',
      'Emergency backup and overflow dispatch',
      'System inspection and repair scheduling',
      'Maintenance reminder follow-ups',
    ],
    faqs: [
      { q: 'Can it handle septic emergency calls?', a: 'Yes. Keres identifies backup and overflow emergencies, captures the address and details, books the dispatch, and texts your on-call crew immediately.' },
      { q: 'Does it send maintenance reminders?', a: 'Keres captures customer information and service history so you can trigger pumping reminders — typically every 2–3 years — to keep your schedule full year-round.' },
      { q: 'Does it integrate with field-service software?', a: 'Yes — Keres integrates with Jobber, Housecall Pro, ServiceTitan, and generic webhooks so jobs sync to your existing system automatically.' },
    ],
  },
];
