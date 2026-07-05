import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Injects the Umami tracking script only when a website ID is configured
// (repo variable UMAMI_WEBSITE_ID in CI, VITE_UMAMI_WEBSITE_ID in .env.local).
// No ID -> no script tag -> no 404s before the analytics server exists.
const injectUmami = (websiteId: string | undefined): Plugin => ({
  name: 'inject-umami',
  transformIndexHtml(html) {
    if (!websiteId) return html;
    return html.replace(
      '</head>',
      `    <script defer src="https://analytics.leonardosa.pro/script.js" data-website-id="${websiteId}"></script>\n</head>`
    );
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const umamiId = env.VITE_UMAMI_WEBSITE_ID || process.env.VITE_UMAMI_WEBSITE_ID;
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react(), tailwindcss(), injectUmami(umamiId)],
    ssgOptions: {
      dirStyle: 'nested',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
