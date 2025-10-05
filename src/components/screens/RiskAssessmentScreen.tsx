import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, CheckCircle2, TrendingUp, Shield, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface Question {
  id: number;
  question: string;
  questionFr: string;
  options: {
    text: string;
    textFr: string;
    score: number;
  }[];
}

export function RiskAssessmentScreen() {
  const { setCurrentScreen, t, language } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is your primary investment goal?",
      questionFr: "Quel est votre objectif d'investissement principal?",
      options: [
        { text: "Preserve my wealth (safety first)", textFr: "Préserver ma richesse (sécurité d'abord)", score: 1 },
        { text: "Balanced growth and income", textFr: "Croissance et revenu équilibrés", score: 2 },
        { text: "Maximize long-term growth", textFr: "Maximiser la croissance à long terme", score: 3 },
      ],
    },
    {
      id: 2,
      question: "How would you react if your investment lost 20% in value?",
      questionFr: "Comment réagiriez-vous si votre investissement perdait 20% de sa valeur?",
      options: [
        { text: "Sell immediately to prevent further loss", textFr: "Vendre immédiatement pour éviter d'autres pertes", score: 1 },
        { text: "Hold and wait for recovery", textFr: "Conserver et attendre la reprise", score: 2 },
        { text: "Buy more while prices are low", textFr: "Acheter plus pendant que les prix sont bas", score: 3 },
      ],
    },
    {
      id: 3,
      question: "What is your investment time horizon?",
      questionFr: "Quel est votre horizon d'investissement?",
      options: [
        { text: "Less than 3 years", textFr: "Moins de 3 ans", score: 1 },
        { text: "3-7 years", textFr: "3-7 ans", score: 2 },
        { text: "More than 7 years", textFr: "Plus de 7 ans", score: 3 },
      ],
    },
    {
      id: 4,
      question: "How much of your income can you invest monthly?",
      questionFr: "Combien de votre revenu pouvez-vous investir mensuellement?",
      options: [
        { text: "Less than 10%", textFr: "Moins de 10%", score: 1 },
        { text: "10-20%", textFr: "10-20%", score: 2 },
        { text: "More than 20%", textFr: "Plus de 20%", score: 3 },
      ],
    },
    {
      id: 5,
      question: "Do you have an emergency fund covering 3-6 months of expenses?",
      questionFr: "Avez-vous un fonds d'urgence couvrant 3-6 mois de dépenses?",
      options: [
        { text: "No, I'm building it", textFr: "Non, je le construis", score: 1 },
        { text: "Partially covered", textFr: "Partiellement couvert", score: 2 },
        { text: "Yes, fully covered", textFr: "Oui, entièrement couvert", score: 3 },
      ],
    },
    {
      id: 6,
      question: "Which statement best describes your investment knowledge?",
      questionFr: "Quelle déclaration décrit le mieux votre connaissance des investissements?",
      options: [
        { text: "Beginner - I'm just starting", textFr: "Débutant - je commence juste", score: 1 },
        { text: "Intermediate - I understand basics", textFr: "Intermédiaire - je comprends les bases", score: 2 },
        { text: "Advanced - I'm experienced", textFr: "Avancé - je suis expérimenté", score: 3 },
      ],
    },
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateRiskProfile = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage <= 40) {
      return {
        type: language === 'fr' ? 'Conservateur' : 'Conservative',
        icon: Shield,
        color: 'bg-primary',
        description: language === 'fr' 
          ? 'Vous préférez la sécurité et la stabilité. Votre portefeuille devrait se concentrer sur les investissements à faible risque.'
          : 'You prefer safety and stability. Your portfolio should focus on low-risk investments.',
        allocation: {
          moneyMarket: 60,
          bonds: 30,
          stocks: 10,
        },
        recommendations: language === 'fr' ? [
          'Fonds du marché monétaire (60%)',
          'Fonds obligataires (30%)',
          'Actions prudentes (10%)',
        ] : [
          'Money Market Funds (60%)',
          'Bond Funds (30%)',
          'Conservative Stocks (10%)',
        ],
      };
    } else if (percentage <= 70) {
      return {
        type: language === 'fr' ? 'Modéré' : 'Moderate',
        icon: TrendingUp,
        color: 'bg-accent',
        description: language === 'fr'
          ? 'Vous recherchez un équilibre entre croissance et sécurité. Un portefeuille diversifié vous convient.'
          : 'You seek a balance between growth and security. A diversified portfolio suits you.',
        allocation: {
          moneyMarket: 30,
          bonds: 30,
          stocks: 40,
        },
        recommendations: language === 'fr' ? [
          'Fonds d\'actions (40%)',
          'Fonds obligataires (30%)',
          'Fonds du marché monétaire (30%)',
        ] : [
          'Equity Funds (40%)',
          'Bond Funds (30%)',
          'Money Market Funds (30%)',
        ],
      };
    } else {
      return {
        type: language === 'fr' ? 'Agressif' : 'Aggressive',
        icon: Zap,
        color: 'bg-warning',
        description: language === 'fr'
          ? 'Vous êtes prêt à prendre des risques pour des rendements plus élevés. Concentrez-vous sur les actions et la croissance.'
          : 'You\'re willing to take risks for higher returns. Focus on equities and growth.',
        allocation: {
          moneyMarket: 10,
          bonds: 20,
          stocks: 70,
        },
        recommendations: language === 'fr' ? [
          'Fonds d\'actions de croissance (70%)',
          'Obligations (20%)',
          'Liquidités (10%)',
        ] : [
          'Growth Equity Funds (70%)',
          'Bonds (20%)',
          'Cash (10%)',
        ],
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (showResults) {
    const profile = calculateRiskProfile();
    const Icon = profile.icon;

    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
          <button
            onClick={() => setCurrentScreen('explore')}
            className="mb-4 p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white mb-2">{t('yourRiskProfile')}</h2>
          <p className="text-white/80 text-sm">{t('recommendations')}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 max-w-2xl mx-auto space-y-6"
        >
          {/* Profile Result */}
          <Card className={`p-6 ${profile.color}/10 border-2 ${profile.color}/20`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${profile.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground text-2xl mb-1">{profile.type}</h3>
                <p className="text-muted-foreground">{language === 'fr' ? 'Investisseur' : 'Investor'}</p>
              </div>
              <CheckCircle2 className={`w-8 h-8 text-${profile.color}`} />
            </div>
            <p className="text-foreground">{profile.description}</p>
          </Card>

          {/* Recommended Allocation */}
          <Card className="p-6">
            <h4 className="text-foreground mb-4">{language === 'fr' ? 'Allocation recommandée' : 'Recommended Allocation'}</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Actions' : 'Stocks'}</span>
                  <span className="text-sm text-foreground">{profile.allocation.stocks}%</span>
                </div>
                <Progress value={profile.allocation.stocks} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Obligations' : 'Bonds'}</span>
                  <span className="text-sm text-foreground">{profile.allocation.bonds}%</span>
                </div>
                <Progress value={profile.allocation.bonds} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Marché monétaire' : 'Money Market'}</span>
                  <span className="text-sm text-foreground">{profile.allocation.moneyMarket}%</span>
                </div>
                <Progress value={profile.allocation.moneyMarket} className="h-3" />
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6">
            <h4 className="text-foreground mb-4">{t('recommendations')}</h4>
            <div className="space-y-3">
              {profile.recommendations.map((rec, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{rec}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setAnswers([]);
                setCurrentQuestion(0);
                setShowResults(false);
              }}
              variant="outline"
              className="flex-1 h-12"
            >
              {language === 'fr' ? 'Refaire le test' : 'Retake Assessment'}
            </Button>
            <Button
              onClick={() => setCurrentScreen('invest')}
              className="flex-1 h-12 bg-accent hover:bg-accent/90"
            >
              {t('investNow')}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('explore')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{t('riskAssessment')}</h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' 
            ? `Question ${currentQuestion + 1} sur ${questions.length}`
            : `Question ${currentQuestion + 1} of ${questions.length}`}
        </p>
        <Progress value={progress} className="mt-4 h-2 bg-white/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-2xl mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-foreground text-xl mb-6">
                {language === 'fr' ? currentQ.questionFr : currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full p-4 text-left border-2 border-border rounded-xl hover:border-accent hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-foreground">
                        {language === 'fr' ? option.textFr : option.text}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>

            {currentQuestion > 0 && (
              <Button
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1);
                  setAnswers(answers.slice(0, -1));
                }}
                variant="outline"
                className="w-full h-12"
              >
                {language === 'fr' ? 'Retour' : 'Go Back'}
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}