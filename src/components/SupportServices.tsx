import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { SupportService } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface SupportServicesProps {
  supportServices: SupportService[];
}

const SupportServices: React.FC<SupportServicesProps> = ({ supportServices }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Support Services</h1>
      </div>

      <Card className="glass border-primary/20 bg-primary/10">
        <CardContent className="pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <p className="text-primary font-medium">24/7 Crisis Support Available</p>
          </div>
          <p className="text-primary/80 text-sm">If you're experiencing a mental health crisis, call Lifeline Aotearoa immediately at 0800-543-354 or text 4202</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportServices.map((service, index) => (
          <Card key={index} className="glass-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant="outline" className="glass bg-primary/20 text-primary border-primary/30">{service.available}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{service.type}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{service.contact}</span>
                </div>
                <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 glass-button">
                  Contact →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupportServices;
