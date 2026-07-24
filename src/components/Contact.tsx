import { Mail, Phone, Linkedin, Sparkles, MapPin, Star } from 'lucide-react';
import { Container, Reveal } from './primitives';
import { profile } from '../data/resume';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b-4 border-black bg-neo-accent py-20 sm:py-28"
    >
      {/* Decorative shapes */}
      <Star
        className="animate-spin-slow absolute -left-6 top-12 h-20 w-20 fill-neo-secondary text-black"
        strokeWidth={2}
        aria-hidden
      />
      <div
        className="absolute -bottom-10 right-[10%] h-28 w-28 rounded-full border-4 border-black bg-neo-muted"
        aria-hidden
      />

      <Container>
        <Reveal>
          <span className="inline-block -rotate-2 border-4 border-black bg-white px-3 py-1 text-sm font-black uppercase tracking-[0.25em] shadow-[4px_4px_0px_0px_#000]">
            06 / Contact
          </span>
          <h2 className="text-shadow-hard mt-6 max-w-3xl font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-7xl">
            Let&apos;s build something intelligent.
          </h2>
          <p className="mt-6 max-w-xl border-4 border-black bg-white p-4 text-lg font-bold leading-snug shadow-[6px_6px_0px_0px_#000]">
            Open to AI/ML Engineer roles and interesting collaborations. The fastest way to learn
            about my work is to ask my AI, or just reach out directly.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="btn-push inline-flex h-14 items-center gap-2 border-4 border-black bg-neo-secondary px-6 text-sm font-black uppercase tracking-wide text-black shadow-[6px_6px_0px_0px_#000]"
            >
              <Mail size={18} strokeWidth={3} />
              {profile.email}
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-chat'))}
              className="btn-push inline-flex h-14 items-center gap-2 border-4 border-black bg-white px-6 text-sm font-black uppercase tracking-wide text-black shadow-[6px_6px_0px_0px_#000]"
            >
              <Sparkles size={18} strokeWidth={3} />
              Ask my AI
            </button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
              className="card-lift flex items-center gap-3 border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] hover:shadow-[9px_9px_0px_0px_#000]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center border-4 border-black bg-neo-secondary">
                <Phone size={20} strokeWidth={3} />
              </span>
              <div>
                <div className="text-xs font-black uppercase tracking-widest">Phone</div>
                <div className="text-sm font-bold">{profile.phone}</div>
              </div>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift flex items-center gap-3 border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] hover:shadow-[9px_9px_0px_0px_#000]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center border-4 border-black bg-neo-muted">
                <Linkedin size={20} strokeWidth={3} />
              </span>
              <div>
                <div className="text-xs font-black uppercase tracking-widest">LinkedIn</div>
                <div className="text-sm font-bold">Connect</div>
              </div>
            </a>
            <div className="flex items-center gap-3 border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000]">
              <span className="grid h-11 w-11 shrink-0 place-items-center border-4 border-black bg-neo-accent">
                <MapPin size={20} strokeWidth={3} />
              </span>
              <div>
                <div className="text-xs font-black uppercase tracking-widest">Location</div>
                <div className="text-sm font-bold">{profile.location}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
