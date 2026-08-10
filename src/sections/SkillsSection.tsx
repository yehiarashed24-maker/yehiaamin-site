import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { SkillSphere3D } from '../components/SkillSphere3D';

interface SkillCategory {
  number: string;
  name: string;
  description: string;
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    number: '01',
    name: 'Security',
    description:
      'Vulnerability assessment, web application security testing, penetration testing fundamentals, and wireless network security auditing.',
    skills: ['Vulnerability Assessment', 'Web Application Security', 'Penetration Testing', 'Wireless Security'],
  },
  {
    number: '02',
    name: 'Tools',
    description:
      'Industry-standard security auditing, packet inspection, exploitation frameworks, and wireless penetration testing tools.',
    skills: [
      'Nmap',
      'Wireshark',
      'Burp Suite',
      'Metasploit Framework',
      'Aircrack-ng',
      'Wifite',
      'Hashcat',
      'Bettercap',
    ],
  },
  {
    number: '03',
    name: 'Networking',
    description:
      'Enterprise networking architecture, core protocols, routing & switching, VLAN segmentation, ACLs, and firewall configuration.',
    skills: [
      'TCP/IP',
      'DNS',
      'DHCP',
      'Routing & Switching',
      'VLANs',
      'ACLs',
      'Firewall Configuration',
    ],
  },
  {
    number: '04',
    name: 'Programming',
    description:
      'Developing security scripts, automation, full-stack web applications, RESTful APIs, and responsive front-end interfaces.',
    skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express.js'],
  },
  {
    number: '05',
    name: 'Platforms',
    description:
      'Security operating systems, virtualized penetration testing lab environments, and cloud infrastructure management.',
    skills: ['Linux (Kali)', 'Windows', 'macOS', 'VMware', 'AWS'],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-28 md:py-32 relative z-0 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight mb-8 sm:mb-12 select-none max-w-full overflow-hidden"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 150px)' }}
          >
            Skills
          </h2>
        </FadeIn>

        {/* 3D Interactive Skill Sphere */}
        <FadeIn delay={0.1} y={20}>
          <div className="my-4 p-4 rounded-3xl bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/60 font-semibold mb-1">
              Interactive 3D Skill Cloud • Drag / Move Cursor
            </span>
            <SkillSphere3D />
          </div>
        </FadeIn>

        {/* Skills Vertical Editorial List */}
        <div className="flex flex-col">
          {skillsData.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.08} y={35}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`group flex flex-col md:flex-row md:items-start justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] transition-colors duration-300 ${
                  index === 0 ? 'border-t border-[rgba(12,12,12,0.15)]' : ''
                }`}
              >
                {/* Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="font-black text-[#0C0C0C] group-hover:text-[#B600A8] transition-colors duration-300 leading-none mb-4 md:mb-0 md:w-1/3 flex-shrink-0 select-none"
                  style={{ fontSize: 'clamp(2.8rem, 9.5vw, 130px)' }}
                >
                  {item.number}
                </motion.div>

                {/* Name + Description + Skill Badges */}
                <div className="flex flex-col md:w-2/3 space-y-4">
                  <h3
                    className="font-bold uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-75"
                    style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1.2rem)' }}
                  >
                    {item.description}
                  </p>

                  {/* Interactive Micro-Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-3.5 py-1.5 rounded-full border border-[#0C0C0C]/20 bg-[#0C0C0C]/5 text-[#0C0C0C] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0C0C0C] hover:text-white hover:border-[#0C0C0C] hover:shadow-md cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
