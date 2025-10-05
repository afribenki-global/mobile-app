import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, CreditCard, Building2, Smartphone, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

export function TopUpScreen() {
  const { setCurrentScreen, formatCurrency, user, updateBalance, t, language } = useApp();
  const { addActivity } = useActivity();
  const [step, setStep] = useState<'amount' | 'method' | 'confirm' | 'success'>('amount');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const quickAmounts = [5000, 10000, 20000, 50000, 100000, 200000];

  const paymentMethods = [
    { id: 'card', name: language === 'fr' ? 'Carte de débit/crédit' : 'Debit/Credit Card', icon: CreditCard, desc: language === 'fr' ? 'Paiement instantané' : 'Instant payment' },
    { id: 'bank', name: language === 'fr' ? 'Virement bancaire' : 'Bank Transfer', icon: Building2, desc: language === 'fr' ? '1-3 jours ouvrables' : '1-3 business days' },
    { id: 'mobile', name: language === 'fr' ? 'Argent mobile' : 'Mobile Money', icon: Smartphone, desc: language === 'fr' ? 'Paiement instantané' : 'Instant payment' },
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
    setStep('method');
  };

  const handleMethodContinue = () => {
    if (!selectedMethod) {
      toast.error(language === 'fr' ? 'Veuillez sélectionner une méthode de paiement' : 'Please select a payment method');
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    
    // Update user balance
    updateBalance(numAmount, 'topup');

    // Add activity
    addActivity({
      type: 'topup',
      title: language === 'fr' ? 'Compte rechargé' : 'Account Top-up',
      description: language === 'fr' 
        ? `Rechargement via ${paymentMethods.find(m => m.id === selectedMethod)?.name}` 
        : `Top-up via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`,
      amount: numAmount,
      icon: '💰',
      status: 'completed',
      timestamp: new Date(),
    });

    setStep('success');
    
    setTimeout(() => {
      toast.success(language === 'fr' ? 'Compte rechargé avec succès!' : 'Account topped up successfully!');
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
            {language === 'fr' ? 'Votre compte a été rechargé de' : 'Your account has been topped up with'}
          </p>
          <p className="text-2xl text-success mb-2">{formatCurrency(parseFloat(amount))}</p>
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
            onClick={() => step === 'amount' ? setCurrentScreen('home') : setStep(step === 'method' ? 'amount' : 'method')}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-white">{language === 'fr' ? 'Recharger le compte' : 'Top Up Account'}</h2>
            <p className="text-white/80 text-sm">
              {step === 'amount' && (language === 'fr' ? 'Entrez le montant' : 'Enter amount')}
              {step === 'method' && (language === 'fr' ? 'Sélectionnez la méthode' : 'Select method')}
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
              <Label htmlFor="amount" className="text-foreground mb-2 block">
                {language === 'fr' ? 'Montant du rechargement' : 'Top-up Amount'}
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={language === 'fr' ? 'Entrez le montant' : 'Enter amount'}
                className="h-14 text-xl mb-4"
              />
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="py-3 px-2 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-colors text-sm"
                  >
                    {formatCurrency(amt)}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">ℹ️</div>
                <div>
                  <h4 className="text-foreground mb-1">{language === 'fr' ? 'Note' : 'Note'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fr' 
                      ? 'Montant minimum: 1 000. Pas de frais de rechargement.'
                      : 'Minimum amount: 1,000. No top-up fees.'}
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
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Montant à recharger' : 'Amount to top up'}</p>
                <h2 className="text-2xl text-foreground">{formatCurrency(parseFloat(amount))}</h2>
              </div>
            </Card>

            <div>
              <h3 className="text-foreground mb-3 px-1">{language === 'fr' ? 'Méthode de paiement' : 'Payment Method'}</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
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

        {step === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <h3 className="text-foreground mb-4">{language === 'fr' ? 'Résumé du rechargement' : 'Top-up Summary'}</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Montant' : 'Amount'}</span>
                  <span className="font-medium text-foreground">{formatCurrency(parseFloat(amount))}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Méthode de paiement' : 'Payment Method'}</span>
                  <span className="font-medium text-foreground">
                    {paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </span>
                </div>
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

            <Card className="p-5 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h4 className="text-foreground mb-1">{language === 'fr' ? 'Traitement instantané' : 'Instant Processing'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fr' 
                      ? 'Votre compte sera crédité immédiatement après confirmation.'
                      : 'Your account will be credited immediately after confirmation.'}
                  </p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleConfirm}
              className="w-full h-12 bg-success hover:bg-success/90 text-white"
            >
              {language === 'fr' ? 'Confirmer le rechargement' : 'Confirm Top-up'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
