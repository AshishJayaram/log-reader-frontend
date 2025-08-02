// src/app/features/logs/logs.routes.ts
import { Routes } from '@angular/router';
import { LogsTableComponent } from './components/logs-table/logs-table.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

export const LogsRoutes: Routes = [
  { path: '', component: LogsTableComponent },
];
