import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2800);
const r = await p.evaluate(async () => {
  await document.fonts.ready;
  const loaded = [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight}`);
  const h1 = getComputedStyle(document.querySelector('h1'));
  const lede = getComputedStyle(document.querySelector('.k-lede'));
  const h1Check = document.fonts.check(`${h1.fontWeight} ${h1.fontSize} ${h1.fontFamily}`);
  const ledeCheck = document.fonts.check(`${lede.fontWeight} ${lede.fontSize} ${lede.fontFamily}`);
  return { loaded, h1: `${h1.fontFamily.split(',')[0]} ${h1.fontWeight} → ${h1Check ? 'webfont' : 'FALLBACK'}`, lede: `${lede.fontFamily.split(',')[0]} ${lede.fontWeight} → ${ledeCheck ? 'webfont' : 'FALLBACK'}` };
});
console.log('loaded faces:', r.loaded.join(', '));
console.log('h1:', r.h1); console.log('lede:', r.lede);
const el = await p.$('[data-hero] .k-device');
await el.screenshot({ path: '/private/tmp/keres-shots/after-transcript-crop.png' });
await b.close();
