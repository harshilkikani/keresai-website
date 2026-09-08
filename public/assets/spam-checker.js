/* Email spam-score checker. Pure client-side heuristic analysis of subject +
   body — flags content patterns that trip spam filters. Not a guarantee of
   inbox placement (that also depends on auth + reputation), but a useful gut
   check before you send. */
(function () {
  'use strict';
  function $(id) { return document.getElementById(id); }

  var TRIGGER_WORDS = [
    'free', 'guarantee', 'guaranteed', 'act now', 'limited time', 'click here',
    'buy now', 'order now', 'cash', 'winner', 'congratulations', 'risk-free',
    'risk free', '100%', 'no cost', 'no obligation', 'make money', 'earn money',
    'double your', 'cheap', 'discount', 'urgent', 'apply now', 'call now',
    'don’t miss', 'dont miss', 'this won’t last', 'while supplies last',
    'amazing', 'incredible', 'lowest price', 'best price', 'increase sales',
    'extra income', 'work from home', 'be your own boss', 'satisfaction',
    'credit card', 'no fees', 'pre-approved', 'preapproved', 'viagra', 'crypto'
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function analyze(subject, body) {
    var issues = [];
    var score = 100;
    var text = (subject + ' ' + body);
    var lower = text.toLowerCase();

    // Spam trigger words
    var hits = TRIGGER_WORDS.filter(function (w) { return lower.indexOf(w) !== -1; });
    if (hits.length) {
      var pen = Math.min(30, hits.length * 5);
      score -= pen;
      issues.push(['fail', 'Spam trigger words (' + hits.length + ')',
        'Found: <strong>' + hits.slice(0, 8).map(esc).join(', ') + '</strong>' + (hits.length > 8 ? '…' : '') +
        '. These phrases are heavily weighted by spam filters — rewrite in plain, specific language.']);
    } else {
      issues.push(['pass', 'Trigger words', 'No common spam trigger phrases detected.']);
    }

    // ALL CAPS words (3+ letters)
    var caps = (text.match(/\b[A-Z]{3,}\b/g) || []).filter(function (w) { return w !== 'SPF' && w !== 'DKIM' && w !== 'DMARC'; });
    if (caps.length >= 2) {
      score -= Math.min(15, caps.length * 4);
      issues.push(['warn', 'ALL-CAPS words (' + caps.length + ')', 'Shouting in caps (' + esc(caps.slice(0, 5).join(', ')) + ') reads as spam. Use normal case.']);
    }

    // Exclamation marks
    var bangs = (text.match(/!/g) || []).length;
    if (bangs >= 2) {
      score -= Math.min(12, bangs * 3);
      issues.push(['warn', 'Excessive exclamation (' + bangs + ')', 'Multiple “!” signal hype. Keep to zero or one.']);
    }

    // Links
    var links = (body.match(/https?:\/\//gi) || []).length;
    if (links > 3) {
      score -= Math.min(15, (links - 3) * 4);
      issues.push(['warn', 'Too many links (' + links + ')', 'Cold emails with many links get filtered. One link is plenty for a first touch.']);
    }

    // Subject length
    var subjLen = subject.trim().length;
    if (subjLen === 0) {
      score -= 10;
      issues.push(['warn', 'Empty subject', 'A missing subject line hurts open rates and looks suspicious.']);
    } else if (subjLen > 60) {
      score -= 6;
      issues.push(['warn', 'Long subject (' + subjLen + ' chars)', 'Subjects over ~60 chars get truncated and feel salesy. Aim for 30–50.']);
    } else {
      issues.push(['pass', 'Subject length', subjLen + ' characters — good range.']);
    }

    // ALL CAPS subject
    if (subject.length > 4 && subject === subject.toUpperCase() && /[A-Z]/.test(subject)) {
      score -= 10;
      issues.push(['fail', 'All-caps subject', 'An all-caps subject is a classic spam signal.']);
    }

    // Money symbols / spammy money patterns
    if (/\$\d|\d+%\s*off|free\s+\w+\s+(today|now)/i.test(text)) {
      score -= 6;
      issues.push(['warn', 'Money/offer language', 'Dollar amounts and “% off / free today” read as promotional. Lead with relevance, not an offer.']);
    }

    // Body length (too short reads as bulk)
    var words = body.trim().split(/\s+/).filter(Boolean).length;
    if (body.trim() && words < 20) {
      issues.push(['warn', 'Very short body (' + words + ' words)', 'Extremely short emails can look automated. A few personalized sentences perform better.']);
    }

    score = Math.max(0, Math.min(100, Math.round(score)));
    return { score: score, issues: issues };
  }

  function grade(score) {
    if (score >= 85) return { label: 'Looks clean', state: 'pass' };
    if (score >= 65) return { label: 'Some risk', state: 'warn' };
    return { label: 'High spam risk', state: 'fail' };
  }

  function run() {
    var subject = ($('ss-subject') || {}).value || '';
    var body = ($('ss-body') || {}).value || '';
    var out = $('ss-results');
    if (!subject.trim() && !body.trim()) {
      out.innerHTML = '<p class="dc-error">Paste a subject line and/or email body to score it.</p>';
      return;
    }
    var res = analyze(subject, body);
    var g = grade(res.score);
    var cards = res.issues.map(function (i) {
      var icon = i[0] === 'pass' ? '✓' : i[0] === 'warn' ? '!' : '✕';
      return '<div class="dc-card dc-' + i[0] + '"><div class="dc-card-head"><span class="dc-badge">' + icon +
        '</span><h3>' + i[1] + '</h3></div><div class="dc-card-body">' + i[2] + '</div></div>';
    }).join('');
    out.innerHTML =
      '<div class="ss-score dc-' + g.state + '"><div class="ss-score-num">' + res.score + '<span>/100</span></div>' +
      '<div class="ss-score-label">' + g.label + '</div></div>' +
      '<div class="dc-grid">' + cards + '</div>' +
      '<p class="dc-foot">Content is only half the battle — inbox placement also needs authentication and reputation. ' +
      'Run the <a href="/tools/deliverability-checker">deliverability checker</a> on your domain, or ' +
      '<a href="/quote">get a quote</a> to have Keres handle deliverability end to end.</p>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = $('ss-run');
    if (btn) btn.addEventListener('click', run);
  });
})();
