import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { LogsTableComponent } from '../components/logs-table/logs-table.component';
import { LogsService } from '../../../core/services/logs.service';
import { LogEntry } from '../../../core/models/log-entry.model';
import { MatIconModule } from '@angular/material/icon'; // ✅ Import this

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, SearchFormComponent, LogsTableComponent, MatIconModule],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent {
  logs: LogEntry[] = [];
  selectedFile: File | null = null;
  sort: string = 'timestamp';
  sortOrder: 'asc' | 'desc' = 'asc';


  page = 1;
  limit = 10;
  total = 0;
  filters: any = {};
  showUpload = false;

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.fetchLogs(); // Load logs on init
  }

  fetchLogs(): void {
    const criteria = {
      ...this.filters,
      page: this.page,
      limit: this.limit,
      sort: this.sort,
      sortOrder: this.sortOrder,
    };
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

  onSortChange(event: { sort: string; sortOrder: 'asc' | 'desc' }) {
    this.sort = event.sort;
    this.sortOrder = event.sortOrder;
    this.fetchLogs();
  }

  toggleUpload(): void {
    this.showUpload = !this.showUpload;
  }

  onClearFilters(): void {
    this.filters = {};
    this.page = 1;
    this.fetchLogs();
  }
}
