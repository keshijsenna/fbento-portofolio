import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, MousePointerClick, ExternalLink } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../../data/gallery';
import { SPRINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LangCycler } from '../animations/LangCycler';
import { ScrambleText } from '../animations/ScrambleText';

export const HorizontalGallery: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const reducedMotion = useReducedMotion();

  // Measure track width and viewport width using ResizeObserver
  const updateMeasurements = useCallback(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth);
    }
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);
    window.addEventListener('orientationchange', updateMeasurements);
    return () => {
      window.removeEventListener('resize', updateMeasurements);
      window.removeEventListener('orientationchange', updateMeasurements);
    };
  }, [updateMeasurements]);

  const maxScroll = Math.max(0, trackWidth - viewportWidth);

  // Framer Motion scroll-driven progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRINGS.gallery);
  const x = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);

  // Update current active index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        GALLERY_ITEMS.length - 1,
        Math.max(0, Math.round(v * (GALLERY_ITEMS.length - 1)))
      );
      setCurrentIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Keyboard navigation when targetRef is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToIndex(Math.min(GALLERY_ITEMS.length - 1, currentIndex + 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const progressFraction = index / (GALLERY_ITEMS.length - 1);
    const targetScrollY = containerTop + progressFraction * maxScroll;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScrollY, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Render SVG graphics dynamically for cards
  const renderSvgGraphic = (type: GalleryItem['svgGraphic']) => {
    switch (type) {
      case 'synthesizer':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full stroke-black fill-none">
            <path d="M10 60 Q 30 10, 50 60 T 90 60 T 130 60 T 170 60" strokeWidth="3" />
            <path d="M10 80 Q 40 40, 80 80 T 150 80" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="60" r="5" fill="#ccff00" strokeWidth="2" />
            <circle cx="130" cy="60" r="5" fill="#ff2d75" strokeWidth="2" />
          </svg>
        );
      case 'waveform':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full stroke-black fill-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={i}
                x1={20 + i * 11}
                y1={60 - Math.sin(i * 0.7) * 40}
                x2={20 + i * 11}
                y2={60 + Math.sin(i * 0.7) * 40}
                strokeWidth="4"
                strokeLinecap="square"
              />
            ))}
          </svg>
        );
      case 'radar':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full stroke-black fill-none">
            <circle cx="100" cy="60" r="45" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="100" cy="60" r="25" strokeWidth="2" />
            <line x1="100" y1="15" x2="100" y2="105" strokeWidth="2" />
            <line x1="55" y1="60" x2="145" y2="60" strokeWidth="2" />
            <circle cx="120" cy="45" r="4" fill="#ccff00" />
          </svg>
        );
      case 'spatial':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full stroke-black fill-none">
            <ellipse cx="100" cy="60" rx="70" ry="30" strokeWidth="3" />
            <ellipse cx="100" cy="60" rx="40" ry="15" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="60" r="12" fill="#0a0a0a" />
          </svg>
        );
      case 'network':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full stroke-black fill-none">
            <polyline points="20,90 60,30 110,80 150,20 180,70" strokeWidth="3" />
            <rect x="52" y="22" width="16" height="16" fill="#ccff00" strokeWidth="2" />
            <rect x="102" y="72" width="16" height="16" fill="#00c2ff" strokeWidth="2" />
            <rect x="142" y="12" width="16" height="16" fill="#ff2d75" strokeWidth="2" />
          </svg>
        );
      case 'matrix':
      default:
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full stroke-black fill-none">
            {Array.from({ length: 6 }).map((_, r) => (
              <React.Fragment key={r}>
                {Array.from({ length: 8 }).map((_, c) => (
                  <rect
                    key={c}
                    x={25 + c * 20}
                    y={15 + r * 16}
                    width="10"
                    height="8"
                    fill={(r + c) % 3 === 0 ? '#ccff00' : 'none'}
                    strokeWidth="1.5"
                  />
                ))}
              </React.Fragment>
            ))}
          </svg>
        );
    }
  };

  // Fallback: If reduced motion is true, render horizontal snap carousel
  if (reducedMotion) {
    return (
      <div className="py-12 overflow-x-auto snap-x snap-mandatory flex gap-6 px-4 pb-8">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="shrink-0 snap-center w-[320px] bg-white border-3 border-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-3">
                <span className="font-mono text-xs font-bold">{item.photoHeader}</span>
                <span className="w-2.5 h-2.5 bg-[#ccff00] border border-black" />
              </div>
              <div className="h-40 border-2 border-black bg-wave-lines mb-3 p-4 flex items-center justify-center">
                {renderSvgGraphic(item.svgGraphic)}
              </div>
              <h3 className="font-display font-black text-xl mb-2">{item.title}</h3>
              <p className="font-body text-xs text-zinc-700">{item.caption.en}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-300 font-mono text-[10px] font-bold text-[#4d7c0f]">
              {item.metrics}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const containerHeight = maxScroll > 0 ? maxScroll + window.innerHeight : '100svh';

  return (
    <div
      ref={targetRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ height: containerHeight }}
      className="relative outline-none"
      aria-label="Interactive horizontal project gallery"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8">
        {/* Gallery Top HUD bar: Counter & Scroll hint & Prev/Next buttons */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#0a0a0a] text-[#ccff00] font-mono text-xs font-black uppercase border border-black shadow-[2px_2px_0px_#0a0a0a]">
              GALLERY // TRACK
            </span>
            {/* Scrambling Counter: "01 / 06" */}
            <div className="font-mono text-sm sm:text-base font-black text-[#0a0a0a]">
              <ScrambleText
                text={`${(currentIndex + 1).toString().padStart(2, '0')} / ${GALLERY_ITEMS.length.toString().padStart(2, '0')}`}
                mode="latin"
                duration={300}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="p-2 bg-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] hover:bg-[#ccff00] disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none"
              aria-label="Previous gallery card"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => scrollToIndex(Math.min(GALLERY_ITEMS.length - 1, currentIndex + 1))}
              disabled={currentIndex === GALLERY_ITEMS.length - 1}
              className="p-2 bg-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] hover:bg-[#ccff00] disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none"
              aria-label="Next gallery card"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Pinned Horizontal Scrolling Track */}
        <div className="my-auto overflow-visible py-4">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-6 sm:gap-8 px-6 sm:px-12 w-max"
          >
            {GALLERY_ITEMS.map((item, idx) => {
              const isCenter = idx === currentIndex;

              return (
                <div
                  key={item.id}
                  className="w-[75vw] sm:w-[360px] md:w-[400px] shrink-0 transition-transform duration-300 flex flex-col"
                  style={{
                    transform: isCenter ? 'scale(1.03)' : 'scale(0.97)',
                  }}
                >
                  <div
                    className={`h-full bg-white border-3 border-[#0a0a0a] p-5 sm:p-6 flex flex-col justify-between transition-shadow duration-300 ${
                      isCenter
                        ? 'shadow-[8px_8px_0px_#ccff00]'
                        : 'shadow-[5px_5px_0px_#0a0a0a]'
                    }`}
                  >
                    <div>
                      {/* Card Header Bar "PHOTO / 01" with lime square */}
                      <div className="flex items-center justify-between border-b-2 border-[#0a0a0a] pb-3 mb-4 font-mono text-xs font-black uppercase text-[#0a0a0a]">
                        <span className="tracking-wider">{item.photoHeader}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-zinc-500">// ARCHIVE</span>
                          <span className="w-2.5 h-2.5 bg-[#ccff00] border border-black inline-block" />
                        </div>
                      </div>

                      {/* Graphic Frame with wave-line pattern */}
                      <div
                        className="h-44 sm:h-48 border-2 border-[#0a0a0a] bg-wave-lines p-4 mb-4 flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: item.backdropColor }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          {renderSvgGraphic(item.svgGraphic)}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-black text-xl sm:text-2xl text-[#0a0a0a] leading-tight mb-2 tracking-tight">
                        {item.title}
                      </h3>

                      {/* Language Cycling Caption */}
                      <div className="font-body text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4 min-h-[48px]">
                        <LangCycler translations={item.caption} />
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.techTags.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-[#faf9f5] text-[#0a0a0a] border border-black font-mono text-[10px] font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Metrics Row */}
                    <div className="pt-3 border-t-2 border-black flex items-center justify-between font-mono text-xs">
                      <span className="text-[#4d7c0f] font-black uppercase tracking-wider">
                        {item.metrics}
                      </span>
                      <a
                        href={item.githubUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-black hover:text-[#4c2bd9] cursor-pointer"
                        aria-label={`View code for ${item.title}`}
                      >
                        <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Progress Bar: scaleX */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 z-20">
          <div className="h-1.5 w-full bg-zinc-300 border border-[#0a0a0a] overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress, originX: 0 }}
              className="h-full bg-[#ccff00]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
