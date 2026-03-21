import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { useStore } from '../store';
import { Play, Flame, BookOpen, Clock, ArrowRight, Compass } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const user = useStore(state => state.user);
  const courses = useStore(state => state.courses);
  
  const enrolledCourses = courses.filter(c => c.progress > 0 || c.id === 'c4'); // Mock enrolled courses
  const exploreCourses = courses.filter(c => c.progress === 0 && c.id !== 'c4').slice(0, 3);

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  } as const;

  return (
    <PageWrapper>
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-10">
        
        {/* Welcome Banner */}
        <motion.div variants={itemVariants}>
          <div className="bg-[var(--bg-primary)] border border-[var(--line)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-[var(--text-secondary)]">You're on a {user.stats.currentStreak}-day learning streak. Keep it up!</p>
            </div>
            <div className="flex items-center gap-3 bg-[var(--bg-secondary)] px-5 py-3 rounded-xl border border-[var(--line)]">
              <Flame className="w-6 h-6 text-[var(--accent-warning)]" />
              <span className="font-bold text-xl text-[var(--ink)]">{user.stats.currentStreak} Days</span>
            </div>
          </div>
        </motion.div>

        {/* Learning Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl font-display font-bold tracking-tight">Learning Hours</h2>
            <div className="bg-[var(--bg-primary)] border border-[var(--line)] rounded-2xl p-6 h-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={user.learningHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: 'var(--bg-secondary)' }}
                    contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--line)', borderRadius: '8px', color: 'var(--ink)' }}
                  />
                  <Bar dataKey="hours" fill="var(--ink)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl font-display font-bold tracking-tight">Learning Score Trend</h2>
            <div className="bg-[var(--bg-primary)] border border-[var(--line)] rounded-2xl p-6 h-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={user.scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--line)', borderRadius: '8px', color: 'var(--ink)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="var(--ink)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Your Courses */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <h2 className="text-2xl font-display font-bold tracking-tight">Your Courses</h2>
            <Link to="/courses" className="text-sm text-[var(--text-muted)] hover:text-[var(--ink)] font-medium transition-colors">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {enrolledCourses.map(course => (
              <ClayCard key={course.id} hoverable className="flex flex-col">
                <div className="h-32 bg-[var(--bg-tertiary)] relative overflow-hidden border-b border-[var(--line)]">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-90" />
                  <Badge className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-[var(--line)] text-[var(--ink)]">
                    {course.subject}
                  </Badge>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{course.instructor}</p>
                  
                  <div className="mt-auto space-y-4">
                    <ProgressBar value={course.progress} color={course.colorAccent} showLabel />
                    <Link 
                      to={`/courses/${course.id}`}
                      className="w-full clay-button py-2.5 flex items-center justify-center gap-2 text-sm font-bold bg-[var(--ink)] text-[var(--bg-primary)] hover:bg-[var(--accent-secondary)] border-none"
                    >
                      <Play className="w-4 h-4" /> {course.progress === 0 ? 'Start Course' : 'Resume'}
                    </Link>
                  </div>
                </div>
              </ClayCard>
            ))}
          </div>
        </motion.div>

        {/* Explore Catalogue */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <h2 className="text-2xl font-display font-bold tracking-tight">Explore Catalogue</h2>
            <Link to="/courses" className="text-sm text-[var(--text-muted)] hover:text-[var(--ink)] font-medium flex items-center gap-1 transition-colors">
              Browse More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {exploreCourses.map(course => (
              <Link key={course.id} to={`/courses/${course.id}`} className="group">
                <div className="bg-[var(--bg-primary)] border border-[var(--line)] rounded-2xl p-4 flex gap-4 hover:border-[var(--ink)] transition-colors h-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--bg-tertiary)] border border-[var(--line)]">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-[var(--ink)] line-clamp-2 mb-1 group-hover:text-[var(--accent-primary)] transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.lessonCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
};
