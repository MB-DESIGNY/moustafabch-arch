// i18n utility for Draft Studio
// Supports ar (default/RTL), en, fr locales

export const locales = ['ar', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (locales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

export function getPathWithLocale(pathname: string, locale: Locale): string {
  const cleanPath = getPathWithoutLocale(pathname);
  return `/${locale}${cleanPath}`;
}

export async function getTranslations(locale: Locale): Promise<Record<string, string>> {
  try {
    const module = await import(`../i18n/${locale}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return {};
  }
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}
