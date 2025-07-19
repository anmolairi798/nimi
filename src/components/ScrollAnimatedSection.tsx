import React from 'react';
import { motion } from 'framer-motion';
import { useEnhancedScrollVisibility, useScrollDirection } from '../hooks/useScrollDirection';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  id?: string;
  sectionId?: string;
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.03,
  id,
  sectionId = ''
}) => {
  const [ref, isVisible, isActive, hasBeenVisible] = useEnhancedScrollVisibility(threshold);
  const { scrollDirection } = useScrollDirection();

  const getAnimationState = () => {
    if (hasBeenVisible) {
      // Once visible, maintain high visibility
      return {
        x: 0,
        y: 0,
        opacity: isVisible ? (isActive ? 1 : 0.95) : 0.6,
        scale: isVisible ? (isActive ? 1 : 0.998) : 0.98,
        filter: 'blur(0px)',
        rotateX: 0,
        rotateY: 0
      };
    }

    if (!isVisible) {
      // Initial hidden state with scroll direction consideration
      const distance = scrollDirection === 'down' ? 15 : 30;
      const variants = {
        left: { 
          x: -distance,
          opacity: scrollDirection === 'down' ? 0.4 : 0.2,
          scale: 0.96,
          filter: 'blur(1px)'
        },
        right: { 
          x: distance,
          opacity: scrollDirection === 'down' ? 0.4 : 0.2,
          scale: 0.96,
          filter: 'blur(1px)'
        },
        up: { 
          y: distance,
          opacity: scrollDirection === 'down' ? 0.4 : 0.2,
          scale: 0.96,
          filter: 'blur(1px)'
        },
        down: { 
          y: -distance,
          opacity: scrollDirection === 'down' ? 0.4 : 0.2,
          scale: 0.96,
          filter: 'blur(1px)'
        },
        fade: { 
          opacity: scrollDirection === 'down' ? 0.3 : 0.1,
          scale: 0.98,
          filter: 'blur(1px)'
        },
        scale: { 
          scale: 0.92,
          opacity: scrollDirection === 'down' ? 0.3 : 0.1,
          filter: 'blur(1px)'
        }
      };
      return variants[direction];
    }

    // Visible state
    return {
      x: 0,
      y: 0,
      opacity: isActive ? 1 : 0.95,
      scale: isActive ? 1 : 0.999,
      filter: 'blur(0px)',
      rotateX: 0,
      rotateY: 0
    };
  };

  const getInitialState = () => {
    const baseDistance = scrollDirection === 'down' ? 25 : 50;
    const variants = {
      left: { x: -baseDistance, opacity: 0, scale: 0.9, filter: 'blur(3px)' },
      right: { x: baseDistance, opacity: 0, scale: 0.9, filter: 'blur(3px)' },
      up: { y: baseDistance, opacity: 0, scale: 0.9, filter: 'blur(3px)' },
      down: { y: -baseDistance, opacity: 0, scale: 0.9, filter: 'blur(3px)' },
      fade: { opacity: 0, scale: 0.95, filter: 'blur(2px)' },
      scale: { scale: 0.8, opacity: 0, filter: 'blur(2px)' }
    };
    return variants[direction];
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      id={id}
      initial={getInitialState()}
      animate={getAnimationState()}
      transition={{
        duration: hasBeenVisible ? 0.3 : (scrollDirection === 'down' ? duration * 0.7 : duration),
        delay: hasBeenVisible ? 0 : (scrollDirection === 'down' ? delay * 0.5 : delay),
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: hasBeenVisible ? 250 : (scrollDirection === 'down' ? 150 : 120),
        damping: hasBeenVisible ? 35 : (scrollDirection === 'down' ? 25 : 22)
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;