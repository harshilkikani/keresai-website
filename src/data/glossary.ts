// Data-driven glossary. Add an entry → a new /glossary/{slug} page builds.
// Each term leads with a 40–60 word direct-answer `definition` (the AI-citation
// payload) followed by deeper sections. Keep definitions factual and quotable.
export interface GlossarySection {
  h2: string;
  body: string; // may contain inline <a>/<strong> HTML
}
export interface GlossaryTerm {
  slug: string;
  term: string; // canonical display name
  aka?: string[]; // synonyms surfaced in copy
  category: 'AI Receptionist' | 'AI SDR & Outbound' | 'Email Deliverability';
  targetKeyword: string;
  title: string;
  description: string;
  definition: string; // 40–60 word direct answer, first paragraph
  sections: GlossarySection[];
  related: string[]; // other glossary slugs
  faqs: { q: string; a: string }[];
  cta?: { href: string; label: string }; // product page this term feeds
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'ai-receptionist',
    term: 'AI Receptionist',
    aka: ['AI virtual receptionist', 'AI phone agent'],
    category: 'AI Receptionist',
    targetKeyword: 'what is an ai receptionist',
    title: 'What Is an AI Receptionist? Definition & How It Works | Keres AI',
    description:
      'An AI receptionist answers business calls 24/7, qualifies callers, and books appointments automatically. Learn how it works, how it differs from an answering service, and what it costs.',
    definition:
      'An AI receptionist is software that answers your business phone automatically, 24/7. It greets callers in a natural voice, answers questions, qualifies the lead, books or reschedules appointments on your calendar, and sends your team a summary — so no call goes to voicemail and no lead is lost, even after hours.',
    sections: [
      {
        h2: 'How an AI receptionist works',
        body:
          'You point your existing business number at the AI. When a call comes in, the AI answers within two rings, follows the call flows you configure, and acts on what the caller needs — checking calendar availability, booking the appointment, capturing contact details, and escalating emergencies to a human by text. Everything is logged to your CRM automatically.',
      },
      {
        h2: 'AI receptionist vs. answering service vs. voicemail',
        body:
          'Voicemail captures a message and hopes you call back. A traditional <a href="/glossary/ai-answering-service">answering service</a> uses human operators who usually just take a message — and bill per minute. An AI receptionist actually <strong>completes the task</strong>: it books the appointment during the call, works 24/7 at a flat rate, and never puts a caller on hold.',
      },
      {
        h2: 'What businesses use AI receptionists',
        body:
          'Any business that lives on the phone: <a href="/ai-receptionist-for-hvac">HVAC</a> and <a href="/ai-receptionist-for-plumbers">plumbing</a> contractors, <a href="/ai-receptionist-for-dentists">dental practices</a>, <a href="/ai-receptionist-for-med-spas">med spas</a>, <a href="/ai-receptionist-for-real-estate">real estate teams</a>, and <a href="/ai-receptionist-for-professional-intake">law firms</a> — wherever a missed call is a lost customer.',
      },
    ],
    related: ['ai-answering-service', 'virtual-receptionist', 'appointment-booking-automation', 'missed-call-text-back'],
    faqs: [
      { q: 'How is an AI receptionist different from an answering service?', a: 'A traditional answering service takes a message; an AI receptionist completes the task — it books the appointment during the call, works 24/7 at a flat rate, and syncs everything to your calendar and CRM.' },
      { q: 'Can an AI receptionist book appointments?', a: 'Yes. It checks real-time calendar availability, books and reschedules during the call, and texts the caller a confirmation.' },
      { q: 'Does an AI receptionist sound human?', a: 'Modern AI receptionists use natural-sounding voices, understand interruptions, and hold a real conversation rather than reading a rigid menu.' },
    ],
    cta: { href: '/ai-receptionist', label: 'See the Keres AI receptionist' },
  },
  {
    slug: 'ai-answering-service',
    term: 'AI Answering Service',
    aka: ['automated answering service', 'virtual answering service'],
    category: 'AI Receptionist',
    targetKeyword: 'what is an ai answering service',
    title: 'What Is an AI Answering Service? Definition & Benefits | Keres AI',
    description:
      'An AI answering service answers and handles business calls automatically at a flat rate — booking appointments and capturing leads 24/7 instead of just taking messages.',
    definition:
      'An AI answering service is an automated phone-answering solution that handles inbound calls 24/7 without human operators. Unlike a traditional answering service that charges per minute to take messages, an AI answering service books appointments, answers common questions, qualifies leads, and routes urgent calls — usually at a predictable flat monthly rate.',
    sections: [
      {
        h2: 'Why businesses switch from per-minute answering services',
        body:
          'Per-minute human answering services get expensive fast during busy seasons, and most just take a message you still have to act on. An AI answering service flips that: flat-rate pricing, unlimited simultaneous calls, and completed bookings instead of callback slips.',
      },
      {
        h2: 'What an AI answering service can do',
        body:
          'Answer every call in two rings, qualify the caller, book and reschedule on your calendar, capture lead details to your CRM, filter spam, and text your on-call team the moment something is an emergency — day or night.',
      },
    ],
    related: ['ai-receptionist', 'virtual-receptionist', 'call-overflow', 'appointment-booking-automation'],
    faqs: [
      { q: 'Is an AI answering service cheaper than a human one?', a: 'Usually yes — AI answering services charge a flat monthly rate rather than per minute, which is far more predictable for high-volume or seasonal businesses.' },
      { q: 'Does it work after hours?', a: 'Yes — it answers 24/7, including nights, weekends, and holidays, with no extra after-hours fees.' },
    ],
    cta: { href: '/ai-answering-service', label: 'See the Keres AI answering service' },
  },
  {
    slug: 'virtual-receptionist',
    term: 'Virtual Receptionist',
    category: 'AI Receptionist',
    targetKeyword: 'what is a virtual receptionist',
    title: 'What Is a Virtual Receptionist? Definition + AI Options | Keres AI',
    description:
      'A virtual receptionist answers and manages business calls remotely. Learn the difference between human virtual receptionists and AI receptionists, and which fits your business.',
    definition:
      'A virtual receptionist is a remote service — staffed by people or powered by AI — that answers your business calls, greets callers, schedules appointments, and routes messages without sitting at your physical front desk. AI virtual receptionists do this automatically, 24/7, while human ones operate during staffed hours and typically bill per call or per minute.',
    sections: [
      {
        h2: 'Human vs. AI virtual receptionists',
        body:
          'Human virtual receptionists offer a personal touch but cost more, have limited hours, and can only take one call at a time. An <a href="/glossary/ai-receptionist">AI receptionist</a> answers unlimited calls simultaneously, never sleeps, and completes bookings at a flat rate — making it a strong fit for businesses with spiky or after-hours call volume.',
      },
    ],
    related: ['ai-receptionist', 'ai-answering-service', 'call-overflow'],
    faqs: [
      { q: 'Is an AI receptionist a type of virtual receptionist?', a: 'Yes — an AI receptionist is a virtual receptionist powered by AI instead of human operators, so it works 24/7 and handles unlimited concurrent calls.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Compare with Keres AI' },
  },
  {
    slug: 'missed-call-text-back',
    term: 'Missed-Call Text-Back',
    aka: ['missed call automation'],
    category: 'AI Receptionist',
    targetKeyword: 'what is missed call text back',
    title: 'What Is Missed-Call Text-Back? How It Works | Keres AI',
    description:
      'Missed-call text-back automatically sends a text to any caller you miss, so the lead never goes cold. Learn how it works and why it recovers revenue.',
    definition:
      'Missed-call text-back is an automation that instantly sends a text message to any caller whose call you miss. Instead of losing the lead to voicemail or a competitor, the caller gets an immediate reply offering to help, book, or call back — keeping the conversation alive and recovering revenue that would otherwise walk.',
    sections: [
      {
        h2: 'Why missed calls cost you money',
        body:
          'Most callers who hit voicemail never leave a message — they dial the next business. Use the <a href="/missed-call-calculator">missed-call revenue calculator</a> to estimate what that costs you each month. A full <a href="/glossary/ai-receptionist">AI receptionist</a> goes one step further by answering the call live instead of texting after the fact.',
      },
    ],
    related: ['ai-receptionist', 'call-overflow', 'lead-qualification'],
    faqs: [
      { q: 'Is missed-call text-back the same as an AI receptionist?', a: 'No — text-back reacts after a call is missed, while an AI receptionist answers the call live and books the appointment in the moment. Many businesses use both.' },
    ],
    cta: { href: '/missed-call-calculator', label: 'Calculate your missed-call losses' },
  },
  {
    slug: 'call-overflow',
    term: 'Call Overflow Handling',
    aka: ['overflow answering', 'call spillover'],
    category: 'AI Receptionist',
    targetKeyword: 'what is call overflow handling',
    title: 'What Is Call Overflow Handling? Definition & Examples | Keres AI',
    description:
      'Call overflow handling routes calls your team can’t answer to a backup that picks up instantly. Learn how AI overflow keeps every caller from hitting voicemail.',
    definition:
      'Call overflow handling routes calls that your team can’t pick up — because the lines are busy or staff are unavailable — to a backup that answers immediately. With an AI receptionist as overflow, every spillover call is answered in two rings and booked, instead of ringing out to voicemail during your busiest moments.',
    sections: [
      {
        h2: 'When overflow matters most',
        body:
          'Peak seasons, marketing pushes, and emergencies create call spikes your front desk can’t absorb. AI overflow answers unlimited simultaneous calls, so a heat wave or a viral ad never sends callers to voicemail.',
      },
    ],
    related: ['ai-receptionist', 'ai-answering-service', 'missed-call-text-back'],
    faqs: [
      { q: 'How does AI call overflow work?', a: 'Calls your team doesn’t answer within a set number of rings forward to the AI, which picks up instantly, helps the caller, and books or routes as needed.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Add AI overflow coverage' },
  },
  {
    slug: 'appointment-booking-automation',
    term: 'Appointment Booking Automation',
    aka: ['automated scheduling', 'appointment automation'],
    category: 'AI Receptionist',
    targetKeyword: 'what is appointment booking automation',
    title: 'What Is Appointment Booking Automation? | Keres AI',
    description:
      'Appointment booking automation lets software schedule, confirm, and reschedule appointments without manual back-and-forth. Learn how AI books directly on your calendar.',
    definition:
      'Appointment booking automation uses software to schedule, confirm, and reschedule appointments without manual back-and-forth. An AI agent checks real-time calendar availability, books the slot during the call or chat, syncs it to your calendar and CRM, and sends the customer an automatic confirmation and reminder — eliminating phone tag and no-shows.',
    sections: [
      {
        h2: 'How AI booking reduces no-shows',
        body:
          'Automated confirmations and reminders sent by text dramatically cut no-shows, and instant rescheduling means a cancellation gets refilled instead of lost. The AI books straight onto Google Calendar, Outlook, or your field-service software.',
      },
    ],
    related: ['ai-receptionist', 'ai-answering-service', 'lead-qualification'],
    faqs: [
      { q: 'What calendars does AI appointment booking work with?', a: 'Keres books directly on Google Calendar, Outlook/Microsoft 365, and field-service platforms like ServiceTitan, Jobber, and Housecall Pro.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Automate your bookings' },
  },
  {
    slug: 'lead-qualification',
    term: 'Lead Qualification',
    category: 'AI Receptionist',
    targetKeyword: 'what is lead qualification',
    title: 'What Is Lead Qualification? How AI Does It | Keres AI',
    description:
      'Lead qualification is the process of determining whether a prospect is a good fit. Learn how AI qualifies leads on every call so your team only talks to real opportunities.',
    definition:
      'Lead qualification is the process of determining whether a prospect is a genuine, ready-to-buy opportunity worth your team’s time. It captures details like budget, timeline, location, and intent, then scores or routes the lead accordingly. AI qualifies leads on every inbound call automatically — asking the right questions and booking only the prospects that fit.',
    sections: [
      {
        h2: 'How AI qualifies leads on the phone',
        body:
          'The AI asks the qualifying questions you define — service needed, location, urgency, budget — captures the answers, and either books the appointment or routes the lead to the right person. Your team stops wasting time on tire-kickers and spam.',
      },
    ],
    related: ['ai-receptionist', 'ai-sdr', 'appointment-booking-automation'],
    faqs: [
      { q: 'Can AI qualify leads as well as a human?', a: 'For structured qualification — capturing budget, timeline, location, and intent against your criteria — AI is consistent and never skips a question, then escalates judgment calls to your team.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Qualify every caller automatically' },
  },
  {
    slug: 'ai-sdr',
    term: 'AI SDR',
    aka: ['AI sales development rep', 'AI outbound agent'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is an ai sdr',
    title: 'What Is an AI SDR? Definition & How It Books Meetings | Keres AI',
    description:
      'An AI SDR automates outbound sales development — building and sending personalized email sequences, handling replies, and booking meetings without hiring a human rep.',
    definition:
      'An AI SDR (sales development representative) is software that automates outbound prospecting: it builds and sends personalized cold-email sequences, manages inbox warmup and deliverability, replies to interested prospects, and books qualified meetings straight onto your calendar — doing the work of a human sales development rep without the headcount.',
    sections: [
      {
        h2: 'What an AI SDR automates',
        body:
          'Targeting and list building, AI-personalized copy per prospect, multi-step <a href="/glossary/email-sequence">sequences</a> with follow-up, <a href="/glossary/email-deliverability">deliverability</a> management, reply handling, and meeting booking — the entire top-of-funnel motion that used to require a team of reps.',
      },
      {
        h2: 'AI SDR vs. human SDR',
        body:
          'A human SDR sends a few dozen personalized emails a day; an AI SDR personalizes at scale across thousands of prospects, never forgets a follow-up, and works around the clock — while your team focuses on closing the meetings it books.',
      },
    ],
    related: ['cold-email-outreach', 'email-sequence', 'email-deliverability', 'lead-qualification'],
    faqs: [
      { q: 'Does an AI SDR replace human salespeople?', a: 'It replaces the repetitive top-of-funnel work — prospecting, sending, follow-up, and booking — so your human closers spend their time in meetings, not in a sequencing tool.' },
      { q: 'How does an AI SDR avoid the spam folder?', a: 'It manages SPF, DKIM, DMARC, inbox warmup, and sending-volume ramp so messages land in the primary inbox.' },
    ],
    cta: { href: '/ai-sdr', label: 'See the Keres AI SDR' },
  },
  {
    slug: 'cold-email-outreach',
    term: 'Cold Email Outreach',
    aka: ['cold emailing', 'outbound email'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is cold email outreach',
    title: 'What Is Cold Email Outreach? Best Practices | Keres AI',
    description:
      'Cold email outreach is sending unsolicited but relevant emails to prospects to start a sales conversation. Learn how to do it without landing in spam.',
    definition:
      'Cold email outreach is the practice of emailing prospects you have no prior relationship with to start a sales conversation. Done well, it is targeted, personalized, and compliant — reaching the right people with a relevant message. Success depends on list quality, personalization, and <a href="/glossary/email-deliverability">deliverability</a>, so messages actually reach the inbox.',
    sections: [
      {
        h2: 'What makes cold email work',
        body:
          'Tight targeting, genuine personalization, a clear and short ask, disciplined <a href="/glossary/email-sequence">follow-up</a>, and strong sender reputation. Volume without deliverability just fills spam folders.',
      },
    ],
    related: ['ai-sdr', 'email-sequence', 'email-deliverability', 'inbox-warmup'],
    faqs: [
      { q: 'Is cold email legal?', a: 'In the US, cold email is legal under CAN-SPAM when you use accurate headers, identify yourself, and offer an easy opt-out. Other regions (e.g. GDPR) have stricter consent rules.' },
    ],
    cta: { href: '/ai-sdr', label: 'Automate cold outreach' },
  },
  {
    slug: 'email-sequence',
    term: 'Email Sequence',
    aka: ['email cadence', 'drip sequence'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is an email sequence',
    title: 'What Is an Email Sequence? Definition & Examples | Keres AI',
    description:
      'An email sequence is a series of automated, scheduled emails sent to a prospect over time. Learn how multi-step sequences drive replies and booked meetings.',
    definition:
      'An email sequence (or cadence) is a series of automated emails sent to a prospect on a schedule — typically an opener followed by several spaced follow-ups. Because most replies come from follow-ups rather than the first email, sequences dramatically increase response rates by staying persistent without manual effort.',
    sections: [
      {
        h2: 'Why follow-ups matter',
        body:
          'A single email is easy to miss; a well-spaced sequence keeps you visible without being pushy. An <a href="/glossary/ai-sdr">AI SDR</a> personalizes each step and stops the sequence automatically the moment a prospect replies or books.',
      },
    ],
    related: ['ai-sdr', 'cold-email-outreach', 'email-deliverability'],
    faqs: [
      { q: 'How many emails should a sequence have?', a: 'Most effective B2B sequences run 4–6 touches spaced several days apart, stopping immediately when the prospect responds.' },
    ],
    cta: { href: '/ai-sdr', label: 'Run AI-personalized sequences' },
  },
  {
    slug: 'email-deliverability',
    term: 'Email Deliverability',
    category: 'Email Deliverability',
    targetKeyword: 'what is email deliverability',
    title: 'What Is Email Deliverability? How to Reach the Inbox | Keres AI',
    description:
      'Email deliverability is whether your emails reach the inbox instead of spam. Learn the factors that control it — authentication, reputation, and warmup.',
    definition:
      'Email deliverability is the measure of whether your emails actually reach recipients’ primary inboxes rather than the spam folder or being blocked. It depends on authentication (<a href="/glossary/spf">SPF</a>, <a href="/glossary/dkim">DKIM</a>, <a href="/glossary/dmarc">DMARC</a>), sender reputation, list quality, content, and sending behavior like <a href="/glossary/inbox-warmup">inbox warmup</a> and volume ramp.',
    sections: [
      {
        h2: 'The main factors that control deliverability',
        body:
          'Authentication records prove you are who you say you are. Sender reputation reflects past behavior. Engagement (opens, replies, low complaints) tells mailbox providers your mail is wanted. <a href="/glossary/inbox-warmup">Warmup</a> and gradual volume increases build that reputation safely.',
      },
      {
        h2: 'How to improve deliverability',
        body:
          'Set up SPF, DKIM, and DMARC correctly; warm up new inboxes; ramp volume gradually; keep lists clean; and monitor your <a href="/glossary/spam-score">spam score</a> and reputation. Keres manages all of this for outbound automatically.',
      },
    ],
    related: ['spf', 'dkim', 'dmarc', 'inbox-warmup', 'spam-score'],
    faqs: [
      { q: 'Why are my emails going to spam?', a: 'The usual causes are missing or misconfigured SPF/DKIM/DMARC, a cold sending domain with no warmup, poor list hygiene, spammy content, or sending too much volume too fast.' },
      { q: 'What is a good deliverability rate?', a: 'For healthy outbound, you want the large majority of mail landing in the primary inbox; inbox-placement testing matters more than raw "delivered" rates, which include spam-folder delivery.' },
    ],
    cta: { href: '/email-deliverability', label: 'Fix your deliverability' },
  },
  {
    slug: 'spf',
    term: 'SPF (Sender Policy Framework)',
    aka: ['SPF record'],
    category: 'Email Deliverability',
    targetKeyword: 'what is an spf record',
    title: 'What Is an SPF Record? Email Authentication Explained | Keres AI',
    description:
      'SPF (Sender Policy Framework) is a DNS record that lists which servers may send email for your domain. Learn how it works and why it matters for deliverability.',
    definition:
      'SPF (Sender Policy Framework) is a DNS record that specifies which mail servers are authorized to send email on behalf of your domain. When a receiving server gets your message, it checks the sending server against your SPF record to help verify the mail is legitimate — a core defense against spoofing and a key factor in <a href="/glossary/email-deliverability">deliverability</a>.',
    sections: [
      {
        h2: 'How SPF works',
        body:
          'You publish a TXT record in DNS listing approved senders. Receiving servers compare the message’s sending IP against that list and pass or fail SPF accordingly. SPF works best alongside <a href="/glossary/dkim">DKIM</a> and <a href="/glossary/dmarc">DMARC</a>.',
      },
    ],
    related: ['dkim', 'dmarc', 'email-deliverability', 'inbox-warmup'],
    faqs: [
      { q: 'Is SPF enough on its own?', a: 'No. SPF is necessary but not sufficient — you also need DKIM and DMARC for full authentication and the best deliverability.' },
    ],
    cta: { href: '/email-deliverability', label: 'Get authentication set up for you' },
  },
  {
    slug: 'dkim',
    term: 'DKIM (DomainKeys Identified Mail)',
    aka: ['DKIM signature'],
    category: 'Email Deliverability',
    targetKeyword: 'what is dkim',
    title: 'What Is DKIM? DomainKeys Identified Mail Explained | Keres AI',
    description:
      'DKIM adds a cryptographic signature to your emails so receivers can verify they weren’t altered and really came from your domain. Learn how it works.',
    definition:
      'DKIM (DomainKeys Identified Mail) is an email-authentication method that adds a cryptographic signature to every message you send. The receiving server uses a public key published in your DNS to verify the message genuinely came from your domain and wasn’t tampered with in transit — strengthening trust and <a href="/glossary/email-deliverability">deliverability</a>.',
    sections: [
      {
        h2: 'How DKIM works',
        body:
          'Your sending server signs each message with a private key; the matching public key lives in your DNS. Receivers check the signature to confirm authenticity and integrity. DKIM pairs with <a href="/glossary/spf">SPF</a> and is required for <a href="/glossary/dmarc">DMARC</a> alignment.',
      },
    ],
    related: ['spf', 'dmarc', 'email-deliverability'],
    faqs: [
      { q: 'What’s the difference between SPF and DKIM?', a: 'SPF authorizes which servers may send for your domain; DKIM cryptographically proves the message wasn’t altered and came from you. DMARC ties them together.' },
    ],
    cta: { href: '/email-deliverability', label: 'Get DKIM configured for you' },
  },
  {
    slug: 'dmarc',
    term: 'DMARC',
    aka: ['DMARC policy', 'Domain-based Message Authentication'],
    category: 'Email Deliverability',
    targetKeyword: 'what is dmarc',
    title: 'What Is DMARC? Email Authentication Policy Explained | Keres AI',
    description:
      'DMARC tells receiving servers what to do when an email fails SPF and DKIM, and reports who is sending as your domain. Learn how it protects your domain and inbox placement.',
    definition:
      'DMARC (Domain-based Message Authentication, Reporting & Conformance) is a DNS policy that builds on <a href="/glossary/spf">SPF</a> and <a href="/glossary/dkim">DKIM</a>. It tells receiving servers what to do with mail that fails authentication — monitor, quarantine, or reject — and sends you reports on who is sending email using your domain, protecting you from spoofing and improving inbox placement.',
    sections: [
      {
        h2: 'DMARC policies explained',
        body:
          'A DMARC record sets a policy of <strong>none</strong> (monitor only), <strong>quarantine</strong> (send to spam), or <strong>reject</strong> (block). Most senders start at none to gather reports, then tighten to quarantine or reject once SPF and DKIM are aligned.',
      },
    ],
    related: ['spf', 'dkim', 'email-deliverability'],
    faqs: [
      { q: 'Do I need DMARC to send cold email?', a: 'Increasingly, yes — major providers like Google and Yahoo now require SPF, DKIM, and DMARC for bulk senders, and proper DMARC improves trust and inbox placement.' },
    ],
    cta: { href: '/email-deliverability', label: 'Get DMARC set up for you' },
  },
  {
    slug: 'inbox-warmup',
    term: 'Inbox Warmup',
    aka: ['email warmup', 'domain warmup'],
    category: 'Email Deliverability',
    targetKeyword: 'what is inbox warmup',
    title: 'What Is Inbox Warmup? Email Warmup Explained | Keres AI',
    description:
      'Inbox warmup gradually builds a new email account’s sending reputation by ramping volume and engagement, so your outbound lands in the inbox instead of spam.',
    definition:
      'Inbox warmup is the process of gradually building a new email account’s or domain’s sending reputation before running outbound at scale. It starts with low daily volume and steadily increases it while generating positive engagement (opens and replies), signaling to mailbox providers that you’re a legitimate sender — so your <a href="/glossary/cold-email-outreach">cold email</a> reaches the inbox.',
    sections: [
      {
        h2: 'Why warmup is essential',
        body:
          'A brand-new inbox that suddenly sends hundreds of emails looks like spam and gets filtered. Warmup builds trust slowly over days and weeks. Combined with <a href="/glossary/spf">SPF</a>, <a href="/glossary/dkim">DKIM</a>, and <a href="/glossary/dmarc">DMARC</a>, it’s the foundation of <a href="/glossary/email-deliverability">deliverability</a>.',
      },
    ],
    related: ['email-deliverability', 'spf', 'dkim', 'dmarc', 'spam-score'],
    faqs: [
      { q: 'How long does inbox warmup take?', a: 'Typically two to four weeks to reach safe sending volume, depending on your target volume and how the domain responds — rushing it risks reputation damage.' },
    ],
    cta: { href: '/email-deliverability', label: 'Let Keres warm your inboxes' },
  },
  {
    slug: 'spam-score',
    term: 'Spam Score & Sender Reputation',
    aka: ['sender reputation', 'sender score'],
    category: 'Email Deliverability',
    targetKeyword: 'what is a spam score',
    title: 'What Is a Spam Score? Sender Reputation Explained | Keres AI',
    description:
      'A spam score rates how likely your email is to be filtered as spam, based on sender reputation, content, and authentication. Learn how to lower yours.',
    definition:
      'A spam score estimates how likely a message or sender is to be filtered as spam, based on factors like sender reputation, authentication, content, and recipient engagement. A high spam score sends mail to the junk folder; a strong sender reputation — built through authentication, <a href="/glossary/inbox-warmup">warmup</a>, and low complaint rates — keeps you in the inbox.',
    sections: [
      {
        h2: 'How to lower your spam score',
        body:
          'Authenticate with <a href="/glossary/spf">SPF</a>/<a href="/glossary/dkim">DKIM</a>/<a href="/glossary/dmarc">DMARC</a>, warm up new senders, keep lists clean, avoid spam-trigger content and excessive links, and maintain healthy engagement so complaints stay low.',
      },
    ],
    related: ['email-deliverability', 'inbox-warmup', 'spf', 'dmarc'],
    faqs: [
      { q: 'What hurts sender reputation the most?', a: 'High bounce rates, spam complaints, sending to stale or purchased lists, and sudden volume spikes from an unwarmed domain.' },
    ],
    cta: { href: '/email-deliverability', label: 'Protect your sender reputation' },
  },
  {
    slug: 'missed-call-recovery',
    term: 'Missed-Call Recovery',
    category: 'AI Receptionist',
    targetKeyword: 'what is missed call recovery',
    title: 'What Is Missed-Call Recovery? Win Back Lost Calls | Keres AI',
    description:
      'Missed-call recovery is the practice of recapturing leads from calls you didn’t answer. Learn how AI answering and text-back turn missed calls into booked jobs.',
    definition:
      'Missed-call recovery is the practice of recapturing the revenue from calls your business doesn’t answer. Because most callers who hit voicemail never call back — they dial a competitor — recovery means answering more calls live (with a 24/7 AI receptionist) and instantly re-engaging the ones you do miss by text, so leads don’t walk.',
    sections: [
      {
        h2: 'Why missed calls cost so much',
        body:
          'Around 8 in 10 callers won’t leave a voicemail, and after-hours calls are the most likely to be missed and the most likely to be high-intent. Use the <a href="/missed-call-calculator">missed-call calculator</a> to size the leak, then close it with an <a href="/glossary/ai-receptionist">AI receptionist</a> that answers every call.',
      },
    ],
    related: ['ai-receptionist', 'missed-call-text-back', 'call-overflow', 'lead-qualification'],
    faqs: [
      { q: 'What percentage of missed calls are lost for good?', a: 'Most — the majority of callers who reach voicemail never leave a message and simply call the next business, so an unanswered call is usually a lost lead.' },
      { q: 'How does AI recover missed calls?', a: 'An AI receptionist answers calls you’d otherwise miss (after hours, overflow) live, and missed-call text-back instantly re-engages any that still slip through.' },
    ],
    cta: { href: '/use-cases/lead-capture', label: 'Recover your missed calls' },
  },
  {
    slug: 'conversational-ai',
    term: 'Conversational AI',
    category: 'AI Receptionist',
    targetKeyword: 'what is conversational ai',
    title: 'What Is Conversational AI? Definition & Examples | Keres AI',
    description:
      'Conversational AI is technology that understands and responds in natural language — powering AI receptionists and voice agents that hold real phone conversations.',
    definition:
      'Conversational AI is technology that understands and responds in natural human language across voice and text. It combines speech recognition, natural language understanding, and generation to hold real, two-way conversations — handling interruptions and context rather than reading a rigid menu. It’s what lets an AI receptionist actually talk to callers and book appointments.',
    sections: [
      {
        h2: 'Conversational AI vs. a chatbot or IVR',
        body:
          'Old <a href="/glossary/ivr">IVR</a> phone trees and basic chatbots follow fixed scripts. Conversational AI understands intent, adapts to what the caller says, and completes tasks like booking — which is why an <a href="/glossary/ai-receptionist">AI receptionist</a> feels like a conversation, not a menu.',
      },
    ],
    related: ['ai-receptionist', 'ivr', 'call-routing'],
    faqs: [
      { q: 'Is an AI receptionist conversational AI?', a: 'Yes — an AI receptionist is a voice application of conversational AI, built to answer calls, understand intent, and complete tasks like booking.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Hear conversational AI in action' },
  },
  {
    slug: 'ivr',
    term: 'IVR (Interactive Voice Response)',
    aka: ['phone tree', 'auto attendant'],
    category: 'AI Receptionist',
    targetKeyword: 'what is ivr',
    title: 'What Is IVR? Interactive Voice Response Explained | Keres AI',
    description:
      'IVR (interactive voice response) is the automated phone menu that routes callers by keypad or voice. Learn how it works and how AI receptionists go beyond it.',
    definition:
      'IVR (interactive voice response) is an automated phone system that greets callers and routes them through a menu using keypad presses or simple voice commands (“press 1 for sales”). It’s good for routing but can’t hold a real conversation or book an appointment — which is where conversational AI receptionists go further.',
    sections: [
      {
        h2: 'IVR vs. an AI receptionist',
        body:
          'IVR routes; it doesn’t resolve. Callers still wait for a human to actually help. An <a href="/glossary/ai-receptionist">AI receptionist</a> built on <a href="/glossary/conversational-ai">conversational AI</a> answers the question, qualifies the lead, and books the appointment in the same call — no menu maze.',
      },
    ],
    related: ['ai-receptionist', 'conversational-ai', 'call-routing'],
    faqs: [
      { q: 'Is IVR the same as an AI receptionist?', a: 'No. IVR is a menu that routes calls; an AI receptionist holds a natural conversation and completes tasks like booking, rather than just directing the caller.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Upgrade from IVR to AI' },
  },
  {
    slug: 'call-routing',
    term: 'Call Routing',
    aka: ['call forwarding', 'call distribution'],
    category: 'AI Receptionist',
    targetKeyword: 'what is call routing',
    title: 'What Is Call Routing? Definition & Best Practices | Keres AI',
    description:
      'Call routing directs inbound calls to the right person, team, or destination based on rules. Learn how AI routing answers first, then routes only what needs a human.',
    definition:
      'Call routing is the process of directing inbound calls to the right destination — a person, team, location, or queue — based on rules like time of day, caller input, or availability. AI-powered routing answers every call first, handles or books what it can, and escalates only the calls that genuinely need a human.',
    sections: [
      {
        h2: 'Smart routing with an AI front desk',
        body:
          'Instead of bouncing callers through menus, Keres answers in two rings, resolves routine requests, and routes by listing, location, or on-call schedule — texting the right person for emergencies. See <a href="/use-cases/after-hours-answering">after-hours answering</a> and <a href="/use-cases/overflow-call-handling">overflow handling</a>.',
      },
    ],
    related: ['ai-receptionist', 'ivr', 'call-overflow'],
    faqs: [
      { q: 'Can AI route calls to the right team?', a: 'Yes — Keres routes by listing, location, agent, or on-call schedule, and escalates emergencies to the right person by text.' },
    ],
    cta: { href: '/ai-receptionist', label: 'See AI call routing' },
  },
  {
    slug: 'appointment-reminders',
    term: 'Appointment Reminders',
    category: 'AI Receptionist',
    targetKeyword: 'what are appointment reminders',
    title: 'What Are Appointment Reminders? Cut No-Shows | Keres AI',
    description:
      'Appointment reminders are automated messages that confirm upcoming appointments to reduce no-shows. Learn how AI sends and manages them by text automatically.',
    definition:
      'Appointment reminders are automated messages — usually text or email — that confirm an upcoming appointment and give the customer an easy way to confirm, reschedule, or cancel. They’re one of the most effective ways to cut no-shows, and an AI receptionist sends them automatically and handles the reschedules that come back.',
    sections: [
      {
        h2: 'How reminders reduce no-shows',
        body:
          'A timely text confirmation keeps the appointment top of mind and lets customers reschedule instead of ghosting. When a reschedule comes in, <a href="/glossary/appointment-booking-automation">appointment booking automation</a> refills the slot rather than losing it.',
      },
    ],
    related: ['appointment-booking-automation', 'ai-receptionist', 'missed-call-text-back'],
    faqs: [
      { q: 'Do appointment reminders reduce no-shows?', a: 'Yes — automated text reminders with easy rescheduling are one of the most reliable ways to cut no-show rates.' },
    ],
    cta: { href: '/use-cases/appointment-booking', label: 'Automate reminders & booking' },
  },
  {
    slug: 'lead-scoring',
    term: 'Lead Scoring',
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is lead scoring',
    title: 'What Is Lead Scoring? Definition & How It Works | Keres AI',
    description:
      'Lead scoring ranks prospects by how likely they are to convert, so your team focuses on the best opportunities. Learn how it works and how AI scores leads automatically.',
    definition:
      'Lead scoring is a method of ranking prospects by how likely they are to convert, using signals like fit (industry, size, role), intent, and engagement. A higher score means a hotter lead. It lets sales teams prioritize the opportunities most worth their time instead of treating every lead the same.',
    sections: [
      {
        h2: 'Scoring inbound and outbound leads',
        body:
          'On inbound calls, an AI receptionist captures the fit and urgency signals that feed a score during <a href="/glossary/lead-qualification">qualification</a>. On outbound, the <a href="/glossary/ai-sdr">AI SDR</a> prioritizes engaged repliers so your closers work the warmest prospects first.',
      },
    ],
    related: ['lead-qualification', 'ai-sdr', 'cold-email-outreach'],
    faqs: [
      { q: 'How is lead scoring different from lead qualification?', a: 'Qualification decides whether a lead is a fit; scoring ranks qualified leads by how likely and how soon they’ll convert, so you prioritize the best ones.' },
    ],
    cta: { href: '/ai-sdr', label: 'Prioritize your best leads' },
  },
  {
    slug: 'outbound-sales',
    term: 'Outbound Sales',
    aka: ['outbound prospecting'],
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is outbound sales',
    title: 'What Is Outbound Sales? Definition & How AI Scales It | Keres AI',
    description:
      'Outbound sales is proactively reaching prospects who haven’t contacted you — by email, phone, or social. Learn how an AI SDR scales outbound and books meetings.',
    definition:
      'Outbound sales is the practice of proactively reaching out to prospects who haven’t contacted you first — through cold email, calls, or social — to start sales conversations. Unlike inbound (where buyers come to you), outbound lets you target exactly who you want, and an AI SDR scales the email motion and books the meetings.',
    sections: [
      {
        h2: 'How AI scales outbound sales',
        body:
          'An <a href="/glossary/ai-sdr">AI SDR</a> runs the outbound engine: building lists, personalizing <a href="/glossary/email-sequence">sequences</a>, managing <a href="/glossary/email-deliverability">deliverability</a>, handling replies, and booking meetings — the work that used to require a team of reps.',
      },
    ],
    related: ['ai-sdr', 'cold-email-outreach', 'email-sequence', 'reply-rate'],
    faqs: [
      { q: 'What’s the difference between outbound and inbound sales?', a: 'Outbound means you reach out to prospects first; inbound means they come to you. Outbound gives you control over targeting, which an AI SDR scales efficiently.' },
    ],
    cta: { href: '/ai-sdr', label: 'Scale outbound with AI' },
  },
  {
    slug: 'reply-rate',
    term: 'Reply Rate',
    category: 'AI SDR & Outbound',
    targetKeyword: 'what is a good cold email reply rate',
    title: 'What Is Reply Rate? Cold Email Benchmarks | Keres AI',
    description:
      'Reply rate is the percentage of outbound emails that get a response. Learn what a good cold email reply rate looks like and what drives it.',
    definition:
      'Reply rate is the percentage of outbound emails that receive a response — the metric that matters most in cold email, because replies, not opens, lead to booked meetings. It’s driven by targeting, personalization, a clear ask, disciplined follow-up, and strong <a href="/glossary/email-deliverability">deliverability</a> so messages actually reach the inbox.',
    sections: [
      {
        h2: 'What drives reply rate',
        body:
          'Tight targeting and genuine personalization beat volume. Most replies come from follow-ups, so a multi-step <a href="/glossary/email-sequence">sequence</a> matters — and none of it works if your email lands in spam, which is why deliverability is the foundation.',
      },
    ],
    related: ['cold-email-outreach', 'email-sequence', 'email-deliverability', 'ai-sdr'],
    faqs: [
      { q: 'What is a good cold email reply rate?', a: 'It varies by market and offer, but well-targeted, personalized, well-delivered campaigns aim for meaningfully higher reply rates than generic blasts — quality of targeting and deliverability matter more than volume.' },
    ],
    cta: { href: '/ai-sdr', label: 'Improve your reply rate' },
  },
  {
    slug: 'email-bounce-rate',
    term: 'Email Bounce Rate',
    aka: ['hard bounce', 'soft bounce'],
    category: 'Email Deliverability',
    targetKeyword: 'what is email bounce rate',
    title: 'What Is Email Bounce Rate? Hard vs Soft Bounces | Keres AI',
    description:
      'Email bounce rate is the percentage of emails that fail to deliver. Learn the difference between hard and soft bounces and why a high bounce rate hurts deliverability.',
    definition:
      'Email bounce rate is the percentage of emails that fail to deliver and are returned. A hard bounce is a permanent failure (invalid address); a soft bounce is temporary (full mailbox, server issue). A high bounce rate signals poor list quality to mailbox providers and damages your <a href="/glossary/spam-score">sender reputation</a>.',
    sections: [
      {
        h2: 'Keeping bounce rate low',
        body:
          'Verify and clean lists before sending, remove invalid addresses, and warm new domains. High bounces from stale or purchased lists are a fast way to wreck <a href="/glossary/email-deliverability">deliverability</a> — list hygiene is part of what Keres manages.',
      },
    ],
    related: ['email-deliverability', 'spam-score', 'inbox-warmup'],
    faqs: [
      { q: 'What’s the difference between a hard and soft bounce?', a: 'A hard bounce is a permanent delivery failure (e.g. the address doesn’t exist); a soft bounce is temporary (e.g. a full mailbox). Repeated hard bounces hurt your reputation most.' },
    ],
    cta: { href: '/email-deliverability', label: 'Keep your lists clean' },
  },
  {
    slug: 'email-blacklist',
    term: 'Email Blacklist',
    aka: ['DNSBL', 'block list'],
    category: 'Email Deliverability',
    targetKeyword: 'what is an email blacklist',
    title: 'What Is an Email Blacklist? How to Avoid It | Keres AI',
    description:
      'An email blacklist is a database of IPs and domains flagged for sending spam. Learn how senders get blacklisted and how to protect your deliverability.',
    definition:
      'An email blacklist (or block list / DNSBL) is a database of IP addresses and domains flagged for sending spam. Mailbox providers check these lists, and being on one can send your mail straight to spam or block it entirely. Senders get listed for spam complaints, hitting spam traps, or sudden volume spikes from an unwarmed domain.',
    sections: [
      {
        h2: 'How to stay off blacklists',
        body:
          'Authenticate with <a href="/glossary/spf">SPF</a>/<a href="/glossary/dkim">DKIM</a>/<a href="/glossary/dmarc">DMARC</a>, warm new senders, keep complaints and <a href="/glossary/email-bounce-rate">bounces</a> low, and never send to purchased lists. Keres manages sending behavior to protect reputation and avoid listings.',
      },
    ],
    related: ['email-deliverability', 'spam-score', 'email-bounce-rate', 'inbox-warmup'],
    faqs: [
      { q: 'How do I know if I’m blacklisted?', a: 'Sudden drops in delivery and inbox placement are warning signs; blacklist-monitoring tools can confirm. Prevention — authentication, warmup, and clean lists — matters far more than removal.' },
    ],
    cta: { href: '/email-deliverability', label: 'Protect your sending reputation' },
  },
  {
    slug: 'after-hours-answering',
    term: 'After-Hours Answering',
    aka: ['after-hours answering service', 'after-hours call answering'],
    category: 'AI Receptionist',
    targetKeyword: 'what is after-hours answering',
    title: 'What Is After-Hours Answering? Definition | Keres AI',
    description:
      'After-hours answering handles calls that come in when your office is closed — booking appointments and capturing leads 24/7 so no after-hours caller is lost.',
    definition:
      'After-hours answering is a service that handles inbound calls outside normal business hours — evenings, weekends, and holidays. It ensures callers who reach out when your office is closed can still get help, book an appointment, or report an emergency, rather than reaching voicemail and calling a competitor. AI-powered after-hours answering does this automatically at a flat rate, 24/7.',
    sections: [
      {
        h2: 'Why after-hours calls are your most valuable',
        body:
          'Service businesses miss the most calls after 5 PM and on weekends — exactly when homeowners discover a broken furnace, a burst pipe, or storm damage. These are high-urgency, high-intent callers. Every missed after-hours call is a job handed directly to the first competitor who picks up. An <a href="/glossary/ai-receptionist">AI receptionist</a> answers every after-hours call in two rings, books the job, and texts your on-call team for emergencies.',
      },
      {
        h2: 'After-hours answering vs. voicemail vs. answering service',
        body:
          'Voicemail captures a message most callers never leave. A human answering service bills per minute, usually just takes a message, and has limited overnight staffing. An AI after-hours answering service answers unlimited calls simultaneously, books appointments during the conversation, handles emergencies, and costs a flat monthly rate — with no gaps at 3 AM.',
      },
    ],
    related: ['ai-receptionist', 'call-overflow', 'emergency-dispatch', 'missed-call-recovery'],
    faqs: [
      { q: 'Does Keres answer calls after hours?', a: 'Yes — Keres answers every call 24/7, including nights, weekends, and holidays, with no extra after-hours rate.' },
      { q: 'What happens to after-hours emergencies?', a: 'Keres identifies emergency calls, captures the details, books the visit, and texts your on-call team immediately — so urgent jobs reach your crew the moment they come in.' },
      { q: 'Is after-hours answering worth it for small businesses?', a: 'Typically yes — a significant share of service calls arrive outside business hours, and each one is a job opportunity lost if it goes to voicemail.' },
    ],
    cta: { href: '/use-cases/after-hours-answering', label: 'See after-hours answering in action' },
  },
  {
    slug: 'emergency-dispatch',
    term: 'Emergency Dispatch',
    aka: ['emergency call dispatch', 'dispatch automation'],
    category: 'AI Receptionist',
    targetKeyword: 'what is emergency dispatch',
    title: 'What Is Emergency Dispatch? How AI Handles It | Keres AI',
    description:
      'Emergency dispatch routes urgent calls — HVAC no-cools, burst pipes, storm damage, roadside rescues — to your on-call crew instantly. Learn how AI automates it.',
    definition:
      'Emergency dispatch is the process of identifying an urgent inbound request — a no-heat call at midnight, a burst pipe, a stranded motorist — and routing it immediately to the on-call crew who can respond. In service businesses, every minute of delay in an emergency can mean a lost job or a worse outcome for the customer. AI emergency dispatch handles this in real time, 24/7, without needing a human on the phones.',
    sections: [
      {
        h2: 'How AI emergency dispatch works',
        body:
          'When a call comes in, the AI receptionist answers in two rings and qualifies the situation. If the caller describes an emergency — no heat in winter, a burst pipe, a downed tree, a stranded vehicle — the AI captures the address, situation, and contact details, books the service call, and simultaneously texts your on-call technician or dispatcher. The crew gets everything they need in seconds, not minutes.',
      },
      {
        h2: 'Which industries rely on emergency dispatch',
        body:
          '<a href="/ai-receptionist-for-hvac">HVAC companies</a> dispatch for no-heat and no-cool emergencies. <a href="/ai-receptionist-for-plumbers">Plumbers</a> dispatch for burst pipes and floods. <a href="/ai-receptionist-for-roofing">Roofing companies</a> dispatch for emergency tarps after storms. <a href="/ai-receptionist-for-towing">Towing companies</a> dispatch for roadside assistance. In each case, the AI answers the call live, qualifies the emergency, and alerts the right person instantly.',
      },
    ],
    related: ['ai-receptionist', 'after-hours-answering', 'call-routing', 'appointment-booking-automation'],
    faqs: [
      { q: 'Can an AI receptionist identify an emergency call?', a: 'Yes. Keres recognizes emergency language — no heat, flooding, gas smell, stranded motorist — and escalates immediately to your on-call crew by text, while keeping the caller engaged.' },
      { q: 'What information does the AI capture for dispatch?', a: 'Address, callback number, nature of the emergency, urgency level, and any other details your dispatch workflow requires — all sent to your team in seconds.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Set up AI emergency dispatch' },
  },
  {
    slug: 'patient-intake',
    term: 'Patient Intake',
    aka: ['new patient intake', 'medical intake'],
    category: 'AI Receptionist',
    targetKeyword: 'what is patient intake',
    title: 'What Is Patient Intake? How AI Automates It | Keres AI',
    description:
      'Patient intake collects the information needed before a new patient appointment — demographics, insurance, medical history. Learn how AI handles it automatically on every call.',
    definition:
      'Patient intake is the process of collecting essential information from a new patient before their first appointment — including contact details, insurance coverage, medical history, reason for visit, and consent. It traditionally involves forms, phone calls, and manual data entry. AI patient intake automates the collection during the booking call, so the patient is ready to see the provider before they walk in.',
    sections: [
      {
        h2: 'Why intake is the bottleneck for dental and med spa growth',
        body:
          'Every missed new-patient call or delayed intake process costs a high-value appointment. For <a href="/ai-receptionist-for-dentists">dental practices</a> and <a href="/ai-receptionist-for-med-spas">med spas</a>, a new patient can be worth thousands of dollars in lifetime value — but only if the intake is smooth enough that they don\'t book somewhere more responsive. AI intake collects what you need during the call, confirms the appointment, and logs everything to your practice management system automatically.',
      },
      {
        h2: 'What AI collects during patient intake',
        body:
          'The AI captures name, date of birth, insurance provider and ID, reason for visit, primary care provider if relevant, and any pre-treatment questions you configure — then syncs the record to your system. For <a href="/ai-receptionist-for-med-spas">med spas</a>, it asks about treatment history, allergies, and contraindications before the consultation.',
      },
    ],
    related: ['ai-receptionist', 'appointment-booking-automation', 'no-show-rate', 'appointment-reminders'],
    faqs: [
      { q: 'Can AI collect patient intake over the phone?', a: 'Yes. Keres asks the intake questions you configure during the booking call, captures the answers, and pushes the data to your practice management system before the appointment.' },
      { q: 'Is AI patient intake HIPAA compliant?', a: 'Keres can be configured for HIPAA-aligned workflows, signs BAAs where required, and handles PHI according to your data requirements — discuss specifics during your demo.' },
    ],
    cta: { href: '/ai-receptionist-for-dentists', label: 'See AI patient intake for dental' },
  },
  {
    slug: 'legal-intake',
    term: 'Legal Intake',
    aka: ['law firm intake', 'client intake for lawyers'],
    category: 'AI Receptionist',
    targetKeyword: 'what is legal intake',
    title: 'What Is Legal Intake? How AI Handles It for Law Firms | Keres AI',
    description:
      'Legal intake is the process of qualifying and onboarding new legal clients — capturing case details, running conflict checks, and booking consultations. Learn how AI automates it.',
    definition:
      'Legal intake is the structured process by which a law firm evaluates and onboards a potential new client — capturing the nature of the matter, checking for conflicts of interest, screening for jurisdiction and statute of limitations, assessing case merit, and booking the initial consultation. Because intake quality directly determines which matters a firm takes on, most firms want it handled consistently and confidentially, 24/7.',
    sections: [
      {
        h2: 'The stakes of missed legal intake calls',
        body:
          'Most people searching for a lawyer call multiple firms and hire the first one that picks up and sounds competent. A missed intake call after hours or while your paralegal is tied up doesn\'t just lose a client — it hands a potentially high-value contingency case to a competitor. An AI receptionist answers every inquiry instantly, runs your conflict-screening questions, and books the consultation before the caller moves on.',
      },
      {
        h2: 'Conflict screening in AI legal intake',
        body:
          'Before booking a consultation, good legal intake screens for conflicts of interest — capturing adverse party names, matter type, and any existing relationships with the firm. Keres asks the conflict-check questions you configure and flags potential conflicts to your staff for review before confirming the booking, protecting the firm from inadvertent representation.',
      },
    ],
    related: ['ai-receptionist', 'lead-qualification', 'appointment-booking-automation', 'patient-intake'],
    faqs: [
      { q: 'Can AI handle conflict screening for a law firm?', a: 'Yes. Keres asks your configured conflict-check questions, captures opposing party names and matter type, and flags any potential conflict to your team before confirming the booking.' },
      { q: 'Is AI legal intake confidential?', a: 'Keres can be configured for SOC 2-aligned workflows, never uses intake data to train third-party AI models, and signs DPAs. Discuss specific confidentiality requirements on your demo.' },
      { q: 'What practice areas work well with AI intake?', a: 'Personal injury, family law, criminal defense, immigration, estate planning, and employment law all have structured intake processes that AI handles well — capturing the matter details and qualifying the caller before booking.' },
    ],
    cta: { href: '/ai-receptionist-for-professional-intake', label: 'See AI legal intake' },
  },
  {
    slug: 'no-show-rate',
    term: 'No-Show Rate',
    aka: ['appointment no-show', 'patient no-show rate'],
    category: 'AI Receptionist',
    targetKeyword: 'what is a no-show rate',
    title: 'What Is No-Show Rate? How to Reduce It With AI | Keres AI',
    description:
      'No-show rate is the percentage of booked appointments where the client doesn\'t arrive. Learn what drives it and how automated reminders and easy rescheduling cut it.',
    definition:
      'No-show rate is the percentage of scheduled appointments where the patient or client doesn\'t appear and hasn\'t cancelled. For service businesses, dental practices, and med spas, a high no-show rate means unbillable time, disrupted schedules, and lost revenue. Automated appointment reminders and easy rescheduling — sent by text at the right intervals — are the most reliable way to cut no-show rates significantly.',
    sections: [
      {
        h2: 'The revenue cost of no-shows',
        body:
          'Industry estimates put a single dental no-show at roughly $200–$500 in lost revenue, and a missed med-spa injection appointment often higher — exact figures vary by practice, geography, and treatment mix. Multiplied across a month, even a 10–15% no-show rate is a significant, avoidable loss. Most no-shows happen because the patient forgot or found a scheduling conflict — both solvable with timely <a href="/glossary/appointment-reminders">appointment reminders</a> and frictionless rescheduling.',
      },
      {
        h2: 'How AI reminders reduce no-shows',
        body:
          'An <a href="/glossary/ai-receptionist">AI receptionist</a> sends automatic text confirmations immediately after booking, then a reminder 48 hours before the appointment, and a final check-in the morning of. When a patient replies to reschedule, the AI handles it on the spot — refilling the slot instead of leaving it empty. This two-step (remind + reschedule) cycle is the most proven way to keep no-show rates in the low single digits.',
      },
    ],
    related: ['appointment-reminders', 'appointment-booking-automation', 'patient-intake', 'ai-receptionist'],
    faqs: [
      { q: 'What is a good no-show rate for a dental practice?', a: 'Well-run practices typically target under 5% no-show rates. Automated text reminders with easy rescheduling are the most effective lever — practices without reminders often see 15–25%.' },
      { q: 'Does AI rescheduling actually refill cancelled slots?', a: 'Yes — because the rescheduling happens in real time, a cancellation text at 8 AM can be re-booked by another patient the same morning rather than sitting empty.' },
    ],
    cta: { href: '/use-cases/appointment-booking', label: 'Reduce no-shows with AI booking' },
  },
  {
    slug: 'lead-response-time',
    term: 'Lead Response Time',
    aka: ['speed to lead', 'lead follow-up time'],
    category: 'AI Receptionist',
    targetKeyword: 'what is lead response time',
    title: 'What Is Lead Response Time? Why Speed to Lead Wins | Keres AI',
    description:
      'Lead response time is how quickly you contact a new lead. Research shows the first business to respond wins the job — learn how AI closes the gap.',
    definition:
      'Lead response time (also called speed to lead) is the time between a prospect first reaching out — calling, submitting a form, or clicking an ad — and receiving a response from your business. Research consistently shows that responding within the first minute dramatically increases the likelihood of qualifying the lead, and that the first business to respond wins the majority of competitive inquiries. Every minute of delay reduces your chance of closing.',
    sections: [
      {
        h2: 'Why speed to lead is the most important sales metric',
        body:
          'Harvard Business Review research found that companies contacting leads within one hour are seven times more likely to qualify them than those who wait an hour, and 60 times more likely than those who wait 24 hours. For inbound phone calls, the window is even shorter — a caller who hits voicemail typically dials the next business within seconds. An <a href="/glossary/ai-receptionist">AI receptionist</a> answers in two rings, making response time effectively instant.',
      },
      {
        h2: 'How AI eliminates response time for phone leads',
        body:
          'A human front desk can only answer one call at a time, misses calls while busy, and can\'t staff nights and weekends at the same cost as business hours. An AI receptionist answers unlimited concurrent calls in two rings, 24/7 — including the after-hours calls that are statistically your most valuable. For outbound, the <a href="/glossary/ai-sdr">AI SDR</a> follows up with email leads within minutes of their first interaction.',
      },
    ],
    related: ['ai-receptionist', 'missed-call-recovery', 'after-hours-answering', 'lead-qualification'],
    faqs: [
      { q: 'What is the ideal lead response time?', a: 'Under one minute for inbound calls and under five minutes for web form leads. An AI receptionist achieves this by answering calls in two rings 24/7 — making response time instant for every call.' },
      { q: 'How much does slow response time cost?', a: 'Use the <a href="/missed-call-calculator">missed-call calculator</a> to estimate the revenue you lose per month to unanswered or delayed responses.' },
    ],
    cta: { href: '/missed-call-calculator', label: 'Calculate what slow response costs you' },
  },
  {
    slug: 'front-desk-automation',
    term: 'Front Desk Automation',
    aka: ['AI front desk', 'automated front desk'],
    category: 'AI Receptionist',
    targetKeyword: 'what is front desk automation',
    title: 'What Is Front Desk Automation? Definition & Uses | Keres AI',
    description:
      'Front desk automation uses AI to handle calls, book appointments, qualify leads, and answer questions automatically — replacing or supplementing human receptionists.',
    definition:
      'Front desk automation uses AI to perform the core tasks of a business\'s front desk without human staff: answering every call, greeting callers, booking and rescheduling appointments, qualifying and routing leads, answering common questions, collecting intake information, and escalating emergencies. It runs 24/7, scales to unlimited simultaneous calls, and costs a fraction of full-time front desk staffing.',
    sections: [
      {
        h2: 'What front desk automation replaces',
        body:
          'A traditional front desk staff member costs $35,000–$50,000 per year, handles one call at a time, works 40 hours a week, and takes vacations. Front desk automation covers all call-handling tasks continuously — including nights, weekends, call surges, and emergencies — at a predictable flat monthly cost. It doesn\'t replace the human judgment calls, but it handles everything routine, which is 80% of the volume.',
      },
      {
        h2: 'Industries where front desk automation delivers the most value',
        body:
          'Any business with high inbound call volume: <a href="/ai-receptionist-for-hvac">HVAC</a> and home-services contractors, <a href="/ai-receptionist-for-dentists">dental practices</a>, <a href="/ai-receptionist-for-med-spas">med spas</a>, <a href="/ai-receptionist-for-real-estate">real estate teams</a>, and <a href="/ai-receptionist-for-professional-intake">law firms</a>. In each case, every missed or delayed call is a revenue leak that automation closes permanently.',
      },
    ],
    related: ['ai-receptionist', 'appointment-booking-automation', 'lead-response-time', 'after-hours-answering'],
    faqs: [
      { q: 'Does front desk automation replace human receptionists?', a: 'It replaces the routine tasks — answering calls, booking appointments, capturing leads, answering FAQs — and handles them better at scale. Most businesses use it alongside a human team, freeing staff for higher-value work.' },
      { q: 'What is the ROI of front desk automation?', a: 'Use the <a href="/tools/staffing-savings-estimator">staffing savings estimator</a> to calculate how much you could save compared to a full-time or part-time front desk hire.' },
    ],
    cta: { href: '/ai-receptionist', label: 'Automate your front desk with Keres' },
  },
  {
    slug: 'dispatch-automation',
    term: 'Dispatch Automation',
    aka: ['automated dispatch', 'AI dispatch'],
    category: 'AI Receptionist',
    targetKeyword: 'what is dispatch automation',
    title: 'What Is Dispatch Automation? AI for Field Service | Keres AI',
    description:
      'Dispatch automation uses AI to capture service requests, qualify urgency, assign jobs, and alert your field crew — without a human dispatcher on every call.',
    definition:
      'Dispatch automation uses software to capture inbound service requests, assess urgency, assign the job to the right crew member, and communicate dispatch details — reducing or eliminating the need for a human dispatcher to manually handle every call. For field-service businesses like HVAC, plumbing, roofing, and towing, automated dispatch means faster response times, fewer missed jobs, and 24/7 coverage even when the office is closed.',
    sections: [
      {
        h2: 'How AI dispatch works for field-service businesses',
        body:
          'When a customer calls with a service request, the AI receptionist answers in two rings, captures the job details (address, issue type, urgency), and assesses whether it\'s a routine job or an emergency. Routine calls get booked on the calendar in the appropriate scheduling window. Emergency calls — a no-heat in January, a burst pipe, a stranded motorist at midnight — get immediate dispatch alerts texted to the on-call technician, with all job details. No dispatcher required for the intake.',
      },
      {
        h2: 'Dispatch automation integrations',
        body:
          'Keres connects to the field-service platforms your dispatch team already uses: <a href="/integrations/servicetitan">ServiceTitan</a>, <a href="/integrations/jobber">Jobber</a>, and <a href="/integrations/housecall-pro">Housecall Pro</a>. New jobs sync automatically — the dispatcher sees every call-driven booking in the same system they already manage, without manual data entry.',
      },
    ],
    related: ['emergency-dispatch', 'ai-receptionist', 'after-hours-answering', 'appointment-booking-automation'],
    faqs: [
      { q: 'Does Keres automate dispatch for HVAC companies?', a: 'Yes. Keres answers HVAC calls 24/7, qualifies service requests and emergencies, books jobs in ServiceTitan or Jobber, and texts your on-call tech for urgent dispatch immediately.' },
      { q: 'What field-service software does Keres dispatch into?', a: 'ServiceTitan, Jobber, Housecall Pro, FieldEdge, and Service Fusion — plus generic webhooks for any other system.' },
    ],
    cta: { href: '/ai-receptionist-for-hvac', label: 'See AI dispatch for HVAC' },
  },
];

export const glossaryCategories = [
  'AI Receptionist',
  'AI SDR & Outbound',
  'Email Deliverability',
] as const;
