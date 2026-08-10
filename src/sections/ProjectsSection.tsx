import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ExternalLink, FileText, ArrowUpRight } from 'lucide-react';
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
      'Internal network penetration testing against target 192.168.100.181 (Metasploitable 2). Identified and exploited 5 Critical-severity vulnerabilities (vsftpd 2.3.4 backdoor, Samba usermap_script RCE, Apache Tomcat default credentials, UnrealIRCD 3.2.8.1 backdoor, DistCC daemon RCE) to gain root/system access.',
    tech: ['Kali Linux', 'Metasploit', 'Nmap', 'Root Exploitation', 'VAPT Report'],
    link: '/assets/docs/professional.pdf',
    buttonLabel: 'View Report PDF',
    isPdf: true,
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
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
          </div>
        </div>

        {/* Single Main Showcase Image */}
        <div className="w-full h-[260px] sm:h-[380px] md:h-[480px] overflow-hidden rounded-[26px] sm:rounded-[36px] border border-[#D7E2EA]/10 bg-[#141518] relative z-10">
          <img
            src={project.image}
            alt={`${project.title} showcase`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
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
          />
        ))}
      </div>
    </section>
  );
};
