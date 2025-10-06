import { memo } from 'react';
import { Home, PiggyBank, TrendingUp, Compass, Wallet } from 'lucide-react';
import { useApp } from './AppContext';
import { motion } from 'motion/react';

export const BottomNav = memo(function BottomNav() {
  const { currentScreen, setCurrentScreen, t } = useApp();

  const navItems = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'save', icon: PiggyBank, label: t('save') },
    { id: 'invest', icon: TrendingUp, label: t('invest') },
    { id: 'explore', icon: Compass, label: t('explore') },
    { id: 'wallet', icon: Wallet, label: t('wallet') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-inset-bottom">
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-secondary rounded-lg"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`text-xs ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
});
