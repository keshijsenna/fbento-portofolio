import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-black/40">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]"
      />
    </div>
  );
};
