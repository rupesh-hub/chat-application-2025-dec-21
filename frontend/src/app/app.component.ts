import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

@Component({
  selector: 'chat-root',
  imports: [RouterOutlet, DashboardComponent],
  standalone: true,
  template: `
    <chat-dashboard/>
    <router-outlet/>`
})
export class AppComponent {
}
