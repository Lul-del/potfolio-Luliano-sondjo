import { useState } from 'react';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import { GithubIcon } from './icons';
import { projects } from '../data';

const FILTERS = ['Tous', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps'] as const;
const CARD_DELAYS = ['enter-d-0', 'enter-d-100', 'enter-d-200', 'enter-d-300', 'enter-d-400', 'enter-d-500'] as const;
type Filter = typeof FILTERS[number];

export function Projects() {
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState<Filter>('Tous');

  const visible = filter === 'Tous'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          sub="projects"
          title="Projets Sélectionnés"
          desc="Quelques-uns de mes projets les plus récents et intéressants."
        />

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {FILTERS.map(f => (
            <button
              type="button"
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-violet-500 text-[#0D0D13] font-semibold shadow-lg'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-violet-500/40 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-h-[200px]">
          {visible.length === 0 && (
            <div className="col-span-3 flex items-center justify-center text-gray-500 font-mono text-sm py-16">
              Aucun projet dans cette catégorie pour l'instant.
            </div>
          )}
          {visible.map((p, i) => (
            <div
              key={p.title}
              className={`group rounded-2xl overflow-hidden bg-[#141420] border border-white/5 hover-lift transition-all duration-500 ${CARD_DELAYS[i] ?? 'enter-d-500'} ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141420] via-[#141420]/50 to-transparent" />
                <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg`}>
                  {p.icon}
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono text-gray-300 border border-white/10">
                    {p.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" title="Aperçu" className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button type="button" title="Ouvrir" className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-gray-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center">
                  <span className="ml-auto flex items-center gap-1 text-violet-400 text-xs font-medium hover:gap-2 transition-all cursor-pointer">
                    Voir le projet <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/Lul-del"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
          >
            <GithubIcon className="w-5 h-5" /> Voir tous les projets sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
