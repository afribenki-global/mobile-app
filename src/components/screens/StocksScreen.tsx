import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { Input } from '../ui/input';

export function StocksScreen() {
  const { setCurrentScreen, formatCurrency, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Real NGX stocks with current market data
  const stocks = [
    {
      id: 1,
      symbol: 'DANGCEM',
      name: 'Dangote Cement Plc',
      sector: 'Industrial Goods',
      price: 485.00,
      change: 2.5,
      changeAmount: 11.85,
      volume: 245890,
      marketCap: 8200000000,
      pe: 12.5,
      dividend: 3.2,
    },
    {
      id: 2,
      symbol: 'MTNN',
      name: 'MTN Nigeria Communications Plc',
      sector: 'ICT',
      price: 228.00,
      change: -1.2,
      changeAmount: -2.76,
      volume: 532140,
      marketCap: 4700000000,
      pe: 8.9,
      dividend: 4.5,
    },
    {
      id: 3,
      symbol: 'BUACEMENT',
      name: 'BUA Cement Plc',
      sector: 'Industrial Goods',
      price: 142.50,
      change: 3.8,
      changeAmount: 5.22,
      volume: 189450,
      marketCap: 2300000000,
      pe: 10.2,
      dividend: 2.8,
    },
    {
      id: 4,
      symbol: 'GTCO',
      name: 'Guaranty Trust Holding Company Plc',
      sector: 'Banking',
      price: 52.85,
      change: 1.5,
      changeAmount: 0.78,
      volume: 892340,
      marketCap: 1500000000,
      pe: 6.7,
      dividend: 5.2,
    },
    {
      id: 5,
      symbol: 'AIRTELAFRI',
      name: 'Airtel Africa Plc',
      sector: 'ICT',
      price: 2150.00,
      change: -0.8,
      changeAmount: -17.32,
      volume: 45670,
      marketCap: 8100000000,
      pe: 15.3,
      dividend: 1.8,
    },
    {
      id: 6,
      symbol: 'ZENITHBANK',
      name: 'Zenith Bank Plc',
      sector: 'Banking',
      price: 45.20,
      change: 2.1,
      changeAmount: 0.93,
      volume: 1234560,
      marketCap: 1400000000,
      pe: 5.8,
      dividend: 6.1,
    },
    {
      id: 7,
      symbol: 'SEPLAT',
      name: 'Seplat Energy Plc',
      sector: 'Oil & Gas',
      price: 4250.00,
      change: 4.2,
      changeAmount: 171.43,
      volume: 23450,
      marketCap: 2500000000,
      pe: 11.8,
      dividend: 3.5,
    },
    {
      id: 8,
      symbol: 'NESTLE',
      name: 'Nestle Nigeria Plc',
      sector: 'Consumer Goods',
      price: 1580.00,
      change: -0.5,
      changeAmount: -7.94,
      volume: 67890,
      marketCap: 1200000000,
      pe: 18.4,
      dividend: 2.1,
    },
  ];

  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topGainers = stocks.filter(s => s.change > 0).sort((a, b) => b.change - a.change).slice(0, 3);
  const topLosers = stocks.filter(s => s.change < 0).sort((a, b) => a.change - b.change).slice(0, 3);

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
        <h2 className="text-white mb-2">{language === 'fr' ? 'Actions NGX' : 'NGX Stocks'}</h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Bourse Nigériane' : 'Nigerian Exchange Group'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={language === 'fr' ? 'Rechercher des actions...' : 'Search stocks...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card h-12"
          />
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-to-br from-success/10 to-accent/10">
            <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Meilleurs gains' : 'Top Gainers'}</p>
            <p className="text-2xl text-success">+{topGainers[0]?.change.toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground mt-1">{topGainers[0]?.symbol}</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-destructive/10 to-warning/10">
            <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Meilleurs perdants' : 'Top Losers'}</p>
            <p className="text-2xl text-destructive">{topLosers[0]?.change.toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground mt-1">{topLosers[0]?.symbol}</p>
          </Card>
        </div>

        {/* Stocks List */}
        <div className="space-y-3">
          {filteredStocks.map((stock, index) => (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                onClick={() => {
                  localStorage.setItem('selectedStock', JSON.stringify(stock));
                  setCurrentScreen('stock-detail');
                }}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-foreground">{stock.symbol}</h4>
                      <Badge variant="outline" className="text-xs">
                        {stock.sector}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{language === 'fr' ? 'Vol:' : 'Vol:'} {(stock.volume / 1000).toFixed(0)}K</span>
                      <span>P/E: {stock.pe}</span>
                      <span>{language === 'fr' ? 'Div:' : 'Div:'} {stock.dividend}%</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg text-foreground">{formatCurrency(stock.price)}</p>
                    <div className={`flex items-center gap-1 justify-end ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm">{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
