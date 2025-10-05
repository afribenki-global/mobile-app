import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, Target, TrendingUp, Calendar, Users, Baby } from 'lucide-react';
import { Progress } from '../ui/progress';

export function SaveScreen() {
  const { formatCurrency, setCurrentScreen } = useApp();

  const savingsPlans = [
    {
      id: 1,
      name: 'Emergency Fund',
      icon: Target,
      color: 'bg-destructive',
      current: 75000,
      target: 200000,
      interest: 12.5,
      endDate: '2025-12-31',
    },
    {
      id: 2,
      name: 'Vacation to Dubai',
      icon: Calendar,
      color: 'bg-primary',
      current: 45000,
      target: 150000,
      interest: 10.0,
      endDate: '2025-06-30',
    },
    {
      id: 3,
      name: 'New Car',
      icon: TrendingUp,
      color: 'bg-accent',
      current: 120000,
      target: 500000,
      interest: 15.0,
      endDate: '2026-03-31',
    },
  ];

  const otherOptions = [
    { id: 'circles', name: 'Circles', desc: 'Save with friends & family', icon: Users, color: 'bg-purple-500' },
    { id: 'nest', name: 'Nest', desc: 'Save for your children', icon: Baby, color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Good Morning" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground">Savings Plans</h2>
            <p className="text-sm text-muted-foreground">Total saved: {formatCurrency(240000)}</p>
          </div>
          <Button
            onClick={() => setCurrentScreen('create-savings-plan')}
            className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12 p-0"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Active Plans */}
        <div className="space-y-3">
          {savingsPlans.map((plan, index) => {
            const Icon = plan.icon;
            const progress = (plan.current / plan.target) * 100;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-5 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setCurrentScreen('savings-plan-detail')}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`${plan.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{plan.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{plan.interest}% p.a.</span>
                        <span>•</span>
                        <span>Ends {new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Saved</div>
                      <div className="font-medium text-foreground">{formatCurrency(plan.current)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{progress.toFixed(0)}% complete</span>
                      <span className="text-muted-foreground">Target: {formatCurrency(plan.target)}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Other Savings Options */}
        <div>
          <h3 className="text-foreground mb-3 px-1">Other Options</h3>
          <div className="grid grid-cols-2 gap-3">
            {otherOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setCurrentScreen(option.id)}
                  >
                    <div className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-foreground mb-1">{option.name}</h4>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <Card className="p-5 bg-secondary border-primary/20">
          <h4 className="text-foreground mb-2">💡 Why Save with AfriBenki?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Earn up to 15% interest annually - higher than traditional banks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Automated savings with flexible withdrawal options</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Your funds are insured and regulated</span>
            </li>
          </ul>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
