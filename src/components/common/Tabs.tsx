import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EASINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: readonly string[] | TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  layoutId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  layoutId = 'activeTabIndicator',
  className = '',
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      aria-label="Category filters"
      className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none ${className}`}
    >
      {tabs.map((tab) => {
        const id = typeof tab === 'string' ? tab : tab.id;
        const label = typeof tab === 'string' ? tab : tab.label;
        const count = typeof tab === 'object' ? tab.count : undefined;
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${id}`}
            id={`tab-btn-${id}`}
            onClick={() => onChange(id)}
            className={`relative min-h-[44px] px-4 py-2 border-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 focus-visible:outline-3 focus-visible:outline-[#ccff00] ${
              isActive
                ? 'text-black border-black shadow-[3px_3px_0px_#ffffff]'
                : 'text-zinc-300 border-zinc-700 bg-[#141414] hover:border-white hover:text-white'
            }`}
          >
            {/* Sliding Lime Active Background Indicator */}
            {isActive && (
              <motion.div
                layoutId={reducedMotion ? undefined : layoutId}
                className="absolute inset-0 bg-[#ccff00] -z-10"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              <span>{label}</span>
              {typeof count === 'number' && (
                <span
                  className={`px-1.5 py-0.2 text-[10px] border ${
                    isActive
                      ? 'bg-black text-[#ccff00] border-black'
                      : 'bg-black text-zinc-400 border-zinc-700'
                  }`}
                >
                  {count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const TabPanel: React.FC<{
  activeTab: string;
  tabId: string;
  children: React.ReactNode;
  minHeight?: string;
}> = ({ activeTab, tabId, children, minHeight = '320px' }) => {
  const reducedMotion = useReducedMotion();

  if (activeTab !== tabId) return null;

  return (
    <div style={{ minHeight }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={tabId}
          id={`tab-panel-${tabId}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${tabId}`}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
          transition={{
            duration: 0.25,
            ease: EASINGS.easeOutExpo,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
