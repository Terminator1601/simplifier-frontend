import React from 'react';
import { motion } from 'framer-motion';

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1
};

const pulseTransition = {
  duration: 1,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut"
};

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-24">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-blue-400 dark:border-blue-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
        <motion.div
          className="absolute top-0 left-0 w-16 h-16"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 1]
          }}
        >
          <div className="h-full w-full rounded-full bg-blue-400 dark:bg-blue-600 opacity-30" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900"
          animate={{ opacity: [0.5, 0.25] }}
          transition={pulseTransition}
        />
      </div>
      <motion.p
        className="ml-4 text-lg font-semibold text-blue-600 dark:text-blue-400"
        animate={{ opacity: [1, 0.5] }}
        transition={pulseTransition}
      >
        Loading...
      </motion.p>
    </div>
  );
}

