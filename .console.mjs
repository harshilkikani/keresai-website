// Dev-only: console errors, CSP violations, and whether motion/router ran.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4321';
const b = await chromium.launch({ channel: 'chrome' });
for (const vp of [{ w: 1440, h: 900, m: false }, { w: 390, h: 844, m: true }]) {
  const c = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m, colorScheme: 'light' });
  const p = await c.newPage();
  const logs = [];
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`${m.type()}: ${m.text().slice(0, 160)}`); });
  p.on('pageerror', (e) => logs.push(`pageerror: ${String(e).slice(0, 160)}`));
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2600);
  const state = await p.evaluate(() => ({
    motion: document.documentElement.hasAttribute('data-motion'),
    heroLive: !!document.querySelector('[data-hero].is-live'),
    wordsLive: !!document.querySelector('[data-words].is-live'),
    router: !!document.querySelector('script[src*="ClientRouter"], script[src*="_astro"]'),
    pipelineActive: document.querySelector('[data-pipeline]')?.getAttribute('data-active'),
    countsDone: [...document.querySelectorAll('[data-count]')].map(e => e.textContent.trim()).join(' | '),
    tiltTargets: document.querySelectorAll('[data-tilt]').length,
    firstTurnClip: getComputedStyle(document.querySelector('[data-hero] .k-type')).clipPath,
  }));
  // Client-side navigation: does the nav persist and do the dropdowns still work?
  if (vp.m) { await p.click('#hamburger'); await p.waitForTimeout(300); await p.click('#mobile-menu a[href="/pricing"]'); }
  else await p.click('.nav-links a[href="/pricing"]');
  await p.waitForURL('**/pricing', { timeout: 8000 }).catch(() => {});
  await p.waitForTimeout(600);
  const after = await p.evaluate(() => ({
    url: location.pathname,
    navPresent: !!document.querySelector('.nav'),
    themeBtn: !!document.getElementById('theme-toggle'),
    priceCards: document.querySelectorAll('.plan-card').length,
  }));
  console.log(`--- ${vp.w}x${vp.h} ---`);
  console.log('state:', JSON.stringify(state));
  console.log('after nav:', JSON.stringify(after));
  console.log(logs.length ? 'CONSOLE:\n  ' + logs.join('\n  ') : 'console: clean');
  await c.close();
}
await b.close();
