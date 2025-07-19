import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility } from '../hooks/useScrollDirection';
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
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility(sectionId, 0.3);

  const HeadingTag = level;

  const getAnimationState = () => {
    if (hasBeenVisible) {
      // Once visible, stay visible with subtle changes
      return {
        opacity: isActive ? 1 : 0.9,
        y: 0,
        scale: isActive ? 1 : 0.99,
        filter: 'blur(0px)'
      };
    }

    if (!isVisible) {
      return {
        opacity: 0.1,
        y: -30,
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
      animate={isVisible ? "visible" : "hidden"}
      className="relative"
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.9,
        filter: 'blur(5px)'
      }}
      animate={getAnimationState()}
      transition={{
        duration: hasBeenVisible ? 0.5 : 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: hasBeenVisible ? 150 : 100,
        damping: hasBeenVisible ? 25 : 20
      }}
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
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{
                opacity: isVisible ? 1 : 0.2,
                y: 0,
                rotateX: 0
              }}
              transition={{
                duration: 0.6,
                delay: (hasBeenVisible ? 0 : 0.3) + (isVisible ? index * 0.03 : 0),
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