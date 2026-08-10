import React, { useRef, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  tiltStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 800, // Large tracking radius across the screen
  strength = 3.5, // High movement responsiveness
  tiltStrength = 12, // 3D tilt angle towards cursor
  activeTransition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
  inactiveTransition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateTransform = (clientX: number, clientY: number) => {
      if (!ref.current) return;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        const isHovered =
          clientX >= rect.left - padding &&
          clientX <= rect.right + padding &&
          clientY >= rect.top - padding &&
          clientY <= rect.bottom + padding;

        if (isHovered) {
          ref.current.style.transition = activeTransition;
          const moveX = distanceX / strength;
          const moveY = distanceY / strength;

          // 3D tilt calculation based on cursor relative offset
          const rotateY = (distanceX / (window.innerWidth / 2)) * tiltStrength;
          const rotateX = (-distanceY / (window.innerHeight / 2)) * tiltStrength;

          ref.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
          ref.current.style.transition = inactiveTransition;
          ref.current.style.transform = `translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)`;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateTransform(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTransform(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [padding, strength, tiltStrength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)",
        transition: inactiveTransition,
        willChange: "transform",
        perspective: "1000px",
      }}
    >
      {children}
    </div>
  );
};
