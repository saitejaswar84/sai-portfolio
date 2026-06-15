import { Mail, Phone, Linkedin, Sparkles, MapPin } from 'lucide-react';
import { Container, Reveal } from './primitives';
import { profile } from '../data/resume';

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(61,220,151,0.5), transparent 70%)' }}
            />
            <div className="relative">
              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                06 — Contact
              </div>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
                Let&apos;s build something intelligent.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-muted">
                Open to AI/ML Engineer roles and interesting collaborations. The fastest way to learn
                about my work is to ask my AI — or just reach out directly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-transform hover:scale-[1.03]"
                >
                  <Mail size={16} />
                  {profile.email}
                </a>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-chat'))}
                  className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-fg"
                >
                  <Sparkles size={16} className="text-accent" />
                  Ask my AI
                </button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                  className="glass glass-hover flex items-center gap-3 rounded-xl p-5"
                >
                  <Phone size={18} className="text-accent" />
                  <div>
                    <div className="text-xs text-faint">Phone</div>
                    <div className="text-sm text-fg">{profile.phone}</div>
                  </div>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover flex items-center gap-3 rounded-xl p-5"
                >
                  <Linkedin size={18} className="text-accent" />
                  <div>
                    <div className="text-xs text-faint">LinkedIn</div>
                    <div className="text-sm text-fg">Connect</div>
                  </div>
                </a>
                <div className="glass flex items-center gap-3 rounded-xl p-5">
                  <MapPin size={18} className="text-accent" />
                  <div>
                    <div className="text-xs text-faint">Location</div>
                    <div className="text-sm text-fg">{profile.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
