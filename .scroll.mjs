// Dev-only: scroll the homepage and report what the motion system did.
import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
for (const vp of [{ w: 1440, h: 900, m: false }, { w: 390, h: 844, m: true }]) {
  const c = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m, colorScheme: 'light' });
  const p = await c.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
  await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const seen = new Set();
  const total = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += Math.round(vp.h * 0.55)) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(140);
    const act = await p.evaluate(() => document.querySelector('[data-pipeline]')?.getAttribute('data-active'));
    if (act != null) seen.add(act);
  }
  await p.waitForTimeout(600);
  const r = await p.evaluate(() => ({
    reveals: document.querySelectorAll('[data-reveal]').length,
    revealed: document.querySelectorAll('[data-reveal].is-in').length,
    stagesActive: document.querySelectorAll('.pipe__stage.is-active').length,
    dash: document.querySelector('[data-draw]')?.style.strokeDashoffset,
    brief: !!document.querySelector('.sms--brief.is-in'),
    popDelay: document.querySelector('[data-pop]')?.style.getPropertyValue('--d'),
    heroLight: !!document.querySelector('.k-hero__light'),
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  }));
  console.log(`--- ${vp.w}x${vp.h} ---`);
  console.log('pipeline data-active seen:', [...seen].join(' → '));
  console.log(JSON.stringify(r));
  console.log(errs.length ? 'PAGE ERRORS: ' + errs.join(' | ') : 'no page errors');
  await c.close();
}
await b.close();
