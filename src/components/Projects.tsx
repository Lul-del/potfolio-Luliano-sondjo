import { useState } from 'react';
import { Star, GitBranch, ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import { GithubIcon } from './icons';
import { projects } from '../data';

const filters = ['Tous', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps'];

export function Projects() {
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState('Tous');

  return (
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          sub="projects"
          title="Projets Sélectionnés"
          desc="Quelques-uns de mes projets les plus récents et intéressants."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {filters.map(f => (
            <button type="button" key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-violet-500/30 hover:text-white'
                }`}>
              {f}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((p, i) => (
            <div key={i}
              className={`stagger-delay group rounded-2xl overflow-hidden bg-[#141420] border border-white/5 hover-lift transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ '--stagger': `${i * 100}ms` } as React.CSSProperties}>
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141420] via-[#141420]/50 to-transparent" />
                <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg`}>
                  {p.icon}
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button type="button" title="Aperçu" className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button type="button" title="Ouvrir le projet" className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-gray-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-gray-500 text-xs">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {p.stars}</span>
                  <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> {p.forks}</span>
                  <span className="ml-auto flex items-center gap-1 text-violet-400 font-medium hover:gap-2 transition-all cursor-pointer">
                    Voir <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
            <GithubIcon className="w-5 h-5" /> Voir tous les projets sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
