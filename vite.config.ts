import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { streamChat, type ChatMessage } from './api/_chat-core';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Dev-only: serve POST /api/chat locally so the AI chat works with `npm run dev`.
      // In production this route is handled by the Vercel function in api/chat.ts.
      {
        name: 'dev-chat-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }
            const apiKey = env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.end(
                'NVIDIA_API_KEY is not set. Create a .env file with NVIDIA_API_KEY=nvapi-... to enable the AI chat locally.'
              );
              return;
            }
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              let messages: ChatMessage[] = [];
              try {
                const parsed = JSON.parse(body || '{}');
                messages = Array.isArray(parsed.messages) ? parsed.messages : [];
              } catch {
                res.statusCode = 400;
                res.end('Invalid JSON body.');
                return;
              }
              void streamChat({
                messages,
                apiKey,
                model: env.CHAT_MODEL || process.env.CHAT_MODEL,
                res,
              });
            });
          });
        },
      },
    ],
  };
});
