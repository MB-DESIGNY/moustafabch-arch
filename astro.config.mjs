import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date(),
    }),
  ],
  adapter: cloudflare({
    routesToExclude: ['**/*'], // Exclude all routes from Cloudflare Functions, build as static
  }),
  vite: {
    server: {
      port: 4321,
    },
  },
});
