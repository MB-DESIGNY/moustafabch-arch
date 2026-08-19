// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['ar', 'en', 'fr'],
    defaultLocale: 'ar',
    routing: {
      redirectToDefaultLocale: false,
    }
  },
  trailingSlash: 'never'
});
