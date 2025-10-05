import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

export function StockDetailScreen() {
  const { setCurrentScreen, formatCurrency, user, setUser, language } = useApp();
  const { addActivity } = useActivity();
  const [units, setUnits] = useState('');

  const stockData = localStorage.getItem('selectedStock');
  const stock = stockData ? JSON.parse(stockData) : null;

  if (!stock) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            {language === 'fr' ? 'Action non trouvée' : 'Stock not found'}
          </p>
          <Button onClick={() => setCurrentScreen('stocks')}>
            {language === 'fr' ? 'Retour' : 'Go Back'}
          </Button>
        </Card>
      </div>
    );
  }

  const performanceData = [
    { day: 'Mon', price: stock.price * 0.96 },
    { day: 'Tue', price: stock.price * 0.98 },
    { day: 'Wed', price: stock.price * 0.97 },
    { day: 'Thu', price: stock.price * 0.99 },
    { day: 'Fri', price: stock.price },
  ];

  const handleBuyStock = () => {
    const numUnits = parseInt(units);
    if (!numUnits || numUnits < 1) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: language === 'fr' ? 'Entrez un nombre d\'unités valide' : 'Enter valid number of units',
      });
      return;
    }

    const totalCost = numUnits * stock.price;
    
    if (totalCost > (user?.balance || 0)) {
      toast.error(language === 'fr' ? 'Solde insuffisant' : 'Insufficient Balance', {
        description: language === 'fr' ? 'Veuillez recharger votre compte' : 'Please top up your account',
      });
      return;
    }

    // Update balances
    if (user) {
      setUser({
        ...user,
        balance: user.balance - totalCost,
        portfolioValue: (user.portfolioValue || 0) + totalCost,
      });
    }

    // Add to activity
    addActivity({
      type: 'investment',
      title: stock.symbol,
      amount: totalCost,
      description: `${language === 'fr' ? 'Achat de' : 'Purchased'} ${numUnits} ${language === 'fr' ? 'unités de' : 'units of'} ${stock.name}`,
      status: 'completed',
      icon: '📈',
    });

    toast.success(language === 'fr' ? 'Achat réussi!' : 'Purchase Successful!', {
      description: `${numUnits} ${language === 'fr' ? 'unités de' : 'units of'} ${stock.symbol} ${language === 'fr' ? 'pour' : 'for'} ${formatCurrency(totalCost)}`,
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });

    setTimeout(() => {
      setCurrentScreen('my-investments');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('stocks')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-white mb-1">{stock.symbol}</h2>
            <p className="text-white/80 text-sm">{stock.name}</p>
          </div>
          <Badge className="bg-white/20">
            {stock.sector}
          </Badge>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Price Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'fr' ? 'Prix actuel' : 'Current Price'}
              </p>
              <p className="text-3xl text-foreground">{formatCurrency(stock.price)}</p>
            </div>
            <div className={`flex items-center gap-2 ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
              {stock.change >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              <div className="text-right">
                <p className="text-xl">{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%</p>
                <p className="text-sm">{formatCurrency(stock.changeAmount)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Volume' : 'Volume'}</p>
              <p className="text-sm text-foreground">{(stock.volume / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">P/E</p>
              <p className="text-sm text-foreground">{stock.pe}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Dividende' : 'Dividend'}</p>
              <p className="text-sm text-foreground">{stock.dividend}%</p>
            </div>
          </div>
        </Card>

        {/* Performance Chart */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Performance 5 jours' : '5-Day Performance'}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
              <XAxis dataKey="day" stroke="#6c757d" />
              <YAxis stroke="#6c757d" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke={stock.change >= 0 ? "#00A676" : "#DC3545"} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Company Info */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Informations' : 'Company Info'}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Secteur' : 'Sector'}</span>
              <span className="text-foreground">{stock.sector}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Cap. marché' : 'Market Cap'}</span>
              <span className="text-foreground">{formatCurrency(stock.marketCap / 1000000)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Ratio P/E' : 'P/E Ratio'}</span>
              <span className="text-foreground">{stock.pe}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'fr' ? 'Rendement div.' : 'Dividend Yield'}</span>
              <span className="text-foreground">{stock.dividend}%</span>
            </div>
          </div>
        </Card>

        {/* Buy Section */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Acheter des actions' : 'Buy Stock'}</h3>
          <div className="space-y-4">
            <div>
              <Label>{language === 'fr' ? 'Nombre d\'unités' : 'Number of Units'}</Label>
              <Input
                type="number"
                min="1"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                placeholder="0"
                className="bg-input-background mt-2"
              />
            </div>

            {units && parseInt(units) > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-muted rounded-lg space-y-2"
              >
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Prix unitaire' : 'Unit Price'}</span>
                  <span className="text-foreground">{formatCurrency(stock.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'fr' ? 'Unités' : 'Units'}</span>
                  <span className="text-foreground">{units}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-foreground">{language === 'fr' ? 'Coût total' : 'Total Cost'}</span>
                  <span className="text-xl text-foreground">{formatCurrency(parseInt(units) * stock.price)}</span>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleBuyStock}
              disabled={!units || parseInt(units) < 1}
              className="w-full h-12 bg-success hover:bg-success/90"
            >
              {language === 'fr' ? 'Acheter maintenant' : 'Buy Now'}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
