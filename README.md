# Proacta - Absence Management System

A modern, component-based React application for managing employee absences and care plans.

## Project Structure (demo)

The application has been refactored into a modular, production-ready structure:

```
src/
├── app/
│   └── page.tsx                    # Main page component
├── components/
│   ├── index.ts                    # Component exports
│   ├── Sidebar.tsx                 # Main navigation sidebar
│   ├── Dashboard.tsx               # Dashboard view with stats
│   ├── AbsenceList.tsx             # Absence management table
│   ├── HealthLibrary.tsx           # Health resources
│   ├── SupportServices.tsx         # Support contact information
│   ├── MobileHeader.tsx            # Mobile navigation header
│   ├── modals/
│   │   ├── ReportAbsenceModal.tsx  # Form for reporting new absences
│   │   └── CarePlanModal.tsx       # Care plan details modal
│   └── views/
│       ├── CarePlansView.tsx       # Active care plans overview
│       ├── AnalyticsView.tsx       # Reports and analytics
│       ├── EmployeesView.tsx       # Employee management
│       └── SettingsView.tsx        # Application settings
├── hooks/
│   └── useAbsenceManagement.ts     # Custom hook for state management
├── types/
│   └── index.ts                    # TypeScript type definitions
├── data/
│   └── index.ts                    # Sample data and constants
└── utils/
    └── index.ts                    # Utility functions
```

Project architechture (plan)

<img width="975" height="858" alt="image" src="https://github.com/user-attachments/assets/09f584fc-4636-45aa-b717-8dd3e919aec1" />
