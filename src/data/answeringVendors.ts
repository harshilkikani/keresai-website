// Published facts about answering services and AI receptionists, used by the
// "alternatives" roundups on the comparison pages. Every price comes from the
// vendor's own pricing page on the date in VENDORS_CHECKED; recheck before
// changing the date. Neutral wording only: what each one is, how it bills,
// what the lowest published plan includes, and who it suits by its own
// positioning. Anything not on the vendor's page is left out, not guessed.
export const VENDORS_CHECKED = 'October 11, 2026';

/** Industries with their own "best AI receptionist for …" roundup. */
export type VendorIndustry = 'hvac' | 'law' | 'real-estate';

/** How a vendor positions itself for one industry, in its own words, with the page that says so. */
export interface IndustryFit {
  fit: string;
  source: string;
}

export interface AnsweringVendor {
  name: string;
  url: string;
  type: 'AI' | 'Human' | 'Hybrid';
  billing: string;
  starting: string;
  bestFor: string;
  source: string;
  /** Only industries the vendor's own site positions it for. */
  industries?: Partial<Record<VendorIndustry, IndustryFit>>;
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
    industries: {
      hvac: { fit: 'HVAC page: AI handles routine scheduling and live receptionists handle emergency coordination; links its ServiceTitan integration.', source: 'https://smith.ai/industries/hvac-technicians-answering-service' },
      law: { fit: 'Legal page: practice-specific intake, conflict checks and case management integration; its pricing page names Clio.', source: 'https://smith.ai/industries/legal-law-firms-answering-service' },
      'real-estate': { fit: 'Real estate page: qualifies buyers and sellers on pre-approval and timeline and schedules showings; names Follow Up Boss, kvCORE and LionDesk.', source: 'https://smith.ai/industries/real-estate-agents-answering-service' },
    },
  },
  Ruby: {
    name: 'Ruby',
    url: 'https://www.ruby.com',
    type: 'Human',
    billing: 'Monthly plans with included receptionist minutes.',
    starting: '$250/mo for 50 receptionist minutes.',
    bestFor: 'Small businesses that want every call answered by a live, US-based receptionist.',
    source: 'https://www.ruby.com/pricing/',
    industries: {
      law: { fit: 'Legal page: live receptionists for intake, consultation booking and payment support, plus managed website chat.', source: 'https://www.ruby.com/industries/legal/' },
      'real-estate': { fit: 'Real estate page: live receptionists 24/7; agents set their status in the Ruby app while at a showing.', source: 'https://www.ruby.com/industries/real-estate/' },
    },
  },
  Goodcall: {
    name: 'Goodcall',
    url: 'https://www.goodcall.com',
    type: 'AI',
    billing: 'Per unique caller each month; no per-minute charges.',
    starting: '$79/mo for 100 unique callers (79¢ per extra caller).',
    bestFor: 'Small businesses that want a self-serve AI agent billed by caller rather than by minute.',
    source: 'https://www.goodcall.com/pricing',
    industries: {
      hvac: { fit: 'HVAC page: per-caller billing absorbs seasonal call spikes; Zapier connects it to ServiceTitan, Jobber and Housecall Pro.', source: 'https://www.goodcall.com/answering-service/hvac-company' },
    },
  },
  Rosie: {
    name: 'Rosie',
    url: 'https://heyrosie.com',
    type: 'AI',
    billing: 'Monthly plans with included minutes.',
    starting: '$49/mo for 250 minutes.',
    bestFor: 'Solo owners and small service businesses that want low-cost AI answering in English and Spanish.',
    source: 'https://heyrosie.com/pricing',
    industries: {
      hvac: { fit: 'HVAC page: answers 24/7 and sorts urgent from non-urgent calls; says it cannot dispatch technicians directly.', source: 'https://heyrosie.com/industries/hvac' },
      'real-estate': { fit: 'Real estate page: answers questions about your listings and showing availability, and sorts hot leads from cold.', source: 'https://heyrosie.com/industries/real-estate' },
    },
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
    industries: {
      'real-estate': { fit: 'Real estate page: qualifies buyers on budget, timeline and neighborhood, books showings, and follows up on missed showings by call and text.', source: 'https://www.myaifrontdesk.com/industries-we-serve/real-estate' },
    },
  },
  AnsweringLegal: {
    name: 'AnsweringLegal',
    url: 'https://www.answeringlegal.com',
    type: 'Human',
    billing: 'Not published; packages are shown after a form is submitted.',
    starting: 'Not published.',
    bestFor: 'Law firms that want US-based receptionists who answer only for law firms.',
    source: 'https://www.answeringlegal.com/answering-service-pricing-plans',
    industries: {
      law: { fit: 'Answers only for law firms.', source: 'https://www.answeringlegal.com/answering-service-pricing-plans' },
    },
  },
};

