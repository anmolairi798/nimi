import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-peach-50">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-200/30 to-rose-300/30 blur-3xl"
                animate={{
                  x: mousePosition.x * 0.1,
                  y: mousePosition.y * 0.1,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 30 }}
                style={{ top: '10%', left: '10%' }}
              />
              <motion.div
                className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-peach-200/30 to-pink-300/30 blur-3xl"
                animate={{
                  x: mousePosition.x * -0.05,
                  y: mousePosition.y * -0.05,
                }}
                transition={{ type: "spring", stiffness: 30, damping: 20 }}
                style={{ bottom: '20%', right: '10%' }}
              />
            </div>

            <Navbar />
            <Hero mousePosition={mousePosition} />
            <About />
            <Education />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;