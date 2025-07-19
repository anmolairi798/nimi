import React from 'react';
import { motion } from 'framer-motion';
import { useSectionBasedVisibility } from '../hooks/useScrollDirection';
import { Award, ExternalLink, CheckCircle, Calendar } from 'lucide-react';

const Certifications: React.FC = () => {
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionBasedVisibility('certifications', 0.1);
  
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      status: "Active",
      credentialId: "AWS-CSA-2023-001",
      link: "#",
      icon: <Award className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023",
      status: "Active",
      credentialId: "GCP-PD-2023-002",
      link: "#",
      icon: <Award className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "2022",
      status: "Active",
      credentialId: "AZ-900-2022-003",
      link: "#",
      icon: <Award className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const achievements = [
    {
      title: "Top 1% Developer",
      platform: "Stack Overflow",
      description: "Recognized for exceptional contributions to the developer community",
    },
    {
      title: "Open Source Contributor",
      platform: "GitHub",
      description: "Active contributor to popular open-source projects",
    },
    {
      title: "Technical Speaker",
      platform: "Tech Conferences",
      description: "Speaker at various technology conferences and meetups",
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-pink-50/50 to-peach-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional certifications and recognition that validate my expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                className="glass rounded-2xl overflow-hidden hover-lift transition-all-300 h-full"
                animate={{
                  opacity: isVisible ? 1 : 0.4,
                  scale: isActive ? 1 : 0.98,
                  y: isVisible ? 0 : 30
                }}
              >
                <div className="glass p-8 rounded-2xl hover-lift transition-all-300 border border-white/10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${cert.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {cert.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-gray-300 mb-4">{cert.issuer}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{cert.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">{cert.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-6">ID: {cert.credentialId}</p>
                  
                  <a
                    href={cert.link}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Professional <span className="text-gradient">Recognition</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass p-6 rounded-xl text-center hover-lift transition-all-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-purple-400 mb-3">{item.platform}</p>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;