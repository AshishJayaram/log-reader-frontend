import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LogEntry } from '../../../../core/models/log-entry.model';

@Component({
  selector: 'app-logs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss']
})
export class LogsTableComponent implements AfterViewInit {
  @Input() logs: LogEntry[] = [];
  @Input() page = 1;
  @Input() limit = 10;
  @Input() total = 0;

  @Output() paginationChange = new EventEmitter<{ page: number; limit: number }>();
  @Output() sortChange = new EventEmitter<{ sort: string; sortOrder: 'asc' | 'desc' }>();

  displayedColumns: string[] = ['timestamp', 'vehicleId', 'level', 'code', 'message'];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((event: Sort) => {
      if (event.direction) {
        this.sortChange.emit({ sort: event.active, sortOrder: event.direction });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.paginationChange.emit({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
  }

  onSortChange(event: Sort): void {
    this.sortChange.emit({
      sort: event.active,
      sortOrder: event.direction as 'asc' | 'desc'
    });
  }
}
