// When each page last changed, from git. One map, read by the sitemap
// (astro.config.mjs → <lastmod>) and by Layout.astro (the visible
// "Last updated" line and the WebPage dateModified), so the two can never
// disagree.
//
// A page's date is the last commit that touched the file its content lives
// in: the page file for a hand-written page, the data file for a data-driven
// route (every /glossary/* page is src/data/glossary.ts, and so on). Template
// and schema edits to a route file do not move the date of every page it
// builds. Falls back to the build date when git history is unavailable (a
// shallow clone: CI must check out with fetch-depth 0) or a file has
// uncommitted changes.
// Plain .mjs so astro.config.mjs can import it without a TS loader.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

/** YYYY-MM-DD of this build (local time of the build machine). */
export const BUILD_DATE = (() => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
})();

let dates = null;
const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });

/** file (repo-relative) → YYYY-MM-DD of the newest commit that touched it. */
function fileDates() {
  if (dates) return dates;
  dates = new Map();
  try {
    if (git(['rev-parse', '--is-shallow-repository']).trim() === 'true') return dates;
    // Newest first; each commit is "\x01<committer ISO date>" then its files.
    let current = null;
    for (const line of git(['log', '--format=%x01%cI', '--name-only', '--no-renames']).split('\n')) {
      if (line.startsWith('\x01')) { current = line.slice(1); continue; }
      const f = line.trim();
      if (!f || !current) continue;
      const prev = dates.get(f);
      if (!prev || Date.parse(current) > Date.parse(prev)) dates.set(f, current);
    }
    // Uncommitted edits (local builds) are newer than any commit.
    for (const line of git(['status', '--porcelain']).split('\n')) {
      const f = line.slice(3).trim();
      if (f) dates.set(f, 'BUILD');
    }
  } catch {
    dates = new Map();
  }
  return dates;
}

const dateOf = (file) => {
  const d = fileDates().get(file);
  return !d || d === 'BUILD' ? BUILD_DATE : d.slice(0, 10);
};

// Data-driven routes → the file(s) their content comes from.
const DATA_ROUTES = [
  [/^\/agents\/[^/]+$/, ['src/data/agentPages.ts']],
  [/^\/industries\/[^/]+$/, ['src/data/hubs.ts']],
  [/^\/integrations\/[^/]+$/, ['src/data/integrations.ts']],
  [/^\/use-cases\/[^/]+$/, ['src/data/usecases.ts']],
  [/^\/glossary\/[^/]+$/, ['src/data/glossary.ts']],
  [/^\/benchmarks\/[^/]+$/, ['src/data/benchmarks.ts']],
  [/^\/ai-receptionist-for-[^/]+$/, ['src/data/industries.ts']],
  [/^\/[^/]+-alternative$/, ['src/data/comparisons.ts', 'src/data/answeringVendors.ts']],
];

// Hand-written pages whose copy lives outside the page file.
const EXTRA_SOURCES = {
  '/': ['src/components/HomePage.astro', 'src/i18n/home.ts'],
  '/es': ['src/components/HomePage.astro', 'src/i18n/home.ts'],
  '/pricing': ['src/components/PricingPage.astro', 'src/i18n/pricing.ts'],
  '/es/pricing': ['src/components/PricingPage.astro', 'src/i18n/pricing.ts'],
  '/custom': ['src/components/CustomPage.astro', 'src/i18n/custom.ts'],
  '/es/custom': ['src/components/CustomPage.astro', 'src/i18n/custom.ts'],
  '/best-ai-receptionist': ['src/data/answeringVendors.ts'],
  '/best-ai-receptionist-for-hvac': ['src/data/answeringVendors.ts'],
  '/best-ai-receptionist-for-law-firms': ['src/data/answeringVendors.ts'],
  '/best-ai-receptionist-for-real-estate': ['src/data/answeringVendors.ts'],
  '/best-google-business-profile-management': ['src/data/gbpVendors.ts'],
  '/ai-receptionist-cost': ['src/data/answeringVendors.ts', 'src/data/costExamples.ts'],
};

/** The source files a page's content comes from (repo-relative), or [] when unknown. */
export function sourceFilesFor(path) {
  const p = path.replace(/^https?:\/\/[^/]+/, '').replace(/#.*$/, '') || '/';
  const guide = p.match(/^\/guides\/([^/]+?)(\.html)?$/);
  if (guide) return [`src/data/guide-bodies/${guide[1]}.html`];
  for (const [re, files] of DATA_ROUTES) {
    if (re.test(p) && !existsSync(`src/pages${p}.astro`)) return files;
  }
  const page = p === '/' ? 'src/pages/index.astro'
    : existsSync(`src/pages${p}.astro`) ? `src/pages${p}.astro`
    : existsSync(`src/pages${p}/index.astro`) ? `src/pages${p}/index.astro`
    : null;
  const tools = /^\/tools\/[^/]+$/.test(p) && !page ? ['src/data/calculators.ts'] : [];
  return [...(page ? [page] : []), ...tools, ...(EXTRA_SOURCES[p] ?? [])].filter((f) => existsSync(f));
}

/** YYYY-MM-DD the page's content last changed (build date when unknown). */
export function lastModFor(path) {
  const files = sourceFilesFor(path);
  if (!files.length) return BUILD_DATE;
  return files.map(dateOf).sort().at(-1);
}
