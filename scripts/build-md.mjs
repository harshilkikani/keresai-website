// Markdown twins of every indexable page, for AI agents and LLM fetchers
// (the llms.txt convention: the page's URL + ".md").
//
//   /                      -> dist/index.md
//   /pricing               -> dist/pricing.md
//   /guides/x.html         -> dist/guides/x.md
//
// Runs after `astro build` via the npm `postbuild` hook. The URL list is the
// built sitemap (dist/sitemap-0.xml…), which already excludes noindex pages
// and redirect stubs (src/seo/indexing.mjs), so this never publishes a twin
// the sitemap would not advertise. Layout.astro links each indexable page to
// its twin with <link rel="alternate" type="text/markdown">.
//
// Dependency-free on purpose: a small HTML tokenizer + tree builder and a
// Markdown serializer for the subset of HTML this site emits (headings,
// paragraphs, lists, tables incl. ARIA role tables, links, emphasis, FAQ
// <details>). Only <main> is converted, minus breadcrumbs, scripts, forms,
// CTA buttons and bands, aria-hidden decorations and the illustrative UI mocks.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://www.keresai.com';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

// ── HTML parsing ──────────────────────────────────────────────────────────
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', minus: '−',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', middot: '·', bull: '•', rarr: '→',
  larr: '←', times: '×', copy: '©', reg: '®', trade: '™', deg: '°', frac12: '½', eacute: 'é',
  aacute: 'á', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ', uuml: 'ü', iexcl: '¡', iquest: '¿',
  check: '✓', le: '≤', ge: '≥', asymp: '≈', plusmn: '±', thinsp: ' ', ensp: ' ', emsp: ' ', zwj: '', zwnj: '',
};
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e) => {
  if (e[0] === '#') {
    const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
    return Number.isFinite(n) ? String.fromCodePoint(n) : m;
  }
  return ENTITIES[e] ?? ENTITIES[e.toLowerCase()] ?? m;
});

