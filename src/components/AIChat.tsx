import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Sparkles, TrendingUp, PiggyBank, DollarSign, BookOpen, Target, Users, Settings, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useApp } from './AppContext';
import { useActivity } from './ActivityContext';

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
      text: "Hi! I'm your AfriBenki AI Financial Advisor. I have complete knowledge of your account, activities, and can guide you through every feature. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        'Show my dashboard',
        'How do I invest?',
        'Create a savings plan',
        'What are circles?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, formatCurrency, setCurrentScreen, language, currentScreen } = useApp();
  const { activities, getRecentActivities } = useActivity();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    const isEnglish = language === 'en';
    const isFrench = language === 'fr';
    
    // ===== USER LEVEL & LEARNING STAGE DETECTION =====
    const isBeginnerQuery = lowerMessage.match(/beginner|start|new|first time|don'?t know|what is|explain/i);
    const isIntermediateQuery = lowerMessage.match(/how to|should i|recommend|strategy|better/i);
    const isAdvancedQuery = lowerMessage.match(/optimize|maximize|diversif|portfolio allocation|roi|compound/i);
    
    // ===== NAVIGATION COMMANDS =====
    // Home/Dashboard
    if (lowerMessage.match(/dashboard|home|main|overview/i)) {
      setTimeout(() => setCurrentScreen('home'), 500);
      return {
        id: Date.now().toString(),
        text: isEnglish ? "Taking you to your dashboard! 🏠 Here you can see your balance, portfolio, recent activities, and quick actions." : "Direction tableau de bord! 🏠 Ici vous pouvez voir votre solde, portfolio, activités récentes et actions rapides.",
        sender: 'ai',
        timestamp: new Date(),
      };
    }

    // Wallet
    if (lowerMessage.match(/wallet|balance|my money|funds available/i)) {
      setTimeout(() => setCurrentScreen('wallet'), 500);
      return {
        id: Date.now().toString(),
        text: isEnglish ? `Opening your wallet! 💳 Current balance: ${formatCurrency(user?.balance || 0)}. You can top-up, withdraw, or view transaction history from here.` : `Ouverture de votre portefeuille! 💳 Solde actuel: ${formatCurrency(user?.balance || 0)}. Vous pouvez recharger, retirer ou voir l'historique des transactions d'ici.`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Top up wallet', 'Withdraw funds', 'Transaction history'] : ['Recharger', 'Retirer', 'Historique']
      };
    }

    // Savings
    if (lowerMessage.match(/savings|save|saving plan|emergency fund/i)) {
      setTimeout(() => setCurrentScreen('save'), 500);
      return {
        id: Date.now().toString(),
        text: isBeginnerQuery 
          ? (isEnglish ? "Great question for a beginner! 💰 Savings plans help you set aside money for specific goals. I'm taking you to the Savings section where you can create your first plan. Start with an emergency fund - aim for 3-6 months of expenses!" : "Excellente question pour un débutant! 💰 Les plans d'épargne vous aident à mettre de l'argent de côté pour des objectifs spécifiques. Je vous emmène à la section Épargne où vous pouvez créer votre premier plan. Commencez par un fonds d'urgence - visez 3-6 mois de dépenses!")
          : (isEnglish ? "Opening your savings section! You can create goal-based savings plans, track progress, and earn interest. Your current savings: ${formatCurrency(user?.savings || 0)}." : "Ouverture de votre section épargne! Vous pouvez créer des plans d'épargne basés sur des objectifs, suivre les progrès et gagner des intérêts. Votre épargne actuelle: ${formatCurrency(user?.savings || 0)}."),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Create savings plan', 'Emergency fund tips', 'How much to save?'] : ['Créer un plan', 'Conseils fonds d\'urgence', 'Combien épargner?']
      };
    }

    // Investments
    if (lowerMessage.match(/invest|investment|portfolio|stocks|bonds|mutual fund/i)) {
      setTimeout(() => setCurrentScreen('invest'), 500);
      return {
        id: Date.now().toString(),
        text: isBeginnerQuery
          ? (isEnglish ? "Perfect timing to learn about investing! 📈 As a beginner, start with low-risk options like Money Market Funds (12% annual return). I'm opening your investment section. Rule #1: Only invest money you can afford to lose!" : "Parfait pour apprendre à investir! 📈 En tant que débutant, commencez par des options à faible risque comme les fonds du marché monétaire (12% de rendement annuel). J'ouvre votre section investissement. Règle #1: N'investissez que l'argent que vous pouvez vous permettre de perdre!")
          : isIntermediateQuery
          ? (isEnglish ? "For intermediate investors, I recommend diversifying: 60% low-risk (Money Market), 30% medium-risk (Bonds), 10% high-risk (Equity). Your current portfolio value: ${formatCurrency(user?.portfolioValue || 0)}. Let me show you available options!" : "Pour les investisseurs intermédiaires, je recommande de diversifier: 60% faible risque (Marché monétaire), 30% risque moyen (Obligations), 10% risque élevé (Actions). Valeur actuelle du portfolio: ${formatCurrency(user?.portfolioValue || 0)}. Laissez-moi vous montrer les options disponibles!")
          : (isEnglish ? "Advanced investor mode! 🎯 Your portfolio is at ${formatCurrency(user?.portfolioValue || 0)}. Consider rebalancing quarterly, dollar-cost averaging, and exploring sector-specific funds for optimal returns. Opening investment dashboard now!" : "Mode investisseur avancé! 🎯 Votre portfolio est à ${formatCurrency(user?.portfolioValue || 0)}. Envisagez de rééquilibrer trimestriellement, la moyenne d'achat périodique et l'exploration de fonds sectoriels pour des rendements optimaux. Ouverture du tableau de bord d'investissement!"),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isBeginnerQuery 
          ? (isEnglish ? ['What is a mutual fund?', 'How much to invest?', 'Investment risks'] : ['Qu\'est-ce qu\'un fonds?', 'Combien investir?', 'Risques d\'investissement'])
          : (isEnglish ? ['View mutual funds', 'Check stocks', 'Bond options'] : ['Voir fonds communs', 'Vérifier actions', 'Options d\'obligations'])
      };
    }

    // Circles
    if (lowerMessage.match(/circle|group saving|save together|join circle/i)) {
      setTimeout(() => setCurrentScreen('circles'), 500);
      return {
        id: Date.now().toString(),
        text: isBeginnerQuery
          ? (isEnglish ? "Circles are awesome for beginners! 👥 It's like a group savings account with friends/family. Everyone contributes regularly, and you reach goals faster together. Perfect for weddings, vacations, or business capital. I'm opening your Circles section now!" : "Les cercles sont géniaux pour les débutants! 👥 C'est comme un compte d'épargne de groupe avec amis/famille. Tout le monde contribue régulièrement et vous atteignez les objectifs plus rapidement ensemble. Parfait pour mariages, vacances ou capital d'entreprise. J'ouvre votre section Cercles maintenant!")
          : (isEnglish ? "Circles help you save collectively! Join existing circles or create your own. Features: Automated contributions, transparent tracking, and social accountability. Let me show you available circles!" : "Les cercles vous aident à épargner collectivement! Rejoignez des cercles existants ou créez le vôtre. Fonctionnalités: Contributions automatisées, suivi transparent et responsabilité sociale. Laissez-moi vous montrer les cercles disponibles!"),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Create a circle', 'Join public circles', 'How circles work'] : ['Créer un cercle', 'Rejoindre des cercles', 'Comment ça marche']
      };
    }

    // Explore/Education
    if (lowerMessage.match(/explore|learn|education|articles|calculator|market insight/i)) {
      setTimeout(() => setCurrentScreen('explore'), 500);
      return {
        id: Date.now().toString(),
        text: isEnglish ? "Opening the Explore section! 📚 Here you'll find:\n\n• Financial calculators\n• Investment articles\n• Market insights\n• Risk assessment tools\n• Video tutorials\n\nPerfect for learning at your own pace!" : "Ouverture de la section Explorer! 📚 Ici vous trouverez:\n\n• Calculatrices financières\n• Articles sur l'investissement\n• Perspectives du marché\n• Outils d'évaluation des risques\n• Tutoriels vidéo\n\nParfait pour apprendre à votre rythme!",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Financial calculators', 'Investment basics', 'Market insights'] : ['Calculatrices', 'Bases d\'investissement', 'Aperçus du marché']
      };
    }

    // Settings
    if (lowerMessage.match(/settings|profile|account|preference|change password/i)) {
      setTimeout(() => setCurrentScreen('settings'), 500);
      return {
        id: Date.now().toString(),
        text: isEnglish ? "Opening Settings! ⚙️ You can:\n\n• Edit your profile\n• Change language & currency\n• Manage linked bank accounts\n• Update password\n• View privacy policy\n• Access help center" : "Ouverture des Paramètres! ⚙️ Vous pouvez:\n\n• Modifier votre profil\n• Changer langue et devise\n• Gérer les comptes bancaires liés\n• Mettre à jour le mot de passe\n• Voir la politique de confidentialité\n• Accéder au centre d'aide",
        sender: 'ai',
        timestamp: new Date(),
      };
    }

    // ===== FINANCIAL ADVICE BASED ON USER CONTEXT =====
    
    // Account Overview
    if (lowerMessage.match(/my account|show me|what do i have|my status|account summary/i)) {
      const recentActivities = getRecentActivities(3);
      const activitySummary = recentActivities.map(a => `• ${a.title} (${formatCurrency(a.amount || 0)})`).join('\n');
      
      return {
        id: Date.now().toString(),
        text: isEnglish 
          ? `📊 Your Account Summary:\n\n💰 Wallet Balance: ${formatCurrency(user?.balance || 0)}\n📈 Portfolio Value: ${formatCurrency(user?.portfolioValue || 0)}\n🏦 Savings: ${formatCurrency(user?.savings || 0)}\n\n🕐 Recent Activities:\n${activitySummary || 'No recent activities'}\n\nYou're currently on the ${currentScreen} screen.`
          : `📊 Résumé de votre compte:\n\n💰 Solde du portefeuille: ${formatCurrency(user?.balance || 0)}\n📈 Valeur du portfolio: ${formatCurrency(user?.portfolioValue || 0)}\n🏦 Épargne: ${formatCurrency(user?.savings || 0)}\n\n🕐 Activités récentes:\n${activitySummary || 'Aucune activité récente'}\n\nVous êtes actuellement sur l'écran ${currentScreen}.`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Add more funds', 'Start investing', 'Create savings goal'] : ['Ajouter des fonds', 'Commencer à investir', 'Créer un objectif']
      };
    }

    // Top-up guidance
    if (lowerMessage.match(/top.?up|add money|deposit|fund my account|recharge/i)) {
      setTimeout(() => setCurrentScreen('top-up'), 500);
      return {
        id: Date.now().toString(),
        text: isEnglish 
          ? `I'll help you top-up your account! 💳\n\nCurrent balance: ${formatCurrency(user?.balance || 0)}\n\nYou can add funds via:\n• Debit/Credit Card (Instant)\n• Bank Transfer (1-3 days)\n• Mobile Money (Instant)\n\nNo fees! Minimum: ${formatCurrency(1000)}\n\nOpening top-up screen now!`
          : `Je vais vous aider à recharger votre compte! 💳\n\nSolde actuel: ${formatCurrency(user?.balance || 0)}\n\nVous pouvez ajouter des fonds via:\n• Carte bancaire (Instantané)\n• Virement bancaire (1-3 jours)\n• Argent mobile (Instantané)\n\nPas de frais! Minimum: ${formatCurrency(1000)}\n\nOuverture de l'écran de rechargement!`,
        sender: 'ai',
        timestamp: new Date(),
      };
    }

    // Withdrawal guidance
    if (lowerMessage.match(/withdraw|cash out|take money|get my money/i)) {
      setTimeout(() => setCurrentScreen('withdraw'), 500);
      return {
        id: Date.now().toString(),
        text: isEnglish
          ? `Let me help you withdraw! 💸\n\nAvailable balance: ${formatCurrency(user?.balance || 0)}\n\nWithdrawal limits:\n• Minimum: ${formatCurrency(1000)}\n• Daily max: ${formatCurrency(500000)}\n\nFree withdrawals to:\n• Your bank account\n• Mobile money\n• Mobile wallet\n\nOpening withdrawal screen!`
          : `Laissez-moi vous aider à retirer! 💸\n\nSolde disponible: ${formatCurrency(user?.balance || 0)}\n\nLimites de retrait:\n• Minimum: ${formatCurrency(1000)}\n• Maximum quotidien: ${formatCurrency(500000)}\n\nRetraits gratuits vers:\n• Votre compte bancaire\n• Argent mobile\n• Portefeuille mobile\n\nOuverture de l'écran de retrait!`,
        sender: 'ai',
        timestamp: new Date(),
      };
    }

    // Investment guidance (contextual)
    if (lowerMessage.match(/should i invest|ready to invest|start investing/i)) {
      const hasEmergencyFund = (user?.savings || 0) >= (user?.balance || 0) * 0.2;
      
      if (!hasEmergencyFund) {
        return {
          id: Date.now().toString(),
          text: isEnglish
            ? `Important advice! 🛡️ Before investing, build an emergency fund covering 3-6 months of expenses. You currently have ${formatCurrency(user?.savings || 0)} in savings.\n\nI recommend saving at least ${formatCurrency((user?.balance || 50000) * 0.3)} before investing. This protects you from unexpected emergencies!\n\nWant to create an emergency fund goal?`
            : `Conseil important! 🛡️ Avant d'investir, constituez un fonds d'urgence couvrant 3-6 mois de dépenses. Vous avez actuellement ${formatCurrency(user?.savings || 0)} en épargne.\n\nJe recommande d'économiser au moins ${formatCurrency((user?.balance || 50000) * 0.3)} avant d'investir. Cela vous protège des urgences inattendues!\n\nVoulez-vous créer un objectif de fonds d'urgence?`,
          sender: 'ai',
          timestamp: new Date(),
          suggestions: isEnglish ? ['Create emergency fund', 'I already have one', 'Tell me more'] : ['Créer fonds d\'urgence', 'J\'en ai déjà un', 'Dites-m\'en plus']
        };
      }

      return {
        id: Date.now().toString(),
        text: isEnglish
          ? `Great! You're ready to invest! 🎯\n\nWith ${formatCurrency(user?.balance || 0)} available, I recommend:\n\nBeginner allocation:\n• 70% Money Market Fund (Low risk, 12% return)\n• 20% Bond Fund (Medium risk, 15% return)\n• 10% Equity Fund (High risk, 24% return)\n\nThis balanced approach minimizes risk while growing your wealth. Shall I show you these funds?`
          : `Excellent! Vous êtes prêt à investir! 🎯\n\nAvec ${formatCurrency(user?.balance || 0)} disponible, je recommande:\n\nRépartition débutant:\n• 70% Fonds du marché monétaire (Faible risque, 12% rendement)\n• 20% Fonds d'obligations (Risque moyen, 15% rendement)\n• 10% Fonds d'actions (Risque élevé, 24% rendement)\n\nCette approche équilibrée minimise le risque tout en augmentant votre richesse. Dois-je vous montrer ces fonds?`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Show me funds', 'I want stocks', 'Tell me about bonds'] : ['Montrer les fonds', 'Je veux des actions', 'Parlez-moi des obligations']
      };
    }

    // Transaction history
    if (lowerMessage.match(/transaction|history|my activities|past transactions/i)) {
      setTimeout(() => setCurrentScreen('transaction-history'), 500);
      const recentCount = activities.length;
      return {
        id: Date.now().toString(),
        text: isEnglish
          ? `Opening your transaction history! 📜\n\nYou have ${recentCount} total activities including:\n• Top-ups\n• Withdrawals\n• Investments\n• Savings contributions\n• Circle payments\n\nYou can filter by type, date, and amount!`
          : `Ouverture de votre historique de transactions! 📜\n\nVous avez ${recentCount} activités totales incluant:\n• Rechargements\n• Retraits\n• Investissements\n• Contributions d'épargne\n• Paiements de cercle\n\nVous pouvez filtrer par type, date et montant!`,
        sender: 'ai',
        timestamp: new Date(),
      };
    }

    // ===== FINANCIAL EDUCATION =====
    
    // Risk assessment
    if (lowerMessage.match(/risk|how much risk|risk tolerance|safe investment/i)) {
      setTimeout(() => setCurrentScreen('risk-assessment'), 500);
      return {
        id: Date.now().toString(),
        text: isBeginnerQuery
          ? (isEnglish ? "Great question! 🎯 Risk means how much your investment value can go up or down. I'll take you to our Risk Assessment tool. It asks questions about your goals, timeline, and comfort with losses to recommend the right investments for YOU. No jargon, just simple questions!" : "Excellente question! 🎯 Le risque signifie combien la valeur de votre investissement peut monter ou descendre. Je vous emmène à notre outil d'Évaluation des Risques. Il pose des questions sur vos objectifs, votre calendrier et votre confort avec les pertes pour recommander les bons investissements pour VOUS. Pas de jargon, juste des questions simples!")
          : (isEnglish ? "Understanding your risk tolerance is crucial! 📊 Generally:\n\n🟢 Low risk = Stable, predictable returns (8-12%)\n🟡 Medium risk = Balanced growth (12-18%)\n🔴 High risk = High potential, high volatility (18-30%)\n\nTake our assessment to find your ideal investment mix!" : "Comprendre votre tolérance au risque est crucial! 📊 Généralement:\n\n🟢 Risque faible = Rendements stables et prévisibles (8-12%)\n🟡 Risque moyen = Croissance équilibrée (12-18%)\n🔴 Risque élevé = Potentiel élevé, forte volatilité (18-30%)\n\nFaites notre évaluation pour trouver votre mix d'investissement idéal!"),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Take assessment', 'Safe options only', 'I can handle risk'] : ['Faire l\'évaluation', 'Options sûres seulement', 'Je peux gérer le risque']
      };
    }

    // Compound interest / Growth
    if (lowerMessage.match(/compound|interest|grow my money|passive income|returns/i)) {
      return {
        id: Date.now().toString(),
        text: isBeginnerQuery
          ? (isEnglish ? "Compound interest is MAGIC! ✨ It's earning interest on your interest. Example:\n\nInvest ${formatCurrency(100000)} at 15% annually:\n• Year 1: ${formatCurrency(115000)}\n• Year 2: ${formatCurrency(132250)}\n• Year 5: ${formatCurrency(201136)}\n\nYou earned ${formatCurrency(101136)} by doing nothing! The earlier you start, the more you earn. This is why I recommend investing NOW!" : "L'intérêt composé est MAGIQUE! ✨ C'est gagner des intérêts sur vos intérêts. Exemple:\n\nInvestissez ${formatCurrency(100000)} à 15% par an:\n• Année 1: ${formatCurrency(115000)}\n• Année 2: ${formatCurrency(132250)}\n• Année 5: ${formatCurrency(201136)}\n\nVous avez gagné ${formatCurrency(101136)} sans rien faire! Plus tôt vous commencez, plus vous gagnez. C'est pourquoi je recommande d'investir MAINTENANT!")
          : (isEnglish ? "Compound interest is the secret to wealth! 🚀\n\nRule of 72: Divide 72 by your interest rate to find how long it takes to double your money.\n\nAt 12% return: 72÷12 = 6 years to double\nAt 24% return: 72÷24 = 3 years to double\n\nMaximize this by:\n1. Starting early\n2. Contributing regularly\n3. Reinvesting returns\n4. Staying invested long-term" : "L'intérêt composé est le secret de la richesse! 🚀\n\nRègle de 72: Divisez 72 par votre taux d'intérêt pour savoir combien de temps il faut pour doubler votre argent.\n\nÀ 12% de rendement: 72÷12 = 6 ans pour doubler\nÀ 24% de rendement: 72÷24 = 3 ans pour doubler\n\nMaximisez ceci en:\n1. Commençant tôt\n2. Contribuant régulièrement\n3. Réinvestissant les rendements\n4. Restant investi à long terme"),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Start investing now', 'Use calculator', 'Best returns?'] : ['Commencer à investir', 'Utiliser calculatrice', 'Meilleurs rendements?']
      };
    }

    // Diversification
    if (lowerMessage.match(/diversif|spread|different|allocation|mix/i)) {
      return {
        id: Date.now().toString(),
        text: isEnglish
          ? "Diversification = Don't put all eggs in one basket! 🥚🧺\n\nWhy it matters:\n• If one investment drops, others may rise\n• Reduces overall risk\n• Smooths out returns\n\nIdeal diversification:\n1. Asset types: Stocks, bonds, real estate\n2. Sectors: Tech, finance, agriculture, energy\n3. Geography: Local and international\n4. Time: Short, medium, long-term goals\n\nI can help you build a diversified portfolio based on your risk tolerance!"
          : "Diversification = Ne mettez pas tous les œufs dans le même panier! 🥚🧺\n\nPourquoi c'est important:\n• Si un investissement baisse, d'autres peuvent monter\n• Réduit le risque global\n• Lisse les rendements\n\nDiversification idéale:\n1. Types d'actifs: Actions, obligations, immobilier\n2. Secteurs: Tech, finance, agriculture, énergie\n3. Géographie: Local et international\n4. Temps: Objectifs court, moyen, long terme\n\nJe peux vous aider à construire un portfolio diversifié basé sur votre tolérance au risque!",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Build my portfolio', 'Risk assessment', 'View all funds'] : ['Construire portfolio', 'Évaluation risque', 'Voir tous fonds']
      };
    }

    // Emergency fund
    if (lowerMessage.match(/emergency|emergency fund|rainy day|unexpected/i)) {
      return {
        id: Date.now().toString(),
        text: isBeginnerQuery
          ? (isEnglish ? "Emergency fund = Your financial safety net! 🛡️\n\nIt's money set aside for:\n• Job loss\n• Medical emergencies\n• Car/home repairs\n• Unexpected bills\n\nHow much?\n• Minimum: 3 months of expenses\n• Ideal: 6 months\n• Maximum: 12 months\n\nExample: If you spend ${formatCurrency(100000)}/month, save ${formatCurrency(300000)}-${formatCurrency(600000)}.\n\nThis MUST come before investing! Want me to help you create one?" : "Fonds d'urgence = Votre filet de sécurité financière! 🛡️\n\nC'est de l'argent mis de côté pour:\n• Perte d'emploi\n• Urgences médicales\n• Réparations auto/maison\n• Factures inattendues\n\nCombien?\n• Minimum: 3 mois de dépenses\n• Idéal: 6 mois\n• Maximum: 12 mois\n\nExemple: Si vous dépensez ${formatCurrency(100000)}/mois, économisez ${formatCurrency(300000)}-${formatCurrency(600000)}.\n\nCeci DOIT venir avant l'investissement! Voulez-vous que je vous aide à en créer un?")
          : (isEnglish ? "Your emergency fund should be:\n✓ Easily accessible (liquid)\n✓ In a safe account (low risk)\n✓ Separate from daily spending\n\nBest options for emergency funds:\n1. High-yield savings account\n2. Money Market Fund (can withdraw anytime)\n3. Fixed deposit (if you have backup cash)\n\nNever invest your emergency fund in stocks or high-risk assets! You need it available when emergencies strike." : "Votre fonds d'urgence devrait être:\n✓ Facilement accessible (liquide)\n✓ Dans un compte sûr (faible risque)\n✓ Séparé des dépenses quotidiennes\n\nMeilleures options pour fonds d'urgence:\n1. Compte d'épargne à haut rendement\n2. Fonds du marché monétaire (retrait à tout moment)\n3. Dépôt fixe (si vous avez de l'argent de secours)\n\nNe jamais investir votre fonds d'urgence en actions ou actifs à haut risque! Vous en avez besoin quand les urgences surviennent."),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Create emergency fund', 'Calculate my target', 'Safe savings options'] : ['Créer fonds urgence', 'Calculer ma cible', 'Options épargne sûres']
      };
    }

    // ===== GENERAL QUERIES =====
    
    // Mutual funds explained
    if (lowerMessage.match(/mutual fund|what is mutual|fund types/i)) {
      return {
        id: Date.now().toString(),
        text: isBeginnerQuery
          ? (isEnglish ? "Simple explanation! 🎓\n\nMutual Fund = A basket where many people put money together, and a professional manager buys many different investments.\n\nWhy it's great:\n✅ Professional management\n✅ Diversification (one fund = many investments)\n✅ Low minimum investment\n✅ Easy to buy/sell\n\nTypes:\n💼 Money Market - safest, steady returns\n📈 Equity - stocks, higher risk/return\n🏛️ Bond - loans to companies/government\n✨ Halal - follows Islamic principles\n\nWhich sounds interesting?" : "Explication simple! 🎓\n\nFonds Commun = Un panier où beaucoup de gens mettent de l'argent ensemble, et un gestionnaire professionnel achète de nombreux investissements différents.\n\nPourquoi c'est génial:\n✅ Gestion professionnelle\n✅ Diversification (un fonds = plusieurs investissements)\n✅ Investissement minimum faible\n✅ Facile à acheter/vendre\n\nTypes:\n💼 Marché monétaire - le plus sûr, rendements stables\n📈 Actions - actions, risque/rendement plus élevé\n🏛️ Obligations - prêts aux entreprises/gouvernement\n✨ Halal - suit les principes islamiques\n\nQui semble intéressant?")
          : (isEnglish ? "Mutual Funds pool money from investors to buy diversified portfolios.\n\nAvailable funds:\n\n💼 Money Market (12% annual)\n   - Ultra-low risk\n   - Minimum: ${formatCurrency(5000)}\n   - Best for: Emergency funds, short-term\n\n📈 Equity Fund (24% annual)\n   - High risk/high return\n   - Minimum: ${formatCurrency(10000)}\n   - Best for: Long-term growth (5+ years)\n\n🏛️ Fixed Income (15% annual)\n   - Medium risk\n   - Minimum: ${formatCurrency(10000)}\n   - Best for: Balanced portfolio\n\n✨ Halal Fund (18% annual)\n   - Sharia-compliant\n   - Minimum: ${formatCurrency(10000)}\n   - Best for: Islamic investing\n\nWant to explore any?" : "Les Fonds Communs regroupent l'argent des investisseurs pour acheter des portefeuilles diversifiés.\n\nFonds disponibles:\n\n💼 Marché Monétaire (12% annuel)\n   - Risque ultra-faible\n   - Minimum: ${formatCurrency(5000)}\n   - Idéal pour: Fonds d'urgence, court terme\n\n📈 Fonds d'Actions (24% annuel)\n   - Risque/rendement élevé\n   - Minimum: ${formatCurrency(10000)}\n   - Idéal pour: Croissance long terme (5+ ans)\n\n🏛️ Revenu Fixe (15% annuel)\n   - Risque moyen\n   - Minimum: ${formatCurrency(10000)}\n   - Idéal pour: Portfolio équilibré\n\n✨ Fonds Halal (18% annuel)\n   - Conforme à la Charia\n   - Minimum: ${formatCurrency(10000)}\n   - Idéal pour: Investissement islamique\n\nVoulez-vous en explorer?"),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Money Market Fund', 'Equity Fund', 'View all funds'] : ['Fonds Marché Monétaire', 'Fonds Actions', 'Voir tous fonds']
      };
    }

    // General help
    if (lowerMessage.match(/help|guide|how to use|features|what can you do/i)) {
      return {
        id: Date.now().toString(),
        text: isEnglish
          ? `I can help you with everything in AfriBenki! 🌟\n\n🏠 Account Management:\n• Check balance & portfolio\n• Top-up & withdraw funds\n• View transaction history\n\n💰 Savings:\n• Create goal-based savings\n• Track progress\n• Earn interest\n\n📈 Investments:\n• Buy mutual funds, stocks, bonds\n• Monitor portfolio performance\n• Get personalized recommendations\n\n👥 Circles:\n• Create/join savings groups\n• Automated contributions\n• Track group goals\n\n📚 Education:\n• Financial calculators\n• Investment guides\n• Market insights\n• Risk assessment\n\nJust ask me anything, and I'll guide you step-by-step based on your experience level!`
          : `Je peux vous aider avec tout dans AfriBenki! 🌟\n\n🏠 Gestion de Compte:\n• Vérifier solde et portfolio\n• Recharger et retirer des fonds\n• Voir historique des transactions\n\n💰 Épargne:\n• Créer épargne basée sur objectifs\n• Suivre les progrès\n• Gagner des intérêts\n\n📈 Investissements:\n• Acheter fonds, actions, obligations\n• Surveiller performance du portfolio\n• Obtenir recommandations personnalisées\n\n👥 Cercles:\n• Créer/rejoindre groupes d'épargne\n• Contributions automatisées\n• Suivre objectifs de groupe\n\n📚 Éducation:\n• Calculatrices financières\n• Guides d'investissement\n• Aperçus du marché\n• Évaluation des risques\n\nDemandez-moi n'importe quoi, et je vous guiderai étape par étape selon votre niveau d'expérience!`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: isEnglish ? ['Show my account', 'Start investing', 'Learn about savings', 'Join a circle'] : ['Montrer mon compte', 'Commencer investir', 'Apprendre épargne', 'Rejoindre cercle']
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: isEnglish
        ? `I'm here to help! 🤝 I can assist with:\n\n💰 Account & Transactions\n📈 Investing & Portfolio\n🏦 Savings & Goals\n👥 Circles & Group Saving\n📚 Financial Education\n⚙️ Settings & Profile\n\nWhat would you like to know more about?`
        : `Je suis là pour aider! 🤝 Je peux vous aider avec:\n\n💰 Compte et Transactions\n📈 Investissement et Portfolio\n🏦 Épargne et Objectifs\n👥 Cercles et Épargne de Groupe\n📚 Éducation Financière\n⚙️ Paramètres et Profil\n\nSur quoi aimeriez-vous en savoir plus?`,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: isEnglish ? ['Check my balance', 'Investment advice', 'Savings tips', 'How circles work'] : ['Vérifier solde', 'Conseils investissement', 'Astuces épargne', 'Comment cercles fonctionnent']
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
