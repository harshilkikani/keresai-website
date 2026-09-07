// Content for the product mocks (CallTranscript, DailyBrief,
// BookingConfirmation). These are the site's imagery — there are no
// stock photos — so they carry real product detail.
//
// They are ILLUSTRATIVE. Every mock renders an "Example" label and a
// caption saying it is not a customer account. Nothing here may be
// presented as a recorded customer call or as traction. Real numbers
// belong in <Stat> with a source; real recordings belong on /hear-it.
//
// Caller numbers use the 555-01xx range, which is reserved for
// fiction, so no mock can ever dial a real person.
//
// Vocabulary is per-vertical on purpose: consult / matter / conflict
// check for law, job / dispatch / estimate for home services, recall /
// chair time / hygiene for dental, showing / listing / buyer for real
// estate. A generic "customer" transcript on a vertical page fails.

export type Vertical = 'default' | 'law-firms' | 'home-services' | 'dental-med-spa' | 'real-estate';

export interface Turn {
  /** 'remi' lines are labelled with the agent's name and carry the accent. */
  who: 'remi' | 'caller';
  /** Elapsed time into the call, m:ss. */
  t: string;
  text: string;
}

export interface Transcript {
  label: string;
  duration: string;
  /** When the call came in — the after-hours ones do the most work. */
  when: string;
  /** Reserved-for-fiction caller line, shown in the mock header. */
  from: string;
  city: string;
  turns: Turn[];
  /** What was written to the calendar and the CRM before the call ended. */
  outcome: { k: string; v: string }[];
}

