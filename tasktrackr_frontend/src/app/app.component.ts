import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  // PUBLIC_INTERFACE
  /** Application title displayed in header and used by tests. */
  title = 'TaskTrackr';
}
