import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isLocal = env.VITE_LOCAL === 'true';

  return {
    plugins: [react(), tailwindcss()],
    server: isLocal
      ? {
          host: 'localhost',
          proxy: {
            '/api': {
              target: 'http://localhost:4000',
              changeOrigin: false,
              secure: false,
            },
          },
        }
      : undefined,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
