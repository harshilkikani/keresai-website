import { priceSentence } from '../config/business';
// The four agent pages. Section content lives here so the template
// stays one file and no two pages can describe the same capability
// two different ways.
//
// Every block leads with a direct-answer paragraph — a complete,
// quotable answer in the first sentences — because these are the
// pages AI search quotes when someone asks what an AI receptionist
// actually does.

import type { Vertical } from './mocks';

export interface Block {
  /** Anchor, where another page links to this section. */
  id?: string;
  h2: string;
  /** Direct-answer paragraph. Complete on its own. */
  answer: string;
  bullets?: string[];
}

export interface AgentPage {
  slug: string;
  seoTitle: string;
  description: string;
  h1: string;
  sub: string;
  /** Which vertical's transcript and brief to show. */
  heroVertical: Vertical;
  /** Ordered walkthrough. Rendered as the numbered flow. */
  flowH2: string;
  flowLede: string;
  flow: { label: string; text: string }[];
  blocks: Block[];
  /** Plan teaser. */
  planLine: string;
  testimonialProves: string;
  faqs: { q: string; a: string }[];
  /** Optional product recording, always below the fold, preload="none". */
  media?: { src: string; poster: string; posterWebp: string; label: string; caption: string; w: number; h: number };
}

export const agentPages: AgentPage[] = [
  {
    slug: 'inbound',
    seoTitle: 'AI Receptionist: Answers in 2 Rings, Books the Lead | Keres',
    description:
      'Remi answers every call in two rings, 24/7 — runs your intake script, qualifies the lead, books into your calendar and CRM, and texts back anything it could not take within 60 seconds.',
    h1: 'Remi — the Inbound Agent that answers every call in two rings and books the lead.',
    sub:
      'An AI receptionist that does the whole job, not just the greeting: it answers day or night, asks your questions, qualifies the lead, books the appointment while the caller is still on the line, and tells you what happened before you have put your phone down.',
    heroVertical: 'default',
    flowH2: 'How a call goes',
    flowLede:
      'Six steps, in this order, every time — whether it is a Tuesday afternoon or a Sunday at 2 a.m.',
    flow: [
      { label: 'Ring', text: 'Remi picks up inside two rings. No hold music, no phone tree, no "press one for service".' },
      { label: 'Greet', text: 'Your greeting, your business name, your tone. Callers are told they are speaking to an assistant if they ask.' },
      { label: 'Qualify', text: 'Your intake script runs — matter type, job type, procedure, listing — in the words your vertical actually uses.' },
      { label: 'Book', text: 'Real availability offered from your calendar, and the appointment written in while the caller is still on the line.' },
      { label: 'Confirm', text: 'A confirmation text the caller can reply to, with reschedule and cancel handled in the same thread.' },
      { label: 'Notify', text: 'The intake summary lands in your CRM and anything urgent pages you immediately. The rest waits for the morning brief.' },
    ],
    blocks: [
      {
        id: 'intake',
        h2: 'Intake and qualification, in your vocabulary',
        answer:
          'Remi runs the intake script your business already uses rather than a generic call-centre form. A law firm gets matter type, opposing party and conflict details; a plumbing company gets job type, service address and urgency; a dental practice gets procedure, insurance and whether the patient is on file; a real-estate team gets listing, pre-approval and timeline.',
        bullets: [
          'Law firms: matter type, conflict details, urgency, whether a deadline is already running.',
          'Home services: job type, equipment, service address, access notes, emergency grading.',
          'Dental and med spa: procedure, existing patient or new, insurance accepted, recall status.',
          'Real estate: which listing, buyer or seller, pre-approval, price range and timeline.',
        ],
      },
      {
        id: 'booking',
        h2: 'Booking straight into your calendar',
        answer:
          'Remi reads real availability and writes the appointment during the call, so nobody is told that someone will ring them back. The booking lands in the system your team already opens: Google Calendar, HubSpot and ServiceTitan are connected today, with Clio, Lawmatics, Jobber, Housecall Pro, Dentrix, Open Dental and Follow Up Boss rolling out.',
        bullets: [
          'Connected today: Google Calendar, HubSpot, ServiceTitan, Zapier.',
          'Rolling out: Clio, Lawmatics, Jobber, Housecall Pro, Dentrix, Open Dental, Follow Up Boss.',
          'Anything else: webhooks and CSV out of the box.',
          'Reschedules and cancellations handled by text, not phone tag.',
        ],
      },
      {
        h2: 'Missed-call text-back in 60 seconds',
        answer:
          'If a call still gets away — a bad line, a caller who hangs up, a number that rings while an outage is running — Remi texts back within 60 seconds with a real question rather than an autoresponder, and carries the conversation on by SMS until it can book or hand off.',
      },
      {
        h2: 'Web chat, SMS and every lead source',
        answer:
          'Plenty of people will not phone you. Remi answers the chat widget on your website and your business text line with the same script, and picks up enquiries from Google Business Profile messages, website forms, Yelp, Thumbtack, Avvo and Zillow — in minutes, rather than whenever somebody next checks the inbox.',
        bullets: [
          'Web chat on your site, with the same intake script as the phone.',
          'Business SMS answered and continued in thread.',
          'Google Business Profile messages, website forms, Yelp, Thumbtack, Avvo, Zillow.',
        ],
      },
      {
        h2: 'Human escalation is a feature, not a failure',
        answer:
          'You decide what needs a person. Remi warm-transfers those calls to your on-call number, and if nobody picks up it sends a "call me now" alert carrying everything it has already collected — so the caller never repeats themselves and the escalation does not become a lost lead.',
        bullets: [
          'Warm transfer on your rules: emergencies, named clients, anyone who asks for a human.',
          '"Call me now" alert with the full intake attached when the transfer is not answered.',
          'Remi says it does not know rather than guessing.',
        ],
      },
    ],
    planLine:
      'Remi is the Answer plan. Add Theo and June on Convert and Grow when the phone is handled.',
    testimonialProves: 'after-hours calls being answered, qualified and booked',
    faqs: [
      { q: 'Does it sound like a robot?', a: 'It sounds like a competent front desk. It answers in two rings, uses your vocabulary, and says "let me get someone for you" instead of guessing. Call the number at the top of this page and judge it yourself — that is the fastest demo there is.' },
      { q: 'What does it cost?', a: `${priceSentence('The Answer plan', 'answer', 'your call volume, locations and integrations')} There is no per-call charge and no surcharge for simultaneous calls. Found — the visibility layer — starts separately at $249/month.` },
      { q: 'How long does setup take?', a: 'Five business days. Twenty minutes on how you answer today, then we write your intake script, connect your number, calendar and CRM, and you call it yourself until it answers the way you would.' },
      { q: 'What if a caller needs a human?', a: 'Remi warm-transfers under rules you set, and falls back to a "call me now" alert with the intake attached if the transfer is not picked up.' },
      { q: 'Can it handle several calls at once?', a: 'Yes, unlimited simultaneous calls at no surcharge. That is the whole point during a storm week or a Monday morning rush — your bill does not move because your call volume did.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month, and your number stays yours.' },
    ],
    media: {
      src: '/assets/video/ai-receptionist.mp4',
      poster: '/assets/img/operator-portal.jpg',
      posterWebp: '/assets/img/operator-portal.webp',
      label: 'The operator console',
      caption: 'A walkthrough of the console every account gets. Recording uses example data.',
      w: 1280,
      h: 720,
    },
  },

  {
    slug: 'follow-up',
    seoTitle: 'Appointment Reminders & No-Show Prevention | Keres',
    description:
      'Theo confirms every appointment, reminds by text and voice, backfills cancellations from your waitlist, and chases the estimate on day 1, 3 and 7 until you get a yes or a no.',
    h1: 'Theo — the Follow-Up Agent that makes sure they show and say yes.',
    sub:
      'Getting the appointment on the calendar is not the same as getting it kept, and a quote nobody chased is a quote somebody else closed. Theo, your Follow-Up Agent, works the two stages where booked work quietly disappears.',
    heroVertical: 'dental-med-spa',
    flowH2: 'What happens after the booking',
    flowLede:
      'Five touches, none of which anybody in a five-person firm has time to make by hand.',
    flow: [
      { label: 'Confirm', text: 'A confirmation goes out immediately, with the details the caller gave and a reply-to-change option.' },
      { label: 'Prepare', text: 'Documents, photos, insurance details and forms collected before the visit rather than in your waiting room.' },
      { label: 'Remind', text: 'Text and voice reminders on your schedule, escalating for the appointments that go quiet.' },
      { label: 'Rebook', text: 'A reschedule handled in thread, and the vacated slot offered to your waitlist within minutes.' },
      { label: 'Follow up', text: 'After the appointment: the estimate chased on day 1, day 3 and day 7, and thirty days of follow-up for anyone who came but did not sign.' },
    ],
    blocks: [
      {
        h2: 'Reminders and no-show prevention',
        answer:
          'Theo confirms every appointment as soon as it is booked, then reminds by text and by voice on the schedule you set, handling the reschedule in the same thread rather than sending them back to the phone. No-shows fall because the appointment is confirmed, remembered and easy to move — not because anyone was nagged.',
        bullets: [
          'Immediate confirmation, then reminders on your cadence.',
          'Reschedule and cancel handled by reply, never by phone tag.',
          'Appointments that go quiet get escalated to a person before the day arrives.',
        ],
      },
      {
        h2: 'Waitlist backfill',
        answer:
          'When somebody cancels, the slot is worth nothing unless it is refilled the same day. Theo works your waitlist immediately, offers the opening to the people most likely to take it, and books the first one who says yes — so a cancellation costs you a text rather than an hour.',
      },
      {
        h2: 'Pre-appointment intake',
        answer:
          'Theo collects what you need before they arrive: documents, photos of the problem, insurance details, forms. The person who turns up has already done the paperwork, which shortens the appointment and stops the visit that has to be rebooked because something was missing.',
      },
      {
        id: 'estimates',
        h2: 'Estimate and quote follow-up on day 1, 3 and 7',
        answer:
          'Most estimates are not lost to price. They are lost because nobody followed up and a competitor did. Theo chases every quote on day 1, day 3 and day 7 until you have a decision, and hands anything that turns into a real conversation straight to you.',
        bullets: [
          'Three touches on a fixed schedule, in your voice, by text or email.',
          'Objections and questions handed to a person rather than argued with.',
          'A clean yes or no written back to your CRM, so your pipeline is real.',
        ],
      },
      {
        h2: 'Post-consult follow-up for thirty days',
        answer:
          'Someone who showed up and did not sign is not a lost lead — usually they are a slow one. Theo runs thirty days of structured follow-up for the consultations and estimates that ended without a decision, so the people who were only thinking about it are not quietly written off.',
      },
    ],
    planLine:
      'Theo starts on the Convert plan. Estimate and post-consult follow-up come with Grow.',
    testimonialProves: 'no-shows falling and estimates closing after a follow-up nobody had time to make',
    faqs: [
      { q: 'Will it annoy my customers?', a: 'The cadence is yours, everything is opt-out in one word, and Theo stops the moment somebody answers. Three touches on an estimate over a week is the schedule most firms would run themselves if they had the time.' },
      { q: 'What does it cost?', a: `${priceSentence('Theo on the Convert plan', 'convert', 'your appointment volume and integrations')} Estimate and post-consult follow-up come with Grow.` },
      { q: 'How long does setup take?', a: 'Five business days, and usually less if Remi is already answering — your appointment types and cadences are the only new things to configure.' },
      { q: 'What if someone replies with a real question?', a: 'It goes to a person. Theo handles scheduling and confirmation; anything that turns into a negotiation or a technical question is handed to you with the thread attached.' },
      { q: 'Do I need Remi first?', a: 'No, but it is the usual order. Theo works on appointments booked any way at all, including ones your front desk books by hand.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month.' },
    ],
  },

  {
    slug: 'reactivation',
    seoTitle: 'Database Reactivation & Win-Back Campaigns | Keres',
    description:
      'June reactivates past customers and cold leads in your CRM, revives closed-lost from the last 6–12 months, and asks for the review after every completed job or matter.',
    h1: 'June — the Reactivation Agent. The cheapest lead you’ll ever get is one you already have.',
    sub:
      'Every name in your CRM already chose you once, or nearly did. June, your Reactivation Agent, works that list as conversations rather than blasts — and asks for the review after every job, so the next stranger chooses you too.',
    heroVertical: 'home-services',
    flowH2: 'How a campaign runs',
    flowLede:
      'Five steps, and you approve the list and the message before anything sends.',
    flow: [
      { label: 'List', text: 'We pull the segment from your CRM — past customers, cold leads, closed-lost — and you see exactly who is in it.' },
      { label: 'Segment', text: 'Split by what they bought, when they last spoke to you, and why they did not go ahead.' },
      { label: 'Sequence', text: 'A three-touch sequence over about two weeks, written in your voice and approved by you before it sends.' },
      { label: 'Replies', text: 'Every reply is handled as a conversation. Interested people get booked; the rest are marked and left alone.' },
      { label: 'Booked', text: 'Appointments land in your calendar and the outcome is written back to the CRM, so the list is cleaner than when we started.' },
    ],
    blocks: [
      {
        h2: 'Database reactivation',
        answer:
          'A reactivation campaign contacts the customers and cold leads already in your CRM with a specific, timely reason to come back — tune-up season, a dental recall, the estimate you wrote in the spring. It is the cheapest pipeline a small firm has, and it is almost always untouched because nobody has the hours to work it.',
        bullets: [
          'Seasonal campaigns: tune-ups, recall, annual service, pre-winter checks.',
          'Cold leads who enquired and never booked.',
          'Every reply handled as a conversation, not a bounce into an inbox.',
        ],
      },
      {
        h2: 'Win-back and closed-lost revival',
        answer:
          'Someone who said no six months ago is a different person today: the quote they took instead went badly, the problem came back, the budget arrived. June re-approaches closed-lost from the last six to twelve months with an acknowledgement that you spoke before, which is the reason these convert better than cold outreach.',
      },
      {
        h2: 'Review and referral requests',
        answer:
          'June asks for the review after every completed job or matter, at the point where the customer is happiest. Anyone who signals they are unhappy is routed privately to the owner first instead of being pushed toward a public review, and the customers who rated you highest are the ones asked for a referral.',
        bullets: [
          'An automatic ask after every completed job or matter.',
          'Unhappy customers intercepted and sent to the owner, not to Google.',
          'Referral asks aimed at the people who already rated you well.',
          'Owner responses drafted for your approval, never posted unread.',
        ],
      },
      {
        h2: 'What it does not do',
        answer:
          'June works lists you own and people who have a real prior relationship with your business. It does not buy lists, scrape contacts, or contact people who asked not to be contacted. Reactivation only works because the recipient recognises your name — the moment that stops being true it is just spam with your logo on it.',
      },
    ],
    planLine:
      'June comes with Grow, and reactivation campaigns can also be bought one at a time.',
    testimonialProves: 'revenue coming back from a customer list nobody had worked in a year',
    faqs: [
      { q: 'Is this just mass texting my customers?', a: 'No. Each campaign targets a segment you approve, with a reason that applies to that segment, and every reply is handled as a conversation. You see the list and the message before anything sends.' },
      { q: 'What does it cost?', a: `${priceSentence('June on the Grow plan', 'grow', 'your list size and campaign volume')} Individual reactivation campaigns can also be quoted on their own if you want to try one before committing.` },
      { q: 'How long does setup take?', a: 'Five business days for the plan. A single campaign is usually live inside a week of us getting access to the list.' },
      { q: 'What happens when someone replies?', a: 'Interested people are qualified and booked. Anyone who says no is marked in your CRM and not contacted again by that campaign. Anything that needs a person comes to you with the thread.' },
      { q: 'Will it damage my reputation?', a: 'It is designed not to. Unhappy customers are routed to the owner privately instead of toward a public review, opt-outs are honoured in one word, and June never contacts a bought or scraped list.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month.' },
    ],
  },

  {
    slug: 'outbound',
    seoTitle: 'AI SDR: Cold Email That Reaches the Inbox | Keres',
    description:
      'Sol runs cold outbound with deliverability set up properly first — SPF, DKIM, DMARC and warm-up — then personalized sequences, replies handled in thread, and meetings booked.',
    h1: 'Sol — the Outbound Agent. Cold outreach that reaches the inbox and books the meeting.',
    sub:
      'For firms that need net-new pipeline rather than a better answer to the calls they already get. Sol, your Outbound Agent, does the deliverability work first — because sending is the easy half and landing is the half that gets skipped.',
    heroVertical: 'default',
    flowH2: 'How outbound runs',
    flowLede:
      'Deliverability first, then sending. In that order, or the sending is wasted.',
    flow: [
      { label: 'Authenticate', text: 'SPF, DKIM and DMARC configured and verified on every sending domain before a single message goes out.' },
      { label: 'Warm up', text: 'New domains and inboxes warmed on a ramp, not switched on at full volume the day they are bought.' },
      { label: 'Build', text: 'A list you approve and a sequence written in your voice, personalized on something real rather than a merge field.' },
      { label: 'Send', text: 'Volume ramped gradually, spread across inboxes, with list hygiene running continuously.' },
      { label: 'Reply', text: 'Replies handled in thread, objections passed to you, and interested people booked onto your calendar.' },
    ],
    blocks: [
      {
        h2: 'Deliverability, done before anything sends',
        answer:
          'Cold email fails in the spam folder far more often than it fails on the message. Sol configures SPF, DKIM and DMARC on every sending domain, warms new inboxes on a ramp, keeps volume inside what the domain can carry, and cleans the list continuously — which is the difference between a campaign that lands and one that quietly does not.',
        bullets: [
          'SPF, DKIM and DMARC configured and verified per sending domain.',
          'Inbox and domain warm-up on a ramp before real volume.',
          'Volume spread across inboxes and increased gradually.',
          'Continuous list hygiene: bounces, catch-alls and dead domains removed.',
        ],
      },
      {
        h2: 'Sequences and reply handling',
        answer:
          'Sol writes personalized sequences on something real about the recipient rather than a first-name merge, sends them from your domains, and handles the replies in thread. Interested people get qualified and booked; objections and anything that needs judgement come to you with the whole conversation attached.',
      },
      {
        h2: 'Why we sell this last',
        answer:
          'Most local firms get more out of June working the list they already own than out of cold outreach to strangers. Outbound is for firms that have already fixed the phone, already worked the database, and genuinely need net-new pipeline — so it lands on the Custom plan and we will tell you if you are not there yet.',
      },
    ],
    planLine:
      'Sol is quoted on the Custom plan, alongside custom agent builds and managed campaigns.',
    testimonialProves: 'cold outreach producing booked meetings rather than bounces',
    faqs: [
      { q: 'Will this get my domain blacklisted?', a: 'Not if the setup is done properly, which is why the deliverability work happens before anything sends. Sol sends from separate domains from your main business domain, so your day-to-day email is never the thing at risk.' },
      { q: 'What does it cost?', a: 'Sol is quoted on the Custom plan. The number depends on sending volume, how many domains and inboxes are needed, and whether we are also managing the list.' },
      { q: 'How long does setup take?', a: 'Longer than the other agents, and deliberately so: domain and inbox warm-up takes two to four weeks before real volume. We would rather start slowly than burn your domains.' },
      { q: 'Who handles the replies?', a: 'Sol handles scheduling and qualification in thread. Anything that turns into a negotiation, a technical question, or an objection worth a human answer comes straight to you.' },
      { q: 'Should I buy this or June?', a: 'Almost certainly June first. Reactivating people who already know your name converts better than cold outreach, and it costs less. Sol is for when that list is worked out.' },
      { q: 'Is there a contract?', a: 'No. Month-to-month, cancel any month.' },
    ],
    media: {
      src: '/assets/video/outbound-console.mp4',
      poster: '/assets/img/outbound-console.jpg',
      posterWebp: '/assets/img/outbound-console.webp',
      label: 'The outbound console',
      caption: 'The lead library and campaign builder. Recording uses example prospect data.',
      w: 1280,
      h: 590,
    },
  },
];

export const agentPageBySlug = (slug: string) => agentPages.find((a) => a.slug === slug)!;
