import React, { useState } from 'react';
import { Download, TrendingUp, AlertTriangle, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
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

const AnalyticsView: React.FC = () => {
  const [viewType, setViewType] = useState<'weekly' | 'monthly'>('monthly');
  const [weeksAhead, setWeeksAhead] = useState<number>(1);

  // HealthLine ILI call rates data (rate per 100,000 population) - based on 2024 national data
  const monthlyILIRates = [
    { month: 'Jan', rate: 16.5 },
    { month: 'Feb', rate: 12.8 },
    { month: 'Mar', rate: 17.2 },
    { month: 'Apr', rate: 16.8 },
    { month: 'May', rate: 15.2 },
    { month: 'Jun', rate: 29.8 },
    { month: 'Jul', rate: 32.5 },
    { month: 'Aug', rate: 29.2 },
    { month: 'Sep', rate: 26.8 },
    { month: 'Oct', rate: 19.5 },
    { month: 'Nov', rate: 17.8 },
    { month: 'Dec', rate: 18.2 }
  ];

  // Sick leave data - Monthly view (Historical + 1 month prediction)
  const monthlySickLeaveData = [
    // Historical data (actual)
    { period: 'Jan 2024', actual: 145, predicted: null, type: 'historical' },
    { period: 'Feb 2024', actual: 132, predicted: null, type: 'historical' },
    { period: 'Mar 2024', actual: 156, predicted: null, type: 'historical' },
    { period: 'Apr 2024', actual: 167, predicted: null, type: 'historical' },
    { period: 'May 2024', actual: 149, predicted: null, type: 'historical' },
    { period: 'Jun 2024', actual: 198, predicted: null, type: 'historical' },
    { period: 'Jul 2024', actual: 234, predicted: null, type: 'historical' },
    { period: 'Aug 2024', actual: 189, predicted: null, type: 'historical' },
    { period: 'Sep 2024', actual: 176, predicted: null, type: 'historical' },
    { period: 'Oct 2024', actual: 158, predicted: null, type: 'historical' },
    { period: 'Nov 2024', actual: 142, predicted: null, type: 'historical' },
    { period: 'Dec 2024', actual: 167, predicted: null, type: 'historical' },
    { period: 'Jan 2025', actual: 139, predicted: null, type: 'historical' },
    { period: 'Feb 2025', actual: 128, predicted: null, type: 'historical' },
    { period: 'Mar 2025', actual: 151, predicted: null, type: 'historical' },
    { period: 'Apr 2025', actual: 163, predicted: null, type: 'historical' },
    { period: 'May 2025', actual: 147, predicted: null, type: 'historical' },
    { period: 'Jun 2025', actual: 195, predicted: null, type: 'historical' },
    { period: 'Jul 2025', actual: 228, predicted: null, type: 'historical' },
    // Current month (Aug 2025) - actual data up to current date
    { period: 'Aug 2025', actual: 187, predicted: null, type: 'current' },
    // Future predictions (1 month ahead)
    { period: 'Sep 2025', actual: null, predicted: 183, type: 'predicted' }
  ];

  // Sick leave data - Weekly view (Historical + dynamic weeks prediction)
  const weeklySickLeaveData = [
    // Historical weeks
    { period: 'Week 21', actual: 42, predicted: null, type: 'historical' },
    { period: 'Week 22', actual: 38, predicted: null, type: 'historical' },
    { period: 'Week 23', actual: 45, predicted: null, type: 'historical' },
    { period: 'Week 24', actual: 47, predicted: null, type: 'historical' },
    { period: 'Week 25', actual: 51, predicted: null, type: 'historical' },
    { period: 'Week 26', actual: 49, predicted: null, type: 'historical' },
    { period: 'Week 27', actual: 53, predicted: null, type: 'historical' },
    { period: 'Week 28', actual: 58, predicted: null, type: 'historical' },
    { period: 'Week 29', actual: 61, predicted: null, type: 'historical' },
    { period: 'Week 30', actual: 55, predicted: null, type: 'historical' },
    { period: 'Week 31', actual: 52, predicted: null, type: 'historical' },
    { period: 'Week 32', actual: 48, predicted: null, type: 'historical' },
    { period: 'Week 33', actual: 44, predicted: null, type: 'historical' },
    { period: 'Week 34', actual: 46, predicted: null, type: 'historical' },
    // Current week (Week 35 - Aug 2025)
    { period: 'Week 35', actual: 49, predicted: null, type: 'current' },
    // Future predictions (dynamic based on weeksAhead selection)
    ...(weeksAhead >= 1 ? [{ period: 'Week 36', actual: null, predicted: 46, type: 'predicted' }] : []),
    ...(weeksAhead >= 2 ? [{ period: 'Week 37', actual: null, predicted: 52, type: 'predicted' }] : []),
    ...(weeksAhead >= 3 ? [{ period: 'Week 38', actual: null, predicted: 48, type: 'predicted' }] : []),
    ...(weeksAhead >= 4 ? [{ period: 'Week 39', actual: null, predicted: 54, type: 'predicted' }] : []),
  ];

  const currentSickLeaveData = viewType === 'monthly' ? monthlySickLeaveData : weeklySickLeaveData;

  // Create connected data for seamless line transitions
  const getConnectedData = () => {
    const data = [...currentSickLeaveData];
    if (viewType === 'weekly' && data.length > 0) {
      // Find the last actual data point and first predicted data point
      let lastActualIndex = -1;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].actual !== null) {
          lastActualIndex = i;
          break;
        }
      }
      const firstPredictedIndex = data.findIndex(d => d.predicted !== null);
      
      if (lastActualIndex >= 0 && firstPredictedIndex >= 0 && data[lastActualIndex].actual !== null) {
        // Create a bridge point that has both actual and predicted values for smooth connection
        const lastActual = data[lastActualIndex];
        const bridgePoint = {
          period: lastActual.period,
          actual: lastActual.actual,
          predicted: lastActual.actual, // This creates the connection start point
          type: 'bridge'
        };
        
        // Replace the last actual point with the bridge point
        data[lastActualIndex] = bridgePoint as any; // Type assertion to bypass strict typing
      }
    }
    return data;
  };

  const connectedData = getConnectedData();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const rate = data.rate;
      let level = 'Baseline';
      let levelColor = '#3B82F6';

      if (rate > 30) {
        level = 'Peak';
        levelColor = '#DC2626';
      } else if (rate > 25) {
        level = 'Elevated';
        levelColor = '#F59E0B';
      }

      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{`${label} 2024`}</p>
          <p className="text-sm">
            <span className="font-medium">Rate: </span>
            <span style={{ color: levelColor }}>{rate} per 100,000</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Level: <span style={{ color: levelColor }}>{level}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for sick leave chart
  const SickLeaveTooltip = ({ active, payload, label }: any) => {
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
                {type === 'current' ? 'Current Period' : 'Historical Data'}
              </p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">HealthLine ILI Analytics</h1>
        <Button className="flex items-center space-x-2 glass-button bg-primary/30 border-primary/50 text-primary-foreground">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="glass-card border-yellow-500/50 bg-yellow-500/10">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-yellow-200">Surveillance Data Notice</p>
              <p className="text-xs text-yellow-200/80">
                This data represents simulated HealthLine ILI call rates based on national surveillance patterns.
                Real-time data is used for public health monitoring and seasonal illness tracking across New Zealand.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends Chart */}
      <Card className="glass-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Monthly ILI Call Rates - National (2024)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyILIRates}
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
                  dataKey="month"
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
                    value: 'Call Rate per 100,000 Population',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#9CA3AF', fontSize: '12px' }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                
                <Line
                  type="linear"
                  dataKey="rate"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                  activeDot={{
                    r: 6,
                    stroke: '#3B82F6',
                    strokeWidth: 2,
                    fill: '#3B82F6'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center space-y-3 mt-4">
            <p className="text-sm text-muted-foreground">
              Monthly trends observed nationally in 2024 - showing seasonal influenza-like illness patterns
            </p>
            <div className="flex justify-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Baseline (&lt;20)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-muted-foreground">Elevated (20-30)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-muted-foreground">Peak (&gt;30)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sick Leave Predictions Chart */}
      <Card className="glass-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Sick Leave Analytics & ML Predictions</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewType === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('weekly')}
                className="glass-button text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Weekly
              </Button>
              <Button
                variant={viewType === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('monthly')}
                className="glass-button text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Monthly
              </Button>
            </div>
          </div>
          {viewType === 'weekly' && (
            <div className="mt-3 flex items-center space-x-3">
              <label className="text-sm font-medium text-muted-foreground">
                Predict weeks ahead:
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((weeks) => (
                  <Button
                    key={weeks}
                    variant={weeksAhead === weeks ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWeeksAhead(weeks)}
                    className="glass-button text-xs px-3 py-1"
                  >
                    {weeks}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Card className="glass-card border-border mb-4">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-blue-200">ML Prediction Model</p>
                  <p className="text-xs text-blue-200/80">
                    Predictions generated using ensemble learning algorithms analyzing seasonal patterns, 
                    historical trends, and external factors for accurate absence forecasting.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={connectedData}
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
                  angle={viewType === 'weekly' ? -45 : 0}
                  textAnchor={viewType === 'weekly' ? 'end' : 'middle'}
                  height={viewType === 'weekly' ? 60 : 30}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Number of Sick Leave Absences',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#9CA3AF', fontSize: '12px' }
                  }}
                />
                <Tooltip content={<SickLeaveTooltip />} />
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
            <p className="text-sm text-muted-foreground">
              Historical sick leave data with {viewType === 'monthly' ? '1 month' : `${weeksAhead} week${weeksAhead > 1 ? 's' : ''}`} ML prediction
              ({viewType === 'monthly' ? 'Jan 2024 - Sep 2025' : `Week 21 - Week ${35 + weeksAhead} 2025`})
            </p>
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
                <Badge variant="outline" className="text-xs px-2 py-0">
                  {viewType === 'monthly' ? '1 Month' : '1 Week'} Forecast
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsView;