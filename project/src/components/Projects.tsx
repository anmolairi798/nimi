import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility } from '../hooks/useScrollDirection';
import { ExternalLink, Github, Brain, Shield, Newspaper } from 'lucide-react';

const Projects: React.FC = () => {
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility('projects', 0.1);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const projects = [
    {
      title: "AI-Powered News Aggregator",
      description: "A sophisticated news aggregation platform that uses machine learning to curate and categorize news articles from multiple sources.",
      icon: <Newspaper className="w-8 h-8" />,
      tech: ["React", "TypeScript", "Python", "TensorFlow", "PostgreSQL"],
      features: [
        "Real-time news aggregation from 50+ sources",
        "AI-powered content categorization and sentiment analysis",
        "Personalized news recommendations",
        "Advanced search and filtering capabilities"
      ],
      github: "https://github.com/yourusername/news-aggregator",
      demo: "https://news-aggregator-demo.com",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Cybersecurity Dashboard",
      description: "A comprehensive security monitoring dashboard for enterprise environments with real-time threat detection and response capabilities.",
      icon: <Shield className="w-8 h-8" />,
      tech: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "Docker"],
      features: [
        "Real-time threat monitoring and alerts",
        "Vulnerability assessment automation",
        "Incident response workflow management",
        "Compliance reporting and analytics"
      ],
      github: "https://github.com/yourusername/security-dashboard",
      demo: "https://security-dashboard-demo.com",
      color: "from-red-500 to-orange-600"
    },
    {
      title: "Neural Network Visualizer",
      description: "An interactive web application for visualizing and understanding neural network architectures and training processes.",
      icon: <Brain className="w-8 h-8" />,
      tech: ["React", "D3.js", "Python", "Flask", "WebGL"],
      features: [
        "Interactive neural network architecture builder",
        "Real-time training visualization",
        "Support for multiple network types (CNN, RNN, Transformer)",
        "Educational tutorials and examples"
      ],
      github: "https://github.com/yourusername/neural-visualizer",
      demo: "https://neural-visualizer-demo.com",
      color: "from-green-500 to-teal-600"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A showcase of my recent work in AI, cybersecurity, and web development
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <motion.div
                  animate={{
                    opacity: isVisible ? 1 : 0.4,
                    scale: isActive ? 1 : 0.98,
                    y: isVisible ? 0 : 30
                  }}
                >
                  <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                  
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color} text-white mr-4`}>
                        {project.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <motion.p 
                      className="text-gray-600 mb-6"
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
                    >
                      {project.description}
                    </motion.p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="text-gray-600 text-sm flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
                            transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                          >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;