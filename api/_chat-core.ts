// Runtime-agnostic chat handler shared by the Vercel serverless function
// (api/chat.ts) and the local Vite dev middleware (vite.config.ts).
//
// Uses Moonshot AI's Kimi K2.6 through NVIDIA's OpenAI-compatible NIM endpoint.
// The system prompt that grounds the assistant lives in ./_resume-context.ts.
import { SYSTEM_PROMPT } from './_resume-context.js';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Minimal writable-response shape satisfied by both Node's ServerResponse
// and Vercel's response object.
interface ResLike {
  statusCode: number;
  setHeader(name: string, value: string): void;
  write(chunk: string): void;
  end(data?: string): void;
}

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODEL = 'moonshotai/kimi-k2.6';
const MAX_HISTORY = 12; // keep the last N turns to bound cost
const MAX_CHARS = 4000; // per-message guard

function sanitize(messages: ChatMessage[]): ChatMessage[] {
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
}

export async function streamChat(opts: {
  messages: ChatMessage[];
  apiKey: string;
  model?: string;
  res: ResLike;
}): Promise<void> {
  const { apiKey, res } = opts;
  const model = opts.model || DEFAULT_MODEL;
  const messages = sanitize(opts.messages);

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('A user message is required.');
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const response = await fetch(NVIDIA_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 1024,
        temperature: 0.6,
        top_p: 0.95,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errText = (await response.text().catch(() => '')) || '';
      res.write(
        `\n\n[The assistant ran into an error (${response.status}). ${errText.slice(
          0,
          300
        )} Please try again, or email tejaswar8484@gmail.com.]`
      );
      res.end();
      return;
    }

    // Parse the OpenAI-compatible Server-Sent Events stream.
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let finished = false;

    while (!finished) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? ''; // keep any incomplete trailing line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') {
          finished = true;
          break;
        }
        try {
          const json = JSON.parse(data);
          const delta = json?.choices?.[0]?.delta?.content;
          // Safety net: the prompt asks the model to avoid em dashes, but strip any
          // that slip through (replace "word — word" with "word, word").
          if (typeof delta === 'string' && delta) res.write(delta.replace(/\s*—\s*/g, ', '));
        } catch {
          // ignore keep-alive / non-JSON lines
        }
      }
    }
    res.end();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    try {
      res.write(
        `\n\n[The assistant ran into an error: ${message}. Please try again, or email tejaswar8484@gmail.com.]`
      );
    } finally {
      res.end();
    }
  }
}
