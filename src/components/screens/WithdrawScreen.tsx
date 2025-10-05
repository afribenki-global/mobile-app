import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, Building2, Smartphone, Wallet, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

export function WithdrawScreen() {
  const { setCurrentScreen, formatCurrency, user, updateBalance, t, language } = useApp();
  const { addActivity } = useActivity();
  const [step, setStep] = useState<'amount' | 'method' | 'details' | 'confirm' | 'success'>('amount');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  const withdrawalMethods = [
    { id: 'bank', name: language === 'fr' ? 'Virement bancaire' : 'Bank Transfer', icon: Building2, desc: language === 'fr' ? '1-3 jours ouvrables' : '1-3 business days', fee: 0 },
    { id: 'mobile', name: language === 'fr' ? 'Argent mobile' : 'Mobile Money', icon: Smartphone, desc: language === 'fr' ? 'Instantané' : 'Instant', fee: 0 },
    { id: 'wallet', name: language === 'fr' ? 'Portefeuille mobile' : 'Mobile Wallet', icon: Wallet, desc: language === 'fr' ? 'Instantané' : 'Instant', fee: 0 },
  ];

  const handleAmountContinue = () => {
    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0) {
      toast.error(language === 'fr' ? 'Veuillez entrer un montant valide' : 'Please enter a valid amount');
      return;
    }
    if (numAmount < 1000) {
      toast.error(language === 'fr' ? 'Le montant minimum est de 1 000' : 'Minimum amount is 1,000');
      return;
    }
    if (numAmount > (user?.balance || 0)) {
      toast.error(language === 'fr' ? 'Solde insuffisant' : 'Insufficient balance');
      return;
    }
    setStep('method');
  };

  const handleMethodContinue = () => {
    if (!selectedMethod) {
      toast.error(language === 'fr' ? 'Veuillez sélectionner une méthode de retrait' : 'Please select a withdrawal method');
      return;
    }
    setStep('details');
  };

  const handleDetailsContinue = () => {
    if (!accountNumber) {
      toast.error(language === 'fr' ? 'Veuillez entrer le numéro de compte' : 'Please enter account number');
      return;
    }
    if (selectedMethod === 'bank' && !bankName) {
      toast.error(language === 'fr' ? 'Veuillez entrer le nom de la banque' : 'Please enter bank name');
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    
    // Update user balance
    updateBalance(numAmount, 'withdraw');

    // Add activity
    addActivity({
      type: 'withdrawal',
      title: language === 'fr' ? 'Retrait effectué' : 'Withdrawal Completed',
      description: language === 'fr' 
        ? `Retrait vers ${withdrawalMethods.find(m => m.id === selectedMethod)?.name}` 
        : `Withdrawal to ${withdrawalMethods.find(m => m.id === selectedMethod)?.name}`,
      amount: -numAmount,
      icon: '💸',
      status: 'completed',
      timestamp: new Date(),
    });

    setStep('success');
    
    setTimeout(() => {
      toast.success(language === 'fr' ? 'Retrait traité avec succès!' : 'Withdrawal processed successfully!');
      setCurrentScreen('home');
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
          <h2 className="text-foreground mb-2">{language === 'fr' ? 'Succès!' : 'Success!'}</h2>
          <p className="text-muted-foreground mb-4">
            {language === 'fr' ? 'Votre retrait de' : 'Your withdrawal of'}
          </p>
          <p className="text-2xl text-success mb-2">{formatCurrency(parseFloat(amount))}</p>
          <p className="text-sm text-muted-foreground mb-1">
            {language === 'fr' ? 'est en cours de traitement' : 'is being processed'}
          </p>
          <p className="text-sm text-muted-foreground">
            {language === 'fr' ? 'Nouveau solde:' : 'New balance:'} {formatCurrency((user?.balance || 0))}
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
              if (step === 'amount') setCurrentScreen('home');
              else if (step === 'method') setStep('amount');
              else if (step === 'details') setStep('method');
              else if (step === 'confirm') setStep('details');
            }}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-white">{language === 'fr' ? 'Retirer des fonds' : 'Withdraw Funds'}</h2>
            <p className="text-white/80 text-sm">
              {step === 'amount' && (language === 'fr' ? 'Entrez le montant' : 'Enter amount')}
              {step === 'method' && (language === 'fr' ? 'Sélectionnez la méthode' : 'Select method')}
              {step === 'details' && (language === 'fr' ? 'Détails du compte' : 'Account details')}
              {step === 'confirm' && (language === 'fr' ? 'Confirmez les détails' : 'Confirm details')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-4">
        {step === 'amount' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Solde disponible' : 'Available Balance'}</p>
                <h3 className="text-2xl text-foreground">{formatCurrency(user?.balance || 0)}</h3>
              </div>
              
              <Label htmlFor="amount" className="text-foreground mb-2 block">
                {language === 'fr' ? 'Montant du retrait' : 'Withdrawal Amount'}
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={language === 'fr' ? 'Entrez le montant' : 'Enter amount'}
                className="h-14 text-xl"
              />
            </Card>

            <Card className="p-5 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">ℹ️</div>
                <div>
                  <h4 className="text-foreground mb-1">{language === 'fr' ? 'Limites de retrait' : 'Withdrawal Limits'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fr' 
                      ? 'Minimum: 1 000 • Maximum quotidien: 500 000'
                      : 'Minimum: 1,000 • Daily max: 500,000'}
                  </p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleAmountContinue}
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              {language === 'fr' ? 'Continuer' : 'Continue'}
            </Button>
          </motion.div>
        )}

        {step === 'method' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="p-5">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Montant à retirer' : 'Amount to withdraw'}</p>
                <h2 className="text-2xl text-foreground">{formatCurrency(parseFloat(amount))}</h2>
              </div>
            </Card>

            <div>
              <h3 className="text-foreground mb-3 px-1">{language === 'fr' ? 'Méthode de retrait' : 'Withdrawal Method'}</h3>
              <div className="space-y-3">
                {withdrawalMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Card
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedMethod === method.id
                          ? 'border-2 border-primary bg-secondary'
                          : 'border border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-foreground mb-1">{method.name}</h4>
                          <p className="text-sm text-muted-foreground">{method.desc}</p>
                        </div>
                        {selectedMethod === method.id && (
                          <Check className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleMethodContinue}
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              {language === 'fr' ? 'Continuer' : 'Continue'}
            </Button>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="p-6 space-y-4">
              <div>
                <Label htmlFor="accountNumber" className="text-foreground mb-2 block">
                  {selectedMethod === 'bank' 
                    ? (language === 'fr' ? 'Numéro de compte bancaire' : 'Bank Account Number')
                    : (language === 'fr' ? 'Numéro de téléphone' : 'Phone Number')}
                </Label>
                <Input
                  id="accountNumber"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={selectedMethod === 'bank' ? '0123456789' : '+234 XXX XXX XXXX'}
                  className="h-12"
                />
              </div>

              {selectedMethod === 'bank' && (
                <div>
                  <Label htmlFor="bankName" className="text-foreground mb-2 block">
                    {language === 'fr' ? 'Nom de la banque' : 'Bank Name'}
                  </Label>
                  <Input
                    id="bankName"
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder={language === 'fr' ? 'Entrez le nom de la banque' : 'Enter bank name'}
                    className="h-12"
                  />
                </div>
              )}
            </Card>

            <Button
              onClick={handleDetailsContinue}
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
              <h3 className="text-foreground mb-4">{language === 'fr' ? 'Résumé du retrait' : 'Withdrawal Summary'}</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Montant' : 'Amount'}</span>
                  <span className="font-medium text-foreground">{formatCurrency(parseFloat(amount))}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Méthode' : 'Method'}</span>
                  <span className="font-medium text-foreground">
                    {withdrawalMethods.find(m => m.id === selectedMethod)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">
                    {selectedMethod === 'bank' 
                      ? (language === 'fr' ? 'Compte' : 'Account')
                      : (language === 'fr' ? 'Téléphone' : 'Phone')}
                  </span>
                  <span className="font-medium text-foreground">{accountNumber}</span>
                </div>
                {selectedMethod === 'bank' && (
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Banque' : 'Bank'}</span>
                    <span className="font-medium text-foreground">{bankName}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Frais' : 'Fees'}</span>
                  <span className="font-medium text-success">{language === 'fr' ? 'Gratuit' : 'Free'}</span>
                </div>
                <div className="flex justify-between py-3 bg-secondary rounded-lg px-3">
                  <span className="font-medium text-foreground">{language === 'fr' ? 'Total' : 'Total'}</span>
                  <span className="font-medium text-foreground text-lg">{formatCurrency(parseFloat(amount))}</span>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleConfirm}
              className="w-full h-12 bg-success hover:bg-success/90 text-white"
            >
              {language === 'fr' ? 'Confirmer le retrait' : 'Confirm Withdrawal'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
