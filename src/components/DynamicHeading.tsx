import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility, useScrollDirection } from '../hooks/useScrollDirection';

interface DynamicHeadingProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  sectionId: string;
  className?: string;
}

const DynamicHeading: React.FC<DynamicHeadingProps> = ({
  children,
  level = 'h2',
  sectionId,
  className = ''
}) => {
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility(sectionId, 0.3);
  const { scrollDirection } = useScrollDirection();

  const HeadingTag = level;

  const getAnimationState = () => {
    if (hasBeenVisible) {
      // Once visible, stay visible with subtle changes
      return {
        opacity: isActive ? 1 : 0.95, // Better visibility retention
        y: 0,
        scale: isActive ? 1 : 0.998, // Minimal scale change
        filter: 'blur(0px)'
      };
    }

    if (!isVisible) {
      return {
        opacity: scrollDirection === 'down' ? 0.2 : 0.1, // Better initial visibility for scroll down
        y: scrollDirection === 'down' ? -20 : -30, // Smaller offset for scroll down
        scale: 0.95,
        filter: 'blur(3px)'
      };
    }

    return {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)'
    };
  };

  return (
    <motion.div
      ref={ref}
      animate={getAnimationState()}
      transition={{
        duration: hasBeenVisible ? 0.4 : (scrollDirection === 'down' ? 0.8 : 1), // Faster for scroll down
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: hasBeenVisible ? 180 : (scrollDirection === 'down' ? 120 : 100), // More responsive
        damping: hasBeenVisible ? 28 : (scrollDirection === 'down' ? 22 : 20)
      }}
    >
      <HeadingTag
        className={`text-center font-bold tracking-tight ${className}`}
      >
        {typeof children === 'string' ? (
          children.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                y: 20,
                rotateX: -90
              }}
              animate={{
                opacity: isVisible ? 1 : (scrollDirection === 'down' ? 0.3 : 0.2), // Better visibility for scroll down
                y: 0,
                rotateX: 0
              }}
              transition={{
                duration: 0.6,
                delay: (hasBeenVisible ? 0 : (scrollDirection === 'down' ? 0.2 : 0.3)) + (isVisible ? index * 0.02 : 0), // Faster delay for scroll down
                ease: 'easeOut'
              }}
              style={{ transformOrigin: '50% 100%' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))
        ) : (
          children
        )}
      </HeadingTag>
    </motion.div>
  );
};

export default DynamicHeading;