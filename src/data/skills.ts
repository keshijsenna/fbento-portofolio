import { TranslationEntry } from './languages';

export interface SkillCategory {
  id: string;
  num: string;
  wide: boolean;
  title: string;
  sublabel: TranslationEntry;
  description: string;
  chips: string[];
  iconName: 'Layout' | 'Server' | 'Smartphone' | 'Cloud' | 'Activity' | 'Palette';
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'skill-frontend',
    num: '01',
    wide: true,
    title: 'FRONTEND ARCHITECTURE',
    sublabel: {
      en: 'MODERN WEB RUNTIMES',
      jp: '先端ウェブ実行環境',
      zh: '现代前端运行时',
    },
    description: 'Engineering responsive single-page applications and server-rendered portals with type-safe state machines, zero cumulative layout shift, and WCAG AA compliance.',
    chips: [
      'React 19',
      'Next.js 15',
      'TypeScript 5',
      'Tailwind CSS',
      'Framer Motion',
      'WebGL / Canvas',
      'Zustand',
      'TanStack Query',
      'Vite'
    ],
    iconName: 'Layout',
  },
  {
    id: 'skill-backend',
    num: '02',
    wide: false,
    title: 'BACKEND & DISTRIBUTED SYSTEMS',
    sublabel: {
      en: 'HIGH-CONCURRENCY PIPELINES',
      jp: '高並列処理基盤',
      zh: '高并发数据通道',
    },
    description: 'Architecting resilient RESTful and gRPC microservices handling stateful persistence and horizontal autoscaling.',
    chips: [
      'Node.js',
      'Express',
      'Go (Golang)',
      'PostgreSQL',
      'Redis Cache',
      'Prisma ORM',
      'WebSockets'
    ],
    iconName: 'Server',
  },
  {
    id: 'skill-mobile',
    num: '03',
    wide: false,
    title: 'MOBILE ENGINEERING',
    sublabel: {
      en: 'CROSS-PLATFORM & NATIVE',
      jp: '端末ネイティブ開発',
      zh: '跨端原生框架',
    },
    description: 'Shipping performant iOS and Android applications with 60fps animations, biometric authentication, and offline synchronization.',
    chips: [
      'Flutter / Dart',
      'React Native',
      'Kotlin Android',
      'Swift iOS',
      'SQLite / Room',
      'Push Notifications'
    ],
    iconName: 'Smartphone',
  },
  {
    id: 'skill-cloud',
    num: '04',
    wide: true,
    title: 'CLOUD, DEVOPS & INFRASTRUCTURE',
    sublabel: {
      en: 'CONTAINERIZATION & CI/CD',
      jp: 'クラウド基盤と自動化',
      zh: '云原生与自动化交付',
    },
    description: 'Automating immutable container deployments, production ingress routing, edge caching, and serverless compute pipelines.',
    chips: [
      'Docker',
      'Kubernetes',
      'Google Cloud Platform',
      'AWS ECS/Lambda',
      'Nginx Reverse Proxy',
      'GitHub Actions CI/CD',
      'Terraform IaC',
      'Cloudflare Edge'
    ],
    iconName: 'Cloud',
  },
  {
    id: 'skill-audio',
    num: '05',
    wide: false,
    title: 'AUDIO & REAL-TIME ENGINES',
    sublabel: {
      en: 'LOW-LATENCY DSP',
      jp: '低遅延音響信号処理',
      zh: '低延迟音频引擎',
    },
    description: 'Building in-browser synthesizers, spatial audio routing, visualizers, and WebRTC streaming buffers.',
    chips: [
      'Web Audio API',
      'Audio Worklet',
      'DSP Filters',
      'WebRTC MediaStreams',
      'Canvas 2D Visualizer',
      'FFT Frequency Analyzers'
    ],
    iconName: 'Activity',
  },
  {
    id: 'skill-motion',
    num: '06',
    wide: false,
    title: 'NEUBRUTALIST MOTION & SYSTEMS',
    sublabel: {
      en: 'TACTILE INTERFACE DESIGN',
      jp: '精密インタラクション設計',
      zh: '触感交互与动态系统',
    },
    description: 'Crafting unyielding brutalist layouts, hard offset box-shadows, zero-blur contrast, and fluid spring physics.',
    chips: [
      'Framer Motion',
      'Lenis Smooth Scroll',
      'Design Token Systems',
      'SVG Path Morphing',
      'Micro-Interactions',
      'Typography Hierarchy'
    ],
    iconName: 'Palette',
  },
];
