import { useState, useEffect } from 'react';
import { Award, MapPin, Calendar, FileCode2, Briefcase, UserCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import profileImg from '../images/WhatsApp Image 2026-05-07 at 22.42.47.jpeg';

const techBadges = [
  'React', 'React Native', 'Expo', 'JavaScript', 'Node.js',
  'Python', 'HTML', 'CSS', 'Tailwind', 'Figma', 'Git', 'Linux',
];

const quickInfo = [
  { icon: <MapPin    className="w-4 h-4" />, text: 'Cotonou, Bénin' },
  { icon: <Calendar  className="w-4 h-4" />, text: '18 ans' },
  { icon: <FileCode2 className="w-4 h-4" />, text: 'ESM Bénin — SIL' },
  { icon: <Briefcase className="w-4 h-4" />, text: 'Freelance & collaborations' },
];

const NAME = 'Luliano Sondjo';
const ROLE = 'Dev Web & IA · Vibe Coding';

const LOAD_STEPS = [
  { text: '[SYS]  Initializing profile...', delay: 480 },
  { text: '[USR]  Fetching user data......', delay: 620 },
  { text: '[IMG]  Loading photo...........', delay: 680 },
  { text: '[AI ]  Generating summary.....', delay: 580 },
  { text: '[OK ]  Profile ready!',          delay: 340 },
];

const DOT_CLS = [
  'profile-dot',
  'profile-dot splash-dot-1',
  'profile-dot splash-dot-2',
  'profile-dot splash-dot-3',
  'profile-dot splash-dot-4',
];

type ProfilePhase = 'loading' | 'fading' | 'done';

function ProfileCard({ inView }: { inView: boolean }) {
  const [phase,    setPhase]    = useState<ProfilePhase>('loading');
  const [loadStep, setLoadStep] = useState(0);
  const [nameIdx,  setNameIdx]  = useState(0);
  const [roleIdx,  setRoleIdx]  = useState(0);

  /* ── Loading steps ── */
  useEffect(() => {
    if (!inView || phase !== 'loading') return;
    if (loadStep < LOAD_STEPS.length) {
      const t = setTimeout(() => setLoadStep(s => s + 1), LOAD_STEPS[loadStep].delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('fading'), 380);
    return () => clearTimeout(t);
  }, [inView, phase, loadStep]);

  /* ── Name typewriter ── */
  useEffect(() => {
    if (phase === 'loading') return;
    if (nameIdx < NAME.length) {
      const t = setTimeout(() => setNameIdx(i => i + 1), 55);
      return () => clearTimeout(t);
    }
  }, [phase, nameIdx]);

  /* ── Role typewriter (after name) ── */
  useEffect(() => {
    if (phase === 'loading') return;
    if (nameIdx < NAME.length) return;
    if (roleIdx < ROLE.length) {
      const t = setTimeout(() => setRoleIdx(i => i + 1), 42);
      return () => clearTimeout(t);
    }
    if (phase === 'fading') setPhase('done');
  }, [phase, nameIdx, roleIdx]);

  const isReveal   = phase === 'fading' || phase === 'done';
  const showLoader = phase === 'loading' || phase === 'fading';

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10">

      {/* ── Loading overlay ── */}
      {showLoader && (
        <div className={`absolute inset-0 z-10 bg-[#0c0c16] flex flex-col items-center justify-center transition-opacity duration-700 ${phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

          {/* Icon + ping ring */}
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-full border border-violet-500/25 flex items-center justify-center">
              <UserCircle className="w-9 h-9 text-violet-400 opacity-70" />
            </div>
            <span className="absolute inset-0 rounded-full border border-violet-400/30 animate-ping" />
          </div>

          <p className="font-mono text-[10px] text-violet-400 tracking-[0.28em] mb-5">PROFILE LOADING</p>

          {/* System log lines */}
          <div className="space-y-[5px] w-52 mb-5">
            {LOAD_STEPS.slice(0, loadStep).map((step, i) => (
              <p
                key={i}
                className={`font-mono text-[10px] leading-5 transition-colors ${i === loadStep - 1 ? 'text-gray-400' : 'text-gray-700'}`}
              >
                {step.text}
                {i === loadStep - 1 && (
                  <span className="text-violet-400 animate-pulse"> █</span>
                )}
              </p>
            ))}
          </div>

          {/* Pulsing dots */}
          <div className="flex gap-2">
            {DOT_CLS.map((cls, i) => <div key={i} className={cls} />)}
          </div>
        </div>
      )}

      {/* ── Photo ── */}
      <img
        src={profileImg}
        alt="Luliano Sondjo"
        loading="lazy"
        className={`w-full aspect-[4/5] object-cover transition-opacity duration-700 ${isReveal ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D13] via-transparent to-transparent" />

      {/* ── Name + role typewriter ── */}
      <div className="absolute bottom-4 left-4 right-4 min-h-[3rem]">
        <p className="font-display text-xl font-bold text-white">
          {NAME.slice(0, nameIdx)}
          {isReveal && nameIdx < NAME.length && (
            <span className="text-violet-400 animate-pulse">|</span>
          )}
        </p>
        <p className="text-violet-300 text-sm font-mono mt-0.5">
          {nameIdx === NAME.length ? ROLE.slice(0, roleIdx) : ''}
          {nameIdx === NAME.length && roleIdx < ROLE.length && (
            <span className="text-violet-400 animate-pulse">|</span>
          )}
        </p>
      </div>
    </div>
  );
}

/* ── About section ── */
export function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 dot-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle sub="about-me" title="Qui suis-je ?" />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-center">

          {/* Left — profile card */}
          <div className={`md:col-span-1 lg:col-span-2 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
              <div className="relative">
                <ProfileCard inView={inView} />
              </div>
              <div className="absolute -top-3 -right-3 bg-[#1C1C2A] border border-violet-500/30 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-white">5 ans</span>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div className={`md:col-span-1 lg:col-span-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p className="text-white font-semibold text-base">
                Un profil fullstack orienté <span className="text-violet-400">produit</span>,{' '}
                <span className="text-cyan-400">design</span> et{' '}
                <span className="text-emerald-400">automatisation</span>.
              </p>
              <p>
                Passionné par le <span className="text-white font-semibold">développement web</span>,
                l'<span className="text-violet-400 font-semibold">intelligence artificielle</span> et la{' '}
                <span className="text-cyan-400 font-semibold">robotique</span>, je développe des applications
                modernes et des expériences digitales performantes.
              </p>
              <p>
                Je suis <span className="text-white font-semibold">Céphas Sondjo</span>, développeur{' '}
                <span className="text-violet-400 font-semibold">web & IA</span> (Vibe coding) basé au{' '}
                <span className="text-white font-semibold">Bénin</span>. Depuis plusieurs années, j'apprends,
                je prototype et je construis des interfaces rapides avec{' '}
                <span className="text-cyan-400 font-semibold">React, Node.js, React Native & Expo</span> et Python.
              </p>
              <p>
                Mon objectif est simple : aider les <span className="text-white font-semibold">entreprises, créateurs et startups</span>{' '}
                à lancer des produits <span className="text-emerald-400 font-semibold">utiles, élégants et faciles à maintenir</span>.
                J'aime les systèmes propres, l'UX claire et les projets qui résolvent un vrai problème.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-6 sm:mt-8">
              {techBadges.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 font-mono hover:border-violet-500/30 hover:text-violet-300 transition-all cursor-default">
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8">
              {quickInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-violet-400">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
