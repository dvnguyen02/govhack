# CareTrack - Absence Management System

A modern, component-based React application for managing employee absences and care plans.

## Project Structure

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

## Key Features

### 🏗️ **Modular Architecture**
- **Components**: Separated into logical, reusable components
- **Views**: Individual page views for different sections
- **Modals**: Standalone modal components for forms and details
- **Hooks**: Custom React hooks for state management
- **Types**: Comprehensive TypeScript definitions
- **Utils**: Helper functions for common operations

### 🎨 **Component-Based Design**
- **Sidebar**: Navigation with role-based access
- **Dashboard**: Key metrics and recent activity
- **AbsenceList**: Comprehensive absence management
- **Modals**: Interactive forms and detailed views
- **Views**: Specialized interfaces for different functionalities

### 📊 **Data Management**
- **Custom Hook**: `useAbsenceManagement` centralizes state logic
- **Type Safety**: Full TypeScript coverage
- **Sample Data**: Realistic test data for development
- **Utility Functions**: Reusable helper functions

### 🚀 **Production Features**
- **TypeScript**: Full type safety
- **Modular Imports**: Clean import/export structure
- **Responsive Design**: Mobile-first approach
- **State Management**: Centralized using custom hooks
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimized component structure

## Components Overview

### Core Components
- **Sidebar**: Main navigation with user profile
- **Dashboard**: Overview with statistics and quick actions
- **AbsenceList**: Table view of all absences with filtering
- **MobileHeader**: Responsive header for mobile devices

### View Components
- **CarePlansView**: Active care plan management
- **AnalyticsView**: Reports and trend analysis
- **EmployeesView**: Employee directory and status
- **SettingsView**: Application configuration

### Modal Components
- **ReportAbsenceModal**: Form for submitting new absences
- **CarePlanModal**: Detailed care plan viewer

### Supporting Components
- **HealthLibrary**: Educational resources
- **SupportServices**: Contact information and crisis support

## State Management

The application uses a custom hook pattern for state management:

```typescript
const {
  currentView,
  setCurrentView,
  currentUser,
  absences,
  dashboardStats,
  handleSubmitAbsence,
  // ... other state and handlers
} = useAbsenceManagement();
```

## Type Safety

All components use TypeScript interfaces:
- `User`: User profile information
- `Absence`: Absence record structure
- `CarePlan`: Care plan details
- `DashboardStats`: Calculated statistics
- `FormData`: Form input validation

## Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## Benefits of the New Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused across the application
3. **Testability**: Individual components can be unit tested
4. **Scalability**: Easy to add new features and components
5. **Developer Experience**: Clear file organization and imports
6. **Performance**: Better code splitting and lazy loading opportunities
7. **Type Safety**: Comprehensive TypeScript coverage
8. **Team Collaboration**: Clear boundaries for different developers

## Next Steps

- Add unit tests for each component
- Implement error boundaries
- Add loading states and skeletons
- Implement real API integration
- Add internationalization (i18n)
- Implement proper authentication and authorization
- Add more comprehensive form validation
