import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy, Users, Heart, Target, Sparkles, Code2, Zap } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const achievements = [
    {
      icon: Trophy,
      title: 'Badminton Excellence',
      description: 'University Level Champion with 2 Silver Medals (GGSIPU 2023 & 2024)',
      stats: '2 Silver Medals',
      color: 'from-yellow-400 to-orange-500',
      delay: 0.2
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Maintaining outstanding performance in Computer Science Engineering',
      stats: '9.1/10 CGPA',
      color: 'from-blue-400 to-purple-500',
      delay: 0.4
    },
    {
      icon: Users,
      title: 'Leadership Impact',
      description: 'Social Media Head driving engagement and community growth',
      stats: 'Cultural Society',
      color: 'from-pink-400 to-rose-500',
      delay: 0.6
    },
    {
      icon: Heart,
      title: 'AI/ML Innovation',
      description: 'Specialized expertise in Machine Learning and Deep Learning solutions',
      stats: '3+ Projects',
      color: 'from-green-400 to-teal-500',
      delay: 0.8
    }
  ];

  const skills = [
    { name: 'Problem Solving', level: 95, icon: Target },
    { name: 'Innovation', level: 90, icon: Sparkles },
    { name: 'Technical Skills', level: 88, icon: Code2 },
    { name: 'Leadership', level: 85, icon: Zap }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-200/30 to-red-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-red-300/30 to-red-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimatedSection className="text-center mb-16">
          <DynamicHeading
            level="h2"
            className="text-4xl lg:text-5xl mb-6"
          >
            About Me
          </DynamicHeading>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              I am a passionate Computer Science Engineering student at 
              Maharaja Agrasen Institute of Technology (MAIT), currently in my 3rd year. 
              My journey combines academic excellence with athletic achievement and technical innovation.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              As a University-level Badminton Champion with 2 Silver Medals, 
              I bring the same dedication and strategic thinking to my technical pursuits. Currently serving as 
              Social Media Head for our college cultural society, I bridge creativity with technology.
            </motion.p>
          </motion.div>
        </ScrollAnimatedSection>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <ScrollAnimatedSection
              key={achievement.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={achievement.delay}
            >
              <motion.div
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: achievement.delay }}
              >
                <div className="glass p-6 rounded-2xl h-full relative z-10">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center relative`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <achievement.icon className="w-8 h-8 text-white" />
                    
                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${achievement.color} opacity-30`}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {achievement.description}
                  </p>

                  <motion.div 
                    className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${achievement.color} text-white text-sm font-semibold`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {achievement.stats}
                  </motion.div>
                </div>

                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.div>
            </ScrollAnimatedSection>
          ))}
        </div>

        {/* Skills Section */}
        <ScrollAnimatedSection direction="up" delay={0.4}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-red-600 mb-6">Core Strengths</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <skill.icon className="w-5 h-5 text-red-500 mr-3" />
                        <span className="font-medium text-gray-700">{skill.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{skill.level}%</span>
                    </div>
                    
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="glass p-8 rounded-2xl relative overflow-hidden">
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                
                <h4 className="text-2xl font-bold text-gray-800 mb-4">My Philosophy</h4>
                <blockquote className="text-lg text-gray-600 italic leading-relaxed relative z-10">
                  "Every challenge is an opportunity to innovate. Whether it's winning on the badminton court 
                  or solving complex AI problems, I believe in pushing boundaries and creating meaningful impact 
                  through technology."
                </blockquote>
                
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">N</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Nimisha Bhateja</p>
                    <p className="text-sm text-gray-600">AI/ML Engineer & Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* Personal Quote */}
        <ScrollAnimatedSection direction="up" delay={0.6} className="mt-16">
          <motion.div
            className="glass p-10 rounded-3xl max-w-4xl mx-auto gradient-border relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
              animate={{ x: [0, 60, 0], y: [0, 60, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            <motion.blockquote
              className="text-2xl lg:text-3xl font-medium text-gray-700 mb-6 font-playfair italic text-center relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
            >
              "Combining technical expertise with creative problem-solving and athletic discipline, 
              I strive to build innovative solutions that make a meaningful impact in the world of technology and beyond."
            </motion.blockquote>
            
            <motion.div
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-red-600 font-bold text-lg">- Nimisha Bhateja</p>
              <p className="text-gray-500 text-sm mt-1">Building Tomorrow's Technology Today</p>
            </motion.div>
          </motion.div>
        </ScrollAnimatedSection>
      </div>
    </section>
  );
};

export default About;