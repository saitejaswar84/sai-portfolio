import { ArrowUpRight } from 'lucide-react';
import { Container, SectionHeading, Reveal, Tag } from './primitives';
import { projects } from '../data/resume';

export default function Projects() {
  return (
    <section id="projects" className="bg-dots relative bg-neo-muted py-20 sm:py-28">
      <Container>
        <SectionHeading index="03" kicker="Projects" title="Things I've shipped" />

        <div className="grid gap-8 pt-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.06}>
              <article
                className={`card-lift relative flex h-full flex-col border-4 border-black bg-white p-6 pt-8 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] sm:p-7 sm:pt-9 ${
                  i % 2 === 0 ? 'rotate-[0.3deg]' : '-rotate-[0.3deg]'
                }`}
              >
                {/* Org sticker overlapping the top edge */}
                <span
                  className={`absolute -top-4 left-5 border-4 border-black px-3 py-0.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#000] ${
                    p.org === 'Personal project'
                      ? 'bg-white -rotate-2'
                      : 'bg-neo-secondary rotate-1'
                  }`}
                >
                  {p.org}
                </span>

                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-black">
                    {p.name}
                  </h3>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border-4 border-black bg-neo-accent shadow-[3px_3px_0px_0px_#000]">
                    <ArrowUpRight size={20} strokeWidth={3} className="text-black" />
                  </span>
                </div>
                <p className="mt-3 inline-block self-start bg-black px-2 py-0.5 text-sm font-bold text-white">
                  {p.blurb}
                </p>

                <ul className="mt-5 flex-1 space-y-3">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm font-medium leading-snug">
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-black bg-neo-muted" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {p.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
