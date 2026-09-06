/* Keres ROI / missed-call calculator — vanilla JS, no deps.
 * Methodology:
 *   missed       = leads × (1 − answer_rate)
 *   would-close  = missed × close_rate            (per-vertical)
 *   lost_revenue = would-close × avg_ticket_value
 *
 * Per-vertical close rates reflect typical answered-lead → closed-deal
 * conversion: home services 25% (industry-median), real estate ~8%
 * (buyer-agent qualified-lead close), med spas ~50% (qualified inquiry
 * to booked appointment), professional services ~15% (qualified
 * consultation to engaged client).
 */
(function () {
  const DEFAULTS = {
    "real-estate":   { leads: 150, answer: 55, job: 4500, ah: 40, close: 0.08, label: "Real-estate" },
    "home-services": { leads: 250, answer: 60, job: 680,  ah: 35, close: 0.25, label: "Home-services" },
    "med-spa":       { leads: 180, answer: 70, job: 350,  ah: 20, close: 0.50, label: "Med-spa" },
    "professional":  { leads: 80,  answer: 50, job: 3500, ah: 30, close: 0.15, label: "Professional-services" },
    // Law firms get their own key so the label reads "law-firm" rather than
    // "professional-services". Same close rate: qualified consult → engaged client.
    "legal":         { leads: 80,  answer: 50, job: 3500, ah: 45, close: 0.15, label: "Law-firm" },
    "dental":        { leads: 180, answer: 70, job: 350,  ah: 20, close: 0.50, label: "Dental / med-spa" },
  };

  const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const pct = (f) => Math.round(f * 100) + "%";

  function $(id) { return document.getElementById(id); }

  function getState() {
    const shell = document.querySelector(".roi-shell");
    const v = shell ? shell.dataset.vertical : "home-services";
    return {
      leads:    Math.max(0, parseInt($("roi-leads").value, 10) || 0),
      answer:   Math.max(0, Math.min(100, parseInt($("roi-answer").value, 10) || 0)),
      job:      Math.max(0, parseInt($("roi-job").value, 10) || 0),
      ah:       Math.max(0, Math.min(100, parseInt($("roi-afterhours").value, 10) || 0)),
      vertical: v,
      close:    (DEFAULTS[v] && DEFAULTS[v].close) || 0.25,
    };
  }

  function recompute() {
    const s = getState();
    const missed = s.leads * (1 - s.answer / 100);
    const jobs = missed * s.close;
    const lostMo = jobs * s.job;
    const lostYr = lostMo * 12;
    const ah = s.leads * (s.ah / 100);

    $("roi-lost-mo").textContent = fmt(lostMo);
    $("roi-lost-mo-2").textContent = fmt(lostMo);
    $("roi-lost-yr").textContent = fmt(lostYr);
    $("roi-missed").textContent = Math.round(missed).toLocaleString();
    $("roi-missed-calc").textContent = `= ${s.leads} × (100% − ${s.answer}%)`;
    $("roi-jobs").textContent = Math.round(jobs).toLocaleString();
    $("roi-job-calc").textContent = `= jobs × ${fmt(s.job)} avg ticket`;
    $("roi-ah").textContent = Math.round(ah).toLocaleString();

    const closeEl = $("roi-close-calc");
    if (closeEl) closeEl.textContent = `= missed × ${pct(s.close)} close rate`;
    const noteEl = $("roi-note");
    if (noteEl) {
      const labelNice = (DEFAULTS[s.vertical]?.label || "Home-services").toLowerCase();
      noteEl.textContent =
        `Close rate (${pct(s.close)}) is the typical answered-lead close rate for ${labelNice}. ` +
        `Swap in your own number if you track it.`;
    }

    const label = DEFAULTS[s.vertical]?.label || "Home-services";
    const msg =
      `Hi — I run a ${label.toLowerCase()} operation doing ~${s.leads} leads/mo with a ` +
      `${s.answer}% answer rate and ~$${s.job.toLocaleString()} avg ticket. ` +
      `Missed-call calc says we're leaving ~${fmt(lostMo)}/mo on the table — let's talk.`;
    const cta = $("roi-cta");
    if (cta) {
      cta.href = `/demo?prefill=${encodeURIComponent(msg)}`;
      cta.dataset.prefill = msg;
    }
  }

  function applyVertical(v) {
    const d = DEFAULTS[v];
    if (!d) return;
    document.querySelector(".roi-shell").dataset.vertical = v;
    $("roi-leads").value = d.leads;
    $("roi-answer").value = d.answer;
    $("roi-job").value = d.job;
    $("roi-afterhours").value = d.ah;
    document.querySelectorAll(".roi-vert-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.vert === v);
    });
    const sel = $("roi-vert");
    if (sel && sel.value !== v) sel.value = v;
    recompute();
  }

  function init() {
    if (!document.querySelector(".roi-shell")) return;
    ["roi-leads", "roi-answer", "roi-job", "roi-afterhours"].forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener("input", recompute);
    });
    document.querySelectorAll(".roi-vert-btn").forEach((btn) => {
      btn.addEventListener("click", () => applyVertical(btn.dataset.vert));
    });
    // Industry dropdown. Selecting one loads that vertical's non-zero
    // defaults so the calculator is never showing $0 on arrival.
    const sel = $("roi-vert");
    if (sel) {
      sel.addEventListener("change", () => applyVertical(sel.value));
      const shell = document.querySelector(".roi-shell");
      if (shell && shell.dataset.vertical) sel.value = shell.dataset.vertical;
    }

    const cta = $("roi-cta");
    if (cta) {
      cta.addEventListener("click", () => {
        const msg = cta.dataset.prefill;
        const mf = document.getElementById("fmessage");
        if (msg && mf && !mf.value) mf.value = msg;
      });
    }

    recompute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
