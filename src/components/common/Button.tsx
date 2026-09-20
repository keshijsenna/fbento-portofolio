import React, { useState, useRef } from 'react';
import { scrambleEngine } from '../../lib/scrambleEngine';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type ButtonVariant = 'lime' | 'white' | 'dark' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  japaneseHover?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'lime',
  size = 'md',
  icon,
  iconPosition = 'left',
  asAnchor = false,
  href,
  target,
  rel,
  japaneseHover,
  className = '',
  ...rest
}) => {
  const reducedMotion = useReducedMotion();
  const rawText = typeof children === 'string' ? children : '';
  const [displayText, setDisplayText] = useState(rawText);
  const isHoveredRef = useRef(false);
  const taskIdRef = useRef<string>(`btn-${Math.random().toString(36).slice(2, 9)}`);

  const handleMouseEnter = () => {
    if (reducedMotion || !rawText) return;
    isHoveredRef.current = true;

    // 250ms scramble toward Japanese and back on hover
    const targetScramble = japaneseHover || '実行コマンド';
    scrambleEngine.register({
      id: taskIdRef.current,
      targetText: targetScramble,
      mode: 'jp',
      durationMs: 250,
      onUpdate: (chars) => {
        setDisplayText(chars.join(''));
      },
      onComplete: () => {
        if (!isHoveredRef.current) {
          setDisplayText(rawText);
        }
      },
    });
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (!reducedMotion && rawText) {
      setDisplayText(rawText);
    }
  };

  const variantClasses = {
    lime: 'bg-[#ccff00] text-[#0a0a0a] border-2 sm:border-3 border-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] hover:shadow-[6px_6px_0px_#0a0a0a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none',
    white: 'bg-white text-[#0a0a0a] border-2 sm:border-3 border-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] hover:shadow-[6px_6px_0px_#0a0a0a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none',
    dark: 'bg-[#0a0a0a] text-white border-2 sm:border-3 border-[#0a0a0a] shadow-[4px_4px_0px_#ccff00] hover:shadow-[6px_6px_0px_#ccff00] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none',
    outline: 'bg-transparent text-[#0a0a0a] border-2 sm:border-3 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] hover:bg-black hover:text-[#ccff00] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-mono font-bold min-h-[36px]',
    md: 'px-5 py-2.5 text-xs sm:text-sm font-mono font-black min-h-[44px]',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-mono font-black min-h-[48px]',
  };

  const commonProps = {
    className: `inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer select-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{rawText ? displayText : children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (asAnchor) {
    return (
      <a href={href} target={target} rel={rel} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button {...rest} {...commonProps}>
      {content}
    </button>
  );
};
