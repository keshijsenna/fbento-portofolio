import { TimelineItem } from '../types';

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'exp-1',
    type: 'experience',
    roleOrDegree: 'Senior Full-Stack & Mobile Engineer',
    institutionOrCompany: 'PT Teknologi Digital Nusantara',
    location: 'Jakarta, Indonesia',
    period: '2023 — PRESENT',
    badgeText: 'CURRENT ROLE',
    description: [
      'Lead a high-velocity squad of 6 engineers architecting core web & cross-platform mobile products in Next.js, React, and Flutter.',
      'Reduced mobile checkout dropout by 32% through UI re-engineering and instant biometric authorization.',
      'Spearheaded the migration of microservices to Docker container clusters on Kubernetes, improving deployment frequency from weekly to daily.'
    ],
    techTags: ['React', 'Next.js', 'Flutter', 'TypeScript', 'Docker', 'PostgreSQL']
  },
  {
    id: 'exp-2',
    type: 'experience',
    roleOrDegree: 'Full-Stack Developer',
    institutionOrCompany: 'Aura Labs Venture Studio',
    location: 'Jakarta, Indonesia (Hybrid)',
    period: '2021 — 2023',
    badgeText: 'FULL-TIME',
    description: [
      'Engineered and launched 8+ MVP products for fintech and e-commerce founders from prototype to commercial launch.',
      'Built high-speed Node.js REST and GraphQL APIs serving 10M+ monthly database queries with sub-50ms response times.',
      'Standardized frontend state management and reusable Neubrutalist & design-token component systems across all client web properties.'
    ],
    techTags: ['Node.js', 'Express', 'React', 'MongoDB', 'Redis', 'Tailwind CSS']
  },
  {
    id: 'exp-3',
    type: 'experience',
    roleOrDegree: 'Mobile Application Developer Intern',
    institutionOrCompany: 'Inovasi Cipta Solusi',
    location: 'Jakarta, Indonesia',
    period: '2020 — 2021',
    badgeText: 'EARLY CAREER',
    description: [
      'Built native Android features in Kotlin utilizing Jetpack components, Room persistent database, and Retrofit HTTP client.',
      'Refactored legacy Java modules into modern Kotlin coroutines, slashing app crash rate by 45%.'
    ],
    techTags: ['Kotlin', 'Android SDK', 'Jetpack', 'Room DB', 'Java']
  },
  {
    id: 'edu-1',
    type: 'education',
    roleOrDegree: 'Bachelor of Computer Science (S.Kom)',
    institutionOrCompany: 'Universitas Bina Nusantara (BINUS University)',
    location: 'Jakarta, Indonesia',
    period: '2018 — 2022',
    badgeText: 'HONORS GRADUATE',
    description: [
      'Graduated with Magna Cum Laude honors (GPA: 3.84 / 4.00), specializing in Software Engineering & Distributed Systems.',
      'Lead Researcher & Author for undergraduate thesis on "Optimizing Asynchronous State Synchronization in Offline-First Mobile Architectures".',
      'President of Google Developer Student Clubs (GDSC) chapter, conducting workshops for 300+ student developers.'
    ],
    techTags: ['Algorithms', 'Distributed Systems', 'Software Architecture', 'Networks']
  }
];
