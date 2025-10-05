import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function CryptoInvestScreen() {
  const { formatCurrency, setCurrentScreen, language } = useApp();

  const cryptoAssets = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 45230000, change: 5.2, marketCap: '850B', volume: '35B', color: 'bg-orange-500' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2890000, change: 3.8, marketCap: '340B', volume: '18B', color: 'bg-blue-500' },
    { id: 3, name: 'Cardano', symbol: 'ADA', price: 450, change: -1.2, marketCap: '15B', volume: '1.2B', color: 'bg-purple-500' },
    { id: 4, name: 'Solana', symbol: 'SOL', price: 95000, change: 8.5, marketCap: '28B', volume: '2.5B', color: 'bg-green-500' },
    { id: 5, name: 'Polkadot', symbol: 'DOT', price: 7800, change: 2.1, marketCap: '9B', volume: '850M', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white p-4 safe-area-inset-top">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setCurrentScreen('invest')}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-white">{language === 'fr' ? 'Investissements Crypto' : 'Crypto Investments'}</h2>
            <p className="text-white/80 text-sm">
              {language === 'fr' ? 'Achetez et vendez des cryptomonnaies' : 'Buy and sell cryptocurrencies'}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        <Card className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="text-foreground mb-1">{language === 'fr' ? 'Avertissement' : 'Risk Warning'}</h4>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' 
                  ? 'Les investissements en crypto sont très volatils. Investissez uniquement ce que vous pouvez vous permettre de perdre.'
                  : 'Crypto investments are highly volatile. Only invest what you can afford to lose.'}
              </p>
            </div>
          </div>
        </Card>

        <div>
          <h3 className="text-foreground mb-3 px-1">
            {language === 'fr' ? 'Cryptomonnaies populaires' : 'Popular Cryptocurrencies'}
          </h3>
          <div className="space-y-3">
            {cryptoAssets.map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-5 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setCurrentScreen('new-investment')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${crypto.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                      <Bitcoin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h4 className="text-foreground">{crypto.name}</h4>
                          <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">
                            {formatCurrency(crypto.price)}
                          </div>
                          <div className={`flex items-center gap-1 text-sm ${
                            crypto.change >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            {crypto.change >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span>{crypto.change >= 0 ? '+' : ''}{crypto.change}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{language === 'fr' ? 'Cap:' : 'Market Cap:'} ${crypto.marketCap}</span>
                        <span>•</span>
                        <span>{language === 'fr' ? 'Vol:' : 'Vol:'} ${crypto.volume}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
