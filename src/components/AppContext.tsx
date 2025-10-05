import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, type Language, type TranslationKeys } from '../utils/translations';

export type { Language };
export type Currency = 'NGN' | 'GHS' | 'KES' | 'XAF' | 'USD';

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  currency: Currency;
  language: Language;
  broker?: string;
}

interface User {
  id?: string;
  name: string;
  email?: string | null;
  username?: string;
  phone?: string;
  avatar?: string;
  balance: number;
  portfolioValue: number;
  savings?: number;
  onboardingComplete?: boolean;
  profilePicture?: string | null;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  updateBalance: (amount: number, type: 'topup' | 'withdraw' | 'savings' | 'investment' | 'circle') => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  previousScreen: string | null;
  setPreviousScreen: (screen: string | null) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  detectedCountry: CountryInfo | null;
  setDetectedCountry: (country: CountryInfo | null) => void;
  selectedArticleId: string;
  setSelectedArticleId: (id: string) => void;
  isRTL: boolean;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  unreadNotificationsCount: number;
  setUnreadNotificationsCount: (count: number) => void;
  selectedCircleId: string | null;
  setSelectedCircleId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const COUNTRIES: Record<string, CountryInfo> = {
  NG: { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phoneCode: '+234', currency: 'NGN', language: 'en', broker: 'Trove' },
  GH: { code: 'GH', name: 'Ghana', flag: '🇬🇭', phoneCode: '+233', currency: 'GHS', language: 'en', broker: 'Trove' },
  KE: { code: 'KE', name: 'Kenya', flag: '🇰🇪', phoneCode: '+254', currency: 'KES', language: 'sw', broker: 'EGM Securities' },
  CI: { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', phoneCode: '+225', currency: 'XAF', language: 'fr' },
  CM: { code: 'CM', name: 'Cameroon', flag: '🇨🇲', phoneCode: '+237', currency: 'XAF', language: 'fr' },
  EG: { code: 'EG', name: 'Egypt', flag: '🇪🇬', phoneCode: '+20', currency: 'USD', language: 'ar' },
  SA: { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phoneCode: '+966', currency: 'USD', language: 'ar' },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [previousScreen, setPreviousScreen] = useState<string | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<CountryInfo | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState('1');
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);

  const isRTL = language === 'ar';

  // Apply RTL to document when language changes
  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || key;
  };

  const formatCurrency = (amount: number): string => {
    const symbols: Record<Currency, string> = {
      NGN: '₦',
      GHS: '₵',
      KES: 'KSh',
      XAF: 'FCFA',
      USD: '$',
    };
    const safeAmount = amount || 0;
    return `${symbols[currency]}${safeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const updateBalance = (amount: number, type: 'topup' | 'withdraw' | 'savings' | 'investment' | 'circle') => {
    if (!user) return;
    
    let newBalance = user.balance;
    let newSavings = user.savings || 0;
    let newPortfolio = user.portfolioValue;

    switch (type) {
      case 'topup':
        newBalance += amount;
        break;
      case 'withdraw':
        newBalance -= amount;
        break;
      case 'savings':
        newBalance -= amount;
        newSavings += amount;
        break;
      case 'investment':
        newBalance -= amount;
        newPortfolio += amount;
        break;
      case 'circle':
        newBalance -= amount;
        break;
    }

    setUser({
      ...user,
      balance: newBalance,
      savings: newSavings,
      portfolioValue: newPortfolio,
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        user,
        setUser,
        updateBalance,
        currentScreen,
        setCurrentScreen,
        previousScreen,
        setPreviousScreen,
        isOnboarded,
        setIsOnboarded,
        detectedCountry,
        setDetectedCountry,
        selectedArticleId,
        setSelectedArticleId,
        isRTL,
        t,
        formatCurrency,
        unreadNotificationsCount,
        setUnreadNotificationsCount,
        selectedCircleId,
        setSelectedCircleId,
      }}
    >
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
