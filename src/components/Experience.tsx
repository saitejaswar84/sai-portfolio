import { Container, SectionHeading, Reveal, Tag } from './primitives';
import { experience } from '../data/resume';

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-y-4 border-black bg-neo-secondary py-20 sm:py-28"
    >
      <Container>
        <SectionHeading index="02" kicker="Experience" title="Where I've built things" />

        <div className="flex flex-col gap-10">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <article
                className={`card-lift relative border-4 border-black bg-white shadow-[10px_10px_0px_0px_#000] hover:shadow-[14px_14px_0px_0px_#000] ${
                  i % 2 === 0 ? 'rotate-[0.3deg]' : '-rotate-[0.3deg]'
                }`}
              >
                {job.current && (
                  <span className="absolute -top-5 right-6 rotate-3 border-4 border-black bg-neo-accent px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000]">
                    Current
                  </span>
                )}

                {/* Card header strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-black bg-neo-muted px-6 py-4 sm:px-7">
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-black sm:text-3xl">
                    {job.company}
                    <span className="ml-3 text-base font-bold normal-case">· {job.location}</span>
                  </h3>
                  <span className="border-2 border-black bg-white px-2.5 py-1 text-xs font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_#000]">
                    {job.period}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="inline-block bg-black px-3 py-1 font-black uppercase tracking-wide text-white">
                    {job.role}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {job.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-base font-medium leading-snug">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 border-2 border-black bg-neo-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {job.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
