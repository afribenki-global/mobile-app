// Comprehensive translation library for AfriBenki
export type Language = 'en' | 'fr';

export interface TranslationKeys {
  // App Name & Branding
  appName: string;
  tagline: string;
  
  // Navigation
  home: string;
  save: string;
  invest: string;
  explore: string;
  wallet: string;
  settings: string;
  profile: string;
  
  // Welcome & Auth
  welcome: string;
  welcomeDesc: string;
  getStarted: string;
  signIn: string;
  signUp: string;
  signOut: string;
  logout: string;
  
  // Common Actions
  continue: string;
  cancel: string;
  confirm: string;
  save_action: string;
  edit: string;
  delete: string;
  view: string;
  back: string;
  next: string;
  skip: string;
  done: string;
  submit: string;
  
  // Profile & Account
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
  profilePicture: string;
  editProfile: string;
  updateProfile: string;
  accountSettings: string;
  personalInfo: string;
  
  // Dashboard
  totalBalance: string;
  portfolio: string;
  savings: string;
  investments: string;
  quickActions: string;
  createPlan: string;
  investNow: string;
  sendMoney: string;
  viewAll: string;
  
  // Savings
  savingsPlans: string;
  createSavingsPlan: string;
  goalName: string;
  targetAmount: string;
  targetDate: string;
  frequency: string;
  monthly: string;
  weekly: string;
  daily: string;
  progress: string;
  
  // Investments
  mutualFunds: string;
  stocks: string;
  bonds: string;
  returns: string;
  risk: string;
  lowRisk: string;
  mediumRisk: string;
  highRisk: string;
  minInvestment: string;
  investmentDetails: string;
  
  // Circles
  circles: string;
  myCircles: string;
  joinCircle: string;
  createCircle: string;
  circleMembers: string;
  contribution: string;
  nextPayment: string;
  
  // Wallet
  addFunds: string;
  topUp: string;
  withdraw: string;
  transfer: string;
  transactions: string;
  recentTransactions: string;
  
  // Settings
  language: string;
  currencyLabel: string;
  notifications: string;
  security: string;
  helpSupport: string;
  aboutApp: string;
  termsConditions: string;
  privacyPolicy: string;
  
  // Explore
  learn: string;
  articles: string;
  videos: string;
  calculators: string;
  tools: string;
  investmentBasics: string;
  financialLiteracy: string;
  marketInsights: string;
  
  // Time & Dates
  today: string;
  yesterday: string;
  thisWeek: string;
  thisMonth: string;
  
  // Status
  active: string;
  pending: string;
  completed: string;
  failed: string;
  
  // Messages
  success: string;
  error: string;
  loading: string;
  noData: string;
  comingSoon: string;
  
  // Risk Assessment
  riskAssessment: string;
  conservative: string;
  moderate: string;
  aggressive: string;
  startAssessment: string;
  yourRiskProfile: string;
  recommendations: string;
  
  // Circles & Chat
  sendMessage: string;
  typeMessage: string;
  members: string;
  chatWithMembers: string;
  groupChat: string;
  
  // Notifications
  notifications_title: string;
  markAllRead: string;
  newNotification: string;
  earlier: string;
  
  // Additional
  calculators: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // App Name & Branding
    appName: 'AfriBenki',
    tagline: 'Save smarter, invest better, build wealth for tomorrow',
    
    // Navigation
    home: 'Home',
    save: 'Save',
    invest: 'Invest',
    explore: 'Explore',
    wallet: 'Wallet',
    settings: 'Settings',
    profile: 'Profile',
    
    // Welcome & Auth
    welcome: 'Welcome to AfriBenki',
    welcomeDesc: 'Save smarter, invest better, build wealth for tomorrow',
    getStarted: 'Get Started',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    logout: 'Logout',
    
    // Common Actions
    continue: 'Continue',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save_action: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    back: 'Back',
    next: 'Next',
    skip: 'Skip',
    done: 'Done',
    submit: 'Submit',
    
    // Profile & Account
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    profilePicture: 'Profile Picture',
    editProfile: 'Edit Profile',
    updateProfile: 'Update Profile',
    accountSettings: 'Account Settings',
    personalInfo: 'Personal Information',
    
