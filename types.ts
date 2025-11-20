export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  category: string;
  roadmapId?: string; // Linked to a roadmap
}

export interface Habit {
  id: string;
  title: string;
  streak: number;
  history: Record<string, boolean>; // date string YYYY-MM-DD -> completed
  category: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  completed: boolean;
  resources?: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
  createdAt: string;
  isAiGenerated: boolean;
}

export interface UserProfile {
  username: string;
  email: string;
  avatarUrl?: string;
  darkMode: boolean;
}

export interface AIPlanRequest {
  goal: string;
  duration: string;
  timePerDay: string;
  skillLevel: string;
}

// AI Response Schema
export interface AIPlanResponse {
  roadmapTitle: string;
  roadmapDescription: string;
  steps: {
    title: string;
    description: string;
    deadlineOffsetDays: number;
    suggestedResources: string[];
  }[];
  dailyHabits: string[];
}