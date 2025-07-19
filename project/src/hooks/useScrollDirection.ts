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

// Hook for section-based visibility - stays visible until next section
export const useSectionBasedVisibility = (sectionId: string, threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    // Get all sections to determine order
    const sections = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'certifications', 'contact'];
    const currentIndex = sections.indexOf(sectionId);
    const nextSectionId = sections[currentIndex + 1];

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Section is visible if any part is on screen
        const sectionVisible = rect.bottom > 0 && rect.top < windowHeight;
        
        // Mark as seen when first visible
        if (sectionVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Check if next section is coming into view
        let nextSectionInView = false;
        if (nextSectionId) {
          const nextSection = document.getElementById(nextSectionId);
          if (nextSection) {
            const nextRect = nextSection.getBoundingClientRect();
            // Next section is considered "in view" when it's 30% visible
            nextSectionInView = nextRect.top < windowHeight * 0.7;
          }
        }
        
        // Section stays visible until next section comes into view or completely out of viewport
        if (hasBeenVisible || sectionVisible) {
          const completelyHidden = rect.bottom < -200 || rect.top > windowHeight + 200;
          setIsVisible(!completelyHidden && !nextSectionInView);
        }
        
        // Section is active when prominently in view
        const centerY = windowHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - centerY);
        const isInCenter = distanceFromCenter < windowHeight * 0.4;
        
        setIsActive(sectionVisible && isInCenter && !nextSectionInView);
      },
      {
        threshold: [0, threshold, 0.3, 0.7, 1],
        rootMargin: '0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible, sectionId]);

  return [setRef, isVisible, isActive, hasBeenVisible] as const;
};

// Enhanced hook for persistent visibility with better control
export const usePersistentInView = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Element is considered "in view" if any part is visible
        const isVisible = rect.bottom > 0 && rect.top < windowHeight;
        
        if (isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
          setInView(true);
        } else if (isVisible) {
          setInView(true);
        } else if (hasBeenInView) {
          // Only hide if the element is completely out of view
          const isCompletelyAbove = rect.bottom < -100; // 100px buffer
          const isCompletelyBelow = rect.top > windowHeight + 100; // 100px buffer
          
          if (isCompletelyAbove || isCompletelyBelow) {
            setInView(false);
          }
        }
      },
      {
        threshold: [0, threshold, 0.5, 1],
        rootMargin: '-10% 0px -10% 0px' // Smaller margin for better control
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenInView]);

  return [setRef, inView, hasBeenInView] as const;
};

// New hook for section-based visibility with persistent behavior
export const useSectionVisibility = (sectionId: string, threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Section is visible if any part is on screen
        const visible = rect.bottom > 50 && rect.top < windowHeight - 50; // 50px buffer
        
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Once visible, stay visible unless completely out of view
        if (hasBeenVisible || visible) {
          const completelyHidden = rect.bottom < -150 || rect.top > windowHeight + 150; // 150px buffer
          setIsVisible(!completelyHidden);
        }
        
        // Section is active if it's prominently in view (for special effects)
        const centerY = windowHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - centerY);
        const isInCenter = distanceFromCenter < windowHeight * 0.4; // Larger active zone
        
        setIsActive(visible && isInCenter);
      },
      {
        threshold: [0, threshold, 0.3, 0.7, 1],
        rootMargin: '0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenVisible]);

  return [setRef, isVisible, isActive, hasBeenVisible] as const;
};

// Hook for elements that should stay visible once they appear
export const useStayVisible = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, isVisible]);

  return [setRef, isVisible] as const;
};