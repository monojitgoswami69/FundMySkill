import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Download, 
  HelpCircle,
  ArrowLeft,
  Menu,
  X,
  BrainCircuit
} from 'lucide-react';
import { useStore } from '../../store';

export const CourseSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { id: courseId } = useParams<{ id: string }>();
  const course = useStore(state => state.courses.find(c => c.id === courseId));

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (!courseId) return null;

  const navItems = [
    { path: `/courses/${courseId}`, label: 'Course Dashboard', icon: LayoutDashboard, exact: true },
    { path: `/courses/${courseId}/tutor`, label: 'AI Tutor', icon: MessageSquare },
    { path: `/courses/${courseId}/resources`, label: 'Resources', icon: Download },
    { path: `/courses/${courseId}/quizzes`, label: 'Quizzes', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--bg-secondary)] border-b border-[var(--line)] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2 text-[var(--ink)] font-display font-bold text-xl">
          <BrainCircuit className="w-6 h-6" />
          <span className="truncate max-w-[200px]">{course?.title || 'Course'}</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-[var(--ink)]">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.div
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen w-64 bg-[var(--bg-secondary)] border-r border-[var(--line)] flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col gap-4 border-b border-[var(--line)]">
          <NavLink 
            to="/dashboard" 
            className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--ink)] transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main
          </NavLink>
          <div className="flex items-center gap-3 text-[var(--ink)] font-display font-bold text-xl line-clamp-2">
            <span>{course?.title || 'Course'}</span>
          </div>
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 px-4">
            Course Menu
          </div>
          {navItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);
              
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                  isActive 
                    ? "bg-[var(--ink)] text-[var(--bg-primary)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--ink)]"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-[var(--bg-primary)]" : "text-[var(--text-muted)]")} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};
