// /go/website and /go/website/[vertical] — the Found landing.
// One page, one promise: a website that books the job, live in five days.
// Every number is a published fact ($249, five days, no build fee).
// Nothing on these pages sells the answering agent beyond a single line
// under the form; the page is about the site and the listing.

export interface GoWebsitePage {
  slug: string;              // '' for /go/website
  path: string;
  title: string;             // < 60 chars
  description: string;
  /** Fills "Built for [vertical], …" in the lede. */
  vertical: string;
  /** Pre-selects the quote form's industry. '' = no preselect. */
  industry: '' | 'home-services' | 'law' | 'dental';
  /** The Found floor for this vertical, as printed. Law firms are from $499. */
  price: string;
}

export const goWebsitePages: GoWebsitePage[] = [
  {
    slug: '',
    path: '/go/website',
    title: 'A Website That Books the Job, Live in 5 Days | Keres AI',
    description: 'A conversion website with click-to-call and booking wired in, and your Google listing managed every week. $249/month, no build fee, month-to-month, live in five days.',
    vertical: 'local service firms',
    industry: '',
    price: '$249',
  },
  {
    slug: 'home-services',
    path: '/go/website/home-services',
    title: 'HVAC & Plumbing Website That Books the Job | Keres AI',
    description: 'A website built for HVAC and plumbing companies: click-to-call, booking wired in, your Google listing managed every week. $249/month, no build fee, live in five days.',
    vertical: 'HVAC and plumbing companies',
    industry: 'home-services',
    price: '$249',
  },
  {
    slug: 'law',
    path: '/go/website/law',
    title: 'Law Firm Website That Books the Consult | Keres AI',
    description: 'A website built for law firms: click-to-call, consult booking wired in, your Google listing managed every week. Law-firm plans from $499/month, no build fee, live in five days.',
    vertical: 'law firms',
    industry: 'law',
    price: '$499',
  },
  {
    slug: 'dental',
    path: '/go/website/dental',
    title: 'Dental Practice Website That Books the Chair | Keres AI',
    description: 'A website built for dental practices: click-to-call, booking wired in, your Google listing managed every week. $249/month, no build fee, live in five days.',
    vertical: 'dental practices',
    industry: 'dental',
    price: '$249',
  },
];

export const goWebsiteBySlug = (slug: string) => goWebsitePages.find((g) => g.slug === slug);
