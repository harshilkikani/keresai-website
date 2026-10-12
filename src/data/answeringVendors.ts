// Published facts about answering services and AI receptionists, used by the
// "alternatives" roundups on the comparison pages. Every price comes from the
// vendor's own pricing page on the date in VENDORS_CHECKED; recheck before
// changing the date. Neutral wording only: what each one is, how it bills,
// what the lowest published plan includes, and who it suits by its own
// positioning. Anything not on the vendor's page is left out, not guessed.
export const VENDORS_CHECKED = 'October 11, 2026';

export interface AnsweringVendor {
  name: string;
  url: string;
  type: 'AI' | 'Human' | 'Hybrid';
  billing: string;
  starting: string;
  bestFor: string;
  source: string;
}

export const answeringVendors: Record<string, AnsweringVendor> = {
  'Smith.ai': {
    name: 'Smith.ai',
    url: 'https://smith.ai',
    type: 'Hybrid',
    billing: 'Per call: plans include a set number of calls, then a per-call rate.',
    starting: 'Human receptionists from $300/mo for 30 calls ($11.50 per extra call). AI receptionist has a free tier of 25 calls/mo, then $3 per call.',
    bestFor: 'Firms that want AI with live human receptionists available on the same line.',
    source: 'https://smith.ai/pricing',
  },
  Ruby: {
    name: 'Ruby',
    url: 'https://www.ruby.com',
    type: 'Human',
    billing: 'Monthly plans with included receptionist minutes.',
    starting: '$250/mo for 50 receptionist minutes.',
    bestFor: 'Small businesses that want every call answered by a live, US-based receptionist.',
    source: 'https://www.ruby.com/pricing/',
  },
  Goodcall: {
    name: 'Goodcall',
    url: 'https://www.goodcall.com',
    type: 'AI',
    billing: 'Per unique caller each month; no per-minute charges.',
    starting: '$79/mo for 100 unique callers (79¢ per extra caller).',
    bestFor: 'Small businesses that want a self-serve AI agent billed by caller rather than by minute.',
    source: 'https://www.goodcall.com/pricing',
  },
  Rosie: {
    name: 'Rosie',
    url: 'https://heyrosie.com',
    type: 'AI',
    billing: 'Monthly plans with included minutes.',
    starting: '$49/mo for 250 minutes.',
    bestFor: 'Solo owners and small service businesses that want low-cost AI answering in English and Spanish.',
    source: 'https://heyrosie.com/pricing',
  },
  Dialzara: {
    name: 'Dialzara',
    url: 'https://www.dialzara.com',
    type: 'AI',
    billing: 'Monthly plans with included minutes, then per minute.',
    starting: '$29/mo for 60 minutes ($0.48 per extra minute).',
    bestFor: 'Small businesses with light call volume that want the lowest entry price.',
    source: 'https://www.dialzara.com/pricing',
  },
  PATLive: {
    name: 'PATLive',
    url: 'https://www.patlive.com',
    type: 'Human',
    billing: 'Per minute, with monthly plans that include minutes.',
    starting: '$99/mo for 50 minutes ($2.29 per extra minute); pay-as-you-go at $2.99/min.',
    bestFor: 'Businesses that want US-based live receptionists with bilingual answering included.',
    source: 'https://www.patlive.com/pricing/',
  },
  'Abby Connect': {
    name: 'Abby Connect',
    url: 'https://www.abby.com',
    type: 'Hybrid',
    billing: 'Monthly plans with included minutes; AI-answered minutes count as half.',
    starting: '$165/mo for 50 minutes of human answering (or 100 of AI).',
    bestFor: 'Businesses that want a dedicated receptionist team, with AI for routine calls.',
    source: 'https://www.abby.com/pricing/',
  },
  Upfirst: {
    name: 'Upfirst',
    url: 'https://www.upfirst.ai',
    type: 'AI',
    billing: 'Monthly plans with included calls, then per call.',
    starting: '$24.95/mo for 30 calls ($1.50 per extra call).',
    bestFor: 'Small businesses that want an inexpensive AI receptionist in many languages.',
    source: 'https://www.upfirst.ai/pricing',
  },
  'My AI Front Desk': {
    name: 'My AI Front Desk',
    url: 'https://www.myaifrontdesk.com',
    type: 'AI',
    billing: 'Monthly plan with included voice minutes, texts and chats; overage from a credit pool.',
    starting: '$99/mo for 200 voice minutes plus text and chat.',
    bestFor: 'Owners who want phone, text and website chat answered by one AI.',
    source: 'https://www.myaifrontdesk.com/pricing',
  },
  AnsweringLegal: {
    name: 'AnsweringLegal',
    url: 'https://www.answeringlegal.com',
    type: 'Human',
    billing: 'Not published; packages are shown after a form is submitted.',
    starting: 'Not published.',
    bestFor: 'Law firms that want US-based receptionists who answer only for law firms.',
    source: 'https://www.answeringlegal.com/answering-service-pricing-plans',
  },
};

/** Keres, described by the same columns and the same rules. */
export const keresRow: AnsweringVendor = {
  name: 'Keres AI (Remi)',
  url: 'https://www.keresai.com/agents/inbound',
  type: 'AI',
  billing: 'One monthly rate with included minutes, then per minute; no per-call fees.',
  starting: 'Quoted to your call volume; month-to-month.',
  bestFor: 'Local service businesses that want calls booked into Google Calendar, HubSpot or ServiceTitan, and their website and Google profile run by the same team.',
  source: 'https://www.keresai.com/pricing',
};
