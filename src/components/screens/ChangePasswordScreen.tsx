import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

export function ChangePasswordScreen() {
  const { setCurrentScreen, language } = useApp();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: language === 'fr' ? 'Veuillez remplir tous les champs' : 'Please fill all fields',
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: language === 'fr' ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match',
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: language === 'fr' ? 'Le mot de passe doit contenir au moins 6 caractères' : 'Password must be at least 6 characters',
      });
      return;
    }

    // Simulate password change
    toast.success(language === 'fr' ? 'Mot de passe modifié!' : 'Password Changed!', {
      description: language === 'fr' ? 'Votre mot de passe a été mis à jour avec succès' : 'Your password has been updated successfully',
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });

    setTimeout(() => {
      setCurrentScreen('settings');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('settings')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{language === 'fr' ? 'Changer le mot de passe' : 'Change Password'}</h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Mettez à jour votre mot de passe' : 'Update your password'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        <Card className="p-6">
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <Label>{language === 'fr' ? 'Mot de passe actuel' : 'Current Password'}</Label>
              <div className="relative mt-2">
                <Input
                  type={showPassword.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword.current ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <Label>{language === 'fr' ? 'Nouveau mot de passe' : 'New Password'}</Label>
              <div className="relative mt-2">
                <Input
                  type={showPassword.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword.new ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label>{language === 'fr' ? 'Confirmer le mot de passe' : 'Confirm Password'}</Label>
              <div className="relative mt-2">
                <Input
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword.confirm ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleChangePassword}
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              {language === 'fr' ? 'Mettre à jour le mot de passe' : 'Update Password'}
            </Button>
          </div>
        </Card>

        {/* Password Requirements */}
        <Card className="p-6 bg-muted">
          <h3 className="text-foreground mb-3">{language === 'fr' ? 'Exigences du mot de passe' : 'Password Requirements'}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Au moins 6 caractères' : 'At least 6 characters'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Mélange de lettres et de chiffres recommandé' : 'Mix of letters and numbers recommended'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Évitez les mots de passe courants' : 'Avoid common passwords'}</span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
