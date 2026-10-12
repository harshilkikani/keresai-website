// Server-side mirror of the calculator arithmetic in /assets/roi.js and
// /assets/calc.js, so every calculator renders a worked value in the HTML
// instead of "$0" before (or without) JavaScript. The scripts recompute on load.
import type { Calculator } from './calculators';

export const ROI_DEFAULTS: Record<string, { leads: number; answer: number; job: number; ah: number; close: number }> = {
  'real-estate': { leads: 150, answer: 55, job: 4500, ah: 40, close: 0.08 },
  'home-services': { leads: 250, answer: 60, job: 680, ah: 35, close: 0.25 },
  'med-spa': { leads: 180, answer: 70, job: 350, ah: 20, close: 0.5 },
  professional: { leads: 80, answer: 50, job: 3500, ah: 30, close: 0.15 },
  legal: { leads: 80, answer: 50, job: 3500, ah: 45, close: 0.15 },
  dental: { leads: 180, answer: 70, job: 350, ah: 20, close: 0.5 },
};

export const usd = (n: number) => '$' + Math.round(Math.max(0, n)).toLocaleString('en-US');
export const count = (n: number) => Math.round(Math.max(0, n)).toLocaleString('en-US');

/** roi.js result for given inputs; close rate comes from the vertical. */
export function roiResult(inputs: { leads: number; answer: number; job: number; ah: number }, vertical: string) {
  const close = (ROI_DEFAULTS[vertical] ?? ROI_DEFAULTS['home-services']).close;
  const missed = inputs.leads * (1 - inputs.answer / 100);
  const jobs = missed * close;
  const lostMo = jobs * inputs.job;
  return { missed, jobs, lostMo, lostYr: lostMo * 12, ah: inputs.leads * (inputs.ah / 100) };
}

function responseFactor(min: number) {
  if (min <= 5) return 1.0;
  if (min <= 10) return 0.6;
  if (min <= 30) return 0.35;
  if (min <= 60) return 0.2;
  return 0.1;
}

/** calc.js headline values for a data-driven calculator at its default inputs. */
export function calcDefaultResult(c: Calculator) {
  const v = (id: string) => c.fields.find((f) => f.id === id)?.default ?? 0;
  let primary = 0;
  if (c.kind === 'missed-call') primary = v('leads') * (1 - v('answer') / 100) * c.closeRate * v('value');
  else if (c.kind === 'no-show') primary = v('appts') * (v('noshow') / 100) * v('value');
  else if (c.kind === 'response-time') {
    const potential = v('leads') * c.closeRate * v('value');
    primary = potential - potential * responseFactor(v('current'));
  }
  return { primary, secondary: primary * 12 };
}
