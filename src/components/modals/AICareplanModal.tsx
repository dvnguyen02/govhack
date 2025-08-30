import React from 'react';
import { X, Calendar, Clock, CheckCircle, AlertTriangle, Phone, ExternalLink, Bot } from 'lucide-react';
import { AICarePlan } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface AICareplanModalProps {
  isOpen: boolean;
  onClose: () => void;
  carePlan: AICarePlan | null;
  employeeName: string;
}

const AICareplanModal: React.FC<AICareplanModalProps> = ({
  isOpen,
  onClose,
  carePlan,
  employeeName
}) => {
  if (!carePlan) return null;

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'emergency_contact':
        return <Phone className="h-4 w-4 text-red-400" />;
      case 'nz_health_service':
        return <Phone className="h-4 w-4 text-blue-400" />;
      case 'acc_resource':
        return <ExternalLink className="h-4 w-4 text-green-400" />;
      default:
        return <CheckCircle className="h-4 w-4 text-purple-400" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'emergency_contact':
        return 'bg-red-500/10 border-red-500/30 text-red-200';
      case 'nz_health_service':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-200';
      case 'acc_resource':
        return 'bg-green-500/10 border-green-500/30 text-green-200';
      default:
        return 'bg-purple-500/10 border-purple-500/30 text-purple-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-md border border-border">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <Bot className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-xl font-bold text-foreground">AI-Generated Care Plan</h2>
                <p className="text-sm text-muted-foreground font-normal">for {employeeName}</p>
              </div>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-muted/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Section */}
          <Card className="border border-blue-500/30 bg-blue-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900">{carePlan.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-blue-700">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Est. Recovery: {carePlan.estimatedRecoveryTime}</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  AI Personalized
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{carePlan.overview}</p>
            </CardContent>
          </Card>

          {/* Daily Recovery Plan */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Daily Recovery Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carePlan.dailyPlan.map((day, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {day.day}
                      </div>
                      <h4 className="font-semibold text-foreground">{day.focus}</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Tasks</h5>
                        <ul className="space-y-1">
                          {day.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Checkpoints</h5>
                        <ul className="space-y-1">
                          {day.checkpoints.map((checkpoint, checkIndex) => (
                            <li key={checkIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <AlertTriangle className="h-3 w-3 text-amber-500 mt-1 flex-shrink-0" />
                              <span>{checkpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources Section */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>NZ Health Resources & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {carePlan.resources.map((resource, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getResourceColor(resource.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{resource.title}</h4>
                          {resource.contact && (
                            <Badge variant="outline" className="text-xs">
                              {resource.contact}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm mt-1 opacity-90">{resource.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Return to Work Guidance */}
          <Card className="border border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-800">Return to Work Guidance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">Recommended Accommodations</h4>
                <ul className="space-y-1">
                  {carePlan.returnToWorkGuidance.accommodations.map((accommodation, index) => (
                    <li key={index} className="text-sm text-green-700 flex items-start space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                      <span>{accommodation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-green-800 mb-2">Check-in Schedule</h4>
                <ul className="space-y-1">
                  {carePlan.returnToWorkGuidance.checkInSchedule.map((checkIn, index) => (
                    <li key={index} className="text-sm text-green-700 flex items-start space-x-2">
                      <Clock className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                      <span>{checkIn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Red Flags Warning */}
          <Card className="border border-red-500/30 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>When to Seek Immediate Medical Attention</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {carePlan.redFlags.map((flag, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-start space-x-2">
                    <AlertTriangle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Follow-up Reminders */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Follow-up Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {carePlan.followUpReminders.map((reminder, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Day {reminder.day}</Badge>
                      <span className="text-xs text-muted-foreground">Auto-reminder</span>
                    </div>
                    <p className="text-sm text-foreground mb-1">{reminder.message}</p>
                    <p className="text-xs text-muted-foreground">Action: {reminder.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Disclaimer */}
          <div className="p-4 bg-blue-500/5 border border-blue-500/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">AI-Generated Care Plan</p>
                <p className="text-xs text-blue-700 mt-1">
                  This care plan was generated using AI based on the reported condition and best practices for New Zealand workplaces. 
                  It should complement, not replace, professional medical advice. Please consult healthcare providers for medical concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AICareplanModal;
