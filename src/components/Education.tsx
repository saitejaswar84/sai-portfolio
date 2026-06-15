import { GraduationCap, Award } from 'lucide-react';
import { Container, SectionHeading, Reveal } from './primitives';
import { education, certifications } from '../data/resume';

export default function Education() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="05" kicker="Education" title="Foundations & credentials" />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              <GraduationCap size={15} className="text-accent" />
              Education
            </div>
            <div className="flex flex-col gap-4">
              {education.map((e, i) => (
                <Reveal key={e.degree} delay={i * 0.06}>
                  <div className="glass glass-hover rounded-2xl p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display font-semibold text-fg">{e.degree}</h3>
                      <span className="font-mono text-xs text-faint">{e.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{e.school}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-faint">
                      <span>{e.location}</span>
                      <span className="h-1 w-1 rounded-full bg-faint" />
                      <span className="text-accent/90">GPA {e.gpa}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              <Award size={15} className="text-accent" />
              Certifications
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {certifications.map((c, i) => (
                <Reveal key={c} delay={i * 0.04}>
                  <div className="glass flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:border-accent/30">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-sm text-muted">{c}</span>
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
