import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, BookOpen, Clock, BarChart } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { Badge } from '../components/common/Badge';
import { useStore } from '../store';

export const CourseCatalogPage: React.FC = () => {
  const courses = useStore(state => state.courses);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');

  const subjects = ['All', ...Array.from(new Set(courses.map(c => c.subject)))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = activeSubject === 'All' || course.subject === activeSubject;
    return matchesSearch && matchesSubject;
  });

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  } as const;

  return (
    <PageWrapper>
      <div className="space-y-10">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--line)] pb-6">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2 tracking-tight">Course Catalogue</h1>
            <p className="text-[var(--text-secondary)]">Explore our expert-crafted courses and start learning today.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-primary)] text-[var(--ink)] pl-12 pr-4 py-3 rounded-xl border border-[var(--line)] focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <Filter className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 mr-2" />
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors border ${
                activeSubject === subject
                  ? 'bg-[var(--ink)] text-[var(--bg-primary)] border-[var(--ink)]'
                  : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--ink)] border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div 
            variants={containerVariants} 
            initial="initial" 
            animate="animate" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map(course => (
              <motion.div key={course.id} variants={itemVariants}>
                <ClayCard hoverable className="h-full flex flex-col overflow-hidden" colorAccent={course.colorAccent}>
                  <div className="h-40 bg-[var(--bg-tertiary)] relative border-b border-[var(--line)]">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="neutral" className="bg-white/90 backdrop-blur-sm border border-[var(--line)] text-[var(--ink)]">{course.subject}</Badge>
                      <Badge 
                        variant={course.difficulty === 'Beginner' ? 'success' : course.difficulty === 'Intermediate' ? 'warning' : 'error'}
                        className="bg-white/90 backdrop-blur-sm border border-[var(--line)]"
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-display font-bold mb-1 line-clamp-2 text-[var(--ink)]">{course.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-4 font-mono">by {course.instructor}</p>
                    <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-3 flex-1">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-[var(--text-muted)] mb-6 font-mono border-t border-[var(--line)] pt-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessonCount} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/courses/${course.id}`}
                      className={`w-full clay-button py-3 text-center font-bold transition-colors ${
                        course.progress > 0 
                          ? 'bg-[var(--ink)] text-[var(--bg-primary)] hover:bg-[var(--accent-secondary)] border-none' 
                          : 'text-[var(--ink)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      {course.progress > 0 ? 'Continue Course' : 'View Details'}
                    </Link>
                  </div>
                </ClayCard>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 border border-[var(--line)] rounded-2xl bg-[var(--bg-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--line)]">
              <Search className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 tracking-tight">No courses found</h3>
            <p className="text-[var(--text-secondary)]">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
