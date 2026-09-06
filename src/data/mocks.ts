// Content for the high-fidelity product mocks (CallTranscript, DailyBrief).
//
// These are ILLUSTRATIVE. Every mock renders with an "Example" label and a
// caption saying it is not a customer account — see CallTranscript.astro and
// DailyBrief.astro. Nothing here may be presented as a recorded customer call
// or as traction. Real numbers belong in <Stat> with a source.
//
// Vocabulary is per-vertical on purpose: law firms get consult / matter /
// conflict check, home services get job / dispatch / estimate, dental gets
// recall / chair time, real estate gets showing / listing. A generic
// "customer/appointment" transcript on a vertical page is a failure.

export type Vertical = 'default' | 'law-firms' | 'home-services' | 'dental-med-spa' | 'real-estate';

export interface Turn {
  who: 'agent' | 'caller';
  /** Elapsed time into the call, m:ss. */
  t: string;
  text: string;
}

export interface Transcript {
  /** Shown in the mock's label bar. */
  label: string;
  /** Total call length, shown in the status. */
  duration: string;
  /** When the call came in — the after-hours ones do the most work. */
  when: string;
  turns: Turn[];
  /** What the agent actually did, rendered as the outcome strip. */
  outcome: { k: string; v: string }[];
}

export const transcripts: Record<Vertical, Transcript> = {
  default: {
    label: 'Inbound Agent — example call',
    duration: '0:48',
    when: 'Tue 8:12 PM',
    turns: [
      { who: 'agent', t: '0:02', text: 'Thanks for calling — this line is answered around the clock. How can I help?' },
      { who: 'caller', t: '0:07', text: "Oh — I figured I'd get voicemail at this hour." },
      { who: 'agent', t: '0:11', text: "You won't. What's going on?" },
      { who: 'caller', t: '0:15', text: 'I need someone out tomorrow if that’s possible.' },
      { who: 'agent', t: '0:21', text: 'It is. I have tomorrow morning, 8 to 10, or the afternoon, 1 to 3. Which suits you?' },
      { who: 'caller', t: '0:29', text: 'Morning.' },
      { who: 'agent', t: '0:33', text: "Booked. I've texted you the confirmation and the owner has the details already." },
    ],
    outcome: [
      { k: 'Answered in', v: '2 rings' },
      { k: 'Booked', v: 'Wed 8–10 AM' },
      { k: 'Owner notified', v: 'SMS, 8:13 PM' },
    ],
  },

  'law-firms': {
    label: 'Inbound Agent — example intake call',
    duration: '1:12',
    when: 'Sun 9:41 PM',
    turns: [
      { who: 'agent', t: '0:02', text: 'Good evening, thank you for calling. This line is answered 24/7 — how can I help you tonight?' },
      { who: 'caller', t: '0:08', text: 'I was rear-ended this afternoon on Route 22. I don’t know if I even have a case.' },
      { who: 'agent', t: '0:15', text: 'I’m sorry that happened. First — are you injured, and did police respond to the scene?' },
      { who: 'caller', t: '0:22', text: 'Sore neck and shoulder. Yes, there’s a report.' },
      { who: 'agent', t: '0:29', text: 'That’s helpful. I’ll take your details so the firm can run a conflict check before the consult.' },
      { who: 'caller', t: '0:38', text: 'How soon could I talk to an actual attorney?' },
      { who: 'agent', t: '0:44', text: 'Tomorrow. There’s a consult at 9:30 AM or 2:00 PM. Which works?' },
      { who: 'caller', t: '0:52', text: '9:30.' },
      { who: 'agent', t: '0:56', text: 'Booked. Your intake summary and the police report request are with the firm now.' },
    ],
    outcome: [
      { k: 'Consult booked', v: 'Mon 9:30 AM' },
      { k: 'Conflict check', v: 'Queued for review' },
      { k: 'Matter intake', v: 'Written to the CRM' },
    ],
  },

  'home-services': {
    label: 'Inbound Agent — example emergency call',
    duration: '0:54',
    when: 'Fri 6:04 AM',
    turns: [
      { who: 'agent', t: '0:02', text: 'Thanks for calling — I can get a tech out to you today. What’s happening?' },
      { who: 'caller', t: '0:07', text: 'No heat since last night. House is down to 54 and I’ve got a newborn.' },
      { who: 'agent', t: '0:14', text: 'That’s an emergency job — I’m flagging it now. What’s the service address?' },
      { who: 'caller', t: '0:21', text: '412 Miller Road.' },
      { who: 'agent', t: '0:26', text: 'Got it. Is this the same furnace we quoted an estimate on in the spring?' },
      { who: 'caller', t: '0:32', text: 'Same one.' },
      { who: 'agent', t: '0:36', text: 'Dispatching the on-call tech with an arrival window of 8 to 10 this morning. Confirmation text is on its way.' },
    ],
    outcome: [
      { k: 'Job created', v: 'Emergency — no heat' },
      { k: 'Dispatch window', v: 'Fri 8–10 AM' },
      { k: 'Owner notified', v: 'SMS, 6:05 AM' },
    ],
  },

  'dental-med-spa': {
    label: 'Inbound Agent — example patient call',
    duration: '0:51',
    when: 'Mon 7:22 AM',
    turns: [
      { who: 'agent', t: '0:02', text: 'Good morning — the practice opens at eight, but I can book you now. What do you need?' },
      { who: 'caller', t: '0:08', text: 'I chipped a tooth on a bagel this morning. It’s sharp.' },
      { who: 'agent', t: '0:15', text: 'Let’s get you seen today. Are you an existing patient with us?' },
      { who: 'caller', t: '0:20', text: 'Yes, I came in for a cleaning in the spring.' },
      { who: 'agent', t: '0:26', text: 'Found your chart — you’re also due for recall, so I’ll note that. There’s chair time at 3:15 this afternoon.' },
      { who: 'caller', t: '0:36', text: 'I’ll take it.' },
      { who: 'agent', t: '0:40', text: 'Booked at 3:15. Your forms are on the way by text so you’re not filling them out in the chair.' },
    ],
    outcome: [
      { k: 'Chair time', v: 'Today 3:15 PM' },
      { k: 'Recall', v: 'Flagged — overdue' },
      { k: 'Forms', v: 'Texted, pre-visit' },
    ],
  },

  'real-estate': {
    label: 'Inbound Agent — example buyer call',
    duration: '0:57',
    when: 'Sat 11:38 AM',
    turns: [
      { who: 'agent', t: '0:02', text: 'Thanks for calling — are you calling about one of the listings?' },
      { who: 'caller', t: '0:06', text: 'The one on Hawthorne. Is it still available?' },
      { who: 'agent', t: '0:11', text: 'It is. Are you working with an agent already?' },
      { who: 'caller', t: '0:16', text: 'No, just started looking.' },
      { who: 'agent', t: '0:20', text: 'Understood. Are you pre-approved, and what’s your timeline?' },
      { who: 'caller', t: '0:26', text: 'Pre-approved to 550, hoping to move by spring.' },
      { who: 'agent', t: '0:33', text: 'I have a showing slot tomorrow at 11. Booking it now and sending the disclosures to your phone.' },
    ],
    outcome: [
      { k: 'Showing booked', v: 'Sun 11:00 AM' },
      { k: 'Buyer', v: 'Pre-approved, unrepresented' },
      { k: 'Lead', v: 'Written to the CRM' },
    ],
  },
};

