import React from 'react';
import { motion } from 'framer-motion';
import { CyberTunnel3D } from '../components/CyberTunnel3D';
import {
  Download,
  Eye,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Code,
  FileText,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Terminal
} from 'lucide-react';

interface CvSectionProps {
  onOpenModal?: () => void;
}

export const CvSection: React.FC<CvSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="cv-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0C0C] border-t border-[#D7E2EA]/10 overflow-hidden">
      {/* Three.js Endless Cyber Tunnel 3D Canvas Background */}
      <CyberTunnel3D />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#B600A8]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00E1FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Craftwork Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Bold Craftwork Brand Banner (3D Styled) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ clipPath: 'inset(0 rounded 32px)' }}
            className="lg:col-span-4 bg-[radial-gradient(ellipse_at_top_left,rgba(0,225,255,0.25),transparent_55%),linear-gradient(to_bottom_right,#7721B1_0%,#B600A8_50%,#3B0037_100%)] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_10px_40px_rgba(182,0,168,0.3)] min-h-[480px] group border border-[#B600A8]/50 isolate"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Badge Icon */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#00E1FF] text-black flex items-center justify-center font-black shadow-[0_0_30px_rgba(0,225,255,0.7)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <ShieldCheck size={32} className="stroke-[2.5]" />
              </div>
              <span className="px-3 py-1 rounded-full bg-black/50 border border-white/20 text-white text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
                <Terminal size={12} className="text-[#00E1FF]" />
                VERIFIED DOSSIER
              </span>
            </div>

            {/* Middle: Giant Craftwork Typography */}
            <div className="relative z-10 my-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E1FF] block mb-1">
                Curriculum Vitae
              </span>
              <h2 className="text-6xl sm:text-7xl font-black text-[#00E1FF] uppercase tracking-tighter leading-none font-kanit drop-shadow-[0_6px_25px_rgba(0,0,0,0.6)]">
                Resume
              </h2>
              <p className="text-white/95 text-sm font-light mt-3 leading-relaxed">
                Cybersecurity Specialist &amp; Full-Stack AI Developer Qualifications.
              </p>
            </div>

            {/* Bottom: Quick Action CTAs inside Banner */}
            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/20">
              {onOpenModal && (
                <button
                  onClick={onOpenModal}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-[#00E1FF] hover:shadow-[0_0_20px_rgba(0,225,255,0.6)] transition-all cursor-pointer shadow-lg"
                >
                  <Eye size={16} />
                  <span>Preview Full</span>
                </button>
              )}

              <a
                href="/assets/docs/yehia-cv.pdf"
                download="Yehia_Amin_CV.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black/60 border border-white/30 text-white font-bold uppercase text-xs tracking-wider hover:bg-black hover:border-white transition-all cursor-pointer backdrop-blur-md"
              >
                <Download size={16} />
                <span>PDF Download</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Layered / Tilted Resume Cards Grid (3D Interactive Mockup Style) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
            
            {/* Sheet Card 1: Header & Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={onOpenModal}
              className="bg-[#141518]/90 border border-[#2B2E36] rounded-2xl p-6 shadow-2xl relative cursor-pointer group hover:border-[#B600A8] transition-all backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-[#2B2E36] pb-3 mb-4">
                <span className="text-[10px] font-mono text-[#00E1FF] uppercase font-bold tracking-wider">Sheet 01 // Profile</span>
                <FileText size={16} className="text-[#B600A8]" />
              </div>

              <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#00E1FF] transition-colors">
                Yehia Mohamed Hassan Amin
              </h3>
              <p className="text-xs text-[#B600A8] font-bold uppercase tracking-wider mt-0.5">
                Junior Cybersecurity Specialist
              </p>

              <p className="text-xs text-[#D7E2EA]/80 font-light mt-3 leading-relaxed line-clamp-4">
                Cybersecurity Engineer with strong expertise in network security, vulnerability assessment, web application security, and cloud fundamentals. Certified by Cisco, Huawei, HarvardX, and ITI.
              </p>

              <div className="mt-4 pt-3 border-t border-[#2B2E36] flex flex-wrap gap-3 text-[11px] text-[#D7E2EA]/60 font-mono">
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-[#B600A8]" /> yehia.rashed3200@gmail.com
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-[#00E1FF]" /> +20 1060076900
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#7721B1]" /> Cairo, Egypt
                </span>
              </div>
            </motion.div>

            {/* Sheet Card 2: Education & Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              onClick={onOpenModal}
              className="bg-[#141518]/90 border border-[#2B2E36] rounded-2xl p-6 shadow-2xl relative cursor-pointer group hover:border-[#00E1FF] transition-all backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-[#2B2E36] pb-3 mb-4">
                <span className="text-[10px] font-mono text-[#00E1FF] uppercase font-bold tracking-wider">Sheet 02 // Education</span>
                <GraduationCap size={16} className="text-[#00E1FF]" />
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#00E1FF] transition-colors">
                      B.Sc. Computer Science &amp; AI
                    </h4>
                    <span className="text-[11px] font-mono text-[#B600A8]">2023 - 2027</span>
                  </div>
                  <p className="text-xs text-[#D7E2EA]/70 mt-0.5">Benha University, Egypt</p>
                </div>

                <div className="pt-2 border-t border-[#2B2E36] space-y-1.5">
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-bold">Verified Certifications:</span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-[#D7E2EA]/80">
                    <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-400" /> Cisco Academy</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-400" /> Huawei ICT</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-400" /> HarvardX</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-400" /> ITI Certified</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sheet Card 3: Technical Skills & Security Arsenal */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onClick={onOpenModal}
              className="bg-[#141518]/90 border border-[#2B2E36] rounded-2xl p-6 shadow-2xl relative cursor-pointer group hover:border-[#B600A8] transition-all backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-[#2B2E36] pb-3 mb-4">
                <span className="text-[10px] font-mono text-[#00E1FF] uppercase font-bold tracking-wider">Sheet 03 // Arsenal</span>
                <Code size={16} className="text-emerald-400" />
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-white block mb-1">Security &amp; Testing Tools:</span>
                  <p className="text-xs font-mono text-gray-400 leading-relaxed">
                    Nmap, Wireshark, Burp Suite, Metasploit, Aircrack-ng, Wifite, Hashcat, Bettercap
                  </p>
                </div>

                <div className="pt-2 border-t border-[#2B2E36]">
                  <span className="text-xs font-bold text-white block mb-1">Engineering Stack:</span>
                  <p className="text-xs font-mono text-gray-400 leading-relaxed">
                    Python, JavaScript, React, Node.js, Kali Linux, Cisco Packet Tracer, AWS
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sheet Card 4: Work Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              onClick={onOpenModal}
              className="bg-[#141518]/90 border border-[#2B2E36] rounded-2xl p-6 shadow-2xl relative cursor-pointer group hover:border-[#7721B1] transition-all backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-[#2B2E36] pb-3 mb-4">
                <span className="text-[10px] font-mono text-[#00E1FF] uppercase font-bold tracking-wider">Sheet 04 // Track Record</span>
                <Briefcase size={16} className="text-[#7721B1]" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00E1FF] transition-colors">
                    E-Commerce Store Owner
                  </h4>
                  <span className="text-[11px] font-mono text-gray-400">2018 - 2023</span>
                </div>
                <p className="text-xs text-[#B600A8] font-mono">Self-Employed / Online Fashion Brand</p>

                <ul className="text-xs text-[#D7E2EA]/75 font-light space-y-1 pt-1 list-disc list-inside">
                  <li>Managed full operations, sourcing, inventory, and digital marketing.</li>
                  <li>Boosted sales conversion rates by 15% using data analytics.</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
