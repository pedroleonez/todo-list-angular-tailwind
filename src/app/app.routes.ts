import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes').then(m => m.default),
  },
  {
    canActivateChild: [privateGuard()],
    path: 'tasks',
    loadComponent: () => import('./shared/ui/layout/layout.component').then(m => m.default),
    loadChildren: () => import('./task/features/tasks.routes').then(m => m.default),
  },
  {
    path: '**',
    redirectTo: '/tasks',
  }
];
