import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dark' | 'white' | 'lime' | 'accent';
  shadowColor?: 'lime' | 'white' | 'pink' | 'blue' | 'black';
  hoverEffect?: boolean;
  borderWidth?: '3' | '4';
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'dark',
  shadowColor = 'lime',
  hoverEffect = true,
  borderWidth = '3',
  className = '',
  children,
  ...props
}) => {
  const bgClasses = {
    dark: 'bg-[#141414] text-white border-white/90',
    white: 'bg-white text-black border-black',
    lime: 'bg-[#ccff00] text-black border-black',
    accent: 'bg-[#181818] text-white border-[#ccff00]',
  }[variant];

  const shadowClasses = {
    lime: 'shadow-[5px_5px_0px_#ccff00]',
    white: 'shadow-[5px_5px_0px_#ffffff]',
    pink: 'shadow-[5px_5px_0px_#ff4d8d]',
    blue: 'shadow-[5px_5px_0px_#4d7cff]',
    black: 'shadow-[5px_5px_0px_#000000]',
  }[shadowColor];

  const hoverClasses = hoverEffect
    ? {
        lime: 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#ccff00]',
        white: 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#ffffff]',
        pink: 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#ff4d8d]',
        blue: 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#4d7cff]',
        black: 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000]',
      }[shadowColor]
    : '';

  const borderClass = borderWidth === '4' ? 'border-4' : 'border-3';

  return (
    <div
      className={`rounded-sm transition-all duration-200 ${bgClasses} ${borderClass} ${shadowClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
