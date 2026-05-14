import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon, BehanceIcon } from './icons';

const socialLinks = [
  { icon: <GithubIcon    className="w-4 h-4" />, label: 'GitHub',    href: 'https://github.com/Lul-del' },
  { icon: <LinkedinIcon  className="w-4 h-4" />, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/c%C3%A9phas-sondjo-65145b3b6/' },
  { icon: <XIcon         className="w-4 h-4" />, label: 'X/Twitter', href: 'https://x.com/CephasSondjo' },
  { icon: <InstagramIcon className="w-4 h-4" />, label: 'Instagram', href: 'https://www.instagram.com/sondjoluliano/' },
  { icon: <BehanceIcon   className="w-4 h-4" />, label: 'Behance',   href: 'https://behance.net/cephasdev' },
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-500 text-[#0D0D13] font-semibold hover:bg-violet-400 transition-all hover:scale-105">
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
            &copy; 2026 Luliano Sondjo &mdash; Portfolio fullstack moderne.
          </p>

          <div className="flex gap-3">
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
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
