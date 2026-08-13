import React, { useRef, useState, useEffect } from 'react';

const marqueeImages = [
  '/assets/images/ya-cv-ai-project.png',
  '/assets/images/nourgine-project.png',
  '/assets/images/wifi-project.png',
  '/assets/images/phishing-project.png',
  '/assets/images/android-project.png',
  '/assets/images/cert-cib-genai.png',
  '/assets/images/cert-ccna-1.png',
  '/assets/images/cert-ccna-2.png',
  '/assets/images/cert-hcia.png',
  '/assets/images/cert-iti.png',
  '/assets/images/cert-cybersecurity.png',
  '/assets/images/cert-endpoint.png',
  '/assets/images/cert-cs50.png',
];

const row1Single = marqueeImages.slice(0, 11);
const row2Single = marqueeImages.slice(11, 21);

const row1Images = [...row1Single, ...row1Single, ...row1Single];
const row2Images = [...row2Single, ...row2Single, ...row2Single];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const calcOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(calcOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transformRight = `translateX(${scrollOffset - 200}px)`;
  const transformLeft = `translateX(${-(scrollOffset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3 w-max"
          style={{
            transform: transformRight,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, idx) => (
            <div
              key={`r1-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181A20]"
            >
              <img
                src={src}
                alt={`Portfolio piece ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3 w-max"
          style={{
            transform: transformLeft,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, idx) => (
            <div
              key={`r2-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181A20]"
            >
              <img
                src={src}
                alt={`Portfolio piece ${idx + 12}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
