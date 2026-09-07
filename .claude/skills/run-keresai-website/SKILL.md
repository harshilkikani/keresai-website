---
name: run-keresai-website
description: Build, run, screenshot and drive the keresai.com Astro site. Use when asked to start or build the site, take a 390px/1440px screenshot of a page, check the console/CSP, run Lighthouse, verify the fold, links, contrast or page weight, or test the motion system on the running site.
---

Static Astro 5 site (vanilla CSS/JS in `public/assets`, GitHub Pages). There is
no test suite; "run it" means build `dist/`, serve it, and drive headless Chromium
against it with `.claude/skills/run-keresai-website/driver.mjs`. Every command
below was run in this repo and worked. Paths are relative to the repo root.

## Prerequisites

**Node 20.** Not "18 or newer": Astro 5.18 refuses 18.17 and Playwright 1.63
refuses anything below 20, and the system Node on this Mac is 18.17.1. The
repo carries `.nvmrc` (`20`) and `engines.node >= 20`; a login shell only
gets Node 20 after nvm loads, so in a fresh shell:

```bash
source ~/.nvm/nvm.sh && nvm use     # reads .nvmrc → v20.19.1
node -v                              # must print v20.x
```

One Chromium. On this Mac the driver uses the installed Google Chrome
(`channel: 'chrome'`). On a machine without Chrome, pull Playwright's
headless shell once (99 MB) — the driver falls back to it automatically:

```bash
npx playwright install chromium-headless-shell
```

Optional: `ffmpeg` on PATH for `stitch` (joining screenshot tiles). `lh` and
`serve --gzip` fetch `lighthouse` / `serve` through `npx --yes`, so the first
run of each needs network.

## Setup

```bash
npm ci
```

Playwright is a devDependency (it was an untracked extra before — a clean
install used to drop it and the harness with it).

## Build

```bash
npm run build
```

`prebuild` runs `scripts/build-css.mjs`, which concatenates and minifies the
five source stylesheets into `public/assets/site.css` and writes its hash to
`src/data/cssHash.ts`. Edit the sources (`fonts.css`, `tokens.css`,
`styles.css`, `pages.css`, `components.css`), never `site.css`. If you touch
CSS without going through build/dev, `npm run build:css` regenerates it.

## Run (agent path)

```bash
D=.claude/skills/run-keresai-website/driver.mjs
node $D serve                         # astro preview of dist/ on :4321 (waits until it answers)
node $D shot smoke / /pricing         # 390 + 1440 fold @2x and scrolled tiles @1x → /tmp/keres-shots/
node $D console /                     # console errors, CSP violations, motion + router state, client-side nav
node $D stop                          # kill whatever holds :4321
```

`BASE=http://localhost:4322 node $D …` targets another server; `OUT=…` moves
the screenshot folder.

| command | what it does |
|---|---|
| `serve [--gzip] [--port N]` | `astro preview` on 4321, or with `--gzip` a compressing static server on 4322 (production-like bytes for Lighthouse). Refuses to start without `dist/`. |
| `stop [port]` | kill the listener on the port (default 4321). Do this before `npm run dev` — see Gotchas. |
| `shot <label> <path…>` | `<label>-<slug>-<390\|1440>-fold.png` at 2x after the 2.6 s hero orchestration, then `-NN.png` viewport tiles at 1x. |
| `stitch <label> <slug> <390\|1440>` | tiles → one tall `-fullpage.png` (ffmpeg). |
| `console [path…]` | errors/warnings/CSP, whether `html[data-motion]` and the hero ran, and on desktop a client-side nav to `/pricing` checking the nav persisted. |
| `scroll` | walks the homepage; reports pipeline stages lit, reveals fired, connector drawn, horizontal overflow. |
| `fold <path…>` | primary CTA top/bottom vs viewport at 1440×900, 1280×800, 390×844. |
| `links` | every internal `href` in `dist/` resolves to a file (`.html`, dir index, or asset). Exit 1 on failures. |
| `contrast <path…>` | text under 4.5:1 (3:1 large) with a CSS path, light and dark. Reads alpha backgrounds as opaque — confirm hits with `lh`. |
| `weight <path…>` | bytes per page by resource type after a full scroll, plus any 4xx/5xx. |
| `lh <path…> [--port N]` | Lighthouse mobile (simulated throttling): scores, FCP/LCP/TBT/CLS, LCP element, opportunities. JSON kept in `/tmp/keres-shots/`. |
| `dark <path> [id]` | 1440 dark-mode screenshot, optionally scrolled to `#id`. |
| `fonts [path]` | which `@font-face`s loaded and whether the h1/lede render in a webfont or a fallback. |

