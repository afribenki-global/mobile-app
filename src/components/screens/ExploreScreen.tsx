import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { 
  BookOpen, 
  Calculator, 
  TrendingUp, 
  Award, 
  Video, 
  Lightbulb, 
  Target,
  Search,
  X
} from 'lucide-react';
import { Badge } from '../ui/badge';

interface SearchableItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  type: 'article' | 'tool' | 'calculator' | 'guide' | 'screen' | 'video';
  screen?: string;
  articleId?: string;
  keywords: string[];
}

export function ExploreScreen() {
  const { setCurrentScreen, setSelectedArticleId, t, language, setPreviousScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Comprehensive searchable content index
  const searchableContent: SearchableItem[] = useMemo(() => [
    // Investment Basics Articles
    {
      id: 'basics-1',
      title: 'What is Investing?',
      description: 'Learn the fundamentals of investing and how to get started',
      category: 'Investment Basics',
      icon: '📚',
      type: 'article',
      screen: 'article-reader',
      articleId: 'basics-1',
      keywords: ['invest', 'basics', 'fundamentals', 'getting started', 'introduction', 'beginner']
    },
    {
      id: 'basics-2',
      title: 'Understanding Risk and Return',
      description: 'How risk and return work together in investing',
      category: 'Investment Basics',
      icon: '⚖️',
      type: 'article',
      screen: 'article-reader',
      articleId: 'basics-2',
      keywords: ['risk', 'return', 'roi', 'profit', 'loss', 'volatility']
    },
    {
      id: 'basics-3',
      title: 'Diversification Explained',
      description: 'Why you should not put all eggs in one basket',
      category: 'Investment Basics',
      icon: '🥚',
      type: 'article',
      screen: 'article-reader',
      articleId: 'basics-3',
      keywords: ['diversification', 'portfolio', 'spread', 'allocation', 'balance']
    },
    {
      id: 'basics-4',
      title: 'Types of Investment Assets',
      description: 'Stocks, bonds, mutual funds, and more',
      category: 'Investment Basics',
      icon: '💼',
      type: 'article',
      screen: 'article-reader',
      articleId: 'basics-4',
      keywords: ['stocks', 'bonds', 'mutual funds', 'etf', 'assets', 'securities']
    },

    // Featured Articles
    {
      id: 'article-1',
      title: 'How to Build an Emergency Fund in 6 Months',
      description: 'Step-by-step guide to creating a financial safety net',
      category: 'Savings',
      icon: '💰',
      type: 'article',
      screen: 'article-detail',
      articleId: '1',
      keywords: ['emergency', 'fund', 'savings', 'safety', 'financial planning', 'security']
    },
    {
      id: 'article-2',
      title: 'Understanding Mutual Funds: A Beginner\'s Guide',
      description: 'Everything you need to know about mutual fund investing',
      category: 'Investing',
      icon: '📈',
      type: 'article',
      screen: 'article-detail',
      articleId: '2',
      keywords: ['mutual funds', 'investing', 'portfolio', 'fund manager', 'diversification']
    },
    {
      id: 'article-3',
      title: 'Halal Investment Options in Africa',
      description: 'Sharia-compliant investment opportunities',
      category: 'Islamic Finance',
      icon: '🕌',
      type: 'article',
      screen: 'article-detail',
      articleId: '3',
      keywords: ['halal', 'islamic', 'sharia', 'compliant', 'ethical', 'religious']
    },
    {
      id: 'article-4',
      title: 'Comparing Interest Rates: Banks vs AfriBenki',
      description: 'See how we stack up against traditional banking',
      category: 'Analysis',
      icon: '🏦',
      type: 'article',
      screen: 'article-detail',
      articleId: '4',
      keywords: ['interest', 'rates', 'banks', 'comparison', 'savings', 'returns']
    },

    // Market Insights
    {
      id: 'insight-1',
      title: 'African Markets Overview',
      description: 'Latest trends in African stock markets',
      category: 'Market Insights',
      icon: '🌍',
      type: 'article',
      screen: 'market-insights',
      keywords: ['africa', 'markets', 'stocks', 'trends', 'economy', 'analysis']
    },
    {
      id: 'insight-2',
      title: 'Tech Sector Performance',
      description: 'How technology stocks are performing',
      category: 'Market Insights',
      icon: '💻',
      type: 'article',
      screen: 'market-insights',
      keywords: ['tech', 'technology', 'sector', 'performance', 'stocks', 'growth']
    },
    {
      id: 'insight-3',
      title: 'Commodity Market Update',
      description: 'Gold, oil, and agricultural commodities',
      category: 'Market Insights',
      icon: '🛢️',
      type: 'article',
      screen: 'market-insights',
      keywords: ['commodity', 'gold', 'oil', 'agriculture', 'resources', 'raw materials']
    },

    // Tools & Calculators
    {
      id: 'calc-savings',
      title: 'Savings Goal Calculator',
      description: 'Calculate how much to save to reach your goals',
      category: 'Calculators',
      icon: '🎯',
      type: 'calculator',
      screen: 'calculators',
      keywords: ['calculator', 'savings', 'goal', 'target', 'planning', 'budget']
    },
    {
      id: 'calc-retirement',
      title: 'Retirement Planner',
      description: 'Plan for a comfortable retirement',
      category: 'Calculators',
      icon: '👴',
      type: 'calculator',
      screen: 'calculators',
      keywords: ['retirement', 'pension', 'future', 'planning', 'savings', 'long-term']
    },
    {
      id: 'calc-investment',
      title: 'Investment Returns Calculator',
      description: 'Project your investment growth over time',
      category: 'Calculators',
      icon: '📊',
      type: 'calculator',
      screen: 'calculators',
      keywords: ['investment', 'returns', 'growth', 'compound', 'interest', 'projection']
    },
    {
      id: 'calc-loan',
      title: 'Loan Repayment Calculator',
      description: 'Calculate monthly loan payments',
      category: 'Calculators',
      icon: '💳',
      type: 'calculator',
      screen: 'calculators',
      keywords: ['loan', 'repayment', 'debt', 'payment', 'amortization', 'interest']
    },

    // Risk Assessment
    {
      id: 'risk-assessment',
      title: 'Investment Risk Assessment',
      description: 'Find your risk profile and get personalized recommendations',
      category: 'Tools',
      icon: '🎲',
      type: 'tool',
      screen: 'risk-assessment',
      keywords: ['risk', 'assessment', 'profile', 'quiz', 'tolerance', 'conservative', 'aggressive']
    },

    // Screens & Features
    {
      id: 'screen-mutual-funds',
      title: 'Mutual Funds',
      description: 'Browse and invest in curated mutual funds',
      category: 'Investment Products',
      icon: '📈',
      type: 'screen',
      screen: 'mutual-funds',
      keywords: ['mutual funds', 'invest', 'portfolio', 'growth', 'income', 'balanced']
    },
    {
      id: 'screen-stocks',
      title: 'Stock Market',
      description: 'Buy and sell African stocks',
      category: 'Investment Products',
      icon: '📊',
      type: 'screen',
      screen: 'stocks',
      keywords: ['stocks', 'shares', 'equity', 'market', 'trading', 'buy', 'sell']
    },
    {
      id: 'screen-bonds',
      title: 'Government Bonds',
      description: 'Invest in secure government bonds',
      category: 'Investment Products',
      icon: '🏛️',
      type: 'screen',
      screen: 'bonds',
      keywords: ['bonds', 'government', 'treasury', 'fixed income', 'secure', 'low risk']
    },
    {
      id: 'screen-crypto',
      title: 'Cryptocurrency',
      description: 'Invest in digital currencies',
      category: 'Investment Products',
      icon: '₿',
      type: 'screen',
      screen: 'crypto-invest',
      keywords: ['crypto', 'cryptocurrency', 'bitcoin', 'ethereum', 'digital', 'blockchain']
    },
    {
      id: 'screen-savings',
      title: 'Savings Plans',
      description: 'Create and manage your savings goals',
      category: 'Savings',
      icon: '🐷',
      type: 'screen',
      screen: 'save',
      keywords: ['savings', 'plan', 'goal', 'emergency fund', 'target', 'auto-save']
    },
    {
      id: 'screen-circles',
      title: 'Savings Circles',
      description: 'Join or create group savings circles',
      category: 'Social Savings',
      icon: '👥',
      type: 'screen',
      screen: 'circles',
      keywords: ['circles', 'group', 'social', 'rotation', 'susu', 'ajo', 'stokvels']
    },

    // Educational Videos
    {
      id: 'video-1',
      title: 'Getting Started with AfriBenki',
      description: 'Complete walkthrough of the platform',
      category: 'Video Tutorials',
      icon: '🎥',
      type: 'video',
      keywords: ['tutorial', 'getting started', 'walkthrough', 'guide', 'introduction', 'how to']
    },
    {
      id: 'video-2',
      title: 'How to Create a Savings Circle',
      description: 'Step-by-step circle creation guide',
      category: 'Video Tutorials',
      icon: '🎥',
      type: 'video',
      keywords: ['circles', 'tutorial', 'create', 'group savings', 'video', 'guide']
    },
    {
      id: 'video-3',
      title: 'Understanding Stock Market Basics',
      description: 'Learn how stock markets work',
      category: 'Video Tutorials',
      icon: '🎥',
      type: 'video',
      keywords: ['stocks', 'market', 'basics', 'tutorial', 'education', 'learning']
    },

    // Guides
    {
      id: 'guide-first-investment',
      title: 'Making Your First Investment',
      description: 'A complete beginner\'s guide to investing',
      category: 'Guides',
      icon: '🌱',
      type: 'guide',
      screen: 'investment-basics',
      keywords: ['first', 'investment', 'beginner', 'guide', 'start', 'new investor']
    },
    {
      id: 'guide-financial-freedom',
      title: 'Path to Financial Freedom',
      description: 'Long-term wealth building strategies',
      category: 'Guides',
      icon: '🗺️',
      type: 'guide',
      screen: 'investment-basics',
      keywords: ['financial freedom', 'wealth', 'independence', 'strategy', 'long-term', 'goals']
    },
    {
      id: 'guide-tax',
      title: 'Tax Guide for Investors',
      description: 'Understanding investment taxation in Africa',
      category: 'Guides',
      icon: '📋',
      type: 'guide',
      keywords: ['tax', 'taxation', 'capital gains', 'dividends', 'compliance', 'legal']
    },
  ], []);

  // Filter search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    
    return searchableContent.filter(item => {
      // Search in title
      if (item.title.toLowerCase().includes(query)) return true;
      
      // Search in description
      if (item.description.toLowerCase().includes(query)) return true;
      
      // Search in category
      if (item.category.toLowerCase().includes(query)) return true;
      
      // Search in keywords
      if (item.keywords.some(keyword => keyword.includes(query))) return true;
      
      return false;
    }).slice(0, 10); // Limit to 10 results
  }, [searchQuery, searchableContent]);

  const handleSearchItemClick = (item: SearchableItem) => {
    if (item.articleId) {
      setSelectedArticleId(item.articleId);
    }
    if (item.screen) {
      // Track previous screen for circles navigation
      if (item.screen === 'circles') {
        setPreviousScreen('explore');
      }
      setCurrentScreen(item.screen);
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const quickLinks = [
    { id: 'basics', name: t('investmentBasics'), icon: BookOpen, color: 'bg-primary', articles: 25, onClick: () => setCurrentScreen('investment-basics') },
    { id: 'calculators', name: t('calculators'), icon: Calculator, color: 'bg-accent', articles: 8, onClick: () => setCurrentScreen('calculators') },
    { id: 'market', name: t('marketInsights'), icon: TrendingUp, color: 'bg-purple-500', articles: 24, onClick: () => setCurrentScreen('market-insights') },
    { id: 'circles', name: t('circles'), icon: Target, color: 'bg-warning', articles: 8, onClick: () => { setPreviousScreen('explore'); setCurrentScreen('circles'); } },
  ];

  const featuredArticles = [
    {
      id: '1',
      title: 'How to Build an Emergency Fund in 6 Months',
      category: 'Savings',
      readTime: '5 min',
      image: '💰',
      featured: true,
      onClick: () => { setSelectedArticleId('1'); setCurrentScreen('article-detail'); },
    },
    {
      id: '2',
      title: 'Understanding Mutual Funds: A Beginner\'s Guide',
      category: 'Investing',
      readTime: '8 min',
      image: '📈',
      onClick: () => { setSelectedArticleId('2'); setCurrentScreen('article-detail'); },
    },
    {
      id: '3',
      title: 'Halal Investment Options in Africa',
      category: 'Islamic Finance',
      readTime: '6 min',
      image: '🕌',
      badge: 'Popular',
      onClick: () => { setSelectedArticleId('3'); setCurrentScreen('article-detail'); },
    },
    {
      id: '4',
      title: 'Comparing Interest Rates: Banks vs AfriBenki',
      category: 'Analysis',
      readTime: '4 min',
      image: '🏦',
      onClick: () => { setSelectedArticleId('4'); setCurrentScreen('article-detail'); },
    },
  ];

  const tools = [
    { id: 'savings-calc', name: t('calculators'), desc: language === 'fr' ? 'Calculez votre objectif d\'épargne' : 'Calculate your savings goal', icon: Calculator, onClick: () => setCurrentScreen('calculators') },
    { id: 'retirement-calc', name: language === 'fr' ? 'Planificateur de retraite' : 'Retirement Planner', desc: language === 'fr' ? 'Planifiez votre avenir' : 'Plan for your future', icon: Target, onClick: () => setCurrentScreen('calculators') },
    { id: 'risk-quiz', name: t('riskAssessment'), desc: language === 'fr' ? 'Trouvez votre profil de risque' : 'Find your risk profile', icon: Award, onClick: () => setCurrentScreen('risk-assessment') },
  ];

  const videos = [
    { id: 1, title: 'Getting Started with AfriBenki', duration: '3:45' },
    { id: 2, title: 'How to Create a Savings Circle', duration: '5:20' },
    { id: 3, title: 'Understanding Stock Market Basics', duration: '8:15' },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Explore & Learn" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-6"
      >
        {/* Search Bar with Dropdown */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
            <input
              type="text"
              placeholder="Search articles, guides, tools, insights..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.trim().length > 0);
              }}
              onFocus={() => setShowSearchResults(searchQuery.trim().length > 0)}
              className="w-full h-12 pl-12 pr-12 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto"
              >
                {searchResults.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSearchItemClick(item)}
                    className="w-full p-4 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-foreground truncate">{item.title}</h4>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {showSearchResults && searchQuery.trim() && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg p-8 text-center z-50"
              >
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="text-foreground mb-1">No results found</h4>
                <p className="text-sm text-muted-foreground">
                  Try searching for articles, calculators, or investment guides
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-foreground mb-3 px-1">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={category.onClick || undefined}
                  >
                    <div className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-foreground mb-1">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.articles} items</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Featured Articles */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground">Featured Articles</h3>
            <button className="text-sm text-primary hover:underline">See all</button>
          </div>
          <div className="space-y-3">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card 
                  onClick={article.onClick}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                      {article.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-foreground">{article.title}</h4>
                        {article.badge && (
                          <Badge variant="secondary" className="text-xs ml-2">
                            {article.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Financial Tools */}
        <div>
          <h3 className="text-foreground mb-3 px-1">Financial Tools</h3>
          <div className="space-y-3">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card 
                    onClick={tool.onClick}
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground mb-1">{tool.name}</h4>
                        <p className="text-sm text-muted-foreground">{tool.desc}</p>
                      </div>
                      <div className="text-2xl">→</div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Video Tutorials */}
        <div>
          <h3 className="text-foreground mb-3 px-1">Video Tutorials</h3>
          <div className="space-y-3">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{video.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>📹 Video</span>
                        <span>•</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
