import { Brain, Network, GitBranch, ShieldCheck } from 'lucide-react';
import { Container, SectionHeading, Reveal } from './primitives';
import { profile } from '../data/resume';

const pillars = [
  {
    icon: Brain,
    color: 'bg-neo-accent',
    title: 'Generative AI & LLMs',
    body: 'Fine-tuning, RAG, and multi-agent systems with LangChain, LlamaIndex, and vector databases.',
  },
  {
    icon: ShieldCheck,
    color: 'bg-neo-secondary',
    title: 'Fraud & Risk ML',
    body: 'Detection pipelines and explainable credit-risk models (SHAP, LIME) for regulated finance.',
  },
  {
    icon: GitBranch,
    color: 'bg-neo-muted',
    title: 'MLOps & LLMOps',
    body: 'Reproducible training, CI/CD, and model monitoring with MLflow, Docker, and Kubernetes.',
  },
  {
    icon: Network,
    color: 'bg-white',
    title: 'Data Engineering',
    body: 'Large-scale pipelines on GCP and AWS: BigQuery, Dataflow, SageMaker, and PySpark.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white py-20 sm:py-28">
      {/* Halftone corner texture */}
      <div className="bg-halftone absolute right-0 top-0 h-40 w-40 opacity-10 sm:h-64 sm:w-64" aria-hidden />

      <Container>
        <SectionHeading index="01" kicker="About" title="Engineering AI that ships" />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Reveal>
            <p className="text-xl font-bold leading-snug text-black sm:text-2xl">
              {profile.summary}
            </p>
            <p className="mt-6 border-4 border-black bg-neo-bg p-5 text-lg font-medium leading-relaxed shadow-[6px_6px_0px_0px_#000]">
              Across financial services and enterprise domains, I&apos;ve shipped systems that move
              real metrics: faster retrieval, higher fraud-detection accuracy, and shorter
              deployment cycles. I care about the whole lifecycle: getting models right{' '}
              <span className="bg-neo-secondary px-1 font-bold">and</span> getting them safely
              into production with governance, monitoring, and clear stakeholder reporting.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div
                  className={`card-lift h-full border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] hover:shadow-[10px_10px_0px_0px_#000] ${
                    i % 2 === 0 ? 'rotate-[0.4deg]' : '-rotate-[0.4deg]'
                  }`}
                >
                  <span
                    className={`inline-grid h-12 w-12 place-items-center border-4 border-black ${p.color} shadow-[3px_3px_0px_0px_#000]`}
                  >
                    <p.icon size={24} strokeWidth={3} className="text-black" />
                  </span>
                  <h3 className="mt-4 font-black uppercase tracking-tight text-black">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-black">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
