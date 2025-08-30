import { Absence, DashboardStats } from '../types';

export const calculateDashboardStats = (absences: Absence[]): DashboardStats => {
  return {
    totalAbsences: absences.length,
    activeAbsences: absences.filter(a => a.status === 'approved').length,
    avgDaysOff: absences.length > 0 ? Math.round(absences.reduce((sum, a) => sum + a.daysOff, 0) / absences.length) : 0,
    carePlansActive: absences.filter(a => a.carePlanActive).length
  };
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusDotColor = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'bg-green-400';
    case 'pending':
      return 'bg-yellow-400';
    case 'rejected':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  return `${startDate} - ${endDate}`;
};
