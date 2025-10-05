import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp, COUNTRIES, CountryInfo } from '../AppContext';
import { ArrowLeft, Phone, Lock, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { apiCall } from '../../utils/supabase/client';

export function SignInScreen() {
  const { setCurrentScreen, detectedCountry, setUser, setIsOnboarded, t } = useApp();
  const [formData, setFormData] = useState({
    phone: '000006',
    password: '321654',
  });
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(detectedCountry || COUNTRIES.NG);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Handle special case for demo user (000006)
      let phoneNumber = formData.phone;
      if (phoneNumber !== '000006') {
        phoneNumber = `${selectedCountry?.phoneCode || '+234'}${formData.phone}`;
      }
      
      const signInResponse = await apiCall('/signin', {
        method: 'POST',
        body: JSON.stringify({
          phone: phoneNumber,
          password: formData.password,
        }),
      });
      
      // Store access token
      localStorage.setItem('accessToken', signInResponse.accessToken);
      
      // Set user in context
      setUser(signInResponse.user);
      setIsOnboarded(true);
      
      // Go to home dashboard
      setCurrentScreen('home');
    } catch (err: any) {
      setError(err.message || 'Sign in failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES[countryCode];
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-4 safe-area-inset-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2>Sign In</h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-lg mx-auto"
      >
        <div className="mb-6">
          <h3 className="text-foreground mb-2">Welcome Back</h3>
          <p className="text-muted-foreground">Sign in to continue managing your finances</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Demo Account Info */}
        <div className="mb-6 p-4 bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white">✨</span>
            </div>
            <p className="text-sm text-foreground">
              <strong>Try Demo Account</strong>
            </p>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Phone: <strong>000006</strong> | Password: <strong>321654</strong>
          </p>
          <Button
            type="button"
            onClick={() => {
              setFormData({ phone: '000006', password: '321654' });
            }}
            variant="outline"
            className="w-full h-10 text-xs border-accent/50 hover:bg-accent/10"
          >
            Quick Fill Demo Credentials
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="mt-1">
              <div className="flex gap-2">
                <Select 
                  value={selectedCountry?.code} 
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger className="w-32 h-12 rounded-xl">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span>{selectedCountry?.flag || '🌍'}</span>
                        <span>{selectedCountry?.phoneCode || '+000'}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(COUNTRIES).map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                          <span className="text-muted-foreground text-xs">({country.phoneCode})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="relative flex-1">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="800 000 0000"
                    className="h-12 rounded-xl"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-12 rounded-xl"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentScreen('country-detection')}
              className="text-primary hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}