import { Brain, Network, GitBranch, ShieldCheck } from 'lucide-react';
import { Container, SectionHeading, Reveal } from './primitives';
import { profile } from '../data/resume';

const pillars = [
  {
    icon: Brain,
    title: 'Generative AI & LLMs',
    body: 'Fine-tuning, RAG, and multi-agent systems with LangChain, LlamaIndex, and vector databases.',
  },
  {
    icon: ShieldCheck,
    title: 'Fraud & Risk ML',
    body: 'Detection pipelines and explainable credit-risk models (SHAP, LIME) for regulated finance.',
  },
  {
    icon: GitBranch,
    title: 'MLOps & LLMOps',
    body: 'Reproducible training, CI/CD, and model monitoring with MLflow, Docker, and Kubernetes.',
  },
  {
    icon: Network,
    title: 'Data Engineering',
    body: 'Large-scale pipelines on GCP and AWS — BigQuery, Dataflow, SageMaker, and PySpark.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="01" kicker="About" title="Engineering AI that ships" />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-xl leading-relaxed text-fg/90 text-balance">
              {profile.summary}
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              Across financial services and enterprise domains, I&apos;ve shipped systems that move
              real metrics — faster retrieval, higher fraud-detection accuracy, and shorter
              deployment cycles. I care about the whole lifecycle: getting models right
              <em className="text-fg/90"> and</em> getting them safely into production with
              governance, monitoring, and clear stakeholder reporting.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="glass h-full rounded-2xl p-5">
                  <p.icon size={20} className="text-accent" />
                  <h3 className="mt-3 font-display font-medium text-fg">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
