// Data-driven glossary. Add an entry → a new /glossary/{slug} page builds.
// Each term leads with a 40–60 word direct-answer `definition` (the AI-citation
// payload) followed by deeper sections. Keep definitions factual and quotable.
import { answeringVendors, VENDORS_CHECKED } from './answeringVendors';

/** A vendor's published starting price, as recorded in answeringVendors.ts. */
const vp = (name: string) => answeringVendors[name].starting.replace(/\.$/, '');

export interface GlossarySection {
  h2: string;
  body: string; // inline HTML, or block HTML (<p>, <ol>, <ul>) when it starts with a block tag
}
export interface GlossaryTerm {
  slug: string;
  term: string; // canonical display name
  aka?: string[]; // synonyms surfaced in copy
  category: 'AI Receptionist' | 'AI SDR & Outbound' | 'Email Deliverability' | 'Local Search';
  targetKeyword: string;
  title: string;
  description: string;
  h1?: string; // optional page heading; defaults to "What is {term}?"
  definition: string; // 40–60 word direct answer, first paragraph
  sections: GlossarySection[];
  related: string[]; // other glossary slugs
  faqs: { q: string; a: string }[];
  cta?: { href: string; label: string }; // product page this term feeds
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'ai-receptionist',
    term: 'AI Receptionist',
    aka: ['AI virtual receptionist', 'AI phone agent'],
    category: 'AI Receptionist',
    targetKeyword: 'what is an ai receptionist',
    title: 'What Is an AI Receptionist? Definition | Keres AI',
    description:
      'An AI receptionist answers business calls 24/7, qualifies callers, and books appointments automatically. Learn how it works, how it differs from an answering service, and what it costs.',
    definition:
      'An AI receptionist is software that answers your business phone automatically, 24/7. It greets callers in a natural voice, answers questions, qualifies the lead, books or reschedules appointments on your calendar, and sends your team a summary — so no call goes to voicemail and no lead is lost, even after hours.',
    sections: [
      {
        h2: 'How an AI receptionist works',
        body:
          'You point your existing business number at the AI. When a call comes in, the AI answers within two rings, follows the call flows you configure, and acts on what the caller needs — checking calendar availability, booking the appointment, capturing contact details, and escalating emergencies to a human by text. Everything is logged to your CRM automatically.',
      },
      {
        h2: 'AI receptionist vs. answering service vs. voicemail',
        body:
          'Voicemail captures a message and hopes you call back. A traditional <a href="/glossary/ai-answering-service">answering service</a> uses human operators who usually just take a message — and bill per minute. An AI receptionist actually <strong>completes the task</strong>: it books the appointment during the call, works 24/7 on a monthly plan, and never puts a caller on hold.',
      },
      {
        h2: 'What businesses use AI receptionists',
        body:
          'Any business that lives on the phone: <a href="/ai-receptionist-for-hvac">HVAC</a> and <a href="/ai-receptionist-for-plumbers">plumbing</a> contractors, <a href="/industries/dental-med-spa">dental practices</a>, <a href="/industries/dental-med-spa">med spas</a>, <a href="/industries/real-estate">real estate teams</a>, and <a href="/industries/law-firms">law firms</a> — wherever a missed call is a lost customer.',
      },
    ],
    related: ['ai-answering-service', 'virtual-receptionist', 'appointment-booking-automation', 'missed-call-text-back'],
    faqs: [
      { q: 'How is an AI receptionist different from an answering service?', a: 'A traditional answering service takes a message; an AI receptionist completes the task — it books the appointment during the call, works 24/7 on a monthly plan, and syncs everything to your calendar and CRM.' },
      { q: 'Can an AI receptionist book appointments?', a: 'Yes. It checks real-time calendar availability, books and reschedules during the call, and texts the caller a confirmation.' },
      { q: 'Does an AI receptionist sound human?', a: 'Modern AI receptionists use natural-sounding voices, understand interruptions, and hold a real conversation rather than reading a rigid menu.' },
    ],
    cta: { href: '/agents/inbound', label: 'See the Keres AI receptionist' },
  },
  {
    slug: 'ai-answering-service',
    term: 'AI Answering Service',
    aka: ['automated answering service', 'virtual answering service'],
    category: 'AI Receptionist',
    targetKeyword: 'what is an ai answering service',
    title: 'What Is an AI Answering Service? Definition | Keres AI',
    description:
      'An AI answering service answers business calls automatically, booking appointments and capturing leads 24/7 instead of just taking messages.',
    definition:
      'An AI answering service is an automated phone-answering solution that handles inbound calls 24/7 without human operators. Unlike a traditional answering service that charges per minute to take messages, an AI answering service books appointments, answers common questions, qualifies leads, and routes urgent calls — usually on a predictable monthly plan.',
    sections: [
      {
        h2: 'Why businesses switch from per-minute answering services',
        body:
          'Per-minute human answering services get expensive fast during busy seasons, and most just take a message you still have to act on. An AI answering service flips that: monthly plans, unlimited simultaneous calls, and completed bookings instead of callback slips.',
      },
      {
        h2: 'What an AI answering service can do',
        body:
          'Answer every call in two rings, qualify the caller, book and reschedule on your calendar, capture lead details to your CRM, filter spam, and text your on-call team the moment something is an emergency — day or night.',
      },
    ],
    related: ['ai-receptionist', 'virtual-receptionist', 'call-overflow', 'appointment-booking-automation'],
    faqs: [
      { q: 'Is an AI answering service cheaper than a human one?', a: 'Usually yes — AI answering services usually charge a monthly plan rather than billing every minute a human spends, which is far more predictable for high-volume or seasonal businesses.' },
      { q: 'Does it work after hours?', a: 'Yes — it answers 24/7, including nights, weekends, and holidays, with no extra after-hours fees.' },
    ],
    cta: { href: '/ai-answering-service', label: 'See the Keres AI answering service' },
  },
  {
    slug: 'virtual-receptionist',
    term: 'Virtual Receptionist',
    aka: ['remote receptionist', 'virtual answering service'],
    category: 'AI Receptionist',
    targetKeyword: 'what is a virtual receptionist',
    title: 'What Is a Virtual Receptionist? Human vs AI | Keres AI',
    description:
      'A virtual receptionist answers your business calls remotely. How human and AI virtual receptionists work, how they bill, and how to choose between them.',
    h1: 'What is a virtual receptionist?',
    definition:
      'A virtual receptionist is a remote service that answers your business phone for you, staffed by people or run by AI. It greets callers, answers routine questions, takes details, books appointments and passes urgent calls to your team, without anyone sitting at your front desk.',
    sections: [
      {
        h2: 'How a virtual receptionist works',
        body:
          '<p>The setup is much the same whether a person or software answers:</p> <ol> <li><strong>Forward your number.</strong> You keep your business number and forward calls to the service all the time, after hours, or only when your line is busy.</li> <li><strong>Give it your script.</strong> You supply your greeting, services, service area, hours and the questions to ask each caller.</li> <li><strong>It answers and acts.</strong> The receptionist takes the caller’s details, answers what it can, and books the appointment if it has access to your calendar.</li> <li><strong>You get the record.</strong> A message, summary or booking lands in your email, texts, calendar or CRM.</li> <li><strong>Urgent calls reach a person.</strong> Calls that match your escalation rules are transferred or texted to whoever is on call.</li> </ol>',
      },
      {
        h2: 'Human virtual receptionist vs AI receptionist',
        body:
          '<p>A human virtual receptionist is a trained person at a remote answering company. People handle unusual calls well and can use judgment a script did not anticipate. Most human services bill by the minute or by the call, and one person handles one call at a time, so a busy hour can mean hold time or a message instead of a booking.</p> <p>An <a href="/glossary/ai-receptionist">AI receptionist</a> is software that answers in a natural voice. It answers at 3 a.m. the same way it answers at 3 p.m. and asks every caller the same intake questions. It is weaker on calls that need real judgment, which is why a good setup sends those to a person.</p>',
      },
      {
        h2: 'What a virtual receptionist costs',
        body: `<p>Human services usually sell plans with a set number of minutes or calls and charge for overage. As of ${VENDORS_CHECKED}, Ruby’s published entry plan was ${vp('Ruby')}, and PATLive’s was ${vp('PATLive')}. AI receptionists more often charge a monthly rate with included minutes; Dialzara, for example, listed ${vp('Dialzara')} on the same date. Compare options on cost per booked appointment, not monthly price. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</p>`,
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p>Keres AI’s virtual receptionist is <a href="/agents/inbound">Remi</a>, an AI receptionist. Remi answers in two rings, 24/7, asks your intake questions, and books into Google Calendar, HubSpot or ServiceTitan. Calls Remi couldn’t take get a text back within 60 seconds. Remi escalates to a person by the rules you set, and it answers in English today. Billing is a monthly rate with included minutes, then per minute, with no per-call fees.</p>',
      },
    ],
    related: ['ai-receptionist', 'ai-answering-service', 'call-overflow', 'after-hours-answering'],
    faqs: [
      { q: 'Is an AI receptionist a type of virtual receptionist?', a: 'Yes. A virtual receptionist is any remote answering service; an AI receptionist is one run by software instead of people. It answers around the clock and asks every caller the same questions, and it should hand calls that need judgment to a person.' },
      { q: 'How much does a virtual receptionist cost?', a: 'Human services usually charge for a set number of minutes or calls each month, plus overage. AI receptionists usually charge a monthly rate with included minutes. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> for published prices and how to compare them.' },
      { q: 'Can a virtual receptionist book appointments?', a: 'Yes, if it has access to your calendar or scheduling system. Without that access it can only take a message. Keres AI’s Remi books directly into Google Calendar, HubSpot or ServiceTitan.' },
      { q: 'Do I need a new phone number for a virtual receptionist?', a: 'No. You keep your business number and forward calls to the virtual receptionist, either all the time, after hours or when your line is busy.' },
    ],
    cta: { href: '/agents/inbound', label: 'See Remi, the Keres AI receptionist' },
  },
  {
    slug: 'missed-call-text-back',
    term: 'Missed-Call Text-Back',
    aka: ['missed call automation'],
    category: 'AI Receptionist',
    targetKeyword: 'what is missed call text back',
    title: 'What Is Missed-Call Text-Back? Definition | Keres AI',
    description:
      'Missed-call text-back automatically sends a text to any caller you miss, so the lead never goes cold. Learn how it works and why it recovers revenue.',
    definition:
      'Missed-call text-back is an automation that instantly sends a text message to any caller whose call you miss. Instead of losing the lead to voicemail or a competitor, the caller gets an immediate reply offering to help, book, or call back — keeping the conversation alive and recovering revenue that would otherwise walk.',
    sections: [
      {
        h2: 'Why missed calls cost you money',
        body:
          'Most callers who hit voicemail never leave a message — they dial the next business. Use the <a href="/tools/missed-call-calculator">missed-call revenue calculator</a> to estimate what that costs you each month. A full <a href="/glossary/ai-receptionist">AI receptionist</a> goes one step further by answering the call live instead of texting after the fact.',
      },
    ],
    related: ['ai-receptionist', 'call-overflow', 'lead-qualification'],
    faqs: [
      { q: 'Is missed-call text-back the same as an AI receptionist?', a: 'No — text-back reacts after a call is missed, while an AI receptionist answers the call live and books the appointment in the moment. Many businesses use both.' },
    ],
    cta: { href: '/tools/missed-call-calculator', label: 'Calculate your missed-call losses' },
  },
  {
    slug: 'call-overflow',
    term: 'Call Overflow Handling',
    aka: ['overflow answering', 'call spillover'],
    category: 'AI Receptionist',
    targetKeyword: 'what is call overflow handling',
    title: 'What Is Call Overflow Handling? | Keres AI',
    description:
      'Call overflow handling sends calls your team can’t pick up to a backup that answers live. How overflow works, what it costs, and human vs AI overflow.',
    definition:
      'Call overflow handling sends calls your team can’t pick up, because every line is busy or nobody answers within a few rings, to a backup that answers live. The backup can be another office, an answering service or an AI receptionist instead of voicemail.',
    sections: [
      {
        h2: 'How call overflow works',
        body:
          '<ol> <li>Calls ring your team first, as they do today.</li> <li>You set the trigger: a busy line, no answer after a set number of rings, or a schedule such as lunch hours.</li> <li>Your phone carrier or phone system forwards the call when the trigger is met; most offer “forward when busy” and “forward when unanswered”.</li> <li>The backup answers, follows your script, and books the appointment or takes the details.</li> <li>Your team gets the summary or booking, so nothing is handled twice.</li> </ol>',
      },
      {
        h2: 'Human overflow vs AI overflow',
        body:
          '<p>A human answering service handles overflow with trained operators, usually billed by the minute or by the call. People cope well with unusual calls, but your busiest hours may be theirs too, and then your callers queue there instead. An <a href="/glossary/ai-receptionist">AI receptionist</a> answers each overflow call the same way, books directly into your calendar, and costs the same at 2 a.m. as at noon. For overflow specifically, ask whether the backup can complete the booking, or only take a message your team must return.</p>',
      },
      {
        h2: 'What call overflow costs',
        body: `<p>Overflow forwarding is usually a feature of your phone service. The backup is the cost. Human services usually charge by minutes or calls; as of ${VENDORS_CHECKED}, PATLive listed ${vp('PATLive')}. AI receptionists usually charge a monthly rate with included minutes. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</p>`,
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p>Set your phone to forward busy or unanswered calls to <a href="/agents/inbound">Remi</a>. Remi answers in two rings, asks your intake questions, books into Google Calendar, HubSpot or ServiceTitan, and escalates to a person by your rules. Calls it couldn’t take get a text back within 60 seconds. Billing is a monthly rate with included minutes, then per minute, with no per-call fees. See <a href="/use-cases/overflow-call-handling">overflow call handling</a>.</p>',
      },
    ],
    related: ['ai-receptionist', 'call-routing', 'missed-call-text-back', 'virtual-receptionist'],
    faqs: [
      { q: 'How does call overflow work?', a: 'Your phone system forwards calls that are busy, or unanswered after a set number of rings, to a backup answerer, which picks up live instead of sending the caller to voicemail.' },
      { q: 'What is the difference between call overflow and call forwarding?', a: 'Call forwarding sends calls to another number all the time. Overflow forwards only the calls your team can’t take, so your staff still answer first.' },
      { q: 'How many rings before a call should overflow?', a: 'It is your choice. A short window, such as three or four rings, gives your team the first chance to answer without leaving the caller waiting long enough to hang up.' },
      { q: 'Is an AI receptionist good for overflow calls?', a: 'It suits overflow because it answers each call the same way at any hour and can book directly into your calendar. Calls that need judgment should still be escalated to a person by your rules.' },
    ],
    cta: { href: '/use-cases/overflow-call-handling', label: 'Add overflow coverage' },
  },
  {
    slug: 'appointment-booking-automation',
    term: 'Appointment Booking Automation',
    aka: ['automated scheduling', 'appointment automation'],
    category: 'AI Receptionist',
    targetKeyword: 'what is appointment booking automation',
    title: 'What Is Appointment Booking Automation? | Keres AI',
    description:
      'Appointment booking automation schedules, confirms and reschedules appointments without phone tag. How it works, what it costs, and booking on the call.',
    definition:
      'Appointment booking automation is software that schedules, confirms and reschedules appointments without staff going back and forth with the customer. It checks live calendar availability, applies your booking rules, writes the appointment to your calendar or CRM, and sends the customer a confirmation.',
    sections: [
      {
        h2: 'How appointment booking automation works',
        body:
          '<ol> <li><strong>Connect the calendar</strong> or job system the appointment should land in.</li> <li><strong>Set booking rules:</strong> appointment types and lengths, buffers between jobs, service area, business hours, and who can be booked for what.</li> <li><strong>The request comes in</strong> by phone, web form, chat or text.</li> <li><strong>Availability is checked live</strong> and the customer is offered open slots that fit the rules.</li> <li><strong>The appointment is written</strong> to the calendar or CRM, and a confirmation goes out.</li> <li><strong>Changes follow the same path:</strong> a reschedule frees the old slot and books a new one.</li> </ol>',
      },
      {
        h2: 'Self-service booking links vs booking on the call',
        body:
          '<p>Online scheduling links let customers pick a time themselves, which works for people already on your website. Phone callers are different: they want to describe the problem and be booked in the same conversation. An <a href="/glossary/ai-receptionist">AI receptionist</a> books on the call using the same rules as your scheduling tool, so a caller is not sent a link to finish later. Most businesses need both, because customers arrive both ways.</p>',
      },
      {
        h2: 'What appointment booking automation costs',
        body:
          '<p>Stand-alone scheduling tools are usually priced per user per month. Booking by phone through an AI receptionist is part of that receptionist’s plan, usually a monthly rate with included minutes. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p><a href="/agents/inbound">Remi</a> answers in two rings, 24/7, asks your intake questions and books directly into Google Calendar, HubSpot or ServiceTitan. Other tools can connect through Zapier; Outlook, Jobber and Housecall Pro are rolling out. After the booking, <a href="/agents/follow-up">Theo</a> sends the confirmation and reminders, and handles a reschedule in the same text thread. See all <a href="/integrations">integrations</a>.</p>',
      },
    ],
    related: ['ai-receptionist', 'appointment-reminders', 'lead-qualification', 'no-show-rate'],
    faqs: [
      { q: 'What calendars does AI appointment booking work with?', a: 'Keres AI books directly into Google Calendar, HubSpot and ServiceTitan today, and connects to other tools through Zapier. Outlook, Jobber and Housecall Pro are rolling out.' },
      { q: 'Does booking automation prevent double-booking?', a: 'It checks live availability before offering a slot and writes the appointment straight away, which avoids most double-bookings. It is only as accurate as the calendar it reads, so appointments booked elsewhere need to be on the same calendar.' },
      { q: 'Can customers reschedule without calling?', a: 'Yes, if the system sends a confirmation they can reply to. A reschedule frees the old slot and books a new one under the same rules.' },
      { q: 'Can an AI receptionist book appointments during the call?', a: 'Yes, when it is connected to your calendar or job system. It checks open slots against your booking rules, offers the caller a time, writes the appointment and sends a confirmation before the call ends.' },
    ],
    cta: { href: '/agents/inbound', label: 'Book appointments on the call' },
  },
  {
    slug: 'lead-qualification',
    term: 'Lead Qualification',
    aka: ['lead screening', 'intake qualification'],
    category: 'AI Receptionist',
    targetKeyword: 'what is lead qualification',
    title: 'What Is Lead Qualification? Definition | Keres AI',
    description:
      'Lead qualification decides whether an inquiry is a real fit before your team spends time on it. How it works, how it differs from lead scoring, and AI’s role.',
    definition:
      'Lead qualification is the process of deciding whether an inquiry is a real fit for your business before your team spends time on it. It checks details like the service needed, location, timeline and budget against your criteria, then books, routes or politely declines the lead.',
    sections: [
      {
        h2: 'How lead qualification works',
        body:
          '<ol> <li><strong>Define a good lead:</strong> the services you offer, the area you cover, the jobs you won’t take, and a minimum job size if you have one.</li> <li><strong>Turn that into questions</strong> asked on every inquiry, in the same order.</li> <li><strong>Record the answers</strong> in your CRM or job system so nobody asks twice.</li> <li><strong>Decide the next step:</strong> book qualified leads, route edge cases to a person, and refer out the ones you can’t help.</li> <li><strong>Review the results</strong> every month and adjust the questions.</li> </ol>',
      },
      {
        h2: 'Lead qualification vs lead scoring',
        body:
          '<p>Qualification is a yes, no or maybe, decided during the conversation. <a href="/glossary/lead-scoring">Lead scoring</a> assigns points over time based on fit and behavior, and is more common in longer B2B sales cycles. Service businesses that live on the phone usually need qualification first: is this a job we do, in our area, and how soon? Sales teams often use frameworks such as BANT (budget, authority, need, timeline); a home-services or legal intake applies the same idea with questions specific to the trade or practice area.</p>',
      },
      {
        h2: 'What lead qualification costs',
        body:
          '<p>Manual qualification costs staff time on every call, including the ones that turn out to be spam or out of area. When an AI receptionist qualifies calls, the work is part of its plan, usually a monthly rate with included minutes. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p><a href="/agents/inbound">Remi</a> answers in two rings, 24/7, and asks your intake questions on every call. Qualified callers are booked into Google Calendar, HubSpot or ServiceTitan; calls that need judgment go to a person by your rules. Calls Remi couldn’t take get a text back within 60 seconds, so the lead isn’t lost before it is qualified. See <a href="/glossary/legal-intake">legal intake</a> and <a href="/glossary/patient-intake">patient intake</a> for examples by vertical.</p>',
      },
    ],
    related: ['ai-receptionist', 'lead-scoring', 'appointment-booking-automation', 'legal-intake'],
    faqs: [
      { q: 'What questions qualify a lead?', a: 'The ones that decide whether you can take the job: what service is needed, where, how soon, and any limits you have, such as a minimum job size or the types of matters you accept.' },
      { q: 'Can AI qualify leads as well as a person?', a: 'For structured questions asked the same way on every call, AI is consistent and doesn’t skip steps. Judgment calls, such as an unusual job or an upset caller, should be escalated to a person.' },
      { q: 'What is the difference between lead qualification and lead scoring?', a: 'Qualification decides fit during the conversation. Lead scoring ranks leads with points over time, based on fit and behavior, and is more common in longer sales cycles.' },
    ],
    cta: { href: '/agents/inbound', label: 'Qualify every caller' },
  },
  {
    slug: 'ai-sdr',
    term: 'AI SDR',
    aka: ['AI sales development rep', 'AI outbound agent'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is an ai sdr',
    title: 'What Is an AI SDR? Definition & How It Works | Keres AI',
    description:
      'An AI SDR automates outbound sales development: personalized email sequences, reply handling and meeting booking without hiring a human rep.',
    definition:
      'An AI SDR (sales development representative) is software that automates outbound prospecting: it builds and sends personalized cold-email sequences, manages inbox warmup and deliverability, replies to interested prospects, and books qualified meetings straight onto your calendar — doing the work of a human sales development rep without the headcount.',
    sections: [
      {
        h2: 'What an AI SDR automates',
        body:
          'Targeting and list building, AI-personalized copy per prospect, multi-step <a href="/glossary/email-sequence">sequences</a> with follow-up, <a href="/glossary/email-deliverability">deliverability</a> management, reply handling, and meeting booking — the entire top-of-funnel motion that used to require a team of reps.',
      },
      {
        h2: 'AI SDR vs. human SDR',
        body:
          'A human SDR sends a few dozen personalized emails a day; an AI SDR personalizes at scale across thousands of prospects, never forgets a follow-up, and works around the clock — while your team focuses on closing the meetings it books.',
      },
    ],
    related: ['cold-email-outreach', 'email-sequence', 'email-deliverability', 'lead-qualification'],
    faqs: [
      { q: 'Does an AI SDR replace human salespeople?', a: 'It replaces the repetitive top-of-funnel work — prospecting, sending, follow-up, and booking — so your human closers spend their time in meetings, not in a sequencing tool.' },
      { q: 'How does an AI SDR avoid the spam folder?', a: 'It manages SPF, DKIM, DMARC, inbox warmup, and sending-volume ramp so messages land in the primary inbox.' },
    ],
    cta: { href: '/agents/outbound', label: 'See the Keres AI SDR' },
  },
  {
    slug: 'cold-email-outreach',
    term: 'Cold Email Outreach',
    aka: ['cold emailing', 'outbound email'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is cold email outreach',
    title: 'What Is Cold Email Outreach? Definition | Keres AI',
    description:
      'Cold email outreach is sending unsolicited but relevant emails to prospects to start a sales conversation. Learn how to do it without landing in spam.',
    definition:
      'Cold email outreach is the practice of emailing prospects you have no prior relationship with to start a sales conversation. Done well, it is targeted, personalized, and compliant — reaching the right people with a relevant message. Success depends on list quality, personalization, and <a href="/glossary/email-deliverability">deliverability</a>, so messages actually reach the inbox.',
    sections: [
      {
        h2: 'What makes cold email work',
        body:
          'Tight targeting, genuine personalization, a clear and short ask, disciplined <a href="/glossary/email-sequence">follow-up</a>, and strong sender reputation. Volume without deliverability just fills spam folders.',
      },
    ],
    related: ['ai-sdr', 'email-sequence', 'email-deliverability', 'inbox-warmup'],
    faqs: [
      { q: 'Is cold email legal?', a: 'In the US, cold email is legal under CAN-SPAM when you use accurate headers, identify yourself, and offer an easy opt-out. Other regions (e.g. GDPR) have stricter consent rules.' },
    ],
    cta: { href: '/agents/outbound', label: 'Automate cold outreach' },
  },
  {
    slug: 'email-sequence',
    term: 'Email Sequence',
    aka: ['email cadence', 'drip sequence'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is an email sequence',
    title: 'What Is an Email Sequence? Definition & Examples | Keres AI',
    description:
      'An email sequence is a series of automated, scheduled emails sent to a prospect over time. Learn how multi-step sequences drive replies and booked meetings.',
    definition:
      'An email sequence (or cadence) is a series of automated emails sent to a prospect on a schedule — typically an opener followed by several spaced follow-ups. Because most replies come from follow-ups rather than the first email, sequences dramatically increase response rates by staying persistent without manual effort.',
    sections: [
      {
        h2: 'Why follow-ups matter',
        body:
          'A single email is easy to miss; a well-spaced sequence keeps you visible without being pushy. An <a href="/glossary/ai-sdr">AI SDR</a> personalizes each step and stops the sequence automatically the moment a prospect replies or books.',
      },
    ],
    related: ['ai-sdr', 'cold-email-outreach', 'email-deliverability'],
    faqs: [
      { q: 'How many emails should a sequence have?', a: 'Most effective B2B sequences run 4–6 touches spaced several days apart, stopping immediately when the prospect responds.' },
    ],
    cta: { href: '/agents/outbound', label: 'Run AI-personalized sequences' },
  },
  {
    slug: 'email-deliverability',
    term: 'Email Deliverability',
    category: 'Email Deliverability',
    targetKeyword: 'what is email deliverability',
    title: 'What Is Email Deliverability? Definition | Keres AI',
    description:
      'Email deliverability is whether your emails reach the inbox instead of spam. Learn the factors that control it — authentication, reputation, and warmup.',
    definition:
      'Email deliverability is the measure of whether your emails actually reach recipients’ primary inboxes rather than the spam folder or being blocked. It depends on authentication (<a href="/glossary/spf">SPF</a>, <a href="/glossary/dkim">DKIM</a>, <a href="/glossary/dmarc">DMARC</a>), sender reputation, list quality, content, and sending behavior like <a href="/glossary/inbox-warmup">inbox warmup</a> and volume ramp.',
    sections: [
      {
        h2: 'The main factors that control deliverability',
        body:
          'Authentication records prove you are who you say you are. Sender reputation reflects past behavior. Engagement (opens, replies, low complaints) tells mailbox providers your mail is wanted. <a href="/glossary/inbox-warmup">Warmup</a> and gradual volume increases build that reputation safely.',
      },
      {
        h2: 'How to improve deliverability',
        body:
          'Set up SPF, DKIM, and DMARC correctly; warm up new inboxes; ramp volume gradually; keep lists clean; and monitor your <a href="/glossary/spam-score">spam score</a> and reputation. Keres manages all of this for outbound automatically.',
      },
    ],
    related: ['spf', 'dkim', 'dmarc', 'inbox-warmup', 'spam-score'],
    faqs: [
      { q: 'Why are my emails going to spam?', a: 'The usual causes are missing or misconfigured SPF/DKIM/DMARC, a cold sending domain with no warmup, poor list hygiene, spammy content, or sending too much volume too fast.' },
      { q: 'What is a good deliverability rate?', a: 'For healthy outbound, you want the large majority of mail landing in the primary inbox; inbox-placement testing matters more than raw "delivered" rates, which include spam-folder delivery.' },
    ],
    cta: { href: '/agents/outbound', label: 'Fix your deliverability' },
  },
  {
    slug: 'spf',
    term: 'SPF (Sender Policy Framework)',
    aka: ['SPF record'],
    category: 'Email Deliverability',
    targetKeyword: 'what is an spf record',
    title: 'What Is an SPF Record? Email Authentication | Keres AI',
    description:
      'SPF (Sender Policy Framework) is a DNS record that lists which servers may send email for your domain. Learn how it works and why it matters for deliverability.',
    definition:
      'SPF (Sender Policy Framework) is a DNS record that specifies which mail servers are authorized to send email on behalf of your domain. When a receiving server gets your message, it checks the sending server against your SPF record to help verify the mail is legitimate — a core defense against spoofing and a key factor in <a href="/glossary/email-deliverability">deliverability</a>.',
    sections: [
      {
        h2: 'How SPF works',
        body:
          'You publish a TXT record in DNS listing approved senders. Receiving servers compare the message’s sending IP against that list and pass or fail SPF accordingly. SPF works best alongside <a href="/glossary/dkim">DKIM</a> and <a href="/glossary/dmarc">DMARC</a>.',
      },
    ],
    related: ['dkim', 'dmarc', 'email-deliverability', 'inbox-warmup'],
    faqs: [
      { q: 'Is SPF enough on its own?', a: 'No. SPF is necessary but not sufficient — you also need DKIM and DMARC for full authentication and the best deliverability.' },
    ],
    cta: { href: '/agents/outbound', label: 'Get authentication set up for you' },
  },
  {
    slug: 'dkim',
    term: 'DKIM (DomainKeys Identified Mail)',
    aka: ['DKIM signature'],
    category: 'Email Deliverability',
    targetKeyword: 'what is dkim',
    title: 'What Is DKIM? Email Authentication Explained | Keres AI',
    description:
      'DKIM adds a cryptographic signature to your emails so receivers can verify they weren’t altered and really came from your domain. Learn how it works.',
    definition:
      'DKIM (DomainKeys Identified Mail) is an email-authentication method that adds a cryptographic signature to every message you send. The receiving server uses a public key published in your DNS to verify the message genuinely came from your domain and wasn’t tampered with in transit — strengthening trust and <a href="/glossary/email-deliverability">deliverability</a>.',
    sections: [
      {
        h2: 'How DKIM works',
        body:
          'Your sending server signs each message with a private key; the matching public key lives in your DNS. Receivers check the signature to confirm authenticity and integrity. DKIM pairs with <a href="/glossary/spf">SPF</a> and is required for <a href="/glossary/dmarc">DMARC</a> alignment.',
      },
    ],
    related: ['spf', 'dmarc', 'email-deliverability'],
    faqs: [
      { q: 'What’s the difference between SPF and DKIM?', a: 'SPF authorizes which servers may send for your domain; DKIM cryptographically proves the message wasn’t altered and came from you. DMARC ties them together.' },
    ],
    cta: { href: '/agents/outbound', label: 'Get DKIM configured for you' },
  },
  {
    slug: 'dmarc',
    term: 'DMARC',
    aka: ['DMARC policy', 'Domain-based Message Authentication'],
    category: 'Email Deliverability',
    targetKeyword: 'what is dmarc',
    title: 'What Is DMARC? Email Authentication Policy | Keres AI',
    description:
      'DMARC tells receiving servers what to do when an email fails SPF and DKIM, and reports who is sending as your domain. Learn how it protects your domain and inbox placement.',
    definition:
      'DMARC (Domain-based Message Authentication, Reporting & Conformance) is a DNS policy that builds on <a href="/glossary/spf">SPF</a> and <a href="/glossary/dkim">DKIM</a>. It tells receiving servers what to do with mail that fails authentication — monitor, quarantine, or reject — and sends you reports on who is sending email using your domain, protecting you from spoofing and improving inbox placement.',
    sections: [
      {
        h2: 'DMARC policies explained',
        body:
          'A DMARC record sets a policy of <strong>none</strong> (monitor only), <strong>quarantine</strong> (send to spam), or <strong>reject</strong> (block). Most senders start at none to gather reports, then tighten to quarantine or reject once SPF and DKIM are aligned.',
      },
    ],
    related: ['spf', 'dkim', 'email-deliverability'],
    faqs: [
      { q: 'Do I need DMARC to send cold email?', a: 'Increasingly, yes — major providers like Google and Yahoo now require SPF, DKIM, and DMARC for bulk senders, and proper DMARC improves trust and inbox placement.' },
    ],
    cta: { href: '/agents/outbound', label: 'Get DMARC set up for you' },
  },
  {
    slug: 'inbox-warmup',
    term: 'Inbox Warmup',
    aka: ['email warmup', 'domain warmup'],
    category: 'Email Deliverability',
    targetKeyword: 'what is inbox warmup',
    title: 'What Is Inbox Warmup? Email Warmup Explained | Keres AI',
    description:
      'Inbox warmup gradually builds a new email account’s sending reputation by ramping volume and engagement, so your outbound lands in the inbox instead of spam.',
    definition:
      'Inbox warmup is the process of gradually building a new email account’s or domain’s sending reputation before running outbound at scale. It starts with low daily volume and steadily increases it while generating positive engagement (opens and replies), signaling to mailbox providers that you’re a legitimate sender — so your <a href="/glossary/cold-email-outreach">cold email</a> reaches the inbox.',
    sections: [
      {
        h2: 'Why warmup is essential',
        body:
          'A brand-new inbox that suddenly sends hundreds of emails looks like spam and gets filtered. Warmup builds trust slowly over days and weeks. Combined with <a href="/glossary/spf">SPF</a>, <a href="/glossary/dkim">DKIM</a>, and <a href="/glossary/dmarc">DMARC</a>, it’s the foundation of <a href="/glossary/email-deliverability">deliverability</a>.',
      },
    ],
    related: ['email-deliverability', 'spf', 'dkim', 'dmarc', 'spam-score'],
    faqs: [
      { q: 'How long does inbox warmup take?', a: 'Typically two to four weeks to reach safe sending volume, depending on your target volume and how the domain responds — rushing it risks reputation damage.' },
    ],
    cta: { href: '/agents/outbound', label: 'Let Keres warm your inboxes' },
  },
  {
    slug: 'spam-score',
    term: 'Spam Score & Sender Reputation',
    aka: ['sender reputation', 'sender score'],
    category: 'Email Deliverability',
    targetKeyword: 'what is a spam score',
    title: 'What Is a Spam Score? Sender Reputation Explained | Keres AI',
    description:
      'A spam score rates how likely your email is to be filtered as spam, based on sender reputation, content, and authentication. Learn how to lower yours.',
    definition:
      'A spam score estimates how likely a message or sender is to be filtered as spam, based on factors like sender reputation, authentication, content, and recipient engagement. A high spam score sends mail to the junk folder; a strong sender reputation — built through authentication, <a href="/glossary/inbox-warmup">warmup</a>, and low complaint rates — keeps you in the inbox.',
    sections: [
      {
        h2: 'How to lower your spam score',
        body:
          'Authenticate with <a href="/glossary/spf">SPF</a>/<a href="/glossary/dkim">DKIM</a>/<a href="/glossary/dmarc">DMARC</a>, warm up new senders, keep lists clean, avoid spam-trigger content and excessive links, and maintain healthy engagement so complaints stay low.',
      },
    ],
    related: ['email-deliverability', 'inbox-warmup', 'spf', 'dmarc'],
    faqs: [
      { q: 'What hurts sender reputation the most?', a: 'High bounce rates, spam complaints, sending to stale or purchased lists, and sudden volume spikes from an unwarmed domain.' },
    ],
    cta: { href: '/agents/outbound', label: 'Protect your sender reputation' },
  },
  {
    slug: 'missed-call-recovery',
    term: 'Missed-Call Recovery',
    category: 'AI Receptionist',
    targetKeyword: 'what is missed call recovery',
    title: 'What Is Missed-Call Recovery? Definition | Keres AI',
    description:
      'Missed-call recovery is the practice of recapturing leads from calls you didn’t answer. Learn how AI answering and text-back turn missed calls into booked jobs.',
    definition:
      'Missed-call recovery is the practice of recapturing the revenue from calls your business doesn’t answer. Because most callers who hit voicemail never call back — they dial a competitor — recovery means answering more calls live (with a 24/7 AI receptionist) and instantly re-engaging the ones you do miss by text, so leads don’t walk.',
    sections: [
      {
        h2: 'Why missed calls cost so much',
        body:
          'Around 8 in 10 callers won’t leave a voicemail, and after-hours calls are the most likely to be missed and the most likely to be high-intent. Use the <a href="/tools/missed-call-calculator">missed-call calculator</a> to size the leak, then close it with an <a href="/glossary/ai-receptionist">AI receptionist</a> that answers every call.',
      },
    ],
    related: ['ai-receptionist', 'missed-call-text-back', 'call-overflow', 'lead-qualification'],
    faqs: [
      { q: 'What percentage of missed calls are lost for good?', a: 'Most — the majority of callers who reach voicemail never leave a message and simply call the next business, so an unanswered call is usually a lost lead.' },
      { q: 'How does AI recover missed calls?', a: 'An AI receptionist answers calls you’d otherwise miss (after hours, overflow) live, and missed-call text-back instantly re-engages any that still slip through.' },
    ],
    cta: { href: '/use-cases/lead-capture', label: 'Recover your missed calls' },
  },
  {
    slug: 'conversational-ai',
    term: 'Conversational AI',
    aka: ['voice AI', 'AI voice agent'],
    category: 'AI Receptionist',
    targetKeyword: 'what is conversational ai',
    title: 'What Is Conversational AI? Definition | Keres AI',
    description:
      'Conversational AI understands and replies in natural language by voice or text. How it works, how it differs from IVR and chatbots, and what it costs.',
    definition:
      'Conversational AI is software that understands what a person says or types in their own words and replies in natural language. It combines speech recognition, a language model and speech synthesis to hold a two-way conversation, follow context and complete tasks such as booking an appointment.',
    sections: [
      {
        h2: 'How conversational AI works',
        body:
          '<p>On a phone call, each turn of the conversation goes through five steps:</p> <ol> <li><strong>Speech recognition</strong> turns the caller’s audio into text as they speak.</li> <li><strong>Language understanding</strong>, usually a large language model, works out what the caller wants and what information is still missing.</li> <li><strong>Tools and rules</strong> let it act: check calendar availability, look up a customer, or follow your escalation rules.</li> <li><strong>Response generation</strong> writes the reply, kept to your script and approved facts.</li> <li><strong>Speech synthesis</strong> reads the reply aloud in a natural voice, and the loop repeats until the task is done.</li> </ol> <p>In text channels such as chat and SMS, the first and last steps drop out; the middle is the same.</p>',
      },
      {
        h2: 'Conversational AI vs chatbots and IVR',
        body:
          '<p>Rule-based chatbots and <a href="/glossary/ivr">IVR</a> menus follow fixed scripts: the user picks from options the designer anticipated. Conversational AI handles open-ended input, interruptions and corrections (“actually, Thursday is better”). The trade-off is control. A scripted system can only say what was written; a conversational system needs clear instructions, approved facts and escalation rules so it stays accurate. That is why business deployments pair it with guardrails and a human fallback.</p>',
      },
      {
        h2: 'What conversational AI costs',
        body:
          '<p>Building conversational AI yourself means paying for speech, language-model and telephony usage, plus the engineering time to connect and test it. Packaged products such as AI receptionists usually charge a monthly rate with included minutes. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p><a href="/agents/inbound">Remi</a> is Keres AI’s conversational AI for the phone. It answers in two rings, 24/7, asks your intake questions in conversation rather than through a menu, books into Google Calendar, HubSpot or ServiceTitan, and escalates to a person by your rules. Calls Remi couldn’t take get a text back within 60 seconds. Remi answers in English today.</p>',
      },
    ],
    related: ['ai-receptionist', 'ivr', 'call-routing', 'lead-qualification'],
    faqs: [
      { q: 'Is an AI receptionist conversational AI?', a: 'Yes. An AI receptionist is a voice application of conversational AI built to answer business calls, ask intake questions and book appointments.' },
      { q: 'What is the difference between conversational AI and a chatbot?', a: 'A traditional chatbot follows a fixed script and a menu of options. Conversational AI understands open-ended language, keeps track of context and can complete tasks, though it still needs rules and approved facts to stay accurate.' },
      { q: 'Can conversational AI make mistakes?', a: 'Yes. It can mishear a word or misunderstand a request. Well-run systems read key details back to the caller, stick to approved information and hand unclear or sensitive calls to a person.' },
    ],
    cta: { href: '/agents/inbound', label: 'Hear Remi on a call' },
  },
  {
    slug: 'ivr',
    term: 'IVR (Interactive Voice Response)',
    aka: ['phone tree', 'auto attendant'],
    category: 'AI Receptionist',
    targetKeyword: 'what is ivr',
    title: 'What Is IVR? Interactive Voice Response | Keres AI',
    description:
      'IVR (interactive voice response) is the automated phone menu that routes callers by keypad or voice. How it works, what it costs, and IVR vs AI receptionists.',
    definition:
      'IVR (interactive voice response) is an automated phone system that greets callers with a recorded menu and routes them by keypad presses or short spoken answers, such as “press 1 for sales.” It directs calls well but cannot hold an open conversation or book an appointment by itself.',
    sections: [
      {
        h2: 'How IVR works',
        body:
          '<p>A typical IVR call runs like this:</p> <ol> <li>The call reaches your phone system and plays a recorded greeting.</li> <li>The caller hears a menu and presses a key or says a short phrase.</li> <li>The system matches that input to a rule you configured: a department, an extension, a voicemail box or a recorded message such as your hours.</li> <li>Deeper menus repeat the process until the call reaches a destination.</li> <li>If nobody is free at the destination, the caller waits on hold or leaves a voicemail.</li> </ol> <p>Some IVR systems also look up account data, such as an order status, when they are connected to a database. Speech-enabled IVR accepts spoken words, but only the options its menu expects.</p>',
      },
      {
        h2: 'IVR vs AI receptionist',
        body:
          '<p>IVR routes; an <a href="/glossary/ai-receptionist">AI receptionist</a> resolves. With IVR the caller does the sorting, and there still has to be a person at the end to book the job. An AI receptionist uses <a href="/glossary/conversational-ai">conversational AI</a> to understand the request in the caller’s own words, asks your intake questions, and books the appointment on the same call. IVR still makes sense for large organizations with many departments and callers who already know which one they want. For a small business with one front desk, a menu mostly adds steps before the caller reaches the same voicemail.</p>',
      },
      {
        h2: 'What IVR costs',
        body:
          '<p>Basic auto-attendant menus are often included in business phone and VoIP plans, while contact-center IVR is priced by its vendor per seat or per minute. The larger cost is what happens after the menu: if nobody picks up, the call is still missed. AI receptionists are usually billed as a monthly rate with included minutes. See <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p>Keres AI does not put callers in a menu. <a href="/agents/inbound">Remi</a> answers in two rings, 24/7, asks the caller what they need, asks your intake questions, and books into Google Calendar, HubSpot or ServiceTitan. Calls that need a person are escalated by your rules, and calls Remi couldn’t take get a text back within 60 seconds. You can also keep an existing menu and forward one option, or your after-hours calls, to Remi. Remi answers in English today.</p>',
      },
    ],
    related: ['ai-receptionist', 'conversational-ai', 'call-routing', 'call-overflow'],
    faqs: [
      { q: 'Is IVR the same as an AI receptionist?', a: 'No. IVR plays a menu and routes the call based on a key press or short phrase. An AI receptionist holds a conversation, asks your intake questions and books the appointment during the call.' },
      { q: 'What is the difference between IVR and an auto attendant?', a: 'The terms overlap. An auto attendant usually means a simple menu that transfers calls to extensions; IVR can also take spoken input and look up information, such as an account balance, before routing the call.' },
      { q: 'Why do callers dislike IVR menus?', a: 'Menus make the caller do the sorting, and a wrong choice can mean starting over or landing in voicemail. Callers with an urgent problem may press zero or hang up instead.' },
      { q: 'Can I replace my IVR with an AI receptionist?', a: 'Yes. You forward your number, or one menu option, to an AI receptionist, which answers in natural language, handles routine requests and routes only the calls that need a person.' },
    ],
    cta: { href: '/agents/inbound', label: 'Replace the menu with Remi' },
  },
  {
    slug: 'call-routing',
    term: 'Call Routing',
    aka: ['call distribution', 'call flow'],
    category: 'AI Receptionist',
    targetKeyword: 'what is call routing',
    title: 'What Is Call Routing? Definition & Rules | Keres AI',
    description:
      'Call routing sends each inbound call to the right person, team or destination using rules. How routing works, rule-based vs AI routing, and what it costs.',
    definition:
      'Call routing is the set of rules that decides where an inbound call goes: to a person, team, location, queue or voicemail. Rules can use the time of day, the number dialed, the caller’s menu choice or what the caller says, and who is available to answer.',
    sections: [
      {
        h2: 'How call routing works',
        body:
          '<ol> <li><strong>The call arrives</strong> on a number you own, and your phone system reads what it knows: the number dialed, the caller ID and the time.</li> <li><strong>Rules are checked in order.</strong> For example: business hours go to the front desk, after hours go to the answering service, and the number on your ads goes to the sales line.</li> <li><strong>The caller may be asked.</strong> An <a href="/glossary/ivr">IVR</a> menu or an AI receptionist finds out what the caller needs.</li> <li><strong>The call is connected</strong> to a person, a ring group, a queue or a voicemail box.</li> <li><strong>A fallback applies</strong> if nobody answers within a set number of rings: <a href="/glossary/call-overflow">overflow</a> to another line, a backup answerer or voicemail.</li> </ol>',
      },
      {
        h2: 'Rule-based routing vs AI routing',
        body:
          '<p>Traditional routing uses fixed signals: the time, the number dialed and the key the caller pressed. It is predictable and inexpensive, but the caller does the sorting, and a wrong choice sends them to the wrong place. AI routing listens to the request in the caller’s own words, answers or books what it can, and connects only the calls that need a person, with the details already collected. Common rule types apply to both: time of day, round-robin across a team, by location or service area, and by skill or department.</p>',
      },
      {
        h2: 'What call routing costs',
        body:
          '<p>Basic routing rules come with most business phone systems. The cost that matters is the calls routing sends nowhere: a ring group nobody picks up, or voicemail after hours. If you are comparing routing through an AI receptionist, see <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p><a href="/agents/inbound">Remi</a> answers every call first, in two rings, 24/7. It asks your intake questions, books routine appointments into Google Calendar, HubSpot or ServiceTitan, and escalates to a person by the rules you set, for example sending an after-hours emergency to the technician on call. Calls Remi couldn’t take get a text back within 60 seconds. See <a href="/glossary/after-hours-answering">after-hours answering</a> and <a href="/glossary/emergency-dispatch">emergency dispatch</a>.</p>',
      },
    ],
    related: ['ai-receptionist', 'ivr', 'call-overflow', 'after-hours-answering'],
    faqs: [
      { q: 'What is the difference between call routing and call forwarding?', a: 'Call forwarding sends every call from one number to another. Call routing applies rules, such as time of day or what the caller needs, to decide where each call goes.' },
      { q: 'Can AI route calls to the right person?', a: 'Yes. An AI receptionist asks what the caller needs, handles routine requests itself and escalates the rest by your rules. Keres AI’s Remi escalates to a person based on rules you set, such as emergencies after hours.' },
      { q: 'What happens when a routed call isn’t answered?', a: 'It falls to the fallback you set: another line, a backup answerer or voicemail. Without a live fallback, the caller reaches voicemail and may call someone else.' },
      { q: 'What is round-robin call routing?', a: 'Round-robin rotates incoming calls across a group so each person takes calls in turn, which spreads the load evenly across a team.' },
    ],
    cta: { href: '/agents/inbound', label: 'See how Remi routes calls' },
  },
  {
    slug: 'appointment-reminders',
    term: 'Appointment Reminders',
    aka: ['appointment confirmations', 'reminder texts'],
    category: 'AI Receptionist',
    targetKeyword: 'what are appointment reminders',
    title: 'What Are Appointment Reminders? | Keres AI',
    description:
      'Appointment reminders are automated texts, calls or emails that confirm upcoming visits. How they work, when to send them, and how they help cut no-shows.',
    h1: 'What are appointment reminders?',
    definition:
      'Appointment reminders are automated messages, usually texts, calls or emails, sent before an appointment to confirm it and give the customer an easy way to confirm, reschedule or cancel. They reduce no-shows by keeping the visit in mind and making a change easier than simply not turning up.',
    sections: [
      {
        h2: 'How appointment reminders work',
        body:
          '<ol> <li><strong>The appointment is booked</strong> and written to your calendar or practice system.</li> <li><strong>A confirmation goes out</strong> straight away with the date, time, address and how to make changes.</li> <li><strong>Reminders follow on a schedule you set</strong>, for example a few days before and again the day before.</li> <li><strong>The customer replies</strong> to confirm, reschedule or cancel.</li> <li><strong>Changes update the calendar</strong>, and an opened slot can be offered to someone on your waitlist.</li> </ol>',
      },
      {
        h2: 'Confirmations vs reminders, one-way vs two-way',
        body:
          '<p>A confirmation is sent at booking to say the appointment exists. A reminder is sent closer to the date to make sure it still happens. One-way reminders only inform; two-way reminders let the customer reply, which turns a likely no-show into a reschedule you can refill. Only send reminder texts to customers who gave you their number for that purpose, and follow the messaging rules that apply to your business.</p>',
      },
      {
        h2: 'What appointment reminders cost',
        body:
          '<p>Reminder features are often bundled into scheduling and practice-management software, sometimes with per-message charges for texts; stand-alone texting tools usually bill by message volume. When reminders come with an AI receptionist plan, see <a href="/ai-receptionist-cost">how much an AI receptionist costs</a> and <a href="/pricing">Keres AI pricing</a>. To see what no-shows cost you now, use the <a href="/tools/dental-no-show-calculator">no-show calculator</a>.</p>',
      },
      {
        h2: 'How Keres AI handles it',
        body:
          '<p>Reminders are handled by <a href="/agents/follow-up">Theo</a>, Keres AI’s follow-up worker, included from the Convert plan. Theo confirms each appointment as soon as it is booked, reminds by text and voice on the schedule you set, handles a reschedule in the same thread, and offers a cancelled slot to your waitlist. The appointments themselves come from <a href="/agents/inbound">Remi</a>, which books into Google Calendar, HubSpot or ServiceTitan.</p>',
      },
    ],
    related: ['appointment-booking-automation', 'no-show-rate', 'ai-receptionist', 'patient-intake'],
    faqs: [
      { q: 'When should appointment reminders be sent?', a: 'It depends on how far ahead people book. A common pattern is a confirmation at booking, a reminder a few days ahead for appointments booked weeks out, and another the day before. Test and adjust for your customers.' },
      { q: 'Do appointment reminders reduce no-shows?', a: 'They help, especially two-way reminders that make rescheduling easy, because a customer who can change the time is less likely to simply not turn up. Estimate what no-shows cost you with the <a href="/tools/dental-no-show-calculator">no-show calculator</a>.' },
      { q: 'Should appointment reminders be texts, calls or emails?', a: 'Texts suit short-notice reminders, email suits longer details such as forms or directions, and a voice call reaches customers who don’t read texts. Many businesses combine them.' },
      { q: 'What is the difference between an appointment confirmation and a reminder?', a: 'A confirmation is sent when the appointment is booked. A reminder is sent closer to the date to make sure it still happens and to offer an easy way to change it.' },
    ],
    cta: { href: '/agents/follow-up', label: 'See how Theo sends reminders' },
  },
  {
    slug: 'lead-scoring',
    term: 'Lead Scoring',
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is lead scoring',
    title: 'What Is Lead Scoring? Definition & How It Works | Keres AI',
    description:
      'Lead scoring ranks prospects by how likely they are to convert, so your team focuses on the best opportunities. Learn how it works and how AI scores leads automatically.',
    definition:
      'Lead scoring is a method of ranking prospects by how likely they are to convert, using signals like fit (industry, size, role), intent, and engagement. A higher score means a hotter lead. It lets sales teams prioritize the opportunities most worth their time instead of treating every lead the same.',
    sections: [
      {
        h2: 'Scoring inbound and outbound leads',
        body:
          'On inbound calls, an AI receptionist captures the fit and urgency signals that feed a score during <a href="/glossary/lead-qualification">qualification</a>. On outbound, the <a href="/glossary/ai-sdr">AI SDR</a> prioritizes engaged repliers so your closers work the warmest prospects first.',
      },
    ],
    related: ['lead-qualification', 'ai-sdr', 'cold-email-outreach'],
    faqs: [
      { q: 'How is lead scoring different from lead qualification?', a: 'Qualification decides whether a lead is a fit; scoring ranks qualified leads by how likely and how soon they’ll convert, so you prioritize the best ones.' },
    ],
    cta: { href: '/agents/outbound', label: 'Prioritize your best leads' },
  },
  {
    slug: 'outbound-sales',
    term: 'Outbound Sales',
    aka: ['outbound prospecting'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is outbound sales',
    title: 'What Is Outbound Sales? Definition | Keres AI',
    description:
      'Outbound sales is proactively reaching prospects who haven’t contacted you — by email, phone, or social. Learn how an AI SDR scales outbound and books meetings.',
    definition:
      'Outbound sales is the practice of proactively reaching out to prospects who haven’t contacted you first — through cold email, calls, or social — to start sales conversations. Unlike inbound (where buyers come to you), outbound lets you target exactly who you want, and an AI SDR scales the email motion and books the meetings.',
    sections: [
      {
        h2: 'How AI scales outbound sales',
        body:
          'An <a href="/glossary/ai-sdr">AI SDR</a> runs the outbound engine: building lists, personalizing <a href="/glossary/email-sequence">sequences</a>, managing <a href="/glossary/email-deliverability">deliverability</a>, handling replies, and booking meetings — the work that used to require a team of reps.',
      },
    ],
    related: ['ai-sdr', 'cold-email-outreach', 'email-sequence', 'reply-rate'],
    faqs: [
      { q: 'What’s the difference between outbound and inbound sales?', a: 'Outbound means you reach out to prospects first; inbound means they come to you. Outbound gives you control over targeting, which an AI SDR scales efficiently.' },
    ],
    cta: { href: '/agents/outbound', label: 'Scale outbound with AI' },
  },
  {
    slug: 'reply-rate',
    term: 'Reply Rate',
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is a good cold email reply rate',
    title: 'What Is Reply Rate? Cold Email Benchmarks | Keres AI',
    description:
      'Reply rate is the percentage of outbound emails that get a response. Learn what a good cold email reply rate looks like and what drives it.',
    definition:
      'Reply rate is the percentage of outbound emails that receive a response — the metric that matters most in cold email, because replies, not opens, lead to booked meetings. It’s driven by targeting, personalization, a clear ask, disciplined follow-up, and strong <a href="/glossary/email-deliverability">deliverability</a> so messages actually reach the inbox.',
    sections: [
      {
        h2: 'What drives reply rate',
        body:
          'Tight targeting and genuine personalization beat volume. Most replies come from follow-ups, so a multi-step <a href="/glossary/email-sequence">sequence</a> matters — and none of it works if your email lands in spam, which is why deliverability is the foundation.',
      },
    ],
    related: ['cold-email-outreach', 'email-sequence', 'email-deliverability', 'ai-sdr'],
    faqs: [
      { q: 'What is a good cold email reply rate?', a: 'It varies by market and offer, but well-targeted, personalized, well-delivered campaigns aim for meaningfully higher reply rates than generic blasts — quality of targeting and deliverability matter more than volume.' },
    ],
    cta: { href: '/agents/outbound', label: 'Improve your reply rate' },
  },
  {
    slug: 'email-bounce-rate',
    term: 'Email Bounce Rate',
    aka: ['hard bounce', 'soft bounce'],
    category: 'Email Deliverability',
    targetKeyword: 'what is email bounce rate',
    title: 'What Is Email Bounce Rate? Hard vs Soft Bounces | Keres AI',
    description:
      'Email bounce rate is the share of emails that fail to deliver. Hard vs. soft bounces, and why a high bounce rate hurts your inbox placement.',
    definition:
      'Email bounce rate is the percentage of emails that fail to deliver and are returned. A hard bounce is a permanent failure (invalid address); a soft bounce is temporary (full mailbox, server issue). A high bounce rate signals poor list quality to mailbox providers and damages your <a href="/glossary/spam-score">sender reputation</a>.',
    sections: [
      {
        h2: 'Keeping bounce rate low',
        body:
          'Verify and clean lists before sending, remove invalid addresses, and warm new domains. High bounces from stale or purchased lists are a fast way to wreck <a href="/glossary/email-deliverability">deliverability</a> — list hygiene is part of what Keres manages.',
      },
    ],
    related: ['email-deliverability', 'spam-score', 'inbox-warmup'],
    faqs: [
      { q: 'What’s the difference between a hard and soft bounce?', a: 'A hard bounce is a permanent delivery failure (e.g. the address doesn’t exist); a soft bounce is temporary (e.g. a full mailbox). Repeated hard bounces hurt your reputation most.' },
    ],
    cta: { href: '/agents/outbound', label: 'Keep your lists clean' },
  },
  {
    slug: 'email-blacklist',
    term: 'Email Blacklist',
    aka: ['DNSBL', 'block list'],
    category: 'Email Deliverability',
    targetKeyword: 'what is an email blacklist',
    title: 'What Is an Email Blacklist? How to Avoid It | Keres AI',
    description:
      'An email blacklist is a database of IPs and domains flagged for sending spam. Learn how senders get blacklisted and how to protect your deliverability.',
    definition:
      'An email blacklist (or block list / DNSBL) is a database of IP addresses and domains flagged for sending spam. Mailbox providers check these lists, and being on one can send your mail straight to spam or block it entirely. Senders get listed for spam complaints, hitting spam traps, or sudden volume spikes from an unwarmed domain.',
    sections: [
      {
        h2: 'How to stay off blacklists',
        body:
          'Authenticate with <a href="/glossary/spf">SPF</a>/<a href="/glossary/dkim">DKIM</a>/<a href="/glossary/dmarc">DMARC</a>, warm new senders, keep complaints and <a href="/glossary/email-bounce-rate">bounces</a> low, and never send to purchased lists. Keres manages sending behavior to protect reputation and avoid listings.',
      },
    ],
    related: ['email-deliverability', 'spam-score', 'email-bounce-rate', 'inbox-warmup'],
    faqs: [
      { q: 'How do I know if I’m blacklisted?', a: 'Sudden drops in delivery and inbox placement are warning signs; blacklist-monitoring tools can confirm. Prevention — authentication, warmup, and clean lists — matters far more than removal.' },
    ],
    cta: { href: '/agents/outbound', label: 'Protect your sending reputation' },
  },
  {
    slug: 'after-hours-answering',
    term: 'After-Hours Answering',
    aka: ['after-hours answering service', 'after-hours call answering'],
    category: 'AI Receptionist',
    targetKeyword: 'what is after-hours answering',
    title: 'What Is After-Hours Answering? Definition | Keres AI',
    description:
      'After-hours answering handles calls that come in when your office is closed — booking appointments and capturing leads 24/7 so no after-hours caller is lost.',
    definition:
      'After-hours answering is a service that handles inbound calls outside normal business hours — evenings, weekends, and holidays. It ensures callers who reach out when your office is closed can still get help, book an appointment, or report an emergency, rather than reaching voicemail and calling a competitor. AI-powered after-hours answering does this automatically on a monthly plan, 24/7.',
    sections: [
      {
        h2: 'Why after-hours calls are your most valuable',
        body:
          'Service businesses miss the most calls after 5 PM and on weekends — exactly when homeowners discover a broken furnace, a burst pipe, or storm damage. These are high-urgency, high-intent callers. Every missed after-hours call is a job handed directly to the first competitor who picks up. An <a href="/glossary/ai-receptionist">AI receptionist</a> answers every after-hours call in two rings, books the job, and texts your on-call team for emergencies.',
      },
      {
        h2: 'After-hours answering vs. voicemail vs. answering service',
        body:
          'Voicemail captures a message most callers never leave. A human answering service usually bills by the minute or the call and often takes a message for you to return. An AI after-hours answering service answers unlimited calls simultaneously, books appointments during the conversation, handles emergencies, and costs one monthly rate — with no gaps at 3 AM.',
      },
    ],
    related: ['ai-receptionist', 'call-overflow', 'emergency-dispatch', 'missed-call-recovery'],
    faqs: [
      { q: 'Does Keres answer calls after hours?', a: 'Yes — Keres answers every call 24/7, including nights, weekends, and holidays, with no extra after-hours rate.' },
      { q: 'What happens to after-hours emergencies?', a: 'Keres identifies emergency calls, captures the details, books the visit, and texts your on-call team immediately — so urgent jobs reach your crew the moment they come in.' },
      { q: 'Is after-hours answering worth it for small businesses?', a: 'Typically yes — a significant share of service calls arrive outside business hours, and each one is a job opportunity lost if it goes to voicemail.' },
    ],
    cta: { href: '/24-7-ai-receptionist', label: 'See after-hours answering in action' },
  },
  {
    slug: 'emergency-dispatch',
    term: 'Emergency Dispatch',
    aka: ['emergency call dispatch', 'dispatch automation'],
    category: 'AI Receptionist',
    targetKeyword: 'what is emergency dispatch',
    title: 'What Is Emergency Dispatch? Definition | Keres AI',
    description:
      'Emergency dispatch routes urgent calls — HVAC no-cools, burst pipes, storm damage, roadside rescues — to your on-call crew instantly. Learn how AI automates it.',
    definition:
      'Emergency dispatch is the process of identifying an urgent inbound request — a no-heat call at midnight, a burst pipe, a stranded motorist — and routing it immediately to the on-call crew who can respond. In service businesses, every minute of delay in an emergency can mean a lost job or a worse outcome for the customer. AI emergency dispatch handles this in real time, 24/7, without needing a human on the phones.',
    sections: [
      {
        h2: 'How AI emergency dispatch works',
        body:
          'When a call comes in, the AI receptionist answers in two rings and qualifies the situation. If the caller describes an emergency — no heat in winter, a burst pipe, a downed tree, a stranded vehicle — the AI captures the address, situation, and contact details, books the service call, and simultaneously texts your on-call technician or dispatcher. The crew gets everything they need in seconds, not minutes.',
      },
      {
        h2: 'Which industries rely on emergency dispatch',
        body:
          '<a href="/ai-receptionist-for-hvac">HVAC companies</a> dispatch for no-heat and no-cool emergencies. <a href="/ai-receptionist-for-plumbers">Plumbers</a> dispatch for burst pipes and floods. <a href="/ai-receptionist-for-roofing">Roofing companies</a> dispatch for emergency tarps after storms. <a href="/ai-receptionist-for-towing">Towing companies</a> dispatch for roadside assistance. In each case, the AI answers the call live, qualifies the emergency, and alerts the right person instantly.',
      },
    ],
    related: ['ai-receptionist', 'after-hours-answering', 'call-routing', 'appointment-booking-automation'],
    faqs: [
      { q: 'Can an AI receptionist identify an emergency call?', a: 'Yes. Keres recognizes emergency language — no heat, flooding, gas smell, stranded motorist — and escalates immediately to your on-call crew by text, while keeping the caller engaged.' },
      { q: 'What information does the AI capture for dispatch?', a: 'Address, callback number, nature of the emergency, urgency level, and any other details your dispatch workflow requires — all sent to your team in seconds.' },
    ],
    cta: { href: '/agents/inbound', label: 'Set up AI emergency dispatch' },
  },
  {
    slug: 'patient-intake',
    term: 'Patient Intake',
    aka: ['new patient intake', 'medical intake'],
    category: 'AI Receptionist',
    targetKeyword: 'what is patient intake',
    title: 'What Is Patient Intake? How AI Automates It | Keres AI',
    description:
      'Patient intake collects the information needed before a new patient appointment — demographics, insurance, medical history. Learn how AI handles it automatically on every call.',
    definition:
      'Patient intake is the process of collecting essential information from a new patient before their first appointment — including contact details, insurance coverage, medical history, reason for visit, and consent. It traditionally involves forms, phone calls, and manual data entry. AI patient intake automates the collection during the booking call, so the patient is ready to see the provider before they walk in.',
    sections: [
      {
        h2: 'Why intake is the bottleneck for dental and med spa growth',
        body:
          'Every missed new-patient call or delayed intake process costs a high-value appointment. For <a href="/industries/dental-med-spa">dental practices</a> and <a href="/industries/dental-med-spa">med spas</a>, a new patient can be worth thousands of dollars in lifetime value — but only if the intake is smooth enough that they don\'t book somewhere more responsive. AI intake collects what you need during the call, confirms the appointment, and logs it to your calendar or CRM.',
      },
      {
        h2: 'What AI collects during patient intake',
        body:
          'The AI captures name, date of birth, insurance provider and ID, reason for visit, primary care provider if relevant, and any pre-treatment questions you configure — then syncs the record to your system. For <a href="/industries/dental-med-spa">med spas</a>, it books the treatment or consultation and collects only what is needed to book; clinical history stays with your clinician.',
      },
    ],
    related: ['ai-receptionist', 'appointment-booking-automation', 'no-show-rate', 'appointment-reminders'],
    faqs: [
      { q: 'Can AI collect patient intake over the phone?', a: 'Yes. Keres asks the intake questions you configure during the booking call, captures the answers, and sends them to your team before the appointment (practice-management integrations are rolling out).' },
      { q: 'Is AI patient intake HIPAA compliant?', a: 'It depends on the vendor. Keres is not HIPAA certified and does not sign BAAs today, so tell us your requirements before you sign up.' },
    ],
    cta: { href: '/industries/dental-med-spa', label: 'See AI patient intake for dental' },
  },
  {
    slug: 'legal-intake',
    term: 'Legal Intake',
    aka: ['law firm intake', 'client intake for lawyers'],
    category: 'AI Receptionist',
    targetKeyword: 'what is legal intake',
    title: 'What Is Legal Intake? Definition for Law Firms | Keres AI',
    description:
      'Legal intake is the process of qualifying and onboarding new legal clients — capturing case details, running conflict checks, and booking consultations. Learn how AI automates it.',
    definition:
      'Legal intake is the structured process by which a law firm evaluates and onboards a potential new client — capturing the nature of the matter, checking for conflicts of interest, screening for jurisdiction and statute of limitations, assessing case merit, and booking the initial consultation. Because intake quality directly determines which matters a firm takes on, most firms want it handled consistently and confidentially, 24/7.',
    sections: [
      {
        h2: 'The stakes of missed legal intake calls',
        body:
          'Most people searching for a lawyer call multiple firms and hire the first one that picks up and sounds competent. A missed intake call after hours or while your paralegal is tied up doesn\'t just lose a client — it hands a potentially high-value contingency case to a competitor. An AI receptionist answers every inquiry instantly, runs your conflict-screening questions, and books the consultation before the caller moves on.',
      },
      {
        h2: 'Conflict screening in AI legal intake',
        body:
          'Before booking a consultation, good legal intake screens for conflicts of interest — capturing adverse party names, matter type, and any existing relationships with the firm. Keres asks the conflict-check questions you configure and flags potential conflicts to your staff for review before confirming the booking, protecting the firm from inadvertent representation.',
      },
    ],
    related: ['ai-receptionist', 'lead-qualification', 'appointment-booking-automation', 'patient-intake'],
    faqs: [
      { q: 'Can AI handle conflict screening for a law firm?', a: 'It can collect what a conflict check needs. Keres asks your configured conflict-check questions and captures opposing party names and matter type, then passes them to your team to run the check against your matter list; the AI never clears a conflict itself.' },
      { q: 'Is AI legal intake confidential?', a: 'Keres never uses intake data to train third-party AI models and limits access to the people who run your account. It does not hold a SOC 2 report; raise specific confidentiality requirements before you sign.' },
      { q: 'What practice areas work well with AI intake?', a: 'Personal injury, family law, criminal defense, immigration, estate planning, and employment law all have structured intake processes that AI handles well — capturing the matter details and qualifying the caller before booking.' },
    ],
    cta: { href: '/industries/law-firms', label: 'See AI legal intake' },
  },
  {
    slug: 'no-show-rate',
    term: 'No-Show Rate',
    aka: ['appointment no-show', 'patient no-show rate'],
    category: 'AI Receptionist',
    targetKeyword: 'what is a no-show rate',
    title: 'What Is No-Show Rate? How to Reduce It With AI | Keres AI',
    description:
      'No-show rate is the percentage of booked appointments where the client doesn\'t arrive. Learn what drives it and how automated reminders and easy rescheduling cut it.',
    definition:
      'No-show rate is the percentage of scheduled appointments where the patient or client doesn\'t appear and hasn\'t cancelled. For service businesses, dental practices, and med spas, a high no-show rate means unbillable time, disrupted schedules, and lost revenue. Automated appointment reminders and easy rescheduling — sent by text at the right intervals — are the most reliable way to cut no-show rates significantly.',
    sections: [
      {
        h2: 'The revenue cost of no-shows',
        body:
          'Industry estimates put a single dental no-show at roughly $200–$500 in lost revenue, and a missed med-spa injection appointment often higher — exact figures vary by practice, geography, and treatment mix. Multiplied across a month, even a 10–15% no-show rate is a significant, avoidable loss. Most no-shows happen because the patient forgot or found a scheduling conflict — both solvable with timely <a href="/glossary/appointment-reminders">appointment reminders</a> and frictionless rescheduling.',
      },
      {
        h2: 'How AI reminders reduce no-shows',
        body:
          'An <a href="/glossary/ai-receptionist">AI receptionist</a> sends automatic text confirmations immediately after booking, then a reminder 48 hours before the appointment, and a final check-in the morning of. When a patient replies to reschedule, the AI handles it on the spot — refilling the slot instead of leaving it empty. This two-step (remind + reschedule) cycle is the most proven way to keep no-show rates in the low single digits.',
      },
    ],
    related: ['appointment-reminders', 'appointment-booking-automation', 'patient-intake', 'ai-receptionist'],
    faqs: [
      { q: 'What is a good no-show rate for a dental practice?', a: 'Well-run practices typically target under 5% no-show rates. Automated text reminders with easy rescheduling are the most effective lever — practices without reminders often see 15–25%.' },
      { q: 'Does AI rescheduling actually refill cancelled slots?', a: 'Yes — because the rescheduling happens in real time, a cancellation text at 8 AM can be re-booked by another patient the same morning rather than sitting empty.' },
    ],
    cta: { href: '/agents/inbound', label: 'Reduce no-shows with AI booking' },
  },
  {
    slug: 'lead-response-time',
    term: 'Lead Response Time',
    aka: ['speed to lead', 'lead follow-up time'],
    category: 'AI Receptionist',
    targetKeyword: 'what is lead response time',
    title: 'What Is Lead Response Time? Definition | Keres AI',
    description:
      'Lead response time is how quickly you contact a new lead after they reach out. Research consistently shows the first business to respond wins the job — learn how AI closes the gap.',
    definition:
      'Lead response time (also called speed to lead) is the time between a prospect first reaching out — calling, submitting a form, or clicking an ad — and receiving a response from your business. Research consistently shows that responding within the first minute dramatically increases the likelihood of qualifying the lead, and that the first business to respond wins the majority of competitive inquiries. Every minute of delay reduces your chance of closing.',
    sections: [
      {
        h2: 'Why speed to lead is the most important sales metric',
        body:
          'Harvard Business Review research found that companies contacting leads within one hour are seven times more likely to qualify them than those who wait an hour, and 60 times more likely than those who wait 24 hours. For inbound phone calls, the window is even shorter — a caller who hits voicemail typically dials the next business within seconds. An <a href="/glossary/ai-receptionist">AI receptionist</a> answers in two rings, making response time effectively instant.',
      },
      {
        h2: 'How AI eliminates response time for phone leads',
        body:
          'A human front desk can only answer one call at a time, misses calls while busy, and can\'t staff nights and weekends at the same cost as business hours. An AI receptionist answers unlimited concurrent calls in two rings, 24/7 — including the after-hours calls that are statistically your most valuable. For outbound, the <a href="/glossary/ai-sdr">AI SDR</a> follows up with email leads within minutes of their first interaction.',
      },
    ],
    related: ['ai-receptionist', 'missed-call-recovery', 'after-hours-answering', 'lead-qualification'],
    faqs: [
      { q: 'What is the ideal lead response time?', a: 'Under one minute for inbound calls and under five minutes for web form leads. An AI receptionist achieves this by answering calls in two rings 24/7 — making response time instant for every call.' },
      { q: 'How much does slow response time cost?', a: 'Use the <a href="/tools/missed-call-calculator">missed-call calculator</a> to estimate the revenue you lose per month to unanswered or delayed responses.' },
    ],
    cta: { href: '/tools/missed-call-calculator', label: 'Calculate what slow response costs you' },
  },
  {
    slug: 'front-desk-automation',
    term: 'Front Desk Automation',
    aka: ['AI front desk', 'automated front desk'],
    category: 'AI Receptionist',
    targetKeyword: 'what is front desk automation',
    title: 'What Is Front Desk Automation? Definition | Keres AI',
    description:
      'Front desk automation uses AI to answer calls, book appointments, qualify leads and answer questions, replacing or supplementing human receptionists.',
    definition:
      'Front desk automation uses AI to perform the core tasks of a business\'s front desk without human staff: answering every call, greeting callers, booking and rescheduling appointments, qualifying and routing leads, answering common questions, collecting intake information, and escalating emergencies. It runs 24/7, scales to unlimited simultaneous calls, and costs a fraction of full-time front desk staffing.',
    sections: [
      {
        h2: 'What front desk automation replaces',
        body:
          'A traditional front desk staff member costs $35,000–$50,000 per year, handles one call at a time, works 40 hours a week, and takes vacations. Front desk automation covers all call-handling tasks continuously — including nights, weekends, call surges, and emergencies — at a predictable monthly cost. It doesn\'t replace the human judgment calls, but it handles everything routine, which is 80% of the volume.',
      },
      {
        h2: 'Industries where front desk automation delivers the most value',
        body:
          'Any business with high inbound call volume: <a href="/ai-receptionist-for-hvac">HVAC</a> and home-services contractors, <a href="/industries/dental-med-spa">dental practices</a>, <a href="/industries/dental-med-spa">med spas</a>, <a href="/industries/real-estate">real estate teams</a>, and <a href="/industries/law-firms">law firms</a>. In each case, every missed or delayed call is a revenue leak that automation closes permanently.',
      },
    ],
    related: ['ai-receptionist', 'appointment-booking-automation', 'lead-response-time', 'after-hours-answering'],
    faqs: [
      { q: 'Does front desk automation replace human receptionists?', a: 'It replaces the routine tasks — answering calls, booking appointments, capturing leads, answering FAQs — and handles them better at scale. Most businesses use it alongside a human team, freeing staff for higher-value work.' },
      { q: 'What is the ROI of front desk automation?', a: 'Use the <a href="/tools/staffing-savings-estimator">staffing savings estimator</a> to calculate how much you could save compared to a full-time or part-time front desk hire.' },
    ],
    cta: { href: '/agents/inbound', label: 'Automate your front desk with Keres' },
  },
  {
    slug: 'dispatch-automation',
    term: 'Dispatch Automation',
    aka: ['automated dispatch', 'AI dispatch'],
    category: 'AI Receptionist',
    targetKeyword: 'what is dispatch automation',
    title: 'What Is Dispatch Automation? AI for Field Service | Keres AI',
    description:
      'Dispatch automation uses AI to capture service requests, qualify urgency, assign jobs, and alert your field crew — without a human dispatcher on every call.',
    definition:
      'Dispatch automation uses software to capture inbound service requests, assess urgency, assign the job to the right crew member, and communicate dispatch details — reducing or eliminating the need for a human dispatcher to manually handle every call. For field-service businesses like HVAC, plumbing, roofing, and towing, automated dispatch means faster response times, fewer missed jobs, and 24/7 coverage even when the office is closed.',
    sections: [
      {
        h2: 'How AI dispatch works for field-service businesses',
        body:
          'When a customer calls with a service request, the AI receptionist answers in two rings, captures the job details (address, issue type, urgency), and assesses whether it\'s a routine job or an emergency. Routine calls get booked on the calendar in the appropriate scheduling window. Emergency calls — a no-heat in January, a burst pipe, a stranded motorist at midnight — get immediate dispatch alerts texted to the on-call technician, with all job details. No dispatcher required for the intake.',
      },
      {
        h2: 'Dispatch automation integrations',
        body:
          'Keres writes new jobs to <a href="/integrations/servicetitan">ServiceTitan</a> today; Jobber and Housecall Pro are rolling out. New jobs sync automatically — the dispatcher sees every call-driven booking in the same system they already manage, without manual data entry.',
      },
    ],
    related: ['emergency-dispatch', 'ai-receptionist', 'after-hours-answering', 'appointment-booking-automation'],
    faqs: [
      { q: 'Does Keres automate dispatch for HVAC companies?', a: 'Yes. Keres answers HVAC calls 24/7, qualifies service requests and emergencies, books jobs in ServiceTitan or your calendar, and texts your on-call tech for urgent dispatch immediately.' },
      { q: 'What field-service software does Keres dispatch into?', a: 'ServiceTitan today. Jobber, Housecall Pro and others are rolling out; Zapier covers many other systems in the meantime.' },
    ],
    cta: { href: '/ai-receptionist-for-hvac', label: 'See AI dispatch for HVAC' },
  },
  {
    slug: 'google-business-profile',
    term: 'Google Business Profile',
    aka: ['GBP', 'Google My Business', 'Google Maps listing'],
    category: 'Local Search',
    targetKeyword: 'what is a google business profile',
    title: 'What Is a Google Business Profile? | Keres AI',
    description:
      'A Google Business Profile is the free listing that shows your business on Google Search and Maps. How it works, what changed, and what managing it costs.',
    h1: 'What is a Google Business Profile?',
    definition:
      'A Google Business Profile is the free listing Google shows for a local business in Search and Maps. It holds your name, category, address or service area, hours, phone number, photos, services and reviews, and it is often the first thing a nearby customer sees before deciding to call.',
    sections: [
      {
        h2: 'How a Google Business Profile works',
        body:
          '<ol> <li><strong>Create or claim the profile.</strong> Google may already have a listing for your business built from public information; you claim it rather than start over.</li> <li><strong>Verify it.</strong> Google chooses which verification methods to offer, for example a video recording, phone, text or email.</li> <li><strong>Set the basics:</strong> primary and secondary categories, services, hours, phone, website, and either an address or a service area if you visit customers.</li> <li><strong>Keep it active:</strong> add photos, publish posts, update holiday hours and reply to reviews.</li> <li><strong>Google ranks it</strong> in local results on relevance, distance and prominence, the three factors Google describes in its <a href="https://support.google.com/business/answer/7091" rel="noopener" target="_blank">guide to local ranking</a>.</li> </ol>',
      },
      {
        h2: 'What changed: chat and Q&A are gone',
        body:
          '<p>Some older guides still recommend features that no longer exist. <a href="https://support.google.com/business/answer/14919062" rel="noopener" target="_blank">Google ended Business Profile chat on July 31, 2024</a>, and removed the Questions &amp; Answers section from Business Profiles in late 2025. Calls, website visits, direction requests and reviews are what remain, so the phone number on the profile has to be answered. A management plan that still bills for chat or Q&amp;A is out of date.</p>',
      },
      {
        h2: 'Google Business Profile vs your website',
        body:
          '<p>The profile is where people decide whether to call; the website is where they go for more detail. Google controls the profile’s layout and can show edits suggested by the public, so it needs regular checking. You control the website completely. They work best when they agree: the same name, phone, hours and services on both, so Google and customers see one consistent business. See <a href="/glossary/nap-consistency">NAP consistency</a>.</p>',
      },
      {
        h2: 'What a Google Business Profile costs',
        body:
          '<p>The profile is free from Google. The cost is the time to keep it current, or a service that does it for you. Found, Keres AI’s visibility plan, starts from $249 a month ($499 for law firms), month-to-month, with no build fee at the base tier. See <a href="/google-business-profile-management">Google Business Profile management</a> for what that covers, and <a href="/pricing">pricing</a> for how quotes are set.</p>',
      },
      {
        h2: 'How Keres AI’s Found handles it',
        body:
          '<p><a href="/services/found">Found</a> optimizes the profile once (categories, services, photos and verification), then works it every week: posts, photo updates, review responses, reporting spam listings that compete with you, and monthly insights. It runs the profile alongside your website, review requests and listings so all of them agree. The number on the profile can be answered by <a href="/agents/inbound">Remi</a> in two rings, 24/7.</p>',
      },
    ],
    related: ['map-pack', 'review-generation', 'nap-consistency', 'local-services-ads'],
    faqs: [
      { q: 'Is a Google Business Profile free?', a: 'Yes. Creating and managing a profile costs nothing from Google. Paying a service to manage it is optional; Keres AI’s Found includes profile management from $249 a month.' },
      { q: 'Does Google Business Profile still have chat or Q&A?', a: 'No. Google ended Business Profile chat on July 31, 2024, and removed the Questions & Answers section from Business Profiles in late 2025.' },
      { q: 'Is Google Business Profile the same as Google My Business?', a: 'Yes. Google My Business was renamed Google Business Profile in 2021. The listing works the same way.' },
      { q: 'Can a service-area business hide its address?', a: 'Yes. Businesses that serve customers at the customer’s location, such as plumbers, can show a service area instead of a street address.' },
    ],
    cta: { href: '/google-business-profile-management', label: 'See Google Business Profile management' },
  },
  {
    slug: 'local-services-ads',
    term: 'Local Services Ads',
    aka: ['LSA', 'Google Guaranteed ads', 'Google Screened ads'],
    category: 'Local Search',
    targetKeyword: 'what are google local services ads',
    title: 'What Are Google Local Services Ads? | Keres AI',
    description:
      'Local Services Ads are Google ads for service businesses that charge per lead, not per click. How they work, how Google ranks them, and what they cost.',
    h1: 'What are Local Services Ads?',
    definition:
      'Local Services Ads are Google ads for local service businesses that often appear at the top of results for searches like “plumber near me.” Businesses pass Google’s screening and pay for leads, such as calls and messages, rather than clicks. Approved businesses show a Google Guaranteed or Google Screened badge.',
    sections: [
      {
        h2: 'How Local Services Ads work',
        body:
          '<ol> <li><strong>Check eligibility.</strong> Local Services Ads are offered for specific service categories and locations, which Google lists.</li> <li><strong>Pass screening.</strong> Depending on the category, Google’s checks can include business registration, licenses, insurance and background checks.</li> <li><strong>Set up the ad:</strong> services, service area, hours and a weekly budget.</li> <li><strong>Receive leads.</strong> Customers call or message from the ad, and you pay for leads, not clicks or impressions.</li> <li><strong>Answer and earn reviews.</strong> Google lists responsiveness to customer inquiries and your reviews among the factors it uses to rank these ads.</li> </ol>',
      },
      {
        h2: 'How Google ranks Local Services Ads',
        body:
          '<p>Google’s Local Services help pages list the factors it uses, including your proximity to the customer, your review score and number of reviews, how responsive you are to customer inquiries, your business hours, and serious or repeated complaints about your business. Two of those are things a business controls day to day: answering every lead, and asking every customer for a review.</p>',
      },
      {
        h2: 'Local Services Ads vs Google Search ads',
        body:
          '<p>Standard Google Search ads charge per click, rank on bids and ad quality, and let you write the ad and choose keywords. Local Services Ads charge per lead, use a fixed format showing your rating and badge, and Google decides which searches they appear on from your service categories and area. They reward operational basics, answering and reviews, more than ad copy. Keres AI does not manage standard Google Search ads; that work is referred out.</p>',
      },
      {
        h2: 'What Local Services Ads cost',
        body:
          '<p>You set a weekly budget and pay per lead. Lead cost varies by service category and location, so there is no single price; Google shows an estimate during setup. The Local Services Ads add-on to Found is quoted with the plan. Found starts from $249 a month ($499 for law firms), month-to-month. See <a href="/pricing">pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI’s Found handles it',
        body:
          '<p>Local Services Ads setup and response is an add-on to <a href="/services/found">Found</a>: verification, listing, and answering. <a href="/agents/inbound">Remi</a> answers each lead’s call in two rings, 24/7, asks your intake questions and books into Google Calendar, HubSpot or ServiceTitan. Found also sends a review request after every job and manages your <a href="/google-business-profile-management">Google Business Profile</a>, which covers the review side of the ranking factors.</p>',
      },
    ],
    related: ['google-business-profile', 'review-generation', 'map-pack', 'lead-response-time'],
    faqs: [
      { q: 'How much do Local Services Ads cost?', a: 'You set a weekly budget and pay per lead rather than per click. Lead cost varies by service category and location, so check the estimate Google shows for your business during setup.' },
      { q: 'How does Google rank Local Services Ads?', a: 'Google lists factors including your proximity to the customer, your review score and number of reviews, how responsive you are to customer inquiries, your business hours, and serious or repeated complaints.' },
      { q: 'What is the difference between Google Guaranteed and Google Screened?', a: 'Both are badges for businesses that pass Google’s checks. Google Guaranteed is used for home-service categories; Google Screened is used for professional services such as law firms.' },
      { q: 'Does Keres AI manage Local Services Ads?', a: 'Yes, as an add-on to Found: verification, listing, and answering every lead in two rings with Remi. Keres AI does not manage standard Google Search ads.' },
    ],
    cta: { href: '/services/found', label: 'See Found and its add-ons' },
  },
  {
    slug: 'map-pack',
    term: 'Map Pack (Local Pack)',
    aka: ['local pack', 'local 3-pack', 'Google Maps results'],
    category: 'Local Search',
    targetKeyword: 'what is the google map pack',
    title: 'What Is the Google Map Pack (Local Pack)? | Keres AI',
    description:
      'The map pack is the map and short list of local businesses Google shows for nearby searches. How Google picks them, and what a business can influence.',
    h1: 'What is the map pack?',
    definition:
      'The map pack, also called the local pack, is the map and short list of businesses, usually three, that Google shows near the top of results for local searches such as “dentist near me.” Each entry comes from a Google Business Profile and shows the rating, hours and a call button.',
    sections: [
      {
        h2: 'How the map pack works',
        body:
          '<ol> <li>Someone searches for a service with local intent, or Google infers it from their location.</li> <li>Google finds Business Profiles that match the search (<strong>relevance</strong>), using categories, services and other profile details.</li> <li>It weighs how far each business is from the searcher, or from the place named in the search (<strong>distance</strong>).</li> <li>It weighs how well known each business is (<strong>prominence</strong>), which Google says includes review count and score and information from across the web, such as links, articles and directories.</li> <li>The top results show in the pack; “More places” opens the full list in Maps.</li> </ol> <p>Google describes these factors in its guide to <a href="https://support.google.com/business/answer/7091" rel="noopener" target="_blank">improving your local ranking</a>, and says there is no way to request or pay for a better local ranking.</p>',
      },
      {
        h2: 'Map pack vs organic results vs Local Services Ads',
        body:
          '<p>Organic results below the pack are web pages, ranked mainly on the page itself. The map pack lists businesses and is driven by the Business Profile. <a href="/glossary/local-services-ads">Local Services Ads</a>, when they show, sit above both and are paid per lead. A local business can appear in all three for the same search, and each one needs the same phone number answered.</p>',
      },
      {
        h2: 'What it costs to appear in the map pack',
        body:
          '<p>Appearing in the map pack is free, and Google says you can’t pay for a better local ranking. The cost is the work behind it: a complete profile, a steady flow of reviews, consistent listings and a website that supports the services you list. Found covers that work from $249 a month ($499 for law firms), month-to-month, with no build fee at the base tier. See <a href="/pricing">pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI’s Found handles it',
        body:
          '<p><a href="/services/found">Found</a> works on the parts a business can influence: the profile’s categories, services and photos, weekly posts and review replies; a review request after every job; one consistent name, address and phone across Apple, Bing, Yelp, Nextdoor and Angi; and a website built for your trade. Distance is the one factor nobody can change, which is why no honest provider can guarantee a map pack position. See <a href="/google-business-profile-management">Google Business Profile management</a>.</p>',
      },
    ],
    related: ['google-business-profile', 'review-generation', 'nap-consistency', 'local-services-ads'],
    faqs: [
      { q: 'How many businesses are in the Google map pack?', a: 'Usually three, with a link to see more in Google Maps. The exact layout changes with the search and the device.' },
      { q: 'How do I get my business into the map pack?', a: 'Google says local results are based on relevance, distance and prominence. Keep your Business Profile complete and accurate, ask every customer for a review, keep your listings consistent, and make sure your website supports the services you list.' },
      { q: 'Can I pay to appear in the map pack?', a: 'Not in the unpaid local results; Google says there is no way to request or pay for a better local ranking. Ads, including Local Services Ads, can appear near local results and are labelled as sponsored.' },
    ],
    cta: { href: '/google-business-profile-management', label: 'See Google Business Profile management' },
  },
  {
    slug: 'nap-consistency',
    term: 'NAP Consistency (Citations)',
    aka: ['NAP', 'local citations', 'business listings'],
    category: 'Local Search',
    targetKeyword: 'what is nap consistency',
    title: 'What Is NAP Consistency? Local Citations | Keres AI',
    description:
      'NAP consistency means your business name, address and phone match everywhere you are listed online. Why it matters for local search and how to fix it.',
    h1: 'What is NAP consistency?',
    definition:
      'NAP consistency means your business name, address and phone number appear the same way everywhere you are listed online: your Google Business Profile, website, Apple Maps, Bing, Yelp and industry directories. Each listing is a citation. Matching details help customers and search engines recognize one business.',
    sections: [
      {
        h2: 'How NAP cleanup works',
        body:
          '<ol> <li><strong>Pick the canonical version</strong> of your name, address and phone, usually as it appears on your Google Business Profile and signage.</li> <li><strong>Find your existing listings</strong>, including ones created automatically by data providers or left over from a previous owner or address.</li> <li><strong>Fix the differences:</strong> an old phone number, a previous address, a different suite format, or a name with extra keywords added.</li> <li><strong>Merge or remove duplicates</strong>, which split reviews and confuse customers.</li> <li><strong>Check again</strong> after a move, a new number or a rebrand, because old details can resurface from data providers.</li> </ol>',
      },
      {
        h2: 'Why NAP consistency matters',
        body:
          '<p>Google says prominence in local results is based partly on information about a business from across the web, such as links, articles and directories, in its <a href="https://support.google.com/business/answer/7091" rel="noopener" target="_blank">guide to local ranking</a>. Conflicting details make that information harder to tie to one business. They also cost calls directly: a customer who finds an old number on one directory reaches a dead line or someone else.</p>',
      },
      {
        h2: 'NAP vs citations',
        body:
          '<p>Citations are the listings and mentions themselves; NAP consistency is whether they agree. A structured citation is a directory listing with fields, such as Yelp, Angi or Apple Business Connect. An unstructured citation is a mention in an article, blog or local news story. Both should carry the same name, address and phone.</p>',
      },
      {
        h2: 'What NAP consistency costs',
        body:
          '<p>Fixing listings yourself is free but slow, because each directory has its own login and verification. Listing services charge to push one set of details out and keep it there. In Keres AI’s Found, listings and citations are part of the plan, from $249 a month ($499 for law firms), month-to-month. See <a href="/pricing">pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI’s Found handles it',
        body:
          '<p><a href="/services/found">Found</a> keeps one consistent name, address and phone across Apple, Bing, Yelp, Nextdoor and Angi, plus Avvo and FindLaw for law firms or Healthgrades for practices, matched to your Google Business Profile and website. Found’s AI search visibility add-on extends the same consistency to the details AI assistants read about your business. See <a href="/google-business-profile-management">Google Business Profile management</a>.</p>',
      },
    ],
    related: ['google-business-profile', 'map-pack', 'review-generation', 'local-services-ads'],
    faqs: [
      { q: 'What does NAP stand for?', a: 'Name, address and phone number. Some people add a W for website (NAPW).' },
      { q: 'What is a local citation?', a: 'Any online mention of your business name, address and phone, such as a directory listing on Yelp or Angi or a mention in a local news article.' },
      { q: 'Do service-area businesses need NAP consistency?', a: 'Yes. Even if your address is hidden on Google, your name and phone still appear across directories, and an old phone number on one listing sends customers to a dead line.' },
      { q: 'How do I find inconsistent listings?', a: 'Search your business name together with old phone numbers and addresses, then check the major directories one by one. A listings service can run the scan for you.' },
    ],
    cta: { href: '/services/found', label: 'See what Found manages' },
  },
  {
    slug: 'review-generation',
    term: 'Review Generation',
    aka: ['review requests', 'getting more Google reviews'],
    category: 'Local Search',
    targetKeyword: 'what is review generation',
    title: 'What Is Review Generation? Rules & Methods | Keres AI',
    description:
      'Review generation is asking every customer for an online review after the job. How it works, why review gating is not allowed, and what it costs.',
    definition:
      'Review generation is the routine of asking every customer for an online review after the job, usually by text or email with a direct link to your Google Business Profile. Done properly, every customer gets the same request, whatever you think of how the job went.',
    sections: [
      {
        h2: 'How review generation works',
        body:
          '<ol> <li><strong>Trigger on a finished job:</strong> a completed work order, a closed matter or a finished visit.</li> <li><strong>Send one short request</strong> by text or email with a direct link to your Google review form.</li> <li><strong>Send one reminder</strong> if there is no reply, then stop.</li> <li><strong>Reply to every review</strong>, positive or negative, within a few days.</li> <li><strong>Track your rating and review count</strong> monthly, and follow up on problems customers raise.</li> </ol>',
      },
      {
        h2: 'Review gating and the rules',
        body:
          '<p>Review gating means asking customers how they feel first and sending only the happy ones to Google. Google’s review policy does not allow businesses to selectively solicit positive reviews or discourage negative ones, and it does not allow offering incentives for reviews. In the US, the FTC’s rule on consumer reviews and testimonials (16 CFR Part 465) bars fake reviews, incentives conditioned on a review expressing a particular sentiment, and suppressing negative reviews through threats, intimidation or false accusations. The safe pattern is simple: ask every customer the same way.</p>',
      },
      {
        h2: 'Review generation vs reputation management',
        body:
          '<p>Review generation brings in new reviews. Reputation management is broader: replying to reviews, flagging fake or policy-violating ones to Google, fixing the problems customers raise, and watching the trend. A steady flow of genuine reviews matters because Google says review count and score factor into local search ranking. See the <a href="/glossary/map-pack">map pack</a>.</p>',
      },
      {
        h2: 'What review generation costs',
        body:
          '<p>Asking for reviews costs nothing but the habit, which is what usually breaks down in a busy week. Review software automates the request and is usually priced per location per month. In Keres AI’s Found, review generation is included, from $249 a month ($499 for law firms), month-to-month; the quote depends partly on how many review requests you send each month. See <a href="/pricing">pricing</a>.</p>',
      },
      {
        h2: 'How Keres AI’s Found handles it',
        body:
          '<p><a href="/services/found">Found</a> sends an automated review request after every job or matter, the same request to every customer. It drafts owner replies for your approval, passes any problem a customer reports to you so you can fix it, and gives you a monthly rating report. Nothing filters who receives the review link. See <a href="/google-business-profile-management">Google Business Profile management</a>.</p>',
      },
    ],
    related: ['google-business-profile', 'map-pack', 'local-services-ads', 'nap-consistency'],
    faqs: [
      { q: 'What is review gating?', a: 'Review gating is screening customers first and asking only the satisfied ones to post a public review. Google’s policy does not allow selectively soliciting positive reviews, so every customer should get the same request.' },
      { q: 'Can I offer a discount for a Google review?', a: 'No. Google’s policy does not allow incentives for reviews, and the FTC rule (16 CFR Part 465) bars incentives conditioned on a review expressing a particular sentiment.' },
      { q: 'When should I ask a customer for a review?', a: 'Soon after the job is finished, while the experience is fresh, with a direct link so it takes the customer a minute. One reminder is enough.' },
      { q: 'Should I reply to negative reviews?', a: 'Yes. A calm, specific reply that offers to fix the problem shows future customers how you handle issues. Never threaten or pressure a reviewer to remove a review.' },
    ],
    cta: { href: '/services/found', label: 'See how Found asks for reviews' },
  },
];

export const glossaryCategories = [
  'AI Receptionist',
  'AI SDR & Outbound',
  'Email Deliverability',
  'Local Search',
] as const;
