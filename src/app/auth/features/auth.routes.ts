import { Routes } from "@angular/router";

export default [
  {
    path: 'sign-in',
    loadComponent: () => import('./auth-form/auth-form.component'),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth-form/auth-form.component'),
  }
] as Routes;
