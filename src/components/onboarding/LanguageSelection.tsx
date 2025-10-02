import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { useApp, Language } from '../AppContext';
import { Check } from 'lucide-react';

export function LanguageSelection() {
  const { language, setLanguage, setCurrentScreen } = useApp();

  const languages: { code: Language; name: string; native: string; flag: string }[] = [
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
    { code: 'pid', name: 'Pidgin', native: 'Naija Pidgin', flag: '🇳🇬' },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-6 safe-area-inset-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="mb-2">Choose Your Language</h2>
          <p className="text-sm text-primary-foreground/80">
            Select your preferred language for the app
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6 max-w-lg mx-auto"
      >
        <div className="space-y-3 mb-6">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setLanguage(lang.code)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                language === lang.code
                  ? 'border-primary bg-secondary'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <div className="font-medium text-foreground">{lang.name}</div>
                  <div className="text-sm text-muted-foreground">{lang.native}</div>
                </div>
              </div>
              {language === lang.code && (
                <Check className="w-6 h-6 text-primary" />
              )}
            </motion.button>
          ))}
        </div>

        <Button
          onClick={() => setCurrentScreen('currency-selection')}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
