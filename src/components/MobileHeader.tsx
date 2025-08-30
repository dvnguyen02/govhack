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
      <div className="flex items-center justify-between px-4 py-2">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="glass-button">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-2">
          <Image 
            src="/logo/logo.png" 
            alt="Proacta Logo" 
            width={24} 
            height={24} 
            className="object-contain"
          />
          <span className="text-lg font-bold text-black">Proacta</span>
        </div>
        <div className="w-6"></div>
      </div>
    </div>
  );
};

export default MobileHeader;
