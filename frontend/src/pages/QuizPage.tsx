import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RefreshCcw, Download } from 'lucide-react';
import { ClayCard } from '../components/common/ClayCard';
import { MOCK_QUIZ } from '../data/mock';
import { cn } from '../utils/cn';

export const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, fetch quiz by id
  const quiz = MOCK_QUIZ;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (isSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) correct++;
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <ClayCard className="p-8 md:p-12 text-center border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h2 className="text-4xl font-display font-bold mb-8 tracking-tight text-[var(--ink)]">Quiz Results</h2>
            
            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="12" />
                <motion.circle 
                  cx="50" cy="50" r="40" fill="transparent" 
                  stroke={score >= 80 ? "var(--accent-success)" : score >= 60 ? "var(--accent-warning)" : "var(--accent-error)"} 
                  strokeWidth="12" 
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold font-mono text-[var(--ink)]">{score}%</span>
                <span className="text-sm text-[var(--text-muted)] font-bold uppercase tracking-wider font-mono">Score</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-10">
              <div className="bg-[var(--bg-tertiary)] p-4 rounded-2xl border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="text-[var(--text-muted)] text-sm mb-1 font-bold font-mono">Time Taken</div>
                <div className="font-bold text-2xl text-[var(--ink)] font-mono">{formatTime(600 - timeLeft)}</div>
              </div>
              <div className="bg-[var(--bg-tertiary)] p-4 rounded-2xl border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="text-[var(--text-muted)] text-sm mb-1 font-bold font-mono">Correct</div>
                <div className="font-bold text-2xl text-[var(--ink)] font-mono">{Math.round((score / 100) * quiz.questions.length)} / {quiz.questions.length}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setTimeLeft(600);
                }}
                className="clay-button px-6 py-3 font-bold flex items-center justify-center gap-2 text-[var(--ink)] bg-[var(--bg-primary)] border border-[var(--line)] hover:bg-[var(--bg-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors"
              >
                <RefreshCcw className="w-5 h-5" /> Retake Quiz
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="clay-button px-6 py-3 font-bold bg-[var(--ink)] text-[var(--bg-primary)] hover:bg-[var(--accent-secondary)] border border-[var(--ink)] transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </ClayCard>
        </motion.div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-[var(--line)] bg-[var(--bg-primary)] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors text-[var(--text-muted)] hover:text-[var(--ink)]">
            <XCircle className="w-6 h-6" />
          </button>
          <h1 className="font-bold hidden sm:block text-[var(--ink)]">{quiz.title}</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-sm font-bold text-[var(--text-secondary)] font-mono">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold transition-colors border",
            timeLeft < 10 ? "bg-[var(--accent-error)]/10 text-[var(--accent-error)] border-[var(--accent-error)]/20" :
            timeLeft < 30 ? "bg-[var(--accent-warning)]/10 text-[var(--accent-warning)] border-[var(--accent-warning)]/20" :
            "bg-[var(--bg-tertiary)] text-[var(--ink)] border-[var(--line)]"
          )}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-[var(--bg-tertiary)] w-full">
        <motion.div 
          className="h-full bg-[var(--ink)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ClayCard className="p-6 md:p-10 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 leading-tight text-[var(--ink)] tracking-tight">
                  {question.text}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestion] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={cn(
                          "text-left p-4 rounded-2xl border transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                          isSelected 
                            ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg-primary)]" 
                            : "border-[var(--line)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] text-[var(--ink)]"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border",
                            isSelected ? "bg-[var(--bg-primary)] text-[var(--ink)] border-transparent" : "bg-[var(--bg-tertiary)] text-[var(--text-muted)] border-[var(--line)]"
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={cn("font-bold", isSelected ? "text-[var(--bg-primary)]" : "text-[var(--ink)]")}>
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ClayCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="h-20 border-t border-[var(--line)] bg-[var(--bg-primary)] flex items-center justify-between px-4 md:px-8">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="clay-button px-5 py-2.5 flex items-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--bg-primary)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--bg-secondary)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        >
          <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Previous</span>
        </button>
        
        <button
          onClick={handleNext}
          className={cn(
            "clay-button px-6 py-2.5 flex items-center gap-2 font-bold transition-colors border",
            currentQuestion === quiz.questions.length - 1
              ? "bg-[var(--accent-success)] text-[var(--bg-primary)] hover:bg-[var(--accent-success)]/90 border-[var(--accent-success)]"
              : "bg-[var(--ink)] text-[var(--bg-primary)] hover:bg-[var(--accent-secondary)] border-[var(--ink)]"
          )}
        >
          {currentQuestion === quiz.questions.length - 1 ? (
            <>Submit Quiz <CheckCircle2 className="w-5 h-5" /></>
          ) : (
            <><span className="hidden sm:inline">Next</span> <ChevronRight className="w-5 h-5" /></>
          )}
        </button>
      </footer>
    </div>
  );
};
