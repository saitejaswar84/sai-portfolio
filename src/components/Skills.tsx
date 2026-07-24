import { Container, SectionHeading, Reveal } from './primitives';
import { skillGroups } from '../data/resume';

const headerColors = [
  'bg-neo-accent',
  'bg-neo-secondary',
  'bg-neo-muted',
  'bg-neo-secondary',
  'bg-neo-accent',
  'bg-neo-muted',
];

export default function Skills() {
  return (
    <section id="skills" className="border-y-4 border-black bg-black py-20 sm:py-28">
      <Container>
        <SectionHeading index="04" kicker="Skills" title="The toolkit" onDark />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={(i % 3) * 0.05}>
              <div
                className={`card-lift h-full border-4 border-white bg-white ${
                  i % 2 === 0 ? 'rotate-[0.4deg]' : '-rotate-[0.4deg]'
                }`}
                style={{ boxShadow: '8px 8px 0 0 #fff3' }}
              >
                <h3
                  className={`border-b-4 border-black px-4 py-2.5 text-sm font-black uppercase tracking-[0.2em] text-black ${headerColors[i % headerColors.length]}`}
                >
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2 p-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-2 border-black bg-neo-bg px-2 py-1 text-xs font-bold uppercase tracking-wide text-black transition-colors duration-100 hover:bg-neo-secondary"
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
