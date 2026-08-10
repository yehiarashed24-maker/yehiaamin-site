import React, { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ShieldCheck, ChevronLeft, ChevronRight, Award, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export interface CertificateItem {
  id: string;
  issuer: string;
  title: string;
  type: string;
  date: string;
  certId: string;
  description: string;
  skills: string[];
  credentialUrl: string;
  image: string;
  logo?: string;
}

interface CardStackProps {
  items: CertificateItem[];
  onSelectCert: (cert: CertificateItem) => void;
  className?: string;
}

export const CardStack: React.FC<CardStackProps> = ({
  items,
  onSelectCert,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Handle Drag / Swipe
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* 3D Stacking Cards Container */}
      <div className="relative w-full max-w-4xl h-[480px] sm:h-[520px] md:h-[540px] flex items-center justify-center overflow-hidden py-4 px-2">
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            // Compute relative offset from active card (-2, -1, 0, 1, 2)
            let offset = index - activeIndex;

            // Handle wrap-around math for smooth circular indexing
            const total = items.length;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            // Render visible cards within range (-2 to 2)
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            const isActive = offset === 0;

            // Compute 3D Card Transforms
            const xOffset = shouldReduceMotion ? 0 : offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 45 : 120);
            const scale = shouldReduceMotion ? (isActive ? 1 : 0.9) : 1 - Math.abs(offset) * 0.1;
            const rotateZ = shouldReduceMotion ? 0 : offset * 3;
            const opacity = 1 - Math.abs(offset) * 0.35;
            const zIndex = total - Math.abs(offset);

            const displayImage = item.logo || item.image;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: xOffset,
                  scale,
                  rotateZ,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 25,
                }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isActive) {
                    onSelectCert(item);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute w-[94%] max-w-[340px] sm:max-w-[500px] md:max-w-[600px] bg-[#0C0C0C] border-2 ${
                  isActive ? 'border-[#B600A8] shadow-[0_15px_50px_rgba(182,0,168,0.25)] cursor-grab active:cursor-grabbing' : 'border-[#2B2E36] cursor-pointer hover:border-[#D7E2EA]/40'
                } rounded-[28px] sm:rounded-[36px] md:rounded-[40px] p-4 sm:p-6 md:p-8 flex flex-col justify-between text-[#D7E2EA] transition-colors duration-300 overflow-hidden`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Holographic Top Accent Glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B600A8]/10 via-transparent to-[#00E1FF]/10 pointer-events-none" />
                )}

                {/* Card Top Section: Issuer badge + Date */}
                <div className="flex items-center justify-between gap-1.5 border-b border-[#2B2E36] pb-3 relative z-10">
                  <div className="flex items-center gap-1.5 max-w-[70%]">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#141518] border border-[#2B2E36] text-[#D7E2EA] text-[10px] sm:text-xs font-semibold uppercase tracking-wider truncate">
                      {item.issuer === 'AIXamin' ? (
                        <Sparkles size={12} className="text-[#B600A8] flex-shrink-0" />
                      ) : item.issuer === 'Huawei ICT Academy' ? (
                        <Cpu size={12} className="text-[#00E1FF] flex-shrink-0" />
                      ) : (
                        <ShieldCheck size={12} className="text-[#B600A8] flex-shrink-0" />
                      )}
                      <span className="truncate">{item.issuer}</span>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-emerald-400 font-medium flex-shrink-0">
                    <CheckCircle2 size={12} />
                    {item.date}
                  </span>
                </div>

                {/* Card Main Section: Title, Institution Logo, Description */}
                <div className="py-2.5 sm:py-4 space-y-2 sm:space-y-3 relative z-10">
                  <h3 className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-tight leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {displayImage && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCert(item);
                      }}
                      className="w-full h-28 sm:h-36 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden border border-[#2B2E36] bg-[#141518] relative group cursor-pointer flex items-center justify-center p-1.5 sm:p-2"
                    >
                      <img
                        src={displayImage}
                        alt={`${item.issuer} Logo`}
                        loading="lazy"
                        className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-[2px]">
                        <Award size={14} className="text-[#B600A8]" />
                        <span>Click to View Certificate</span>
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] sm:text-xs md:text-sm font-light text-[#D7E2EA]/80 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Section: Skills Badges + Details Action Button */}
                <div className="pt-2.5 sm:pt-3 border-t border-[#2B2E36] flex items-center justify-between gap-2 relative z-10">
                  <div className="flex flex-wrap gap-1 max-w-[60%]">
                    {item.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full border border-[#2B2E36] bg-[#141518] text-[#D7E2EA]/80 font-medium text-[9px] sm:text-[11px] uppercase tracking-wider truncate"
                      >
                        {skill}
                      </span>
                    ))}
                    {item.skills.length > 2 && (
                      <span className="text-[9px] sm:text-[10px] text-[#D7E2EA]/50 self-center font-mono">
                        +{item.skills.length - 2}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCert(item);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white font-bold uppercase text-[10px] sm:text-xs tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer ml-auto flex-shrink-0"
                  >
                    <Award size={12} />
                    <span>Verify</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Prev / Next + Dots */}
      <div className="flex items-center justify-center gap-6 mt-6 z-30">
        <button
          onClick={handlePrev}
          aria-label="Previous Certificate"
          className="p-3 rounded-full bg-[#0C0C0C] border border-[#2B2E36] text-[#D7E2EA] hover:border-[#B600A8] hover:text-[#B600A8] transition-all duration-200 active:scale-90 cursor-pointer shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to certificate ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-8 bg-[#B600A8] shadow-[0_0_10px_#B600A8]'
                  : 'w-2.5 bg-[#2B2E36] hover:bg-[#D7E2EA]/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Certificate"
          className="p-3 rounded-full bg-[#0C0C0C] border border-[#2B2E36] text-[#D7E2EA] hover:border-[#B600A8] hover:text-[#B600A8] transition-all duration-200 active:scale-90 cursor-pointer shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Swipe / Keyboard Helper Label */}
      <span className="text-[11px] uppercase tracking-widest text-[#0C0C0C]/50 font-semibold mt-4">
        Use Left / Right Arrows • Drag to Swipe Cards
      </span>
    </div>
  );
};
