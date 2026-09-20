import React from 'react';
import { motion } from 'motion/react';
import { EASINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 0.08,
  initialDelay = 0,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 24 }) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASINGS.easeOutExpo,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