A full verification pass, as run before the last commit:

```bash
node $D serve && node $D serve --gzip
node $D console / && node $D scroll && node $D fold / /pricing /lp/law-firms-nj
node $D links && node $D contrast / && node $D weight / /pricing && node $D fonts
node $D lh / --port 4322              # run this one alone — see Gotchas
node $D shot after / && node $D dark / brief
node $D stop 4321 && node $D stop 4322
```

## Run (human path)

```bash
npm run dev      # → http://localhost:4321/, hot reload. Ctrl-C to stop.
```

`predev` regenerates `site.css`. If 4321 is busy, `astro dev` silently takes
4322 — check the line it prints.

## Test

No unit or e2e suite exists. The closest thing is `links` + `console` + `fold`
above; the deploy workflow (`.github/workflows/deploy.yml`) only runs
`npm ci && npm run build`. Do not run `astro check`: it prompts to install
`@astrojs/check` and hangs in a non-interactive shell.

## Gotchas

- **A stale `astro preview` on 4321 makes every screenshot lie.** `npm run dev`
  then binds 4322 without failing, and anything pointed at 4321 sees the old
  `dist/`. Always `node $D stop` first; `lsof -ti:4321 -sTCP:LISTEN` shows the
  culprit.
- **Full-page screenshots repeat content.** Pages here are 18k px tall at 1440
  and 27k at 390, past Chrome's ~16k texture limit, so Playwright's
  `fullPage` wraps silently. `shot` walks the page in viewport tiles instead.
- **Lazy images paint blank in screenshots** unless the page has been scrolled
  through first; `shot` and `weight` do that scroll.
- **The hero animates for ~2.2 s** (words → typed transcript → booking chip →
  owner SMS). `shot`, `console`, `dark` and `fonts` wait 2.6 s before capture,
  or the transcript is caught mid-type.
- **Lighthouse swings ±2 perf points and ±0.3 s LCP under load.** Two Chrome
  screenshot runs plus a build pushed TBT to 530 ms in one run and 0 ms the
  next. Run `lh` on its own. `astro preview` serves uncompressed (121 KB CSS);
  `serve --gzip` on 4322 serves 22.7 KB, which is what GitHub Pages does.
- **CSP forbids inline scripts.** `motion.js` is inlined by `Layout.astro`
  under a SHA-256 hash computed at build time, so editing it is safe; any
  other inline `<script>` or `onload=` attribute is blocked silently. `console`
  is how you find out.
- **This checkout's folder name has a space** (`keresai-website-main 4`).
  `URL.pathname` leaves it as `%204`; the driver uses `fileURLToPath`. Quote
  paths in shell.
- **zsh does not word-split `$var`.** `node $D "$c"` with `c="fold /"` sends one
  argument and the driver prints usage. Pass arguments literally.
- **`chromium.launch()` with no options fails** on a fresh Playwright install
  ("Executable doesn't exist at …/chromium_headless_shell-1243") until
  `npx playwright install chromium-headless-shell`. The driver tries system
  Chrome first for this reason.
- **GoatCounter warns on localhost** ("not counting because of: localhost");
  `console` filters it. Anything else in that list is real.

## Troubleshooting

- **`Node.js v18.17.1 is not supported by Astro! Please upgrade Node.js to a
  supported version: ">=18.20.8"`** from `npm run build`: you are on the
  system Node. `source ~/.nvm/nvm.sh && nvm use`. Note the build's exit code
  is hidden if you pipe it into `grep`/`tail` — check `dist/index.html`'s
  timestamp, or read the whole output.
- **`Playwright requires Node.js 20 or higher.`** from any driver command:
  same cause, same fix. `npm ci` on Node 18 succeeds and says nothing, which
  is why `engines.node >= 20` is now in `package.json`.
- **`dist/index.html missing — run npm run build first.`**: `serve` refuses to
  start without a build. `npm run build`.
- **`server did not answer on http://localhost:4321/ within 30s`**: the port
  is held by something else — `node $D stop 4321`, then retry. The process log
  is `/tmp/keres-preview.log` (`/tmp/keres-gzip.log` for `--gzip`).
- **`Executable doesn't exist at …/ms-playwright/chromium_headless_shell-…`**:
  no system Chrome and no bundled shell. `npx playwright install
  chromium-headless-shell`.
- **`shot` prints `FAIL http://localhost:4321/x → 404`**: the route is not in
  `dist/` — routes are `src/pages/*.astro` (`build.format: 'file'`, so
  `/pricing` is `dist/pricing.html`). `links` lists what is missing site-wide.
- **`lh` hangs on first use**: `npx --yes lighthouse` is downloading. Needs
  network; nothing to fix locally.
