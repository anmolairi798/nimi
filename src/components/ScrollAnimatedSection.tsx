@@ .. @@
 import React from 'react';
 import { motion } from 'framer-motion';
-import { useSectionBasedVisibility, useScrollDirection } from '../hooks/useScrollDirection';
+import { useSectionBasedVisibility, useScrollDirection, useEnhancedScrollVisibility } from '../hooks/useScrollDirection';

 interface ScrollAnimatedSectionProps {
   children: React.ReactNode;
@@ .. @@
   threshold?: number;
   id?: string;
   sectionId?: string; // Section ID for section-based visibility
+  enhancedScrollDown?: boolean; // Enable enhanced scroll-down visibility
 }

 const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
@@ .. @@
   duration = 0.8,
   threshold = 0.1,
   id,
-  sectionId = '' // Section ID for visibility control
+  sectionId = '', // Section ID for visibility control
+  enhancedScrollDown = true // Enable enhanced scroll-down by default
 }) => {
-  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility(sectionId || id || '', threshold);
+  // Use enhanced scroll visibility if enabled, otherwise use section-based
+  const [ref, isVisible, isActive, hasBeenVisible] = enhancedScrollDown 
+    ? useEnhancedScrollVisibility(threshold * 0.5) // Lower threshold for enhanced mode
+    : useSectionBasedVisibility(sectionId || id || '', threshold);
+    
   const { scrollDirection } = useScrollDirection();

   const getAnimationState = () => {
@@ .. @@
         x: 0,
         y: 0,
-        opacity: isVisible ? (isActive ? 1 : 0.95) : 0.3, // Fade out when not visible
-        scale: isVisible ? (isActive ? 1 : 0.99) : 0.97, // Subtle scale change
+        opacity: isVisible ? (isActive ? 1 : 0.98) : 0.4, // Better visibility retention
+        scale: isVisible ? (isActive ? 1 : 0.995) : 0.98, // Subtle scale change
         filter: 'blur(0px)',
         rotateX: 0,
         rotateY: 0
@@ .. @@

     if (!isVisible && !hasBeenVisible) {
       // Initial hidden state
-      const exitDistance = 30;
+      const exitDistance = scrollDirection === 'down' ? 20 : 40; // Smaller distance for scroll down
       const exitVariants = {
         left: { 
           x: -exitDistance,
-          opacity: 0.2,
+          opacity: scrollDirection === 'down' ? 0.3 : 0.1, // Better initial opacity for scroll down
           scale: 0.95,
           filter: 'blur(2px)'
         },
@@ .. @@
         },
         up: { 
           y: exitDistance,
-          opacity: 0.2,
+          opacity: scrollDirection === 'down' ? 0.3 : 0.1,
           scale: 0.95,
           filter: 'blur(2px)'
         },
@@ .. @@
     // Entry/visible animations
     return {
       x: 0,
       y: 0,
-      opacity: isVisible ? (isActive ? 1 : 0.95) : 0.3,
-      scale: isActive ? 1 : 0.99,
+      opacity: isVisible ? (isActive ? 1 : 0.97) : 0.4, // Better visibility
+      scale: isActive ? 1 : 0.998, // Minimal scale change
       filter: 'blur(0px)',
       rotateX: 0,
       rotateY: 0
@@ .. @@

   const getInitialState = () => {
-    const baseDistance = 60;
+    const baseDistance = scrollDirection === 'down' ? 40 : 60; // Smaller initial distance for scroll down
     const variants = {
       left: { x: -baseDistance, opacity: 0, scale: 0.9, filter: 'blur(5px)' },
       right: { x: baseDistance, opacity: 0, scale: 0.9, filter: 'blur(5px)' },
@@ .. @@
       animate={animationState}
       transition={{
-        duration: hasBeenVisible ? 0.6 : duration,
+        duration: hasBeenVisible ? 0.4 : (scrollDirection === 'down' ? duration * 0.8 : duration), // Faster for scroll down
         delay: hasBeenVisible ? 0 : delay,
         ease: [0.25, 0.46, 0.45, 0.94],
         type: "spring",
-        stiffness: hasBeenVisible ? 150 : 100,
-        damping: hasBeenVisible ? 25 : 20
+        stiffness: hasBeenVisible ? 200 : (scrollDirection === 'down' ? 120 : 100), // More responsive for scroll down
+        damping: hasBeenVisible ? 30 : (scrollDirection === 'down' ? 22 : 20)
       }}
     >
       {children}