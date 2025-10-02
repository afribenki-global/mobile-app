import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'sw' | 'pid' | 'ar';
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
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  detectedCountry: CountryInfo | null;
  setDetectedCountry: (country: CountryInfo | null) => void;
  isRTL: boolean;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'AfriBenki',
    home: 'Home',
    save: 'Save',
    invest: 'Invest',
    explore: 'Explore',
    wallet: 'Wallet',
    welcome: 'Welcome to AfriBenki',
    welcomeDesc: 'Save smarter, invest better, build wealth for tomorrow',
    getStarted: 'Get Started',
    signIn: 'Sign In',
    totalBalance: 'Total Balance',
    portfolio: 'Portfolio',
    savings: 'Savings',
    investments: 'Investments',
    quickActions: 'Quick Actions',
    createPlan: 'Create Plan',
    investNow: 'Invest Now',
    sendMoney: 'Send Money',
    savingsPlans: 'Savings Plans',
    mutualFunds: 'Mutual Funds',
    stocks: 'Stocks & Bonds',
    stash: 'Stash',
    circles: 'Circles',
    nest: 'Nest',
    bud: 'Bud',
    learn: 'Learn',
    settings: 'Settings',
    profile: 'Profile',
    security: 'Security',
    notifications: 'Notifications',
    language: 'Language',
    currencyLabel: 'Currency',
    logout: 'Logout',
  },
  fr: {
    appName: 'AfriBenki',
    home: 'Accueil',
    save: 'Épargner',
    invest: 'Investir',
    explore: 'Explorer',
    wallet: 'Portefeuille',
    welcome: 'Bienvenue sur AfriBenki',
    welcomeDesc: 'Économisez intelligemment, investissez mieux',
    getStarted: 'Commencer',
    signIn: 'Se connecter',
    totalBalance: 'Solde Total',
    portfolio: 'Portefeuille',
    savings: 'Épargne',
    investments: 'Investissements',
  },
  sw: {
    appName: 'AfriBenki',
    home: 'Nyumbani',
    save: 'Hifadhi',
    invest: 'Wekeza',
    explore: 'Gundua',
    wallet: 'Mkoba',
    welcome: 'Karibu AfriBenki',
    welcomeDesc: 'Hifadhi kwa busara, wekeza vizuri',
    getStarted: 'Anza',
    signIn: 'Ingia',
  },
  pid: {
    appName: 'AfriBenki',
    home: 'Home',
    save: 'Save',
    invest: 'Invest',
    explore: 'Explore',
    wallet: 'Wallet',
    welcome: 'Welcome to AfriBenki',
    welcomeDesc: 'Save better, invest sharp, build wealth',
    getStarted: 'Make we start',
    signIn: 'Sign In',
  },
  ar: {
    appName: 'أفريبنكي',
    home: 'الرئيسية',
    save: 'حفظ',
    invest: 'استثمر',
    explore: 'استكشف',
    wallet: 'المحفظة',
    welcome: 'مرحبا بك في أفريبنكي',
    welcomeDesc: 'وفر بذكاء، استثمر بشكل أفضل',
    getStarted: 'ابدأ',
    signIn: 'تسجيل الدخول',
  },
};

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
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<CountryInfo | null>(null);

  const isRTL = language === 'ar';

  const t = (key: string): string => {
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
    return `${symbols[currency]}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
        currentScreen,
        setCurrentScreen,
        isOnboarded,
        setIsOnboarded,
        detectedCountry,
        setDetectedCountry,
        isRTL,
        t,
        formatCurrency,
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