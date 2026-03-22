import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, error: authError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password.trim()) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch {
      // Error is already set in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || authError;

  return (
    <>
      {/* TopNavBar for Landing */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm font-headline antialiased flex items-center justify-between px-6 h-16 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all group"
            title="Back to home"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          </Link>
          <span className="text-xl font-bold tracking-tight text-slate-900">FundMySkill</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/donate" className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-silkscreen text-xs shadow-sm border border-red-100 uppercase tracking-tighter group">
            Donate
            <span className="material-symbols-outlined text-red-500 text-[1.2rem] group-hover:scale-125 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </Link>
        </div>
      </nav>

      <main className="min-h-screen pt-16 flex flex-col md:flex-row bg-slate-50">
        {/* Brand/Hero Section - Left Column */}
        <section className="flex-1 px-8 md:px-16 lg:px-24 py-12 md:py-24 flex flex-col justify-center relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-[60%] h-full -z-10 pointer-events-none opacity-40">
            <img
              alt="Futuristic learning illustration"
              className="w-full h-full object-contain transform translate-x-12 translate-y-12 scale-110 blur-[1px]"
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop"
            />
          </div>
          <div className="max-w-5xl relative z-10">
            <div className="mb-10">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-background leading-[1.1] tracking-tight mb-8">
                Learn with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Precision</span>,<br />
                Certify with <span className="text-secondary font-black italic underline decoration-secondary/30 decoration-8">Trust.</span>
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12 max-w-3xl font-light">
                Empowering your educational journey through crowdfunding, Socratic AI coaching, and immutable blockchain credentials.
              </p>
            </div>

            {/* Premium Bento Cards expanded */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all hover:-translate-y-1 group">
                <h3 className="font-headline font-bold text-slate-900 mb-3 text-lg">Socratic AI Tutor</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Active questioning to ensure deep, fundamental understanding of concepts, not just memory.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all hover:-translate-y-1 group">
                <h3 className="font-headline font-bold text-slate-900 mb-3 text-lg">Impact Analytics</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Track your learning curve and see exactly how crowdfunding makes your education possible.</p>
              </div>
              <div className="bg-slate-100/40 p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all hover:-translate-y-1 group">
                <h3 className="font-headline font-bold text-slate-900 mb-3 text-lg">Gamified Learning</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Get rewarded for consistency, flex your daily streaks, unlock unique achievements.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Login Section - Right Column */}
        <section className="w-full md:w-[480px] lg:w-[560px] bg-slate-100/50 dark:bg-slate-900/10 flex flex-col items-center justify-center px-8 md:px-12 py-12 border-l border-slate-200">
          <div className="w-full max-w-md bg-surface-container-lowest p-10 rounded-[1.5rem] shadow-2xl shadow-on-surface/5">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-body">Sign in to continue your learning journey</p>
            </div>

            {/* Error message */}
            {displayError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="material-symbols-outlined text-red-500 text-[18px] shrink-0 mt-0.5">error</span>
                <span>{displayError}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block font-label text-sm font-medium text-on-surface-variant mb-2 ml-1" htmlFor="email">Email</label>
                <input
                  className="w-full h-12 px-4 rounded-xl border-none bg-surface-container-low focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-fixed transition-all text-on-surface"
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block font-label text-sm font-medium text-on-surface-variant" htmlFor="password">Password</label>
                  <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot?</a>
                </div>
                <input
                  className="w-full h-12 px-4 rounded-xl border-none bg-surface-container-low focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-fixed transition-all text-on-surface"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center gap-2 px-1">
                <input className="w-4 h-4 rounded text-primary focus:ring-primary-fixed border-outline-variant" id="remember" type="checkbox" />
                <label className="text-sm text-on-surface-variant select-none" htmlFor="remember">Keep me logged in</label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary font-silkscreen font-bold rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transform flex items-center justify-center ${
                  loading ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo credentials hint */}
            <div className="mt-6 p-3 bg-[#5e81ac]/5 border border-[#5e81ac]/15 rounded-xl text-center">
              <p className="text-[11px] font-bold text-[#5e81ac]/70">
                <span className="material-symbols-outlined text-[14px] align-middle mr-1">info</span>
                Demo: <span className="font-mono bg-[#5e81ac]/10 px-1.5 py-0.5 rounded">test@gmail.com</span> / <span className="font-mono bg-[#5e81ac]/10 px-1.5 py-0.5 rounded">test1234</span>
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-6">
              <div className="w-full flex items-center gap-4">
                <div className="flex-1 h-px bg-outline-variant/30"></div>
                <span className="text-xs font-label text-outline uppercase tracking-widest">or connect via</span>
                <div className="flex-1 h-px bg-outline-variant/30"></div>
              </div>
              <div className="flex gap-4 w-full">
                <button className="w-full h-12 flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-container-highest transition-colors rounded-xl font-silkscreen text-xs font-semibold">
                  <img
                    alt="Google Logo"
                    className="w-4 h-4"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUlOifmFABF31KKj3TYPu8vXMklLz-MDez4IDkYKLw0KbsVroYUYZ_cAkXiV1O27xlfVm8Cc0JFU47uVC1B_tXRa5cxQW7ZGvUe4qaDiZaBzMYKZ45f13b2usppxr9UPWbHIa7xaMZNbldZARUUqc2c8FT9auS6Wy_lPRX-oON51PwGV_ol3wBVjqkoNdNN41aoo-P0-rZzkTdzYx809aoM_IYCu_U8lPeM1AUAxiVa8bRSW65DIBF1ICTy2tWdfXAvfgI5GGYVbc"
                  />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
