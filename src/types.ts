export type SkillCategory = 
  | 'Languages' 
  | 'Frontend' 
  | 'Backend' 
  | 'Database' 
  | 'Mobile' 
  | 'DevOps & Tools';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  levelBlocks: number; // 1-5 segmented bar blocks
  years: number;
  note: string;
  iconName: string;
  highlight?: boolean;
}

export type ProjectCategory = 'All' | 'Web' | 'Mobile' | 'Backend';

export interface Project {
  id: string;
  title: string;
  oneLineDescription: string;
  fullDescription: string;
  category: 'Web' | 'Mobile' | 'Backend';
  techTags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured?: boolean;
  metrics?: string;
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  roleOrDegree: string;
  institutionOrCompany: string;
  location: string;
  period: string;
  description: string[];
  techTags?: string[];
  badgeText?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: string;
  ariaLabel: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  location: string;
  email: string;
  availability: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  socials: SocialLink[];
}
