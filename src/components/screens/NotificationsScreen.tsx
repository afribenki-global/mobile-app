import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Bell, TrendingUp, Users, Wallet, Gift, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Notification {
  id: string;
  type: 'investment' | 'circle' | 'wallet' | 'reward' | 'alert' | 'success';
  title: string;
  titleFr: string;
  message: string;
  messageFr: string;
  timestamp: Date;
  read: boolean;
  icon: any;
  color: string;
}

export function NotificationsScreen() {
  const { setCurrentScreen, t, language, setUnreadNotificationsCount } = useApp();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'investment',
      title: 'Investment Return',
      titleFr: 'Rendement de l\'investissement',
      message: 'Your Equity Growth Fund returned +2.4% this month',
      messageFr: 'Votre Fonds de Croissance Actions a rapporté +2,4% ce mois-ci',
      timestamp: new Date(Date.now() - 1800000), // 30 min ago
      read: false,
      icon: TrendingUp,
      color: 'text-accent',
    },
    {
      id: '2',
      type: 'circle',
      title: 'Circle Payment Due',
      titleFr: 'Paiement du cercle dû',
      message: 'Family Vacation Fund payment due in 2 days',
      messageFr: 'Paiement du Fonds de vacances familiales dû dans 2 jours',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      icon: Users,
      color: 'text-warning',
    },
    {
      id: '3',
      type: 'wallet',
      title: 'Funds Added',
      titleFr: 'Fonds ajoutés',
      message: '₦50,000 added to your wallet successfully',
      messageFr: '50 000 ₦ ajoutés à votre portefeuille avec succès',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: false,
      icon: Wallet,
      color: 'text-primary',
    },
    {
      id: '4',
      type: 'reward',
      title: 'Achievement Unlocked!',
      titleFr: 'Succès débloqué!',
      message: 'You\'ve saved ₦200,000! Earned 500 bonus points',
      messageFr: 'Vous avez économisé 200 000 ₦! Gagné 500 points bonus',
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      read: true,
      icon: Gift,
      color: 'text-warning',
    },
    {
      id: '5',
      type: 'success',
      title: 'Goal Achieved',
      titleFr: 'Objectif atteint',
      message: 'Emergency Fund goal completed! ₦200,000 saved',
      messageFr: 'Objectif du Fonds d\'urgence atteint! 200 000 ₦ économisés',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true,
      icon: CheckCircle2,
      color: 'text-success',
    },
    {
      id: '6',
      type: 'alert',
      title: 'Market Update',
      titleFr: 'Mise à jour du marché',
      message: 'Nigerian Stock Exchange gained 1.8% today',
      messageFr: 'La Bourse nigériane a gagné 1,8% aujourd\'hui',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      read: true,
      icon: AlertCircle,
      color: 'text-blue-500',
    },
    {
      id: '7',
      type: 'circle',
      title: 'New Circle Member',
      titleFr: 'Nouveau membre du cercle',
      message: 'John Osei joined Family Vacation Fund',
      messageFr: 'John Osei a rejoint le Fonds de vacances familiales',
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
      read: true,
      icon: Users,
      color: 'text-accent',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadNotificationsCount(0);
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    const newUnreadCount = updatedNotifications.filter(n => !n.read).length;
    setUnreadNotificationsCount(newUnreadCount);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (language === 'fr') {
      if (minutes < 1) return 'À l\'instant';
      if (minutes < 60) return `Il y a ${minutes} min`;
      if (hours < 24) return `Il y a ${hours}h`;
      if (days === 1) return 'Hier';
      return `Il y a ${days} jours`;
    }

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  const newNotifications = notifications.filter(n => !n.read);
  const earlierNotifications = notifications.filter(n => n.read);

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-xl">{t('notifications_title')}</h2>
          <div className="w-10" />
        </div>

        {unreadCount > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-warning text-primary">
                {unreadCount} {t('newNotification')}
              </Badge>
            </div>
            <button
              onClick={markAllAsRead}
              className="text-sm text-white/80 hover:text-white"
            >
              {t('markAllRead')}
            </button>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-6"
      >
        {/* New Notifications */}
        {newNotifications.length > 0 && (
          <div>
            <h3 className="text-foreground mb-3 px-1">{t('newNotification')}</h3>
            <div className="space-y-2">
              {newNotifications.map((notification, index) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      onClick={() => markAsRead(notification.id)}
                      className="p-3 cursor-pointer hover:bg-accent/5 transition-colors border-l-2 border-l-accent bg-card rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${notification.color} flex-shrink-0`} />
                          <span className="text-sm text-foreground">
                            {language === 'fr' ? notification.titleFr : notification.title}
                          </span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground ml-6 mb-1">
                        {language === 'fr' ? notification.messageFr : notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground ml-6">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Earlier Notifications */}
        {earlierNotifications.length > 0 && (
          <div>
            <h3 className="text-foreground mb-3 px-1">{t('earlier')}</h3>
            <div className="space-y-2">
              {earlierNotifications.map((notification, index) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="p-3 hover:bg-muted/50 transition-colors bg-card rounded-lg opacity-70">
                      <div className="flex items-start gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${notification.color} flex-shrink-0`} />
                        <span className="text-sm text-foreground">
                          {language === 'fr' ? notification.titleFr : notification.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground ml-6 mb-1">
                        {language === 'fr' ? notification.messageFr : notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground ml-6">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <Card className="p-12 text-center">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-foreground mb-2">{language === 'fr' ? 'Aucune notification' : 'No Notifications'}</h3>
            <p className="text-muted-foreground text-sm">
              {language === 'fr' 
                ? 'Vous êtes à jour! Nous vous informerons des nouvelles activités.'
                : 'You\'re all caught up! We\'ll notify you of new activity.'}
            </p>
          </Card>
        )}
      </motion.div>
    </div>
  );
}