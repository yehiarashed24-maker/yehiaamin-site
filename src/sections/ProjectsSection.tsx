import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ExternalLink, FileText, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

interface ProjectData {
  number: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  buttonLabel: string;
  isPdf?: boolean;
  isOpenModal?: boolean;
  image: string;
}

const projects: ProjectData[] = [
  {
    number: '01',
    category: '(AI & WEB PLATFORM)',
    title: 'YA CV AI – Resume Builder & ATS Checker',
    description:
      'Full-stack AI-powered resume platform. Generates ATS-optimized CVs, evaluates resume scoring against ATS filters (95%+ target), provides intelligent feedback, and exports high-impact PDFs.',
    tech: ['Gemini API', 'Node.js', 'ATS Engine', 'PDF Export'],
    link: 'https://ya-cv-ai.onrender.com',
    buttonLabel: 'Try Tool',
    image: '/assets/images/ya-cv-ai-project.png',
  },
  {
    number: '02',
    category: '(LIVE AI BIO HUB)',
    title: 'NØURGINE – AI Bio Links & Creator Platform',
    description:
      'Next-generation Linktree alternative featuring dark purple glassmorphism UI, multi-platform social links (TikTok, Instagram, Twitch, YouTube, Kick), and custom embedded AI Assistant.',
    tech: ['HTML5/CSS3', 'JavaScript', 'AI Assistant', 'Glassmorphism'],
    link: 'https://nourgine-site.vercel.app',
    buttonLabel: 'Visit Site',
    image: '/assets/images/nourgine-project.png',
  },
  {
    number: '03',
    category: '(CYBERSECURITY LAB)',
    title: 'Wi-Fi Penetration Testing',
    description:
      'Wireless network security assessment in a controlled environment using Kali Linux on macOS. Evaluated WPA2/WPA3 encryption, captured WPA handshakes/PMKID, and conducted password testing.',
    tech: ['Kali Linux', 'Aircrack-ng', 'Wifite', 'Hashcat'],
    link: '/assets/docs/wifi-crack-report.pdf',
    buttonLabel: 'View Report PDF',
    isPdf: true,
    image: '/assets/images/wifi-project.png',
  },
  {
    number: '04',
    category: '(SECURITY AWARENESS)',
    title: 'Phishing Attack Simulation',
    description:
      'Documented phishing simulation and social engineering testing performed in a controlled lab environment. Utilized Zphisher, SET Toolkit, and URL shorteners to test victim interaction and credential harvesting.',
    tech: ['Zphisher', 'SET Toolkit', 'Kali Linux', 'URL Shorteners'],
    link: '/assets/docs/phishing-attack-report.pdf',
    buttonLabel: 'View Report PDF',
    isPdf: true,
    image: '/assets/images/phishing-project.png',
  },
  {
    number: '05',
    category: '(NETWORK VAPT LAB)',
    title: 'Metasploitable 2 Penetration Testing Report',
    description:
      'Internal network penetration testing against target 192.168.100.181 (Metasploitable 2) conducted by Pharaohs Security Team. Uncovered and validated 12 high-impact vulnerabilities (10 Critical, 2 High) including vsftpd 2.3.4 backdoor, Samba usermap script RCE, UnrealIRCd, DistCC, Tomcat Manager, Java RMI, Bind Shell, and NFS root export.',
    tech: ['Kali Linux', 'Metasploit', 'Nmap', 'CVSS 10.0', '12 Findings', 'Pharaohs Team'],
    link: '/assets/docs/professional.pdf',
    buttonLabel: 'Explore Full Report',
    isPdf: true,
    isOpenModal: true,
    image: '/assets/images/metasploitable-project.png',
  },
  {
    number: '06',
    category: '(MOBILE SECURITY LAB)',
    title: 'Android Security Testing Lab',
    description:
      'Controlled Android security testing in an isolated lab. Observed Meterpreter sessions on Genymotion Android emulators via Metasploit, inspecting post-exploitation capabilities & forensic artifacts.',
    tech: ['Kali Linux', 'Genymotion', 'Metasploit', 'Meterpreter'],
    link: '/assets/docs/Professional_Android_Penetration_Testing_Report.pdf',
    buttonLabel: 'View Report PDF',
    isPdf: true,
    image: '/assets/images/android-project.png',
  },
  {
    number: '07',
    category: '(HEALTHCARE AI & RAG)',
    title: 'Sakina AI – Mental Wellness Assistant',
    description:
      'Evidence-grounded mental wellness assistant using RAG, trusted-source citations, safety classification, crisis handling, and bilingual Arabic/English interaction. Designed with end-to-end security controls for inputs, APIs, secrets, and AI workflows.',
    tech: ['RAG', 'LangChain', 'ChromaDB', 'Gemini API', 'Bilingual AI', 'Crisis Safety'],
    link: 'https://drive.google.com/drive/u/0/folders/1ehV2zKH38_5BdXAjiDMmzIDPHK5Li08M',
    buttonLabel: 'Explore Project Drive',
    image: '/assets/images/sakina-project.png',
  },
  {
    number: '08',
    category: '(EDTECH & MULTIMODAL GENAI)',
    title: 'Nabta AI – Smart Study Workspace',
    description:
      'Grounded GenAI study workspace that turns PDFs and notes into source-backed explanations, study guides, quizzes, mastery tracking, Voice Tutor, and AI Viva. Designed with end-to-end security controls for uploaded content, retrieval, APIs, and AI interactions.',
    tech: ['Next.js / React', 'Gemini API', 'RAG Workspace', 'Voice Tutor', 'AI Viva'],
    link: 'https://nabta-ai-eg.vercel.app',
    buttonLabel: 'Visit Live App',
    image: '/assets/images/nabta-project.png',
  },
  {
    number: '09',
    category: '(ACCESSIBILITY & VISION AI)',
    title: 'NOR AI – Voice-First Visual Assistant',
    description:
      'Voice-first visual assistant for blind and visually impaired users using multimodal AI for scene understanding, OCR, currency/product assistance, color recognition, and spoken Arabic/English interaction. Designed with end-to-end security and privacy controls for camera data, APIs, and user interactions.',
    tech: ['Multimodal AI', 'Computer Vision', 'Voice Assistant', 'OCR Engine', 'Privacy Controls'],
    link: 'https://nor-ai-azure.vercel.app',
    buttonLabel: 'Visit Live App',
    image: '/assets/images/nor-project.png',
  },
];

