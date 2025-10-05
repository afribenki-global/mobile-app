import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { toast } from 'sonner@2.0.3';

export function HelpCenterScreen() {
  const { setCurrentScreen, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');

  const faqs = [
    {
      question: language === 'fr' ? 'Comment créer un plan d\'épargne?' : 'How do I create a savings plan?',
      answer: language === 'fr' 
        ? 'Accédez à l\'onglet Épargner, cliquez sur "Créer un plan", définissez votre objectif, montant cible et fréquence de contribution. Votre plan sera actif immédiatement.'
        : 'Go to the Save tab, click "Create Plan", set your goal, target amount, and contribution frequency. Your plan will be active immediately.',
    },
    {
      question: language === 'fr' ? 'Comment acheter des actions?' : 'How do I buy stocks?',
      answer: language === 'fr'
        ? 'Allez dans Investir > Actions, sélectionnez une action, entrez le nombre d\'unités et confirmez l\'achat. Les fonds seront déduits de votre solde.'
        : 'Go to Invest > Stocks, select a stock, enter the number of units, and confirm purchase. Funds will be deducted from your balance.',
    },
    {
      question: language === 'fr' ? 'Comment recharger mon compte?' : 'How do I top up my account?',
      answer: language === 'fr'
        ? 'Accédez au Portefeuille, cliquez sur "Ajouter des fonds" et suivez les instructions pour transférer de l\'argent depuis votre compte bancaire lié.'
        : 'Go to Wallet, click "Add Funds" and follow the instructions to transfer money from your linked bank account.',
    },
    {
      question: language === 'fr' ? 'Comment rejoindre un cercle?' : 'How do I join a circle?',
      answer: language === 'fr'
        ? 'Allez dans Cercles, parcourez les cercles disponibles ou utilisez un code d\'invitation pour rejoindre un cercle privé.'
        : 'Go to Circles, browse available circles or use an invite code to join a private circle.',
    },
    {
      question: language === 'fr' ? 'Est-ce que mes investissements sont sûrs?' : 'Are my investments safe?',
      answer: language === 'fr'
        ? 'Oui, tous les investissements sont régulés par la SEC nigériane. Nous travaillons uniquement avec des courtiers agréés et les fonds sont conservés en toute sécurité.'
        : 'Yes, all investments are regulated by the Nigerian SEC. We work only with licensed brokers and funds are held securely.',
    },
    {
      question: language === 'fr' ? 'Comment retirer de l\'argent?' : 'How do I withdraw money?',
      answer: language === 'fr'
        ? 'Accédez au Portefeuille, cliquez sur "Retirer", entrez le montant et sélectionnez votre compte bancaire. Les retraits prennent 1-2 jours ouvrables.'
        : 'Go to Wallet, click "Withdraw", enter amount and select your bank account. Withdrawals take 1-2 business days.',
    },
    {
      question: language === 'fr' ? 'Comment puis-je suivre mes investissements?' : 'How can I track my investments?',
      answer: language === 'fr'
        ? 'Allez dans Investir > Mes investissements pour voir tous vos avoirs avec performance, rendements et valeur actuelle.'
        : 'Go to Invest > My Investments to see all your holdings with performance, returns, and current value.',
    },
    {
      question: language === 'fr' ? 'Que faire si j\'oublie mon mot de passe?' : 'What if I forget my password?',
      answer: language === 'fr'
        ? 'Sur l\'écran de connexion, cliquez sur "Mot de passe oublié" et suivez les instructions pour réinitialiser votre mot de passe via SMS ou email.'
        : 'On the login screen, click "Forgot Password" and follow the instructions to reset your password via SMS or email.',
    },
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs;

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: language === 'fr' ? 'Veuillez entrer un message' : 'Please enter a message',
      });
      return;
    }

    toast.success(language === 'fr' ? 'Message envoyé!' : 'Message Sent!', {
      description: language === 'fr' ? 'Nous vous répondrons sous 24 heures' : 'We will respond within 24 hours',
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });

    setMessage('');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('settings')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{language === 'fr' ? 'Centre d\'aide' : 'Help Center'}</h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Nous sommes là pour vous aider' : 'We\'re here to help'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={language === 'fr' ? 'Rechercher dans l\'aide...' : 'Search help...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card h-12"
          />
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setShowContactForm(!showContactForm)}
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <MessageCircle className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-xs text-foreground">{language === 'fr' ? 'Message' : 'Message'}</p>
          </button>

          <a
            href="tel:+2341234567890"
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Phone className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-xs text-foreground">{language === 'fr' ? 'Appeler' : 'Call'}</p>
          </a>

          <a
            href="mailto:support@afribenki.com"
            className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-xs text-foreground">Email</p>
          </a>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card className="p-6">
              <h3 className="text-foreground mb-4">{language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}</h3>
              <div className="space-y-4">
                <div>
                  <Label>{language === 'fr' ? 'Votre message' : 'Your Message'}</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={language === 'fr' ? 'Décrivez votre problème...' : 'Describe your issue...'}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="w-full h-12 bg-accent hover:bg-accent/90"
                >
                  {language === 'fr' ? 'Envoyer le message' : 'Send Message'}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* FAQs */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}</h3>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{language === 'fr' ? 'Nous contacter' : 'Contact Us'}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-foreground">+234 123 456 7890</p>
                <p className="text-xs text-muted-foreground">{language === 'fr' ? 'Lun-Ven 9h-17h WAT' : 'Mon-Fri 9AM-5PM WAT'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-foreground">support@afribenki.com</p>
                <p className="text-xs text-muted-foreground">{language === 'fr' ? 'Réponse sous 24h' : 'Response within 24hrs'}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
