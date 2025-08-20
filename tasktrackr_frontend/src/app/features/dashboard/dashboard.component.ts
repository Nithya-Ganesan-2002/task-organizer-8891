import { Component } from '@angular/core';
import { TaskToolbarComponent } from '../shared/task-toolbar/task-toolbar.component';
import { TaskFiltersComponent } from '../shared/task-filters/task-filters.component';
import { TaskListComponent } from '../shared/task-list/task-list.component';
import { TaskFormComponent } from '../shared/task-form/task-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskToolbarComponent, TaskFiltersComponent, TaskListComponent, TaskFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent { }
