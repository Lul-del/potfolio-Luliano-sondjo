import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import { skills } from '../data';

const RADIUS        = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const colorToText: Record<string, string> = {
  'from-violet-500 to-purple-500': 'text-violet-500',
  'from-cyan-500 to-blue-500':     'text-cyan-500',
  'from-emerald-500 to-teal-500':  'text-emerald-500',
  'from-amber-500 to-orange-500':  'text-amber-500',
};

/* Stagger per (catIdx, itemIdx) — 4 cats × 5 items max */
const ringDelay: string[][] = [
  ['delay-[0ms]',   'delay-[110ms]', 'delay-[220ms]', 'delay-[330ms]', 'delay-[440ms]'],
  ['delay-[150ms]', 'delay-[260ms]', 'delay-[370ms]', 'delay-[480ms]', 'delay-[590ms]'],
  ['delay-[300ms]', 'delay-[410ms]', 'delay-[520ms]', 'delay-[630ms]', 'delay-[740ms]'],
  ['delay-[450ms]', 'delay-[560ms]', 'delay-[670ms]', 'delay-[780ms]', 'delay-[890ms]'],
];

const catEntryDelay = ['delay-0', 'delay-150', 'delay-300', 'delay-[450ms]'];

/* ── Radial ring ─────────────────────────────────────────────────
   The SVG coordinate system stays at 0 0 72 72 / r=30.
   `compact` only shrinks the CSS wrapper — SVG scales proportionally.
──────────────────────────────────────────────────────────────── */
function RadialSkill({ name, level, textColor, loaded, catIdx, itemIdx, compact = false }: {
  name: string; level: number; textColor: string;
  loaded: boolean; catIdx: number; itemIdx: number;
  compact?: boolean;
}) {
  const offset = loaded ? CIRCUMFERENCE * (1 - level / 100) : CIRCUMFERENCE;

  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-1.5' : 'gap-2.5'}`}>
      <div className={`relative ${compact ? 'w-[58px] h-[58px]' : 'w-[72px] h-[72px]'} ${textColor}`}>
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
          <span className={`font-mono font-bold text-white ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
            {level}%
          </span>
        </div>
      </div>
      <span className={`text-gray-400 text-center font-medium leading-tight ${compact ? 'text-[10px] max-w-[60px]' : 'text-[11px] max-w-[76px]'}`}>
        {name}
      </span>
    </div>
  );
}

/* ── Skill card ──────────────────────────────────────────────── */
type SkillCat = typeof skills[number];

function SkillCard({ cat, catIdx, inView }: { cat: SkillCat; catIdx: number; inView: boolean }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setLoaded(true), 3000 + catIdx * 300);
    return () => clearTimeout(t);
  }, [inView, catIdx]);

  const textColor = colorToText[cat.color] ?? 'text-violet-500';
  const compact   = cat.items.length > 4; // 5-item cards use compact rings + 3+2 layout

  return (
    <div
      className={`glass-card rounded-2xl p-6 border-gradient hover-lift transition-all duration-700 ${catEntryDelay[catIdx] ?? 'delay-0'} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Header — category icon spins while loading */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${cat.color} flex items-center justify-center text-white transition-transform duration-500 ${inView && !loaded ? 'animate-spin' : ''}`}>
          {cat.icon}
        </div>
        <h3 className="font-display text-xl font-bold text-white">{cat.category}</h3>
      </div>

      {!loaded ? (
        /* Spinning gear placeholder */
        <div className={`flex items-center justify-center h-[120px] transition-opacity duration-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <Settings className={`w-9 h-9 text-gray-600 ${inView ? 'animate-spin' : ''}`} />
        </div>
      ) : compact ? (
        /* 5 items → losange 2-1-2 */
        <div className="flex flex-col gap-3 animate-[fadeUp_0.4s_ease-out_forwards]">
          {/* Rangée 1 : A  B */}
          <div className="flex justify-around">
            {cat.items.slice(0, 2).map((skill, j) => (
              <RadialSkill
                key={j}
                name={skill.name} level={skill.level}
                textColor={textColor} loaded={loaded}
                catIdx={catIdx} itemIdx={j}
                compact
              />
            ))}
          </div>
          {/* Rangée 2 : C centré */}
          <div className="flex justify-center">
            <RadialSkill
              name={cat.items[2].name} level={cat.items[2].level}
              textColor={textColor} loaded={loaded}
              catIdx={catIdx} itemIdx={2}
              compact
            />
          </div>
          {/* Rangée 3 : D  E */}
          <div className="flex justify-around">
            {cat.items.slice(3).map((skill, j) => (
              <RadialSkill
                key={j + 3}
                name={skill.name} level={skill.level}
                textColor={textColor} loaded={loaded}
                catIdx={catIdx} itemIdx={j + 3}
                compact
              />
            ))}
          </div>
        </div>
      ) : (
        /* 4 items → standard 2×2 grid */
        <div className="grid grid-cols-2 gap-5 place-items-center animate-[fadeUp_0.4s_ease-out_forwards]">
          {cat.items.map((skill, j) => (
            <RadialSkill
              key={j}
              name={skill.name} level={skill.level}
              textColor={textColor} loaded={loaded}
              catIdx={catIdx} itemIdx={j}
            />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {skills.slice(0, 3).map((cat, i) => (
              <SkillCard key={i} cat={cat} catIdx={i} inView={inView} />
            ))}
          </div>

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
