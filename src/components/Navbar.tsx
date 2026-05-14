import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#accueil',    label: 'Accueil' },
  { href: '#about',      label: 'À propos' },
  { href: '#skills',     label: 'Compétences' },
  { href: '#projects',   label: 'Projets' },
  { href: '#experience', label: 'Expérience' },
  { href: '#blog',       label: 'Blog' },
  { href: '#contact',    label: 'Contact' },
];

const LINK_DELAYS = [
  'enter-d-200', 'enter-d-250', 'enter-d-300',
  'enter-d-350', 'enter-d-400', 'enter-d-450',
  'enter-d-500',
] as const;

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const enter = 'transition-all duration-700 ease-out';
  const vis   = mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out
      ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}
      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#accueil"
            className={`flex items-center gap-2 group ${enter} enter-d-100 ${vis}`}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="font-display text-sm font-bold text-white tracking-tight">LS</span>
            </div>
            <span className="font-mono text-lg font-bold text-white">
              <span className="text-violet-400">&lt;</span>LS<span className="text-cyan-400">/&gt;</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm text-gray-300 hover:text-white font-medium ${enter} ${LINK_DELAYS[i]} ${vis}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`px-4 py-2 rounded-lg bg-violet-500 text-[#0D0D13] text-sm font-semibold hover:bg-violet-400 transition-colors ${enter} enter-d-550 ${vis}`}
            >
              Me contacter
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden text-white ${enter} enter-d-200 ${vis}`}
          >
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
              className="block text-center mt-3 px-5 py-3 rounded-lg bg-violet-500 text-[#0D0D13] font-semibold hover:bg-violet-400 transition-colors">
              Me contacter
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
