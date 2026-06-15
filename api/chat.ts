// Vercel serverless function: POST /api/chat
// Streams a Kimi K2.6 (via NVIDIA) response grounded in Sai's resume.
// Requires the NVIDIA_API_KEY environment variable (set in Vercel project settings).
import { streamChat, type ChatMessage } from './_chat-core';

export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method Not Allowed');
    return;
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.end(
      'NVIDIA_API_KEY is not configured on the server. Add it in your Vercel project settings.'
    );
    return;
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    res.statusCode = 400;
    res.end('Invalid JSON body.');
    return;
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  await streamChat({
    messages,
    apiKey,
    model: process.env.CHAT_MODEL,
    res,
  });
}
