// Dev-only: where does the primary CTA sit relative to the fold?
import { chromium } from 'playwright';
const BASE='http://localhost:4321';
const paths=process.argv.slice(2);
const b=await chromium.launch({channel:'chrome'});
for (const vp of [{w:1440,h:900,n:'1440x900'},{w:1280,h:800,n:'1280x800'},{w:390,h:844,n:'390x844'}]) {
  const c=await b.newContext({viewport:{width:vp.w,height:vp.h},colorScheme:'light'});
  const p=await c.newPage();
  for (const path of paths) {
    await p.goto(BASE+path,{waitUntil:'networkidle'});
    const r=await p.evaluate(()=>{
      const cta=document.querySelector('.k-hero__ctas .btn-k--primary, .lp-hero__ctas .btn-k--primary, .price-hero-ctas .btn-k--primary');
      if(!cta) return null;
      const b=cta.getBoundingClientRect();
      const h1=document.querySelector('h1');
      return {ctaTop:Math.round(b.top),ctaBottom:Math.round(b.bottom),h1Lines:h1?Math.round(h1.getBoundingClientRect().height/parseFloat(getComputedStyle(h1).lineHeight)):0,h1H:Math.round(h1?.getBoundingClientRect().height||0)};
    });
    if(!r){console.log(`${vp.n} ${path}: no primary CTA found`);continue;}
    const ok=r.ctaBottom<=vp.h;
    console.log(`${vp.n.padEnd(9)} ${path.padEnd(24)} h1 ${String(r.h1H).padStart(4)}px/${r.h1Lines}ln  CTA ${String(r.ctaTop).padStart(4)}–${String(r.ctaBottom).padStart(4)}  ${ok?'ABOVE FOLD ✓':'BELOW FOLD ✗'}`);
  }
  await c.close();
}
await b.close();
