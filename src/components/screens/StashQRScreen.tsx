import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { QrCode, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function StashQRScreen() {
  const { user, setCurrentScreen } = useApp();
  
  const userTag = `@${user?.username || 'user'}`;
  const userName = user?.name || 'User';

  const handleDownload = () => {
    toast.success('QR code downloaded');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AfriBenki QR Code',
        text: `Scan this QR code to send me money on AfriBenki!\nTag: ${userTag}`,
      }).catch(() => {
        toast.success('Share link copied');
      });
    } else {
      toast.success('Share link copied');
    }
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="My QR Code" showBack onBack={() => setCurrentScreen('wallet')} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Main QR Code */}
        <Card className="p-8 bg-gradient-to-br from-primary to-accent">
          <div className="bg-white rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="w-64 h-64 bg-white border-8 border-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-56 h-56 bg-gradient-to-br from-primary via-accent to-primary rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-3">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-foreground text-xl">{userName}</h3>
                <p className="text-primary">{userTag}</p>
                <p className="text-xs text-muted-foreground">
                  Scan to send money instantly
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="h-14 border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            className="h-14 bg-primary hover:bg-primary/90 text-white rounded-xl"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>

        {/* Instructions */}
        <Card className="p-5">
          <h4 className="text-foreground mb-3">How it works</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <p>Share your QR code with anyone you want to receive money from</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <p>They scan it using the AfriBenki app camera</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <p>Money arrives in your Stash Balance instantly</p>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <QrCode className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-foreground mb-1">Safe & Secure</h4>
              <p className="text-xs text-muted-foreground">
                Your QR code is unique to you and uses bank-level encryption. Share it safely!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
