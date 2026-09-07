// Ad landing variants at /go and /go/[vertical].
//
// Each page is the answer to one search. The H1 says what the searcher
// typed, in their words; the lede says how fast and on what terms. The
// rest of the page is the homepage's own components in a shorter order:
// hero → two doors → calculator → three steps → close. No nav dropdowns,
// no footer grid, noindex. Every number here is a published fact
// (two rings, five days, the Found floor) — no traction claims.

import type { Vertical } from './mocks';

export interface GoPage {
  slug: string;              // '' for /go
  path: string;
  title: string;             // < 60 chars
  description: string;
  h1: string;
  lede: string;
  /** Proof strip: three published facts. */
  facts: { k: string; v: string }[];
  /** Vertical-specific copy for the two doors. */
  found: { title: string; text: string };
  answered: { title: string; text: string };
  /** Which transcript / brief the mocks show. */
  mock: Vertical;
  /** roi.js preset key. */
  calc: 'home-services' | 'legal' | 'dental';
  close: { h2: string; text: string };
}

const steps = [
  { n: '01', title: 'Get a quote, or call', text: 'Twenty minutes on the phone to map what happens today when a call comes in — who answers, what gets asked, where it stops.' },
  { n: '02', title: 'We build your site, your listing and your intake script', text: 'Your services, your hours, your prices, your handoff rules. Then your number, calendar and CRM go in.' },
  { n: '03', title: 'Live in five business days', text: 'You call it yourself first and keep tuning until it answers the way you would. Month-to-month from there.' },
];
export const goSteps = steps;

export const goPages: GoPage[] = [
  {
    slug: '',
    path: '/go',
    title: 'Every Call Answered and Booked in Five Days | Keres AI',
    description: 'A website and Google listing that get you found, and Remi answering every call in two rings and booking it. Live in five days, month-to-month, from $249/month.',
    h1: 'Every call answered and booked. Live in five days.',
    lede: 'A conversion-built website and a managed Google listing so the search finds you; then Remi, your Inbound Agent, answers in two rings and books the job before the caller hangs up. Month-to-month.',
    facts: [{ k: 'Answers in', v: '2 rings' }, { k: 'Live in', v: '5 days' }, { k: 'Plans from', v: '$249/mo' }],
    found: { title: 'Show up where the search happens.', text: 'A website built to convert, a Google Business Profile worked every week, reviews that keep arriving and listings that agree with each other. Fixed scope, from $249 a month.' },
    answered: { title: 'Every call answered in two rings and booked.', text: 'Remi picks up day or night, runs your intake script, offers real availability and writes the appointment to your calendar and CRM before the caller hangs up.' },
    mock: 'default',
    calc: 'home-services',
    close: { h2: 'Stop losing the calls you already paid for.', text: 'Get a quote in twenty minutes. Live in five business days, month-to-month.' },
  },
  {
    slug: 'home-services',
    path: '/go/home-services',
    title: 'HVAC & Plumbing: After-Hours Calls Booked | Keres AI',
    description: 'Missed calls after hours cost HVAC and plumbing companies the job. Remi answers every call in two rings, triages the emergency and books the dispatch window. Live in five days.',
    h1: 'Every after-hours call answered and booked. Live in five days.',
    lede: 'The no-heat call at 9pm goes to whoever picks up. Remi, your Inbound Agent, answers in two rings, triages the job, gives a dispatch window and writes it to ServiceTitan or Jobber — while you are still on the roof. Month-to-month.',
    facts: [{ k: 'Answers in', v: '2 rings' }, { k: 'Live in', v: '5 days' }, { k: 'Found from', v: '$249/mo' }],
    found: { title: 'Show up when the furnace dies.', text: 'A conversion website, a Google Business Profile worked weekly, reviews after every job, and Local Services Ads answered in two rings. From $249 a month.' },
    answered: { title: 'Emergency jobs triaged and dispatched, not voicemailed.', text: 'Remi asks what is happening, where, and how urgent, gives a real arrival window, and pages the on-call tech. Estimates get chased on day 1, 3 and 7.' },
    mock: 'home-services',
    calc: 'home-services',
    close: { h2: 'The next after-hours call is worth the whole month.', text: 'Get a quote in twenty minutes. Live in five business days, month-to-month.' },
  },
  {
    slug: 'law',
    path: '/go/law',
    title: 'Law Firms: New-Client Calls Answered and Booked | Keres AI',
    description: 'The first firm to answer signs the client. Remi answers every new-client call in two rings, screens for conflicts, qualifies the matter and books the consult. Live in five days.',
    h1: 'Every new-client call answered, screened and on your calendar. Live in five days.',
    lede: 'Most high-intent calls come after hours and go to the first firm that picks up. Remi, your Inbound Agent, answers in two rings, takes the conflict details, qualifies the matter for your practice area and books the consult. Month-to-month.',
    facts: [{ k: 'Answers in', v: '2 rings' }, { k: 'Live in', v: '5 days' }, { k: 'Found from', v: '$499/mo' }],
    found: { title: 'Be the firm that comes up, then the one that answers.', text: 'A conversion website, a managed Google Business Profile, reviews after every matter, and listings that agree on Avvo and FindLaw. Law-firm plans from $499 a month.' },
    answered: { title: 'Intake at 2 a.m., conflict details captured, consult booked.', text: 'Remi screens for conflicts, qualifies the matter, books the consultation and writes the intake to Clio, Lawmatics or HubSpot before the caller hangs up.' },
    mock: 'law-firms',
    calc: 'legal',
    close: { h2: 'The first firm to answer signs the client.', text: 'Get a quote in twenty minutes. Live in five business days, month-to-month.' },
  },
  {
    slug: 'dental',
    path: '/go/dental',
    title: 'Dental: Every Call Booked, Every Recall Filled | Keres AI',
    description: 'Remi answers every patient call in two rings, books chair time and pre-qualifies insurance; Theo confirms so the chair does not sit empty. Live in five days.',
    h1: 'Every call booked. Every recall filled. Live in five days.',
    lede: 'The chipped tooth at 7am books with whoever answers. Remi, your Inbound Agent, answers in two rings, finds the chart, books chair time and texts the forms; Theo confirms the night before so the chair is not empty. Month-to-month.',
    facts: [{ k: 'Answers in', v: '2 rings' }, { k: 'Live in', v: '5 days' }, { k: 'Found from', v: '$249/mo' }],
    found: { title: 'Show up for the search that starts with a toothache.', text: 'A conversion website, a managed Google Business Profile, reviews after every visit, and listings that agree on Healthgrades. From $249 a month.' },
    answered: { title: 'Chair time booked, recall filled, no-shows headed off.', text: 'Remi books the appointment and pre-qualifies insurance and procedure; Theo confirms and reminds; June rebooks the recall list before the hygienist has a gap.' },
    mock: 'dental-med-spa',
    calc: 'dental',
    close: { h2: 'An empty chair costs the same as a full one.', text: 'Get a quote in twenty minutes. Live in five business days, month-to-month.' },
  },
];

export const goBySlug = (slug: string) => goPages.find((g) => g.slug === slug);
