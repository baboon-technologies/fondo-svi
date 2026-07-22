import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { pathToFileURL } from 'url';

interface CoreResult {
  status: number;
  body: unknown;
}

interface CoreModule {
  getYahooQuote(symbol: string): Promise<CoreResult>;
  getLatestYouTube(): Promise<CoreResult>;
  getLatestSubstack(): Promise<CoreResult>;
}

// Serves the same endpoints as the Vercel functions in api/ so that
// `npm run dev` behaves like production (same-origin /api/* fetches).
function devApi(): Plugin {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const pathname = url.pathname;

        if (
          pathname !== '/api/yahoo-quote' &&
          pathname !== '/api/media/youtube' &&
          pathname !== '/api/media/substack'
        ) {
          return next();
        }

        try {
          const corePath = path.resolve(__dirname, 'api/_lib/core.mjs');
          const core = (await import(pathToFileURL(corePath).href)) as CoreModule;

          let result: CoreResult;
          if (pathname === '/api/yahoo-quote') {
            const symbol = url.searchParams.get('symbol') || '0P0001TB5J.F';
            result = await core.getYahooQuote(symbol);
          } else if (pathname === '/api/media/youtube') {
            result = await core.getLatestYouTube();
          } else {
            result = await core.getLatestSubstack();
          }

          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(result.body));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : 'Internal dev API error',
            })
          );
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devApi()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