export const transcripts: Record<Vertical, Transcript> = {
  default: {
    label: 'Remi — example call',
    duration: '0:48',
    when: 'Tue 8:12 PM',
    from: '(555) 014-2207',
    city: 'Inbound · after hours',
    turns: [
      { who: 'remi', t: '0:00', text: 'Thanks for calling — this line is answered around the clock. How can I help?' },
      { who: 'caller', t: '0:04', text: "Oh — I figured I'd get voicemail at this hour." },
      { who: 'remi', t: '0:11', text: "You won't. What's going on?" },
      { who: 'caller', t: '0:16', text: 'I need someone out tomorrow if that is possible.' },
      { who: 'remi', t: '0:22', text: 'It is. I have tomorrow morning, 8 to 10, or the afternoon, 1 to 3. Which suits you?' },
      { who: 'caller', t: '0:30', text: 'Morning.' },
      { who: 'remi', t: '0:34', text: "Booked. I've texted you the confirmation, and the owner already has the details." },
    ],
    outcome: [
      { k: 'Answered in', v: '2 rings' },
      { k: 'Booked', v: 'Wed 8–10 AM' },
      { k: 'Owner notified', v: 'SMS, 8:13 PM' },
    ],
  },

  'law-firms': {
    label: 'Remi — example intake call',
    duration: '1:12',
    when: 'Sun 9:41 PM',
    from: '(555) 013-8890',
    city: 'New client · after hours',
    turns: [
      { who: 'remi', t: '0:00', text: 'Good evening, thank you for calling. This line is answered 24/7 — how can I help you tonight?' },
      { who: 'caller', t: '0:06', text: 'I was rear-ended this afternoon on Route 22. I do not know if I even have a case.' },
      { who: 'remi', t: '0:13', text: 'I am sorry that happened. First — are you injured, and did police respond to the scene?' },
      { who: 'caller', t: '0:20', text: 'Sore neck and shoulder. Yes, there is a report.' },
      { who: 'remi', t: '0:27', text: 'That helps. I will take your details and the other driver’s so the firm can run a conflict check before your consult.' },
      { who: 'caller', t: '0:38', text: 'How soon could I talk to an actual attorney?' },
      { who: 'remi', t: '0:44', text: 'Tomorrow. There is a consult at 9:30 AM or 2:00 PM. Which works?' },
      { who: 'caller', t: '0:52', text: '9:30.' },
      { who: 'remi', t: '0:56', text: 'Booked. Your intake summary is in the case file and the firm has it now.' },
    ],
    outcome: [
      { k: 'Consult booked', v: 'Mon 9:30 AM' },
      { k: 'Conflict check', v: 'Queued for review' },
      { k: 'Matter intake', v: 'Written to Clio' },
    ],
  },

  'home-services': {
    label: 'Remi — example emergency call',
    duration: '0:54',
    when: 'Fri 6:04 AM',
    from: '(555) 012-4416',
    city: 'Emergency · before open',
    turns: [
      { who: 'remi', t: '0:00', text: 'Thanks for calling — I can get a tech out to you today. What is happening?' },
      { who: 'caller', t: '0:05', text: 'No heat since last night. House is down to 54 and we have a newborn.' },
      { who: 'remi', t: '0:12', text: 'That is an emergency job and I am flagging it now. What is the service address?' },
      { who: 'caller', t: '0:19', text: '412 Miller Road.' },
      { who: 'remi', t: '0:24', text: 'Got it. Is this the same furnace we wrote an estimate for in the spring?' },
      { who: 'caller', t: '0:30', text: 'Same one.' },
      { who: 'remi', t: '0:34', text: 'Dispatching the on-call tech with an arrival window of 8 to 10 this morning. Confirmation text is on its way.' },
    ],
    outcome: [
      { k: 'Job created', v: 'Emergency — no heat' },
      { k: 'Dispatch window', v: 'Fri 8–10 AM' },
      { k: 'Written to', v: 'ServiceTitan' },
    ],
  },

  'dental-med-spa': {
    label: 'Remi — example patient call',
    duration: '0:51',
    when: 'Mon 7:22 AM',
    from: '(555) 011-6035',
    city: 'Existing patient · before open',
    turns: [
      { who: 'remi', t: '0:00', text: 'Good morning — the practice opens at eight, but I can book you now. What do you need?' },
      { who: 'caller', t: '0:06', text: 'I chipped a tooth on a bagel this morning. It is sharp.' },
      { who: 'remi', t: '0:13', text: 'Let us get you seen today. Are you an existing patient with us?' },
      { who: 'caller', t: '0:18', text: 'Yes, I came in for a hygiene visit in the spring.' },
      { who: 'remi', t: '0:24', text: 'Found your chart — you are also due for recall, so I will note that. There is chair time at 3:15 this afternoon.' },
      { who: 'caller', t: '0:35', text: 'I will take it.' },
      { who: 'remi', t: '0:39', text: 'Booked at 3:15. Your forms are on the way by text so you are not filling them out in the chair.' },
    ],
    outcome: [
      { k: 'Chair time', v: 'Today 3:15 PM' },
      { k: 'Recall', v: 'Flagged — overdue' },
      { k: 'Forms', v: 'Texted, pre-visit' },
    ],
  },

  'real-estate': {
    label: 'Remi — example buyer call',
    duration: '0:57',
    when: 'Sat 11:38 AM',
    from: '(555) 010-3374',
    city: 'Listing enquiry · weekend',
    turns: [
      { who: 'remi', t: '0:00', text: 'Thanks for calling — are you calling about one of the listings?' },
      { who: 'caller', t: '0:04', text: 'The one on Hawthorne. Is it still available?' },
      { who: 'remi', t: '0:09', text: 'It is. Are you working with an agent already?' },
      { who: 'caller', t: '0:14', text: 'No, just started looking.' },
      { who: 'remi', t: '0:18', text: 'Understood. Are you pre-approved, and what is your timeline?' },
      { who: 'caller', t: '0:24', text: 'Pre-approved to 550, hoping to move by spring.' },
      { who: 'remi', t: '0:31', text: 'I have a showing slot tomorrow at 11. Booking it now and sending the disclosures to your phone.' },
    ],
    outcome: [
      { k: 'Showing booked', v: 'Sun 11:00 AM' },
      { k: 'Buyer', v: 'Pre-approved, unrepresented' },
      { k: 'Written to', v: 'Follow Up Boss' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Owner Daily Brief
// ─────────────────────────────────────────────────────────────

export interface BriefLine {
  /** neutral → a count. good → money kept. warn → the one thing needing you. */
  tone: 'neutral' | 'good' | 'warn';
  n: string;
  text: string;
}

export interface Brief {
  when: string;
  heading: string;
  lines: BriefLine[];
  /** Revenue attributed by source — the reason owners open it. */
  source: string;
  /** The single action needing a person. There is only ever one. */
  action: string;
}

export const briefs: Record<Vertical, Brief> = {
  default: {
    when: 'Today 6:00 AM',
    heading: 'Yesterday',
    lines: [
      { tone: 'neutral', n: '23', text: 'calls answered' },
      { tone: 'neutral', n: '9', text: 'leads qualified' },
      { tone: 'good', n: '6', text: 'appointments booked' },
      { tone: 'good', n: '2', text: 'no-shows prevented' },
      { tone: 'good', n: '1', text: 'review posted' },
      { tone: 'warn', n: '1', text: 'caller asked for you by name' },
    ],
    source: 'Best source: Google Business Profile — 4 of 6 bookings.',
    action: 'Call back: the 4:50 PM caller wants you, not Remi.',
  },
  'law-firms': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday at the firm',
    lines: [
      { tone: 'neutral', n: '14', text: 'intake calls answered' },
      { tone: 'neutral', n: '6', text: 'matters qualified' },
      { tone: 'good', n: '4', text: 'consults booked' },
      { tone: 'good', n: '2', text: 'consult reminders confirmed' },
      { tone: 'good', n: '1', text: 'review posted' },
      { tone: 'warn', n: '1', text: 'conflict check needs a human' },
    ],
    source: 'Best source: Local Services Ads — 3 of 4 consults.',
    action: 'Review: the Route 22 matter may conflict with an existing client.',
  },
  'home-services': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday on the phones',
    lines: [
      { tone: 'neutral', n: '31', text: 'calls answered' },
      { tone: 'neutral', n: '12', text: 'jobs qualified' },
      { tone: 'good', n: '8', text: 'jobs dispatched' },
      { tone: 'good', n: '3', text: 'estimates followed up' },
      { tone: 'good', n: '2', text: 'reviews posted' },
      { tone: 'warn', n: '1', text: 'job has no tech assigned' },
    ],
    source: 'Best source: Google Business Profile — 5 of 8 jobs.',
    action: 'Assign: the 8–10 AM no-heat call on Miller Road needs a truck.',
  },
  'dental-med-spa': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday at the practice',
    lines: [
      { tone: 'neutral', n: '19', text: 'calls answered' },
      { tone: 'neutral', n: '7', text: 'new patients qualified' },
      { tone: 'good', n: '6', text: 'chairs filled' },
      { tone: 'good', n: '4', text: 'recalls rebooked' },
      { tone: 'good', n: '3', text: 'no-shows prevented' },
      { tone: 'warn', n: '2', text: 'today’s chairs unconfirmed' },
    ],
    source: 'Best source: recall campaign — 4 of 6 chairs.',
    action: 'Confirm: two of today’s chairs have not replied to reminders.',
  },
  'real-estate': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday on the listings line',
    lines: [
      { tone: 'neutral', n: '16', text: 'leads answered' },
      { tone: 'neutral', n: '7', text: 'buyers qualified' },
      { tone: 'good', n: '5', text: 'showings booked' },
      { tone: 'good', n: '2', text: 'showings reconfirmed' },
      { tone: 'good', n: '1', text: 'review posted' },
      { tone: 'warn', n: '1', text: 'buyer wants to write an offer' },
    ],
    source: 'Best source: Zillow — 3 of 5 showings.',
    action: 'Call back: the Hawthorne buyer is ready to make an offer.',
  },
};

