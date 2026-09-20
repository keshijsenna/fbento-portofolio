import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxAngle = 6,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const calculatedRotateX = -((y - centerY) / centerY) * maxAngle;
    const calculatedRotateY = ((x - centerX) / centerX) * maxAngle;

    rotateX.set(calculatedRotateX);
    rotateY.set(calculatedRotateY);
  };

  const handleMouseEnter = () => {
    if (!reducedMotion && !isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  if (reducedMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformPerspective: 800,
        rotateX,
        rotateY,
      }}
      className={`transition-colors duration-150 ${
        isHovered ? 'ring-2 ring-[#ccff00]' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
