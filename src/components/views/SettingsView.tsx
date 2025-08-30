import React from 'react';
import { User } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

interface SettingsViewProps {
  currentUser: User;
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentUser }) => {
  const notificationSettings = [
    { label: 'Email notifications for new absences', enabled: true },
    { label: 'SMS alerts for urgent absences', enabled: false },
    { label: 'Daily absence summary emails', enabled: true },
    { label: 'Care plan completion reminders', enabled: true }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      
      <Card className="glass-card border-white/35">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <Label htmlFor={`setting-${index}`} className="text-sm">
                  {setting.label}
                </Label>
                <Switch id={`setting-${index}`} checked={setting.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/35">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company"
                type="text" 
                value={currentUser.company}
                readOnly
                className="glass-input border-white/35"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Primary Contact Email</Label>
              <Input 
                id="email"
                type="email" 
                value={currentUser.email}
                readOnly
                className="glass-input border-white/35"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;
