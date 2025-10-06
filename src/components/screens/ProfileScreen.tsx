import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChevronRight, User, Lock, Bell, Globe, CreditCard, HelpCircle, FileText, LogOut, Shield, Smartphone } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

export function ProfileScreen() {
  const { user, language, currency, setCurrentScreen, setIsOnboarded, setUser, t } = useApp();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setIsOnboarded(false);
    setCurrentScreen('welcome');
  };

  const settingsSections = [
    {
      title: t('accountSettings'),
      items: [
        { id: 'user-profile', icon: User, label: t('profile'), value: user?.name, action: () => setCurrentScreen('user-profile') },
        { id: 'profile-edit', icon: User, label: t('editProfile'), action: () => setCurrentScreen('profile-edit') },
        { id: 'kyc', icon: Shield, label: 'Verification Status', badge: 'Verified', badgeColor: 'bg-success' },
        { id: 'linked-accounts', icon: CreditCard, label: 'Linked Bank Accounts', value: '2 accounts', action: () => setCurrentScreen('linked-bank-accounts') },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: 'language-selection', icon: Globe, label: t('language'), value: language.toUpperCase(), action: () => setCurrentScreen('language-selection') },
        { id: 'currency-selection', icon: CreditCard, label: t('currencyLabel'), value: currency, action: () => setCurrentScreen('currency-selection') },
        { id: 'notifications', icon: Bell, label: t('notifications'), toggle: true, enabled: true },
      ],
    },
    {
      title: t('security'),
      items: [
        { id: 'change-password', icon: Lock, label: 'Change Password', action: () => setCurrentScreen('change-password') },
        { id: '2fa', icon: Smartphone, label: 'Two-Factor Authentication', toggle: true, enabled: false },
        { id: 'biometric', icon: Shield, label: 'Biometric Login', toggle: true, enabled: true },
      ],
    },
    {
      title: t('helpSupport'),
      items: [
        { id: 'help', icon: HelpCircle, label: 'Help Center', action: () => setCurrentScreen('help-center') },
        { id: 'terms', icon: FileText, label: t('termsConditions'), action: () => setCurrentScreen('terms-conditions') },
        { id: 'privacy', icon: FileText, label: t('privacyPolicy'), action: () => setCurrentScreen('privacy-policy') },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title={t('profile') || 'Profile'} showBack onBack={() => setCurrentScreen('home')} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-6"
      >
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-foreground mb-1">{user?.name || 'Guest User'}</h3>
              <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
            </div>
            <button 
              onClick={() => setCurrentScreen('profile-edit')}
              className="text-primary hover:underline"
            >
              {t('edit')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Member Since</p>
              <p className="font-medium text-foreground">Jan 2025</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Type</p>
              <p className="font-medium text-foreground">Premium</p>
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={section.title}>
            <h4 className="text-foreground mb-3 px-1">{section.title}</h4>
            <Card className="overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const Component = item.toggle ? motion.div : motion.button;
                return (
                  <Component
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                    onClick={() => {
                      if (item.action && !item.toggle) {
                        item.action();
                      }
                    }}
                    className={`w-full flex items-center gap-3 p-4 ${!item.toggle ? 'hover:bg-muted cursor-pointer' : ''} transition-colors ${
                      index !== section.items.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-foreground">{item.label}</div>
                      {item.value && (
                        <div className="text-sm text-muted-foreground">{item.value}</div>
                      )}
                    </div>
                    {item.badge && (
                      <span className={`${item.badgeColor} text-white text-xs px-2 py-1 rounded-full`}>
                        {item.badge}
                      </span>
                    )}
                    {item.toggle ? (
                      <Switch checked={item.enabled} />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </Component>
                );
              })}
            </Card>
          </div>
        ))}

        {/* App Info */}
        <Card className="p-5 text-center">
          <p className="text-sm text-muted-foreground mb-2">AfriBenki App Version</p>
          <p className="font-medium text-foreground mb-4">2.6.0</p>
          <div className="flex items-center justify-center gap-4 text-sm text-primary">
            <button className="hover:underline">Rate Us</button>
            <span className="text-muted-foreground">•</span>
            <button className="hover:underline">Share App</button>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 border-destructive text-destructive hover:bg-destructive hover:text-white rounded-xl"
        >
          <LogOut className="w-5 h-5 mr-2" />
          {t('logout')}
        </Button>

        {/* Security Notice */}
        <Card className="p-5 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-foreground mb-1">Your Security Matters</h4>
              <p className="text-sm text-muted-foreground">
                AfriBenki uses bank-level encryption and is licensed by financial authorities. 
                Your funds are insured and protected.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
