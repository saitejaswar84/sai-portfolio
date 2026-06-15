import { Container, SectionHeading, Reveal } from './primitives';
import { skillGroups } from '../data/resume';

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="04" kicker="Skills" title="The toolkit" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-glass px-2.5 py-1 text-sm text-muted transition-colors hover:border-accent/30 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
