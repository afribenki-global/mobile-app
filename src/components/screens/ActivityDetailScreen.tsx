import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, CheckCircle2, Clock, Calendar, Hash, Download, Share2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function ActivityDetailScreen() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();
  const { activities } = useActivity();
  
  const activityId = localStorage.getItem('selectedActivity');
  const activity = activities.find(a => a.id === activityId);

  if (!activity) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">{language === 'fr' ? 'Activité non trouvée' : 'Activity not found'}</p>
          <Button onClick={() => setCurrentScreen('activity-history')}>
            {language === 'fr' ? 'Retour' : 'Go Back'}
          </Button>
        </Card>
      </div>
    );
  }

  const details = [
    { label: language === 'fr' ? 'ID de transaction' : 'Transaction ID', value: activity.id.slice(0, 16) + '...', icon: Hash },
    { label: language === 'fr' ? 'Date & Heure' : 'Date & Time', value: new Date(activity.timestamp).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US'), icon: Calendar },
    { label: language === 'fr' ? 'Type' : 'Type', value: activity.type.charAt(0).toUpperCase() + activity.type.slice(1), icon: CheckCircle2 },
    { label: language === 'fr' ? 'Statut' : 'Status', value: activity.status, icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('activity-history')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{language === 'fr' ? 'Détails de l\'activité' : 'Activity Details'}</h2>
        <p className="text-white/80 text-sm">{activity.title}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Status Card */}
        <Card className="p-6 text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">{activity.icon}</span>
          </div>
          <Badge
            className={
              activity.status === 'completed'
                ? 'bg-success'
                : activity.status === 'pending'
                ? 'bg-warning'
                : 'bg-destructive'
            }
          >
            {activity.status === 'completed' 
              ? (language === 'fr' ? 'Terminé' : 'Completed')
              : activity.status === 'pending'
              ? (language === 'fr' ? 'En attente' : 'Pending')
              : (language === 'fr' ? 'Échoué' : 'Failed')
            }
          </Badge>
          
          {activity.amount && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-1">{language === 'fr' ? 'Montant' : 'Amount'}</p>
              <p className="text-3xl text-success">+{formatCurrency(activity.amount)}</p>
            </div>
          )}
        </Card>

        {/* Description */}
        <Card className="p-6">
          <h3 className="text-foreground mb-3">{language === 'fr' ? 'Description' : 'Description'}</h3>
          <p className="text-muted-foreground">{activity.description}</p>
        </Card>

        {/* Details */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Détails de la transaction' : 'Transaction Details'}</h3>
          <div className="space-y-4">
            {details.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{detail.label}</p>
                    <p className="text-foreground">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12">
            <Download className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Télécharger' : 'Download'}
          </Button>
          <Button variant="outline" className="flex-1 h-12">
            <Share2 className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Partager' : 'Share'}
          </Button>
        </div>

        {/* Related Actions */}
        {activity.type === 'savings' && (
          <Button
            onClick={() => setCurrentScreen('savings-plan-detail')}
            className="w-full h-12 bg-primary hover:bg-primary/90"
          >
            {language === 'fr' ? 'Voir le plan d\'épargne' : 'View Savings Plan'}
          </Button>
        )}
        {activity.type === 'investment' && (
          <Button
            onClick={() => setCurrentScreen('my-investments')}
            className="w-full h-12 bg-accent hover:bg-accent/90"
          >
            {language === 'fr' ? 'Voir les investissements' : 'View Investments'}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
