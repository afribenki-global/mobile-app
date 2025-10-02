import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { BookOpen, Calculator, TrendingUp, Award, Video, FileText, Lightbulb, Target } from 'lucide-react';
import { Badge } from '../ui/badge';

export function ExploreScreen() {
  const { setCurrentScreen } = useApp();

  const quickLinks = [
    { id: 'basics', name: 'Investment Basics', icon: BookOpen, color: 'bg-primary', articles: 12 },
    { id: 'calculators', name: 'Financial Calculators', icon: Calculator, color: 'bg-accent', articles: 8 },
    { id: 'market', name: 'Market Insights', icon: TrendingUp, color: 'bg-purple-500', articles: 24 },
    { id: 'circles', name: 'Savings Circles', icon: Target, color: 'bg-warning', articles: 8, onClick: () => setCurrentScreen('circles') },
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'How to Build an Emergency Fund in 6 Months',
      category: 'Savings',
      readTime: '5 min',
      image: '💰',
      featured: true,
    },
    {
      id: 2,
      title: 'Understanding Mutual Funds: A Beginner\'s Guide',
      category: 'Investing',
      readTime: '8 min',
      image: '📈',
    },
    {
      id: 3,
      title: 'Halal Investment Options in Africa',
      category: 'Islamic Finance',
      readTime: '6 min',
      image: '🕌',
      badge: 'Popular',
    },
    {
      id: 4,
      title: 'Comparing Interest Rates: Banks vs AfriBenki',
      category: 'Analysis',
      readTime: '4 min',
      image: '🏦',
    },
  ];

  const tools = [
    { id: 'savings-calc', name: 'Savings Calculator', desc: 'Calculate your savings goal', icon: Calculator },
    { id: 'retirement-calc', name: 'Retirement Planner', desc: 'Plan for your future', icon: Target },
    { id: 'risk-quiz', name: 'Risk Assessment', desc: 'Find your risk profile', icon: Award },
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
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles, guides, tools..."
            className="w-full h-12 px-4 pr-12 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🔍</span>
          </button>
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
                <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
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
                  <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
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

        {/* AI Financial Advisor */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-foreground mb-1">AI Financial Advisor</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get personalized advice based on your financial goals and risk profile
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                Chat with AI
              </button>
            </div>
          </div>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
