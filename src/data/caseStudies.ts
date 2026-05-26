// Real customer case studies. LEAVE EMPTY until you have genuine, approved
// results — entries render at /customers and /customers/{slug}. Never invent
// client names, metrics, or quotes.
//
// Example entry:
//   {
//     slug: 'acme-hvac',
//     client: 'Acme HVAC',
//     industry: 'HVAC',
//     headline: 'How Acme HVAC booked 14 after-hours jobs in month one',
//     summary: 'Acme stopped sending night calls to voicemail and recovered…',
//     challenge: '…',
//     solution: '…',
//     results: [{ metric: 'After-hours jobs booked / mo', value: '14' }],
//     quote: { text: '…', author: 'Jane Doe, Owner' },
//     date: '2026-01-15',
//   }
export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  quote?: { text: string; author: string };
  date?: string;
}

export const caseStudies: CaseStudy[] = [];
