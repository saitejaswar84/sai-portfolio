import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  kicker,
  onDark = false,
}: {
  index: string;
  title: string;
  kicker?: string;
  onDark?: boolean;
}) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-block border-4 border-black px-3 py-1 font-black text-sm tracking-widest ${
            onDark ? 'bg-neo-secondary text-black' : 'bg-black text-white'
          } -rotate-2 shadow-[4px_4px_0px_0px_#000]`}
          style={onDark ? { boxShadow: '4px 4px 0 0 #fff' } : undefined}
        >
          {index}
        </span>
        {kicker && (
          <span
            className={`font-black text-sm uppercase tracking-[0.25em] ${
              onDark ? 'text-white' : 'text-black'
            }`}
          >
            {kicker}
          </span>
        )}
      </div>
      <h2
        className={`mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl ${
          onDark ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border-2 border-black bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-black shadow-[3px_3px_0px_0px_#000]">
      {children}
    </span>
  );
}
