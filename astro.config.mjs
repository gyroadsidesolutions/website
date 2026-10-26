import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gyroadsidesolutions.com',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    sanity({
      projectId: '02066cqd',
      dataset: 'production',
      studioBasePath: '/admin',
    }),
  ],
});
