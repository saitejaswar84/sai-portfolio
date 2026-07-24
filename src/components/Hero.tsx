import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, MapPin, Star } from 'lucide-react';
import { Container } from './primitives';
import { profile, stats } from '../data/resume';

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden border-4 border-black bg-neo-secondary px-4 py-2 shadow-[6px_6px_0px_0px_#000] -rotate-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="inline-block font-black uppercase tracking-tight text-black"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const statColors = ['bg-white', 'bg-neo-secondary', 'bg-neo-muted', 'bg-neo-accent'];
const statTilts = ['-rotate-1', 'rotate-1', '-rotate-1', 'rotate-1'];

export default function Hero() {
  return (
    <section id="top" className="bg-graph relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* Floating primitive shapes (the chaos zone) */}
      <Star
        className="animate-spin-slow absolute right-[8%] top-24 hidden h-16 w-16 fill-neo-secondary text-black lg:block"
        strokeWidth={2.5}
        aria-hidden
      />
      <div
        className="absolute -right-8 top-1/2 hidden h-24 w-24 rounded-full border-4 border-black bg-neo-muted lg:block"
        aria-hidden
      />
      <div
        className="absolute right-[18%] top-[62%] hidden h-12 w-12 rotate-12 border-4 border-black bg-neo-accent shadow-[6px_6px_0px_0px_#000] lg:block"
        aria-hidden
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="inline-flex -rotate-2 items-center gap-2 border-4 border-black bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000]"
        >
          <span className="h-2.5 w-2.5 animate-pulse rounded-full border-2 border-black bg-neo-accent" />
          Available for AI/ML roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
          className="mt-8 font-display font-black uppercase leading-[0.85] tracking-tighter"
        >
          <span className="block text-5xl text-black sm:text-7xl md:text-8xl">
            Sai Tejaswar
          </span>
          <span className="text-stroke block text-5xl sm:text-7xl md:text-8xl">
            Reddy Dalli
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease: 'easeOut' }}
          className="mt-8 text-xl sm:text-2xl"
        >
          <RotatingRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18, ease: 'easeOut' }}
          className="mt-8 max-w-2xl border-l-8 border-black bg-white p-4 text-lg font-bold leading-snug shadow-[6px_6px_0px_0px_#000] sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.24, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => window.dispatchEvent(new Event('open-chat'))}
            className="btn-push inline-flex h-14 w-full items-center justify-center gap-2 border-4 border-black bg-neo-accent px-6 text-sm font-black uppercase tracking-wide text-black shadow-[6px_6px_0px_0px_#000] sm:w-auto"
          >
            <Sparkles size={18} strokeWidth={3} />
            Ask my AI anything
          </button>
          <a
            href="#projects"
            className="btn-push group inline-flex h-14 w-full items-center justify-center gap-2 border-4 border-black bg-white px-6 text-sm font-black uppercase tracking-wide text-black shadow-[6px_6px_0px_0px_#000] sm:w-auto"
          >
            View work
            <ArrowRight
              size={18}
              strokeWidth={3}
              className="transition-transform duration-100 group-hover:translate-x-1"
            />
          </a>
          <a
            href="/Sai-Tejaswar-Reddy-Dalli-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center gap-2 border-b-4 border-transparent px-2 text-sm font-black uppercase tracking-wide text-black transition-all duration-100 hover:border-black"
          >
            <FileText size={18} strokeWidth={3} />
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide"
        >
          <MapPin size={16} strokeWidth={3} />
          {profile.location} · {profile.relocation}
        </motion.div>

        {/* Stats: a row of colored sticker cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.36, ease: 'easeOut' }}
          className="mt-14 grid grid-cols-2 gap-5 sm:mt-20 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`card-lift border-4 border-black p-5 shadow-[8px_8px_0px_0px_#000] sm:p-6 ${statColors[i % 4]} ${statTilts[i % 4]}`}
            >
              <div className="font-display text-4xl font-black tracking-tighter text-black sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-sm font-bold uppercase tracking-wide text-black">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
