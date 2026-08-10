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
      opacity: 0.16,
      side: THREE.BackSide
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnel.rotation.x = Math.PI / 2;
    scene.add(tunnel);

    // Group for 3D Domain Solutons (Web Dev, Cybersecurity, AI)
    const domainGroup = new THREE.Group();
    scene.add(domainGroup);

    // Shared Materials
    const cyanMat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });

    const magentaMat = new THREE.MeshBasicMaterial({
      color: 0xb600a8,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });

    const whiteMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7
    });

    // Helper 1: React Atom Mesh (Web Dev)
    const createReactAtomMesh = (color: number) => {
      const atomGroup = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });

      // Nucleus
      const nucGeo = new THREE.SphereGeometry(3.5, 12, 12);
      const nucleus = new THREE.Mesh(nucGeo, whiteMat);
      atomGroup.add(nucleus);

      // 3 Electron Orbit Rings
      const ringGeo = new THREE.TorusGeometry(12, 0.4, 8, 32);
      
      const r1 = new THREE.Mesh(ringGeo, mat);
      r1.rotation.x = Math.PI / 3;
      atomGroup.add(r1);

      const r2 = new THREE.Mesh(ringGeo, mat);
      r2.rotation.x = -Math.PI / 3;
      atomGroup.add(r2);

      const r3 = new THREE.Mesh(ringGeo, mat);
      r3.rotation.y = Math.PI / 2;
      atomGroup.add(r3);

      return atomGroup;
    };

    // Helper 2: Security Shield & Lock Mesh (Cybersecurity)
    const createShieldMesh = (color: number) => {
      const shieldGroup = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });

      // Outer Shield Prism (Octahedron slightly scaled)
      const prismGeo = new THREE.OctahedronGeometry(13, 0);
      prismGeo.scale(1, 1.4, 0.8);
      const prism = new THREE.Mesh(prismGeo, mat);
      shieldGroup.add(prism);

      // Inner Glowing Lock Core
      const coreGeo = new THREE.BoxGeometry(4, 5, 4);
      const core = new THREE.Mesh(coreGeo, whiteMat);
      shieldGroup.add(core);

      return shieldGroup;
    };

    // Helper 3: AI Neural Core Mesh (Artificial Intelligence)
    const createAiNeuralMesh = (color: number) => {
      const aiGroup = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });

      // Core Icosahedron
      const icoGeo = new THREE.IcosahedronGeometry(10, 1);
      const ico = new THREE.Mesh(icoGeo, mat);
      aiGroup.add(ico);

      // Orbiting Satellite Neural Nodes
      const nodeGeo = new THREE.SphereGeometry(1.5, 8, 8);
      for (let i = 0; i < 6; i++) {
        const node = new THREE.Mesh(nodeGeo, whiteMat);
        const angle = (i / 6) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 16, Math.sin(angle) * 16, (i % 2 === 0 ? 5 : -5));
        aiGroup.add(node);
      }

      return aiGroup;
    };

    // Spawn 15 Floating Domain Objects into the Tunnel
    const floatingObjects: THREE.Group[] = [];

    for (let i = 0; i < 15; i++) {
      let object3D: THREE.Group;
      const type = i % 3; // 0: Web Dev (React), 1: Cybersecurity (Shield), 2: AI (Neural)
      const col = i % 2 === 0 ? 0x00e1ff : 0xb600a8;

      if (type === 0) {
        object3D = createReactAtomMesh(col);
      } else if (type === 1) {
        object3D = createShieldMesh(col);
      } else {
        object3D = createAiNeuralMesh(col);
      }

      object3D.position.set(
        (Math.random() - 0.5) * 170,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 260
      );

      object3D.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      domainGroup.add(object3D);
      floatingObjects.push(object3D);
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

      // Rotate floating 3D Web Dev, Cybersecurity, & AI objects
      floatingObjects.forEach((obj, idx) => {
        obj.rotation.x += 0.006 * (idx % 3 + 1);
        obj.rotation.y += 0.008 * (idx % 2 + 1);
        obj.rotation.z += 0.004;
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
      cyanMat.dispose();
      magentaMat.dispose();
      whiteMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
