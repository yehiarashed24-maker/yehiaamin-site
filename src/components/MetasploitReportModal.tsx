import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Server,
  Terminal,
  Search,
  Users,
  CheckCircle2,
  FileText,
  ChevronDown,
  Layers,
  Wrench,
  Clock,
  Flame,
  Radio,
  Copy,
  Check,
} from 'lucide-react';

interface Finding {
  id: number;
  section: string;
  title: string;
  service: string;
  port: string;
  severity: 'Critical' | 'High';
  cvss: string;
  impact: string;
  validation: string;
  exploitModule?: string;
  description: string;
  technicalDetails: string;
  exploitationSummary: string;
  businessImpact: string;
  recommendation: string;
}

const findingsData: Finding[] = [
  {
    id: 1,
    section: '5.1',
    title: 'VSFTPD 2.3.4 Backdoor Remote Code Execution',
    service: 'FTP',
    port: '21',
    severity: 'Critical',
    cvss: '10.0',
    impact: 'Remote root access',
    validation: 'Backdoor validation',
    exploitModule: 'exploit/unix/ftp/vsftpd_234_backdoor',
    description:
      'The exposed FTP service identified itself as VSFTPD 2.3.4, a version associated with a maliciously modified distribution that can expose an unauthenticated command channel.',
    technicalDetails:
      'Version and banner information were consistent with the affected release. Controlled validation confirmed that the service accepted the known backdoor trigger within the isolated lab scope.',
    exploitationSummary:
      'Metasploit Framework was used in a controlled lab workflow to validate remote code execution without conducting persistence, lateral movement, or data exfiltration.',
    businessImpact:
      'An internal attacker could obtain root-level control of the host, alter system configuration, access data, and use the host as a pivot point.',
    recommendation:
      'Immediately retire the service or upgrade from trusted packages. Restrict FTP access, require encrypted alternatives, and verify software integrity against an approved baseline.',
  },
  {
    id: 2,
    section: '5.2',
    title: 'Samba Usermap Script Remote Code Execution',
    service: 'SMB',
    port: '139 / 445',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Remote command execution',
    validation: 'Metasploit validation',
    exploitModule: 'exploit/multi/samba/usermap_script',
    description:
      'The SMB service was consistent with a Samba configuration vulnerable to command execution through unsafe usermap script processing.',
    technicalDetails:
      'Service enumeration identified legacy SMB exposure on TCP 139 and 445. Validation confirmed the vulnerable code path without attempting post-exploitation actions.',
    exploitationSummary:
      'A framework-assisted validation was performed against the approved target only. The result demonstrated command execution at the service account context.',
    businessImpact:
      'Remote command execution can enable credential access, host takeover, malware deployment, and lateral movement across the internal network.',
    recommendation:
      'Upgrade Samba to a supported release, remove unsafe usermap script settings, limit SMB to approved segments, and disable legacy protocols.',
  },
  {
    id: 3,
    section: '5.3',
    title: 'UnrealIRCd 3.2.8.1 Backdoor',
    service: 'IRC',
    port: '6667 / 6697',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Remote code execution',
    validation: 'Backdoor validation',
    exploitModule: 'exploit/unix/irc/unreal_ircd_3281_backdoor',
    description:
      'The IRC daemon presented a version associated with a known supply-chain backdoor that permits unauthenticated command execution.',
    technicalDetails:
      'Banner enumeration identified UnrealIRCd 3.2.8.1. The service behavior matched the known affected distribution in the assessment environment.',
    exploitationSummary:
      'A controlled exploit validation was performed with Metasploit. No persistence, user interaction, or external communication was attempted.',
    businessImpact:
      'An attacker who can reach the IRC service may execute operating-system commands and gain a foothold without valid credentials.',
    recommendation:
      'Remove the affected daemon, rebuild from a verified source, rotate service credentials, and restrict IRC services through internal firewall policy.',
  },
  {
    id: 4,
    section: '5.4',
    title: 'DistCC Daemon Command Execution',
    service: 'DistCC',
    port: '3632',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Arbitrary command execution',
    validation: 'Protocol validation',
    exploitModule: 'exploit/unix/misc/distcc_exec',
    description:
      'The distributed compiler daemon was exposed to the internal network without authentication, enabling arbitrary command execution through the compilation protocol.',
    technicalDetails:
      'TCP 3632 was reachable and service fingerprinting identified DistCC. The daemon accepted an authorized test request consistent with command execution capability.',
    exploitationSummary:
      'Validation used a controlled request to demonstrate impact only; it did not alter files, establish persistence, or access adjacent systems.',
    businessImpact:
      'An unauthenticated network user could execute system commands and potentially escalate to full host compromise.',
    recommendation:
      'Disable DistCC where it is not required. If retained, bind it to localhost or a tightly controlled build segment and enforce host-based firewall rules.',
  },
  {
    id: 5,
    section: '5.5',
    title: 'Apache Tomcat Manager Deployment RCE',
    service: 'Tomcat',
    port: '8180',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Remote code execution',
    validation: 'Manager deployment validation',
    exploitModule: 'exploit/multi/http/tomcat_mgr_deploy',
    description:
      'The Tomcat Manager interface was accessible on an alternate HTTP port and exposed a deployment path that can permit server-side code execution when weak or default credentials are present.',
    technicalDetails:
      'Enumeration identified the manager endpoint over TCP 8180. Authentication posture and deployment capability were assessed in the lab environment.',
    exploitationSummary:
      'Metasploit was used to validate the deployment-based execution path under controlled conditions, without changing production-like application content.',
    businessImpact:
      'Successful deployment of a malicious application archive can give an attacker durable access to the web server and applications hosted on it.',
    recommendation:
      'Remove Manager from non-administrative exposure, enforce strong unique credentials and MFA where possible, restrict management IPs, and keep Tomcat patched.',
  },
  {
    id: 6,
    section: '5.6',
    title: 'Java RMI Remote Code Execution',
    service: 'Java RMI',
    port: '1099',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Remote system compromise',
    validation: 'RMI enumeration validation',
    exploitModule: 'exploit/multi/misc/java_rmi_server',
    description:
      'The Java Remote Method Invocation registry was exposed to the internal network, creating a high-risk interface for unsafe remote object interactions.',
    technicalDetails:
      'Service enumeration confirmed a reachable RMI registry on TCP 1099. The exposed registry information supported the feasibility of remote attack paths.',
    exploitationSummary:
      'Controlled validation was limited to registry enumeration and proof of reachable attack surface; no unsafe deserialization payloads were executed.',
    businessImpact:
      'A vulnerable RMI implementation can permit remote code execution, compromise application secrets, and provide a pathway to full host control.',
    recommendation:
      'Restrict RMI to trusted application hosts, update Java and application frameworks, disable remote class loading, and enforce network-level allowlists.',
  },
  {
    id: 7,
    section: '5.7',
    title: 'PostgreSQL Payload Execution',
    service: 'PostgreSQL',
    port: '5432',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Database server compromise',
    validation: 'Authenticated execution validation',
    exploitModule: 'exploit/linux/postgres/postgres_payload',
    description:
      'The PostgreSQL service was reachable from the assessed internal segment and configured in a manner that could support server-side payload execution after authentication or credential compromise.',
    technicalDetails:
      'TCP 5432 was identified during enumeration. Service exposure and authentication controls were reviewed against common server-side execution risks.',
    exploitationSummary:
      'A controlled assessment workflow validated the security impact in the lab without modifying business data or retaining database access.',
    businessImpact:
      'Compromise of the database service could expose sensitive records, allow server-side command execution, and disrupt application availability.',
    recommendation:
      'Restrict database listener exposure, use strong least-privilege roles, remove unnecessary extensions and superuser access, and monitor privileged database activity.',
  },
  {
    id: 8,
    section: '5.8',
    title: 'VNC Weak Authentication Exposure',
    service: 'VNC',
    port: '5900',
    severity: 'High',
    cvss: '8.1',
    impact: 'Unauthorized remote desktop access',
    validation: 'Authentication review',
    exploitModule: 'auxiliary/scanner/vnc/vnc_login',
    description:
      'The VNC service was reachable over the internal network and lacked sufficient authentication hardening to provide confidence against unauthorized desktop access.',
    technicalDetails:
      'TCP 5900 was exposed and service enumeration confirmed VNC availability. The configuration presented a weak remote-access control surface.',
    exploitationSummary:
      'Testing was limited to service discovery and controlled authentication posture assessment; no interactive desktop session was retained.',
    businessImpact:
      'A successful attacker could view and control the desktop, access local files, capture credentials, and operate under the user context.',
    recommendation:
      'Disable VNC if not essential. Otherwise require strong unique credentials, encrypted tunnels, source IP restrictions, account lockout, and monitored access.',
  },
  {
    id: 9,
    section: '5.9',
    title: 'PHP CGI Argument Injection',
    service: 'Apache / PHP',
    port: '80',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Remote code execution',
    validation: 'HTTP request validation',
    exploitModule: 'exploit/multi/http/php_cgi_arg_injection',
    description:
      'The web server exposed a PHP CGI configuration associated with argument injection, allowing crafted requests to influence PHP runtime behavior.',
    technicalDetails:
      'HTTP enumeration identified Apache/PHP exposure. The reachable handler and response characteristics were consistent with the vulnerable CGI attack surface.',
    exploitationSummary:
      'A safe validation request was used to confirm the condition in the lab. No web-shell deployment, file modification, or application data access was performed.',
    businessImpact:
      'An unauthenticated attacker could execute commands through the web server, steal application secrets, deface content, or use the host as a pivot.',
    recommendation:
      'Upgrade PHP and Apache, disable CGI where unnecessary, use supported FPM configurations, enforce WAF controls, and review web service permissions.',
  },
  {
    id: 10,
    section: '5.10',
    title: 'Bind Shell Exposure',
    service: 'Bind Shell',
    port: '1524',
    severity: 'Critical',
    cvss: '10.0',
    impact: 'Root shell access',
    validation: 'Connection validation',
    exploitModule: 'payload/cmd/unix/bind_ruby (Direct Port 1524)',
    description:
      'A bind shell was exposed on TCP 1524, representing an intentionally dangerous remote administration interface with no acceptable business justification.',
    technicalDetails:
      'Network enumeration detected an open listener consistent with a bind shell. The endpoint was reachable from the internal test segment.',
    exploitationSummary:
      'A controlled connection was used solely to confirm shell exposure and associated privilege level. No commands affecting system state were executed.',
    businessImpact:
      'Any reachable attacker could gain immediate command-line access, potentially at root privilege, with no need to exploit another vulnerability.',
    recommendation:
      'Remove the bind shell immediately, investigate the host for compromise, rebuild from a known-good image, rotate credentials, and add detection coverage.',
  },
  {
    id: 11,
    section: '5.11',
    title: 'Apache Tomcat AJP Ghostcat',
    service: 'AJP',
    port: '8009',
    severity: 'High',
    cvss: '7.5',
    impact: 'Sensitive file disclosure',
    validation: 'AJP exposure validation',
    exploitModule: 'auxiliary/admin/http/tomcat_ghostcat',
    description:
      'The AJP connector was exposed and presented the file-read risk commonly associated with Ghostcat when required secrets or access controls are not enforced.',
    technicalDetails:
      'TCP 8009 was reachable and identified as AJP. The service exposure created an unnecessary internal attack surface for connector-level requests.',
    exploitationSummary:
      'The assessment validated exposure and risk indicators only. No confidential application files were retrieved beyond the minimum necessary to confirm scope.',
    businessImpact:
      'An attacker may retrieve sensitive application files, configuration data, or use file disclosure to support a subsequent compromise.',
    recommendation:
      'Disable AJP if unused. Otherwise bind it to localhost, require a strong connector secret, upgrade Tomcat, and limit network reachability.',
  },
  {
    id: 12,
    section: '5.12',
    title: 'NFS Root Filesystem Export',
    service: 'NFS',
    port: '2049',
    severity: 'Critical',
    cvss: '9.8',
    impact: 'Filesystem exposure',
    validation: 'Showmount validation',
    exploitModule: 'auxiliary/scanner/nfs/nfsmount',
    description:
      'NFS exports exposed filesystem paths to the internal network with controls insufficient to protect sensitive system content or prevent privilege abuse.',
    technicalDetails:
      'Showmount and service enumeration identified reachable NFS exports over TCP 2049. Export configuration exposed a high-value pathway to the target filesystem.',
    exploitationSummary:
      'Controlled lab validation confirmed export availability only. Mounting and review were restricted to the minimum evidence required for the report.',
    businessImpact:
      'An attacker could access sensitive files, abuse weak export permissions, obtain credentials, or modify content depending on export options.',
    recommendation:
      'Restrict exports to explicit trusted hosts, enable root squashing, use least-privilege permissions, remove nonessential exports, and monitor mount activity.',
  },
];

