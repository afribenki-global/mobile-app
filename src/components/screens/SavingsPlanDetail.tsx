import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Target, Plus } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

export function SavingsPlanDetail() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();
  const { addActivity } = useActivity();

  // Mock plan data - in real app, this would come from props or context
  const plan = {
    id: 1,
    name: 'Emergency Fund',
    icon: '🎯',
    color: 'bg-destructive',
    current: 75000,
    target: 200000,
    interest: 12.5,
    endDate: '2025-12-31',
    monthlyContribution: 20000,
    frequency: 'Monthly',
    createdDate: '2024-06-15',
  };

  const progress = (plan.current / plan.target) * 100;
  const remaining = plan.target - plan.current;
  const monthsLeft = Math.ceil(remaining / plan.monthlyContribution);

  const transactions = [
    { id: '1', date: '2025-01-15', amount: 20000, type: 'deposit' },
    { id: '2', date: '2024-12-15', amount: 20000, type: 'deposit' },
    { id: '3', date: '2024-11-15', amount: 15000, type: 'deposit' },
    { id: '4', date: '2024-10-15', amount: 20000, type: 'deposit' },
  ];

  const handleAddFunds = () => {
    const amount = 20000;
    addActivity({
      type: 'savings',
      title: plan.name,
      amount: amount,
      description: language === 'fr' ? 'Contribution mensuelle ajoutée' : 'Monthly contribution added',
      status: 'completed',
      icon: plan.icon,
    });

    toast.success(t('success'), {
      description: language === 'fr' 
        ? `${formatCurrency(amount)} ajouté à ${plan.name}`
        : `${formatCurrency(amount)} added to ${plan.name}`,
    });

    // Simulate updating plan
    setTimeout(() => {
      setCurrentScreen('save');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('save')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{plan.icon}</div>
          <div>
            <h2 className="text-white text-2xl">{plan.name}</h2>
            <p className="text-white/80 text-sm">{plan.frequency} {language === 'fr' ? 'épargne' : 'savings'}</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-white/80 text-sm">{t('progress')}</span>
            <span className="text-white">{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-3 bg-white/20" />
          <div className="flex justify-between text-sm">
            <span className="text-white">{formatCurrency(plan.current)}</span>
            <span className="text-white/80">{language === 'fr' ? 'de' : 'of'} {formatCurrency(plan.target)}</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'Mois restants' : 'Months Left'}
              </span>
            </div>
            <p className="text-xl text-foreground">{monthsLeft}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'Restant' : 'Remaining'}
              </span>
            </div>
            <p className="text-xl text-foreground">{formatCurrency(remaining)}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'Intérêt' : 'Interest'}
              </span>
            </div>
            <p className="text-xl text-foreground">{plan.interest}%</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'Date cible' : 'Target Date'}
              </span>
            </div>
            <p className="text-sm text-foreground">{new Date(plan.endDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</p>
          </Card>
        </div>

        {/* Add Funds Button */}
        <Button
          onClick={handleAddFunds}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          {language === 'fr' ? 'Ajouter des fonds' : 'Add Funds'} ({formatCurrency(plan.monthlyContribution)})
        </Button>

        {/* Transaction History */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{t('recentTransactions')}</h3>
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-foreground">{language === 'fr' ? 'Dépôt' : 'Deposit'}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(txn.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-success">+{formatCurrency(txn.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Plan Info */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Détails du plan' : 'Plan Details'}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Contribution mensuelle' : 'Monthly Contribution'}</span>
              <span className="text-foreground">{formatCurrency(plan.monthlyContribution)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Taux d\'intérêt annuel' : 'Annual Interest Rate'}</span>
              <span className="text-foreground">{plan.interest}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Date de création' : 'Created On'}</span>
              <span className="text-foreground">
                {new Date(plan.createdDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Intérêt prévu' : 'Projected Interest'}</span>
              <span className="text-success">
                {formatCurrency((plan.target * plan.interest / 100) * (monthsLeft / 12))}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
