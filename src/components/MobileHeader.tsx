import React from 'react';
import { Menu, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface MobileHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ setSidebarOpen }) => {
  return (
    <div className="lg:hidden glass-header">
      <div className="flex items-center justify-between px-4 py-2">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="glass-button">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary glass-glow" />
          <span className="text-lg font-bold glass-text-gradient">SickLeave Signal</span>
        </div>
        <div className="w-6"></div>
      </div>
    </div>
  );
};

export default MobileHeader;
