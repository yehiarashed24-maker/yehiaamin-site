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
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.0025);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Endless Wireframe Cylinder Tunnel
    const tunnelGeo = new THREE.CylinderGeometry(120, 120, 600, 32, 40, true);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0xb600a8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnel.rotation.x = Math.PI / 2;
    scene.add(tunnel);

    // 2. Floating 3D Polyhedron Solids Group
    const solidsGroup = new THREE.Group();
    scene.add(solidsGroup);

    const geometries = [
      new THREE.IcosahedronGeometry(12, 0),
      new THREE.OctahedronGeometry(10, 0),
      new THREE.TetrahedronGeometry(14, 0),
      new THREE.DodecahedronGeometry(11, 0)
    ];

    const cyanMat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const magentaMat = new THREE.MeshBasicMaterial({
      color: 0xb600a8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const geo = geometries[i % geometries.length];
      const mat = i % 2 === 0 ? cyanMat : magentaMat;
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 250
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      solidsGroup.add(mesh);
      meshes.push(mesh);
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

      // Rotate floating 3D solids
      meshes.forEach((m, idx) => {
        m.rotation.x += 0.005 * (idx % 3 + 1);
        m.rotation.y += 0.007 * (idx % 2 + 1);
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
      geometries.forEach(g => g.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
