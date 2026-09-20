export interface TranslationEntry {
  en: string;
  jp: string;
  zh?: string;
  hi?: string;
}

export const VOCABULARY: Record<string, TranslationEntry> = {
  skills: {
    en: 'TECHNICAL SKILLS',
    jp: '技術スタック',
    zh: '核心技术矩阵',
  },
  projects: {
    en: 'FEATURED WORKS',
    jp: '厳選作品集',
    zh: '精选项目方案',
  },
  experience: {
    en: 'ENGINEERING CAREER',
    jp: '開発経歴',
    zh: '工程履历',
  },
  contact: {
    en: 'TRANSMISSION // CONTACT',
    jp: '通信接続 // 連絡',
    zh: '通信连接 // 联络',
  },
  developer: {
    en: 'FULL-STACK DEVELOPER',
    jp: 'フルスタック開発者',
    zh: '全栈架构工程师',
  },
  about: {
    en: 'BIOGRAPHY & PHILOSOPHY',
    jp: '私について // 理念',
    zh: '关于 // 架构理念',
  },
  immersive: {
    en: 'IMMERSIVE AUDIO ENGINE',
    jp: '没入型音響空間エンジン',
    zh: '沉浸式空间音频引擎',
  },
  realtime: {
    en: 'REALTIME MATRIX',
    jp: 'リアルタイム基盤',
    zh: '实时数据矩阵',
  },
  statusReady: {
    en: 'SYSTEM: OPERATIONAL',
    jp: '稼働状態: 正常',
    zh: '系统状态: 就绪',
  },
  cvDownload: {
    en: 'DOWNLOAD CURRICULUM VITAE',
    jp: '職務経歴書ダウンロード',
    zh: '下载工程简历',
  },
};
