import React, { useState } from 'react';
import { FadeIn } from '../components/FadeIn';
import { ShieldCheck, ExternalLink, CheckCircle2, Award, X, Sparkles, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from '../components/TextReveal';

interface CertificateItem {
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
}

const certificatesData: CertificateItem[] = [
  {
    id: '01',
    issuer: 'Cisco Networking Academy',
    title: 'CCNA: Enterprise Networking, Security, and Automation',
    type: 'Faculty of Computers & AI, Banha University',
    date: '29 Jul 2026',
    certId: 'b9373263-2aea-4c96-96fa-cd6389799d9e',
    description:
      'Issued by Cisco Networking Academy via Banha University. Covers enterprise network architecture, WAN technologies, network security mechanisms, network automation, and RESTful APIs.',
    skills: ['Network Security', 'Enterprise Networks', 'Network Automation', 'WAN & OSPF'],
    credentialUrl: 'https://www.netacad.com',
    image: '/assets/images/cert-ccna-1.png',
  },
  {
    id: '02',
    issuer: 'Cisco Networking Academy',
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    type: 'Faculty of Computers & AI, Banha University',
    date: '29 Jul 2026',
    certId: '90d94d64-f19d-49ec-9033-786c75fd7fb7',
    description:
      'Issued by Cisco Networking Academy via Banha University. Focuses on switching architecture, VLANs, WLANs, routing concepts, IPv4/IPv6 static & dynamic routing, and security best practices.',
    skills: ['Switching & VLANs', 'WLAN Configuration', 'IPv4/IPv6 Routing', 'STP & EtherChannel'],
    credentialUrl: 'https://www.netacad.com',
    image: '/assets/images/cert-ccna-2.png',
  },
  {
    id: '03',
    issuer: 'Huawei ICT Academy',
    title: 'HCIA-Security V4.0 Course',
    type: 'Huawei ICT Certification',
    date: '29 Jul 2026',
    certId: 'EBG20260729000327',
    description:
      'Official Certificate of Completion from Huawei ICT Academy. Validates comprehensive knowledge of network security fundamentals, firewall architecture, VPN technologies, intrusion prevention systems, and security management.',
    skills: ['Huawei Firewall', 'Network Security', 'IPsec & SSL VPN', 'Intrusion Prevention'],
    credentialUrl: 'https://e.huawei.com/en/talent/ict-academy/',
    image: '/assets/images/cert-hcia.png',
  },
  {
    id: '04',
    issuer: 'Information Technology Institute (ITI)',
    title: 'Front End Web Development (120 hrs)',
    type: 'ITI Intensive Track',
    date: '29 Aug 2024',
    certId: 'ITI-FRONTEND-120H',
    description:
      '120-hour intensive track covering HTML5/CSS3, Bootstrap, JavaScript, Object-Oriented JS, ES6, Angular, Node.js, and ReactJS.',
    skills: ['HTML5/CSS3', 'JavaScript ES6+', 'ReactJS', 'Node.js', 'Bootstrap'],
    credentialUrl: 'https://iti.gov.eg/',
    image: '/assets/images/cert-iti.png',
  },
  {
    id: '05',
    issuer: 'Cisco Networking Academy',
    title: 'Introduction to Cybersecurity',
    type: 'Cisco Security Curriculum',
    date: '13 Jun 2026',
    certId: 'CISCO-INTRO-CYBER',
    description:
      'Successfully completed curriculum mapping fundamental cyber threat categories, cybersecurity protection practices, and forensics basics.',
    skills: ['Cyber Threats', 'Security Practices', 'Data Confidentiality', 'Incident Response'],
    credentialUrl: 'https://www.netacad.com',
    image: '/assets/images/cert-cybersecurity.png',
  },
  {
    id: '06',
    issuer: 'Cisco Networking Academy',
    title: 'Endpoint Security',
    type: 'Cisco Security Track',
    date: '13 Jun 2026',
    certId: 'CISCO-ENDPOINT-SEC',
    description:
      'Completed curriculum specializing in terminal defenses, network connection protections, malware defense, and tracking active security threats.',
    skills: ['Endpoint Defense', 'Malware Analysis', 'Host Security', 'Network Connections'],
    credentialUrl: 'https://www.netacad.com',
    image: '/assets/images/cert-endpoint.png',
  },
  {
    id: '07',
    issuer: 'HarvardX',
    title: 'CS50 Cybersecurity',
    type: 'Harvard University',
    date: 'Certified',
    certId: 'HARVARDX-CS50-CYBER',
    description:
      'Introduction to cybersecurity for technical and non-technical audiences, covering defensive cybersecurity, offensive tradecraft, and web security principles.',
    skills: ['Defensive Security', 'Web Vulnerabilities', 'Cryptography', 'Harvard Security'],
    credentialUrl: 'https://pll.harvard.edu/',
    image: '/assets/images/cert-cs50.png',
  },
];

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section
      id="certificates"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-12 py-20 sm:py-28 md:py-32 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <div className="w-full flex justify-center mb-16 sm:mb-20 md:mb-28">
            <TextReveal
              text="CERTIFICATES"
              mode="word"
              className="font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight select-none max-w-full"
              style={{ fontSize: 'clamp(2.6rem, 10vw, 140px)' }}
            />
          </div>
        </FadeIn>

        {/* Certificates List */}
        <div className="flex flex-col">
          {certificatesData.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.07} y={30}>
              <motion.div
                whileHover={{ x: 8, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                data-cursor="cert"
                className={`group flex flex-col md:flex-row md:items-start justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] transition-all duration-300 relative overflow-hidden rounded-2xl px-3 hover:bg-gradient-to-r hover:from-[#B600A8]/5 hover:via-purple-500/5 hover:to-[#00E1FF]/5 ${
                  index === 0 ? 'border-t border-[rgba(12,12,12,0.15)]' : ''
                }`}
              >
                {/* 3D Holographic Sheen Sweep Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none opacity-40" />

                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] group-hover:text-[#B600A8] transition-colors duration-300 leading-none mb-4 md:mb-0 md:w-1/4 flex-shrink-0 select-none"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
                >
                  {item.id}
                </div>

                {/* Main Info */}
                <div className="flex flex-col md:w-3/4 space-y-4 justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C0C0C] text-white text-xs uppercase tracking-widest font-medium">
                        {item.issuer === 'AIXamin' ? (
                          <Sparkles size={14} className="text-[#B600A8]" />
                        ) : item.issuer === 'Huawei ICT Academy' ? (
                          <Cpu size={14} className="text-red-500" />
                        ) : (
                          <ShieldCheck size={14} className="text-[#B600A8]" />
                        )}
                        {item.issuer}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#0C0C0C]/20 text-[#0C0C0C] text-[11px] uppercase tracking-wider font-semibold">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        {item.date}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-medium">
                        {item.type}
                      </span>
                    </div>

                    <h3
                      className="font-black uppercase text-[#0C0C0C] tracking-wide"
                      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)' }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-75"
                      style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Skills badges + Verify button */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-[#0C0C0C]/5 text-[#0C0C0C]/80 font-semibold text-xs uppercase tracking-wider"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedCert(item)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0C0C0C] text-white font-medium uppercase text-xs tracking-widest transition-all duration-300 hover:bg-[#B600A8] active:scale-95 cursor-pointer shadow-md"
                    >
                      <Award size={14} />
                      <span>Verify Credential</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Credential Verification Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#141518] border border-[#2B2E36] rounded-[32px] p-6 sm:p-8 shadow-2xl text-[#D7E2EA] z-10"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#1E2026] text-[#D7E2EA] hover:bg-[#2B2E36] transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/40 text-[#D7E2EA] text-xs uppercase tracking-widest font-medium mt-4 sm:mt-0">
                  {selectedCert.issuer === 'AIXamin' ? (
                    <Sparkles size={14} className="text-[#B600A8]" />
                  ) : selectedCert.issuer === 'Huawei ICT Academy' ? (
                    <Cpu size={14} className="text-[#B600A8]" />
                  ) : (
                    <ShieldCheck size={14} className="text-[#B600A8]" />
                  )}
                  <span>{selectedCert.issuer} Verified Credential</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white pr-8">
                  {selectedCert.title}
                </h3>

                <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                  Issued via: {selectedCert.type} • Date: {selectedCert.date}
                </p>

                {selectedCert.image && (
                  <div className="w-full h-32 sm:h-56 rounded-2xl overflow-hidden border border-[#2B2E36] bg-[#0C0C0C]">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain bg-black/40 p-2"
                    />
                  </div>
                )}

                <div className="p-3 rounded-xl bg-[#0C0C0C] border border-[#2B2E36]">
                  <p className="text-xs font-mono text-purple-400">
                    Certificate Code / ID: {selectedCert.certId}
                  </p>
                </div>

                <p className="text-sm font-light text-gray-300 leading-relaxed">
                  {selectedCert.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2">
                    Key Competencies &amp; Skills Covered:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full border border-[#2B2E36] bg-[#0C0C0C] text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#2B2E36] mt-4">
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 uppercase tracking-wider">
                    <CheckCircle2 size={14} /> Verified Status
                  </span>

                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white font-bold uppercase text-xs tracking-widest hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <span>Official Portal</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
