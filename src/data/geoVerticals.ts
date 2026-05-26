// Geo × vertical pages → /ai-receptionist/{city}/{vertical}.
// These sit one level below city hubs and combine three unique content sources
// so pages are genuinely differentiated, never thin doorway pages:
//   1. City data (local metro context + demand drivers) from cities.ts
//   2. Industry data (vertical workflow, pains, what Keres books) from industries.ts
//   3. The hand-written combo copy below (the specific local × trade angle)
//
// `verticalSlug` is the URL segment ("plumbing"); `industrySlug` is the lookup
// key into industries.ts ("plumbers"), which can differ.
export interface GeoVertical {
  citySlug: string;
  verticalSlug: string; // URL segment
  industrySlug: string; // industries.ts key
  verticalLabel: string; // display, e.g. "HVAC"
  // 2–3 sentences: the specific reason this trade in this metro loses calls.
  angle: string;
  // 3–4 combined local × vertical pain points unique to this page.
  localPains: string[];
  // One sentence on what booking looks like for this trade in this metro.
  bookingFocus: string;
  // Combo-specific FAQ (in addition to composed city/vertical FAQs).
  faq: { q: string; a: string };
}

export const geoVerticals: GeoVertical[] = [
  {
    citySlug: 'phoenix',
    verticalSlug: 'hvac',
    industrySlug: 'hvac',
    verticalLabel: 'HVAC',
    angle:
      'In Phoenix, a failed AC unit in July is not an inconvenience — at 115°F it is a health emergency, especially for elderly residents and young children. No-cool calls spike from late afternoon through midnight, long after most HVAC offices have closed, and the homeowner calls down the list until someone picks up.',
    localPains: [
      'Triple-digit afternoons turn every no-cool call into an urgent, time-sensitive job',
      'Evening and overnight AC failures land when your office is already closed',
      'Monsoon dust storms foul condensers and trigger sudden call surges',
      'Snowbird-season reschedules and tune-up demand pile onto an already-busy phone',
    ],
    bookingFocus:
      'Keres books emergency no-cool visits, AC repairs, and seasonal tune-ups around the clock, and texts your on-call tech the moment a Phoenix call is a true heat emergency.',
    faq: {
      q: 'Can Keres handle Phoenix no-cool emergencies after hours?',
      a: 'Yes. Keres answers every call in two rings, 24/7, recognizes a no-cool emergency in extreme heat, captures the address and situation, books the visit, and immediately texts your on-call Phoenix tech — so a vulnerable customer is never left on hold in 115°F heat.',
    },
  },
  {
    citySlug: 'houston',
    verticalSlug: 'roofing',
    industrySlug: 'roofing',
    verticalLabel: 'roofing',
    angle:
      "Houston roofs take a beating from Gulf hurricanes, hail, and relentless humidity, and after a major storm the first contractor to inspect a damaged roof usually wins the insurance claim. When hundreds of homeowners call at once, a front desk that can't pick up hands five-figure jobs straight to competitors.",
    localPains: [
      'Hurricane and hail events trigger massive simultaneous call surges your office cannot absorb',
      'The first roofer to inspect typically wins the insurance claim — speed decides the job',
      'After-hours storm-damage calls go unanswered while competitors pick up',
      'Estimators stuck on roofs all day miss the inbound calls that drive the next job',
    ],
    bookingFocus:
      'Keres answers unlimited simultaneous storm calls, qualifies the damage type, books the inspection or estimate, and dispatches emergency tarp jobs — so no Houston storm lead is lost to a busy signal.',
    faq: {
      q: 'How does Keres handle a Houston storm-season call surge for roofers?',
      a: 'Keres answers unlimited simultaneous calls, so when a hurricane or hailstorm sends hundreds of Houston homeowners dialing at once, every one is answered in two rings, qualified, and booked for an inspection — before a competitor picks up.',
    },
  },
  {
    citySlug: 'dallas',
    verticalSlug: 'roofing',
    industrySlug: 'roofing',
    verticalLabel: 'roofing',
    angle:
      'Dallas–Fort Worth sits in the heart of hail alley, and spring hailstorms from March through May generate some of the highest roofing call volumes in the country in a matter of hours. The metroplex is fiercely competitive, so the roofer who answers and inspects first is the one who signs the contract.',
    localPains: [
      'Spring hail season drives sudden, enormous call spikes across the entire metroplex',
      'Intense DFW competition means the fastest responder wins the insurance job',
      'Hundreds of homeowners call in the same afternoon a storm rolls through',
      'Field estimators cannot answer the phone while they are up on a roof',
    ],
    bookingFocus:
      'Keres captures every hail-damage lead the instant it calls, qualifies the claim, and books the inspection on your estimators’ calendars so Dallas storm demand turns into booked jobs, not voicemails.',
    faq: {
      q: 'Can Keres keep up with Dallas hail-season call volume for roofing companies?',
      a: 'Yes — DFW hailstorms can generate a season’s worth of calls in a single afternoon. Keres answers unlimited simultaneous calls, qualifies each hail-damage lead, and books inspections automatically, so no Dallas storm lead slips through.',
    },
  },
  {
    citySlug: 'chicago',
    verticalSlug: 'plumbing',
    industrySlug: 'plumbers',
    verticalLabel: 'plumbing',
    angle:
      "Chicago's deep winters turn plumbing into emergency work: frozen and burst pipes, failed water heaters, and spring-thaw sump-pump floods that arrive at 2 a.m. and can't wait until morning. The city's aging housing stock makes these failures common, and the homeowner calls whoever answers first while water is on the floor.",
    localPains: [
      'Sub-zero snaps cause burst-pipe emergencies that hit overnight and on weekends',
      'Spring thaw and heavy rain overwhelm sump pumps and flood basements',
      'Aging Chicago housing stock means frequent water-heater and pipe failures',
      'Plumbers on a job can’t answer the next emergency call while competitors do',
    ],
    bookingFocus:
      'Keres answers every burst-pipe and flooded-basement call around the clock, captures the address and severity, books the visit, and texts your on-call Chicago plumber immediately.',
    faq: {
      q: 'Can Keres dispatch after-hours burst-pipe emergencies in Chicago?',
      a: 'Yes. When a pipe bursts at 2 a.m. in a Chicago cold snap, Keres answers in two rings, identifies the emergency, captures the location and details, books the visit, and texts your on-call plumber instantly — so the job is yours, not the next number on the list.',
    },
  },
  {
    citySlug: 'miami',
    verticalSlug: 'hvac',
    industrySlug: 'hvac',
    verticalLabel: 'HVAC',
    angle:
      "Miami's heat and humidity run year-round, so AC systems work overtime and fail constantly — and a dead unit in a humid Florida summer quickly becomes a mold and air-quality problem, not just discomfort. Add hurricane-season power events and a large Spanish-speaking customer base, and an always-on, bilingual front desk becomes a real competitive edge.",
    localPains: [
      'Year-round heat and humidity keep AC systems under constant strain and failing often',
      'A dead unit in Florida humidity fast becomes a mold and air-quality emergency',
      'Hurricane-season power surges and outages spike repair demand',
      'A large bilingual customer base expects a front desk that answers in English or Spanish',
    ],
    bookingFocus:
      'Keres answers every Miami AC call 24/7 — in English or Spanish — books the repair or maintenance visit, and flags humidity-driven emergencies to your on-call tech right away.',
    faq: {
      q: 'Does Keres handle bilingual HVAC calls in Miami?',
      a: 'Yes. Keres answers Miami AC calls around the clock and can handle callers in English or Spanish, qualifying the issue, booking the repair, and dispatching urgent humidity- and heat-driven failures to your team immediately.',
    },
  },
  {
    citySlug: 'denver',
    verticalSlug: 'roofing',
    industrySlug: 'roofing',
    verticalLabel: 'roofing',
    angle:
      'Denver and the Front Range are among the most hail-battered regions in the country, and a single summer hailstorm can damage thousands of roofs in minutes. High-altitude UV and wild temperature swings accelerate roof wear, so storm season brings an avalanche of inspection and insurance-claim calls that no front desk can answer alone.',
    localPains: [
      'Front Range hail is among the most destructive in the U.S., damaging thousands of roofs at once',
      'A single hailstorm triggers a flood of simultaneous inspection and claim calls',
      'High-altitude UV and rapid temperature swings drive steady repair and replacement demand',
      'Estimators in the field during peak season can’t answer the inbound calls that fuel the pipeline',
    ],
    bookingFocus:
      'Keres answers every Denver hail-damage call at once, qualifies the claim, and books inspections and estimates so a storm surge becomes a full calendar, not a string of missed calls.',
    faq: {
      q: 'Can Keres handle Denver hail-storm roofing surges?',
      a: 'Yes — when a Front Range hailstorm damages thousands of roofs in minutes, Keres answers unlimited simultaneous calls, qualifies each hail-damage lead, and books inspections automatically, so your Denver crew’s calendar fills instead of your voicemail.',
    },
  },
];

/** Geo × vertical combos for a given city slug — used for city-page cross-links. */
export const geoVerticalsForCity = (citySlug: string) =>
  geoVerticals.filter((g) => g.citySlug === citySlug);
