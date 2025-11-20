import { Task, Habit, Roadmap, Priority, TaskStatus } from './types';

export const CATEGORIES = ['Work', 'Personal', 'Learning', 'Health', 'Finance'];

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    priority: Priority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date().toISOString().split('T')[0],
    category: 'Work',
    description: 'Draft the initial proposal for the Q4 marketing strategy.'
  },
  {
    id: '2',
    title: 'Read 20 pages of Clean Code',
    priority: Priority.MEDIUM,
    status: TaskStatus.TODO,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    category: 'Learning'
  }
];

export const MOCK_HABITS: Habit[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    streak: 5,
    category: 'Health',
    history: {
      [new Date().toISOString().split('T')[0]]: true
    }
  },
  {
    id: '2',
    title: 'Code for 1 hour',
    streak: 12,
    category: 'Learning',
    history: {}
  }
];

export const MOCK_ROADMAPS: Roadmap[] = [
  {
    id: '1',
    title: 'Learn TypeScript',
    description: 'From zero to hero in TypeScript.',
    createdAt: new Date().toISOString(),
    isAiGenerated: false,
    steps: [
      { id: 's1', title: 'Basic Types', description: 'Understand string, number, boolean.', completed: true },
      { id: 's2', title: 'Interfaces vs Types', description: 'Learn the differences.', completed: false },
      { id: 's3', title: 'Generics', description: 'Master reusable code.', completed: false }
    ]
  }
];
