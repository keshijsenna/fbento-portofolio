import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMatches = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern and fallback listeners
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatches);
      return () => mediaQuery.removeEventListener('change', updateMatches);
    } else {
      mediaQuery.addListener(updateMatches);
      return () => mediaQuery.removeListener(updateMatches);
    }
  }, []);

  return matches;
}
