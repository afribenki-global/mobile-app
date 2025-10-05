import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Clock, Share2, Bookmark, ThumbsUp, BookOpen, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { useState, useEffect } from 'react';

interface ArticleContent {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  summary: string;
  keyTakeaways: string[];
  fullContent: string;
  relatedArticles?: string[];
}

export function ArticleReaderScreen() {
  const { setCurrentScreen, selectedArticleId, setSelectedArticleId, language } = useApp();
  const [readProgress, setReadProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Expanded article database with full content
  const articles: Record<string, ArticleContent> = {
    'basics-1': {
      id: 'basics-1',
      title: 'What is Investing? Introduction for Beginners',
      category: 'Core Concepts',
      readTime: '6 min',
      author: 'Dr. Amina Okafor',
      date: 'Oct 1, 2025',
      summary: 'Learn the fundamental difference between saving and investing, why investing matters for wealth building, and how to get started with your first investment.',
      keyTakeaways: [
        'Investing is putting money to work to generate returns over time',
        'Unlike saving, investing involves taking calculated risks for higher potential returns',
        'Starting early allows compound interest to work in your favor',
        'You don\'t need to be wealthy to start investing - you can begin with as little as ₦5,000',
      ],
      fullContent: `
        <h3>Understanding the Basics</h3>
        <p>Investing is the act of allocating money with the expectation of generating income or profit. Unlike saving, where your money sits in a bank account earning minimal interest, investing puts your money to work in assets that have the potential to grow in value.</p>

        <h3>Saving vs. Investing: What's the Difference?</h3>
        <p><strong>Saving</strong> is setting aside money for short-term goals and emergencies. It's low-risk but offers limited returns - typically 1-4% annually in Nigerian banks.</p>
        
        <p><strong>Investing</strong> is committing money to assets like stocks, bonds, or mutual funds with the goal of growing wealth over time. While it involves more risk, it offers significantly higher potential returns - often 10-25% annually.</p>

        <h3>Why Should You Invest?</h3>
        <ul>
          <li><strong>Beat Inflation:</strong> With inflation often at 15-25% in Nigeria, money in a savings account loses purchasing power. Investing helps you stay ahead of inflation.</li>
          <li><strong>Build Wealth:</strong> Compound interest allows your returns to generate their own returns, creating exponential growth over time.</li>
          <li><strong>Achieve Long-term Goals:</strong> Whether it's buying a home, funding education, or retirement, investing helps you reach big financial goals.</li>
          <li><strong>Create Multiple Income Streams:</strong> Investments can provide dividends, interest, and capital gains.</li>
        </ul>

        <h3>Common Investment Types in Nigeria</h3>
        <h4>1. Mutual Funds</h4>
        <p>Pooled investments managed by professionals. Great for beginners. Expected returns: 10-20% annually.</p>

        <h4>2. Stocks</h4>
        <p>Ownership shares in companies listed on the Nigerian Exchange (NGX). Higher risk, higher potential return: 15-30% annually.</p>

        <h4>3. Bonds</h4>
        <p>Loans to governments or corporations that pay fixed interest. Lower risk: 12-18% annually.</p>

        <h4>4. Real Estate</h4>
        <p>Property investments. Requires more capital but can provide rental income and appreciation.</p>

        <h3>Getting Started</h3>
        <p><strong>Step 1:</strong> Build an emergency fund (3-6 months of expenses) before investing.</p>
        <p><strong>Step 2:</strong> Determine your risk tolerance and investment goals.</p>
        <p><strong>Step 3:</strong> Start small - even ₦5,000/month can grow significantly over time.</p>
        <p><strong>Step 4:</strong> Diversify - don't put all your money in one investment.</p>
        <p><strong>Step 5:</strong> Stay invested - wealth building takes time and patience.</p>

        <h3>Example: The Power of Starting Early</h3>
        <p>Chioma starts investing ₦10,000 monthly at age 25. By age 55, with an average 15% annual return, she'll have over ₦47 million!</p>
        
        <p>Tunde waits until age 35 to start the same ₦10,000 monthly investment. By age 55, he'll have only ₦14 million - less than one-third of Chioma's amount.</p>

        <p>This is the power of starting early and letting compound interest work for you.</p>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>Trying to "time the market" - consistent investing beats market timing</li>
          <li>Investing money you might need soon - only invest money you can leave untouched for 3+ years</li>
          <li>Letting emotions drive decisions - stick to your strategy during market ups and downs</li>
          <li>Not diversifying - spread your investments across different assets</li>
        </ul>

        <h3>Next Steps</h3>
        <p>Now that you understand what investing is, the next article in this series will cover "Understanding Risk and Return" - a crucial concept for making informed investment decisions.</p>

        <p>Remember: The best time to start investing was yesterday. The second-best time is today!</p>
      `,
    },
    'basics-2': {
      id: 'basics-2',
      title: 'Understanding Risk and Return',
      category: 'Core Concepts',
      readTime: '7 min',
      author: 'Kwame Mensah',
      date: 'Oct 2, 2025',
      summary: 'Explore the fundamental relationship between risk and return, learn how to assess your risk tolerance, and discover strategies to balance risk with your investment goals.',
      keyTakeaways: [
        'Higher potential returns usually come with higher risk',
        'Diversification helps reduce risk without sacrificing returns',
        'Your risk tolerance depends on age, goals, and financial situation',
        'Understanding risk helps you make better investment decisions',
      ],
      fullContent: `
        <h3>The Risk-Return Relationship</h3>
        <p>In investing, risk and return are inseparable partners. Generally, the higher the potential return of an investment, the higher the risk of losing money. Understanding this relationship is crucial for building a successful investment strategy.</p>

        <h3>Types of Investment Risk</h3>
        <h4>1. Market Risk</h4>
        <p>The risk that the overall market declines, affecting your investments. For example, during economic recessions, most stocks tend to fall.</p>

        <h4>2. Inflation Risk</h4>
        <p>The risk that your returns won't keep pace with inflation. If inflation is 20% but your investment returns only 10%, you're actually losing purchasing power.</p>

        <h4>3. Liquidity Risk</h4>
        <p>The risk that you can't quickly convert an investment to cash without significant loss. Real estate has high liquidity risk compared to stocks.</p>

        <h4>4. Company-Specific Risk</h4>
        <p>The risk that a particular company performs poorly. This is why diversification is crucial.</p>

        <h3>Risk-Return Spectrum in Nigeria</h3>
        <p><strong>Low Risk, Low Return:</strong></p>
        <ul>
          <li>Savings accounts: 1-4% return, minimal risk</li>
          <li>Treasury Bills: 10-14% return, very low risk</li>
        </ul>

        <p><strong>Moderate Risk, Moderate Return:</strong></p>
        <ul>
          <li>Money Market Funds: 10-15% return, low-moderate risk</li>
          <li>Government Bonds: 12-16% return, low-moderate risk</li>
          <li>Corporate Bonds: 14-18% return, moderate risk</li>
        </ul>

        <p><strong>Higher Risk, Higher Potential Return:</strong></p>
        <ul>
          <li>Balanced Mutual Funds: 15-20% return, moderate-high risk</li>
          <li>Equity Mutual Funds: 18-25% return, high risk</li>
          <li>Individual Stocks: 20-40% return potential, high risk</li>
        </ul>

        <h3>Assessing Your Risk Tolerance</h3>
        <p>Your risk tolerance is your ability and willingness to lose some or all of your original investment in exchange for greater potential returns.</p>

        <h4>Factors Affecting Risk Tolerance:</h4>
        <ul>
          <li><strong>Age:</strong> Younger investors can typically take more risk as they have time to recover from losses</li>
          <li><strong>Income Stability:</strong> Stable income allows for higher risk-taking</li>
          <li><strong>Financial Goals:</strong> Long-term goals allow for more risk than short-term needs</li>
          <li><strong>Emergency Fund:</strong> Having 6 months of expenses saved allows for more investment risk</li>
          <li><strong>Personality:</strong> Can you sleep well at night knowing your investments might decline temporarily?</li>
        </ul>

        <h3>Example Risk Tolerance Profiles</h3>
        
        <h4>Conservative (Low Risk Tolerance)</h4>
        <p><strong>Profile:</strong> Near retirement, needs income stability, can't afford losses</p>
        <p><strong>Asset Allocation:</strong> 70% bonds/money market, 30% stocks</p>
        <p><strong>Expected Return:</strong> 10-14% annually</p>

        <h4>Moderate (Medium Risk Tolerance)</h4>
        <p><strong>Profile:</strong> Mid-career, balanced goals, can handle some volatility</p>
        <p><strong>Asset Allocation:</strong> 50% stocks, 40% bonds, 10% alternatives</p>
        <p><strong>Expected Return:</strong> 14-18% annually</p>

        <h4>Aggressive (High Risk Tolerance)</h4>
        <p><strong>Profile:</strong> Young professional, long time horizon, seeking maximum growth</p>
        <p><strong>Asset Allocation:</strong> 80% stocks, 15% bonds, 5% alternatives</p>
        <p><strong>Expected Return:</strong> 18-25% annually</p>

        <h3>Managing Risk Through Diversification</h3>
        <p>Diversification is spreading your investments across different assets to reduce risk. As the saying goes, "Don't put all your eggs in one basket."</p>

        <h4>How to Diversify:</h4>
        <ul>
          <li><strong>Across Asset Classes:</strong> Mix stocks, bonds, real estate</li>
          <li><strong>Across Sectors:</strong> Don't invest only in banking or oil - spread across industries</li>
          <li><strong>Across Geography:</strong> Consider both Nigerian and international investments</li>
          <li><strong>Across Time:</strong> Dollar-cost averaging - invest regularly rather than all at once</li>
        </ul>

        <h3>Real-Life Example: Managing Market Volatility</h3>
        <p>In March 2020, global markets crashed due to COVID-19. Nigerian stocks fell 30%.</p>

        <p><strong>Investor A (Not Diversified):</strong> Had 100% in stocks, panicked and sold at the bottom, locked in 30% loss.</p>

        <p><strong>Investor B (Diversified):</strong> Had 60% stocks, 40% bonds. Total portfolio fell only 18%. Stayed invested and recovered fully by 2021, then gained 20% more.</p>

        <p>Diversification didn't prevent losses, but it reduced them and made it easier to stay invested.</p>

        <h3>Key Principles for Managing Risk</h3>
        <ol>
          <li><strong>Never invest money you can't afford to lose</strong></li>
          <li><strong>Match investments to your time horizon:</strong> Short-term goals need low-risk investments</li>
          <li><strong>Rebalance regularly:</strong> Adjust your portfolio annually to maintain desired risk level</li>
          <li><strong>Stay informed but don't obsess:</strong> Check your investments quarterly, not daily</li>
          <li><strong>Have an emergency fund:</strong> This allows you to take appropriate investment risks</li>
        </ol>

        <h3>Conclusion</h3>
        <p>Understanding risk doesn't mean avoiding it - it means managing it intelligently. The goal is not to eliminate risk, but to take the right amount of risk for your situation and goals.</p>

        <p>In the next article, we'll explore "The Power of Compound Interest" and how time can be your greatest investment ally.</p>
      `,
    },
  };

  const article = articles[selectedArticleId] || articles['basics-1'];

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked
        ? (language === 'fr' ? 'Retiré des favoris' : 'Removed from bookmarks')
        : (language === 'fr' ? 'Ajouté aux favoris' : 'Added to bookmarks')
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success(language === 'fr' ? 'Article aimé!' : 'Article liked!');
    }
  };

  const handleShare = () => {
    toast.success(language === 'fr' ? 'Lien copié!' : 'Link copied!');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readProgress} className="h-1 rounded-none" />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('investment-basics')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <Badge className="mb-3 bg-warning text-primary">
          {article.category}
        </Badge>
        <h1 className="text-white mb-3 text-2xl">{article.title}</h1>
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
          <span>•</span>
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-3xl mx-auto"
      >
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            variant={isBookmarked ? "default" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={handleBookmark}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? (language === 'fr' ? 'Enregistré' : 'Saved') : (language === 'fr' ? 'Enregistrer' : 'Save')}
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Partager' : 'Share'}
          </Button>
          <Button 
            variant={isLiked ? "default" : "outline"}
            size="sm" 
            className="flex-1"
            onClick={handleLike}
          >
            <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {language === 'fr' ? 'J\'aime' : 'Like'}
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-start gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-foreground mb-2">{language === 'fr' ? 'Résumé' : 'Summary'}</h3>
              <p className="text-muted-foreground">{article.summary}</p>
            </div>
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-foreground mb-3">{language === 'fr' ? 'Points clés' : 'Key Takeaways'}</h3>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-muted-foreground flex-1">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Full Article Content */}
        <Card className="p-6 mb-6 prose prose-sm max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: article.fullContent }}
            className="text-foreground space-y-4"
          />
        </Card>

        {/* Navigation to Next Article */}
        <Card className="p-6 bg-gradient-to-r from-primary to-accent text-white">
          <h3 className="text-white mb-3">{language === 'fr' ? 'Article suivant' : 'Next Article'}</h3>
          <p className="text-white/90 mb-4">
            {article.id === 'basics-1' 
              ? 'Understanding Risk and Return'
              : 'The Power of Compound Interest'}
          </p>
          <Button
            onClick={() => {
              setSelectedArticleId(article.id === 'basics-1' ? 'basics-2' : 'basics-3');
              window.scrollTo(0, 0);
            }}
            className="bg-white text-primary hover:bg-white/90"
          >
            {language === 'fr' ? 'Lire la suite' : 'Continue Reading'}
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
