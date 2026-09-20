import { useEffect, useRef } from 'react';

export function useLockBodyScroll(isLocked: boolean) {
  const scrollOffsetRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !isLocked) return;

    // Pause Lenis smooth scrolling if active
    if (window.__lenis) {
      window.__lenis.stop();
    }

    // 1. Calculate scrollbar width to prevent layout jump
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    scrollOffsetRef.current = window.scrollY;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    // 2. Compensate scrollbar width
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // 3. Robust iOS-compatible body lock using position: fixed
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollOffsetRef.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      // 4. Restore original styles and exact scroll position
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      window.scrollTo(0, scrollOffsetRef.current);

      // Resume Lenis smooth scroll
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isLocked]);
}
