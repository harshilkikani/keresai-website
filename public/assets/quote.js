/* =============================================================
   Keres AI — two-step quote form
   External on purpose: the CSP allows hashed inline scripts and
   'self', nothing else. Progressive: without JS the form is a
   plain two-fieldset form that still posts.

   Spam: a honeypot field and a timestamp — a submit that arrives
   under three seconds after render, or with the honeypot filled,
   is dropped client-side and flagged for the endpoint to drop too.
============================================================= */
(function () {
  'use strict';

  var MIN_MS = 3000;

  // Attribution: the click ids and campaign tags that brought the visitor,
  // kept for the session so a lead sent from a later page still carries
  // them. Ads platforms match on gclid/fbclid; the CRM reads the utm_* set.
  var ATTR_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  function attribution() {
    var store = {};
    try { store = JSON.parse(sessionStorage.getItem('keres:attr') || '{}'); } catch (e) {}
    var q = new URLSearchParams(location.search), fresh = false;
    ATTR_KEYS.forEach(function (k) { var v = q.get(k); if (v) { store[k] = v.slice(0, 200); fresh = true; } });
    if (!store.landing_page || fresh) {
      store.landing_page = (location.pathname + location.search).slice(0, 500);
      var ref = document.referrer || '';
      if (ref && ref.indexOf(location.origin) !== 0) store.referrer = ref.slice(0, 300);
    }
    try { sessionStorage.setItem('keres:attr', JSON.stringify(store)); } catch (e) {}
    return store;
  }

  // Digits only → E.164 (US default), for enhanced conversions / advanced matching.
  function e164(v) {
    var d = String(v || '').replace(/\D/g, '');
    if (d.length === 10) return '+1' + d;
    if (d.length === 11 && d.charAt(0) === '1') return '+' + d;
    return d ? '+' + d : '';
  }

  // Calendly posts a message to the parent when the invitee books. That is
  // the "call booked" conversion; tracking.js turns it into an Ads
  // conversion + Meta Schedule event.
  if (!window.__keresCalendly) {
    window.__keresCalendly = true;
    window.addEventListener('message', function (e) {
      if (e.origin !== 'https://calendly.com' || !e.data || e.data.event !== 'calendly.event_scheduled') return;
      var root = document.querySelector('[data-quote-form].is-done');
      document.dispatchEvent(new CustomEvent('keres:booking', { detail: { form: 'quote', page: location.pathname, leadEventId: (root && root.__eventId) || '', phone: (root && root.__phone) || '' } }));
    });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-quote-form]'), function (root) {
      if (root.__qf) return;
      root.__qf = true;
      var form = root.querySelector('[data-qf-form]');
      var steps = form.querySelectorAll('[data-qf-step]');
      var dots = root.querySelectorAll('[data-qf-dot]');
      var ts = form.querySelector('[data-qf-ts]');
      var done = root.querySelector('[data-qf-done]');
      var rendered = Date.now();
      var eventId = '';
      // Messages come from the markup so translated pages stay translated.
      var M = function (k, d) { return root.getAttribute('data-msg-' + k) || d; };
      ts.value = String(rendered);
      attribution();

      function err(name, msg) {
        var el = root.querySelector('[data-qf-error="' + name + '"]');
        var field = form.elements[name];
        if (el) el.textContent = msg || '';
        if (field && field.setAttribute) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      }
      function validate(stepEl) {
        var ok = true;
        Array.prototype.forEach.call(stepEl.querySelectorAll('[required]'), function (f) {
          var v = (f.value || '').trim();
          var msg = '';
          if (!v) msg = M('required', 'Needed for the quote.');
          else if (f.type === 'tel' && v.replace(/\D/g, '').length < 10) msg = M('phone', 'Enter a number we can text — ten digits.');
          err(f.name, msg);
          if (msg && ok) { ok = false; f.focus(); }
        });
        return ok;
      }
      function show(n) {
        Array.prototype.forEach.call(steps, function (s) { s.hidden = s.getAttribute('data-qf-step') !== String(n); });
        Array.prototype.forEach.call(dots, function (d) {
          var k = +d.getAttribute('data-qf-dot');
          d.classList.toggle('is-current', k === n);
          d.classList.toggle('is-done', k < n);
        });
        var first = steps[n - 1].querySelector('input, select');
        if (first) first.focus({ preventScroll: false });
      }

      form.querySelector('[data-qf-next]').addEventListener('click', function () { if (validate(steps[0])) show(2); });
      form.querySelector('[data-qf-back]').addEventListener('click', function () { show(1); });
      Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (f) {
        f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') err(f.name, ''); });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(steps[1])) return;
        var hp = form.elements._gotcha;
        var tooFast = Date.now() - rendered < MIN_MS;
        if ((hp && hp.value) || tooFast) { err('form', M('fast', 'That was quick — try again in a moment.')); return; }
        var btn = form.querySelector('[data-qf-submit]');
        btn.disabled = true; btn.textContent = M('sending', 'Sending…');
        err('form', '');
        var data = new FormData(form);
        data.append('page', location.pathname);
        // One id for this lead: sent with the POST for server-side CAPI, and
        // handed to tracking.js for the browser-side Lead event.
        eventId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'k-' + Date.now().toString(36);
        data.append('_event_id', eventId);
        var attr = attribution();
        Object.keys(attr).forEach(function (k) { data.append(k, attr[k]); });
        var endpoint = root.getAttribute('data-endpoint');
        var t0 = Date.now();
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            root.setAttribute('data-qf-latency', String(Date.now() - t0));
            success();
          })
          .catch(function () {
            btn.disabled = false; btn.textContent = M('submit', 'See my quote');
            err('form', M('failed', 'That did not send. Try again.'));
            var fb = root.querySelector('[data-qf-fallback]');
            if (fb) fb.hidden = false;
          });
      });

      function success() {
        form.hidden = true;
        done.hidden = false;
        root.classList.add('is-done');
        root.__eventId = eventId;
        root.__phone = e164(form.elements.phone && form.elements.phone.value);
        document.dispatchEvent(new CustomEvent('keres:lead', { detail: { form: 'quote', page: location.pathname, eventId: eventId, phone: root.__phone } }));
        callback();
        loadBooking();
        done.querySelector('h3').setAttribute('tabindex', '-1');
        done.querySelector('h3').focus();
      }

      // "Prefer Remi call you now?" — rendered only when the endpoint is
      // configured and Remi speaks the page's language. One JSON POST.
      function callback() {
        var btn = root.querySelector('[data-qf-callback]');
        var msg = root.querySelector('[data-qf-callback-msg]');
        if (!btn) return;
        btn.addEventListener('click', function () {
          var label = btn.textContent;
          btn.disabled = true; btn.textContent = M('callback-sending', 'Placing the call…');
          if (msg) msg.textContent = '';
          fetch(btn.getAttribute('data-endpoint'), {
            method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ phone: (form.elements.phone && form.elements.phone.value) || '', lang: root.getAttribute('data-lang') || 'en', business: (form.elements.business && form.elements.business.value) || '', page: location.pathname, event_id: eventId }),
          }).then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            btn.hidden = true;
            if (msg) msg.textContent = M('callback-done', 'Done. Remi is calling you now.');
            document.dispatchEvent(new CustomEvent('keres:callback', { detail: { eventId: eventId } }));
          }).catch(function () {
            btn.disabled = false; btn.textContent = label;
            if (msg) msg.textContent = M('callback-fail', 'We could not start the call. Try again.');
          });
        });
      }

      // The booking embed loads only after a successful submit. The URL is
      // the Spanish event when one is configured, else the English one; the
      // host carries lang so assistive tech and Calendly see the language.
      function loadBooking() {
        var url = root.getAttribute('data-booking');
        var host = root.querySelector('[data-qf-booking]');
        if (!url || !host) return;
        host.setAttribute('lang', root.getAttribute('data-lang') || 'en');
        if (/calendly\.com/.test(url)) {
          host.className += ' calendly-inline-widget';
          host.setAttribute('data-url', url + (url.indexOf('?') === -1 ? '?' : '&') + 'hide_gdpr_banner=1&hide_event_type_details=1');
          host.style.minHeight = '640px';
          var s = document.createElement('script');
          s.src = 'https://assets.calendly.com/assets/external/widget.js';
          s.async = true;
          document.head.appendChild(s);
        } else {
          var f = document.createElement('iframe');
          f.src = url; f.title = M('slots', 'Pick a time'); f.loading = 'lazy'; f.style.width = '100%'; f.style.minHeight = '640px'; f.style.border = '0';
          host.appendChild(f);
        }
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('astro:after-swap', init);
})();
