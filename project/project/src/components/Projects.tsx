import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Brain, Shield, Newspaper } from 'lucide-react';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Cat vs Dog Image Prediction',
      description: 'A deep learning project using Convolutional Neural Networks (CNN) to classify images of cats and dogs with high accuracy. Implemented with TensorFlow and Keras.',
      icon: Brain,
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN', 'Image Processing'],
      features: [
        'Developed a CNN model for binary image classification',
        'Preprocessed dataset with resizing, normalization, and augmentation',
        'Used Keras with TensorFlow backend for model development',
        'Deployed model for real-time image classification'
      ],
      github: 'https://github.com/Nimishabhateja/Machine-Learning.git',
      demo: 'https://github.com/Nimishabhateja/Machine-Learning.git',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      title: 'Fake News Detection',
      description: 'A machine learning solution to detect fake news using Natural Language Processing techniques and multiple classification algorithms for accurate results.',
      icon: Newspaper,
      technologies: ['Python', 'NLP', 'Scikit-learn', 'NLTK', 'Pandas', 'Machine Learning'],
      features: [
        'Built ML model using NLP techniques',
        'Text preprocessing with tokenization and stemming',
        'Implemented multiple classification algorithms',
        'Achieved high accuracy in fake news detection'
      ],
      github: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      demo: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      gradient: 'from-blue-400 to-purple-400'
    },
    {
      title: 'Credit Card Fraud Detection',
      description: 'An advanced machine learning system for detecting fraudulent credit card transactions using ensemble methods and comprehensive data analysis.',
      icon: Shield,
      technologies: ['Python', 'Random Forest', 'XGBoost', 'Pandas', 'Matplotlib', 'Data Analysis'],
      features: [
        'Developed fraud detection model with high accuracy',
        'Used ensemble methods for better performance',
        'Comprehensive data visualization and analysis',
        'Implemented evaluation metrics and model optimization'
      ],
      github: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      demo: 'https://github.com/Nimishabhateja/Brainwave_Matrix_Intern.git',
      gradient: 'from-green-400 to-blue-400'
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
    <section id="projects" className="py-20 relative overflow-hidden">
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
            Featured Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            A showcase of my machine learning and development projects that demonstrate practical applications of AI technology
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                className="glass rounded-2xl overflow-hidden hover-lift transition-all-300 h-full"
                whileHover={{ scale: 1.03 }}
              >
                {/* Project Header */}
                <div className={`p-6 bg-gradient-to-r ${project.gradient} text-white relative overflow-hidden`}>
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <project.icon className="w-full h-full" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <project.icon className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/90 text-sm">{project.description}</p>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="text-gray-600 text-sm flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                        >
                          <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-pink-100 hover:text-pink-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors group/btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-lg hover:shadow-lg transition-all-300 group/btn`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto gradient-border">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore More Projects</h3>
            <p className="text-gray-600 mb-6">
              Check out my GitHub repository for more projects and contributions to the open-source community.
            </p>
            <motion.a
              href="https://github.com/Nimishabhateja"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-peach-500 text-white rounded-full font-medium hover-lift transition-all-300 hover-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 mr-2" />
              View GitHub Profile
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;