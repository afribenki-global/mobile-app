import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { useApp, Currency } from '../AppContext';
import { Check } from 'lucide-react';

export function CurrencySelection() {
  const { currency, setCurrency, setCurrentScreen } = useApp();

  const currencies: { code: Currency; name: string; country: string; symbol: string }[] = [
    { code: 'NGN', name: 'Nigerian Naira', country: 'Nigeria', symbol: '₦' },
    { code: 'GHS', name: 'Ghanaian Cedi', country: 'Ghana', symbol: '₵' },
    { code: 'KES', name: 'Kenyan Shilling', country: 'Kenya', symbol: 'KSh' },
    { code: 'XAF', name: 'Central African CFA', country: 'Cameroon, Chad, etc.', symbol: 'FCFA' },
    { code: 'USD', name: 'US Dollar', country: 'United States', symbol: '$' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-6 safe-area-inset-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="mb-2">Select Your Currency</h2>
          <p className="text-sm text-primary-foreground/80">
            Choose your preferred currency for transactions
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
          {currencies.map((curr, index) => (
            <motion.button
              key={curr.code}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setCurrency(curr.code)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                currency === curr.code
                  ? 'border-primary bg-secondary'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground">
                  <span className="text-xl">{curr.symbol}</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">{curr.name}</div>
                  <div className="text-sm text-muted-foreground">{curr.country}</div>
                </div>
              </div>
              {currency === curr.code && (
                <Check className="w-6 h-6 text-primary" />
              )}
            </motion.button>
          ))}
        </div>

        <Button
          onClick={() => setCurrentScreen('kyc')}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
