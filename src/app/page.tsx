"use client";

import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import AbsenceList from '../components/AbsenceList';
import HealthLibrary from '../components/HealthLibrary';
import SupportServices from '../components/SupportServices';
import MobileHeader from '../components/MobileHeader';
import ReportAbsenceModal from '../components/modals/ReportAbsenceModal';
import CarePlanModal from '../components/modals/CarePlanModal';
import CarePlansView from '../components/views/CarePlansView';
import AnalyticsView from '../components/views/AnalyticsView';
import EmployeesView from '../components/views/EmployeesView';
import SettingsView from '../components/views/SettingsView';
import { useAbsenceManagement } from '../hooks/useAbsenceManagement';
import { carePlans, healthLibrary, supportServices } from '../data';

const AbsenceManagementApp = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    sidebarOpen,
    setSidebarOpen,
    absences,
    showReportModal,
    setShowReportModal,
    showCarePlanModal,
    setShowCarePlanModal,
    selectedAbsence,
    setSelectedAbsence,
    dashboardStats,
    handleSubmitAbsence
  } = useAbsenceManagement();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            dashboardStats={dashboardStats}
            absences={absences}
            setShowReportModal={setShowReportModal}
            setCurrentView={setCurrentView}
          />
        );
      case 'absences':
        return (
          <AbsenceList
            absences={absences}
            setShowReportModal={setShowReportModal}
            setSelectedAbsence={setSelectedAbsence}
            setShowCarePlanModal={setShowCarePlanModal}
          />
        );
      case 'library':
        return <HealthLibrary />;
      case 'support':
        return <SupportServices supportServices={supportServices} />;
      case 'care-plans':
        return (
          <CarePlansView
            absences={absences}
            dashboardStats={dashboardStats}
            setSelectedAbsence={setSelectedAbsence}
            setShowCarePlanModal={setShowCarePlanModal}
          />
        );
      case 'reports':
        return <AnalyticsView />;
      case 'employees':
        return <EmployeesView />;
      case 'settings':
        return <SettingsView currentUser={currentUser} />;
      default:
        return (
          <Dashboard
            dashboardStats={dashboardStats}
            absences={absences}
            setShowReportModal={setShowReportModal}
            setCurrentView={setCurrentView}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background glass elements for depth */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-sky-300/20 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      </div>
      
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <MobileHeader setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {renderCurrentView()}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <ReportAbsenceModal
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
        onSubmit={handleSubmitAbsence}
      />
      <CarePlanModal
        showCarePlanModal={showCarePlanModal}
        setShowCarePlanModal={setShowCarePlanModal}
        selectedAbsence={selectedAbsence}
        carePlans={carePlans}
      />
    </div>
  );
};

export default function Home() {
  return <AbsenceManagementApp />;
}
