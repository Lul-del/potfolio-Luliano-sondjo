import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Mail,
  ArrowRight,
  ChevronDown,
  User,
  FolderOpen,
  Briefcase,
  Cpu,
  Globe,
  X,
  Folder,
  FileText,
  ChevronRight,
  Power,
} from "lucide-react";
import { useTyping } from "../hooks/useTyping";
import { GithubIcon, LinkedinIcon } from "./icons";
import {
  stats,
  projects as allProjects,
  experience as allExp,
  skills as allSkills,
} from "../data";

/* ─────────────────────────────── constants ─────────────────────────────── */

const typingWords = [
  "Full Stack Developer",
  "React Specialist",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

type BootLine = { text: string; color: string; pause: number };

const SHUTDOWN_LINES = [
  { text: "[SESS]  Saving session data ........ OK", color: "text-gray-300" },
  { text: "[NET ]  Disconnecting network ....... OK", color: "text-gray-300" },
  { text: "[GPU ]  Shutting renderer ........... OK", color: "text-gray-300" },
  { text: "[AI  ]  Neural interface .......... OFF", color: "text-red-400" },
  { text: "[SYS ]  Arrêt du système...", color: "text-violet-400" },
];

const BOOT_LINES: BootLine[] = [
  {
    text: "> LULIANO_OS v2.0.26 — Initializing...",
    color: "text-violet-400",
    pause: 320,
  },
  { text: "", color: "", pause: 100 },
  {
    text: "[BOOT]  Loading kernel .............. OK",
    color: "text-gray-300",
    pause: 80,
  },
  {
    text: "[MEM ]  RAM 16GB check .............. OK",
    color: "text-gray-300",
    pause: 80,
  },
  {
    text: "[GPU ]  Renderer online ............. OK",
    color: "text-gray-300",
    pause: 80,
  },
  {
    text: "[NET ]  Secure connection ........... OK",
    color: "text-emerald-400",
    pause: 120,
  },
  {
    text: "[AI  ]  Neural interface ............ ACTIVE",
    color: "text-cyan-400",
    pause: 280,
  },
  { text: "", color: "", pause: 80 },
  {
    text: "════════════════════════════════════════",
    color: "text-gray-500",
    pause: 160,
  },
  { text: "> whoami", color: "text-violet-300", pause: 220 },
  { text: "  Luliano Sondjo — Dev Web & IA", color: "text-white", pause: 160 },
  { text: "> stack", color: "text-violet-300", pause: 220 },
  {
    text: "  React · Node.js · React Native · Python",
    color: "text-gray-300",
    pause: 160,
  },
  { text: "> status", color: "text-violet-300", pause: 220 },
  {
    text: "  [■■■■■■■■■■] 100% — Ready to build",
    color: "text-emerald-400",
    pause: 0,
  },
];

/* ─────────────────────────────── types ─────────────────────────────── */

type Phase =
  | "idle"
  | "splash"
  | "fading"
  | "boot"
  | "loading"
  | "desktop"
  | "shutdown";
type AppId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact"
  | "terminal"
  | "files";
type TermLine = { kind: "in" | "out"; text: string };

/* ─────────────────────────────── desktop apps ─────────────────────────── */

interface AppDef {
  id: AppId;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  title: string;
}

const APPS: AppDef[] = [
  {
    id: "about",
    label: "À propos",
    Icon: User,
    color: "text-violet-400",
    title: "about.txt",
  },
  {
    id: "projects",
    label: "Projets",
    Icon: Globe,
    color: "text-cyan-400",
    title: "Projets",
  },
  {
    id: "skills",
    label: "Skills",
    Icon: Cpu,
    color: "text-emerald-400",
    title: "Skills",
  },
  {
    id: "experience",
    label: "Exp.",
    Icon: Briefcase,
    color: "text-amber-400",
    title: "Expérience",
  },
  {
    id: "contact",
    label: "Contact",
    Icon: Mail,
    color: "text-pink-400",
    title: "contact.txt",
  },
  {
    id: "terminal",
    label: "Terminal",
    Icon: Terminal,
    color: "text-gray-300",
    title: "~ terminal",
  },
  {
    id: "files",
    label: "Fichiers",
    Icon: FolderOpen,
    color: "text-blue-400",
    title: "Fichiers",
  },
];

/* ─────────────────────────────── terminal commands ────────────────────── */

function processCmd(raw: string): string {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase() ?? "";
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      return [
        "Commandes disponibles:",
        "  whoami      — identité",
        "  pwd         — répertoire courant",
        "  ls [dir]    — lister fichiers",
        "  cat <file>  — afficher fichier",
        "  skills      — compétences",
        "  projects    — projets",
        "  neofetch    — infos système",
        "  date        — date actuelle",
        "  uname       — info OS",
        "  echo <txt>  — afficher texte",
        "  clear       — effacer terminal",
      ].join("\n");

    case "whoami":
      return "Luliano Sondjo\nDev Web & IA · Vibe Coding\nCotonou, Bénin · 18 ans";

    case "pwd":
      return "/home/luliano/portfolio";

    case "ls": {
      const dir = args[0] ?? ".";
      if (dir === "." || dir === "")
        return "about.txt   contact.txt   README.md   projects/   skills/";
      if (dir === "projects/")
        return "e-commerce/   ai-chat/   saas-dashboard/   mobile-app/";
      if (dir === "skills/")
        return "dev.txt   mobile-ia.txt   design-tools.txt";
      return `ls: cannot access '${dir}': No such file or directory`;
    }

    case "cat": {
      const f = args[0];
      if (!f) return "Usage: cat <filename>";
      if (f === "about.txt")
        return [
          "Profil: fullstack · produit · design · IA",
          "Stack: React, Node.js, React Native, Python",
          "École: ESM Bénin — SIL",
          "Dispo: Freelance & collaborations",
        ].join("\n");
      if (f === "contact.txt")
        return [
          "GitHub : github.com/luliano-sondjo",
          "Lieu   : Cotonou, Bénin",
          "Status : Disponible · Freelance",
        ].join("\n");
      if (f === "README.md")
        return [
          "# Portfolio — Luliano Sondjo",
          "Dev Web & IA · Vibe Coding",
          "5 ans d'expérience · 18 ans",
          "Built with React + Tailwind",
        ].join("\n");
      if (f === "dev.txt")
        return "HTML/CSS 90%   JavaScript 85%\nReact 82%      Node.js 76%";
      if (f === "mobile-ia.txt")
        return "React Native 70%   Expo 70%\nPython IA 25%      Chatbots 60%";
      if (f === "design-tools.txt")
        return "Figma 78%   Git/GitHub 85%\nLinux 80%   VS Code 90%";
      return `cat: ${f}: No such file or directory`;
    }

    case "skills":
      return [
        "── Développement ──────────",
        "HTML/CSS     ▓▓▓▓▓▓▓▓▓░ 90%",
        "JavaScript   ▓▓▓▓▓▓▓▓░░ 85%",
        "React        ▓▓▓▓▓▓▓▓░░ 82%",
        "Node.js      ▓▓▓▓▓▓▓░░░ 76%",
        "── Mobile & IA ────────────",
        "React Native ▓▓▓▓▓▓▓░░░ 70%",
        "Expo         ▓▓▓▓▓▓▓░░░ 70%",
        "Chatbots     ▓▓▓▓▓▓░░░░ 60%",
        "Python IA    ▓▓░░░░░░░░ 25%",
      ].join("\n");

    case "projects":
      return allProjects
        .slice(0, 4)
        .map((p) => `● ${p.title}\n  ${p.tags.slice(0, 3).join(" · ")}`)
        .join("\n");

    case "neofetch":
      return [
        "      ___       luliano@LULIANO_OS",
        "     /\\  \\      ─────────────────",
        "    /  \\  \\     OS: LULIANO_OS v2.0.26",
        "   / /\\ \\  \\    DE: LULIANO Desktop 2.0",
        "  / / /\\ \\  \\   Shell: zsh 5.9",
        " /_/ /  \\__\\/   Stack: React · Node.js · Python",
        " \\_\\/           Lieu: Cotonou, Bénin",
        "               Status: Open to work 🟢",
      ].join("\n");

    case "date":
      return new Date().toLocaleString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    case "uname":
      return "LULIANO_OS 2.0.26 Linux x86_64 GNU/Linux";

    case "echo":
      return args.join(" ");

    case "clear":
      return "__clear__";

    case "":
      return "";

    default:
      return `zsh: command not found: ${cmd}\nType 'help' for available commands.`;
  }
}

