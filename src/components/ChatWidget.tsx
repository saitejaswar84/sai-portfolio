import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowUp, Bot } from 'lucide-react';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What’s your experience with RAG and LLMs?',
  'Tell me about your fraud-detection work.',
  'What’s your strongest tech stack?',
  'Are you open to relocation?',
];

const GREETING =
  "Hi! I’m Sai’s AI assistant. Ask me anything about his experience, projects, or skills, like his work on RAG systems, fraud detection, or MLOps.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Open from anywhere via window.dispatchEvent(new Event('open-chat'))
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const next: Msg[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setBusy(true);

    // placeholder assistant message we stream into
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const errText = (await res.text().catch(() => '')) || 'The AI service is unavailable.';
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: `⚠️ ${errText}` };
          return copy;
        });
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: 'assistant',
          content:
            '⚠️ Couldn’t reach the AI service. If you’re running locally, start it with `npm run dev` (or `vercel dev`) and make sure NVIDIA_API_KEY is set.',
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  const showGreeting = messages.length === 0;

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-on-accent shadow-lg shadow-accent/20 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
            aria-label="Open AI chat"
          >
            <Sparkles size={18} />
            <span className="hidden sm:inline">Ask my AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm sm:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 bottom-3 top-16 z-50 flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface/85 shadow-2xl backdrop-blur-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[600px] sm:max-h-[80vh] sm:w-[400px]"
            >
              {/* header */}
              <div className="flex items-center justify-between border-b border-line bg-surface-2/70 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
                    <Bot size={18} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-fg">Sai&apos;s AI Assistant</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-fg"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>

              {/* messages */}
              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                {showGreeting && (
                  <>
                    <Bubble role="assistant" content={GREETING} />
                    <div className="space-y-2 pt-1">
                      {SUGGESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          className="glass block w-full rounded-xl px-3.5 py-2.5 text-left text-sm text-muted transition-colors hover:border-accent/40 hover:text-fg"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {messages.map((m, i) => (
                  <Bubble
                    key={i}
                    role={m.role}
                    content={m.content}
                    typing={busy && i === messages.length - 1 && m.role === 'assistant' && m.content === ''}
                  />
                ))}
              </div>

              {/* input */}
              <div className="border-t border-line bg-surface-2/70 p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-end gap-2 rounded-xl border border-line bg-glass p-1.5 focus-within:border-accent/50"
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    placeholder="Ask about my experience…"
                    className="max-h-28 flex-1 resize-none bg-transparent px-2.5 py-1.5 text-sm text-fg placeholder:text-faint focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || busy}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-on-accent transition-opacity disabled:opacity-30"
                    aria-label="Send"
                  >
                    <ArrowUp size={16} />
                  </button>
                </form>
                <p className="mt-2 text-center text-[10px] text-faint">
                  AI responses may contain mistakes. Verify important details.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({
  role,
  content,
  typing = false,
}: {
  role: 'user' | 'assistant';
  content: string;
  typing?: boolean;
}) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-accent text-on-accent'
            : 'rounded-bl-sm border border-line bg-glass text-fg'
        }`}
      >
        {typing ? <TypingDots /> : content}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}
