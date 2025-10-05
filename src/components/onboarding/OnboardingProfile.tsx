import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { useApp } from '../AppContext';
import { ArrowLeft, Upload, User, CheckCircle2 } from 'lucide-react';
import { apiCallWithAuth } from '../../utils/supabase/client';

export function OnboardingProfile() {
  const { setCurrentScreen, user, setUser } = useApp();
  const [profilePicture, setProfilePicture] = useState<string | null>(user?.profilePicture || null);
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    investmentExperience: '',
    riskTolerance: '',
    financialGoal: '',
    monthlyIncome: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = async () => {
    try {
      // Get access token from localStorage or context
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }

      // Update user profile with onboarding completion
      await apiCallWithAuth('/profile', accessToken, {
        method: 'PUT',
        body: JSON.stringify({
          profilePicture,
          onboardingComplete: true,
          investmentProfile: answers,
        }),
      });

      // Update local user state
      if (user) {
        setUser({
          ...user,
          profilePicture,
          onboardingComplete: true,
        });
      }

      setCurrentScreen('home');
    } catch (error) {
      // Silently handle error
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('home')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">Complete Your Profile</h2>
        <p className="text-white/80 text-sm">Help us personalize your experience</p>
        
        {/* Progress */}
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${
                s <= step ? 'bg-warning' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-foreground mb-4">Profile Picture</h3>
              
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-muted-foreground" />
                    )}
                  </div>
                  
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/90 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <p className="text-sm text-muted-foreground text-center">
                  Upload a photo to personalize your account
                </p>
              </div>
            </Card>

            <Button
              onClick={() => setStep(2)}
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
            
            <Button
              onClick={() => setCurrentScreen('home')}
              variant="ghost"
              className="w-full"
            >
              Skip for now
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-4">
              <h3 className="text-foreground mb-4">Investment Experience</h3>
              
              <div>
                <Label>How much experience do you have with investing?</Label>
                <div className="mt-2 space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setAnswers({ ...answers, investmentExperience: level })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                        answers.investmentExperience === level
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{level}</span>
                        {answers.investmentExperience === level && (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>What's your risk tolerance?</Label>
                <div className="mt-2 space-y-2">
                  {['Conservative', 'Moderate', 'Aggressive'].map((risk) => (
                    <button
                      key={risk}
                      onClick={() => setAnswers({ ...answers, riskTolerance: risk })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                        answers.riskTolerance === risk
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{risk}</span>
                        {answers.riskTolerance === risk && (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!answers.investmentExperience || !answers.riskTolerance}
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-4">
              <h3 className="text-foreground mb-4">Financial Goals</h3>
              
              <div>
                <Label>What's your primary financial goal?</Label>
                <div className="mt-2 space-y-2">
                  {[
                    'Build Emergency Fund',
                    'Save for Retirement',
                    'Buy Property',
                    'Generate Passive Income',
                    'Wealth Building'
                  ].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setAnswers({ ...answers, financialGoal: goal })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                        answers.financialGoal === goal
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{goal}</span>
                        {answers.financialGoal === goal && (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Approximate monthly income range</Label>
                <div className="mt-2 space-y-2">
                  {[
                    'Below ₦100,000',
                    '₦100,000 - ₦500,000',
                    '₦500,000 - ₦1,000,000',
                    'Above ₦1,000,000'
                  ].map((income) => (
                    <button
                      key={income}
                      onClick={() => setAnswers({ ...answers, monthlyIncome: income })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                        answers.monthlyIncome === income
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{income}</span>
                        {answers.monthlyIncome === income && (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!answers.financialGoal || !answers.monthlyIncome}
                className="flex-1 h-12 bg-accent hover:bg-accent/90"
              >
                Complete
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}