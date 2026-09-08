#!/usr/bin/env node
// Drive the built keresai.com site with headless Chromium via Playwright.
//
//   node .claude/skills/run-keresai-website/driver.mjs <command> [args]
//
// Every command runs against a server (default http://localhost:4321,
// override with BASE=...). Start one with `serve`, stop it with `stop`.
// Screenshots land in OUT (default /tmp/keres-shots).
//
// Commands (see SKILL.md for the ones you will actually use):
//   serve [--gzip] [--port N]   start astro preview (or a gzip static server) on dist/
//   stop  [port]                kill whatever is listening on the port (default 4321)
//   shot <label> <path...>      fold @2x + scrolled tiles @1x, at 390 and 1440
//   stitch <label> <slug> <vp>  join tiles into one tall PNG (needs ffmpeg)
//   console [path...]           console errors / CSP violations / motion + router state
//   scroll                      scroll the homepage; report what the motion system did
//   fold <path...>              is the primary CTA above the fold at 1440/1280/390?
//   links                       every internal href in dist/ resolves to a file
//   contrast <path...>          low-contrast text with CSS paths (light + dark)
//   weight <path...>            bytes per page by resource type, plus failed requests
//   lh <path...> [--port N]     Lighthouse mobile summary (needs network for npx)
//   dark <path> [id]            dark-mode screenshot, optionally scrolled to #id
//   fonts [path]                which faces loaded; is the h1/lede a webfont or fallback?
//   sections [path]             top + height of every main section at 390 and 1440
//   region <label> <path> <id..> screenshot just those #ids at 390 and 1440
//   compare <a.png> <b.png> <out>  before | after side by side (ffmpeg)
// COLOR=dark makes shot/console/sections render the dark theme (files get a -dark suffix).
//
// Agent tooling, not product code: it is allowed to be plain.

