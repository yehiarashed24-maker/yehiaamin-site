import { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';

import { CertificatesSection } from './sections/CertificatesSection';
import { ContactModal } from './components/ContactModal';
import { CvModal } from './components/CvModal';
import { AiChatWidget } from './components/AiChatWidget';
import { ContactButton } from './components/ContactButton';
import { CustomCursor } from './components/CustomCursor';
import { ArrowUp, Mail, FileText, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const LinkedinIcon = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-kanit overflow-x-clip relative selection:bg-[#B600A8] selection:text-white">
      {/* Desktop Custom Precision Cursor */}
      <CustomCursor />

      {/* 1. Hero Section */}
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. About Section */}
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 3. Skills Section */}
      <SkillsSection />

      {/* 4. Projects Section */}
      <ProjectsSection />



      {/* 6. Certificates Section */}
      <CertificatesSection />

      {/* Quick Resume Bar */}
      <section className="bg-[#141518] border-t border-[#D7E2EA]/10 py-12 px-6 text-center relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
              <FileText className="text-[#B600A8]" /> Complete Curriculum Vitae
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
              Preview Yehia Amin's complete qualification details or download a PDF copy.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCvOpen(true)}
              className="px-6 py-3 rounded-full bg-[#0C0C0C] border border-[#D7E2EA]/30 text-white font-bold uppercase text-xs tracking-wider hover:bg-[#D7E2EA] hover:text-black transition-colors cursor-pointer"
            >
              Preview CV
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/assets/docs/yehia-cv.pdf"
              download="Yehia_Amin_CV.pdf"
              className="px-6 py-3 rounded-full bg-[#B600A8] text-white font-bold uppercase text-xs tracking-wider hover:bg-[#900085] transition-colors shadow-lg"
            >
              Download PDF
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-12 py-16 border-t border-[#D7E2EA]/10 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="hero-heading font-black text-3xl sm:text-4xl uppercase tracking-tight mb-2 text-white">
              YEHIA AMIN
            </h3>
            <p className="text-[#D7E2EA]/60 text-xs sm:text-sm uppercase tracking-wider font-light">
              Cybersecurity Engineer | AI Tools Developer | Full Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/yehia-amin-59b81140b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/70 hover:text-[#0077B5] transition-colors p-2"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={22} />
            </a>
            <a
              href="https://wa.me/201060076900"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/70 hover:text-emerald-400 transition-colors p-2"
              aria-label="WhatsApp"
              title="WhatsApp Contact"
            >
              <Phone size={22} />
            </a>
            <a
              href="mailto:yehia.rashed3200@gmail.com"
              className="text-[#D7E2EA]/70 hover:text-[#B600A8] transition-colors p-2 cursor-pointer"
              aria-label="Email"
              title="Email Yehia"
            >
              <Mail size={22} />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ContactButton onClick={() => setIsContactOpen(true)} label="Get In Touch" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#D7E2EA]/5 text-center text-xs text-[#D7E2EA]/40 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Yehia Amin. All rights reserved.
        </div>
      </footer>

      {/* Modals & Floating AI Widget */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
      <AiChatWidget />
    </div>
  );
}

export default App;
