// Dev-only page-weight + link probe. Delete when done.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4321';
const paths = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
for (const p of paths) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let bytes = 0;
  const failed = [];
  const byType = {};
  page.on('response', async (r) => {
    if (r.status() >= 400) { failed.push(`${r.status()} ${r.url()}`); return; }
    try {
      const buf = await r.body();
      bytes += buf.length;
      const t = (r.request().resourceType() || 'other');
      byType[t] = (byType[t] || 0) + buf.length;
    } catch {}
  });
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
  });
  await page.waitForTimeout(700);
  const kb = (n) => (n / 1024).toFixed(0) + 'KB';
  const parts = Object.entries(byType).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k} ${kb(v)}`).join(', ');
  console.log(`${p.padEnd(28)} ${kb(bytes).padStart(8)}  [${parts}]`);
  if (failed.length) console.log('   FAILED: ' + failed.join('\n           '));
  await ctx.close();
}
await browser.close();
