import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ChevronLeft, ChevronRight, MessageSquare, X, PlayCircle, FileText, CheckCircle2 } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { Badge } from '../components/common/Badge';
import { useStore } from '../store';
import { MOCK_LESSON_CONTENT } from '../data/mock';

export const LessonViewPage: React.FC = () => {
  const { id, lessonId } = useParams<{ id: string, lessonId: string }>();
  const navigate = useNavigate();
  
  const course = useStore(state => state.courses.find(c => c.id === id));
  const lessons = useStore(state => state.lessons[id || ''] || []);
  const currentLessonIndex = lessons.findIndex(l => l.id === lessonId);
  const currentLesson = lessons[currentLessonIndex];
  
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  if (!course || !currentLesson) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h2 className="text-2xl font-display font-bold mb-4 text-[var(--ink)]">Lesson Not Found</h2>
          <Link to="/courses" className="text-[var(--ink)] hover:underline font-bold">Return to Catalogue</Link>
        </div>
      </PageWrapper>
    );
  }

  const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[var(--bg-primary)] border-b border-[var(--line)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${course.id}`} className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors text-[var(--text-muted)] hover:text-[var(--ink)]">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="hidden sm:block h-6 w-px bg-[var(--line)]" />
          <div className="flex flex-col">
            <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider font-mono">{course.title}</span>
            <h1 className="text-sm font-bold truncate max-w-[200px] sm:max-w-md text-[var(--ink)]">{currentLesson.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant={currentLesson.completed ? 'success' : 'neutral'} className="hidden sm:inline-flex border border-[var(--line)]">
            {currentLesson.completed ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</> : 'In Progress'}
          </Badge>
          <button 
            onClick={() => setIsTutorOpen(!isTutorOpen)}
            className={`clay-button px-4 py-2 text-sm font-bold flex items-center gap-2 transition-colors border ${
              isTutorOpen ? 'bg-[var(--ink)] text-[var(--bg-primary)] border-[var(--ink)]' : 'bg-[var(--bg-primary)] text-[var(--ink)] border-[var(--line)] hover:bg-[var(--bg-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI Tutor</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Lesson Content */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isTutorOpen ? 'md:mr-96' : ''}`}>
          <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            
            {currentLesson.type === 'video' && (
              <div className="aspect-video bg-[var(--ink)] rounded-2xl mb-12 flex items-center justify-center relative group overflow-hidden border border-[var(--line)] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <img src={`https://picsum.photos/seed/${currentLesson.id}/1280/720`} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent opacity-80" />
                <button className="w-20 h-20 bg-[var(--bg-primary)] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <PlayCircle className="w-10 h-10 text-[var(--ink)] ml-1" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[var(--bg-primary)] text-sm font-bold font-mono z-10">
                  <span>0:00 / {currentLesson.duration}</span>
                  <Badge variant="neutral" className="bg-[var(--ink)]/50 text-[var(--bg-primary)] border border-[var(--bg-primary)]/20 backdrop-blur-md">HD</Badge>
                </div>
              </div>
            )}

            <div className="prose max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-4xl font-display font-bold mb-8 text-[var(--ink)] tracking-tight" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-display font-bold mt-12 mb-6 text-[var(--ink)] border-b border-[var(--line)] pb-4 tracking-tight" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-display font-bold mt-8 mb-4 text-[var(--ink)] tracking-tight" {...props} />,
                  p: ({node, ...props}) => <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-lg" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-6 text-[var(--text-secondary)]" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-6 text-[var(--text-secondary)]" {...props} />,
                  li: ({node, ...props}) => <li className="pl-2" {...props} />,
                  code: ({node, inline, className, children, ...props}: any) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline ? (
                      <div className="rounded-xl overflow-hidden my-8 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <div className="bg-[var(--bg-secondary)] px-4 py-3 text-xs text-[var(--text-muted)] font-mono font-bold border-b border-[var(--line)] flex justify-between items-center uppercase tracking-wider">
                          <span>{match?.[1] || 'code'}</span>
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[var(--line)] opacity-20" />
                            <div className="w-3 h-3 rounded-full bg-[var(--line)] opacity-40" />
                            <div className="w-3 h-3 rounded-full bg-[var(--line)] opacity-60" />
                          </div>
                        </div>
                        <pre className="p-6 bg-[var(--bg-primary)] overflow-x-auto text-sm font-mono text-[var(--ink)] leading-relaxed">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className="bg-[var(--bg-secondary)] text-[var(--ink)] px-1.5 py-0.5 rounded-md font-mono text-sm border border-[var(--line)]" {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {currentLesson.content || MOCK_LESSON_CONTENT}
              </ReactMarkdown>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-20 pt-8 border-t border-[var(--line)] flex items-center justify-between">
              {prevLesson ? (
                <Link 
                  to={`/courses/${course.id}/lesson/${prevLesson.id}`}
                  className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--ink)] transition-colors font-bold group"
                >
                  <div className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center group-hover:bg-[var(--bg-secondary)] transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-1">Previous</div>
                    <div className="truncate max-w-[200px] text-[var(--ink)]">{prevLesson.title}</div>
                  </div>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link 
                  to={nextLesson.type === 'quiz' ? `/quiz/${nextLesson.id}` : `/courses/${course.id}/lesson/${nextLesson.id}`}
                  className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--ink)] transition-colors font-bold text-right group"
                >
                  <div className="hidden sm:block">
                    <div className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-1">Next</div>
                    <div className="truncate max-w-[200px] text-[var(--ink)]">{nextLesson.title}</div>
                  </div>
                  <span className="sm:hidden">Next</span>
                  <div className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center group-hover:bg-[var(--bg-secondary)] transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              ) : (
                <button className="clay-button px-6 py-3 bg-[var(--accent-success)] text-[var(--bg-primary)] font-bold border border-[var(--accent-success)] hover:bg-[var(--accent-success)]/90 transition-colors">
                  Complete Course
                </button>
              )}
            </div>
          </div>
        </main>

        {/* AI Tutor Sidebar (Desktop) */}
        <AnimatePresence>
          {isTutorOpen && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full md:w-96 bg-[var(--bg-primary)] border-l border-[var(--line)] shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-40 flex flex-col pt-16"
            >
              <div className="p-4 border-b border-[var(--line)] flex items-center justify-between bg-[var(--bg-primary)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--line)] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[var(--ink)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">AI Tutor</h3>
                    <p className="text-xs text-[var(--accent-success)] flex items-center gap-1.5 font-mono font-bold mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-success)] animate-pulse" />
                      Socratic Mode ON
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsTutorOpen(false)} className="p-2 text-[var(--text-muted)] hover:text-[var(--ink)] rounded-full hover:bg-[var(--bg-secondary)] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-secondary)]/30">
                <div className="text-center py-12 opacity-50">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-[var(--text-muted)]" />
                  <p className="text-sm font-medium text-[var(--text-secondary)] max-w-[250px] mx-auto">Ask me anything about "{currentLesson.title}". I'll guide you to the answer.</p>
                </div>
                {/* Chat messages would go here */}
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border-t border-[var(--line)]">
                <div className="relative">
                  <textarea 
                    placeholder="Type your question..."
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--line)] rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] resize-none h-[60px] text-[var(--ink)] placeholder:text-[var(--text-muted)] transition-shadow"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--ink)] text-[var(--bg-primary)] rounded-lg flex items-center justify-center hover:bg-[var(--accent-secondary)] transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
