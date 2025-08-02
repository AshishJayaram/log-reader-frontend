import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { LogsTableComponent } from '../components/logs-table/logs-table.component';
import { LogsService } from '../../../core/services/logs.service';
import { LogEntry } from '../../../core/models/log-entry.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchFormComponent, LogsTableComponent],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent {
  logs: LogEntry[] = [];

  constructor(private logsService: LogsService) {}

  onSearch(criteria: any) {
    this.logsService.getLogs(criteria).subscribe({
      next: (data) => (this.logs = data),
      error: (err) => console.error('Failed to fetch logs', err),
    });
  }
}
