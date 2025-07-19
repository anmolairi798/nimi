@@ .. @@
 import React from 'react';
 import { motion } from 'framer-motion';
-import { useSectionBasedVisibility } from '../hooks/useScrollDirection';
+import { useSectionBasedVisibility, useProgressiveVisibility } from '../hooks/useScrollDirection';
 import { Award, Trophy, Users, Heart, Target, Sparkles, Code2, Zap } from 'lucide-react';
 import DynamicHeading from './DynamicHeading';
 import ScrollAnimatedSection from './ScrollAnimatedSection';

 const About: React.FC = () => {
-  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility('about', 0.1);
+  const [ref, isVisible, isActive, hasBeenVisible, visibilityProgress] = useProgressiveVisibility('about', 0.05);

   const achievements = [
@@ .. @@
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
-        <ScrollAnimatedSection className="text-center mb-16" sectionId="about">
+        <ScrollAnimatedSection className="text-center mb-16" sectionId="about" enhancedScrollDown={true}>
           <DynamicHeading
             level="h2"
             className="text-4xl lg:text-5xl mb-6"
+            sectionId="about"
           >
             About Me
           </DynamicHeading>
@@ .. @@
             <motion.p
               variants={itemVariants}
               className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
-              animate={{ opacity: isVisible ? 1 : 0.3 }}
+              animate={{ 
+                opacity: isVisible ? 1 : 0.4,
+                y: isVisible ? 0 : 20,
+                scale: isVisible ? 1 : 0.98
+              }}
+              transition={{ duration: 0.6, ease: 'easeOut' }}
             >
               I am a passionate Computer Science Engineering student at 
               Maharaja Agrasen Institute of Technology (MAIT), currently in my 3rd year. 
@@ .. @@
            <motion.p
              variants={itemVariants}
             className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
-              animate={{ opacity: isVisible ? 1 : 0.3 }}
+              animate={{ 
+                opacity: isVisible ? 1 : 0.4,
+                y: isVisible ? 0 : 15,
+                scale: isVisible ? 1 : 0.99
+              }}
+              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
             >
               As a University-level Badminton Champion with 2 Silver Medals, 
               I bring the same dedication and strategic thinking to my technical pursuits. Currently serving as 
@@ .. @@
               <motion.div
                 className="group relative overflow-hidden"
                 whileHover={{ scale: 1.05 }}
-                animate={{ opacity: isVisible ? 1 : 0.3 }}
+                animate={{ 
+                  opacity: isVisible ? 1 : 0.4,
+                  y: isVisible ? 0 : 30,
+                  scale: isVisible ? 1 : 0.95
+                }}
                 transition={{ delay: achievement.delay }}
               >
                 <div className="glass p-6 rounded-2xl h-full relative z-10">
@@ .. @@
         {/* Skills Section */}
-        <ScrollAnimatedSection direction="up" delay={0.4} sectionId="about">
+        <ScrollAnimatedSection direction="up" delay={0.2} sectionId="about" enhancedScrollDown={true}>
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             <motion.div
-              animate={{ opacity: isVisible ? 1 : 0.4 }}
+              animate={{ 
+                opacity: isVisible ? 1 : 0.5,
+                x: isVisible ? 0 : -30,
+                scale: isVisible ? 1 : 0.98
+              }}
               transition={{ duration: 0.8 }}
             >
               <h3 className="text-3xl font-bold text-red-600 mb-6">Core Strengths</h3>
@@ .. @@
                   <motion.div
                     key={skill.name}
                     className="group"
-                    animate={{ opacity: isVisible ? 1 : 0.4 }}
+                    animate={{ 
+                      opacity: isVisible ? 1 : 0.5,
+                      x: isVisible ? 0 : -20,
+                      scale: isVisible ? 1 : 0.99
+                    }}
                     transition={{ delay: index * 0.2 }}
                   >
                     <div className="flex items-center justify-between mb-2">
@@ .. @@
                       <motion.div
                         className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full relative"
                         initial={{ width: 0 }}
-                        animate={{ width: isVisible ? `${skill.level}%` : '0%' }}
+                        animate={{ width: isVisible ? `${skill.level}%` : '5%' }}
                         transition={{ duration: 1.5, delay: index * 0.2 }}
                       >
                         <motion.div
@@ .. @@

            <motion.div
              className="relative"
-              animate={{ opacity: isVisible ? 1 : 0.4 }}
+              animate={{ 
+                opacity: isVisible ? 1 : 0.5,
+                x: isVisible ? 0 : 30,
+                scale: isVisible ? 1 : 0.98
+              }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass p-8 rounded-2xl relative overflow-hidden">
@@ .. @@

        {/* Personal Quote */}
-        <ScrollAnimatedSection direction="up" delay={0.6} className="mt-16" sectionId="about">
+        <ScrollAnimatedSection direction="up" delay={0.3} className="mt-16" sectionId="about" enhancedScrollDown={true}>
          <motion.div
            className="glass p-10 rounded-3xl max-w-4xl mx-auto gradient-border relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
-            animate={{ opacity: isVisible ? 1 : 0.3 }}
+            animate={{ 
+              opacity: isVisible ? 1 : 0.5,
+              y: isVisible ? 0 : 40,
+              scale: isVisible ? 1 : 0.96
+            }}
+            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Animated background pattern */}
            <motion.div
@@ .. @@
            <motion.blockquote
             className="text-2xl lg:text-3xl font-medium text-gray-700 mb-6 font-playfair italic text-center relative z-10"
-              animate={{ opacity: isVisible ? 1 : 0.4 }}
+              animate={{ 
+                opacity: isVisible ? 1 : 0.5,
+                scale: isVisible ? 1 : 0.98
+              }}
              transition={{ duration: 1 }}
            >
             "Combining technical expertise with creative problem-solving and athletic discipline, 
@@ .. @@
           
            <motion.div
             className="text-center relative z-10"
-              animate={{ opacity: isVisible ? 1 : 0.4 }}
+              animate={{ 
+                opacity: isVisible ? 1 : 0.5,
+                y: isVisible ? 0 : 10
+              }}
             transition={{ delay: 0.5 }}
           >
            <p className="text-red-600 font-bold text-lg">- Nimisha Bhateja</p>