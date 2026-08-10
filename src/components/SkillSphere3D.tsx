import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SKILLS = [
  'Burp Suite',
  'Metasploit',
  'Nmap',
  'Wireshark',
  'Kali Linux',
  'Python',
  'React',
  'VAPT',
  'AWS',
  'Wifite',
  'Hashcat',
  'TCP/IP',
  'Node.js',
  'VLANs',
  'Firewalls',
  'Docker',
];

export const SkillSphere3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for sphere objects
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Add central core wireframe sphere
    const coreGeo = new THREE.SphereGeometry(75, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xb600a8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // Create 3D text canvas sprites for each skill tag arranged on a Fibonacci sphere
    const radius = 95;
    const total = SKILLS.length;

    SKILLS.forEach((skillText, i) => {
      // Fibonacci sphere coordinates
      const phi = Math.acos(-1 + (2 * i + 1) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Create Canvas Text Texture
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, 256, 64);
        ctx.font = 'bold 26px Kanit, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Outer glow
        ctx.shadowColor = i % 2 === 0 ? '#B600A8' : '#00E1FF';
        ctx.shadowBlur = 12;
        ctx.fillStyle = i % 2 === 0 ? '#0C0C0C' : '#141518';
        ctx.fillText(skillText.toUpperCase(), 128, 32);

        ctx.shadowBlur = 0;
        ctx.fillStyle = i % 2 === 0 ? '#B600A8' : '#00E1FF';
        ctx.fillText(skillText.toUpperCase(), 128, 32);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(x, y, z);
      sprite.scale.set(70, 18, 1);
      sphereGroup.add(sprite);

      // Add a small node point at each skill coordinate
      const dotGeo = new THREE.SphereGeometry(2, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xb600a8 : 0x00e1ff });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.set(x, y, z);
      sphereGroup.add(dotMesh);
    });

    // Mouse Interaction for rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = (y / rect.height) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;
        mouseX = (x / rect.width) * 2.5;
        mouseY = (y / rect.height) * 2.5;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous autonomous rotation
      sphereGroup.rotation.y = elapsedTime * 0.25 + targetRotationY;
      sphereGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + targetRotationX;

      // Mouse influence
      targetRotationY += (mouseX * 0.02 - targetRotationY) * 0.05;
      targetRotationX += (mouseY * 0.02 - targetRotationX) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing select-none my-6"
    />
  );
};
