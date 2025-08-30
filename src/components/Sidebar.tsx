import React from 'react';
import { 
  Heart, 
  X, 
  Activity, 
  Calendar, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Phone, 
  Settings, 
  User, 
  LogOut 
} from 'lucide-react';
import { User as UserType, ViewType } from '../types';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import Image from 'next/image';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentUser: UserType;
}

const iconMap = {
  Activity,
  Calendar,
  TrendingUp,
  Users,
  Heart,
  BookOpen,
  Phone,
  Settings
};

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  currentView,
  setCurrentView,
  currentUser
}) => {
  const navigationItems = [
    { id: 'dashboard' as ViewType, name: 'Dashboard', icon: Activity },
    { id: 'absences' as ViewType, name: 'Absences', icon: Calendar },
    { id: 'reports' as ViewType, name: 'Analytics', icon: TrendingUp },
    { id: 'employees' as ViewType, name: 'Employees', icon: Users },
    { id: 'care-plans' as ViewType, name: 'Care Plans', icon: Heart },
    { id: 'library' as ViewType, name: 'Health Library', icon: BookOpen },
    { id: 'support' as ViewType, name: 'Support Services', icon: Phone },
    { id: 'settings' as ViewType, name: 'Settings', icon: Settings }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 glass-sidebar transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-4 glass-header">
        <div className="flex items-center space-x-2">
          <Image 
            src="/logo/logo.png" 
            alt="Proacta Logo" 
            width={32} 
            height={32} 
            className="object-contain"
          />
          <span className="text-xl font-bold glass-text-gradient">Proacta</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setSidebarOpen(false)} 
          className="lg:hidden"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                onClick={() => setCurrentView(item.id)}
                className={`w-full justify-start glass-button ${
                  currentView === item.id
                    ? 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/30'
                    : 'text-muted-foreground hover:bg-muted/20 hover:text-foreground border-border'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <Separator className="mb-4 opacity-30" />
        <div className="flex items-center space-x-3 glass-card p-3 rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser.role}</p>
          </div>
          <Button variant="ghost" size="sm" className="glass-button">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
