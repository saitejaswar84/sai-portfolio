import { ArrowUpRight } from 'lucide-react';
import { Container, SectionHeading, Reveal, Tag } from './primitives';
import { projects } from '../data/resume';

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="03" kicker="Projects" title="Things I've shipped" />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="glass glass-hover flex h-full flex-col rounded-2xl p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-fg">{p.name}</h3>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-faint transition-colors group-hover:text-accent"
                  />
                </div>
                <p className="mt-2 text-sm text-accent/90">{p.blurb}</p>

                <ul className="mt-5 flex-1 space-y-3">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
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
