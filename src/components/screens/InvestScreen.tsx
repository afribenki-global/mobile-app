import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, DollarSign, Shield, Building, Zap, Plus, Bitcoin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';

export function InvestScreen() {
  const { formatCurrency, setCurrentScreen, language } = useApp();
  const [currentPortfolio, setCurrentPortfolio] = useState<'fiat' | 'crypto'>('fiat');

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

  const fiatPortfolio = {
    totalInvested: 350000,
    currentValue: 420000,
    returns: 70000,
    returnPercentage: 20,
    activeFunds: 4,
  };

  const cryptoPortfolio = {
    totalInvested: 150000,
    currentValue: 195000,
    returns: 45000,
    returnPercentage: 30,
    activeFunds: 3,
  };

  const portfolio = currentPortfolio === 'fiat' ? fiatPortfolio : cryptoPortfolio;

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title={language === 'fr' ? 'Investir' : 'Invest'} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Portfolio Cards - Swipeable */}
        <div className="relative">
          <motion.div
            key={currentPortfolio}
            initial={{ opacity: 0, x: currentPortfolio === 'fiat' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`p-6 ${currentPortfolio === 'fiat' ? 'bg-gradient-to-br from-accent to-success' : 'bg-gradient-to-br from-orange-500 to-purple-600'} text-white border-0 relative`}>
              {/* Portfolio Type Indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {currentPortfolio === 'crypto' && <Bitcoin className="w-5 h-5" />}
                  <p className="text-sm text-white/80">
                    {currentPortfolio === 'fiat' 
                      ? (language === 'fr' ? 'Portefeuille Fiat' : 'Fiat Portfolio')
                      : (language === 'fr' ? 'Portefeuille Crypto' : 'Crypto Portfolio')}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentScreen('new-investment')}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <h2 className="text-white text-3xl mb-2">{formatCurrency(portfolio.currentValue)}</h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-white/20 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{portfolio.returnPercentage}%
                  </Badge>
                  <span className="text-sm text-white/90">
                    {language === 'fr' ? 'Rendements:' : 'Returns:'} {formatCurrency(portfolio.returns)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-white/70 mb-1">{language === 'fr' ? 'Total investi' : 'Total Invested'}</p>
                  <p className="font-medium">{formatCurrency(portfolio.totalInvested)}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-white/70 mb-1">{language === 'fr' ? 'Actifs' : 'Active'}</p>
                  <p className="font-medium">{portfolio.activeFunds} {language === 'fr' ? 'Fonds' : 'Funds'}</p>
                </div>
              </div>
              
              <Button
                onClick={() => setCurrentScreen('my-investments')}
                className="w-full mt-4 bg-white text-primary hover:bg-white/90 h-10"
              >
                <span className="text-primary">{language === 'fr' ? 'Voir mes investissements' : 'View My Investments'}</span>
              </Button>

              {/* Swipe Indicators */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPortfolio('fiat')}
                  className={`h-1.5 rounded-full transition-all ${
                    currentPortfolio === 'fiat' ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                />
                <button
                  onClick={() => setCurrentPortfolio('crypto')}
                  className={`h-1.5 rounded-full transition-all ${
                    currentPortfolio === 'crypto' ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                />
              </div>
            </Card>
          </motion.div>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2">
            <button
              onClick={() => setCurrentPortfolio('fiat')}
              className={`p-2 bg-white/90 rounded-full shadow-lg pointer-events-auto transition-opacity ${
                currentPortfolio === 'fiat' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => setCurrentPortfolio('crypto')}
              className={`p-2 bg-white/90 rounded-full shadow-lg pointer-events-auto transition-opacity ${
                currentPortfolio === 'crypto' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => setCurrentScreen('mutual-funds')}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-foreground">{language === 'fr' ? 'Fonds' : 'Mutual Funds'}</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('stocks')}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-foreground">{language === 'fr' ? 'Actions' : 'Stocks'}</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('bonds')}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-foreground">{language === 'fr' ? 'Obligations' : 'Bonds'}</p>
          </button>

          <button
            onClick={() => setCurrentScreen('crypto-invest')}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bitcoin className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-foreground">{language === 'fr' ? 'Crypto' : 'Crypto'}</p>
          </button>
        </div>

        {/* Available Funds */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground">
              {currentPortfolio === 'fiat' 
                ? (language === 'fr' ? 'Fonds disponibles' : 'Available Funds')
                : (language === 'fr' ? 'Cryptomonnaies' : 'Cryptocurrencies')}
            </h3>
            <button className="text-sm text-primary hover:underline">{language === 'fr' ? 'Voir tout' : 'See all'}</button>
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
          <h4 className="text-foreground mb-2">📚 {language === 'fr' ? 'Nouveau dans l\'investissement?' : 'New to Investing?'}</h4>
          <p className="text-sm text-muted-foreground mb-3">
            {language === 'fr' 
              ? 'Apprenez les bases et construisez votre stratégie d\'investissement'
              : 'Learn the basics and build your investment strategy'}
          </p>
          <Button
            onClick={() => setCurrentScreen('explore')}
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            {language === 'fr' ? 'Commencer à apprendre' : 'Start Learning'}
          </Button>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
