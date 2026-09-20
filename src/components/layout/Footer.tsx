import React from 'react';
import { ArrowUp, Terminal, Shield } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { LangCycler } from '../animations/LangCycler';
import { VOCABULARY } from '../../data/languages';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t-3 border-[#0a0a0a] bg-[#0a0a0a] text-white pt-16 pb-12 px-4 sm:px-6 select-none crt-scanlines">
      <div className="absolute inset-0 bg-halftone-dots opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Top Row: Giant Display Name + Back To Top */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b-2 border-zinc-800 pb-8">
          <div>
            <div className="font-mono text-xs text-[#ccff00] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ccff00] inline-block" />
              <span>END OF TELEMETRY STREAM // VER. 4.8.2</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter leading-none uppercase">
              {PROFILE_DATA.name}
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-3 bg-[#ccff00] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            aria-label="Return to top of page"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Middle Grid: Telemetry Stats & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs">
          <div>
            <div className="text-zinc-500 font-bold uppercase mb-2">// SPECIFICATIONS</div>
            <p className="text-zinc-400 leading-relaxed">
              Designed with Neubrutalist audio engine visual architecture. Built with React 19, TypeScript, Tailwind CSS, Framer Motion, and Lenis.
            </p>
          </div>

          <div>
            <div className="text-zinc-500 font-bold uppercase mb-2">// NODE LOCATION</div>
            <p className="text-white font-bold">
              Jakarta, Indonesia (UTC+7)
            </p>
            <div className="text-[#ccff00] mt-1">
              LATENCY: &lt;8MS TARGET
            </div>
          </div>

          <div>
            <div className="text-zinc-500 font-bold uppercase mb-2">// ACCESSIBILITY</div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Shield className="w-4 h-4 text-[#ccff00]" />
              <span>WCAG AA COMPLIANT // PREFERS-REDUCED-MOTION READY</span>
            </div>
          </div>

          <div>
            <div className="text-zinc-500 font-bold uppercase mb-2">// LOCALIZATION</div>
            <div className="text-[#ccff00] font-bold">
              <LangCycler translations={VOCABULARY.developer} />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terminal Indicator */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>(C) {new Date().getFullYear()} PASYA ZAHRI. ALL RIGHTS RESERVED. ZERO TRACKING.</span>
          </div>

          <div className="text-[#ccff00] font-bold">
            JAKARTA // TOKYO // SAN FRANCISCO
          </div>
        </div>
      </div>
    </footer>
  );
};
