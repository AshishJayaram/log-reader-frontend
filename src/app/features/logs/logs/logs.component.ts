import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SearchFormComponent } from '../components/search-form/search-form.component';
import { LogsTableComponent } from '../components/logs-table/logs-table.component';
import { LogsService } from '../../../core/services/logs.service';
import { LogEntry } from '../../../core/models/log-entry.model';

import {
  currentFilters,
  currentLimit,
  currentPage,
  currentSort,
  currentSortOrder,
  currentCachedResult,
  logsCache,
  generateCacheKey,
} from '../state/logs.store';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, SearchFormComponent, LogsTableComponent, MatIconModule],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent {
  logs: LogEntry[] = [];
  total = 0;
  selectedFile: File | null = null;
  showUpload = false;

  currentPage = currentPage;
  currentLimit = currentLimit;

  private logsService = inject(LogsService);

  constructor() {
    effect(() => {
      const cached = currentCachedResult();
      if (cached) {
        this.logs = cached.data;
        this.total = cached.total;
      } else {
        this.fetchLogsFromApi();
      }
    });
  }

  fetchLogsFromApi(): void {
    const filters = currentFilters();
    const page = currentPage();
    const limit = currentLimit();
    const sort = currentSort();
    const sortOrder = currentSortOrder();

    const key = generateCacheKey(filters, page, limit, sort, sortOrder);

    this.logsService.getLogs({ page, limit, sort, sortOrder, ...filters }).subscribe({
      next: (res) => {
        logsCache.update((cache) => ({ ...cache, [key]: res }));
      },
      error: (err) => console.error('API fetch failed', err),
    });
  }

  onPaginationChange(event: { page: number; limit: number }) {
    currentPage.set(event.page);
    currentLimit.set(event.limit);
  }

  onSearch(newFilters: any) {
    currentFilters.set(newFilters);
    currentPage.set(1);
    logsCache.set({}); // clear old cache
  }

  onSortChange(event: { sort: string; sortOrder: 'asc' | 'desc' }) {
    currentSort.set(event.sort);
    currentSortOrder.set(event.sortOrder);
    currentPage.set(1);
    logsCache.set({});
  }

  onClearFilters(): void {
    currentFilters.set({});
    currentPage.set(1);
    logsCache.set({});
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
        currentPage.set(1);
        logsCache.set({});
      },
      error: (err) => console.error('Upload failed', err),
    });
  }

  toggleUpload(): void {
    this.showUpload = !this.showUpload;
  }
}
