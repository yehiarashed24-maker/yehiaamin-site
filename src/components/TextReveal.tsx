import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'word' | 'char';
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  mode = 'word',
  style,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  const units = mode === 'word' ? text.split(' ') : text.split('');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mode === 'word' ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <h1
      ref={containerRef}
      className={`inline-flex flex-wrap items-center justify-center gap-x-[0.25em] gap-y-[0.1em] overflow-hidden ${className}`}
      style={style}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-flex flex-wrap items-center justify-center gap-x-[0.25em]"
      >
        {units.map((unit, idx) => (
          <span key={idx} className="overflow-hidden inline-block py-1">
            <motion.span variants={itemVariants} className="inline-block transform-gpu">
              {unit === ' ' ? '\u00A0' : unit}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </h1>
  );
};
