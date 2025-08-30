import React from 'react';
import { Menu, Heart } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

interface MobileHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ setSidebarOpen }) => {
  return (
    <div className="lg:hidden glass-header">
      <div className="flex items-center justify-between px-6 py-3">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="glass-button">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-3">
          <Image 
            src="/logo/logo.png" 
            alt="Proacta Logo" 
            width={64} 
            height={64} 
            className="h-16 w-auto object-contain"
          />
          <span className="text-2xl font-bold">
            <span style={{ color: '#0052B4' }}>Pro</span>
            <span style={{ color: '#F38374' }}>acta</span>
          </span>
        </div>
        <div className="w-6"></div>
      </div>
    </div>
  );
};

export default MobileHeader;
