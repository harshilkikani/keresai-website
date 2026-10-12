// Data-driven comparison pages. Add an entry → a new /{competitor}-alternative page builds.
export interface Comparison {
  slug: string; // full URL segment, e.g. "apollo-alternative"
  competitor: string;
  category: string;
  /** Drives breadcrumb parent + secondary CTA: inbound → AI Receptionist, outbound → AI SDR. */
  pillar: 'inbound' | 'outbound';
  title: string;
  description: string;
  h1Accent: string;
  intro: string;
  rows: { feature: string; keres: string; them: string }[];
  faqs: { q: string; a: string }[];
  /**
   * Turns the page into an honest roundup of alternatives (keys of
   * answeringVendors), with Keres as one labelled row. The sourced roundup
   * table replaces the Keres-vs-them feature table on these pages.
   */
  roundup?: string[];
  /**
   * Competitor-specific sections for roundup pages. Every statement about the
   * competitor comes from its own site (see answeringVendors.ts for sources
   * and the check date); verdicts come only from the roundup table.
   */
  detail?: RoundupDetail;
}

export interface RoundupDetail {
  /** Short label for links from sibling pages, e.g. "Smith.ai alternatives". */
  linkLabel: string;
  /** Self-contained 60–80 word answer naming Keres AI. */
  keresAnswer: string;
  priceH2: string;
  /** HTML. Price as published, with the date and a source link. */
  price: string;
  /** HTML list items: buyer needs, not competitor faults. */
  why: string[];
  /** Extra competitor-specific sections (HTML bodies). */
  sections: { h2: string; body: string }[];
  /** Verdicts, each taken from the roundup table. `pick` is HTML. */
  bestFor: { need: string; pick: string }[];
  /** HTML list items for "When Keres AI is not the right choice". */
  notFor: string[];
  /** One sentence on what to bring when switching from this competitor. */
  switchNote: string;
}

/** The five sourced roundups, in the order they are linked. */
export const ROUNDUP_SLUGS = [
  'smith-ai-alternative',
  'ruby-alternative',
  'goodcall-alternative',
  'rosie-alternative',
  'answering-legal-alternative',
] as const;

