import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SPRINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // max offset in px
  radius?: number;   // active distance in px
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 14,
  radius = 80,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isMobile || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < radius) {
      const power = (radius - distance) / radius;
      setPosition({
        x: (deltaX / radius) * strength * power,
        y: (deltaY / radius) * strength * power,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (reducedMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={SPRINGS.gentle}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
