export const DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  scanSweep: 0.9,
  loader: 2.2,
} as const;

export const EASINGS = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  scan: [0.65, 0, 0.35, 1] as const,
  linear: [0, 0, 1, 1] as const,
} as const;

export const SPRINGS = {
  snappy: { type: 'spring', stiffness: 450, damping: 32 } as const,
  bouncy: { type: 'spring', stiffness: 350, damping: 18 } as const,
  gentle: { type: 'spring', stiffness: 180, damping: 24 } as const,
  gallery: { type: 'spring', stiffness: 120, damping: 28, mass: 0.3 } as const,
} as const;

export const STAGGERS = {
  cards: 0.1,
  chips: 0.04,
  glitchType: 0.06,
  paragraphs: 0.08,
} as const;

export const SCRAMBLE_CONFIG = {
  targetFps: 30,
  frameIntervalMs: 33,
  charCadenceMin: 25,
  charCadenceMax: 45,
  maxActiveInstances: 6,
  maxActiveLowPower: 3,
  waveFrontLength: 5,
} as const;

export const GLITCH_CONFIG = {
  idleMinMs: 2500,
  idleMaxMs: 6000,
  burstMinMs: 120,
  burstMaxMs: 220,
  cooldownMs: 800,
} as const;

export const Z_INDEX = {
  content: 1,
  ghostNumber: 2,
  foregroundCard: 10,
  orbitVisual: 20,
  stickyGallery: 50,
  sideRail: 800,
  hudWidget: 900,
  modal: 950,
  loader: 9999,
} as const;
