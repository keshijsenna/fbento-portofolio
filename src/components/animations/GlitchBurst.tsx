import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GLITCH_CONFIG } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GlitchBurstProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark' | 'lime'; // Determines mix-blend-mode (multiply vs screen)
  intensity?: 'low' | 'medium' | 'high';
  triggerOnHover?: boolean;
  as?: React.ElementType;
}

export const GlitchBurst: React.FC<GlitchBurstProps> = ({
  text,
  children,
  className = '',
  theme = 'light',
  intensity = 'medium',
  triggerOnHover = true,
  as: Component = 'span',
}) => {
  const reducedMotion = useReducedMotion();
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchFrame, setGlitchFrame] = useState(0);
  const lastBurstTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  // Offset multiplier
  const multiplier = intensity === 'low' ? 0.6 : intensity === 'high' ? 1.5 : 1.0;
  const offsetX = 3 * multiplier;

  const runBurst = useCallback(() => {
    if (reducedMotion || isGlitching) return;
    const now = Date.now();
    if (now - lastBurstTimeRef.current < GLITCH_CONFIG.cooldownMs) return;

    lastBurstTimeRef.current = now;
    setIsGlitching(true);

    const burstDuration = Math.random() * (GLITCH_CONFIG.burstMaxMs - GLITCH_CONFIG.burstMinMs) + GLITCH_CONFIG.burstMinMs;
    const frames = 5;
    const frameInterval = burstDuration / frames;

    let currentFrame = 0;
    const intervalId = window.setInterval(() => {
      currentFrame++;
      setGlitchFrame(currentFrame);
      if (currentFrame >= frames) {
        clearInterval(intervalId);
        setIsGlitching(false);
        setGlitchFrame(0);
      }
    }, frameInterval);
  }, [reducedMotion, isGlitching, multiplier]);

  // Periodic random idle bursts
  useEffect(() => {
    if (reducedMotion) return;

    const scheduleNextBurst = () => {
      const idleTime = Math.random() * (GLITCH_CONFIG.idleMaxMs - GLITCH_CONFIG.idleMinMs) + GLITCH_CONFIG.idleMinMs;
      timeoutRef.current = window.setTimeout(() => {
        runBurst();
        scheduleNextBurst();
      }, idleTime);
    };

    scheduleNextBurst();

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [reducedMotion, runBurst]);

  if (reducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  // Clip path slices for keyframes
  const slice1Top = (glitchFrame * 17) % 70;
  const slice1Bottom = 100 - (slice1Top + 25);
  const slice2Top = (glitchFrame * 29 + 10) % 65;
  const slice2Bottom = 100 - (slice2Top + 30);

  const blendModeClass = theme === 'light' ? 'mix-blend-multiply' : 'mix-blend-screen';

  return (
    <Component
      data-text={text}
      onMouseEnter={triggerOnHover ? runBurst : undefined}
      onFocus={triggerOnHover ? runBurst : undefined}
      className={`relative inline-block select-none ${className}`}
    >
      {/* Base Text */}
      <span className="relative z-10">{children || text}</span>

      {/* Red/Pink split layer (::before equivalent) */}
      {isGlitching && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none text-[#ff2d75] font-inherit z-20 ${blendModeClass}`}
          style={{
            transform: `translate3d(-${offsetX}px, ${(glitchFrame % 2 === 0 ? 1 : -1)}px, 0) skewX(${(glitchFrame % 2 === 0 ? -2 : 2)}deg)`,
            clipPath: `inset(${slice1Top}% 0 ${slice1Bottom}% 0)`,
          }}
        >
          {text}
        </span>
      )}

      {/* Cyan split layer (::after equivalent) */}
      {isGlitching && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none text-[#00c2ff] font-inherit z-20 ${blendModeClass}`}
          style={{
            transform: `translate3d(${offsetX}px, ${(glitchFrame % 2 === 0 ? -1 : 1)}px, 0) skewX(${(glitchFrame % 2 === 0 ? 2 : -2)}deg)`,
            clipPath: `inset(${slice2Top}% 0 ${slice2Bottom}% 0)`,
          }}
        >
          {text}
        </span>
      )}
    </Component>
  );
};
