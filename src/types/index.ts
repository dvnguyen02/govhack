export interface User {
  name: string;
  role: string;
  company: string;
  email: string;
}

export interface Absence {
  id: number;
  employeeName: string;
  reason: string;
  category: string;
  startDate: string;
  endDate: string;
  status: 'approved' | 'pending' | 'rejected';
  details: string;
  carePlanActive: boolean;
  daysOff: number;
}

export interface CarePlan {
  title: string;
  days: CarePlanDay[];
  resources: string[];
}

export interface CarePlanDay {
  day: number;
  focus: string;
  tasks: string[];
}

export interface HealthArticle {
  title: string;
  category: string;
  readTime: string;
}

export interface SupportService {
  name: string;
  type: string;
  contact: string;
  available: string;
}

export interface FormData {
  reason: string;
  category: string;
  startDate: string;
  endDate: string;
  details: string;
  symptoms: string[];
}

export interface DashboardStats {
  totalAbsences: number;
  activeAbsences: number;
  avgDaysOff: number;
  carePlansActive: number;
}

export type ViewType = 'dashboard' | 'absences' | 'reports' | 'employees' | 'care-plans' | 'library' | 'support' | 'settings';
