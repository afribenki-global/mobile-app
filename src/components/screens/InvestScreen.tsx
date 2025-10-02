import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, DollarSign, Shield, Building, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';

export function InvestScreen() {
  const { formatCurrency, setCurrentScreen } = useApp();

  const mutualFunds = [
    {
      id: 1,
      name: 'Money Market Fund',
      type: 'Low Risk',
      returns: 12.5,
      minInvestment: 5000,
      icon: Shield,
      color: 'bg-primary',
      description: 'Safe, liquid investment with steady returns',
      trend: 'up',
    },
    {
      id: 2,
      name: 'Equity Growth Fund',
      type: 'High Risk',
      returns: 24.3,
      minInvestment: 10000,
      icon: TrendingUp,
      color: 'bg-accent',
      description: 'Invest in top-performing stocks',
      trend: 'up',
    },
    {
      id: 3,
      name: 'Fixed Income Fund',
      type: 'Medium Risk',
      returns: 15.8,
      minInvestment: 10000,
      icon: Building,
      color: 'bg-purple-500',
      description: 'Government and corporate bonds',
      trend: 'up',
    },
    {
      id: 4,
      name: 'Halal Fund',
      type: 'Medium Risk',
      returns: 18.2,
      minInvestment: 10000,
      icon: Zap,
      color: 'bg-success',
      description: 'Sharia-compliant investments',
      trend: 'up',
      badge: 'Halal Certified',
    },
  ];

  const portfolio = {
    totalInvested: 350000,
    currentValue: 420000,
    returns: 70000,
    returnPercentage: 20,
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Good Morning" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Portfolio Summary */}
        <Card className="p-6 bg-gradient-to-br from-accent to-success text-white border-0">
          <div className="mb-4">
            <p className="text-sm text-white/80 mb-1">Investment Portfolio</p>
            <h2 className="text-white text-3xl mb-2">{formatCurrency(portfolio.currentValue)}</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{portfolio.returnPercentage}%
              </Badge>
              <span className="text-sm text-white/90">
                Returns: {formatCurrency(portfolio.returns)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-white/70 mb-1">Total Invested</p>
              <p className="font-medium">{formatCurrency(portfolio.totalInvested)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-white/70 mb-1">Active Funds</p>
              <p className="font-medium">4 Funds</p>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setCurrentScreen('mutual-funds')}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-foreground">Mutual Funds</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('stocks')}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-foreground">Stocks</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('bonds')}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-foreground">Bonds</p>
          </button>
        </div>

        {/* Available Funds */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground">Available Funds</h3>
            <button className="text-sm text-primary hover:underline">See all</button>
          </div>
          
          <div className="space-y-3">
            {mutualFunds.map((fund, index) => {
              const Icon = fund.icon;
              return (
                <motion.div
                  key={fund.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="p-5 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setCurrentScreen('fund-details')}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${fund.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="text-foreground mb-1">{fund.name}</h4>
                            {fund.badge && (
                              <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-600">
                                ✓ {fund.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-success">
                              <TrendingUp className="w-4 h-4" />
                              <span className="font-medium">{fund.returns}%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">p.a.</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{fund.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {fund.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Min: {formatCurrency(fund.minInvestment)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Educational Banner */}
        <Card className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h4 className="text-foreground mb-2">📚 New to Investing?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Learn the basics and build your investment strategy
          </p>
          <Button
            onClick={() => setCurrentScreen('explore')}
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Start Learning
          </Button>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
