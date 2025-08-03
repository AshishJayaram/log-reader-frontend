export interface LogEntry {
  timestamp: string;
  vehicleId: string;
  code: string;
  message: string;
}

export interface LogEntryResponse {
  data: LogEntry[];
  total: number;
  page: number;
  limit: number;
}