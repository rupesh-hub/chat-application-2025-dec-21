import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.routes").then((m) => m.adminRoutes)
  },
  {
    path: 'messages',
    loadChildren: () => import("./messages/messages.route").then((m) => m.messagesRoute)
  }
];
