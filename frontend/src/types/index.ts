export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonCount: number;
  duration: string;
  progress: number;
  thumbnail: string;
  colorAccent: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed: boolean;
  content?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'mindmap' | 'notes' | 'question_bank';
  subject: string;
  size: string;
  url: string;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  stats: {
    coursesEnrolled: number;
    lessonsCompleted: number;
    quizAverage: number;
    currentStreak: number;
  };
  learningHoursData: { name: string; hours: number }[];
  scoreData: { name: string; score: number }[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
