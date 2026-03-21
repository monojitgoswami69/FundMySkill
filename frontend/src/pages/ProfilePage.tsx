import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Edit2, Check, Footprints, Award, Moon, Flame, Brain, Bot, Settings, Bell, Shield, LogOut, Sun } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClayCard } from '../components/common/ClayCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { useStore } from '../store';

export const ProfilePage: React.FC = () => {
  const user = useStore(state => state.user);
  const updateUser = useStore(state => state.updateUser);
  const courses = useStore(state => state.courses);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleSave = () => {
    updateUser({ name: editName, email: editEmail });
    setIsEditing(false);
  };

  const icons: Record<string, any> = {
    footprints: Footprints,
    award: Award,
    moon: Moon,
    flame: Flame,
    brain: Brain,
    bot: Bot,
  };

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  } as const;

  return (
    <PageWrapper>
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-10 max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <ClayCard className="p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-[var(--ink)] overflow-hidden bg-[var(--bg-tertiary)] shadow-inner">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[var(--bg-primary)] border border-[var(--line)] rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg-primary)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4 w-full">
              {isEditing ? (
                <div className="space-y-3 max-w-md mx-auto md:mx-0">
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--line)] rounded-xl px-4 py-2 font-display font-bold text-xl focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  />
                  <input 
                    type="email" 
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--line)] rounded-xl px-4 py-2 text-[var(--text-secondary)] focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  />
                  <div className="flex gap-2 justify-center md:justify-start">
                    <button onClick={handleSave} className="clay-button px-5 py-2.5 bg-[var(--ink)] text-[var(--bg-primary)] font-bold flex items-center gap-2 text-sm border border-[var(--ink)] hover:bg-[var(--accent-secondary)] transition-colors">
                      <Check className="w-4 h-4" /> Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="clay-button px-5 py-2.5 bg-[var(--bg-primary)] text-[var(--ink)] font-bold text-sm border border-[var(--line)] hover:bg-[var(--bg-secondary)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h1 className="text-4xl font-display font-bold mb-1 tracking-tight text-[var(--ink)]">{user.name}</h1>
                    <p className="text-[var(--text-secondary)] font-mono">{user.email}</p>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="clay-button px-5 py-2.5 bg-[var(--bg-primary)] text-[var(--ink)] font-bold text-sm flex items-center gap-2 mx-auto md:mx-0 border border-[var(--line)] hover:bg-[var(--bg-secondary)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                </>
              )}
            </div>

            <div className="flex gap-4 w-full md:w-auto justify-center">
              <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-2xl min-w-[100px] border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="text-3xl font-bold font-mono text-[var(--ink)]">{user.stats.currentStreak}</div>
                <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mt-1 font-mono">Day Streak</div>
              </div>
              <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-2xl min-w-[100px] border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="text-3xl font-bold font-mono text-[var(--ink)]">{user.stats.quizAverage}%</div>
                <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mt-1 font-mono">Avg Score</div>
              </div>
            </div>
          </ClayCard>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Stats & Progress */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 tracking-tight text-[var(--ink)]">Course Progress</h2>
              <div className="space-y-4">
                {courses.filter(c => c.progress > 0).map(course => (
                  <ClayCard key={course.id} className="p-4 flex items-center gap-4 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] overflow-hidden flex-shrink-0 border border-[var(--line)]">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-2 line-clamp-1 text-[var(--ink)]">{course.title}</h3>
                      <ProgressBar value={course.progress} color={course.colorAccent} height="sm" />
                    </div>
                    <div className="text-sm font-mono font-bold text-[var(--text-muted)]">{course.progress}%</div>
                  </ClayCard>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-6 tracking-tight text-[var(--ink)]">Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.achievements.map(achievement => {
                  const Icon = icons[achievement.icon] || Award;
                  return (
                    <ClayCard 
                      key={achievement.id} 
                      className={`p-4 flex items-start gap-4 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${!achievement.unlocked ? 'opacity-60 grayscale bg-[var(--bg-tertiary)]' : 'bg-[var(--bg-primary)]'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--line)] ${achievement.unlocked ? 'bg-[var(--ink)]' : 'bg-[var(--bg-secondary)]'}`}>
                        <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-[var(--bg-primary)]' : 'text-[var(--text-muted)]'}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-1 text-[var(--ink)]">{achievement.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)]">{achievement.description}</p>
                      </div>
                    </ClayCard>
                  );
                })}
              </div>
            </section>
          </motion.div>

          {/* Settings */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-display font-bold mb-6 tracking-tight text-[var(--ink)]">Settings</h2>
            <ClayCard className="p-2 border border-[var(--line)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="divide-y divide-[var(--line)]">
                <button className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <Bell className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-[var(--ink)]">Notifications</span>
                  </div>
                </button>
                
                <button className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-[var(--ink)]">Privacy & Security</span>
                  </div>
                </button>
              </div>
            </ClayCard>

            <button className="w-full clay-button p-4 flex items-center justify-center gap-2 text-[var(--accent-error)] bg-[var(--bg-primary)] border border-[var(--line)] hover:bg-[var(--bg-tertiary)] font-bold mt-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </motion.div>

        </div>
      </motion.div>
    </PageWrapper>
  );
};
