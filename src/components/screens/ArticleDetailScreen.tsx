import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Clock, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function ArticleDetailScreen() {
  const { setCurrentScreen, selectedArticleId, setSelectedArticleId, t } = useApp();

  const articles = {
    '1': {
      id: '1',
      title: 'How to Build an Emergency Fund in 6 Months',
      category: 'Savings',
      readTime: '5 min',
      author: 'Dr. Amina Okafor',
      date: 'Jan 15, 2025',
      content: `
        <h3>Why You Need an Emergency Fund</h3>
        <p>An emergency fund is your financial safety net. Life is unpredictable, and having 3-6 months of expenses saved can protect you from unexpected events like job loss, medical emergencies, or urgent home repairs.</p>
        
        <h3>Step 1: Calculate Your Target</h3>
        <p>Start by calculating your monthly essential expenses:</p>
        <ul>
          <li>Rent or mortgage</li>
          <li>Food and groceries</li>
          <li>Transportation</li>
          <li>Utilities</li>
          <li>Insurance</li>
        </ul>
        <p>Multiply this number by 6 to get your emergency fund target.</p>
        
        <h3>Step 2: Start Small</h3>
        <p>Don't let the final number intimidate you. Start with a goal of ₦50,000 or one month's expenses. The key is to build the habit of saving regularly.</p>
        
        <h3>Step 3: Automate Your Savings</h3>
        <p>Set up automatic transfers from your salary account to a separate savings account. AfriBenki's auto-save feature can help you save 10-20% of every deposit automatically.</p>
        
        <h3>Step 4: Cut Unnecessary Expenses</h3>
        <p>Review your spending and identify areas where you can cut back:</p>
        <ul>
          <li>Reduce dining out</li>
          <li>Cancel unused subscriptions</li>
          <li>Compare prices before buying</li>
          <li>Use public transport when possible</li>
        </ul>
        
        <h3>Step 5: Boost Your Income</h3>
        <p>Consider side hustles or freelance work to accelerate your savings. Even an extra ₦20,000 per month can help you reach your goal faster.</p>
        
        <h3>Step 6: Keep It Accessible But Separate</h3>
        <p>Your emergency fund should be easily accessible (not invested in stocks) but separate from your everyday spending account to avoid temptation.</p>
        
        <h3>Conclusion</h3>
        <p>Building an emergency fund takes discipline and time, but it's one of the most important financial decisions you'll make. Start today with whatever amount you can, and watch your financial security grow.</p>
      `,
      relatedArticles: ['2', '3'],
    },
    '2': {
      id: '2',
      title: 'Understanding Mutual Funds: A Beginner\'s Guide',
      category: 'Investing',
      readTime: '8 min',
      author: 'Kwame Mensah',
      date: 'Jan 12, 2025',
      content: `
        <h3>What is a Mutual Fund?</h3>
        <p>A mutual fund is a pool of money collected from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. Professional fund managers make investment decisions on behalf of investors.</p>
        
        <h3>Types of Mutual Funds in Nigeria</h3>
        <h4>1. Money Market Funds</h4>
        <p>Low-risk funds that invest in short-term debt securities. Perfect for beginners with returns of 10-15% annually.</p>
        
        <h4>2. Equity Funds</h4>
        <p>Invest primarily in stocks. Higher risk but potential for 20-30% returns over time.</p>
        
        <h4>3. Fixed Income Funds</h4>
        <p>Invest in bonds and government securities. Moderate risk with stable returns of 12-18%.</p>
        
        <h4>4. Halal Funds</h4>
        <p>Sharia-compliant investments avoiding interest-based securities. Returns of 15-20%.</p>
        
        <h3>Benefits of Mutual Funds</h3>
        <ul>
          <li><strong>Professional Management:</strong> Experts manage your money</li>
          <li><strong>Diversification:</strong> Your money is spread across multiple investments</li>
          <li><strong>Low Minimum:</strong> Start with as little as ₦5,000</li>
          <li><strong>Liquidity:</strong> Easy to withdraw your money</li>
        </ul>
        
        <h3>How to Get Started</h3>
        <p>1. Determine your investment goals and risk tolerance</p>
        <p>2. Choose the right type of fund</p>
        <p>3. Start with a small amount (₦5,000-10,000)</p>
        <p>4. Set up automatic monthly contributions</p>
        <p>5. Monitor performance quarterly</p>
        
        <h3>Risks to Consider</h3>
        <p>While mutual funds are professionally managed, they're not risk-free. Market fluctuations can affect returns, especially in equity funds. However, diversification helps minimize risk.</p>
      `,
      relatedArticles: ['1', '4'],
    },
    '3': {
      id: '3',
      title: 'Halal Investment Options in Africa',
      category: 'Islamic Finance',
      readTime: '6 min',
      author: 'Sheikh Abdullah Ibrahim',
      date: 'Jan 10, 2025',
      content: `
        <h3>Introduction to Islamic Finance</h3>
        <p>Islamic finance operates on principles derived from the Quran and Hadith, avoiding interest (riba), excessive uncertainty (gharar), and investments in prohibited industries.</p>
        
        <h3>Halal Investment Principles</h3>
        <ul>
          <li>No interest-based transactions</li>
          <li>Profit and loss sharing</li>
          <li>Asset-backed financing</li>
          <li>Ethical screening of investments</li>
        </ul>
        
        <h3>Available Halal Investment Options</h3>
        <h4>1. Sukuk (Islamic Bonds)</h4>
        <p>Certificates representing ownership in tangible assets. Returns of 12-15% annually.</p>
        
        <h4>2. Halal Equity Funds</h4>
        <p>Invest in Sharia-compliant stocks screened for business activities and financial ratios.</p>
        
        <h4>3. Real Estate Investment</h4>
        <p>Property investments that comply with Islamic principles.</p>
        
        <h4>4. Commodity Trading</h4>
        <p>Halal commodities like gold, silver, and agricultural products.</p>
        
        <h3>How AfriBenki Ensures Sharia Compliance</h3>
        <p>Our Halal Fund is certified by the Ja'iz Takaful Insurance and follows strict Sharia guidelines:</p>
        <ul>
          <li>Regular audits by Sharia scholars</li>
          <li>Transparent reporting</li>
          <li>Purification of non-compliant income</li>
        </ul>
        
        <h3>Getting Started with Halal Investing</h3>
        <p>Minimum investment: ₦10,000. Expected returns: 15-20% annually. No hidden fees or interest charges.</p>
      `,
      relatedArticles: ['2', '4'],
    },
    '4': {
      id: '4',
      title: 'Comparing Interest Rates: Banks vs AfriBenki',
      category: 'Analysis',
      readTime: '4 min',
      author: 'Dr. Chidi Eze',
      date: 'Jan 8, 2025',
      content: `
        <h3>Understanding the Difference</h3>
        <p>When it comes to growing your money, understanding the difference between traditional bank savings and digital platforms like AfriBenki is crucial. Let's break down the numbers and see what works best for you.</p>
        
        <h3>Traditional Banks in Nigeria</h3>
        <h4>Savings Account Rates</h4>
        <p>Most Nigerian banks offer annual interest rates between 1.5% and 3.5% on regular savings accounts. With current inflation at around 25%, this means your money is actually losing value over time.</p>
        
        <h4>Example: ₦100,000 in a Bank</h4>
        <ul>
          <li>Interest rate: 2.5% per year</li>
          <li>After 1 year: ₦102,500 (but worth less due to inflation)</li>
          <li>Hidden fees: Account maintenance, SMS alerts, card fees</li>
          <li>Minimum balance requirements often apply</li>
        </ul>
        
        <h3>AfriBenki Money Market Funds</h3>
        <h4>Higher Returns</h4>
        <p>AfriBenki's money market funds invest in treasury bills and commercial papers, offering returns between 10% and 15% annually - significantly higher than traditional banks.</p>
        
        <h4>Example: ₦100,000 on AfriBenki</h4>
        <ul>
          <li>Expected return: 12% per year</li>
          <li>After 1 year: ₦112,000</li>
          <li>No hidden fees: Only transparent management fees</li>
          <li>No minimum balance requirements</li>
          <li>Daily interest accrual</li>
        </ul>
        
        <h3>Side-by-Side Comparison</h3>
        <h4>Liquidity</h4>
        <p><strong>Banks:</strong> Instant access but limited daily withdrawal (usually ₦100,000-₦500,000)</p>
        <p><strong>AfriBenki:</strong> Access within 24-48 hours, higher withdrawal limits</p>
        
        <h4>Safety & Security</h4>
        <p><strong>Banks:</strong> Protected by NDIC up to ₦500,000</p>
        <p><strong>AfriBenki:</strong> Regulated by SEC, investments in government-backed securities</p>
        
        <h4>Accessibility</h4>
        <p><strong>Banks:</strong> Requires branch visits for some services</p>
        <p><strong>AfriBenki:</strong> Fully digital, manage everything from your phone</p>
        
        <h4>Additional Benefits</h4>
        <p><strong>Banks:</strong> Physical branches, ATM access, loan facilities</p>
        <p><strong>AfriBenki:</strong> Financial education, investment tools, automated savings, Circles feature</p>
        
        <h3>Best Approach: Diversification</h3>
        <p>Smart savers don't choose one over the other - they use both strategically:</p>
        <ul>
          <li><strong>Keep 1-2 months expenses in a bank</strong> for immediate access and daily transactions</li>
          <li><strong>Emergency fund (3-6 months expenses)</strong> in AfriBenki's money market fund for better returns while maintaining reasonable access</li>
          <li><strong>Long-term savings and investments</strong> in AfriBenki's equity funds, bonds, or Circles</li>
        </ul>
        
        <h3>Real Example: Adeola's Strategy</h3>
        <p>Adeola, a 32-year-old professional in Lagos, uses this approach:</p>
        <ul>
          <li>₦150,000 in her bank for daily expenses and bills</li>
          <li>₦500,000 in AfriBenki money market fund as emergency savings (earning 12% vs 2.5%)</li>
          <li>₦200,000 in AfriBenki's Tech Fund for long-term growth</li>
          <li>Monthly ₦50,000 contribution to a Wedding Circle with friends</li>
        </ul>
        <p>In one year, Adeola earned ₦87,500 more compared to keeping everything in a traditional bank!</p>
        
        <h3>The Bottom Line</h3>
        <p>While traditional banks remain important for everyday banking, platforms like AfriBenki offer superior returns for your savings and investments. The key is understanding what each offers and using them strategically to maximize your financial growth.</p>
        
        <h3>Getting Started</h3>
        <p>Ready to earn better returns? Start with just ₦5,000 in AfriBenki's money market fund and watch your money work harder for you. No minimum balance. No hidden fees. Just better returns.</p>
      `,
      relatedArticles: ['1', '2'],
    },
  };

  const article = articles[selectedArticleId as keyof typeof articles] || articles['1'];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('explore')}
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
          <Button variant="outline" size="sm" className="flex-1">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Like
          </Button>
        </div>

        {/* Article Content */}
        <Card className="p-6 mb-6 prose prose-sm max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="text-foreground space-y-4"
          />
        </Card>

        {/* Related Articles */}
        <div className="mb-6">
          <h3 className="text-foreground mb-4">Related Articles</h3>
          <div className="space-y-3">
            {article.relatedArticles.map((relatedId) => {
              const related = articles[relatedId as keyof typeof articles];
              return (
                <Card
                  key={relatedId}
                  onClick={() => { setSelectedArticleId(relatedId); window.scrollTo(0, 0); }}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <Badge className="mb-2 bg-accent/10 text-accent text-xs">
                    {related.category}
                  </Badge>
                  <h4 className="text-foreground mb-2">{related.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {related.readTime} read • {related.author}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
