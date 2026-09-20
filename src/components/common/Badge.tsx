import React from 'react';

export type BadgeVariant = 'lime' | 'white' | 'black' | 'indigo';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  rotate?: string;
  size?: 'sm' | 'md';
  hasDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'lime',
  rotate = '0deg',
  size = 'md',
  hasDot = true,
  className = '',
}) => {
  const variantStyles = {
    lime: 'bg-[#ccff00] text-[#0a0a0a] border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]',
    white: 'bg-white text-[#0a0a0a] border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]',
    black: 'bg-[#0a0a0a] text-[#ccff00] border-[#0a0a0a] shadow-[2px_2px_0px_#ccff00]',
    indigo: 'bg-[#e0e7ff] text-[#0a0a0a] border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]',
  };

  const dotColors = {
    lime: 'bg-[#0a0a0a]',
    white: 'bg-[#4d7c0f]',
    black: 'bg-[#ccff00]',
    indigo: 'bg-[#4c2bd9]',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-[11px] sm:text-xs',
  };

  return (
    <span
      style={{ transform: `rotate(${rotate})` }}
      className={`inline-flex items-center gap-1.5 font-mono font-black uppercase tracking-wider border-2 transition-transform select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {hasDot && (
        <span
          className={`w-1.5 h-1.5 rounded-none border border-black/40 ${dotColors[variant]} shrink-0`}
        />
      )}
      <span>{children}</span>
    </span>
  );
};
