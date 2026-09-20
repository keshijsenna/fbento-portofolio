import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view'>('default');
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check screen size and touch device
    const checkIsMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isProjectCard = target.closest('[data-cursor="view"]');
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');

      if (isProjectCard) {
        setCursorType('view');
      } else if (isInteractive) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (reducedMotion || isMobile || !isVisible) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
      }}
      className="fixed top-0 left-0 z-9999 -translate-x-1/2 -translate-y-1/2 select-none"
    >
      {cursorType === 'default' && (
        <motion.div
          layoutId="cursor"
          className="w-4 h-4 bg-[#ccff00] border-2 border-black shadow-[2px_2px_0px_#ffffff]"
        />
      )}

      {cursorType === 'hover' && (
        <motion.div
          layoutId="cursor"
          className="w-9 h-9 bg-[#ccff00] mix-blend-difference border-2 border-white rounded-none flex items-center justify-center -translate-x-2.5 -translate-y-2.5"
        />
      )}

      {cursorType === 'view' && (
        <motion.div
          layoutId="cursor"
          className="px-2.5 py-1 bg-[#ccff00] text-black font-mono text-[10px] font-black tracking-widest border-2 border-black shadow-[3px_3px_0px_#ffffff] -translate-x-4 -translate-y-4 uppercase"
        >
          VIEW
        </motion.div>
      )}
    </motion.div>
  );
};