    // Dashboard
    totalBalance: 'Total Balance',
    portfolio: 'Portfolio',
    savings: 'Savings',
    investments: 'Investments',
    quickActions: 'Quick Actions',
    createPlan: 'Create Plan',
    investNow: 'Invest Now',
    sendMoney: 'Send Money',
    viewAll: 'View All',
    
    // Savings
    savingsPlans: 'Savings Plans',
    createSavingsPlan: 'Create Savings Plan',
    goalName: 'Goal Name',
    targetAmount: 'Target Amount',
    targetDate: 'Target Date',
    frequency: 'Frequency',
    monthly: 'Monthly',
    weekly: 'Weekly',
    daily: 'Daily',
    progress: 'Progress',
    
    // Investments
    mutualFunds: 'Mutual Funds',
    stocks: 'Stocks',
    bonds: 'Bonds',
    returns: 'Returns',
    risk: 'Risk',
    lowRisk: 'Low Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',
    minInvestment: 'Minimum Investment',
    investmentDetails: 'Investment Details',
    
    // Circles
    circles: 'Circles',
    myCircles: 'My Circles',
    joinCircle: 'Join Circle',
    createCircle: 'Create Circle',
    circleMembers: 'Members',
    contribution: 'Contribution',
    nextPayment: 'Next Payment',
    
    // Wallet
    addFunds: 'Add Funds',
    topUp: 'Top Up',
    withdraw: 'Withdraw',
    transfer: 'Transfer',
    transactions: 'Transactions',
    recentTransactions: 'Recent Transactions',
    
    // Settings
    language: 'Language',
    currencyLabel: 'Currency',
    notifications: 'Notifications',
    security: 'Security',
    helpSupport: 'Help & Support',
    aboutApp: 'About AfriBenki',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    
    // Explore
    learn: 'Learn',
    articles: 'Articles',
    videos: 'Videos',
    calculators: 'Calculators',
    tools: 'Tools',
    investmentBasics: 'Investment Basics',
    financialLiteracy: 'Financial Literacy',
    marketInsights: 'Market Insights',
    
    // Time & Dates
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    
    // Status
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    
    // Messages
    success: 'Success',
    error: 'Error',
    loading: 'Loading',
    noData: 'No data available',
    comingSoon: 'Coming Soon',
    
    // Risk Assessment
    riskAssessment: 'Risk Assessment',
    conservative: 'Conservative',
    moderate: 'Moderate',
    aggressive: 'Aggressive',
    startAssessment: 'Start Assessment',
    yourRiskProfile: 'Your Risk Profile',
    recommendations: 'Recommendations',
    
    // Circles & Chat
    sendMessage: 'Send',
    typeMessage: 'Type a message...',
    members: 'Members',
    chatWithMembers: 'Chat with Members',
    groupChat: 'Group Chat',
    
    // Notifications
    notifications_title: 'Notifications',
    markAllRead: 'Mark all as read',
    newNotification: 'New',
    earlier: 'Earlier',
    
