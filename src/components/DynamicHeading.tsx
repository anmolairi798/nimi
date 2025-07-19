import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility, useScrollDirection } from '../hooks/useScrollDirection';

interface DynamicHeadingProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  sectionId?: string;
}

const DynamicHeading: React.FC<DynamicHeadingProps> = ({
  children,
  level = 'h2',
  className = '',
  sectionId
}) => {
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility(sectionId || '', 0.02);
  const { scrollDirection } = useScrollDirection();

  const HeadingTag = level;

  const getAnimationState = () => {
    if (hasBeenVisible) {
      return {
        opacity: isActive ? 1 : 0.95,
        y: 0,
        scale: isActive ? 1 : 0.999,
        filter: 'blur(0px)'
      };
    }

    if (!isVisible) {
      return {
        opacity: scrollDirection === 'down' ? 0.3 : 0.1,
        y: scrollDirection === 'down' ? -15 : -25,
        scale: 0.96,
        filter: 'blur(2px)'
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
        duration: hasBeenVisible ? 0.4 : (scrollDirection === 'down' ? 0.6 : 0.8),
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: hasBeenVisible ? 200 : (scrollDirection === 'down' ? 140 : 120),
        damping: hasBeenVisible ? 30 : (scrollDirection === 'down' ? 24 : 22)
      }}
      className="relative"
    >
      <HeadingTag
        className={`font-playfair font-bold text-cherry-red ${className}`}
        style={{
          background: 'linear-gradient(135deg, #dc2626, #b91c1c, #991b1b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        <motion.span className="inline-block">
          {String(children).split('').map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{
                opacity: isVisible ? 1 : (scrollDirection === 'down' ? 0.4 : 0.2),
                y: 0,
                rotateX: 0
              }}
              transition={{
                duration: 0.5,
                delay: (hasBeenVisible ? 0 : (scrollDirection === 'down' ? 0.1 : 0.2)) + (isVisible ? index * 0.02 : 0),
                ease: 'easeOut'
              }}
              style={{ transformOrigin: '50% 100%' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.span>
      </HeadingTag>
    </motion.div>
  );
};

export default DynamicHeading;