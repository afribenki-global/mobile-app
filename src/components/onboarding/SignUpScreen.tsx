import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp, COUNTRIES, CountryInfo } from '../AppContext';
import { ArrowLeft, Mail, Lock, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { apiCall } from '../../utils/supabase/client';

export function SignUpScreen() {
  const { setCurrentScreen, detectedCountry, setDetectedCountry, setUser, setIsOnboarded, t } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(detectedCountry);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (!agreedToTerms) {
      setError('Please agree to terms and conditions');
      return;
    }
    
    // Validate phone number is numeric
    if (!/^\d+$/.test(formData.phone)) {
      setError('Phone number should contain only digits');
      return;
    }
    
    setLoading(true);
    
    try {
      await apiCall('/signup', {
        method: 'POST',
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password,
          name: formData.fullName,
          email: formData.email,
          countryCode: selectedCountry?.phoneCode || '+234',
        }),
      });
      
      // After signup, automatically sign in
      const signInResponse = await apiCall('/signin', {
        method: 'POST',
        body: JSON.stringify({
          phone: `${selectedCountry?.phoneCode || '+234'}${formData.phone}`,
          password: formData.password,
        }),
      });
      
      // Store access token
      localStorage.setItem('accessToken', signInResponse.accessToken);
      
      // Set user in context
      setUser(signInResponse.user);
      setIsOnboarded(true);
      
      // Go straight to home dashboard
      setCurrentScreen('home');
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES[countryCode];
    setSelectedCountry(country);
    setDetectedCountry(country);
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
          <h2>Create Account</h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-lg mx-auto"
      >
        <div className="mb-6">
          <h3 className="text-foreground mb-2">Join AfriBenki</h3>
          <p className="text-muted-foreground">Start your wealth-building journey today</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="pl-10 h-12 rounded-xl"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-10 h-12 rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="mt-1">
              {selectedCountry && (
                <div className="mb-2 space-y-2">
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-foreground">
                      Detected in <strong>{selectedCountry.name}</strong> {selectedCountry.flag} – we'll use {selectedCountry.currency} and{' '}
                      {selectedCountry.broker ? `local brokers like ${selectedCountry.broker}` : 'local services'} for seamless investing.
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground px-1">
                    Enter your phone number without the country code (e.g., 8012345678)
                  </p>
                </div>
              )}
              
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
              
              {!selectedCountry && (
                <div className="mt-2 p-3 bg-warning/10 border border-warning/20 rounded-xl flex items-center gap-2 text-sm text-foreground">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span>Enable location for faster setup?</span>
                  <button
                    type="button"
                    onClick={() => setCurrentScreen('country-detection')}
                    className="ml-auto text-primary hover:underline"
                  >
                    Retry
                  </button>
                </div>
              )}
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

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-12 rounded-xl"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

        <div className="flex items-start gap-2">
  <Checkbox
    id="terms"
    checked={agreedToTerms}
    onCheckedChange={setAgreedToTerms}
    className="mt-1"
  />
  <label htmlFor="terms" className="text-sm text-muted-foreground">
    I agree to the Terms of Service and Privacy Policy. I understand this app is not for collecting PII or securing sensitive data beyond demo purposes.
  </label>
</div>


          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
            disabled={!agreedToTerms || loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              'Continue'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentScreen('signin')}
              className="text-primary hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
