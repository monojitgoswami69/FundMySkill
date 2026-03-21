import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  Download, 
  User, 
  Menu, 
  X,
  BrainCircuit,
  Compass
} from 'lucide-react';
import { useStore } from '../../store';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/courses', label: 'Catalogue', icon: Compass },
  { path: '/profile', label: 'Profile', icon: User },
];

export const SidebarNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const user = useStore(state => state.user);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--bg-secondary)] border-b border-[var(--line)] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2 text-[var(--ink)] font-display font-bold text-xl">
          <BrainCircuit className="w-6 h-6" />
          <span>Lumina</span>
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
        <div className="p-6 flex items-center gap-3 text-[var(--ink)] font-display font-bold text-2xl border-b border-[var(--line)]">
          <BrainCircuit className="w-8 h-8" />
          <span>Lumina</span>
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/courses' && location.pathname === '/courses');
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

        <div className="p-4 border-t border-[var(--line)]">
          <NavLink 
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-[var(--line)]" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--ink)]">{user.name}</span>
              <span className="text-xs text-[var(--text-muted)]">Student</span>
            </div>
          </NavLink>
        </div>
      </motion.div>
    </>
  );
};
