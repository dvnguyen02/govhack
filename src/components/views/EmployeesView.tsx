import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const EmployeesView: React.FC = () => {
  const employees = [
    { name: 'Employee A', dept: 'Engineering', absences: 2, status: 'On leave', lastAbsence: '2025-01-15' },
    { name: 'Employee B', dept: 'Marketing', absences: 1, status: 'Active', lastAbsence: '2025-01-14' },
    { name: 'Employee C', dept: 'Sales', absences: 3, status: 'Active', lastAbsence: '2025-01-16' },
    { name: 'Employee D', dept: 'Operations', absences: 1, status: 'Active', lastAbsence: '2025-01-10' },
    { name: 'Employee E', dept: 'Engineering', absences: 0, status: 'Active', lastAbsence: 'None' },
    { name: 'Employee F', dept: 'HR', absences: 2, status: 'Active', lastAbsence: '2025-01-12' },
    { name: 'Employee G', dept: 'IT', absences: 4, status: 'Active', lastAbsence: '2025-01-20' },
    { name: 'Employee H', dept: 'Finance', absences: 1, status: 'Active', lastAbsence: '2025-01-18' },
    { name: 'Employee I', dept: 'Marketing', absences: 3, status: 'On leave', lastAbsence: '2025-01-22' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Employees</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search employees..."
            className="pl-10 w-64 glass-input border-border"
          />
        </div>
      </div>

      <Card className="glass-card border-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee, index) => (
              <Card key={index} className="glass-button border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{employee.name}</CardTitle>
                    <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'} className="glass bg-primary/30 border-primary/50 text-primary-foreground">
                      {employee.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-1">
                  <p className="text-xs text-muted-foreground">{employee.dept}</p>
                  <p className="text-xs text-muted-foreground">Total absences: {employee.absences}</p>
                  <p className="text-xs text-muted-foreground">Last absence: {employee.lastAbsence}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeesView;
