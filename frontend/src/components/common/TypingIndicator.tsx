import React from 'react';
import { motion } from 'motion/react';

export const TypingIndicator: React.FC = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -6, transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } }
  } as const;

  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-[var(--bg-tertiary)] rounded-2xl w-fit">
      <motion.div
        className="w-2 h-2 bg-[var(--text-muted)] rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="w-2 h-2 bg-[var(--text-muted)] rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.15 }}
      />
      <motion.div
        className="w-2 h-2 bg-[var(--text-muted)] rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      />
    </div>
  );
};
