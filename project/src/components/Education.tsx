import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility } from '../hooks/useScrollDirection';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const Education: React.FC = () => {
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility('education', 0.1);
  
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const educationData = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "San Francisco, CA",
      period: "2018 - 2022",
      gpa: "3.8/4.0",
      achievements: [
        "Magna Cum Laude",
        "Dean's List (6 semesters)",
        "Outstanding Student in Computer Science",
      ],
      coursework: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Database Systems",
        "Machine Learning",
        "Web Development",
      ],
    },
    {
      degree: "High School Diploma",
      institution: "Central High School",
      location: "San Francisco, CA",
      period: "2014 - 2018",
      gpa: "4.0/4.0",
      achievements: [
        "Valedictorian",
        "National Honor Society",
        "Computer Science Club President",
      ],
      coursework: [
        "AP Computer Science",
        "AP Calculus BC",
        "AP Physics",
        "AP English Literature",
      ],
    },
  ];

  return (
    <ScrollAnimatedSection id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <DynamicHeading
          text="Education"
          className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white"
        />
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <GraduationCap className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          GPA: <span className="text-blue-500">{edu.gpa}</span>
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-500" />
                          Achievements
                        </h4>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-600 dark:text-gray-400 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Relevant Coursework
                      </h4>
                      <ul className="space-y-1">
                        {edu.coursework.map((course, idx) => (
                          <li key={idx} className="text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </ScrollAnimatedSection>
  );
};

export default Education;