import React from 'react';

export interface SectionTitleProps {
  tag: string; // e.g. "// 03 - SKILLS"
  title: string; // e.g. "TECH STACK"
  subtitle?: string;
  alignment?: 'left' | 'center';
  accentColor?: 'lime' | 'pink' | 'blue';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  tag,
  title,
  subtitle,
  alignment = 'left',
  accentColor = 'lime',
}) => {
  const accentBorder = {
    lime: 'bg-[#ccff00]',
    pink: 'bg-[#ff4d8d]',
    blue: 'bg-[#4d7cff]',
  }[accentColor];

  const alignmentClasses = alignment === 'center' 
    ? 'items-center text-center mx-auto' 
    : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-2 mb-10 md:mb-14 ${alignmentClasses} max-w-4xl`}>
      <div className="inline-flex items-center gap-2">
        <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-[#ccff00] bg-black/60 px-2.5 py-1 border border-[#ccff00]/40 uppercase">
          {tag}
        </span>
      </div>

      <div className="relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-none">
          {title}
        </h2>
        <div className={`h-1.5 w-16 md:w-24 mt-3 ${accentBorder} shadow-[2px_2px_0px_#ffffff] ${alignment === 'center' ? 'mx-auto' : ''}`} />
      </div>

      {subtitle && (
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl font-body mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
