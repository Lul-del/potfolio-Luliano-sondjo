import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#about', label: 'À propos' },
  { href: '#skills', label: 'Compétences' },
  { href: '#projects', label: 'Projets' },
  { href: '#experience', label: 'Expérience' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#accueil" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="font-display text-sm font-bold text-white tracking-tight">LS</span>
            </div>
            <span className="font-mono text-lg font-bold text-white">
              <span className="text-violet-400">&lt;</span>LS<span className="text-cyan-400">/&gt;</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-gray-300 hover:text-white transition-colors font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contact"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Me contacter
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#12121a]/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-4 space-y-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block py-2 text-gray-300 font-medium hover:text-violet-400 transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)}
              className="block text-center mt-3 px-5 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold">
              Me contacter
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
