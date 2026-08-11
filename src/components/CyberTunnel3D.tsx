import React, { useEffect, useRef } from 'react';

interface DeviceNode {
  x: number;
  y: number;
  label: string;
  subtext: string;
  type: 'router' | 'switch' | 'firewall' | 'server';
  neighbors: number[];
  ledColor: string;
}

interface Packet {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  protocol: 'ICMP' | 'ARP' | 'OSPF' | 'TCP';
}

interface TerminalLine {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  color: string;
}

export const CyberTunnel3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 500;
      initDevices();
    };

    window.addEventListener('resize', handleResize);

    // 1. Cisco Topology Device Nodes Setup
    let devices: DeviceNode[] = [];

    const initDevices = () => {
      devices = [
        { x: width * 0.15, y: height * 0.25, label: 'R1-CORE', subtext: '192.168.1.1', type: 'router', neighbors: [1, 2, 4], ledColor: '#00E1FF' },
        { x: width * 0.45, y: height * 0.18, label: 'R2-EDGE', subtext: '10.0.0.1', type: 'router', neighbors: [0, 3, 5], ledColor: '#00E1FF' },
        { x: width * 0.22, y: height * 0.65, label: 'SW1-DIST', subtext: 'VLAN 10/20', type: 'switch', neighbors: [0, 6, 7], ledColor: '#10B981' },
        { x: width * 0.55, y: height * 0.55, label: 'SW2-ACCESS', subtext: 'VLAN 30', type: 'switch', neighbors: [1, 7, 8], ledColor: '#10B981' },
        { x: width * 0.08, y: height * 0.45, label: 'FW-ASA5505', subtext: 'SEC_LEVEL_100', type: 'firewall', neighbors: [0], ledColor: '#B600A8' },
        { x: width * 0.82, y: height * 0.30, label: 'SRV-AAA-RADIUS', subtext: '172.16.1.50', type: 'server', neighbors: [1, 9], ledColor: '#F59E0B' },
        { x: width * 0.30, y: height * 0.85, label: 'PC-ADMIN', subtext: '192.168.1.50', type: 'server', neighbors: [2], ledColor: '#10B981' },
        { x: width * 0.70, y: height * 0.75, label: 'SRV-[#SOC-SYS]', subtext: '10.0.0.254', type: 'server', neighbors: [2, 3], ledColor: '#00E1FF' },
        { x: width * 0.88, y: height * 0.65, label: 'R3-WAN-ISP', subtext: '172.31.0.1', type: 'router', neighbors: [3, 9], ledColor: '#00E1FF' },
        { x: width * 0.92, y: height * 0.20, label: 'CLOUD-INTERNET', subtext: '0.0.0.0/0', type: 'router', neighbors: [5, 8], ledColor: '#3B82F6' },
      ];
    };

    initDevices();

    // 2. Cisco Packets Simulation
    const packets: Packet[] = [];
    const protocols: ('ICMP' | 'ARP' | 'OSPF' | 'TCP')[] = ['ICMP', 'ARP', 'OSPF', 'TCP'];

    for (let i = 0; i < 12; i++) {
      const fromIdx = Math.floor(Math.random() * devices.length);
      const neighbors = devices[fromIdx].neighbors;
      const toIdx = neighbors[Math.floor(Math.random() * neighbors.length)];

      packets.push({
        fromIdx,
        toIdx,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
        protocol: protocols[i % protocols.length]
      });
    }

    // 3. Authentic Cisco IOS Command Streams
    const ciscoCommands = [
      'Router# show ip route ospf -> 10.0.0.0/8 via 192.168.1.1',
      'Router(config-if)# ip address 192.168.1.1 255.255.255.0',
      'Switch# show vlan brief -> VLAN 10 (SEC_MGMT) ACTIVE',
      '%OSPF-5-ADJCHG: Process 1, Nbr 10.0.0.1 on Gig0/0 from LOADING to FULL',
      'Sending 5, 100-byte ICMP Echos to 10.0.0.254: !!!!!',
      'Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms',
      'Cisco ASA(config)# access-list OUTSIDE_IN permit tcp any host 10.0.0.50 eq 443',
      '%SEC-6-IPACCESSLOGP: list 101 permit tcp 192.168.1.50(443) -> 10.0.0.1(443)',
      'Switch# show interfaces status -> Gig0/1 connected trunk 10,20,30',
      'Router# show ip ospf neighbor -> 192.168.1.254 FULL/DR Gig0/1',
      'Cisco Packet Tracer v8.2: ICMP PDU Packet Transmitted (ACK OK)',
      'Crypto Map IPsec Tunnel Active: AES-256-GCM / SHA-256'
    ];

    const terminalLines: TerminalLine[] = [];
    for (let i = 0; i < 8; i++) {
      terminalLines.push({
        text: ciscoCommands[i % ciscoCommands.length],
        x: (Math.random() * 0.6 + 0.1) * width,
        y: Math.random() * height,
        speed: 0.3 + Math.random() * 0.4,
        opacity: 0.15 + Math.random() * 0.2,
        color: i % 2 === 0 ? '#00E1FF' : '#B600A8'
      });
    }

    // Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.03;
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.03;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Render Loop ──────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Draw Cisco Grid Blueprint Backdrop
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(0, 225, 255, 0.03)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Subnet Overlay Labels
      ctx.font = '10px font-mono, monospace';
      ctx.fillStyle = 'rgba(0, 225, 255, 0.12)';
      ctx.fillText('CISCO PACKET TRACER SIMULATION ENGINE // VLAN 10,20,30', 25, 30);
      ctx.fillText('SUBNET: 192.168.1.0/24 | GATEWAY: 192.168.1.1 [ONLINE]', width - 360, 30);

      // B. Draw Cisco Cable Connections (Fiber & Copper Ethernet)
      devices.forEach((dev) => {
        dev.neighbors.forEach((nIdx) => {
          const target = devices[nIdx];
          ctx.beginPath();
          ctx.moveTo(dev.x + mouseX, dev.y + mouseY);
          ctx.lineTo(target.x + mouseX, target.y + mouseY);
          ctx.strokeStyle = 'rgba(0, 225, 255, 0.18)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]); // Cisco Packet Tracer cable dash
          ctx.stroke();
          ctx.setLineDash([]); // Reset dash

          // Draw Cable Interface LEDs (Green/Cyan Blinking LED)
          const midX = (dev.x + target.x) / 2 + mouseX;
          const midY = (dev.y + target.y) / 2 + mouseY;
          ctx.beginPath();
          ctx.arc(midX, midY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = Math.sin(Date.now() * 0.005) > 0 ? '#10B981' : '#00E1FF';
          ctx.fill();
        });
      });

      // C. Draw Cisco Packets Traveling on Cables
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.fromIdx = p.toIdx;
          const currentNeighbors = devices[p.fromIdx].neighbors;
          p.toIdx = currentNeighbors[Math.floor(Math.random() * currentNeighbors.length)];
        }

        const dFrom = devices[p.fromIdx];
        const dTo = devices[p.toIdx];

        const px = dFrom.x + (dTo.x - dFrom.x) * p.progress + mouseX;
        const py = dFrom.y + (dTo.y - dFrom.y) * p.progress + mouseY;

        // Draw Packet Envelope / Glow Node
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = p.protocol === 'ICMP' ? '#00E1FF' : p.protocol === 'ARP' ? '#FF00EA' : '#10B981';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Packet Protocol Label
        ctx.font = '8px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(p.protocol, px + 6, py - 4);
      });

      // D. Draw Cisco Device Symbol Nodes
      devices.forEach((dev) => {
        const dx = dev.x + mouseX;
        const dy = dev.y + mouseY;

        ctx.save();
        ctx.translate(dx, dy);

        // Device Outer Glow Circle / Box
        ctx.beginPath();
        if (dev.type === 'router') {
          // Cisco Router Symbol (Circle with cross arrows)
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.strokeStyle = '#00E1FF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-8, 0); ctx.lineTo(8, 0);
          ctx.moveTo(0, -8); ctx.lineTo(0, 8);
          ctx.strokeStyle = 'rgba(0, 225, 255, 0.6)';
          ctx.stroke();
        } else if (dev.type === 'switch') {
          // Cisco Switch Symbol (Square Box with arrows)
          ctx.rect(-16, -10, 32, 20);
          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-10, -4); ctx.lineTo(10, -4);
          ctx.moveTo(-10, 4); ctx.lineTo(10, 4);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
          ctx.stroke();
        } else if (dev.type === 'firewall') {
          // Cisco ASA Firewall (Brick Wall Icon)
          ctx.rect(-15, -12, 30, 24);
          ctx.strokeStyle = '#B600A8';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // Server (Stacked Tower Box)
          ctx.rect(-12, -14, 24, 28);
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Active Status LED Dot
        ctx.beginPath();
        ctx.arc(12, -12, 3, 0, Math.PI * 2);
        ctx.fillStyle = dev.ledColor;
        ctx.shadowColor = dev.ledColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Device Labels
        ctx.font = 'bold 10px font-mono, monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(dev.label, 0, 28);

        ctx.font = '9px font-mono, monospace';
        ctx.fillStyle = 'rgba(0, 225, 255, 0.65)';
        ctx.fillText(dev.subtext, 0, 38);

        ctx.restore();
      });

      // E. Draw Live Cisco IOS Terminal Commands Drift Streams
      terminalLines.forEach((tl) => {
        tl.y -= tl.speed;
        if (tl.y < -20) {
          tl.y = height + 20;
          tl.x = (Math.random() * 0.6 + 0.1) * width;
          tl.text = ciscoCommands[Math.floor(Math.random() * ciscoCommands.length)];
        }

        ctx.font = '10px font-mono, monospace';
        ctx.fillStyle = tl.color;
        ctx.globalAlpha = tl.opacity;
        ctx.fillText(tl.text, tl.x, tl.y);
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
    />
  );
};
