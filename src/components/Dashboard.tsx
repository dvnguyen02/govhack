import React from 'react';
import { Plus, Calendar, Clock, TrendingUp, Heart, BookOpen, Phone, Bot, AlertTriangle, Lightbulb, ArrowUp, ArrowDown } from 'lucide-react';
import { Absence, DashboardStats, ViewType } from '../types';
import { getStatusDotColor, getStatusColor } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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

      {/* AI Insights Card */}
      <Card className="glass-card border-0 border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Bot className="h-4 w-4" />
            <span>AI Insights & Predictions</span>
          </CardTitle>
          <div className="p-2 rounded-full bg-primary/20 glass border-primary/30">
            <Bot className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">Flu Season Prediction</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    🔮 23% increase in flu-related absences predicted for September. Consider flu vaccination reminders.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">Team Wellness Alert</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ⚠️ Marketing team showing elevated stress indicators. Recommend wellness check-in.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">Improvement Opportunity</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 Ergonomic improvements could reduce back injury absences by 30%. Schedule assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          // Define thresholds for key metrics
          const thresholds: Record<string, { warning: number; critical: number }> = {
            'Active Absences': { warning: 100, critical: 150 },
            'Avg Days Off': { warning: 4, critical: 6 },
            'Active Care Plans': { warning: 40, critical: 60 },
          };
          
          const threshold = thresholds[stat.title];
          let valueColor = 'text-primary';
          let statusLabel = '';
          let showIndicator = stat.title !== 'Total Absences';
          let IndicatorIcon = ArrowDown;
          
          if (threshold) {
            if (stat.value >= threshold.critical) {
              valueColor = 'text-destructive';
              statusLabel = stat.title === 'Avg Days Off' ? 'Critical' : '';
              IndicatorIcon = ArrowUp;
            } else if (stat.value >= threshold.warning) {
              valueColor = 'text-orange-500';
              statusLabel = stat.title === 'Avg Days Off' ? 'Warning' : '';
              IndicatorIcon = ArrowUp;
            } else {
              valueColor = 'text-green-600';
              statusLabel = stat.title === 'Avg Days Off' ? 'Good' : '';
              IndicatorIcon = ArrowDown;
            }
          }
          
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
                <div className="text-2xl font-bold flex items-center space-x-1">
                  <span className={valueColor}>{stat.value}</span>
                  {showIndicator && (
                    <>
                      <IndicatorIcon className={`${valueColor} h-5 w-5`} />
                      {statusLabel && (
                        <span className={`ml-2 text-xs font-medium ${valueColor}`}>{statusLabel}</span>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ML Sick Leave Predictions Chart */}
      <Card className="glass-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>ML Absence Predictions (5-Week View)</span>
            <Badge variant="outline" className="text-xs">
              Last 3 weeks + Next 2 weeks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { period: 'Week 33', actual: 44, predicted: null, type: 'historical' },
                  { period: 'Week 34', actual: 46, predicted: null, type: 'historical' },
                  { period: 'Week 35', actual: 49, predicted: 49, type: 'current' },
                  { period: 'Week 36', actual: null, predicted: 46, type: 'predicted' },
                  { period: 'Week 37', actual: null, predicted: 52, type: 'predicted' }
                ]}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="period"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Absences',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#9CA3AF', fontSize: '12px' }
                  }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const actual = data.actual;
                      const predicted = data.predicted;
                      const type = data.type;

                      return (
                        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium text-foreground">{label}</p>
                          {type === 'predicted' ? (
                            <>
                              <p className="text-sm">
                                <span className="font-medium">Predicted: </span>
                                <span className="text-orange-500">{predicted} absences</span>
                              </p>
                              <p className="text-xs text-muted-foreground">ML Algorithm Forecast</p>
                            </>
                          ) : (
                            <>
                              <p className="text-sm">
                                <span className="font-medium">Actual: </span>
                                <span className="text-blue-600">{actual} absences</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {type === 'current' ? 'Current Week' : 'Historical Data'}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />
                
                <Line
                  type="linear"
                  dataKey="actual"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Actual Sick Leave"
                  connectNulls={true}
                  activeDot={{
                    r: 6,
                    stroke: '#3B82F6',
                    strokeWidth: 2,
                    fill: '#3B82F6'
                  }}
                />
                <Line
                  type="linear"
                  dataKey="predicted"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  name="ML Prediction"
                  connectNulls={true}
                  activeDot={{
                    r: 5,
                    stroke: '#F59E0B',
                    strokeWidth: 2,
                    fill: '#F59E0B'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-center space-y-3 mt-4">
            <div className="flex justify-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Historical/Current Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-orange-500 border-dashed border border-orange-300"></div>
                <span className="text-muted-foreground">ML Prediction</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('reports')}
                  className="glass-button border-orange-500/30 text-orange-600 hover:bg-orange-500/10 text-xs px-3 py-1"
                >
                  View Full Analytics
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
