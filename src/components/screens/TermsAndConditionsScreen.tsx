import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../ui/card';

export function TermsAndConditionsScreen() {
  const { setCurrentScreen, language } = useApp();

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
        <h2 className="text-white mb-2">
          {language === 'fr' ? 'Termes et Conditions' : 'Terms & Conditions'}
        </h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Dernière mise à jour: 4 octobre 2025' : 'Last updated: October 4, 2025'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        <Card className="p-6 space-y-6">
          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '1. Acceptation des conditions' : '1. Acceptance of Terms'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'En accédant et en utilisant AfriBenki, vous acceptez d\'être lié par ces conditions générales. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.'
                : 'By accessing and using AfriBenki, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our platform.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '2. Services fournis' : '2. Services Provided'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'AfriBenki fournit une plateforme de technologie financière pour les investissements, l\'épargne et l\'éducation financière. Nous facilitons les transactions mais n\'offrons pas de conseils financiers.'
                : 'AfriBenki provides a financial technology platform for investments, savings, and financial education. We facilitate transactions but do not provide financial advice.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '3. Éligibilité des utilisateurs' : '3. User Eligibility'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Vous devez avoir au moins 18 ans et être légalement capable de conclure des contrats contraignants pour utiliser AfriBenki. Vous devez fournir des informations précises et à jour lors de l\'inscription.'
                : 'You must be at least 18 years old and legally capable of entering into binding contracts to use AfriBenki. You must provide accurate and up-to-date information during registration.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '4. Sécurité du compte' : '4. Account Security'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute activité sous votre compte est de votre responsabilité. Informez-nous immédiatement de toute utilisation non autorisée.'
                : 'You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account is your responsibility. Notify us immediately of any unauthorized use.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '5. Risques d\'investissement' : '5. Investment Risks'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Tous les investissements comportent des risques. La valeur de vos investissements peut diminuer. Les performances passées ne garantissent pas les résultats futurs. Investissez uniquement ce que vous pouvez vous permettre de perdre.'
                : 'All investments carry risk. The value of your investments may go down. Past performance does not guarantee future results. Only invest what you can afford to lose.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '6. Frais et charges' : '6. Fees and Charges'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'AfriBenki peut facturer des frais pour certains services. Tous les frais seront clairement communiqués avant que vous ne confirmiez une transaction. Les frais sont sujets à changement avec préavis.'
                : 'AfriBenki may charge fees for certain services. All fees will be clearly communicated before you confirm a transaction. Fees are subject to change with notice.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '7. Transactions' : '7. Transactions'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Toutes les transactions sont finales une fois confirmées. Les demandes d\'annulation ne sont pas garanties. Nous nous réservons le droit de refuser ou d\'annuler des transactions à notre discrétion.'
                : 'All transactions are final once confirmed. Cancellation requests are not guaranteed. We reserve the right to refuse or cancel transactions at our discretion.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '8. Conduite interdite' : '8. Prohibited Conduct'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {language === 'fr' ? 'Vous acceptez de ne pas:' : 'You agree not to:'}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              <li>{language === 'fr' ? 'Utiliser la plateforme à des fins illégales' : 'Use the platform for illegal purposes'}</li>
              <li>{language === 'fr' ? 'Fournir de fausses informations' : 'Provide false information'}</li>
              <li>{language === 'fr' ? 'Tenter d\'accéder à des comptes non autorisés' : 'Attempt to access unauthorized accounts'}</li>
              <li>{language === 'fr' ? 'Perturber ou interférer avec la plateforme' : 'Disrupt or interfere with the platform'}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '9. Limitation de responsabilité' : '9. Limitation of Liability'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'AfriBenki n\'est pas responsable des pertes d\'investissement, des erreurs de données ou des interruptions de service. Notre responsabilité totale ne dépassera pas les frais que vous avez payés au cours des 12 derniers mois.'
                : 'AfriBenki is not liable for investment losses, data errors, or service interruptions. Our total liability will not exceed the fees you paid in the past 12 months.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '10. Modifications des conditions' : '10. Changes to Terms'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nous pouvons modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication. Votre utilisation continue constitue votre acceptation des nouvelles conditions.'
                : 'We may modify these terms at any time. Changes will be effective upon posting. Your continued use constitutes acceptance of the new terms.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '11. Résiliation' : '11. Termination'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nous pouvons suspendre ou résilier votre compte pour violation de ces conditions. Vous pouvez fermer votre compte à tout moment, sous réserve de l\'exécution de toutes les obligations en cours.'
                : 'We may suspend or terminate your account for violation of these terms. You may close your account at any time, subject to completion of all pending obligations.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '12. Droit applicable' : '12. Governing Law'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Ces conditions sont régies par les lois de la République fédérale du Nigéria. Tout litige sera soumis à la juridiction exclusive des tribunaux nigérians.'
                : 'These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be subject to the exclusive jurisdiction of Nigerian courts.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '13. Nous contacter' : '13. Contact Us'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Pour toute question concernant ces conditions, contactez-nous à legal@afribenki.com'
                : 'For any questions about these terms, contact us at legal@afribenki.com'}
            </p>
          </section>
        </Card>
      </motion.div>
    </div>
  );
}
