// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site is published from the Varunpoojari.github.io repository, so it is
// served at the domain root and needs no `base`. If you ever publish it from a
// project repository instead (e.g. github.com/Varunpoojari/portfolio), set
// `base: '/portfolio'` — every asset path uses import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://varunpoojari.github.io',
  // The CTF's evidence locker stays out of the sitemap, as robots.txt asks.
  integrations: [sitemap({ filter: (page) => !page.includes('/evidence-locker') })],
  build: { inlineStylesheets: 'auto' },
});
