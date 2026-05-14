import { ArrowRight, FileText } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';

const articles = [
  {
    num: '01',
    title: 'Comment créer une landing page qui convertit avec React',
    tags: ['React', 'UI/UX', 'Conversion'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    num: '02',
    title: "Utiliser l'IA pour automatiser les tâches d'un petit business",
    tags: ['IA', 'Automatisation', 'Productivité'],
    color: 'from-cyan-500 to-blue-600',
  },
  {
    num: '03',
    title: 'Pourquoi Linux / Pop!_OS améliore mon workflow de développeur',
    tags: ['Linux', 'Workflow', 'Dev'],
    color: 'from-emerald-500 to-teal-600',
  },
];

export function Blog() {
  const { ref, inView } = useInView();

  return (
    <section id="blog" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          sub="blog"
          title="Blog"
          desc="Notes rapides sur le web, l'IA et la productivité. Un espace pour partager des tutoriels, astuces et retours d'expérience."
        />

        <div ref={ref} className="space-y-4 mt-4">
          {articles.map((a, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6 flex items-center gap-5 transition-all duration-500 hover:border-white/20 cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg`}>
                <FileText className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-gray-500 mb-1">Article {a.num}</p>
                <h3 className="text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-violet-300 transition-colors">
                  {a.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {a.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
