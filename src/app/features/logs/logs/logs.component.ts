import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { LogsTableComponent } from '../components/logs-table/logs-table.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  imports: [CommonModule, SearchFormComponent, LogsTableComponent],
})
export class LogsComponent {
  logs: any[] = [];

  onSearch(criteria: any) {
    // Placeholder for filtering logic
    console.log('Search:', criteria);
  }
}
