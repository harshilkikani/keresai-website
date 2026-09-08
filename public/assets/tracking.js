/* =============================================================
   Keres AI — conversion tracking
   External file: the CSP allows 'self' plus the Google and Meta
   hosts, and no unsafe-inline. IDs come from the JSON block Layout
   renders from src/config/business.ts (#keres-tracking). With no
   IDs nothing loads — a half-configured tag reports phantom
   conversions, which is worse than none.

   Load order: nothing before first paint. The tag scripts are
   injected after the window load event, in an idle callback, so
   they cannot sit on the LCP path.

   Events:
     tel: click            → Google Ads conversion + Meta Contact
     keres:lead (form ok)  → Google Ads conversion + Meta Lead
     keres:booking         → Google Ads conversion + Meta Schedule (Calendly booked)
     astro:page-load       → GA4 page_view on client-side navigations
   Every Meta event carries an eventID so a server-side CAPI event
   with the same id deduplicates. The form POST carries the same id
   as _event_id.
============================================================= */
(function () {
  'use strict';

  var cfgEl = document.getElementById('keres-tracking');
  if (!cfgEl) return;
  var cfg;
  try { cfg = JSON.parse(cfgEl.textContent || '{}'); } catch (e) { return; }
  var GA4 = cfg.ga4 || '', AW = cfg.googleAds || '', PIXEL = cfg.metaPixel || '';
  var LABELS = cfg.labels || {};
  if (!GA4 && !AW && !PIXEL) return;

  // The page language rides on every event so Spanish campaigns can be
  // measured apart: GA4 event param, Google Ads conversion param, Meta custom data.
  var LANG = function () { return document.documentElement.lang || 'en'; };
  // GA4: `language` is gtag's built-in user-language field (reported as the
  // Language dimension), `page_language` a custom event parameter to register
  // as a custom dimension. Google Ads conversion pings drop custom parameters,
  // so a Spanish page uses the *_es label when one is configured (labels.form_submit_es,
  // tel_click_es, phone_es) and falls back to the base label otherwise.
  var langParams = function () { return { language: LANG(), page_language: LANG() }; };
  var labelFor = function (key) { var l = LANG(); return (l !== 'en' && LABELS[key + '_' + l]) || LABELS[key] || ''; };

  var uuid = function () {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
      : 'k-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  };
  function add(src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }

  var loaded = false;
  function load() {
    if (loaded) return; loaded = true;

    if (GA4 || AW) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      gtag('js', new Date());
      if (GA4) gtag('config', GA4, Object.assign({ send_page_view: true }, langParams()));
      if (AW) {
        gtag('config', AW, cfg.enhancedConversions ? { allow_enhanced_conversions: true } : {});
        // Website call conversions: Google swaps the displayed number for a
        // forwarding number for ad visitors and counts calls over 30s.
        if (labelFor('phone') && cfg.phoneDisplay) {
          gtag('config', AW + '/' + labelFor('phone'), { phone_conversion_number: cfg.phoneDisplay });
        }
      }
      add('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4 || AW));
    }

    if (PIXEL) {
      // The standard fbevents bootstrap, without the inline snippet.
      var n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!window._fbq) window._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      add('https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', PIXEL);
      fbq('track', 'PageView', { language: LANG() });
    }
  }

  function afterFirstPaint(fn) {
    var go = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 1); })(fn); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
  }
  afterFirstPaint(load);

  function adsConversion(key, extra) {
    var label = labelFor(key);
    if (!AW || !label || !window.gtag) return;
    gtag('event', 'conversion', Object.assign({ send_to: AW + '/' + label }, langParams(), extra || {}));
  }
  // Enhanced conversions / advanced matching: hand the platforms the phone
  // number (E.164); gtag and fbevents hash it (SHA-256) before it leaves the
  // browser. Off unless business.tracking.enhancedConversions is true.
  function identify(phone) {
    if (!cfg.enhancedConversions || !phone) return;
    if ((GA4 || AW) && window.gtag) gtag('set', 'user_data', { phone_number: phone });
    if (PIXEL && window.fbq) fbq('init', PIXEL, { ph: phone.replace(/\D/g, '') });
  }
  function meta(name, id, params) {
    if (!PIXEL || !window.fbq) return;
    fbq('track', name, Object.assign({ language: LANG() }, params || {}), { eventID: id });
  }

  // tel: click → Google Ads conversion + Meta Contact
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!a) return;
    var id = uuid();
    a.setAttribute('data-event-id', id);
    adsConversion('tel_click', { event_id: id });
    meta('Contact', id, { content_name: 'tel_click' });
    if (GA4 && window.gtag) gtag('event', 'tel_click', Object.assign({ event_id: id }, langParams()));
  }, true);

  // form success → Google Ads conversion + Meta Lead (same id as the POST)
  document.addEventListener('keres:lead', function (e) {
    var d = (e && e.detail) || {};
    var id = d.eventId || uuid();
    identify(d.phone);
    adsConversion('form_submit', { event_id: id });
    meta('Lead', id, { content_name: d.form || 'form' });
    if (GA4 && window.gtag) gtag('event', 'generate_lead', Object.assign({ event_id: id, form: d.form || 'form' }, langParams()));
  });

  // Calendly booking after the form → Google Ads conversion + Meta Schedule
  document.addEventListener('keres:booking', function (e) {
    var d = (e && e.detail) || {};
    var id = uuid();
    identify(d.phone);
    adsConversion('booking', { event_id: id, lead_event_id: d.leadEventId || '' });
    meta('Schedule', id, { content_name: d.form || 'quote' });
    if (GA4 && window.gtag) gtag('event', 'book_call', Object.assign({ event_id: id, lead_event_id: d.leadEventId || '' }, langParams()));
  });

  // GA4 page views on client-side navigations (first load is config's own).
  var first = true;
  document.addEventListener('astro:page-load', function () {
    if (first) { first = false; return; }
    if (GA4 && window.gtag) gtag('event', 'page_view', Object.assign({ page_location: location.href, page_title: document.title }, langParams()));
    if (PIXEL && window.fbq) fbq('track', 'PageView', { language: LANG() });
  });
})();
