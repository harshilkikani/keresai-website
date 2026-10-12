import rss from '@astrojs/rss';
import { guides } from '../data/guides';

const ORIGIN = 'https://www.keresai.com';

export function GET(context) {
  const items = [...guides]
    .sort((a, b) => a.order - b.order)
    .map((g) => ({
      title: g.listTitle,
      description: g.listDesc,
      link: `${ORIGIN}/guides/${g.slug}.html`,
      categories: [g.category],
      pubDate: new Date(g.datePublished + 'T12:00:00Z'),
    }));

  return rss({
    title: 'Keres AI — Resources & Guides',
    description:
      'Guides from Keres AI on answering and booking every call, after-hours coverage, automation ROI and the tools local service businesses use.',
    site: context.site ?? ORIGIN,
    items,
  });
}
