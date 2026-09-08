// Locale plumbing. English lives at /, Spanish at /es/…. A page is
// "translated" when it exists in both trees; the switcher on any other
// page sends you to the other language's homepage rather than a 404.

export type Locale = 'en' | 'es';
export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';
export const localeNames: Record<Locale, string> = { en: 'English', es: 'Español' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', es: 'es_US' };

/** English paths that have a Spanish twin under /es. */
export const translatedPaths = [
  '/', '/quote', '/custom',
  '/go', '/go/home-services', '/go/law', '/go/dental',
  '/go/website', '/go/website/home-services', '/go/website/law', '/go/website/dental',
];

/** Normalises a route or built filename ("/es/go.html", "/es/") to its English route ("/go"). */
export const stripLocale = (path: string): string => {
  let p = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (p.length > 1) p = p.replace(/\/$/, '');
  if (p === '/es') return '/';
  return p.startsWith('/es/') ? p.slice(3) : p;
};

export const localePath = (locale: Locale, path: string): string => {
  const base = stripLocale(path);
  if (locale === 'en') return base;
  return base === '/' ? '/es' : `/es${base}`;
};

/** The same page in the other language, or that language's homepage. */
export const counterpart = (locale: Locale, path: string): { locale: Locale; href: string } => {
  const other: Locale = locale === 'en' ? 'es' : 'en';
  const base = stripLocale(path);
  return { locale: other, href: localePath(other, translatedPaths.includes(base) ? base : '/') };
};

/** Internal links inside translated pages stay in-language when a twin exists. */
export const l = (locale: Locale, path: string): string =>
  locale === 'es' && translatedPaths.includes(stripLocale(path)) ? localePath('es', path) : path;
