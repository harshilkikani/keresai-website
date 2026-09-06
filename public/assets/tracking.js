/* =============================================================
   Keres AI — ad conversion tracking
   Loaded ONLY on /lp/* pages (Layout passes bare). GoatCounter
   still handles cookieless pageviews everywhere else.

   The CSP has no 'unsafe-inline' in script-src, so the gtag and
   Meta bootstraps live here rather than as inline snippets. The
   domains they call are already allowed in script-src, connect-src
   and img-src — see the CSP comment in src/layouts/Layout.astro.

   PLACEHOLDERS — nothing loads until these are filled in. That is
   deliberate: a half-configured tag reports phantom conversions,
   which is worse than no tag at all. Fill in, then verify each one
   firing in the network tab before spending on ads.
============================================================= */
(function () {
  'use strict';

  var IDS = {
    ga4: '',            // 'G-XXXXXXXXXX'
    googleAds: '',      // 'AW-XXXXXXXXX'
    metaPixel: '',      // '1234567890123456'
  };

  /* Google Ads conversion labels, one per action.
     Format: 'AW-XXXXXXXXX/AbC-D_efGhIjKlMnOp'. */
  var ADS_LABELS = {
    form_submit: '',
    tel_click: '',
    demo_booked: '',
    call_30s: '',
  };

  var loaded = { google: false, meta: false };

  function inject(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  }

  /* ── Google: GA4 + Google Ads share one gtag.js ─────────── */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (IDS.ga4 || IDS.googleAds) {
    inject('https://www.googletagmanager.com/gtag/js?id=' + (IDS.ga4 || IDS.googleAds));
    gtag('js', new Date());
    if (IDS.ga4) gtag('config', IDS.ga4);
    if (IDS.googleAds) gtag('config', IDS.googleAds);
    loaded.google = true;
  }

  /* ── Meta pixel ─────────────────────────────────────────── */
  if (IDS.metaPixel) {
    /* eslint-disable */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', IDS.metaPixel);
    window.fbq('track', 'PageView');
    loaded.meta = true;
  }

  /* ── One function every conversion goes through ──────────
     app.js calls this; nothing else needs to know which tags
     are configured. Unconfigured tags are skipped silently so
     the site behaves identically before and after setup. */
  var META_EVENTS = {
    form_submit: 'Lead',
    tel_click: 'Contact',
    demo_booked: 'Schedule',
    call_30s: 'Contact',
  };

  window.keresTrack = function (name, params) {
    params = params || {};

    if (loaded.google) {
      gtag('event', name, params);
      var label = ADS_LABELS[name];
      if (label) gtag('event', 'conversion', { send_to: label });
    }

    if (loaded.meta && META_EVENTS[name]) {
      window.fbq('track', META_EVENTS[name], params);
    }

    /* Always available for debugging: window.keresTrack.log */
    window.keresTrack.log.push({ name: name, params: params, at: Date.now() });
  };
  window.keresTrack.log = [];

  /* ── Call tracking: calls of 30 seconds or more ──────────
     HOOK, NOT AN IMPLEMENTATION. A tel: click is not a call —
     only the call-tracking provider knows the duration, so the
     30-second conversion has to come back from them.

     To wire it up:
       1. Provision a tracking number per channel (GBP, LSA,
          site, ads) with your call-tracking provider.
       2. Point its webhook at a small endpoint you control.
       3. On a completed call with duration >= 30s, have that
          endpoint fire the server-side conversion to Google Ads
          (via the Conversions API / offline conversion import)
          and Meta (via the Conversions API), using the GCLID or
          FBCLID captured below.
       4. Nothing client-side can do step 3 honestly — a browser
          has already navigated away by the time the call ends.

     What this file CAN do is capture and persist the click IDs so
     the server-side conversion can be attributed back to the ad
     that produced it. */
  try {
    var qs = new URLSearchParams(window.location.search);
    ['gclid', 'fbclid', 'wbraid', 'gbraid', 'utm_source', 'utm_campaign'].forEach(function (k) {
      var v = qs.get(k);
      if (v) window.localStorage.setItem('keres_' + k, v);
    });
  } catch (e) {
    /* Private browsing or blocked storage — attribution degrades, nothing breaks. */
  }

  /* Exposed so a call-tracking snippet can read what to attribute to. */
  window.keresAttribution = function () {
    var out = {};
    try {
      ['gclid', 'fbclid', 'wbraid', 'gbraid', 'utm_source', 'utm_campaign'].forEach(function (k) {
        var v = window.localStorage.getItem('keres_' + k);
        if (v) out[k] = v;
      });
    } catch (e) { /* no storage, no attribution */ }
    return out;
  };
})();
