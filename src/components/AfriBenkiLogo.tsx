import { motion } from 'motion/react';

interface AfriBenkiLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function AfriBenkiLogo({ size = 'lg', animated = true }: AfriBenkiLogoProps) {
  const sizes = {
    sm: { container: 'w-16 h-16', text: 'text-xs', icon: 'w-6 h-6' },
    md: { container: 'w-24 h-24', text: 'text-sm', icon: 'w-10 h-10' },
    lg: { container: 'w-32 h-32', text: 'text-base', icon: 'w-14 h-14' },
  };

  const { container, text, icon } = sizes[size];

  const LogoContent = () => (
    <div className={`${container} relative mx-auto`}>
      {/* Outer circle - African pattern inspired */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-warning via-white to-accent opacity-20 blur-sm" />
      
      {/* Main container */}
      <div className="relative w-full h-full rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="africanPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="currentColor" className="text-primary" />
            </pattern>
            <rect width="100" height="100" fill="url(#africanPattern)" />
          </svg>
        </div>

        {/* Center Icon - Stylized A + upward arrow representing growth */}
        <div className={`relative ${icon} flex items-center justify-center`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Letter A with growth arrow integrated */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#001F3F" />
                <stop offset="50%" stopColor="#00A676" />
                <stop offset="100%" stopColor="#F4C430" />
              </linearGradient>
            </defs>
            
            {/* Main "A" shape */}
            <path
              d="M 50 20 L 70 80 L 60 80 L 55 65 L 45 65 L 40 80 L 30 80 L 50 20 Z M 47 55 L 53 55 L 50 35 Z"
              fill="url(#logoGradient)"
              className="drop-shadow-md"
            />
            
            {/* Upward arrow/growth indicator */}
            <path
              d="M 75 45 L 85 30 L 95 45 M 85 30 L 85 55"
              stroke="url(#logoGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="drop-shadow-md"
            />
            
            {/* Decorative dots - representing African unity/community */}
            <circle cx="15" cy="50" r="3" fill="#00A676" opacity="0.6" />
            <circle cx="20" cy="35" r="2.5" fill="#F4C430" opacity="0.6" />
            <circle cx="15" cy="65" r="2" fill="#001F3F" opacity="0.6" />
          </svg>
        </div>

        {/* Circular accent ring */}
        <div className="absolute inset-2 rounded-full border-2 border-gradient-to-br from-primary via-accent to-warning opacity-10" />
      </div>

      {/* Outer glow effect */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-accent to-warning opacity-20 blur-md -z-10" />
    </div>
  );

  if (!animated) {
    return <LogoContent />;
  }

  return (
    <motion.div
      initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
    >
      <LogoContent />
    </motion.div>
  );
}
