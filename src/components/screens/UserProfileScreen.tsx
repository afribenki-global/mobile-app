import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Building, Award, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function UserProfileScreen() {
  const { setCurrentScreen, user, formatCurrency, t, language } = useApp();
  
  const profileData = {
    ...user,
    address: language === 'fr' ? '123 Rue Victoria, Lagos, Nigeria' : '123 Victoria Street, Lagos, Nigeria',
    dateOfBirth: '1990-05-15',
    occupation: language === 'fr' ? 'Entrepreneur' : 'Entrepreneur',
    employer: 'Tech Innovations Ltd',
    monthlyIncome: 500000,
    accountType: 'Premium',
    memberSince: '2024-06-15',
    kycStatus: 'Verified',
    achievements: [
      { id: 1, name: language === 'fr' ? 'Premier investissement' : 'First Investment', icon: '🎯', date: '2024-06-20' },
      { id: 2, name: language === 'fr' ? 'Épargnant régulier' : 'Consistent Saver', icon: '💰', date: '2024-08-15' },
      { id: 3, name: language === 'fr' ? 'Créateur de cercle' : 'Circle Creator', icon: '👥', date: '2024-09-01' },
    ],
  };

  const stats = [
    { label: t('totalBalance'), value: formatCurrency(user?.balance || 0), icon: TrendingUp, color: 'text-primary' },
    { label: t('portfolio'), value: formatCurrency(user?.portfolioValue || 0), icon: Building, color: 'text-accent' },
    { label: t('savings'), value: formatCurrency(user?.savings || 0), icon: Award, color: 'text-success' },
  ];

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
        <h2 className="text-white mb-2">{t('profile')}</h2>
        <p className="text-white/80 text-sm">{language === 'fr' ? 'Informations du compte' : 'Account Information'}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-white text-2xl">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-foreground text-xl mb-1">{user?.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-success">
                  {profileData.kycStatus}
                </Badge>
                <Badge variant="outline">
                  {profileData.accountType}
                </Badge>
              </div>
              <Button
                onClick={() => setCurrentScreen('profile-edit')}
                size="sm"
                variant="outline"
              >
                <Edit className="w-4 h-4 mr-2" />
                {t('edit')}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-xl">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-foreground">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{t('personalInfo')}</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{t('email')}</p>
                <p className="text-foreground">{user?.email || language === 'fr' ? 'Non fourni' : 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{t('phone')}</p>
                <p className="text-foreground">{user?.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Adresse' : 'Address'}</p>
                <p className="text-foreground">{profileData.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Date de naissance' : 'Date of Birth'}</p>
                <p className="text-foreground">
                  {new Date(profileData.dateOfBirth).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Profession' : 'Occupation'}</p>
                <p className="text-foreground">{profileData.occupation}</p>
                <p className="text-sm text-muted-foreground">{profileData.employer}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Details */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Détails du compte' : 'Account Details'}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Type de compte' : 'Account Type'}</span>
              <span className="text-foreground">{profileData.accountType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Membre depuis' : 'Member Since'}</span>
              <span className="text-foreground">
                {new Date(profileData.memberSince).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Statut KYC' : 'KYC Status'}</span>
              <Badge className="bg-success">{profileData.kycStatus}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Revenu mensuel' : 'Monthly Income'}</span>
              <span className="text-foreground">{formatCurrency(profileData.monthlyIncome)}</span>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Réalisations' : 'Achievements'}</h3>
          <div className="space-y-3">
            {profileData.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="text-foreground">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(achievement.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