// ─────────────────────────────────────────────────────────────
// Booking confirmation — the text the caller gets, per vertical
// ─────────────────────────────────────────────────────────────

export interface Booking {
  /** What was booked, in the vertical's own word. */
  kind: string;
  when: string;
  who: string;
  where: string;
  /** The confirmation SMS body. */
  sms: string;
  /** Where the record landed. */
  writtenTo: string;
}

export const bookings: Record<Vertical, Booking> = {
  default: {
    kind: 'Appointment',
    when: 'Wed 8:00–10:00 AM',
    who: 'On-call technician',
    where: 'Your address on file',
    sms: 'Confirmed — Wednesday 8–10 AM. Reply R to reschedule or C to cancel. We will text when the tech is on the way.',
    writtenTo: 'Google Calendar + CRM',
  },
  'law-firms': {
    kind: 'Consultation',
    when: 'Mon 9:30 AM',
    who: 'Attorney on intake',
    where: 'Phone consult',
    sms: 'Your consultation is confirmed for Monday 9:30 AM. We will call this number. Reply R to reschedule.',
    writtenTo: 'Clio + Google Calendar',
  },
  'home-services': {
    kind: 'Job',
    when: 'Fri 8:00–10:00 AM',
    who: 'On-call tech — emergency, no heat',
    where: '412 Miller Road',
    sms: 'Confirmed — Friday 8–10 AM for the no-heat call at 412 Miller Rd. Reply R to reschedule.',
    writtenTo: 'ServiceTitan',
  },
  'dental-med-spa': {
    kind: 'Chair time',
    when: 'Today 3:15 PM',
    who: 'Chipped tooth — existing patient',
    where: 'Main operatory',
    sms: 'You are booked at 3:15 today. Your forms are in this thread — please complete before you arrive.',
    writtenTo: 'Practice management system',
  },
  'real-estate': {
    kind: 'Showing',
    when: 'Sun 11:00 AM',
    who: 'Buyer — pre-approved, unrepresented',
    where: 'Hawthorne listing',
    sms: 'Showing confirmed for Sunday 11 AM at the Hawthorne listing. Disclosures are attached. Reply R to reschedule.',
    writtenTo: 'Follow Up Boss',
  },
};

