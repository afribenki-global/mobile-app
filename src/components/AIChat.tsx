import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Sparkles, TrendingUp, PiggyBank, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useApp } from './AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AfriBenki AI assistant. I can help you with financial advice, investment strategies, and navigating the app. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        'How should I start investing?',
        'Create a savings goal',
        'Explain mutual funds',
        'Show my portfolio'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, formatCurrency, setCurrentScreen } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Navigation commands
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('home')) {
      setTimeout(() => setCurrentScreen('home'), 500);
      return {
        id: Date.now().toString(),
        text: "Taking you to your dashboard now! 🏠",
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    if (lowerMessage.includes('savings') || lowerMessage.includes('save')) {
      setTimeout(() => setCurrentScreen('save'), 500);
      return {
        id: Date.now().toString(),
        text: "Great! Let me show you your savings plans. You can create new goals or track existing ones. 💰",
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    if (lowerMessage.includes('invest') || lowerMessage.includes('portfolio')) {
      setTimeout(() => setCurrentScreen('invest'), 500);
      return {
        id: Date.now().toString(),
        text: "Opening your investment portfolio. Remember to diversify! 📈",
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    if (lowerMessage.includes('circles') || lowerMessage.includes('group')) {
      setTimeout(() => setCurrentScreen('circles'), 500);
      return {
        id: Date.now().toString(),
        text: "Circles are a great way to save with friends and family! Let me show you available options. 👥",
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    // Financial advice
    if (lowerMessage.includes('start investing') || lowerMessage.includes('begin')) {
      return {
        id: Date.now().toString(),
        text: `Based on your current balance of ${formatCurrency(user?.balance || 0)}, I recommend:\n\n1. Start with a Money Market Fund (low risk) - Minimum ₦5,000\n2. Build an emergency fund covering 3-6 months of expenses\n3. Consider investing 15-20% of your income monthly\n\nWould you like me to help you set up your first investment?`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: ['Yes, help me invest', 'Tell me more about funds', 'Create emergency fund']
      };
    }
    
    if (lowerMessage.includes('mutual fund') || lowerMessage.includes('fund')) {
      return {
        id: Date.now().toString(),
        text: "Mutual funds pool money from many investors to buy stocks, bonds, or other securities. Types:\n\n💼 Money Market Fund - Low risk, stable returns (12%)\n📈 Equity Fund - Higher risk, higher returns (24%)\n🏛️ Fixed Income - Medium risk, bonds (15%)\n✨ Halal Fund - Sharia-compliant (18%)\n\nWhich interests you?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: ['Money Market', 'Equity Fund', 'Halal Fund']
      };
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('safe')) {
      return {
        id: Date.now().toString(),
        text: "Investment risk levels:\n\n🟢 Low Risk: Money Market Funds - Stable, predictable returns\n🟡 Medium Risk: Fixed Income/Bonds - Balanced growth\n🔴 High Risk: Equity/Stocks - Potential high returns but volatile\n\nRule of thumb: Never invest money you can't afford to lose. Start with low-risk options!",
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('emergency fund')) {
      return {
        id: Date.now().toString(),
        text: "An emergency fund should cover 3-6 months of living expenses. It's your financial safety net! 🛡️\n\nFor example, if your monthly expenses are ₦100,000, aim for ₦300,000-600,000.\n\nShould I help you create an emergency savings goal?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: ['Yes, create goal', 'Calculate my target', 'Learn more']
      };
    }
    
    if (lowerMessage.includes('diversif')) {
      return {
        id: Date.now().toString(),
        text: "Diversification = Don't put all your eggs in one basket! 🥚🧺\n\nSpread investments across:\n• Different asset types (stocks, bonds, real estate)\n• Various sectors (tech, finance, agriculture)\n• Multiple mutual funds\n\nThis reduces risk while maximizing returns. The 60-30-10 rule is popular: 60% low risk, 30% medium risk, 10% high risk.",
        sender: 'ai',
        timestamp: new Date(),
      };
    }
    
    if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
      return {
        id: Date.now().toString(),
        text: "Setting financial goals is crucial! Popular goals:\n\n🎯 Emergency Fund\n✈️ Vacation/Travel\n🚗 New Car\n🏠 Down Payment\n💍 Wedding\n👶 Child's Education\n\nWhat goal would you like to work towards?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: ['Emergency Fund', 'Vacation', 'New Car', 'Create custom goal']
      };
    }
    
    if (lowerMessage.includes('wallet') || lowerMessage.includes('balance')) {
      return {
        id: Date.now().toString(),
        text: `Your current wallet balance is ${formatCurrency(user?.balance || 0)}. Your total portfolio value is ${formatCurrency(user?.portfolioValue || 0)}.\n\nWould you like to add funds or review your transactions?`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: ['Add funds', 'View transactions', 'Investment tips']
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      text: "I'm here to help! I can assist with:\n\n📊 Investment advice & strategies\n💰 Savings goals & planning\n📱 App navigation & features\n🎯 Financial education\n\nWhat would you like to know more about?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: ['Investment basics', 'Create savings goal', 'Show my portfolio']
    };
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-br from-accent to-success text-white rounded-full shadow-lg z-50 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-accent/30 rounded-full"
            />
            <MessageCircle className="w-6 h-6 relative z-10" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] z-50"
          >
            <Card className="h-full flex flex-col shadow-2xl border-2 border-accent/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white">AI Financial Advisor</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs hover:bg-accent/20 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}