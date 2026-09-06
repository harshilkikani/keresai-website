// The four industry hubs. Each one is a real page with its own
// vocabulary — consult / matter / conflict check for law, job /
// dispatch / estimate for home services, recall / chair time /
// hygiene for dental, showing / listing / buyer for real estate.
// A generic "customer" anywhere in here is a bug.
//
// The nine narrower industry pages stay live underneath these and
// point back up via breadcrumbs. Nothing was retired.
//
// Numbers only appear here when they exist on a benchmark page we
// actually publish. Where no sourced figure exists the value is [X]
// and it renders as a visible placeholder.

import type { Vertical } from './mocks';

export interface HubStat {
  value: string;
  label: string;
  source: string;
  sourceHref: string;
}

export interface Hub {
  slug: string;
  /** Nav and breadcrumb label. */
  name: string;
  title: string;
  description: string;
  h1: string;
  sub: string;
  /** Drives the CallTranscript, DailyBrief and BookingConfirmation mocks. */
  vertical: Vertical;
  /** roi.js key, so the calculator lands on this vertical's defaults. */
  calcPreset: string;
  /** The one benchmark every hub must link to. */
  benchmark: { href: string; label: string };
  /** Direct-answer paragraph under the problem H2, for AI search. */
  problemH2: string;
  problemAnswer: string;
  stats: HubStat[];
  /** What Remi does on a call in this vertical, in order. */
  callFlow: { step: string; text: string }[];
  /** Practice areas / trades / service lines. */
  segmentsH2: string;
  segments: { name: string; text: string }[];
  /** Theo and June, in this vertical's language. */
  otherAgents: { slug: string; name: string; title: string; text: string }[];
  /** Found, priced for this vertical. */
  foundFrom: string;
  foundLine: string;
  /** Compliance / trust line. Optional — only where it is a real concern. */
  compliance?: string;
  /** The narrower pages that live beneath this hub. */
  children: { label: string; href: string }[];
  /** Exactly two, per the proof rule. */
  testimonials: { proves: string }[];
  faqs: { q: string; a: string }[];
}

