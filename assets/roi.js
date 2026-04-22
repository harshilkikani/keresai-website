/* Keres ROI calculator — vanilla JS, no deps.
 * Same math model as the demo app's RoiCalculator.jsx. Methodology:
 *   missed = leads × (1 − answer_rate)
 *   recoverable_jobs = missed × 0.25   (IBISWorld 2024 home-services median
 *                                       answered-lead close rate)
 *   lost_revenue = recoverable_jobs × avg_job_value
 */
(function () {
  const DEFAULTS = {
    septic:  { leads: 200, answer: 60, job: 680,  ah: 35, label: "Septic" },
    roofing: { leads: 180, answer: 55, job: 8500, ah: 15, label: "Roofing" },
    hvac:    { leads: 320, answer: 65, job: 950,  ah: 25, label: "HVAC" },
  };
  const CLOSE_RATE = 0.25;

  const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");

  function $(id) { return document.getElementById(id); }

  function getState() {
    return {
      leads:  Math.max(0, parseInt($("roi-leads").value, 10) || 0),
      answer: Math.max(0, Math.min(100, parseInt($("roi-answer").value, 10) || 0)),
      job:    Math.max(0, parseInt($("roi-job").value, 10) || 0),
      ah:     Math.max(0, Math.min(100, parseInt($("roi-afterhours").value, 10) || 0)),
      vertical: document.querySelector(".roi-shell").dataset.vertical,
    };
  }

  function recompute() {
    const s = getState();
    const missed = s.leads * (1 - s.answer / 100);
    const jobs = missed * CLOSE_RATE;
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

    // CTA — prefill a message we can relay via the Calendly/contact link.
    const label = DEFAULTS[s.vertical]?.label || "Home-services";
    const msg =
      `Hi — I run a ${label} shop doing ~${s.leads} leads/mo with a ` +
      `${s.answer}% answer rate and ~$${s.job.toLocaleString()} avg job. ` +
      `ROI calc says we're leaving ~${fmt(lostMo)}/mo on the table — let's talk.`;
    const cta = $("roi-cta");
    if (cta) {
      // Keep anchor to #contact as a fallback; ?prefill hash kept for the form to
      // pick up if we ever wire it up.
      cta.href = `#contact?prefill=${encodeURIComponent(msg)}`;
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

    // Carry the prefilled note into the contact form's message field when the
    // user clicks the ROI CTA and lands at #contact.
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
