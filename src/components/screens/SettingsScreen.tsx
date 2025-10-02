import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChevronRight, User, Lock, Bell, Globe, CreditCard, HelpCircle, FileText, LogOut, Shield, Smartphone } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

export function SettingsScreen() {
  const { user, language, currency, setCurrentScreen } = useApp();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', icon: User, label: 'Personal Information', value: user?.name },
        { id: 'kyc', icon: Shield, label: 'Verification Status', badge: 'Verified', badgeColor: 'bg-success' },
        { id: 'linked-accounts', icon: CreditCard, label: 'Linked Bank Accounts', value: '2 accounts' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: 'language', icon: Globe, label: 'Language', value: language.toUpperCase() },
        { id: 'currency', icon: CreditCard, label: 'Currency', value: currency },
        { id: 'notifications', icon: Bell, label: 'Notifications', toggle: true, enabled: true },
      ],
    },
    {
      title: 'Security',
      items: [
        { id: 'change-password', icon: Lock, label: 'Change Password' },
        { id: '2fa', icon: Smartphone, label: 'Two-Factor Authentication', toggle: true, enabled: false },
        { id: 'biometric', icon: Shield, label: 'Biometric Login', toggle: true, enabled: true },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', icon: HelpCircle, label: 'Help Center' },
        { id: 'terms', icon: FileText, label: 'Terms & Conditions' },
        { id: 'privacy', icon: FileText, label: 'Privacy Policy' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Settings" />
      
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
            <button className="text-primary hover:underline">Edit</button>
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
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                    onClick={() => {
                      if (item.id === 'language') setCurrentScreen('language-selection');
                      else if (item.id === 'currency') setCurrentScreen('currency-selection');
                    }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-muted transition-colors ${
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
                  </motion.button>
                );
              })}
            </Card>
          </div>
        ))}

        {/* App Info */}
        <Card className="p-5 text-center">
          <p className="text-sm text-muted-foreground mb-2">AfriBenki App Version</p>
          <p className="font-medium text-foreground mb-4">2.5.0</p>
          <div className="flex items-center justify-center gap-4 text-sm text-primary">
            <button className="hover:underline">Rate Us</button>
            <span className="text-muted-foreground">•</span>
            <button className="hover:underline">Share App</button>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={() => {
            setCurrentScreen('welcome');
          }}
          variant="outline"
          className="w-full h-12 border-destructive text-destructive hover:bg-destructive hover:text-white rounded-xl"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
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
