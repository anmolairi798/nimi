import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, CheckCircle, Calendar } from 'lucide-react';

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certifications = [
    {
      title: 'Machine Learning Course',
      issuer: 'Udemy',
      type: 'Completion Certificate',
      date: '2024',
      description: 'Comprehensive course covering machine learning algorithms, data preprocessing, model evaluation, and practical implementation.',
      skills: ['Machine Learning', 'Python', 'Data Science', 'Model Evaluation', 'Feature Engineering'],
      link: 'https://ibb.co/6WdZSvN',
      verified: true
    },
    {
      title: 'Internship Completion Certificate',
      issuer: 'Brainwave Matrix Solutions',
      type: 'Certificate & Letter of Recommendation',
      date: 'September 2024',
      description: 'Successfully completed AI/ML internship with outstanding performance in fraud detection and diabetes prediction projects.',
      skills: ['AI/ML Development', 'TensorFlow', 'Scikit-learn', 'Project Management', 'Team Collaboration'],
      link: 'https://ibb.co/F4MJxQb',
      verified: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-pink-50/50 to-peach-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-6 font-playfair gradient-text"
          >
            Certifications
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Professional certifications and achievements that validate my expertise in machine learning and software development
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                className="glass rounded-2xl overflow-hidden hover-lift transition-all-300 h-full"
                whileHover={{ scale: 1.02 }}
              >
                {/* Certificate Header */}
                <div className="p-6 bg-gradient-to-r from-pink-400 to-peach-400 text-white relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Award className="w-full h-full" />
                  </motion.div>
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Award className="w-8 h-8 mr-3" />
                        {cert.verified && (
                          <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                      <p className="text-white/90 text-sm">{cert.issuer}</p>
                      <p className="text-white/80 text-xs mt-1">{cert.type}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                    <span className="text-sm">{cert.date}</span>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{cert.description}</p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Skills Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Certificate Button */}
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-peach-500 text-white rounded-lg hover:shadow-lg transition-all-300 group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                    <span className="font-medium">View Certificate</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Recognition */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Professional Recognition</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Academic Excellence',
                  value: '9.1/10',
                  description: 'Current CGPA',
                  icon: '🎓'
                },
                {
                  title: 'Sports Achievement',
                  value: '2x Silver',
                  description: 'University Badminton Medals',
                  icon: '🏆'
                },
                {
                  title: 'Leadership Role',
                  value: 'Social Media Head',
                  description: 'College Cultural Society',
                  icon: '👥'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass p-6 rounded-xl text-center hover-lift transition-all-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-2xl font-bold gradient-text mb-1">{item.value}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;