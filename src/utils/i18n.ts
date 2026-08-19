/**
 * i18n utility functions for Draft Studio Astro project
 */

export const supportedLocales = ['ar', 'en', 'fr'] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = 'ar';

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (supportedLocales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (supportedLocales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

export function getPathWithLocale(pathname: string, locale: Locale): string {
  const cleanPath = getPathWithoutLocale(pathname);
  return `/${locale}${cleanPath}`;
}

export async function getTranslations(locale: Locale) {
  try {
    const module = await import(`../i18n/${locale}.json`);
    return module.default;
  } catch (error) {
    console.warn(`Translation file for ${locale} not found, falling back to ${defaultLocale}`);
    const module = await import(`../i18n/${defaultLocale}.json`);
    return module.default;
  }
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}
