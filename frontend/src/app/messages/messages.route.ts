import {Routes} from '@angular/router';

export const messagesRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./messages.component').then(m => m.MessagesComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component').then(m => m.CreateComponent)
  },
];
