export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  dueDate?: string; // ISO
  priority?: 'low' | 'medium' | 'high';
}

export type SortKey = 'createdAt' | 'updatedAt' | 'title' | 'dueDate' | 'priority';
export type SortDir = 'asc' | 'desc';

export interface TaskFilter {
  query?: string;
  status?: 'all' | 'completed' | 'active';
  sortBy?: SortKey;
  sortDir?: SortDir;
}
