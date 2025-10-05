import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './components/AppContext';
import { ActivityProvider } from './components/ActivityContext';
import { CircleMessagesProvider } from './components/CircleMessagesContext';
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
import { SavingsPlanDetail } from './components/screens/SavingsPlanDetail';
import { InvestScreen } from './components/screens/InvestScreen';
import { FundDetails } from './components/screens/FundDetails';
import { WalletScreen } from './components/screens/WalletScreen';
import { CirclesScreen } from './components/screens/CirclesScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ProfileEditScreen } from './components/screens/ProfileEditScreen';
import { UserProfileScreen } from './components/screens/UserProfileScreen';
import { ActivityHistoryScreen } from './components/screens/ActivityHistoryScreen';
import { ActivityDetailScreen } from './components/screens/ActivityDetailScreen';
import { MyInvestmentsScreen } from './components/screens/MyInvestmentsScreen';
import { InvestmentDetailScreen } from './components/screens/InvestmentDetailScreen';
import { StocksScreen } from './components/screens/StocksScreen';
import { StockDetailScreen } from './components/screens/StockDetailScreen';
import { BondsScreen } from './components/screens/BondsScreen';
import { BondDetailScreen } from './components/screens/BondDetailScreen';
import { LinkedBankAccountsScreen } from './components/screens/LinkedBankAccountsScreen';
import { ChangePasswordScreen } from './components/screens/ChangePasswordScreen';
import { HelpCenterScreen } from './components/screens/HelpCenterScreen';
import { TermsAndConditionsScreen } from './components/screens/TermsAndConditionsScreen';
import { PrivacyPolicyScreen } from './components/screens/PrivacyPolicyScreen';
import { CreateCircleScreen } from './components/screens/CreateCircleScreen';
import { ArticleDetailScreen } from './components/screens/ArticleDetailScreen';
import { ArticleReaderScreen } from './components/screens/ArticleReaderScreen';
import { CalculatorsScreen } from './components/screens/CalculatorsScreen';
import { RiskAssessmentScreen } from './components/screens/RiskAssessmentScreen';
import { MarketInsightsScreen } from './components/screens/MarketInsightsScreen';
import { InvestmentBasicsScreen } from './components/screens/InvestmentBasicsScreen';
import { CircleChatScreen } from './components/screens/CircleChatScreen';
import { CircleContributeScreen } from './components/screens/CircleContributeScreen';
import { CircleAddMembersScreen } from './components/screens/CircleAddMembersScreen';
import { CircleSettingsScreen } from './components/screens/CircleSettingsScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { TopUpScreen } from './components/screens/TopUpScreen';
import { WithdrawScreen } from './components/screens/WithdrawScreen';
import { NewInvestmentScreen } from './components/screens/NewInvestmentScreen';
import { TransactionHistoryScreen } from './components/screens/TransactionHistoryScreen';
import { CryptoInvestScreen } from './components/screens/CryptoInvestScreen';
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
      // Initialize default demo user
      try {
        await apiCall('/init', { method: 'POST' });
      } catch (error: any) {
        // Silently handle - normal on subsequent loads
      }
      
      // Check for stored access token
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken && accessToken !== 'demo-token') {
        // User is already logged in, fetch their profile
        try {
          const data = await apiCallWithAuth('/profile', accessToken, {
            method: 'GET',
          });
          setUser(data.user);
          setIsOnboarded(true);
        } catch (error) {
          localStorage.removeItem('accessToken');
        }
      } else if (accessToken === 'demo-token') {
        // Demo mode
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
    case 'savings-plan-detail':
      mainScreen = <SavingsPlanDetail />;
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
    case 'create-circle':
      mainScreen = <CreateCircleScreen />;
      break;
    case 'explore':
      mainScreen = <ExploreScreen />;
      break;
    case 'article-detail':
      mainScreen = <ArticleDetailScreen />;
      break;
    case 'article-reader':
      mainScreen = <ArticleReaderScreen />;
      break;
    case 'calculators':
      mainScreen = <CalculatorsScreen />;
      break;
    case 'risk-assessment':
      mainScreen = <RiskAssessmentScreen />;
      break;
    case 'market-insights':
      mainScreen = <MarketInsightsScreen />;
      break;
    case 'investment-basics':
      mainScreen = <InvestmentBasicsScreen />;
      break;
    case 'circle-chat':
      mainScreen = <CircleChatScreen />;
      break;
    case 'circle-contribute':
      mainScreen = <CircleContributeScreen />;
      break;
    case 'circle-add-members':
      mainScreen = <CircleAddMembersScreen />;
      break;
    case 'circle-settings':
      mainScreen = <CircleSettingsScreen />;
      break;
    case 'notifications':
      mainScreen = <NotificationsScreen />;
      break;
    case 'top-up':
      mainScreen = <TopUpScreen />;
      break;
    case 'withdraw':
      mainScreen = <WithdrawScreen />;
      break;
    case 'new-investment':
      mainScreen = <NewInvestmentScreen />;
      break;
    case 'crypto-invest':
      mainScreen = <CryptoInvestScreen />;
      break;
    case 'transaction-history':
      mainScreen = <TransactionHistoryScreen />;
      break;
    case 'settings':
      mainScreen = <SettingsScreen />;
      break;
    case 'profile-edit':
      mainScreen = <ProfileEditScreen />;
      break;
    case 'user-profile':
      mainScreen = <UserProfileScreen />;
      break;
    case 'activity-history':
      mainScreen = <ActivityHistoryScreen />;
      break;
    case 'activity-detail':
      mainScreen = <ActivityDetailScreen />;
      break;
    case 'my-investments':
      mainScreen = <MyInvestmentsScreen />;
      break;
    case 'investment-detail':
      mainScreen = <InvestmentDetailScreen />;
      break;
    case 'stocks':
      mainScreen = <StocksScreen />;
      break;
    case 'stock-detail':
      mainScreen = <StockDetailScreen />;
      break;
    case 'bonds':
      mainScreen = <BondsScreen />;
      break;
    case 'bond-detail':
      mainScreen = <BondDetailScreen />;
      break;
    case 'linked-bank-accounts':
      mainScreen = <LinkedBankAccountsScreen />;
      break;
    case 'change-password':
      mainScreen = <ChangePasswordScreen />;
      break;
    case 'help-center':
      mainScreen = <HelpCenterScreen />;
      break;
    case 'terms-conditions':
      mainScreen = <TermsAndConditionsScreen />;
      break;
    case 'privacy-policy':
      mainScreen = <PrivacyPolicyScreen />;
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
      <ActivityProvider>
        <CircleMessagesProvider>
          <div className="size-full bg-background">
            <AppContent />
            <Toaster />
          </div>
        </CircleMessagesProvider>
      </ActivityProvider>
    </AppProvider>
  );
}
