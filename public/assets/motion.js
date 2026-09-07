/* =============================================================
   Keres AI — motion
   Loaded in <head>, blocking, on purpose: it stamps html[data-motion]
   before first paint so choreographed elements start hidden instead of
   flashing. Everything here is transform/opacity, IntersectionObserver-
   gated, and resolves to final state under prefers-reduced-motion.

   Motion system:
     1. Hero orchestration on load  — CSS keyframes, this file just
                                       flips .is-live once.
     2. Two-door tilt               — pointer-driven, desktop only.
     3. Sticky pipeline             — nodes light, connector draws.
     4. Scroll reveals              — 12px rise + fade, 60ms stagger.
     5. Count-up numbers            — once, in view.
     6. Buttons / phone pulse       — CSS only.
     7. Daily Brief bubbles         — reveal machinery, 90ms, pop last.
     8. View transitions            — Astro ClientRouter, CSS crossfade.
     9. Cursor light in the hero    — desktop only.
============================================================= */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var desktop = function () { return window.innerWidth >= 1024 && fine; };

  if (reduced || !('IntersectionObserver' in window)) return;
  var stamp = function () { root.setAttribute('data-motion', ''); };
  stamp();

  var easeOutQuint = function (t) { return 1 - Math.pow(1 - t, 5); };

  /* ── 1. Hero orchestration ─────────────────────────────── */
  function hero(scope) {
    var fig = scope.querySelector('[data-hero]');
    var h1 = scope.querySelector('[data-words]');
    if (h1) h1.classList.add('is-live');
    if (fig) {
      // Let the H1 words start first (6 × 40ms), then the transcript.
      setTimeout(function () { fig.classList.add('is-live'); }, 260);
    }
  }

  /* ── 4 + 7. Scroll reveals (children stagger) ───────────── */
  var revealIO;
  function reveals(scope) {
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var kids = el.querySelectorAll('[data-reveal-child]');
          var step = parseInt(el.getAttribute('data-reveal-stagger'), 10) || 60;
          Array.prototype.forEach.call(kids, function (kid, i) {
            kid.style.transitionDelay = (i * step) + 'ms';
            kid.style.setProperty('--d', (i * step) + 'ms');
          });
          el.classList.add('is-in');
          revealIO.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    Array.prototype.forEach.call(scope.querySelectorAll('[data-reveal]:not(.is-in)'), function (el) {
      revealIO.observe(el);
    });
  }

  /* ── 5. Count-up numbers ───────────────────────────────── */
  var countIO;
  function counts(scope) {
    if (!countIO) {
      countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          countIO.unobserve(el);
          var raw = (el.textContent || '').trim();
          var m = raw.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
          if (!m) return;
          var target = parseInt(m[2].replace(/,/g, ''), 10);
          if (!isFinite(target)) return;
          var prefix = m[1], suffix = m[3];
          var useCommas = m[2].indexOf(',') !== -1 || target >= 1000;
          var start = null, dur = Math.min(1100, 400 + target * 2);
          el.style.minWidth = el.getBoundingClientRect().width + 'px';
          function frame(ts) {
            if (start === null) start = ts;
            var p = Math.min(1, (ts - start) / dur);
            var v = Math.round(target * easeOutQuint(p));
            el.textContent = prefix + (useCommas ? v.toLocaleString('en-US') : String(v)) + suffix;
            if (p < 1) requestAnimationFrame(frame);
            else el.style.minWidth = '';
          }
          requestAnimationFrame(frame);
        });
      }, { threshold: 0.6 });
    }
    Array.prototype.forEach.call(scope.querySelectorAll('[data-count]:not([data-counted])'), function (el) {
      el.setAttribute('data-counted', '');
      countIO.observe(el);
    });
  }

  /* ── 3. Pipeline: scroll progress → active stage ───────── */
  function pipeline(scope) {
    var track = scope.querySelector('[data-pipe]');
    if (!track) return;
    var panel = track.querySelector('.pipe__panel');
    var stages = track.querySelectorAll('[data-stage-copy]');
    var dots = track.querySelectorAll('[data-dot]');
    var svg = track.querySelector('[data-pipeline]');
    var line = svg && svg.querySelector('[data-draw]');
    var N = stages.length;
    if (!panel || N < 2) return;

    var total = line ? parseFloat(line.getAttribute('y2')) - parseFloat(line.getAttribute('y1')) : 0;
    if (line) { line.style.strokeDasharray = total; line.style.strokeDashoffset = total; }
    var navH = parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) || 68;
    var step = 0, top = 0, current = -1;

    function layout() {
      // ~22vh of scrolling per stage (two or three wheel notches), clamped;
      // the track is the pinned panel plus six of those steps, which keeps
      // the section under 2,400px at 1440x900.
      step = Math.max(160, Math.min(240, Math.round(window.innerHeight * 0.19)));
      top = navH + (window.innerWidth < 900 ? 12 : 24);
      track.style.setProperty('--track', (panel.offsetHeight + (N - 1) * step) + 'px');
    }
    function update() {
      var r = track.getBoundingClientRect();
      var progress = (top - r.top) / ((N - 1) * step);
      progress = Math.max(0, Math.min(1, progress));
      if (line) line.style.strokeDashoffset = String(total * (1 - progress));
      var active = Math.round(progress * (N - 1));
      if (active === current) return;
      current = active;
      if (svg) svg.setAttribute('data-active', String(active));
      Array.prototype.forEach.call(stages, function (s, i) { s.classList.toggle('is-active', i === active); });
      Array.prototype.forEach.call(dots, function (d, i) {
        d.classList.toggle('is-on', i <= active);
        d.classList.toggle('is-current', i === active);
      });
    }
    // One set of window listeners, replaced on each client-side navigation
    // so a previous page's pipeline never keeps a dead track alive.
    if (window.__kPipe) {
      window.removeEventListener('scroll', window.__kPipe.scroll);
      window.removeEventListener('resize', window.__kPipe.resize);
    }
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; update(); });
    };
    var onResize = function () { layout(); update(); };
    window.__kPipe = { scroll: onScroll, resize: onResize };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    layout();
    update();
  }

  /* ── 2. Tilt toward the cursor, spring back on leave ───── */
  function tilt(scope) {
    if (!desktop()) return;
    Array.prototype.forEach.call(scope.querySelectorAll('[data-tilt]'), function (el) {
      if (el.__tilt) return;
      el.__tilt = true;
      var MAX = 4;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', (-y * MAX).toFixed(2) + 'deg');
        el.style.setProperty('--ry', (x * MAX).toFixed(2) + 'deg');
        el.classList.add('is-tilting');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.classList.remove('is-tilting');
      });
    });
  }

  /* ── 9. Cursor light in the hero only ──────────────────── */
  function light(scope) {
    if (!desktop()) return;
    var h = scope.querySelector('.k-hero--v2');
    if (!h || h.__light) return;
    h.__light = true;
    h.addEventListener('pointermove', function (e) {
      var r = h.getBoundingClientRect();
      h.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      h.style.setProperty('--my', (e.clientY - r.top) + 'px');
      h.classList.add('has-light');
    });
    h.addEventListener('pointerleave', function () { h.classList.remove('has-light'); });
  }

  function init() {
    stamp();
    var scope = doc.body;
    hero(scope);
    reveals(scope);
    counts(scope);
    pipeline(scope);
    tilt(scope);
    light(scope);
  }

  // Runs on the first load and again after every client-side navigation.
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  doc.addEventListener('astro:after-swap', init);
})();