// ─────────────────────────────────────────────────────────────
// Be Found — the site-on-a-phone mock and the Google listing card
//
// Both are EXAMPLES of what a Found account looks like for a
// fictional HVAC company. The star rating and review count are the
// example business's, not Keres's — the components label them as
// such. Never swap in a real firm's numbers here.
// ─────────────────────────────────────────────────────────────

export interface SiteMock {
  /** The fictional business on the template. */
  name: string;
  tagline: string;
  /** The click-to-call bar text. */
  phone: string;
  services: string[];
  /** One review line in the site's reviews strip. */
  review: { text: string; by: string };
  badges: string[];
}

export const siteMock: SiteMock = {
  name: 'Northline Heating & Air',
  tagline: 'Same-day repair. Answered 24/7.',
  phone: '(555) 010-4400',
  services: ['AC repair', 'Furnace repair', 'Maintenance plans', 'New installs'],
  review: { text: 'Called at 9pm, tech was here by 8am.', by: 'Example review' },
  badges: ['Licensed & insured', 'Answered in 2 rings'],
};

export interface ListingMock {
  name: string;
  category: string;
  rating: string;
  reviews: string;
  hours: string;
  phone: string;
  area: string;
  /** The "Open 24 hours" line comes from Remi answering the line. */
  note: string;
}

export const listingMock: ListingMock = {
  name: 'Northline Heating & Air',
  category: 'HVAC contractor',
  rating: '4.9',
  reviews: '212',
  hours: 'Open 24 hours',
  phone: '(555) 010-4400',
  area: 'Serves the metro area',
  note: 'Example listing',
};

