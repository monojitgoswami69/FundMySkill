import { Link, useLocation } from 'react-router-dom';

interface TopNavBarProps {
  hasSearchBar?: boolean;
}

export function TopNavBar({ hasSearchBar = true }: TopNavBarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm dark:shadow-none font-headline antialiased">
      <div className="flex items-center justify-between px-6 h-16 w-full">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Academic Atelier
          </Link>
          {hasSearchBar && (
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/50 rounded-full px-4 py-1.5 gap-2 w-96">
              <span className="material-symbols-outlined text-slate-500 text-sm">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-900 placeholder-slate-500 outline-none"
                placeholder="Search for courses, mentors, or topics..."
                type="text"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-slate-900 transition-all duration-200 active:scale-95 transform">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-900 transition-all duration-200 active:scale-95 transform">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <Link to="/profile" className="h-8 w-8 rounded-full overflow-hidden bg-primary-fixed">
            <img
              alt="User profile avatar"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-s4tYwpbzLXg2tdVUn-MlZOvhACmJmBsEqb0-H6mz5DOSVnQ5f6GezjyX_0s4pzsczwR6j5IJmoL7SFlex3XzC-iqkjrelAFU5taR_tdR-q27mcpCIb9AdkzBYIKH6EYDPZ0gChHAFXd9v0juq6yFPFoHLdFOm76Wt46LhLyM-R7bb20czVPOvMWokQFfmjPFyUSapVtJCD5Zf9VflVB_ZtyQaUfglwxyLXDiEqj6_9W7WYBj6GzoH0wcBWZA7jsJE5tf9Im4pe4"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
