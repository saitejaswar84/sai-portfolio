import { useEffect } from 'react';
import { liquidGlass, type LiquidGlassHandle } from './lib/liquidGlass';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  // Liquid specular: track the pointer over glass panes so the light spot
  // (.glass-hover::after) glides across them like light on water.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.('.glass-hover');
      if (!(target instanceof HTMLElement)) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${e.clientX - r.left}px`);
      target.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  // Touch ripple: pressing any glass surface spawns an expanding water ring
  // from the press point.
  useEffect(() => {
    const down = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        '.glass, .glass-hover, .liquid-press'
      );
      if (!(target instanceof HTMLElement)) return;
      const r = target.getBoundingClientRect();
      if (getComputedStyle(target).position === 'static') {
        target.style.position = 'relative';
      }
      if (getComputedStyle(target).overflow !== 'hidden') {
        target.style.overflow = 'hidden';
      }
      const ring = document.createElement('span');
      ring.className = 'liquid-ripple-ring';
      ring.style.left = `${e.clientX - r.left}px`;
      ring.style.top = `${e.clientY - r.top}px`;
      target.appendChild(ring);
      window.setTimeout(() => ring.remove(), 750);
    };
    window.addEventListener('pointerdown', down, { passive: true });
    return () => window.removeEventListener('pointerdown', down);
  }, []);

  // Real edge refraction (per deepika-builds/liquid-glass): every large
  // glass pane gets a per-element displacement map that bends the backdrop
  // at the rim with a chromatic prism fringe, while the interior stays
  // crisp. Small chips and buttons keep the CSS frosted glass. Safari and
  // Firefox fall back to frosted blur inside the module.
  useEffect(() => {
    const handles: LiquidGlassHandle[] = [];
    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.glass').forEach((el) => {
        if (el.offsetWidth >= 220 && el.offsetHeight >= 96) {
          handles.push(
            liquidGlass(el, {
              scale: -110,
              chroma: 6,
              border: 0.06,
              mapBlur: 14,
              blur: 8,
              saturate: 1.6,
              fallbackBlur: 22,
            })
          );
        }
      });
    }, 60);
    return () => {
      clearTimeout(timer);
      handles.forEach((h) => h.destroy());
    };
  }, []);

  return (
    <>
      <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
        {/* Gooey filter: makes the background drops melt together like liquid */}
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b" />
          <feColorMatrix
            in="b"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -12"
            result="g"
          />
          <feComposite in="SourceGraphic" in2="g" operator="atop" />
        </filter>

      </svg>

      <div className="bg-ambient" aria-hidden />
      <div className="liquid-bg" aria-hidden>
        <div className="drop drop-1" />
        <div className="drop drop-2" />
        <div className="drop drop-3" />
        <div className="drop drop-4" />
        <div className="drop drop-5" />
        <div className="drop drop-6" />
      </div>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
