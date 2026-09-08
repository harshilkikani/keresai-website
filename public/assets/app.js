/* =============================================================
   Keres AI — main app
   nav, theme, language switcher, scroll-spy, calendar, form,
   modals, reveal-on-scroll
============================================================= */
(function () {
  'use strict';

  const CALENDLY_URL = 'https://calendly.com/ops-keresai/30min';
  const THEME_KEY = 'keres.theme';

  /* ── Lifecycle ───────────────────────────────────────────
     With Astro's ClientRouter the document is swapped on navigation
     and DOMContentLoaded never fires again, so every init runs through
     ready(): once on load and again after each swap. Listeners on
     document/window are bound once (bindOnce) so they never stack;
     listeners on persisted nav elements are guarded per element. */
  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
    document.addEventListener('astro:after-swap', fn);
  };
  const bound = new Set();
  const bindOnce = (target, key, type, fn, opts) => {
    if (bound.has(key)) return;
    bound.add(key);
    target.addEventListener(type, fn, opts);
  };
  const first = (el, key) => {
    if (!el) return false;
    el.__k = el.__k || {};
    if (el.__k[key]) return false;
    el.__k[key] = true;
    return true;
  };

  /* ─── Theme ─────────────────────────────────────────── */
  function getTheme() {
    return localStorage.getItem(THEME_KEY)
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark');
      btn.querySelector('.icon-sun').style.display = theme === 'dark' ? 'block' : 'none';
      btn.querySelector('.icon-moon').style.display = theme === 'dark' ? 'none' : 'block';
    }
  }
  ready(() => {
    applyTheme(getTheme());
    const btn = document.getElementById('theme-toggle');
    first(btn, 'theme') && btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  /* ─── Mobile nav (hamburger) ────────────────────────── */
  ready(() => {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu || !first(btn, 'menu')) return;

    function setOpen(open) {
      btn.setAttribute('aria-expanded', open);
      menu.setAttribute('data-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    bindOnce(document, 'L1', 'keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    bindOnce(window, 'L2', 'resize', () => { if (window.innerWidth > 768) setOpen(false); });
  });

  /* ─── Nav compact-on-scroll ─────────────────────────── */
  ready(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let ticking = false;
    const update = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    };
    update();
    bindOnce(window, 'L3', 'scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  });

  /* ─── Scroll-spy (IntersectionObserver-based) ──────── */
  ready(() => {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

    const linkMap = new Map();
    links.forEach(a => linkMap.set(a.getAttribute('href').slice(1), a));

    const setActive = (id) => {
      links.forEach(a => {
        const active = a.getAttribute('href') === '#' + id;
        a.classList.toggle('active', active);
        active ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
      });
    };

    const io = new IntersectionObserver((entries) => {
      // pick the most-visible section intersecting the viewport
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && linkMap.has(visible.target.id)) setActive(visible.target.id);
    }, { rootMargin: '-120px 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(s => io.observe(s));
  });

  /* ─── Resource page filter pills ───────────────────── */
  ready(() => {
    const pills = document.querySelectorAll('.cat-pill');
    const cards = document.querySelectorAll('.res-card[data-category]');
    if (!pills.length || !cards.length) return;

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.filter;
        cards.forEach(c => {
          c.classList.toggle('hidden', filter !== 'all' && c.dataset.category !== filter);
        });
      });
    });
  });

  /* ─── Reveal-on-scroll ─────────────────────────────── */
  ready(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  });

  /* ─── Conversion events ────────────────────────────────
     Every CTA on the site carries data-event. This is the only
     place that reads it, so a new button is tracked by adding an
     attribute rather than by wiring a listener.

     window.keresTrack only exists on /lp/* pages, where
     tracking.js is loaded. Everywhere else this is a no-op, which
     is why the check is on the function and not on the page. */
  ready(() => {
    const fire = (name, params) => {
      if (typeof window.keresTrack === 'function') window.keresTrack(name, params || {});
    };

    bindOnce(document, 'L4', 'click', (e) => {
      const el = e.target.closest('[data-event]');
      if (!el) return;
      fire(el.dataset.event, {
        page_path: window.location.pathname,
        link_text: (el.textContent || '').trim().slice(0, 80),
      });
    });

    // Form submits: the LP form and the contact form both post away,
    // so fire on submit rather than waiting for a response.
    document.querySelectorAll('form[data-event]').forEach((form) => {
      form.addEventListener('submit', () => {
        fire(form.dataset.event, { page_path: window.location.pathname });
      });
    });

    // A demo booked is confirmed by the thank-you page, not by the click.
    if (document.body.dataset.conversion) {
      fire(document.body.dataset.conversion, { page_path: window.location.pathname });
    }
  });

  /* ─── Analytics on client-side navigations ───────────────
     count.js counts the first page itself. With the ClientRouter the
     document is swapped on navigation and count.js never re-runs, so
     every later page is counted here. The first astro:page-load fires
     for the initial page and is skipped to avoid a double count.
     GoatCounter ignores localhost, so this is only observable live. */
  let firstPageLoad = true;
  bindOnce(document, 'gc-page-load', 'astro:page-load', () => {
    if (firstPageLoad) { firstPageLoad = false; return; }
    const gc = window.goatcounter;
    if (!gc || typeof gc.count !== 'function') return;
    gc.count({ path: location.pathname + location.search + location.hash, title: document.title });
  });

  /* ─── Nav dropdowns ────────────────────────────────────
     The <details> elements work on their own. This only adds the
     two behaviours markup cannot express: close when the pointer
     goes elsewhere, and close on Escape. */
  ready(() => {
    const drops = Array.prototype.slice.call(document.querySelectorAll('.nav-drop'));
    if (!drops.length) return;

    const closeAll = (except) => {
      drops.forEach((d) => { if (d !== except) d.open = false; });
    };

    drops.forEach((d) => {
      if (first(d, 'drop')) d.addEventListener('toggle', () => { if (d.open) closeAll(d); });
    });

    bindOnce(document, 'L5', 'click', (e) => {
      if (!e.target.closest('.nav-drop')) closeAll(null);
    });

    bindOnce(document, 'L6', 'keydown', (e) => {
      if (e.key !== 'Escape') return;
      const open = drops.filter((d) => d.open);
      if (!open.length) return;
      open.forEach((d) => { d.open = false; });
      const summary = open[0].querySelector('summary');
      if (summary) summary.focus();
    });
  });

  /* ─── Calendar + Calendly launcher ─────────────────── */
  ready(() => {
    const elDays  = document.getElementById('calDays');
    const elMonth = document.getElementById('calMonth');
    const elInfo  = document.getElementById('calInfo');
    if (!elDays) return;

    const today = new Date();
    let curY = today.getFullYear(), curM = today.getMonth();
    let selected = null;

    function monthName(m, lang) {
      return new Date(2000, m, 1).toLocaleDateString(lang, { month: 'long' });
    }
    function dayName(d, lang) {
      return d.toLocaleDateString(lang, { weekday: 'long' });
    }

    function render() {
      const lang = (window.KeresI18n && window.KeresI18n.current) || 'en';
      elMonth.textContent = `${monthName(curM, lang)} ${curY}`;

      // localize weekday headers
      const wdRoot = document.getElementById('calWeekdays');
      if (wdRoot) {
        const base = new Date(2024, 11, 1); // Sunday
        wdRoot.innerHTML = '';
        for (let i = 0; i < 7; i++) {
          const d = new Date(base); d.setDate(base.getDate() + i);
          const s = document.createElement('span');
          s.textContent = d.toLocaleDateString(lang, { weekday: 'narrow' });
          wdRoot.appendChild(s);
        }
      }

      elDays.innerHTML = '';
      const first = new Date(curY, curM, 1).getDay();
      const total = new Date(curY, curM + 1, 0).getDate();
      const td = today.getDate(), tm = today.getMonth(), ty = today.getFullYear();

      for (let i = 0; i < first; i++) {
        const el = document.createElement('div');
        el.className = 'cal-day empty';
        elDays.appendChild(el);
      }
      for (let d = 1; d <= total; d++) {
        const dateObj = new Date(curY, curM, d);
        const isToday = d === td && curM === tm && curY === ty;
        const isPast  = dateObj < new Date(ty, tm, td);
        const isWknd  = [0, 6].includes(dateObj.getDay());
        const el = document.createElement('div');
        el.className = 'cal-day'
          + (isToday ? ' today' : '')
          + (isPast || isWknd ? ' past' : '')
          + (d === selected ? ' selected' : '');
        el.textContent = d;
        el.setAttribute('role', 'gridcell');
        if (!isPast && !isWknd) {
          el.tabIndex = 0;
          el.setAttribute('aria-label', `${dayName(dateObj, lang)} ${monthName(curM, lang)} ${d}`);
          const onSelect = () => {
            selected = d;
            render();
            const label = `${dayName(dateObj, lang)}, ${monthName(curM, lang)} ${d}`;
            const opening = (window.KeresI18n && window.KeresI18n.t('contact.cal.opening')) || 'opening booking page…';
            elInfo.innerHTML = `<strong>${label}</strong> — ${opening}`;
            setTimeout(() => window.open(CALENDLY_URL, '_blank', 'noopener'), 450);
          };
          el.addEventListener('click', onSelect);
          el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); }
          });
        }
        elDays.appendChild(el);
      }
    }

    document.getElementById('calPrev').addEventListener('click', () => {
      curM--; if (curM < 0) { curM = 11; curY--; } render();
    });
    document.getElementById('calNext').addEventListener('click', () => {
      curM++; if (curM > 11) { curM = 0; curY++; } render();
    });

    render();
    bindOnce(document, 'L7', 'langchange', render);
  });

  /* ─── Contact form (Formspree) ─────────────────────── */
  ready(() => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const btn  = document.getElementById('form-btn');
    const okEl = document.getElementById('form-success');
    const erEl = document.getElementById('form-error');

    const t = (k) => (window.KeresI18n ? window.KeresI18n.t(k) : k);

    function validate(input, errId, msgKey) {
      const err = document.getElementById(errId);
      const val = input.value.trim();
      const invalid = !val || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      if (invalid) {
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
        err.textContent = t(msgKey);
        return false;
      }
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
      err.textContent = '';
      return true;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const a = validate(document.getElementById('fname'),    'fname-err',    'contact.form.name.err');
      const b = validate(document.getElementById('femail'),   'femail-err',   'contact.form.email.err');
      const c = validate(document.getElementById('fmessage'), 'fmessage-err', 'contact.form.message.err');
      if (!a || !b || !c) return;

      const originalText = btn.textContent;
      btn.textContent = t('contact.form.sending');
      btn.disabled = true;
      erEl.style.display = 'none';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error('server');
        form.style.display = 'none';
        okEl.style.display = 'block';
          document.dispatchEvent(new CustomEvent('keres:lead', { detail: { form: form.id || 'contact', page: location.pathname } }));
        okEl.focus?.();
      } catch {
        erEl.style.display = 'block';
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });

    ['fname', 'femail', 'fmessage'].forEach(id => {
      const el = document.getElementById(id);
      el && el.addEventListener('input', () => {
        el.classList.remove('invalid');
        el.removeAttribute('aria-invalid');
        document.getElementById(id + '-err').textContent = '';
      });
    });
  });

  /* ─── Dynamic year ─────────────────────────────────── */
  ready(() => {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });

})();
