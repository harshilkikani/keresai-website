// Data-driven comparison pages. Add an entry → a new /{competitor}-alternative page builds.
export interface Comparison {
  slug: string; // full URL segment, e.g. "apollo-alternative"
  competitor: string;
  category: string;
  title: string;
  description: string;
  h1Accent: string;
  intro: string;
  rows: { feature: string; keres: string; them: string }[];
  faqs: { q: string; a: string }[];
}

export const comparisons: Comparison[] = [
  {
    slug: 'apollo-alternative',
    competitor: 'Apollo',
    category: 'Prospecting & outbound',
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
    title: 'The Best Instantly Alternative — AI That Books Meetings | Keres AI',
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
    title: 'The Best Smartlead Alternative — Done-For-You AI SDR | Keres AI',
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
];
