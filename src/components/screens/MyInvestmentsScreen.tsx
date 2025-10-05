import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function MyInvestmentsScreen() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();

  const investments = [
    {
      id: 1,
      fundName: language === 'fr' ? 'Fonds de Croissance Actions' : 'Equity Growth Fund',
      type: 'Equity',
      invested: 200000,
      currentValue: 245000,
      returns: 22.5,
      returnAmount: 45000,
      purchaseDate: '2024-07-15',
      units: 1000,
      navPrice: 245,
      performance: 'up',
    },
    {
      id: 2,
      fundName: language === 'fr' ? 'Fonds du Marché Monétaire' : 'Money Market Fund',
      type: 'Money Market',
      invested: 150000,
      currentValue: 168750,
      returns: 12.5,
      returnAmount: 18750,
      purchaseDate: '2024-06-20',
      units: 3000,
      navPrice: 56.25,
      performance: 'up',
    },
    {
      id: 3,
      fundName: language === 'fr' ? 'Fonds Halal' : 'Halal Fund',
      type: 'Halal',
      invested: 100000,
      currentValue: 118000,
      returns: 18.0,
      returnAmount: 18000,
      purchaseDate: '2024-08-01',
      units: 500,
      navPrice: 236,
      performance: 'up',
    },
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturns = totalCurrentValue - totalInvested;
  const totalReturnsPercent = ((totalReturns / totalInvested) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('invest')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{language === 'fr' ? 'Mes investissements' : 'My Investments'}</h2>
        <p className="text-white/80 text-sm">{investments.length} {language === 'fr' ? 'investissements actifs' : 'active investments'}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Portfolio Summary */}
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-accent" />
            <h3 className="text-foreground">{language === 'fr' ? 'Résumé du portefeuille' : 'Portfolio Summary'}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{language === 'fr' ? 'Total investi' : 'Total Invested'}</p>
              <p className="text-xl text-foreground">{formatCurrency(totalInvested)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{language === 'fr' ? 'Valeur actuelle' : 'Current Value'}</p>
              <p className="text-xl text-success">{formatCurrency(totalCurrentValue)}</p>
            </div>
          </div>

          <div className="p-4 bg-success/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Rendement total' : 'Total Returns'}</span>
              <Badge className="bg-success">+{totalReturnsPercent}%</Badge>
            </div>
            <p className="text-2xl text-success">+{formatCurrency(totalReturns)}</p>
          </div>
        </Card>

        {/* Investments List */}
        <div className="space-y-3">
          {investments.map((investment, index) => (
            <motion.div
              key={investment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => {
                  localStorage.setItem('selectedInvestment', investment.id.toString());
                  setCurrentScreen('investment-detail');
                }}
                className="p-5 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">{investment.fundName}</h4>
                    <Badge variant="outline" className="text-xs">
                      {investment.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+{investment.returns}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Investi' : 'Invested'}</p>
                    <p className="text-sm text-foreground">{formatCurrency(investment.invested)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Valeur actuelle' : 'Current Value'}</p>
                    <p className="text-sm text-success">{formatCurrency(investment.currentValue)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(investment.purchaseDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                    </span>
                  </div>
                  <span className="text-success">+{formatCurrency(investment.returnAmount)}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add Investment Button */}
        <Button
          onClick={() => setCurrentScreen('invest')}
          className="w-full h-14 bg-accent hover:bg-accent/90"
        >
          {language === 'fr' ? 'Faire un nouvel investissement' : 'Make New Investment'}
        </Button>
      </motion.div>
    </div>
  );
}
