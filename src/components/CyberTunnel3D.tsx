import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CyberTunnel3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.0022);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 0, 110);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Endless Wireframe Cylinder Tunnel
    const tunnelGeo = new THREE.CylinderGeometry(130, 130, 700, 32, 40, true);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0xb600a8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnel.rotation.x = Math.PI / 2;
    scene.add(tunnel);

    // Group for 3D Holographic Domain Badges
    const badgeGroup = new THREE.Group();
    scene.add(badgeGroup);

    // Helper: Create High-Res 2D Canvas Texture for 3D Holographic Badges
    const createDomainBadgeTexture = (symbol: string, text: string, strokeColor: string, textColor: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Dark Glass Background
        ctx.fillStyle = 'rgba(15, 16, 20, 0.85)';
        ctx.beginPath();
        ctx.roundRect(10, 10, 492, 236, 24);
        ctx.fill();

        // Neon Glow Border
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 8;
        ctx.shadowColor = strokeColor;
        ctx.shadowBlur = 20;
        ctx.stroke();

        // Inner Light Highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Symbol Text (Big Icon/Code)
        ctx.shadowBlur = 15;
        ctx.shadowColor = textColor;
        ctx.font = 'bold 72px "Kanit", "Courier New", sans-serif';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol, 256, 100);

        // Domain Name Text
        ctx.font = 'bold 36px font-mono, "Kanit", monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, 256, 180);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    // Domain Badges Definition List (Web Dev, Cybersecurity, AI)
    const badgeDefs = [
      // Web Dev
      { symbol: '</>', text: 'WEB DEV', stroke: '#00E1FF', textCol: '#00E1FF' },
      { symbol: '⚛ REACT', text: 'FRONTEND', stroke: '#00E1FF', textCol: '#00E1FF' },
      { symbol: 'JS NODE', text: 'FULL STACK', stroke: '#00E1FF', textCol: '#00E1FF' },

      // Cybersecurity
      { symbol: '🛡 SEC', text: 'CYBERSECURITY', stroke: '#B600A8', textCol: '#B600A8' },
      { symbol: '🔒 LOCK', text: 'SOC OPERATIVE', stroke: '#B600A8', textCol: '#B600A8' },
      { symbol: '🔑 NMAP', text: 'SECURITY AUDIT', stroke: '#B600A8', textCol: '#B600A8' },

      // AI
      { symbol: '🧠 AI', text: 'AI SYSTEM', stroke: '#00E1FF', textCol: '#00E1FF' },
      { symbol: '⚡ PYTHON', text: 'DATA & AI', stroke: '#B600A8', textCol: '#B600A8' },
      { symbol: '📜 CISCO', text: 'CERTIFIED', stroke: '#00E1FF', textCol: '#00E1FF' }
    ];

    const badges: THREE.Mesh[] = [];

    // Spawn 16 Floating 3D Holographic Badges in the Tunnel
    for (let i = 0; i < 16; i++) {
      const def = badgeDefs[i % badgeDefs.length];
      const texture = createDomainBadgeTexture(def.symbol, def.text, def.stroke, def.textCol);

      const boxGeo = new THREE.BoxGeometry(22, 11, 1.2);
      const matFront = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.9 });
      const matSide = new THREE.MeshBasicMaterial({ color: def.stroke === '#00E1FF' ? 0x00e1ff : 0xb600a8, wireframe: true, transparent: true, opacity: 0.4 });

      // Apply materials array to BoxGeometry
      const materials = [matSide, matSide, matSide, matSide, matFront, matFront];
      const badgeMesh = new THREE.Mesh(boxGeo, materials);

      badgeMesh.position.set(
        (Math.random() - 0.5) * 170,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 260
      );

      badgeMesh.rotation.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.3
      );

      badgeGroup.add(badgeMesh);
      badges.push(badgeMesh);
    }

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.05;
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Endless Tunnel Motion towards camera
      tunnel.position.z = (elapsedTime * 40) % 50;

      // Rotate floating 3D Domain Badges smoothly
      badges.forEach((b, idx) => {
        b.rotation.y = Math.sin(elapsedTime * 0.5 + idx) * 0.3;
        b.rotation.x = Math.cos(elapsedTime * 0.4 + idx) * 0.15;
      });

      // Smooth mouse camera steering
      targetX += (mouseX - targetX) * 0.05;
      targetY += (-mouseY - targetY) * 0.05;

      camera.rotation.y = targetX * 0.003;
      camera.rotation.x = targetY * 0.003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      tunnelGeo.dispose();
      tunnelMat.dispose();
      badgeGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
