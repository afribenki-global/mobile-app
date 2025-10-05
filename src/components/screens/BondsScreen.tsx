import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Shield, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function BondsScreen() {
  const { setCurrentScreen, formatCurrency, language } = useApp();

  // Nigerian Government and Corporate Bonds
  const bonds = [
    {
      id: 1,
      name: language === 'fr' ? 'Obligation FGN 7 ans' : 'FGN 7-Year Bond',
      issuer: 'Federal Government of Nigeria',
      type: 'Government',
      coupon: 14.55,
      maturity: '2031-04-27',
      minInvestment: 10000,
      rating: 'AAA',
      tenure: 7,
    },
    {
      id: 2,
      name: language === 'fr' ? 'Obligation FGN 10 ans' : 'FGN 10-Year Bond',
      issuer: 'Federal Government of Nigeria',
      type: 'Government',
      coupon: 15.45,
      maturity: '2034-06-27',
      minInvestment: 10000,
      rating: 'AAA',
      tenure: 10,
    },
    {
      id: 3,
      name: language === 'fr' ? 'Obligation FGN 20 ans' : 'FGN 20-Year Bond',
      issuer: 'Federal Government of Nigeria',
      type: 'Government',
      coupon: 16.25,
      maturity: '2044-04-27',
      minInvestment: 10000,
      rating: 'AAA',
      tenure: 20,
    },
    {
      id: 4,
      name: language === 'fr' ? 'Obligation MTN Nigéria' : 'MTN Nigeria Bond',
      issuer: 'MTN Nigeria Communications Plc',
      type: 'Corporate',
      coupon: 12.50,
      maturity: '2029-11-15',
      minInvestment: 50000,
      rating: 'AA',
      tenure: 5,
    },
    {
      id: 5,
      name: language === 'fr' ? 'Obligation Dangote Industries' : 'Dangote Industries Bond',
      issuer: 'Dangote Industries Limited',
      type: 'Corporate',
      coupon: 13.00,
      maturity: '2030-03-20',
      minInvestment: 50000,
      rating: 'AA+',
      tenure: 6,
    },
    {
      id: 6,
      name: language === 'fr' ? 'Obligation Access Bank' : 'Access Bank Bond',
      issuer: 'Access Bank Plc',
      type: 'Corporate',
      coupon: 11.75,
      maturity: '2028-09-10',
      minInvestment: 50000,
      rating: 'AA-',
      tenure: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('invest')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{language === 'fr' ? 'Obligations' : 'Bonds'}</h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Obligations gouvernementales et d\'entreprises' : 'Government & Corporate Bonds'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-foreground mb-2">{language === 'fr' ? 'Investissement sûr' : 'Safe Investment'}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' 
                  ? 'Les obligations offrent des rendements fixes avec un risque plus faible par rapport aux actions. Parfait pour les investisseurs conservateurs.'
                  : 'Bonds offer fixed returns with lower risk compared to stocks. Perfect for conservative investors.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Government Bonds */}
        <div>
          <h3 className="text-foreground mb-3 px-1">{language === 'fr' ? 'Obligations gouvernementales' : 'Government Bonds'}</h3>
          <div className="space-y-3">
            {bonds.filter(b => b.type === 'Government').map((bond, index) => (
              <motion.div
                key={bond.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => {
                    localStorage.setItem('selectedBond', JSON.stringify(bond));
                    setCurrentScreen('bond-detail');
                  }}
                  className="p-5 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{bond.name}</h4>
                      <p className="text-sm text-muted-foreground">{bond.issuer}</p>
                    </div>
                    <Badge className="bg-success">
                      {bond.rating}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Coupon' : 'Coupon'}</p>
                      <p className="text-sm text-success">{bond.coupon}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Durée' : 'Tenure'}</p>
                      <p className="text-sm text-foreground">{bond.tenure} {language === 'fr' ? 'ans' : 'years'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Min.' : 'Min.'}</p>
                      <p className="text-sm text-foreground">{formatCurrency(bond.minInvestment)}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate Bonds */}
        <div>
          <h3 className="text-foreground mb-3 px-1">{language === 'fr' ? 'Obligations d\'entreprise' : 'Corporate Bonds'}</h3>
          <div className="space-y-3">
            {bonds.filter(b => b.type === 'Corporate').map((bond, index) => (
              <motion.div
                key={bond.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => {
                    localStorage.setItem('selectedBond', JSON.stringify(bond));
                    setCurrentScreen('bond-detail');
                  }}
                  className="p-5 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{bond.name}</h4>
                      <p className="text-sm text-muted-foreground">{bond.issuer}</p>
                    </div>
                    <Badge className="bg-accent">
                      {bond.rating}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Coupon' : 'Coupon'}</p>
                      <p className="text-sm text-success">{bond.coupon}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Durée' : 'Tenure'}</p>
                      <p className="text-sm text-foreground">{bond.tenure} {language === 'fr' ? 'ans' : 'years'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{language === 'fr' ? 'Min.' : 'Min.'}</p>
                      <p className="text-sm text-foreground">{formatCurrency(bond.minInvestment)}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
