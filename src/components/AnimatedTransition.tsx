
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTransitionProps {
  children: ReactNode;
  keyValue: string;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children, keyValue }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.45, 0, 0.55, 1],
    duration: 0.5,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyValue}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
