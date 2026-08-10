import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Pure static output for Cloudflare Workers Static Assets (no adapter)
export default defineConfig({
  site: 'https://phxwax.salon',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      priority: 0.8,
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
