// The seven places a small firm's pipeline leaks, in the order money
// actually falls out of it: before the call, during the call, after the
// call, and then the demand that never arrives at all.
//
// These are structural — each one is derived from the catalog in
// src/data/site.ts, and each names the thing that plugs it. Deliberately
// no statistics: a number here would have to be real, and none of these
// have a sourced figure yet. State the leak, name the fix, move on.

export interface Leak {
  /** Two-digit stage marker, rendered in mono. */
  n: string;
  title: string;
  body: string;
  /** What plugs it — an agent name or Found. */
  fix: string;
  href: string;
}

export const leaks: Leak[] = [
  {
    n: '01',
    title: 'Nobody finds you',
    body: 'Someone three streets over searched for exactly what you do. They saw four competitors and a map. They did not see you.',
    fix: 'Found',
    href: '/services/found',
  },
  {
    n: '02',
    title: 'The phone rings out',
    body: 'After hours, on a ladder, already on the other line. Whoever called does not leave a voicemail — they dial the next name on the list.',
    fix: 'Inbound Agent',
    href: '/agents/inbound',
  },
  {
    n: '03',
    title: 'It gets answered, not booked',
    body: 'A message on a sticky note is not an appointment. The caller wanted a time and a date, and got a promise that someone would call back.',
    fix: 'Inbound Agent',
    href: '/agents/inbound',
  },
  {
    n: '04',
    title: 'The booking never shows',
    body: 'No confirmation, no reminder, no second chance. The slot sits empty and you have already paid the person who was going to fill it.',
    fix: 'Follow-Up Agent',
    href: '/agents/follow-up',
  },
  {
    n: '05',
    title: 'The estimate goes quiet',
    body: 'You did the work of quoting it. Then nobody chased it, and it closed with somebody who called them back on Thursday.',
    fix: 'Follow-Up Agent',
    href: '/agents/follow-up',
  },
  {
    n: '06',
    title: 'The old list sits there',
    body: 'Every one of them already chose you once. Nobody has spoken to them since, and the reason is always the same: no one had the time.',
    fix: 'Reactivation Agent',
    href: '/agents/reactivation',
  },
  {
    n: '07',
    title: 'Nothing new comes in',
    body: 'Referrals are the whole pipeline. When they slow down there is no second source of demand, and the quiet month becomes a quiet quarter.',
    fix: 'Outbound Agent',
    href: '/agents/outbound',
  },
];
