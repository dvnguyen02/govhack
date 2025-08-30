import React from 'react';
import { CheckCircle, BookOpen, Bot } from 'lucide-react';
import { Absence, CarePlan } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import AICareplanModal from './AICareplanModal';

interface CarePlanModalProps {
  showCarePlanModal: boolean;
  setShowCarePlanModal: (show: boolean) => void;
  selectedAbsence: Absence | null;
  carePlans: Record<string, CarePlan>;
}

const CarePlanModal: React.FC<CarePlanModalProps> = ({
  showCarePlanModal,
  setShowCarePlanModal,
  selectedAbsence,
  carePlans
}) => {
  if (!showCarePlanModal || !selectedAbsence) return null;

  // If the absence has an AI-generated care plan, show that instead
  if (selectedAbsence.aiCarePlan) {
    return (
      <AICareplanModal
        isOpen={showCarePlanModal}
        onClose={() => setShowCarePlanModal(false)}
        carePlan={selectedAbsence.aiCarePlan}
        employeeName={selectedAbsence.employeeName}
      />
    );
  }

  const carePlan = carePlans[selectedAbsence?.reason?.toLowerCase() as keyof typeof carePlans] || carePlans['flu symptoms'];

  return (
    <Dialog open={showCarePlanModal} onOpenChange={setShowCarePlanModal}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{carePlan.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Care plan for: <strong>{selectedAbsence?.employeeName}</strong></p>
              <p className="text-sm text-muted-foreground">Absence dates: {selectedAbsence?.startDate} - {selectedAbsence?.endDate}</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h4 className="font-medium">Daily Care Plan</h4>
            {carePlan.days.map((day, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="default" className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold p-0">
                      {day.day}
                    </Badge>
                    <h5 className="font-medium">{day.focus}</h5>
                  </div>
                  <ul className="space-y-2 ml-8">
                    {day.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-3">Helpful Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {carePlan.resources.map((resource, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm">{resource}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button 
            variant="outline"
            onClick={() => setShowCarePlanModal(false)}
          >
            Close
          </Button>
          <Button>
            Send to Employee
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarePlanModal;
