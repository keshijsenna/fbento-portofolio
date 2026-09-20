import React from 'react';
import { motion } from 'motion/react';
import { Layout, Server, Smartphone, Cloud, Activity, Palette } from 'lucide-react';
import { SKILL_CATEGORIES, SkillCategory } from '../../data/skills';
import { ScanTitle } from '../common/ScanTitle';
import { LangCycler } from '../animations/LangCycler';
import { GlitchBurst } from '../animations/GlitchBurst';
import { SPRINGS } from '../../lib/motion';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (iconName: SkillCategory['iconName']) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 stroke-[2.5]" />;
      case 'Server':
        return <Server className="w-5 h-5 stroke-[2.5]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 stroke-[2.5]" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 stroke-[2.5]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 stroke-[2.5]" />;
      case 'Palette':
      default:
        return <Palette className="w-5 h-5 stroke-[2.5]" />;
    }
  };

  return (
    <section id="skills" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Ghost Numeral '01' and Section Header */}
      <ScanTitle
        ghostNumber="01"
        eyebrowTag="ENGINEERING CAPABILITIES // MATRIX"
        line1="TECHNICAL SKILLS"
        line2={{
          en: 'BENTO ARCHITECTURE',
          jp: '技術スタック基盤',
          zh: '核心技术能力矩阵',
        }}
        subtitle="Deconstructed into resilient tiers: client-side interfaces, low-latency microservices, native mobile targets, and low-latency DSP audio engines."
      />

      {/* 6-Card Bento Grid: (wide, half, half, wide, half, half) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {SKILL_CATEGORIES.map((category) => {
          const colSpan = category.wide ? 'md:col-span-12' : 'md:col-span-6';

          return (
            <motion.div
              key={category.id}
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 3, y: 3 }}
              transition={SPRINGS.snappy}
              className={`${colSpan} group relative bg-white border-3 border-[#0a0a0a] shadow-[5px_5px_0px_#0a0a0a] hover:shadow-[7px_7px_0px_#ccff00] p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-200 cursor-default select-none bg-card-dots`}
            >
              {/* Top Header Row */}
              <div>
                <div className="flex items-start justify-between border-b-2 border-[#0a0a0a] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Number in Lime Square with 2px ink border */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#ccff00] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] flex items-center justify-center font-mono font-black text-sm sm:text-base text-black shrink-0">
                      {category.num}
                    </div>
                    <div>
                      {/* Mono uppercase title */}
                      <h3 className="font-mono text-base sm:text-lg font-black text-[#0a0a0a] tracking-wider uppercase leading-none">
                        <GlitchBurst text={category.title} theme="light">
                          {category.title}
                        </GlitchBurst>
                      </h3>
                      {/* Small green mono sub-label (language-cycles) */}
                      <div className="font-mono text-[10px] sm:text-xs text-[#4d7c0f] font-bold tracking-widest mt-1">
                        <LangCycler translations={category.sublabel} />
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="p-2 bg-[#faf9f5] border-2 border-black text-black group-hover:bg-[#ccff00] transition-colors shrink-0">
                    {getCategoryIcon(category.iconName)}
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              {/* Tech Chips Cloud */}
              <div className="pt-4 border-t border-zinc-200">
                <div className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  VERIFIED RUNTIMES:
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.chips.map((chip, cIdx) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#faf9f5] text-[#0a0a0a] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] font-mono text-[11px] font-black uppercase hover:bg-[#ccff00] hover:rotate-1 transition-all duration-150"
                    >
                      <span className="w-1.5 h-1.5 bg-[#4d7c0f] border border-black shrink-0" />
                      <span>{chip}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
