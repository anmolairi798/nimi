import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility, useProgressiveVisibility } from '../hooks/useScrollDirection';
import { Award, Trophy, Users, Heart, Target, Sparkles, Code2, Zap } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const About: React.FC = () => {
  const [ref, isVisible, isActive, hasBeenVisible, visibilityProgress] = useProgressiveVisibility('about', 0.05);

  const achievements = [
    {
      icon: Trophy,
      title: "University Badminton Champion",
      description: "2 Silver Medals in competitive tournaments",
      delay: 0.1
    },
    {
      icon: Users,
      title: "Technical Team Lead",
      description: "Leading development teams and mentoring peers",
      delay: 0.2
    },
    {
      icon: Code2,
      title: "Full-Stack Developer",
      description: "Proficient in modern web technologies",
      delay: 0.3
    },
    {
      icon: Target,
      title: "Problem Solver",
      description: "Strategic thinking applied to technical challenges",
      delay: 0.4
    }
  ];

  const skills = [
    { name: "React & Next.js", level: 90, icon: Code2 },
    { name: "Node.js & Express", level: 85, icon: Zap },
    { name: "Python & Django", level: 80, icon: Target },
    { name: "Database Design", level: 85, icon: Heart },
    { name: "Problem Solving", level: 95, icon: Sparkles }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      ref={ref}
      id="about" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimatedSection className="text-center mb-16" sectionId="about" enhancedScrollDown={true}>
          <DynamicHeading
            level="h2"
            className="text-4xl lg:text-5xl mb-6"
            sectionId="about"
          >
            About Me
          </DynamicHeading>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
              animate={{ 
                opacity: isVisible ? 1 : 0.4,
                y: isVisible ? 0 : 20,
                scale: isVisible ? 1 : 0.98
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              I am a passionate Computer Science Engineering student at 
              Maharaja Agrasen Institute of Technology (MAIT), currently in my 3rd year. 
              My journey combines technical excellence with leadership experience, 
              creating a unique blend of skills that drive innovation and results.
            </motion.p>
            
           <motion.p
             variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              animate={{ 
                opacity: isVisible ? 1 : 0.4,
                y: isVisible ? 0 : 15,
                scale: isVisible ? 1 : 0.99
              }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              As a University-level Badminton Champion with 2 Silver Medals, 
              I bring the same dedication and strategic thinking to my technical pursuits. Currently serving as 
              a Technical Team Lead, I mentor fellow developers while continuously expanding my expertise 
              in full-stack development and emerging technologies.
            </motion.p>
          </motion.div>
        </ScrollAnimatedSection>

        {/* Achievements Grid */}
        <ScrollAnimatedSection direction="up" delay={0.2} className="mb-20" sectionId="about">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0.4,
                  y: isVisible ? 0 : 30,
                  scale: isVisible ? 1 : 0.95
                }}
                transition={{ delay: achievement.delay }}
              >
                <div className="glass p-6 rounded-2xl h-full relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Skills Section */}
        <ScrollAnimatedSection direction="up" delay={0.2} sectionId="about" enhancedScrollDown={true}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              animate={{ 
                opacity: isVisible ? 1 : 0.5,
                x: isVisible ? 0 : -30,
                scale: isVisible ? 1 : 0.98
              }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-red-600 mb-6">Core Strengths</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    animate={{ 
                      opacity: isVisible ? 1 : 0.5,
                      x: isVisible ? 0 : -20,
                      scale: isVisible ? 1 : 0.99
                    }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <skill.icon className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-gray-800">{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold text-red-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: isVisible ? `${skill.level}%` : '5%' }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      >
                        <motion.div
                          className="absolute right-0 top-0 h-full w-1 bg-white/30 rounded-full"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

           <motion.div
             className="relative"
              animate={{ 
                opacity: isVisible ? 1 : 0.5,
                x: isVisible ? 0 : 30,
                scale: isVisible ? 1 : 0.98
              }}
             transition={{ duration: 0.8 }}
           >
             <div className="glass p-8 rounded-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5" />
               <div className="relative z-10">
                 <h4 className="text-2xl font-bold text-gray-800 mb-4">Technical Philosophy</h4>
                 <p className="text-gray-600 leading-relaxed mb-6">
                   I believe in writing clean, maintainable code that not only solves problems 
                   but also creates lasting value. My approach combines technical rigor with 
                   creative problem-solving, always keeping user experience at the forefront.
                 </p>
                 <div className="flex flex-wrap gap-3">
                   {['Clean Code', 'User-Centric', 'Scalable Solutions', 'Team Collaboration'].map((principle, index) => (
                     <motion.span
                       key={principle}
                       className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                       whileHover={{ scale: 1.05 }}
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: index * 0.1 }}
                     >
                       {principle}
                     </motion.span>
                   ))}
                 </div>
               </div>
             </div>
           </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* Personal Quote */}
        <ScrollAnimatedSection direction="up" delay={0.3} className="mt-16" sectionId="about" enhancedScrollDown={true}>
         <motion.div
           className="glass p-10 rounded-3xl max-w-4xl mx-auto gradient-border relative overflow-hidden"
           whileHover={{ scale: 1.02 }}
            animate={{ 
              opacity: isVisible ? 1 : 0.5,
              y: isVisible ? 0 : 40,
              scale: isVisible ? 1 : 0.96
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
         >
           {/* Animated background pattern */}
           <motion.div
             className="absolute inset-0 opacity-5"
             animate={{ 
               backgroundPosition: ['0% 0%', '100% 100%'],
             }}
             transition={{ 
               duration: 20,
               repeat: Infinity,
               repeatType: 'reverse'
             }}
             style={{
               backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}
           />
           
           <motion.blockquote
            className="text-2xl lg:text-3xl font-medium text-gray-700 mb-6 font-playfair italic text-center relative z-10"
              animate={{ 
                opacity: isVisible ? 1 : 0.5,
                scale: isVisible ? 1 : 0.98
              }}
             transition={{ duration: 1 }}
           >
            "Combining technical expertise with creative problem-solving and athletic discipline, 
            I strive to build solutions that make a meaningful impact while continuously pushing 
            the boundaries of what's possible."
           </motion.blockquote>
          
           <motion.div
            className="text-center relative z-10"
              animate={{ 
                opacity: isVisible ? 1 : 0.5,
                y: isVisible ? 0 : 10
              }}
            transition={{ delay: 0.5 }}
          >
           <p className="text-red-600 font-bold text-lg">- Nimisha Bhateja</p>
           </motion.div>
         </motion.div>
        </ScrollAnimatedSection>
      </div>
    </section>
  );
};

export default About;