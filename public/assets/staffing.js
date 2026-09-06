/* Front-desk staffing cost estimator. Computes the user's CURRENT cost of
   phone coverage — no assumptions about Keres pricing. */
(function () {
  'use strict';
  function $(id) { return document.getElementById(id); }
  function num(id) { var v = parseFloat(($(id) || {}).value); return isFinite(v) && v >= 0 ? v : 0; }
  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }

  var HOURS_IN_WEEK = 168;
  var COVERED_PER_FTE = 40; // hours one full-time front-desk seat covers

  function calc() {
    var staff = num('st-staff');
    var salary = num('st-salary');
    var overhead = num('st-overhead') / 100;
    var answering = num('st-answering');

    var loadedPerHire = salary * (1 + overhead);
    var staffingAnnual = staff * loadedPerHire;
    var answeringAnnual = answering * 12;
    var totalAnnual = staffingAnnual + answeringAnnual;
    var totalMonthly = totalAnnual / 12;

    var coveredHours = Math.min(staff * COVERED_PER_FTE, HOURS_IN_WEEK);
    var uncoveredPct = Math.max(0, Math.round(((HOURS_IN_WEEK - coveredHours) / HOURS_IN_WEEK) * 100));

    $('st-annual').textContent = money(totalAnnual);
    $('st-monthly').textContent = money(totalMonthly);
    $('st-uncovered').textContent = uncoveredPct + '%';

    $('st-row-staffing').textContent = money(staffingAnnual);
    $('st-row-staffing-calc').textContent = '= ' + staff + ' × ' + money(salary) + ' × ' + (1 + overhead).toFixed(2) + ' (loaded)';
    $('st-row-answering').textContent = money(answeringAnnual);
    $('st-row-coverage').textContent = coveredHours + ' of 168 hrs/week covered';
  }

  document.addEventListener('DOMContentLoaded', function () {
    ['st-staff', 'st-salary', 'st-overhead', 'st-answering'].forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener('input', calc);
    });
    if ($('st-annual')) calc();
  });
})();
