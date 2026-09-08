// The one pipeline every small firm runs, and the seven places money
// falls out of it: get found, capture, qualify, book, show, convert,
// come back. A customer starts at whichever stage leaks most.
//
// Shared by the homepage leak list, /services (which expands each into
// a full stage block) and the pipeline diagram, so the stage names can
// never drift between them.
//
// Deliberately no statistics attached: a number here would have to be
// real and sourced. State the leak, name the fix, move on.

export interface Stage {
  /** 0–6. Rendered as 01–07 on the homepage. */
  n: number;
  /** Short stage name. Used in the diagram and the /services blocks. */
  name: string;
  /** The leak, one sentence, in the reader's own words. */
  leak: string;
  /** What Keres does about it. */
  fix: string;
  /** Who does it — an agent's given name, or Found. */
  by: string;
  href: string;
}

export const stages: Stage[] = [
  {
    n: 0,
    name: 'Be found',
    leak: 'Someone three streets away searched for exactly what you do, and your name was not in the results.',
    fix: 'Found puts a conversion website, a managed Google Business Profile, real reviews and AI-search visibility underneath everything else.',
    by: 'Found',
    href: '/services/found',
  },
  {
    n: 1,
    name: 'Capture',
    leak: 'The phone rang out at 7pm and they dialled the next name on the list without leaving a voicemail.',
    fix: 'Remi answers in two rings, 24/7, and texts back within 60 seconds anything it could not take.',
    by: 'Remi',
    href: '/agents/inbound',
  },
  {
    n: 2,
    name: 'Qualify',
    leak: 'You took a message. A message is not a qualified lead, and by tomorrow nobody remembers what they wanted.',
    fix: 'Remi runs your intake script on the call — matter type, job type, urgency, insurance — and writes it down.',
    by: 'Remi',
    href: '/agents/inbound#intake',
  },
  {
    n: 3,
    name: 'Book',
    leak: '"Someone will call you back" is where most leads die, and the caller knows it when they hear it.',
    fix: 'Remi books into your calendar and CRM while the caller is still on the line, then confirms by text.',
    by: 'Remi',
    href: '/agents/inbound#booking',
  },
  {
    n: 4,
    name: 'Show',
    leak: 'The slot was booked and nobody turned up. You had already paid for that hour either way.',
    fix: 'Theo confirms, reminds, handles the reschedule, and backfills the slot from your waitlist.',
    by: 'Theo',
    href: '/agents/follow-up',
  },
  {
    n: 5,
    name: 'Convert',
    leak: 'You sent the estimate. Nobody chased it. It closed with whoever called them back on Thursday.',
    fix: 'Theo follows up on day 1, day 3 and day 7 until you have a yes or a no.',
    by: 'Theo',
    href: '/agents/follow-up#estimates',
  },
  {
    n: 6,
    name: 'Come back',
    leak: 'Hundreds of people already chose you once, and nobody has spoken to them since.',
    fix: 'June reactivates the list, revives closed-lost, and asks for the review after every job.',
    by: 'June',
    href: '/agents/reactivation',
  },
];

/** 01–07 for display; the data keeps the 0-based stage index. */
export const stageLabel = (n: number) => String(n + 1).padStart(2, '0');
