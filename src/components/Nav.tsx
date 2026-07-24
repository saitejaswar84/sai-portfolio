import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Container } from './primitives';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-black bg-neo-bg">
      <Container className="flex h-16 items-center justify-between sm:h-18">
        <a href="#top" className="group flex items-center gap-3 font-black">
          <span className="grid h-10 w-10 place-items-center border-4 border-black bg-neo-accent shadow-[3px_3px_0px_0px_#000] transition-transform duration-100 group-hover:-rotate-6">
            <Zap className="h-5 w-5 fill-black text-black" strokeWidth={3} />
          </span>
          <span className="text-base uppercase tracking-tight text-black">
            Sai Tejaswar
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-bold uppercase tracking-wide text-black transition-all duration-100 hover:bg-neo-secondary hover:shadow-[3px_3px_0px_0px_#000]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-push ml-3 border-4 border-black bg-neo-accent px-4 py-2 text-sm font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_0px_#000]"
          >
            Get in touch
          </a>
        </nav>

        <button
          className="btn-push grid h-11 w-11 place-items-center border-4 border-black bg-neo-secondary shadow-[3px_3px_0px_0px_#000] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="overflow-hidden border-t-4 border-black bg-neo-bg md:hidden"
          >
            <Container className="flex flex-col gap-3 py-5">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`btn-push border-4 border-black bg-white px-4 py-3 text-sm font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_0px_#000] ${
                    i % 2 === 0 ? 'rotate-[0.4deg]' : '-rotate-[0.4deg]'
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-push border-4 border-black bg-neo-accent px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_0px_#000]"
              >
                Get in touch
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
