import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Calculator, TrendingUp, PiggyBank, Home } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

export function CalculatorsScreen() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();
  const [activeCalculator, setActiveCalculator] = useState<string>('savings');

  // Savings Calculator State
  const [savingsData, setSavingsData] = useState({
    monthlyAmount: 50000,
    duration: 12,
    interestRate: 12,
  });

  // Investment Calculator State
  const [investmentData, setInvestmentData] = useState({
    initialAmount: 100000,
    monthlyContribution: 20000,
    years: 5,
    returnRate: 20,
  });

  // Retirement Calculator State
  const [retirementData, setRetirementData] = useState({
    currentAge: 30,
    retirementAge: 60,
    monthlyExpenses: 200000,
    currentSavings: 500000,
  });

  const calculators = [
    { id: 'savings', name: t('savingsPlans'), icon: PiggyBank },
    { id: 'investment', name: language === 'fr' ? 'Rendements d\'investissement' : 'Investment Returns', icon: TrendingUp },
    { id: 'retirement', name: language === 'fr' ? 'Planification de la retraite' : 'Retirement Planning', icon: Home },
  ];

  // Calculate Savings Goal
  const calculateSavings = () => {
    const monthly = savingsData.monthlyAmount;
    const months = savingsData.duration;
    const rate = savingsData.interestRate / 100 / 12;
    
    const futureValue = monthly * (((1 + rate) ** months - 1) / rate);
    const totalContributed = monthly * months;
    const interest = futureValue - totalContributed;
    
    return { futureValue, totalContributed, interest };
  };

  // Calculate Investment Returns
  const calculateInvestment = () => {
    const initial = investmentData.initialAmount;
    const monthly = investmentData.monthlyContribution;
    const years = investmentData.years;
    const rate = investmentData.returnRate / 100;
    
    const months = years * 12;
    const monthlyRate = rate / 12;
    
    // Future value of initial investment
    const fvInitial = initial * (1 + rate) ** years;
    
    // Future value of monthly contributions
    const fvMonthly = monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate);
    
    const totalValue = fvInitial + fvMonthly;
    const totalContributed = initial + (monthly * months);
    const returns = totalValue - totalContributed;
    
    return { totalValue, totalContributed, returns };
  };

  // Calculate Retirement Needs
  const calculateRetirement = () => {
    const yearsToRetirement = retirementData.retirementAge - retirementData.currentAge;
    const monthlyExpenses = retirementData.monthlyExpenses;
    const yearsInRetirement = 25; // Assume 25 years in retirement
    
    const totalNeeded = monthlyExpenses * 12 * yearsInRetirement;
    const currentSavings = retirementData.currentSavings;
    const gap = totalNeeded - currentSavings;
    const monthlyRequired = gap / (yearsToRetirement * 12);
    
    return { totalNeeded, gap, monthlyRequired, yearsToRetirement };
  };

  const savingsResult = calculateSavings();
  const investmentResult = calculateInvestment();
  const retirementResult = calculateRetirement();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('explore')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{t('calculators')}</h2>
        <p className="text-white/80 text-sm">Plan your financial future</p>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        {/* Calculator Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  activeCalculator === calc.id
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {calc.name}
              </button>
            );
          })}
        </div>

        {/* Savings Calculator */}
        {activeCalculator === 'savings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-4">
              <h3 className="text-foreground mb-4">Savings Goal Calculator</h3>
              
              <div>
                <Label>Monthly Savings Amount</Label>
                <div className="mt-2">
                  <Input
                    type="number"
                    value={savingsData.monthlyAmount}
                    onChange={(e) => setSavingsData({ ...savingsData, monthlyAmount: Number(e.target.value) })}
                    className="mb-2"
                  />
                  <Slider
                    value={[savingsData.monthlyAmount]}
                    onValueChange={([value]) => setSavingsData({ ...savingsData, monthlyAmount: value })}
                    max={500000}
                    step={5000}
                  />
                </div>
              </div>

              <div>
                <Label>Duration (Months)</Label>
                <div className="mt-2">
                  <Input
                    type="number"
                    value={savingsData.duration}
                    onChange={(e) => setSavingsData({ ...savingsData, duration: Number(e.target.value) })}
                    className="mb-2"
                  />
                  <Slider
                    value={[savingsData.duration]}
                    onValueChange={([value]) => setSavingsData({ ...savingsData, duration: value })}
                    max={60}
                    step={1}
                  />
                </div>
              </div>

              <div>
                <Label>Annual Interest Rate (%)</Label>
                <div className="mt-2">
                  <Input
                    type="number"
                    value={savingsData.interestRate}
                    onChange={(e) => setSavingsData({ ...savingsData, interestRate: Number(e.target.value) })}
                    className="mb-2"
                  />
                  <Slider
                    value={[savingsData.interestRate]}
                    onValueChange={([value]) => setSavingsData({ ...savingsData, interestRate: value })}
                    max={25}
                    step={0.5}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
              <h4 className="text-foreground mb-4">Results</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Contributions:</span>
                  <span className="text-foreground">{formatCurrency(savingsResult.totalContributed)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Interest Earned:</span>
                  <span className="text-success">{formatCurrency(savingsResult.interest)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-foreground">Final Amount:</span>
                  <span className="text-2xl text-primary">{formatCurrency(savingsResult.futureValue)}</span>
                </div>
              </div>
            </Card>

            <Button className="w-full h-12 bg-accent hover:bg-accent/90">
              Start This Savings Plan
            </Button>
          </motion.div>
        )}

        {/* Investment Calculator */}
        {activeCalculator === 'investment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-4">
              <h3 className="text-foreground mb-4">Investment Returns Calculator</h3>
              
              <div>
                <Label>Initial Investment</Label>
                <Input
                  type="number"
                  value={investmentData.initialAmount}
                  onChange={(e) => setInvestmentData({ ...investmentData, initialAmount: Number(e.target.value) })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Monthly Contribution</Label>
                <Input
                  type="number"
                  value={investmentData.monthlyContribution}
                  onChange={(e) => setInvestmentData({ ...investmentData, monthlyContribution: Number(e.target.value) })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Investment Period (Years)</Label>
                <Slider
                  value={[investmentData.years]}
                  onValueChange={([value]) => setInvestmentData({ ...investmentData, years: value })}
                  max={30}
                  step={1}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">{investmentData.years} years</p>
              </div>

              <div>
                <Label>Expected Annual Return (%)</Label>
                <Slider
                  value={[investmentData.returnRate]}
                  onValueChange={([value]) => setInvestmentData({ ...investmentData, returnRate: value })}
                  max={30}
                  step={1}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">{investmentData.returnRate}%</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-success/10 to-accent/10">
              <h4 className="text-foreground mb-4">Investment Projection</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Invested:</span>
                  <span className="text-foreground">{formatCurrency(investmentResult.totalContributed)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Returns:</span>
                  <span className="text-success">{formatCurrency(investmentResult.returns)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-foreground">Final Portfolio Value:</span>
                  <span className="text-2xl text-primary">{formatCurrency(investmentResult.totalValue)}</span>
                </div>
              </div>
            </Card>

            <Button className="w-full h-12 bg-primary hover:bg-primary/90">
              Start Investing Now
            </Button>
          </motion.div>
        )}

        {/* Retirement Calculator */}
        {activeCalculator === 'retirement' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-4">
              <h3 className="text-foreground mb-4">Retirement Planning Calculator</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Current Age</Label>
                  <Input
                    type="number"
                    value={retirementData.currentAge}
                    onChange={(e) => setRetirementData({ ...retirementData, currentAge: Number(e.target.value) })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Retirement Age</Label>
                  <Input
                    type="number"
                    value={retirementData.retirementAge}
                    onChange={(e) => setRetirementData({ ...retirementData, retirementAge: Number(e.target.value) })}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Expected Monthly Expenses in Retirement</Label>
                <Input
                  type="number"
                  value={retirementData.monthlyExpenses}
                  onChange={(e) => setRetirementData({ ...retirementData, monthlyExpenses: Number(e.target.value) })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Current Retirement Savings</Label>
                <Input
                  type="number"
                  value={retirementData.currentSavings}
                  onChange={(e) => setRetirementData({ ...retirementData, currentSavings: Number(e.target.value) })}
                  className="mt-2"
                />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-warning/10 to-primary/10">
              <h4 className="text-foreground mb-4">Retirement Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Years to Retirement:</span>
                  <span className="text-foreground">{retirementResult.yearsToRetirement} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount Needed:</span>
                  <span className="text-foreground">{formatCurrency(retirementResult.totalNeeded)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Savings Gap:</span>
                  <span className="text-warning">{formatCurrency(retirementResult.gap)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-foreground">Required Monthly Savings:</span>
                  <span className="text-2xl text-primary">{formatCurrency(retirementResult.monthlyRequired)}</span>
                </div>
              </div>
            </Card>

            <Button className="w-full h-12 bg-accent hover:bg-accent/90">
              Create Retirement Plan
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
