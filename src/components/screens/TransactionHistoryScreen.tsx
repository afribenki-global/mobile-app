import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Download, 
  Search,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  PiggyBank,
  Users,
  CreditCard,
  Send,
  Wallet
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  category: 'investment' | 'savings' | 'circle' | 'transfer' | 'topup' | 'withdrawal' | 'interest';
  title: string;
  description: string;
  amount: number;
  balance: number;
  date: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  recipient?: string;
  source?: string;
}

export function TransactionHistoryScreen() {
  const { setCurrentScreen, formatCurrency, t, language } = useApp();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Mock comprehensive transaction data
  const allTransactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'credit',
      category: 'interest',
      title: 'Savings Interest',
      description: 'Monthly interest on Emergency Fund',
      amount: 5430,
      balance: 125000,
      date: '2025-10-05',
      timestamp: '2025-10-05T10:30:00',
      status: 'completed',
      reference: 'INT-2025-001',
      source: 'Emergency Fund Savings',
    },
    {
      id: 'TXN002',
      type: 'debit',
      category: 'savings',
      title: 'Auto Save',
      description: 'Automatic savings contribution',
      amount: -10000,
      balance: 119570,
      date: '2025-10-04',
      timestamp: '2025-10-04T09:00:00',
      status: 'completed',
      reference: 'SAV-2025-045',
      recipient: 'Emergency Fund',
    },
    {
      id: 'TXN003',
      type: 'credit',
      category: 'investment',
      title: 'Money Market Returns',
      description: 'Quarterly returns from Money Market Fund',
      amount: 12500,
      balance: 129570,
      date: '2025-10-03',
      timestamp: '2025-10-03T14:20:00',
      status: 'completed',
      reference: 'INV-2025-078',
      source: 'Money Market Fund',
    },
    {
      id: 'TXN004',
      type: 'credit',
      category: 'topup',
      title: 'Wallet Top Up',
      description: 'Bank transfer from GTBank',
      amount: 50000,
      balance: 117070,
      date: '2025-10-02',
      timestamp: '2025-10-02T16:45:00',
      status: 'completed',
      reference: 'TOP-2025-234',
      source: 'GTBank ***4532',
    },
    {
      id: 'TXN005',
      type: 'debit',
      category: 'investment',
      title: 'Investment Purchase',
      description: 'Equity Growth Fund - 100 units',
      amount: -25000,
      balance: 67070,
      date: '2025-10-01',
      timestamp: '2025-10-01T11:30:00',
      status: 'completed',
      reference: 'INV-2025-077',
      recipient: 'Equity Growth Fund',
    },
    {
      id: 'TXN006',
      type: 'credit',
      category: 'circle',
      title: 'Circle Payout',
      description: 'Weekly rotation from Family Circle',
      amount: 80000,
      balance: 92070,
      date: '2025-09-30',
      timestamp: '2025-09-30T10:00:00',
      status: 'completed',
      reference: 'CIR-2025-456',
      source: 'Family Circle',
    },
    {
      id: 'TXN007',
      type: 'debit',
      category: 'circle',
      title: 'Circle Contribution',
      description: 'Weekly contribution to Family Circle',
      amount: -20000,
      balance: 12070,
      date: '2025-09-29',
      timestamp: '2025-09-29T09:00:00',
      status: 'completed',
      reference: 'CIR-2025-455',
      recipient: 'Family Circle',
    },
    {
      id: 'TXN008',
      type: 'debit',
      category: 'transfer',
      title: 'Money Transfer',
      description: 'Sent to @chioma',
      amount: -15000,
      balance: 32070,
      date: '2025-09-28',
      timestamp: '2025-09-28T15:22:00',
      status: 'completed',
      reference: 'TRF-2025-892',
      recipient: 'Chioma Nwankwo (@chioma)',
    },
    {
      id: 'TXN009',
      type: 'credit',
      category: 'transfer',
      title: 'Money Received',
      description: 'Received from @kwame',
      amount: 50000,
      balance: 47070,
      date: '2025-09-27',
      timestamp: '2025-09-27T12:10:00',
      status: 'completed',
      reference: 'TRF-2025-891',
      source: 'Kwame Osei (@kwame)',
    },
    {
      id: 'TXN010',
      type: 'debit',
      category: 'withdrawal',
      title: 'Withdrawal',
      description: 'Bank transfer to Access Bank',
      amount: -30000,
      balance: -2930,
      date: '2025-09-26',
      timestamp: '2025-09-26T14:35:00',
      status: 'completed',
      reference: 'WDR-2025-123',
      recipient: 'Access Bank ***7865',
    },
    {
      id: 'TXN011',
      type: 'debit',
      category: 'investment',
      title: 'Investment Purchase',
      description: 'Tech Stock ETF - 50 units',
      amount: -40000,
      balance: 27070,
      date: '2025-09-25',
      timestamp: '2025-09-25T10:15:00',
      status: 'completed',
      reference: 'INV-2025-076',
      recipient: 'Tech Stock ETF',
    },
    {
      id: 'TXN012',
      type: 'credit',
      category: 'investment',
      title: 'Dividend Payment',
      description: 'Quarterly dividend from African Equity Fund',
      amount: 8500,
      balance: 67070,
      date: '2025-09-24',
      timestamp: '2025-09-24T11:00:00',
      status: 'completed',
      reference: 'DIV-2025-034',
      source: 'African Equity Fund',
    },
    {
      id: 'TXN013',
      type: 'debit',
      category: 'savings',
      title: 'Auto Save',
      description: 'Weekly savings to Dream Home Fund',
      amount: -5000,
      balance: 58570,
      date: '2025-09-23',
      timestamp: '2025-09-23T09:00:00',
      status: 'completed',
      reference: 'SAV-2025-044',
      recipient: 'Dream Home Fund',
    },
    {
      id: 'TXN014',
      type: 'credit',
      category: 'topup',
      title: 'Wallet Top Up',
      description: 'Card payment - Visa ending 3421',
      amount: 100000,
      balance: 63570,
      date: '2025-09-22',
      timestamp: '2025-09-22T16:20:00',
      status: 'completed',
      reference: 'TOP-2025-233',
      source: 'Visa ***3421',
    },
    {
      id: 'TXN015',
      type: 'debit',
      category: 'transfer',
      title: 'Money Transfer',
      description: 'Sent to @fatima_h',
      amount: -25000,
      balance: -36430,
      date: '2025-09-21',
      timestamp: '2025-09-21T13:45:00',
      status: 'pending',
      reference: 'TRF-2025-890',
      recipient: 'Fatima Hassan (@fatima_h)',
    },
  ];

  // Filter transactions based on search, type, and date
  const filteredTransactions = allTransactions.filter(txn => {
    // Filter by type
    if (filterType !== 'all' && txn.type !== filterType) return false;
    
    // Filter by search query
    if (searchQuery && !txn.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !txn.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !txn.reference.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by date
    if (dateFilter !== 'all') {
      const txnDate = new Date(txn.date);
      const now = new Date();
      
      if (dateFilter === 'today') {
        if (txnDate.toDateString() !== now.toDateString()) return false;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (txnDate < weekAgo) return false;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (txnDate < monthAgo) return false;
      }
    }
    
    return true;
  });

  // Calculate summary statistics
  const totalCredit = filteredTransactions
    .filter(txn => txn.type === 'credit')
    .reduce((sum, txn) => sum + txn.amount, 0);
  
  const totalDebit = filteredTransactions
    .filter(txn => txn.type === 'debit')
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  const getCategoryIcon = (category: Transaction['category']) => {
    switch (category) {
      case 'investment': return TrendingUp;
      case 'savings': return PiggyBank;
      case 'circle': return Users;
      case 'transfer': return Send;
      case 'topup': return ArrowDownRight;
      case 'withdrawal': return ArrowUpRight;
      case 'interest': return CreditCard;
      default: return Wallet;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return XCircle;
      default: return Clock;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (selectedTransaction) {
    // Transaction Detail View
    const StatusIcon = getStatusIcon(selectedTransaction.status);
    const CategoryIcon = getCategoryIcon(selectedTransaction.category);
    
    return (
      <div className="min-h-screen bg-muted pb-6">
        <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
          <button
            onClick={() => setSelectedTransaction(null)}
            className="mb-4 p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white mb-1">Transaction Details</h2>
          <p className="text-white/80 text-sm">{selectedTransaction.reference}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 max-w-lg mx-auto space-y-4"
        >
          {/* Amount Card */}
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className={`inline-flex w-16 h-16 rounded-full items-center justify-center mb-4 ${
                selectedTransaction.type === 'credit' ? 'bg-success/10' : 'bg-primary/10'
              }`}>
                {selectedTransaction.type === 'credit' ? (
                  <ArrowDownRight className="w-8 h-8 text-success" />
                ) : (
                  <ArrowUpRight className="w-8 h-8 text-primary" />
                )}
              </div>
              <h3 className={`text-3xl mb-2 ${
                selectedTransaction.type === 'credit' ? 'text-success' : 'text-foreground'
              }`}>
                {selectedTransaction.type === 'credit' ? '+' : ''}{formatCurrency(selectedTransaction.amount)}
              </h3>
              <p className="text-muted-foreground">{selectedTransaction.title}</p>
            </div>

            <div className="pt-6 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${getStatusColor(selectedTransaction.status)}`} />
                  <Badge variant={selectedTransaction.status === 'completed' ? 'default' : 'secondary'}>
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category</span>
                <div className="flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground capitalize">{selectedTransaction.category}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="text-foreground">
                  {new Date(selectedTransaction.timestamp).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Reference</span>
                <span className="text-foreground font-mono text-sm">{selectedTransaction.reference}</span>
              </div>

              {selectedTransaction.source && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Source</span>
                  <span className="text-foreground">{selectedTransaction.source}</span>
                </div>
              )}

              {selectedTransaction.recipient && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Recipient</span>
                  <span className="text-foreground">{selectedTransaction.recipient}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Balance After</span>
                <span className="text-foreground">{formatCurrency(selectedTransaction.balance)}</span>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h4 className="text-foreground mb-2">Description</h4>
            <p className="text-muted-foreground">{selectedTransaction.description}</p>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="h-12">
              Report Issue
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Transaction List View
  return (
    <div className="min-h-screen bg-muted pb-20">
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('wallet')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-1">Transaction History</h2>
        <p className="text-white/80 text-sm">All your transactions in one place</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Total In</span>
            </div>
            <h3 className="text-success">{formatCurrency(totalCredit)}</h3>
          </Card>
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-5 h-5 text-destructive" />
              <span className="text-sm text-muted-foreground">Total Out</span>
            </div>
            <h3 className="text-destructive">{formatCurrency(totalDebit)}</h3>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Tabs value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)} className="flex-1">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="credit">In</TabsTrigger>
                  <TabsTrigger value="debit">Out</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Date Filter */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['all', 'today', 'week', 'month'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDateFilter(filter as typeof dateFilter)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    dateFilter === filter
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {filter === 'all' ? 'All Time' : filter === 'today' ? 'Today' : filter === 'week' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Transactions List */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground">
              {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-foreground mb-2">No transactions found</h4>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((txn) => {
                const CategoryIcon = getCategoryIcon(txn.category);
                const StatusIcon = getStatusIcon(txn.status);
                
                return (
                  <motion.div
                    key={txn.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTransaction(txn)}
                    className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.type === 'credit' ? 'bg-success/10' : 'bg-primary/10'
                      }`}>
                        <CategoryIcon className={`w-5 h-5 ${
                          txn.type === 'credit' ? 'text-success' : 'text-primary'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-foreground truncate">{txn.title}</h4>
                          <StatusIcon className={`w-3 h-3 flex-shrink-0 ${getStatusColor(txn.status)}`} />
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{formatDate(txn.date)}</p>
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <div className={`font-medium ${
                        txn.type === 'credit' ? 'text-success' : 'text-foreground'
                      }`}>
                        {txn.type === 'credit' ? '+' : ''}{formatCurrency(txn.amount)}
                      </div>
                      <div className="text-xs text-muted-foreground">{txn.category}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
