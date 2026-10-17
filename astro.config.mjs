// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site is published from the Varunpoojari.github.io repository, so it is
// served at the domain root and needs no `base`. If you ever publish it from a
// project repository instead (e.g. github.com/Varunpoojari/portfolio), set
// `base: '/portfolio'` — every asset path uses import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://varunpoojari.github.io',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
