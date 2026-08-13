import React, { useState } from 'react';
import { FadeIn } from '../components/FadeIn';
import { ShieldCheck, ExternalLink, CheckCircle2, X, Sparkles, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from '../components/TextReveal';
import { CardStack } from '../components/ui/card-stack';

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
  logo?: string;
}

const certificatesData: CertificateItem[] = [
  {
    id: '01',
    issuer: 'CIB Egypt',
    title: 'Generative AI Principles & Best Practices',
    type: 'CIB Summer Internship Program',
    date: 'Jul 2026',
    certId: 'CIB-GENAI-5584',
    description:
      'Certificate of Attendance acknowledging participation, completion, and understanding of the principles, approaches, and best practices of "Generative AI" as an integral part of the CIB Summer Internship Program.',
    skills: ['Generative AI', 'LLM Architectures', 'Prompt Engineering', 'AI Integration'],
    credentialUrl: 'https://www.cibeg.com',
    image: '/assets/images/cert-cib-genai.png',
    logo: '/assets/images/logo-cib.svg',
  },
  {
    id: '02',
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
    logo: '/assets/images/logo-cisco.svg',
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
    logo: '/assets/images/logo-cisco.svg',
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
    logo: '/assets/images/logo-huawei.svg',
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
    logo: '/assets/images/logo-iti.svg',
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
    logo: '/assets/images/logo-cisco.svg',
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
    logo: '/assets/images/logo-cisco.svg',
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
    logo: '/assets/images/logo-harvard.svg',
  },
];

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Escape key to close modal
  React.useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);
  return (
    <section
      id="certificates"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-12 py-20 sm:py-28 md:py-32 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <div className="w-full flex justify-center mb-12 sm:mb-16 md:mb-20">
            <TextReveal
              text="CERTIFICATES"
              mode="word"
              as="h2"
              className="font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight select-none max-w-full"
              style={{ fontSize: 'clamp(2.6rem, 10vw, 140px)' }}
            />
          </div>
        </FadeIn>

        {/* Interactive 3D Card Stack */}
        <FadeIn delay={0.1} y={30}>
          <CardStack
            items={certificatesData}
            onSelectCert={(cert) => setSelectedCert(cert)}
          />
        </FadeIn>
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
