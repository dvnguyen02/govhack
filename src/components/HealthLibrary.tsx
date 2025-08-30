import React from 'react';
import { Search } from 'lucide-react';
import { healthLibrary } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const HealthLibrary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Health Library</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search health topics..."
            className="pl-10 w-64 glass-input border-white/35"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthLibrary.map((article, index) => (
          <Card key={index} className="glass-card border-white/35 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="glass bg-primary/30 border-primary/50 text-primary-foreground">
                  {article.category}
                </Badge>
                <span className="text-sm text-muted-foreground">{article.readTime}</span>
              </div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm mb-4">
                Evidence-based guidance to support your health and wellbeing in the New Zealand workplace.
              </p>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                Read more →
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthLibrary;