import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { EASINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => (defaultOpenId ? [defaultOpenId] : []));
  const reducedMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter((item) => item !== id);
      } else {
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`} role="region" aria-label="Accordion list">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`border-3 transition-colors ${
              isOpen
                ? 'bg-[#181818] border-[#ccff00] shadow-[5px_5px_0px_#ccff00]'
                : 'bg-[#141414] border-white shadow-[4px_4px_0px_#000000] hover:border-[#ccff00]'
            }`}
          >
            {/* Accordion Header / Button */}
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-btn-${item.id}`}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none group focus-visible:outline-3 focus-visible:outline-[#ccff00]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pr-4">
                <span className="font-display font-black text-base sm:text-lg text-white group-hover:text-[#ccff00] transition-colors">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="self-start sm:self-auto font-mono text-[10px] font-bold px-2 py-0.5 bg-black border border-zinc-700 text-[#ccff00]">
                    {item.badge}
                  </span>
                )}
                {item.subtitle && (
                  <span className="font-mono text-xs text-zinc-400">
                    {item.subtitle}
                  </span>
                )}
              </div>

              {/* Plus icon rotating 45 degrees into a cross (transform only) */}
              <div
                className="w-8 h-8 rounded-none bg-black border-2 border-white flex items-center justify-center text-white shrink-0 group-hover:border-[#ccff00] group-hover:text-[#ccff00] transition-transform duration-200"
                style={{
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </div>
            </button>

            {/* Accordion Content Panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.id}`}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: EASINGS.easeOutExpo,
                  }}
                  className="overflow-hidden border-t-2 border-white/10"
                >
                  <div className="p-4 sm:p-5 pt-3 text-zinc-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
