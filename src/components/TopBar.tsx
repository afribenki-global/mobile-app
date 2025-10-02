import { Bell, ChevronLeft, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useApp } from './AppContext';

export function TopBar({ title, onBack }: { title?: string; onBack?: () => void }) {
  const { user, t } = useApp();

  return (
    <div className="bg-primary text-primary-foreground px-4 py-3 safe-area-inset-top">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <button onClick={onBack} className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
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
        <div className="relative">
          <button className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
            <Bell className="w-6 h-6" />
          </button>
          <Badge className="absolute -top-1 -right-1 bg-warning w-5 h-5 p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </div>
      </div>
    </div>
  );
}
