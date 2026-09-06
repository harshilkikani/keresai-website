// Dev-only DOM probe. Delete when done.
import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const info = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const box = (s) => {
    const el = q(s);
    if (!el) return `${s}: MISSING`;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return `${s}: x=${r.x.toFixed(0)} w=${r.width.toFixed(0)} right=${r.right.toFixed(0)} display=${cs.display}`;
  };
  const out = [
    `viewport=${innerWidth}`,
    box('.nav-inner'),
    `nav-inner cols=${getComputedStyle(q('.nav-inner')).gridTemplateColumns} gap=${getComputedStyle(q('.nav-inner')).gap}`,
    box('.nav-inner > .logo'),
    box('.nav-actions'),
    box('#theme-toggle'),
    box('.nav-phone'),
    box('.hamburger'),
  ];
  // Anything overflowing the viewport horizontally
  const over = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > innerWidth + 1) {
      over.push(`${el.tagName}.${(el.className || '').toString().slice(0, 40)} right=${r.right.toFixed(0)}`);
    }
  });
  out.push('--- overflowing right edge ---', ...over.slice(0, 12));
  return out.join('\n');
});
console.log(info);
await browser.close();
