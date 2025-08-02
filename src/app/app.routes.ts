// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LogsRoutes } from './features/logs/logs.routes';

export const routes: Routes = [
  {
    path: '',
    children: LogsRoutes
  }
];
