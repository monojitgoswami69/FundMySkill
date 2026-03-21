import { create } from 'zustand';
import { Course, Lesson, Quiz, Resource, Message, UserProfile } from '../types';
import { MOCK_COURSES, MOCK_LESSONS, MOCK_QUIZ, MOCK_MESSAGES, MOCK_RESOURCES, MOCK_USER } from '../data/mock';

interface AppState {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  
  courses: Course[];
  lessons: Record<string, Lesson[]>;
  
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  
  resources: Resource[];
}

export const useStore = create<AppState>((set) => ({
  user: MOCK_USER,
  updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
  
  courses: MOCK_COURSES,
  lessons: MOCK_LESSONS,
  
  messages: MOCK_MESSAGES,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  
  resources: MOCK_RESOURCES,
}));
