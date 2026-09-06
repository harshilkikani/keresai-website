// Dev-only internal-link checker against dist/. Delete when done.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist');
const files = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(DIST);

const exists = (p) => {
  if (p === '/' ) return existsSync(join(DIST, 'index.html'));
  const clean = p.replace(/[?#].*$/, '').replace(/\/$/, '');
  return (
    existsSync(join(DIST, clean)) ||
    existsSync(join(DIST, clean + '.html')) ||
    existsSync(join(DIST, clean, 'index.html'))
  );
};

const missing = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const rel = f.slice(DIST.length) || '/index.html';
  for (const m of html.matchAll(/href="(\/[^"#][^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('//')) continue;
    if (/\.(png|jpg|jpeg|webp|svg|css|js|xml|txt|ico|mp4|woff2?)$/i.test(href)) continue;
    if (!exists(href)) {
      if (!missing.has(href)) missing.set(href, new Set());
      missing.get(href).add(rel);
    }
  }
}

if (!missing.size) { console.log('No broken internal links.'); }
else {
  console.log(`${missing.size} broken internal link target(s):\n`);
  for (const [href, from] of [...missing].sort()) {
    const list = [...from].slice(0, 4).join(', ');
    console.log(`  ${href.padEnd(38)} ← ${from.size} page(s): ${list}${from.size > 4 ? ', …' : ''}`);
  }
}