export const hubs: Hub[] = [
  {
    slug: 'law-firms',
    name: 'Law firms',
    title: 'AI Intake Receptionist for Law Firms | Keres AI',
    description:
      'Remi answers every new-client call in two rings, screens for conflicts, qualifies the matter and books the consultation — nights and weekends included. Found for firms from $499/month.',
    h1: 'The first firm to answer signs the client. Be that firm, at 2 a.m.',
    sub:
      'Remi, your Inbound Agent, answers every new-client call in two rings, screens for conflicts, qualifies the matter for your practice area, and books the consultation straight into your calendar. A single new case is worth thousands. Most of the calls that produce them arrive after your office is closed.',
    vertical: 'law-firms',
    calcPreset: 'legal',
    benchmark: { href: '/benchmarks/legal-intake-conversion', label: 'Legal intake conversion benchmarks' },
    problemH2: 'Why intake decides the case',
    problemAnswer:
      'A prospective client calling a law firm is anxious and ready to act now, so the firm that answers live and books the consultation usually earns the retainer. Calls that hit voicemail rarely produce a callback — the caller simply dials the next firm on the list, and accidents, arrests and family emergencies do not wait for office hours.',
    stats: [
      {
        value: 'First',
        label: 'responder usually signs the client',
        source: 'Legal intake benchmarks',
        sourceHref: '/benchmarks/legal-intake-conversion',
      },
      {
        value: '5 min',
        label: 'response window that lifts intake conversion',
        source: 'Lead-response research',
        sourceHref: '/benchmarks/legal-intake-conversion',
      },
      {
        value: '$1k–$10k+',
        label: 'typical value of a single new case',
        source: 'Legal intake benchmarks',
        sourceHref: '/benchmarks/legal-intake-conversion',
      },
    ],
    callFlow: [
      { step: 'Conflict check', text: 'Remi takes the caller’s name, the opposing party and the other driver or business involved, then flags the matter for your conflict review before anyone promises anything.' },
      { step: 'Matter qualification', text: 'Practice area, what happened, when it happened, whether there is a police report or filing, and whether any deadline is already running.' },
      { step: 'Urgency', text: 'A custody emergency and a slip-and-fall from March do not get the same handling. Remi grades the urgency on your rules and escalates the ones that cannot wait.' },
      { step: 'Consult booking', text: 'Real availability offered on the call, the consultation written into your calendar, and a confirmation text the caller can reply to.' },
      { step: 'Intake record', text: 'The full intake summary is written to Clio, Lawmatics or HubSpot, so the attorney reads the file rather than re-interviewing the client.' },
    ],
    segmentsH2: 'Practice areas',
    segments: [
      { name: 'Personal injury', text: 'Accident details, injuries, treatment so far, police report, insurer contact. The intake that decides whether a case is worth the consult.' },
      { name: 'Criminal defense', text: 'Charge, custody status, next court date, and an urgency grade that gets an arraignment tomorrow in front of a person tonight.' },
      { name: 'Family law', text: 'Matter type, jurisdiction, children involved, any active filing or order — collected calmly, without a form the caller has to fill in.' },
      { name: 'Immigration', text: 'Status, deadlines, prior filings and language preference, with the option to run intake in the caller’s own language.' },
    ],
    otherAgents: [
      { slug: 'follow-up', name: 'Theo', title: 'Follow-Up Agent', text: 'Confirms the consultation, reminds the day before, handles the reschedule, and collects documents in advance so the attorney is not chasing a police report an hour before the meeting.' },
      { slug: 'reactivation', name: 'June', title: 'Reactivation Agent', text: 'Revives closed-lost consultations from the last six to twelve months, and asks for the review after every matter closes — with unhappy clients routed to the partner privately first.' },
    ],
    foundFrom: 'from $499',
    foundLine:
      'Legal is the most competitive local search there is, the listings ecosystem is different — Avvo, FindLaw, Justia — and the review compliance rules are stricter. Found for firms starts at $499 a month and covers the site, the Google Business Profile, reviews, listings and AI-search visibility.',
    compliance:
      'Conflict screening happens before any advice is given, and Remi never offers legal advice. Call data is processed under a DPA, retained on your schedule, and access is logged. Ask for the security review before you sign anything.',
    children: [
      { label: 'AI receptionist for professional intake', href: '/ai-receptionist-for-professional-intake' },
      { label: 'Answering Legal alternative', href: '/answering-legal-alternative' },
      { label: 'Smith.ai alternative', href: '/smith-ai-alternative' },
      { label: 'Legal intake benchmarks', href: '/benchmarks/legal-intake-conversion' },
      { label: 'Legal intake ROI calculator', href: '/tools/legal-intake-roi-calculator' },
    ],
    testimonials: [
      { proves: 'after-hours new-client calls turning into signed matters' },
      { proves: 'consults that used to hit voicemail now being booked overnight' },
    ],
    faqs: [
      { q: 'Does it give legal advice?', a: 'No, and it says so. Remi collects facts, screens for conflicts, grades urgency and books the consultation. Anything that sounds like advice gets a "the attorney will go through that with you on Monday" and, if it is urgent, a warm transfer.' },
      { q: 'How does the conflict check work?', a: 'Remi collects the caller’s name, the opposing party and any other involved party, then checks against your matter list where we are integrated and flags the result for a human to clear. It never clears a conflict on its own — that decision stays with the firm.' },
      { q: 'What does it cost?', a: 'Found for firms starts at $499/month. Remi on the Answer plan starts at $[X]/month, quoted to your call volume, practice areas and integrations. Month-to-month, no setup fee on the Found base tier.' },
      { q: 'How long does setup take?', a: 'Five business days. We spend twenty minutes on how your intake runs today, write the script for your practice areas, connect your number, calendar and case management system, and you test it before it answers a real client.' },
      { q: 'What if a caller needs an attorney right now?', a: 'You set the escalation rules — an arraignment, a custody emergency, a named existing client — and Remi warm-transfers to the on-call number. If nobody answers, the on-call attorney gets a "call me now" alert with the intake already written down.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month, and you keep your number and your data.' },
    ],
  },

  {
    slug: 'home-services',
    name: 'Home services',
    title: 'AI Receptionist for HVAC, Plumbing & Roofing | Keres',
    description:
      'Remi answers in two rings, qualifies the job, gives a dispatch window and books it into ServiceTitan or Jobber — then texts back the calls it could not take. Visibility from $249/month.',
    h1: 'You’re on a roof. The phone’s ringing. Remi answers, books the job, and texts back the ones it can’t.',
    sub:
      'Remi, your Inbound Agent, picks up in two rings while your crew is on a job — grades the emergency, takes the service address, gives a dispatch window and writes the job into your field-service software. Anything it cannot take gets a text back inside 60 seconds.',
    vertical: 'home-services',
    calcPreset: 'home-services',
    benchmark: { href: '/benchmarks/hvac-answering', label: 'HVAC answering benchmarks' },
    problemH2: 'Why the phone beats the schedule',
    problemAnswer:
      'Home-services demand arrives exactly when nobody can answer it: during a heat wave, after a storm, at 6 a.m. with no heat. A large share of calls come in outside office hours, and when the house is at 90°F the caller does not wait on hold — they call the next company on the list.',
    stats: [
      { value: '30–45%', label: 'of calls go unanswered during peak season', source: 'HVAC answering benchmarks', sourceHref: '/benchmarks/hvac-answering' },
      { value: '35–50%', label: 'of demand arrives after hours', source: 'HVAC answering benchmarks', sourceHref: '/benchmarks/hvac-answering' },
      { value: '$300–$600', label: 'typical value of one service call', source: 'HVAC answering benchmarks', sourceHref: '/benchmarks/hvac-answering' },
    ],
    callFlow: [
      { step: 'Emergency grading', text: 'No heat with a newborn in the house is not the same call as a seasonal tune-up. Remi grades it on your rules and flags the ones that need a truck today.' },
      { step: 'Job qualification', text: 'Job type, equipment, service address, access notes, and whether this is the property you already quoted an estimate on.' },
      { step: 'Dispatch window', text: 'Remi offers the windows you actually have open and commits to one on the call, instead of promising that someone will ring back.' },
      { step: 'Written to your software', text: 'The job lands in ServiceTitan, Jobber or Housecall Pro with the notes attached, so the tech is not calling the office for the address.' },
      { step: 'Missed-call text-back', text: 'Any call that still gets away gets a text inside 60 seconds asking what they need — and the conversation carries on by SMS.' },
    ],
    segmentsH2: 'Trades',
    segments: [
      { name: 'HVAC', text: 'No-heat and no-cool triage, maintenance-plan renewals, and the seasonal surge that no front desk can absorb.' },
      { name: 'Plumbing', text: 'Burst-pipe and backup emergencies graded on the call, with the water-shutoff question asked before anyone is dispatched.' },
      { name: 'Roofing', text: 'Post-storm call surges, insurance-claim intake, and inspection appointments booked while the neighbours are still on hold elsewhere.' },
      { name: 'Septic, towing & electrical', text: 'Location, access and urgency captured first, because the dispatch decision is the whole job.' },
    ],
    otherAgents: [
      { slug: 'follow-up', name: 'Theo', title: 'Follow-Up Agent', text: 'Confirms the window, texts when the tech is on the way, and chases every estimate on day 1, day 3 and day 7 until you have a yes or a no.' },
      { slug: 'reactivation', name: 'June', title: 'Reactivation Agent', text: 'Runs the tune-up season campaign against your customer list, revives the estimates that went cold, and asks for a review after every completed job.' },
    ],
    foundFrom: 'from $249',
    foundLine:
      'Google ranks Local Services Ads on how fast you answer and how you are reviewed — which is exactly what Remi fixes. Found covers the site, the Google Business Profile, review generation, listings and LSA setup from $249 a month.',
    children: [
      { label: 'AI receptionist for HVAC', href: '/ai-receptionist-for-hvac' },
      { label: 'AI receptionist for plumbers', href: '/ai-receptionist-for-plumbers' },
      { label: 'AI receptionist for roofing', href: '/ai-receptionist-for-roofing' },
      { label: 'AI receptionist for septic', href: '/ai-receptionist-for-septic' },
      { label: 'AI receptionist for towing', href: '/ai-receptionist-for-towing' },
      { label: 'HVAC answering benchmarks', href: '/benchmarks/hvac-answering' },
    ],
    testimonials: [
      { proves: 'after-hours calls turning into dispatched jobs' },
      { proves: 'estimates closing because somebody followed up on day three' },
    ],
    faqs: [
      { q: 'Can it dispatch to the right tech?', a: 'It creates and grades the job, offers a real dispatch window and writes it to ServiceTitan, Jobber or Housecall Pro. Assignment stays with your dispatcher — the Daily Brief flags any job that still has no truck on it.' },
      { q: 'What about the seasonal surge?', a: 'Remi answers unlimited simultaneous calls at no surcharge, which is the entire point during a cold snap. Your bill does not move because a heat wave did.' },
      { q: 'What does it cost?', a: 'Found starts at $249/month. Remi on the Answer plan starts at $[X]/month, quoted to your call volume, locations and integrations. Month-to-month.' },
      { q: 'How long does setup take?', a: 'Five business days: twenty minutes on how calls run today, then your script, your number, your calendar and your field-service software, and you test it yourself before it answers a customer.' },
      { q: 'What if the caller needs a person?', a: 'You set the rules — a gas smell, a flood, a commercial account — and Remi warm-transfers to your on-call number, with a "call me now" alert as the fallback.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month, and your number stays yours.' },
    ],
  },

  {
    slug: 'dental-med-spa',
    name: 'Dental & med spa',
    title: 'AI Receptionist for Dental Practices & Med Spas | Keres',
    description:
      'Every call answered in two rings, every appointment confirmed, every recall filled. Remi books chair time, Theo prevents the no-show, June rebooks recall. Visibility from $249/month.',
    h1: 'Every call booked. Every appointment confirmed. Every recall filled.',
    sub:
      'Remi, your Inbound Agent, answers while your front desk is chairside — qualifies the procedure, checks what insurance you take, and books the chair time. Then Theo confirms it and June brings the recall list back.',
    vertical: 'dental-med-spa',
    calcPreset: 'dental',
    benchmark: { href: '/benchmarks/dental-no-show', label: 'Dental no-show benchmarks' },
    problemH2: 'Why the empty chair is the real cost',
    problemAnswer:
      'A practice loses money in two places: the new-patient call nobody could take because the front desk was chairside, and the booked appointment that never showed. Both are quiet, both are routine, and both are fixable without hiring — the first with an agent that answers, the second with one that confirms.',
    stats: [
      { value: '10–20%', label: 'typical dental no-show rate', source: 'Dental no-show benchmarks', sourceHref: '/benchmarks/dental-no-show' },
      { value: '$200+', label: 'estimated cost of a single no-show', source: 'Dental no-show benchmarks', sourceHref: '/benchmarks/dental-no-show' },
      { value: '30%+', label: 'of calls a busy front desk can miss', source: 'Dental no-show benchmarks', sourceHref: '/benchmarks/dental-no-show' },
    ],
    callFlow: [
      { step: 'New patient or recall', text: 'Remi checks whether the caller is already on file, and flags anyone overdue for recall while it has them on the phone.' },
      { step: 'Procedure qualification', text: 'What is wrong, how long it has been going on, and whether this is cosmetic, hygiene or an emergency — so the right length of chair time gets booked.' },
      { step: 'Insurance pre-qualification', text: 'Whether you take their plan, asked plainly, before a treatment conversation that would only end in disappointment.' },
      { step: 'Chair time booked', text: 'Real availability offered on the call and written into your practice management system, with forms texted before the visit.' },
      { step: 'Confirmation and reminders', text: 'Theo takes over: confirmation, reminders, reschedule handling, and the waitlist backfill when someone cancels.' },
    ],
    segmentsH2: 'Practices',
    segments: [
      { name: 'General dentistry', text: 'Hygiene recall, emergency chair time, and the new-patient call that came in while both operatories were running.' },
      { name: 'Specialty dental', text: 'Referral intake, longer procedure blocks, and pre-treatment questions answered before the consult.' },
      { name: 'Med spa', text: 'Treatment qualification, package questions, contraindication screening, and rebooking on the treatment cycle.' },
      { name: 'Multi-location', text: 'One number, routed to the right location, with each site’s availability and each site’s Daily Brief.' },
    ],
    otherAgents: [
      { slug: 'follow-up', name: 'Theo', title: 'Follow-Up Agent', text: 'Confirms every appointment, reminds on your schedule, handles reschedules in thread, and backfills a cancellation from the waitlist before the chair goes empty.' },
      { slug: 'reactivation', name: 'June', title: 'Reactivation Agent', text: 'Works the recall list every month, revives patients who lapsed, and asks for the review after treatment — routing anyone unhappy to the practice manager privately.' },
    ],
    foundFrom: 'from $249',
    foundLine:
      'Patients choose a practice on the profile and the reviews before they ever call. Found covers the site, the Google Business Profile, review generation, listings and health-directory citations from $249 a month.',
    compliance:
      'Remi is configured not to collect clinical detail it does not need, call data is processed under a DPA, and access is logged. If you need a BAA in place, ask before you sign.',
    children: [
      { label: 'AI receptionist for dentists', href: '/ai-receptionist-for-dentists' },
      { label: 'AI receptionist for med spas', href: '/ai-receptionist-for-med-spas' },
      { label: 'Dental no-show benchmarks', href: '/benchmarks/dental-no-show' },
      { label: 'Dental no-show calculator', href: '/tools/dental-no-show-calculator' },
    ],
    testimonials: [
      { proves: 'chair time recovered from cancellations and recall' },
      { proves: 'no-shows falling once every appointment got confirmed' },
    ],
    faqs: [
      { q: 'Does it integrate with our practice management system?', a: 'Google Calendar, HubSpot and ServiceTitan are connected today. Dentrix and Open Dental are rolling out — ask where yours is, and in the meantime Remi books to a shared calendar your front desk already watches.' },
      { q: 'Can it answer insurance questions?', a: 'It confirms which plans you accept and flags anything it cannot answer for your front desk. It does not quote coverage or estimate a patient’s out-of-pocket cost — that is a conversation for a person with the plan in front of them.' },
      { q: 'What does it cost?', a: 'Found starts at $249/month. Remi on the Answer plan starts at $[X]/month, quoted to your call volume, locations and integrations. Month-to-month.' },
      { q: 'How long does setup take?', a: 'Five business days. Twenty minutes on how the front desk handles calls now, then your script, your number and your calendar, and you test it before a patient does.' },
      { q: 'What if the caller has an emergency?', a: 'You define what counts. Remi warm-transfers those to the on-call number and sends a "call me now" alert with what it already collected if nobody picks up.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month.' },
    ],
  },

  {
    slug: 'real-estate',
    name: 'Real estate',
    title: 'AI Receptionist for Real Estate Teams | Keres AI',
    description:
      'Remi answers every listing enquiry in seconds, qualifies the buyer or seller, and books the showing into Follow Up Boss — evenings and weekends included. Visibility from $249/month.',
    h1: 'Answer every lead in seconds. Book the showing before they call the next agent.',
    sub:
      'Remi, your Inbound Agent, answers the listing line and the portal enquiries in seconds — asks whether they are working with an agent, whether they are pre-approved, and what their timeline is — then books the showing while you are still in the car.',
    vertical: 'real-estate',
    calcPreset: 'real-estate',
    benchmark: { href: '/missed-call-statistics', label: 'Missed-call and lead-response statistics' },
    problemH2: 'Why speed to lead decides the commission',
    problemAnswer:
      'A buyer enquiring about a listing is comparing you against every other agent whose number is on a sign, and the one who answers first usually gets the showing. Portal leads and listing calls arrive in the evening and at weekends, which is exactly when an agent is driving, showing, or at dinner.',
    stats: [
      { value: 'First', label: 'responder usually wins the lead', source: 'Lead-response research', sourceHref: '/missed-call-statistics' },
      { value: '5 min', label: 'response window that lifts conversion', source: 'Lead-response research', sourceHref: '/missed-call-statistics' },
      { value: '[X]', label: 'average value of one closed transaction', source: '', sourceHref: '' },
    ],
    callFlow: [
      { step: 'Which listing', text: 'Remi identifies the property from the call, the portal enquiry or the sign-call number, so the conversation starts with the house they actually asked about.' },
      { step: 'Buyer or seller', text: 'Are they buying, selling, or both — and are they already working with an agent, asked before anyone spends an hour on an unrepresented tour.' },
      { step: 'Qualification', text: 'Pre-approval status, price range, timeline and area, captured in the caller’s own words rather than a form they abandon.' },
      { step: 'Showing booked', text: 'A showing or a listing consultation put straight on the calendar, with disclosures texted immediately.' },
      { step: 'Written to your CRM', text: 'The lead and everything Remi learned lands in Follow Up Boss or your CRM, tagged with the source that produced it.' },
    ],
    segmentsH2: 'Teams',
    segments: [
      { name: 'Individual agents', text: 'The sign-call and portal enquiries answered while you are showing another property.' },
      { name: 'Teams', text: 'One line, routed by listing or by area, so the right agent gets the lead and the rest of the team stops arguing about it.' },
      { name: 'Brokerages', text: 'Floor-duty coverage without floor duty, and attribution showing which portal actually produced the closings.' },
      { name: 'Property management', text: 'Maintenance calls triaged, showings booked, and after-hours emergencies escalated to the person on call.' },
    ],
    otherAgents: [
      { slug: 'follow-up', name: 'Theo', title: 'Follow-Up Agent', text: 'Confirms the showing, reminds the day before, reschedules without phone tag, and follows up after the tour while the house is still fresh in their mind.' },
      { slug: 'reactivation', name: 'June', title: 'Reactivation Agent', text: 'Works the database of past clients and cold leads, revives buyers who paused their search, and asks for the review after every closing.' },
    ],
    foundFrom: 'from $249',
    foundLine:
      'Buyers check your reviews and your profile before they call the number on the sign. Found covers the site, the Google Business Profile, review generation and listings from $249 a month.',
    children: [
      { label: 'AI receptionist for real estate', href: '/ai-receptionist-for-real-estate' },
      { label: 'Lead response time calculator', href: '/tools/lead-response-time-calculator' },
      { label: 'Missed-call statistics', href: '/missed-call-statistics' },
    ],
    testimonials: [
      { proves: 'weekend listing calls turning into booked showings' },
      { proves: 'portal leads answered in seconds instead of hours' },
    ],
    faqs: [
      { q: 'Does it work with Zillow and Realtor.com leads?', a: 'Yes — the lead-source responder picks up portal enquiries, Google Business Profile messages and website forms, not just phone calls, and answers them in minutes rather than whenever someone opens the inbox.' },
      { q: 'Will it hand me an unqualified buyer?', a: 'It asks whether they are working with an agent, whether they are pre-approved, their price range and their timeline, and the Daily Brief separates the qualified ones from the browsers. You decide what qualified means.' },
      { q: 'What does it cost?', a: 'Found starts at $249/month. Remi on the Answer plan starts at $[X]/month, quoted to your lead volume and integrations. Month-to-month.' },
      { q: 'How long does setup take?', a: 'Five business days: twenty minutes on how leads reach you now, then your script, your numbers, your calendar and your CRM, and you test it before a buyer does.' },
      { q: 'What if a caller wants me specifically?', a: 'Remi warm-transfers to you under rules you set, and sends a "call me now" alert with the lead detail if you cannot pick up.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month.' },
    ],
  },
];

export const hubBySlug = (slug: string) => hubs.find((h) => h.slug === slug)!;
