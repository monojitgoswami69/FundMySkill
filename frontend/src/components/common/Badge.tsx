import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  className,
  ...props 
}) => {
  const variants = {
    success: 'bg-[var(--accent-success)]/10 text-[var(--accent-success)] border-[var(--accent-success)]/20',
    warning: 'bg-[var(--accent-warning)]/10 text-[var(--accent-warning)] border-[var(--accent-warning)]/20',
    error: 'bg-[var(--accent-error)]/10 text-[var(--accent-error)] border-[var(--accent-error)]/20',
    neutral: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-color)]',
    primary: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20',
    secondary: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
