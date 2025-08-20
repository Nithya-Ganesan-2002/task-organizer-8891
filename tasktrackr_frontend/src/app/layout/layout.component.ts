import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * LayoutComponent is the application shell providing a responsive sidebar and a main content area.
 * It hosts the router-outlet where page-level components are rendered.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarOpen = signal(true);

  // PUBLIC_INTERFACE
  /** Toggles the mobile sidebar open/close state. */
  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }
}
