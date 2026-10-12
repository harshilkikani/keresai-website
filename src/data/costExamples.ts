// Worked cost example for /ai-receptionist-cost (and the Goodcall roundup).
// Arithmetic on each vendor's LOWEST published plan plus its published
// overage rate only. Source pages and date: see answeringVendors.ts
// (VENDORS_CHECKED). Vendors whose overage rate is not published (Ruby, Rosie,
// Abby Connect) or whose prices are not published (AnsweringLegal) are left
// out rather than guessed. Keres AI quotes Remi to call volume, so it is not
// in the arithmetic either.

export const COST_ASSUMPTIONS = {
  calls: 100,
  avgMinutes: 3,
  uniqueCallers: 100,
} as const;

export interface CostExample {
  vendor: string;
  plan: string;
  /** Monthly plan fee in USD. */
  fee: number;
  /** What the plan counts. */
  unit: 'call' | 'minute' | 'caller';
  /** Units included in the fee. */
  included: number;
  /** USD per unit past the included amount. */
  overage: number;
  type: 'AI' | 'Human' | 'Hybrid';
  source: string;
  note?: string;
}

export const costExamples: CostExample[] = [
  { vendor: 'Goodcall', plan: 'Starter', fee: 79, unit: 'caller', included: 100, overage: 0.79, type: 'AI', source: 'https://www.goodcall.com/pricing' },
  { vendor: 'My AI Front Desk', plan: 'Lowest monthly plan', fee: 99, unit: 'minute', included: 200, overage: 0.25, type: 'AI', source: 'https://www.myaifrontdesk.com/pricing', note: 'Overage is drawn from credits: 25 credits per voice minute at $10 per 1,000 credits, or $0.25 a minute.' },
  { vendor: 'Upfirst', plan: 'Starter', fee: 24.95, unit: 'call', included: 30, overage: 1.5, type: 'AI', source: 'https://www.upfirst.ai/pricing' },
  { vendor: 'Dialzara', plan: 'Business Lite', fee: 29, unit: 'minute', included: 60, overage: 0.48, type: 'AI', source: 'https://www.dialzara.com/pricing' },
  { vendor: 'Smith.ai (AI receptionist)', plan: 'Free tier', fee: 0, unit: 'call', included: 25, overage: 3, type: 'AI', source: 'https://smith.ai/pricing' },
  { vendor: 'PATLive', plan: '50-minute plan', fee: 99, unit: 'minute', included: 50, overage: 2.29, type: 'Human', source: 'https://www.patlive.com/pricing/', note: 'PATLive adds government taxes and fees on top.' },
  { vendor: 'Smith.ai (human receptionists)', plan: 'Starter', fee: 300, unit: 'call', included: 30, overage: 11.5, type: 'Human', source: 'https://smith.ai/pricing' },
];

const usage = (unit: CostExample['unit']): number =>
  unit === 'minute' ? COST_ASSUMPTIONS.calls * COST_ASSUMPTIONS.avgMinutes
    : unit === 'caller' ? COST_ASSUMPTIONS.uniqueCallers
    : COST_ASSUMPTIONS.calls;

export const monthlyCost = (e: CostExample): number => {
  const extra = Math.max(0, usage(e.unit) - e.included);
  return Math.round((e.fee + extra * e.overage) * 100) / 100;
};

export const usd = (n: number): string =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

/** "$24.95 + 70 extra calls × $1.50" */
export const costWorking = (e: CostExample): string => {
  const extra = Math.max(0, usage(e.unit) - e.included);
  const unitLabel = e.unit === 'minute' ? 'minutes' : e.unit === 'caller' ? 'callers' : 'calls';
  if (extra === 0) return `${usd(e.fee)} plan covers all ${usage(e.unit)} ${unitLabel}`;
  return `${usd(e.fee)} + ${extra} extra ${unitLabel} × ${usd(e.overage)}`;
};

export const costExamplesSorted = [...costExamples].sort((a, b) => monthlyCost(a) - monthlyCost(b));
