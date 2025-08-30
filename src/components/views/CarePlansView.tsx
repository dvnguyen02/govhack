import React from 'react';
import { Heart } from 'lucide-react';
import { Absence, DashboardStats } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CarePlansViewProps {
  absences: Absence[];
  dashboardStats: DashboardStats;
  setSelectedAbsence: (absence: Absence) => void;
  setShowCarePlanModal: (show: boolean) => void;
}

const CarePlansView: React.FC<CarePlansViewProps> = ({
  absences,
  dashboardStats,
  setSelectedAbsence,
  setShowCarePlanModal
}) => {
  const handleViewCarePlan = (absence: Absence) => {
    setSelectedAbsence(absence);
    setShowCarePlanModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Active Care Plans</h1>
        <Badge variant="secondary" className="glass bg-primary/20 text-primary border-primary/30">
          {dashboardStats.carePlansActive} Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {absences.filter(a => a.carePlanActive).map((absence) => (
          <Card key={absence.id} className="glass-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{absence.employeeName}</CardTitle>
                <Heart className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{absence.reason}</p>
              <p className="text-sm text-muted-foreground mb-4">Started: {absence.startDate}</p>
              <Button 
                onClick={() => handleViewCarePlan(absence)}
                className="w-full glass-button border-primary/30"
              >
                View Care Plan
              </Button>
            </CardContent>
          </Card>
        ))}
        
        <Card className="glass border-dashed border-2 border-border">
          <CardContent className="flex flex-col items-center justify-center text-center h-full pt-6">
            <Heart className="h-12 w-12 text-muted-foreground mb-3" />
            <CardTitle className="text-lg mb-2">No More Active Plans</CardTitle>
            <p className="text-muted-foreground text-sm">Care plans will appear here as they're created for employee absences.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarePlansView;
