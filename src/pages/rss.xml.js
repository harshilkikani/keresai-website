import rss from '@astrojs/rss';
import { guides } from '../data/guides';

const ORIGIN = 'https://www.keresai.com';
const noon = (d) => new Date(d + 'T12:00:00Z');

export function GET(context) {
  const sorted = [...guides].sort((a, b) => a.order - b.order);
  const items = sorted.map((g) => ({
    title: g.listTitle,
    description: g.listDesc,
    link: `${ORIGIN}/guides/${g.slug}.html`,
    categories: [g.category],
    // Each guide's own publish date from src/data/guides.ts.
    pubDate: noon(g.datePublished),
  }));
  // The feed last changed when the most recently updated guide did, not at build time.
  const lastBuild = new Date(Math.max(...sorted.map((g) => noon(g.dateModified ?? g.datePublished).getTime())));

  return rss({
    title: 'Keres AI — Resources & Guides',
    description:
      'Guides from Keres AI on answering and booking every call, after-hours coverage, automation ROI and the tools local service businesses use.',
    site: context.site ?? ORIGIN,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: [
      `<atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml"/>`,
      '<language>en-us</language>',
      `<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>`,
    ].join(''),
    items,
  });
}