import { chromium } from 'playwright';
import { spawn, execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, openSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:4321';
const OUT = process.env.OUT || '/tmp/keres-shots';
// COLOR=dark renders every capture in the dark theme and suffixes filenames.
const SCHEME = process.env.COLOR === 'dark' ? 'dark' : 'light';
const SUF = SCHEME === 'dark' ? '-dark' : '';
// fileURLToPath, not URL.pathname: this repo's folder has a space in its
// name, and .pathname leaves it percent-encoded (%20), so every fs call
// under ROOT would miss.
const ROOT = fileURLToPath(new URL('../../..', import.meta.url));
mkdirSync(OUT, { recursive: true });

const [cmd, ...rest] = process.argv.slice(2);
const flag = (name) => { const i = rest.indexOf(name); if (i === -1) return null; const v = rest[i + 1]; rest.splice(i, 2); return v ?? true; };
const has = (name) => { const i = rest.indexOf(name); if (i === -1) return false; rest.splice(i, 1); return true; };
const slugOf = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-'));

const VIEWPORTS = [
  { name: '390', width: 390, height: 844, mobile: true },
  { name: '1440', width: 1440, height: 900, mobile: false },
];

// System Chrome first (what this repo has been driven with); the bundled
// headless shell second, for machines without Chrome after
// `npx playwright install chromium-headless-shell`.
async function launch() {
  try { return await chromium.launch({ channel: 'chrome' }); }
  catch { return await chromium.launch(); }
}

async function waitFor(url, ms = 30000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    try { const r = await fetch(url); if (r.ok) return true; } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

const commands = {
  // ── servers ─────────────────────────────────────────────────
  async serve() {
    const gzip = has('--gzip');
    const port = Number(flag('--port') || (gzip ? 4322 : 4321));
    if (!existsSync(join(ROOT, 'dist', 'index.html'))) {
      console.error('dist/index.html missing — run `npm run build` first.');
      process.exit(1);
    }
    const log = openSync(`/tmp/keres-${gzip ? 'gzip' : 'preview'}.log`, 'a');
    const child = gzip
      ? spawn('npx', ['--yes', 'serve', 'dist', '-l', String(port)], { cwd: ROOT, detached: true, stdio: ['ignore', log, log] })
      : spawn('npx', ['astro', 'preview', '--port', String(port)], { cwd: ROOT, detached: true, stdio: ['ignore', log, log] });
    child.unref();
    const url = `http://localhost:${port}/`;
    const ok = await waitFor(url);
    if (!ok) { console.error(`server did not answer on ${url} within 30s — see /tmp/keres-*.log`); process.exit(1); }
    console.log(`${gzip ? 'gzip static server' : 'astro preview'} up at ${url} (pid ${child.pid})`);
  },

  async stop() {
    const port = rest[0] || '4321';
    let pids = '';
    try { pids = execSync(`lsof -ti:${port} -sTCP:LISTEN`).toString().trim(); } catch {}
    if (!pids) { console.log(`nothing listening on ${port}`); return; }
    for (const pid of pids.split('\n')) { try { process.kill(Number(pid)); } catch {} }
    console.log(`stopped ${pids.split('\n').join(', ')} on ${port}`);
  },

  // ── screenshots ─────────────────────────────────────────────
  async shot() {
    const [label, ...paths] = rest;
    if (!label || !paths.length) { console.error('usage: shot <label> <path...>'); process.exit(1); }
    const browser = await launch();
    for (const vp of VIEWPORTS) {
      for (const dsf of [2, 1]) {
        const ctx = await browser.newContext({
          viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: dsf,
          isMobile: vp.mobile, hasTouch: vp.mobile, colorScheme: SCHEME,
        });
        const page = await ctx.newPage();
        for (const p of paths) {
          const slug = slugOf(p) + SUF;
          const res = await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 30000 });
          if (!res || res.status() >= 400) { console.log(`FAIL ${BASE + p} → ${res ? res.status() : 'no response'}`); continue; }
          // The hero orchestration runs ~2.2s; let it settle before the fold shot.
          await page.waitForTimeout(2600);
          if (dsf === 2) {
            await page.screenshot({ path: `${OUT}/${label}-${slug}-${vp.name}-fold.png` });
            const h = await page.evaluate(() => document.documentElement.scrollHeight);
            console.log(`OK   ${BASE + p} @${vp.name}  height=${h}px  → ${OUT}/${label}-${slug}-${vp.name}-fold.png`);
            continue;
          }
          // Full-page captures taller than ~16k device px silently wrap in
          // Chrome, so walk the page a viewport at a time instead.
          await page.evaluate(async () => {
            for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
          });
          await page.waitForTimeout(600);
          const total = await page.evaluate(() => document.documentElement.scrollHeight);
          let i = 0;
          for (let y = 0; y < total; y += vp.height, i++) {
            await page.evaluate((yy) => window.scrollTo(0, yy), y);
            await page.waitForTimeout(120);
            await page.screenshot({ path: `${OUT}/${label}-${slug}-${vp.name}-${String(i).padStart(2, '0')}.png` });
          }
          console.log(`     ${slug} @${vp.name}  ${i} tiles → ${OUT}/${label}-${slug}-${vp.name}-NN.png`);
        }
        await ctx.close();
      }
    }
    await browser.close();
  },

  async stitch() {
    const [label, slug, vp] = rest;
    if (!label || !slug || !vp) { console.error('usage: stitch <label> <slug> <390|1440>'); process.exit(1); }
    const n = readdirSync(OUT).filter((f) => new RegExp(`^${label}-${slug}-${vp}-\\d\\d\\.png$`).test(f)).length;
    if (!n) { console.error('no tiles found — run shot first'); process.exit(1); }
    const out = `${OUT}/${label}-${slug}-${vp}-fullpage.png`;
    execSync(`ffmpeg -v error -f image2 -i "${OUT}/${label}-${slug}-${vp}-%02d.png" -filter_complex "tile=1x${n}" -frames:v 1 -y "${out}"`);
    console.log(`${n} tiles → ${out}`);
  },

  async dark() {
    const [p = '/', id] = rest;
    const browser = await launch();
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark', deviceScaleFactor: 1 })).newPage();
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2600);
    if (id) {
      await page.evaluate((i) => { const el = document.getElementById(i); if (el) window.scrollTo(0, el.offsetTop - 40); }, id);
      await page.waitForTimeout(1200);
    }
    const file = `${OUT}/dark-${slugOf(p)}${id ? '-' + id : ''}.png`;
    await page.screenshot({ path: file });
    console.log(`→ ${file}`);
    await browser.close();
  },

  // ── probes ──────────────────────────────────────────────────
  async console() {
    const paths = rest.length ? rest : ['/'];
    const browser = await launch();
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.mobile, hasTouch: vp.mobile, colorScheme: SCHEME });
      const page = await ctx.newPage();
      const logs = [];
      page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`${m.type()}: ${m.text().slice(0, 160)}`); });
      page.on('pageerror', (e) => logs.push(`pageerror: ${String(e).slice(0, 160)}`));
      for (const p of paths) {
        await page.goto(BASE + p, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2600);
        const state = await page.evaluate(() => ({
          motion: document.documentElement.hasAttribute('data-motion'),
          heroLive: !!document.querySelector('[data-hero].is-live'),
          router: !!document.querySelector('script[src*="_astro"]'),
          counts: [...document.querySelectorAll('[data-count]')].map((e) => e.textContent.trim()).join(' | '),
          tiltTargets: document.querySelectorAll('[data-tilt]').length,
          overflowX: document.documentElement.scrollWidth > window.innerWidth,
        }));
        console.log(`--- ${p} @${vp.width} ---`);
        console.log('state:', JSON.stringify(state));
      }
      // Client-side navigation keeps the nav (transition:persist)? Desktop only —
      // the Pricing link is inside the hamburger at 390.
      if (!vp.mobile) {
        await page.goto(BASE + '/', { waitUntil: 'networkidle' });
        await page.click('a[href="/pricing"]');
        await page.waitForURL('**/pricing', { timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(600);
        const after = await page.evaluate(() => ({ url: location.pathname, navPresent: !!document.querySelector('.nav'), themeBtn: !!document.getElementById('theme-toggle'), planCards: document.querySelectorAll('.plan-card').length }));
        console.log('after client-side nav:', JSON.stringify(after));
      }
      const real = logs.filter((l) => !/goatcounter/.test(l)); // GoatCounter warns on localhost by design
      console.log(real.length ? 'CONSOLE:\n  ' + real.join('\n  ') : 'console: clean');
      await ctx.close();
    }
    await browser.close();
  },

  async scroll() {
    const browser = await launch();
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.mobile, hasTouch: vp.mobile, colorScheme: 'light' });
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
      await page.goto(BASE + '/', { waitUntil: 'networkidle' });
      const seen = new Set();
      const total = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < total; y += Math.round(vp.height * 0.55)) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(140);
        const act = await page.evaluate(() => document.querySelector('[data-pipeline]')?.getAttribute('data-active'));
        if (act != null) seen.add(act);
      }
      await page.waitForTimeout(600);
      const r = await page.evaluate(() => ({
        reveals: document.querySelectorAll('[data-reveal]').length,
        revealed: document.querySelectorAll('[data-reveal].is-in').length,
        stagesActive: document.querySelectorAll('.pipe__stage.is-active').length,
        connectorDashoffset: document.querySelector('[data-draw]')?.style.strokeDashoffset,
        briefIn: !!document.querySelector('.sms--brief.is-in'),
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
      }));
      console.log(`--- ${vp.width}x${vp.height} ---`);
      console.log('pipeline data-active seen:', [...seen].join(' → '));
      console.log(JSON.stringify(r));
      console.log(errs.length ? 'PAGE ERRORS: ' + errs.join(' | ') : 'no page errors');
      await ctx.close();
    }
    await browser.close();
  },

  async fold() {
    const paths = rest.length ? rest : ['/'];
    const browser = await launch();
    for (const vp of [{ w: 1440, h: 900 }, { w: 1280, h: 800 }, { w: 390, h: 844 }]) {
      const page = await (await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: 'light' })).newPage();
      for (const p of paths) {
        await page.goto(BASE + p, { waitUntil: 'networkidle' });
        const r = await page.evaluate(() => {
          const cta = document.querySelector('.k-hero__ctas .btn-k--primary, .lp-hero__ctas .btn-k--primary, .price-hero-ctas .btn-k--primary');
          if (!cta) return null;
          const b = cta.getBoundingClientRect();
          return { top: Math.round(b.top), bottom: Math.round(b.bottom) };
        });
        const tag = `${vp.w}x${vp.h}`.padEnd(9) + ' ' + p.padEnd(24);
        if (!r) { console.log(`${tag} no primary CTA found`); continue; }
        console.log(`${tag} CTA ${String(r.top).padStart(4)}–${String(r.bottom).padStart(4)}  ${r.bottom <= vp.h ? 'ABOVE FOLD ✓' : 'BELOW FOLD ✗'}`);
      }
    }
    await browser.close();
  },

  async links() {
    const DIST = join(ROOT, 'dist');
    const files = [];
    (function walk(d) { for (const e of readdirSync(d)) { const p = join(d, e); if (statSync(p).isDirectory()) walk(p); else if (p.endsWith('.html')) files.push(p); } })(DIST);
    const exists = (p) => {
      if (p === '/') return existsSync(join(DIST, 'index.html'));
      const clean = p.replace(/[?#].*$/, '').replace(/\/$/, '');
      return existsSync(join(DIST, clean)) || existsSync(join(DIST, clean + '.html')) || existsSync(join(DIST, clean, 'index.html'));
    };
    const missing = new Map();
    for (const f of files) {
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/href="(\/[^"#][^"]*)"/g)) {
        const href = m[1];
        if (href.startsWith('//') || /\.(png|jpg|jpeg|webp|svg|css|js|xml|txt|ico|mp4|woff2?)$/i.test(href)) continue;
        if (!exists(href)) { if (!missing.has(href)) missing.set(href, new Set()); missing.get(href).add(f.slice(DIST.length)); }
      }
    }
    if (!missing.size) { console.log(`No broken internal links across ${files.length} pages.`); return; }
    console.log(`${missing.size} broken internal link target(s):`);
    for (const [href, from] of [...missing].sort()) console.log(`  ${href.padEnd(38)} ← ${from.size} page(s): ${[...from].slice(0, 4).join(', ')}`);
    process.exitCode = 1;
  },

  async contrast() {
    const paths = rest.length ? rest : ['/'];
    const browser = await launch();
    for (const scheme of ['light', 'dark']) {
      const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme })).newPage();
      for (const p of paths) {
        await page.goto(BASE + p, { waitUntil: 'networkidle' });
        const bad = await page.evaluate(() => {
          const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
          const parse = (s) => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
          const bgOf = (el) => { let n = el; while (n) { const c = getComputedStyle(n).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return parse(c); n = n.parentElement; } return [255, 255, 255]; };
          const path = (el) => { const bits = []; let n = el; while (n && n.tagName !== 'BODY' && bits.length < 3) { bits.unshift(n.tagName.toLowerCase() + (typeof n.className === 'string' && n.className ? '.' + n.className.trim().split(/\s+/).slice(0, 2).join('.') : '')); n = n.parentElement; } return bits.join(' > '); };
          const out = [];
          for (const el of document.querySelectorAll('body *')) {
            if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
            const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
            const fg = parse(cs.color), bg = bgOf(el);
            const L1 = lum(fg), L2 = lum(bg);
            const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
            const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
            const floor = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
            if (ratio < floor) out.push({ p: path(el), ratio: ratio.toFixed(2), t: el.textContent.trim().slice(0, 40) });
          }
          const seen = new Set();
          return out.filter((o) => { const k = o.p + o.ratio; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 12);
        });
        if (!bad.length) { console.log(`OK ${p} [${scheme}]`); continue; }
        console.log(`### ${p} [${scheme}] — ${bad.length} low-contrast (alpha backgrounds are read as opaque; confirm with Lighthouse)`);
        bad.forEach((b) => console.log(`  ${b.ratio}  ${b.p}  "${b.t}"`));
      }
    }
    await browser.close();
  },

  async weight() {
    const paths = rest.length ? rest : ['/'];
    const browser = await launch();
    for (const p of paths) {
      const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
      let bytes = 0; const failed = []; const byType = {};
      page.on('response', async (r) => {
        if (r.status() >= 400) { failed.push(`${r.status()} ${r.url()}`); return; }
        try { const buf = await r.body(); bytes += buf.length; const t = r.request().resourceType() || 'other'; byType[t] = (byType[t] || 0) + buf.length; } catch {}
      });
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
      await page.waitForTimeout(700);
      const kb = (n) => (n / 1024).toFixed(0) + 'KB';
      console.log(`${p.padEnd(28)} ${kb(bytes).padStart(8)}  [${Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${kb(v)}`).join(', ')}]`);
      if (failed.length) console.log('   FAILED: ' + failed.join('\n           '));
    }
    await browser.close();
  },

  async lh() {
    const port = flag('--port');
    const base = port ? `http://localhost:${port}` : BASE;
    const paths = rest.length ? rest : ['/'];
    for (const p of paths) {
      const file = `${OUT}/lh-${slugOf(p)}.json`;
      execSync(`npx --yes lighthouse "${base}${p}" --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --quiet --chrome-flags="--headless=new" --output=json --output-path="${file}"`, { stdio: 'ignore' });
      const r = JSON.parse(readFileSync(file, 'utf8'));
      const c = r.categories, a = r.audits;
      const pct = (x) => (x == null ? '--' : String(Math.round(x * 100))).padStart(3);
      console.log(p.padEnd(24), 'perf', pct(c.performance?.score), '| a11y', pct(c.accessibility?.score), '| bp', pct(c['best-practices']?.score), '| seo', pct(c.seo?.score),
        '| FCP', a['first-contentful-paint'].displayValue.padStart(6), '| LCP', a['largest-contentful-paint'].displayValue.padStart(6), '| TBT', a['total-blocking-time'].displayValue.padStart(6), '| CLS', a['cumulative-layout-shift'].displayValue.padStart(5));
      console.log('   LCP element:', (a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet || '?').slice(0, 70));
      const fails = (c.accessibility?.auditRefs || []).map((k) => a[k.id]).filter((x) => x && x.score !== null && x.score < 1).map((x) => x.id);
      if (fails.length) console.log('   a11y failing:', fails.join(', '));
      for (const k of c.performance.auditRefs) { const x = a[k.id]; if (x?.details?.overallSavingsMs > 60) console.log('   opportunity:', k.id, '~' + Math.round(x.details.overallSavingsMs) + 'ms'); }
      console.log('   json →', file);
    }
  },

  async sections() {
    const p = rest[0] || '/';
    const browser = await launch();
    for (const vp of VIEWPORTS) {
      const page = await (await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.mobile, hasTouch: vp.mobile, colorScheme: SCHEME })).newPage();
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 900) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(400);
      const rows = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll('main > section, main > div.k-section, footer')) {
          const r = el.getBoundingClientRect();
          const label = el.id || (el.getAttribute('aria-labelledby') ? (document.getElementById(el.getAttribute('aria-labelledby'))?.textContent || '').trim().slice(0, 34) : el.tagName.toLowerCase());
          out.push({ label, top: Math.round(r.top + scrollY), h: Math.round(r.height) });
        }
        return { rows: out, total: document.documentElement.scrollHeight };
      });
      console.log(`--- ${p} @${vp.width}  total ${rows.total}px ---`);
      for (const r of rows.rows) console.log(`  ${String(r.top).padStart(6)}  ${String(r.h).padStart(5)}px  ${r.label}`);
      await page.context().close();
    }
    await browser.close();
  },

  async region() {
    // Screenshot one element (by id) at 390 and 1440 — the affected region of
    // a change, without re-walking the whole page.
    const [label, p, ...ids] = rest;
    if (!label || !p || !ids.length) { console.error('usage: region <label> <path> <id...>'); process.exit(1); }
    const browser = await launch();
    for (const vp of VIEWPORTS) {
      const page = await (await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.mobile, hasTouch: vp.mobile, colorScheme: SCHEME, deviceScaleFactor: 1 })).newPage();
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 900) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(2600);
      // The fixed nav and sticky bar would be stitched into any crop taller
      // than the viewport; hide them for region captures.
      await page.addStyleTag({ content: '.nav, .sticky-bar { visibility: hidden !important; }' });
      for (const id of ids) {
        const el = page.locator(`#${id}`).first();
        if (!(await el.count())) { console.log(`MISSING #${id} @${vp.width}`); continue; }
        await el.scrollIntoViewIfNeeded();
        // Reveal staggers run up to ~900ms (4 children × 90ms + 500ms); wait them out.
        await page.waitForTimeout(1400);
        const h = Math.round((await el.boundingBox())?.height || 0);
        const file = `${OUT}/${label}-${slugOf(p)}-${id}-${vp.name}${SUF}.png`;
        await el.screenshot({ path: file });
        console.log(`  #${id.padEnd(12)} @${vp.name}  ${String(h).padStart(5)}px  → ${file}`);
      }
      await page.context().close();
    }
    await browser.close();
  },

  async compare() {
    // Side-by-side before/after: pads both to the taller height, then hstacks.
    const [a, b, out] = rest;
    if (!a || !b || !out) { console.error('usage: compare <before.png> <after.png> <out.png>'); process.exit(1); }
    const dim = (f) => execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "${f}"`).toString().trim().split(',').map(Number);
    const [aw, ah] = dim(a), [bw, bh] = dim(b);
    const H = Math.max(ah, bh);
    execSync(`ffmpeg -v error -i "${a}" -i "${b}" -filter_complex "[0:v]pad=${aw + 24}:${H}:0:0:color=#8a8a8a[l];[1:v]pad=${bw}:${H}:0:0:color=#8a8a8a[r];[l][r]hstack=inputs=2" -y "${out}"`);
    console.log(`${aw}x${ah} | ${bw}x${bh} → ${out}`);
  },

  async fonts() {
    const p = rest[0] || '/';
    const browser = await launch();
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2600);
    const r = await page.evaluate(async () => {
      await document.fonts.ready;
      const loaded = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`);
      const probe = (sel) => { const el = document.querySelector(sel); if (!el) return 'n/a'; const cs = getComputedStyle(el); return `${cs.fontFamily.split(',')[0]} ${cs.fontWeight} → ${document.fonts.check(`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`) ? 'webfont' : 'FALLBACK'}`; };
      return { loaded, h1: probe('h1'), lede: probe('.k-lede') };
    });
    console.log('loaded:', r.loaded.join(', '));
    console.log('h1:   ', r.h1);
    console.log('lede: ', r.lede);
    await browser.close();
  },
};

if (!cmd || !commands[cmd]) {
  console.error(`usage: driver.mjs <${Object.keys(commands).join('|')}> [args]\n` + readFileSync(new URL(import.meta.url)).toString().split('\n').slice(1, 22).join('\n'));
  process.exit(1);
}
await commands[cmd]();
