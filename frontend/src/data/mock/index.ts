import { Course, Lesson, Quiz, Resource, Message, UserProfile } from '../../types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Calculus & Applications',
    description: 'Master the fundamentals of limits, derivatives, integrals, and the fundamental theorem of calculus.',
    instructor: 'Dr. Sarah Chen',
    subject: 'Math',
    difficulty: 'Advanced',
    lessonCount: 24,
    duration: '12h 30m',
    progress: 45,
    thumbnail: 'https://picsum.photos/seed/math1/400/250',
    colorAccent: 'var(--accent-error)',
  },
  {
    id: 'c2',
    title: 'Cellular Biology Fundamentals',
    description: 'Explore the structure, function, and behavior of cells, the fundamental units of life.',
    instructor: 'Prof. James Wilson',
    subject: 'Science',
    difficulty: 'Intermediate',
    lessonCount: 18,
    duration: '9h 15m',
    progress: 12,
    thumbnail: 'https://picsum.photos/seed/bio1/400/250',
    colorAccent: 'var(--accent-success)',
  },
  {
    id: 'c3',
    title: 'World History: The Renaissance',
    description: 'A deep dive into the cultural, artistic, political and economic rebirth following the Middle Ages.',
    instructor: 'Dr. Elena Rodriguez',
    subject: 'History',
    difficulty: 'Beginner',
    lessonCount: 12,
    duration: '6h 45m',
    progress: 100,
    thumbnail: 'https://picsum.photos/seed/hist1/400/250',
    colorAccent: 'var(--accent-warning)',
  },
  {
    id: 'c4',
    title: 'Introduction to Quantum Physics',
    description: 'Understand the strange and fascinating world of subatomic particles and quantum mechanics.',
    instructor: 'Dr. Alan Turing',
    subject: 'Physics',
    difficulty: 'Advanced',
    lessonCount: 30,
    duration: '15h 00m',
    progress: 0,
    thumbnail: 'https://picsum.photos/seed/phys1/400/250',
    colorAccent: 'var(--accent-secondary)',
  },
  {
    id: 'c5',
    title: 'Creative Writing Workshop',
    description: 'Develop your unique voice and learn the techniques of compelling storytelling.',
    instructor: 'Maya Angelou',
    subject: 'Literature',
    difficulty: 'Beginner',
    lessonCount: 15,
    duration: '8h 20m',
    progress: 80,
    thumbnail: 'https://picsum.photos/seed/write1/400/250',
    colorAccent: 'var(--accent-primary)',
  },
  {
    id: 'c6',
    title: 'Data Structures & Algorithms',
    description: 'Essential computer science concepts for writing efficient and scalable code.',
    instructor: 'Linus Torvalds',
    subject: 'Computer Science',
    difficulty: 'Intermediate',
    lessonCount: 40,
    duration: '20h 00m',
    progress: 25,
    thumbnail: 'https://picsum.photos/seed/code1/400/250',
    colorAccent: 'var(--accent-primary)',
  }
];

export const MOCK_LESSONS: Record<string, Lesson[]> = {
  'c1': [
    { id: 'l1', courseId: 'c1', title: 'Introduction to Limits', duration: '15m', type: 'video', completed: true },
    { id: 'l2', courseId: 'c1', title: 'Evaluating Limits Analytically', duration: '25m', type: 'reading', completed: true },
    { id: 'l3', courseId: 'c1', title: 'Limits Quiz', duration: '10m', type: 'quiz', completed: false },
  ]
};

export const MOCK_LESSON_CONTENT = `
# Evaluating Limits Analytically

When evaluating a limit, the first step is always to try **direct substitution**. 

If $\\lim_{x \\to a} f(x)$ results in a real number $L$, then the limit is $L$.

## Example 1: Direct Substitution

Evaluate $\\lim_{x \\to 2} (3x^2 - 4x + 1)$.

1. Substitute $x = 2$ into the expression:
   $3(2)^2 - 4(2) + 1$
2. Simplify:
   $3(4) - 8 + 1 = 12 - 8 + 1 = 5$

Therefore, $\\lim_{x \\to 2} (3x^2 - 4x + 1) = 5$.

## Indeterminate Forms

If direct substitution results in $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, we have an **indeterminate form**. This doesn't mean the limit doesn't exist; it means we need to do more work.

Common techniques include:
- Factoring
- Rationalizing the numerator or denominator
- Simplifying complex fractions

### Example 2: Factoring

Evaluate $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.

Direct substitution gives $\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0}$.

1. Factor the numerator:
   $x^2 - 9 = (x - 3)(x + 3)$
2. Rewrite the limit:
   $\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3}$
3. Cancel the common factor (since $x \\neq 3$):
   $\\lim_{x \\to 3} (x + 3)$
4. Now use direct substitution:
   $3 + 3 = 6$

Therefore, $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = 6$.

\`\`\`python
# A simple Python script to approximate a limit
def f(x):
    return (x**2 - 9) / (x - 3)

x_values = [2.9, 2.99, 2.999, 3.001, 3.01, 3.1]
for x in x_values:
    print(f"f({x}) = {f(x):.4f}")
\`\`\`
`;

