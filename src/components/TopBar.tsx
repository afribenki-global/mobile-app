import { Bell, ChevronLeft, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useApp } from './AppContext';
import { Badge } from './ui/badge';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function TopBar({ title, showBack, onBack, showBackButton, onBackClick }: TopBarProps) {
  const { user, t, setCurrentScreen, unreadNotificationsCount } = useApp();

  return (
    <div className="bg-primary text-primary-foreground px-4 py-3 safe-area-inset-top">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {showBack || showBackButton ? (
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={showBackButton ? onBackClick : onBack}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-primary-foreground">{title}</h2>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary-foreground/20">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-accent text-accent-foreground">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xs opacity-90">
                {title || t('welcome')}
              </div>
              <div className="font-medium">{user?.name || 'Guest'}</div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentScreen('settings')}
            className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setCurrentScreen('notifications')}
            className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            {unreadNotificationsCount > 0 && (
              <>
                <Badge className="absolute -top-1 -right-1 bg-warning text-primary w-5 h-5 p-0 flex items-center justify-center text-xs animate-pulse">
                  {unreadNotificationsCount}
                </Badge>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full animate-ping opacity-75" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
