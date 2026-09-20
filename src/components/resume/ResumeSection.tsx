import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, FileCode, Archive, Download, Check, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { CV_PACKAGES, CvPackage, TRUST_BADGES } from '../../data/packages';
import { ScanTitle } from '../common/ScanTitle';
import { Button } from '../common/Button';
import { ScrambleText } from '../animations/ScrambleText';
import { GlitchBurst } from '../animations/GlitchBurst';
import { EASINGS } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const ResumeSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<'pdf' | 'docx' | 'zip'>('pdf');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const reducedMotion = useReducedMotion();

  const activePackage = CV_PACKAGES.find((p) => p.id === selectedId) || CV_PACKAGES[0];

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Simulate programmatic file download anchor
    const dummyContent = `Pasya Zahri - Full-Stack Developer CV (${activePackage.name})\nVersion: ${activePackage.version}\nChecksum: ${activePackage.checksum}`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pasya_Zahri_CV_${activePackage.id.toUpperCase()}.${activePackage.id === 'zip' ? 'zip' : activePackage.id}`;
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2500);
  };

  const getFormatIcon = (id: CvPackage['id']) => {
    switch (id) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'docx':
        return <FileCode className="w-5 h-5" />;
      case 'zip':
      default:
        return <Archive className="w-5 h-5" />;
    }
  };

  return (
    <section id="resume" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Ghost Numeral '03' & Scan Title */}
      <ScanTitle
        ghostNumber="03"
        eyebrowTag="VERIFIED ASSETS // SPECIFICATIONS"
        line1="DOWNLOAD MY CV"
        line2={{
          en: 'CAREER SPECIFICATION',
          jp: '技術仕様 // 職歴',
          zh: '技术规格 // 履历',
        }}
        subtitle="Retrieve production-ready documentation, verified architectural credentials, and engineering background specifications."
      />

      {/* Main Container Card with Dotted Grid */}
      <div className="bg-white border-3 border-[#0a0a0a] shadow-[6px_6px_0px_#0a0a0a] p-6 sm:p-8 bg-card-dots">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Format Selection List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <span className="font-mono text-xs font-black uppercase text-[#0a0a0a] tracking-wider">
                SELECT FORMAT ARCHIVE
              </span>
              <span className="font-mono text-[11px] text-zinc-500 font-bold">
                [CLICK TO TOGGLE]
              </span>
            </div>

            <div className="space-y-3" role="radiogroup" aria-label="Resume file format">
              {CV_PACKAGES.map((pkg) => {
                const isSelected = selectedId === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedId(pkg.id)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setSelectedId(pkg.id);
                      }
                    }}
                    className={`relative overflow-hidden p-4 sm:p-5 border-2 border-[#0a0a0a] cursor-pointer transition-all duration-150 select-none ${
                      isSelected
                        ? 'shadow-[4px_4px_0px_#ccff00] text-white'
                        : 'bg-white hover:bg-[#faf9f5] shadow-[3px_3px_0px_#0a0a0a] text-[#0a0a0a]'
                    }`}
                  >
                    {/* Animated scaleX pseudo-element wipe for selection */}
                    <motion.div
                      initial={false}
                      animate={{ scaleX: isSelected ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: EASINGS.easeOutExpo }}
                      style={{ originX: 0 }}
                      className="absolute inset-0 bg-[#0a0a0a] z-0 pointer-events-none"
                    />

                    {/* Content Row */}
                    <div className="relative z-10 flex items-start gap-4">
                      {/* Checkbox indicator */}
                      <div
                        className={`w-5 h-5 mt-0.5 border-2 border-[#0a0a0a] flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#ccff00]' : 'bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                      </div>

                      {/* Icon */}
                      <div
                        className={`p-2 border border-black shrink-0 ${
                          isSelected ? 'bg-zinc-800 text-[#ccff00]' : 'bg-[#faf9f5] text-black'
                        }`}
                      >
                        {getFormatIcon(pkg.id)}
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                          <h4 className="font-mono text-sm sm:text-base font-black tracking-wider uppercase truncate">
                            {pkg.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 font-mono text-[10px] font-black border border-black shrink-0 ${
                              isSelected ? 'bg-[#ccff00] text-black' : 'bg-black text-white'
                            }`}
                          >
                            {pkg.sizeChip}
                          </span>
                        </div>
                        <p
                          className={`font-body text-xs sm:text-sm leading-relaxed ${
                            isSelected ? 'text-zinc-300' : 'text-zinc-600'
                          }`}
                        >
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: "CHOSEN PACKAGE" Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#faf9f5] border-2 border-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                <span className="font-mono text-xs font-black uppercase text-[#0a0a0a]">
                  CHOSEN PACKAGE
                </span>
                <span className="px-2 py-0.5 bg-[#ccff00] text-black border border-black font-mono text-[10px] font-black">
                  {activePackage.version}
                </span>
              </div>

              {/* Key/Value Specifications that crossfade and scramble */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePackage.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 font-mono text-xs mb-6"
                >
                  <div className="flex justify-between border-b border-zinc-300 pb-1.5">
                    <span className="text-zinc-500">FORMAT:</span>
                    <span className="font-bold text-black">{activePackage.extension}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-300 pb-1.5">
                    <span className="text-zinc-500">OPTIMIZED FOR:</span>
                    <span className="font-bold text-black text-right">
                      {activePackage.formatDetails.target}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-300 pb-1.5">
                    <span className="text-zinc-500">CONTENTS:</span>
                    <span className="font-bold text-black text-right">
                      {activePackage.formatDetails.pagesOrFiles}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-300 pb-1.5">
                    <span className="text-zinc-500">UPDATED:</span>
                    <span className="font-bold text-[#4d7c0f]">{activePackage.updatedDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-300 pb-1.5">
                    <span className="text-zinc-500">CHECKSUM:</span>
                    <span className="font-bold text-black text-right font-mono">
                      <ScrambleText text={activePackage.checksum} mode="latin" duration={400} />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Huge Lime Download Button with Hard Shadow */}
            <div className="space-y-3 pt-2">
              <Button
                variant="lime"
                size="lg"
                onClick={handleDownload}
                icon={<Download className="w-5 h-5 stroke-[2.5]" />}
                iconPosition="left"
                className="w-full text-center"
              >
                {downloadSuccess ? 'DOCUMENT DISPATCHED!' : `DOWNLOAD ${activePackage.extension}`}
              </Button>

              <div className="flex justify-between items-center px-1 font-mono text-[11px]">
                <a
                  href="#experience"
                  className="text-[#0a0a0a] font-bold hover:text-[#4c2bd9] flex items-center gap-1 cursor-pointer"
                >
                  <span>FULL HISTORY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-zinc-500 font-bold">256-BIT SIGNED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row of Four Small Trust Badges */}
        <div className="mt-8 pt-6 border-t-2 border-black grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map((badge, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-[#faf9f5] border-2 border-black shadow-[2px_2px_0px_#0a0a0a] flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#4d7c0f] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs font-black uppercase text-[#0a0a0a] truncate">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
