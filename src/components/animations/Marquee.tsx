import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  variant?: 'black' | 'violet';
  speedSec?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = 'left',
  variant = 'black',
  speedSec = 30,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Dynamic skewX based on scroll velocity (-5deg to 5deg)
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4]);

  const bgClass = variant === 'violet' ? 'bg-[#4c2bd9]' : 'bg-[#0a0a0a]';
  const borderClass = 'border-y-3 border-[#0a0a0a]';

  // Quadruple items to prevent gaps on ultra-wide screens
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${bgClass} ${borderClass} py-3 select-none ${className}`}
    >
      <motion.div
        style={{
          skewX: reducedMotion ? 0 : skewX,
          animationDuration: `${speedSec}s`,
        }}
        className={direction === 'left' ? 'animate-marquee-forward' : 'animate-marquee-reverse'}
      >
        <div className="flex items-center gap-6 shrink-0 pr-6">
          {repeatedItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="font-display font-black text-xl sm:text-2xl text-[#ccff00] tracking-wider uppercase whitespace-nowrap">
                {item}
              </span>
              {/* Four-point star divider */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-[#ccff00] shrink-0"
                aria-hidden="true"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
