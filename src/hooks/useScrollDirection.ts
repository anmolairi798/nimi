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

// Enhanced hook for better scroll-down visibility
export const useEnhancedScrollVisibility = (threshold = 0.05, rootMargin = '-5% 0px -5% 0px') => {
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
        
        // More aggressive visibility detection for scroll down
        const isIntersecting = entry.isIntersecting;
        const scrollDownThreshold = 0.1; // Lower threshold for scroll down
        const scrollUpThreshold = 0.3; // Higher threshold for scroll up
        
        const currentThreshold = scrollDirection === 'down' ? scrollDownThreshold : scrollUpThreshold;
        const visible = isIntersecting && entry.intersectionRatio >= currentThreshold;
        
        // Early visibility trigger for scroll down
        const earlyVisible = scrollDirection === 'down' && rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.1;
        
        if ((visible || earlyVisible) && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Enhanced stay visible logic
        if (hasBeenVisible) {
          const downBuffer = 200; // Larger buffer for scroll down
          const upBuffer = 100;   // Smaller buffer for scroll up
          const buffer = scrollDirection === 'down' ? downBuffer : upBuffer;
          
          const completelyHidden = rect.bottom < -buffer || rect.top > windowHeight + buffer;
          setIsVisible(!completelyHidden);
        } else {
          setIsVisible(visible || earlyVisible);
        }
        
        // Enhanced active state detection
        const centerY = windowHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(elementCenter - centerY);
        
        // Larger active zone for scroll down
        const activeZone = scrollDirection === 'down' ? windowHeight * 0.6 : windowHeight * 0.4;
        const isInActiveZone = distanceFromCenter < activeZone;
        
        setIsActive(isVisible && isInActiveZone);
      },
      {
        threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
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

// Hook for section-based visibility with enhanced scroll-down detection
export const useSectionBasedVisibility = (sectionId: string, threshold = 0.05) => {
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
        
        // Enhanced visibility for scroll down
        const isIntersecting = entry.isIntersecting;
        
        // Different thresholds based on scroll direction
        const downThreshold = 0.05; // Very low threshold for scroll down
        const upThreshold = 0.2;     // Higher threshold for scroll up
        
        const currentThreshold = scrollDirection === 'down' ? downThreshold : upThreshold;
        const meetsThreshold = entry.intersectionRatio >= currentThreshold;
        
        // Early trigger for scroll down - activate when section is 70% into view
        const earlyTrigger = scrollDirection === 'down' && 
                           rect.top < windowHeight * 0.7 && 
                           rect.bottom > 0;
        
        // Late trigger for scroll up - activate when section is more centered
        const lateTrigger = scrollDirection === 'up' && 
                          rect.top < windowHeight * 0.5 && 
                          rect.bottom > windowHeight * 0.3;
        
        const shouldBeVisible = isIntersecting && (meetsThreshold || earlyTrigger || lateTrigger);
        
        if (shouldBeVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Enhanced persistence logic
        if (hasBeenVisible || shouldBeVisible) {
          // Larger buffers to keep sections visible longer
          const exitBuffer = scrollDirection === 'down' ? 300 : 150;
          const completelyHidden = rect.bottom < -exitBuffer || rect.top > windowHeight + exitBuffer;
          
          setIsVisible(!completelyHidden);
        }
        
        // Enhanced active state for better scroll down experience
        const centerY = windowHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - centerY);
        
        // Larger active zone for scroll down, smaller for scroll up
        const activeZoneSize = scrollDirection === 'down' ? 0.7 : 0.4;
        const activeZone = windowHeight * activeZoneSize;
        
        const isInActiveZone = distanceFromCenter < activeZone;
        const hasMinimumVisibility = rect.bottom > windowHeight * 0.1 && rect.top < windowHeight * 0.9;
        
        setIsActive(isVisible && isInActiveZone && hasMinimumVisibility);
      },
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1],
        rootMargin: '0px 0px 0px 0px' // No margin for precise control
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible, sectionId, scrollDirection]);

  return [setRef, isVisible, isActive, hasBeenVisible] as const;
};

// Hook for immediate visibility on scroll down
export const useImmediateScrollVisibility = (threshold = 0.01) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const { scrollDirection } = useScrollDirection();

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Immediate visibility for scroll down
        const immediateVisible = scrollDirection === 'down' && 
                                rect.top < windowHeight * 0.9 && 
                                rect.bottom > 0;
        
        // Standard visibility for scroll up
        const standardVisible = entry.isIntersecting && entry.intersectionRatio >= threshold;
        
        const shouldBeVisible = immediateVisible || standardVisible;
        
        if (shouldBeVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        if (hasBeenVisible || shouldBeVisible) {
          const buffer = scrollDirection === 'down' ? 400 : 200;
          const completelyHidden = rect.bottom < -buffer || rect.top > windowHeight + buffer;
          setIsVisible(!completelyHidden);
        }
      },
      {
        threshold: [0, threshold, 0.1, 0.3, 0.5, 1],
        rootMargin: '10% 0px 10% 0px' // Extended margin for early detection
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible, scrollDirection]);

  return [setRef, isVisible, hasBeenVisible] as const;
};

// Hook for progressive section visibility
export const useProgressiveVisibility = (sectionId: string, threshold = 0.05) => {
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
        
        // Enhanced scroll down detection
        const scrollDownTrigger = scrollDirection === 'down' && 
                                 rect.top < windowHeight * 0.8 && 
                                 progress > 0.1;
        
        const scrollUpTrigger = scrollDirection === 'up' && 
                               rect.top < windowHeight * 0.6 && 
                               progress > 0.3;
        
        const shouldBeVisible = scrollDownTrigger || scrollUpTrigger || 
                               (entry.isIntersecting && entry.intersectionRatio >= threshold);
        
        if (shouldBeVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Progressive visibility with enhanced persistence
        if (hasBeenVisible || shouldBeVisible) {
          const exitThreshold = scrollDirection === 'down' ? -0.2 : -0.1;
          setIsVisible(progress > exitThreshold);
        }
        
        // Enhanced active state
        const centerDistance = Math.abs((rect.top + rect.height / 2) - windowHeight / 2);
        const activeZone = scrollDirection === 'down' ? windowHeight * 0.6 : windowHeight * 0.4;
        
        setIsActive(isVisible && centerDistance < activeZone && progress > 0.2);
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // 0 to 1 in 0.05 steps
        rootMargin: '20% 0px 20% 0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible, sectionId, scrollDirection]);

  return [setRef, isVisible, isActive, hasBeenVisible, visibilityProgress] as const;
};