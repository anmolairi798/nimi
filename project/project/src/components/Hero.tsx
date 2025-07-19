import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Phone, Download, Star } from 'lucide-react';
import ThreeAvatar from './ThreeAvatar';
import ScrollAnimatedSection from './ScrollAnimatedSection';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface HeroProps {
  mousePosition: { x: number; y: number };
}

const Hero: React.FC<HeroProps> = ({ mousePosition }) => {
  const { scrollDirection, scrollY } = useScrollDirection();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Nimishabhateja',
      label: 'GitHub',
      color: 'hover:text-gray-800'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/nimisha-bhateja-261aab286',
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    {
      icon: Mail,
      href: 'mailto:bhatejanimisha@gmail.com',
      label: 'Email',
      color: 'hover:text-red-500'
    },
    {
      icon: Phone,
      href: 'tel:+918447929959',
      label: 'Phone',
      color: 'hover:text-green-500'
    }
  ];

  const achievements = [
    { icon: Star, text: '9.1/10 CGPA', color: 'text-yellow-500' },
    { icon: Star, text: '2x University Medals', color: 'text-orange-500' },
    { icon: Star, text: 'AI/ML Specialist', color: 'text-purple-500' },
    { icon: Star, text: 'Full Stack Developer', color: 'text-blue-500' }
  ];

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-rose-50 via-pink-50 to-peach-50">
      {/* Enhanced Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              background: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)'
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 20 + 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Dynamic background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)`
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)`
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <ScrollAnimatedSection direction="left" className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              {/* Greeting */}
              <motion.p
                className="text-lg text-gray-600 mb-4 font-medium"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ duration: 2, ease: 'easeOut' }}
              >
                Hello, I'm
              </motion.p>

              {/* Name with Cherry Red */}
              <motion.h1
                variants={titleVariants}
                className="text-5xl lg:text-7xl font-bold mb-6 font-playfair relative"
              >
                <motion.div
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c, #991b1b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {'Nimisha'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block"
                      style={{ transformOrigin: '50% 100%' }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
                <br />
                <motion.div className="text-gray-800">
                  {'Bhateja'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block"
                      style={{ transformOrigin: '50% 100%' }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.h1>

              {/* Role */}
              <motion.div variants={itemVariants} className="mb-4">
                <motion.p className="text-xl lg:text-2xl text-gray-600 font-semibold">
                  <span className="text-red-600 font-bold">AI/ML Engineer</span>
                  {' & '}
                  <span className="text-red-700 font-bold">Full Stack Developer</span>
                </motion.p>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="mb-8">
                <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  BTech Computer Science student at Maharaja Agrasen Institute of Technology.
                  University Badminton Champion with 2 Silver Medals.
                  Specializing in Machine Learning and innovative web solutions.
                  AI/ML Intern at Brainwave Matrix Solutions.
                </p>
              </motion.div>

              {/* Achievement Badges */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-red-200 shadow-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      <achievement.icon className={`w-4 h-4 mr-2 ${achievement.color}`} />
                      <span className="text-sm font-medium text-gray-700">{achievement.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex justify-center lg:justify-start space-x-6">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-4 rounded-full glass hover-lift transition-all-300 ${link.color}`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)'
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 1.5 + index * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <link.icon className="w-6 h-6 transition-colors duration-300" />
                      
                      {/* Tooltip */}
                      <motion.div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        initial={{ y: 10 }}
                        whileHover={{ y: 0 }}
                      >
                        {link.label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                  href="#projects"
                  className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-medium overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(220, 38, 38, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    <Star className="w-5 h-5 mr-2" />
                    View My Work
                  </span>
                </motion.a>

                <motion.a
                  href="#contact"
                  className="group relative px-8 py-4 glass border-2 border-red-300 text-gray-700 rounded-full font-medium overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: '#dc2626'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </span>
                </motion.a>

                <motion.a
                  href="/Nimisha_Bhateja_Resume.pdf"
                  download
                  className="group relative px-8 py-4 bg-gray-800 text-white rounded-full font-medium overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: '#374151'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Resume
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </ScrollAnimatedSection>

          {/* 3D Avatar */}
          <ScrollAnimatedSection direction="right" className="flex justify-center lg:justify-end">
            <motion.div
              className="w-96 h-96 relative"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.1 }}
            >
              <ThreeAvatar
                mousePosition={mousePosition}
                onWave={() => console.log('Avatar waved!')}
              />
              
              {/* Floating icons around avatar */}
              {[
                { icon: '🤖', delay: 2, angle: 0 },
                { icon: '💻', delay: 2.2, angle: 60 },
                { icon: '🏆', delay: 2.4, angle: 120 },
                { icon: '🎓', delay: 2.6, angle: 180 },
                { icon: '🚀', delay: 2.8, angle: 240 },
                { icon: '⚡', delay: 3, angle: 300 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute text-2xl"
                  style={{
                    top: `${50 + 40 * Math.sin(item.angle * Math.PI / 180)}%`,
                    left: `${50 + 40 * Math.cos(item.angle * Math.PI / 180)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 360,
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    opacity: { delay: item.delay },
                    scale: { delay: item.delay },
                    rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                    y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </motion.div>
          </ScrollAnimatedSection>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-gray-500 hover:text-red-600 transition-colors group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2 group-hover:font-medium transition-all">Discover More</span>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowDown className="w-5 h-5" />
            <motion.div
              className="absolute inset-0 border-2 border-red-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;