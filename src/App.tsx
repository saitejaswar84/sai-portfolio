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
      {/* Displacement map that makes glass panes warp the backdrop (iOS-style lensing) */}
      <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
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
            scale="46"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="bg-ambient" aria-hidden />
      <div className="blob blob-1" aria-hidden />
      <div className="blob blob-2" aria-hidden />
      <div className="blob blob-3" aria-hidden />
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
