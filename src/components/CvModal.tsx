import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, GraduationCap, Briefcase, Code, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl my-8 bg-[#141518] border border-[#2B2E36] rounded-[32px] p-6 sm:p-8 shadow-2xl text-[#D7E2EA] z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2B2E36] pb-4 mb-6 sticky top-0 bg-[#141518] z-10 pt-2">
              <div className="flex items-center gap-3">
                <FileText className="text-[#B600A8]" size={28} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Yehia Mohamed Hassan Amin
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-[#B600A8] font-bold">
                    Junior Cybersecurity Specialist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/assets/docs/yehia-cv.pdf"
                  download="Yehia_Amin_CV.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B600A8] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#900085] transition-colors shadow-lg"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-[#1E2026] text-[#D7E2EA] hover:bg-[#2B2E36] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Paper content */}
            <div className="space-y-6 text-sm">
              {/* Contact Header */}
              <div className="p-4 rounded-2xl bg-[#0C0C0C] border border-[#2B2E36] flex flex-wrap gap-4 justify-between items-center text-xs">
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-[#B600A8]" />
                  <a href="mailto:yehia.rashed3200@gmail.com" className="hover:underline">yehia.rashed3200@gmail.com</a>
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-[#00E1FF]" />
                  <a href="tel:+201060076900" className="hover:underline">+20 1060076900</a>
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#7721B1]" />
                  Cairo, Egypt
                </span>
              </div>

              {/* Professional Summary */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#B600A8]" /> Professional Summary
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/80 leading-relaxed">
                  As a Junior Cybersecurity Specialist, I am a cybersecurity professional with a strong foundation in network security, vulnerability assessment, web application security, wireless security testing, and cloud computing fundamentals. Hands-on experience conducting cybersecurity labs and building security-focused projects using Kali Linux, Nmap, Wireshark, Burp Suite, Metasploit Framework, Aircrack-ng, Hashcat, Cisco Packet Tracer, and Huawei security technologies. Certified by Cisco Networking Academy, Huawei ICT Academy, HarvardX, and ITI.
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#00E1FF]" /> Education
                </h3>
                <div className="p-4 rounded-2xl bg-[#0C0C0C] border border-[#2B2E36] space-y-1">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h4 className="font-bold text-white text-xs sm:text-sm">Bachelor of Computer Science and Artificial Intelligence</h4>
                    <span className="text-[11px] text-[#B600A8] font-mono">Expected 2027</span>
                  </div>
                  <p className="text-xs text-[#D7E2EA]/70">Benha University, Egypt</p>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-[#7721B1]" /> Work Experience
                </h3>
                <div className="p-4 rounded-2xl bg-[#0C0C0C] border border-[#2B2E36] space-y-2">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h4 className="font-bold text-white text-xs sm:text-sm">E-Commerce Store Owner</h4>
                    <span className="text-[11px] text-gray-400 font-mono">2018 – 2023</span>
                  </div>
                  <p className="text-xs text-[#D7E2EA]/70">Self-Employed / Online Fashion Brand</p>
                  <ul className="list-disc list-inside text-xs text-[#D7E2EA]/70 space-y-1 font-light pt-1">
                    <li>Managed full-cycle operations of an online fashion brand, including product sourcing, pricing strategy, inventory control, and digital marketing.</li>
                    <li>Leveraged data analytics to optimize sales performance, resulting in a 15% increase in conversion rates.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Skills & Tools */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                  <Code size={16} className="text-emerald-400" /> Technical Skills &amp; Security Tools
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0C0C0C] border border-[#2B2E36]">
                    <span className="font-bold text-white block mb-1">Security Tools &amp; Protocols:</span>
                    <span className="text-gray-400">Nmap, Wireshark, Burp Suite, Metasploit Framework, Aircrack-ng, Wifite, Hashcat, Bettercap, SET Toolkit, TCP/IP, DNS, DHCP, VLANs, ACLs, Firewall Config</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0C0C0C] border border-[#2B2E36]">
                    <span className="font-bold text-white block mb-1">Programming &amp; Platforms:</span>
                    <span className="text-gray-400">Python, JavaScript, HTML, CSS, React, Node.js, Express.js, Kali Linux, Windows, VMware, AWS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-[#2B2E36] flex justify-end">
              <a
                href="/assets/docs/yehia-cv.pdf"
                download="Yehia_Amin_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B600A8] text-white font-bold uppercase text-xs tracking-wider hover:bg-[#900085] transition-colors"
              >
                <Download size={16} />
                <span>Save PDF Copy</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
