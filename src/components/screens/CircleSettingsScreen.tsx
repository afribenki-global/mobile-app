import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, Edit2, Target, Calendar, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

export function CircleSettingsScreen() {
  const { setCurrentScreen, formatCurrency, language } = useApp();
  const { addActivity } = useActivity();
  const [groupName, setGroupName] = useState('Family Vacation Fund');
  const [targetAmount, setTargetAmount] = useState('500000');
  const [contributionAmount, setContributionAmount] = useState('20000');
  const [frequency, setFrequency] = useState('monthly');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    addActivity({
      type: 'circle',
      title: language === 'fr' ? 'Paramètres du cercle mis à jour' : 'Circle Settings Updated',
      description: `${groupName}`,
      amount: 0,
      status: 'completed',
      timestamp: new Date(),
    });

    toast.success(
      language === 'fr'
        ? 'Paramètres du cercle mis à jour avec succès'
        : 'Circle settings updated successfully'
    );

    setIsEditing(false);
    toast.success(
      language === 'fr'
        ? 'Retour au chat...'
        : 'Returning to chat...'
    );
    setTimeout(() => {
      setCurrentScreen('circle-chat');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('circle-chat')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">
          {language === 'fr' ? 'Paramètres du cercle' : 'Circle Settings'}
        </h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Gérer les paramètres de votre cercle' : 'Manage your circle settings'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Edit Toggle */}
        {!isEditing && (
          <Card className="p-4">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-accent hover:bg-accent/90"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Modifier les paramètres' : 'Edit Settings'}
            </Button>
          </Card>
        )}

        {/* Group Name */}
        <Card className="p-5">
          <Label className="text-foreground mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            {language === 'fr' ? 'Nom du groupe' : 'Group Name'}
          </Label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            disabled={!isEditing}
            className="h-12"
          />
        </Card>

        {/* Target Amount */}
        <Card className="p-5">
          <Label className="text-foreground mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            {language === 'fr' ? 'Objectif du groupe' : 'Group Target'}
          </Label>
          <Input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            disabled={!isEditing}
            className="h-12"
            placeholder={language === 'fr' ? 'Montant cible' : 'Target amount'}
          />
          {targetAmount && (
            <p className="text-sm text-muted-foreground mt-2">
              {formatCurrency(parseFloat(targetAmount))}
            </p>
          )}
        </Card>

        {/* Contribution Settings */}
        <Card className="p-5">
          <h3 className="text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {language === 'fr' ? 'Paramètres de contribution' : 'Contribution Settings'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-foreground mb-2 block">
                {language === 'fr' ? 'Montant de contribution' : 'Contribution Amount'}
              </Label>
              <Input
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                disabled={!isEditing}
                className="h-12"
              />
              {contributionAmount && (
                <p className="text-sm text-muted-foreground mt-2">
                  {formatCurrency(parseFloat(contributionAmount))} {language === 'fr' ? 'par membre' : 'per member'}
                </p>
              )}
            </div>

            <div>
              <Label className="text-foreground mb-2 block">
                {language === 'fr' ? 'Fréquence' : 'Frequency'}
              </Label>
              <Select value={frequency} onValueChange={setFrequency} disabled={!isEditing}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">
                    {language === 'fr' ? 'Hebdomadaire' : 'Weekly'}
                  </SelectItem>
                  <SelectItem value="bi-weekly">
                    {language === 'fr' ? 'Toutes les deux semaines' : 'Bi-weekly'}
                  </SelectItem>
                  <SelectItem value="monthly">
                    {language === 'fr' ? 'Mensuel' : 'Monthly'}
                  </SelectItem>
                  <SelectItem value="quarterly">
                    {language === 'fr' ? 'Trimestriel' : 'Quarterly'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Summary */}
        {targetAmount && contributionAmount && (
          <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h4 className="text-foreground mb-3">
              {language === 'fr' ? '📊 Résumé' : '📊 Summary'}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === 'fr' ? 'Objectif total' : 'Total Target'}
                </span>
                <span className="font-medium text-foreground">
                  {formatCurrency(parseFloat(targetAmount))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === 'fr' ? 'Par membre' : 'Per Member'}
                </span>
                <span className="font-medium text-foreground">
                  {formatCurrency(parseFloat(contributionAmount))} / 
                  {frequency === 'weekly' ? (language === 'fr' ? ' semaine' : ' week') :
                   frequency === 'bi-weekly' ? (language === 'fr' ? ' 2 semaines' : ' 2 weeks') :
                   frequency === 'monthly' ? (language === 'fr' ? ' mois' : ' month') :
                   (language === 'fr' ? ' trimestre' : ' quarter')}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-purple-300">
                <span className="text-muted-foreground">
                  {language === 'fr' ? 'Estimé pour atteindre l\'objectif' : 'Estimated to reach goal'}
                </span>
                <span className="font-medium text-foreground">
                  {Math.ceil(parseFloat(targetAmount) / (parseFloat(contributionAmount) * 5))}{' '}
                  {language === 'fr' ? 'périodes' : 'periods'}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex-1"
            >
              {language === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-accent hover:bg-accent/90"
            >
              {language === 'fr' ? 'Enregistrer' : 'Save Changes'}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
