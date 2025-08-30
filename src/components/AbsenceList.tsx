import React from 'react';
import { Filter, Download, Plus, Eye, Settings } from 'lucide-react';
import { Absence } from '../types';
import { getStatusColor, formatDateRange } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface AbsenceListProps {
  absences: Absence[];
  setShowReportModal: (show: boolean) => void;
  setSelectedAbsence: (absence: Absence) => void;
  setShowCarePlanModal: (show: boolean) => void;
}

const AbsenceList: React.FC<AbsenceListProps> = ({
  absences,
  setShowReportModal,
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
        <h1 className="text-2xl font-bold text-foreground">Absences</h1>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button onClick={() => setShowReportModal(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Report Absence</span>
          </Button>
        </div>
      </div>

      <Card className="glass-card border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead>Employee</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Care Plan</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {absences.map((absence) => (
                <TableRow key={absence.id}>
                  <TableCell>
                    <div className="font-medium">{absence.employeeName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{absence.reason}</div>
                    <div className="text-sm text-muted-foreground">{absence.details}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDateRange(absence.startDate, absence.endDate)}</div>
                    <div className="text-sm text-muted-foreground">{absence.daysOff} days</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={getStatusColor(absence.status)}
                    >
                      {absence.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {absence.carePlanActive ? (
                      <div className="flex flex-col space-y-1">
                        <Button 
                          variant="link"
                          onClick={() => handleViewCarePlan(absence)}
                          className="h-auto p-0 text-primary text-sm"
                        >
                          View Plan
                        </Button>
                        {absence.aiCarePlan && (
                          <Badge variant="secondary" className="text-xs w-fit bg-blue-100 text-blue-800">
                            AI Generated
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AbsenceList;
