import React, { useState, useEffect, useRef } from 'react';
import { getRandomGlyph, ScrambleMode } from '../../lib/scrambleEngine';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GlitchTypeProps {
  text: string;
  delayMs?: number;
  cadenceMinMs?: number;
  cadenceMaxMs?: number;
  mode?: ScrambleMode;
  className?: string;
  showCaret?: boolean;
  onComplete?: () => void;
  trigger?: boolean;
}

export const GlitchType: React.FC<GlitchTypeProps> = ({
  text,
  delayMs = 0,
  cadenceMinMs = 25,
  cadenceMaxMs = 45,
  mode = 'mixed',
  className = '',
  showCaret = true,
  onComplete,
  trigger = true,
}) => {
  const reducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState<string>(() => (reducedMotion ? text : ''));
  const [isTyping, setIsTyping] = useState(false);
  const [caretVisible, setCaretVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || !trigger) {
      setDisplayedText(text);
      setIsTyping(false);
      setCaretVisible(false);
      return;
    }

    let currentIndex = 0;
    let scrambleTicks = 0;
    const targetChars = Array.from(text);
    const totalChars = targetChars.length;

    setIsTyping(true);
    setCaretVisible(showCaret);

    const scheduleNext = () => {
      if (currentIndex >= totalChars) {
        setDisplayedText(text);
        setIsTyping(false);
        // Keep caret briefly then fade out
        setTimeout(() => setCaretVisible(false), 300);
        onComplete?.();
        return;
      }

      // Random jitter cadence 25-45ms
      const jitter = Math.random() * (cadenceMaxMs - cadenceMinMs) + cadenceMinMs;

      timeoutRef.current = window.setTimeout(() => {
        // Show scrambled glyph for 2 refreshes before locking character
        if (scrambleTicks < 2) {
          scrambleTicks++;
          const lockedSlice = text.slice(0, currentIndex);
          const nextChar = targetChars[currentIndex];
          const glitched = nextChar === ' ' ? ' ' : getRandomGlyph(mode);
          setDisplayedText(lockedSlice + glitched);
          scheduleNext();
        } else {
          scrambleTicks = 0;
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));
          scheduleNext();
        }
      }, jitter);
    };

    // Initial delay
    const initialTimer = window.setTimeout(() => {
      scheduleNext();
    }, delayMs);

    return () => {
      clearTimeout(initialTimer);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delayMs, cadenceMinMs, cadenceMaxMs, mode, showCaret, reducedMotion, trigger, onComplete]);

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline font-mono tracking-wider ${className}`}>
      {displayedText}
      {caretVisible && (
        <span className="inline-block w-[0.55em] h-[0.9em] bg-[#ccff00] ml-0.5 align-middle border border-black animate-blink select-none" />
      )}
    </span>
  );
};
