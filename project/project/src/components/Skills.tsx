import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Palette, MessageSquare, Lightbulb, Users, Star, Zap, Target, Award } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'Python', level: 95, icon: '🐍' },
        { name: 'C/C++', level: 88, icon: '⚡' },
        { name: 'JavaScript', level: 85, icon: '🚀' },
        { name: 'HTML/CSS', level: 90, icon: '🎨' },
        { name: 'SQL', level: 82, icon: '📊' },
        { name: 'React', level: 87, icon: '⚛️' }
      ],
      color: 'from-red-400 to-red-600',
      description: 'Proficient in multiple programming paradigms with strong problem-solving skills'
    },
    {
      title: 'AI/ML & Data Science',
      icon: Database,
      skills: [
        { name: 'Machine Learning', level: 92, icon: '🤖' },
        { name: 'Deep Learning', level: 88, icon: '🧠' },
        { name: 'TensorFlow', level: 85, icon: '🔥' },
        { name: 'Scikit-learn', level: 90, icon: '📈' },
        { name: 'Pandas', level: 93, icon: '🐼' },
        { name: 'Data Analysis', level: 89, icon: '📊' }
      ],
      color: 'from-red-500 to-red-700',
      description: 'Specialized in building intelligent systems and extracting insights from data'
    },
    {
      title: 'Development Tools',
      icon: Lightbulb,
      skills: [
        { name: 'Git/GitHub', level: 90, icon: '🔧' },
        { name: 'VS Code', level: 95, icon: '💻' },
        { name: 'Google Colab', level: 88, icon: '☁️' },
        { name: 'Jupyter', level: 87, icon: '📓' },
        { name: 'Docker', level: 75, icon: '🐳' },
        { name: 'Linux', level: 80, icon: '🐧' }
      ],
      color: 'from-red-600 to-red-800',
      description: 'Efficient workflow management and modern development environment expertise'
    },
    {
      title: 'Leadership & Soft Skills',
      icon: Users,
      skills: [
        { name: 'Team Leadership', level: 92, icon: '👥' },
        { name: 'Communication', level: 90, icon: '💬' },
        { name: 'Project Management', level: 85, icon: '📋' },
        { name: 'Problem Solving', level: 95, icon: '🎯' },
        { name: 'Mentoring', level: 88, icon: '🌟' },
        { name: 'Innovation', level: 90, icon: '💡' }
      ],
      color: 'from-red-700 to-red-900',
      description: 'Strong interpersonal skills developed through sports and leadership roles'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-red-200/20 to-red-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-red-300/20 to-red-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimatedSection className="text-center mb-16">
          <DynamicHeading
            level="h2"
            className="text-4xl lg:text-5xl mb-6"
          >
            Skills & Expertise
          </DynamicHeading>
          
          <motion.p
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive toolkit combining technical excellence, creative innovation, and leadership skills to build next-generation solutions
          </motion.p>
        </ScrollAnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollAnimatedSection
              key={category.title}
              direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
              delay={categoryIndex * 0.2}
            >
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: categoryIndex * 0.2 }}
                className="glass p-8 rounded-3xl hover-lift transition-all-300 group h-full relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1, rotate: 180 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Header */}
                <div className="flex items-center mb-6 relative z-10">
                  <motion.div 
                    className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} mr-6 relative`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                    
                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-30`}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                      className="group/skill relative"
                    >
                      <motion.div
                        className="p-4 bg-white/60 rounded-xl border border-gray-200/50 text-center hover:border-red-300 hover:bg-white/80 transition-all-300 cursor-pointer relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Skill icon and name */}
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-2xl mr-2">{skill.icon}</span>
                          <span className="text-sm font-semibold text-gray-700 group-hover/skill:text-red-600 transition-colors">
                            {skill.name}
                          </span>
                        </div>

                        {/* Skill level bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <motion.div
                            className={`h-2 bg-gradient-to-r ${category.color} rounded-full relative overflow-hidden`}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/30"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                          </motion.div>
                        </div>

                        {/* Skill percentage */}
                        <motion.span
                          className="text-xs font-bold text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 + 1 }}
                        >
                          {skill.level}%
                        </motion.span>

                        {/* Hover effect overlay */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300 rounded-xl`}
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Category stats */}
                <motion.div
                  className="mt-6 p-4 bg-white/40 rounded-xl border border-gray-200/30 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: categoryIndex * 0.2 + 0.8 }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Average Proficiency:</span>
                    <motion.span 
                      className="font-bold text-gray-800"
                      animate={{ color: ['#374151', '#dc2626', '#374151'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </ScrollAnimatedSection>
          ))}
        </div>

        {/* Proficiency Overview */}
        <ScrollAnimatedSection direction="up" delay={0.8} className="mt-20">
          <motion.div
            className="glass p-10 rounded-3xl relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
              animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            <DynamicHeading
              level="h3"
              className="text-3xl text-center mb-12"
            >
              Professional Competency Levels
            </DynamicHeading>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { 
                  level: 'Expert', 
                  skills: ['Python', 'Machine Learning', 'Problem Solving'], 
                  percentage: 92, 
                  icon: Star,
                  color: 'from-red-400 to-red-600',
                  description: 'Advanced expertise with real-world project experience'
                },
                { 
                  level: 'Advanced', 
                  skills: ['React', 'Data Analysis', 'Leadership'], 
                  percentage: 87, 
                  icon: Award,
                  color: 'from-red-500 to-red-700',
                  description: 'Strong proficiency with independent project capability'
                },
                { 
                  level: 'Proficient', 
                  skills: ['TensorFlow', 'Git/GitHub', 'SQL'], 
                  percentage: 83, 
                  icon: Target,
                  color: 'from-red-600 to-red-800',
                  description: 'Solid understanding with practical application skills'
                },
                { 
                  level: 'Developing', 
                  skills: ['Docker', 'Linux', 'Deep Learning'], 
                  percentage: 78, 
                  icon: Zap,
                  color: 'from-red-700 to-red-900',
                  description: 'Growing expertise with continuous learning focus'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.level}
                  className="text-center group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Circular progress */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="rgba(156, 163, 175, 0.2)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                        animate={inView ? { 
                          strokeDashoffset: 2 * Math.PI * 56 * (1 - item.percentage / 100)
                        } : {}}
                        transition={{ duration: 2, delay: index * 0.3 }}
                      />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="50%" stopColor="#b91c1c" />
                          <stop offset="100%" stopColor="#991b1b" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        className={`p-3 rounded-full bg-gradient-to-r ${item.color} mb-2`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <span className="text-2xl font-bold text-gray-700">{item.percentage}%</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {item.level}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="space-y-1">
                    {item.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="inline-block text-xs bg-white/60 text-gray-700 px-3 py-1 rounded-full mr-1 mb-1 border border-gray-200/50"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + skillIndex * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.05, borderColor: '#dc2626' }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollAnimatedSection>
      </div>
    </section>
  );
};

export default Skills;