/* ─────────────────────────────── small components ─────────────────────── */

function TuxIcon() {
  return (
    <svg
      width="80"
      height="96"
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="40" cy="68" rx="26" ry="28" fill="#1e1e2e" />
      <ellipse cx="40" cy="74" rx="16" ry="20" fill="rgba(255,255,255,0.88)" />
      <circle cx="40" cy="26" r="22" fill="#1e1e2e" />
      <circle cx="31" cy="22" r="6" fill="white" />
      <circle cx="49" cy="22" r="6" fill="white" />
      <circle cx="32" cy="22" r="3.5" fill="#0c0c16" />
      <circle cx="50" cy="22" r="3.5" fill="#0c0c16" />
      <circle cx="33.5" cy="21" r="1.2" fill="white" />
      <circle cx="51.5" cy="21" r="1.2" fill="white" />
      <path d="M33 32 Q40 39 47 32 Q40 37 33 32Z" fill="#f5a623" />
      <ellipse
        cx="11"
        cy="66"
        rx="10"
        ry="20"
        fill="#1e1e2e"
        transform="rotate(-15 11 66)"
      />
      <ellipse
        cx="69"
        cy="66"
        rx="10"
        ry="20"
        fill="#1e1e2e"
        transform="rotate(15 69 66)"
      />
      <ellipse cx="29" cy="92" rx="11" ry="5" fill="#f5a623" />
      <ellipse cx="51" cy="92" rx="11" ry="5" fill="#f5a623" />
    </svg>
  );
}

