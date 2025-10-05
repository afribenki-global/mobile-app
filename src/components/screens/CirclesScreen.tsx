import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Users, Plus, Clock, TrendingUp, Calendar, Crown, ArrowLeft } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

export function CirclesScreen() {
  const { formatCurrency, setCurrentScreen, setSelectedCircleId, language, previousScreen, setPreviousScreen } = useApp();
  const [joinedCircles, setJoinedCircles] = useState<number[]>([]);

  const myCircles = [
    {
      id: 1,
      name: 'Family Vacation Fund',
      members: 5,
      contribution: 20000,
      target: 500000,
      collected: 180000,
      frequency: 'Monthly',
      nextPayment: '5 days',
      isAdmin: true,
      memberAvatars: ['👨', '👩', '👧', '👦', '👴'],
    },
    {
      id: 2,
      name: 'Business Capital',
      members: 8,
      contribution: 50000,
      target: 2000000,
      collected: 750000,
      frequency: 'Weekly',
      nextPayment: '2 days',
      isAdmin: false,
      memberAvatars: ['👨‍💼', '👩‍💼', '👨‍🔧', '👩‍🏫', '👨‍⚕️', '👩‍🎨', '👨‍🍳', '👩‍💻'],
    },
  ];

  const suggestedCircles = [
    {
      id: 3,
      name: 'Youth Entrepreneurs Network',
      members: 12,
      contribution: 15000,
      category: 'Business',
    },
    {
      id: 4,
      name: 'Wedding Planning Circle',
      members: 6,
      contribution: 25000,
      category: 'Events',
    },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      <TopBar title="Good Morning" showBackButton={previousScreen === 'explore'} onBackClick={() => {
        setCurrentScreen('explore');
        setPreviousScreen(null);
      }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground">My Circles</h2>
            <p className="text-sm text-muted-foreground">Save together, achieve together</p>
          </div>
          <Button 
            onClick={() => setCurrentScreen('create-circle')}
            className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12 p-0"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Active Circles */}
        <div className="space-y-3">
          {myCircles.map((circle, index) => {
            const progress = (circle.collected / circle.target) * 100;
            
            return (
              <motion.div
                key={circle.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-foreground">{circle.name}</h3>
                        {circle.isAdmin && (
                          <Badge variant="secondary" className="text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{circle.members} members</span>
                        <span>•</span>
                        <span>{circle.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Member Avatars */}
                  <div className="flex items-center gap-1 mb-4">
                    {circle.memberAvatars.slice(0, 5).map((avatar, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-secondary border-2 border-white flex items-center justify-center -ml-2 first:ml-0"
                      >
                        <span className="text-sm">{avatar}</span>
                      </div>
                    ))}
                    {circle.members > 5 && (
                      <div className="w-8 h-8 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center -ml-2 text-xs">
                        +{circle.members - 5}
                      </div>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{progress.toFixed(0)}% collected</span>
                      <span className="font-medium text-foreground">{formatCurrency(circle.collected)}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Target: {formatCurrency(circle.target)}</span>
                      <span>Your share: {formatCurrency(circle.contribution)}</span>
                    </div>
                  </div>

                  {/* Next Payment */}
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Next contribution</span>
                    </div>
                    <span className="font-medium text-foreground">{circle.nextPayment}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSelectedCircleId(circle.id.toString());
                        setCurrentScreen('circle-chat');
                      }}
                      variant="outline"
                      className="flex-1 h-10"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Discussion' : 'Chat'}
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedCircleId(circle.id.toString());
                        setCurrentScreen('circle-contribute');
                      }}
                      className="flex-1 h-10 bg-accent hover:bg-accent/90"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Contribuer' : 'Contribute'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* How Circles Work */}
        <Card className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <h4 className="text-foreground mb-3">💡 How Circles Work</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">1.</span>
              <span>Create or join a circle with friends, family, or colleagues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">2.</span>
              <span>Set contribution amounts and frequency together</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">3.</span>
              <span>Everyone contributes automatically - no chasing payments!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">4.</span>
              <span>Reach your collective goal faster with transparency</span>
            </li>
          </ul>
        </Card>

        {/* Suggested Circles */}
        <div>
          <h3 className="text-foreground mb-3 px-1">Join Public Circles</h3>
          <div className="space-y-3">
            {suggestedCircles.map((circle, index) => (
              <motion.div
                key={circle.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground mb-1">{circle.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {circle.category}
                          </Badge>
                          <span>•</span>
                          <span>{circle.members} members</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={joinedCircles.includes(circle.id) ? "secondary" : "outline"}
                      className={joinedCircles.includes(circle.id) 
                        ? "border-muted" 
                        : "border-primary text-primary hover:bg-primary hover:text-white"}
                      onClick={() => {
                        if (!joinedCircles.includes(circle.id)) {
                          setJoinedCircles([...joinedCircles, circle.id]);
                          toast.success(
                            language === 'fr'
                              ? `Demande envoyée à ${circle.name}. En attente d'approbation de l'administrateur.`
                              : `Request sent to ${circle.name}. Pending admin approval.`
                          );
                        }
                      }}
                      disabled={joinedCircles.includes(circle.id)}
                    >
                      {joinedCircles.includes(circle.id) 
                        ? (language === 'fr' ? 'En attente' : 'Pending')
                        : (language === 'fr' ? 'Rejoindre' : 'Join')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create Circle CTA */}
        <Card className="p-6 bg-gradient-to-r from-primary to-accent text-white border-0">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-white mb-2">Create Your Own Circle</h3>
            <p className="text-sm text-white/90 mb-4">
              Invite friends and family to save together
            </p>
            <Button 
              onClick={() => setCurrentScreen('create-circle')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Create Circle
            </Button>
          </div>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
