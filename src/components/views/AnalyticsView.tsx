import React from 'react';
import { Download, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
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
      <Card className="glass-card border-white/35">
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
    </div>
  );
};

export default AnalyticsView;