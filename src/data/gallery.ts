import { TranslationEntry } from './languages';

export interface GalleryItem {
  id: string;
  num: string;
  photoHeader: string;
  title: string;
  caption: TranslationEntry;
  techTags: string[];
  metrics: string;
  backdropColor: string;
  svgGraphic: 'waveform' | 'matrix' | 'synthesizer' | 'radar' | 'network' | 'spatial';
  liveUrl?: string;
  githubUrl?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    num: '01',
    photoHeader: 'PHOTO / 01',
    title: 'KINETIC AUDIO SYNTHESIS ENGINE',
    caption: {
      en: 'In-browser polyphonic synthesizer with real-time waveform modulation and tactile patch bay.',
      jp: 'リアルタイム波形変調と触覚的パッチベイを備えたブラウザ内ポリフォニック音響機関。',
      zh: '集成实时波形调制与虚拟接线盘的浏览器复音合成系统。',
    },
    techTags: ['Web Audio API', 'AudioWorklet', 'React', 'TypeScript', 'Tailwind CSS'],
    metrics: 'LATENCY < 8MS // 60 FPS',
    backdropColor: '#fde3ea',
    svgGraphic: 'synthesizer',
    liveUrl: 'https://github.com/pasyazahri',
    githubUrl: 'https://github.com/pasyazahri',
  },
  {
    id: 'gal-02',
    num: '02',
    photoHeader: 'PHOTO / 02',
    title: 'REALTIME TELEMETRY MATRIX',
    caption: {
      en: 'High-throughput sensor tracking dashboard streaming 50k events per second over WebSockets.',
      jp: '毎秒5万件のイベントをWebSockets経由でストリーミングする高スループット監視盤。',
      zh: '基于 WebSocket 每秒吞吐 5 万次事件的高性能遥测看板。',
    },
    techTags: ['Go', 'Node.js', 'Redis Streams', 'PostgreSQL', 'Docker'],
    metrics: '50K MSG/SEC // ZERO DROP',
    backdropColor: '#ccff00',
    svgGraphic: 'waveform',
    liveUrl: 'https://github.com/pasyazahri',
    githubUrl: 'https://github.com/pasyazahri',
  },
  {
    id: 'gal-03',
    num: '03',
    photoHeader: 'PHOTO / 03',
    title: 'NATIVE MOBILE FIELD ASSISTANT',
    caption: {
      en: 'Cross-platform mobile client featuring offline-first local synchronization and biometric signing.',
      jp: 'オフライン同期と生体認証署名を特徴とするクロスプラットフォーム端末アプリ。',
      zh: '具备离线优先双向同步与生物识别安全签名的跨端原生应用。',
    },
    techTags: ['Flutter', 'Dart', 'SQLite', 'Riverpod', 'Android/iOS'],
    metrics: '4.9 APP STORE // 100K+ DL',
    backdropColor: '#e0e7ff',
    svgGraphic: 'radar',
    liveUrl: 'https://github.com/pasyazahri',
    githubUrl: 'https://github.com/pasyazahri',
  },
  {
    id: 'gal-04',
    num: '04',
    photoHeader: 'PHOTO / 04',
    title: '360 SPATIAL ACOUSTIC HEAD TRACKER',
    caption: {
      en: 'Binaural convolution reverb and dynamic ambisonic sound positioning in 3D canvas space.',
      jp: '3次元空間におけるバイノーラル畳み込み残響と動的立体音響定位システム。',
      zh: '基于双耳卷积混响与动态全景声算法的三维空间声场定位。',
    },
    techTags: ['WebGL', 'Web Audio API', 'Framer Motion', 'TypeScript'],
    metrics: '3D BINAURAL // 128 CHANNELS',
    backdropColor: '#fde3ea',
    svgGraphic: 'spatial',
    liveUrl: 'https://github.com/pasyazahri',
    githubUrl: 'https://github.com/pasyazahri',
  },
  {
    id: 'gal-05',
    num: '05',
    photoHeader: 'PHOTO / 05',
    title: 'DISTRIBUTED INGRESS ROUTER',
    caption: {
      en: 'Zero-downtime containerized edge proxy with automated TLS termination and circuit breaking.',
      jp: '自動TLS終端とサーキットブレーカーを備えたゼロダウンタイムのエッジプロキシ。',
      zh: '支持自动化证书终结与熔断降级策略的零宕机云端边缘代理。',
    },
    techTags: ['Docker', 'Nginx', 'Kubernetes', 'Linux', 'Terraform'],
    metrics: '99.99% SLA // EDGE PROXY',
    backdropColor: '#ccff00',
    svgGraphic: 'network',
    liveUrl: 'https://github.com/pasyazahri',
    githubUrl: 'https://github.com/pasyazahri',
  },
  {
    id: 'gal-06',
    num: '06',
    photoHeader: 'PHOTO / 06',
    title: 'NEUBRUTALIST DESIGN SYSTEM CORE',
    caption: {
      en: 'Rigorous open-source UI component library adhering strictly to hard offset shadows and WCAG AA.',
      jp: '硬質オフセット影とWCAG AA規格に厳格に準拠したオープンソース設計基盤。',
      zh: '严格遵循无虚化硬阴影与无障碍色彩对比度标准的触感界面规范库。',
    },
    techTags: ['React', 'Tailwind CSS', 'TypeScript', 'Tokens Engine'],
    metrics: '100 LIGHTHOUSE // WCAG AA',
    backdropColor: '#e0e7ff',
    svgGraphic: 'matrix',
    liveUrl: 'https://github.com/pasyazahri',
    githubUrl: 'https://github.com/pasyazahri',
  },
];
