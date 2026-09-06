// Dev-only Lighthouse runner. Delete when done.
import { readFileSync } from 'node:fs';
const files = process.argv.slice(2);
const pct = (x) => (x == null ? '--' : String(Math.round(x * 100)));
for (const f of files) {
  let r;
  try { r = JSON.parse(readFileSync(f, 'utf8')); } catch { console.log(f, 'UNREADABLE'); continue; }
  const c = r.categories, a = r.audits;
  if (!c || !a || !a['first-contentful-paint']) { console.log(f, 'INCOMPLETE RUN'); continue; }
  const label = new URL(r.finalDisplayedUrl || r.finalUrl).pathname;
  console.log(
    label.padEnd(24),
    'perf', pct(c.performance?.score).padStart(3),
    '| a11y', pct(c.accessibility?.score).padStart(3),
    '| bp', pct(c['best-practices']?.score).padStart(3),
    '| seo', pct(c.seo?.score).padStart(3),
    '| FCP', (a['first-contentful-paint'].displayValue || '').padStart(6),
    '| LCP', (a['largest-contentful-paint'].displayValue || '').padStart(6),
    '| CLS', (a['cumulative-layout-shift'].displayValue || '').padStart(5),
  );
  const fails = (c.accessibility?.auditRefs || []).map(k => a[k.id]).filter(x => x && x.score !== null && x.score < 1).map(x => x.id);
  if (fails.length) console.log('    a11y failing:', fails.join(', '));
}
