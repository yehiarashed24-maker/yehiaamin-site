import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'button' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is touch-enabled
    const touchQuery = window.matchMedia('(pointer: coarse)');
    if (touchQuery.matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for interaction attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor], button, a, input, [role="button"]') as HTMLElement | null;

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor-text');
        const customVariant = interactiveEl.getAttribute('data-cursor');

        if (customText) {
          setCursorText(customText);
          setCursorVariant('text');
        } else if (customVariant === 'project') {
          setCursorText('VIEW');
          setCursorVariant('text');
        } else if (customVariant === 'cert') {
          setCursorText('VERIFY');
          setCursorVariant('text');
        } else if (interactiveEl.tagName === 'BUTTON' || interactiveEl.tagName === 'A') {
          setCursorText('');
          setCursorVariant('button');
        } else {
          setCursorText('');
          setCursorVariant('hover');
        }
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Ring / Label Bubble */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorVariant === 'text' ? 1 : cursorVariant === 'button' ? 1.5 : cursorVariant === 'hover' ? 1.3 : 1,
          width: cursorVariant === 'text' ? '64px' : '36px',
          height: cursorVariant === 'text' ? '64px' : '36px',
          backgroundColor: cursorVariant === 'text' ? '#B600A8' : cursorVariant === 'button' ? 'rgba(215, 226, 234, 0.15)' : 'rgba(255, 255, 255, 0)',
          borderColor: cursorVariant === 'text' ? '#B600A8' : cursorVariant === 'button' ? '#B600A8' : '#D7E2EA',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D7E2EA]/60 flex items-center justify-center backdrop-blur-[2px] shadow-lg"
      >
        {cursorText && (
          <span className="text-[10px] font-black uppercase tracking-widest text-white select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: cursorVariant === 'text' ? 0 : cursorVariant === 'button' ? 0.5 : 1,
          opacity: cursorVariant === 'text' ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        className="-translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B600A8] shadow-[0_0_8px_#B600A8]"
      />
    </div>
  );
};
