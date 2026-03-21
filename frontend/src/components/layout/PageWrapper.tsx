import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12", className)}
    >
      {children}
    </motion.div>
  );
};
