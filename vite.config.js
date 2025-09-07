import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Custom plugin to add iframe headers
    {
      name: 'iframe-headers',
      configureServer: (server) => {
        server.middlewares.use((req, res, next) => {
          // Remove X-Frame-Options to allow iframe embedding
          res.removeHeader('X-Frame-Options');
          // Allow all origins to embed this in iframe
          res.setHeader('Content-Security-Policy', "frame-ancestors *;");
          next();
        });
      },
    }
  ],
  server: {
    headers: {
      // Remove iframe restrictions for development
      'Content-Security-Policy': "frame-ancestors *;"
    }
  }
})
