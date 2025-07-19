import React from 'react';
import { motion } from 'framer-motion';
import { useProgressiveVisibility } from '../hooks/useScrollDirection';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const Experience: React.FC = () => {
  const [ref, isVisible, isActive, hasBeenVisible, visibilityProgress] = useProgressiveVisibility('experience', 0.02);

  const experience = {
    title: 'AI/ML Intern',
    company: 'Brainwave Matrix Solutions',
    duration: 'August 2024 - September 2024',
    location: 'Remote',
    type: 'Internship',
    achievements: [
      'Conducted data preprocessing, feature engineering, and model evaluation to optimize performance',
      'Utilized Python, Pandas, Scikit-learn, and TensorFlow for building, training, and evaluating models',
      'Developed and implemented machine learning models for credit card fraud detection using supervised learning techniques, improving detection accuracy',
      'Collaborated on diabetes detection projects, leveraging classification models such as Logistic Regression and Decision Trees to predict patient outcomes'
    ]
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-peach-50/50 to-pink-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          animate={{
            opacity: isVisible ? 1 : 0.4,
            y: isVisible ? 0 : 30,
            scale: isVisible ? 1 : 0.98
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 font-playfair gradient-text"
            animate={{
              opacity: isVisible ? 1 : 0.5,
              y: isVisible ? 0 : 20
            }}
          >
            Work Experience
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            animate={{
              opacity: isVisible ? 1 : 0.5,
              y: isVisible ? 0 : 15
            }}
            transition={{ delay: 0.1 }}
          >
            Professional experience in AI/ML development and real-world project implementation
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          animate={{
            opacity: isVisible ? 1 : 0.4,
            y: isVisible ? 0 : 40,
            scale: isVisible ? 1 : 0.97
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-peach-400 rounded-full hidden md:block"></div>

            {/* Experience Card */}
            <div className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-5 h-5 bg-gradient-to-r from-pink-400 to-peach-400 rounded-full border-4 border-white shadow-lg hidden md:block animate-pulse-glow"></div>

              <motion.div
                className="md:ml-20 glass p-8 rounded-2xl hover-lift transition-all-300 group"
                whileHover={{ scale: 1.02 }}
                animate={{
                  opacity: isVisible ? 1 : 0.5,
                  x: isVisible ? 0 : -30
                }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <div className="p-4 rounded-full bg-gradient-to-r from-pink-400 to-peach-400 mr-6">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                        {experience.title}
                      </h3>
                      <p className="text-xl text-gray-600 font-medium">{experience.company}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                    {experience.type}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-pink-500" />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Achievements:</h4>
                  <div className="space-y-3">
                    {experience.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start group/achievement"
                        animate={{
                          opacity: isVisible ? 1 : 0.5,
                          x: isVisible ? 0 : -15
                        }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0 group-hover/achievement:text-pink-600 transition-colors" />
                        <p className="text-gray-600 group-hover/achievement:text-gray-700 transition-colors leading-relaxed">
                          {achievement}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies Used */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Machine Learning', 'Data Preprocessing'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-pink-100 to-peach-100 text-gray-700 rounded-full text-sm font-medium border border-pink-200 hover:border-pink-300 hover:shadow-md transition-all-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        animate={{
                          opacity: isVisible ? 1 : 0.5,
                          scale: isVisible ? 1 : 0.95
                        }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Future Goals */}
        <motion.div
          className="mt-16 text-center"
          animate={{
            opacity: isVisible ? 1 : 0.4,
            y: isVisible ? 0 : 30,
            scale: isVisible ? 1 : 0.98
          }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto gradient-border">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Looking Forward</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Seeking opportunities to apply my AI/ML expertise in challenging real-world problems, 
              contribute to innovative projects, and continue growing as a technology professional. 
              Open to internships and full-time positions in machine learning, data science, and software development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;