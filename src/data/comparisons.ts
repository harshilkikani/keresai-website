// Data-driven comparison pages. Add an entry → a new /{competitor}-alternative page builds.
export interface Comparison {
  slug: string; // full URL segment, e.g. "apollo-alternative"
  competitor: string;
  category: string;
  /** Drives breadcrumb parent + secondary CTA: inbound → AI Receptionist, outbound → AI SDR. */
  pillar: 'inbound' | 'outbound';
  title: string;
  description: string;
  h1Accent: string;
  intro: string;
  rows: { feature: string; keres: string; them: string }[];
  faqs: { q: string; a: string }[];
  /**
   * Turns the page into an honest roundup of alternatives (keys of
   * answeringVendors), with Keres as one labelled row. The sourced roundup
   * table replaces the Keres-vs-them feature table on these pages.
   */
  roundup?: string[];
}

export const comparisons: Comparison[] = [
  {
    slug: 'apollo-alternative',
    competitor: 'Apollo',
    category: 'Prospecting & outbound',
    pillar: 'outbound',
    title: 'The Best Apollo Alternative for Booked Meetings | Keres AI',
    description:
      'Looking for an Apollo alternative? Keres AI combines outbound, deliverability, and AI booking in one platform that books meetings for you. See the full comparison.',
    h1Accent: 'Apollo',
    intro:
      'Apollo is great for finding contacts. But finding contacts is not the same as booking meetings. Keres is an AI SDR that takes outbound the rest of the way — personalizing at scale, managing deliverability, handling replies, and booking qualified meetings on your calendar.',
    rows: [
      { feature: 'Prospect database', keres: 'Yes', them: 'Yes' },
      { feature: 'AI-personalized sequences', keres: 'Yes', them: 'Limited' },
      { feature: 'Deliverability managed (SPF/DKIM/DMARC + warmup)', keres: 'Yes', them: 'No' },
      { feature: 'AI replies to and books meetings', keres: 'Yes', them: 'No' },
      { feature: 'Inbound AI receptionist included', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Apollo alternative?', a: 'Yes — especially if your goal is booked meetings, not just a contact list. Keres runs the full outbound motion, manages deliverability, handles replies, and books meetings, which Apollo leaves to you.' },
      { q: 'Can I switch from Apollo to Keres?', a: 'Yes. We migrate your sequences and lists during onboarding, set up authentication and warmup, and have you sending within five business days.' },
      { q: 'Does Keres replace Apollo entirely?', a: 'For outbound execution and booking, yes. Keres handles targeting, sending, deliverability, replies, and scheduling end to end.' },
    ],
  },
  {
    slug: 'instantly-alternative',
    competitor: 'Instantly',
    category: 'Cold email sending',
    pillar: 'outbound',
    title: 'The Best Instantly Alternative — Books Meetings | Keres',
    description:
      'Searching for an Instantly alternative? Keres AI adds AI personalization, reply handling, and meeting booking on top of deliverability and sending. See the comparison.',
    h1Accent: 'Instantly',
    intro:
      'Instantly sends cold email and warms inboxes well. Keres does that too — and then keeps going: AI personalization at scale, automatic reply handling, and meetings booked straight to your calendar, plus an inbound AI receptionist.',
    rows: [
      { feature: 'Inbox warmup', keres: 'Yes', them: 'Yes' },
      { feature: 'Cold email sending at scale', keres: 'Yes', them: 'Yes' },
      { feature: 'AI-personalized copy per prospect', keres: 'Yes', them: 'Limited' },
      { feature: 'AI replies to and books meetings', keres: 'Yes', them: 'No' },
      { feature: 'Inbound AI receptionist included', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Instantly alternative?', a: 'Yes. Keres covers sending and warmup like Instantly, then adds AI personalization, reply handling, and booking so meetings end up on your calendar without manual work.' },
      { q: 'Does Keres handle deliverability like Instantly?', a: 'Yes — SPF, DKIM, DMARC, warmup, volume ramp, and list hygiene are all managed for you.' },
      { q: 'Can I migrate my Instantly campaigns?', a: 'Yes, we migrate campaigns and inboxes during onboarding and typically have you live within five business days.' },
    ],
  },
  {
    slug: 'smartlead-alternative',
    competitor: 'Smartlead',
    category: 'Cold email infrastructure',
    pillar: 'outbound',
    title: 'The Best Smartlead Alternative — AI SDR | Keres',
    description:
      'Need a Smartlead alternative? Keres AI is a done-for-you AI SDR — sending, deliverability, AI personalization, reply handling, and booked meetings in one platform.',
    h1Accent: 'Smartlead',
    intro:
      'Smartlead gives you powerful cold-email infrastructure to run yourself. Keres is the done-for-you version: we run the infrastructure, the AI writes and personalizes, handles replies, and books the meetings — so you get outcomes, not just tooling.',
    rows: [
      { feature: 'Unlimited inboxes / sending', keres: 'Yes', them: 'Yes' },
      { feature: 'Deliverability + warmup', keres: 'Yes', them: 'Yes' },
      { feature: 'AI personalization at scale', keres: 'Yes', them: 'Limited' },
      { feature: 'AI replies to and books meetings', keres: 'Yes', them: 'No' },
      { feature: 'Inbound AI receptionist included', keres: 'Yes', them: 'No' },
      { feature: 'Fully managed, done-for-you', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Smartlead alternative?', a: 'Yes, particularly if you want results without running the tooling yourself. Keres manages the infrastructure and uses AI to personalize, reply, and book meetings for you.' },
      { q: 'Do I have to manage sending myself?', a: 'No. Unlike self-serve tools, Keres is done-for-you — we handle setup, sending, deliverability, and optimization.' },
      { q: 'How fast can I switch from Smartlead?', a: 'Most teams are live on Keres within five business days, including migration and warmup.' },
    ],
  },
  {
    slug: 'smith-ai-alternative',
    competitor: 'Smith.ai',
    category: 'Virtual receptionist & answering service',
    pillar: 'inbound',
    title: 'Smith.ai Alternatives Compared (2026): Prices & Billing | Keres AI',
    description: 'Eight Smith.ai alternatives side by side: human, AI or hybrid, how each bills (per call, minute or caller), and the lowest published price.',
    h1Accent: 'Smith.ai',
    intro: 'Smith.ai pairs AI with live receptionists and bills per call. If you are comparing alternatives, the real differences are who answers (a person, AI or both) and how you are billed. Here are the main options with the prices each vendor publishes, and where Keres fits.',
    roundup: ['Ruby', 'PATLive', 'Abby Connect', 'Goodcall', 'Rosie', 'Dialzara', 'Upfirst', 'My AI Front Desk'],
    rows: [
      { feature: 'Answers 24/7', keres: 'Yes', them: 'Yes' },
      { feature: 'No per-call fees', keres: 'Yes', them: 'No' },
      { feature: 'Unlimited simultaneous calls', keres: 'Yes', them: 'Limited' },
      { feature: 'Books appointments live on your calendar', keres: 'Yes', them: 'Limited' },
      { feature: 'Industry-tuned call flows', keres: 'Yes', them: 'Yes' },
      { feature: 'Outbound email worker available (Sol, priced separately)', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Smith.ai alternative?', a: 'Yes — especially if per-call or per-conversation billing is getting expensive. Keres answers every call 24/7 on one monthly rate with included minutes and books appointments directly on your calendar.' },
      { q: 'Does Keres use humans like Smith.ai?', a: 'Keres is AI-first: the AI handles calls end to end and escalates to your team by text when something needs a human, so you get 24/7 coverage without per-call human fees.' },
      { q: 'How is pricing different from Smith.ai?', a: 'Keres charges one monthly rate with a pool of included minutes and no per-call charge; past the pool you pay per minute at your quoted rate. See /pricing.' },
    ],
  },
  {
    slug: 'ruby-alternative',
    competitor: 'Ruby',
    category: 'Virtual receptionist service',
    pillar: 'inbound',
    title: 'Ruby Receptionist Alternatives Compared (2026): Prices | Keres AI',
    description: 'Eight Ruby Receptionists alternatives side by side: live, AI or hybrid answering, how each one bills, and the lowest published price, plus where Keres AI fits.',
    h1Accent: 'Ruby',
    intro: 'Ruby answers calls with live, US-based receptionists on monthly plans with included minutes. If you are weighing alternatives, the choice comes down to people, AI or both, and how you want to be billed. Here are the main options with the prices each vendor publishes, and where Keres fits.',
    roundup: ['Smith.ai', 'PATLive', 'Abby Connect', 'Goodcall', 'Rosie', 'Dialzara', 'Upfirst', 'My AI Front Desk'],
    rows: [
      { feature: 'Answers 24/7', keres: 'Yes', them: 'Yes' },
      { feature: 'Unlimited simultaneous calls', keres: 'Yes', them: 'No' },
      { feature: 'Books & reschedules on your calendar', keres: 'Yes', them: 'Limited' },
      { feature: 'Captures leads to your CRM', keres: 'Yes', them: 'Yes' },
      { feature: 'Outbound email worker available (Sol, priced separately)', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Ruby alternative?', a: 'Yes, particularly if you want round-the-clock coverage. Keres answers every call 24/7 with AI and books appointments during the call.' },
      { q: "Will an AI receptionist sound as friendly as Ruby's humans?", a: "Keres uses natural-sounding voice AI tuned to your brand's tone, holds real conversations, and escalates to your team when a human is genuinely needed." },
      { q: 'Does Keres cover after-hours and weekends?', a: 'Yes — 24/7, including nights, weekends, and holidays, at no extra after-hours rate.' },
    ],
  },
  {
    slug: 'goodcall-alternative',
    competitor: 'Goodcall',
    category: 'AI phone agent',
    pillar: 'inbound',
    title: 'Goodcall Alternatives Compared (2026): AI Receptionist Prices | Keres AI',
    description: 'Seven Goodcall alternatives side by side: AI, human or hybrid, how each bills (per caller, call or minute), and the lowest published price.',
    h1Accent: 'Goodcall',
    intro: 'Goodcall is a self-serve AI phone agent billed by unique caller. If you are comparing alternatives, the differences are setup (do it yourself or done for you), who answers, and how billing works. Here are the main options with the prices each vendor publishes, and where Keres fits.',
    roundup: ['Smith.ai', 'Rosie', 'Dialzara', 'Upfirst', 'My AI Front Desk', 'Ruby', 'PATLive'],
    rows: [
      { feature: 'AI answers 24/7', keres: 'Yes', them: 'Yes' },
      { feature: 'Done-for-you setup & tuning', keres: 'Yes', them: 'No' },
      { feature: 'Books appointments on your calendar', keres: 'Yes', them: 'Limited' },
      { feature: 'ServiceTitan integration', keres: 'Yes', them: 'Varies' },
      { feature: 'Emergency escalation to your team', keres: 'Yes', them: 'Limited' },
      { feature: 'Outbound email worker available (Sol, priced separately)', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: "Is Keres a good Goodcall alternative?", a: "Yes — especially if you'd rather not build and maintain the agent yourself. Keres is fully managed: we configure call flows, integrations, and tuning, and book appointments for you." },
      { q: 'Do I have to set up Keres myself?', a: 'No. Unlike self-serve tools, Keres is done-for-you — most accounts are live within five business days.' },
      { q: 'Does Keres integrate with my field-service software?', a: 'ServiceTitan, Google Calendar and HubSpot today, plus Zapier. Jobber and Housecall Pro are rolling out.' },
    ],
  },
  {
    slug: 'rosie-alternative',
    competitor: 'Rosie',
    category: 'AI answering service',
    pillar: 'inbound',
    title: 'Rosie Alternatives Compared (2026): AI Answering Prices | Keres AI',
    description: 'Six Rosie alternatives side by side: AI, human or hybrid, how each one bills, and the lowest published price, plus where Keres AI fits.',
    h1Accent: 'Rosie',
    intro: 'Rosie is a low-cost AI answering service on monthly plans with included minutes. If you are comparing alternatives, the differences are price per minute or call, who answers, and how much setup you want to do yourself. Here are the main options with the prices each vendor publishes, and where Keres fits.',
    roundup: ['Goodcall', 'Dialzara', 'Upfirst', 'My AI Front Desk', 'Smith.ai', 'PATLive'],
    rows: [
      { feature: 'Answers calls 24/7', keres: 'Yes', them: 'Yes' },
      { feature: 'Books & reschedules on your calendar', keres: 'Yes', them: 'Limited' },
      { feature: 'CRM & field-service integrations', keres: 'Yes', them: 'Limited' },
      { feature: 'Industry-tuned call flows', keres: 'Yes', them: 'Limited' },
      { feature: 'Done-for-you setup', keres: 'Yes', them: 'No' },
      { feature: 'Outbound email worker available (Sol, priced separately)', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Rosie alternative?', a: 'Yes, if you want more than basic answering. Keres books appointments, integrates with your CRM and field-service tools, escalates emergencies, and adds outbound — all done for you.' },
      { q: "What does Keres do that a basic answering service doesn't?", a: 'It completes the job: live appointment booking, deep integrations, lead qualification, emergency escalation, and AI outbound, instead of just taking a message.' },
    ],
  },
  {
    slug: 'dialpad-alternative',
    competitor: 'Dialpad',
    category: 'Business phone & AI contact center',
    pillar: 'inbound',
    title: 'The Best Dialpad Alternative for Booking Calls | Keres AI',
    description:
      'Looking at Dialpad alternatives? Keres AI is a done-for-you AI receptionist that answers and books every call — purpose-built for booking appointments, not enterprise telephony.',
    h1Accent: 'Dialpad',
    intro:
      'Dialpad is a full business-phone and AI contact-center platform built for larger teams. Keres is purpose-built for one outcome: answering every call and booking the appointment, fully managed for service businesses — without the cost and complexity of an enterprise phone system.',
    rows: [
      { feature: 'AI answers & books appointments', keres: 'Yes', them: 'Limited' },
      { feature: 'Purpose-built for service businesses', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup (live in ~5 days)', keres: 'Yes', them: 'No' },
      { feature: 'Field-service integrations', keres: 'Yes', them: 'Limited' },
      { feature: 'Outbound email worker available (Sol, priced separately)', keres: 'Yes', them: 'Limited' },
    ],
    faqs: [
      { q: 'Is Keres a good Dialpad alternative?', a: 'Yes — if your goal is answering and booking every call rather than running an enterprise phone system. Keres is a focused, done-for-you AI receptionist for service businesses.' },
      { q: 'Can I keep my existing phone number?', a: "Yes. You point your existing number at Keres; there's no need to rip out your phone system." },
    ],
  },
  {
    slug: 'answering-legal-alternative',
    competitor: 'AnsweringLegal',
    category: 'Legal answering service',
    pillar: 'inbound',
    title: 'AnsweringLegal Alternatives Compared (2026): Prices | Keres AI',
    description: 'Five AnsweringLegal alternatives for law firms side by side: live, AI or hybrid answering, how each bills, and the lowest published price.',
    h1Accent: 'AnsweringLegal',
    intro: 'AnsweringLegal answers for law firms only, with US-based receptionists; it does not publish prices. If you are comparing alternatives, the choice is live receptionists, AI, or both, and how you are billed. Here are the main options with the prices each vendor publishes, and where Keres fits.',
    roundup: ['Smith.ai', 'Ruby', 'PATLive', 'Abby Connect', 'Upfirst'],
    rows: [
      { feature: 'Answers calls 24/7', keres: 'Yes', them: 'Yes' },
      { feature: 'Conflict screening questions', keres: 'Yes', them: 'Limited' },
      { feature: 'Books consultations on your calendar', keres: 'Yes', them: 'Message-only' },
      { feature: 'Handles unlimited simultaneous calls', keres: 'Yes', them: 'No' },
      { feature: 'CRM / case management sync', keres: 'Yes', them: 'Limited' },
    ],
    faqs: [
      { q: 'Is Keres a good AnsweringLegal alternative for law firms?', a: 'Yes — especially for firms that want live calendar booking and unlimited simultaneous calls. Keres handles conflict screening and case-type qualification during the call, then books the consultation directly.' },
      { q: 'Can an AI receptionist handle legal intake?', a: 'Yes. Keres is trained on your practice areas, asks the intake questions your firm requires, screens for conflicts, and routes urgent calls to on-call attorneys immediately.' },
    ],
  },
  {
    slug: 'numa-alternative',
    competitor: 'Numa',
    category: 'AI phone agent for small business',
    pillar: 'inbound',
    title: 'The Best Numa Alternative — Books the Job | Keres',
    description:
      'Looking for a Numa alternative? Keres AI answers every call in two rings, qualifies leads, and books appointments live on your calendar — purpose-built for service businesses.',
    h1Accent: 'Numa',
    intro:
      'Numa is an AI phone agent focused on text-based interactions and missed-call deflection. Keres goes further: it answers every call live, qualifies the caller, books the appointment on your calendar during the conversation, and dispatches emergencies by text — with full field-service integrations.',
    rows: [
      { feature: 'Answers every call live (not just texts)', keres: 'Yes', them: 'Limited' },
      { feature: 'Books appointments during the call', keres: 'Yes', them: 'No' },
      { feature: 'ServiceTitan integration', keres: 'Yes', them: 'Varies' },
      { feature: 'Emergency dispatch alerts', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup (live in ~5 days)', keres: 'Yes', them: 'Self-serve' },
    ],
    faqs: [
      { q: 'Is Keres a better Numa alternative for home services?', a: 'For businesses that need live appointment booking and field-service integrations, yes. Keres answers calls and books jobs directly in ServiceTitan, and Housecall Pro — Numa focuses on text and missed-call deflection.' },
      { q: 'Does Keres answer calls or just text back?', a: 'Keres answers live — a real AI voice picks up within two rings, qualifies the caller, and books the appointment during the call. Text follow-up is also sent as a confirmation.' },
    ],
  },
  {
    slug: 'openphone-alternative',
    competitor: 'OpenPhone',
    category: 'Business phone system',
    pillar: 'inbound',
    title: 'The Best OpenPhone Alternative | Keres AI',
    description:
      'Looking for an OpenPhone alternative? Keres AI is a done-for-you AI receptionist that answers every call 24/7 and books appointments — not just a shared phone inbox.',
    h1Accent: 'OpenPhone',
    intro:
      'OpenPhone is a team phone and messaging platform for routing and responding to calls. Keres is an AI receptionist that handles the call end to end — answering in two rings, qualifying the lead, booking the appointment, and pushing a summary to your CRM — without a human having to pick up.',
    rows: [
      { feature: 'AI answers calls automatically 24/7', keres: 'Yes', them: 'No' },
      { feature: 'Books appointments during the call', keres: 'Yes', them: 'No' },
      { feature: 'Lead qualification and CRM sync', keres: 'Yes', them: 'Limited' },
      { feature: 'Field-service integrations', keres: 'Yes', them: 'No' },
      { feature: 'No per-seat pricing', keres: 'Yes', them: 'No' },
      { feature: 'Team phone inbox', keres: 'No', them: 'Yes' },
    ],
    faqs: [
      { q: 'Is Keres a good OpenPhone alternative?', a: 'If you want calls answered and appointments booked automatically, yes. OpenPhone is a team communication tool; Keres is a fully autonomous AI receptionist. They serve different goals — Keres replaces voicemail and after-hours gaps, not your internal team phone system.' },
      { q: 'Can Keres forward calls to my team?', a: 'Yes — after qualifying, Keres can transfer hot leads or emergencies to your on-call team member or owner.' },
    ],
  },
  {
    slug: 'calendly-alternative',
    competitor: 'Calendly',
    category: 'Online scheduling tool',
    pillar: 'inbound',
    title: 'The Best Calendly Alternative for Inbound Calls | Keres AI',
    description:
      'Calendly handles online self-scheduling. Keres AI handles inbound calls — answering every call 24/7, qualifying the caller, and booking the appointment in real time without a link.',
    h1Accent: 'Calendly',
    intro:
      'Calendly is an online self-scheduling link for callers who are already online. Keres fills the gap Calendly cannot: answering every inbound phone call 24/7, qualifying the caller by voice, and booking the appointment in real time — for the majority of service customers who pick up the phone rather than filling out a form.',
    rows: [
      { feature: 'Answers inbound phone calls 24/7', keres: 'Yes', them: 'No' },
      { feature: 'Books during the call (no link required)', keres: 'Yes', them: 'No' },
      { feature: 'Lead qualification before booking', keres: 'Yes', them: 'No' },
      { feature: 'Online self-scheduling link', keres: 'No', them: 'Yes' },
      { feature: 'Field-service integrations', keres: 'Yes', them: 'Limited' },
      { feature: 'Emergency call routing', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres better than Calendly for service businesses?', a: 'They solve different problems. Calendly is for online booking when a prospect is already on your website. Keres handles inbound phone calls — the primary booking channel for HVAC, plumbing, roofing, dental, and most service businesses.' },
      { q: 'Can Keres and Calendly work together?', a: 'Yes. Keres books directly onto your Google Calendar, the same calendar Calendly can use. You can run both: Keres for phone, Calendly for web.' },
    ],
  },
];
