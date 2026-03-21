import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'auto_stories', label: 'My Courses', path: '/courses' },
  { icon: 'settings', label: 'Settings', path: '#' },
];

export function SideNavBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    if (path === '/courses') return location.pathname === '/courses';
    return false;
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-slate-50 dark:bg-slate-950 flex flex-col p-4 gap-2 pt-20">
      <div className="px-4 py-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">school</span>
          </div>
          <div>
            <h2 className="text-lg font-black text-blue-800 dark:text-blue-300 leading-tight">The Atelier</h2>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Deep Work Mode</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-transform duration-200 ${
              isActive(item.path)
                ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-headline font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 px-4">
        <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-headline font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-transform">
          Start Focus Session
        </button>
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-xl">
          <span className="material-symbols-outlined">contact_support</span>
          <span className="font-headline font-medium text-sm">Support</span>
        </a>
        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-xl">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-headline font-medium text-sm">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
