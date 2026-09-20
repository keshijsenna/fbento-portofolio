import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Layers, Compass, Download, Code, Send, Terminal } from 'lucide-react';
import { SPRINGS, Z_INDEX } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GlitchType } from '../animations/GlitchType';

interface NavItem {
  id: string;
  label: string;
  jpLabel: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'HOME // 00', jpLabel: '起点', icon: Home },
  { id: 'skills', label: 'SKILLS // 01', jpLabel: '技術', icon: Layers },
  { id: 'gallery', label: 'GALLERY // 02', jpLabel: '作品', icon: Compass },
  { id: 'resume', label: 'CV / SPECS // 03', jpLabel: '履歴', icon: Download },
  { id: 'contact', label: 'CONTACT // 04', jpLabel: '通信', icon: Send },
];

export const SideRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1,
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Use Lenis if available
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -30 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      style={{ zIndex: Z_INDEX.sideRail }}
      className="fixed left-0 top-0 bottom-0 w-[44px] md:w-[72px] h-[100dvh] bg-[#0a0a0a] border-r-3 border-[#0a0a0a] flex flex-col items-center justify-between py-3 md:py-5 select-none"
      aria-label="Sidebar navigation"
    >
      {/* Top: Logo Tile (white square, 2px border, logo icon inside) */}
      <button
        onClick={() => scrollToSection('hero')}
        className="w-8 h-8 md:w-11 md:h-11 bg-white border-2 border-white flex items-center justify-center shadow-[2px_2px_0px_#ccff00] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        aria-label="Scroll to top / home"
      >
        <Terminal className="w-5 h-5 md:w-6 md:h-6 text-[#0a0a0a] stroke-[2.5]" />
      </button>

      {/* Middle: Vertical Icon Navigation */}
      <nav className="flex flex-col items-center gap-2 md:gap-3 my-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative flex items-center">
              <button
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors cursor-pointer select-none rounded-none focus-visible:outline-3 focus-visible:outline-[#ccff00] ${
                  isActive ? 'text-[#0a0a0a]' : 'text-zinc-400 hover:text-white'
                }`}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {/* Active Item Glide Indicator: Lime square with 2px ink border */}
                {isActive && (
                  <motion.div
                    layoutId="activeRailSquare"
                    className="absolute inset-1 bg-[#ccff00] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#ffffff]"
                    transition={reducedMotion ? { duration: 0.1 } : SPRINGS.snappy}
                  />
                )}

                <span className="relative z-10">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 stroke-[2.2]" />
                </span>
              </button>

              {/* Hover tooltip chip sliding out to the right with typed text (desktop fine pointer only) */}
              <AnimatePresence>
                {isHovered && !reducedMotion && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -6, scale: 0.95 }}
                    transition={SPRINGS.snappy}
                    className="hidden md:flex absolute left-full ml-3 px-3 py-1.5 bg-[#0a0a0a] text-white border-2 border-[#ccff00] shadow-[3px_3px_0px_#ccff00] whitespace-nowrap z-50 items-center gap-2 pointer-events-none"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ccff00]" />
                    <GlitchType text={item.label} showCaret={false} cadenceMinMs={15} cadenceMaxMs={25} />
                    <span className="text-[#ccff00] font-mono text-[10px]">// {item.jpLabel}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom status badge / year */}
      <div className="text-center">
        <span className="font-mono text-[9px] md:text-[10px] text-zinc-500 font-bold block transform -rotate-90 md:rotate-0 tracking-widest">
          2026
        </span>
      </div>
    </aside>
  );
};
