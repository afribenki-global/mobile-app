import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { useApp } from '../AppContext';
import { TrendingUp, Shield, Globe, Users } from 'lucide-react';
import { AfricanPattern } from '../AfricanPattern';
import { AfriBenkiLogo } from '../AfriBenkiLogo';

export function WelcomeScreen() {
  const { setCurrentScreen, t } = useApp();

  const features = [
    { icon: TrendingUp, title: 'Smart Investing', desc: 'Grow your wealth with mutual funds, stocks & bonds' },
    { icon: Shield, title: 'Secure & Licensed', desc: 'Your money is safe with bank-level encryption' },
    { icon: Globe, title: 'Pan-African', desc: 'Multi-currency support across Africa' },
    { icon: Users, title: 'Community Savings', desc: 'Save together with Circles' },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-primary via-primary to-accent flex flex-col relative overflow-hidden">
      <AfricanPattern />
      
      {/* Logo and Title Section - Reduced spacing */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-16 pb-6 px-6 relative z-10"
      >
        <div className="mx-auto mb-3">
          <AfriBenkiLogo size="lg" animated />
        </div>
        <h1 className="text-white text-2xl mb-2">AfriBenki</h1>
        <p className="text-white/90">{t('welcomeDesc')}</p>
      </motion.div>

      {/* Features Grid - Compact */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 px-6 py-4 relative z-10 flex items-center"
      >
        <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-white text-sm">{feature.title}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="p-6 space-y-3 relative z-10 safe-area-inset-bottom"
      >
        <Button
          onClick={() => setCurrentScreen('country-detection')}
          className="w-full h-12 bg-white text-primary hover:bg-white/90 rounded-xl font-medium"
        >
          <span className="text-primary">{t('getStarted')}</span>
        </Button>
        <Button
          onClick={() => setCurrentScreen('signin')}
          className="w-full h-12 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60 rounded-xl font-medium shadow-lg transition-all"
        >
          <span className="text-white drop-shadow-md">{t('signIn')}</span>
        </Button>
      </motion.div>
    </div>
  );
}
