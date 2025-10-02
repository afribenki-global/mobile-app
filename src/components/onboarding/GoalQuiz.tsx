import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { useApp } from '../AppContext';
import { Check, Target, Home, GraduationCap, Car, Plane, Users } from 'lucide-react';

export function GoalQuiz() {
  const { setCurrentScreen, setIsOnboarded, setUser } = useApp();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [riskTolerance, setRiskTolerance] = useState('');

  const goals = [
    { id: 'emergency', name: 'Emergency Fund', icon: Target },
    { id: 'home', name: 'Buy a Home', icon: Home },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'car', name: 'Buy a Car', icon: Car },
    { id: 'vacation', name: 'Dream Vacation', icon: Plane },
    { id: 'retirement', name: 'Retirement', icon: Users },
  ];

  const riskLevels = [
    { id: 'low', name: 'Conservative', desc: 'I prefer safety over high returns' },
    { id: 'medium', name: 'Moderate', desc: 'I want balance between risk and reward' },
    { id: 'high', name: 'Aggressive', desc: 'I can handle risk for higher returns' },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleComplete = () => {
    setUser({
      name: 'John Adebayo',
      email: 'john@example.com',
      balance: 125000,
      portfolioValue: 450000,
    });
    setIsOnboarded(true);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-6 safe-area-inset-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="mb-2">Set Your Goals</h2>
          <p className="text-sm text-primary-foreground/80">
            Tell us what you're saving for
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-lg mx-auto pb-24"
      >
        <div className="mb-8">
          <h4 className="text-foreground mb-4">What are your financial goals?</h4>
          <div className="grid grid-cols-2 gap-3">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              const isSelected = selectedGoals.includes(goal.id);
              return (
                <motion.button
                  key={goal.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-secondary'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <span className="text-sm text-center">{goal.name}</span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary absolute top-2 right-2" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-foreground mb-4">What's your risk tolerance?</h4>
          <div className="space-y-3">
            {riskLevels.map((level, index) => (
              <motion.button
                key={level.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => setRiskTolerance(level.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  riskTolerance === level.id
                    ? 'border-primary bg-secondary'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground mb-1">{level.name}</div>
                    <div className="text-sm text-muted-foreground">{level.desc}</div>
                  </div>
                  {riskTolerance === level.id && (
                    <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleComplete}
          disabled={selectedGoals.length === 0 || !riskTolerance}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
}
