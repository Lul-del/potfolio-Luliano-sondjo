import { Zap, Sparkles, BarChart2, MousePointerClick } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';

const pillars = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Rapidité',
    desc: 'Développement efficace avec composants réutilisables et outils modernes.',
    color: 'from-amber-500 to-orange-500',
    border: 'hover:border-amber-500/30',
    glow: 'group-hover:bg-amber-500/10',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Créativité',
    desc: 'Interfaces premium inspirées par les tendances mais adaptées au besoin.',
    color: 'from-violet-500 to-purple-500',
    border: 'hover:border-violet-500/30',
    glow: 'group-hover:bg-violet-500/10',
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: 'Optimisation',
    desc: 'Pages légères, responsive design, accessibilité et SEO de base.',
    color: 'from-cyan-500 to-blue-500',
    border: 'hover:border-cyan-500/30',
    glow: 'group-hover:bg-cyan-500/10',
  },
  {
    icon: <MousePointerClick className="w-6 h-6" />,
    title: 'UX claire',
    desc: "Navigation fluide, contenu lisible et appels à l'action visibles.",
    color: 'from-emerald-500 to-teal-500',
    border: 'hover:border-emerald-500/30',
    glow: 'group-hover:bg-emerald-500/10',
  },
];

export function WhyMe() {
  const { ref, inView } = useInView();

  return (
    <section id="why-me" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          sub="pourquoi-moi"
          title="Pourquoi moi ?"
          desc="Rapidité, créativité et expérience utilisateur. Je construis avec une logique business : attirer, expliquer, convaincre et faciliter l'action."
        />

        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4"
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-500 ${p.border} ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`absolute inset-0 rounded-2xl transition-colors duration-300 ${p.glow}`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {p.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
