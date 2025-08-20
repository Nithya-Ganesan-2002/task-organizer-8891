import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.css'
})
export class TaskFiltersComponent {
  private taskSvc = inject(TaskService);

  q = '';
  status: 'all' | 'completed' | 'active' = 'all';
  sortBy: 'createdAt' | 'updatedAt' | 'title' | 'dueDate' | 'priority' = 'createdAt';
  sortDir: 'asc' | 'desc' = 'desc';

  apply(): void {
    this.taskSvc.setFilter({ query: this.q, status: this.status, sortBy: this.sortBy, sortDir: this.sortDir });
  }
}
