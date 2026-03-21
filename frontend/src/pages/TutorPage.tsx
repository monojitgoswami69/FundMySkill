import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Send, Plus, Search, MessageSquare, Bot, User, RefreshCw, ArrowLeft } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { TypingIndicator } from '../components/common/TypingIndicator';
import { useStore } from '../store';
import { cn } from '../utils/cn';

export const TutorPage: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = useStore(state => state.courses.find(c => c.id === courseId));
  
  const messages = useStore(state => state.messages);
  const addMessage = useStore(state => state.addMessage);
  const clearMessages = useStore(state => state.clearMessages);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addMessage(newUserMsg);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `That's an interesting point about ${course?.title || 'this topic'}. Let's explore that further. What do you think would happen if we applied the same logic to a different scenario?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    `Explain the core concepts of ${course?.title || 'this course'}`,
    "Can you give me a practice question?",
    "I'm stuck on the last module.",
    "Summarize the key takeaways so far."
  ];

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Course not found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] md:h-screen bg-[var(--bg-primary)] overflow-hidden">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-80 flex-col bg-[var(--bg-secondary)] border-r border-[var(--line)]">
        <div className="p-4 border-b border-[var(--line)]">
          <button 
            onClick={() => navigate(`/courses/${courseId}`)}
            className="w-full mb-4 flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Course
          </button>
          <button 
            onClick={clearMessages}
            className="w-full clay-button py-3 flex items-center justify-center gap-2 font-bold text-[var(--ink)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <Plus className="w-5 h-5" /> New Conversation
          </button>
        </div>
        
        <div className="p-4 border-b border-[var(--line)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="w-full bg-[var(--bg-primary)] border border-[var(--line)] rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 font-mono">Today</div>
          <button className="w-full text-left p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--line)] hover:bg-[var(--bg-tertiary)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="font-bold text-sm truncate mb-1 text-[var(--ink)]">Understanding {course.title}</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">10:00 AM</div>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-[var(--line)] bg-[var(--bg-primary)]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/courses/${courseId}`)}
              className="md:hidden p-2 -ml-2 text-[var(--text-muted)] hover:text-[var(--ink)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[var(--ink)] flex items-center justify-center">
              <Bot className="w-6 h-6 text-[var(--bg-primary)]" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-[var(--ink)] tracking-tight">AI Tutor - {course.title}</h1>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-success)] font-mono">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-success)] animate-pulse" />
                Socratic Mode ON
              </div>
            </div>
          </div>
          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--ink)] transition-colors" onClick={clearMessages} title="Reset Conversation">
            <RefreshCw className="w-5 h-5" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-6 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Bot className="w-12 h-12 text-[var(--ink)]" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-2 tracking-tight text-[var(--ink)]">How can I help you learn today?</h2>
                <p className="text-[var(--text-secondary)] max-w-md mb-8">I won't just give you the answers. I'll guide you to discover them yourself through questions and hints.</p>
                
                <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
                  {suggestions.map((suggestion, i) => (
                    <button 
                      key={i}
                      onClick={() => setInput(suggestion)}
                      className="px-5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--line)] text-sm font-bold hover:bg-[var(--bg-secondary)] hover:text-[var(--ink)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-4 max-w-[85%]",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                      msg.role === 'user' ? "bg-[var(--ink)]" : "bg-[var(--bg-primary)]"
                    )}>
                      {msg.role === 'user' ? <User className="w-5 h-5 text-[var(--bg-primary)]" /> : <Bot className="w-5 h-5 text-[var(--ink)]" />}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className={cn(
                        "px-5 py-3.5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                        msg.role === 'user' 
                          ? "bg-[var(--ink)] text-[var(--bg-primary)] rounded-tr-sm border border-[var(--ink)]" 
                          : "bg-[var(--bg-primary)] text-[var(--ink)] border border-[var(--line)] rounded-tl-sm"
                      )}>
                        {msg.role === 'user' ? (
                          <p className="font-medium">{msg.content}</p>
                        ) : (
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold text-[var(--text-muted)] font-mono",
                        msg.role === 'user' ? "text-right mr-1" : "ml-1"
                      )}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 max-w-[85%] mr-auto"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center flex-shrink-0 mt-1 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <Bot className="w-5 h-5 text-[var(--ink)]" />
                    </div>
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-[var(--bg-primary)] border-t border-[var(--line)]">
          <div className="max-w-3xl mx-auto relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question... (Shift+Enter for new line)"
              className="w-full bg-[var(--bg-primary)] border border-[var(--line)] rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] resize-none min-h-[60px] max-h-[200px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--ink)] text-[var(--bg-primary)] rounded-xl flex items-center justify-center hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-[var(--text-muted)] font-bold font-mono">AI can make mistakes. Verify important information.</span>
          </div>
        </div>
      </main>
    </div>
  );
};
