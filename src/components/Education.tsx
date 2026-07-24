import { GraduationCap, Award, Star } from 'lucide-react';
import { Container, SectionHeading, Reveal } from './primitives';
import { education, certifications } from '../data/resume';

export default function Education() {
  return (
    <section id="education" className="bg-graph py-20 sm:py-28">
      <Container>
        <SectionHeading index="05" kicker="Education" title="Foundations & credentials" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="mb-6 inline-flex -rotate-1 items-center gap-2 border-4 border-black bg-neo-muted px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#000]">
              <GraduationCap size={16} strokeWidth={3} />
              Education
            </div>
            <div className="flex flex-col gap-6">
              {education.map((e, i) => (
                <Reveal key={e.degree} delay={i * 0.05}>
                  <div
                    className={`card-lift border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] ${
                      i % 2 === 0 ? 'rotate-[0.3deg]' : '-rotate-[0.3deg]'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-black uppercase tracking-tight text-black">
                        {e.degree}
                      </h3>
                      <span className="border-2 border-black bg-neo-secondary px-2 py-0.5 text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000]">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-2 font-bold">{e.school}</p>
                    <div className="mt-2 flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                      <span>{e.location}</span>
                      <span className="h-2 w-2 border-2 border-black bg-neo-accent" />
                      <span className="bg-black px-1.5 text-white">GPA {e.gpa}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 inline-flex rotate-1 items-center gap-2 border-4 border-black bg-neo-secondary px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#000]">
              <Award size={16} strokeWidth={3} />
              Certifications
            </div>
            <div className="grid gap-3">
              {certifications.map((c, i) => (
                <Reveal key={c} delay={i * 0.03}>
                  <div className="flex items-center gap-3 border-4 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_#000] transition-transform duration-100 hover:translate-x-1">
                    <Star
                      size={16}
                      strokeWidth={3}
                      className="shrink-0 fill-neo-secondary text-black"
                    />
                    <span className="text-sm font-bold">{c}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
