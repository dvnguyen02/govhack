import React, { useState } from 'react';
import { FormData } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface ReportAbsenceModalProps {
  showReportModal: boolean;
  setShowReportModal: (show: boolean) => void;
  onSubmit?: (data: FormData) => void;
}

const ReportAbsenceModal: React.FC<ReportAbsenceModalProps> = ({
  showReportModal,
  setShowReportModal,
  onSubmit
}) => {
  const [formData, setFormData] = useState<FormData>({
    reason: '',
    category: '',
    startDate: '',
    endDate: '',
    details: '',
    symptoms: []
  });

  if (!showReportModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setShowReportModal(false);
    setFormData({
      reason: '',
      category: '',
      startDate: '',
      endDate: '',
      details: '',
      symptoms: []
    });
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
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setShowReportModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportAbsenceModal;
