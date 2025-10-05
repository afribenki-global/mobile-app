import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { useApp } from '../AppContext';
import { ArrowLeft, Upload, User, Mail, Phone, Camera, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { apiCallWithAuth } from '../../utils/supabase/client';

export function ProfileEditScreen() {
  const { setCurrentScreen, user, setUser, t } = useApp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(user?.profilePicture || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && accessToken !== 'demo-token') {
        await apiCallWithAuth('/profile', accessToken, {
          method: 'PUT',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            profilePicture,
          }),
        });
      }

      // Update local user state
      if (user) {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profilePicture,
          onboardingComplete: true, // Mark onboarding as complete when profile is updated
        });
      }

      toast.success(t('success'), {
        description: 'Profile updated successfully',
      });
      
      setCurrentScreen('settings');
    } catch (error) {
      toast.error(t('error'), {
        description: 'Failed to update profile. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('settings')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{t('editProfile')}</h2>
        <p className="text-white/80 text-sm">{t('personalInfo')}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-6">
        {/* Profile Picture */}
        <Card className="p-6">
          <Label className="mb-4 block">{t('profilePicture')}</Label>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Upload a new photo to personalize your account
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6 space-y-4">
          <h3 className="text-foreground mb-4">{t('personalInfo')}</h3>
          
          <div>
            <Label htmlFor="name">{t('fullName')}</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="pl-10 h-12 rounded-xl"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">{t('email')}</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-10 h-12 rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">{t('phone')}</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                className="pl-10 h-12 rounded-xl"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                readOnly
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Phone number cannot be changed for security reasons
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentScreen('settings')}
            className="flex-1 h-12"
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 h-12 bg-accent hover:bg-accent/90"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('loading')}...
              </span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t('updateProfile')}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
