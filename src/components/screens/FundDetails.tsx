import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, TrendingUp, Shield, Info, DollarSign, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

export function FundDetails() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();
  const { addActivity } = useActivity();
  const [investAmount, setInvestAmount] = useState('');

  const performanceData = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 105 },
    { month: 'Mar', value: 108 },
    { month: 'Apr', value: 112 },
    { month: 'May', value: 118 },
    { month: 'Jun', value: 124 },
  ];

  const fundInfo = {
    name: 'Equity Growth Fund',
    type: 'High Risk',
    returns: 24.3,
    minInvestment: 10000,
    description: 'This fund invests in high-growth stocks across African markets with potential for significant returns.',
    manager: 'AfriBenki Asset Management',
    inception: 'Jan 2020',
    aum: '2.5B',
  };

  const handleInvest = () => {
    const amount = parseFloat(investAmount);
    if (!amount || amount < fundInfo.minInvestment) {
      toast.error(t('error'), {
        description: language === 'fr' 
          ? `Investissement minimum: ${formatCurrency(fundInfo.minInvestment)}`
          : `Minimum investment: ${formatCurrency(fundInfo.minInvestment)}`,
      });
      return;
    }

    // Add to activity feed
    addActivity({
      type: 'investment',
      title: fundInfo.name,
      amount: amount,
      description: language === 'fr' 
        ? `Achat de fonds d'investissement`
        : `Investment fund purchase`,
      status: 'completed',
      icon: '📈',
    });

    // Show success toast
    toast.success(language === 'fr' ? 'Investissement réussi!' : 'Investment Successful!', {
      description: `${formatCurrency(amount)} ${language === 'fr' ? 'investi dans' : 'invested in'} ${fundInfo.name}`,
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });

    // Navigate to investments
    setTimeout(() => {
      setCurrentScreen('my-investments');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-4 safe-area-inset-top">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button
            onClick={() => setCurrentScreen('invest')}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2>{fundInfo.name}</h2>
            <p className="text-sm text-primary-foreground/80">{fundInfo.type} • {fundInfo.returns}% p.a.</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 max-w-lg mx-auto space-y-4 pb-8"
      >
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="text-2xl text-success mb-1">↑{fundInfo.returns}%</div>
            <div className="text-xs text-muted-foreground">Returns p.a.</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl text-foreground mb-1">{fundInfo.type.split(' ')[0]}</div>
            <div className="text-xs text-muted-foreground">Risk Level</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl text-foreground mb-1">{formatCurrency(fundInfo.minInvestment)}</div>
            <div className="text-xs text-muted-foreground">Minimum</div>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="p-5">
          <h4 className="text-foreground mb-4">6-Month Performance</h4>
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

        {/* Tabs */}
        <Card className="p-5">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div>
                <h4 className="text-foreground mb-2">About This Fund</h4>
                <p className="text-sm text-muted-foreground">{fundInfo.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Fund Manager</span>
                  <span className="text-sm font-medium text-foreground">{fundInfo.manager}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Inception Date</span>
                  <span className="text-sm font-medium text-foreground">{fundInfo.inception}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Assets Under Management</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(2500000000)}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="holdings" className="space-y-3">
              {['Dangote Cement', 'MTN Group', 'Safaricom', 'Standard Bank', 'Equity Bank'].map((stock, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-foreground">{stock}</span>
                  <span className="text-sm font-medium text-success">+{(Math.random() * 10 + 5).toFixed(1)}%</span>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="risks" className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                <Info className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground mb-1">Market Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    The value of your investment may go down as well as up due to market conditions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground mb-1">Regulated & Insured</h4>
                  <p className="text-sm text-muted-foreground">
                    This fund is regulated by the Securities and Exchange Commission and your investment is protected.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Investment Form */}
        <Card className="p-5">
          <h4 className="text-foreground mb-4">Invest Now</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Investment Amount</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder={`Minimum ${formatCurrency(fundInfo.minInvestment)}`}
                  className="pl-10 h-12 rounded-xl"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                />
              </div>
            </div>

            {investAmount && parseFloat(investAmount) >= fundInfo.minInvestment && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-secondary rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Projected annual return</span>
                  <span className="font-medium text-success">
                    {formatCurrency(parseFloat(investAmount) * (fundInfo.returns / 100))}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated value in 1 year</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(parseFloat(investAmount) * (1 + fundInfo.returns / 100))}
                  </span>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleInvest}
              disabled={!investAmount || parseFloat(investAmount) < fundInfo.minInvestment}
              className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
            >
              Invest {investAmount && formatCurrency(parseFloat(investAmount))}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
