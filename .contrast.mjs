// Dev-only contrast probe. Reports low-contrast text with a CSS path.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4321';
const paths = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  for (const p of paths) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    const bad = await page.evaluate(() => {
      const lum = (c) => { const [r,g,b]=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; };
      const parse = (s) => (s.match(/[\d.]+/g)||[]).slice(0,3).map(Number);
      const bgOf = (el) => { let n=el; while(n){const c=getComputedStyle(n).backgroundColor; if(c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return parse(c); n=n.parentElement;} return [255,255,255]; };
      const path = (el) => { const bits=[]; let n=el; while(n && n.tagName!=='BODY' && bits.length<3){bits.unshift(n.tagName.toLowerCase()+(n.className&&typeof n.className==='string'?'.'+n.className.trim().split(/\s+/).slice(0,2).join('.'):'')); n=n.parentElement;} return bits.join(' > '); };
      const out=[];
      for (const el of document.querySelectorAll('body *')) {
        if (!el.childNodes.length) continue;
        const hasText=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1);
        if(!hasText) continue;
        const cs=getComputedStyle(el);
        if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0) continue;
        const r=el.getBoundingClientRect(); if(!r.width||!r.height) continue;
        const fg=parse(cs.color), bg=bgOf(el);
        const L1=lum(fg),L2=lum(bg);
        const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
        const size=parseFloat(cs.fontSize), bold=+cs.fontWeight>=700;
        const large = size>=24 || (size>=18.66 && bold);
        const floor = large?3:4.5;
        if(ratio<floor) out.push({p:path(el),ratio:ratio.toFixed(2),fg:cs.color,bg:`rgb(${bg.join(', ')})`,t:el.textContent.trim().slice(0,40)});
      }
      const seen=new Set();
      return out.filter(o=>{const k=o.p+o.ratio; if(seen.has(k))return false; seen.add(k); return true;}).slice(0,10);
    });
    if (bad.length) {
      console.log(`\n### ${p} [${scheme}] — ${bad.length} low-contrast`);
      bad.forEach(b=>console.log(`  ${b.ratio}  ${b.p}\n        fg ${b.fg} on ${b.bg} — "${b.t}"`));
    } else {
      console.log(`OK ${p} [${scheme}]`);
    }
  }
  await ctx.close();
}
await browser.close();