export const MOCK_QUIZ: Quiz = {
  id: 'q1',
  courseId: 'c1',
  title: 'Limits Mastery Quiz',
  questions: [
    {
      id: 'q1_1',
      text: 'What is the first step you should generally try when evaluating a limit analytically?',
      options: ['Factoring', 'Direct Substitution', "L'Hopital's Rule", 'Rationalizing'],
      correctAnswer: 1
    },
    {
      id: 'q1_2',
      text: 'Evaluate lim(x->2) of (x^2 - 4)/(x - 2)',
      options: ['0', '2', '4', 'Undefined'],
      correctAnswer: 2
    },
    {
      id: 'q1_3',
      text: 'Which of the following is an indeterminate form?',
      options: ['0/1', '1/0', '0/0', 'infinity/1'],
      correctAnswer: 2
    },
    {
      id: 'q1_4',
      text: 'Evaluate lim(x->0) of sin(x)/x',
      options: ['0', '1', 'infinity', 'Undefined'],
      correctAnswer: 1
    },
    {
      id: 'q1_5',
      text: 'If a function is continuous at x=a, then lim(x->a) f(x) is equal to:',
      options: ['0', 'infinity', 'f(a)', 'Undefined'],
      correctAnswer: 2
    }
  ]
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    role: 'user',
    content: "I don't understand how to evaluate limits when it results in 0/0.",
    timestamp: '10:00 AM'
  },
  {
    id: 'm2',
    role: 'ai',
    content: "I can help with that! When you get 0/0, it's called an indeterminate form. It means the limit might still exist, but we need to do some algebraic manipulation first. \n\nLet's look at an example: $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$. \n\nIf you plug in $x=2$, you get $0/0$. What algebraic technique could you use to simplify the numerator $x^2 - 4$?",
    timestamp: '10:01 AM'
  },
  {
    id: 'm3',
    role: 'user',
    content: 'I can factor it into (x-2)(x+2).',
    timestamp: '10:03 AM'
  },
  {
    id: 'm4',
    role: 'ai',
    content: 'Exactly! Now, if you substitute $(x-2)(x+2)$ back into the numerator, what happens to the fraction $\\frac{(x-2)(x+2)}{x-2}$?',
    timestamp: '10:03 AM'
  },
  {
    id: 'm5',
    role: 'user',
    content: 'The (x-2) terms cancel out, leaving just x+2.',
    timestamp: '10:05 AM'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  { id: 'r1', title: 'Calculus Cheat Sheet', type: 'notes', subject: 'Math', size: '2.4 MB', url: '#' },
  { id: 'r2', title: 'Cell Structure Overview', type: 'mindmap', subject: 'Science', size: '5.1 MB', url: '#' },
  { id: 'r3', title: 'Renaissance Art Timeline', type: 'mindmap', subject: 'History', size: '3.8 MB', url: '#' },
  { id: 'r4', title: 'Physics Formula Bank', type: 'question_bank', subject: 'Physics', size: '1.2 MB', url: '#' },
  { id: 'r5', title: 'Essay Structure Guide', type: 'notes', subject: 'Literature', size: '800 KB', url: '#' },
  { id: 'r6', title: 'Sorting Algorithms Comparison', type: 'mindmap', subject: 'Computer Science', size: '4.2 MB', url: '#' },
  { id: 'r7', title: 'Midterm Practice Questions', type: 'question_bank', subject: 'Math', size: '1.5 MB', url: '#' },
  { id: 'r8', title: 'Biology Lab Safety Rules', type: 'notes', subject: 'Science', size: '600 KB', url: '#' },
];

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  avatar: 'https://picsum.photos/seed/user1/200/200',
  stats: {
    coursesEnrolled: 4,
    lessonsCompleted: 42,
    quizAverage: 88,
    currentStreak: 12,
  },
  learningHoursData: [
    { name: 'Mon', hours: 1.5 },
    { name: 'Tue', hours: 2.0 },
    { name: 'Wed', hours: 0.5 },
    { name: 'Thu', hours: 3.0 },
    { name: 'Fri', hours: 1.0 },
    { name: 'Sat', hours: 4.5 },
    { name: 'Sun', hours: 2.5 },
  ],
  scoreData: [
    { name: 'Week 1', score: 75 },
    { name: 'Week 2', score: 82 },
    { name: 'Week 3', score: 88 },
    { name: 'Week 4', score: 95 },
  ],
  achievements: [
    { id: 'a1', title: 'First Steps', description: 'Completed your first lesson', icon: 'footprints', unlocked: true },
    { id: 'a2', title: 'Quiz Master', description: 'Scored 100% on 5 quizzes', icon: 'award', unlocked: true },
    { id: 'a3', title: 'Night Owl', description: 'Completed a lesson after midnight', icon: 'moon', unlocked: true },
    { id: 'a4', title: 'Consistent Learner', description: 'Maintained a 30-day streak', icon: 'flame', unlocked: false },
    { id: 'a5', title: 'Polymath', description: 'Enrolled in courses from 3 different subjects', icon: 'brain', unlocked: true },
    { id: 'a6', title: "Tutor's Pet", description: 'Asked the AI Tutor 50 questions', icon: 'bot', unlocked: false },
  ]
};
