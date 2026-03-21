import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { SidebarNav } from './components/layout/SidebarNav';
import { CourseSidebar } from './components/layout/CourseSidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CourseCatalogPage } from './pages/CourseCatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LessonViewPage } from './pages/LessonViewPage';
import { TutorPage } from './pages/TutorPage';
import { QuizPage } from './pages/QuizPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { ProfilePage } from './pages/ProfilePage';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/courses" element={<CourseCatalogPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/courses/:id/lesson/:lessonId" element={<LessonViewPage />} />
        <Route path="/courses/:id/tutor" element={<TutorPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/courses/:id/resources" element={<ResourcesPage />} />
        <Route path="/courses/:id/quizzes" element={<QuizzesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isLessonView = location.pathname.includes('/lesson/');
  const isQuizView = location.pathname.includes('/quiz/') && !location.pathname.includes('/quizzes');
  const isCourseRoute = location.pathname.startsWith('/courses/') && location.pathname !== '/courses';

  const hideAllSidebars = isLandingPage || isLessonView || isQuizView;
  const showCourseSidebar = isCourseRoute && !hideAllSidebars;
  const showMainSidebar = !hideAllSidebars && !showCourseSidebar;

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {showMainSidebar && <SidebarNav />}
      {showCourseSidebar && <CourseSidebar />}
      <main className={`flex-1 ${!hideAllSidebars ? 'md:ml-0 pt-16 md:pt-0' : ''}`}>
        <AnimatedRoutes />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
