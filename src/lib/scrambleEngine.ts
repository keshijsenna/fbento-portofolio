import { SCRAMBLE_CONFIG } from './motion';

export type ScrambleMode = 'latin' | 'jp' | 'mixed' | 'multi';

export const GLYPH_POOLS = {
  latin: ['#', '@', '%', '&', '/', '\\', '=', '+', '<', '>', '0', '1', '7', 'X', '_'],
  katakana: [
    'ア', 'イ', 'ウ', 'エ', 'オ',
    'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ',
    'ヤ', 'ユ', 'ヨ',
    'ラ', 'リ', 'ル', 'レ', 'ロ',
    'ワ', 'ヲ', 'ン'
  ],
  kanji: ['動', '力', '源', '没', '入', '音', '響', '空', '間', '立', '体', '波', '形', '技', '術', '作', '品'],
  chinese: ['实', '时', '音', '频', '矩', '阵'],
  devanagari: ['सा', 'उं', 'ड', 'स्टू', 'डि', 'यो'],
};

export function getRandomGlyph(mode: ScrambleMode = 'mixed'): string {
  if (mode === 'latin') {
    return GLYPH_POOLS.latin[Math.floor(Math.random() * GLYPH_POOLS.latin.length)];
  }
  if (mode === 'jp') {
    const isKanji = Math.random() > 0.65;
    const pool = isKanji ? GLYPH_POOLS.kanji : GLYPH_POOLS.katakana;
    return pool[Math.floor(Math.random() * pool.length)];
  }
  if (mode === 'multi') {
    const roll = Math.random();
    if (roll < 0.35) {
      return GLYPH_POOLS.katakana[Math.floor(Math.random() * GLYPH_POOLS.katakana.length)];
    } else if (roll < 0.6) {
      return GLYPH_POOLS.kanji[Math.floor(Math.random() * GLYPH_POOLS.kanji.length)];
    } else if (roll < 0.8) {
      return GLYPH_POOLS.chinese[Math.floor(Math.random() * GLYPH_POOLS.chinese.length)];
    } else {
      return GLYPH_POOLS.latin[Math.floor(Math.random() * GLYPH_POOLS.latin.length)];
    }
  }

  // 'mixed' mode: mostly katakana and kanji with a few latin characters
  const rand = Math.random();
  if (rand < 0.50) {
    return GLYPH_POOLS.katakana[Math.floor(Math.random() * GLYPH_POOLS.katakana.length)];
  } else if (rand < 0.80) {
    return GLYPH_POOLS.kanji[Math.floor(Math.random() * GLYPH_POOLS.kanji.length)];
  } else {
    return GLYPH_POOLS.latin[Math.floor(Math.random() * GLYPH_POOLS.latin.length)];
  }
}

export interface ScrambleTask {
  id: string;
  targetText: string;
  mode: ScrambleMode;
  durationMs: number;
  startTime: number;
  lastFrameTime: number;
  onUpdate: (renderedChars: string[], isComplete: boolean) => void;
  onComplete?: () => void;
  isWaveMode?: boolean;
}

class ScrambleEngineManager {
  private activeTasks = new Map<string, ScrambleTask>();
  private queue: ScrambleTask[] = [];
  private rafId: number | null = null;
  private isLowPower = false;
  private frameIntervalMs: number = SCRAMBLE_CONFIG.frameIntervalMs;

  constructor() {
    if (typeof window !== 'undefined') {
      const concurrency = navigator.hardwareConcurrency || 4;
      const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
      const isMobile = window.innerWidth < 768;
      this.isLowPower = concurrency <= 4 || mem <= 4 || isMobile;
      if (this.isLowPower) {
        this.frameIntervalMs = 50; // ~20fps for low power devices
      }
    }
  }

  public register(task: Omit<ScrambleTask, 'startTime' | 'lastFrameTime'>): () => void {
    const fullTask: ScrambleTask = {
      ...task,
      startTime: 0,
      lastFrameTime: 0,
    };

    const maxSlots = this.isLowPower
      ? SCRAMBLE_CONFIG.maxActiveLowPower
      : SCRAMBLE_CONFIG.maxActiveInstances;

    if (this.activeTasks.size < maxSlots) {
      this.startTask(fullTask);
    } else {
      this.queue.push(fullTask);
    }

    return () => {
      this.cancel(fullTask.id);
    };
  }

  private startTask(task: ScrambleTask) {
    task.startTime = performance.now();
    task.lastFrameTime = task.startTime;
    this.activeTasks.set(task.id, task);

    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  public cancel(id: string) {
    this.activeTasks.delete(id);
    this.queue = this.queue.filter((t) => t.id !== id);

    this.checkQueue();
    if (this.activeTasks.size === 0 && this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private checkQueue() {
    const maxSlots = this.isLowPower
      ? SCRAMBLE_CONFIG.maxActiveLowPower
      : SCRAMBLE_CONFIG.maxActiveInstances;

    while (this.activeTasks.size < maxSlots && this.queue.length > 0) {
      const nextTask = this.queue.shift();
      if (nextTask) {
        this.startTask(nextTask);
      }
    }
  }

  private tick = (now: number) => {
    if (this.activeTasks.size === 0) {
      this.rafId = null;
      return;
    }

    for (const [id, task] of this.activeTasks) {
      const elapsed = now - task.startTime;
      const progress = Math.min(1, elapsed / task.durationMs);

      // Capped symbol refresh interval
      if (now - task.lastFrameTime >= this.frameIntervalMs || progress >= 1) {
        task.lastFrameTime = now;

        const targetChars = Array.from(task.targetText);
        const totalChars = targetChars.length;

        if (progress >= 1) {
          task.onUpdate(targetChars, true);
          task.onComplete?.();
          this.activeTasks.delete(id);
          continue;
        }

        const resolvedCount = Math.floor(progress * totalChars);
        const rendered: string[] = [];

        if (task.isWaveMode) {
          // Wave mode for long paragraphs: only 4-6 chars at front scramble
          const waveFront = SCRAMBLE_CONFIG.waveFrontLength;
          for (let i = 0; i < totalChars; i++) {
            if (i < resolvedCount) {
              rendered.push(targetChars[i]);
            } else if (i < resolvedCount + waveFront) {
              if (targetChars[i] === ' ' || targetChars[i] === '\n') {
                rendered.push(targetChars[i]);
              } else {
                rendered.push(getRandomGlyph(task.mode));
              }
            } else {
              rendered.push(''); // Not revealed yet
            }
          }
        } else {
          // Standard decode mode
          for (let i = 0; i < totalChars; i++) {
            if (i <= resolvedCount) {
              rendered.push(targetChars[i]);
            } else if (targetChars[i] === ' ' || targetChars[i] === '\n') {
              rendered.push(targetChars[i]);
            } else {
              rendered.push(getRandomGlyph(task.mode));
            }
          }
        }

        task.onUpdate(rendered, false);
      }
    }

    this.checkQueue();

    if (this.activeTasks.size > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.rafId = null;
    }
  };
}

export const scrambleEngine = new ScrambleEngineManager();
