import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LogEntry } from '../../../../core/models/log-entry.model';

@Component({
  selector: 'app-logs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss']
})
export class LogsTableComponent {
  @Input() logs: LogEntry[] = [];
  @Input() page = 1;
  @Input() limit = 10;
  @Input() total = 0;

  @Output() paginationChange = new EventEmitter<{ page: number; limit: number }>();

  displayedColumns: string[] = ['timestamp', 'vehicleId', 'code', 'message'];

  onPageChange(event: PageEvent): void {
    this.paginationChange.emit({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
  }
}