function Clock() {
  const fmt = () =>
    new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 10000);
    return () => clearInterval(id);
  }, []);
  return <span className="text-gray-300 text-[9px] font-mono">{t}</span>;
}

/* ─────────────────────────────── app window contents ──────────────────── */

function AboutContent() {
  return (
    <div className="space-y-2 text-[10px] font-mono">
      <p className="text-violet-400 font-bold">Luliano Sondjo</p>
      <p className="text-gray-300">Dev Web & IA · Vibe Coding</p>
      <div className="border-t border-white/5 pt-2 space-y-1">
        <p className="text-gray-300">- Cotonou, Bénin · 18 ans</p>
        <p className="text-gray-300">🎓 ESM Bénin — SIL</p>
        <p className="text-emerald-400">🟢 Freelance & collaborations</p>
      </div>
      <div className="border-t border-white/5 pt-2">
        <p className="text-gray-300 leading-relaxed">
          Fullstack orienté produit, design & automatisation. React · Node.js ·
          React Native · Python.
        </p>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-2 text-[10px] font-mono">
      {allProjects.slice(0, 4).map((p, i) => (
        <div
          key={i}
          className="border border-white/5 rounded-lg p-2 hover:border-violet-500/20 transition-colors"
        >
          <p className="text-white font-semibold mb-0.5">{p.title}</p>
          <p className="text-gray-300 leading-relaxed text-[9px] mb-1 line-clamp-2">
            {p.desc}
          </p>
          <div className="flex flex-wrap gap-1">
            {p.tags.slice(0, 3).map((t, j) => (
              <span
                key={j}
                className="px-1 py-0.5 rounded bg-white/5 text-cyan-400 text-[8px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="space-y-3 text-[10px] font-mono">
      {allSkills.map((cat, i) => (
        <div key={i}>
          <p className="text-violet-400 font-bold mb-1">{cat.category}</p>
          {cat.items.map((s, j) => (
            <div key={j} className="flex items-center gap-2 mb-0.5">
              <span className="text-gray-300 w-24 shrink-0 truncate">
                {s.name}
              </span>
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-400/60 rounded-full skill-mini-fill"
                  style={{ "--w": `${s.level}%` } as React.CSSProperties}
                />
              </div>
              <span className="text-gray-300 w-6 text-right">{s.level}%</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-2 text-[10px] font-mono">
      {allExp.map((e, i) => (
        <div
          key={i}
          className={`pl-2 border-l-2 ${e.current ? "border-violet-500" : "border-white/10"}`}
        >
          <p className="text-gray-300 text-[9px]">{e.period}</p>
          <p className="text-white font-semibold text-[10px]">{e.role}</p>
          <p className="text-cyan-400 text-[9px]">{e.company}</p>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {e.tags.slice(0, 3).map((t, j) => (
              <span key={j} className="text-[8px] text-gray-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-2 text-[10px] font-mono">
      <p className="text-violet-400 font-bold mb-2">Contactez-moi</p>
      {[
        {
          label: "GitHub",
          value: "github.com/luliano-sondjo",
          color: "text-gray-300",
        },
        { label: "Lieu", value: "Cotonou, Bénin", color: "text-gray-300" },
        {
          label: "Status",
          value: "Disponible · Freelance",
          color: "text-emerald-400",
        },
        {
          label: "Section",
          value: "#contact sur ce portfolio",
          color: "text-cyan-400",
        },
      ].map((row, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-gray-400 w-14 shrink-0">{row.label}</span>
          <span className={row.color}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────── terminal app ─────────────────────────── */

function TerminalApp() {
  const [lines, setLines] = useState<TermLine[]>([
    { kind: "out", text: "LULIANO_OS terminal v2.0 — type 'help'" },
    { kind: "out", text: "" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  function submit() {
    const cmd = input.trim();
    const out = processCmd(cmd);
    if (out === "__clear__") {
      setLines([
        { kind: "out", text: "LULIANO_OS terminal v2.0 — type 'help'" },
        { kind: "out", text: "" },
      ]);
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "in", text: `$ ${cmd}` },
        ...out.split("\n").map((l) => ({ kind: "out" as const, text: l })),
        { kind: "out", text: "" },
      ]);
    }
    setInput("");
  }

  return (
    <div
      className="h-full flex flex-col bg-[#050510] cursor-text"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-2 space-y-0.5 text-[9px] font-mono"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.kind === "in"
                ? "text-violet-300"
                : "text-gray-300 whitespace-pre"
            }
          >
            {l.text || " "}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 px-2 py-1 border-t border-white/5 bg-[#07070f]">
        <span className="text-violet-400 text-[9px] font-mono shrink-0">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="flex-1 bg-transparent text-[9px] font-mono text-gray-200 outline-none placeholder-gray-700"
          placeholder="type a command..."
          spellCheck={false}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────── files app ─────────────────────────── */

type FileNode =
  | { name: string; type: "file"; content: string }
  | { name: string; type: "dir"; children: FileNode[] };

const FILE_TREE: FileNode[] = [
  {
    name: "about.txt",
    type: "file",
    content:
      "Profil: fullstack · produit · design · IA\nStack: React, Node.js, React Native, Python\nÉcole: ESM Bénin — SIL\nDispo: Freelance & collaborations",
  },
  {
    name: "contact.txt",
    type: "file",
    content:
      "GitHub : github.com/luliano-sondjo\nLieu   : Cotonou, Bénin\nStatus : Disponible · Freelance",
  },
  {
    name: "README.md",
    type: "file",
    content:
      "# Portfolio — Luliano Sondjo\nDev Web & IA · Vibe Coding\n5 ans d'expérience · 18 ans\nBuilt with React + Tailwind",
  },
  {
    name: "projects",
    type: "dir",
    children: [
      {
        name: "e-commerce.md",
        type: "file",
        content:
          "# E-Commerce Platform\nNext.js · TypeScript · Stripe\nPostgreSQL · Redis",
      },
      {
        name: "ai-chat.md",
        type: "file",
        content:
          "# AI Chat Application\nReact · Python · WebSocket\nOpenAI · Docker",
      },
      {
        name: "saas-dashboard.md",
        type: "file",
        content: "# SaaS Dashboard\nReact · D3.js · Node.js\nMongoDB · AWS",
      },
      {
        name: "mobile-app.md",
        type: "file",
        content:
          "# Mobile Fitness App\nReact Native · Firebase\nMapBox · HealthKit",
      },
    ],
  },
  {
    name: "skills",
    type: "dir",
    children: [
      {
        name: "dev.txt",
        type: "file",
        content: "HTML/CSS 90%   JavaScript 85%\nReact 82%      Node.js 76%",
      },
      {
        name: "mobile-ia.txt",
        type: "file",
        content: "React Native 70%   Expo 70%\nPython IA 25%      Chatbots 60%",
      },
      {
        name: "design-tools.txt",
        type: "file",
        content: "Figma 78%   Git/GitHub 85%\nLinux 80%   VS Code 90%",
      },
    ],
  },
];

function FilesApp() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);

  function toggle(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  function findContent(name: string, nodes: FileNode[]): string {
    for (const n of nodes) {
      if (n.type === "file" && n.name === name) return n.content;
      if (n.type === "dir") {
        const found = findContent(name, n.children);
        if (found) return found;
      }
    }
    return "";
  }

  const DEPTH_PAD = ["pl-1", "pl-[14px]", "pl-6"] as const;

  function renderTree(nodes: FileNode[], depth = 0) {
    return nodes.map((node) => (
      <div key={node.name}>
        <button
          type="button"
          onClick={() =>
            node.type === "dir" ? toggle(node.name) : setSelected(node.name)
          }
          className={`flex items-center gap-1 w-full text-left px-1 py-0.5 rounded hover:bg-white/5 transition-colors text-[9px] font-mono ${DEPTH_PAD[Math.min(depth, 2)]} ${selected === node.name ? "bg-violet-500/20 text-violet-300" : "text-gray-300"}`}
        >
          {node.type === "dir" ? (
            <>
              <ChevronRight
                className={`w-2.5 h-2.5 shrink-0 transition-transform ${expanded.has(node.name) ? "rotate-90" : ""}`}
              />
              <Folder className="w-2.5 h-2.5 text-blue-400 shrink-0" />
            </>
          ) : (
            <>
              <span className="w-2.5 shrink-0" />
              <FileText className="w-2.5 h-2.5 text-gray-500 shrink-0" />
            </>
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {node.type === "dir" &&
          expanded.has(node.name) &&
          renderTree(node.children, depth + 1)}
      </div>
    ));
  }

  const content = selected ? findContent(selected, FILE_TREE) : null;

  return (
    <div className="h-full flex gap-1">
      <div className="w-2/5 overflow-y-auto border-r border-white/5 pr-1">
        <p className="text-[8px] text-gray-300 font-mono px-1 py-0.5">
          /home/luliano/portfolio
        </p>
        {renderTree(FILE_TREE)}
      </div>
      <div className="flex-1 overflow-y-auto">
        {content ? (
          <pre className="text-[9px] font-mono text-gray-300 leading-relaxed whitespace-pre-wrap p-1">
            {content}
          </pre>
        ) : (
          <p className="text-[9px] text-gray-400 font-mono p-2">
            Cliquez sur un fichier pour l'ouvrir
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────── app window ────────────────────────────── */

function AppWindow({ app, onClose }: { app: AppId; onClose: () => void }) {
  const def = APPS.find((a) => a.id === app)!;

  return (
    <div className="h-full flex flex-col bg-[#0a0a18] border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1 bg-[#07070f] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-1.5">
          <def.Icon className={`w-3 h-3 ${def.color}`} />
          <span className="text-[9px] font-mono text-gray-300">
            {def.title}
          </span>
        </div>
        <button
          type="button"
          aria-label="Fermer"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-100 transition-colors"
        >
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
      <div className="flex-1 overflow-hidden p-2">
        {app === "about" && <AboutContent />}
        {app === "projects" && <ProjectsContent />}
        {app === "skills" && <SkillsContent />}
        {app === "experience" && <ExperienceContent />}
        {app === "contact" && <ContactContent />}
        {app === "terminal" && <TerminalApp />}
        {app === "files" && <FilesApp />}
      </div>
    </div>
  );
}

/* ─────────────────────────────── desktop ───────────────────────────────── */

const DOT_CLS = [
  "splash-dot",
  "splash-dot splash-dot-1",
  "splash-dot splash-dot-2",
  "splash-dot splash-dot-3",
  "splash-dot splash-dot-4",
];

function TaskbarIcon({
  label,
  Icon,
  color,
  isActive,
  onClick,
}: Omit<AppDef, "title"> & { isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`relative flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 group ${
        isActive ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      <Icon
        className={`w-[15px] h-[15px] ${color} transition-transform group-hover:scale-110`}
      />
      {isActive && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60" />
      )}
    </button>
  );
}

function Desktop({ onShutdown }: { onShutdown: () => void }) {
  const [openApp, setOpenApp] = useState<AppId | null>(null);

  function toggle(id: AppId) {
    setOpenApp((prev) => (prev === id ? null : id));
  }

  return (
    <div className="h-[340px] flex flex-col desktop-bg">
      {/* Working area */}
      <div className="flex-1 px-2 pt-2 pb-1 overflow-hidden">
        {openApp ? (
          <AppWindow app={openApp} onClose={() => setOpenApp(null)} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2">
            <p className="text-gray-300 text-[9px] font-mono text-center leading-relaxed">
              Cliquez sur une icône
              <br />
              pour explorer le portfolio
            </p>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className={DOT_CLS[i]} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Taskbar — bottom, dock centered */}
      <div className="h-9 bg-[#04040e]/95 border-t border-white/8 flex items-center px-3 shrink-0 relative">
        {/* Left: OS label */}
        <div className="flex items-center gap-1 z-10">
          <span className="text-[10px] text-violet-400">⊞</span>
          <span className="text-[7px] font-mono text-gray-300">LULIANO OS</span>
        </div>

        {/* Center: dock icons */}
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-0.5 pointer-events-auto">
            {APPS.map((app) => (
              <TaskbarIcon
                key={app.id}
                {...app}
                isActive={openApp === app.id}
                onClick={() => toggle(app.id)}
              />
            ))}
          </div>
        </div>

        {/* Right: clock + power */}
        <div className="ml-auto flex items-center gap-2 z-10">
          <Clock />
          <button
            type="button"
            onClick={onShutdown}
            title="Éteindre"
            aria-label="Éteindre"
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <Power className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── OS boot terminal ─────────────────────── */

function OsBootTerminal() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    progressRef.current?.style.setProperty("--progress", `${progress}%`);
  }, [progress]);

  const [done, setDone] = useState<BootLine[]>([]);
  const [typing, setTyping] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [shutdownStep, setShutdownStep] = useState(0);

  /* Phase 1 — splash progress */
  useEffect(() => {
    if (phase !== "splash") return;
    if (progress >= 100) {
      setPhase("fading");
      return;
    }
    const delay =
      progress < 40 ? 18 : progress < 75 ? 28 : progress < 92 ? 45 : 70;
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + 1)), delay);
    return () => clearTimeout(t);
  }, [phase, progress]);

  /* Phase 2 — fade → boot */
  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => setPhase("boot"), 550);
    return () => clearTimeout(t);
  }, [phase]);

  /* Phase 3b — loading → desktop */
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("desktop"), 2600);
    return () => clearTimeout(t);
  }, [phase]);

  /* Phase 3 — typewriter boot → loading */
  useEffect(() => {
    if (phase !== "boot") return;

    if (lineIdx >= BOOT_LINES.length) {
      const t = setTimeout(() => setPhase("loading"), 1400);
      return () => clearTimeout(t);
    }

    const line = BOOT_LINES[lineIdx];

    if (line.text === "") {
      const t = setTimeout(() => {
        setDone((prev) => [...prev, line]);
        setCharIdx(0);
        setLineIdx((l) => l + 1);
      }, line.pause);
      return () => clearTimeout(t);
    }

    if (charIdx < line.text.length) {
      const t = setTimeout(() => {
        setTyping(line.text.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 22);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDone((prev) => [...prev, line]);
      setTyping("");
      setCharIdx(0);
      setLineIdx((l) => l + 1);
    }, line.pause);
    return () => clearTimeout(t);
  }, [phase, lineIdx, charIdx]);

  /* Phase shutdown — lignes d'arrêt progressives puis retour idle */
  useEffect(() => {
    if (phase !== "shutdown") return;
    if (shutdownStep < SHUTDOWN_LINES.length) {
      const t = setTimeout(() => setShutdownStep((s) => s + 1), 560);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setPhase("idle");
      setProgress(0);
      setDone([]);
      setTyping("");
      setLineIdx(0);
      setCharIdx(0);
      setShutdownStep(0);
    }, 900);
    return () => clearTimeout(t);
  }, [phase, shutdownStep]);

  function handleShutdown() {
    setShutdownStep(0);
    setPhase("shutdown");
  }

  const currentLine =
    phase === "boot" && lineIdx < BOOT_LINES.length
      ? BOOT_LINES[lineIdx]
      : null;
  const bootDone = phase === "boot" && lineIdx >= BOOT_LINES.length;

  return (
    <div className="relative bg-[#0c0c16] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* macOS chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#07070f] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-300 font-mono ml-2">
          {phase === "desktop"
            ? "LULIANO OS — Desktop"
            : phase === "loading"
              ? "LULIANO OS — Démarrage..."
              : phase === "shutdown"
                ? "LULIANO OS — Arrêt..."
                : phase === "idle"
                  ? "LULIANO OS — Éteint"
                  : "LULIANO_OS — terminal"}
        </span>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Idle — start screen */}
        {phase === "idle" && (
          <div className="min-h-[340px] flex flex-col items-center justify-center gap-4 bg-[#0c0c16]">
            <TuxIcon />
            <div className="text-center">
              <p className="font-mono text-white text-sm font-bold tracking-[0.2em]">
                LULIANO OS
              </p>
              <p className="font-mono text-gray-300 text-[9px] tracking-widest mt-0.5">
                Linux 6.17 LTS — x86_64
              </p>
            </div>

            {/* Start button with wave rings */}
            <div className="relative flex items-center justify-center mt-2">
              <div className="wave-ring wave-ring-1 w-14 h-14 border-violet-500/40" />
              <div className="wave-ring wave-ring-2 w-14 h-14 border-violet-500/25" />
              <div className="wave-ring wave-ring-3 w-14 h-14 border-violet-500/12" />
              <button
                type="button"
                onClick={() => setPhase("splash")}
                aria-label="Démarrer LULIANO OS"
                className="relative z-10 w-14 h-14 rounded-full bg-[#12121e] border border-violet-500/50 flex items-center justify-center hover:border-violet-400 hover:bg-violet-500/10 hover:scale-105 active:scale-95 transition-all duration-200 group shadow-[0_0_20px_rgba(150,100,255,0.2)]"
              >
                <Power className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
              </button>
            </div>

            <p className="text-gray-300 text-[8px] font-mono tracking-[0.22em] animate-pulse">
              CLIQUER POUR DÉMARRER
            </p>
          </div>
        )}

        {/* Splash */}
        {(phase === "splash" || phase === "fading") && (
          <div
            className={`min-h-[340px] flex flex-col items-center justify-center bg-[#0c0c16] transition-opacity duration-500 ${phase === "fading" ? "opacity-0" : "opacity-100"}`}
          >
            <TuxIcon />
            <p className="font-mono text-white text-sm font-bold tracking-[0.2em] mt-5 mb-1">
              LULIANO OS
            </p>
            <p className="font-mono text-gray-300 text-[10px] tracking-widest mb-8">
              Linux 6.17 LTS — x86_64
            </p>
            <div className="flex gap-2.5 mb-5">
              {DOT_CLS.map((cls, i) => (
                <div key={i} className={cls} />
              ))}
            </div>
            <div className="w-44 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div ref={progressRef} className="progress-fill" />
            </div>
          </div>
        )}

        {/* Boot terminal */}
        {phase === "boot" && (
          <div className="p-5 font-mono text-[13px] min-h-[340px] transition-opacity duration-300">
            {done.map((line, i) => (
              <div key={i} className={`leading-6 ${line.color}`}>
                {line.text || " "}
              </div>
            ))}
            {currentLine && currentLine.text !== "" && (
              <div className={`leading-6 ${currentLine.color}`}>
                {typing}
                <span className="text-violet-400 animate-pulse">█</span>
              </div>
            )}
            {bootDone && (
              <div className="text-violet-400 text-[11px] mt-2 animate-pulse">
                Starting LULIANO Desktop Environment...
              </div>
            )}
          </div>
        )}

        {/* Loading screen */}
        {phase === "loading" && (
          <div className="min-h-[340px] flex flex-col items-center justify-center gap-5 bg-[#0c0c16]">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-violet-500 os-spinner-outer" />
              <div className="absolute inset-2 rounded-full border border-white/5 border-t-cyan-500 os-spinner-inner" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-violet-400">
                  LS
                </span>
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-white text-sm font-mono font-bold tracking-[0.28em]">
                CHARGEMENT
              </p>
              <p className="text-gray-300 text-[9px] font-mono tracking-[0.15em] animate-pulse">
                Démarrage du bureau en cours...
              </p>
            </div>
            <div className="flex gap-2">
              {DOT_CLS.slice(0, 4).map((cls, i) => (
                <div key={i} className={cls} />
              ))}
            </div>
          </div>
        )}

        {/* Shutdown screen */}
        {phase === "shutdown" && (
          <div className="min-h-[340px] flex flex-col items-center justify-center gap-5 bg-[#0c0c16]">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-red-500/70 os-spinner-outer" />
              <div className="absolute inset-2 rounded-full border border-white/5 border-t-red-400/50 os-spinner-inner" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Power className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-white text-sm font-mono font-bold tracking-[0.28em]">
                ARRÊT DU SYSTÈME
              </p>
              <p className="text-gray-300 text-[9px] font-mono tracking-[0.15em] animate-pulse">
                Fermeture des sessions en cours...
              </p>
            </div>
            <div className="space-y-[5px] w-56">
              {SHUTDOWN_LINES.slice(0, shutdownStep).map((line, i) => (
                <p
                  key={i}
                  className={`font-mono text-[10px] leading-5 ${line.color}`}
                >
                  {line.text}
                  {i === shutdownStep - 1 &&
                    shutdownStep < SHUTDOWN_LINES.length && (
                      <span className="text-red-400 animate-pulse"> █</span>
                    )}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Desktop */}
        {phase === "desktop" && (
          <div className="desktop-enter">
            <Desktop onShutdown={handleShutdown} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────────── */

const STAT_DELAYS = [
  "enter-d-900",
  "enter-d-1000",
  "enter-d-1100",
  "enter-d-1200",
] as const;

export function Hero() {
  const typedText = useTyping(typingWords);
  const [mobileOsOpen, setMobileOsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const enter = "transition-all duration-700 ease-out";
  const up = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1
              className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 leading-tight ${enter} enter-d-200 ${up}`}
            >
              Salut, je suis
              <br />
              <span className="text-gradient">Luliano Sondjo</span>
            </h1>

            <div
              className={`flex items-center gap-2 mb-4 sm:mb-6 ${enter} enter-d-350 ${up}`}
            >
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 shrink-0" />
              <span className="font-mono text-sm sm:text-base md:text-lg text-gray-300 truncate">
                {typedText}
                <span className="text-violet-400 animate-pulse">|</span>
              </span>
            </div>

            <p
              className={`text-gray-300 text-sm sm:text-base md:text-lg max-w-lg mb-6 sm:mb-8 leading-relaxed ${enter} enter-d-500 ${up}`}
            >
              Développeur passionné avec{" "}
              <span className="text-white font-semibold">
                5 ans d'expérience
              </span>{" "}
              dans la création d'applications web modernes, performantes et
              élégantes.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 ${enter} enter-d-600 ${up}`}
            >
              <a
                href="#projects"
                className="group px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-violet-500 text-[#0D0D13] font-semibold flex items-center justify-center gap-2 hover:bg-violet-400 transition-all hover:scale-105 text-sm sm:text-base"
              >
                Voir mes projets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm sm:text-base"
              >
                <Mail className="w-4 h-4" /> Me contacter
              </a>
            </div>

            <div
              className={`flex flex-wrap items-center gap-3 sm:gap-4 ${enter} enter-d-700 ${up}`}
            >
              <span className="text-gray-300 text-xs sm:text-sm">
                Retrouvez-moi sur :
              </span>
              {[
                {
                  icon: <GithubIcon className="w-5 h-5" />,
                  label: "GitHub",
                  href: "https://github.com/Lul-del",
                },
                {
                  icon: <LinkedinIcon className="w-5 h-5" />,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/c%C3%A9phas-sondjo-65145b3b6/",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  href: "mailto:cephassondjo@gmail.com",
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Mobile — bouton pour ouvrir l'OS */}
            <div className={`lg:hidden mt-6 ${enter} enter-d-800 ${up}`}>
              <button
                type="button"
                onClick={() => setMobileOsOpen(true)}
                className="group relative flex items-center gap-3 px-5 py-3 rounded-xl border border-violet-500/30 bg-[#0c0c1e] hover:border-violet-400/60 hover:bg-violet-500/10 transition-all w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                  <span className="absolute w-5 h-5 rounded-full border border-violet-400/60 animate-ping" />
                  <Power className="relative w-4 h-4 text-violet-400" />
                </div>
                <span className="relative text-gray-300 text-sm font-mono">
                  Lancer LULIANO OS
                </span>
                <ArrowRight className="relative w-3.5 h-3.5 text-gray-500 ml-auto group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right — OS boot terminal (desktop only) */}
          <div
            className={`hidden lg:block transition-all duration-700 ease-out enter-d-400 ${mounted ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
              <div className="relative">
                <OsBootTerminal />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 ${enter} ${STAT_DELAYS[i]} ${up}`}
            >
              <div className="text-violet-400">{s.icon}</div>
              <div>
                <p className="font-display text-xl font-bold text-white">
                  {s.value}
                </p>
                <p className="text-xs text-gray-300">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Défiler vers la section À propos"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce ${enter} enter-d-1200 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <ChevronDown className="w-6 h-6" />
      </a>

      {/* Mobile OS modal — bottom sheet */}
      {mobileOsOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setMobileOsOpen(false)}
          />

          {/* Panel */}
          <div className="relative px-3 pb-4 mobile-os-slide-up">
            {/* Handle + fermer */}
            <div className="flex flex-col items-center gap-1 mb-3">
              <div className="w-10 h-1 rounded-full bg-white/20" />
              <button
                type="button"
                onClick={() => setMobileOsOpen(false)}
                aria-label="Fermer le terminal"
                className="text-[9px] font-mono text-gray-500 hover:text-gray-300 transition-colors tracking-widest mt-0.5"
              >
                FERMER ✕
              </button>
            </div>

            {/* OS Terminal */}
            <div className="max-h-[78vh] overflow-hidden rounded-2xl">
              <OsBootTerminal />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
