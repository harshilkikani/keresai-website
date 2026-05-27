/* Keres generic calculator engine — vanilla JS, no deps.
 * One engine drives every vertical calculator. Each .calc-shell declares a
 * `data-calc-kind`; inputs carry `data-calc-field`, outputs carry
 * `data-calc-out`, and the step breakdown renders into `[data-calc-steps]`.
 *
 * Kinds + formulas (all disclosed in each page's on-screen note):
 *   missed-call : missed = leads × (1 − answer%); jobs = missed × close%;
 *                 lostMo = jobs × value;  lostYr = lostMo × 12
 *   no-show     : misses = appts × noshow%;  lostMo = misses × value;  ×12
 *   response-time (illustrative): recovered = leads × baseClose% × value ×
 *                 (1 − responseFactor(currentMinutes))
 */
(function () {
  const money = (n) => "$" + Math.round(Math.max(0, n)).toLocaleString("en-US");
  const num = (n) => Math.round(Math.max(0, n)).toLocaleString("en-US");
  const pct = (f) => Math.round(f * 100) + "%";

  // Stepped relative-conversion factor vs. a sub-5-minute response.
  function responseFactor(min) {
    if (min <= 5) return 1.0;
    if (min <= 10) return 0.6;
    if (min <= 30) return 0.35;
    if (min <= 60) return 0.2;
    return 0.1;
  }

  function fieldVal(shell, id, fallback) {
    const el = shell.querySelector(`[data-calc-field="${id}"]`);
    if (!el) return fallback;
    let v = parseFloat(el.value);
    if (isNaN(v)) v = fallback;
    const min = el.hasAttribute("min") ? parseFloat(el.min) : -Infinity;
    const max = el.hasAttribute("max") ? parseFloat(el.max) : Infinity;
    return Math.max(min, Math.min(max, v));
  }

  function setOut(shell, key, text) {
    shell.querySelectorAll(`[data-calc-out="${key}"]`).forEach((el) => {
      const changed = el.textContent !== text;
      el.textContent = text;
      // Pulse the headline figure when it actually changes, so the tool feels
      // responsive. Re-trigger the animation by toggling the class on reflow.
      if (changed && key === 'primary') {
        el.classList.remove('calc-bump');
        void el.offsetWidth; // force reflow so the animation restarts
        el.classList.add('calc-bump');
      }
    });
  }

  function renderSteps(shell, rows) {
    const wrap = shell.querySelector("[data-calc-steps]");
    if (!wrap) return;
    wrap.innerHTML = rows
      .map((r) =>
        r.muted
          ? `<div class="roi-math-row muted"><span>${r.label}</span><span></span></div>`
          : `<div class="roi-math-row"><span>${r.label}</span><span>${r.value}</span></div>`
      )
      .join("");
  }

  function compute(shell) {
    const kind = shell.dataset.calcKind;
    const close = parseFloat(shell.dataset.calcClose || "0.25");
    let primary = 0, secondary = 0, rows = [], summary = "";

    if (kind === "missed-call") {
      const leads = fieldVal(shell, "leads", 0);
      const answer = fieldVal(shell, "answer", 0);
      const value = fieldVal(shell, "value", 0);
      const missed = leads * (1 - answer / 100);
      const jobs = missed * close;
      primary = jobs * value;
      secondary = primary * 12;
      rows = [
        { label: "Missed leads / mo", value: num(missed) },
        { label: `= ${num(leads)} × (100% − ${Math.round(answer)}%)`, muted: true },
        { label: "Would-have-closed jobs", value: num(jobs) },
        { label: `= missed × ${pct(close)} close rate`, muted: true },
        { label: "Lost revenue", value: money(primary) },
        { label: `= jobs × ${money(value)} avg value`, muted: true },
      ];
      summary = `missing ~${num(missed)} calls/mo at a ${Math.round(answer)}% answer rate (~${money(primary)}/mo)`;
    } else if (kind === "no-show") {
      const appts = fieldVal(shell, "appts", 0);
      const noshow = fieldVal(shell, "noshow", 0);
      const value = fieldVal(shell, "value", 0);
      const misses = appts * (noshow / 100);
      primary = misses * value;
      secondary = primary * 12;
      rows = [
        { label: "No-shows / mo", value: num(misses) },
        { label: `= ${num(appts)} × ${Math.round(noshow)}%`, muted: true },
        { label: "Lost production", value: money(primary) },
        { label: `= no-shows × ${money(value)} per appt`, muted: true },
      ];
      summary = `losing ~${num(misses)} appointments/mo to no-shows (~${money(primary)}/mo)`;
    } else if (kind === "response-time") {
      const leads = fieldVal(shell, "leads", 0);
      const value = fieldVal(shell, "value", 0);
      const current = fieldVal(shell, "current", 0);
      const factor = responseFactor(current);
      const potential = leads * close * value; // captured if responding <5 min
      const capturedNow = potential * factor;
      primary = potential - capturedNow; // recoverable by responding fast
      secondary = primary * 12;
      rows = [
        { label: "Deals if you answer in <5 min", value: num(leads * close) },
        { label: `= ${num(leads)} × ${pct(close)} close rate`, muted: true },
        { label: "Relative conversion now", value: pct(factor) },
        { label: `= based on ~${Math.round(current)} min response`, muted: true },
        { label: "Recoverable revenue / mo", value: money(primary) },
        { label: `= potential − current capture`, muted: true },
      ];
      summary = `responding in ~${Math.round(current)} min and leaving ~${money(primary)}/mo on the table`;
    }

    setOut(shell, "primary", money(primary));
    setOut(shell, "secondary", money(secondary));
    renderSteps(shell, rows);

    const cta = shell.querySelector("[data-calc-cta]");
    if (cta) {
      const msg = `Hi — I ran the Keres calculator and it looks like we're ${summary}. Let's talk.`;
      cta.href = `/demo?prefill=${encodeURIComponent(msg)}`;
      cta.dataset.prefill = msg;
    }
  }

  function init() {
    const shells = document.querySelectorAll(".calc-shell");
    if (!shells.length) return;
    shells.forEach((shell) => {
      shell.querySelectorAll("[data-calc-field]").forEach((el) => {
        el.addEventListener("input", () => compute(shell));
      });
      const cta = shell.querySelector("[data-calc-cta]");
      if (cta) {
        cta.addEventListener("click", () => {
          const msg = cta.dataset.prefill;
          const mf = document.getElementById("fmessage");
          if (msg && mf && !mf.value) mf.value = msg;
        });
      }
      compute(shell);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
