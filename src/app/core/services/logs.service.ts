import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogEntryResponse } from '../models/log-entry.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogsService {
  constructor(private http: HttpClient) {}

  getLogs(filters: any): Observable<LogEntryResponse> {
    let params = new HttpParams();

    if (filters.page) params = params.set('page', filters.page);
    if (filters.limit) params = params.set('limit', filters.limit);
    if (filters.vehicleId) params = params.set('vehicleId', filters.vehicleId);
    if (filters.code) params = params.set('code', filters.code);
    if (filters.from) params = params.set('from', filters.from.toISOString());
    if (filters.to) params = params.set('to', filters.to.toISOString());

    return this.http.get<LogEntryResponse>('http://localhost:3000/logs', { params });
  }


  uploadLogs(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:3000/logs/upload', formData);
  }
}
