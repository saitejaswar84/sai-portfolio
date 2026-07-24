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
  'Hi! I’m Sai’s AI assistant. Ask me anything about his experience, projects, or skills, like his work on RAG systems, fraud detection, or MLOps.';

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
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
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
            initial={{ scale: 0, rotate: -6 }}
            animate={{ scale: 1, rotate: -2 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={() => setOpen(true)}
            className="btn-push fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 border-4 border-black bg-neo-accent px-4 text-sm font-black uppercase tracking-wide text-black shadow-[6px_6px_0px_0px_#000] sm:bottom-6 sm:right-6"
            aria-label="Open AI chat"
          >
            <Sparkles size={20} strokeWidth={3} />
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
              transition={{ duration: 0.12 }}
              onClick={() => setOpen(false)}
              className="bg-halftone fixed inset-0 z-50 bg-black/60 sm:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed inset-x-3 bottom-3 top-20 z-50 flex flex-col overflow-hidden border-4 border-black bg-neo-bg shadow-[10px_10px_0px_0px_#000] sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[600px] sm:max-h-[80vh] sm:w-[400px]"
            >
              {/* header */}
              <div className="flex items-center justify-between border-b-4 border-black bg-neo-secondary px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center border-4 border-black bg-white shadow-[3px_3px_0px_0px_#000]">
                    <Bot size={20} strokeWidth={3} className="text-black" />
                  </span>
                  <div>
                    <div className="text-sm font-black uppercase tracking-wide text-black">
                      Sai&apos;s AI Assistant
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-black">
                      <span className="h-2 w-2 border border-black bg-neo-accent" />
                      Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="btn-push grid h-9 w-9 place-items-center border-4 border-black bg-white shadow-[3px_3px_0px_0px_#000]"
                  aria-label="Close chat"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

              {/* messages */}
              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                {showGreeting && (
                  <>
                    <Bubble role="assistant" content={GREETING} />
                    <div className="space-y-2.5 pt-1">
                      {SUGGESTIONS.map((q, i) => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          className={`block w-full border-2 border-black bg-white px-3.5 py-2.5 text-left text-sm font-bold shadow-[3px_3px_0px_0px_#000] transition-all duration-100 hover:bg-neo-secondary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                            i % 2 === 0 ? 'rotate-[0.3deg]' : '-rotate-[0.3deg]'
                          }`}
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
              <div className="border-t-4 border-black bg-white p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-end gap-2"
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
                    placeholder="ASK ABOUT MY EXPERIENCE…"
                    className="max-h-28 min-h-12 flex-1 resize-none border-4 border-black bg-white px-3 py-2.5 text-sm font-bold text-black placeholder:text-black/40 focus:bg-neo-secondary focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || busy}
                    className="btn-push grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-neo-accent shadow-[4px_4px_0px_0px_#000] disabled:opacity-40"
                    aria-label="Send"
                  >
                    <ArrowUp size={20} strokeWidth={3} className="text-black" />
                  </button>
                </form>
                <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-wide text-black">
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
        className={`max-w-[85%] whitespace-pre-wrap border-2 border-black px-3.5 py-2.5 text-sm font-bold leading-relaxed ${
          isUser
            ? 'bg-black text-white shadow-[3px_3px_0px_0px_#FF6B6B]'
            : 'bg-white text-black shadow-[3px_3px_0px_0px_#000]'
        }`}
      >
        {typing ? <TypingDots /> : content}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 border border-black bg-neo-secondary"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeOut' }}
        />
      ))}
    </span>
  );
}
