import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgressiveVisibility } from '../hooks/useScrollDirection';
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, isVisible, isActive, hasBeenVisible, visibilityProgress] = useProgressiveVisibility('contact', 0.02);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'bhatejanimisha@gmail.com',
      link: 'mailto:bhatejanimisha@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8447929959',
      link: 'tel:+918447929959'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Delhi, India',
      link: '#'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'Nimishabhateja',
      link: 'https://github.com/Nimishabhateja'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'nimisha-bhateja',
      link: 'https://www.linkedin.com/in/nimisha-bhateja-261aab286'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:bhatejanimisha@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            animate={{
              opacity: isVisible ? 1 : 0.5,
              y: isVisible ? 0 : 15
            }}
            transition={{ delay: 0.1 }}
          >
            I'm always excited to discuss new opportunities, collaborate on projects, or simply connect with fellow tech enthusiasts. Let's build something amazing together!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            animate={{
              opacity: isVisible ? 1 : 0.4,
              x: isVisible ? 0 : -30,
              scale: isVisible ? 1 : 0.98
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-8 h-8 text-pink-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Let's Connect</h3>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're looking for an AI/ML intern, a web developer, or just want to discuss technology and innovation, 
                I'd love to hear from you. I'm currently open to new opportunities and collaborations.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center p-4 rounded-xl hover:bg-white/50 transition-all-300 group"
                    whileHover={{ x: 10 }}
                    animate={{
                      opacity: isVisible ? 1 : 0.5,
                      x: isVisible ? 0 : -20
                    }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-r from-pink-400 to-peach-400 mr-4">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.title}</p>
                      <p className="font-medium text-gray-800 group-hover:text-pink-600 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <motion.div
              className="glass p-6 rounded-2xl"
              animate={{
                opacity: isVisible ? 1 : 0.4,
                y: isVisible ? 0 : 20
              }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href="mailto:bhatejanimisha@gmail.com"
                  className="flex items-center justify-center px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </motion.a>
                <motion.a
                  href="/Nimisha_Bhateja_Resume.pdf"
                  download
                  className="flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            animate={{
              opacity: isVisible ? 1 : 0.4,
              x: isVisible ? 0 : 30,
              scale: isVisible ? 1 : 0.98
            }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all-300"
                    placeholder="Enter your name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all-300"
                    placeholder="Enter your email"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all-300 resize-none"
                    placeholder="Tell me about your project or inquiry..."
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-peach-500 text-white rounded-lg font-medium hover-lift transition-all-300 hover-glow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-pink-200"
          animate={{
            opacity: isVisible ? 1 : 0.4,
            y: isVisible ? 0 : 20
          }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600">
            © 2024 Nimisha Bhateja. Designed & Developed with ❤️ using React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;