const teamMembers = [
  { name: 'Yehia Mohamed Amin', role: 'Lead Security Tester & Penetration Tester' },
  { name: 'Mariam Seddiq Motawaa', role: 'Security Researcher & Exploitation Specialist' },
  { name: 'Menna Ashraf Shaban', role: 'Vulnerability Analyst & Report Co-Author' },
  { name: 'Rana Khaled Khalifa', role: 'Network Security Analyst' },
  { name: 'Sama Tarek Ahmed', role: 'Documentation & Mitigation Strategist' },
];

const toolsUsed = [
  { name: 'Nmap', desc: 'Port, service, and version enumeration' },
  { name: 'Metasploit Framework', desc: 'Controlled exploit validation and payload delivery' },
  { name: 'Netcat', desc: 'Network connectivity and listener validation' },
  { name: 'Curl', desc: 'HTTP service assessment and header inspection' },
  { name: 'Showmount', desc: 'NFS export discovery and mount verification' },
];

interface MetasploitReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetasploitReportModal: React.FC<MetasploitReportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'findings' | 'matrix' | 'remediation' | 'pdf'>('overview');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'Critical' | 'High'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFinding, setExpandedFinding] = useState<number | null>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredFindings = findingsData.filter((f) => {
    const matchesSeverity = severityFilter === 'ALL' || f.severity === severityFilter;
    const matchesQuery =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.port.includes(searchQuery) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesQuery;
  });

  const handleCopyModule = (id: number, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-5xl my-auto bg-[#0E1015] border border-[#262A34] rounded-[28px] sm:rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-[#D7E2EA] z-10 max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-7 border-b border-[#222631] bg-[#12151C]/90 backdrop-blur-md relative z-20">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <ShieldAlert size={26} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] tracking-widest font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                      CONFIDENTIAL REPORT
                    </span>
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8B949E]">
                      Target: 192.168.100.181 (Metasploitable 2)
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    PHARAOHS SECURITY TEAM
                  </h2>
                  <p className="text-xs text-[#9DA7B3]">
                    Internal Penetration Test Report &bull; August 23, 2026
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <a
                  href="/assets/docs/professional.pdf"
                  download="Metasploitable_2_Penetration_Test_Report_Pharaohs.pdf"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#B600A8] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#96008b] transition-all shadow-[0_0_15px_rgba(182,0,168,0.4)]"
                  title="Download 20-Page Report PDF"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <a
                  href="/assets/docs/professional.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1C202A] text-[#D7E2EA] border border-[#2D3342] text-xs uppercase tracking-wider font-semibold hover:bg-[#252B38] transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={14} />
                  <span className="hidden md:inline">Open PDF</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-[#1C202A] text-[#8B949E] hover:text-white hover:bg-[#252B38] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-4 sm:px-7 bg-[#101218] border-b border-[#222631]">
              <div className="p-3 rounded-xl bg-[#161922] border border-[#262B37] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                  <Flame size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#8B949E] tracking-wider">Overall Risk</div>
                  <div className="text-xs sm:text-sm font-extrabold text-red-400 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    CRITICAL
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#161922] border border-[#262B37] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Terminal size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#8B949E] tracking-wider">Total Findings</div>
                  <div className="text-xs sm:text-sm font-extrabold text-white">
                    12 <span className="text-[11px] font-normal text-[#8B949E]">(10 Crit, 2 High)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#161922] border border-[#262B37] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Radio size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#8B949E] tracking-wider">Highest CVSS</div>
                  <div className="text-xs sm:text-sm font-extrabold text-amber-300">10.0 (Root Shell)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#161922] border border-[#262B37] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Server size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#8B949E] tracking-wider">Assessment Team</div>
                  <div className="text-xs sm:text-sm font-extrabold text-white">5 Specialists</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-4 sm:px-7 pt-3 border-b border-[#222631] overflow-x-auto bg-[#0E1015]">
              {[
                { id: 'overview', label: '1. Executive Overview', icon: FileText },
                { id: 'findings', label: `2. Technical Findings (${findingsData.length})`, icon: ShieldAlert },
                { id: 'matrix', label: '3. Risk Matrix', icon: Layers },
                { id: 'remediation', label: '4. Remediation Plan', icon: Wrench },
                { id: 'pdf', label: '5. Original PDF (20 Pages)', icon: Download },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
                      isActive
                        ? 'border-[#B600A8] text-white bg-[#191D26] rounded-t-lg'
                        : 'border-transparent text-[#8B949E] hover:text-[#D7E2EA] hover:bg-[#14161E] rounded-t-lg'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-[#B600A8]' : ''} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6">
              {/* TAB 1: EXECUTIVE OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Executive Summary */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#14161F] border border-[#242938]">
                    <div className="flex items-center gap-2.5 mb-3 text-white font-bold text-base sm:text-lg">
                      <FileText className="text-[#B600A8]" size={20} />
                      <h3>Executive Summary &amp; Management Overview</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#B4BAC5] leading-relaxed mb-3">
                      <strong>Pharaohs Security Team</strong> performed an internal network penetration test of{' '}
                      <code className="text-[#00E1FF] bg-[#1D2230] px-1.5 py-0.5 rounded font-mono">
                        192.168.100.181
                      </code>
                      , a Metasploitable 2 laboratory target. The objective was to identify materially exploitable
                      weaknesses, validate their impact under controlled conditions, and provide prioritized remediation
                      guidance.
                    </p>
                    <p className="text-xs sm:text-sm text-[#B4BAC5] leading-relaxed">
                      The target exhibits a <strong className="text-red-400">CRITICAL security posture</strong>. Multiple legacy,
                      exposed, and insecure services permitted plausible unauthorized access and full system compromise. The
                      combination of backdoored services, unauthenticated command execution paths, weak remote access
                      controls, and exposed filesystem services creates numerous independent routes to root-level compromise.
                    </p>
                  </div>

                  {/* Business Impact Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#14161F] border border-[#242938]">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <AlertTriangle className="text-amber-400" size={16} />
                        Business Impact
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#9DA7B3]">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                          <span>Complete root takeover enables unauthorized access to applications, credentials, and sensitive records.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                          <span>Multiple remote command execution paths allow malware deployment, lateral movement, and host pivoting.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                          <span>Unprotected database, NFS, and remote desktop services risk total data loss and operational shutdown.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#14161F] border border-[#242938]">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Clock className="text-[#00E1FF]" size={16} />
                        Executive Conclusion
                      </h4>
                      <p className="text-xs sm:text-sm text-[#9DA7B3] leading-relaxed mb-3">
                        Successful controlled validation demonstrated that multiple critical vulnerabilities allow immediate
                        unauthorized access and root takeover.
                      </p>
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                        <strong>Action Required:</strong> Immediate containment and host isolation are warranted before the
                        machine is placed in any reachable network segment. Risk acceptance is not recommended.
                      </div>
                    </div>
                  </div>

                  {/* Assessment Team & Methodology */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Team */}
                    <div className="p-5 rounded-2xl bg-[#14161F] border border-[#242938]">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Users className="text-[#B600A8]" size={16} />
                        Pharaohs Security Assessment Team
                      </h4>
                      <div className="space-y-2.5">
                        {teamMembers.map((member, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1D27] border border-[#262B39]"
                          >
                            <span className="text-xs sm:text-sm font-bold text-white">{member.name}</span>
                            <span className="text-[10px] text-[#8B949E] uppercase font-semibold">{member.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools & Scope */}
                    <div className="p-5 rounded-2xl bg-[#14161F] border border-[#242938]">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Terminal className="text-[#00E1FF]" size={16} />
                        Tools &amp; Assessment Methodology
                      </h4>
                      <div className="space-y-2 mb-4">
                        {toolsUsed.map((tool, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-[#1A1D27] border border-[#262B39] flex items-center justify-between text-xs"
                          >
                            <span className="font-bold text-[#00E1FF] font-mono">{tool.name}</span>
                            <span className="text-[#8B949E] text-[11px] text-right">{tool.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] text-[#8B949E] bg-[#101218] p-3 rounded-xl border border-[#202430]">
                        <strong className="text-white">Methodology:</strong> Reconnaissance &rarr; Port &amp; Service Fingerprinting &rarr; Vulnerability Correlation &rarr; Controlled Lab Exploitation &rarr; Impact Assessment &rarr; Actionable Remediation.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TECHNICAL FINDINGS (12) */}
              {activeTab === 'findings' && (
                <div className="space-y-4">
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#14161F] border border-[#242938]">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B949E]" />
                      <input
                        type="text"
                        placeholder="Search findings (e.g., vsftpd, Tomcat, Samba, 21, RCE)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#1A1D27] rounded-xl text-xs sm:text-sm text-white placeholder-[#606775] border border-[#2A3040] focus:outline-none focus:border-[#B600A8]"
                      />
                    </div>

                    {/* Severity Filters */}
                    <div className="flex items-center gap-1.5 self-center sm:self-auto">
                      {(['ALL', 'Critical', 'High'] as const).map((sev) => (
                        <button
                          key={sev}
                          onClick={() => setSeverityFilter(sev)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            severityFilter === sev
                              ? sev === 'Critical'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                : sev === 'High'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-[#B600A8]/20 text-white border border-[#B600A8]'
                              : 'bg-[#1A1D27] text-[#8B949E] border border-transparent hover:text-white'
                          }`}
                        >
                          {sev === 'ALL' ? 'All (12)' : sev === 'Critical' ? 'Critical (10)' : 'High (2)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Findings Accordion */}
                  <div className="space-y-3">
                    {filteredFindings.map((finding) => {
                      const isExpanded = expandedFinding === finding.id;
                      const isCritical = finding.severity === 'Critical';

                      return (
                        <div
                          key={finding.id}
                          className={`rounded-2xl transition-all duration-200 border ${
                            isExpanded
                              ? isCritical
                                ? 'bg-[#161823] border-red-500/40 shadow-[0_4px_25px_rgba(239,68,68,0.1)]'
                                : 'bg-[#161823] border-amber-500/40'
                              : 'bg-[#14161F] border-[#242938] hover:border-[#353C4E]'
                          }`}
                        >
                          {/* Finding Header */}
                          <div
                            onClick={() => setExpandedFinding(isExpanded ? null : finding.id)}
                            className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[#1C202B] text-[#8B949E] border border-[#2B3142]">
                                {finding.section}
                              </span>
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span
                                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                                      isCritical
                                        ? 'bg-red-500/15 text-red-400 border-red-500/30'
                                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                    }`}
                                  >
                                    {finding.severity} &bull; CVSS {finding.cvss}
                                  </span>
                                  <span className="text-[11px] text-[#8B949E] font-mono">
                                    {finding.service} (Port {finding.port})
                                  </span>
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                                  {finding.title}
                                </h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <ChevronDown
                                size={18}
                                className={`text-[#8B949E] transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180 text-white' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {/* Expanded Details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-4 sm:px-6 pb-6 pt-1 border-t border-[#232734] space-y-4"
                              >
                                {/* Quick Meta Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                  <div className="p-2.5 rounded-xl bg-[#1A1D27] border border-[#2B3142]">
                                    <span className="text-[10px] uppercase text-[#8B949E] font-bold block">Service</span>
                                    <span className="font-semibold text-white">{finding.service}</span>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-[#1A1D27] border border-[#2B3142]">
                                    <span className="text-[10px] uppercase text-[#8B949E] font-bold block">Target Port</span>
                                    <span className="font-mono text-[#00E1FF]">{finding.port}</span>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-[#1A1D27] border border-[#2B3142]">
                                    <span className="text-[10px] uppercase text-[#8B949E] font-bold block">Business Impact</span>
                                    <span className="font-semibold text-red-300">{finding.impact}</span>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-[#1A1D27] border border-[#2B3142]">
                                    <span className="text-[10px] uppercase text-[#8B949E] font-bold block">Validation</span>
                                    <span className="font-semibold text-emerald-300">{finding.validation}</span>
                                  </div>
                                </div>

                                {/* Metasploit module helper */}
                                {finding.exploitModule && (
                                  <div className="p-3 rounded-xl bg-[#101218] border border-[#2A3042] flex items-center justify-between gap-3 text-xs font-mono">
                                    <div className="flex items-center gap-2 overflow-hidden text-ellipsis">
                                      <Terminal size={14} className="text-[#B600A8] shrink-0" />
                                      <span className="text-[#8B949E] shrink-0">Metasploit Module:</span>
                                      <span className="text-white truncate">{finding.exploitModule}</span>
                                    </div>
                                    <button
                                      onClick={() => handleCopyModule(finding.id, finding.exploitModule)}
                                      className="p-1.5 rounded-lg bg-[#1E2330] hover:bg-[#282F40] text-[#D7E2EA] transition-colors shrink-0"
                                      title="Copy exploit module"
                                    >
                                      {copiedId === finding.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                    </button>
                                  </div>
                                )}

                                {/* Technical description & details */}
                                <div className="space-y-2 text-xs sm:text-sm">
                                  <div>
                                    <h5 className="font-bold text-white mb-1 uppercase tracking-wider text-[11px]">Description</h5>
                                    <p className="text-[#9DA7B3] leading-relaxed">{finding.description}</p>
                                  </div>

                                  <div>
                                    <h5 className="font-bold text-white mb-1 uppercase tracking-wider text-[11px]">Technical Details</h5>
                                    <p className="text-[#9DA7B3] leading-relaxed">{finding.technicalDetails}</p>
                                  </div>

                                  <div>
                                    <h5 className="font-bold text-white mb-1 uppercase tracking-wider text-[11px]">Exploitation Summary</h5>
                                    <p className="text-[#9DA7B3] leading-relaxed">{finding.exploitationSummary}</p>
                                  </div>

                                  <div>
                                    <h5 className="font-bold text-red-300 mb-1 uppercase tracking-wider text-[11px]">Impact</h5>
                                    <p className="text-[#9DA7B3] leading-relaxed">{finding.businessImpact}</p>
                                  </div>

                                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                    <h5 className="font-bold text-emerald-400 mb-1 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                      <CheckCircle2 size={13} />
                                      Remediation Recommendation
                                    </h5>
                                    <p className="text-xs text-emerald-200/90 leading-relaxed">{finding.recommendation}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: RISK MATRIX */}
              {activeTab === 'matrix' && (
                <div className="space-y-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#14161F] border border-[#242938]">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Layers className="text-[#B600A8]" size={20} />
                      Risk Assessment Matrix
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9DA7B3] mb-5">
                      Risk severity reflects assessed likelihood and impact within the internal laboratory context.
                    </p>

                    {/* Visual Matrix Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-center border-collapse">
                        <thead>
                          <tr className="border-b border-[#2C3242]">
                            <th className="p-3 text-left font-bold text-[#8B949E] uppercase tracking-wider">
                              Likelihood / Impact
                            </th>
                            <th className="p-3 font-bold text-emerald-300 uppercase tracking-wider">Low</th>
                            <th className="p-3 font-bold text-amber-300 uppercase tracking-wider">Moderate</th>
                            <th className="p-3 font-bold text-red-300 uppercase tracking-wider">High</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#242A38]">
                          <tr>
                            <td className="p-3 text-left font-bold text-white bg-[#1A1D27]">High Likelihood</td>
                            <td className="p-3 bg-amber-500/10 text-amber-300 font-bold border border-[#2C3242]">Medium</td>
                            <td className="p-3 bg-orange-500/20 text-orange-300 font-bold border border-[#2C3242]">High (2)</td>
                            <td className="p-3 bg-red-600/30 text-red-300 font-extrabold border border-red-500/40">
                              Critical (10)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 text-left font-bold text-white bg-[#1A1D27]">Moderate Likelihood</td>
                            <td className="p-3 bg-emerald-500/10 text-emerald-300 font-semibold border border-[#2C3242]">Low</td>
                            <td className="p-3 bg-amber-500/10 text-amber-300 font-bold border border-[#2C3242]">Medium</td>
                            <td className="p-3 bg-orange-500/20 text-orange-300 font-bold border border-[#2C3242]">High</td>
                          </tr>
                          <tr>
                            <td className="p-3 text-left font-bold text-white bg-[#1A1D27]">Low Likelihood</td>
                            <td className="p-3 bg-emerald-500/10 text-emerald-300 font-semibold border border-[#2C3242]">Low</td>
                            <td className="p-3 bg-emerald-500/10 text-emerald-300 font-semibold border border-[#2C3242]">Low</td>
                            <td className="p-3 bg-amber-500/10 text-amber-300 font-bold border border-[#2C3242]">Medium</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Classification Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#14161F] border border-red-500/30">
                      <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase mb-2">
                        <Flame size={16} />
                        Critical Vulnerabilities (10)
                      </div>
                      <p className="text-xs text-[#9DA7B3] leading-relaxed mb-3">
                        Direct unauthenticated remote root access, arbitrary code execution, and database compromise:
                      </p>
                      <ul className="text-xs text-[#D7E2EA] space-y-1.5 list-disc list-inside">
                        <li>VSFTPD 2.3.4 Backdoor (Port 21)</li>
                        <li>Samba Usermap Script RCE (Port 139/445)</li>
                        <li>UnrealIRCd 3.2.8.1 Backdoor (Port 6667)</li>
                        <li>DistCC Daemon Command Execution (Port 3632)</li>
                        <li>Tomcat Manager Deployment RCE (Port 8180)</li>
                        <li>Java RMI Remote Code Execution (Port 1099)</li>
                        <li>PostgreSQL Payload Execution (Port 5432)</li>
                        <li>PHP CGI Argument Injection (Port 80)</li>
                        <li>Bind Shell Direct Root Access (Port 1524)</li>
                        <li>NFS Root Filesystem Export (Port 2049)</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#14161F] border border-amber-500/30">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase mb-2">
                        <AlertTriangle size={16} />
                        High Vulnerabilities (2)
                      </div>
                      <p className="text-xs text-[#9DA7B3] leading-relaxed mb-3">
                        Credential disclosure and unauthorized remote desktop access:
                      </p>
                      <ul className="text-xs text-[#D7E2EA] space-y-1.5 list-disc list-inside mb-4">
                        <li>VNC Weak Authentication Exposure (Port 5900)</li>
                        <li>Apache Tomcat AJP Ghostcat File Read (Port 8009)</li>
                      </ul>
                      <div className="p-3 rounded-xl bg-[#101218] border border-[#242A38] text-[11px] text-[#8B949E]">
                        The overall rating is <strong className="text-red-400">CRITICAL</strong> because an attacker can
                        gain immediate root shell access through 10 distinct avenues without authentication.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: REMEDIATION ROADMAP */}
              {activeTab === 'remediation' && (
                <div className="space-y-6">
                  {/* Phase 1: 0-7 Days */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#14161F] border border-red-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Flame className="text-red-400" size={18} />
                        Immediate Containment (0 - 7 Days)
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                        Priority: Urgency P0
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#9DA7B3]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-red-400 mt-0.5 shrink-0" />
                        <span><strong>Isolate or Decommission:</strong> Quarantine host 192.168.100.181 until critical services are retired or secured.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-red-400 mt-0.5 shrink-0" />
                        <span><strong>Disable Backdoored &amp; Unused Services:</strong> Terminate Bind Shell (1524), DistCC (3632), IRC daemon (6667), VSFTPD (21), and AJP (8009).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-red-400 mt-0.5 shrink-0" />
                        <span><strong>Restrict Network Firewall:</strong> Block unapproved access to database (5432) and NFS (2049) ports from user segments.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-red-400 mt-0.5 shrink-0" />
                        <span><strong>Rebuild from Known-Good Image:</strong> Inspect system integrity and redeploy from verified clean baseline.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Phase 2: 7-30 Days */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#14161F] border border-amber-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Wrench className="text-amber-400" size={18} />
                        Remediation &amp; Hardening (7 - 30 Days)
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        Priority: High P1
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#9DA7B3]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
                        <span><strong>Patch &amp; Upgrade:</strong> Upgrade outdated OS and daemon packages (Samba, Apache/PHP, Java, Tomcat).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
                        <span><strong>Credential Security:</strong> Remove default passwords, enforce strong unique credentials and multi-factor authentication.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
                        <span><strong>NFS &amp; DB Security:</strong> Enable root squashing on NFS exports, restrict allowed export IPs, and revoke superuser privileges.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
                        <span><strong>Network Segmentation:</strong> Implement VLANs dividing server, management, and developer build segments.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Phase 3: Sustained Assurance */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#14161F] border border-[#242938]">
                    <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ShieldAlert className="text-[#00E1FF]" size={18} />
                      Sustained Assurance &amp; Final Conclusion
                    </h4>
                    <p className="text-xs sm:text-sm text-[#9DA7B3] leading-relaxed mb-3">
                      Conduct periodic vulnerability assessments, maintain automated patch pipelines, and enforce continuous SIEM log monitoring for anomalous root executions.
                    </p>
                    <div className="p-3 rounded-xl bg-[#1A1D27] border border-[#2B3142] text-xs text-[#B4BAC5]">
                      &ldquo;Controlled exploitation demonstrated that a malicious actor could plausibly achieve complete system compromise through several independent paths. Immediate remediation is required.&rdquo;
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PDF DOCUMENT PREVIEW */}
              {activeTab === 'pdf' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#14161F] border border-[#242938] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-[#8B949E]">
                      Official 20-page Penetration Test Report prepared by Pharaohs Security Team.
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href="/assets/docs/professional.pdf"
                        download="Metasploitable_2_Penetration_Test_Report_Pharaohs.pdf"
                        className="px-3 py-1.5 rounded-full bg-[#B600A8] text-white font-bold hover:bg-[#96008b] transition-colors flex items-center gap-1.5"
                      >
                        <Download size={13} />
                        Download PDF
                      </a>
                      <a
                        href="/assets/docs/professional.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[#1F2330] text-[#D7E2EA] font-semibold hover:bg-[#282E40] transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink size={13} />
                        Full Screen
                      </a>
                    </div>
                  </div>

                  <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-[#242938] bg-[#14161F] shadow-inner">
                    <iframe
                      src="/assets/docs/professional.pdf#toolbar=1&navpanes=1"
                      className="w-full h-full"
                      title="Metasploitable 2 Penetration Testing Report PDF"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:px-7 border-t border-[#222631] bg-[#101218] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8B949E]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Report Certified &bull; Pharaohs Security Team &bull; Lead: Yehia Mohamed Amin</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-full bg-[#1C202A] hover:bg-[#252B38] text-[#D7E2EA] font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