    // Additional
    calculators: 'Calculators',
  },
  
  fr: {
    // App Name & Branding
    appName: 'AfriBenki',
    tagline: 'Économisez intelligemment, investissez mieux, construisez la richesse',
    
    // Navigation
    home: 'Accueil',
    save: 'Épargner',
    invest: 'Investir',
    explore: 'Explorer',
    wallet: 'Portefeuille',
    settings: 'Paramètres',
    profile: 'Profil',
    
    // Welcome & Auth
    welcome: 'Bienvenue sur AfriBenki',
    welcomeDesc: 'Économisez intelligemment, investissez mieux',
    getStarted: 'Commencer',
    signIn: 'Se connecter',
    signUp: "S'inscrire",
    signOut: 'Se déconnecter',
    logout: 'Déconnexion',
    
    // Common Actions
    continue: 'Continuer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save_action: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    back: 'Retour',
    next: 'Suivant',
    skip: 'Passer',
    done: 'Terminé',
    submit: 'Soumettre',
    
    // Profile & Account
    fullName: 'Nom complet',
    email: 'Email',
    phone: 'Numéro de téléphone',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    profilePicture: 'Photo de profil',
    editProfile: 'Modifier le profil',
    updateProfile: 'Mettre à jour le profil',
    accountSettings: 'Paramètres du compte',
    personalInfo: 'Informations personnelles',
    
    // Dashboard
    totalBalance: 'Solde total',
    portfolio: 'Portefeuille',
    savings: 'Épargne',
    investments: 'Investissements',
    quickActions: 'Actions rapides',
    createPlan: 'Créer un plan',
    investNow: 'Investir maintenant',
    sendMoney: 'Envoyer de l\'argent',
    viewAll: 'Voir tout',
    
    // Savings
    savingsPlans: 'Plans d\'épargne',
    createSavingsPlan: 'Créer un plan d\'épargne',
    goalName: 'Nom de l\'objectif',
    targetAmount: 'Montant cible',
    targetDate: 'Date cible',
    frequency: 'Fréquence',
    monthly: 'Mensuel',
    weekly: 'Hebdomadaire',
    daily: 'Quotidien',
    progress: 'Progrès',
    
    // Investments
    mutualFunds: 'Fonds communs',
    stocks: 'Actions',
    bonds: 'Obligations',
    returns: 'Rendements',
    risk: 'Risque',
    lowRisk: 'Faible risque',
    mediumRisk: 'Risque moyen',
    highRisk: 'Risque élevé',
    minInvestment: 'Investissement minimum',
    investmentDetails: 'Détails de l\'investissement',
    
    // Circles
    circles: 'Cercles',
    myCircles: 'Mes cercles',
    joinCircle: 'Rejoindre un cercle',
    createCircle: 'Créer un cercle',
    circleMembers: 'Membres',
    contribution: 'Contribution',
    nextPayment: 'Prochain paiement',
    
    // Wallet
    addFunds: 'Ajouter des fonds',
    topUp: 'Recharger',
    withdraw: 'Retirer',
    transfer: 'Transférer',
    transactions: 'Transactions',
    recentTransactions: 'Transactions récentes',
    
    // Settings
    language: 'Langue',
    currencyLabel: 'Devise',
    notifications: 'Notifications',
    security: 'Sécurité',
    helpSupport: 'Aide et support',
    aboutApp: 'À propos d\'AfriBenki',
    termsConditions: 'Termes et conditions',
    privacyPolicy: 'Politique de confidentialité',
    
    // Explore
    learn: 'Apprendre',
    articles: 'Articles',
    videos: 'Vidéos',
    calculators: 'Calculatrices',
    tools: 'Outils',
    investmentBasics: 'Bases de l\'investissement',
    financialLiteracy: 'Littératie financière',
    marketInsights: 'Aperçus du marché',
    
    // Time & Dates
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    thisWeek: 'Cette semaine',
    thisMonth: 'Ce mois',
    
    // Status
    active: 'Actif',
    pending: 'En attente',
    completed: 'Terminé',
    failed: 'Échoué',
    
    // Messages
    success: 'Succès',
    error: 'Erreur',
    loading: 'Chargement',
    noData: 'Aucune donnée disponible',
    comingSoon: 'Bientôt disponible',
    
    // Risk Assessment
    riskAssessment: 'Évaluation du risque',
    conservative: 'Conservateur',
    moderate: 'Modéré',
    aggressive: 'Agressif',
    startAssessment: 'Commencer l\'évaluation',
    yourRiskProfile: 'Votre profil de risque',
    recommendations: 'Recommandations',
    
    // Circles & Chat
    sendMessage: 'Envoyer',
    typeMessage: 'Tapez un message...',
    members: 'Membres',
    chatWithMembers: 'Discuter avec les membres',
    groupChat: 'Discussion de groupe',
    
    // Notifications
    notifications_title: 'Notifications',
    markAllRead: 'Tout marquer comme lu',
    newNotification: 'Nouveau',
    earlier: 'Plus tôt',
    
    // Additional
    calculators: 'Calculatrices',
  },
  
  sw: {
    // App Name & Branding
    appName: 'AfriBenki',
    tagline: 'Hifadhi kwa busara, wekeza vizuri, jenga utajiri',
    
    // Navigation
    home: 'Nyumbani',
    save: 'Hifadhi',
    invest: 'Wekeza',
    explore: 'Gundua',
    wallet: 'Mkoba',
    settings: 'Mipangilio',
    profile: 'Wasifu',
    
    // Welcome & Auth
    welcome: 'Karibu AfriBenki',
    welcomeDesc: 'Hifadhi kwa busara, wekeza vizuri',
    getStarted: 'Anza',
    signIn: 'Ingia',
    signUp: 'Jisajili',
    signOut: 'Ondoka',
    logout: 'Toka',
    
    // Common Actions
    continue: 'Endelea',
    cancel: 'Ghairi',
    confirm: 'Thibitisha',
    save_action: 'Hifadhi',
    edit: 'Hariri',
    delete: 'Futa',
    view: 'Tazama',
    back: 'Rudi',
    next: 'Ifuatayo',
    skip: 'Ruka',
    done: 'Imeisha',
    submit: 'Wasilisha',
    
    // Profile & Account
    fullName: 'Jina kamili',
    email: 'Barua pepe',
    phone: 'Nambari ya simu',
    password: 'Nenosiri',
    confirmPassword: 'Thibitisha nenosiri',
    currentPassword: 'Nenosiri la sasa',
    newPassword: 'Nenosiri jipya',
    profilePicture: 'Picha ya wasifu',
    editProfile: 'Hariri wasifu',
    updateProfile: 'Sasisha wasifu',
    accountSettings: 'Mipangilio ya akaunti',
    personalInfo: 'Taarifa binafsi',
    
    // Dashboard
    totalBalance: 'Jumla ya salio',
    portfolio: 'Mkoba',
    savings: 'Akiba',
    investments: 'Uwekezaji',
    quickActions: 'Vitendo vya haraka',
    createPlan: 'Unda mpango',
    investNow: 'Wekeza sasa',
    sendMoney: 'Tuma pesa',
    viewAll: 'Tazama yote',
    
    // Savings
    savingsPlans: 'Mipango ya akiba',
    createSavingsPlan: 'Unda mpango wa akiba',
    goalName: 'Jina la lengo',
    targetAmount: 'Kiasi cha lengo',
    targetDate: 'Tarehe ya lengo',
    frequency: 'Mzunguko',
    monthly: 'Kila mwezi',
    weekly: 'Kila wiki',
    daily: 'Kila siku',
    progress: 'Maendeleo',
    
    // Investments
    mutualFunds: 'Mfuko wa pamoja',
    stocks: 'Hisa',
    bonds: 'Dhamana',
    returns: 'Mapato',
    risk: 'Hatari',
    lowRisk: 'Hatari ndogo',
    mediumRisk: 'Hatari ya kati',
    highRisk: 'Hatari kubwa',
    minInvestment: 'Uwekezaji wa chini',
    investmentDetails: 'Maelezo ya uwekezaji',
    
    // Circles
    circles: 'Vikundi',
    myCircles: 'Vikundi vyangu',
    joinCircle: 'Jiunge na kikundi',
    createCircle: 'Unda kikundi',
    circleMembers: 'Wanachama',
    contribution: 'Mchango',
    nextPayment: 'Malipo yajayo',
    
    // Wallet
    addFunds: 'Ongeza fedha',
    withdraw: 'Ondoa',
    transfer: 'Hamisha',
    transactions: 'Miamala',
    recentTransactions: 'Miamala ya hivi karibuni',
    
    // Settings
    language: 'Lugha',
    currencyLabel: 'Sarafu',
    notifications: 'Arifa',
    security: 'Usalama',
    helpSupport: 'Msaada',
    aboutApp: 'Kuhusu AfriBenki',
    termsConditions: 'Masharti',
    privacyPolicy: 'Sera ya faragha',
    
    // Explore
    learn: 'Jifunze',
    articles: 'Makala',
    videos: 'Video',
    calculators: 'Kikokotoo',
    tools: 'Zana',
    investmentBasics: 'Misingi ya uwekezaji',
    financialLiteracy: 'Elimu ya kifedha',
    marketInsights: 'Maarifa ya soko',
    
    // Time & Dates
    today: 'Leo',
    yesterday: 'Jana',
    thisWeek: 'Wiki hii',
    thisMonth: 'Mwezi huu',
    
    // Status
    active: 'Hai',
    pending: 'Inasubiri',
    completed: 'Imekamilika',
    failed: 'Imeshindwa',
    
    // Messages
    success: 'Mafanikio',
    error: 'Kosa',
    loading: 'Inapakia',
    noData: 'Hakuna data',
    comingSoon: 'Inakuja hivi karibuni',
  },
  
  pid: {
    // App Name & Branding
    appName: 'AfriBenki',
    tagline: 'Save better, invest sharp, build wealth',
    
    // Navigation
    home: 'Home',
    save: 'Save',
    invest: 'Invest',
    explore: 'Explore',
    wallet: 'Wallet',
    settings: 'Settings',
    profile: 'Profile',
    
    // Welcome & Auth
    welcome: 'Welcome to AfriBenki',
    welcomeDesc: 'Save better, invest sharp, build wealth',
    getStarted: 'Make we start',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    logout: 'Logout',
    
    // Common Actions
    continue: 'Continue',
    cancel: 'Cancel am',
    confirm: 'Confirm',
    save_action: 'Save am',
    edit: 'Edit',
    delete: 'Delete',
    view: 'See am',
    back: 'Go back',
    next: 'Next',
    skip: 'Skip am',
    done: 'Don finish',
    submit: 'Send am',
    
    // Profile & Account
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    profilePicture: 'Profile Picture',
    editProfile: 'Edit Profile',
    updateProfile: 'Update Profile',
    accountSettings: 'Account Settings',
    personalInfo: 'Personal Info',
    
    // Dashboard
    totalBalance: 'Total Balance',
    portfolio: 'Portfolio',
    savings: 'Savings',
    investments: 'Investments',
    quickActions: 'Quick Actions',
    createPlan: 'Create Plan',
    investNow: 'Invest Now',
    sendMoney: 'Send Money',
    viewAll: 'See All',
    
    // Savings
    savingsPlans: 'Savings Plans',
    createSavingsPlan: 'Create Savings Plan',
    goalName: 'Goal Name',
    targetAmount: 'Target Amount',
    targetDate: 'Target Date',
    frequency: 'How Often',
    monthly: 'Every Month',
    weekly: 'Every Week',
    daily: 'Every Day',
    progress: 'Progress',
    
    // Investments
    mutualFunds: 'Mutual Funds',
    stocks: 'Stocks',
    bonds: 'Bonds',
    returns: 'Returns',
    risk: 'Risk',
    lowRisk: 'Small Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'Big Risk',
    minInvestment: 'Minimum Investment',
    investmentDetails: 'Investment Details',
    
    // Circles
    circles: 'Circles',
    myCircles: 'My Circles',
    joinCircle: 'Join Circle',
    createCircle: 'Create Circle',
    circleMembers: 'Members',
    contribution: 'Contribution',
    nextPayment: 'Next Payment',
    
    // Wallet
    addFunds: 'Add Money',
    withdraw: 'Withdraw',
    transfer: 'Transfer',
    transactions: 'Transactions',
    recentTransactions: 'Recent Transactions',
    
    // Settings
    language: 'Language',
    currencyLabel: 'Currency',
    notifications: 'Notifications',
    security: 'Security',
    helpSupport: 'Help & Support',
    aboutApp: 'About AfriBenki',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    
    // Explore
    learn: 'Learn',
    articles: 'Articles',
    videos: 'Videos',
    calculators: 'Calculators',
    tools: 'Tools',
    investmentBasics: 'Investment Basics',
    financialLiteracy: 'Financial Literacy',
    marketInsights: 'Market Insights',
    
    // Time & Dates
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    
    // Status
    active: 'Active',
    pending: 'Dey Wait',
    completed: 'Don Finish',
    failed: 'E No Work',
    
    // Messages
    success: 'Success',
    error: 'Error',
    loading: 'Dey Load',
    noData: 'No Data',
    comingSoon: 'E Dey Come',
  },
  
  ar: {
    // App Name & Branding
    appName: 'أفريبنكي',
    tagline: 'وفر بذكاء، استثمر بشكل أفضل، ابنِ الثروة',
    
    // Navigation
    home: 'الرئيسية',
    save: 'حفظ',
    invest: 'استثمر',
    explore: 'استكشف',
    wallet: 'المحفظة',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    
    // Welcome & Auth
    welcome: 'مرحبا بك في أفريبنكي',
    welcomeDesc: 'وفر بذكاء، استثمر بشكل أفضل',
    getStarted: 'ابدأ',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    logout: 'تسجيل الخروج',
    
    // Common Actions
    continue: 'متابعة',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    save_action: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    back: 'رجوع',
    next: 'التالي',
    skip: 'تخطي',
    done: 'تم',
    submit: 'إرسال',
    
    // Profile & Account
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    profilePicture: 'صورة الملف الشخصي',
    editProfile: 'تعديل الملف الشخصي',
    updateProfile: 'تحديث الملف الشخصي',
    accountSettings: 'إعدادات الحساب',
    personalInfo: 'المعلومات الشخصية',
    
    // Dashboard
    totalBalance: 'الرصيد الإجمالي',
    portfolio: 'المحفظة',
    savings: 'المدخرات',
    investments: 'الاستثمارات',
    quickActions: 'إجراءات سريعة',
    createPlan: 'إنشاء خطة',
    investNow: 'استثمر الآن',
    sendMoney: 'إرسال المال',
    viewAll: 'عرض الكل',
    
    // Savings
    savingsPlans: 'خطط الادخار',
    createSavingsPlan: 'إنشاء خطة ادخار',
    goalName: 'اسم الهدف',
    targetAmount: 'المبلغ المستهدف',
    targetDate: 'التاريخ المستهدف',
    frequency: 'التكرار',
    monthly: 'شهري',
    weekly: 'أسبوعي',
    daily: 'يومي',
    progress: 'التقدم',
    
    // Investments
    mutualFunds: 'صناديق الاستثمار',
    stocks: 'الأسهم',
    bonds: 'السندات',
    returns: 'العوائد',
    risk: 'المخاطر',
    lowRisk: 'مخاطر منخفضة',
    mediumRisk: 'مخاطر متوسطة',
    highRisk: 'مخاطر عالية',
    minInvestment: 'الحد الأدنى للاستثمار',
    investmentDetails: 'تفاصيل الاستثمار',
    
    // Circles
    circles: 'الدوائر',
    myCircles: 'دوائري',
    joinCircle: 'انضم إلى دائرة',
    createCircle: 'إنشاء دائرة',
    circleMembers: 'الأعضاء',
    contribution: 'المساهمة',
    nextPayment: 'الدفعة التالية',
    
    // Wallet
    addFunds: 'إضافة أموال',
    withdraw: 'سحب',
    transfer: 'تحويل',
    transactions: 'المعاملات',
    recentTransactions: 'المعاملات الأخيرة',
    
    // Settings
    language: 'اللغة',
    currencyLabel: 'العملة',
    notifications: 'الإشعارات',
    security: 'الأمان',
    helpSupport: 'المساعدة والدعم',
    aboutApp: 'حول أفريبنكي',
    termsConditions: 'الشروط والأحكام',
    privacyPolicy: 'سياسة الخصوصية',
    
    // Explore
    learn: 'تعلم',
    articles: 'مقالات',
    videos: 'فيديوهات',
    calculators: 'حاسبات',
    tools: 'أدوات',
    investmentBasics: 'أساسيات الاستثمار',
    financialLiteracy: 'الثقافة المالية',
    marketInsights: 'رؤى السوق',
    
    // Time & Dates
    today: 'اليوم',
    yesterday: 'أمس',
    thisWeek: 'هذا الأسبوع',
    thisMonth: 'هذا الشهر',
    
    // Status
    active: 'نشط',
    pending: 'قيد الانتظار',
    completed: 'مكتمل',
    failed: 'فشل',
    
    // Messages
    success: 'نجح',
    error: 'خطأ',
    loading: 'جار التحميل',
    noData: 'لا توجد بيانات',
    comingSoon: 'قريباً',
  },
};
