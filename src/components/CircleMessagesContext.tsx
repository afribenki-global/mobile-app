import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CircleMessage {
  id: string;
  circleId: string;
  userId: string;
  userName: string;
  avatar: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  type: 'message' | 'system' | 'contribution';
  amount?: number;
}

interface CircleMessagesContextType {
  messages: CircleMessage[];
  addMessage: (message: Omit<CircleMessage, 'id' | 'timestamp'>) => void;
  getCircleMessages: (circleId: string) => CircleMessage[];
}

const CircleMessagesContext = createContext<CircleMessagesContextType | undefined>(undefined);

export function CircleMessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<CircleMessage[]>([]);

  const addMessage = (message: Omit<CircleMessage, 'id' | 'timestamp'>) => {
    const newMessage: CircleMessage = {
      ...message,
      id: Date.now().toString() + Math.random(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getCircleMessages = (circleId: string) => {
    return messages.filter(msg => msg.circleId === circleId);
  };

  return (
    <CircleMessagesContext.Provider value={{ messages, addMessage, getCircleMessages }}>
      {children}
    </CircleMessagesContext.Provider>
  );
}

export function useCircleMessages() {
  const context = useContext(CircleMessagesContext);
  if (context === undefined) {
    throw new Error('useCircleMessages must be used within a CircleMessagesProvider');
  }
  return context;
}
