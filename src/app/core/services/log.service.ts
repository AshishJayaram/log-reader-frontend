import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogEntry } from '../../core/models/log-entry.model';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private readonly baseUrl = 'http://localhost:3000/logs';

  constructor(private http: HttpClient) {}

  getLogs(filters: any): Observable<LogEntry[]> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<LogEntry[]>(this.baseUrl, { params });
  }

  uploadLogFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
