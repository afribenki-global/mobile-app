import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, Clock, Filter } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useState } from 'react';

export function ActivityHistoryScreen() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();
  const { activities } = useActivity();
  const [filter, setFilter] = useState<'all' | 'savings' | 'investment' | 'circle'>('all');

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  const groupByDate = (activities: typeof filteredActivities) => {
    const groups: Record<string, typeof filteredActivities> = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let key: string;
      if (date.toDateString() === today.toDateString()) {
        key = language === 'fr' ? 'Aujourd\'hui' : 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        key = language === 'fr' ? 'Hier' : 'Yesterday';
      } else {
        key = date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
          month: 'long',
          day: 'numeric',
          year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
        });
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(activity);
    });
    
    return groups;
  };

  const groupedActivities = groupByDate(filteredActivities);

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('home')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{t('recentTransactions')}</h2>
        <p className="text-white/80 text-sm">
          {filteredActivities.length} {language === 'fr' ? 'activités' : 'activities'}
        </p>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {/* Filter */}
        <Card className="p-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="whitespace-nowrap"
            >
              {language === 'fr' ? 'Tout' : 'All'}
            </Button>
            <Button
              variant={filter === 'savings' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('savings')}
              className="whitespace-nowrap"
            >
              {t('savings')}
            </Button>
            <Button
              variant={filter === 'investment' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('investment')}
              className="whitespace-nowrap"
            >
              {t('investments')}
            </Button>
            <Button
              variant={filter === 'circle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('circle')}
              className="whitespace-nowrap"
            >
              {t('circles')}
            </Button>
          </div>
        </Card>

        {/* Grouped Activities */}
        {Object.entries(groupedActivities).map(([date, activities]) => (
          <div key={date}>
            <h3 className="text-foreground mb-3 px-1">{date}</h3>
            <div className="space-y-2">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card
                    onClick={() => {
                      // Store activity ID for detail view
                      localStorage.setItem('selectedActivity', activity.id);
                      setCurrentScreen('activity-detail');
                    }}
                    className="p-4 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10">
                          <span className="text-2xl">{activity.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground">{activity.title}</p>
                            <Badge
                              variant="outline"
                              className={
                                activity.status === 'completed'
                                  ? 'border-success text-success'
                                  : activity.status === 'pending'
                                  ? 'border-warning text-warning'
                                  : 'border-destructive text-destructive'
                              }
                            >
                              {activity.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {new Date(activity.timestamp).toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>
                      {activity.amount && (
                        <div className="text-right ml-4">
                          <p className="text-success">
                            +{formatCurrency(activity.amount)}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">{t('noData')}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
