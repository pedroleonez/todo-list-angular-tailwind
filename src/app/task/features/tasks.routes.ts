import { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./task-list/task-list.component').then(m => m.TaskListComponent),
  },
] as Routes;
