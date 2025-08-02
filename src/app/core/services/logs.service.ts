import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogEntry } from '../models/log-entry.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogsService {
  constructor(private http: HttpClient) {}

  getLogs(filters: any): Observable<LogEntry[]> {
    let params = new HttpParams();

    if (filters.vehicleId) params = params.set('vehicleId', filters.vehicleId);
    if (filters.code) params = params.set('code', filters.code);
    if (filters.from) params = params.set('from', filters.from.toISOString());
    if (filters.to) params = params.set('to', filters.to.toISOString());

    return this.http.get<LogEntry[]>('/api/logs', { params });
  }
}
