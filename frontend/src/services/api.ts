// API Client for FundMySkill Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const GEMINI_RAG_URL = import.meta.env.VITE_GEMINI_RAG_URL || 'http://localhost:9999';

// Get the current user ID — prefers Firebase auth UID, falls back to mock
function getActiveUserId(): string {
  // Check for demo session
  const demoSession = localStorage.getItem('fundmyskill_demo_session');
  if (demoSession === 'true') {
    return 'demo-user-alex';
  }

  // Check for Firebase auth UID (set by AuthContext)
  const firebaseUid = localStorage.getItem('fundmyskill_firebase_uid');
  if (firebaseUid) {
    return firebaseUid;
  }

  // Fallback to mock user ID
  let userId = localStorage.getItem('mockUserId');
  if (!userId) {
    userId = `user-${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem('mockUserId', userId);
  }
  return userId;
}

export const getUserId = getActiveUserId;


interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Add default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Mock-User-Id': getActiveUserId(),
    ...(fetchOptions.headers || {}),
  };

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

// Course API
export const courseApi = {
  list: (filters?: {
    category?: string;
    level?: string;
    price_max?: number;
    search?: string;
    page?: number;
    limit?: number;
  }) => apiRequest<{
    courses: import('../types/api').Course[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  }>('/api/courses', { params: filters as Record<string, string | number | undefined> }),

  get: (courseId: string) =>
    apiRequest<import('../types/api').CourseDetail>(`/api/courses/${courseId}`),

  enroll: (courseId: string) =>
    apiRequest<{ success: boolean; message: string; progress_id: string }>(
      `/api/courses/${courseId}/enroll`,
      {
        method: 'POST',
        body: JSON.stringify({ user_id: getActiveUserId() }),
      }
    ),
};

// Progress API
export const progressApi = {
  getCourseProgress: (courseId: string) =>
    apiRequest<import('../types/api').CourseProgress>(`/api/progress/${courseId}`, {
      params: { userId: getActiveUserId() },
    }),

  completeLecture: (courseId: string, lectureId: string) =>
    apiRequest<{ success: boolean; new_progress_percentage: number; message: string }>(
      '/api/progress/lecture/complete',
      {
        method: 'POST',
        body: JSON.stringify({
          user_id: getActiveUserId(),
          course_id: courseId,
          lecture_id: lectureId,
        }),
      }
    ),

  getEnrolledCourses: () =>
    apiRequest<{
      user_id: string;
      enrolled_courses: import('../types/api').EnrolledCourse[];
      total: number;
    }>(`/api/progress/enrolled/${getActiveUserId()}`),
};

// Quiz API
export const quizApi = {
  get: (quizId: string) =>
    apiRequest<import('../types/api').Quiz>(`/api/quizzes/${quizId}`),

  submit: (quizId: string, answers: Record<string, string>, timeTakenSeconds: number) =>
    apiRequest<import('../types/api').QuizResult>('/api/quizzes/submit', {
      method: 'POST',
      body: JSON.stringify({
        user_id: getActiveUserId(),
        quiz_id: quizId,
        answers,
        time_taken_seconds: timeTakenSeconds,
      }),
    }),

  getCourseQuizzes: (courseId: string) =>
    apiRequest<{
      course_id: string;
      quizzes: Array<{
        id: string;
        title: string;
        question_count: number;
        time_limit_seconds: number;
        context_source: { type: string; id: string };
      }>;
      total: number;
    }>(`/api/quizzes/course/${courseId}`),
};

// AI API (main backend)
export const aiApi = {
  chat: (lectureId: string, message: string) =>
    apiRequest<import('../types/api').TutorChatResponse>('/api/ai/tutor/chat', {
      method: 'POST',
      body: JSON.stringify({
        user_id: getActiveUserId(),
        lecture_id: lectureId,
        message,
      }),
    }),

  generateQuiz: (lectureId: string) =>
    apiRequest<{ quiz_id: string; title: string; question_count: number }>(
      '/api/ai/quiz/generate',
      {
        method: 'POST',
        body: JSON.stringify({
          user_id: getActiveUserId(),
          lecture_id: lectureId,
        }),
      }
    ),

  getSessionHistory: (lectureId: string) =>
    apiRequest<{
      session_id: string | null;
      messages: import('../types/api').ChatMessage[];
      lecture_id: string;
    }>(`/api/ai/sessions/${getActiveUserId()}/${lectureId}`),
};

// Gemini RAG API (gemini-app backend on port 9999)
export const geminiRagApi = {
  chat: async (message: string): Promise<{ answer: string; sources: Array<{ content: string; source: string }> }> => {
    const response = await fetch(`${GEMINI_RAG_URL}/chat/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Chat request failed' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  },
};

// User API
export const userApi = {
  getMe: () => apiRequest<import('../types/api').User>('/api/users/me'),

  getStats: () =>
    apiRequest<import('../types/api').UserStats>(`/api/users/${getActiveUserId()}/stats`),

  update: (updates: Partial<import('../types/api').User>) =>
    apiRequest<import('../types/api').User>(`/api/users/${getActiveUserId()}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
};

// Certificate API
export const certificateApi = {
  generate: (data: { user_id: string; course_id: string; holder_name: string }) =>
    apiRequest<{
      success: boolean;
      certificate: {
        id: string;
        certificate_id: string;
        user_id: string;
        course_id: string;
        course_title: string;
        holder_name: string;
        instructor_name: string;
        issue_date: string;
        completion_date: string;
        credential_url: string;
      } | null;
      message: string;
    }>('/api/certificates/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verify: (certificateId: string) =>
    apiRequest<{
      verified: boolean;
      certificate: {
        id: string;
        certificate_id: string;
        user_id: string;
        course_id: string;
        course_title: string;
        holder_name: string;
        instructor_name: string;
        issue_date: string;
        completion_date: string;
        credential_url: string;
      } | null;
      message: string;
    }>(`/api/certificates/verify/${certificateId}`),

  get: (userId: string, courseId: string) =>
    apiRequest<{
      success: boolean;
      certificate: {
        id: string;
        certificate_id: string;
        user_id: string;
        course_id: string;
        course_title: string;
        holder_name: string;
        instructor_name: string;
        issue_date: string;
        completion_date: string;
        credential_url: string;
      } | null;
      message: string;
    }>(`/api/certificates/user/${userId}/course/${courseId}`),
};

// Health check
export const healthCheck = () => apiRequest<{ status: string; database: string }>('/health');
