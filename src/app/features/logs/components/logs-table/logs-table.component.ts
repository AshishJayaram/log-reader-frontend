import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logs-table',
  standalone: true,
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss'],
  imports: [MatTableModule, CommonModule],
})
export class LogsTableComponent {
  @Input() logs: any[] = [];
  displayedColumns: string[] = ['timestamp', 'vehicleId', 'code', 'message'];
}
