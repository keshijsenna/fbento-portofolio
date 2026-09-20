import React, { useState, useEffect, useRef } from 'react';
import { TranslationEntry } from '../../data/languages';
import { scrambleEngine } from '../../lib/scrambleEngine';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LangCyclerProps {
  translations: TranslationEntry;
  className?: string;
  intervalMs?: number; // 5000 to 8000ms
  durationMs?: number; // 600 to 900ms
  as?: React.ElementType;
}

export const LangCycler: React.FC<LangCyclerProps> = ({
  translations,
  className = '',
  intervalMs = 6000,
  durationMs = 750,
  as: Component = 'span',
}) => {
  const reducedMotion = useReducedMotion();
  const availableLangs = Object.keys(translations) as Array<keyof TranslationEntry>;
  const [langIndex, setLangIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(translations.en);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const currentLang = availableLangs[langIndex];
  const targetText = translations[currentLang] || translations.en;
  const taskIdRef = useRef<string>(`lang-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    if (reducedMotion || availableLangs.length <= 1) {
      setDisplayedText(translations.en);
      return;
    }

    // Stagger initial cycle by 0-2000ms per element
    const initialStagger = Math.random() * 2000;
    let timerId: number;

    const scheduleNext = (delay: number) => {
      timerId = window.setTimeout(() => {
        if (!isHoveredRef.current) {
          setLangIndex((prev) => (prev + 1) % availableLangs.length);
        }
        scheduleNext(intervalMs + (Math.random() * 2000 - 1000));
      }, delay);
    };

    scheduleNext(intervalMs + initialStagger);

    return () => {
      clearTimeout(timerId);
    };
  }, [reducedMotion, availableLangs.length, intervalMs, translations.en]);

  // When langIndex changes, run scramble transition
  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(targetText);
      return;
    }

    const cancel = scrambleEngine.register({
      id: taskIdRef.current,
      targetText,
      mode: 'mixed',
      durationMs,
      onUpdate: (chars) => {
        setDisplayedText(chars.join(''));
      },
    });

    return () => {
      cancel();
    };
  }, [targetText, durationMs, reducedMotion]);

  return (
    <Component
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block font-inherit transition-opacity duration-150 ${className}`}
      aria-label={translations.en}
    >
      {displayedText}
    </Component>
  );
};
