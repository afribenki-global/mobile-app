import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowUpRight, ArrowDownRight, PiggyBank, TrendingUp, Users, Eye, EyeOff, Sparkles, Clock, Wallet } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export function HomeScreen() {
  const { formatCurrency, user, setCurrentScreen, t, language } = useApp();
  const { getRecentActivities } = useActivity();
  const [showBalance, setShowBalance] = useState(true);
  
  const recentActivities = getRecentActivities(5);

  const portfolioData = [
    { month: 'Jan', value: 280000 },
    { month: 'Feb', value: 310000 },
    { month: 'Mar', value: 295000 },
    { month: 'Apr', value: 350000 },
    { month: 'May', value: 420000 },
    { month: 'Jun', value: 450000 },
  ];

  const quickActions = [
    { id: 'savings-plan', icon: PiggyBank, label: 'Create Plan', color: 'bg-primary', screen: 'create-savings-plan' },
    { id: 'invest', icon: TrendingUp, label: 'Invest', color: 'bg-accent', screen: 'mutual-funds' },
    { id: 'circles', icon: Users, label: 'Circles', color: 'bg-purple-500', screen: 'circles' },
    { id: 'wallet', icon: Wallet, label: 'Wallet', color: 'bg-warning', screen: 'wallet' },
  ];

  const recentTransactions = [
    { id: 1, type: 'credit', name: 'Savings Interest', amount: 5430, date: 'Today' },
    { id: 2, type: 'debit', name: 'Auto Save - Emergency', amount: -10000, date: 'Yesterday' },
    { id: 3, type: 'credit', name: 'Money Market Returns', amount: 12500, date: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary to-accent p-6 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm opacity-90">Total Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <div className="mb-6">
            {showBalance ? (
              <h1 className="text-white text-3xl">{formatCurrency(user?.balance || 0)}</h1>
            ) : (
              <h1 className="text-white text-3xl">••••••</h1>
            )}
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="opacity-90">Portfolio Value:</span>
              <span className="font-medium">{showBalance ? formatCurrency(user?.portfolioValue || 0) : '••••••'}</span>
              <span className="text-success bg-white/20 px-2 py-0.5 rounded-full text-xs">+15.2%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCurrentScreen('top-up')}
              className="bg-white/20 backdrop-blur-sm py-3 rounded-xl hover:bg-white/30 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowDownRight className="w-5 h-5" />
                <span>{t('topUp') || 'Top Up'}</span>
              </div>
            </button>
            <button
              onClick={() => setCurrentScreen('withdraw')}
              className="bg-white/20 backdrop-blur-sm py-3 rounded-xl hover:bg-white/30 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                <span>{t('withdraw') || 'Withdraw'}</span>
              </div>
            </button>
          </div>
        </Card>

        {/* Portfolio Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground">Portfolio Growth</h3>
            <span className="text-sm text-muted-foreground">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A676" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00A676" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
              <XAxis dataKey="month" stroke="#6c757d" />
              <YAxis stroke="#6c757d" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#00A676" fill="url(#portfolioGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-foreground mb-3 px-1">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onClick={() => setCurrentScreen(action.screen)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs text-foreground text-center">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground">{t('recentTransactions')}</h3>
            <button 
              onClick={() => setCurrentScreen('transaction-history')}
              className="text-sm text-primary hover:underline"
            >
              {t('viewAll')}
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.length > 0 ? recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10">
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <div className="font-medium text-success">
                      +{formatCurrency(activity.amount)}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(activity.timestamp).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                  </div>
                </div>
              </div>
            )) : recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownRight className="w-5 h-5 text-success" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{transaction.name}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-medium ${
                  transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Investment Opportunities */}
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-foreground mb-1">Recommended for You</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Based on your goals, we recommend the Equity Growth Fund
              </p>
              <Button
                onClick={() => setCurrentScreen('mutual-funds')}
                size="sm"
                className="bg-warning hover:bg-warning/90 text-white"
              >
                View Details
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
