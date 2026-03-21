import React from 'react';
import { cn } from '../../utils/cn';
import { motion, HTMLMotionProps } from 'motion/react';

interface SkeletonProps extends HTMLMotionProps<"div"> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <motion.div
      className={cn("bg-[var(--bg-tertiary)] rounded-md overflow-hidden relative", className)}
      {...props}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--bg-secondary)] to-transparent opacity-50"
        animate={{ translateX: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};