/**
 * Vendors that position for one industry and appear only on the
 * "best AI receptionist for …" industry roundups. Kept out of
 * answeringVendors so the general roundup and cost tables keep their ten
 * rows. Same rules and the same check date as above.
 */
export const specialistVendors: Record<string, AnsweringVendor> = {
  Avoca: {
    name: 'Avoca',
    url: 'https://www.avoca.ai',
    type: 'Hybrid',
    billing: 'Not published; pricing is given on a demo.',
    starting: 'Not published.',
    bestFor: 'Home service companies on ServiceTitan that want an AI CSR, with a human CSR team as backup, plus speed-to-lead and outbound campaigns.',
    source: 'https://www.avoca.ai',
    industries: {
      hvac: { fit: 'HVAC page: an AI CSR that books jobs into your CRM and routes emergencies, with transfer to Avoca’s human CSR team; ServiceTitan integration page.', source: 'https://www.avoca.ai/industries/hvac' },
    },
  },
  'Sameday AI': {
    name: 'Sameday AI',
    url: 'https://sameday.ai',
    type: 'AI',
    billing: 'Monthly plans sized to the minutes you expect; the overage rate is not published.',
    starting: 'Launch from $449/mo, starting with 500 minutes.',
    bestFor: 'Home service businesses that want an AI CSR with scheduling into ServiceTitan.',
    source: 'https://sameday.ai/pricing',
    industries: {
      hvac: { fit: 'Built for home service trades, HVAC among them; plans include “Pro scheduling (ServiceTitan etc)”.', source: 'https://sameday.ai/pricing' },
    },
  },
  'LEX Reception': {
    name: 'LEX Reception',
    url: 'https://www.lexreception.com',
    type: 'Human',
    billing: 'Not published; plans are shown after a form or by phone.',
    starting: 'Not published.',
    bestFor: 'Law firms that want live legal receptionists and intake, in English and Spanish.',
    source: 'https://www.lexreception.com/plans',
    industries: {
      law: { fit: 'Answers for law firms only; lists Clio, MyCase, Filevine, Lawmatics, Smokeball and other legal integrations.', source: 'https://www.lexreception.com/' },
    },
  },
  'LegalClerk.ai': {
    name: 'LegalClerk.ai',
    url: 'https://www.legalclerk.ai',
    type: 'AI',
    billing: 'Per seat each month, with unlimited calls and no setup fee.',
    starting: '$400 per seat/mo, unlimited calls.',
    bestFor: 'Law firms that want an AI intake receptionist built only for legal work, syncing to Clio or MyCase.',
    source: 'https://www.legalclerk.ai/pricing',
    industries: {
      law: { fit: 'Built for law firms: qualifies legal leads, schedules appointments and lists Clio and MyCase among its CRM integrations.', source: 'https://www.legalclerk.ai/pricing' },
    },
  },
  Allo: {
    name: 'Allo',
    url: 'https://www.withallo.com',
    type: 'AI',
    billing: 'A per-seat phone system, plus the AI Receptionist add-on per agent; Allo says its pricing is early and can still change.',
    starting: 'AI Receptionist $32/mo per agent billed yearly, added to a paid plan (Business from $32 per seat/mo billed yearly).',
    bestFor: 'Agents and teams that want a business phone system with an AI receptionist that books viewings and syncs to their CRM.',
    source: 'https://www.withallo.com/pricing',
    industries: {
      'real-estate': { fit: 'Real estate page: answers, texts back and books viewings while you are at a showing, then syncs the lead to your CRM.', source: 'https://www.withallo.com/industries/real-estate' },
    },
  },
};

