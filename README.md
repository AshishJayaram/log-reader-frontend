# Frontend

## Description

🚗 Vehicle Diagnostics & Configuration Dashboard
This project allows uploading, storing, filtering, and browsing vehicle diagnostic logs. Built with a NestJS backend and an Angular frontend powered by signals for fast and reactive UI state management.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3. Used Angular Signals and Material UI.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Architecture Overview

Angular UI
   │
   ├── SearchFormComponent
   ├── LogsTableComponent
   └── Upload (inside accordion)

State Management (signals-based)
   ├── currentPage
   ├── currentFilters
   ├── logsCache (stores paginated API data)


   graph TD
    A[User uploads log file] --> B[NestJS parses and stores to SQLite]


    C[User sets filters/page/sort] --> D[Angular Signals update]

    D --> E[LogsService fetches from backend]
    
    E --> F[Logs stored in cache and displayed in table]
    
    F --> G[Pagination or filter change clears cache]
✅ generateCacheKey() ensures cache reuse for identical filter/sort/page combinations

## Design Decisions

✅ Log Upload
Upload plain .txt log files following the predefined structure. Logs are parsed and persisted to a SQLite database.
(Sample log - [2025-07-24 14:21:08] [VEHICLE_ID:1234] [ERROR] [CODE:U0420] [Steering a
sensor malfunction])

📁Download Logs as CSV
Added CSV export functionality with current filters and sort order applied for seamless offline analysis and real world usability.

🔍 Filtering (Multi-Criteria)
Users can apply any combination of the following filters:
vehicleId, level (e.g., INFO, ERROR), code, from and to date ranges (ISO 8601 format)
Filters are combinable, meaning users can filter by multiple fields simultaneously. Backend applies all active filters using efficient TypeORM conditions.

📊 Pagination & Page-Level Caching
Logs are paginated, and each unique combination of filters + page + sort is cached using Angular signals for fast back-navigation and reduced API calls.

↕️ Sorting
Logs can be sorted by any valid field (timestamp, level, vehicleId, etc.) in ascending or descending order by clicking on the column. The arrows are only visible on hovering over the column headers.

📁 Upload Accordion
The log upload section is elegantly tucked into a collapsible accordion panel, keeping the UI minimal.

🎨 Material UI with Cyan Theme
Responsive layout
Highlighted table headers
Consistent form field styling
Distinctive filter/search area

⚡Signals-based State Management:
Fast and reactive
Automatic rerendering on state change
Eliminates over-fetching and allows cache reuse

Added Loader to cover edge cases.



## Assumptions
Log format is strictly:
[timestamp] [VEHICLE_ID:x] [LEVEL] [CODE:x] [message]
timestamp is stored as string but always ISO-compatible
Large log files are not chunked — handled in-memory before batch save
Sorting is primarily based on timestamp
Pagination defaults to page=1&limit=10
