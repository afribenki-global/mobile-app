import { motion } from 'motion/react';
import { useState } from 'react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TrendingUp, TrendingDown, BarChart3, Building2, DollarSign, Globe, BookOpen, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function MarketInsightsScreen() {
  const { setCurrentScreen, setSelectedArticleId, language } = useApp();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Nigerian Stock Exchange (NGX) Market Data
  const ngxMarketData = {
    allShareIndex: 104823.45,
    indexChange: 1.24,
    marketCap: '₦56.8T',
    volume: '428.5M',
    value: '₦8.2B',
    deals: 8456,
    topGainers: [
      { symbol: 'DANGCEM', price: 485.20, change: 3.45, sector: 'Industrial Goods' },
      { symbol: 'MTNN', price: 298.50, change: 2.18, sector: 'ICT' },
      { symbol: 'BUACEMENT', price: 122.40, change: 2.95, sector: 'Industrial Goods' },
      { symbol: 'AIRTELAFRI', price: 2156.00, change: 1.87, sector: 'ICT' },
      { symbol: 'NESTLE', price: 1580.00, change: 1.65, sector: 'Consumer Goods' },
    ],
    topLosers: [
      { symbol: 'GUINNESS', price: 58.40, change: -2.15, sector: 'Consumer Goods' },
      { symbol: 'FBNH', price: 24.15, change: -1.82, sector: 'Banking' },
      { symbol: 'UBA', price: 35.20, change: -1.45, sector: 'Banking' },
      { symbol: 'ZENITHBANK', price: 48.90, change: -0.98, sector: 'Banking' },
      { symbol: 'FLOURMILL', price: 42.75, change: -0.85, sector: 'Consumer Goods' },
    ],
  };

  // SEC Nigeria Investor Education Insights
  const secInsights = [
    {
      id: 'sec1',
      title: 'Understanding the Nigerian Capital Market',
      category: 'Education',
      description: 'Learn about the structure, participants, and regulatory framework of Nigeria\'s capital market.',
      readTime: '8 min',
      icon: Building2,
      color: 'bg-blue-500',
      content: [
        'The Nigerian capital market is regulated by the Securities and Exchange Commission (SEC)',
        'Key market segments include equities, bonds, collective investment schemes, and commodities',
        'The Nigerian Exchange (NGX) is the primary stock exchange',
        'Market capitalization exceeds ₦56 trillion as of 2025',
      ]
    },
    {
      id: 'sec2',
      title: 'Investor Protection Guidelines',
      category: 'Regulation',
      description: 'Essential protections and rights every Nigerian investor should know.',
      readTime: '6 min',
      icon: AlertCircle,
      color: 'bg-orange-500',
      content: [
        'All capital market operators must be licensed by SEC',
        'Investors have the right to fair treatment and full disclosure',
        'SEC maintains an Investor Complaints Management Framework',
        'Know Your Customer (KYC) requirements protect against fraud',
      ]
    },
    {
      id: 'sec3',
      title: 'Investment Products Overview',
      category: 'Products',
      description: 'Explore various investment products available in the Nigerian market.',
      readTime: '10 min',
      icon: BarChart3,
      color: 'bg-green-500',
      content: [
        'Equities (stocks) - ownership stakes in companies',
        'Fixed income securities (bonds) - debt instruments',
        'Mutual funds - pooled investment vehicles',
        'REITs - real estate investment trusts',
        'ETFs - exchange traded funds',
      ]
    },
    {
      id: 'sec4',
      title: 'Market Surveillance & Compliance',
      category: 'Regulation',
      description: 'How SEC ensures fair, transparent, and efficient capital markets.',
      readTime: '7 min',
      icon: FileText,
      color: 'bg-purple-500',
      content: [
        'Real-time market surveillance systems monitor trading activities',
        'Insider trading and market manipulation are strictly prohibited',
        'Regular disclosure requirements for listed companies',
        'Continuous market oversight and enforcement actions',
      ]
    },
  ];

  // Sector Performance
  const sectorPerformance = [
    { name: 'Banking', performance: -0.45, ytd: 12.3, color: 'text-red-500' },
    { name: 'Industrial Goods', performance: 2.85, ytd: 28.7, color: 'text-green-500' },
    { name: 'ICT', performance: 1.92, ytd: 45.2, color: 'text-green-500' },
    { name: 'Consumer Goods', performance: 0.35, ytd: 8.9, color: 'text-green-500' },
    { name: 'Oil & Gas', performance: -1.25, ytd: -5.4, color: 'text-red-500' },
    { name: 'Insurance', performance: 1.15, ytd: 15.6, color: 'text-green-500' },
  ];

  // Market News & Updates
  const marketNews = [
    {
      id: 'news1',
      title: 'NGX All-Share Index Hits 105,000 Points',
      date: 'Oct 3, 2025',
      category: 'Market Update',
      summary: 'The Nigerian Exchange All-Share Index crossed the 105,000 threshold, driven by gains in banking and industrial stocks.',
    },
    {
      id: 'news2',
      title: 'SEC Approves New ETF Listings',
      date: 'Oct 2, 2025',
      category: 'Regulatory',
      summary: 'Securities and Exchange Commission has approved three new Exchange Traded Funds for listing on the NGX.',
    },
    {
      id: 'news3',
      title: 'Foreign Portfolio Investment Rises 15%',
      date: 'Oct 1, 2025',
      category: 'Investment Flow',
      summary: 'Foreign investors increased their participation in Nigerian equities by 15% in Q3 2025.',
    },
    {
      id: 'news4',
      title: 'SEC Launches Digital Investor Education Platform',
      date: 'Sep 30, 2025',
      category: 'Education',
      summary: 'New online platform provides free educational resources for Nigerian investors at all levels.',
    },
  ];

  const handleInsightClick = (insight: typeof secInsights[0]) => {
    toast.success(`Opening: ${insight.title}`);
    // In a real app, this would navigate to detailed content
  };

  const handleNewsClick = (news: typeof marketNews[0]) => {
    toast.info(`Reading: ${news.title}`);
    // In a real app, this would navigate to full article
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar 
        title={language === 'fr' ? 'Aperçus du marché' : 'Market Insights'} 
        showBack 
        onBack={() => setCurrentScreen('explore')} 
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        {/* Market Overview Card */}
        <div className="p-4">
          <Card className="p-5 bg-gradient-to-br from-primary to-accent">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-white/80">NGX All-Share Index</p>
                <h2 className="text-white mt-1">{ngxMarketData.allShareIndex.toLocaleString()}</h2>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                ngxMarketData.indexChange > 0 ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {ngxMarketData.indexChange > 0 ? (
                  <TrendingUp className="w-4 h-4 text-white" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-white" />
                )}
                <span className="text-white">{Math.abs(ngxMarketData.indexChange)}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-white/70">Market Cap</p>
                <p className="text-white mt-1">{ngxMarketData.marketCap}</p>
              </div>
              <div>
                <p className="text-xs text-white/70">Volume</p>
                <p className="text-white mt-1">{ngxMarketData.volume}</p>
              </div>
              <div>
                <p className="text-xs text-white/70">Value</p>
                <p className="text-white mt-1">{ngxMarketData.value}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="px-4">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="movers">Movers</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="education">SEC Edu</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-foreground mb-3 px-1">Market News</h3>
              <div className="space-y-3">
                {marketNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleNewsClick(news)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {news.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{news.date}</span>
                      </div>
                      <h4 className="text-foreground mb-2">{news.title}</h4>
                      <p className="text-sm text-muted-foreground">{news.summary}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-foreground mb-3 px-1">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card 
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setCurrentScreen('stocks')}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-3">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-foreground">Browse Stocks</h4>
                  <p className="text-sm text-muted-foreground mt-1">Explore NGX listings</p>
                </Card>
                
                <Card 
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setCurrentScreen('bonds')}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-foreground">Government Bonds</h4>
                  <p className="text-sm text-muted-foreground mt-1">Fixed income options</p>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Movers Tab */}
          <TabsContent value="movers" className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="text-foreground">Top Gainers</h3>
              </div>
              <div className="space-y-2">
                {ngxMarketData.topGainers.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-foreground">{stock.symbol}</h4>
                          <p className="text-xs text-muted-foreground">{stock.sector}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-foreground">₦{stock.price.toFixed(2)}</p>
                          <div className="flex items-center gap-1 text-green-500">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-sm">+{stock.change}%</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <h3 className="text-foreground">Top Losers</h3>
              </div>
              <div className="space-y-2">
                {ngxMarketData.topLosers.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-foreground">{stock.symbol}</h4>
                          <p className="text-xs text-muted-foreground">{stock.sector}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-foreground">₦{stock.price.toFixed(2)}</p>
                          <div className="flex items-center gap-1 text-red-500">
                            <TrendingDown className="w-3 h-3" />
                            <span className="text-sm">{stock.change}%</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sectors Tab */}
          <TabsContent value="sectors" className="space-y-3">
            <div className="px-1 mb-4">
              <h3 className="text-foreground mb-1">Sector Performance</h3>
              <p className="text-sm text-muted-foreground">Daily change and year-to-date returns</p>
            </div>
            {sectorPerformance.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-foreground">{sector.name}</h4>
                    <span className={sector.color}>
                      {sector.performance > 0 ? '+' : ''}{sector.performance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">YTD Return</span>
                    <span className={`text-sm ${sector.ytd > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {sector.ytd > 0 ? '+' : ''}{sector.ytd}%
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* SEC Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <div className="px-1 mb-4">
              <h3 className="text-foreground mb-1">SEC Investor Education</h3>
              <p className="text-sm text-muted-foreground">
                Resources from the Securities and Exchange Commission Nigeria
              </p>
            </div>
            
            {secInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleInsightClick(insight)}
                  >
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 rounded-xl ${insight.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-foreground flex-1">{insight.title}</h4>
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                        </div>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {insight.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground mb-3">
                          {insight.description}
                        </p>
                        <div className="space-y-1">
                          {insight.content.slice(0, 2).map((point, i) => (
                            <p key={i} className="text-xs text-muted-foreground">
                              • {point}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          📖 {insight.readTime} read
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            <Card className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-2">Visit SEC Nigeria</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Access more investor education resources and market information at sec.gov.ng
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <BottomNav />
    </div>
  );
}
