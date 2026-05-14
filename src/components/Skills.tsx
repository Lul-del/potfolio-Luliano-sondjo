import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import { skills } from '../data';

const RADIUS       = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const colorToText: Record<string, string> = {
  'from-violet-500 to-purple-500': 'text-violet-500',
  'from-cyan-500 to-blue-500':     'text-cyan-500',
  'from-emerald-500 to-teal-500':  'text-emerald-500',
  'from-amber-500 to-orange-500':  'text-amber-500',
};

/* Stagger per (catIdx, itemIdx) — up to 4 cats × 5 items */
const ringDelay: string[][] = [
  ['delay-[0ms]',   'delay-[120ms]', 'delay-[240ms]', 'delay-[360ms]', 'delay-[480ms]'],
  ['delay-[150ms]', 'delay-[270ms]', 'delay-[390ms]', 'delay-[510ms]', 'delay-[630ms]'],
  ['delay-[300ms]', 'delay-[420ms]', 'delay-[540ms]', 'delay-[660ms]', 'delay-[780ms]'],
  ['delay-[450ms]', 'delay-[570ms]', 'delay-[690ms]', 'delay-[810ms]', 'delay-[930ms]'],
];

const catEntryDelay = ['delay-0', 'delay-150', 'delay-300', 'delay-[450ms]'];

/* ── Radial skill ring ───────────────────────────────────────── */
function RadialSkill({ name, level, textColor, loaded, catIdx, itemIdx }: {
  name: string; level: number; textColor: string;
  loaded: boolean; catIdx: number; itemIdx: number;
}) {
  const offset = loaded ? CIRCUMFERENCE * (1 - level / 100) : CIRCUMFERENCE;
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className={`relative w-[72px] h-[72px] ${textColor}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity={0.12} />
          <circle
            cx="36" cy="36" r={RADIUS}
            fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className={`radial-ring ${ringDelay[catIdx]?.[itemIdx] ?? 'delay-0'}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-mono font-bold text-white">{level}%</span>
        </div>
      </div>
      <span className="text-[11px] text-gray-400 text-center font-medium leading-tight max-w-[76px]">{name}</span>
    </div>
  );
}

/* ── Skill card with gear-loading entrance ───────────────────── */
type SkillCat = typeof skills[number];

function SkillCard({ cat, catIdx, inView }: { cat: SkillCat; catIdx: number; inView: boolean }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setLoaded(true), 650 + catIdx * 160);
    return () => clearTimeout(t);
  }, [inView, catIdx]);

  const textColor = colorToText[cat.color] ?? 'text-violet-500';
  const isOdd     = cat.items.length % 2 !== 0;

  return (
    <div
      className={`glass-card rounded-2xl p-6 border-gradient hover-lift transition-all duration-700 ${catEntryDelay[catIdx] ?? 'delay-0'} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Header — icon spins while loading */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-xl bg-linear-to-br ${cat.color} flex items-center justify-center text-white transition-transform duration-500 ${
            inView && !loaded ? 'animate-spin' : ''
          }`}
        >
          {cat.icon}
        </div>
        <h3 className="font-display text-xl font-bold text-white">{cat.category}</h3>
      </div>

      {/* Content */}
      {!loaded ? (
        /* Gear placeholder while card loads */
        <div className={`flex items-center justify-center h-[120px] transition-opacity duration-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <Settings className={`w-9 h-9 text-gray-600 ${inView ? 'animate-spin' : ''}`} />
        </div>
      ) : (
        /* Skills grid — fade in */
        <div className="grid grid-cols-2 gap-5 place-items-center animate-[fadeUp_0.4s_ease-out_forwards]">
          {cat.items.map((skill, j) => (
            <div key={j} className={isOdd && j === cat.items.length - 1 ? 'col-span-2' : ''}>
              <RadialSkill
                name={skill.name}
                level={skill.level}
                textColor={textColor}
                loaded={loaded}
                catIdx={catIdx}
                itemIdx={j}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export function Skills() {
  const { ref, inView } = useInView();

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          sub="skills"
          title="Compétences Techniques"
          desc="Les technologies et outils que je maîtrise au quotidien."
        />

        <div ref={ref} className="space-y-5 sm:space-y-6 lg:space-y-8">
          {/* First 3 cards — 3-col grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {skills.slice(0, 3).map((cat, i) => (
              <SkillCard key={i} cat={cat} catIdx={i} inView={inView} />
            ))}
          </div>

          {/* 4th card — centered below */}
          {skills[3] && (
            <div className="flex justify-center">
              <div className="w-full sm:max-w-sm lg:max-w-md">
                <SkillCard cat={skills[3]} catIdx={3} inView={inView} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
