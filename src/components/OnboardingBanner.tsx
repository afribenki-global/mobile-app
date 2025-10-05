import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from './AppContext';

export function OnboardingBanner() {
  const { user, setCurrentScreen } = useApp();
  
  // Only show if user exists and onboarding is not complete
  // Profile is considered complete if user has name, email, and phone
  const isProfileComplete = user && user.name && user.email && user.phone;
  
  if (!user || user.onboardingComplete === true || isProfileComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="bg-gradient-to-r from-warning/90 to-accent/90 text-white px-4 py-3 safe-area-inset-top"
      >
        <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 flex-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              Complete your profile to unlock all features
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCurrentScreen('profile-edit')}
            className="text-white hover:bg-white/20 flex items-center gap-1 flex-shrink-0"
          >
            Complete
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}