import { Container, SectionHeading, Reveal, Tag } from './primitives';
import { experience } from '../data/resume';

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="02" kicker="Experience" title="Where I've built things" />

        <div className="relative">
          {/* timeline rail */}
          <div className="absolute left-0 top-2 bottom-2 hidden w-px bg-line md:block" />

          <div className="flex flex-col gap-10">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.05}>
                <article className="group relative md:pl-10">
                  <span className="absolute left-[-4px] top-2.5 hidden h-2.5 w-2.5 rounded-full bg-faint ring-4 ring-ink transition-colors group-hover:bg-accent md:block" />

                  <div className="glass glass-hover rounded-2xl p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-fg">
                        {job.company}
                        <span className="ml-2 text-base font-normal text-muted">· {job.location}</span>
                      </h3>
                      <span className="font-mono text-xs text-faint">{job.period}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <p className="font-medium text-accent">{job.role}</p>
                      {job.current && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                          Current
                        </span>
                      )}
                    </div>

                    <ul className="mt-5 space-y-3">
                      {job.highlights.map((h, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
