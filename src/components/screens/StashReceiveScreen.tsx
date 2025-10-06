import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Download, Copy, QrCode, Share2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function StashReceiveScreen() {
  const { formatCurrency, user, setCurrentScreen } = useApp();
  const [requestAmount, setRequestAmount] = useState('');
  
  const userTag = `@${user?.username || 'user'}`;
  const phoneNumber = user?.phone || '000006';

  const handleCopyTag = () => {
    navigator.clipboard.writeText(userTag);
    toast.success('Tag copied to clipboard');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success('Phone number copied to clipboard');
  };

  const handleShare = () => {
    const shareText = `Send me money on AfriBenki!\n\nTag: ${userTag}\nPhone: ${phoneNumber}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My AfriBenki Details',
        text: shareText,
      }).catch(() => {
        navigator.clipboard.writeText(shareText);
        toast.success('Details copied to clipboard');
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Details copied to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Receive Money" showBack onBack={() => setCurrentScreen('wallet')} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* QR Code Card */}
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="w-48 h-48 bg-white border-4 border-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <QrCode className="w-24 h-24 text-white" />
              </div>
            </div>
            <h3 className="text-foreground mb-2">Scan to Pay Me</h3>
            <p className="text-sm text-muted-foreground">
              Ask someone to scan this QR code to send you money instantly
            </p>
          </div>

          <Button
            onClick={() => setCurrentScreen('stash-qr')}
            variant="outline"
            className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
          >
            <QrCode className="w-5 h-5 mr-2" />
            View Full QR Code
          </Button>
        </Card>

        {/* Your Details */}
        <Card className="p-5">
          <h4 className="text-foreground mb-4">Your Payment Details</h4>
          
          <div className="space-y-3">
            <div>
              <Label className="text-muted-foreground mb-1 block text-sm">
                AfriBenki Tag
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  value={userTag}
                  readOnly
                  className="h-12 rounded-xl bg-secondary"
                />
                <Button
                  onClick={handleCopyTag}
                  variant="outline"
                  className="h-12 px-4 rounded-xl"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm">
                Phone Number
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  value={phoneNumber}
                  readOnly
                  className="h-12 rounded-xl bg-secondary"
                />
                <Button
                  onClick={handleCopyPhone}
                  variant="outline"
                  className="h-12 px-4 rounded-xl"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Request Specific Amount */}
        <Card className="p-5">
          <h4 className="text-foreground mb-4">Request Specific Amount</h4>
          
          <Label htmlFor="requestAmount" className="text-muted-foreground mb-2 block text-sm">
            Amount (Optional)
          </Label>
          <Input
            id="requestAmount"
            type="number"
            placeholder="0.00"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
            className="h-14 text-xl text-center rounded-xl mb-4"
          />

          <Button
            onClick={() => {
              const shareText = requestAmount 
                ? `Please send me ${formatCurrency(parseFloat(requestAmount))} on AfriBenki\n\nTag: ${userTag}\nPhone: ${phoneNumber}`
                : `Send me money on AfriBenki\n\nTag: ${userTag}\nPhone: ${phoneNumber}`;
              
              if (navigator.share) {
                navigator.share({
                  title: 'Payment Request',
                  text: shareText,
                }).catch(() => {
                  navigator.clipboard.writeText(shareText);
                  toast.success('Request copied to clipboard');
                });
              } else {
                navigator.clipboard.writeText(shareText);
                toast.success('Request copied to clipboard');
              }
            }}
            className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Payment Request
          </Button>
        </Card>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full h-14 border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share My Details
        </Button>

        {/* Info */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-foreground mb-1">Instant Payments</h4>
              <p className="text-xs text-muted-foreground">
                Money sent to you appears instantly in your Stash Balance. No fees, no waiting.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