export interface BriefLine {
  /** neutral → a count. good → money kept. warn → the one thing needing the owner. */
  tone: 'neutral' | 'good' | 'warn';
  n: string;
  text: string;
}

export interface Brief {
  /** The line above the bubble — who it is from and when. */
  when: string;
  heading: string;
  lines: BriefLine[];
  /** The single action the owner has to take. There is only ever one. */
  action: string;
}

export const briefs: Record<Vertical, Brief> = {
  default: {
    when: 'Today 6:00 AM',
    heading: 'Yesterday, while you were working',
    lines: [
      { tone: 'neutral', n: '14', text: 'calls answered' },
      { tone: 'neutral', n: '4', text: 'came in after hours' },
      { tone: 'good', n: '5', text: 'appointments booked' },
      { tone: 'good', n: '0', text: 'calls went to voicemail' },
      { tone: 'warn', n: '1', text: 'caller asked for you by name' },
    ],
    action: 'Call back: the 4:50 PM caller wants you, not the agent.',
  },
  'law-firms': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday at the firm',
    lines: [
      { tone: 'neutral', n: '9', text: 'intake calls answered' },
      { tone: 'neutral', n: '3', text: 'came in after hours' },
      { tone: 'good', n: '4', text: 'consults booked' },
      { tone: 'good', n: '2', text: 'cleared conflict check' },
      { tone: 'warn', n: '1', text: 'conflict check needs a human' },
    ],
    action: 'Review: the Route 22 matter may conflict with an existing client.',
  },
  'home-services': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday on the phones',
    lines: [
      { tone: 'neutral', n: '22', text: 'calls answered' },
      { tone: 'neutral', n: '6', text: 'came in after hours' },
      { tone: 'good', n: '8', text: 'jobs dispatched' },
      { tone: 'good', n: '3', text: 'estimates followed up' },
      { tone: 'warn', n: '1', text: 'job has no tech assigned' },
    ],
    action: 'Assign: the 8–10 AM no-heat call on Miller Road needs a truck.',
  },
  'dental-med-spa': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday at the practice',
    lines: [
      { tone: 'neutral', n: '17', text: 'calls answered' },
      { tone: 'neutral', n: '5', text: 'came in before open' },
      { tone: 'good', n: '6', text: 'chairs filled' },
      { tone: 'good', n: '4', text: 'recalls rebooked' },
      { tone: 'warn', n: '2', text: 'no-show risks flagged for today' },
    ],
    action: 'Confirm: two of today’s chairs have not replied to reminders.',
  },
  'real-estate': {
    when: 'Today 6:00 AM',
    heading: 'Yesterday on the listings line',
    lines: [
      { tone: 'neutral', n: '11', text: 'calls answered' },
      { tone: 'neutral', n: '7', text: 'came in on weekends or evenings' },
      { tone: 'good', n: '5', text: 'showings booked' },
      { tone: 'good', n: '3', text: 'buyers pre-approved' },
      { tone: 'warn', n: '1', text: 'buyer wants to write an offer' },
    ],
    action: 'Call back: the Hawthorne buyer is ready to make an offer.',
  },
};
