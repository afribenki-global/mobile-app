import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, Users, DollarSign, Calendar, Link2, CheckCircle2, UserPlus } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

export function CreateCircleScreen() {
  const { setCurrentScreen, formatCurrency, language } = useApp();
  const { addActivity } = useActivity();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contributionAmount: '',
    frequency: 'monthly',
    duration: '12',
  });

  const [inviteLink, setInviteLink] = useState('');

  const handleCreateCircle = () => {
    if (!formData.name || !formData.contributionAmount) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: language === 'fr' ? 'Veuillez remplir tous les champs requis' : 'Please fill all required fields',
      });
      return;
    }

    // Generate invite link
    const link = `https://afribenki.app/join/${Math.random().toString(36).substring(7)}`;
    setInviteLink(link);

    // Add to activity
    addActivity({
      type: 'circle',
      title: formData.name,
      description: language === 'fr' ? 'Cercle créé avec succès' : 'Circle created successfully',
      status: 'completed',
      icon: '👥',
    });

    toast.success(language === 'fr' ? 'Cercle créé!' : 'Circle Created!', {
      description: language === 'fr' ? 'Invitez des membres à rejoindre' : 'Invite members to join',
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success(language === 'fr' ? 'Lien copié!' : 'Link Copied!', {
      description: language === 'fr' ? 'Partagez avec vos amis' : 'Share with your friends',
    });
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('circles')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{language === 'fr' ? 'Créer un cercle' : 'Create Circle'}</h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Démarrez un cercle d\'épargne avec vos amis' : 'Start a savings circle with friends'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        <Card className="p-6">
          <div className="space-y-4">
            {/* Circle Name */}
            <div>
              <Label>{language === 'fr' ? 'Nom du cercle' : 'Circle Name'}</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={language === 'fr' ? 'Ex: Amis d\'université' : 'e.g. College Friends'}
                className="mt-2"
              />
            </div>

            {/* Description */}
            <div>
              <Label>{language === 'fr' ? 'Description' : 'Description'} ({language === 'fr' ? 'Optionnel' : 'Optional'})</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={language === 'fr' ? 'À propos de ce cercle...' : 'What this circle is about...'}
                className="mt-2 min-h-[100px]"
              />
            </div>

            {/* Contribution Amount */}
            <div>
              <Label>{language === 'fr' ? 'Montant de la contribution' : 'Contribution Amount'}</Label>
              <Input
                type="number"
                value={formData.contributionAmount}
                onChange={(e) => setFormData({ ...formData, contributionAmount: e.target.value })}
                placeholder="10000"
                className="mt-2"
              />
            </div>

            {/* Frequency */}
            <div>
              <Label>{language === 'fr' ? 'Fréquence' : 'Frequency'}</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {['weekly', 'monthly', 'quarterly'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFormData({ ...formData, frequency: freq })}
                    className={`p-3 border rounded-lg text-sm ${
                      formData.frequency === freq
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {freq === 'weekly'
                      ? (language === 'fr' ? 'Hebdomadaire' : 'Weekly')
                      : freq === 'monthly'
                      ? (language === 'fr' ? 'Mensuel' : 'Monthly')
                      : (language === 'fr' ? 'Trimestriel' : 'Quarterly')}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <Label>{language === 'fr' ? 'Durée (mois)' : 'Duration (months)'}</Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="12"
                className="mt-2"
              />
            </div>

            <Button
              onClick={handleCreateCircle}
              className="w-full h-12 bg-accent hover:bg-accent/90"
            >
              <Users className="w-5 h-5 mr-2" />
              {language === 'fr' ? 'Créer le cercle' : 'Create Circle'}
            </Button>
          </div>
        </Card>

        {/* Invite Link */}
        {inviteLink && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card className="p-6">
              <h3 className="text-foreground mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5" />
                {language === 'fr' ? 'Lien d\'invitation' : 'Invite Link'}
              </h3>
              <div className="p-3 bg-muted rounded-lg mb-3">
                <p className="text-sm text-foreground break-all">{inviteLink}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={copyInviteLink} variant="outline" className="flex-1">
                  {language === 'fr' ? 'Copier le lien' : 'Copy Link'}
                </Button>
                <Button onClick={() => setCurrentScreen('circles')} className="flex-1">
                  {language === 'fr' ? 'Terminé' : 'Done'}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <h3 className="text-foreground mb-3">{language === 'fr' ? 'Comment ça marche' : 'How it Works'}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Créez un cercle avec un objectif d\'épargne' : 'Create a circle with a savings goal'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Invitez des amis via un lien ou des contacts' : 'Invite friends via link or contacts'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Chacun contribue régulièrement' : 'Everyone contributes regularly'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Les membres reçoivent les fonds à tour de rôle' : 'Members receive funds in rotation'}</span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
