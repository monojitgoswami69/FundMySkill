export function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Profile Header */}
      <div className="bg-surface-container-lowest rounded-[2rem] p-10 border border-outline-variant/10 mb-8">
        <div className="flex items-start gap-8">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-primary-fixed shrink-0">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-s4tYwpbzLXg2tdVUn-MlZOvhACmJmBsEqb0-H6mz5DOSVnQ5f6GezjyX_0s4pzsczwR6j5IJmoL7SFlex3XzC-iqkjrelAFU5taR_tdR-q27mcpCIb9AdkzBYIKH6EYDPZ0gChHAFXd9v0juq6yFPFoHLdFOm76Wt46LhLyM-R7bb20czVPOvMWokQFfmjPFyUSapVtJCD5Zf9VflVB_ZtyQaUfglwxyLXDiEqj6_9W7WYBj6GzoH0wcBWZA7jsJE5tf9Im4pe4"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-1">Alex Mercer</h1>
            <p className="text-on-surface-variant mb-4">alex.mercer@institution.edu · Graduate Scholar</p>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">Level 8</span>
              <span className="px-3 py-1 bg-primary-fixed text-primary text-xs font-bold rounded-full">2.4k XP</span>
              <span className="px-3 py-1 bg-tertiary-fixed text-tertiary text-xs font-bold rounded-full">14 Day Streak</span>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-surface-container-high text-on-surface-variant font-bold text-sm rounded-xl hover:bg-surface-container-highest transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <span className="text-xs font-bold text-on-surface-variant uppercase block mb-2">Courses Enrolled</span>
          <span className="text-3xl font-black text-on-surface">4</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <span className="text-xs font-bold text-on-surface-variant uppercase block mb-2">Lessons Done</span>
          <span className="text-3xl font-black text-on-surface">47</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <span className="text-xs font-bold text-on-surface-variant uppercase block mb-2">Quiz Average</span>
          <span className="text-3xl font-black text-secondary">92%</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <span className="text-xs font-bold text-on-surface-variant uppercase block mb-2">Focus Hours</span>
          <span className="text-3xl font-black text-primary">128h</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10 mb-8">
        <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {[
            { icon: 'check_circle', color: 'text-secondary', title: 'Completed Lesson 4.2', subtitle: 'Foundations of Digital Ethics', time: '2 hours ago' },
            { icon: 'quiz', color: 'text-primary', title: 'Scored 100% on Quiz', subtitle: 'Cognitive Architectures Module', time: '1 day ago' },
            { icon: 'auto_stories', color: 'text-tertiary', title: 'Started New Course', subtitle: 'Quantum Mechanics: Field Theory', time: '3 days ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center">
                <span className={`material-symbols-outlined ${item.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">{item.title}</p>
                <p className="text-xs text-on-surface-variant">{item.subtitle}</p>
              </div>
              <span className="text-xs text-outline">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10">
        <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'local_fire_department', label: '7 Day Streak', unlocked: true },
            { icon: 'emoji_events', label: 'First Quiz Ace', unlocked: true },
            { icon: 'school', label: 'Course Master', unlocked: true },
            { icon: 'diamond', label: 'Deep Scholar', unlocked: false },
          ].map((ach, i) => (
            <div key={i} className={`flex flex-col items-center p-6 rounded-2xl text-center ${ach.unlocked ? 'bg-secondary-container/20' : 'bg-surface-container-low opacity-50'}`}>
              <span className={`material-symbols-outlined text-3xl mb-2 ${ach.unlocked ? 'text-secondary' : 'text-outline'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{ach.icon}</span>
              <span className="text-xs font-bold text-on-surface">{ach.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
