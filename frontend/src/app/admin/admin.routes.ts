import {Routes} from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'stats',
    loadComponent: () => import('./analytics/system-analytics.component').then((m) => m.SystemAnalyticsComponent)
  }
]
