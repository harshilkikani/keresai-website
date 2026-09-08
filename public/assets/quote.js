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
        document.dispatchEvent(new CustomEvent('keres:lead', { detail: { form: 'quote', page: location.pathname, eventId: eventId } }));
        loadBooking();
        done.querySelector('h3').setAttribute('tabindex', '-1');
        done.querySelector('h3').focus();
      }

      // The booking embed loads only after a successful submit.
      function loadBooking() {
        var url = root.getAttribute('data-booking');
        var host = root.querySelector('[data-qf-booking]');
        if (!url || !host) return;
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
          f.src = url; f.title = 'Pick a time'; f.loading = 'lazy'; f.style.width = '100%'; f.style.minHeight = '640px'; f.style.border = '0';
          host.appendChild(f);
        }
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('astro:after-swap', init);
})();
