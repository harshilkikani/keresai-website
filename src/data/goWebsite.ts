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
}

export const goWebsitePages: GoWebsitePage[] = [
  {
    slug: '',
    path: '/go/website',
    title: 'A Website That Books the Job, Live in 5 Days | Keres AI',
    description: 'A conversion website with click-to-call and booking wired in, and your Google listing managed every week. $249/month, no build fee, month-to-month, live in five days.',
    vertical: 'local service firms',
    industry: '',
  },
];

export const goWebsiteBySlug = (slug: string) => goWebsitePages.find((g) => g.slug === slug);
