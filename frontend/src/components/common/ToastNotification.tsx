import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastNotificationProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[var(--accent-success)]" />,
    error: <AlertCircle className="w-5 h-5 text-[var(--accent-error)]" />,
    info: <Info className="w-5 h-5 text-[var(--accent-primary)]" />,
  };

  const borders = {
    success: 'border-[var(--accent-success)]',
    error: 'border-[var(--accent-error)]',
    info: 'border-[var(--accent-primary)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "bg-[var(--bg-secondary)] border-l-4 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] pointer-events-auto",
        borders[toast.type]
      )}
    >
      {icons[toast.type]}
      <p className="text-sm font-medium text-[var(--text-primary)] flex-1">{toast.message}</p>
      <button 
        onClick={onDismiss}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
