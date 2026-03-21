import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, Network, FileText, HelpCircle, Filter, ArrowLeft } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { Badge } from '../components/common/Badge';
import { TabSwitcher } from '../components/common/TabSwitcher';
import { ToastNotification, Toast } from '../components/common/ToastNotification';
import { useStore } from '../store';

export const ResourcesPage: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = useStore(state => state.courses.find(c => c.id === courseId));
  const allResources = useStore(state => state.resources);
  
  // Filter resources to only show those relevant to the current course's subject
  const resources = allResources.filter(r => r.subject === course?.subject);

  const [activeTab, setActiveTab] = useState('All');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const tabs = ['All', 'Mind Maps', 'Short Notes', 'Question Banks'];

  const filteredResources = resources.filter(resource => {
    const matchesTab = 
      activeTab === 'All' || 
      (activeTab === 'Mind Maps' && resource.type === 'mindmap') ||
      (activeTab === 'Short Notes' && resource.type === 'notes') ||
      (activeTab === 'Question Banks' && resource.type === 'question_bank');
    
    return matchesTab;
  });

  const handleDownload = (resource: any) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message: `Downloading ${resource.title}...`,
      type: 'info'
    };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
      setToasts(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        message: `${resource.title} downloaded successfully!`,
        type: 'success'
      }]);
    }, 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'mindmap': return <Network className="w-6 h-6 text-[var(--accent-secondary)]" />;
      case 'notes': return <FileText className="w-6 h-6 text-[var(--accent-primary)]" />;
      case 'question_bank': return <HelpCircle className="w-6 h-6 text-[var(--accent-warning)]" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  } as const;

  if (!course) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-full">
          <p>Course not found.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-10">
        <div className="border-b border-[var(--line)] pb-6">
          <button 
            onClick={() => navigate(`/courses/${courseId}`)}
            className="mb-6 flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Course
          </button>
          <h1 className="text-4xl font-display font-bold mb-2 tracking-tight text-[var(--ink)]">{course.title} Resources</h1>
          <p className="text-[var(--text-secondary)]">Download high-quality materials to accelerate your learning in this course.</p>
        </div>

        <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <motion.div 
          variants={containerVariants} 
          initial="initial" 
          animate="animate" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredResources.map(resource => (
            <motion.div key={resource.id} variants={itemVariants}>
              <ClayCard hoverable className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  {getIcon(resource.type)}
                </div>
                
                <Badge variant="neutral" className="w-fit mb-3 bg-[var(--bg-primary)] border border-[var(--line)] text-[var(--ink)]">{resource.subject}</Badge>
                
                <h3 className="text-lg font-bold mb-2 line-clamp-2 flex-1 text-[var(--ink)]">{resource.title}</h3>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--line)]">
                  <span className="text-sm text-[var(--text-muted)] font-mono font-bold">{resource.size}</span>
                  <button 
                    onClick={() => handleDownload(resource)}
                    className="p-2 rounded-xl bg-[var(--bg-primary)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--ink)] hover:text-[var(--bg-primary)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </ClayCard>
            </motion.div>
          ))}
        </motion.div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20 border border-[var(--line)] rounded-2xl bg-[var(--bg-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--line)]">
              <Filter className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 tracking-tight text-[var(--ink)]">No resources found</h3>
            <p className="text-[var(--text-secondary)]">Try adjusting your filters or check back later for new materials.</p>
          </div>
        )}
      </div>

      <ToastNotification toasts={toasts} onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
    </PageWrapper>
  );
};
