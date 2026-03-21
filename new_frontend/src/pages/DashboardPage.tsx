import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Hero Header */}
      <section className="mb-12">
        <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">Welcome back, Alex.</h2>
        <p className="text-on-surface-variant font-body text-lg">You've completed 72% of your weekly goals. Ready for deep work?</p>
      </section>

      {/* Dashboard Grid (Editorial Bento Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Courses & Progress */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl text-on-surface">Enrolled Courses</h3>
            <button className="text-primary font-semibold text-sm hover:underline">View Schedule</button>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course 1 */}
            <Link to="/learn/arch-history/lesson-1" className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 group hover:shadow-md transition-shadow block">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-xl text-primary">
                  <span className="material-symbols-outlined">architecture</span>
                </div>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold tracking-wide">ACTIVE</span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-1">Architectural History II</h4>
              <p className="text-on-surface-variant text-sm mb-6">Module 4: Post-Modernism in Europe</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface-variant">Progress</span>
                  <span className="text-secondary">68%</span>
                </div>
                <div className="w-full h-2 bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[68%]"></div>
                </div>
              </div>
            </Link>

            {/* Course 2 */}
            <Link to="/learn/cogneuro/lesson-1" className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 group hover:shadow-md transition-shadow block">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-tertiary-fixed flex items-center justify-center rounded-xl text-tertiary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold tracking-wide">4 DAYS LEFT</span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-1">Cognitive Neuroscience</h4>
              <p className="text-on-surface-variant text-sm mb-6">Module 2: Neural Plasticity</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface-variant">Progress</span>
                  <span className="text-secondary">42%</span>
                </div>
                <div className="w-full h-2 bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[42%]"></div>
                </div>
              </div>
            </Link>
          </div>

          {/* Recommended Next (Bento Large) */}
          <div className="bg-primary-container/10 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="z-10 flex-1">
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">Recommended Next Lesson</span>
              <h3 className="font-headline font-extrabold text-2xl text-on-surface mb-4">The Ethics of Urban Restoration</h3>
              <p className="text-on-surface-variant mb-6 max-w-md leading-relaxed">Continue your streak! This lesson explores how mid-century restoration projects shaped modern city planning.</p>
              <Link
                to="/learn/arch-history/lesson-2"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-lg w-fit"
              >
                Resume Learning
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </Link>
            </div>
            <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden shadow-2xl z-10">
              <img
                alt="Lesson thumbnail"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXuhtYfVc_Z4YX9qvhSWw2C3INjR4aoizlJ0aeJPtKemY53gcKuoBNM_IZZ7Ft3FqT8WgTnzqePG3BGRxLJPIJfwlLoymu9Kw_eCjHnqLObb0UKcIpFRKLeE7RN8cuuIvf7_ikALTRmxeXN8q2l4IEC0z2dRgmvonuy0WiwhtJZRNx5VZiy8o6VvxUKi36H9IJDrqOs3eLMn7TNDR1XQbPG5AeMwtGHGB4DalpZhiAK_cGmc2Nni9AsQlx18bRrZVxk5y4MTUXPT4"
              />
            </div>
            {/* Abstract Design Element */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Right Column: Deadlines & Stats */}
        <div className="lg:col-span-4 space-y-8">
          {/* Upcoming Deadlines */}
          <div className="bg-surface-container-low rounded-xl p-6">
            <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Upcoming Deadlines</h3>
            <div className="space-y-6">
              {/* Deadline 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center w-12 h-14 bg-white rounded-lg shadow-sm">
                  <span className="text-xs font-bold text-error uppercase">Oct</span>
                  <span className="text-lg font-extrabold text-on-surface">24</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm text-on-surface">Final Thesis Draft</h5>
                  <p className="text-xs text-on-surface-variant">Urban Studies · 11:59 PM</p>
                </div>
                <span className="material-symbols-outlined text-error text-xl">event_note</span>
              </div>
              {/* Deadline 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center w-12 h-14 bg-white rounded-lg shadow-sm">
                  <span className="text-xs font-bold text-primary uppercase">Oct</span>
                  <span className="text-lg font-extrabold text-on-surface">28</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm text-on-surface">Neural Mapping Lab</h5>
                  <p className="text-xs text-on-surface-variant">Cognitive Neuro · 5:00 PM</p>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-xl">event_note</span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-surface-container-highest text-on-surface-variant rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
              Open Academic Calendar
            </button>
          </div>

          {/* AI Tutor Insights */}
          <div className="bg-inverse-surface text-on-primary-container p-6 rounded-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed">smart_toy</span>
              <span className="font-headline font-bold">AI Tutor Insight</span>
            </div>
            <p className="text-sm font-medium leading-relaxed mb-4 text-surface-container-low">
              "You tend to excel in 45-minute bursts during early mornings. Your retention rate is 15% higher when you review flashcards before 9 AM."
            </p>
            <a className="text-tertiary-fixed text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all" href="#">
              Adjust study schedule <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant block mb-1">STREAK</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-on-surface">14</span>
                <span className="text-xs text-secondary font-bold">DAYS</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant block mb-1">XP EARNED</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-on-surface">2.4k</span>
                <span className="text-xs text-primary font-bold">LVL 8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">add</span>
        </button>
      </div>
    </div>
  );
}
