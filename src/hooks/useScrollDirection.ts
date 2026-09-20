import { useState, useEffect, useRef } from 'react';

interface ScrollDirectionState {
  isScrollingDown: boolean;
  isAtTop: boolean;
  scrollY: number;
}

export function useScrollDirection(threshold: number = 10): ScrollDirectionState {
  const [scrollState, setScrollState] = useState<ScrollDirectionState>({
    isScrollingDown: false,
    isAtTop: true,
    scrollY: 0,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lastScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY <= 80;

      if (Math.abs(currentScrollY - lastScrollY.current) >= threshold || isAtTop) {
        const isScrollingDown = !isAtTop && currentScrollY > lastScrollY.current;
        setScrollState({
          isScrollingDown,
          isAtTop,
          scrollY: currentScrollY,
        });
        lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrollState;
}
