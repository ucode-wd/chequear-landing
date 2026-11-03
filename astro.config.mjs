// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  site: 'https://chequearapp.com.ar',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/compra/') }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});