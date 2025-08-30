import React from 'react';
import { Plus, Calendar, Clock, TrendingUp, Heart, BookOpen, Phone } from 'lucide-react';
import { Absence, DashboardStats, ViewType } from '../types';
import { getStatusDotColor, getStatusColor } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DashboardProps {
  dashboardStats: DashboardStats;
  absences: Absence[];
  setShowReportModal: (show: boolean) => void;
  setCurrentView: (view: ViewType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  dashboardStats,
  absences,
  setShowReportModal,
  setCurrentView
}) => {
  const statsCards = [
    {
      title: 'Total Absences',
      value: dashboardStats.totalAbsences,
      icon: Calendar,
      color: 'text-primary',
      variant: 'default' as const
    },
    {
      title: 'Active Absences',
      value: dashboardStats.activeAbsences,
      icon: Clock,
      color: 'text-primary',
      variant: 'secondary' as const
    },
    {
      title: 'Avg Days Off',
      value: dashboardStats.avgDaysOff,
      icon: TrendingUp,
      color: 'text-primary',
      variant: 'outline' as const
    },
    {
      title: 'Active Care Plans',
      value: dashboardStats.carePlansActive,
      icon: Heart,
      color: 'text-destructive',
      variant: 'default' as const
    }
  ];

  const quickActions = [
    {
      title: 'Manage Care Plans',
      icon: Heart,
      color: 'text-primary',
      view: 'care-plans' as ViewType
    },
    {
      title: 'Health Library',
      icon: BookOpen,
      color: 'text-primary',
      view: 'library' as ViewType
    },
    {
      title: 'Support Services',
      icon: Phone,
      color: 'text-primary',
      view: 'support' as ViewType
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Button onClick={() => setShowReportModal(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Report Absence</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card border-0 border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="p-2 rounded-full bg-primary/20 glass border-primary/30">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Absences */}
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Absences</CardTitle>
            <Button 
              variant="ghost"
              onClick={() => setCurrentView('absences')}
              className="text-primary hover:text-primary/80 text-sm font-medium glass-button"
            >
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {absences.slice(0, 3).map((absence) => (
            <div key={absence.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusDotColor(absence.status)}`}></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{absence.employeeName}</p>
                  <p className="text-sm text-muted-foreground">{absence.reason}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm text-foreground">{absence.startDate}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">{absence.daysOff} days</Badge>
                  <Badge className={`text-xs ${getStatusColor(absence.status)}`}>{absence.status}</Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button 
                  key={index}
                  variant="outline"
                  onClick={() => setCurrentView(action.view)}
                  className="h-auto p-4 flex flex-col items-center space-y-2 glass-button border-primary/30 hover:border-primary/50"
                >
                  <Icon className={`h-8 w-8 ${action.color}`} />
                  <span className="text-sm font-medium">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
