import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './components/AppContext';
import { SplashScreen } from './components/SplashScreen';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { CountryDetection } from './components/onboarding/CountryDetection';
import { SignUpScreen } from './components/onboarding/SignUpScreen';
import { SignInScreen } from './components/onboarding/SignInScreen';
import { OnboardingProfile } from './components/onboarding/OnboardingProfile';
import { LanguageSelection } from './components/onboarding/LanguageSelection';
import { CurrencySelection } from './components/onboarding/CurrencySelection';
import { KYCScreen } from './components/onboarding/KYCScreen';
import { GoalQuiz } from './components/onboarding/GoalQuiz';
import { HomeScreen } from './components/screens/HomeScreen';
import { SaveScreen } from './components/screens/SaveScreen';
import { CreateSavingsPlan } from './components/screens/CreateSavingsPlan';
import { InvestScreen } from './components/screens/InvestScreen';
import { FundDetails } from './components/screens/FundDetails';
import { WalletScreen } from './components/screens/WalletScreen';
import { CirclesScreen } from './components/screens/CirclesScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { OnboardingBanner } from './components/OnboardingBanner';
import { AIChat } from './components/AIChat';
import { Toaster } from './components/ui/sonner';
import { apiCall, apiCallWithAuth } from './utils/supabase/client';

function AppContent() {
  const { currentScreen, isOnboarded, setUser, setIsOnboarded, user } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Initialize default user on app load
    const initializeApp = async () => {
      console.log('🚀 AfriBenki App Initializing...');
      console.log('📍 Environment: Supabase connected');
      
      // Initialize default demo user
      try {
        const result = await apiCall('/init', { method: 'POST' });
        console.log('✅ Default user initialized:', result);
      } catch (error: any) {
        console.log('ℹ️ Default user initialization:', error?.message || 'Already exists or failed (normal on subsequent loads)');
      }
      
      // Check for stored access token
      const accessToken = localStorage.getItem('accessToken');
      console.log('🔑 Checking saved session... Found:', accessToken ? 'Yes' : 'No');
      
      if (accessToken && accessToken !== 'demo-token') {
        // User is already logged in, fetch their profile
        try {
          console.log('🔄 Fetching user profile...');
          const data = await apiCallWithAuth('/profile', accessToken, {
            method: 'GET',
          });
          setUser(data.user);
          setIsOnboarded(true);
          console.log('✅ User profile loaded:', data.user.name || data.user.username);
        } catch (error) {
          console.error('❌ Failed to fetch user profile:', error);
          localStorage.removeItem('accessToken');
          console.log('🗑️ Cleared invalid access token');
        }
      } else if (accessToken === 'demo-token') {
        // Demo mode
        console.log('🎭 Demo mode active');
        setUser({
          id: 'demo-user-1',
          username: '000006',
          phone: '000006',
          name: 'Demo User',
          email: 'demo@afribenki.app',
          balance: 125000,
          portfolioValue: 485000,
          savings: 200000,
          onboardingComplete: false,
          profilePicture: null,
        });
        setIsOnboarded(true);
      }
      
      console.log('✨ App initialization complete');
    };
    
    initializeApp();
  }, [setUser, setIsOnboarded]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Onboarding flow
  if (!isOnboarded) {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'country-detection':
        return <CountryDetection />;
      case 'signup':
        return <SignUpScreen />;
      case 'signin':
        return <SignInScreen />;
      case 'language-selection':
        return <LanguageSelection />;
      case 'currency-selection':
        return <CurrencySelection />;
      case 'kyc':
        return <KYCScreen />;
      case 'goal-quiz':
        return <GoalQuiz />;
      case 'onboarding-profile':
        return <OnboardingProfile />;
      default:
        return <WelcomeScreen />;
    }
  }

  // Main app screens with onboarding banner and AI chat
  let mainScreen;
  switch (currentScreen) {
    case 'home':
      mainScreen = <HomeScreen />;
      break;
    case 'save':
      mainScreen = <SaveScreen />;
      break;
    case 'create-savings-plan':
      mainScreen = <CreateSavingsPlan />;
      break;
    case 'invest':
      mainScreen = <InvestScreen />;
      break;
    case 'fund-details':
    case 'mutual-funds':
      mainScreen = <FundDetails />;
      break;
    case 'wallet':
      mainScreen = <WalletScreen />;
      break;
    case 'circles':
      mainScreen = <CirclesScreen />;
      break;
    case 'explore':
      mainScreen = <ExploreScreen />;
      break;
    case 'settings':
      mainScreen = <SettingsScreen />;
      break;
    case 'language-selection':
      mainScreen = <LanguageSelection />;
      break;
    case 'currency-selection':
      mainScreen = <CurrencySelection />;
      break;
    default:
      mainScreen = <HomeScreen />;
  }
  
  return (
    <>
      {user && !user.onboardingComplete && <OnboardingBanner />}
      {mainScreen}
      <AIChat />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="size-full bg-background">
        <AppContent />
        <Toaster />
      </div>
    </AppProvider>
  );
}
