import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Activity {
  id: string;
  type: 'savings' | 'investment' | 'withdrawal' | 'transfer' | 'circle' | 'goal_completed' | 'topup';
  title: string;
  amount?: number;
  description: string;
  timestamp?: Date;
  status?: 'completed' | 'pending' | 'failed';
  icon?: string;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  getRecentActivities: (limit?: number) => Activity[];
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'savings',
      title: 'Emergency Fund',
      amount: 20000,
      description: 'Monthly contribution added',
      timestamp: new Date(Date.now() - 86400000),
      status: 'completed',
      icon: '💰',
    },
    {
      id: '2',
      type: 'investment',
      title: 'Equity Growth Fund',
      amount: 50000,
      description: 'Investment purchase',
      timestamp: new Date(Date.now() - 172800000),
      status: 'completed',
      icon: '📈',
    },
  ]);

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const iconMap = {
      savings: '💰',
      investment: '📈',
      withdrawal: '💸',
      transfer: '🔄',
      circle: '👥',
      goal_completed: '🎯',
      topup: '💳',
    };
    
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: activity.timestamp || new Date(),
      status: activity.status || 'completed',
      icon: activity.icon || iconMap[activity.type] || '📋',
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const getRecentActivities = (limit: number = 5) => {
    return activities.slice(0, limit);
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, getRecentActivities }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}
