import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -20% 0px'
  });

  const { scrollDirection } = useScrollDirection();

  const getDirectionVariants = (dir: string, scrollDir: string) => {
    const baseDistance = 60;
    const variants = {
      left: { 
        x: scrollDir === 'down' ? [-baseDistance, 0] : [baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateY: [scrollDir === 'down' ? -15 : 15, 0]
      },
      right: { 
        x: scrollDir === 'down' ? [baseDistance, 0] : [-baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateY: [scrollDir === 'down' ? 15 : -15, 0]
      },
      up: { 
        y: scrollDir === 'down' ? [baseDistance, 0] : [-baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateX: [scrollDir === 'down' ? 15 : -15, 0]
      },
      down: { 
        y: scrollDir === 'down' ? [-baseDistance, 0] : [baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateX: [scrollDir === 'down' ? -15 : 15, 0]
      }
    };
    return variants[dir as keyof typeof variants] || variants.up;
  };

  const getExitVariants = (dir: string, scrollDir: string) => {
    const exitDistance = 30;
    const variants = {
      left: { 
        x: scrollDir === 'down' ? [-exitDistance, 0] : [exitDistance, 0], 
        opacity: [1, 0.3],
        scale: [1, 0.95],
        filter: ['blur(0px)', 'blur(2px)']
      },
      right: { 
        x: scrollDir === 'down' ? [exitDistance, 0] : [-exitDistance, 0], 
        opacity: [1, 0.3],
        scale: [1, 0.95],
        filter: ['blur(0px)', 'blur(2px)']
      },
      up: { 
        y: scrollDir === 'down' ? [exitDistance, 0] : [-exitDistance, 0], 
        opacity: [1, 0.3],
        scale: [1, 0.95],
        filter: ['blur(0px)', 'blur(2px)']
      },
      down: { 
        y: scrollDir === 'down' ? [-exitDistance, 0] : [exitDistance, 0], 
        opacity: [1, 0.3],
        scale: [1, 0.95],
        filter: ['blur(0px)', 'blur(2px)']
      }
    };
    return variants[dir as keyof typeof variants] || variants.up;
  };

  const directionVariants = getDirectionVariants(direction, scrollDirection);
  const exitVariants = getExitVariants(direction, scrollDirection);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        x: directionVariants.x?.[0] || 0, 
        y: directionVariants.y?.[0] || 0, 
        opacity: 0,
        scale: 0.9,
        rotateX: directionVariants.rotateX?.[0] || 0,
        rotateY: directionVariants.rotateY?.[0] || 0,
        filter: 'blur(5px)'
      }}
      animate={{
        x: directionVariants.x?.[1] || 0,
        y: directionVariants.y?.[1] || 0,
        opacity: 1,
        scale: 1,
        rotateX: directionVariants.rotateX?.[1] || 0,
        rotateY: directionVariants.rotateY?.[1] || 0,
        filter: 'blur(0px)'
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;