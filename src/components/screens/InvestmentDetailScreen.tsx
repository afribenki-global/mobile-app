import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Package, Download, Share2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function InvestmentDetailScreen() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();

  // Mock investment - in real app, fetch based on ID
  const investment = {
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
    purchaseNav: 200,
  };

  const performanceData = [
    { month: 'Jul', value: 200000 },
    { month: 'Aug', value: 210000 },
    { month: 'Sep', value: 218000 },
    { month: 'Oct', value: 225000 },
    { month: 'Nov', value: 235000 },
    { month: 'Dec', value: 240000 },
    { month: 'Jan', value: 245000 },
  ];

  const transactions = [
    { id: 1, date: '2024-07-15', type: 'purchase', units: 1000, nav: 200, amount: 200000 },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('my-investments')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{investment.fundName}</h2>
        <div className="flex items-center gap-2">
          <Badge className="bg-white/20">
            {investment.type}
          </Badge>
          <Badge className="bg-success">
            +{investment.returns}%
          </Badge>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Value Summary */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-2">{language === 'fr' ? 'Investi' : 'Invested'}</p>
            <p className="text-2xl text-foreground">{formatCurrency(investment.invested)}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-2">{language === 'fr' ? 'Valeur actuelle' : 'Current Value'}</p>
            <p className="text-2xl text-success">{formatCurrency(investment.currentValue)}</p>
          </Card>
        </div>

        {/* Returns Card */}
        <Card className="p-6 bg-gradient-to-br from-success/10 to-accent/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-foreground">{language === 'fr' ? 'Rendements totaux' : 'Total Returns'}</span>
            </div>
            <Badge className="bg-success">+{investment.returns}%</Badge>
          </div>
          <p className="text-3xl text-success">+{formatCurrency(investment.returnAmount)}</p>
        </Card>

        {/* Performance Chart */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Performance' : 'Performance'}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
              <XAxis dataKey="month" stroke="#6c757d" />
              <YAxis stroke="#6c757d" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#00A676" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Investment Details */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Détails' : 'Details'}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Unités détenues' : 'Units Held'}</p>
                <p className="text-foreground">{investment.units.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Prix NAV actuel' : 'Current NAV Price'}</p>
                <p className="text-foreground">{formatCurrency(investment.navPrice)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Prix d\'achat NAV' : 'Purchase NAV Price'}</p>
                <p className="text-foreground">{formatCurrency(investment.purchaseNav)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Date d\'achat' : 'Purchase Date'}</p>
                <p className="text-foreground">
                  {new Date(investment.purchaseDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Historique' : 'Transaction History'}</h3>
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-foreground">{language === 'fr' ? 'Achat' : 'Purchase'}</p>
                  <p className="text-sm text-muted-foreground">
                    {txn.units} {language === 'fr' ? 'unités à' : 'units at'} {formatCurrency(txn.nav)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(txn.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                  </p>
                </div>
                <p className="text-foreground">{formatCurrency(txn.amount)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12">
            <Download className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Télécharger' : 'Download'}
          </Button>
          <Button variant="outline" className="flex-1 h-12">
            <Share2 className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Partager' : 'Share'}
          </Button>
        </div>

        <Button
          onClick={() => setCurrentScreen('fund-details')}
          className="w-full h-12 bg-accent hover:bg-accent/90"
        >
          {language === 'fr' ? 'Ajouter plus d\'investissement' : 'Add More Investment'}
        </Button>
      </motion.div>
    </div>
  );
}
