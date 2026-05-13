import {
  Palette,
  Layers, Cpu, Zap, Smartphone, GitBranch, Globe,
  Coffee, Rocket, Star, Users,
} from 'lucide-react';

export const skills = [
  {
    category: 'Développement',
    icon: <Layers className="w-5 h-5" />,
    color: 'from-violet-500 to-purple-500',
    items: [
      { name: 'HTML / CSS',   level: 90 },
      { name: 'JavaScript',   level: 85 },
      { name: 'React',        level: 82 },
      { name: 'Node.js',      level: 76 },
    ],
  },
  {
    category: 'Mobile & IA',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'from-cyan-500 to-blue-500',
    items: [
      { name: 'React Native', level: 70 },
      { name: 'Expo',         level: 70 },
      { name: 'Python IA',    level: 25 },
      { name: 'Chatbots',     level: 60 },
    ],
  },
  {
    category: 'Design & Outils',
    icon: <Palette className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-500',
    items: [
      { name: 'Figma',        level: 78 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'Linux / Pop!OS', level: 80 },
      { name: 'VS Code / Cursor', level: 90 },
    ],
  },
];

export const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'Plateforme e-commerce complète avec paiement Stripe, gestion de stock temps réel et dashboard admin.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
    icon: <Layers className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-600',
    stars: 128,
    forks: 34,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    title: 'AI Chat Application',
    desc: 'Application de chat en temps réel avec intégration IA, traduction automatique et analyse de sentiment.',
    tags: ['React', 'Python', 'WebSocket', 'OpenAI', 'Docker'],
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-600',
    stars: 256,
    forks: 67,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
  {
    title: 'SaaS Dashboard',
    desc: 'Dashboard analytics pour startup SaaS avec visualisations de données interactives et rapports automatisés.',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB', 'AWS'],
    icon: <Zap className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    stars: 89,
    forks: 21,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  {
    title: 'Mobile Fitness App',
    desc: 'Application mobile de fitness avec suivi GPS, programmes personnalisés et intégration wearables.',
    tags: ['React Native', 'Firebase', 'MapBox', 'HealthKit'],
    icon: <Smartphone className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-600',
    stars: 175,
    forks: 42,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop',
  },
  {
    title: 'DevOps Pipeline',
    desc: 'Infrastructure as Code complète avec pipeline CI/CD, monitoring Prometheus et déploiement blue-green.',
    tags: ['Terraform', 'Kubernetes', 'GitHub Actions', 'Prometheus'],
    icon: <GitBranch className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
    stars: 94,
    forks: 28,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  },
  {
    title: 'Social Media API',
    desc: 'API RESTful complète pour réseau social avec authentification OAuth2, rate limiting et documentation Swagger.',
    tags: ['Node.js', 'Express', 'Redis', 'JWT', 'Swagger'],
    icon: <Globe className="w-6 h-6" />,
    color: 'from-indigo-500 to-violet-600',
    stars: 143,
    forks: 38,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
  },
];

export const experience = [
  {
    role: 'Lead Développeur Full Stack',
    company: 'TechVision Paris',
    period: '2022 — Présent',
    desc: "Direction technique d'une équipe de 8 développeurs. Architecture microservices, choix technologiques et mentoring.",
    tags: ['React', 'Node.js', 'AWS', 'Kubernetes'],
    current: true,
  },
  {
    role: 'Développeur Full Stack Senior',
    company: 'StartupLab',
    period: '2020 — 2022',
    desc: "Développement de produits SaaS de A à Z. Conception d'APIs performantes et d'interfaces utilisateur modernes.",
    tags: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    current: false,
  },
  {
    role: 'Développeur Frontend',
    company: 'DigitalCraft Agency',
    period: '2018 — 2020',
    desc: "Création d'interfaces utilisateur complexes pour des clients grands comptes. Performance et accessibilité.",
    tags: ['React', 'TypeScript', 'GraphQL', 'Figma'],
    current: false,
  },
  {
    role: 'Développeur Web Junior',
    company: 'WebStudio',
    period: '2017 — 2018',
    desc: 'Premiers pas professionnels. Développement de sites web et applications pour PME.',
    tags: ['JavaScript', 'PHP', 'MySQL', 'CSS'],
    current: false,
  },
];

export const stats = [
  { icon: <Coffee className="w-5 h-5" />, value: '5',  label: "Années d'expérience" },
  { icon: <Rocket className="w-5 h-5" />, value: '50+', label: 'Projets livrés' },
  { icon: <Star className="w-5 h-5" />, value: '1.2k', label: 'Stars GitHub' },
  { icon: <Users className="w-5 h-5" />, value: '30+', label: 'Clients satisfaits' },
];
