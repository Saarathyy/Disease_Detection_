// Framer Motion shared animations for a highly responsive and dynamic UI

export const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20, mass: 1 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

// Continuous floating effect for hero elements/icons
export const floatingAnimation = {
  y: ["-8px", "8px"],
  transition: {
    y: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Breathing glow effect
export const breathingGlow = {
  boxShadow: [
    "0 0 10px rgba(16, 185, 129, 0.2)",
    "0 0 30px rgba(16, 185, 129, 0.6)",
    "0 0 10px rgba(16, 185, 129, 0.2)"
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