export const comparisons: Comparison[] = [
  {
    slug: 'apollo-alternative',
    competitor: 'Apollo',
    category: 'Prospecting & outbound',
    pillar: 'outbound',
    title: 'The Best Apollo Alternative for Booked Meetings | Keres AI',
    description:
      'Looking for an Apollo alternative? Keres AI combines outbound, deliverability, and AI booking in one platform that books meetings for you. See the full comparison.',
    h1Accent: 'Apollo',
    intro:
      'Apollo is great for finding contacts. But finding contacts is not the same as booking meetings. Keres is an AI SDR that takes outbound the rest of the way — personalizing at scale, managing deliverability, handling replies, and booking qualified meetings on your calendar.',
    rows: [
      { feature: 'Prospect database', keres: 'Yes', them: 'Yes' },
      { feature: 'AI-personalized sequences', keres: 'Yes', them: 'Limited' },
      { feature: 'Deliverability managed (SPF/DKIM/DMARC + warmup)', keres: 'Yes', them: 'No' },
      { feature: 'AI replies to and books meetings', keres: 'Yes', them: 'No' },
      { feature: 'Inbound AI receptionist included', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Apollo alternative?', a: 'Yes — especially if your goal is booked meetings, not just a contact list. Keres runs the full outbound motion, manages deliverability, handles replies, and books meetings, which Apollo leaves to you.' },
      { q: 'Can I switch from Apollo to Keres?', a: 'Yes. We migrate your sequences and lists during onboarding, set up authentication and warmup, and agree the launch timing with you on the first call.' },
      { q: 'Does Keres replace Apollo entirely?', a: 'For outbound execution and booking, yes. Keres handles targeting, sending, deliverability, replies, and scheduling end to end.' },
    ],
  },
  {
    slug: 'instantly-alternative',
    competitor: 'Instantly',
    category: 'Cold email sending',
    pillar: 'outbound',
    title: 'The Best Instantly Alternative — Books Meetings | Keres',
    description:
      'Searching for an Instantly alternative? Keres AI adds AI personalization, reply handling, and meeting booking on top of deliverability and sending. See the comparison.',
    h1Accent: 'Instantly',
    intro:
      'Instantly sends cold email and warms inboxes well. Keres does that too — and then keeps going: AI personalization at scale, automatic reply handling, and meetings booked straight to your calendar, plus an inbound AI receptionist.',
    rows: [
      { feature: 'Inbox warmup', keres: 'Yes', them: 'Yes' },
      { feature: 'Cold email sending at scale', keres: 'Yes', them: 'Yes' },
      { feature: 'AI-personalized copy per prospect', keres: 'Yes', them: 'Limited' },
      { feature: 'AI replies to and books meetings', keres: 'Yes', them: 'No' },
      { feature: 'Inbound AI receptionist included', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Instantly alternative?', a: 'Yes. Keres covers sending and warmup like Instantly, then adds AI personalization, reply handling, and booking so meetings end up on your calendar without manual work.' },
      { q: 'Does Keres handle deliverability like Instantly?', a: 'Yes — SPF, DKIM, DMARC, warmup, volume ramp, and list hygiene are all managed for you.' },
      { q: 'Can I migrate my Instantly campaigns?', a: 'Yes, we migrate campaigns and inboxes during onboarding. Timing depends on your domains and warmup, and we agree it with you on the first call.' },
    ],
  },
  {
    slug: 'smartlead-alternative',
    competitor: 'Smartlead',
    category: 'Cold email infrastructure',
    pillar: 'outbound',
    title: 'The Best Smartlead Alternative — AI SDR | Keres',
    description:
      'Need a Smartlead alternative? Keres AI is a done-for-you AI SDR — sending, deliverability, AI personalization, reply handling, and booked meetings in one platform.',
    h1Accent: 'Smartlead',
    intro:
      'Smartlead gives you powerful cold-email infrastructure to run yourself. Keres is the done-for-you version: we run the infrastructure, the AI writes and personalizes, handles replies, and books the meetings — so you get outcomes, not just tooling.',
    rows: [
      { feature: 'Unlimited inboxes / sending', keres: 'Yes', them: 'Yes' },
      { feature: 'Deliverability + warmup', keres: 'Yes', them: 'Yes' },
      { feature: 'AI personalization at scale', keres: 'Yes', them: 'Limited' },
      { feature: 'AI replies to and books meetings', keres: 'Yes', them: 'No' },
      { feature: 'Inbound AI receptionist included', keres: 'Yes', them: 'No' },
      { feature: 'Fully managed, done-for-you', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres a good Smartlead alternative?', a: 'Yes, particularly if you want results without running the tooling yourself. Keres manages the infrastructure and uses AI to personalize, reply, and book meetings for you.' },
      { q: 'Do I have to manage sending myself?', a: 'No. Unlike self-serve tools, Keres is done-for-you — we handle setup, sending, deliverability, and optimization.' },
      { q: 'How fast can I switch from Smartlead?', a: 'It depends on migration and warmup. Keres sets it up for you and agrees the timing on your first call.' },
    ],
  },
  {
    slug: 'smith-ai-alternative',
    competitor: 'Smith.ai',
    category: 'Virtual receptionist & answering service',
    pillar: 'inbound',
    title: 'Smith.ai Alternatives (2026): Prices and Billing | Keres AI',
    description: 'Eight Smith.ai alternatives side by side: human, AI or hybrid, how each bills (per call, minute or caller), and the lowest published price.',
    h1Accent: 'Smith.ai',
    intro: 'Smith.ai pairs AI with live receptionists and bills per call. If you are comparing alternatives, the real differences are who answers (a person, AI or both) and how you are billed. Here are the main options with the prices each vendor publishes, and where Keres AI fits.',
    roundup: ['Ruby', 'PATLive', 'Abby Connect', 'Goodcall', 'Rosie', 'Dialzara', 'Upfirst', 'My AI Front Desk'],
    rows: [],
    detail: {
      linkLabel: 'Smith.ai alternatives',
      keresAnswer: 'Keres AI is a Smith.ai alternative for local service businesses that want an AI receptionist to book the appointment during the call. Its receptionist, Remi, answers in two rings, 24/7, and books into Google Calendar, HubSpot or ServiceTitan. Keres AI bills a monthly rate with included minutes, then per minute, with no per-call fees, and can also run your website and Google Business Profile.',
      priceH2: 'How much does Smith.ai cost?',
      price: "<p>As of October 11, 2026, Smith.ai's published plans start at <strong>$300 a month for 30 calls</strong> answered by human receptionists, with extra calls at $11.50 each. Its AI receptionist has a <strong>free tier of 25 calls a month, then $3 per call</strong>. Because Smith.ai bills per call, your cost tracks how many calls you get, not how long they last. Smith.ai's pricing page also lists a 30-day money-back guarantee on its receptionist plans. Source: <a href=\"https://smith.ai/pricing\" rel=\"noopener nofollow\" target=\"_blank\">smith.ai/pricing</a>.</p>",
      why: [
        '<strong>Billing that matches their calls.</strong> Per-call billing favours long calls. A business that gets many short calls, such as hours, directions or quick status checks, often compares per-minute plans instead.',
        '<strong>One kind of answering.</strong> Smith.ai offers AI, people, or both on one line. Some buyers want only live receptionists, others only AI at a lower entry price.',
        "<strong>Booking into the tool they already run.</strong> Smith.ai's site names integrations such as HubSpot, Salesforce, Clio, Calendly and Acuity. A contractor on ServiceTitan checks whether each option books the job there directly.",
        '<strong>Fewer vendors.</strong> Some owners want the website, the Google Business Profile and the phones handled by one team.',
      ],
      sections: [
        {
          h2: 'What would 100 calls a month cost on Smith.ai?',
          body: "<p>On the published figures, 100 calls a month on the human Starter plan comes to $1,105: $300 for the first 30 calls plus 70 calls at $11.50. The same 100 calls on the AI receptionist's free tier come to $225: 75 calls past the free 25, at $3 each. Smith.ai's higher tiers lower the per-call rate, so check its page for your volume. The <a href=\"/ai-receptionist-cost\">AI receptionist cost guide</a> runs the same 100 calls across every vendor that publishes an overage rate.</p>",
        },
      ],
      bestFor: [
        { need: 'Live, US-based receptionists on every call', pick: 'Ruby ($250/mo for 50 minutes) or PATLive ($99/mo for 50 minutes)' },
        { need: 'A receptionist team, with AI for routine calls', pick: 'Abby Connect ($165/mo for 50 human minutes; AI minutes count as half)' },
        { need: 'The lowest AI entry price', pick: 'Upfirst ($24.95/mo for 30 calls) or Dialzara ($29/mo for 60 minutes)' },
        { need: 'Billing by caller instead of by call', pick: 'Goodcall ($79/mo for 100 unique callers)' },
        { need: 'Low-cost AI answering in English and Spanish', pick: 'Rosie ($49/mo for 250 minutes)' },
        { need: 'Phone, text and website chat from one AI', pick: 'My AI Front Desk ($99/mo for 200 voice minutes)' },
        { need: 'Website, Google profile and AI receptionist from one team', pick: '<a href="/agents/inbound">Keres AI</a> (Remi quoted to your call volume)' },
      ],
      notFor: [
        '<strong>You chose Smith.ai for live people.</strong> If a human must be able to pick up any call, stay with a live or hybrid service. Remi is AI.',
        '<strong>You want the lowest published price and will set it up yourself.</strong> Self-serve AI plans start at $24.95 a month; Keres AI sets Remi up for you and quotes it to your call volume.',
        '<strong>You need a BAA.</strong> Keres AI is not HIPAA or SOC 2 certified and does not sign BAAs, so practices that need one should look elsewhere.',
      ],
      switchNote: 'Bring the instructions your Smith.ai receptionists follow today, including which calls they transfer and to whom; those become Remi’s script and escalation rules.',
    },
    faqs: [
      { q: 'Is Keres AI a good Smith.ai alternative?', a: 'It fits businesses that want AI to answer and book the appointment, billed by minutes rather than per call. If you want a live person available on every call, Smith.ai’s human plans or another live service fit better.' },
      { q: 'Does Keres AI use human receptionists like Smith.ai?', a: 'No. Remi is AI. When a call needs a person, Remi texts or transfers it to your team under the escalation rules you set. Keres AI does not put live receptionists on the line.' },
      { q: 'How is Keres AI’s pricing different from Smith.ai’s?', a: 'Smith.ai bills per call. Keres AI charges a monthly rate with included minutes, then per minute, with no per-call fees. Remi is quoted to your call volume; see <a href="/pricing">pricing</a>.' },
    ],
  },
  {
    slug: 'ruby-alternative',
    competitor: 'Ruby',
    category: 'Virtual receptionist service',
    pillar: 'inbound',
    title: 'Ruby Receptionist Alternatives (2026): Prices | Keres AI',
    description: 'Eight Ruby Receptionists alternatives side by side: live, AI or hybrid answering, how each one bills, and the lowest published price, plus where Keres AI fits.',
    h1Accent: 'Ruby',
    intro: 'Ruby answers calls with live, US-based receptionists on monthly plans with included minutes. If you are weighing alternatives, the choice comes down to people, AI or both, and how you want to be billed. Here are the main options with the prices each vendor publishes, and where Keres AI fits.',
    roundup: ['Smith.ai', 'PATLive', 'Abby Connect', 'Goodcall', 'Rosie', 'Dialzara', 'Upfirst', 'My AI Front Desk'],
    rows: [],
    detail: {
      linkLabel: 'Ruby alternatives',
      keresAnswer: 'Keres AI is a Ruby alternative for local service businesses that want calls answered by AI and booked during the call, instead of handled by a live receptionist. Its AI receptionist, Remi, answers in two rings, 24/7, and books into Google Calendar, HubSpot or ServiceTitan. Keres AI charges a monthly rate with included minutes, then per minute, with no per-call fees, on a month-to-month plan.',
      priceH2: 'How much does Ruby cost?',
      price: "<p>Ruby's lowest published plan is <strong>$250 a month for 50 receptionist minutes</strong>, per <a href=\"https://www.ruby.com/pricing/\" rel=\"noopener nofollow\" target=\"_blank\">ruby.com/pricing</a> on October 11, 2026. Every plan is answered by live receptionists, and the pricing page says Ruby charges no activation, onboarding or setup fees. We did not find a rate for minutes past the plan on that page, so ask Ruby before you sign. At an average of three minutes a call, 50 minutes covers about 16 calls a month.</p>",
      why: [
        '<strong>More calls than the plan covers.</strong> With 50 minutes included, a busy month can run past the plan, so owners compare larger minute plans or per-call and per-caller billing.',
        '<strong>A lower entry price.</strong> AI receptionists publish plans from $24.95 a month. Live plans start higher because a person answers.',
        '<strong>The appointment booked on the call.</strong> Some owners want the job on the calendar when the caller hangs up, not a message to return.',
        '<strong>One team for the rest of the front door.</strong> Some want the website and Google Business Profile run by the same vendor that answers the phone.',
      ],
      sections: [
        {
          h2: 'Ruby vs an AI receptionist: what changes?',
          body: "<ul><li><strong>Who answers.</strong> Ruby's receptionists are people. An AI receptionist answers with a voice model that follows your script. People bring judgment to unusual calls; AI follows your script the same way on every call.</li><li><strong>How you pay.</strong> Ruby counts receptionist minutes inside a monthly plan. AI receptionists bill by minute, call or caller, from lower entry prices (see the table).</li><li><strong>After hours.</strong> Ruby lists 24/7 live answering, including nights, weekends and holidays, so coverage alone is not a reason to switch.</li><li><strong>Booking.</strong> Ask whether the appointment is booked into your calendar during the call or passed to you as a message. Keres AI books into Google Calendar, HubSpot or ServiceTitan during the call.</li></ul>",
        },
        {
          h2: 'Which Ruby alternative suits a law firm?',
          body: "<p>Law firms comparing Ruby usually care most about intake and their case-management system. From the table: Smith.ai and Abby Connect both name Clio among the integrations on their own sites; PATLive offers live US-based receptionists by the minute; and Upfirst names Clio and starts at $24.95 a month for 30 calls. AnsweringLegal answers only for law firms but does not publish prices; see <a href=\"/answering-legal-alternative\">AnsweringLegal alternatives</a>. Keres AI's Clio and Lawmatics integrations are rolling out; today Remi books through Google Calendar, HubSpot or Zapier. More on <a href=\"/industries/law-firms\">Keres AI for law firms</a>.</p>",
        },
      ],
      bestFor: [
        { need: 'Live receptionists at a lower entry price', pick: 'PATLive ($99/mo for 50 minutes, bilingual answering included)' },
        { need: 'AI with live receptionists on the same line', pick: 'Smith.ai (human plans from $300/mo for 30 calls; AI free tier of 25 calls)' },
        { need: 'A dedicated receptionist team plus AI for routine calls', pick: 'Abby Connect ($165/mo for 50 human minutes)' },
        { need: 'The lowest AI entry price', pick: 'Upfirst ($24.95/mo for 30 calls) or Dialzara ($29/mo for 60 minutes)' },
        { need: 'Billing by caller', pick: 'Goodcall ($79/mo for 100 unique callers)' },
        { need: 'Phone, text and website chat from one AI', pick: 'My AI Front Desk ($99/mo for 200 voice minutes)' },
        { need: 'Website, Google profile and AI receptionist from one team', pick: '<a href="/agents/inbound">Keres AI</a> (Remi quoted to your call volume)' },
      ],
      notFor: [
        '<strong>A person on every call is the point.</strong> If your callers expect a human, a live service such as PATLive, Abby Connect or Ruby itself is the better fit. Remi is AI.',
        '<strong>You want the cheapest plan and will configure it yourself.</strong> Upfirst and Dialzara publish plans under $30 a month.',
        '<strong>You need a BAA.</strong> Keres AI is not HIPAA or SOC 2 certified and does not sign BAAs.',
      ],
      switchNote: 'Send us the call instructions Ruby’s receptionists use and a few recent call summaries, so Remi’s script matches what your callers are used to hearing.',
    },
    faqs: [
      { q: 'Is Keres AI a good Ruby alternative?', a: 'It suits businesses that want calls answered and booked by AI at any hour. If you want a live person to answer every call, Ruby or another live service suits you better.' },
      { q: "Will an AI receptionist sound as friendly as Ruby's receptionists?", a: 'Remi uses a natural-sounding voice and a script written with you, in your business’s tone. It is still AI: callers who want a person are transferred or texted to your team under the rules you set. <a href="/hear-it">Hear Remi answer a call</a>.' },
      { q: 'Does Keres AI cover after-hours and weekends?', a: 'Yes. Remi answers 24/7, including nights, weekends and holidays, with no after-hours surcharge.' },
    ],
  },
  {
    slug: 'goodcall-alternative',
    competitor: 'Goodcall',
    category: 'AI phone agent',
    pillar: 'inbound',
    title: 'Goodcall Alternatives (2026): Prices Compared | Keres AI',
    description: 'Seven Goodcall alternatives side by side: AI, human or hybrid, how each bills (per caller, call or minute), and the lowest published price.',
    h1Accent: 'Goodcall',
    intro: 'Goodcall is a self-serve AI phone agent billed by unique caller. If you are comparing alternatives, the differences are setup (do it yourself or done for you), who answers, and how billing works. Here are the main options with the prices each vendor publishes, and where Keres AI fits.',
    roundup: ['Smith.ai', 'Rosie', 'Dialzara', 'Upfirst', 'My AI Front Desk', 'Ruby', 'PATLive'],
    rows: [],
    detail: {
      linkLabel: 'Goodcall alternatives',
      keresAnswer: 'Keres AI is a Goodcall alternative for local service businesses that want the AI receptionist set up and tuned for them instead of building it themselves. Its receptionist, Remi, answers in two rings, 24/7, and books into Google Calendar, HubSpot or ServiceTitan. Keres AI bills a monthly rate with included minutes, then per minute, with no per-call or per-caller fees, and Keres sets it up for you.',
      priceH2: "How does Goodcall's per-caller billing work?",
      price: "<p>Goodcall's Starter plan is <strong>$79 a month for 100 unique callers, then 79¢ for each extra caller</strong>, per <a href=\"https://www.goodcall.com/pricing\" rel=\"noopener nofollow\" target=\"_blank\">goodcall.com/pricing</a> on October 11, 2026. A unique caller is one phone number: Goodcall's page explains that a person who calls back five times in a month counts once. The page states there are no per-minute charges, and Starter includes one external tool integration. You can build and test a demo agent before paying, and you pay once you connect a number.</p>",
      why: [
        '<strong>Done-for-you setup.</strong> Goodcall is built to be set up by the owner. Some owners would rather hand the script, integrations and tuning to a team.',
        "<strong>A specific booking system.</strong> Goodcall's site names Google Calendar, HighLevel and Zapier. A business that schedules in ServiceTitan or HubSpot checks how each option books into it.",
        '<strong>A person available.</strong> Some buyers want live receptionists on some or all calls, which Smith.ai, Ruby and PATLive offer.',
        '<strong>One vendor for the website and Google profile.</strong> Some owners want the whole front door handled together.',
      ],
      sections: [
        {
          h2: 'Per caller, per minute or per call: which is cheaper for you?',
          body: "<p>Take 100 calls a month from 100 different people, averaging three minutes each. On published entry plans, Goodcall's Starter covers them for <strong>$79</strong>. Upfirst, billed per call, comes to <strong>$129.95</strong> ($24.95 plus 70 extra calls at $1.50). Dialzara, billed per minute, comes to <strong>$144.20</strong> ($29 plus 240 extra minutes at $0.48).</p><p>Change the pattern and the order changes. If 60 regular customers make those 100 calls, Goodcall counts 60 callers, while per-call and per-minute plans still count every call. If calls average one minute, Dialzara's bill drops to $48.20. Per-caller billing suits repeat callers; per-minute suits short calls; per-call suits long ones. Higher tiers on every vendor lower the unit rate. See the full <a href=\"/ai-receptionist-cost\">AI receptionist cost comparison</a>.</p>",
        },
      ],
      bestFor: [
        { need: 'The lowest AI entry price', pick: 'Upfirst ($24.95/mo for 30 calls) or Dialzara ($29/mo for 60 minutes)' },
        { need: 'Included minutes and English and Spanish answering', pick: 'Rosie ($49/mo for 250 minutes)' },
        { need: 'Phone, text and website chat from one AI', pick: 'My AI Front Desk ($99/mo for 200 voice minutes)' },
        { need: 'AI with live receptionists on the same line', pick: 'Smith.ai (AI free tier of 25 calls, then $3 per call)' },
        { need: 'Live US-based receptionists only', pick: 'Ruby ($250/mo for 50 minutes) or PATLive ($99/mo for 50 minutes)' },
        { need: 'Done-for-you setup with ServiceTitan or HubSpot booking, plus website and Google profile', pick: '<a href="/agents/inbound">Keres AI</a> (Remi quoted to your call volume)' },
      ],
      notFor: [
        '<strong>You want to build and adjust the agent yourself at the lowest price.</strong> Self-serve tools such as Goodcall, Upfirst and Dialzara suit that. Keres AI sets Remi up for you and quotes it to your volume.',
        '<strong>You want a live person on every call.</strong> Ruby and PATLive answer with people.',
        '<strong>You need a BAA.</strong> Keres AI is not HIPAA or SOC 2 certified and does not sign BAAs.',
      ],
      switchNote: 'Export the instructions and FAQs you wrote for your Goodcall agent; they give us a head start on Remi’s script, and we add your escalation rules on the call.',
    },
    faqs: [
      { q: 'Is Keres AI a good Goodcall alternative?', a: 'It fits owners who would rather not build and maintain the agent themselves. Keres AI writes the call flows, connects the calendar or CRM and tunes Remi after launch. If you prefer to configure your own agent for a low monthly price, a self-serve tool may suit you better.' },
      { q: 'Do I have to set up Keres AI myself?', a: 'No. Keres AI sets Remi up for you and agrees the timing on your first call, and you test Remi yourself before it answers a customer.' },
      { q: 'Does Keres AI integrate with my field-service software?', a: 'ServiceTitan, Google Calendar and HubSpot today, plus Zapier. Jobber and Housecall Pro are rolling out.' },
    ],
  },
  {
    slug: 'rosie-alternative',
    competitor: 'Rosie',
    category: 'AI answering service',
    pillar: 'inbound',
    title: 'Rosie Alternatives (2026): AI Answering Prices | Keres AI',
    description: 'Six Rosie alternatives side by side: AI, human or hybrid, how each one bills, and the lowest published price, plus where Keres AI fits.',
    h1Accent: 'Rosie',
    intro: 'Rosie is a low-cost AI answering service on monthly plans with included minutes. If you are comparing alternatives, the differences are price per minute or call, who answers, and how much setup you want to do yourself. Here are the main options with the prices each vendor publishes, and where Keres AI fits.',
    roundup: ['Goodcall', 'Dialzara', 'Upfirst', 'My AI Front Desk', 'Smith.ai', 'PATLive'],
    rows: [],
    detail: {
      linkLabel: 'Rosie alternatives',
      keresAnswer: 'Keres AI is a Rosie alternative for local service businesses that want the appointment booked during the call and the setup done for them. Its AI receptionist, Remi, answers in two rings, 24/7, in English, and books into Google Calendar, HubSpot or ServiceTitan. Keres AI charges a monthly rate with included minutes, then per minute, with no per-call fees, and can also run your website and Google Business Profile.',
      priceH2: 'How much does Rosie cost?',
      price: "<p>Rosie's Professional plan is <strong>$49 a month for 250 minutes</strong>, per <a href=\"https://heyrosie.com/pricing\" rel=\"noopener nofollow\" target=\"_blank\">heyrosie.com/pricing</a> on October 11, 2026. It includes custom message taking, appointment links sent by text, spam detection and a website chat widget, and Rosie offers a 7-day free trial. Annual billing gives two months free. We did not find a rate for minutes past the plan on the pricing page. At three minutes a call, 250 minutes is about 83 calls a month.</p>",
      why: [
        '<strong>Booking on the call.</strong> Owners who want the appointment booked while the caller is on the line compare which plan includes calendar booking.',
        '<strong>Field-service and CRM integrations.</strong> A contractor on ServiceTitan or a team on HubSpot checks that the job lands there directly.',
        '<strong>Someone else to set it up.</strong> Some owners want a team to write the script and tune the receptionist after launch.',
      ],
      sections: [
        {
          h2: 'What should you compare beyond price?',
          body: "<ul><li><strong>Booking.</strong> Rosie's pricing page lists appointment links by text on Professional and direct calendar booking on its Scale plan and up. Check that any option books into the calendar or CRM you use. Keres AI books into Google Calendar, HubSpot or ServiceTitan.</li><li><strong>Escalation.</strong> Rosie lists warm and live call transfers on Scale and up. Ask every vendor how an urgent call reaches you: transfer, text or both.</li><li><strong>Who sets it up.</strong> Ask who writes the script and tunes the receptionist after launch. Self-serve tools leave that to you, though some, such as Dialzara and Upfirst, include onboarding help. Keres AI sets up Remi for you after a 20-minute call.</li><li><strong>Languages.</strong> Rosie answers in English and Spanish on every call. Remi answers in English today, so if many of your callers speak Spanish, weigh that first.</li></ul>",
        },
      ],
      bestFor: [
        { need: 'The lowest entry price', pick: 'Upfirst ($24.95/mo for 30 calls) or Dialzara ($29/mo for 60 minutes)' },
        { need: 'An inexpensive AI receptionist in many languages', pick: 'Upfirst' },
        { need: 'Billing by caller instead of by minute', pick: 'Goodcall ($79/mo for 100 unique callers)' },
        { need: 'Phone, text and website chat from one AI', pick: 'My AI Front Desk ($99/mo for 200 voice minutes)' },
        { need: 'Live US-based receptionists with bilingual answering included', pick: 'PATLive ($99/mo for 50 minutes)' },
        { need: 'AI with live receptionists on the same line', pick: 'Smith.ai (AI free tier of 25 calls, then $3 per call)' },
        { need: 'Done-for-you setup with ServiceTitan or HubSpot booking, plus website and Google profile', pick: '<a href="/agents/inbound">Keres AI</a> (Remi quoted to your call volume)' },
      ],
      notFor: [
        '<strong>Many of your callers speak Spanish.</strong> Remi answers in English today; Rosie and PATLive answer in English and Spanish.',
        '<strong>You want the lowest published price and will set it up yourself.</strong> Rosie at $49 for 250 minutes, or Upfirst and Dialzara under $30, suit that better.',
        '<strong>You want a person on every call.</strong> PATLive answers with live receptionists; Smith.ai offers people and AI.',
        '<strong>You need a BAA.</strong> Keres AI is not HIPAA or SOC 2 certified and does not sign BAAs.',
      ],
      switchNote: 'Share the message-taking scenarios you set up in Rosie and tell us which calls should be booked rather than messaged; that becomes Remi’s booking rules.',
    },
    faqs: [
      { q: 'Is Keres AI a good Rosie alternative?', a: 'It fits businesses that want Remi to book appointments into ServiceTitan, HubSpot or Google Calendar during the call and want the setup done for them. If you want the lowest monthly price or Spanish answering today, Rosie may suit you better.' },
      { q: 'What does Keres AI do beyond answering the call?', a: 'Remi asks your intake questions, books the appointment, texts your team when a call is urgent, and reports in a morning text. Keres AI can also run your website and Google Business Profile through Found, from $249 a month.' },
    ],
  },
  {
    slug: 'dialpad-alternative',
    competitor: 'Dialpad',
    category: 'Business phone & AI contact center',
    pillar: 'inbound',
    title: 'The Best Dialpad Alternative for Booking Calls | Keres AI',
    description:
      'Looking at Dialpad alternatives? Keres AI is a done-for-you AI receptionist that answers and books every call — purpose-built for booking appointments, not enterprise telephony.',
    h1Accent: 'Dialpad',
    intro:
      'Dialpad is a full business-phone and AI contact-center platform built for larger teams. Keres is purpose-built for one outcome: answering every call and booking the appointment, fully managed for service businesses — without the cost and complexity of an enterprise phone system.',
    rows: [
      { feature: 'AI answers & books appointments', keres: 'Yes', them: 'Limited' },
      { feature: 'Purpose-built for service businesses', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup', keres: 'Yes', them: 'No' },
      { feature: 'Field-service integrations', keres: 'Yes', them: 'Limited' },
      { feature: 'Outbound email worker available (Sol, priced separately)', keres: 'Yes', them: 'Limited' },
    ],
    faqs: [
      { q: 'Is Keres a good Dialpad alternative?', a: 'Yes — if your goal is answering and booking every call rather than running an enterprise phone system. Keres is a focused, done-for-you AI receptionist for service businesses.' },
      { q: 'Can I keep my existing phone number?', a: "Yes. You point your existing number at Keres; there's no need to rip out your phone system." },
    ],
  },
  {
    slug: 'answering-legal-alternative',
    competitor: 'AnsweringLegal',
    category: 'Legal answering service',
    pillar: 'inbound',
    title: 'AnsweringLegal Alternatives for Law Firms (2026) | Keres AI',
    description: 'Five AnsweringLegal alternatives for law firms side by side: live, AI or hybrid answering, how each bills, and the lowest published price.',
    h1Accent: 'AnsweringLegal',
    intro: 'AnsweringLegal answers for law firms only, with US-based receptionists; it does not publish prices. If you are comparing alternatives, the choice is live receptionists, AI, or both, and how you are billed. Here are the main options with the prices each vendor publishes, and where Keres AI fits.',
    roundup: ['Smith.ai', 'Ruby', 'PATLive', 'Abby Connect', 'Upfirst'],
    rows: [],
    detail: {
      linkLabel: 'AnsweringLegal alternatives',
      keresAnswer: 'Keres AI is an AnsweringLegal alternative for law firms that want an AI receptionist to run intake and book the consultation during the call. Its receptionist, Remi, answers in two rings, 24/7, asks your intake questions by practice area, collects the caller’s and opposing party’s names so your firm can run its conflict check, and texts the on-call attorney when a call is urgent. Keres AI bills a monthly rate with included minutes, then per minute.',
      priceH2: 'How much does AnsweringLegal cost?',
      price: "<p>AnsweringLegal does not publish its prices. On October 11, 2026, its <a href=\"https://www.answeringlegal.com/answering-service-pricing-plans\" rel=\"noopener nofollow\" target=\"_blank\">pricing page</a> showed packages only after a form was submitted, so we cannot list a figure. Its homepage advertised 400 free minutes to start, and the site says there are no long-term contracts or setup fees. To compare like for like, ask for the monthly fee, the minutes included and the rate past the plan, then set those against the published prices in the table below.</p>",
      why: [
        '<strong>Prices to compare before a sales call.</strong> Ruby, PATLive, Smith.ai, Abby Connect and Upfirst all publish an entry price.',
        '<strong>The consultation booked during the call.</strong> Some firms want a booked consultation, not a message the firm has to return.',
        '<strong>AI for overflow and after-hours.</strong> Some firms want AI at a lower entry price, or people and AI on one line.',
        '<strong>The firm website and Google Business Profile from the same team.</strong> Keres AI’s Found for law firms is $499 a month and can sit alongside Remi.',
      ],
      sections: [
        {
          h2: 'What should a law firm look for in an AnsweringLegal alternative?',
          body: "<ul><li><strong>Intake questions by practice area.</strong> A personal-injury call needs different questions from a family-law or criminal-defense call.</li><li><strong>Opposing-party capture.</strong> The receptionist should collect the caller's and opposing party's names so your firm can run its conflict check before the consultation.</li><li><strong>On-call attorney escalation.</strong> Clear rules for which calls reach an attorney right away, such as a new arrest or a filing deadline.</li><li><strong>Calendar booking.</strong> Whether the consultation is booked on the call or left as a message.</li><li><strong>Case-management sync.</strong> AnsweringLegal's site names Clio Grow, MyCase, PracticePanther, Smokeball, Lawmatics and others. Check that your system is supported by any alternative. Keres AI's Clio and Lawmatics integrations are rolling out; today Remi books through Google Calendar, HubSpot or Zapier.</li><li><strong>Confidentiality terms.</strong> Ask every vendor for them in writing. Keres AI is not SOC 2 certified and does not sign BAAs or DPAs.</li></ul><p>More on how Remi handles intake for firms: <a href=\"/industries/law-firms\">Keres AI for law firms</a>.</p>",
        },
      ],
      bestFor: [
        { need: 'Live US-based receptionists with a published price', pick: 'Ruby ($250/mo for 50 minutes) or PATLive ($99/mo for 50 minutes)' },
        { need: 'AI and people on one line, billed per call', pick: 'Smith.ai (human plans from $300/mo for 30 calls)' },
        { need: 'A receptionist team with AI for routine calls', pick: 'Abby Connect ($165/mo for 50 human minutes; AI minutes count as half)' },
        { need: 'The lowest AI entry price', pick: 'Upfirst ($24.95/mo for 30 calls)' },
        { need: 'AI intake that books the consultation, plus the firm website and Google profile', pick: '<a href="/industries/law-firms">Keres AI</a> (Remi quoted to your call volume; Found for law firms $499/mo)' },
      ],
      notFor: [
        '<strong>Your firm wants a person to answer every call.</strong> Stay with a live service: AnsweringLegal, Ruby or PATLive. Remi is AI.',
        '<strong>You want the lowest published price and will set it up yourself.</strong> Upfirst starts at $24.95 a month.',
        '<strong>Your firm requires a BAA, a DPA or a SOC 2 report from vendors.</strong> Keres AI does not provide them.',
      ],
      switchNote: 'Bring your intake questions by practice area and your on-call schedule; those become Remi’s questions and escalation rules.',
    },
    faqs: [
      { q: 'Is Keres AI a good AnsweringLegal alternative for law firms?', a: 'It fits firms that want consultations booked on the call and billing terms they can see up front. Remi asks your case-type questions, collects the caller’s and opposing party’s names so your firm can run its conflict check, and books the consultation. Firms that want a person on every call should stay with a live legal answering service.' },
      { q: 'Can an AI receptionist handle legal intake?', a: 'Yes, within the rules your firm sets. Remi is set up with your practice areas, asks the intake questions your firm requires, collects the caller’s and opposing party’s names so your firm can run its conflict check, and routes urgent calls to the on-call attorney. It does not give legal advice.' },
    ],
  },
  {
    slug: 'numa-alternative',
    competitor: 'Numa',
    category: 'AI phone agent for small business',
    pillar: 'inbound',
    title: 'The Best Numa Alternative — Books the Job | Keres',
    description:
      'Looking for a Numa alternative? Keres AI answers every call in two rings, qualifies leads, and books appointments live on your calendar — purpose-built for service businesses.',
    h1Accent: 'Numa',
    intro:
      'Numa is an AI phone agent focused on text-based interactions and missed-call deflection. Keres goes further: it answers every call live, qualifies the caller, books the appointment on your calendar during the conversation, and dispatches emergencies by text — with full field-service integrations.',
    rows: [
      { feature: 'Answers every call live (not just texts)', keres: 'Yes', them: 'Limited' },
      { feature: 'Books appointments during the call', keres: 'Yes', them: 'No' },
      { feature: 'ServiceTitan integration', keres: 'Yes', them: 'Varies' },
      { feature: 'Emergency dispatch alerts', keres: 'Yes', them: 'No' },
      { feature: 'Done-for-you setup', keres: 'Yes', them: 'Self-serve' },
    ],
    faqs: [
      { q: 'Is Keres a better Numa alternative for home services?', a: 'For businesses that need live appointment booking and field-service integrations, yes. Keres answers calls and books jobs directly in ServiceTitan, and Housecall Pro — Numa focuses on text and missed-call deflection.' },
      { q: 'Does Keres answer calls or just text back?', a: 'Keres answers live — a real AI voice picks up within two rings, qualifies the caller, and books the appointment during the call. Text follow-up is also sent as a confirmation.' },
    ],
  },
  {
    slug: 'openphone-alternative',
    competitor: 'OpenPhone',
    category: 'Business phone system',
    pillar: 'inbound',
    title: 'The Best OpenPhone Alternative | Keres AI',
    description:
      'Looking for an OpenPhone alternative? Keres AI is a done-for-you AI receptionist that answers every call 24/7 and books appointments — not just a shared phone inbox.',
    h1Accent: 'OpenPhone',
    intro:
      'OpenPhone is a team phone and messaging platform for routing and responding to calls. Keres is an AI receptionist that handles the call end to end — answering in two rings, qualifying the lead, booking the appointment, and pushing a summary to your CRM — without a human having to pick up.',
    rows: [
      { feature: 'AI answers calls automatically 24/7', keres: 'Yes', them: 'No' },
      { feature: 'Books appointments during the call', keres: 'Yes', them: 'No' },
      { feature: 'Lead qualification and CRM sync', keres: 'Yes', them: 'Limited' },
      { feature: 'Field-service integrations', keres: 'Yes', them: 'No' },
      { feature: 'No per-seat pricing', keres: 'Yes', them: 'No' },
      { feature: 'Team phone inbox', keres: 'No', them: 'Yes' },
    ],
    faqs: [
      { q: 'Is Keres a good OpenPhone alternative?', a: 'If you want calls answered and appointments booked automatically, yes. OpenPhone is a team communication tool; Keres is a fully autonomous AI receptionist. They serve different goals — Keres replaces voicemail and after-hours gaps, not your internal team phone system.' },
      { q: 'Can Keres forward calls to my team?', a: 'Yes — after qualifying, Keres can transfer hot leads or emergencies to your on-call team member or owner.' },
    ],
  },
  {
    slug: 'calendly-alternative',
    competitor: 'Calendly',
    category: 'Online scheduling tool',
    pillar: 'inbound',
    title: 'The Best Calendly Alternative for Inbound Calls | Keres AI',
    description:
      'Calendly handles online self-scheduling. Keres AI handles inbound calls — answering every call 24/7, qualifying the caller, and booking the appointment in real time without a link.',
    h1Accent: 'Calendly',
    intro:
      'Calendly is an online self-scheduling link for callers who are already online. Keres fills the gap Calendly cannot: answering every inbound phone call 24/7, qualifying the caller by voice, and booking the appointment in real time — for the majority of service customers who pick up the phone rather than filling out a form.',
    rows: [
      { feature: 'Answers inbound phone calls 24/7', keres: 'Yes', them: 'No' },
      { feature: 'Books during the call (no link required)', keres: 'Yes', them: 'No' },
      { feature: 'Lead qualification before booking', keres: 'Yes', them: 'No' },
      { feature: 'Online self-scheduling link', keres: 'No', them: 'Yes' },
      { feature: 'Field-service integrations', keres: 'Yes', them: 'Limited' },
      { feature: 'Emergency call routing', keres: 'Yes', them: 'No' },
    ],
    faqs: [
      { q: 'Is Keres better than Calendly for service businesses?', a: 'They solve different problems. Calendly is for online booking when a prospect is already on your website. Keres handles inbound phone calls — the primary booking channel for HVAC, plumbing, roofing, dental, and most service businesses.' },
      { q: 'Can Keres and Calendly work together?', a: 'Yes. Keres books directly onto your Google Calendar, the same calendar Calendly can use. You can run both: Keres for phone, Calendly for web.' },
    ],
  },
];
