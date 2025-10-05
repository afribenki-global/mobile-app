import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { useCircleMessages } from '../CircleMessagesContext';
import { ArrowLeft, Send, Paperclip, Image as ImageIcon, MoreVertical, Users, Settings, UserPlus, Bell, Shield, LogOut, ChevronRight, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  type?: 'message' | 'system' | 'contribution';
  amount?: number;
}

export function CircleChatScreen() {
  const { setCurrentScreen, user, t, language, selectedCircleId, formatCurrency } = useApp();
  const { messages: globalMessages, addMessage } = useCircleMessages();
  const [inputText, setInputText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Initialize with default messages and merge with global messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: 'user2',
      userName: 'Amina Okafor',
      avatar: '👩',
      text: language === 'fr' ? 'Bonjour tout le monde! Qui a fait sa contribution de ce mois-ci?' : 'Hello everyone! Who has made their contribution this month?',
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: '2',
      userId: 'user3',
      userName: 'Kwame Mensah',
      avatar: '👨',
      text: language === 'fr' ? 'Je l\'ai fait hier. Les économies vont bien!' : 'I did mine yesterday. Savings looking good!',
      timestamp: new Date(Date.now() - 3000000),
      isOwn: false,
    },
    {
      id: '3',
      userId: user?.id || 'me',
      userName: user?.name || 'You',
      avatar: user?.profilePicture || '👤',
      text: language === 'fr' ? 'Je le ferai aujourd\'hui. Merci pour le rappel!' : 'I will do mine today. Thanks for the reminder!',
      timestamp: new Date(Date.now() - 2400000),
      isOwn: true,
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Fatima Ibrahim',
      avatar: '👩',
      text: language === 'fr' ? 'Génial! Nous sommes à 45% de notre objectif.' : 'Great! We are 45% towards our goal.',
      timestamp: new Date(Date.now() - 1800000),
      isOwn: false,
    },
    {
      id: '5',
      userId: 'user5',
      userName: 'John Osei',
      avatar: '👨',
      text: language === 'fr' ? 'Quelqu\'un veut-il augmenter la contribution mensuelle?' : 'Anyone wants to increase the monthly contribution?',
      timestamp: new Date(Date.now() - 900000),
      isOwn: false,
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Merge global circle messages with local messages
  useEffect(() => {
    const circleMessages = globalMessages.filter(msg => msg.circleId === (selectedCircleId || '1'));
    if (circleMessages.length > 0) {
      setMessages(prev => {
        const newMessages = circleMessages.filter(
          cm => !prev.some(pm => pm.id === cm.id)
        );
        return [...prev, ...newMessages].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      });
    }
  }, [globalMessages, selectedCircleId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: user?.id || 'me',
      userName: user?.name || 'You',
      avatar: user?.profilePicture || '👤',
      text: inputText,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate response
    setTimeout(() => {
      const responses = language === 'fr' ? [
        'Bonne idée! Discutons-en.',
        'Je suis d\'accord avec ça.',
        'Compté sur moi!',
        'Excellent point!',
      ] : [
        'Good idea! Let\'s discuss this.',
        'I agree with that.',
        'Count me in!',
        'Excellent point!',
      ];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        userId: 'user2',
        userName: 'Amina Okafor',
        avatar: '👩',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isOwn: false,
      };

      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return language === 'fr' ? 'À l\'instant' : 'Just now';
    if (minutes < 60) return `${minutes}${language === 'fr' ? 'min' : 'm'}`;
    if (hours < 24) return `${hours}${language === 'fr' ? 'h' : 'h'}`;
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US');
  };

  const handleNavigateToSettings = (screen: string) => {
    setShowSettings(false);
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-4 safe-area-inset-top">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setCurrentScreen('circles')}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h3 className="text-white">{language === 'fr' ? 'Fonds de vacances familiales' : 'Family Vacation Fund'}</h3>
            <p className="text-white/80 text-sm">5 {t('members')}</p>
          </div>
          <Sheet open={showSettings} onOpenChange={setShowSettings}>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-white/10 rounded-full">
                <MoreVertical className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>{language === 'fr' ? 'Paramètres du groupe' : 'Group Settings'}</SheetTitle>
                <SheetDescription>
                  {language === 'fr' 
                    ? 'Gérez les paramètres, les informations et les membres du groupe'
                    : 'Manage group settings, information, and members'}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                {/* Group Info */}
                <div>
                  <h4 className="text-foreground mb-3">{language === 'fr' ? 'Informations du groupe' : 'Group Information'}</h4>
                  <Card className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Nom du groupe' : 'Group Name'}</span>
                      <span className="font-medium text-foreground">{language === 'fr' ? 'Fonds de vacances familiales' : 'Family Vacation Fund'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Membres' : 'Members'}</span>
                      <span className="font-medium text-foreground">5 {language === 'fr' ? 'membres' : 'members'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Objectif' : 'Goal'}</span>
                      <span className="font-medium text-foreground">₦500,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Progression' : 'Progress'}</span>
                      <span className="font-medium text-success">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Créé le' : 'Created on'}</span>
                      <span className="font-medium text-foreground">{language === 'fr' ? '15 Sept 2024' : 'Sept 15, 2024'}</span>
                    </div>
                  </Card>
                </div>

                {/* Group Metrics */}
                <div>
                  <h4 className="text-foreground mb-3">{language === 'fr' ? 'Statistiques' : 'Metrics'}</h4>
                  <Card className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Total collecté' : 'Total Collected'}</span>
                      <span className="font-medium text-foreground">₦225,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Contributions ce mois-ci' : 'This Month\'s Contributions'}</span>
                      <span className="font-medium text-foreground">₦45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Messages' : 'Messages'}</span>
                      <span className="font-medium text-foreground">{messages.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === 'fr' ? 'Activité' : 'Activity'}</span>
                      <span className="font-medium text-success">{language === 'fr' ? 'Élevée' : 'High'}</span>
                    </div>
                  </Card>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="text-foreground mb-3">{language === 'fr' ? 'Actions' : 'Actions'}</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleNavigateToSettings('circle-add-members')}
                      className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <UserPlus className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{language === 'fr' ? 'Ajouter des membres' : 'Add Members'}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    
                    <button 
                      onClick={() => handleNavigateToSettings('notifications')}
                      className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{language === 'fr' ? 'Notifications' : 'Notifications'}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    
                    <button 
                      onClick={() => handleNavigateToSettings('privacy-policy')}
                      className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{language === 'fr' ? 'Confidentialité' : 'Privacy'}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    
                    <button 
                      onClick={() => handleNavigateToSettings('circle-settings')}
                      className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{language === 'fr' ? 'Paramètres du groupe' : 'Group Settings'}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        if (window.confirm(language === 'fr' 
                          ? 'Êtes-vous sûr de vouloir quitter ce groupe?' 
                          : 'Are you sure you want to leave this group?'
                        )) {
                          toast.success(language === 'fr' ? 'Vous avez quitté le groupe' : 'You left the group');
                          setTimeout(() => setCurrentScreen('circles'), 1000);
                        }
                      }}
                      className="w-full flex items-center justify-between p-4 bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-destructive" />
                        <span className="text-destructive">{language === 'fr' ? 'Quitter le groupe' : 'Leave Group'}</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Members List */}
                <div>
                  <h4 className="text-foreground mb-3">{language === 'fr' ? 'Membres' : 'Members'}</h4>
                  <div className="space-y-2">
                    {['Amina Okafor', 'Kwame Mensah', 'Fatima Ibrahim', 'John Osei', user?.name || 'You'].map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary text-white">
                            {['👩', '👨', '👩', '👨', '👤'][index]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{member}</div>
                          <div className="text-sm text-muted-foreground">
                            {index === 0 && (language === 'fr' ? 'Administrateur' : 'Admin')}
                            {index === 4 && (language === 'fr' ? 'Vous' : 'You')}
                            {index !== 0 && index !== 4 && (language === 'fr' ? 'Membre' : 'Member')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Members */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/80" />
          <div className="flex -space-x-2">
            {['👨', '👩', '👧', '👦', '👤'].map((emoji, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
          >
            {message.type === 'contribution' || message.type === 'system' ? (
              // System/Contribution message
              <div className="w-full flex justify-center">
                <div className="max-w-[80%] px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <p className="text-foreground">{message.text}</p>
                  </div>
                  {message.amount && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                {!message.isOwn && (
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-white">
                      {message.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  {!message.isOwn && (
                    <span className="text-xs text-muted-foreground mb-1 px-1">
                      {message.userName}
                    </span>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.isOwn
                        ? 'bg-accent text-white'
                        : 'bg-card text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-4 safe-area-inset-bottom">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </button>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('typeMessage')}
            className="flex-1 h-12 rounded-full"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="h-12 w-12 rounded-full bg-accent hover:bg-accent/90"
            disabled={!inputText.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
