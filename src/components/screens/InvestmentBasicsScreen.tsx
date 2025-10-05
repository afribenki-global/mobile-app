import { motion } from 'motion/react';
import { useState } from 'react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BookOpen, Video, FileText, TrendingUp, Award, Lightbulb, Target, Clock, ChevronRight, Filter } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ContentType = 'all' | 'article' | 'video' | 'insight' | 'news' | 'update';
type Level = 'all' | 'beginner' | 'intermediate';

interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'insight' | 'news' | 'update';
  level: 'beginner' | 'intermediate';
  duration: string;
  category: string;
  icon: string;
  order: number;
  relatedArticles?: string[];
}

export function InvestmentBasicsScreen() {
  const { setCurrentScreen, setSelectedArticleId, language } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<Level>('all');
  const [selectedType, setSelectedType] = useState<ContentType>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Comprehensive learning materials organized by order and level
  const learningMaterials: LearningMaterial[] = [
    // Beginner Level - Foundations (Order 1-10)
    {
      id: '1',
      title: 'How to Build an Emergency Fund in 6 Months',
      description: 'Essential first step: Learn to build a safety net before investing. Covers the 3-6 month rule and practical savings strategies.',
      type: 'article',
      level: 'beginner',
      duration: '5 min',
      category: 'Savings Fundamentals',
      icon: '💰',
      order: 1,
      relatedArticles: ['2', '12'],
    },
    {
      id: 'basics-1',
      title: 'What is Investing? Introduction for Beginners',
      description: 'Start here! Understanding the basics of investing, why it matters, and how it differs from saving.',
      type: 'article',
      level: 'beginner',
      duration: '6 min',
      category: 'Core Concepts',
      icon: '📚',
      order: 2,
    },
    {
      id: 'basics-2',
      title: 'Understanding Risk and Return',
      description: 'Learn the fundamental relationship between risk and potential returns in investing.',
      type: 'article',
      level: 'beginner',
      duration: '7 min',
      category: 'Core Concepts',
      icon: '⚖️',
      order: 3,
      relatedArticles: ['basics-12'],
    },
    {
      id: 'video-1',
      title: 'Getting Started with AfriBenki',
      description: 'Video walkthrough: Set up your account, understand the interface, and make your first deposit.',
      type: 'video',
      level: 'beginner',
      duration: '3:45',
      category: 'Platform Tutorial',
      icon: '🎥',
      order: 4,
    },
    {
      id: 'basics-3',
      title: 'The Power of Compound Interest',
      description: 'Discover how your money can grow exponentially over time through compound interest.',
      type: 'article',
      level: 'beginner',
      duration: '5 min',
      category: 'Core Concepts',
      icon: '📈',
      order: 5,
      relatedArticles: ['basics-15'],
    },
    {
      id: 'basics-4',
      title: 'Diversification: Don\'t Put All Eggs in One Basket',
      description: 'Learn why spreading investments across different assets is crucial for risk management.',
      type: 'article',
      level: 'beginner',
      duration: '6 min',
      category: 'Risk Management',
      icon: '🥚',
      order: 6,
    },
    {
      id: '2',
      title: 'Understanding Mutual Funds: A Beginner\'s Guide',
      description: 'Complete guide to mutual funds in Nigeria. Learn about NAV, fund types, and how to choose the right fund.',
      type: 'article',
      level: 'beginner',
      duration: '8 min',
      category: 'Investment Products',
      icon: '📊',
      order: 7,
      relatedArticles: ['basics-7', 'basics-16'],
    },
    {
      id: 'basics-5',
      title: 'Stocks 101: Owning a Piece of a Company',
      description: 'Introduction to stocks, how they work, and what it means to be a shareholder.',
      type: 'article',
      level: 'beginner',
      duration: '7 min',
      category: 'Investment Products',
      icon: '📈',
      order: 8,
    },
    {
      id: 'basics-6',
      title: 'Bonds: Fixed Income Investing Explained',
      description: 'Understanding bonds, government securities, and fixed income investments in Nigeria.',
      type: 'article',
      level: 'beginner',
      duration: '6 min',
      category: 'Investment Products',
      icon: '📜',
      order: 9,
    },
    {
      id: 'video-2',
      title: 'How to Buy Your First Stock on NGX',
      description: 'Step-by-step video guide to purchasing stocks on the Nigerian Exchange through AfriBenki.',
      type: 'video',
      level: 'beginner',
      duration: '8:15',
      category: 'Platform Tutorial',
      icon: '🎥',
      order: 10,
    },

    // Beginner Level - Islamic Finance (Order 11-14)
    {
      id: '3',
      title: 'Halal Investment Options in Africa',
      description: 'Comprehensive guide to Shariah-compliant investing. Covers halal stocks, sukuk, and Islamic mutual funds.',
      type: 'article',
      level: 'beginner',
      duration: '6 min',
      category: 'Islamic Finance',
      icon: '🕌',
      order: 11,
      relatedArticles: ['basics-13'],
    },
    {
      id: 'basics-13',
      title: 'Understanding Sukuk (Islamic Bonds)',
      description: 'Learn about sukuk as Shariah-compliant alternatives to conventional bonds.',
      type: 'article',
      level: 'beginner',
      duration: '5 min',
      category: 'Islamic Finance',
      icon: '🕌',
      order: 12,
    },

    // Intermediate Level - Strategy & Analysis (Order 13-20)
    {
      id: '4',
      title: 'Comparing Interest Rates: Banks vs AfriBenki',
      description: 'Data-driven analysis of returns. See how AfriBenki\'s investment products compare to traditional bank savings.',
      type: 'article',
      level: 'intermediate',
      duration: '4 min',
      category: 'Analysis',
      icon: '🏦',
      order: 13,
      relatedArticles: ['2', 'basics-15'],
    },
    {
      id: 'basics-7',
      title: 'How to Read a Mutual Fund Fact Sheet',
      description: 'Intermediate guide to understanding NAV, expense ratios, portfolio composition, and performance metrics.',
      type: 'article',
      level: 'intermediate',
      duration: '8 min',
      category: 'Investment Analysis',
      icon: '🔍',
      order: 14,
    },
    {
      id: 'basics-8',
      title: 'Dollar Cost Averaging: Investing Consistently',
      description: 'Learn the strategy of investing fixed amounts regularly to reduce market timing risk.',
      type: 'article',
      level: 'intermediate',
      duration: '6 min',
      category: 'Investment Strategy',
      icon: '📅',
      order: 15,
    },
    {
      id: 'basics-9',
      title: 'Understanding the Nigerian Stock Exchange (NGX)',
      description: 'Deep dive into how the NGX works, trading hours, market indices, and listing requirements.',
      type: 'article',
      level: 'intermediate',
      duration: '9 min',
      category: 'Market Knowledge',
      icon: '🏛️',
      order: 16,
    },
    {
      id: 'basics-10',
      title: 'P/E Ratios and Valuation Basics',
      description: 'Learn to evaluate if a stock is overvalued or undervalued using fundamental metrics.',
      type: 'article',
      level: 'intermediate',
      duration: '7 min',
      category: 'Investment Analysis',
      icon: '🎯',
      order: 17,
    },
    {
      id: 'basics-11',
      title: 'Dividend Investing in Nigeria',
      description: 'Strategy guide for building passive income through dividend-paying stocks.',
      type: 'article',
      level: 'intermediate',
      duration: '8 min',
      category: 'Investment Strategy',
      icon: '💵',
      order: 18,
    },
    {
      id: 'basics-12',
      title: 'Asset Allocation by Age and Goals',
      description: 'How to balance stocks, bonds, and other investments based on your age and financial objectives.',
      type: 'article',
      level: 'intermediate',
      duration: '10 min',
      category: 'Portfolio Planning',
      icon: '🎯',
      order: 19,
      relatedArticles: ['basics-2'],
    },

    // Market Insights & Updates
    {
      id: 'insight-1',
      title: 'Q3 2025 NGX Market Performance Review',
      description: 'Quarterly analysis of market trends, top performers, and sector rotation in the Nigerian market.',
      type: 'insight',
      level: 'intermediate',
      duration: '6 min',
      category: 'Market Analysis',
      icon: '📊',
      order: 20,
    },
    {
      id: 'news-1',
      title: 'SEC Approves New Investment Products',
      description: 'Latest regulatory updates and newly approved investment vehicles for Nigerian investors.',
      type: 'news',
      level: 'intermediate',
      duration: '3 min',
      category: 'Market News',
      icon: '📰',
      order: 21,
    },
    {
      id: 'update-1',
      title: 'AfriBenki Platform Update: New Features',
      description: 'Latest platform improvements including enhanced portfolio tracking and automated rebalancing.',
      type: 'update',
      level: 'beginner',
      duration: '4 min',
      category: 'Platform Updates',
      icon: '🔄',
      order: 22,
    },

    // Advanced Planning
    {
      id: 'basics-15',
      title: 'Retirement Planning with AfriBenki',
      description: 'Long-term wealth building strategies for a comfortable retirement in Nigeria.',
      type: 'article',
      level: 'intermediate',
      duration: '12 min',
      category: 'Financial Planning',
      icon: '🏖️',
      order: 23,
      relatedArticles: ['basics-3', '4'],
    },
    {
      id: 'basics-16',
      title: 'Tax-Efficient Investing in Nigeria',
      description: 'Understand capital gains tax, dividend taxation, and strategies to minimize tax liability.',
      type: 'article',
      level: 'intermediate',
      duration: '9 min',
      category: 'Tax Strategy',
      icon: '💼',
      order: 24,
    },
    {
      id: 'video-3',
      title: 'Portfolio Rebalancing Strategies',
      description: 'Video tutorial on when and how to rebalance your investment portfolio.',
      type: 'video',
      level: 'intermediate',
      duration: '10:30',
      category: 'Portfolio Management',
      icon: '🎥',
      order: 25,
    },
  ];

  // Filter materials
  const filteredMaterials = learningMaterials
    .filter(material => {
      if (selectedLevel !== 'all' && material.level !== selectedLevel) return false;
      if (selectedType !== 'all' && material.type !== selectedType) return false;
      return true;
    })
    .sort((a, b) => a.order - b.order);

  // Group by level for organized display
  const beginnerMaterials = filteredMaterials.filter(m => m.level === 'beginner');
  const intermediateMaterials = filteredMaterials.filter(m => m.level === 'intermediate');

  const handleMaterialClick = (material: LearningMaterial) => {
    if (material.type === 'video') {
      toast.info(`▶️ ${language === 'fr' ? 'Chargement de la vidéo' : 'Loading video'}: ${material.title}`);
      // In a real app, this would open a video player
    } else if (['1', '2', '3', '4'].includes(material.id)) {
      // Original articles with full content
      setSelectedArticleId(material.id);
      setCurrentScreen('article-detail');
    } else if (['basics-1', 'basics-2'].includes(material.id)) {
      // New expanded articles with detailed content
      setSelectedArticleId(material.id);
      setCurrentScreen('article-reader');
    } else {
      // For other articles, show coming soon
      toast.success(`📖 ${material.title}`, {
        description: language === 'fr' ? 'Contenu bientôt disponible' : 'Content coming soon'
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'insight': return <Lightbulb className="w-4 h-4" />;
      case 'news': return <TrendingUp className="w-4 h-4" />;
      case 'update': return <Award className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-500';
      case 'video': return 'bg-red-500';
      case 'insight': return 'bg-purple-500';
      case 'news': return 'bg-green-500';
      case 'update': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar 
        title={language === 'fr' ? 'Bases de l\'investissement' : 'Investment Basics'} 
        showBack 
        onBack={() => setCurrentScreen('explore')} 
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        {/* Header Card */}
        <div className="p-4">
          <Card className="p-5 bg-gradient-to-br from-primary to-accent">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-white mb-2">Start Your Investment Journey</h2>
                <p className="text-sm text-white/80">
                  {filteredMaterials.length} curated lessons organized from beginner to intermediate level
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="px-4 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-foreground">Filters</span>
            </div>
            <div className="flex items-center gap-2">
              {selectedLevel !== 'all' && (
                <Badge variant="secondary" className="text-xs capitalize">{selectedLevel}</Badge>
              )}
              {selectedType !== 'all' && (
                <Badge variant="secondary" className="text-xs capitalize">{selectedType}</Badge>
              )}
              <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
            </div>
          </button>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-3 p-4 bg-card rounded-lg border border-border space-y-4"
            >
              <div>
                <label className="text-sm text-foreground mb-2 block">Level</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedLevel('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedLevel === 'all' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedLevel('beginner')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedLevel === 'beginner' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    Beginner
                  </button>
                  <button
                    onClick={() => setSelectedLevel('intermediate')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedLevel === 'intermediate' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    Intermediate
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-foreground mb-2 block">Content Type</label>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'article', 'video', 'insight', 'news', 'update'] as ContentType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                        selectedType === type 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <Tabs defaultValue="organized" className="px-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="organized">Learning Path</TabsTrigger>
            <TabsTrigger value="all">All Content</TabsTrigger>
          </TabsList>

          {/* Organized Learning Path */}
          <TabsContent value="organized" className="space-y-6">
            {beginnerMaterials.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white">1</span>
                  </div>
                  <div>
                    <h3 className="text-foreground">Beginner Level</h3>
                    <p className="text-xs text-muted-foreground">Start here if you're new to investing</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {beginnerMaterials.map((material, index) => (
                    <motion.div
                      key={material.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleMaterialClick(material)}
                      >
                        <div className="flex gap-3">
                          <div className="text-3xl flex-shrink-0">{material.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs">
                                  {material.category}
                                </Badge>
                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${getTypeColor(material.type)}`}>
                                  <div className="text-white">
                                    {getTypeIcon(material.type)}
                                  </div>
                                  <span className="text-xs text-white capitalize">{material.type}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            </div>
                            <h4 className="text-foreground mb-1">{material.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {material.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{material.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {intermediateMaterials.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white">2</span>
                  </div>
                  <div>
                    <h3 className="text-foreground">Intermediate Level</h3>
                    <p className="text-xs text-muted-foreground">Ready to dive deeper</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {intermediateMaterials.map((material, index) => (
                    <motion.div
                      key={material.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleMaterialClick(material)}
                      >
                        <div className="flex gap-3">
                          <div className="text-3xl flex-shrink-0">{material.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs">
                                  {material.category}
                                </Badge>
                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${getTypeColor(material.type)}`}>
                                  <div className="text-white">
                                    {getTypeIcon(material.type)}
                                  </div>
                                  <span className="text-xs text-white capitalize">{material.type}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            </div>
                            <h4 className="text-foreground mb-1">{material.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {material.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{material.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* All Content View */}
          <TabsContent value="all" className="space-y-3">
            {filteredMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card 
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleMaterialClick(material)}
                >
                  <div className="flex gap-3">
                    <div className="text-3xl flex-shrink-0">{material.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge 
                            variant={material.level === 'beginner' ? 'default' : 'secondary'} 
                            className="text-xs capitalize"
                          >
                            {material.level}
                          </Badge>
                          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${getTypeColor(material.type)}`}>
                            <div className="text-white">
                              {getTypeIcon(material.type)}
                            </div>
                            <span className="text-xs text-white capitalize">{material.type}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                      <h4 className="text-foreground mb-1">{material.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {material.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{material.duration}</span>
                        </div>
                        <span>•</span>
                        <span>{material.category}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Learning Resources Card */}
        <div className="px-4 mt-6 pb-6">
          <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-2">Need Help Choosing?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Take our risk assessment to get personalized investment recommendations
                </p>
                <button 
                  onClick={() => setCurrentScreen('risk-assessment')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
