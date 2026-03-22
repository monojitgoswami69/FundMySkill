import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TopNavBar } from './components/layout/TopNavBar';
import { SideNavBar } from './components/layout/SideNavBar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CourseCataloguePage } from './pages/CourseCataloguePage';
import { LearningInterfacePage } from './pages/LearningInterfacePage';
import { CourseQuizPage } from './pages/CourseQuizPage';
import { ProfilePage } from './pages/ProfilePage';
import { DonationPage } from './pages/DonationPage';
import { MyCoursesPage } from './pages/MyCoursesPage';
import { CourseOverviewPage } from './pages/CourseOverviewPage';
import { CourseUploadPage } from './pages/CourseUploadPage';
import { CourseInsiderPage } from './pages/CourseInsiderPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';
import { AuthProvider, useAuth } from './services/AuthContext';

// ── Query Client ────────────────────────────────────────────────────
// Configure caching with React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache persists for 10 minutes (formerly cacheTime)
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnReconnect: true, // Refetch when connection is restored
    },
  },
});

// ── Wallet Manager ──────────────────────────────────────────────────
const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    {
      id: WalletId.LUTE,
      options: {
        siteName: 'FundMySkill'
      }
    }
  ],
  defaultNetwork: NetworkId.TESTNET,
});

// ── Route Guard ─────────────────────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-bold text-on-surface-variant">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/login';
  const isLessonView = location.pathname.startsWith('/learn');
  const isQuizView = location.pathname.startsWith('/quiz');

  // These pages have their own complete layout (nav, sidebar, etc.)
  const isStandalonePage = isLandingPage || isQuizView || location.pathname === '/donate' || location.pathname === '/upload-course' || isLessonView || location.pathname === '/verify';

  // Lesson view has side nav + top nav but also a right chat panel
  const isInsiderView = location.pathname.startsWith('/insider');
  const showSideNav = !isStandalonePage && !isInsiderView;

  if (isStandalonePage) {
    return (
      <div className="min-h-screen bg-surface text-on-surface antialiased font-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/verify" element={<CertificateVerifyPage />} />
          <Route path="/quiz/:quizId" element={<ProtectedRoute><CourseQuizPage /></ProtectedRoute>} />
          <Route path="/upload-course" element={<ProtectedRoute><CourseUploadPage /></ProtectedRoute>} />
          <Route path="/learn/:courseId/:moduleId/:lessonId" element={<ProtectedRoute><LearningInterfacePage /></ProtectedRoute>} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased font-body relative">
      {showSideNav && <SideNavBar />}

      <main className={`${showSideNav || isInsiderView ? 'pl-64' : ''} min-h-screen`}>
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><CourseCataloguePage /></ProtectedRoute>} />
            <Route path="/courses/:courseId" element={<ProtectedRoute><CourseOverviewPage /></ProtectedRoute>} />
            <Route path="/my-courses" element={<ProtectedRoute><MyCoursesPage /></ProtectedRoute>} />
            <Route path="/insider/:courseId" element={<ProtectedRoute><CourseInsiderPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WalletProvider manager={walletManager}>
          <Router>
            <AppLayout />
          </Router>
        </WalletProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
