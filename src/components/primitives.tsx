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
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
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
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-accent">
        <span>{index}</span>
        <span className="h-px w-10 bg-accent/50" />
        {kicker && <span className="uppercase text-muted">{kicker}</span>}
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="glass rounded-full px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg">
      {children}
    </span>
  );
}
