import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  FileText,
  GraduationCap,
  Briefcase,
  Code,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Award,
  Sparkles,
} from 'lucide-react';

const LinkedinIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
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

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl my-8 bg-[#12141A] border border-[#262B37] rounded-[32px] p-5 sm:p-8 shadow-2xl text-[#D7E2EA] z-10 max-h-[88vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#262B37] pb-4 mb-6 sticky top-0 bg-[#12141A]/95 backdrop-blur-md z-10 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#B600A8]/15 border border-[#B600A8]/30 flex items-center justify-center text-[#B600A8] shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Yehia Mohamed Hassan Amin
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-[#B600A8] font-bold">
                    Junior Cybersecurity Specialist &bull; AI Developer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="/assets/docs/yehia-cv.pdf"
                  download="Yehia_Mohamed_Amin_CV.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B600A8] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#96008b] transition-all shadow-[0_0_15px_rgba(182,0,168,0.4)]"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download CV (PDF)</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-[#1A1D27] text-[#8B949E] hover:text-white hover:bg-[#252A38] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Paper content */}
            <div className="space-y-6 text-sm">
              {/* Contact Bar */}
              <div className="p-4 rounded-2xl bg-[#0B0D12] border border-[#212633] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <span className="flex items-center gap-2 text-[#9DA7B3]">
                  <Mail size={14} className="text-[#B600A8] shrink-0" />
                  <a href="mailto:yehia.rashed3200@gmail.com" className="hover:text-white truncate">
                    yehia.rashed3200@gmail.com
                  </a>
                </span>
                <span className="flex items-center gap-2 text-[#9DA7B3]">
                  <Phone size={14} className="text-[#00E1FF] shrink-0" />
                  <a href="tel:+201060076900" className="hover:text-white">
                    +20 1060076900
                  </a>
                </span>
                <span className="flex items-center gap-2 text-[#9DA7B3]">
                  <LinkedinIcon size={14} className="text-[#0077B5] shrink-0" />
                  <a
                    href="https://linkedin.com/in/yehia-amin-59b81140b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white truncate"
                  >
                    in/yehia-amin-59b81140b
                  </a>
                </span>
                <span className="flex items-center gap-2 text-[#9DA7B3]">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  <span>Cairo, Egypt</span>
                </span>
              </div>

              {/* Professional Summary */}
              <div className="p-5 rounded-2xl bg-[#161822] border border-[#262B37]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#B600A8]" />
                  Professional Summary
                </h3>
                <p className="text-xs sm:text-sm text-[#B4BAC5] leading-relaxed mb-2">
                  Junior Cybersecurity Specialist with hands-on experience in network security, penetration testing, web
                  application security, wireless security, firewall configuration, cloud security fundamentals, and
                  practical offensive-security labs.
                </p>
                <p className="text-xs sm:text-sm text-[#B4BAC5] leading-relaxed mb-2">
                  Experienced with Kali Linux, Nmap, Wireshark, Burp Suite, Metasploit, Aircrack-ng, Hashcat, Cisco Packet
                  Tracer, Huawei security technologies, and secure application development.
                </p>
                <p className="text-xs sm:text-sm text-[#B4BAC5] leading-relaxed">
                  In addition to cybersecurity, I build AI/GenAI applications using RAG, Gemini, LangChain, ChromaDB,
                  FastAPI, Node.js, and secure LLM application practices.
                </p>
              </div>

              {/* Skills & Arsenal */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                  <Code size={16} className="text-[#00E1FF]" />
                  Skills &amp; Languages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-[#161822] border border-[#262B37] space-y-1.5">
                    <span className="font-bold text-white block text-xs uppercase tracking-wider">Cybersecurity:</span>
                    <p className="text-[#9DA7B3] leading-relaxed">
                      Vulnerability Assessment, Penetration Testing Fundamentals, Web Application Security, Wi-Fi Security, Network Security, Firewall Configuration.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#161822] border border-[#262B37] space-y-1.5">
                    <span className="font-bold text-white block text-xs uppercase tracking-wider">Security Tools:</span>
                    <p className="text-[#9DA7B3] leading-relaxed font-mono text-[11px]">
                      Kali Linux, Nmap, Wireshark, Burp Suite, Metasploit, Aircrack-ng, Wifite, Hashcat, Bettercap, Cisco Packet Tracer.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#161822] border border-[#262B37] space-y-1.5">
                    <span className="font-bold text-white block text-xs uppercase tracking-wider">AI &amp; Development:</span>
                    <p className="text-[#9DA7B3] leading-relaxed font-mono text-[11px]">
                      RAG, LLM Applications, Gemini API, LangChain, ChromaDB, FastAPI, Node.js, Python, JavaScript, React, HTML, CSS, AWS.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#161822] border border-[#262B37] space-y-1.5">
                    <span className="font-bold text-white block text-xs uppercase tracking-wider">Languages:</span>
                    <p className="text-[#9DA7B3] leading-relaxed">
                      Arabic (Native), English (B2 Professional Working Proficiency).
                    </p>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                  <Briefcase size={16} className="text-[#B600A8]" />
                  Work Experience
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#161822] border border-[#262B37] space-y-1.5">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        Independent AI &amp; Cybersecurity Project Developer
                      </h4>
                      <span className="text-[11px] text-[#00E1FF] font-mono font-semibold">2026 &ndash; Present</span>
                    </div>
                    <p className="text-xs text-[#9DA7B3] leading-relaxed">
                      Built practical cybersecurity labs and AI applications involving network security, web security, penetration testing, RAG, multimodal AI, and secure LLM workflows using Gemini, LangChain, ChromaDB, Kali Linux, Nmap, Burp Suite, and Metasploit.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#161822] border border-[#262B37] space-y-1.5">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        Generative AI &ndash; CIB Summer Internship Program
                      </h4>
                      <span className="text-[11px] text-[#B600A8] font-mono font-semibold">July 2026</span>
                    </div>
                    <p className="text-xs text-[#9DA7B3] leading-relaxed">
                      Completed practical training in Generative AI principles, approaches, and best practices.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#161822] border border-[#262B37] space-y-1.5">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h4 className="font-bold text-white text-xs sm:text-sm">E-Commerce Store Owner</h4>
                      <span className="text-[11px] text-gray-400 font-mono font-semibold">2018 &ndash; 2023</span>
                    </div>
                    <p className="text-xs text-[#9DA7B3] leading-relaxed">
                      Managed sourcing, pricing, inventory, fulfillment, marketing, customer service, and data-driven sales optimization, contributing to a 15% increase in conversion rates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlighted AI & Security Projects */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  Key Projects &amp; Security Labs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#212633]">
                    <span className="font-bold text-white block mb-1">Sakina AI (سكينة)</span>
                    <p className="text-[#9DA7B3] text-[11px] leading-relaxed">
                      Evidence-grounded mental wellness assistant using RAG, trusted-source citations, safety classification, and crisis handling with end-to-end security controls.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#212633]">
                    <span className="font-bold text-white block mb-1">Nabta AI (نبتة)</span>
                    <p className="text-[#9DA7B3] text-[11px] leading-relaxed">
                      Grounded GenAI study workspace converting PDFs into source-backed explanations, study guides, quizzes, Voice Tutor, and AI Viva.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#212633]">
                    <span className="font-bold text-white block mb-1">NOR AI (نور)</span>
                    <p className="text-[#9DA7B3] text-[11px] leading-relaxed">
                      Voice-first visual assistant for blind and visually impaired users using multimodal AI for scene understanding, OCR, and currency recognition.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#212633]">
                    <span className="font-bold text-white block mb-1">Metasploitable 2 PenTest</span>
                    <p className="text-[#9DA7B3] text-[11px] leading-relaxed">
                      12 high-impact vulnerability assessment (10 Critical, 2 High, CVSS 10.0) conducted by Pharaohs Security Team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#00E1FF]" />
                  Education
                </h3>
                <div className="p-4 rounded-2xl bg-[#161822] border border-[#262B37]">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h4 className="font-bold text-white text-xs sm:text-sm">
                      Bachelor of Computer Science and Artificial Intelligence
                    </h4>
                    <span className="text-[11px] text-[#00E1FF] font-mono font-semibold">Expected 2027</span>
                  </div>
                  <p className="text-xs text-[#9DA7B3] mt-0.5">Benha University, Egypt</p>
                </div>
              </div>

              {/* Certifications & Courses (13 Items) */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-2">
                  <Award size={16} className="text-emerald-400" />
                  Certifications &amp; Courses (13 Verified Credentials)
                </h3>
                <div className="p-4 rounded-2xl bg-[#161822] border border-[#262B37]">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-[#D7E2EA]/85">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>Penetration Testing &amp; AppSec &ndash; NTI / EG-CERT / NTRA (2026)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>BGP Security &ndash; RIPE NCC Academy (Sep 2026)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>Network Security &ndash; Huawei ICT Academy (Sep 2026)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>Certified Cybersecurity Educator Professional (CCEP) &ndash; Red Team Leaders</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>Certified LLM Security Professional (CLLMSP) &ndash; Red Team Leaders</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>Gemini Certified Student &ndash; Google for Education (Aug 2026)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>CCNA: ENSA &ndash; Cisco Networking Academy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>CCNA: SRWE &ndash; Cisco Networking Academy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>HCIA-Security V4.0 &ndash; Huawei ICT Academy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>HCIA-AI &ndash; Huawei ICT Academy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>CS50's Intro to Cybersecurity &ndash; HarvardX</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>Endpoint Security &ndash; Cisco Networking Academy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>Front End Web Development (120 Hours) &ndash; ITI</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-[#262B37] flex items-center justify-between">
              <span className="text-xs text-[#8B949E] hidden sm:inline">
                Verified Curriculum Vitae &bull; Updated 2026
              </span>
              <a
                href="/assets/docs/yehia-cv.pdf"
                download="Yehia_Mohamed_Amin_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B600A8] text-white font-bold uppercase text-xs tracking-wider hover:bg-[#96008b] transition-all shadow-[0_0_15px_rgba(182,0,168,0.4)]"
              >
                <Download size={15} />
                <span>Save Official 1-Page PDF</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
