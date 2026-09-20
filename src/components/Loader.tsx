import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Z_INDEX, EASINGS } from '../lib/motion';
import { ScrambleText } from './animations/ScrambleText';
import { GlitchBurst } from './animations/GlitchBurst';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PROFILE_DATA } from '../data/profile';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusStep, setStatusStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const reducedMotion = useReducedMotion();
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 550);
  };

  useEffect(() => {
    if (reducedMotion) {
      finish();
      return;
    }

    // Hard 4s safety timeout fallback
    const safetyTimer = setTimeout(() => {
      finish();
    }, 4000);

    const startTime = performance.now();
    const duration = 2200;

    let rafId: number;
    const tick = (time: number) => {
      const elapsed = time - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct > 25 && statusStep === 0) setStatusStep(1);
      if (pct > 65 && statusStep === 1) setStatusStep(2);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  const statusMessages = [
    '> BOOTING AUDIO KERNEL...',
    '> SCANNING REALTIME MATRICES [OK]',
    '> SYSTEM OPERATIONAL // READY.',
  ];

  return (
    <div
      style={{ zIndex: Z_INDEX.loader }}
      className="fixed inset-0 bg-[#0a0a0a] text-white flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Skip Button */}
      <button
        onClick={finish}
        className="absolute top-6 right-6 px-3 py-1.5 bg-black border-2 border-zinc-700 text-zinc-400 hover:text-white hover:border-[#ccff00] font-mono text-xs font-bold cursor-pointer uppercase transition-colors z-50"
        aria-label="Skip intro animation"
      >
        [SKIP_BOOT_SEQUENCE]
      </button>

      <div className="w-full max-w-xl px-6 relative z-30">
        {/* Status Lines */}
        <div className="mb-6 font-mono text-xs sm:text-sm text-zinc-400 space-y-1">
          <div className="text-[#ccff00] font-bold">
            PASYA_ZAHRI // TELEMETRY_INITIALIZATION
          </div>
          {statusMessages.slice(0, statusStep + 1).map((msg, idx) => (
            <div key={idx} className={idx === statusStep ? 'text-white' : 'text-zinc-500'}>
              {msg}
            </div>
          ))}
        </div>

        {/* Big Name Scan-Decoded */}
        <div className="mb-8 border-y-3 border-white/20 py-4">
          <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-wider">
            <GlitchBurst text={PROFILE_DATA.name} theme="dark" intensity="high">
              <ScrambleText text={PROFILE_DATA.name} mode="mixed" duration={1800} />
            </GlitchBurst>
          </h1>
          <div className="font-mono text-xs sm:text-sm text-[#ccff00] mt-1 tracking-widest uppercase">
            // FULL-STACK &amp; MOBILE DEVELOPER // JAKARTA NODE
          </div>
        </div>

        {/* Progress Bar with scaleX and Counter */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono text-xs text-[#ccff00] font-bold">
            <span>LOADING_AUDIO_ENGINE</span>
            <span>{progress.toString().padStart(3, '0')}%</span>
          </div>
          <div className="h-4 w-full bg-zinc-900 border-2 border-white overflow-hidden p-0.5">
            <div
              className="h-full bg-[#ccff00] origin-left transition-transform duration-75"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>

      {/* Shutter Exit: 4 horizontal bars, lime and ink, sliding out in alternating directions (0.5s) */}
      <AnimatePresence>
        {isExiting && (
          <div className="fixed inset-0 pointer-events-none z-40 flex flex-col">
            {[0, 1, 2, 3].map((barIdx) => {
              const isEven = barIdx % 2 === 0;
              const bgColor = barIdx % 3 === 0 ? '#ccff00' : '#0a0a0a';
              return (
                <motion.div
                  key={barIdx}
                  initial={{ x: '0%' }}
                  animate={{ x: isEven ? '100%' : '-100%' }}
                  transition={{ duration: 0.5, ease: EASINGS.easeOutExpo }}
                  className="flex-1 w-full border-b border-black"
                  style={{ backgroundColor: bgColor }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
