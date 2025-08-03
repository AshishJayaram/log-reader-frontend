import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { LogsTableComponent } from '../components/logs-table/logs-table.component';
import { LogsService } from '../../../core/services/logs.service';
import { LogEntry } from '../../../core/models/log-entry.model';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, SearchFormComponent, LogsTableComponent],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent {
  logs: LogEntry[] = [];
  selectedFile: File | null = null;

  page = 1;
  limit = 10;
  total = 0;
  filters: any = {};

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.fetchLogs(); // Load logs on init
  }

  fetchLogs(): void {
    const criteria = { ...this.filters, page: this.page, limit: this.limit };
    this.logsService.getLogs(criteria).subscribe({
      next: (res) => {
        this.logs = res.data;
        this.total = res.total;
        this.page = res.page;
        this.limit = res.limit;
      },
      error: (err) => console.error('Failed to fetch logs', err),
    });
  }

  onSearch(criteria: any): void {
    this.filters = criteria;
    this.page = 1; // Reset page to 1 on new search
    this.fetchLogs();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchLogs();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadSelectedFile(): void {
    if (!this.selectedFile) return;

    this.logsService.uploadLogs(this.selectedFile).subscribe({
      next: () => {
        console.log('Upload successful');
        this.page = 1;
        this.fetchLogs(); // Refresh logs after upload
      },
      error: (err) => console.error('Upload failed', err),
    });
  }

  onPaginationChange(event: { page: number; limit: number }) {
    this.page = event.page;
    this.limit = event.limit;
    this.fetchLogs();
  }
}
