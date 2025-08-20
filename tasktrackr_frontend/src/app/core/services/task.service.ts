/**
 * TaskService provides in-memory task storage and core CRUD behaviors.
 * Replace with API integration in the future.
 */
import { Injectable, signal, computed } from '@angular/core';
import { Task, TaskFilter, TaskId } from '../models/task.model';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSig = signal<Task[]>([]);
  private filterSig = signal<TaskFilter>({ status: 'all', sortBy: 'createdAt', sortDir: 'desc' });

  /** Derived list honoring current filter/sort */
  readonly tasks = computed(() => {
    const { query, status, sortBy = 'createdAt', sortDir = 'desc' } = this.filterSig();
    let arr = [...this.tasksSig()];

    if (status && status !== 'all') {
      const wantCompleted = status === 'completed';
      arr = arr.filter(t => t.completed === wantCompleted);
    }
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(t => t.title.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q));
    }
    arr.sort((a, b) => {
      const av = a[sortBy] ?? '';
      const bv = b[sortBy] ?? '';
      const res = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? res : -res;
    });
    return arr;
  });

  readonly filters = computed(() => this.filterSig());

  // PUBLIC_INTERFACE
  /** Returns all tasks ignoring filters. */
  getAllRaw(): Task[] {
    return this.tasksSig();
  }

  // PUBLIC_INTERFACE
  /** Creates a new task with default fields. */
  create(partial: Pick<Task, 'title' | 'description' | 'dueDate' | 'priority'>): Task {
    const now = new Date().toISOString();
    const task: Task = {
      id: uid(),
      title: partial.title.trim(),
      description: partial.description?.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
      dueDate: partial.dueDate,
      priority: partial.priority ?? 'medium',
    };
    this.tasksSig.update(list => [task, ...list]);
    return task;
  }

  // PUBLIC_INTERFACE
  /** Update an existing task by id. */
  update(id: TaskId, patch: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | undefined {
    let updated: Task | undefined;
    this.tasksSig.update(list =>
      list.map(t => {
        if (t.id !== id) return t;
        updated = { ...t, ...patch, updatedAt: new Date().toISOString() };
        return updated!;
      })
    );
    return updated;
  }

  // PUBLIC_INTERFACE
  /** Delete a task by id. */
  remove(id: TaskId): void {
    this.tasksSig.update(list => list.filter(t => t.id !== id));
  }

  // PUBLIC_INTERFACE
  /** Toggle completion for a task by id. */
  toggleComplete(id: TaskId, done?: boolean): Task | undefined {
    const t = this.getById(id);
    if (!t) return undefined;
    return this.update(id, { completed: done ?? !t.completed });
  }

  // PUBLIC_INTERFACE
  /** Get a task by id. */
  getById(id: TaskId): Task | undefined {
    return this.tasksSig().find(t => t.id === id);
  }

  // PUBLIC_INTERFACE
  /** Apply filter and sorting options. */
  setFilter(next: Partial<TaskFilter>): void {
    this.filterSig.update(f => ({ ...f, ...next }));
  }
}
