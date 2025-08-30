import React, { useState } from 'react';
import { FormData } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Bot, Loader2 } from 'lucide-react';

interface ReportAbsenceModalProps {
  showReportModal: boolean;
  setShowReportModal: (show: boolean) => void;
  onSubmit?: (data: FormData) => Promise<void> | void;
}

const ReportAbsenceModal: React.FC<ReportAbsenceModalProps> = ({
  showReportModal,
  setShowReportModal,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    reason: '',
    category: '',
    startDate: '',
    endDate: '',
    details: ''
  });

  if (!showReportModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setShowReportModal(false);
      setFormData({
        reason: '',
        category: '',
        startDate: '',
        endDate: '',
        details: ''
      });
    } catch (error) {
      console.error('Error submitting absence:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report Absence</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Absence Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="illness">Illness</SelectItem>
                <SelectItem value="mental-health">Mental Health</SelectItem>
                <SelectItem value="injury">Injury</SelectItem>
                <SelectItem value="medical-appointment">Medical Appointment</SelectItem>
                <SelectItem value="family-care">Family Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Absence</Label>
            <Input 
              id="reason"
              placeholder="e.g., Flu symptoms, Back pain"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate"
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Expected Return Date</Label>
              <Input 
                id="endDate"
                type="date" 
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea 
              id="details"
              placeholder="Provide any additional context or symptoms..."
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              className="min-h-[100px]"
            />
          </div>
          
          {/* AI Care Plan Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">AI Care Plan Generation</p>
                <p className="text-xs text-blue-700 mt-1">
                  A personalized recovery plan will be automatically generated using AI based on your condition and NZ health guidelines.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setShowReportModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating AI Care Plan...
                </>
              ) : (
                'Submit Report'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportAbsenceModal;
