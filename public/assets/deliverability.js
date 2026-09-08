/* Email deliverability checker — SPF / DKIM / DMARC / MX over DNS-over-HTTPS.
   Client-side only; queries Google Public DNS (dns.google) JSON API. */
(function () {
  'use strict';

  var DOH = 'https://dns.google/resolve';
  var DKIM_SELECTORS = [
    'google', 'selector1', 'selector2', 'k1', 'k2', 'default',
    'dkim', 'mail', 's1', 's2', 'mandrill', 'mailjet', 'zoho', 'fm1'
  ];

  function $(id) { return document.getElementById(id); }

  function cleanDomain(raw) {
    return (raw || '')
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/[/?#].*$/, '')
      .replace(/\s+/g, '');
  }

  function query(name, type) {
    return fetch(DOH + '?name=' + encodeURIComponent(name) + '&type=' + type, {
      headers: { accept: 'application/dns-json' }
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  // TXT records arrive as quoted, possibly chunked strings.
  function txtData(answer) {
    if (!answer || !answer.Answer) return [];
    return answer.Answer
      .filter(function (a) { return a.type === 16; })
      .map(function (a) { return String(a.data).replace(/^"|"$/g, '').replace(/"\s+"/g, ''); });
  }

  function card(state, title, body) {
    var icon = state === 'pass' ? '✓' : state === 'warn' ? '!' : '✕';
    return '<div class="dc-card dc-' + state + '">' +
      '<div class="dc-card-head"><span class="dc-badge">' + icon + '</span><h3>' + title + '</h3></div>' +
      '<div class="dc-card-body">' + body + '</div></div>';
  }

  function code(text) {
    var safe = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<code class="dc-record">' + safe + '</code>';
  }

  function checkSPF(domain) {
    return query(domain, 'TXT').then(function (res) {
      var spf = txtData(res).filter(function (t) { return /^v=spf1/i.test(t); });
      if (!spf.length) {
        return card('fail', 'SPF', 'No SPF record found. Mailbox providers can’t verify which servers may send for ' + domain + ', which hurts deliverability and invites spoofing.');
      }
      var rec = spf[0];
      var all = /[~\-?+]all\b/.exec(rec);
      var note = '';
      if (all) {
        if (all[0] === '-all') note = ' Strict <code>-all</code> policy — good.';
        else if (all[0] === '~all') note = ' Soft-fail <code>~all</code> — acceptable; <code>-all</code> is stricter.';
        else note = ' <code>' + all[0] + '</code> is permissive — consider <code>-all</code> or <code>~all</code>.';
      }
      var state = all && (all[0] === '-all' || all[0] === '~all') ? 'pass' : 'warn';
      return card(state, 'SPF', 'SPF record found.' + note + '<br>' + code(rec) +
        (spf.length > 1 ? '<p class="dc-warn-text">⚠ Multiple SPF records detected — only one is allowed. Merge them.</p>' : ''));
    });
  }

  function checkDMARC(domain) {
    return query('_dmarc.' + domain, 'TXT').then(function (res) {
      var dmarc = txtData(res).filter(function (t) { return /^v=DMARC1/i.test(t); });
      if (!dmarc.length) {
        return card('fail', 'DMARC', 'No DMARC record found at <code>_dmarc.' + domain + '</code>. Gmail and Yahoo now require DMARC for bulk senders.');
      }
      var rec = dmarc[0];
      var p = (/\bp=(none|quarantine|reject)/i.exec(rec) || [])[1];
      var state = p === 'reject' || p === 'quarantine' ? 'pass' : 'warn';
      var note = p === 'none'
        ? ' Policy is <code>p=none</code> (monitor only). Tighten to <code>quarantine</code> or <code>reject</code> once SPF/DKIM are aligned.'
        : ' Policy <code>p=' + (p || '?') + '</code>.';
      return card(state, 'DMARC', 'DMARC record found.' + note + '<br>' + code(rec));
    });
  }

  function checkDKIM(domain) {
    var checks = DKIM_SELECTORS.map(function (sel) {
      return query(sel + '._domainkey.' + domain, 'TXT').then(function (res) {
        var found = txtData(res).filter(function (t) { return /v=DKIM1|p=[A-Za-z0-9]/i.test(t); });
        return found.length ? sel : null;
      });
    });
    return Promise.all(checks).then(function (results) {
      var found = results.filter(Boolean);
      if (!found.length) {
        return card('warn', 'DKIM', 'No DKIM record found on common selectors (' + DKIM_SELECTORS.slice(0, 6).join(', ') +
          ', …). DKIM uses custom selectors, so it may still exist under a name we didn’t test — but if you send cold email without it, you should fix this.');
      }
      return card('pass', 'DKIM', 'DKIM found on selector' + (found.length > 1 ? 's' : '') + ': <strong>' + found.join(', ') +
        '</strong>. Note: this is a best-effort scan of common selectors.');
    });
  }

  function checkMX(domain) {
    return query(domain, 'MX').then(function (res) {
      var mx = (res && res.Answer ? res.Answer : [])
        .filter(function (a) { return a.type === 15; })
        .map(function (a) { return String(a.data).replace(/^\d+\s+/, '').replace(/\.$/, ''); });
      if (!mx.length) {
        return card('warn', 'MX', 'No MX records found — this domain may not be set up to receive email.');
      }
      return card('pass', 'MX', 'Mail is handled by:<br>' + mx.map(code).join(' '));
    });
  }

  function run() {
    var input = $('dc-domain');
    var out = $('dc-results');
    var btn = $('dc-run');
    var domain = cleanDomain(input.value);
    if (!domain || domain.indexOf('.') === -1) {
      out.innerHTML = '<p class="dc-error">Enter a valid domain, e.g. <strong>yourcompany.com</strong>.</p>';
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Checking…';
    out.innerHTML = '<p class="dc-loading">Querying DNS for ' + domain + '…</p>';

    Promise.all([checkSPF(domain), checkDKIM(domain), checkDMARC(domain), checkMX(domain)])
      .then(function (cards) {
        out.innerHTML = '<div class="dc-grid">' + cards.join('') + '</div>' +
          '<p class="dc-foot">Checks run live against public DNS. Want all three set up, monitored, and your inboxes warmed? ' +
          '<a href="/quote">Get a quote</a> or read <a href="/email-deliverability">how Keres handles deliverability</a>.</p>';
      })
      .catch(function () {
        out.innerHTML = '<p class="dc-error">Something went wrong querying DNS. Please try again.</p>';
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = 'Check domain';
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = $('dc-run');
    var input = $('dc-domain');
    if (!btn || !input) return;
    btn.addEventListener('click', run);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') run(); });
  });
})();