/** Every vendor with a fit for `industry`, in the order given. Throws if a name has no fit, so a page cannot list a vendor without a source. */
export function vendorsFor(industry: VendorIndustry, names: string[]): (AnsweringVendor & { fitFor: IndustryFit })[] {
  const all = { ...answeringVendors, ...specialistVendors };
  return names.map((n) => {
    const v = all[n];
    const fit = v?.industries?.[industry];
    if (!v || !fit) throw new Error(`No ${industry} fit recorded for ${n}`);
    return { ...v, fitFor: fit };
  });
}

/** Keres, described by the same columns and the same rules. */
export const keresRow: AnsweringVendor = {
  name: 'Keres AI (Remi)',
  url: 'https://www.keresai.com/agents/inbound',
  type: 'AI',
  billing: 'One monthly rate with included minutes, then per minute; no per-call fees.',
  starting: 'Quoted to your call volume; month-to-month.',
  bestFor: 'Local service businesses that want calls booked into Google Calendar, HubSpot or ServiceTitan, and their website and Google profile run by the same team.',
  source: 'https://www.keresai.com/pricing',
  industries: {
    hvac: { fit: 'Field-service trades: asks your intake questions, follows the emergency rules you set and books the job into ServiceTitan, Google Calendar or HubSpot.', source: '/industries/home-services' },
    law: { fit: 'Law firm intake by practice area: collects the names your firm needs for its conflict check and books the consultation into Google Calendar or HubSpot (no Clio integration today).', source: '/industries/law-firms' },
    'real-estate': { fit: 'Agents and teams: asks about pre-approval, agent and timeline, and books the showing into Google Calendar or HubSpot (no Follow Up Boss integration today).', source: '/industries/real-estate' },
  },
};

/**
 * Spanish wording for the /es/pricing comparison table. Same facts as the
 * English rows above, translated line by line; numbers are unchanged. Keep
 * these in step with the English entries whenever a price is rechecked.
 */
export const vendorTypeEs: Record<AnsweringVendor['type'], string> = { AI: 'IA', Human: 'Persona', Hybrid: 'Híbrido' };
export const answeringVendorsEs: Record<string, { billing: string; starting: string }> = {
  'Keres AI (Remi)': {
    billing: 'Una tarifa mensual con minutos incluidos, luego por minuto; sin cargos por llamada.',
    starting: 'Cotizado según tu volumen de llamadas; mes a mes.',
  },
  'Smith.ai': {
    billing: 'Por llamada: los planes incluyen un número fijo de llamadas y luego una tarifa por llamada.',
    starting: 'Recepcionistas humanos desde $300/mes por 30 llamadas ($11.50 por llamada adicional). El recepcionista con IA tiene un nivel gratuito de 25 llamadas al mes, luego $3 por llamada.',
  },
  Ruby: {
    billing: 'Planes mensuales con minutos de recepcionista incluidos.',
    starting: '$250/mes por 50 minutos de recepcionista.',
  },
  Goodcall: {
    billing: 'Por persona distinta que llama cada mes; sin cargos por minuto.',
    starting: '$79/mes por 100 personas distintas que llaman (79¢ por cada persona adicional).',
  },
  PATLive: {
    billing: 'Por minuto, con planes mensuales que incluyen minutos.',
    starting: '$99/mes por 50 minutos ($2.29 por minuto adicional); pago por uso a $2.99/min.',
  },
  Upfirst: {
    billing: 'Planes mensuales con llamadas incluidas, luego por llamada.',
    starting: '$24.95/mes por 30 llamadas ($1.50 por llamada adicional).',
  },
};
