import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../utils/cn';

interface ClayCardProps extends HTMLMotionProps<"div"> {
  colorAccent?: string;
  hoverable?: boolean;
}

export const ClayCard = React.forwardRef<HTMLDivElement, ClayCardProps>(
  ({ className, children, colorAccent, hoverable = false, style, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'clay-card relative overflow-hidden',
          className
        )}
        whileHover={hoverable ? { scale: 1.02, y: -3, transition: { duration: 0.2 } } : undefined}
        style={{
          ...style,
          ...(colorAccent ? { '--card-accent': colorAccent } as React.CSSProperties : {})
        }}
        {...props}
      >
        {colorAccent && (
          <div 
            className="absolute top-0 left-0 w-full h-1.5" 
            style={{ backgroundColor: 'var(--card-accent)' }} 
          />
        )}
        {children as React.ReactNode}
      </motion.div>
    );
  }
);

ClayCard.displayName = 'ClayCard';
