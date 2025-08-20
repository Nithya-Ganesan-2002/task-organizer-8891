import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private taskSvc = inject(TaskService);

  tasks = this.taskSvc.tasks;

  editingId = signal<string | null>(null);
  draftTitle = signal<string>('');
  draftDesc = signal<string>('');

  startEdit(t: Task): void {
    this.editingId.set(t.id);
    this.draftTitle.set(t.title);
    this.draftDesc.set(t.description ?? '');
  }
  saveEdit(t: Task): void {
    const title = this.draftTitle().trim();
    if (!title) return;
    this.taskSvc.update(t.id, { title, description: this.draftDesc().trim() });
    this.editingId.set(null);
  }
  cancelEdit(): void {
    this.editingId.set(null);
  }

  toggle(t: Task): void {
    this.taskSvc.toggleComplete(t.id);
  }
  del(t: Task): void {
    this.taskSvc.remove(t.id);
  }

  trackById(_: number, t: Task) { return t.id; }
}
