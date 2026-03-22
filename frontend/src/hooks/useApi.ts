import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { courseApi, progressApi, quizApi, aiApi, userApi, geminiRagApi } from '../services/api';
import type {
  Course,
  CourseDetail,
  CourseProgress,
  EnrolledCourse,
  Quiz,
  QuizResult,
  ChatMessage,
  User,
  UserStats,
} from '../types/api';

// Query keys for cache management
export const queryKeys = {
  courses: (filters?: Record<string, any>) => ['courses', filters] as const,
  course: (id: string) => ['course', id] as const,
  courseProgress: (courseId: string, userId?: string) => ['courseProgress', courseId, userId] as const,
  enrolledCourses: () => ['enrolledCourses'] as const,
  quiz: (id: string) => ['quiz', id] as const,
  user: () => ['user'] as const,
  userStats: () => ['userStats'] as const,
};

// Courses hooks
export function useCourses(filters?: {
  category?: string;
  level?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: queryKeys.courses(filters),
    queryFn: () => courseApi.list(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes - course list doesn't change often
  });
}

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: queryKeys.course(courseId),
    queryFn: () => courseApi.get(courseId),
    enabled: !!courseId, // Only fetch if courseId exists
    staleTime: 10 * 60 * 1000, // 10 minutes - course details rarely change
  });
}

export function useEnroll() {
  const queryClient = useQueryClient();
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = async (courseId: string) => {
    setEnrolling(true);
    setError(null);
    try {
      const result = await courseApi.enroll(courseId);

      // Invalidate relevant queries after enrollment
      queryClient.invalidateQueries({ queryKey: queryKeys.enrolledCourses() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courseProgress(courseId) });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enroll');
      throw err;
    } finally {
      setEnrolling(false);
    }
  };

  return { enroll, enrolling, error };
}

// Progress hooks
export function useCourseProgress(courseId: string) {
  return useQuery({
    queryKey: queryKeys.courseProgress(courseId),
    queryFn: () => progressApi.getCourseProgress(courseId),
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000, // 2 minutes - progress updates frequently
  });
}

export function useEnrolledCourses() {
  return useQuery({
    queryKey: queryKeys.enrolledCourses(),
    queryFn: () => progressApi.getEnrolledCourses(),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}

export function useCompleteLecture() {
  const queryClient = useQueryClient();
  const [completing, setCompleting] = useState(false);

  const complete = async (courseId: string, lectureId: string) => {
    setCompleting(true);
    try {
      const result = await progressApi.completeLecture(courseId, lectureId);

      // Invalidate progress queries after completion
      queryClient.invalidateQueries({ queryKey: queryKeys.courseProgress(courseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrolledCourses() });

      return result;
    } finally {
      setCompleting(false);
    }
  };

  return { complete, completing };
}

// Quiz hooks
export function useQuiz(quizId: string) {
  return useQuery({
    queryKey: queryKeys.quiz(quizId),
    queryFn: () => quizApi.get(quizId),
    enabled: !!quizId,
    staleTime: Infinity, // Quiz questions never change
  });
}

export function useSubmitQuiz() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const submit = async (
    quizId: string,
    answers: Record<string, string>,
    timeTakenSeconds: number
  ) => {
    setSubmitting(true);
    try {
      const res = await quizApi.submit(quizId, answers, timeTakenSeconds);
      setResult(res);
      return res;
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, result };
}

// AI Tutor hooks (connected to gemini-app backend on port 9999)
export function useAiTutor(lectureId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    'Explain this concept',
    'Give me an example',
    'What are common mistakes?',
  ]);
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // No session history loading - gemini-app doesn't persist sessions
  // Messages are stored locally in component state

  const sendMessage = async (message: string) => {
    setSending(true);

    // Optimistically add user message
    const userMsg: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // Use gemini-app RAG backend on port 9999
      const response = await geminiRagApi.chat(message);

      // Add AI response
      const aiMsg: ChatMessage = {
        role: 'ai',
        content: response.answer,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Generate contextual suggested prompts based on the response
      setSuggestedPrompts([
        'Can you elaborate more?',
        'What\'s the next step?',
        'How does this relate to practice?',
      ]);

      return { response: response.answer, sources: response.sources };
    } catch (err) {
      // Remove optimistic message on error
      setMessages((prev) => prev.slice(0, -1));
      throw err;
    } finally {
      setSending(false);
    }
  };

  return { messages, suggestedPrompts, sending, sendMessage, sessionId };
}

export function useGenerateQuiz() {
  const [generating, setGenerating] = useState(false);

  const generate = async (lectureId: string) => {
    setGenerating(true);
    try {
      return await aiApi.generateQuiz(lectureId);
    } finally {
      setGenerating(false);
    }
  };

  return { generate, generating };
}

// User hooks
export function useUser() {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: () => userApi.getMe(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: queryKeys.userStats(),
    queryFn: () => userApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
