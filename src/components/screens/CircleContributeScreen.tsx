import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { useCircleMessages } from '../CircleMessagesContext';
import { ArrowLeft, TrendingUp, Wallet, CreditCard, Building2, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

export function CircleContributeScreen() {
  const { setCurrentScreen, formatCurrency, language, user, selectedCircleId, updateBalance } = useApp();
  const { addActivity } = useActivity();
  const { addMessage } = useCircleMessages();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [step, setStep] = useState<'amount' | 'payment' | 'confirm' | 'success'>('amount');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock circle data - in real app would come from API
  const circles = {
    '1': {
      id: '1',
      name: 'Family Vacation Fund',
      contribution: 20000,
      target: 500000,
      collected: 180000,
      members: 5,
    },
    '2': {
      id: '2',
      name: 'Business Capital',
      contribution: 50000,
      target: 2000000,
      collected: 750000,
      members: 8,
    },
  };

  const circle = circles[selectedCircleId as keyof typeof circles] || circles['1'];
  const progress = (circle.collected / circle.target) * 100;

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error(language === 'fr' ? 'Veuillez entrer un montant valide' : 'Please enter a valid amount');
      return;
    }

    const contributionAmount = parseFloat(amount);
    
    if (paymentMethod === 'wallet' && user && contributionAmount > user.balance) {
      toast.error(language === 'fr' ? 'Solde insuffisant dans le portefeuille' : 'Insufficient wallet balance');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Update balance if paying from wallet
      if (paymentMethod === 'wallet') {
        updateBalance(contributionAmount, 'circle');
      }

      // Add to activity history
      addActivity({
        type: 'circle',
        title: language === 'fr' ? 'Contribution au cercle' : 'Circle Contribution',
        description: `${circle.name} • ${formatCurrency(contributionAmount)}`,
        amount: contributionAmount,
        status: 'completed',
        timestamp: new Date(),
      });

      // Add system message to circle chat
      addMessage({
        circleId: selectedCircleId || '1',
        userId: 'system',
        userName: 'System',
        avatar: '🔔',
        text: language === 'fr'
          ? `${user?.name || 'Utilisateur'} a contribué ${formatCurrency(contributionAmount)} au cercle`
          : `${user?.name || 'User'} contributed ${formatCurrency(contributionAmount)} to the circle`,
        isOwn: false,
        type: 'contribution',
        amount: contributionAmount,
      });

      setIsProcessing(false);
      setStep('success');

      toast.success(
        language === 'fr' 
          ? `Contribution de ${formatCurrency(contributionAmount)} effectuée avec succès!`
          : `Successfully contributed ${formatCurrency(contributionAmount)}!`
      );
    }, 2000);
  };

  const quickAmounts = [
    circle.contribution,
    circle.contribution * 2,
    circle.contribution * 3,
    50000,
  ];

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-muted flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-foreground mb-2">
            {language === 'fr' ? 'Contribution réussie!' : 'Contribution Successful!'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'fr' 
              ? `Vous avez contribué ${formatCurrency(parseFloat(amount))} à ${circle.name}`
              : `You contributed ${formatCurrency(parseFloat(amount))} to ${circle.name}`}
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => setCurrentScreen('circles')}
              className="w-full bg-accent hover:bg-accent/90"
            >
              {language === 'fr' ? 'Retour aux cercles' : 'Back to Circles'}
            </Button>
            <Button
              onClick={() => setCurrentScreen('activity-history')}
              variant="outline"
              className="w-full"
            >
              {language === 'fr' ? 'Voir l\'historique' : 'View History'}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('circles')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">
          {language === 'fr' ? 'Contribuer au cercle' : 'Contribute to Circle'}
        </h2>
        <p className="text-white/80">{circle.name}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Circle Progress */}
        <Card className="p-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {language === 'fr' ? 'Progression' : 'Progress'}
              </span>
              <span className="font-medium text-foreground">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {language === 'fr' ? 'Collecté' : 'Collected'}: {formatCurrency(circle.collected)}
              </span>
              <span className="text-muted-foreground">
                {language === 'fr' ? 'Objectif' : 'Target'}: {formatCurrency(circle.target)}
              </span>
            </div>
          </div>
        </Card>

        {/* Amount Step */}
        {step === 'amount' && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <Card className="p-5">
              <Label className="text-foreground mb-3 block">
                {language === 'fr' ? 'Montant de la contribution' : 'Contribution Amount'}
              </Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={language === 'fr' ? 'Entrer le montant' : 'Enter amount'}
                className="mb-4 h-14 text-xl"
              />

              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="p-3 border border-border rounded-lg hover:bg-accent/10 hover:border-accent transition-colors"
                  >
                    <div className="text-sm text-foreground">{formatCurrency(quickAmount)}</div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-accent/5 border-accent/20">
              <p className="text-sm text-muted-foreground">
                {language === 'fr' 
                  ? `💡 Contribution mensuelle suggérée: ${formatCurrency(circle.contribution)}`
                  : `💡 Suggested monthly contribution: ${formatCurrency(circle.contribution)}`}
              </p>
            </Card>

            <Button
              onClick={() => setStep('payment')}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full h-12 bg-accent hover:bg-accent/90"
            >
              {language === 'fr' ? 'Continuer' : 'Continue'}
            </Button>
          </motion.div>
        )}

        {/* Payment Method Step */}
        {step === 'payment' && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <Card className="p-5">
              <Label className="text-foreground mb-3 block">
                {language === 'fr' ? 'Méthode de paiement' : 'Payment Method'}
              </Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <Card className="p-4 mb-2 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex-1 flex items-center gap-3 cursor-pointer">
                      <Wallet className="w-5 h-5 text-accent" />
                      <div className="flex-1">
                        <div className="text-foreground">
                          {language === 'fr' ? 'Portefeuille AfriBenki' : 'AfriBenki Wallet'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Solde: ' : 'Balance: '}{formatCurrency(user?.balance || 0)}
                        </div>
                      </div>
                    </Label>
                  </div>
                </Card>

                <Card className="p-4 mb-2 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 flex items-center gap-3 cursor-pointer">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <div className="text-foreground">
                        {language === 'fr' ? 'Carte de débit/crédit' : 'Debit/Credit Card'}
                      </div>
                    </Label>
                  </div>
                </Card>

                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 flex items-center gap-3 cursor-pointer">
                      <Building2 className="w-5 h-5 text-purple-500" />
                      <div className="text-foreground">
                        {language === 'fr' ? 'Transfert bancaire' : 'Bank Transfer'}
                      </div>
                    </Label>
                  </div>
                </Card>
              </RadioGroup>
            </Card>

            <div className="flex gap-2">
              <Button
                onClick={() => setStep('amount')}
                variant="outline"
                className="flex-1"
              >
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              <Button
                onClick={() => setStep('confirm')}
                className="flex-1 bg-accent hover:bg-accent/90"
              >
                {language === 'fr' ? 'Continuer' : 'Continue'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Confirm Step */}
        {step === 'confirm' && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <Card className="p-5">
              <h3 className="text-foreground mb-4">
                {language === 'fr' ? 'Confirmer la contribution' : 'Confirm Contribution'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'fr' ? 'Cercle' : 'Circle'}
                  </span>
                  <span className="font-medium text-foreground">{circle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'fr' ? 'Montant' : 'Amount'}
                  </span>
                  <span className="font-medium text-foreground text-xl">
                    {formatCurrency(parseFloat(amount))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'fr' ? 'Méthode' : 'Method'}
                  </span>
                  <span className="font-medium text-foreground capitalize">{paymentMethod}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-foreground">
                      {language === 'fr' ? 'Total' : 'Total'}
                    </span>
                    <span className="font-medium text-foreground text-xl">
                      {formatCurrency(parseFloat(amount))}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button
                onClick={() => setStep('payment')}
                variant="outline"
                className="flex-1"
              >
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              <Button
                onClick={handleContribute}
                disabled={isProcessing}
                className="flex-1 bg-accent hover:bg-accent/90"
              >
                {isProcessing 
                  ? (language === 'fr' ? 'Traitement...' : 'Processing...')
                  : (language === 'fr' ? 'Confirmer' : 'Confirm')}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
