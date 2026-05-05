import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
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
      proxy: {
        '/api/media/youtube': {
          target: env.VITE_SUPABASE_URL,
          changeOrigin: true,
          rewrite: () => '/functions/v1/youtube-latest-video',
        },
        '/api/media/substack': {
          target: env.VITE_SUPABASE_URL,
          changeOrigin: true,
          rewrite: () => '/functions/v1/substack-latest',
        },
      },
    },
  };
});
