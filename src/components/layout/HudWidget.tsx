import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, ListMusic } from 'lucide-react';
import { Z_INDEX } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const HudWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(6);
  const totalSeconds = 139; // 02:19
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= totalSeconds ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (seconds / totalSeconds) * 100;

  return (
    <aside
      style={{ zIndex: Z_INDEX.hudWidget }}
      className="fixed top-3 right-3 sm:top-5 sm:right-5 max-w-[calc(100vw-60px)] sm:max-w-[360px] bg-[#0a0a0a] border-2 border-[#0a0a0a] shadow-[4px_4px_0px_#ccff00] p-2.5 sm:p-3 text-[#ccff00] select-none pr-safe pt-safe"
      aria-label="Audio engine telemetry widget"
    >
      {/* Top Header Row: Status & Ticking Timer & 5-bar Equalizer */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2 mb-2 font-mono text-[10px] sm:text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-none bg-[#ccff00] animate-pulse" />
          <span className="font-bold tracking-wider text-white">STATUS:</span>
          <span className="text-[#ccff00] font-black uppercase">READY</span>
        </div>

        {/* 5-bar equalizer (scaleY only, compositor-friendly) */}
        <div className="flex items-end gap-1 h-3" aria-hidden="true">
          {[0.4, 0.8, 0.5, 1.0, 0.6].map((baseScale, idx) => (
            <div
              key={idx}
              className="w-1 bg-[#ccff00] origin-bottom transition-transform"
              style={{
                height: '12px',
                transform: !isPlaying || reducedMotion
                  ? `scaleY(${baseScale * 0.4})`
                  : `scaleY(${((seconds + idx) % 4 + 1) * 0.25})`,
                transitionDuration: '250ms',
              }}
            />
          ))}
        </div>

        <div className="font-bold text-white tracking-widest">
          {formatTime(seconds)} <span className="text-zinc-500">/ 02:19</span>
        </div>
      </div>

      {/* Center Row: Scrolling / Marquee Track Name */}
      <div className="overflow-hidden whitespace-nowrap mb-2 font-mono text-[11px] sm:text-xs tracking-wider">
        <div className="inline-block animate-marquee-forward hover:pause">
          <span className="text-white font-bold mr-6">
            NOW BUILDING // HIGH-CONCURRENCY DISTRIBUTED ENGINE (v4.8)
          </span>
          <span className="text-[#ccff00] mr-6">// JAKARTA NODE [ACTIVE]</span>
          <span className="text-white font-bold mr-6">
            NOW BUILDING // HIGH-CONCURRENCY DISTRIBUTED ENGINE (v4.8)
          </span>
        </div>
      </div>

      {/* Control Icons Row */}
      <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSeconds(0)}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            aria-label="Restart audio track"
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSeconds((prev) => Math.max(0, prev - 10))}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            aria-label="Rewind 10 seconds"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 bg-[#ccff00] text-black border border-black hover:bg-white transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause telemetry stream' : 'Play telemetry stream'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button
            onClick={() => setSeconds((prev) => Math.min(totalSeconds, prev + 10))}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            aria-label="Fast forward 10 seconds"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest hidden xs:inline">
          DSP: BINAURAL
        </span>
      </div>

      {/* Thin lime progress bar along bottom edge */}
      <div className="absolute left-0 bottom-0 right-0 h-[3px] bg-zinc-900 overflow-hidden">
        <div
          className="h-full bg-[#ccff00] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </aside>
  );
};
