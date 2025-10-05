import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Send, Download, QrCode, History, ArrowUpRight, ArrowDownRight, Copy } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function WalletScreen() {
  const { formatCurrency, user, setCurrentScreen } = useApp();

  const transactions = [
    { id: 1, type: 'credit', name: 'John Mensah', tag: '@johnm', amount: 25000, date: '2 hours ago', status: 'completed' },
    { id: 2, type: 'debit', name: 'Chioma Nwankwo', tag: '@chioma', amount: -15000, date: 'Yesterday', status: 'completed' },
    { id: 3, type: 'credit', name: 'Kwame Osei', tag: '@kwame', amount: 50000, date: '2 days ago', status: 'completed' },
    { id: 4, type: 'debit', name: 'Fatima Hassan', tag: '@fatima_h', amount: -30000, date: '3 days ago', status: 'completed' },
  ];

  const userTag = '@johnadebayo';

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Stash Wallet" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Wallet Balance */}
        <Card className="p-6 bg-gradient-to-br from-primary to-accent text-white border-0">
          <div className="text-center mb-6">
            <p className="text-sm text-white/80 mb-2">Stash Balance</p>
            <h1 className="text-white text-4xl mb-1">{formatCurrency(user?.balance || 0)}</h1>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-white/90">Tag: {userTag}</span>
              <button className="p-1 hover:bg-white/10 rounded">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors">
              <Send className="w-6 h-6" />
              <span className="text-xs">Send</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors">
              <Download className="w-6 h-6" />
              <span className="text-xs">Receive</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors">
              <QrCode className="w-6 h-6" />
              <span className="text-xs">QR Code</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('transaction-history')}
              className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-colors"
            >
              <History className="w-6 h-6" />
              <span className="text-xs">History</span>
            </button>
          </div>
        </Card>

        {/* Quick Send */}
        <Card className="p-5">
          <h3 className="text-foreground mb-4">Quick Send</h3>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter @username or phone"
              className="h-12 rounded-xl"
            />
            <Button className="h-12 px-6 bg-primary hover:bg-primary/90 rounded-xl">
              Send
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Send money instantly to anyone with their AfriBenki tag or phone number
          </p>
        </Card>

        {/* Transactions */}
        <Card className="p-5">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-success/10' : 'bg-primary/10'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownRight className="w-5 h-5 text-success" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{transaction.name}</div>
                      <div className="text-sm text-muted-foreground">{transaction.tag}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.type === 'credit' ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-xs text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="sent" className="text-center py-8 text-muted-foreground">
              Filter sent transactions
            </TabsContent>
            
            <TabsContent value="received" className="text-center py-8 text-muted-foreground">
              Filter received transactions
            </TabsContent>
          </Tabs>
        </Card>

        {/* Security Info */}
        <Card className="p-5 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-foreground mb-1">Scan to Receive</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Share your QR code or tag to receive money instantly from anyone
              </p>
              <Button variant="outline" size="sm" className="border-success text-success hover:bg-success hover:text-white">
                Show QR Code
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