function parseAttrs(src) {
  const attrs = {};
  const re = /([^\s"'>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m;
  while ((m = re.exec(src))) attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  return attrs;
}

/** Tolerant HTML -> tree: { tag, attrs, children } elements and { text } nodes. */
function parse(html) {
  const doc = { tag: '#root', attrs: {}, children: [] };
  const stack = [doc];
  const top = () => stack[stack.length - 1];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { top().children.push({ text: decode(html.slice(i)) }); break; }
    if (lt > i) top().children.push({ text: decode(html.slice(i, lt)) });
    if (html.startsWith('<!--', lt)) { const e = html.indexOf('-->', lt + 4); i = e === -1 ? html.length : e + 3; continue; }
    if (html[lt + 1] === '!' || html[lt + 1] === '?') { const e = html.indexOf('>', lt); i = e === -1 ? html.length : e + 1; continue; }
    const m = /^<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/.exec(html.slice(lt, lt + 4000));
    if (!m) { top().children.push({ text: '<' }); i = lt + 1; continue; }
    i = lt + m[0].length;
    const tag = m[2].toLowerCase();
    if (m[1]) {
      // End tag: pop to the matching open element; ignore strays.
      for (let k = stack.length - 1; k > 0; k--) if (stack[k].tag === tag) { stack.length = k; break; }
      continue;
    }
    const selfClose = /\/\s*$/.test(m[3]);
    const el = { tag, attrs: parseAttrs(m[3].replace(/\/\s*$/, '')), children: [] };
    // Implied end tags for the few elements that need it.
    if (tag === 'li' || tag === 'dt' || tag === 'dd' || tag === 'tr' || tag === 'td' || tag === 'th' || tag === 'p') {
      const closes = { li: ['li'], dt: ['dt', 'dd'], dd: ['dt', 'dd'], tr: ['tr', 'td', 'th'], td: ['td', 'th'], th: ['td', 'th'], p: ['p'] }[tag];
      if (closes.includes(top().tag)) stack.pop();
    }
    top().children.push(el);
    if (RAW.has(tag)) {
      const end = html.toLowerCase().indexOf(`</${tag}`, i);
      const stop = end === -1 ? html.length : end;
      el.children.push({ text: tag === 'textarea' || tag === 'title' ? decode(html.slice(i, stop)) : html.slice(i, stop) });
      const gt = html.indexOf('>', stop);
      i = gt === -1 ? html.length : gt + 1;
      continue;
    }
    if (!VOID.has(tag) && !selfClose) stack.push(el);
  }
  return doc;
}

// ── What to leave out ─────────────────────────────────────────────────────
const DROP_TAGS = new Set(['script', 'style', 'noscript', 'template', 'svg', 'form', 'button', 'input', 'select', 'textarea', 'label', 'iframe', 'video', 'audio', 'canvas', 'nav', 'dialog', 'img', 'picture', 'object']);
// Illustrative product mocks (phone frames, call transcripts, listings,
// daily-brief texts), CTA buttons and bands, eyebrow labels, widgets.
const DROP_CLASSES = new Set([
  'k-device', 'ph', 'k-mock', 'k-amock', 'amock', 'listing', 'site', 'shift', 'sms', 'k-hero__mock', 'roster__mock',
  'k-call-fig', 'k-site-fig', 'k-brief-fig', 'k-listing-fig', 'shift-fig',
  'btn', 'btn-k', 'hero-ctas', 'price-hero-ctas', 'k-hero__ctas', 'cta-band', 'lead-band', 'book', 'roi-shell', 'qf',
  'k-eyebrow', 'eyebrow', 'skip-link', 'sr-only', 'num', 'inline-cta-link', 'k-hero__light',
]);
const classes = (el) => (el.attrs?.class ?? '').split(/\s+/).filter(Boolean);
function dropped(el) {
  if (!el.tag) return false;
  if (DROP_TAGS.has(el.tag)) return true;
  if (el.attrs['aria-hidden'] === 'true' || 'hidden' in el.attrs) return true;
  if (el.attrs.role === 'presentation' || el.attrs.role === 'img') return true;
  const cl = classes(el);
  if (cl.some((c) => DROP_CLASSES.has(c))) return true;
  // The lead-capture band is <div class="lead">; p.lead is lede text and stays.
  if (el.tag !== 'p' && cl.includes('lead')) return true;
  // A section label that is not a heading is a decorative kicker.
  if (!/^h[1-6]$/.test(el.tag) && cl.includes('section-label')) return true;
  return false;
}

// ── Markdown serialisation ────────────────────────────────────────────────
const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'dt', 'dd', 'fieldset', 'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li', 'main', 'ol', 'p', 'pre', 'section', 'summary', 'table', 'ul', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot']);
const isBlock = (n) => n.tag && (BLOCK.has(n.tag) || ['table', 'row', 'list', 'listitem'].includes(n.attrs.role));
const hasBlockChild = (n) => (n.children ?? []).some((c) => !dropped(c) && (isBlock(c) || (c.tag && hasBlockChild(c))));

let pageUrl = ORIGIN + '/';
function absUrl(href) {
  if (!href) return '';
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith('#')) return pageUrl.replace(/#.*$/, '') + href;
  if (href.startsWith('//')) return 'https:' + href;
  try { return new URL(href, pageUrl).href; } catch { return href; }
}
const escapeText = (s) => s.replace(/([\\`*_[\]])/g, '\\$1').replace(/</g, '\\<');
const squash = (s) => s.replace(/[ \t\r\n\f]+/g, ' ');

/** Inline content of a node's children, as one line of Markdown. */
// Layout spans that sit side by side with no whitespace between them
// (<span>Contract</span><span>Month-to-month</span>) read as separate words.
const SPACED = new Set(['span', 'div', 'small', 'time', 'data', 'label', 'dt', 'dd']);
function inline(nodes) {
  let out = '';
  let prevSpaced = false;
  for (const n of nodes) {
    if (n.text !== undefined) { out += escapeText(squash(n.text)); prevSpaced = false; continue; }
    if (dropped(n)) continue;
    if (SPACED.has(n.tag) && prevSpaced && out && !/\s$/.test(out)) {
      const peek = inline(n.children);
      if (peek && !/^\s/.test(peek)) out += ' ';
    }
    prevSpaced = SPACED.has(n.tag);
    const inner = () => inline(n.children);
    switch (n.tag) {
      case 'br': out += '  \n'; break;
      case 'strong': case 'b': { const t = inner(); out += t.trim() ? wrap(t, '**') : t; break; }
      case 'em': case 'i': case 'cite': { const t = inner(); out += t.trim() ? wrap(t, '*') : t; break; }
      case 'code': case 'kbd': out += '`' + textOf(n).replace(/`/g, "'") + '`'; break;
      case 'a': {
        const t = inner().trim();
        const href = absUrl(n.attrs.href);
        out += t ? (href ? `[${t}](${href})` : t) : '';
        break;
      }
      default: out += inner();
    }
  }
  return out;
}
const wrap = (t, mark) => { const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(t); return `${m[1]}${mark}${m[2]}${mark}${m[3]}`; };
const textOf = (n) => n.text !== undefined ? n.text : dropped(n) ? '' : (n.children ?? []).map(textOf).join('');
const tidy = (s) => s.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim();

/** Render a list of sibling nodes as Markdown blocks (array of strings). */
function blocks(nodes, ctx = { depth: 0 }) {
  const out = [];
  let run = [];
  const flush = () => { const t = tidy(inline(run)); if (t) out.push(t); run = []; };
  for (const n of nodes) {
    if (n.text !== undefined) { run.push(n); continue; }
    if (dropped(n)) {
      // An example call transcript is content, not decoration: keep its turns.
      if (n.tag === 'figure' && classes(n).includes('k-call-fig')) { flush(); out.push(...transcript(n)); }
      continue;
    }
    if (!isBlock(n) && !hasBlockChild(n)) { run.push(n); continue; }
    flush();
    out.push(...block(n, ctx));
  }
  flush();
  return out;
}

function block(n, ctx) {
  const role = n.attrs.role;
  if (n.tag === 'table' || role === 'table') return [table(n)].filter(Boolean);
  const h = /^h([1-6])$/.exec(n.tag);
  if (h) {
    const t = tidy(inline(n.children)).replace(/\n+/g, ' ');
    if (!t) return [];
    // A heading inside a list item or a table cell reads better as bold text.
    return [ctx.depth > 0 ? `**${t}**` : `${'#'.repeat(+h[1])} ${t}`];
  }
  switch (n.tag) {
    case 'p': case 'figcaption': case 'dt': case 'address': {
      const t = tidy(inline(n.children));
      if (!t) return [];
      return [n.tag === 'dt' ? `**${t}**` : t];
    }
    case 'summary': { const t = tidy(inline(n.children)); return t ? [`### ${t}`] : []; }
    case 'hr': return ['---'];
    case 'pre': return ['```\n' + textOf(n).replace(/\n+$/, '') + '\n```'];
    case 'blockquote': return [blocks(n.children, ctx).join('\n\n').split('\n').map((l) => (l ? `> ${l}` : '>')).join('\n')];
    case 'ul': case 'ol': return [list(n, ctx)].filter(Boolean);
    case 'a': {
      // A card link wrapping a heading and text: link the heading, keep the rest.
      const href = absUrl(n.attrs.href);
      const parts = blocks(n.children, ctx);
      const hi = parts.findIndex((p) => /^(#{1,6} |\*\*)/.test(p));
      if (hi >= 0) parts[hi] = parts[hi].startsWith('**')
        ? parts[hi].replace(/^\*\*(.*)\*\*$/, (_, t) => `**[${t}](${href})**`)
        : parts[hi].replace(/^(#{1,6}) (.*)$/, (_, hs, t) => `${hs} [${t}](${href})`);
      else if (parts.length) parts[0] = `[${parts[0]}](${href})`;
      return parts;
    }
    default: return blocks(n.children, ctx);
  }
}

const find = (n, pred) => { if (n.tag && pred(n)) return n; for (const c of n.children ?? []) { const f = c.tag && find(c, pred); if (f) return f; } return null; };
const findAll = (n, pred, acc = []) => { for (const c of n.children ?? []) if (c.tag) { if (pred(c)) acc.push(c); else findAll(c, pred, acc); } return acc; };
const plain = (n) => tidy(escapeText(squash(textOf(n ?? { text: '' }))));
function transcript(fig) {
  const turns = findAll(fig, (c) => classes(c).includes('k-call__turn'));
  if (!turns.length) return [];
  const label = plain(find(fig, (c) => classes(c).includes('k-device__label')));
  const lines = turns.map((t) => `> **${plain(find(t, (c) => classes(c).includes('k-call__who')))}:** ${plain(find(t, (c) => classes(c).includes('k-call__text')))}`);
  return [...(label ? [`*${label}*`] : []), lines.join('\n>\n')];
}

function list(n, ctx) {
  const ordered = n.tag === 'ol';
  let idx = Number(n.attrs.start) || 1;
  const items = [];
  for (const li of n.children) {
    if (!li.tag || dropped(li) || li.tag !== 'li') continue;
    const marker = ordered ? `${idx++}.` : '-';
    const pad = ' '.repeat(marker.length + 1);
    let kids = li.children;
    if (ordered) {
      // Drop a decorative leading counter (<span>01</span>): the list numbers itself.
      const first = kids.findIndex((c) => c.tag || c.text.trim());
      if (first >= 0 && kids[first].tag && /^\s*0?\d{1,2}\.?\s*$/.test(textOf(kids[first]))) kids = kids.filter((_, k) => k !== first);
    }
    const parts = blocks(kids, { depth: ctx.depth + 1 });
    if (!parts.length) continue;
    const body = parts.join('\n\n').split('\n').map((l, k) => (k === 0 ? l : l ? pad + l : l)).join('\n');
    items.push(`${marker} ${body}`);
  }
  return items.join('\n');
}

/** Cells of a row: <td>/<th> or role=cell/columnheader/rowheader children. */
function rowsOf(t) {
  const rows = [];
  const walk = (n) => {
    for (const c of n.children ?? []) {
      if (!c.tag || dropped(c)) continue;
      if (c.tag === 'tr' || c.attrs.role === 'row') rows.push(c);
      else walk(c);
    }
  };
  walk(t);
  return rows.map((r) => {
    const cells = [];
    const walkCells = (n) => {
      for (const c of n.children ?? []) {
        if (!c.tag) continue;
        const isCell = ['td', 'th'].includes(c.tag) || ['cell', 'columnheader', 'rowheader', 'gridcell'].includes(c.attrs.role);
        if (isCell) cells.push({ head: c.tag === 'th' || c.attrs.role === 'columnheader', text: dropped(c) ? '' : cellText(c) });
        else if (!dropped(c)) walkCells(c);
      }
    };
    walkCells(r);
    return cells;
  });
}
const cellText = (c) => blocks(c.children, { depth: 1 }).map((b) => b.replace(/^#{1,6} /, '').replace(/^[-*] /gm, '').replace(/^\d+\. /gm, '')).join('; ').replace(/\s*\n\s*/g, '; ').replace(/\|/g, '\\|').trim();

function table(t) {
  const rows = rowsOf(t).filter((r) => r.length);
  if (!rows.length) return '';
  const width = Math.max(...rows.map((r) => r.length));
  const grid = rows.map((r) => Array.from({ length: width }, (_, k) => r[k]?.text ?? ''));
  const headIdx = rows.findIndex((r) => r.every((c) => c.head));
  const header = headIdx >= 0 ? grid.splice(headIdx, 1)[0] : grid.shift();
  // Drop columns that are empty in every body row (CTA button columns).
  const keep = header.map((_, k) => grid.some((r) => r[k]) || (!grid.length && header[k]));
  const cut = (r) => r.filter((_, k) => keep[k]);
  const head = cut(header);
  if (!head.length) return '';
  const line = (cells) => `| ${cells.map((c) => c || ' ').join(' | ')} |`;
  return [line(head), `| ${head.map(() => '---').join(' | ')} |`, ...grid.map((r) => line(cut(r)))].join('\n');
}

// ── Per page ──────────────────────────────────────────────────────────────
const meta = (html, re) => { const m = re.exec(html); return m ? decode(m[1]).trim() : ''; };

function updatedDate(html, main) {
  const dates = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const doc = JSON.parse(m[1]);
      for (const node of doc['@graph'] ?? [doc]) if (node.dateModified) dates.push(node.dateModified);
    } catch { /* ignore */ }
  }
  if (dates.length) return dates.sort().at(-1).slice(0, 10);
  const t = /Updated\s*<time datetime="([^"]+)"/.exec(main);
  return t ? t[1].slice(0, 10) : '';
}

export function pageToMarkdown(html, url) {
  pageUrl = url;
  const start = html.search(/<main[\s>]/);
  const end = html.lastIndexOf('</main>');
  if (start === -1 || end === -1) return null;
  const main = html.slice(start, end + 7);
  const title = meta(html, /<title>([\s\S]*?)<\/title>/);
  const canonical = meta(html, /<link rel="canonical" href="([^"]+)"/) || url;
  const description = meta(html, /<meta name="description" content="([^"]*)"/);
  const updated = updatedDate(html, main);

  const tree = parse(main);
  const body = blocks(tree.children).join('\n\n').replace(/\n{3,}/g, '\n\n').trim();

  const head = [
    `Title: ${title}`,
    `URL: ${canonical}`,
    ...(updated ? [`Updated: ${updated}`] : []),
    ...(description ? [`Description: ${description}`] : []),
    `Source: ${canonical} (HTML). This is a Markdown copy of the page's main content for AI agents and LLM tools.`,
  ].join('\n');
  return `${head}\n\n---\n\n${body}\n`;
}

/** Sitemap URL -> [html file, md file] under dist. */
export function filesFor(url) {
  const path = url.slice(ORIGIN.length) || '/';
  if (path === '/') return ['index.html', 'index.md'];
  const bare = path.replace(/^\//, '').replace(/\.html$/, '');
  return [`${bare}.html`, `${bare}.md`];
}

/** Path of the Markdown twin for a site path, e.g. /pricing -> /pricing.md. */
export const mdPath = (path) => (path === '/' ? '/index.md' : path.replace(/\.html$/, '') + '.md');

function main() {
  const maps = readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  if (!maps.length) throw new Error('build-md: no dist/sitemap-*.xml; run astro build first');
  const urls = maps.flatMap((f) => [...readFileSync(join(dist, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  let written = 0;
  const problems = [];
  for (const url of urls) {
    const [htmlFile, mdFile] = filesFor(url);
    const src = join(dist, htmlFile);
    if (!existsSync(src)) { problems.push(`missing ${htmlFile} for ${url}`); continue; }
    const html = readFileSync(src, 'utf8');
    // Belt and braces: never publish a twin of a noindex page or a redirect stub.
    if (/<meta name="robots" content="noindex/i.test(html) || /<meta http-equiv="refresh"/i.test(html)) { problems.push(`skipped non-indexable ${url}`); continue; }
    const md = pageToMarkdown(html, url);
    if (!md) { problems.push(`no <main> in ${htmlFile}`); continue; }
    writeFileSync(join(dist, mdFile), md);
    written++;
  }
  console.log(`build-md: wrote ${written} Markdown twins from ${urls.length} sitemap URLs`);
  for (const p of problems) console.warn(`build-md: ${p}`);
  if (problems.some((p) => p.startsWith('missing') || p.startsWith('no <main>'))) process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
