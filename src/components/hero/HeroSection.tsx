import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { PROFILE_DATA } from '../../data/profile';
import { ScanTitle } from '../common/ScanTitle';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { WindowPanel } from '../common/WindowPanel';
import { OrbitVisual } from '../animations/OrbitVisual';
import { ScrambleText } from '../animations/ScrambleText';
import { LangCycler } from '../animations/LangCycler';
import { GlitchBurst } from '../animations/GlitchBurst';
import { EASINGS, SPRINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { VOCABULARY } from '../../data/languages';
import { Download, Terminal, Send } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const reducedMotion = useReducedMotion();

  // Animated stat counters from 0 to target
  const [counts, setCounts] = useState<number[]>(PROFILE_DATA.stats.map(() => 0));

  useEffect(() => {
    if (reducedMotion || !isInView) {
      setCounts(PROFILE_DATA.stats.map((s) => s.value));
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    const updateCounters = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Eased curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(
        PROFILE_DATA.stats.map((stat) => Math.floor(stat.value * eased))
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        setCounts(PROFILE_DATA.stats.map((s) => s.value));
      }
    };

    const rafId = requestAnimationFrame(updateCounters);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, reducedMotion]);

  return (
    <section id="hero" ref={containerRef} className="relative pt-6 sm:pt-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Ghost Numeral '00' and Scan Title */}
      <ScanTitle
        ghostNumber="00"
        eyebrowTag="SYSTEM OPERATIONAL // JAKARTA NODE"
        line1={PROFILE_DATA.name}
        line2={{
          en: PROFILE_DATA.role,
          jp: 'フルスタック & モバイル開発者',
          zh: '全栈与移动端架构工程师',
        }}
        subtitle={PROFILE_DATA.shortBio}
      />

      {/* Main Hero Bento Card (Bio Card with Avatar & Copy) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10">
        {/* Left Col: Avatar + Badges + Quick Actions (5 cols) */}
        <div className="lg:col-span-5 bg-white border-3 border-[#0a0a0a] shadow-[6px_6px_0px_#0a0a0a] p-5 sm:p-6 flex flex-col justify-between relative bg-card-dots">
          {/* Four-point corner markers */}
          <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-black" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-black" />
          <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-black" />
          <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-black" />

          <div>
            {/* Header info */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <span className="font-mono text-xs font-black uppercase text-[#0a0a0a]">
                OPERATOR PROFILE // ID-77
              </span>
              <span className="px-2 py-0.5 bg-[#ccff00] text-black border border-black font-mono text-[10px] font-black uppercase">
                ACTIVE
              </span>
            </div>

            {/* Avatar Tile: Offset hard shadow, 3px border, 4-point corner markers */}
            <div className="relative w-full h-56 sm:h-64 bg-[#0a0a0a] border-3 border-black shadow-[4px_4px_0px_#ccff00] overflow-hidden mb-5 flex items-center justify-center crt-scanlines">
              <div className="absolute inset-0 bg-halftone-dots opacity-30 pointer-events-none" />

              {/* Developer schematic avatar representation */}
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-white border-3 border-black shadow-[3px_3px_0px_#ff2d75] flex items-center justify-center mb-3">
                  <Terminal className="w-10 h-10 text-black stroke-[2.5]" />
                </div>
                <div className="font-display text-2xl font-black text-white tracking-widest uppercase">
                  PASYA ZAHRI
                </div>
                <div className="font-mono text-xs text-[#ccff00] font-bold tracking-widest mt-1">
                  LATENCY: &lt;8MS // 60 FPS
                </div>
              </div>

              {/* Bottom bar inside avatar */}
              <div className="absolute bottom-0 inset-x-0 bg-[#ccff00] text-black px-3 py-1 font-mono text-[10px] font-black flex justify-between">
                <span>COORD: -6.2088, 106.8456</span>
                <span>UTC+7</span>
              </div>
            </div>

            {/* Status Badges: Rotated between -2deg and 2deg */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PROFILE_DATA.statusBadges.map((badge, idx) => (
                <Badge key={idx} variant={badge.variant} rotate={badge.rotate}>
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t-2 border-black">
            <Button
              variant="lime"
              size="md"
              asAnchor
              href="#resume"
              icon={<Download className="w-4 h-4 stroke-[2.5]" />}
              iconPosition="left"
            >
              GET RESUME
            </Button>
            <Button
              variant="white"
              size="md"
              asAnchor
              href="#contact"
              icon={<Send className="w-4 h-4 stroke-[2.5]" />}
              iconPosition="left"
            >
              TRANSMIT
            </Button>
          </div>
        </div>

        {/* Right Col: Detailed Bio Copy (Wave Mode Decode) + Metric Stat Cards (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Detailed Copy Card */}
          <div className="bg-white border-3 border-[#0a0a0a] shadow-[6px_6px_0px_#0a0a0a] p-6 sm:p-8 bg-card-dots flex-1">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <span className="font-mono text-xs font-black uppercase text-[#0a0a0a]">
                ARCHITECTURAL PHILOSOPHY
              </span>
              <span className="font-mono text-[11px] text-[#4d7c0f] font-bold">
                // SYSTEM CORE
              </span>
            </div>

            {/* Paragraphs with wave mode decode on entry */}
            <div className="space-y-4 font-body text-sm sm:text-base text-zinc-800 leading-relaxed">
              {PROFILE_DATA.detailedBio.map((paragraph, pIdx) => (
                <p key={pIdx}>
                  <ScrambleText
                    text={paragraph}
                    mode="mixed"
                    isWaveMode={true}
                    duration={1200}
                    trigger={isInView}
                  />
                </p>
              ))}
            </div>

            {/* Sub-tagline language cycler */}
            <div className="mt-6 pt-4 border-t-2 border-black/10 flex items-center gap-2 font-mono text-xs font-bold text-zinc-600">
              <span className="w-2 h-2 bg-[#ccff00] border border-black inline-block" />
              <LangCycler translations={VOCABULARY.about} />
            </div>
          </div>

          {/* Metric Stat Counters (4-card grid rolling up from 0 to target) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {PROFILE_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#faf9f5] border-2 sm:border-3 border-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] p-3 sm:p-4 text-center"
              >
                <div className="font-display font-black text-3xl sm:text-4xl text-[#0a0a0a] tracking-tight">
                  {counts[idx]}
                  <span className="text-[#4d7c0f] font-mono text-xl sm:text-2xl">{stat.suffix}</span>
                </div>
                <div className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider text-black mt-1">
                  {stat.label}
                </div>
                <div className="font-mono text-[9px] text-zinc-500 uppercase mt-0.5 truncate">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Window Panel with Orbit Visual (360 deg spatial audio head tracking visual) */}
      <WindowPanel
        title={
          <div className="flex items-center justify-center gap-2">
            <span>360°</span>
            <LangCycler translations={VOCABULARY.immersive} />
          </div>
        }
        statusBadge="LIVE ENGINE"
        shadowColor="lime"
      >
        <OrbitVisual />
      </WindowPanel>
    </section>
  );
};
