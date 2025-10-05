import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, Target, Calendar, CreditCard, Percent, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { toast } from 'sonner@2.0.3';

export function CreateSavingsPlan() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();
  const { addActivity } = useActivity();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goalName: '',
    targetAmount: '',
    duration: 12,
    frequency: 'monthly',
    autoSave: true,
    startDate: new Date().toISOString().split('T')[0],
  });

  const calculateMonthlyAmount = () => {
    const target = parseFloat(formData.targetAmount) || 0;
    return target / formData.duration;
  };

  const calculateInterest = () => {
    const target = parseFloat(formData.targetAmount) || 0;
    const rate = formData.duration >= 12 ? 0.15 : 0.10;
    return target * rate * (formData.duration / 12);
  };

  const handleSubmit = () => {
    const target = parseFloat(formData.targetAmount) || 0;
    
    // Add to activity feed
    addActivity({
      type: 'savings',
      title: formData.goalName,
      amount: target,
      description: language === 'fr' 
        ? `Nouveau plan d'épargne créé` 
        : `New savings plan created`,
      status: 'completed',
      icon: '🎯',
    });

    // Show success toast
    toast.success(language === 'fr' ? 'Plan créé!' : 'Plan Created!', {
      description: language === 'fr'
        ? `${formData.goalName} - Objectif: ${formatCurrency(target)}`
        : `${formData.goalName} - Target: ${formatCurrency(target)}`,
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });

    // Return to save screen
    setTimeout(() => {
      setCurrentScreen('save');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-4 safe-area-inset-top">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : setCurrentScreen('save')}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2>Create Savings Plan</h2>
            <p className="text-sm text-primary-foreground/80">Step {step} of 3</p>
          </div>
        </div>
        <div className="flex gap-1 mt-4 max-w-lg mx-auto">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                step >= s ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-lg mx-auto"
      >
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="goalName">What are you saving for?</Label>
              <div className="relative mt-2">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="goalName"
                  type="text"
                  placeholder="e.g., Emergency Fund, New Car, Vacation"
                  className="pl-10 h-12 rounded-xl"
                  value={formData.goalName}
                  onChange={(e) => setFormData({ ...formData, goalName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="targetAmount">Target Amount</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="100,000"
                  className="pl-8 h-12 rounded-xl"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Duration (months)</Label>
              <div className="mt-4 space-y-4">
                <Slider
                  value={[formData.duration]}
                  onValueChange={(value) => setFormData({ ...formData, duration: value[0] })}
                  min={3}
                  max={60}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">3 months</span>
                  <span className="font-medium text-primary">{formData.duration} months</span>
                  <span className="text-sm text-muted-foreground">5 years</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.goalName || !formData.targetAmount}
              className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="frequency">Contribution Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger className="mt-2 h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative mt-2">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  className="pl-10 h-12 rounded-xl"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>

            <Card className="p-5 bg-secondary">
              <div className="flex items-start gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="text-foreground mb-1">Auto-Save</h4>
                  <p className="text-sm text-muted-foreground">
                    We'll automatically deduct {formatCurrency(calculateMonthlyAmount())} from your linked account
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-xl">
                Link Bank Account
              </Button>
            </Card>

            <Button
              onClick={() => setStep(3)}
              className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="p-6 border-2 border-primary">
              <h3 className="text-foreground mb-4 text-center">Plan Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Goal</span>
                  <span className="font-medium text-foreground">{formData.goalName}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Target Amount</span>
                  <span className="font-medium text-foreground">{formatCurrency(parseFloat(formData.targetAmount))}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">{formData.duration} months</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{formData.frequency.charAt(0).toUpperCase() + formData.frequency.slice(1)} Contribution</span>
                  <span className="font-medium text-foreground">{formatCurrency(calculateMonthlyAmount())}</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Projected Interest</span>
                  <span className="font-medium text-success">{formatCurrency(calculateInterest())}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-success/5 border-success/20">
              <div className="flex items-start gap-3">
                <Percent className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-foreground mb-1">High Interest Rate</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll earn up to 15% annual interest on this savings plan - much higher than traditional savings accounts!
                  </p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleSubmit}
              className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
            >
              Create Savings Plan
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
