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
    }));

  return rss({
    title: 'Keres AI — Resources & Guides',
    description:
      'Playbooks and case studies on AI receptionists, missed-call recovery, appointment automation, and AI outbound for service businesses.',
    site: context.site ?? ORIGIN,
    items,
  });
}
