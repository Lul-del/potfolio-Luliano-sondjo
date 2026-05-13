import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import { skills } from '../data';

const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const colorToText: Record<string, string> = {
  'from-violet-500 to-purple-500': 'text-violet-500',
  'from-cyan-500 to-blue-500': 'text-cyan-500',
  'from-emerald-500 to-teal-500': 'text-emerald-500',
};

const catDelay = ['delay-0', 'delay-150', 'delay-300'] as const;

const ringDelay = [
  ['delay-[0ms]',   'delay-[120ms]', 'delay-[240ms]', 'delay-[360ms]'],
  ['delay-[150ms]', 'delay-[270ms]', 'delay-[390ms]', 'delay-[510ms]'],
  ['delay-[300ms]', 'delay-[420ms]', 'delay-[540ms]', 'delay-[660ms]'],
] as const;

function RadialSkill({ name, level, textColor, inView, catIdx, itemIdx }: {
  name: string;
  level: number;
  textColor: string;
  inView: boolean;
  catIdx: number;
  itemIdx: number;
}) {
  const offset = inView ? CIRCUMFERENCE * (1 - level / 100) : CIRCUMFERENCE;

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className={`relative w-[72px] h-[72px] ${textColor}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
          <circle
            cx="36" cy="36" r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeOpacity={0.12}
          />
          <circle
            cx="36" cy="36" r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className={`radial-ring ${ringDelay[catIdx][itemIdx]}`}
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

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {skills.map((cat, i) => {
            const textColor = colorToText[cat.color] ?? 'text-violet-500';
            return (
              <div
                key={i}
                className={`glass-card rounded-2xl p-6 border-gradient hover-lift transition-all duration-700 ${catDelay[i]} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${cat.color} flex items-center justify-center text-white`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{cat.category}</h3>
                </div>

                <div className="grid grid-cols-2 gap-5 place-items-center">
                  {cat.items.map((skill, j) => (
                    <RadialSkill
                      key={j}
                      name={skill.name}
                      level={skill.level}
                      textColor={textColor}
                      inView={inView}
                      catIdx={i}
                      itemIdx={j}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
