import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setScrollY(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return { scrollDirection, scrollY };
};

// Enhanced hook for aggressive scroll-down visibility
export const useEnhancedScrollVisibility = (threshold = 0.05, rootMargin = '20% 0px 20% 0px') => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const { scrollDirection } = useScrollDirection();

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Aggressive scroll-down detection
        const isIntersecting = entry.isIntersecting;
        const scrollDownThreshold = 0.05; // Very low threshold for scroll down
        const scrollUpThreshold = 0.25;   // Higher threshold for scroll up
        
        const currentThreshold = scrollDirection === 'down' ? scrollDownThreshold : scrollUpThreshold;
        const meetsThreshold = entry.intersectionRatio >= currentThreshold;
        
        // Early visibility for scroll down - trigger when element is 85% into view
        const earlyVisible = scrollDirection === 'down' && 
                           rect.top < windowHeight * 0.85 && 
                           rect.bottom > 0;
        
        const shouldBeVisible = isIntersecting && (meetsThreshold || earlyVisible);
        
        if (shouldBeVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Enhanced persistence with larger buffers
        if (hasBeenVisible || shouldBeVisible) {
          const exitBuffer = scrollDirection === 'down' ? 400 : 200;
          const completelyHidden = rect.bottom < -exitBuffer || rect.top > windowHeight + exitBuffer;
          setIsVisible(!completelyHidden);
        }
        
        // Enhanced active state
        const centerY = windowHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(elementCenter - centerY);
        const activeZone = scrollDirection === 'down' ? windowHeight * 0.7 : windowHeight * 0.4;
        
        setIsActive(isVisible && distanceFromCenter < activeZone);
      },
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1],
        rootMargin
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible, scrollDirection]);

  return [setRef, isVisible, isActive, hasBeenVisible] as const;
};

// Progressive visibility with scroll direction awareness
export const useProgressiveVisibility = (sectionId: string, threshold = 0.03) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [visibilityProgress, setVisibilityProgress] = useState(0);
  const { scrollDirection } = useScrollDirection();

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Calculate visibility progress
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const totalHeight = rect.height;
        const progress = Math.max(0, Math.min(1, visibleHeight / totalHeight));
        
        setVisibilityProgress(progress);
        
        // Aggressive scroll down detection
        const scrollDownTrigger = scrollDirection === 'down' && 
                                 rect.top < windowHeight * 0.9 && 
                                 progress > 0.05;
        
        const scrollUpTrigger = scrollDirection === 'up' && 
                               rect.top < windowHeight * 0.6 && 
                               progress > 0.2;
        
        const shouldBeVisible = scrollDownTrigger || scrollUpTrigger || 
                               (entry.isIntersecting && entry.intersectionRatio >= threshold);
        
        if (shouldBeVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Progressive visibility with enhanced persistence
        if (hasBeenVisible || shouldBeVisible) {
          const exitThreshold = scrollDirection === 'down' ? -0.3 : -0.1;
          setIsVisible(progress > exitThreshold);
        }
        
        // Enhanced active state
        const centerDistance = Math.abs((rect.top + rect.height / 2) - windowHeight / 2);
        const activeZone = scrollDirection === 'down' ? windowHeight * 0.8 : windowHeight * 0.5;
        
        setIsActive(isVisible && centerDistance < activeZone && progress > 0.1);
      },
      {
        threshold: Array.from({ length: 41 }, (_, i) => i * 0.025), // 0 to 1 in 0.025 steps
        rootMargin: '30% 0px 30% 0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible, sectionId, scrollDirection]);

  return [setRef, isVisible, isActive, hasBeenVisible, visibilityProgress] as const;
};

// Section-based visibility with enhanced scroll-down detection
export const useSectionBasedVisibility = (sectionId: string, threshold = 0.03) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const { scrollDirection } = useScrollDirection();

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Enhanced scroll down detection
        const isIntersecting = entry.isIntersecting;
        const downThreshold = 0.03; // Very aggressive for scroll down
        const upThreshold = 0.2;    // Conservative for scroll up
        
        const currentThreshold = scrollDirection === 'down' ? downThreshold : upThreshold;
        const meetsThreshold = entry.intersectionRatio >= currentThreshold;
        
        // Super early trigger for scroll down
        const superEarlyTrigger = scrollDirection === 'down' && 
                                rect.top < windowHeight * 0.95 && 
                                rect.bottom > windowHeight * 0.05;
        
        const shouldBeVisible = isIntersecting && (meetsThreshold || superEarlyTrigger);
        
        if (shouldBeVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Enhanced persistence
        if (hasBeenVisible || shouldBeVisible) {
          const exitBuffer = scrollDirection === 'down' ? 500 : 250;
          const completelyHidden = rect.bottom < -exitBuffer || rect.top > windowHeight + exitBuffer;
          setIsVisible(!completelyHidden);
        }
        
        // Enhanced active state
        const centerY = windowHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - centerY);
        const activeZoneSize = scrollDirection === 'down' ? 0.8 : 0.5;
        const activeZone = windowHeight * activeZoneSize;
        
        setIsActive(isVisible && distanceFromCenter < activeZone);
      },
      {
        threshold: [0, 0.03, 0.05, 0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1],
        rootMargin: '25% 0px 25% 0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible, sectionId, scrollDirection]);

  return [setRef, isVisible, isActive, hasBeenVisible] as const;
};