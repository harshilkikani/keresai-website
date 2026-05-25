/* =============================================================
   Keres AI — assistant widget
   Lightweight keyword-scored Q&A. Content stays in sync with the
   current site (no stale references). Defensive: no exceptions
   ever escape; if state is missing, the widget self-disables.
============================================================= */
(function () {
  'use strict';

  /* ─── Knowledge base ──────────────────────────────────────
     Each entry: { match: [keywords], answer: "..." }
     Answers should mirror the site's current claims exactly.
     Update both together. */
  const KB = [
    {
      match: ['what', 'keres', 'do', 'about', 'who', 'offer', 'company'],
      answer: 'Keres is an AI receptionist for septic, roofing, and HVAC shops. Our agents answer every inbound call and form, qualify the lead, and book the job — 24/7, in under 60 seconds. No more missed leads from slow response.'
    },
    {
      match: ['industries', 'industry', 'septic', 'roofing', 'hvac', 'towing', 'service', 'who', 'for'],
      answer: 'We build for field-service operators: septic, roofing, HVAC, and towing. The agent is configured around your specific intake flow, scheduling rules, and pricing logic — not a generic template.'
    },
    {
      match: ['long', 'fast', 'quick', 'timeline', 'weeks', 'deploy', 'launch', 'live', 'how long', 'time'],
      answer: 'A custom agent is scoped, built, and running within days. We start with a free 30-minute discovery call to map your workflow, then deploy.'
    },
    {
      match: ['integrations', 'integrate', 'stack', 'tools', 'crm', 'servicetitan', 'jobber', 'housecall', 'fieldedge', 'calendar', 'twilio', 'zapier', 'hubspot'],
      answer: 'We connect to the tools you already use — Twilio, Google Calendar, Zapier, ServiceTitan, Jobber, HubSpot, Housecall Pro, FieldEdge, RingCentral, Outlook, Make, and more. Two-way sync where the platform supports it; webhooks for the rest.'
    },
    {
      match: ['roi', 'return', 'save', 'savings', 'money', 'worth', 'results', 'impact', 'value', 'cost'],
      answer: 'Try the ROI calculator on this page — plug in your monthly leads, answer rate, average job value, and after-hours percentage. Most operators with a 60% answer rate and a typical ticket are leaving $10–30k a month on the table from missed leads alone.'
    },
    {
      match: ['agent', 'agents', 'work', 'how it works', 'process', 'what does it do'],
      answer: 'The agent answers calls and form submissions in your service area, asks the qualifying questions your best dispatcher would ask, then either books the job directly into your calendar or hands a fully qualified ticket to your human dispatcher.'
    },
    {
      match: ['technical', 'tech', 'developer', 'coding', 'engineer', 'setup', 'team', 'it'],
      answer: 'You do not need a technical team. We handle discovery, design, integration with your existing software, training, testing, and launch. Most of our pilot operators have zero in-house engineering.'
    },
    {
      match: ['security', 'data', 'privacy', 'safe', 'compliance', 'soc'],
      answer: 'Encryption in transit (TLS 1.2+) and at rest (AES-256). Least-privilege access, audit trail on every agent action, and SOC 2-aligned workflows by default. Data never trains third-party AI models. Full detail on our /legal/security page.'
    },
    {
      match: ['contact', 'reach', 'email', 'call', 'talk', 'book', 'schedule', 'demo', 'walkthrough'],
      answer: 'Easiest path is the booking form on this page — pick any time on the calendar. Or email ops@keresai.com directly. We reply within one business day.'
    },
    {
      match: ['guides', 'resources', 'playbook', 'learn', 'read', 'case study', 'how'],
      answer: 'There are nine in-depth guides on our Resources page covering septic intake, roofing growth, HVAC scaling, towing dispatch, ROI math, integration patterns, and more. Direct link in the main nav.'
    },
    {
      match: ['hello', 'hi', 'hey', 'greetings'],
      answer: 'Hi — ask anything about how Keres works, our integrations, security, or how to get started. I will route you to the right place.'
    },
    {
      match: ['thanks', 'thank', 'thx', 'appreciate'],
      answer: 'Anytime. If you would like to talk to a human, the booking form on this page sets up a free 30-minute call.'
    }
  ];

  const FALLBACK = 'I do not have a confident answer on that. The booking form on this page connects you with a real person in under a day — or email ops@keresai.com.';
  const GREETING = 'Hey — I am the Keres assistant. Ask about how the agent works, integrations, security, or how to get started.';

  /* ─── Match a user message to the best KB entry ───────── */
  function bestAnswer(text) {
    const q = text.toLowerCase();
    let best = null, bestScore = 0;
    for (const entry of KB) {
      let score = 0;
      for (const tag of entry.match) {
        if (q.includes(tag.toLowerCase())) score += tag.length;
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    // Require a meaningful match — short coincidental hits fall back
    return (best && bestScore >= 3) ? best.answer : FALLBACK;
  }

  /* ─── DOM init ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const btn       = document.getElementById('chat-btn');
    const box       = document.getElementById('chat-box');
    const closeBtn  = document.getElementById('chat-close');
    const form      = document.getElementById('chat-form');
    const input     = document.getElementById('chat-input');
    const msgs      = document.getElementById('chat-messages');
    const suggests  = document.querySelectorAll('.chat-suggest');
    const iconOpen  = btn ? btn.querySelector('.chat-icon-open')  : null;
    const iconClose = btn ? btn.querySelector('.chat-icon-close') : null;
    const badge     = document.getElementById('chat-badge');
    if (!btn || !box || !form || !input || !msgs) return; // widget not present — silent

    let isOpen = false;
    let greeted = false;

    const setOpen = (open) => {
      isOpen = open;
      btn.setAttribute('aria-expanded', String(open));
      box.setAttribute('data-open', String(open));
      if (iconOpen)  iconOpen.style.display  = open ? 'none'  : '';
      if (iconClose) iconClose.style.display = open ? '' : 'none';
      if (open && !greeted) { greeted = true; appendMessage('bot', GREETING); }
      if (open && badge) badge.classList.remove('show');
      if (open) setTimeout(() => input.focus(), 60);
    };

    btn.addEventListener('click', () => setOpen(!isOpen));
    if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) setOpen(false); });

    function appendMessage(who, text) {
      const wrap = document.createElement('div');
      wrap.className = 'chat-msg chat-msg-' + who;
      // Use textContent so injected user input cannot inject HTML (XSS-safe)
      wrap.textContent = text;
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function ask(question) {
      const trimmed = (question || '').trim();
      if (!trimmed) return;
      appendMessage('user', trimmed);
      input.value = '';
      // Tiny artificial delay so the answer doesn't snap in instantly
      setTimeout(() => appendMessage('bot', bestAnswer(trimmed)), 280);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      ask(input.value);
    });

    suggests.forEach(s => {
      s.addEventListener('click', () => {
        if (!isOpen) setOpen(true);
        ask(s.textContent || '');
      });
    });

    // Show subtle prompt badge 6s after first paint if user hasn't opened
    if (badge) setTimeout(() => { if (!isOpen) badge.classList.add('show'); }, 6000);
  });
})();
