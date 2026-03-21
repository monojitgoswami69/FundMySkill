import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, className }) => {
  return (
    <motion.div 
      className={cn("flex flex-col items-center justify-center text-center p-8", className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {icon && (
        <div className="mb-6 text-[var(--text-muted)] opacity-50">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--text-secondary)] max-w-md mb-8">
          {description}
        </p>
      )}
      {action && (
        <div>
          {action}
        </div>
      )}
    </motion.div>
  );
};
