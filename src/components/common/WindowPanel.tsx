import React from 'react';

interface WindowPanelProps {
  title: string | React.ReactNode;
  statusBadge?: string;
  children: React.ReactNode;
  className?: string;
  shadowColor?: 'ink' | 'lime';
}

export const WindowPanel: React.FC<WindowPanelProps> = ({
  title,
  statusBadge = 'LIVE',
  children,
  className = '',
  shadowColor = 'ink',
}) => {
  const shadowClass = shadowColor === 'lime' ? 'shadow-[6px_6px_0px_#ccff00]' : 'shadow-[6px_6px_0px_#0a0a0a]';

  return (
    <div className={`bg-white border-3 border-[#0a0a0a] ${shadowClass} overflow-hidden ${className}`}>
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0a0a0a] border-b-3 border-[#0a0a0a] select-none">
        {/* Three Circle Dots on left */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff2d75] border border-black inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] border border-black inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#00c2ff] border border-black inline-block" />
        </div>

        {/* Centered Mono Title */}
        <div className="px-2 truncate font-mono text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider text-center flex-1">
          {title}
        </div>

        {/* Status Badge on right */}
        {statusBadge && (
          <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 bg-[#ccff00] text-[#0a0a0a] border border-black font-mono text-[10px] font-black uppercase">
            <span className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full inline-block animate-pulse" />
            <span>{statusBadge}</span>
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="relative bg-[#faf9f5] bg-card-dots">
        {children}
      </div>
    </div>
  );
};
