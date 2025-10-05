import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, TrendingUp } from 'lucide-react';
import { AfricanPattern } from './AfricanPattern';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast loading for better UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 20; // Faster progression
      });
    }, 100); // Faster updates

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center relative overflow-hidden">
      <AfricanPattern />
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6 relative z-10"
      >
        {/* Logo */}
        <motion.div
          className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 relative"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Wallet className="w-12 h-12 text-white" />
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <TrendingUp className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>
        
        <motion.h1
          className="text-4xl text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AfriBenki
        </motion.h1>
        
        <motion.p
          className="text-white/80 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Save smarter, invest better
        </motion.p>
        
        {/* Loading bar */}
        <motion.div
          className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-warning"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 bg-warning/20 rounded-full"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}