import { Project } from '../types';

export const PROJECT_CATEGORIES = ['All', 'Web', 'Mobile', 'Backend'] as const;

export const PROJECTS_DATA: Project[] = [
  {
    id: 'pulse-fintech',
    title: 'PulsePay Global - Neobank Mobile App',
    oneLineDescription: 'Cross-platform multi-currency digital wallet and instant cross-border settlement app.',
    fullDescription: 'Built from ground up with Flutter & BLoC state management, integrating biometric authentication, QRIS payment gateway, real-time currency conversion APIs, and encrypted local storage.',
    category: 'Mobile',
    techTags: ['Flutter', 'Dart', 'BLoC', 'Go', 'PostgreSQL', 'Biometrics'],
    liveUrl: 'https://pulsepay.demo.dev',
    githubUrl: 'https://github.com/pasyazahri/pulsepay-mobile',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    metrics: '15k+ Monthly Active Users • 99.9% Uptime'
  },
  {
    id: 'nexus-saas',
    title: 'NexusFlow - Developer Workspace & Kanban',
    oneLineDescription: 'Ultra-fast collaborative issue tracker and release orchestrator for agile engineering teams.',
    fullDescription: 'A production-grade Next.js App Router application with optimistic updates, WebSocket real-time boards, automated GitHub sync, and keyboard-first command palette.',
    category: 'Web',
    techTags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'WebSockets'],
    liveUrl: 'https://nexusflow.demo.dev',
    githubUrl: 'https://github.com/pasyazahri/nexusflow-app',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    metrics: 'Sub-40ms latency • 250+ teams onboarded'
  },
  {
    id: 'sentinel-api',
    title: 'Sentinel - Distributed Rate-Limiting Gateway',
    oneLineDescription: 'High-throughput token-bucket proxy gateway with Redis clustering and IP analytics.',
    fullDescription: 'Architected in Node.js and TypeScript, handling over 25,000 req/sec with zero-overhead sliding log rate limiting, JWT validation middleware, and automated DDoS mitigation triggers.',
    category: 'Backend',
    techTags: ['Node.js', 'Express', 'TypeScript', 'Redis', 'Docker', 'Grafana'],
    liveUrl: 'https://sentinel-api.demo.dev',
    githubUrl: 'https://github.com/pasyazahri/sentinel-gateway',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    metrics: '25,000+ RPS sustained throughput'
  },
  {
    id: 'tokoz-ecommerce',
    title: 'UrbanKicks - Headless Streetwear Platform',
    oneLineDescription: 'High-conversion e-commerce storefront with instantaneous cart transitions and Stripe 3DS.',
    fullDescription: 'Full-stack headless commerce solution featuring server-side rendered product catalogs, dynamic faceted search, inventory locks, and webhook-driven checkout reconciliation.',
    category: 'Web',
    techTags: ['React', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Stripe', 'Redis'],
    liveUrl: 'https://urbankicks.demo.dev',
    githubUrl: 'https://github.com/pasyazahri/urbankicks-store',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    metrics: '99 Lighthouse Score • <1.2s LCP'
  },
  {
    id: 'meditrack-android',
    title: 'MediTrack - Prescription & Vitals Native App',
    oneLineDescription: 'Native Android healthcare tracker with offline-first synchronization and wearable link.',
    fullDescription: 'Developed in Kotlin with Jetpack Compose, Android Architecture Components (Room, Coroutines, Flow), and encrypted health data storage complying with privacy standards.',
    category: 'Mobile',
    techTags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Coroutines', 'Material 3'],
    liveUrl: 'https://meditrack.demo.dev',
    githubUrl: 'https://github.com/pasyazahri/meditrack-android',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    metrics: 'Offline-first • 100% Kotlin Compose'
  },
  {
    id: 'hyperion-engine',
    title: 'Hyperion - Async Event Broker & Webhook Dispatcher',
    oneLineDescription: 'Fault-tolerant message bus with exponential retry backoff and dead-letter quarantine.',
    fullDescription: 'Built with Node.js, RabbitMQ, and PostgreSQL. Guarantees at-least-once delivery for mission-critical third-party integrations with cryptographic signature verifications.',
    category: 'Backend',
    techTags: ['Node.js', 'TypeScript', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Prometheus'],
    liveUrl: 'https://hyperion.demo.dev',
    githubUrl: 'https://github.com/pasyazahri/hyperion-broker',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    metrics: '99.999% delivery guarantee'
  }
];
