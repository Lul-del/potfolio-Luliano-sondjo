import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import { experience } from '../data';

export function ExperienceSection() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          sub="experience"
          title="Parcours Professionnel"
          desc="Mon évolution dans le monde du développement."
        />

        <div ref={ref} className="max-w-3xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-cyan-500 to-transparent md:-translate-x-px" />

          {experience.map((exp, i) => (
            <div
              key={i}
              className={`stagger-delay relative mb-8 sm:mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ '--stagger': `${i * 200}ms` } as React.CSSProperties}
            >
              <div className={`absolute left-0 md:left-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 ${exp.current ? 'bg-violet-500 border-violet-400 pulse-glow' : 'bg-[#1C1C2A] border-white/20'} -translate-x-1.5 sm:-translate-x-[7px] md:-translate-x-2 top-5 sm:top-6 z-10`} />

              <div className={`ml-6 sm:ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border-gradient hover-lift ${exp.current ? 'ring-1 ring-violet-500/20' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-violet-400">{exp.period}</span>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">Actuel</span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-cyan-400 text-sm font-medium mb-3">{exp.company}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-gray-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
