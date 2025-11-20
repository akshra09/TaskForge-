import { Task, Habit, Roadmap, UserProfile, Priority, TaskStatus } from '../types';
import { MOCK_TASKS, MOCK_HABITS, MOCK_ROADMAPS } from '../constants';

const TASKS_KEY = 'taskforge_tasks';
const HABITS_KEY = 'taskforge_habits';
const ROADMAPS_KEY = 'taskforge_roadmaps';
const PROFILE_KEY = 'taskforge_profile';

// Initialize if empty
const initStorage = () => {
  if (!localStorage.getItem(TASKS_KEY)) localStorage.setItem(TASKS_KEY, JSON.stringify(MOCK_TASKS));
  if (!localStorage.getItem(HABITS_KEY)) localStorage.setItem(HABITS_KEY, JSON.stringify(MOCK_HABITS));
  if (!localStorage.getItem(ROADMAPS_KEY)) localStorage.setItem(ROADMAPS_KEY, JSON.stringify(MOCK_ROADMAPS));
  if (!localStorage.getItem(PROFILE_KEY)) {
    const defaultProfile: UserProfile = {
      username: 'Demo User',
      email: 'user@example.com',
      darkMode: false
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
  }
};

initStorage();

export const StorageService = {
  // Tasks
  getTasks: (): Task[] => JSON.parse(localStorage.getItem(TASKS_KEY) || '[]'),
  saveTask: (task: Task) => {
    const tasks = StorageService.getTasks();
    const existingIndex = tasks.findIndex(t => t.id === task.id);
    if (existingIndex >= 0) {
      tasks[existingIndex] = task;
    } else {
      tasks.push(task);
    }
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return task;
  },
  deleteTask: (id: string) => {
    const tasks = StorageService.getTasks().filter(t => t.id !== id);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  // Habits
  getHabits: (): Habit[] => JSON.parse(localStorage.getItem(HABITS_KEY) || '[]'),
  saveHabit: (habit: Habit) => {
    const habits = StorageService.getHabits();
    const existingIndex = habits.findIndex(h => h.id === habit.id);
    if (existingIndex >= 0) {
      habits[existingIndex] = habit;
    } else {
      habits.push(habit);
    }
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  },
  toggleHabitForDate: (habitId: string, date: string) => {
    const habits = StorageService.getHabits();
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      const isDone = !!habit.history[date];
      if (isDone) {
        delete habit.history[date];
        habit.streak = Math.max(0, habit.streak - 1); // Simplified streak logic
      } else {
        habit.history[date] = true;
        habit.streak += 1;
      }
      StorageService.saveHabit(habit);
    }
  },

  // Roadmaps
  getRoadmaps: (): Roadmap[] => JSON.parse(localStorage.getItem(ROADMAPS_KEY) || '[]'),
  saveRoadmap: (roadmap: Roadmap) => {
    const roadmaps = StorageService.getRoadmaps();
    const existingIndex = roadmaps.findIndex(r => r.id === roadmap.id);
    if (existingIndex >= 0) {
      roadmaps[existingIndex] = roadmap;
    } else {
      roadmaps.push(roadmap);
    }
    localStorage.setItem(ROADMAPS_KEY, JSON.stringify(roadmaps));
  },
  deleteRoadmap: (id: string) => {
    const roadmaps = StorageService.getRoadmaps().filter(r => r.id !== id);
    localStorage.setItem(ROADMAPS_KEY, JSON.stringify(roadmaps));
  },

  // Profile
  getProfile: (): UserProfile => JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}'),
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    if (profile.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  
  // Data Export
  exportData: () => {
    return JSON.stringify({
      tasks: StorageService.getTasks(),
      habits: StorageService.getHabits(),
      roadmaps: StorageService.getRoadmaps(),
      profile: StorageService.getProfile(),
    });
  }
};