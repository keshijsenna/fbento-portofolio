export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  ariaLabel: string;
}

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  shortBio: string;
  detailedBio: string[];
  email: string;
  statusBadges: Array<{
    label: string;
    variant: 'lime' | 'white' | 'black' | 'indigo';
    rotate: string;
  }>;
  socials: SocialLink[];
  stats: Array<{
    value: number;
    suffix: string;
    label: string;
    sublabel: string;
  }>;
}

export const PROFILE_DATA: ProfileData = {
  name: 'PASYA ZAHRI',
  role: 'FULL-STACK & MOBILE DEVELOPER',
  location: 'JAKARTA, INDONESIA',
  shortBio: 'Building resilient web and mobile digital products with reactive architectures, audio engine visual design, and mathematical motion precision.',
  detailedBio: [
    'I specialize in engineering high-throughput distributed backends and tactile, high-performance user interfaces.',
    'With a strong command of TypeScript, React, Next.js, and native mobile stacks, I build software that bridges computational speed and expressive brutalist aesthetics.',
    'Currently operating from Jakarta, building distributed systems, real-time client architectures, and custom motion tools.'
  ],
  email: 'pasyazahri02@gmail.com',
  statusBadges: [
    { label: 'AVAILABLE FOR WORK', variant: 'lime', rotate: '-1.5deg' },
    { label: '28+ PROJECTS SHIPPED', variant: 'white', rotate: '1.2deg' },
    { label: 'RESILIENT ARCHITECTURE', variant: 'black', rotate: '-0.8deg' },
    { label: 'フルスタック開発者', variant: 'indigo', rotate: '1.8deg' },
  ],
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/pasyazahri',
      username: '@pasyazahri',
      ariaLabel: 'Open GitHub profile of Pasya Zahri',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/pasyazahri',
      username: 'in/pasyazahri',
      ariaLabel: 'Open LinkedIn profile of Pasya Zahri',
    },
    {
      platform: 'Telegram',
      url: 'https://t.me/pasyazahri',
      username: '@pasyazahri',
      ariaLabel: 'Open Telegram message with Pasya Zahri',
    },
    {
      platform: 'Email',
      url: 'mailto:pasyazahri02@gmail.com',
      username: 'pasyazahri02@gmail.com',
      ariaLabel: 'Send email to Pasya Zahri',
    },
  ],
  stats: [
    {
      value: 5,
      suffix: '+',
      label: 'YEARS IN PRODUCTION',
      sublabel: 'Commercial shipping experience',
    },
    {
      value: 28,
      suffix: '+',
      label: 'COMMERCIAL APPS',
      sublabel: 'Deployed cross-platform services',
    },
    {
      value: 99,
      suffix: '.9%',
      label: 'SYSTEM RELIABILITY',
      sublabel: 'Zero downtime target SLAs',
    },
    {
      value: 120,
      suffix: 'K+',
      label: 'ACTIVE END USERS',
      sublabel: 'Monthly served client base',
    },
  ],
};
