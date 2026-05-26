// Data-driven integration pages. Add an entry → a new /integrations/{slug} page builds.
export interface Integration {
  slug: string;
  name: string;
  category: 'Phone & SMS' | 'Calendar' | 'CRM' | 'Field Service' | 'Automation';
  targetKeyword: string;
  title: string;
  description: string;
  intro: string; // 40–60 word direct-answer block
  does: string[]; // what the integration enables
  syncs: string[]; // data that flows
  faqs: { q: string; a: string }[];
  related: string[]; // other integration slugs
}

export const integrations: Integration[] = [
  {
    slug: 'servicetitan',
    name: 'ServiceTitan',
    category: 'Field Service',
    targetKeyword: 'servicetitan ai receptionist',
    title: 'Keres AI + ServiceTitan — AI Receptionist for ServiceTitan | Keres AI',
    description:
      'Connect Keres AI to ServiceTitan to answer every call 24/7 and book jobs straight into your ServiceTitan tenant. Customers, calls, and jobs sync automatically.',
    intro:
      'The Keres AI receptionist connects to ServiceTitan so every inbound call is answered 24/7, booked as a job, and written to your ServiceTitan tenant in real time. Customer records, call details, and appointments sync automatically — no manual data entry, no missed leads during peak season.',
    does: [
      'Answer every call 24/7 and book jobs directly in ServiceTitan',
      'Create and update customer records as calls come in',
      'Capture call details and outcomes against the right job',
      'Escalate emergencies to your dispatcher by text',
    ],
    syncs: ['Customers & contacts', 'Jobs & appointments', 'Call records & summaries', 'Service locations'],
    faqs: [
      { q: 'Does the Keres AI receptionist book jobs in ServiceTitan?', a: 'Yes. Keres checks availability and creates the job directly in your ServiceTitan tenant during the call, then texts the customer a confirmation.' },
      { q: 'Will customer records sync to ServiceTitan?', a: 'Yes — Keres creates and updates customers, jobs, and call records in ServiceTitan in real time.' },
    ],
    related: ['jobber', 'housecall-pro', 'google-calendar'],
  },
  {
    slug: 'jobber',
    name: 'Jobber',
    category: 'Field Service',
    targetKeyword: 'jobber ai receptionist',
    title: 'Keres AI + Jobber — AI Receptionist That Books Into Jobber | Keres AI',
    description:
      'Connect Keres AI to Jobber to answer calls 24/7 and book work directly in Jobber. Quotes, jobs, and customers sync both ways.',
    intro:
      'Keres connects to Jobber so the AI receptionist answers every call, books the work, and keeps your Jobber account up to date automatically. Quotes, jobs, invoices, and customers sync bi-directionally — so your schedule and records stay accurate without anyone touching a keyboard.',
    does: [
      'Answer and book service calls straight into Jobber',
      'Create and update clients as leads come in',
      'Schedule and reschedule jobs on your Jobber calendar',
      'Alert your on-call team for emergencies',
    ],
    syncs: ['Clients & properties', 'Jobs & visits', 'Quotes & invoices', 'Call summaries'],
    faqs: [
      { q: 'Can Keres schedule jobs in Jobber automatically?', a: 'Yes. The AI checks availability and books or reschedules the visit in Jobber during the call.' },
      { q: 'Is the Jobber sync two-way?', a: 'Yes — clients, jobs, and scheduling stay in sync between Keres and Jobber.' },
    ],
    related: ['servicetitan', 'housecall-pro', 'google-calendar'],
  },
  {
    slug: 'housecall-pro',
    name: 'Housecall Pro',
    category: 'Field Service',
    targetKeyword: 'housecall pro ai receptionist',
    title: 'Keres AI + Housecall Pro — AI Receptionist Integration | Keres AI',
    description:
      'Connect Keres AI to Housecall Pro to answer every call 24/7 and book jobs into Housecall Pro. Customers, jobs, and payments stay in sync.',
    intro:
      'Keres connects to Housecall Pro so the AI receptionist answers every call, books the job, and updates Housecall Pro automatically. Customers, jobs, and payment records sync both ways, keeping your dispatch board accurate around the clock — even on nights and weekends.',
    does: [
      'Answer calls 24/7 and book jobs in Housecall Pro',
      'Create and update customers automatically',
      'Keep your schedule current with two-way sync',
      'Escalate urgent calls to your team instantly',
    ],
    syncs: ['Customers', 'Jobs & schedule', 'Payments', 'Call records'],
    faqs: [
      { q: 'Does Keres work with Housecall Pro scheduling?', a: 'Yes — Keres books and reschedules jobs on your Housecall Pro calendar during the call.' },
      { q: 'What syncs between Keres and Housecall Pro?', a: 'Customers, jobs, schedule, and payment records sync two-way.' },
    ],
    related: ['servicetitan', 'jobber', 'google-calendar'],
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    category: 'CRM',
    targetKeyword: 'hubspot ai receptionist integration',
    title: 'Keres AI + HubSpot — AI Receptionist & SDR for HubSpot | Keres AI',
    description:
      'Connect Keres AI to HubSpot to log every call, create contacts and deals as leads qualify, and book meetings — inbound and outbound, straight into your CRM.',
    intro:
      'Keres connects to HubSpot so every qualified call and outbound reply becomes a contact, deal, or task in your CRM automatically. The AI receptionist logs calls and books meetings, and the AI SDR pushes outbound activity into HubSpot — keeping your pipeline accurate without manual entry.',
    does: [
      'Create and update contacts as leads qualify',
      'Log calls, summaries, and outcomes to the timeline',
      'Create deals and tasks for your sales team',
      'Book meetings straight onto reps’ calendars',
    ],
    syncs: ['Contacts & companies', 'Deals & tasks', 'Call & meeting activity', 'Lead qualification fields'],
    faqs: [
      { q: 'Does Keres log calls in HubSpot?', a: 'Yes. Every call, summary, and outcome is written to the contact’s HubSpot timeline automatically.' },
      { q: 'Can Keres create deals in HubSpot?', a: 'Yes — as leads qualify, Keres creates contacts, deals, and follow-up tasks for your team.' },
    ],
    related: ['zapier', 'google-calendar', 'outlook'],
  },
  {
    slug: 'twilio',
    name: 'Twilio',
    category: 'Phone & SMS',
    targetKeyword: 'twilio ai receptionist',
    title: 'Keres AI + Twilio — AI Receptionist on Your Twilio Numbers | Keres AI',
    description:
      'Connect Keres AI to Twilio to answer calls, send SMS, and stream voice transcripts through your Twilio numbers — a full AI receptionist on your existing telephony.',
    intro:
      'Keres runs on Twilio so the AI receptionist can answer calls, send SMS confirmations, and stream live transcripts through your existing Twilio numbers. Keep your number and telephony setup; Keres handles the conversation, booking, and follow-up on top of it.',
    does: [
      'Answer inbound calls on your Twilio numbers',
      'Send SMS confirmations and follow-ups',
      'Stream real-time voice transcripts',
      'Route and escalate calls programmatically',
    ],
    syncs: ['Inbound & outbound calls', 'SMS messages', 'Call transcripts', 'Phone numbers'],
    faqs: [
      { q: 'Can I keep my Twilio numbers with Keres?', a: 'Yes. Keres works on top of your existing Twilio numbers — no porting or new hardware required.' },
      { q: 'Does Keres send SMS through Twilio?', a: 'Yes — confirmations and follow-up texts are sent via your Twilio account.' },
    ],
    related: ['ringcentral', 'google-calendar', 'zapier'],
  },
  {
    slug: 'ringcentral',
    name: 'RingCentral',
    category: 'Phone & SMS',
    targetKeyword: 'ringcentral ai receptionist',
    title: 'Keres AI + RingCentral — AI Receptionist for RingCentral | Keres AI',
    description:
      'Connect Keres AI to RingCentral to auto-answer and intelligently route calls from your RingCentral numbers, 24/7, and book appointments automatically.',
    intro:
      'Keres connects to RingCentral so the AI receptionist auto-answers and intelligently routes calls from your RingCentral numbers around the clock. Callers reach a helpful AI in two rings, get booked on the calendar, and your team is alerted only when a human is genuinely needed.',
    does: [
      'Auto-answer calls on your RingCentral numbers',
      'Intelligently route and escalate calls',
      'Book appointments during the call',
      'Provide 24/7 overflow and after-hours coverage',
    ],
    syncs: ['Inbound calls', 'Call routing rules', 'Call records & summaries'],
    faqs: [
      { q: 'Does Keres work with my RingCentral phone system?', a: 'Yes — Keres auto-answers and routes calls from your RingCentral numbers without replacing your phone system.' },
      { q: 'Can Keres provide overflow for RingCentral?', a: 'Yes. Calls your team doesn’t pick up can forward to Keres, which answers instantly.' },
    ],
    related: ['twilio', 'google-calendar', 'outlook'],
  },
  {
    slug: 'google-calendar',
    name: 'Google Calendar',
    category: 'Calendar',
    targetKeyword: 'ai receptionist google calendar',
    title: 'Keres AI + Google Calendar — Book Appointments Automatically | Keres AI',
    description:
      'Connect Keres AI to Google Calendar so the AI receptionist books, confirms, and reschedules appointments on your team’s calendar in real time.',
    intro:
      'Keres connects to Google Calendar so the AI receptionist books, confirms, and reschedules appointments directly on your team’s calendar during the call. It checks real-time availability, avoids double-bookings, and texts the caller a confirmation — turning every call into a scheduled appointment.',
    does: [
      'Check real-time availability and book on the call',
      'Reschedule and cancel without phone tag',
      'Avoid double-bookings across team calendars',
      'Send automatic confirmations and reminders',
    ],
    syncs: ['Calendar events', 'Availability', 'Attendee details', 'Reminders'],
    faqs: [
      { q: 'Does Keres book directly on Google Calendar?', a: 'Yes. It checks availability and creates the event on the right calendar during the call, then confirms by text.' },
      { q: 'Can it handle multiple team calendars?', a: 'Yes — Keres can route bookings to the correct person or resource calendar.' },
    ],
    related: ['outlook', 'servicetitan', 'jobber'],
  },
  {
    slug: 'outlook',
    name: 'Outlook',
    category: 'Calendar',
    targetKeyword: 'ai receptionist outlook calendar',
    title: 'Keres AI + Outlook — AI Receptionist for Microsoft 365 | Keres AI',
    description:
      'Connect Keres AI to Outlook / Microsoft 365 so the AI receptionist books and reschedules appointments on your calendar in real time, two-way.',
    intro:
      'Keres connects to Outlook and Microsoft 365 so the AI receptionist books and reschedules appointments on your calendar with two-way sync. It reads real-time availability, books during the call, and keeps everyone’s calendar accurate — no double-bookings, no manual scheduling.',
    does: [
      'Two-way sync with Outlook / Microsoft 365 calendars',
      'Book and reschedule appointments live',
      'Respect real-time availability across the team',
      'Send confirmations and reminders automatically',
    ],
    syncs: ['Calendar events', 'Availability', 'Attendee details'],
    faqs: [
      { q: 'Does Keres support Microsoft 365 calendars?', a: 'Yes — Keres has two-way sync with Outlook and Microsoft 365 calendars.' },
      { q: 'Will it prevent double-bookings?', a: 'Yes. Keres reads live availability before booking, so slots can’t be double-booked.' },
    ],
    related: ['google-calendar', 'hubspot', 'ringcentral'],
  },
  {
    slug: 'zapier',
    name: 'Zapier',
    category: 'Automation',
    targetKeyword: 'keres ai zapier integration',
    title: 'Keres AI + Zapier — Connect to 6,000+ Apps | Keres AI',
    description:
      'Connect Keres AI to Zapier to trigger 6,000+ downstream apps from any Keres event — calls, bookings, and qualified leads, webhook-first.',
    intro:
      'Keres connects to Zapier so any event — a booked appointment, a qualified lead, a completed call — can trigger 6,000+ downstream apps automatically. It’s webhook-first, so you can pipe Keres data into virtually any tool in your stack without custom development.',
    does: [
      'Trigger 6,000+ apps from any Keres event',
      'Send bookings and leads anywhere in your stack',
      'Build custom workflows without code',
      'Connect tools Keres doesn’t natively support',
    ],
    syncs: ['Call events', 'Bookings', 'Qualified leads', 'Custom webhooks'],
    faqs: [
      { q: 'What can I automate with Keres and Zapier?', a: 'Anything triggered by a Keres event — booked appointments, qualified leads, or completed calls can flow into 6,000+ apps.' },
      { q: 'Is the Zapier integration webhook-based?', a: 'Yes — Keres is webhook-first, so it connects cleanly to Zapier and other automation tools.' },
    ],
    related: ['make', 'hubspot', 'twilio'],
  },
  {
    slug: 'make',
    name: 'Make',
    category: 'Automation',
    targetKeyword: 'keres ai make integration',
    title: 'Keres AI + Make (Integromat) — Automate Your Workflows | Keres AI',
    description:
      'Connect Keres AI to Make (Integromat) to use Keres events as triggers or actions in any scenario — automate bookings, leads, and follow-up across your stack.',
    intro:
      'Keres connects to Make (formerly Integromat) so you can wire Keres events into any scenario as a trigger or action. Route booked appointments, qualified leads, and call data through multi-step automations across your entire stack — no custom code required.',
    does: [
      'Use Keres events as triggers in Make scenarios',
      'Push data into any app Make supports',
      'Build multi-step automations visually',
      'Connect Keres to niche or internal tools',
    ],
    syncs: ['Call events', 'Bookings', 'Qualified leads', 'Custom webhooks'],
    faqs: [
      { q: 'Does Keres work with Make scenarios?', a: 'Yes — Keres events can act as triggers or actions inside Make scenarios.' },
      { q: 'Do I need to write code?', a: 'No. Make’s visual builder plus Keres’ webhooks let you automate without development.' },
    ],
    related: ['zapier', 'hubspot', 'twilio'],
  },
  {
    slug: 'fieldedge',
    name: 'FieldEdge',
    category: 'Field Service',
    targetKeyword: 'keres ai fieldedge integration',
    title: 'Keres AI + FieldEdge — AI Receptionist for HVAC & Plumbing | Keres AI',
    description:
      'Connect Keres AI to FieldEdge so every inbound call books a job directly in FieldEdge — dispatching techs, creating service agreements, and syncing customers automatically.',
    intro:
      'Keres connects to FieldEdge so every call that comes in gets answered and booked straight into your FieldEdge dispatch board. No manual data entry, no missed jobs — the AI receptionist answers, qualifies, and creates the work order while the caller is still on the line.',
    does: [
      'Create new service calls in FieldEdge during the call',
      'Sync customer records from caller ID to existing accounts',
      'Pull available technician slots for real-time booking',
      'Flag no-heat/no-cool emergencies for immediate dispatch',
    ],
    syncs: ['Service calls', 'Customer records', 'Technician availability', 'Work orders'],
    faqs: [
      { q: 'Does Keres AI integrate with FieldEdge?', a: 'Yes — Keres books service calls directly into FieldEdge during the inbound call, keeping your dispatch board up to date in real time.' },
      { q: 'Which field-service platforms does Keres support?', a: 'Keres integrates with FieldEdge, ServiceTitan, Jobber, Housecall Pro, and Service Fusion, plus Google Calendar and Outlook for businesses not on a field-service platform.' },
    ],
    related: ['servicetitan', 'jobber', 'housecall-pro'],
  },
  {
    slug: 'service-fusion',
    name: 'Service Fusion',
    category: 'Field Service',
    targetKeyword: 'keres ai service fusion integration',
    title: 'Keres AI + Service Fusion — AI Receptionist for Field Service | Keres AI',
    description:
      'Connect Keres AI to Service Fusion so every inbound call books directly onto your dispatch board — no voicemail, no missed leads, no manual entry.',
    intro:
      'Keres AI integrates with Service Fusion to answer every inbound call and create jobs on your dispatch board in real time. The AI qualifies the caller, checks technician availability, and books the service call directly in Service Fusion — then sends the caller an SMS confirmation.',
    does: [
      'Create jobs and service calls in Service Fusion during the call',
      'Match callers to existing customer records',
      'Book available tech slots without manual scheduling',
      'Send SMS confirmations to callers after booking',
    ],
    syncs: ['Jobs', 'Customer profiles', 'Dispatch schedule', 'Estimates'],
    faqs: [
      { q: 'Does Keres work with Service Fusion?', a: 'Yes — Keres answers calls and creates jobs in Service Fusion in real time, keeping your dispatch board current without manual data entry.' },
      { q: 'Can Keres handle after-hours calls and book into Service Fusion?', a: 'Yes. Keres operates 24/7, so emergency calls at night and weekend overflow get booked directly onto your Service Fusion dispatch board.' },
    ],
    related: ['servicetitan', 'jobber', 'fieldedge'],
  },
  {
    slug: 'acuity',
    name: 'Acuity Scheduling',
    category: 'Calendar',
    targetKeyword: 'keres ai acuity scheduling integration',
    title: 'Keres AI + Acuity Scheduling — Book Appointments by Phone | Keres AI',
    description:
      'Connect Keres AI to Acuity Scheduling so every inbound call books directly on your Acuity calendar — dental, med spa, and professional service bookings handled automatically 24/7.',
    intro:
      'Keres integrates with Acuity Scheduling so callers get booked in real time, by phone, into your Acuity calendar. Ideal for dental practices, med spas, and professional service providers — the AI receptionist handles intake questions, confirms availability, and locks in the appointment while the caller is still on the line.',
    does: [
      'Book appointments directly into Acuity during the call',
      'Check real-time availability across appointment types',
      'Capture intake information before the appointment',
      'Send SMS and email confirmations via Acuity',
    ],
    syncs: ['Appointments', 'Intake forms', 'Client records', 'Calendar availability'],
    faqs: [
      { q: 'Does Keres AI integrate with Acuity Scheduling?', a: 'Yes — Keres books appointments into Acuity in real time during the inbound call, so callers never need to visit your booking page unless they want to.' },
      { q: 'Is this integration good for dental or med spa practices?', a: 'Yes. Keres handles patient intake questions, confirms appointment type and availability, and books into Acuity — 24/7, including after hours and overflow.' },
    ],
    related: ['google-calendar', 'outlook', 'hubspot'],
  },
  {
    slug: 'slack',
    name: 'Slack',
    category: 'Automation',
    targetKeyword: 'keres ai slack integration',
    title: 'Keres AI + Slack — Real-Time Call Alerts for Your Team | Keres AI',
    description:
      'Connect Keres AI to Slack so your team gets instant notifications for every booked appointment, qualified lead, and emergency call — in the channel that matters.',
    intro:
      'Keres connects to Slack via webhook or Zapier so your team gets a real-time message every time a call is answered, a lead is qualified, or an emergency comes in. Booked-job summaries, lead details, and dispatch alerts land in the right channel the moment the call ends.',
    does: [
      'Post booked-job summaries to a Slack channel instantly',
      'Alert the on-call channel when an emergency call is dispatched',
      'Notify the sales channel when a new lead is qualified',
      'Route different call types to different Slack channels',
    ],
    syncs: ['Call summaries', 'Booked appointments', 'Lead details', 'Emergency alerts'],
    faqs: [
      { q: 'Does Keres AI send notifications to Slack?', a: 'Yes — Keres can push call summaries, new bookings, and emergency alerts to any Slack channel in real time via webhook or Zapier.' },
      { q: 'Do I need Zapier to connect Keres to Slack?', a: "You can use Zapier for the simplest setup, or connect directly via Keres' webhook to Slack's incoming webhook URL. Both approaches take under ten minutes." },
    ],
    related: ['zapier', 'make', 'hubspot'],
  },
];

export const integrationCategories = [
  'Phone & SMS',
  'Calendar',
  'CRM',
  'Field Service',
  'Automation',
] as const;
