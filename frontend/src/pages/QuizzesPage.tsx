import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Clock, CheckCircle2, ArrowLeft, HelpCircle, RefreshCcw } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { Badge } from '../components/common/Badge';
import { useStore } from '../store';

export const QuizzesPage: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = useStore(state => state.courses.find(c => c.id === courseId));
  
  // Mock quizzes data
  const quizzes = [
    {
      id: 'q1',
      title: 'Module 1: Foundations Assessment',
      description: 'Test your knowledge on the core concepts covered in the first module.',
      duration: '15 mins',
      questions: 10,
      status: 'completed',
      score: 85,
    },
    {
      id: 'q2',
      title: 'Mid-Course Review',
      description: 'A comprehensive review of everything learned so far.',
      duration: '30 mins',
      questions: 25,
      status: 'available',
      score: null,
    },
    {
      id: 'q3',
      title: 'Final Certification Exam',
      description: 'The final test to prove your mastery of the subject.',
      duration: '60 mins',
      questions: 50,
      status: 'locked',
      score: null,
    }
  ];

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
          <h1 className="text-4xl font-display font-bold mb-2 tracking-tight text-[var(--ink)]">{course.title} Quizzes</h1>
          <p className="text-[var(--text-secondary)]">Test your knowledge and track your progress with these assessments.</p>
        </div>

        <motion.div 
          variants={containerVariants} 
          initial="initial" 
          animate="animate" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quizzes.map(quiz => (
            <motion.div key={quiz.id} variants={itemVariants}>
              <ClayCard className={`p-6 h-full flex flex-col border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${quiz.status === 'locked' ? 'opacity-60 bg-[var(--bg-tertiary)]' : 'bg-[var(--bg-primary)]'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${quiz.status === 'completed' ? 'bg-[var(--accent-success)] text-[var(--bg-primary)]' : 'bg-[var(--bg-tertiary)] text-[var(--ink)]'}`}>
                    {quiz.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
                  </div>
                  <Badge 
                    variant={quiz.status === 'completed' ? 'success' : quiz.status === 'available' ? 'neutral' : 'error'}
                    className="border border-[var(--line)]"
                  >
                    {quiz.status === 'completed' ? 'Completed' : quiz.status === 'available' ? 'Available' : 'Locked'}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2 text-[var(--ink)] tracking-tight">{quiz.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 flex-1">{quiz.description}</p>
                
                <div className="flex items-center justify-between text-sm text-[var(--text-muted)] mb-6 font-mono border-t border-[var(--line)] pt-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>{quiz.questions} Qs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{quiz.duration}</span>
                  </div>
                </div>

                {quiz.status === 'completed' && quiz.score !== null && (
                  <div className="mb-6 p-3 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--line)] flex justify-between items-center">
                    <span className="text-sm font-bold text-[var(--text-secondary)]">Score</span>
                    <span className={`font-mono font-bold ${quiz.score >= 80 ? 'text-[var(--accent-success)]' : quiz.score >= 60 ? 'text-[var(--accent-warning)]' : 'text-[var(--accent-error)]'}`}>
                      {quiz.score}%
                    </span>
                  </div>
                )}
                
                <button 
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  disabled={quiz.status === 'locked'}
                  className={`w-full clay-button py-3 text-center font-bold transition-colors flex items-center justify-center gap-2 ${
                    quiz.status === 'available'
                      ? 'bg-[var(--ink)] text-[var(--bg-primary)] hover:bg-[var(--accent-secondary)] border-none' 
                      : quiz.status === 'completed'
                        ? 'bg-[var(--bg-primary)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--bg-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--line)] cursor-not-allowed'
                  }`}
                >
                  {quiz.status === 'completed' ? (
                    <>Retake Quiz <RefreshCcw className="w-4 h-4" /></>
                  ) : quiz.status === 'available' ? (
                    <>Start Quiz <Play className="w-4 h-4" /></>
                  ) : (
                    'Locked'
                  )}
                </button>
              </ClayCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  );
};
