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

// `vite preview` (appType 'mpa') serves clean URLs like /about only with a
// trailing slash (/about/), because its static server has no equivalent of
// nginx's `try_files $uri $uri/index.html`. Rewrite extensionless requests
// to add the slash so local preview matches production's clean no-slash URLs.
const cleanUrlFallback: Plugin = {
  name: 'clean-url-fallback',
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url ?? '';
      const [pathname, query = ''] = url.split('?');
      if (pathname !== '/' && !pathname.endsWith('/') && !path.extname(pathname)) {
        req.url = `${pathname}/${query ? `?${query}` : ''}`;
      }
      next();
    });
  },
};

export default defineConfig(({ mode, isPreview }) => {
  const env = loadEnv(mode, '.', '');
  const umamiId = env.VITE_UMAMI_WEBSITE_ID || process.env.VITE_UMAMI_WEBSITE_ID;
  return {
    // 'mpa' disables Vite's SPA fallback in `vite preview`, which otherwise
    // serves dist/index.html for every route and produces a false-positive
    // hydration mismatch when testing prerendered pages locally (nginx in
    // production already serves each route's own index.html correctly).
    // Dev server keeps the default (client-side routing needs the fallback).
    appType: isPreview ? 'mpa' : 'spa',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react(), tailwindcss(), injectUmami(umamiId), cleanUrlFallback],
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
