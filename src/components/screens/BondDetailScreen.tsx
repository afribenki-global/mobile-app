import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, Shield, Calendar, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

export function BondDetailScreen() {
  const { setCurrentScreen, formatCurrency, user, setUser, language } = useApp();
  const { addActivity } = useActivity();
  const [amount, setAmount] = useState('');

  const bondData = localStorage.getItem('selectedBond');
  const bond = bondData ? JSON.parse(bondData) : null;

  if (!bond) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            {language === 'fr' ? 'Obligation non trouvée' : 'Bond not found'}
          </p>
          <Button onClick={() => setCurrentScreen('bonds')}>
            {language === 'fr' ? 'Retour' : 'Go Back'}
          </Button>
        </Card>
      </div>
    );
  }

  const handleBuyBond = () => {
    const investAmount = parseFloat(amount);
    if (!investAmount || investAmount < bond.minInvestment) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: `${language === 'fr' ? 'Investissement minimum:' : 'Minimum investment:'} ${formatCurrency(bond.minInvestment)}`,
      });
      return;
    }

    if (investAmount > (user?.balance || 0)) {
      toast.error(language === 'fr' ? 'Solde insuffisant' : 'Insufficient Balance', {
        description: language === 'fr' ? 'Veuillez recharger votre compte' : 'Please top up your account',
      });
      return;
    }

    // Update balances
    if (user) {
      setUser({
        ...user,
        balance: user.balance - investAmount,
        portfolioValue: (user.portfolioValue || 0) + investAmount,
      });
    }

    // Add to activity
    addActivity({
      type: 'investment',
      title: bond.name,
      amount: investAmount,
      description: `${language === 'fr' ? 'Investissement obligataire à' : 'Bond investment at'} ${bond.coupon}% ${language === 'fr' ? 'coupon' : 'coupon'}`,
      status: 'completed',
      icon: '📜',
    });

    toast.success(language === 'fr' ? 'Achat réussi!' : 'Purchase Successful!', {
      description: `${formatCurrency(investAmount)} ${language === 'fr' ? 'investi dans' : 'invested in'} ${bond.name}`,
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });

    setTimeout(() => {
      setCurrentScreen('my-investments');
    }, 1500);
  };

  const expectedAnnualReturn = amount ? (parseFloat(amount) * bond.coupon / 100) : 0;
  const maturityValue = amount ? parseFloat(amount) : 0;

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('bonds')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{bond.name}</h2>
        <div className="flex items-center gap-2">
          <Badge className="bg-white/20">
            {bond.type}
          </Badge>
          <Badge className="bg-success">
            {bond.rating}
          </Badge>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Coupon Rate Card */}
        <Card className="p-6 bg-gradient-to-br from-success/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'fr' ? 'Taux du coupon' : 'Coupon Rate'}
              </p>
              <p className="text-3xl text-success">{bond.coupon}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'fr' ? 'par an' : 'per annum'}
              </p>
            </div>
            <Shield className="w-12 h-12 text-success/20" />
          </div>
        </Card>

        {/* Bond Details */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Détails de l\'obligation' : 'Bond Details'}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Émetteur' : 'Issuer'}</span>
              <span className="text-foreground text-right">{bond.issuer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Type' : 'Type'}</span>
              <span className="text-foreground">{bond.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Notation' : 'Rating'}</span>
              <Badge className="bg-success">{bond.rating}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Durée' : 'Tenure'}</span>
              <span className="text-foreground">{bond.tenure} {language === 'fr' ? 'ans' : 'years'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Échéance' : 'Maturity Date'}</span>
              <span className="text-foreground">
                {new Date(bond.maturity).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Investissement min.' : 'Min. Investment'}</span>
              <span className="text-foreground">{formatCurrency(bond.minInvestment)}</span>
            </div>
          </div>
        </Card>

        {/* Investment Section */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Investir dans cette obligation' : 'Invest in This Bond'}</h3>
          <div className="space-y-4">
            <div>
              <Label>{language === 'fr' ? 'Montant de l\'investissement' : 'Investment Amount'}</Label>
              <Input
                type="number"
                min={bond.minInvestment}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={formatCurrency(bond.minInvestment)}
                className="bg-input-background mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'fr' ? 'Minimum:' : 'Minimum:'} {formatCurrency(bond.minInvestment)}
              </p>
            </div>

            {amount && parseFloat(amount) >= bond.minInvestment && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-muted rounded-lg space-y-3"
              >
                <h4 className="text-foreground">{language === 'fr' ? 'Rendements attendus' : 'Expected Returns'}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Investissement' : 'Investment'}</span>
                    <span className="text-foreground">{formatCurrency(parseFloat(amount))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Rendement annuel' : 'Annual Return'}</span>
                    <span className="text-success">{formatCurrency(expectedAnnualReturn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Taux du coupon' : 'Coupon Rate'}</span>
                    <span className="text-foreground">{bond.coupon}%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-foreground">{language === 'fr' ? 'Valeur à l\'échéance' : 'Maturity Value'}</span>
                    <span className="text-xl text-foreground">{formatCurrency(maturityValue)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleBuyBond}
              disabled={!amount || parseFloat(amount) < bond.minInvestment}
              className="w-full h-12 bg-success hover:bg-success/90"
            >
              {language === 'fr' ? 'Acheter l\'obligation' : 'Buy Bond'}
            </Button>
          </div>
        </Card>

        {/* Benefits */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <h3 className="text-foreground mb-3">{language === 'fr' ? 'Avantages' : 'Benefits'}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Rendements fixes garantis' : 'Guaranteed fixed returns'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Investissement à faible risque' : 'Low-risk investment'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Paiements réguliers de coupons' : 'Regular coupon payments'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'fr' ? 'Remboursement du capital garanti' : 'Capital repayment guaranteed'}</span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
