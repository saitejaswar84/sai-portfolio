import { Star } from 'lucide-react';
import { Fragment } from 'react';

const ITEMS = [
  'GENERATIVE AI',
  'RAG PIPELINES',
  'MULTI-AGENT SYSTEMS',
  'FRAUD DETECTION',
  'MLOPS',
  'FINE-TUNING',
  'OPEN TO WORK',
];

function Run() {
  return (
    <>
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <span className="mx-6 text-lg font-black uppercase tracking-widest text-white">
            {item}
          </span>
          <Star className="h-5 w-5 shrink-0 fill-neo-secondary text-neo-secondary" aria-hidden />
        </Fragment>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y-4 border-black bg-black py-3"
      aria-hidden
    >
      <div className="marquee-track items-center">
        {/* Track is duplicated once; the animation slides exactly 50% for a seamless loop */}
        <div className="flex items-center">
          <Run />
        </div>
        <div className="flex items-center">
          <Run />
        </div>
      </div>
    </div>
  );
}
