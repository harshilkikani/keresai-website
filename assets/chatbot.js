/* =============================================================
   Chatbot widget — keyword-scored knowledge base, i18n-ready
============================================================= */
(function () {
  'use strict';

  const KB = [
    { tags: ['what','keres','company','about','who','does','do','offer'],
      answer: "Keres is an AI receptionist for septic, roofing, and HVAC shops. We answer every inbound call, qualify the lead, and book the job — 24/7, under 60 seconds. We're onboarding Q2 2026 pilot customers now." },
    { tags: ['agents','agent','services','types','build','make','kind','what','solutions'],
      answer: "We build six core agent types:\n\n📧 Email & Support Agent\n📊 Reporting Agent\n🎯 Lead Qualification Agent\n📄 Document Processing Agent\n📅 Scheduling Agent\n🛠️ Custom Workflow Agent\n\nEach is built from scratch around your exact process." },
    { tags: ['email','support','ticket','inbox','customer','helpdesk'],
      answer: "Our Email & Support Agent reads every inbound message, categorises it, and responds automatically — cutting response times from hours to seconds. Works with Gmail, Outlook, Zendesk, Freshdesk, Intercom, and more." },
    { tags: ['report','reporting','data','analytics','insights','dashboard'],
      answer: "Our Reporting Agent pulls from your tools — spreadsheets, CRMs, ad platforms, databases — and delivers clean, formatted reports on schedule. No analyst, no manual work, no delays." },
    { tags: ['lead','leads','sales','qualify','crm','pipeline','scoring','outreach'],
      answer: "Our Lead Qualification Agent scores inbound leads, enriches their profiles, and routes only high-quality ones to your sales team — so reps spend time on deals that actually close." },
    { tags: ['document','documents','pdf','invoice','contract','paperwork','extraction','ocr'],
      answer: "Our Document Processing Agent extracts, validates, and files data from invoices, contracts, and PDFs — ending manual data entry and copy-paste drudgery." },
    { tags: ['meeting','calendar','schedule','booking','appointment','calendly'],
      answer: "Our Scheduling Agent coordinates availability, books meetings, sends reminders, and handles rescheduling through natural conversation." },
    { tags: ['custom','bespoke','unique','specific','tailored','build','special'],
      answer: "Every agent is 100% custom-built. If you have a unique process, we design an agent around your exact workflow — no templates, no off-the-shelf software." },
    { tags: ['long','timeline','weeks','deploy','launch','fast','quick','duration'],
      answer: "Most agents are scoped, built, tested, and live within 2–4 weeks depending on complexity. We handle everything — there's no bottleneck on your side." },
    { tags: ['price','pricing','cost','much','fee','charge','expensive','budget','packages','tiers'],
      answer: "Three flat monthly tiers — no per-minute, no per-seat:\n\n• Starter — $800/mo (<200 leads)\n• Growth — $1,800/mo (200–800 leads)\n• Scale — $3,500/mo (800+ leads)\n\nPhone and SMS pass through at carrier cost. 30-day pilot, cancel anytime with 30 days notice." },
    { tags: ['roi','return','save','saving','money','worth','results','impact','value'],
      answer: "Run your own numbers in the ROI calculator on this page — most septic/HVAC shops with a 60% answer rate and ~$700 avg ticket are leaving $10–30k/mo on the table from missed leads alone. Pilot-verified case studies publish Q3 2026." },
    { tags: ['technical','tech','developer','coding','team','setup','engineer','it'],
      answer: "No technical team needed. We handle scoping, building, testing, deploying, and integrating with your existing stack — you just tell us what's slowing you down." },
    { tags: ['tools','integrate','integration','slack','gmail','hubspot','salesforce','zapier','notion','airtable','sheets','stack'],
      answer: "We integrate with Gmail, Outlook, Slack, HubSpot, Salesforce, Notion, Airtable, Google Sheets, Zapier, Make, and many more. If you use it, chances are we can connect to it." },
    { tags: ['security','privacy','data','hipaa','soc','compliance','gdpr','safe','encryption'],
      answer: "Security is non-negotiable. We sign DPAs, respect your data residency, and can build to SOC 2 / HIPAA / GDPR-aligned workflows. Your data never trains third-party models." },
    { tags: ['book','call','meeting','schedule','calendly','discovery','talk','speak','chat'],
      answer: "Book a free 30-minute discovery call using the calendar on this page — scroll to 'Let's Connect' and pick a date. No cost, no commitment. Or go directly to calendly.com/ops-keresai/30min" },
    { tags: ['contact','message','reach','touch','form','send','email'],
      answer: "Use the contact form on this page — scroll to 'Let's Connect'. We respond within 24 hours. Or book a call right there using the calendar." },
    { tags: ['clients','projects','deployed','experience','record','portfolio','references'],
      answer: "We're early. A handful of paid pilots are running today across septic, roofing, and HVAC — we'll publish named case studies in Q3 2026 after pilots complete a full season. Ask us on a call for live references." },
    { tags: ['usa','america','location','where','based','country','remote','global'],
      answer: "Keres AI is based in the USA, serving businesses nationwide and globally. We work fully remotely with clients across the world." },
    { tags: ['industry','industries','niche','sector','healthcare','finance','real','estate','ecommerce','legal','saas','logistics'],
      answer: "We've worked across healthcare, fintech, real estate, e-commerce, legal, SaaS, logistics, and professional services. Our agents adapt to your industry's specifics — compliance, jargon, tools." },
    { tags: ['why','different','competitor','versus','compare','choose','better'],
      answer: "We're focused on 3 verticals — septic, roofing, HVAC — not a generic 'AI for every business'. Scripts, qualification rules, and integrations are tuned to your industry. And pricing is flat monthly, not per-minute — so a busy Tuesday doesn't punish you." },
    { tags: ['hi','hello','hey','morning','afternoon','greetings','hola','bonjour','hallo'],
      answer: "Hey there! 👋 I'm the Keres AI assistant. Ask me anything about what we do, our agents, pricing, timelines, or how to get started!" },
    { tags: ['thanks','thank','cheers','appreciate','helpful','gracias','merci','danke','obrigado'],
      answer: "You're very welcome! 😊 If you have more questions or want to explore what an AI agent could do for you, just ask — or book a free call on this page." }
  ];

  const FALLBACK = "Great question! I don't have a specific answer for that, but our team would love to help. Use the contact form on this page or book a free discovery call — we respond within 24 hours. 🙌";

  function ragAnswer(query) {
    const q = query.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, ' ');
    const words = q.split(/\s+/).filter(Boolean);
    let best = 0, answer = null;
    for (const entry of KB) {
      let score = 0;
      for (const w of words) {
        for (const tag of entry.tags) {
          if (tag === w || w.includes(tag) || tag.includes(w)) { score++; break; }
        }
      }
      if (score > best) { best = score; answer = entry.answer; }
    }
    return best > 0 ? answer : FALLBACK;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.getElementById('chat-btn');
    const box   = document.getElementById('chat-box');
    const msgs  = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const send  = document.getElementById('chat-send');
    const close = document.getElementById('chat-close');
    const badge = document.getElementById('chat-badge');
    if (!btn || !box) return;

    let open = false, greeted = false;
    const t = (k) => (window.KeresI18n ? window.KeresI18n.t(k) : k);

    function addMessage(role, text) {
      const wrap = document.createElement('div');
      wrap.className = `cm-wrap cm-${role}`;
      const b = document.createElement('div');
      b.className = 'cm-bubble';
      b.textContent = text;
      wrap.appendChild(b);
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    }
    function addTyping() {
      const wrap = document.createElement('div');
      wrap.className = 'cm-wrap cm-bot';
      wrap.id = 'cm-typing';
      wrap.innerHTML = '<div class="cm-bubble cm-typing"><span></span><span></span><span></span></div>';
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
      return wrap;
    }
    function toggle() {
      open = !open;
      box.setAttribute('data-open', open);
      btn.setAttribute('aria-expanded', open);
      badge.classList.remove('show');
      if (open && !greeted) {
        greeted = true;
        setTimeout(() => addMessage('bot', t('chat.greeting')), 300);
      }
      if (open) setTimeout(() => input.focus(), 150);
    }
    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      addMessage('user', text);
      const typing = addTyping();
      setTimeout(() => {
        typing.remove();
        addMessage('bot', ragAnswer(text));
      }, 500 + Math.random() * 500);
    }

    btn.addEventListener('click', toggle);
    close.addEventListener('click', toggle);
    send.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) toggle(); });

    document.querySelectorAll('.chat-suggestion').forEach(el => {
      el.addEventListener('click', () => {
        if (!open) { toggle(); setTimeout(() => { input.value = el.textContent; sendMessage(); }, 400); }
        else { input.value = el.textContent; sendMessage(); }
      });
    });

    // Show badge 4s after load if chat is still closed
    setTimeout(() => { if (!open) badge.classList.add('show'); }, 4000);
  });
})();
