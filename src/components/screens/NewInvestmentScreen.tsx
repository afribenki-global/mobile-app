import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, TrendingUp, Shield, Building, Bitcoin, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

export function NewInvestmentScreen() {
  const { setCurrentScreen, formatCurrency, user, setUser, language } = useApp();
  const { addActivity } = useActivity();
  const [step, setStep] = useState<'type' | 'fund' | 'amount' | 'confirm' | 'success'>('type');
  const [investmentType, setInvestmentType] = useState<'fiat' | 'crypto'>('fiat');
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [amount, setAmount] = useState('');

  const fiatFunds = [
    { id: 1, name: 'Money Market Fund', returns: 12.5, risk: 'Low', minInvestment: 5000, icon: Shield, color: 'bg-primary' },
    { id: 2, name: 'Equity Growth Fund', returns: 24.3, risk: 'High', minInvestment: 10000, icon: TrendingUp, color: 'bg-accent' },
    { id: 3, name: 'Fixed Income Fund', returns: 15.8, risk: 'Medium', minInvestment: 10000, icon: Building, color: 'bg-purple-500' },
  ];

  const cryptoAssets = [
    { id: 1, name: 'Bitcoin (BTC)', returns: 45.2, risk: 'High', minInvestment: 5000, icon: Bitcoin, color: 'bg-orange-500' },
    { id: 2, name: 'Ethereum (ETH)', returns: 38.5, risk: 'High', minInvestment: 5000, icon: Bitcoin, color: 'bg-blue-500' },
    { id: 3, name: 'Crypto Index Fund', returns: 35.0, risk: 'Medium', minInvestment: 10000, icon: Bitcoin, color: 'bg-purple-500' },
  ];

  const funds = investmentType === 'fiat' ? fiatFunds : cryptoAssets;

  const handleTypeSelect = (type: 'fiat' | 'crypto') => {
    setInvestmentType(type);
    setStep('fund');
  };

  const handleFundSelect = (fund: any) => {
    setSelectedFund(fund);
    setStep('amount');
  };

  const handleAmountContinue = () => {
    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0) {
      toast.error(language === 'fr' ? 'Veuillez entrer un montant valide' : 'Please enter a valid amount');
      return;
    }
    if (selectedFund && numAmount < selectedFund.minInvestment) {
      toast.error(
        language === 'fr' 
          ? `Montant minimum: ${formatCurrency(selectedFund.minInvestment)}`
          : `Minimum amount: ${formatCurrency(selectedFund.minInvestment)}`
      );
      return;
    }
    if (numAmount > (user?.balance || 0)) {
      toast.error(language === 'fr' ? 'Solde insuffisant' : 'Insufficient balance');
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    
    // Update user balance
    if (user) {
      setUser({
        ...user,
        balance: (user.balance || 0) - numAmount,
        portfolioValue: (user.portfolioValue || 0) + numAmount,
      });
    }

    // Add activity
    addActivity({
      type: 'investment',
      title: language === 'fr' ? 'Nouvel investissement' : 'New Investment',
      description: `${selectedFund.name} - ${formatCurrency(numAmount)}`,
      amount: numAmount,
      icon: '📈',
    });

    setStep('success');
    
    setTimeout(() => {
      toast.success(language === 'fr' ? 'Investissement effectué avec succès!' : 'Investment successful!');
      setCurrentScreen('invest');
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-foreground mb-2">{language === 'fr' ? 'Investissement réussi!' : 'Investment Successful!'}</h2>
          <p className="text-muted-foreground mb-4">{selectedFund?.name}</p>
          <p className="text-2xl text-success mb-2">{formatCurrency(parseFloat(amount))}</p>
          <p className="text-sm text-muted-foreground">
            {language === 'fr' ? 'Rendement attendu:' : 'Expected returns:'} {selectedFund?.returns}% p.a.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-gradient-to-r from-primary to-accent text-white p-4 safe-area-inset-top">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => {
              if (step === 'type') setCurrentScreen('invest');
              else if (step === 'fund') setStep('type');
              else if (step === 'amount') setStep('fund');
              else if (step === 'confirm') setStep('amount');
            }}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-white">{language === 'fr' ? 'Nouvel investissement' : 'New Investment'}</h2>
            <p className="text-white/80 text-sm">
              {step === 'type' && (language === 'fr' ? 'Choisir le type' : 'Choose type')}
              {step === 'fund' && (language === 'fr' ? 'Sélectionner le fonds' : 'Select fund')}
              {step === 'amount' && (language === 'fr' ? 'Entrez le montant' : 'Enter amount')}
              {step === 'confirm' && (language === 'fr' ? 'Confirmez' : 'Confirm')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-4">
        {step === 'type' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-foreground mb-3 px-1">{language === 'fr' ? 'Type d\'investissement' : 'Investment Type'}</h3>
            
            <Card
              onClick={() => handleTypeSelect('fiat')}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-border hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-1">{language === 'fr' ? 'Investissements Fiat' : 'Fiat Investments'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fr' 
                      ? 'Fonds communs, actions, obligations'
                      : 'Mutual funds, stocks, bonds'}
                  </p>
                </div>
              </div>
            </Card>

            <Card
              onClick={() => handleTypeSelect('crypto')}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-border hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bitcoin className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-1">{language === 'fr' ? 'Investissements Crypto' : 'Crypto Investments'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fr' 
                      ? 'Bitcoin, Ethereum, et plus'
                      : 'Bitcoin, Ethereum, and more'}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'fund' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-foreground mb-3 px-1">
              {investmentType === 'fiat' 
                ? (language === 'fr' ? 'Sélectionner un fonds' : 'Select a Fund')
                : (language === 'fr' ? 'Sélectionner une crypto' : 'Select a Crypto')}
            </h3>
            
            {funds.map((fund) => {
              const Icon = fund.icon;
              return (
                <Card
                  key={fund.id}
                  onClick={() => handleFundSelect(fund)}
                  className="p-5 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${fund.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{fund.name}</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-success">+{fund.returns}% p.a.</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{fund.risk} {language === 'fr' ? 'risque' : 'risk'}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        )}

        {step === 'amount' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <div className="mb-4">
                <h4 className="text-foreground mb-2">{selectedFund?.name}</h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">+{selectedFund?.returns}% p.a.</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{selectedFund?.risk} {language === 'fr' ? 'risque' : 'risk'}</span>
                </div>
              </div>

              <Label htmlFor="amount" className="text-foreground mb-2 block">
                {language === 'fr' ? 'Montant de l\'investissement' : 'Investment Amount'}
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={language === 'fr' ? 'Entrez le montant' : 'Enter amount'}
                className="h-14 text-xl"
              />
              
              <p className="text-sm text-muted-foreground mt-2">
                {language === 'fr' ? 'Minimum:' : 'Minimum:'} {formatCurrency(selectedFund?.minInvestment || 0)}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Solde disponible:' : 'Available balance:'} {formatCurrency(user?.balance || 0)}
              </p>
            </Card>

            <Button
              onClick={handleAmountContinue}
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              {language === 'fr' ? 'Continuer' : 'Continue'}
            </Button>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <h3 className="text-foreground mb-4">{language === 'fr' ? 'Résumé de l\'investissement' : 'Investment Summary'}</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Fonds' : 'Fund'}</span>
                  <span className="font-medium text-foreground">{selectedFund?.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Type' : 'Type'}</span>
                  <span className="font-medium text-foreground">
                    {investmentType === 'fiat' ? 'Fiat' : 'Crypto'}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Montant' : 'Amount'}</span>
                  <span className="font-medium text-foreground">{formatCurrency(parseFloat(amount))}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Rendement attendu' : 'Expected Returns'}</span>
                  <span className="font-medium text-success">+{selectedFund?.returns}% p.a.</span>
                </div>
                <div className="flex justify-between py-3 bg-secondary rounded-lg px-3">
                  <span className="font-medium text-foreground">{language === 'fr' ? 'Nouveau solde' : 'New Balance'}</span>
                  <span className="font-medium text-foreground text-lg">
                    {formatCurrency((user?.balance || 0) - parseFloat(amount))}
                  </span>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleConfirm}
              className="w-full h-12 bg-success hover:bg-success/90 text-white"
            >
              {language === 'fr' ? 'Confirmer l\'investissement' : 'Confirm Investment'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
