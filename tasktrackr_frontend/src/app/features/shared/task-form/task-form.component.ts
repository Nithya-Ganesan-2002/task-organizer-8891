import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  private taskSvc = inject(TaskService);

  title = '';
  description = '';
  dueDate: string | undefined;
  priority: 'low' | 'medium' | 'high' = 'medium';

  submit(): void {
    const t = this.title.trim();
    if (!t) return;
    this.taskSvc.create({ title: t, description: this.description, dueDate: this.dueDate, priority: this.priority });
    // reset
    this.title = '';
    this.description = '';
    this.dueDate = undefined;
    this.priority = 'medium';
  }
}
