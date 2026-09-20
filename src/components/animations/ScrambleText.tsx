import React, { useState, useEffect, useRef } from 'react';
import { scrambleEngine, ScrambleMode } from '../../lib/scrambleEngine';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrambleTextProps {
  text: string;
  mode?: ScrambleMode;
  duration?: number;
  trigger?: boolean;
  isWaveMode?: boolean;
  className?: string;
  as?: React.ElementType;
  onComplete?: () => void;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  mode = 'mixed',
  duration,
  trigger = true,
  isWaveMode,
  className = '',
  as: Component = 'span',
  onComplete,
}) => {
  const reducedMotion = useReducedMotion();
  const [renderedChars, setRenderedChars] = useState<string[]>(() => Array.from(text));
  const [isDone, setIsDone] = useState(false);
  const taskIdRef = useRef<string>(`scramble-${Math.random().toString(36).slice(2, 9)}`);

  // Auto-detect wave mode if text is long (>120 chars) and not explicitly set
  const wave = isWaveMode !== undefined ? isWaveMode : text.length > 120;
  const calculatedDuration = duration || (wave ? Math.min(1800, text.length * 12) : Math.min(1200, Math.max(350, text.length * 28)));

  useEffect(() => {
    if (reducedMotion || !trigger) {
      setRenderedChars(Array.from(text));
      setIsDone(true);
      return;
    }

    setIsDone(false);
    const cancel = scrambleEngine.register({
      id: taskIdRef.current,
      targetText: text,
      mode,
      durationMs: calculatedDuration,
      isWaveMode: wave,
      onUpdate: (chars, complete) => {
        setRenderedChars(chars);
        if (complete) {
          setIsDone(true);
        }
      },
      onComplete,
    });

    return () => {
      cancel();
    };
  }, [text, trigger, mode, calculatedDuration, wave, reducedMotion, onComplete]);

  // Under reduced motion or when finished, render pure text
  if (reducedMotion || isDone) {
    return (
      <Component className={className}>
        {text}
      </Component>
    );
  }

  // Zero-layout-shift character slots:
  // An invisible real character reserves width/height in normal flow,
  // and an absolute positioned span overlays the scrambled glyph.
  const targetChars = Array.from(text);

  return (
    <Component className={`relative inline ${className}`} aria-label={text}>
      {targetChars.map((targetChar, idx) => {
        const displayChar = renderedChars[idx] !== undefined ? renderedChars[idx] : targetChar;

        if (targetChar === ' ') {
          return <span key={idx}> </span>;
        }

        return (
          <span key={idx} className="relative inline-block overflow-visible" aria-hidden="true">
            {/* Invisible anchor preserving layout space */}
            <span className="opacity-0 select-none pointer-events-none">
              {targetChar}
            </span>
            {/* Scrambled overlay glyph */}
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              {displayChar}
            </span>
          </span>
        );
      })}
    </Component>
  );
};
