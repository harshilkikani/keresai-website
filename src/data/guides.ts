// Data-driven guide/blog metadata. Bodies live in ./guide-bodies/{slug}.html
// and are loaded in src/pages/guides/[slug].astro via import.meta.glob.
export interface Guide {
  slug: string;
  category: string;
  listTitle: string;
  listDesc: string;
  metaTitle: string;
  description: string;
  titleHtml: string;
  readTime: string;
  order: number;
  /** First published on this domain (git history). */
  datePublished: string;
  /** Last substantive edit. */
  dateModified: string;
}

export const guides: Guide[] = [
  {
    slug: "septic-automation-playbook",
    datePublished: '2026-05-26',
    dateModified: '2026-10-11',
    category: "Featured · Deep dive",
    listTitle: "The Septic Service Automation Playbook",
    listDesc: "Where AI delivers the highest ROI for septic operators: intake triage, pumping reminders, emergency call handling, and invoice follow-up.",
    metaTitle: "Septic Service Business Automation Playbook | Keres AI",
    description: "The playbook for automating septic operations: intake scheduling, route planning, invoice delivery, and customer follow-up — written for operators.",
    titleHtml: "The Septic Service <span class=\"accent\">Automation</span> Playbook",
    readTime: "12 min read",
    order: 0,
  },
  {
    slug: "customer-intake-automation",
    datePublished: '2026-05-26',
    dateModified: '2026-05-26',
    category: "Guide",
    listTitle: "Customer Intake Automation for Field Service",
    listDesc: "How to automate customer intake calls and forms so no lead slips through the cracks.",
    metaTitle: "Customer Intake Automation for Field Service | Keres AI",
    description: "How to eliminate paper forms and manual data entry. The intake systems successful field service companies use to qualify leads 24/7.",
    titleHtml: "Customer Intake <span class=\"accent\">Automation</span> for Field Service",
    readTime: "8 min read",
    order: 1,
  },
  {
    slug: "roofing-growth-through-ai",
    datePublished: '2026-05-26',
    dateModified: '2026-10-11',
    category: "Deep dive",
    listTitle: "Roofing Company Growth Through AI",
    listDesc: "A practical look at how roofing companies use AI to capture and book more storm-season leads.",
    metaTitle: "Roofing Company Growth Through AI | Keres AI",
    description: "How leading roofing companies use AI to qualify leads faster, schedule jobs automatically, and manage estimates at scale.",
    titleHtml: "Roofing Company Growth Through <span class=\"accent\">AI</span>",
    readTime: "10 min read",
    order: 2,
  },
  {
    slug: "hvac-scaling-checklist",
    datePublished: '2026-05-26',
    dateModified: '2026-10-11',
    category: "Deep dive",
    listTitle: "HVAC Business Scaling Checklist",
    listDesc: "Seasonal automation, maintenance reminders, emergency dispatch, and billing automation for HVAC leaders.",
    metaTitle: "HVAC Business Scaling Checklist | Keres AI",
    description: "Seasonal automation, maintenance reminders, emergency dispatch coordination, and billing automation for HVAC service leaders.",
    titleHtml: "HVAC Business <span class=\"accent\">Scaling</span> Checklist",
    readTime: "9 min read",
    order: 3,
  },
  {
    slug: "towing-operations-automation",
    datePublished: '2026-05-26',
    dateModified: '2026-10-11',
    category: "Deep dive",
    listTitle: "Towing Dispatch & Operations Automation",
    listDesc: "Automating dispatch, intake, and follow-up for high-volume towing operations.",
    metaTitle: "Towing Dispatch & Operations Automation | Keres AI",
    description: "Real-time dispatch coordination, customer intake at scale, location tracking, and roadside assistance follow-up automation.",
    titleHtml: "Towing Dispatch & <span class=\"accent\">Operations</span> Automation",
    readTime: "8 min read",
    order: 4,
  },
  {
    slug: "measuring-automation-roi",
    datePublished: '2026-05-26',
    dateModified: '2026-10-11',
    category: "Best practice",
    listTitle: "Measuring the ROI of Business Automation",
    listDesc: "A simple framework for measuring the real cost and time savings of automation.",
    metaTitle: "Measuring the ROI of Business Automation | Keres AI",
    description: "How to calculate time savings, cost reduction, and revenue impact from AI agents. Includes an ROI worksheet.",
    titleHtml: "Measuring the <span class=\"accent\">ROI</span> of Business Automation",
    readTime: "6 min read",
    order: 5,
  },
  {
    slug: "integrating-ai-into-your-stack",
    datePublished: '2026-05-26',
    dateModified: '2026-10-11',
    category: "Best practice",
    listTitle: "Integrating AI Into Your Current Stack",
    listDesc: "How to connect AI agents to the CRM, calendar, and phone systems you already run on.",
    metaTitle: "Integrating AI Into Your Current Stack | Keres AI",
    description: "Technical guide to integrating custom AI agents with your existing CRM, scheduling, and accounting software.",
    titleHtml: "Integrating AI Into Your <span class=\"accent\">Current Stack</span>",
    readTime: "10 min read",
    order: 6,
  },
];

/** Guides worth linking from a trade or hub page, by industry or hub slug. */
const GUIDE_MAP: Record<string, string[]> = {
  hvac: ['hvac-scaling-checklist', 'customer-intake-automation', 'measuring-automation-roi'],
  plumbers: ['customer-intake-automation', 'integrating-ai-into-your-stack', 'measuring-automation-roi'],
  roofing: ['roofing-growth-through-ai', 'customer-intake-automation', 'measuring-automation-roi'],
  septic: ['septic-automation-playbook', 'customer-intake-automation', 'measuring-automation-roi'],
  towing: ['towing-operations-automation', 'customer-intake-automation', 'integrating-ai-into-your-stack'],
  'med-spas': ['customer-intake-automation', 'measuring-automation-roi'],
  'home-services': ['hvac-scaling-checklist', 'roofing-growth-through-ai', 'septic-automation-playbook', 'towing-operations-automation', 'customer-intake-automation'],
  'law-firms': ['customer-intake-automation', 'measuring-automation-roi'],
  'dental-med-spa': ['customer-intake-automation', 'measuring-automation-roi'],
  'real-estate': ['customer-intake-automation', 'measuring-automation-roi'],
};
export const guidesFor = (slug: string): Guide[] =>
  (GUIDE_MAP[slug] ?? []).map((s) => guides.find((g) => g.slug === s)).filter((g): g is Guide => Boolean(g));
