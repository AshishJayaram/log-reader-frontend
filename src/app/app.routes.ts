// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LogsRoutes } from './features/logs/logs.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/logs/logs/logs.component').then(m => m.LogsComponent),
    children: LogsRoutes
  },
  
];
