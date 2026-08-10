import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { ContactButton } from '../components/ContactButton';

import { TextReveal } from '../components/TextReveal';
import { ShieldCheck, Cpu, Code2, Menu, X } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', action: onOpenContact },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA]"
    >


      {/* Header / Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="w-full flex items-center justify-between px-5 sm:px-8 md:px-12 pt-6 md:pt-8">
          {/* Brand logo text */}
          <a href="#home" className="text-xl font-black tracking-tighter uppercase text-white hover:text-[#B600A8] transition-colors">
            YEHIA<span className="text-[#B600A8]">.</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item, idx) =>
              item.action ? (
                <button
                  key={idx}
                  onClick={item.action}
                  data-cursor="hover"
                  className="text-[#D7E2EA]/80 font-medium uppercase tracking-wider text-xs lg:text-sm hover:text-white transition-colors duration-200 cursor-pointer relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#B600A8] transition-all duration-300 group-hover:w-full" />
                </button>
              ) : (
                <a
                  key={idx}
                  href={item.href}
                  data-cursor="hover"
                  className="text-[#D7E2EA]/80 font-medium uppercase tracking-wider text-xs lg:text-sm hover:text-white transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#B600A8] transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full border border-[#D7E2EA]/20 bg-[#141518]/80 text-[#D7E2EA] focus:outline-none z-40"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </FadeIn>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-20 z-40 bg-[#0C0C0C]/95 border-b border-[#D7E2EA]/15 backdrop-blur-xl p-6 md:hidden flex flex-col gap-4 text-center shadow-2xl"
        >
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setMobileMenuOpen(false);
                if (item.action) item.action();
                else if (item.href) window.location.href = item.href;
              }}
              className="text-[#D7E2EA] font-bold uppercase tracking-widest text-base py-2 hover:text-[#B600A8] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Hero Heading & Sub-role */}
      <motion.div style={{ opacity: bgOpacity }} className="w-full z-10 my-auto flex flex-col items-center px-4 py-8 text-center">
        {/* Role Pill */}
        <FadeIn delay={0.1} y={-10}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D7E2EA]/20 bg-[#141518]/80 backdrop-blur-md mb-6 text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/90 shadow-lg">
            <ShieldCheck size={15} className="text-[#B600A8]" />
            <span>Cybersecurity Specialist</span>
            <span className="text-[#B600A8]">•</span>
            <Cpu size={15} className="text-[#00E1FF]" />
            <span>AI Engineer</span>
            <span className="text-[#B600A8]">•</span>
            <Code2 size={15} className="text-amber-500" />
            <span>Full Stack Developer</span>
          </div>
        </FadeIn>

        {/* Oversized Parallax Text Reveal Heading */}
        <motion.div style={{ y: headingY }} className="w-full max-w-7xl mx-auto flex justify-center">
          <TextReveal
            text="HI, I'M YEHIA AMIN"
            mode="word"
            delay={0.2}
            className="hero-heading font-black uppercase tracking-tight leading-none text-white select-none max-w-full"
            style={{ fontSize: 'clamp(2.6rem, 9.5vw, 150px)' }}
          />
        </motion.div>
      </motion.div>

      {/* Hero 3D Portrait / Avatar with Scroll Parallax & Magnet */}
      <motion.div
        style={{ y: avatarY, scale: avatarScale }}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <Magnet
          padding={800}
          strength={2.8}
          tiltStrength={15}
          activeTransition="transform 0.15s ease-out"
          inactiveTransition="transform 0.8s ease-in-out"
        >
          <div className="relative group">
            {/* Subtle glow layer behind avatar */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#B600A8]/30 via-transparent to-transparent filter blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/assets/images/yehia-3d-avatar.png"
              alt="Yehia Amin 3D Avatar"
              className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] h-auto object-contain transform-gpu select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative z-10"
            />
          </div>
        </Magnet>
      </motion.div>

      {/* Bottom Content Bar */}
      <div className="w-full flex items-end justify-between pb-8 sm:pb-10 px-6 sm:px-10 md:px-12 z-20 gap-4">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA]/90 font-light uppercase tracking-wide leading-snug max-w-[220px] sm:max-w-[300px] md:max-w-[360px]"
            style={{ fontSize: 'clamp(0.72rem, 1.2vw, 1.05rem)' }}
          >
            I build secure web applications, AI-powered solutions, and modern digital experiences. Passionate about Cybersecurity, AI, Cloud, and Full Stack.
          </p>
        </FadeIn>

        <FadeIn delay={0.45} y={20}>
          <ContactButton onClick={onOpenContact} label="Contact Me" />
        </FadeIn>
      </div>
    </section>
  );
};
