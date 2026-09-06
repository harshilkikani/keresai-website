// Data-driven city pages → /ai-receptionist/{slug}. Each entry has unique,
// metro-specific content (intro + local demand drivers + a local FAQ) so pages
// are genuinely differentiated, not thin doorway pages.
export interface City {
  slug: string;
  city: string;
  state: string; // abbreviation
  stateFull: string;
  intro: string; // unique, references the metro
  drivers: string[]; // local demand drivers
  faq: { q: string; a: string };
}

/** State-hub slug from a full state name, e.g. "North Carolina" → "north-carolina". */
export const stateSlug = (stateFull: string) =>
  stateFull.toLowerCase().replace(/\s+/g, '-');

export const cities: City[] = [
  {
    slug: 'houston',
    city: 'Houston',
    state: 'TX',
    stateFull: 'Texas',
    intro:
      'Houston’s sprawl, summer heat, and hurricane-season storms keep home-services phones ringing around the clock — and a single missed storm call can be a five-figure roofing or restoration job lost to the next contractor.',
    drivers: [
      'Hurricane and flood season drives surges of emergency roofing, restoration, and plumbing calls',
      'Brutal summer heat means after-hours HVAC no-cool emergencies',
      'A huge, spread-out metro where speed-to-answer wins the job',
    ],
    faq: { q: 'Does Keres work for Houston home-services businesses?', a: 'Yes. Keres answers Houston contractors’ calls 24/7, books jobs, and flags storm and no-cool emergencies to your on-call crew instantly — across the whole metro.' },
  },
  {
    slug: 'phoenix',
    city: 'Phoenix',
    state: 'AZ',
    stateFull: 'Arizona',
    intro:
      'In Phoenix, triple-digit summers turn every AC failure into an emergency, and the calls don’t wait for business hours. Miss one and the customer calls the next HVAC company that actually picks up.',
    drivers: [
      'Extreme desert heat creates year-round, after-hours HVAC emergency demand',
      'Fast metro growth means high call volume for contractors and clinics',
      'Snowbird seasonality spikes booking and reschedule requests',
    ],
    faq: { q: 'Is Keres a good fit for Phoenix HVAC companies?', a: 'Very — Phoenix HVAC demand peaks exactly when offices are closed. Keres answers every no-cool call 24/7 and dispatches emergencies to your team in seconds.' },
  },
  {
    slug: 'dallas',
    city: 'Dallas',
    state: 'TX',
    stateFull: 'Texas',
    intro:
      'The Dallas–Fort Worth metroplex is one of the fastest-growing markets in the country, and that growth means more inbound calls than most front desks can answer — especially for home services, real estate, and clinics.',
    drivers: [
      'Rapid metroplex growth drives heavy inbound lead volume',
      'Hailstorms trigger roofing and auto-glass call surges',
      'Competitive real estate market where instant lead response wins listings',
    ],
    faq: { q: 'Can Keres handle high call volume in Dallas–Fort Worth?', a: 'Yes — Keres answers unlimited simultaneous calls, so a hailstorm or a busy listing day never sends DFW callers to voicemail.' },
  },
  {
    slug: 'atlanta',
    city: 'Atlanta',
    state: 'GA',
    stateFull: 'Georgia',
    intro:
      'Atlanta’s traffic and sprawl mean crews are often far from the office and far from the phone. For contractors and clinics across metro Atlanta, the calls that go unanswered during a job are the ones that go to a competitor.',
    drivers: [
      'Spread-out metro keeps field crews away from the phone',
      'Humid summers and storms drive HVAC and roofing demand',
      'Dense professional and medical market with high-value intake calls',
    ],
    faq: { q: 'Does Keres cover the whole Atlanta metro?', a: 'Yes. Wherever your Atlanta crews are working, Keres answers every call, books the job, and texts your team for emergencies.' },
  },
  {
    slug: 'chicago',
    city: 'Chicago',
    state: 'IL',
    stateFull: 'Illinois',
    intro:
      'Chicago’s harsh winters make no-heat calls a true emergency, and they rarely arrive at a convenient hour. For HVAC, plumbing, and restoration companies, after-hours coverage isn’t optional — it’s the difference between the job and a frozen pipe going to someone else.',
    drivers: [
      'Brutal winters drive after-hours no-heat and burst-pipe emergencies',
      'Dense metro with high competition for fast-response service',
      'Large professional and dental market with steady intake volume',
    ],
    faq: { q: 'Is Keres useful for Chicago plumbing and HVAC companies?', a: 'Absolutely — Chicago’s winter emergencies hit nights and weekends. Keres answers every call 24/7 and dispatches burst-pipe and no-heat emergencies immediately.' },
  },
  {
    slug: 'miami',
    city: 'Miami',
    state: 'FL',
    stateFull: 'Florida',
    intro:
      'Miami’s heat, humidity, and hurricane exposure keep AC, roofing, and restoration phones busy year-round, and a bilingual, always-on front desk is a real advantage in a market this diverse.',
    drivers: [
      'Year-round heat and humidity drive constant HVAC demand',
      'Hurricane season spikes roofing and restoration emergencies',
      'Diverse market where 24/7, multilingual answering wins more leads',
    ],
    faq: { q: 'Can Keres handle Miami’s seasonal call surges?', a: 'Yes — Keres scales to unlimited simultaneous calls, so hurricane-season surges and summer AC demand never overwhelm your front desk.' },
  },
  {
    slug: 'los-angeles',
    city: 'Los Angeles',
    state: 'CA',
    stateFull: 'California',
    intro:
      'Across the sprawling LA basin, customers expect an instant answer and book the first business that provides it. For med spas, clinics, real estate teams, and home-services pros, slow phone response quietly hands leads to competitors.',
    drivers: [
      'Enormous, spread-out market where speed-to-answer decides the booking',
      'Dense med-spa, wellness, and aesthetics market with high-value bookings',
      'Competitive real estate where instant lead response wins clients',
    ],
    faq: { q: 'Does Keres work for LA med spas and clinics?', a: 'Yes — Keres answers every call, books treatments and consultations on your calendar, and captures ad- and social-driven leads 24/7 across the LA metro.' },
  },
  {
    slug: 'charlotte',
    city: 'Charlotte',
    state: 'NC',
    stateFull: 'North Carolina',
    intro:
      'Charlotte’s rapid population growth has pulled in waves of new home-services and professional businesses, and the ones that answer every call are the ones capturing the region’s booming demand.',
    drivers: [
      'Fast-growing metro with rising home-services and contractor demand',
      'Storm season drives roofing and tree-service call spikes',
      'Expanding professional and financial-services market',
    ],
    faq: { q: 'Is Keres a fit for growing Charlotte businesses?', a: 'Yes — as Charlotte grows, call volume outpaces front desks. Keres answers and books every lead 24/7 so growth never means missed calls.' },
  },
  {
    slug: 'tampa',
    city: 'Tampa',
    state: 'FL',
    stateFull: 'Florida',
    intro:
      'Tampa Bay’s heat, storms, and steady population growth keep service phones ringing, and after-hours emergencies are common. Missing them means handing high-value jobs to the next company on the list.',
    drivers: [
      'Subtropical heat drives constant HVAC and pool-service demand',
      'Hurricane and storm season spikes roofing and restoration calls',
      'Growing retiree population with steady home and health bookings',
    ],
    faq: { q: 'Can Keres handle after-hours calls in Tampa?', a: 'Yes — Keres answers 24/7, books the job, and immediately flags storm and AC emergencies to your Tampa-area crew.' },
  },
  {
    slug: 'denver',
    city: 'Denver',
    state: 'CO',
    stateFull: 'Colorado',
    intro:
      'Denver’s wild temperature swings — hail in spring, deep cold in winter — create unpredictable surges of HVAC, roofing, and plumbing calls that a traditional front desk can’t absorb on its own.',
    drivers: [
      'Severe hailstorms drive sudden roofing and auto-glass call surges',
      'Cold winters create after-hours no-heat emergencies',
      'Active, fast-growing metro with strong home-services demand',
    ],
    faq: { q: 'Does Keres help Denver roofing companies during hail season?', a: 'Yes — when a hailstorm sends call volume through the roof, Keres answers every call at once, qualifies, and books, so no storm lead is lost.' },
  },
  {
    slug: 'las-vegas',
    city: 'Las Vegas',
    state: 'NV',
    stateFull: 'Nevada',
    intro:
      'Las Vegas runs 24/7, and so do its service needs. Desert heat makes AC failures urgent, and a city that never sleeps expects a business that answers at any hour.',
    drivers: [
      'Extreme desert heat drives urgent, around-the-clock HVAC demand',
      'A 24/7 city where customers expect after-hours answers',
      'Fast growth across home services and clinics',
    ],
    faq: { q: 'Is 24/7 answering important in Las Vegas?', a: 'Very — in a 24/7 city with extreme heat, calls come at all hours. Keres answers every one and dispatches AC emergencies to your team instantly.' },
  },
  {
    slug: 'austin',
    city: 'Austin',
    state: 'TX',
    stateFull: 'Texas',
    intro:
      'Austin’s explosive growth has flooded local service businesses with more leads than they can answer, and in a tech-savvy market, customers expect a fast, modern response on every call.',
    drivers: [
      'Booming population growth drives heavy inbound lead volume',
      'Hot summers create steady HVAC and pool-service demand',
      'Tech-forward market that expects fast, modern service response',
    ],
    faq: { q: 'Can Keres keep up with Austin’s growth?', a: 'Yes — Keres scales instantly to handle Austin’s rising call volume, booking every lead 24/7 without you hiring more front-desk staff.' },
  },
];

