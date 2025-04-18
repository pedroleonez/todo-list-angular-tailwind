import { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./task-list/task-list.component').then(m => m.default),
  },
  {
    path: 'new',
    loadComponent: () => import('./task-form/task-form.component').then(m => m.default),
  },
  {
    path: 'edit/:idTask',
    loadComponent: () => import('./task-form/task-form.component').then(m => m.default),
  }
] as Routes;
