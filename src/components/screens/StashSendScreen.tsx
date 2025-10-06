import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Send, Search, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function StashSendScreen() {
  const { formatCurrency, user, setCurrentScreen, updateBalance } = useApp();
  const { addActivity } = useActivity();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const recentContacts = [
    { id: 1, name: 'John Mensah', tag: '@johnm', avatar: null },
    { id: 2, name: 'Chioma Nwankwo', tag: '@chioma', avatar: null },
    { id: 3, name: 'Kwame Osei', tag: '@kwame', avatar: null },
    { id: 4, name: 'Fatima Hassan', tag: '@fatima_h', avatar: null },
  ];

  const handleSend = () => {
    const sendAmount = parseFloat(amount);
    
    if (!recipient && !selectedContact) {
      toast.error('Please select a recipient');
      return;
    }
    
    if (!sendAmount || sendAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (sendAmount > (user?.balance || 0)) {
      toast.error('Insufficient balance');
      return;
    }

    const recipientName = selectedContact ? selectedContact.name : recipient;
    const recipientTag = selectedContact ? selectedContact.tag : recipient;

    // Update balance
    updateBalance(-sendAmount, 'withdraw');

    // Add activity
    addActivity({
      type: 'wallet_send',
      title: 'Money Sent',
      description: `Sent to ${recipientName}`,
      amount: sendAmount,
      icon: '📤',
      category: 'wallet',
      status: 'completed',
      metadata: {
        recipient: recipientTag,
        note: note,
      },
    });

    toast.success(`Successfully sent ${formatCurrency(sendAmount)} to ${recipientName}`);
    setCurrentScreen('wallet');
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Send Money" showBack onBack={() => setCurrentScreen('wallet')} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Balance Display */}
        <Card className="p-5 bg-gradient-to-br from-primary to-accent text-white border-0">
          <div className="text-center">
            <p className="text-sm text-white/80 mb-1">Available Balance</p>
            <h2 className="text-white text-3xl">{formatCurrency(user?.balance || 0)}</h2>
          </div>
        </Card>

        {/* Recipient Selection */}
        <Card className="p-5">
          <Label htmlFor="recipient" className="text-foreground mb-2 block">
            Recipient
          </Label>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="recipient"
              placeholder="Enter @username or phone number"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>

          {/* Recent Contacts */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Recent</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {recentContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact);
                    setRecipient(contact.tag);
                  }}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {contact.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-foreground text-center line-clamp-1">
                    {contact.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Amount Input */}
        <Card className="p-5">
          <Label htmlFor="amount" className="text-foreground mb-2 block">
            Amount
          </Label>
          <div className="relative mb-4">
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-16 text-2xl text-center rounded-xl"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[1000, 5000, 10000, 25000].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="py-2 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-colors text-sm"
              >
                {formatCurrency(quickAmount)}
              </button>
            ))}
          </div>
        </Card>

        {/* Note */}
        <Card className="p-5">
          <Label htmlFor="note" className="text-foreground mb-2 block">
            Note (Optional)
          </Label>
          <Input
            id="note"
            placeholder="What's this for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="h-12 rounded-xl"
          />
        </Card>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl"
          disabled={!recipient && !selectedContact}
        >
          <Send className="w-5 h-5 mr-2" />
          Send Money
        </Button>

        {/* Security Notice */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-xs text-muted-foreground text-center">
            Your transaction is secured with bank-level encryption. Money will be sent instantly.
          </p>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
