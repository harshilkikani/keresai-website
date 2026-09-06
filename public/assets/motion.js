/* =============================================================
   Keres AI — motion
   Five motions exist on this site. This file owns two of them:
     2. scroll reveal
     5. Daily Brief SMS stagger (same mechanism, longer delay)
   Hero orchestration (1) is CSS-driven. Hover (3) and focus (4)
   are CSS-only. Nothing else animates.

   The resting state of every revealed element is VISIBLE. The
   hidden state is only ever applied after this script confirms it
   may animate, so a failed script or reduced-motion preference
   leaves finished content on screen rather than a blank page.
============================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('[data-reveal]');
  if (reduced || !targets.length || !('IntersectionObserver' in window)) return;

  // Opting in here is what switches on the hidden pre-state in CSS.
  document.documentElement.setAttribute('data-motion', '');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      // Children stagger; a lone element reveals immediately.
      var kids = el.querySelectorAll('[data-reveal-child]');
      if (kids.length) {
        // 120ms for the hero transcript, 100ms for the Daily Brief bubbles.
        var step = parseInt(el.getAttribute('data-reveal-stagger'), 10) || 100;
        Array.prototype.forEach.call(kids, function (kid, i) {
          kid.style.transitionDelay = (i * step) + 'ms';
        });
      }
      el.classList.add('is-in');
      observer.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  Array.prototype.forEach.call(targets, function (el) { observer.observe(el); });
})();
