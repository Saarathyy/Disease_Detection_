import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Primary Emerald Orb - Drifting slowly across the screen */}
      <motion.div
        animate={{
          x: ["-10%", "20%", "-5%"],
          y: ["-10%", "15%", "-5%"],
          scale: [1, 1.2, 0.9],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse"
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Deep Azure Orb - Floating across the bottom */}
      <motion.div
        animate={{
          x: ["10%", "-20%", "5%"],
          y: ["20%", "-10%", "15%"],
          scale: [0.8, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
          delay: 2
        }}
        className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] mix-blend-screen"
      />

       {/* Subtle Amber Orb - Floating near the center-right */}
      <motion.div
        animate={{
          x: ["0%", "-15%", "10%"],
          y: ["0%", "10%", "-15%"],
          scale: [1, 0.9, 1.1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
          delay: 5
        }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen"
      />

    </div>
  );
};
