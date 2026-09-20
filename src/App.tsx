import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Loader } from './components/Loader';
import { SideRail } from './components/layout/SideRail';
import { HudWidget } from './components/layout/HudWidget';
import { HeroSection } from './components/hero/HeroSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { HorizontalGallery } from './components/gallery/HorizontalGallery';
import { ResumeSection } from './components/resume/ResumeSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { Marquee } from './components/animations/Marquee';

// Declare global lenis handle for TypeScript
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function App() {
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('visited_audio_engine_portfolio');
    } catch {
      return false;
    }
  });

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Touch devices use native scrolling for natural momentum
    });

    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    try {
      sessionStorage.setItem('visited_audio_engine_portfolio', 'true');
    } catch {
      // Ignore sessionStorage restriction
    }
  };

  const marqueeItems1 = [
    'HIGH-CONCURRENCY DISTRIBUTED SYSTEMS',
    'REACT 19 ARCHITECTURE',
    'IMMERSIVE AUDIO WORKLETS',
    'NATIVE MOBILE RUNTIMES',
    'WCAG AA ACCESSIBILITY',
    'ZERO CUMULATIVE LAYOUT SHIFT',
  ];

  const marqueeItems2 = [
    'DSP SIGNAL PROCESSING',
    'DOCKER & KUBERNETES',
    'GOLANG & TYPESCRIPT',
    'TACTILE NEUBRUTALIST INTERFACES',
    'JAKARTA UTC+7',
    'OPEN FOR CONTRACT 2026',
  ];

  return (
    <div className="relative min-h-screen bg-[#faf9f5] bg-cream-grid text-[#0a0a0a] overflow-x-clip">
      {/* 1. Intro Loading Screen (first visit per session only) */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      {/* 2. Fixed Left Icon Rail (B1) */}
      <SideRail />

      {/* 3. Floating HUD Widget (B3) */}
      <HudWidget />

      {/* 4. Fluid Content Area (offset by left rail: 44px on mobile, 72px on desktop) */}
      <main className="pl-[44px] md:pl-[72px] min-h-screen flex flex-col justify-between">
        {/* Section 00: Hero (with bio card, wave decode, stats roll-up, 360 audio orbit visual) */}
        <HeroSection />

        {/* Marquee Strip 1 (Black Band) */}
        <Marquee items={marqueeItems1} direction="left" variant="black" speedSec={28} />

        {/* Section 01: Skills (6-Card Bento Grid) */}
        <SkillsSection />

        {/* Marquee Strip 2 (Violet Band #4c2bd9) */}
        <Marquee items={marqueeItems2} direction="right" variant="violet" speedSec={32} />

        {/* Section 02: Horizontal Photo Gallery (Pinned Scroll-Driven Track) */}
        <section id="gallery" className="relative">
          <HorizontalGallery />
        </section>

        {/* Section 03: Resume / Format Selector Specification */}
        <ResumeSection />

        {/* Section 04: Contact / Encrypted Transmission */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
