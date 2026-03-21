import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn("flex items-center gap-6 border-b border-[var(--border-color)] overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "relative pb-3 text-sm font-medium transition-colors whitespace-nowrap",
            activeTab === tab ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          )}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-t-full"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
