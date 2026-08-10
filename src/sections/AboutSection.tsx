import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import { TextReveal } from '../components/TextReveal';
import { CyberMesh3D } from '../components/CyberMesh3D';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax offsets for corner 3D floating icons
  const icon1Y = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const icon2Y = useTransform(scrollYProgress, [0, 1], [40, -50]);
  const icon3Y = useTransform(scrollYProgress, [0, 1], [-60, 50]);
  const icon4Y = useTransform(scrollYProgress, [0, 1], [30, -40]);

  const headingScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);

  const aboutText =
    "Cybersecurity professional with a strong foundation in network security, vulnerability assessment, web application security, wireless security testing, and cloud computing fundamentals. Hands-on experience conducting cybersecurity labs and building security-focused projects using industry-standard tools including Kali Linux, Nmap, Wireshark, Burp Suite, Metasploit Framework, Aircrack-ng, Hashcat, Cisco Packet Tracer, and Huawei security technologies. Certified by Cisco Networking Academy, Huawei ICT Academy, HarvardX, and ITI, with practical experience in enterprise networking, firewall configuration, penetration testing fundamentals, and secure web application development. Passionate about continuous learning, solving complex security challenges, and helping organizations strengthen their cybersecurity posture.";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden z-10"
    >
      {/* 3D Interactive Cyber Mesh Canvas */}
      <CyberMesh3D />
      {/* Decorative 3D icons in 4 corners with scroll parallax */}

      {/* Top-left: 3D Cybersecurity Shield */}
      <motion.div
        style={{ y: icon1Y }}
        className="absolute top-[3%] left-[1%] sm:left-[4%] md:left-[6%] z-10 pointer-events-none opacity-40 sm:opacity-100"
      >
        <img
          src="/assets/cybersecurity_shield_3d.png"
          alt="3D Cybersecurity Shield Icon"
          style={{ mixBlendMode: 'screen' }}
          className="w-[65px] sm:w-[140px] md:w-[200px] h-auto object-contain select-none filter drop-shadow-[0_0_25px_rgba(0,225,255,0.4)] transform-gpu"
        />
      </motion.div>

      {/* Bottom-left: 3D Cybersecurity Lock */}
      <motion.div
        style={{ y: icon2Y }}
        className="absolute bottom-[4%] left-[2%] sm:left-[6%] md:left-[8%] z-10 pointer-events-none opacity-40 sm:opacity-100"
      >
        <img
          src="/assets/cybersecurity_lock_3d.png"
          alt="3D Cybersecurity Padlock Icon"
          style={{ mixBlendMode: 'screen' }}
          className="w-[60px] sm:w-[130px] md:w-[180px] h-auto object-contain select-none filter drop-shadow-[0_0_25px_rgba(182,0,168,0.5)] transform-gpu"
        />
      </motion.div>

      {/* Top-right: 3D AI Neural Chip & Brain */}
      <motion.div
        style={{ y: icon3Y }}
        className="absolute top-[3%] right-[1%] sm:right-[4%] md:right-[6%] z-10 pointer-events-none opacity-40 sm:opacity-100"
      >
        <img
          src="/assets/ai_chip_brain_3d.png"
          alt="3D AI Chip Brain Icon"
          style={{ mixBlendMode: 'screen' }}
          className="w-[65px] sm:w-[140px] md:w-[200px] h-auto object-contain select-none filter drop-shadow-[0_0_25px_rgba(119,33,177,0.5)] transform-gpu"
        />
      </motion.div>

      {/* Bottom-right: 3D AI Sparkles Core */}
      <motion.div
        style={{ y: icon4Y }}
        className="absolute bottom-[4%] right-[2%] sm:right-[6%] md:right-[8%] z-10 pointer-events-none opacity-40 sm:opacity-100"
      >
        <img
          src="/assets/ai_sparkles_3d.png"
          alt="3D AI Sparkles Icon"
          style={{ mixBlendMode: 'screen' }}
          className="w-[65px] sm:w-[135px] md:w-[190px] h-auto object-contain select-none filter drop-shadow-[0_0_25px_rgba(0,200,255,0.5)] transform-gpu"
        />
      </motion.div>

      {/* Center Content Stack */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto w-full text-center">
        {/* Heading */}
        <motion.div style={{ scale: headingScale }} className="w-full flex justify-center">
          <TextReveal
            text="ABOUT ME"
            mode="word"
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none text-white max-w-full"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 150px)' }}
          />
        </motion.div>

        {/* Spacing gap between heading and text */}
        <div className="mt-8 sm:mt-12 md:mt-14 w-full flex justify-center px-2">
          <AnimatedText text={aboutText} />
        </div>

        {/* Stats Badges */}
        <FadeIn delay={0.15} y={20} className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
          <motion.div
            whileHover={{ y: -5, scale: 1.03 }}
            className="px-5 py-3 rounded-2xl bg-[#141518]/90 border border-[#D7E2EA]/15 flex items-center gap-3.5 backdrop-blur-md shadow-xl transition-all"
          >
            <span className="text-2xl sm:text-3xl font-black text-[#B600A8]">5+</span>
            <span className="text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/80 text-left leading-tight">
              Featured Projects<br />&amp; AI Platforms
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.03 }}
            className="px-5 py-3 rounded-2xl bg-[#141518]/90 border border-[#D7E2EA]/15 flex items-center gap-3.5 backdrop-blur-md shadow-xl transition-all"
          >
            <span className="text-2xl sm:text-3xl font-black text-[#00E1FF]">6+</span>
            <span className="text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/80 text-left leading-tight">
              Certifications &amp;<br />Credentials
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.03 }}
            className="px-5 py-3 rounded-2xl bg-[#141518]/90 border border-[#D7E2EA]/15 flex items-center gap-3.5 backdrop-blur-md shadow-xl transition-all"
          >
            <span className="text-2xl sm:text-3xl font-black text-[#7721B1]">100%</span>
            <span className="text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/80 text-left leading-tight">
              Security &amp; Clean<br />Code Commitment
            </span>
          </motion.div>
        </FadeIn>

        {/* Spacing gap between text block and button */}
        <div className="mt-12 sm:mt-16">
          <FadeIn delay={0.25} y={20}>
            <ContactButton onClick={onOpenContact} label="Let's Connect" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
