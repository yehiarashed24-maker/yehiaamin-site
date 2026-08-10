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

    // Group for Solid 3D Meshes (Web Dev, Cybersecurity, AI)
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    // Extrude Options
    const extrudeSettings = {
      depth: 2.5,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.6,
      bevelThickness: 0.6
    };

    // Helper 1: Extruded 3D Code Bracket `<` Mesh (Web Dev)
    const create3DCodeBracketMesh = (colorHex: number) => {
      const group = new THREE.Group();
      const shape = new THREE.Shape();

      // Draw `<` 2D Shape
      shape.moveTo(6, 10);
      shape.lineTo(-6, 0);
      shape.lineTo(6, -10);
      shape.lineTo(10, -7);
      shape.lineTo(0, 0);
      shape.lineTo(10, 7);
      shape.closePath();

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.65
      });

      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);
      return group;
    };

    // Helper 2: Extruded 3D Security Shield & Lock Mesh (Cybersecurity)
    const create3DShieldMesh = (colorHex: number) => {
      const group = new THREE.Group();
      const shape = new THREE.Shape();

      // Draw Shield 2D Shape
      shape.moveTo(0, 11);
      shape.lineTo(9, 11);
      shape.quadraticCurveTo(9, 0, 0, -11);
      shape.quadraticCurveTo(-9, 0, -9, 11);
      shape.closePath();

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.65
      });
      const shieldMesh = new THREE.Mesh(geo, mat);
      group.add(shieldMesh);

      // Add 3D Lock Shackle Ring on front
      const lockGeo = new THREE.TorusGeometry(3.5, 0.9, 8, 20, Math.PI);
      const lockMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const lockMesh = new THREE.Mesh(lockGeo, lockMat);
      lockMesh.position.set(0, 2, 2.5);
      lockMesh.rotation.x = Math.PI;
      group.add(lockMesh);

      return group;
    };

    // Helper 3: 3D AI CPU Microchip Mesh with Pins (Artificial Intelligence)
    const create3DAiChipMesh = (colorHex: number) => {
      const group = new THREE.Group();

      // Main Chip Wafer Box
      const waferGeo = new THREE.BoxGeometry(16, 16, 2.5);
      const waferMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const wafer = new THREE.Mesh(waferGeo, waferMat);
      group.add(wafer);

      // Glowing Center AI Die Core
      const coreGeo = new THREE.BoxGeometry(7, 7, 3);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.75
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // 12 Metallic Pins extending from sides
      const pinMat = new THREE.MeshBasicMaterial({
        color: 0x00e1ff,
        transparent: true,
        opacity: 0.8
      });

      const pinGeo = new THREE.BoxGeometry(1, 3.5, 1);
      for (let side = 0; side < 4; side++) {
        for (let i = -1; i <= 1; i++) {
          const pin = new THREE.Mesh(pinGeo, pinMat);
          const offset = i * 4.5;

          if (side === 0) pin.position.set(offset, 9.5, 0); // Top
          else if (side === 1) pin.position.set(offset, -9.5, 0); // Bottom
          else if (side === 2) { pin.position.set(9.5, offset, 0); pin.rotation.z = Math.PI / 2; } // Right
          else if (side === 3) { pin.position.set(-9.5, offset, 0); pin.rotation.z = Math.PI / 2; } // Left

          group.add(pin);
        }
      }

      return group;
    };

    // Spawn 15 Pure 3D Meshes (Code Brackets, Shields, AI Microchips)
    const floatingMeshes: THREE.Group[] = [];

    for (let i = 0; i < 15; i++) {
      let mesh3D: THREE.Group;
      const type = i % 3; // 0: Web Dev Bracket, 1: Security Shield, 2: AI Chip
      const colorHex = i % 2 === 0 ? 0x00e1ff : 0xb600a8;

      if (type === 0) {
        mesh3D = create3DCodeBracketMesh(colorHex);
      } else if (type === 1) {
        mesh3D = create3DShieldMesh(colorHex);
      } else {
        mesh3D = create3DAiChipMesh(colorHex);
      }

      mesh3D.position.set(
        (Math.random() - 0.5) * 170,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 260
      );

      mesh3D.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      meshGroup.add(mesh3D);
      floatingMeshes.push(mesh3D);
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

      // Rotate pure 3D Code Brackets, Shields, and AI Microchips smoothly
      floatingMeshes.forEach((m, idx) => {
        m.rotation.x += 0.007 * (idx % 3 + 1);
        m.rotation.y += 0.009 * (idx % 2 + 1);
        m.rotation.z += 0.005;
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
      meshGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
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
