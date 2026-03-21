import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FileText, HelpCircle, Clock, BookOpen, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../store';

export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = useStore(state => state.courses.find(c => c.id === id));
  const lessons = useStore(state => state.lessons[id || ''] || []);
  
  const [expandedModule, setExpandedModule] = useState<string | null>('module-1');

  if (!course) {
    return (
      <PageWrapper>
        <EmptyState title="Course Not Found" description="The course you are looking for does not exist." />
      </PageWrapper>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="primary">{course.subject}</Badge>
              <Badge variant={course.difficulty === 'Beginner' ? 'success' : course.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                {course.difficulty}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight">{course.title}</h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-[var(--text-muted)] pt-4 border-t border-[var(--line)]">
              <div className="flex items-center gap-3">
                <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt={course.instructor} className="w-10 h-10 rounded-full border border-[var(--line)]" />
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider font-bold">Instructor</span>
                  <span className="font-medium text-[var(--ink)]">{course.instructor}</span>
                </div>
              </div>
              <div className="w-px h-10 bg-[var(--line)] hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--line)]">
                  <BookOpen className="w-5 h-5 text-[var(--ink)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider font-bold">Lessons</span>
                  <span className="font-medium text-[var(--ink)]">{course.lessonCount}</span>
                </div>
              </div>
              <div className="w-px h-10 bg-[var(--line)] hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--line)]">
                  <Clock className="w-5 h-5 text-[var(--ink)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider font-bold">Duration</span>
                  <span className="font-medium text-[var(--ink)]">{course.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Action Card */}
          <div className="w-full lg:w-96 sticky top-24 shrink-0">
            <ClayCard colorAccent={course.colorAccent} className="p-6 flex flex-col gap-6">
              <div className="aspect-video rounded-xl bg-[var(--bg-tertiary)] overflow-hidden relative border border-[var(--line)]">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-black ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} color={course.colorAccent} />
                </div>
                
                <Link 
                  to={lessons.length > 0 ? `/courses/${course.id}/lesson/${lessons[0].id}` : '#'}
                  className="w-full clay-button py-4 flex items-center justify-center gap-2 text-lg font-bold bg-[var(--ink)] text-[var(--bg-primary)] hover:bg-[var(--accent-secondary)] hover:text-white transition-colors border-none"
                >
                  {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                </Link>
              </div>
            </ClayCard>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-display font-bold mb-8">Course Curriculum</h2>
          
          <div className="space-y-4">
            {/* Module 1 (Mocked structure) */}
            <ClayCard className="overflow-hidden">
              <button 
                onClick={() => setExpandedModule(expandedModule === 'module-1' ? null : 'module-1')}
                className="w-full px-6 py-5 flex items-center justify-between bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--line)] flex items-center justify-center font-display font-bold text-xl text-[var(--ink)]">
                    01
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-xl mb-1">Getting Started</h3>
                    <p className="text-sm text-[var(--text-muted)] font-mono">{lessons.length} lessons • 50m</p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-[var(--line)] transition-transform duration-300 ${expandedModule === 'module-1' ? 'rotate-180 bg-[var(--bg-secondary)]' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-[var(--ink)]" />
                </div>
              </button>
              
              <AnimatePresence>
                {expandedModule === 'module-1' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-2 bg-[var(--bg-secondary)] border-t border-[var(--line)] divide-y divide-[var(--line)]">
                      {lessons.map((lesson, idx) => (
                        <Link 
                          key={lesson.id}
                          to={lesson.type === 'quiz' ? `/quiz/${lesson.id}` : `/courses/${course.id}/lesson/${lesson.id}`}
                          className="flex items-center justify-between py-4 group hover:bg-[var(--bg-tertiary)] -mx-6 px-6 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${lesson.completed ? 'bg-[var(--ink)] border-[var(--ink)] text-white' : 'bg-[var(--bg-primary)] border-[var(--line)] text-[var(--text-muted)]'}`}>
                              {lesson.completed ? <CheckCircle2 className="w-4 h-4" /> : getIcon(lesson.type)}
                            </div>
                            <span className={`font-medium ${lesson.completed ? 'text-[var(--text-secondary)] line-through opacity-70' : 'text-[var(--ink)] group-hover:text-[var(--accent-primary)] transition-colors'}`}>
                              {idx + 1}. {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                            <Badge variant="neutral" size="sm" className="hidden sm:inline-flex capitalize bg-[var(--bg-primary)] border-[var(--line)]">{lesson.type}</Badge>
                            <span className="font-mono text-xs">{lesson.duration}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ClayCard>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