interface ProjectsSectionProps {
  onOpenMetasploitReport?: () => void;
}

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onOpenMetasploit?: () => void;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards, onOpenMetasploit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMetasploit = project.number === '05';

  const targetScale = 1 - (totalCards - 1 - index) * 0.025;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const stickyTop = `calc(5rem + ${index * 22}px)`;

  // 3D Tilt calculation
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(rawX, { damping: 25, stiffness: 200 });
  const rotateY = useSpring(rawY, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY - height / 2) / height) * -6; // max 6 deg
    const rY = ((mouseX - width / 2) / width) * 6;   // max 6 deg

    rawX.set(rX);
    rawY.set(rY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const width = rect.width;
    const height = rect.height;
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    const rX = ((mouseY - height / 2) / height) * -5;
    const rY = ((mouseX - width / 2) / width) * 5;

    rawX.set(rX);
    rawY.set(rY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="sticky mb-16 md:mb-24 flex items-center justify-center perspective-1000"
      style={{ top: stickyTop }}
    >
      <motion.div
        ref={cardRef}
        style={{
          scale,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        data-cursor="project"
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-5 sm:p-7 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-all duration-300 group hover:border-[#B600A8]/60 relative overflow-hidden"
      >
        {/* Subtle hover gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#B600A8]/5 via-transparent to-[#00E1FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Row: Number, Category, Project Name, Action button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-[#D7E2EA]/15 pb-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-6">
              <span
                className="font-black text-[#D7E2EA] group-hover:text-[#B600A8] transition-colors duration-300 leading-none select-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                {project.number}
              </span>
              <span className="text-[#D7E2EA]/70 font-light uppercase tracking-wider text-xs sm:text-sm md:text-base">
                {project.category}
              </span>
            </div>
            <h3 className="text-white font-bold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
              {project.title}
            </h3>
            <p className="text-[#D7E2EA]/70 font-light text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed mt-1">
              {project.description}
            </p>
            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full border border-[#D7E2EA]/20 bg-[#141518] text-[#D7E2EA] text-xs uppercase tracking-wider font-medium hover:border-[#B600A8]/50 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link Button */}
          <div className="self-start lg:self-center flex-shrink-0 mt-2 lg:mt-0">
            {isMetasploit && onOpenMetasploit ? (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={onOpenMetasploit}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#B600A8] text-white font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 hover:bg-[#96008b] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(182,0,168,0.4)] group/btn cursor-pointer"
                >
                  <ShieldAlert size={16} />
                  <span>Explore Full Report</span>
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
                <a
                  href={project.link}
                  download="Metasploitable_2_Penetration_Test_Report_Pharaohs.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-[#D7E2EA]/30 bg-[#141518] text-[#D7E2EA] font-semibold uppercase text-xs tracking-wider transition-all duration-300 hover:border-[#00E1FF] hover:text-[#00E1FF] hover:scale-105 active:scale-95 shadow-md"
                  title="Download Official 20-Page PDF"
                >
                  <FileText size={15} />
                  <span>PDF (20P)</span>
                </a>
              </div>
            ) : (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#D7E2EA] text-[#0C0C0C] font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 hover:bg-[#B600A8] hover:text-white hover:scale-105 active:scale-95 shadow-lg group/btn"
              >
                {project.isPdf ? <FileText size={16} /> : <ExternalLink size={16} />}
                <span>{project.buttonLabel}</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Single Main Showcase Image */}
        <div
          onClick={() => {
            if (isMetasploit && onOpenMetasploit) onOpenMetasploit();
          }}
          className={`w-full h-[260px] sm:h-[380px] md:h-[480px] overflow-hidden rounded-[26px] sm:rounded-[36px] border border-[#D7E2EA]/10 bg-[#141518] relative z-10 ${
            isMetasploit ? 'cursor-pointer group/img' : ''
          }`}
        >
          <img
            src={project.image}
            alt={`${project.title} showcase`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {isMetasploit && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="px-5 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-[#B600A8] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl">
                <ShieldAlert size={16} className="text-[#B600A8]" />
                Click to Open Interactive Report
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenMetasploitReport }) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-12 pt-24 pb-32"
    >
      {/* Heading: "Projects" */}
      <div className="max-w-6xl mx-auto w-full mb-16 sm:mb-20 md:mb-24 text-center">
        <FadeIn delay={0} y={40}>
          <div className="w-full flex justify-center">
            <TextReveal
              text="PROJECTS"
              mode="word"
              as="h2"
              className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none text-white max-w-full"
              style={{ fontSize: 'clamp(2.8rem, 11vw, 150px)' }}
            />
          </div>
        </FadeIn>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="max-w-6xl mx-auto w-full relative">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={projects.length}
            onOpenMetasploit={onOpenMetasploitReport}
          />
        ))}
      </div>
    </section>
  );
};