// ─────────────────────────────────────────────────────────────
// Agent mini-mocks — one small product moment per agent
// ─────────────────────────────────────────────────────────────

export interface Bubble {
  who: 'agent' | 'them';
  t: string;
  text: string;
}

export interface AgentMock {
  slug: string;
  label: string;
  kind: 'transcript' | 'sms' | 'inbox';
  /** Transcript excerpt or SMS thread. */
  bubbles?: Bubble[];
  /** For Sol: a small inbox listing with one reply highlighted. */
  inbox?: { from: string; subject: string; preview: string; t: string; booked?: boolean }[];
  /** One-line outcome under the mock. */
  outcome: string;
}

export const agentMocks: AgentMock[] = [
  {
    slug: 'inbound',
    label: 'Remi · example call',
    kind: 'transcript',
    bubbles: [
      { who: 'them', t: '0:04', text: 'Do you have anyone who can come out tonight?' },
      { who: 'agent', t: '0:09', text: 'Yes. What is the service address, and is anyone in the home without heat?' },
      { who: 'them', t: '0:16', text: '412 Miller Road. It is 54 degrees in here.' },
      { who: 'agent', t: '0:21', text: 'That is an emergency dispatch. A tech can be there between 8 and 10 tonight — shall I book it?' },
    ],
    outcome: 'Emergency job created · dispatch window sent · owner paged',
  },
  {
    slug: 'follow-up',
    label: 'Theo · reminder thread',
    kind: 'sms',
    bubbles: [
      { who: 'agent', t: 'Yesterday 4:02 PM', text: 'Hi Dana — reminder that your furnace tune-up is tomorrow, 8–10 AM. Reply C to confirm or R to reschedule.' },
      { who: 'them', t: 'Yesterday 4:15 PM', text: 'C' },
      { who: 'agent', t: 'Yesterday 4:15 PM', text: 'Confirmed. We will text when the tech is on the way.' },
    ],
    outcome: 'Confirmed · no-show risk cleared · tech notified',
  },
  {
    slug: 'reactivation',
    label: 'June · reactivation',
    kind: 'sms',
    bubbles: [
      { who: 'agent', t: 'Tue 10:10 AM', text: 'Hi Marcus, it is June from Northline. We serviced your furnace two winters ago — want us to fit a tune-up in before the cold hits? Reply YES and I will hold a slot.' },
      { who: 'them', t: 'Tue 11:48 AM', text: 'Yes, Thursday if you can' },
      { who: 'agent', t: 'Tue 11:48 AM', text: 'Thursday 1–3 PM is yours. Confirmation on its way.' },
    ],
    outcome: 'Past customer rebooked · written to the CRM',
  },
  {
    slug: 'outbound',
    label: 'Sol · replies inbox',
    kind: 'inbox',
    inbox: [
      { from: 'Priya S.', subject: 'Re: After-hours coverage for the practice', preview: 'Tuesday 10am works — send the invite.', t: '9:41 AM', booked: true },
      { from: 'Daniel E.', subject: 'Re: Intake coverage', preview: 'Not right now, maybe Q1.', t: '8:55 AM' },
      { from: 'Alana R.', subject: 'Re: Missed calls at the firm', preview: 'Can you send pricing first?', t: 'Yesterday' },
    ],
    outcome: 'Meeting booked · Tue 10:00 AM · disqualified replies marked',
  },
];

// ─────────────────────────────────────────────────────────────
// Hero orchestration tail — the two events after the transcript
// ─────────────────────────────────────────────────────────────

export const heroTail = {
  booking: { day: 'Wed', date: '18', time: '8:00–10:00 AM', what: 'Service call · 412 Miller Rd', where: 'Google Calendar' },
  ownerText: { t: '8:13 PM', text: 'Remi: Booked Wed 8–10 AM for (555) 014-2207 — no heat, 412 Miller Rd. Details are in the CRM.' },
};
