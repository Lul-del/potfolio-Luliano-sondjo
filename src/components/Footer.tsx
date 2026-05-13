import { useState, useEffect } from 'react';
import { Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

const socialLinks = [
  { icon: <GithubIcon className="w-4 h-4" />, label: 'GitHub' },
  { icon: <LinkedinIcon className="w-4 h-4" />, label: 'LinkedIn' },
  { icon: <Mail className="w-4 h-4" />, label: 'Email' },
];

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <footer className="border-t border-white/5 bg-[#0D0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 text-center border-b border-white/5">
          <h3 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Prêt à <span className="text-gradient">coder</span> ensemble ?
          </h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Transformons vos idées en réalité. Contactez-moi pour discuter de votre prochain projet.
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all hover:scale-105">
            Démarrer un projet <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <span className="font-display text-xs font-bold text-white">LS</span>
            </div>
            <span className="font-mono text-sm text-gray-400">
              <span className="text-violet-400">&lt;</span>LS<span className="text-cyan-400">/&gt;</span>
            </span>
          </div>

          <p className="text-gray-500 text-sm font-mono">
            &copy; 2025 Luliano Sondjo Built with <span className="text-violet-400">React</span> & <span className="text-cyan-400">Tailwind</span>
          </p>

          <div className="flex gap-3">
            {socialLinks.map((s, i) => (
              <a key={i} href="#"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-violet-500/20 transition-all">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {showTop && (
        <button
          type="button"
          title="Retour en haut"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-violet-500/30 hover:scale-110 transition-all z-50"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
      )}
    </footer>
  );
}
