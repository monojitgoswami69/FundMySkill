import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fallbackCourses } from './CourseCataloguePage';
import { useCourse, useCourseProgress } from '../hooks/useApi';
import { certificateApi, getUserId } from '../services/api';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../services/AuthContext';

export function CourseInsiderPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch course and progress from API
  const { data: apiCourse, isLoading: courseLoading } = useCourse(courseId || '');
  const { data: progress, isLoading: progressLoading } = useCourseProgress(courseId || '');

  // Fallback to static data
  const fallbackCourse = fallbackCourses.find((c) => c.id === courseId) || fallbackCourses[0] || null;
  const course = apiCourse || fallbackCourse;

  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'ai-tutor' | 'assessments' | 'certificate'>('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Study Notes']);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<number[]>([3]);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [generatingCert, setGeneratingCert] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);
  const [certLoading, setCertLoading] = useState(false);

  const loading = courseLoading || progressLoading;

  const toggleResource = (id: string) => {
    setSelectedResources(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleModule = (id: number) => {
    setExpandedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // Build modules from API progress or fallback
  const modules = progress?.modules?.length ? progress.modules.map((mod, idx) => ({
    id: idx + 1,
    title: mod.title,
    status: mod.completed_lectures === mod.total_lectures ? 'completed' :
            mod.completed_lectures > 0 ? 'in-progress' :
            idx === 0 || (progress.modules[idx - 1]?.completed_lectures === progress.modules[idx - 1]?.total_lectures) ? 'in-progress' : 'locked',
    lectures: mod.lectures?.map((l: { title: string }) => l.title) ||
              ['Lecture 1', 'Lecture 2', 'Lecture 3', 'Lecture 4'],
    lectureData: mod.lectures || [],
  })) : [
    { id: 1, title: 'Foundational Paradigms', status: 'completed', lectures: ['History of Computation', 'Cybernetics Roots', 'Neural Foundations', 'Ethics of Autonomy'], lectureData: [] },
    { id: 2, title: 'Procedural Generation', status: 'completed', lectures: ['Geometric Calculus', 'Asset Pipelines', 'Noise Functions', 'Iterative Expansion'], lectureData: [] },
    { id: 3, title: 'Industrial Implementation', status: 'in-progress', lectures: ['Latency Optimization', 'Sensor Fusion', 'Real-world datasets', 'Hardware Acceleration'], lectureData: [] },
    { id: 4, title: 'Advanced Robotics Architecture', status: 'locked', lectures: ['Kinematic Chains', 'Inverse Kinematics', 'State Estimators', 'Robust Control'], lectureData: [] },
  ];

  // Calculate progress percentage
  const progressPercentage = progress?.progress_percentage ?? 68;
  const completedModules = modules.filter(m => m.status === 'completed').length;

  const resourceCategories = [
    { title: 'Study Notes', icon: 'description', color: 'blue' },
    { title: 'Short Notes', icon: 'summarize', color: 'purple' },
    { title: 'Lecture Notes', icon: 'notebook', color: 'orange' },
    { title: 'Mind Maps', icon: 'account_tree', color: 'teal' },
  ];

  const isCourseCompleted = progressPercentage >= 100;

  const navItems = [
    { id: 'overview', icon: 'dashboard', label: 'Overview' },
    { id: 'resources', icon: 'folder_open', label: 'Resources' },
    { id: 'ai-tutor', icon: 'smart_toy', label: 'AI Tutor' },
    { id: 'assessments', icon: 'assignment', label: 'Assessments' },
    { id: 'certificate', icon: 'workspace_premium', label: 'Certificate' },
  ] as const;

  // Auto-fetch existing certificate on mount when course is completed
  useEffect(() => {
    if (isCourseCompleted && courseId && !certificateData) {
      setCertLoading(true);
      certificateApi.get(getUserId(), courseId)
        .then((result) => {
          if (result.success && result.certificate) {
            setCertificateData(result.certificate);
          }
        })
        .catch(() => {
          // No existing certificate — user needs to generate one
        })
        .finally(() => setCertLoading(false));
    }
  }, [isCourseCompleted, courseId]);

  const handleGenerateCertificate = async () => {
    setGeneratingCert(true);
    setCertError(null);
    try {
      const result = await certificateApi.generate({
        user_id: getUserId(),
        course_id: courseId || '',
        holder_name: user?.displayName || 'Alex Johnson',
      });
      if (result.success && result.certificate) {
        setCertificateData(result.certificate);
      } else {
        setCertError(result.message || 'Failed to generate certificate');
      }
    } catch (err: any) {
      setCertError(err.message || 'Failed to generate certificate');
    } finally {
      setGeneratingCert(false);
    }
  };

  const assessments = progress?.quizzes?.length ? progress.quizzes.map((q: { id: string; title: string; score?: number; status: string; due_date?: string }, idx: number) => ({
    id: idx + 1,
    title: q.title,
    date: q.due_date || 'TBD',
    status: q.status || 'upcoming',
    score: q.score ? `${q.score}%` : null,
  })) : [
    { id: 1, title: 'Foundational Quiz', date: 'March 05, 2026', status: 'completed', score: '94%' },
    { id: 2, title: 'Procedural Baseline', date: 'March 12, 2026', status: 'completed', score: '88%' },
    { id: 3, title: 'Module 3 Practical', date: 'March 18, 2026', status: 'missed', score: null },
    { id: 4, title: 'Mid-term Assessment', date: 'April 02, 2026', status: 'upcoming', score: null },
    { id: 5, title: 'Final Project Submission', date: 'May 10, 2026', status: 'upcoming', score: null },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse space-y-6 w-full max-w-3xl">
          <div className="h-12 bg-surface-container-high rounded w-3/4"></div>
          <div className="h-6 bg-surface-container-high rounded w-1/2"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-surface-container-high rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 min-h-[80vh] flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the course you were looking for.</p>
          <Link to="/my-courses" className="px-6 py-3 bg-[#5e81ac] text-white rounded-xl font-bold">
            Back to My Courses
          </Link>
      </div>
    );
  }

  return (
    <>
      {/* Secondary Course Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-white shadow-[1px_0_40px_rgba(25,27,35,0.03)] flex flex-col py-8 gap-2 font-body tracking-wide border-r border-outline-variant/10 z-30">
        <div className="px-4 mb-8">
          <Link
            to="/my-courses"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-[#2e3440]/60 hover:text-[#5e81ac] hover:bg-[#f0f7ff] transition-all group font-body"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to My Courses
          </Link>
        </div>
        
        <div className="flex flex-col gap-1 pr-4">
          {navItems.map((item) => {
            const isCertTab = item.id === 'certificate';
            const isDisabled = isCertTab && !isCourseCompleted;
            return (
              <button 
                key={item.id}
                onClick={() => !isDisabled && setActiveTab(item.id)}
                disabled={isDisabled}
                className={`flex items-center gap-3 w-full px-6 py-3.5 text-sm font-bold transition-all ${
                  isDisabled
                    ? 'text-[#4c566a]/30 cursor-not-allowed opacity-50'
                    : activeTab === item.id
                      ? 'text-[#5e81ac] bg-[#f0f7ff] rounded-r-2xl shadow-sm border-l-4 border-[#5e81ac]'
                      : 'text-[#2e3440] hover:translate-x-1 hover:text-[#5e81ac]'
                }`}
                title={isDisabled ? 'Complete 100% of the course to unlock certificate' : ''}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span> {item.label}
                {isCertTab && !isCourseCompleted && (
                  <span className="material-symbols-outlined text-[14px] ml-auto">lock</span>
                )}
                {isCertTab && isCourseCompleted && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Dynamic Tab Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* On-Page Hero Section */}
              <section className="flex flex-col md:flex-row justify-between items-center gap-12 bg-white/50 backdrop-blur-md p-10 rounded-[2.5rem] border border-slate-100/60 shadow-sm">
                <div className="flex-1">
                  <h1 className="text-5xl font-black text-[#2e3440] tracking-tighter mb-6 font-headline leading-[1.05]">{course.title}</h1>
                  <div className="flex flex-wrap gap-8 text-[#4c566a] font-bold text-[10px] uppercase tracking-[0.2em] opacity-70">
                    <span className="flex items-center gap-2.5"><span className="material-symbols-outlined text-sm text-[#5e81ac]">person</span> {course.instructor}</span>
                    <span className="flex items-center gap-2.5"><span className="material-symbols-outlined text-sm text-[#5e81ac]">verified</span> {course.institution}</span>
                    <span className="flex items-center gap-2.5"><span className="material-symbols-outlined text-sm text-[#5e81ac]">schedule</span> 12 Weeks</span>
                  </div>
                </div>
                
                <div className="w-full md:w-80 space-y-5">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#5e81ac]">Current Mastery</span>
                    <span className="text-3xl font-black text-[#2e3440]">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100/80 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-[#5e81ac] to-[#81a1c1] rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-[#4c566a]/50 uppercase tracking-[0.15em]">
                    <span>{completedModules} / {modules.length} Modules</span>
                    <span>14 Days Left</span>
                  </div>
                </div>
              </section>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-3xl font-black font-headline text-[#2e3440] tracking-tight">Syllabus & Roadmap</h2>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4c566a]/50">
                    {completedModules} / {modules.length} Modules Complete
                  </span>
                </div>

                <div className="bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-slate-100/60 shadow-sm overflow-hidden flex flex-col">
                  {modules.map((mod, index) => {
                    const completedLectures = mod.status === 'completed' ? mod.lectures.length : mod.status === 'in-progress' ? 2 : 0;
                    const progress = Math.round((completedLectures / mod.lectures.length) * 100);
                    const isLast = index === modules.length - 1;
                    
                    return (
                    <div 
                      key={mod.id} 
                      className={`relative transition-all duration-300 ${
                        mod.status === 'locked' 
                          ? 'opacity-50 bg-slate-50/40' 
                          : mod.status === 'in-progress'
                            ? 'bg-white/80'
                            : 'hover:bg-white/60'
                      }`}
                    >
                      {/* Module Header */}
                      <button 
                        onClick={() => mod.status !== 'locked' && toggleModule(mod.id)}
                        className={`w-full flex items-center gap-6 px-8 py-7 text-left transition-all group ${mod.status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                          mod.status === 'completed' ? 'bg-green-50 text-green-600' : 
                          mod.status === 'in-progress' ? 'bg-[#5e81ac] text-white shadow-md shadow-[#5e81ac]/25' : 'bg-slate-100/80 text-slate-400'
                        }`}>
                          <span className="material-symbols-outlined text-[20px]">
                            {mod.status === 'completed' ? 'check' : mod.status === 'in-progress' ? 'play_arrow' : 'lock'}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                              mod.status === 'completed' ? 'text-green-600/70' : mod.status === 'in-progress' ? 'text-[#5e81ac]' : 'text-slate-400'
                            }`}>Module {mod.id}</span>
                            {mod.status === 'in-progress' && (
                              <span className="text-[9px] font-black uppercase tracking-widest bg-[#5e81ac]/10 text-[#5e81ac] px-2.5 py-0.5 rounded-md">In Progress</span>
                            )}
                          </div>
                          <h3 className="text-xl font-black font-headline text-[#2e3440] group-hover:text-[#5e81ac] transition-colors tracking-tight">{mod.title}</h3>
                        </div>

                        <div className="flex items-center gap-6 shrink-0">
                          {/* Mini progress */}
                          <div className="hidden md:flex items-center gap-3">
                            <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${mod.status === 'completed' ? 'bg-green-400' : 'bg-[#5e81ac]'}`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-black text-[#4c566a]/50 w-8">{progress}%</span>
                          </div>

                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            expandedModules.includes(mod.id) ? 'bg-slate-100' : 'group-hover:bg-slate-100/50'
                          }`}>
                            <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                              expandedModules.includes(mod.id) ? 'text-[#5e81ac] rotate-180' : 'text-slate-400'
                            }`}>expand_more</span>
                          </div>
                        </div>
                      </button>

                      {/* Expanded Lectures */}
                      {expandedModules.includes(mod.id) && (
                        <div className="px-8 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="border-t border-slate-100/80 pt-4">
                            <div className="grid grid-cols-1 gap-1.5">
                              {mod.lectures.map((lec, idx) => {
                                const isLecCompleted = mod.status === 'completed' || (mod.status === 'in-progress' && idx < 2);
                                const isCurrent = mod.status === 'in-progress' && idx === 2;
                                return (
                                  <div 
                                    key={idx} 
                                    onClick={() => navigate(`/learn/${courseId}/${mod.id}/${idx + 1}`)}
                                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all cursor-pointer group/lec ${
                                      isCurrent ? 'bg-[#f0f7ff] border border-[#5e81ac]/10' : 'hover:bg-white border border-transparent hover:border-slate-100/60 hover:shadow-sm'
                                    }`}
                                  >
                                    <span className={`text-[11px] font-black w-6 text-center ${
                                      isLecCompleted ? 'text-green-600/60' : isCurrent ? 'text-[#5e81ac]' : 'text-slate-300'
                                    }`}>{String(idx + 1).padStart(2, '0')}</span>
                                    
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                      isLecCompleted ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-[#5e81ac] text-white' : 'border-2 border-slate-200'
                                    }`}>
                                      <span className="material-symbols-outlined text-[14px]">
                                        {isLecCompleted ? 'check' : isCurrent ? 'play_arrow' : ''}
                                      </span>
                                    </div>

                                    <span className={`flex-1 text-sm font-bold transition-colors group-hover/lec:text-[#5e81ac] ${
                                      isLecCompleted ? 'text-[#2e3440]' : isCurrent ? 'text-[#5e81ac] font-extrabold' : 'text-[#4c566a]/60'
                                    }`}>{lec}</span>

                                    <div className="flex items-center gap-6">
                                      <span className={`text-[10px] font-bold uppercase tracking-widest transition-all ${
                                        isCurrent ? 'text-[#5e81ac]/70' : 'text-[#4c566a]/30 group-hover/lec:text-[#5e81ac]/60'
                                      }`}>45 min</span>
                                      
                                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isCurrent ? 'bg-[#5e81ac] text-white shadow-md scale-110' : 'bg-slate-50/50 text-slate-200 group-hover/lec:bg-[#5e81ac] group-hover/lec:text-white group-hover/lec:shadow-lg group-hover/lec:scale-110 group-hover/lec:translate-x-1'
                                      }`}>
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 80% Separator Line */}
                      {!isLast && (
                        <div className="w-[80%] mx-auto h-[1px] bg-slate-200/80" />
                      )}
                    </div>
                    );
                  })}

                </div>
              </div>
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center pb-6 border-b border-slate-100/60">
                <h2 className="text-4xl font-black tracking-tight font-headline text-[#2e3440]">Resources</h2>
                <button 
                  onClick={() => selectedResources.length > 0 && setSelectedResources([])}
                  className="flex items-center gap-2 group transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
                >
                  <span className={`material-symbols-outlined text-[20px] transition-all ${selectedResources.length > 0 ? 'text-[#5e81ac] scale-110' : 'text-[#4c566a]/60 group-hover:text-[#5e81ac]'}`}>
                    {selectedResources.length > 0 ? 'download_for_offline' : 'download'}
                  </span> 
                  <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all ${selectedResources.length > 0 ? 'text-[#5e81ac]' : 'text-[#4c566a]/60 group-hover:text-[#5e81ac]'}`}>
                    {selectedResources.length > 0 ? `Download Selected (${selectedResources.length})` : 'Download All'}
                  </span>
                </button>
              </div>

              <div className="space-y-8">
                {resourceCategories.map((cat) => (
                  <div key={cat.title} className="space-y-4">
                    <button 
                      onClick={() => toggleSection(cat.title)}
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <span className={`material-symbols-outlined transition-transform duration-300 text-[#5e81ac] ${expandedSections.includes(cat.title) ? 'rotate-0' : '-rotate-90'}`}>
                        expand_more
                      </span>
                      <h3 className="text-lg font-black font-headline text-[#2e3440] uppercase tracking-widest flex items-center gap-3">
                        {cat.title}
                        <span className="text-[10px] font-bold text-[#4c566a]/40 bg-slate-100 px-2.5 py-1 rounded-full">{4} Items</span>
                      </h3>
                    </button>

                    {expandedSections.includes(cat.title) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-8 animate-in fade-in slide-in-from-left-2 duration-300">
                        {[1, 2, 3, 4].map((i) => {
                          const resId = `${cat.title}-${i}`;
                          const isSelected = selectedResources.includes(resId);
                          return (
                            <div 
                              key={i} 
                              className={`group flex items-center justify-between p-5 rounded-2xl transition-all cursor-pointer border ${
                                isSelected 
                                  ? 'bg-[#f0f7ff] border-[#5e81ac]/30 shadow-sm' 
                                  : 'bg-white border-slate-100/80 shadow-[0_2px_10px_rgba(46,52,64,0.02)] hover:shadow-[0_8px_30px_rgba(46,52,64,0.06)] hover:border-[#5e81ac]/20 active:scale-[0.99]'
                              }`}
                              onClick={() => toggleResource(resId)}
                            >
                              <div className="flex items-center gap-5">
                                <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                                  isSelected ? 'bg-[#5e81ac] border-[#5e81ac]' : 'border-slate-300 group-hover:border-[#5e81ac]'
                                }`}>
                                  {isSelected && <span className="material-symbols-outlined text-white text-[14px] font-black">done</span>}
                                </div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white/95 shadow-md ${
                                  cat.color === 'blue' ? 'bg-[#5e81ac]' : 
                                  cat.color === 'purple' ? 'bg-[#b48ead]' : 
                                  cat.color === 'orange' ? 'bg-[#d08770]' : 'bg-[#8fbcbb]'
                                }`}>
                                  <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-[#2e3440] text-sm group-hover:text-[#5e81ac] transition-colors leading-tight mb-1">{cat.title.replace(' Notes', '')} Document #{i}</h4>
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-[#5e81ac]/60 uppercase tracking-widest">PDF</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="text-[10px] font-bold text-[#4c566a]/50 uppercase tracking-widest">2.4 MB</span>
                                  </div>
                                </div>
                              </div>
                              <span className="material-symbols-outlined text-[20px] text-slate-300 group-hover:text-[#5e81ac] transition-all mr-2">download</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI TUTOR TAB */}
          {activeTab === 'ai-tutor' && (
            <div className="h-[600px] bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(46,52,64,0.06)] border border-slate-100 flex flex-col overflow-hidden max-w-4xl">
              <div className="p-6 bg-gradient-to-r from-[#2e3440] to-[#3b4252] text-white flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div>
                  <h2 className="font-extrabold font-headline text-lg tracking-wide">AI Teaching Assistant</h2>
                  <p className="text-xs font-bold text-green-400 flex items-center gap-1.5 opacity-90 tracking-widest uppercase mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active
                  </p>
                </div>
              </div>
              <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-[#f8fafc]">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5e81ac] flex items-center justify-center text-white shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 max-w-[80%]">
                    <p className="text-sm text-[#2e3440] leading-relaxed">Hello! I'm your AI Teaching Assistant. I have been trained on all the course materials, syllabus, and reading documents for this course. Do you have any questions about Module 3?</p>
                  </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-s4tYwpbzLXg2tdVUn-MlZOvhACmJmBsEqb0-H6mz5DOSVnQ5f6GezjyX_0s4pzsczwR6j5IJmoL7SFlex3XzC-iqkjrelAFU5taR_tdR-q27mcpCIb9AdkzBYIKH6EYDPZ0gChHAFXd9v0juq6yFPFoHLdFOm76Wt46LhLyM-R7bb20czVPOvMWokQFfmjPFyUSapVtJCD5Zf9VflVB_ZtyQaUfglwxyLXDiEqj6_9W7WYBj6GzoH0wcBWZA7jsJE5tf9Im4pe4" alt="You" />
                  </div>
                  <div className="bg-[#f0f7ff] p-5 rounded-2xl rounded-tr-sm shadow-sm border border-blue-100 max-w-[80%]">
                    <p className="text-sm text-[#5e81ac] font-medium leading-relaxed">Can you summarize the concept of procedural generation?</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white border-t border-slate-100">
                <div className="relative">
                  <input type="text" placeholder="Message AI Tutor..." className="w-full pl-6 pr-14 py-4 bg-slate-50 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5e81ac]/40 focus:bg-white text-sm transition-all" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#5e81ac] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md hover:bg-[#4c6a8d]">
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ASSESSMENTS TAB */}
          {activeTab === 'assessments' && (
            <div className="space-y-12">
              <div className="pb-8 border-b border-slate-100/60">
                <h2 className="text-4xl font-black tracking-tight font-headline text-[#2e3440]">Assessments Roadmap</h2>
              </div>

              <div className="relative space-y-4">
                {assessments.map((test: { id: number; title: string; date: string; status: string; score: string | null }) => (
                  <div key={test.id} className={`flex items-start gap-8 group ${test.status === 'upcoming' ? 'opacity-80' : ''}`}>
                    <div className="flex flex-col items-center pt-2">
                      <div className={`w-3 h-3 rounded-full shadow-sm ${
                        test.status === 'completed' ? 'bg-green-500' : 
                        test.status === 'missed' ? 'bg-slate-300' : 'bg-[#5e81ac] animate-pulse'
                      }`} />
                      <div className="w-0.5 h-24 bg-slate-100 group-last:hidden" />
                    </div>

                    <div className={`flex-1 p-6 rounded-2xl border transition-all ${
                      test.status === 'completed' ? 'bg-white border-slate-100 shadow-sm' : 
                      test.status === 'missed' ? 'bg-slate-50 border-slate-200 grayscale' : 'bg-[#f0f7ff] border-[#5e81ac]/10'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4c566a]/60">{test.date}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                              test.status === 'completed' ? 'bg-green-50 text-green-600' : 
                              test.status === 'missed' ? 'bg-slate-100 text-slate-500' : 'bg-[#5e81ac]/10 text-[#5e81ac]'
                            }`}>
                              {test.status}
                            </span>
                          </div>
                          <h3 className={`text-xl font-bold font-headline ${test.status === 'missed' ? 'text-[#4c566a]' : 'text-[#2e3440]'}`}>{test.title}</h3>
                          {test.status === 'completed' && (
                            <p className="text-sm font-bold text-green-600 mt-2 flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[18px]">military_tech</span> Score: {test.score}
                            </p>
                          )}
                        </div>
                        
                        {test.status === 'completed' ? (
                          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#4c566a] hover:bg-slate-50 transition-all shadow-sm">
                            Show Result
                          </button>
                        ) : test.status === 'upcoming' ? (
                          <button className="px-5 py-2.5 bg-[#2e3440] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#3b4252] transition-all shadow-md">
                            Prepare Quiz
                          </button>
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATE TAB */}
          {activeTab === 'certificate' && isCourseCompleted && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Loading existing certificate */}
              {certLoading && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <svg className="animate-spin h-10 w-10 text-[#5e81ac]" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-sm font-bold text-[#4c566a]">Loading certificate...</p>
                </div>
              )}

              {/* Congratulations Banner */}
              {!certLoading && (
              <>
              <section className="relative overflow-hidden bg-gradient-to-br from-[#2e3440] via-[#3b4252] to-[#434c5e] p-10 rounded-[2.5rem] shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#5e81ac]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#88c0d0]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#ebcb8b] to-[#d08770] flex items-center justify-center shadow-lg shadow-[#ebcb8b]/20">
                    <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black text-white font-headline tracking-tight mb-2">
                      {certificateData ? 'Your Certificate is Ready! 🏆' : 'Congratulations! 🎉'}
                    </h2>
                    <p className="text-[#d8dee9]/80 text-sm leading-relaxed max-w-xl">
                      {certificateData
                        ? <>Your course completion certificate for <span className="text-[#88c0d0] font-bold">{course.title}</span> has been generated and verified.</>
                        : <>You have successfully completed <span className="text-[#88c0d0] font-bold">{course.title}</span> with 100% mastery. Press generate now to receive your certificate.</>
                      }
                    </p>
                  </div>
                  {!certificateData && (
                    <button
                      onClick={handleGenerateCertificate}
                      disabled={generatingCert}
                      className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.15em] transition-all shadow-lg ${
                        generatingCert
                          ? 'bg-[#4c566a] text-[#d8dee9]/60 cursor-wait'
                          : 'bg-gradient-to-r from-[#ebcb8b] to-[#d08770] text-[#2e3440] hover:scale-105 hover:shadow-xl hover:shadow-[#ebcb8b]/30 active:scale-95'
                      }`}
                    >
                      {generatingCert ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                          Generating...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">verified</span>
                          Generate Certificate
                        </span>
                      )}
                    </button>
                  )}
                </div>
                {certError && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                    {certError}
                  </div>
                )}
              </section>

              {/* Rendered Certificate */}
              {certificateData && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black font-headline text-[#2e3440] tracking-tight">Your Certificate</h3>
                    <a
                      href={`/verify?id=${certificateData.certificate_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#5e81ac]/10 text-[#5e81ac] rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#5e81ac]/20 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      Verify Link
                    </a>
                  </div>

                  {/* Certificate Card */}
                  <div className="relative bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(46,52,64,0.1)] border-2 border-[#ebcb8b]/40 overflow-hidden" id="certificate-card">
                    {/* Gold decorative border */}
                    <div className="absolute inset-0 border-[12px] border-transparent" style={{ borderImage: 'linear-gradient(135deg, #ebcb8b, #d08770, #ebcb8b, #d08770) 1' }} />
                    
                    {/* Corner decorations */}
                    <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-[#ebcb8b]/60 rounded-tl-lg" />
                    <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-[#ebcb8b]/60 rounded-tr-lg" />
                    <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-[#ebcb8b]/60 rounded-bl-lg" />
                    <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-[#ebcb8b]/60 rounded-br-lg" />

                    <div className="relative z-10 p-16 text-center">
                      {/* Logo & Platform */}
                      <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5e81ac] to-[#81a1c1] flex items-center justify-center shadow-md">
                          <span className="material-symbols-outlined text-white text-2xl">school</span>
                        </div>
                        <span className="text-2xl font-black text-[#2e3440] font-headline tracking-tight">FundMySkill</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ebcb8b] mb-4">Certificate of Completion</h2>
                      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#ebcb8b] to-transparent mx-auto mb-8" />
                      
                      {/* Awarded To */}
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4c566a]/60 mb-3">This is to certify that</p>
                      <h1 className="text-5xl font-black text-[#2e3440] font-headline mb-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        {certificateData.holder_name}
                      </h1>
                      <div className="w-48 h-[1px] bg-[#4c566a]/20 mx-auto mb-8" />

                      {/* Course */}
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4c566a]/60 mb-3">has successfully completed the course</p>
                      <h3 className="text-2xl font-black text-[#5e81ac] font-headline mb-8 tracking-tight">{certificateData.course_title}</h3>

                      {/* Details Grid */}
                      <div className="flex justify-center gap-16 mb-10">
                        <div className="text-center">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50 mb-1">Issue Date</p>
                          <p className="text-sm font-bold text-[#2e3440]">{new Date(certificateData.issue_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50 mb-1">Instructor</p>
                          <p className="text-sm font-bold text-[#2e3440]">{certificateData.instructor_name}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50 mb-1">Duration</p>
                          <p className="text-sm font-bold text-[#2e3440]">12 Weeks</p>
                        </div>
                      </div>

                      {/* Signatures */}
                      <div className="flex justify-between items-end px-12 mb-8">
                        <div className="text-center">
                          <div className="w-40 border-b-2 border-[#4c566a]/20 mb-2 pb-1">
                            <p className="text-lg italic text-[#5e81ac]" style={{ fontFamily: 'Georgia, serif' }}>{certificateData.instructor_name}</p>
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50">Course Instructor</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ebcb8b] to-[#d08770] flex items-center justify-center shadow-lg mb-2">
                            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-40 border-b-2 border-[#4c566a]/20 mb-2 pb-1">
                            <p className="text-lg italic text-[#5e81ac]" style={{ fontFamily: 'Georgia, serif' }}>Dr. Sarah Mitchell</p>
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50">Director of Education</p>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="flex flex-col items-center gap-3 mt-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50">Scan to Verify</p>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                          <QRCodeSVG
                            value={`${window.location.origin}/verify?id=${certificateData.certificate_id}`}
                            size={140}
                            bgColor="#ffffff"
                            fgColor="#2e3440"
                            level="M"
                          />
                        </div>
                        <p className="text-[10px] font-bold text-[#4c566a]/40">{window.location.origin}/verify?id={certificateData.certificate_id.substring(0, 12)}...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
