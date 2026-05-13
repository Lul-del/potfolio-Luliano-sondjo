import { useInView } from '../hooks/useInView';

interface SectionTitleProps {
  sub: string;
  title: string;
  desc?: string;
  align?: 'center' | 'left';
}

export function SectionTitle({ sub, title, desc, align = 'center' }: SectionTitleProps) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`${align === 'center' ? 'text-center' : ''} mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <span className="inline-flex items-center gap-2 text-violet-400 font-mono text-sm mb-3">
        <span className="text-cyan-400">{'{'}</span> {sub} <span className="text-cyan-400">{'}'}</span>
      </span>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h2>
      {desc && <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">{desc}</p>}
      <div className={`mt-4 ${align === 'center' ? 'mx-auto' : ''} w-20 h-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500`} />
    </div>
  );
}
