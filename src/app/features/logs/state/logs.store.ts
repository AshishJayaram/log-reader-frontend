import { signal, computed } from '@angular/core';
import { LogEntryResponse } from '../../../core/models/log-entry.model';

export const logsCache = signal<Record<string, LogEntryResponse>>({});
export const currentFilters = signal<any>({});
export const currentPage = signal(1);
export const currentLimit = signal(10);
export const currentSort = signal('timestamp');
export const currentSortOrder = signal<'asc' | 'desc'>('asc');

// Composite key generator
export function generateCacheKey(filters: any, page: number, limit: number, sort: string, sortOrder: string) {
  return JSON.stringify({ filters, page, limit, sort, sortOrder });
}

// Signal to read the current cached data
export const currentCachedResult = computed(() => {
  const key = generateCacheKey(
    currentFilters(),
    currentPage(),
    currentLimit(),
    currentSort(),
    currentSortOrder()
  );
  return logsCache()[key];
});

export const isLoading = signal(false);

