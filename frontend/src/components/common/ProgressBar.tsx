import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  color?: string;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  color = 'var(--accent-primary)', 
  className,
  height = 'md',
  showLabel = false
}) => {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-medium mb-1.5 text-[var(--text-secondary)]">
          <span>Progress</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden', heightClasses[height])}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
