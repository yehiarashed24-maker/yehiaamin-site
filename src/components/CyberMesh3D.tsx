import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CyberMesh3D: React.FC = () => {
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
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.002);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, -60, 220);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Plane Wireframe Mesh (Cyber Mesh Grid)
    const planeGeo = new THREE.PlaneGeometry(600, 400, 32, 24);
    const pos = planeGeo.attributes.position;

    // Add gentle wave heights to vertices
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const z = Math.sin(u * 0.02) * Math.cos(v * 0.02) * 18;
      pos.setZ(i, z);
    }
    planeGeo.computeVertexNormals();

    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xb600a8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    // Floating Security Node Particles over the Mesh
    const count = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(count * 3);
    const pCols = new Float32Array(count * 3);

    const colorPurple = new THREE.Color(0xb600a8);
    const colorCyan = new THREE.Color(0x00e1ff);

    for (let i = 0; i < count; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 500;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 300;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const col = Math.random() > 0.5 ? colorPurple : colorCyan;
      pCols[i * 3] = col.r;
      pCols[i * 3 + 1] = col.g;
      pCols[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

    // Custom circular texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const pMat = new THREE.PointsMaterial({
      size: 5,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.1;
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.1;
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
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate mesh vertices wave
      targetX += (mouseX - targetX) * 0.05;
      targetY += (-mouseY - targetY) * 0.05;

      mesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05 + targetX * 0.001;
      mesh.position.y = Math.cos(elapsedTime * 0.3) * 6 + targetY * 0.1;
      particles.rotation.y = elapsedTime * 0.03;

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
      planeGeo.dispose();
      planeMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-65"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
