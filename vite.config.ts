import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'localhost',
    proxy: {
      "/api": {
        target: 'http://localhost:4000',
        changeOrigin: false,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@' : fileURLToPath( new URL('./src', import.meta.url))
    }
  }
})


/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@' : fileURLToPath( new URL('./src', import.meta.url))
    }
  }
})


import server from './server';
import colors from 'colors'
import connectDB from './config/db';

const PORT = +process.env.PORT || 4000;

async function startServer() {
  await connectDB()

  server.listen(PORT, '127.0.0.1', () => {
    console.log(colors.bgGreen.white.bold( "Server Corriendo en el puerto:" + PORT));
  });
}

startServer();
*/