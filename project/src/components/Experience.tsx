import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility } from '../hooks/useScrollDirection';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const Experience: React.FC = () => {
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility('experience', 0.1);
  
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
        ease: "easeOut",
      },
    },
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description: "Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led a team of 5 developers in migrating legacy codebase to React",
        "Implemented comprehensive testing strategy reducing bugs by 60%",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Digital Innovations Inc",
      period: "2020 - 2022",
      location: "New York, NY",
      description: "Developed responsive web applications and collaborated with design teams to create exceptional user experiences.",
      achievements: [
        "Built 15+ responsive web applications using React and Vue.js",
        "Collaborated with UX/UI designers to implement pixel-perfect designs",
        "Integrated RESTful APIs and GraphQL endpoints",
        "Participated in agile development processes and sprint planning"
      ]
    },
    {
      title: "Junior Web Developer",
      company: "StartupXYZ",
      period: "2019 - 2020",
      location: "Austin, TX",
      description: "Started career developing web applications and learning modern frontend frameworks in a fast-paced startup environment.",
      achievements: [
        "Developed company website increasing user engagement by 25%",
        "Learned React, Node.js, and modern development practices",
        "Contributed to open-source projects and internal tools",
        "Assisted in database design and API development"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Briefcase className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A journey through my professional growth and key contributions in frontend development
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                animate={{
                  opacity: isVisible ? 1 : 0.4,
                  scale: isActive ? 1 : 0.98,
                  y: isVisible ? 0 : 30
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-3">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end space-y-2 md:ml-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">{exp.period}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Key Achievements:
                  </h4>
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <motion.div
                      key={achievementIndex}
                      variants={achievementVariants}
                     initial="hidden"
                     animate={isVisible ? "visible" : "hidden"}
                     transition={{ delay: 0.5 + achievementIndex * 0.1 }}
                     className="flex items-start group/achievement"
                   >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover/achievement:scale-110 transition-transform duration-200" />
                      <p className="text-gray-600 dark:text-gray-300 group-hover/achievement:text-gray-900 dark:group-hover/achievement:text-white transition-colors duration-200">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
         initial="hidden"
         animate={isVisible ? "visible" : "hidden"}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready for New Challenges</h3>
          <p className="text-lg opacity-90 mb-6">
            I'm always excited to take on new projects and collaborate with innovative teams.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Let's Work Together
          </motion.button>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default Experience;