import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const failed = [];
page.on('response', r => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
});
await page.waitForTimeout(1200);
const imgs = await page.evaluate(() =>
  [...document.images].map(i => `${i.currentSrc.split('/').pop()} natural=${i.naturalWidth}x${i.naturalHeight} complete=${i.complete}`));
console.log('IMAGES:\n' + imgs.join('\n'));
console.log('FAILED REQUESTS:\n' + (failed.join('\n') || '(none)'));
await browser.close();
