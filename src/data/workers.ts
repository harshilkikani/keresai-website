// The roster: every worker Keres sells, in the order they appear on the
// homepage, the pricing table and the nav. English; Spanish in i18n/data.es.
import type { PriceKey } from '../config/business';

export type WorkerMock = 'site' | 'listing' | 'inbound' | 'follow-up' | 'reactivation' | 'outbound' | 'scope';
export interface Worker {
  slug: string;
  name: string;
  /** One line: what it does. */
  job: string;
  href: string;
  priceKey: PriceKey;
  /** A person's name (Remi, Theo…) vs a product name (Found, Custom); Spanish "a" needs it. */
  person: boolean;
  mock: WorkerMock;
  /** What hiring it includes, for the pricing table. */
  includes: string[];
}

export const workers: Worker[] = [
  { slug: 'found', name: 'Found', job: 'Builds your website, runs your Google listing, gets the reviews', href: '/services/found', priceKey: 'found', person: false, mock: 'site',
    includes: ['Conversion website and care plan', 'Google Business Profile worked every week', 'Reviews after every job', 'Listings that agree with each other'] },
  { slug: 'inbound', name: 'Remi', job: 'Answers every call in two rings and books it', href: '/agents/inbound', priceKey: 'remi', person: true, mock: 'inbound',
    includes: ['Answering, day and night', 'Intake and qualification for your vertical', 'Booking into your calendar and CRM', 'Missed-call text-back in 60 seconds'] },
  { slug: 'follow-up', name: 'Theo', job: 'Confirms, reminds, chases the estimate', href: '/agents/follow-up', priceKey: 'theo', person: true, mock: 'follow-up',
    includes: ['Confirmations and reminders', 'No-show prevention', 'Estimate follow-up on day 1, 3 and 7'] },
  { slug: 'reactivation', name: 'June', job: 'Brings past customers back and asks for the review', href: '/agents/reactivation', priceKey: 'june', person: true, mock: 'reactivation',
    includes: ['Review requests after every job', 'Reactivation and win-back campaigns', 'Referral asks'] },
  { slug: 'outbound', name: 'Sol', job: 'Goes and gets new customers by email', href: '/agents/outbound', priceKey: 'sol', person: true, mock: 'outbound',
    includes: ['SPF, DKIM, DMARC and warm-up before a single send', 'Personalised sequences', 'Replies handled, meetings booked'] },
  { slug: 'custom', name: 'Custom', job: 'Any job nobody here does. We build the worker', href: '/custom', priceKey: 'customRun', person: false, mock: 'scope',
    includes: ['A one-page scope', 'A fixed build price', 'A monthly run fee', 'You approve everything it publishes'] },
];
export const workerBySlug = (slug: string) => workers.find((w) => w.slug === slug)!;
