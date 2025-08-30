import { useState } from 'react';
import { Absence, User, ViewType, FormData } from '../types';
import { sampleAbsences } from '../data';
import { calculateDashboardStats } from '../utils';
import { handleAbsenceWithAICarePlan } from '../services/aiCarePlanService';

export const useAbsenceManagement = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentUser, setCurrentUser] = useState<User>({ 
    name: 'Sarah Johnson', 
    role: 'manager',
    company: 'SickLeave Signal',
    email: 'sarah.johnson@sickleave-signal.com'
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [absences, setAbsences] = useState<Absence[]>(sampleAbsences);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCarePlanModal, setShowCarePlanModal] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState<Absence | null>(null);

  const dashboardStats = calculateDashboardStats(absences);

  const handleSubmitAbsence = async (formData: FormData) => {
    const newAbsence: Absence = {
      id: absences.length + 1,
      employeeName: currentUser.name,
      reason: formData.reason,
      category: formData.category,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'pending',
      details: formData.details,
      carePlanActive: false,
      daysOff: calculateDaysOff(formData.startDate, formData.endDate)
    };

    // Generate AI care plan automatically when absence is reported
    try {
      const absenceWithAICarePlan = await handleAbsenceWithAICarePlan(newAbsence);
      setAbsences([...absences, absenceWithAICarePlan]);
    } catch (error) {
      console.error('Error generating AI care plan:', error);
      // Fall back to adding absence without AI care plan
      setAbsences([...absences, newAbsence]);
    }
  };

  const calculateDaysOff = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return {
    currentView,
    setCurrentView,
    currentUser,
    setCurrentUser,
    sidebarOpen,
    setSidebarOpen,
    absences,
    setAbsences,
    showReportModal,
    setShowReportModal,
    showCarePlanModal,
    setShowCarePlanModal,
    selectedAbsence,
    setSelectedAbsence,
    dashboardStats,
    handleSubmitAbsence
  };
};
