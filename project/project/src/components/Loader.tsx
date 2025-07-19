import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-peach-50"
    >
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-32 h-32 rounded-full border-4 border-transparent bg-gradient-to-r from-pink-400 to-peach-400"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #f97316)',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-400 to-peach-400 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            <motion.p
              className="text-sm font-medium gradient-text"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;