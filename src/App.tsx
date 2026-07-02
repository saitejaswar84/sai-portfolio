import { useEffect } from 'react';
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

  // Refraction lensing is Chromium-only (SVG filters inside backdrop-filter).
  // Enable it via html.lens only where it actually renders; everyone else
  // keeps the plain blurred glass.
  useEffect(() => {
    let supported = false;
    try {
      supported =
        'chrome' in window && CSS.supports('backdrop-filter', 'url(#liquid-lens)');
    } catch {
      supported = false;
    }
    if (supported) document.documentElement.classList.add('lens');
    return () => document.documentElement.classList.remove('lens');
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

        {/* Static lens: glass panes warp the backdrop like real glass */}
        <filter
          id="liquid-lens"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="52"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Animated lens (hover): the warp field drifts, so the backdrop
            undulates through the pane like disturbed water */}
        <filter
          id="liquid-ripple"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.014"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="6s"
              values="0.008 0.014;0.012 0.021;0.008 0.014"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="64"
            xChannelSelector="R"
            yChannelSelector="G"
          />
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