// ── State hubs → /ai-receptionist/state/{slug} ──────────────────────────────
// Aggregates the city pages above into a state-level tier so the geographic IA
// reads AI Receptionist → State → City. State-specific copy keeps each hub a
// genuine page, not a thin index of its cities.
export interface StateHub {
  slug: string; // e.g. "texas"
  state: string; // abbreviation, e.g. "TX"
  stateFull: string; // e.g. "Texas"
  intro: string; // unique, references the state's service economy
  drivers: string[]; // state-wide demand drivers
  faq: { q: string; a: string };
}

const stateCopy: Record<string, { intro: string; drivers: string[]; faq: { q: string; a: string } }> = {
  Texas: {
    intro:
      'From Gulf Coast hurricanes to triple-digit summers, Texas keeps service phones ringing across Houston, Dallas–Fort Worth, and Austin. In a state this large and fast-growing, the business that answers first wins the job — and Keres answers every call, 24/7, in every Texas metro.',
    drivers: [
      'Hurricane and hail seasons trigger roofing, restoration, and plumbing surges statewide',
      'Extreme summer heat drives year-round HVAC no-cool emergencies',
      'Rapid population growth across Texas metros means more leads than front desks can answer',
    ],
    faq: { q: 'Does Keres work for service businesses across Texas?', a: 'Yes. Keres answers calls 24/7 for contractors and clinics in Houston, Dallas–Fort Worth, Austin, and every Texas market — booking jobs and dispatching storm and no-cool emergencies instantly.' },
  },
  Florida: {
    intro:
      'Florida’s heat, humidity, and hurricane exposure keep AC, roofing, and restoration phones busy all year, from Miami to Tampa Bay. With a 24/7, multilingual front desk, Florida service businesses capture the storm-season and after-hours calls competitors miss.',
    drivers: [
      'Year-round heat and humidity drive constant HVAC and pool-service demand',
      'Hurricane season spikes roofing and restoration emergencies statewide',
      'Large retiree and seasonal population keeps home and health bookings steady',
    ],
    faq: { q: 'Can Keres handle Florida’s hurricane-season call surges?', a: 'Yes — Keres answers unlimited simultaneous calls, so storm surges across Miami, Tampa, and the rest of Florida never overwhelm your front desk or send callers to voicemail.' },
  },
  Arizona: {
    intro:
      'In Arizona, triple-digit desert heat turns every AC failure into an emergency, and Phoenix’s fast growth keeps contractors and clinics flooded with calls. Keres answers every no-cool emergency around the clock so no Arizona lead waits on hold.',
    drivers: [
      'Extreme desert heat creates year-round, after-hours HVAC emergencies',
      'Fast metro growth drives heavy inbound volume for contractors and clinics',
      'Snowbird seasonality spikes booking and reschedule requests',
    ],
    faq: { q: 'Is Keres a good fit for Arizona HVAC companies?', a: 'Very — Arizona HVAC demand peaks exactly when offices are closed. Keres answers every no-cool call 24/7 and dispatches emergencies to your team in seconds.' },
  },
  Georgia: {
    intro:
      'Across metro Atlanta and the rest of Georgia, traffic and sprawl keep crews far from the phone, and humid summers drive steady HVAC and roofing demand. Keres answers every call wherever your Georgia crews are working.',
    drivers: [
      'Spread-out metros keep field crews away from the phone',
      'Humid summers and storms drive HVAC and roofing demand',
      'Dense professional and medical market with high-value intake calls',
    ],
    faq: { q: 'Does Keres cover all of Georgia?', a: 'Yes. Wherever your Georgia crews are working — across metro Atlanta and beyond — Keres answers every call, books the job, and texts your team for emergencies.' },
  },
  Illinois: {
    intro:
      'Illinois winters make no-heat calls a true emergency, and they rarely arrive at a convenient hour. For HVAC, plumbing, and restoration companies from Chicago outward, 24/7 coverage is the difference between booking the job and losing it to a frozen pipe.',
    drivers: [
      'Brutal winters drive after-hours no-heat and burst-pipe emergencies',
      'Dense metros with high competition for fast-response service',
      'Large professional and dental market with steady intake volume',
    ],
    faq: { q: 'Is Keres useful for Illinois plumbing and HVAC companies?', a: 'Absolutely — Illinois winter emergencies hit nights and weekends. Keres answers every call 24/7 and dispatches burst-pipe and no-heat emergencies immediately.' },
  },
  California: {
    intro:
      'Across California’s vast, competitive markets, customers expect an instant answer and book the first business that provides it. For med spas, clinics, real estate teams, and home-services pros from Los Angeles outward, slow phone response quietly hands leads to competitors.',
    drivers: [
      'Enormous, spread-out markets where speed-to-answer decides the booking',
      'Dense med-spa, wellness, and aesthetics market with high-value bookings',
      'Competitive real estate where instant lead response wins clients',
    ],
    faq: { q: 'Does Keres work for California med spas and clinics?', a: 'Yes — Keres answers every call, books treatments and consultations on your calendar, and captures ad- and social-driven leads 24/7 across California markets.' },
  },
  'North Carolina': {
    intro:
      'North Carolina’s rapid growth, led by Charlotte, has pulled in waves of new home-services and professional businesses. The ones that answer every call are the ones capturing the state’s booming demand.',
    drivers: [
      'Fast-growing metros with rising home-services and contractor demand',
      'Storm season drives roofing and tree-service call spikes',
      'Expanding professional and financial-services market',
    ],
    faq: { q: 'Is Keres a fit for growing North Carolina businesses?', a: 'Yes — as North Carolina grows, call volume outpaces front desks. Keres answers and books every lead 24/7 so growth never means missed calls.' },
  },
  Colorado: {
    intro:
      'Colorado’s wild temperature swings — hail in spring, deep cold in winter — create unpredictable surges of HVAC, roofing, and plumbing calls that a traditional front desk can’t absorb. Keres scales to every surge across the Denver metro and beyond.',
    drivers: [
      'Severe hailstorms drive sudden roofing and auto-glass call surges',
      'Cold winters create after-hours no-heat emergencies',
      'Active, fast-growing metros with strong home-services demand',
    ],
    faq: { q: 'Does Keres help Colorado roofing companies during hail season?', a: 'Yes — when a hailstorm sends call volume through the roof, Keres answers every call at once, qualifies, and books, so no Colorado storm lead is lost.' },
  },
  Nevada: {
    intro:
      'Nevada runs around the clock, and so do its service needs. Las Vegas’s desert heat makes AC failures urgent, and a state that never sleeps expects a business that answers at any hour.',
    drivers: [
      'Extreme desert heat drives urgent, around-the-clock HVAC demand',
      'A 24/7 economy where customers expect after-hours answers',
      'Fast growth across home services and clinics',
    ],
    faq: { q: 'Is 24/7 answering important in Nevada?', a: 'Very — in a 24/7 state with extreme heat, calls come at all hours. Keres answers every one and dispatches AC emergencies to your team instantly.' },
  },
};

// Derive one hub per unique state present in `cities`, in first-appearance order.
export const states: StateHub[] = (() => {
  const seen = new Map<string, StateHub>();
  for (const c of cities) {
    if (seen.has(c.stateFull)) continue;
    const copy = stateCopy[c.stateFull];
    if (!copy) continue;
    seen.set(c.stateFull, {
      slug: stateSlug(c.stateFull),
      state: c.state,
      stateFull: c.stateFull,
      ...copy,
    });
  }
  return [...seen.values()];
})();

/** Cities belonging to a given state hub slug. */
export const citiesInState = (slug: string) =>
  cities.filter((c) => stateSlug(c.stateFull) === slug);
