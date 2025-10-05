import { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { useApp, COUNTRIES } from '../AppContext';
import { AfricanPattern } from '../AfricanPattern';

export function CountryDetection() {
  const { setDetectedCountry, setLanguage, setCurrency, setCurrentScreen } = useApp();

  useEffect(() => {
    // Simulate geolocation detection (in production, use navigator.geolocation or IP-based API)
    const detectCountry = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate detection - randomly pick a country (in production, use actual geolocation)
      const countryKeys = Object.keys(COUNTRIES);
      const randomCountry = COUNTRIES[countryKeys[Math.floor(Math.random() * countryKeys.length)]];
      
      setDetectedCountry(randomCountry);
      setLanguage(randomCountry.language);
      setCurrency(randomCountry.currency);
      
      // Move to signup screen
      setTimeout(() => {
        setCurrentScreen('signup');
      }, 1000);
    };

    detectCountry();
  }, [setDetectedCountry, setLanguage, setCurrency, setCurrentScreen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-accent flex flex-col items-center justify-center relative overflow-hidden">
      <AfricanPattern />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6 relative z-10"
      >
        <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <MapPin className="w-12 h-12 text-white" />
          <motion.div
            className="absolute inset-0 border-4 border-white/30 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <h2 className="text-white mb-3">Detecting Your Location</h2>
        <p className="text-white/80 mb-6">
          We're finding the best services for your region...
        </p>
        
        <motion.div
          className="flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}