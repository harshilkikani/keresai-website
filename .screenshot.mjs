// Dev-only screenshot helper. Not part of the build; delete when done.
// Usage: node .screenshot.mjs <label> <path> [<path> ...]
//
// Emits, per viewport:
//   <label>-<slug>-<vp>-fold.png   the real above-the-fold view, @2x
//   <label>-<slug>-<vp>-NN.png     scrolled tiles down the page, @1x
// Tiles rather than one fullPage shot: a fullPage capture taller than
// Chrome's ~16k texture limit silently wraps and repeats content.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [label, ...paths] = process.argv.slice(2);
const BASE = process.env.BASE || 'http://localhost:4321';
const OUT = '/private/tmp/keres-shots';
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '390', width: 390, height: 844, mobile: true },
  { name: '1440', width: 1440, height: 900, mobile: false },
];

const browser = await chromium.launch({ channel: 'chrome' });

for (const vp of VIEWPORTS) {
  for (const dsf of [2, 1]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: dsf,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      colorScheme: 'light',
    });
    const page = await ctx.newPage();
    for (const p of paths) {
      const slug = p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-');
      const url = BASE + p;
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      if (!res || res.status() >= 400) {
        console.log(`FAIL ${url} → ${res ? res.status() : 'no response'}`);
        continue;
      }
      await page.waitForTimeout(400);
      if (dsf === 2) {
        await page.screenshot({ path: `${OUT}/${label}-${slug}-${vp.name}-fold.png` });
        const h = await page.evaluate(() => document.documentElement.scrollHeight);
        console.log(`OK   ${url} @${vp.name}  height=${h}px`);
        continue;
      }
      // Warm lazy content, then walk down a screen at a time.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
      });
      await page.waitForTimeout(600);
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = vp.height;
      let i = 0;
      for (let y = 0; y < total; y += step, i++) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(120);
        const n = String(i).padStart(2, '0');
        await page.screenshot({ path: `${OUT}/${label}-${slug}-${vp.name}-${n}.png` });
      }
      console.log(`     ${slug} @${vp.name}  ${i} tiles`);
    }
    await ctx.close();
  }
}
await browser.close();
