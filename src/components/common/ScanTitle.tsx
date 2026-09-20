import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { EASINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ScrambleText } from '../animations/ScrambleText';
import { GlitchBurst } from '../animations/GlitchBurst';
import { LangCycler } from '../animations/LangCycler';
import { TranslationEntry } from '../../data/languages';

interface ScanTitleProps {
  ghostNumber?: string;
  eyebrowTag: string;
  line1: string;
  line2: string | TranslationEntry;
  subtitle?: string;
  className?: string;
}

export const ScanTitle: React.FC<ScanTitleProps> = ({
  ghostNumber,
  eyebrowTag,
  line1,
  line2,
  subtitle,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const reducedMotion = useReducedMotion();

  const [scanProgress, setScanProgress] = useState(reducedMotion ? 1 : 0);
  const [line2Wiped, setLine2Wiped] = useState(reducedMotion);
  const [idleScanKey, setIdleScanKey] = useState(0);

  // Line 1 Scan Sweep animation
  useEffect(() => {
    if (reducedMotion || !isInView) return;

    const startTime = performance.now();
    const duration = 900;

    let rafId: number;
    const animateScan = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease [0.65, 0, 0.35, 1] approximation
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setScanProgress(eased);

      if (t < 1) {
        rafId = requestAnimationFrame(animateScan);
      } else {
        // Trigger Line 2 black block wipe
        setTimeout(() => setLine2Wiped(true), 150);
      }
    };

    rafId = requestAnimationFrame(animateScan);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, reducedMotion]);

  // Idle re-scan every 7 to 12 seconds
  useEffect(() => {
    if (reducedMotion || !isInView) return;

    let timerId: number;
    const scheduleReScan = () => {
      const delay = Math.random() * 5000 + 7000;
      timerId = window.setTimeout(() => {
        setIdleScanKey((prev) => prev + 1);
        scheduleReScan();
      }, delay);
    };

    scheduleReScan();
    return () => clearTimeout(timerId);
  }, [isInView, reducedMotion]);

  const clipInsetRight = (1 - scanProgress) * 100;
  const scanBarLeft = scanProgress * 100;

  return (
    <div ref={containerRef} className={`relative mb-12 select-none ${className}`}>
      {/* 2. Ghost numeral behind section heading (Anton at 40vw, ghost pink #fde3ea) */}
      {ghostNumber && (
        <div
          aria-hidden="true"
          className="absolute -top-12 -left-6 sm:-top-20 sm:-left-10 text-[32vw] md:text-[24vw] font-display font-black text-[#fde3ea] pointer-events-none select-none leading-none z-0 tracking-tighter"
          style={{ opacity: 0.85 }}
        >
          {ghostNumber}
        </div>
      )}

      {/* 3. Eyebrow: four-point star SVG in green #4d7c0f + mono uppercase label */}
      <div className="relative z-10 flex items-center gap-2 mb-3">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-[#4d7c0f] shrink-0"
          aria-hidden="true"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#4d7c0f] uppercase">
          {eyebrowTag}
        </span>
      </div>

      {/* 1. Two-Line Heading */}
      <div className="relative z-10">
        {/* Line 1: Black display text on cream with 3px lime vertical scan bar and 24px trail */}
        <div className="relative overflow-hidden inline-block py-1 pr-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-[#0a0a0a] tracking-tight leading-[0.9]">
            {reducedMotion ? (
              line1
            ) : (
              <span
                style={{
                  clipPath: `inset(0 ${clipInsetRight}% 0 0)`,
                }}
                className="inline-block"
              >
                {scanProgress > 0.1 && (
                  <ScrambleText
                    text={line1}
                    mode="mixed"
                    duration={800}
                    trigger={isInView}
                  />
                )}
              </span>
            )}
          </h2>

          {/* Sweeping 3px vertical lime bar with 24px gradient trail */}
          {!reducedMotion && scanProgress > 0 && scanProgress < 1 && (
            <div
              className="absolute top-0 bottom-0 pointer-events-none z-20"
              style={{
                left: `${scanBarLeft}%`,
                transform: 'translateX(-100%)',
              }}
            >
              <div className="h-full w-[3px] bg-[#ccff00] shadow-[0_0_12px_#ccff00]" />
              <div className="absolute top-0 bottom-0 right-[3px] w-6 bg-gradient-to-l from-[#ccff00]/40 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Idle re-scan bar (faint lime band 25% opacity) */}
          {!reducedMotion && idleScanKey > 0 && (
            <motion.div
              key={idleScanKey}
              initial={{ x: '-100%', opacity: 0.25 }}
              animate={{ x: '200%', opacity: [0.25, 0.4, 0] }}
              transition={{ duration: 1.0, ease: EASINGS.scan }}
              className="absolute top-0 bottom-0 w-8 bg-[#ccff00] pointer-events-none z-20"
            />
          )}
        </div>

        {/* Line 2: Solid black block with lime text, shifted right, ending with a period */}
        <div className="mt-2 sm:mt-3 flex items-center">
          <motion.div
            initial={reducedMotion ? false : { scaleX: 0 }}
            animate={line2Wiped || reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, ease: EASINGS.easeOutExpo }}
            style={{ originX: 0 }}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#0a0a0a] border-2 sm:border-3 border-[#0a0a0a] shadow-[4px_4px_0px_#ccff00] bg-halftone-dots crt-scanlines"
          >
            <div className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#ccff00] tracking-wider uppercase">
              {typeof line2 === 'string' ? (
                <GlitchBurst text={line2} theme="lime">
                  <ScrambleText text={line2} mode="mixed" trigger={line2Wiped} />
                </GlitchBurst>
              ) : (
                <LangCycler translations={line2} />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtitle paragraph if provided */}
      {subtitle && (
        <p className="relative z-10 mt-5 max-w-2xl text-zinc-700 font-body text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
