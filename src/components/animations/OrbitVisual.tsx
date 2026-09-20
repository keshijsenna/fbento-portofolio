import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface OrbitItem {
  name: string;
  shortLabel: string;
  color: string;
}

const TECH_ORBIT_ITEMS: OrbitItem[] = [
  { name: 'React 19', shortLabel: 'REACT', color: '#00c2ff' },
  { name: 'TypeScript', shortLabel: 'TS', color: '#4c2bd9' },
  { name: 'Next.js', shortLabel: 'NEXT', color: '#0a0a0a' },
  { name: 'Node.js', shortLabel: 'NODE', color: '#4d7c0f' },
  { name: 'Flutter', shortLabel: 'FLUTTER', color: '#00c2ff' },
  { name: 'Docker', shortLabel: 'DOCKER', color: '#ff2d75' },
];

export const OrbitVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  // Pause when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Time-based orbit animation (sin/cos on ellipse)
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let rafId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setAngle((prev) => (prev + delta * 0.45) % (Math.PI * 2));
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion, isVisible]);

  // Ellipse radii
  const radiusX = 140;
  const radiusY = 55;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Halftone & grid texture background */}
      <div className="absolute inset-0 bg-halftone-dots opacity-40 pointer-events-none" />

      {/* Concentric pulsing dotted circles */}
      <div
        className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border-2 border-dashed border-zinc-400/50 pointer-events-none animate-spin"
        style={{ animationDuration: '60s' }}
      />
      <div
        className="absolute w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-full border border-zinc-400/40 pointer-events-none"
      />

      {/* Dashed elliptical orbit path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 320"
        preserveAspectRatio="xMidYMid meet"
      >
        <ellipse
          cx="200"
          cy="160"
          rx={radiusX}
          ry={radiusY}
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.35"
        />
      </svg>

      {/* Center SVG: Head with Headphones (L & R tags) */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white border-3 border-[#0a0a0a] shadow-[4px_4px_0px_#ccff00] flex items-center justify-center">
          {/* Headphones earcups */}
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-4 h-9 bg-[#0a0a0a] border-2 border-white flex items-center justify-center">
            <span className="font-mono text-[9px] font-black text-[#ccff00]">L</span>
          </div>
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-9 bg-[#0a0a0a] border-2 border-white flex items-center justify-center">
            <span className="font-mono text-[9px] font-black text-[#ccff00]">R</span>
          </div>

          {/* Minimalist Head Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
            className="w-10 h-10 text-[#0a0a0a]"
          >
            <path d="M12 2a8 8 0 0 0-8 8v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4a8 8 0 0 0-8-8z" />
            <path d="M9 13h1" />
            <path d="M14 13h1" />
            <path d="M10 17h4" />
          </svg>
        </div>
        <div className="mt-2 px-2 py-0.5 bg-[#0a0a0a] text-[#ccff00] font-mono text-[10px] font-bold tracking-widest border border-black">
          360° SPATIAL CORE
        </div>
      </div>

      {/* Orbiting Technology Nodes along ellipse with sin/cos depth & z-index */}
      {TECH_ORBIT_ITEMS.map((tech, idx) => {
        const itemAngle = angle + (idx * (Math.PI * 2)) / TECH_ORBIT_ITEMS.length;
        const x = Math.cos(itemAngle) * radiusX;
        const y = Math.sin(itemAngle) * radiusY;

        // Depth calculation: sin(itemAngle) > 0 is in front (+y), < 0 is behind (-y)
        const depth = (Math.sin(itemAngle) + 1) / 2; // 0 (back) to 1 (front)
        const scale = 0.75 + depth * 0.4;
        const opacity = 0.6 + depth * 0.4;
        const zIndex = depth > 0.5 ? 25 : 5;

        return (
          <div
            key={tech.name}
            className="absolute transition-transform duration-75 pointer-events-none"
            style={{
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
              opacity,
              zIndex,
            }}
          >
            <div className="px-2.5 py-1 bg-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] font-mono text-[10px] sm:text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap">
              <span
                className="w-2 h-2 rounded-none border border-black shrink-0"
                style={{ backgroundColor: tech.color }}
              />
              <span>{tech.shortLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
